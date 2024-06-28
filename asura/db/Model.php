<?php

namespace asura\db;

use asura\Loader;
use ArrayObject;
use asura\Log;
use Exception;
use PDOException;
use PDOStatement;
use PDO;

abstract class Model
{
    public $sql = '';
    protected $key = 'db';          //数据库配置键名
    protected $table;               //数据表名
    protected $prefix;              //数据表前缀
    protected $dbname;              //数据库名
    protected $sqlArr;              //sql组装数组
    protected $stmtCache = [];      //预处理对象缓存
    protected static $fieldRemark = [];    //字段备注信息
    protected $allowField = [];     //允许更新的字段 为空时都可以更新(注:针对update函数并且data是数组的情况有效)
    protected $hasCache = [];       //has缓存

    /**
     * 不能被克隆
     */
    final protected function __clone(){}

    /**
     * 构造函数
     * Model constructor.
     */
    protected function __construct()
    {
        if (!isset($this->table)) {
            //设置表名
            $this->table = $this->getTable(get_class($this));
        }
        $config = Loader::config($this->key);
        //数据库名称
        $this->dbname = $config['dbname'];
        //表前缀
        $this->prefix = $config['prefix'];
        $this->sqlArrInit();
        $this->init();
    }

    /**
     * 初始化函数
     */
    protected function init(){}

    /**
     * 单例获取对象接口
     * @return static
     */
    public static function getInstance(): Model
    {
        return static::$instance ?? static::$instance = new static();
    }

    /**
     * 获取表名
     * @param string $class     model的类名
     * @return false|string
     */
    final protected function getTable(string $class)
    {
        return substr($class, 6, -6);
    }

    /**
     *
     */
    final private function sqlArrInit()
    {
        $this->sqlArr = [
            'table' => $this->prefix . $this->table,
            'mode' => 0, //模式 0-普通模式 1-遍历数据格式 2-连表数据格式
            'field' => '*',
            'join' => '',
            'alias' => '',
            'where' => '',
            'whereData' => [],
            'param' => [],
            'group' => '',
            'having' => '',
            'order' => '',
            'limit' => ' LIMIT 200',
            'has' => [],
            'status' => 0, //数据解析状态 0-未解析 1-已解析
        ];
    }

    /**
     * sqlArr解析处理
     */
    final private function sqlArrParse()
    {
        if ($this->sqlArr['status']) {
            //已经解析
            return $this->sqlArr;
        }
        $prefixKey = '';
        if ($this->sqlArr['mode'] == 2) {
            $alias = $this->sqlArr['alias'] ?: $this->sqlArr['table'];
            if ($this->sqlArr['join'] == '') {
                //处理字段
                $prefixKey = $alias . '.';
                if ($this->sqlArr['field'] == '*') {
                    $this->sqlArr['field'] = "{$prefixKey}*";
                } else {
                    if (strpos($this->sqlArr['field'], '(') !== false) {
                        //有函数并且没有别名
                        if(strpos($this->sqlArr['field'], '.') === false){
                            $fieldArr = explode(',', $this->sqlArr['field']);
                            foreach ($fieldArr as $k => $v) {
                                $fieldArr[$k] = str_replace("(", "({$prefixKey}", $v, $count);
                                if ($count == 0) {
                                    $fieldArr[$k] = "{$prefixKey}{$v}";
                                }
                            }
                            $this->sqlArr['field']=implode(',',$fieldArr);
                        }
                    }else{
                        $this->sqlArr['field'] = "{$prefixKey}" . str_replace(',', ",{$prefixKey}", $this->sqlArr['field']);
                    }
                }
            }
            //2-连表数据格式
            foreach ($this->sqlArr['has'] as $fn => $v) {
                if ($v['type'] == 'belongsTo' && $v['whereData']) {
                    //建立连表关系和字段名设置
                    $table = $this->getTable($v['related']);
                    $this->join("{$table} {$fn}", "{$fn}.{$v['localKey']}={$alias}.{$v['foreignKey']}",'LEFT');
                    foreach ($v['whereData'] as $val) {
                        $this->setWhereArr($val['whereArr'], $val['logic'], "{$fn}.");
                    }
                    /*********************设置字段名*********************/
                    if(isset($v['field'])){
                        if ($v['field'] == '*') {
                            $arr = array_keys($this->getTableComment($table));
                        } else {
                            $arr = explode(',', $v['field']);
                        }
                        //设置field
                        $temp = '';
                        foreach ($arr as $val) {
                            $temp .= ",{$fn}.{$val} AS `{$fn}.{$val}`";
                        }
                        $this->sqlArr['field'] .= $temp;
                    }
                    /*********************设置字段名*********************/
                    //变更where条件
                    unset($this->sqlArr['has'][$fn]);
                }
            }
        }
        foreach ($this->sqlArr['whereData'] as $v) {
            $this->setWhereArr($v['whereArr'], $v['logic'], $prefixKey);
        }
        $this->sqlArr['status'] = 1;
        return $this->sqlArr;
    }

    /**
     * has连表解析
     */
    final private function hasParse($mode, $has, $data)
    {
        if (!$data) {
            return $data;
        }
        if ($mode == 2) {
            foreach ($data as $k => $v) {
                $temp = explode('.', $k);
                if (isset($temp[1])) {
                    $data[$temp[0]][$temp[1]] = $v;
                    unset($data[$k]);
                }
            }
        }
        foreach ($has as $fn => $v) {
            $model = $v['related']::getInstance();
            if ($v['type'] == 'belongsTo') {
                //多对一  缓存优化
                if (!isset($this->hasCache["{$fn}{$data[$v['foreignKey']]}"])) {
                    $this->hasCache["{$fn}{$data[$v['foreignKey']]}"] = $model->field($v['field'])->where([$v['localKey'] => $data[$v['foreignKey']]])->getOne() ?: new ArrayObject();
                }
                $data[$fn] = $this->hasCache["{$fn}{$data[$v['foreignKey']]}"];
            } else if ($v['type'] == 'hasOne') {
                //一对一
                $model = $model->field($v['field'])->where([$v['foreignKey'] => $data[$v['localKey']]]);
                foreach ($v['whereData'] as $val) {
                    $model->where($val['whereArr'], $val['logic']);
                }
                $data[$fn] = $model->getOne() ?: new ArrayObject();
            } else if ($v['type'] == 'hasMany') {
                //一对多
                $model = $model->field($v['field'])->where([$v['foreignKey'] => $data[$v['localKey']]])->limit($v['limit'])->order($v['order']);
                foreach ($v['whereData'] as $val) {
                    $model->where($val['whereArr'], $val['logic']);
                }
                $data[$fn] = $model->select();
            }
        }
        return $data;
    }


    /**
     * 设置查询字段(查询时有效,字段为数组时候KEY为别名或者表名)
     * @param $field
     * @return $this
     */
    final public function field($field): Model
    {
        if (is_array($field)) {
            $this->sqlArr['mode'] = 2;
            $this->sqlArr['field'] = '';
            foreach ($field as $k => $v) {
                if ($this->sqlArr['field'] == '') {
                    //第一组数据
                    if ($v == '*') {
                        $this->sqlArr['field'] .= "{$k}.*";
                    } else {
                        $this->sqlArr['field'] .= "{$k}." . str_replace(',', ",{$k}.", $v);
                    }
                } else {
                    //分割数据
                    $arr = explode(',', $v);
                    $temp = '';
                    foreach ($arr as $val) {
                        $temp .= ",{$k}.{$val} AS `{$k}.{$val}`";
                    }
                    $this->sqlArr['field'] .= $temp;
                }
            }
        } else {
            $this->sqlArr['field'] = $field;
        }
        return $this;
    }

    /**
     * 设置当前表别名(注:不能在设置table方法之前设置表别名)
     * @param string $alias 表别名
     * @return $this
     */
    final public function alias(string $alias): Model
    {
        $this->sqlArr['alias'] = $alias;
        return $this;
    }

    /**
     * 连表查询
     * @param string $table 表名    $type==2时可以使用子查询
     * @param string $condition 连表on条件
     * @param string $type 链接方式 INNER(默认) LEFT RIGHT FULL
     * @return $this
     */
    final public function join(string $table, string $condition, string $type = 'INNER'): Model
    {
        $this->sqlArr['join'] .= " {$type} JOIN {$this->prefix}{$table} ON {$condition}";
        return $this;
    }

    /**
     * 设置模型加载关系
     * @param array $relations
     * @return $this
     */
    final public function with(array $relations): Model
    {
        if ($relations) {
            //变更模式
            if ($this->sqlArr['mode'] == 0) {
                $this->sqlArr['mode'] = 1;
            }
            foreach ($relations as $fn => $v) {
                if (!isset($this->sqlArr['has'][$fn])) {
                    $this->sqlArr['has'][$fn] = $this->$fn();
                }
                $this->sqlArr['has'][$fn]['field'] = $v;
            }
        }
        return $this;
    }

    /**
     * 一对一表关联(不常用)
     * @param string $related       关联模型
     * @param string $foreignKey    外键
     * @param string $localKey      主键
     */
    final public function hasOne(string $related, string $foreignKey, string $localKey = 'id'): array
    {
        return ['type' => 'hasOne', 'related' => $related, 'foreignKey' => $foreignKey, 'localKey' => $localKey,'whereData'=>[]];
    }

    /**
     * 多对一表关联(常用)
     * @param string $related       关联模型
     * @param string $foreignKey    外键
     * @param string $localKey      关联主键
     */
    final public function belongsTo(string $related, string $foreignKey, string $localKey = 'id'): array
    {
        return ['type' => 'belongsTo', 'related' => $related, 'foreignKey' => $foreignKey, 'localKey' => $localKey, 'whereData' => []];
    }

    /**
     * 一对多表关联(不常用)
     * @param string $related       关联模型
     * @param string $foreignKey    外键
     * @param string $localKey      主键
     */
    final public function hasMany(string $related, string $foreignKey, string $localKey = 'id', int $limit = 20, $order = ''): array
    {
        return ['type' => 'hasMany', 'related' => $related, 'foreignKey' => $foreignKey, 'localKey' => $localKey, 'whereData' => [], 'limit' => $limit, 'order' => $order];
    }

    /**
     * has连表查询条件
     * @param string $fn 关联的方法名
     * @param array $whereArr
     * @param string $logic
     * @return Model
     */
    final public function hasWhere(string $fn, array $whereArr = [], string $logic = 'AND'): Model
    {
        if ($whereArr) {
            if (!isset($this->sqlArr['has'][$fn])) {
                $this->sqlArr['has'][$fn] = $this->$fn();
            }
            if ($this->sqlArr['mode'] < 2) {
                $this->sqlArr['mode'] = $this->sqlArr['has'][$fn]['type'] == 'belongsTo' ? 2 : 1;
            }
            $this->sqlArr['has'][$fn]['whereData'][] = ['whereArr' => $whereArr, 'logic' => $logic];
        }
        return $this;
    }

    /**
     * 设置where数组条件
     * @param array $whereArr
     * @param string $prefixKey
     * @param string $logic
     * @return void
     */
    final private function setWhereArr(array $whereArr, string $logic = 'AND', string $prefixKey = '')
    {
        $where = $param = [];
        foreach ($whereArr as $k => $v) {
            $k = $prefixKey . $k;
            if (is_array($v)) {
                foreach ($v as $exp => $val) {
                    //转大写
                    //$exp = strtoupper($exp);
                    if ($exp == 'BETWEEN' || $exp == 'NOT BETWEEN') {
                        //区间范围条件表达式
                        if (is_array($val)) {
                            $between = $val;
                        } else {
                            $between = explode(',', $val);
                        }
                        if (count($between) != 2) {
                            throw new PDOException("PDOError:WHERE条件异常-{$this->sqlArr['table']}-{$exp}-" . json_encode($between, JSON_UNESCAPED_UNICODE));
                        }
                        $where[] = "{$k} {$exp} ? AND ?";
                        $param[] = $between[0];
                        $param[] = $between[1];
                    } else if ($exp == 'IN' || $exp == 'NOT IN') {
                        //IN语句表达式
                        if (is_array($val)) {
                            $in = $val;
                        } else {
                            $in = explode(',', $val);
                        }
                        if (!$in) {
                            throw new PDOException("PDOError:WHERE条件异常-{$this->sqlArr['table']}-{$exp}-" . json_encode($in, JSON_UNESCAPED_UNICODE));
                        }
                        $where[] = "{$k} {$exp} (" . implode(',', array_fill(0, count($in), '?')) . ")";
                        $param = array_merge($param, $in);
                    } else if ($exp == 'EXP') {
                        //自定义表达式
                        $where[] = "{$k} {$val}";
                    } else {
                        //未知表达式
                        $where[] = "{$k} {$exp} ?";
                        $param[] = $val;
                    }
                }
            } else {
                $where[] = "{$k}=?";
                $param[] = $v;
            }
        }
        if ($this->sqlArr['where']) {
            if ($logic == 'OR') {
                $this->sqlArr['where'] .= " AND (" . implode(" {$logic} ", $where) . ")";
            } else {
                $this->sqlArr['where'] .= " AND " . implode(" {$logic} ", $where);
            }
        } else {
            if ($logic == 'OR') {
                $this->sqlArr['where'] = " WHERE (" . implode(" {$logic} ", $where) . ")";
            } else {
                $this->sqlArr['where'] = " WHERE " . implode(" {$logic} ", $where);
            }
        }
        $this->setParam($param);
    }

    /**
     * WHERE条件数组形式
     * @param array $whereArr
     * @param string $logic WHERE为数组时 条件分割符 AND 或 OR
     * @return $this
     */
    final public function where(array $whereArr, string $logic = 'AND'): Model
    {
        if ($whereArr) {
            $this->sqlArr['whereData'][] = ['whereArr' => $whereArr, 'logic' => $logic];
        }
        return $this;
    }

    /**
     * WHERE条件字符串形式
     * @param string $where 条件
     * @param array $param 参数
     * @param string $logic 连接符
     */
    final public function whereRaw(string $where='', array $param=[], string $logic = 'AND'): Model
    {
        if ($this->sqlArr['where']) {
            $this->sqlArr['where'] .= " $logic " . $where;
        } else {
            $this->sqlArr['where'] = ' WHERE ' . $where;
        }
        return $this->setParam($param);
    }

    /**
     * 设置预处理参数
     * @param array $param
     * @return $this
     */
    final public function setParam(array $param): Model
    {
        if ($this->sqlArr['param']) {
            $this->sqlArr['param'] = array_merge($this->sqlArr['param'], $param);
        } else {
            $this->sqlArr['param'] = $param;
        }
        return $this;
    }


    /**
     * 分组查询(查询时有效,分组查询时除分组字段外其他字段必须用确保使用集合函数any_value-默认 max-最大 min-最小 GROUP_CONCAT-合并 SUM-求和 AVG-平均数 COUNT-统计)
     * @param string $group 分组字段
     * @return $this
     */
    final public function group(string $group): Model
    {
        $this->sqlArr['group'] = " GROUP BY {$group}";
        return $this;
    }

    /**
     * having子句(查询时有效) WHERE关键字无法与合计函数一起使用,通过having实现 例如SUM, COUNT, MAX, AVG等
     * @param string $having
     * @return $this
     */
    final public function having(string $having): Model
    {
        $this->sqlArr['having'] = " HAVING {$having}";
        return $this;
    }

    /**
     * 设置排序(查询时有效)
     * @param $order
     * @return $this
     */
    final public function order($order): Model
    {
        if (is_array($order)) {
            $orderArr = [];
            foreach ($order as $k => $v) {
                $orderArr[] = "{$k} {$k}";
            }
            if ($orderArr) {
                $this->sqlArr['order'] = ' ORDER BY ' . implode(',', $orderArr);
            }
        } else {
            if ($order) {
                $this->sqlArr['order'] = " ORDER BY {$order}";
            }
        }
        return $this;
    }

    /**
     * 查询条数(查询时有效)
     * @param int $limit 查询的条数 -1-不限制条数
     * @param int $page 默认0-不分页 >0分页查询
     * @return $this
     */
    final public function limit(int $limit, int $page = 0): Model
    {
        if ($page > 0) {
            $offset = $limit * ($page - 1);
            $this->sqlArr['limit'] = " LIMIT {$offset},{$limit}";
        } else {
            if ($limit == -1) {
                $this->sqlArr['limit'] = '';
            } else {
                $this->sqlArr['limit'] = " LIMIT {$limit}";
            }
        }
        return $this;
    }

    /**
     *  获取一条查询结果(select快捷方式)
     * @return array
     */
    final public function getOne()
    {
        return $this->limit(1)->select(2);
    }

    /**
     * 获取表单注释
     * @param string $table
     * @return array
     */
    final public function getTableComment(string $table = ''): array
    {
        if (isset(static::$fieldRemark[$table])) {
            return static::$fieldRemark[$table];
        }
        //sql语句
        $sql = "SELECT COLUMN_NAME,column_comment FROM INFORMATION_SCHEMA.Columns WHERE table_name=? AND table_schema=?";
        //表名
        $table = $table ? : $this->table;
        //参数
        $param = [$this->prefix . $table, $this->dbname];
        $stmt = $this->getStmt($sql);
        if (!$stmt->execute($param)) {
            DB::PDOError($stmt, $param);
        }
        $list = $stmt->fetchAll();
        $data = [];
        foreach ($list as $v) {
            $data[$v['COLUMN_NAME']] = $v['column_comment'];
        }
        return static::$fieldRemark[$table] = $data;
    }

    /**
     * 判断数据是否存在
     * @return bool
     */
    final public function isExist(): bool
    {
        $res = $this->field('1')->limit(1)->select(2);
        return (bool)$res;
    }

    /**
     * SELECT查询
     * @param int $type  1-获取数据集 2-获取一条数据对象
     * @return array|ArrayObject|mixed
     */
    final public function select(int $type = 1)
    {
        $sqlArr = $this->sqlArrParse();
        //拼装sql
        $sql = "SELECT {$sqlArr['field']} FROM {$sqlArr['table']} {$sqlArr['alias']}{$sqlArr['join']}{$sqlArr['where']}{$sqlArr['group']}{$sqlArr['having']}{$sqlArr['order']}{$sqlArr['limit']}";
        ///kkk echo $sql;
        $res = $this->query($this->getStmt($sql), $type);
        if ($sqlArr['mode'] > 0) {
            if ($type == 1) {
                foreach ($res as $k => $v) {
                    $v = $this->hasParse($sqlArr['mode'], $sqlArr['has'], $v);
                    $res[$k] = $v;
                }
            } else if ($type == 2) {
                $res = $this->hasParse($sqlArr['mode'], $sqlArr['has'], $res);
            }
            $this->hasCache=[];
        }
        return $res;
    }

    /**
     * 慎用通过数据解析单条has
     * @param $data
     * @return mixed
     */
    final public function hasParseData($data)
    {
        $sqlArr = $this->sqlArr;
        $this->sqlArrInit();
        if ($sqlArr['mode'] > 0) {
            $data = $this->hasParse(1, $sqlArr['has'], $data);
            $this->hasCache = [];
        }
        return $data;
    }

    /**
     * count统计条数(注：orderby和limit无需设置)
     * @return mixed
     */
    final public function count()
    {
        $sqlArr=$this->sqlArrParse();
        if ($sqlArr['group'] === '') {
            //不分组
            $sql = "SELECT count(*) as total FROM {$sqlArr['table']} {$sqlArr['alias']}{$sqlArr['join']}{$sqlArr['where']}";
        } else {
            //分组
            if ($sqlArr['having'] === '') {
                $sql = "SELECT COUNT(*) as total FROM (SELECT 1 FROM {$sqlArr['table']} {$sqlArr['alias']}{$sqlArr['join']}{$sqlArr['where']}{$sqlArr['group']}) temp";
            } else {
                $sql = "SELECT COUNT(*) as total FROM (SELECT {$sqlArr['field']} FROM {$sqlArr['table']} {$sqlArr['alias']}{$sqlArr['join']}{$sqlArr['where']}{$sqlArr['group']}{$sqlArr['having']}) temp";
            }
        }
        $res = $this->query($this->getStmt($sql), 2);
        return $res['total'];
    }

    /**
     *Insert单条插入
     * @param array $data 字段与值
     * @param false $replace 是否REPLACE INTO覆盖插入
     * @return int    默认返回id
     */
    final protected function insert(array $data, bool $replace = false): int
    {
        $sql = $this->getInsertSql(array_keys($data), $replace);
        //设置预处理参数
        $this->sqlArr['param'] = array_values($data);
        return $this->exec($this->getStmt($sql), 2);
    }

    /**
     * 批量插入
     * @param array $field 插入字段
     * @param array $data 插入数据（二维数组）例：[['第一条数据','描述','状态'],['第二条数据','描述','状态']]
     * @param false $replace 是否REPLACE INTO覆盖插入
     * @return bool
     */
    final protected function insertAll(array $field, array $data, bool $replace = false): bool
    {
        $sql = $this->getInsertSql($field, $replace);
        $this->sqlArrInit();
        $stmt = $this->getStmt($sql);
        foreach ($data as $param) {
            if (!$stmt->execute($param)) {
                DB::PDOError($stmt, $param);
            }
        }
        return true;
    }

    /**
     * 查询表并插入related
     * @param $related
     * @param $field
     * @return int
     */
    final public function insertToTable($related, $field = '')
    {
        $sqlArr = $this->sqlArrParse();
        $table = $this->prefix . $this->getTable($related);
        if ($field) {
            if (is_array($field)) {
                $field = implode(',', $field);
            }
            $field = "({$field})";
        }
        //拼装sql
        $sql = "INSERT INTO {$table} {$field} SELECT {$sqlArr['field']} FROM {$sqlArr['table']} {$sqlArr['alias']}{$sqlArr['join']}{$sqlArr['where']}{$sqlArr['group']}{$sqlArr['having']}{$sqlArr['order']}{$sqlArr['limit']}";
        return $this->exec($this->getStmt($sql));
    }

    /**
     *批量插入
     * @param array $list           二维数组
     * @param false $replace
     * @return bool
     */
    final protected function insertListData(array $list, bool $replace = false): bool
    {
        if ($list) {
            $sql = $this->getInsertSql(array_keys($list[0]), $replace);
            $this->sqlArrInit();
            $stmt = $this->getStmt($sql);
            foreach ($list as $param) {
                if (!$stmt->execute(array_values($param))) {
                    DB::PDOError($stmt, $param);
                }
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * UPDATE更新
     * @param $data
     * @return mixed
     */
    final protected function update($data)
    {
        $strSql = '';
        if (is_array($data)) {
            $arr = [];
            if ($this->allowField) {
                //数据过滤
                foreach ($this->allowField as $k => $v) {
                    if (!is_numeric($k)) {
                        //要过滤数据
                        if (isset($data[$k])) {
                            //更新
                            $strSql .= ", `{$k}`=?";
                            if ($v == 'int') {
                                $arr[] = intval($data[$k]);
                            } else if ($v == 'float') {
                                $arr[] = floatval($data[$k]);
                            } else {
                                $arr[] = $data[$k];
                            }
                        }
                    } else if (isset($data[$v])) {
                        //更新
                        $strSql .= ", `{$v}`=?";
                        $arr[] = $data[$v];
                    }
                }
                if (!$arr) {
                    throw new PDOException('PDOError: UPDATE data Exception!');
                }
            } else {
                foreach ($data as $k => $v) {
                    $strSql .= ", `{$k}`=?";
                    $arr[] = $v;
                }
            }
            $this->sqlArr['param'] = array_merge($arr, $this->sqlArr['param']);
            $strSql = substr($strSql, 1);
        } else {
            $strSql = $data;
        }
        $sqlArr=$this->sqlArrParse();
        if ($sqlArr['where'] === '' || !$data)
            throw new PDOException('PDOError: UPDATE is false!|data:' . json_encode($data, JSON_UNESCAPED_UNICODE) . '|where:' . json_encode($sqlArr['where'], JSON_UNESCAPED_UNICODE));
        $sql = "UPDATE {$sqlArr['table']} {$sqlArr['alias']}{$sqlArr['join']} SET {$strSql}{$sqlArr['where']}";
        return $this->exec($this->getStmt($sql));
    }

    //将virtual字段加反引号``
    final private function replaceVirtual($sql){
        $sql = str_replace('virtual', '`virtual`', $sql);
        return str_replace('`virtual``', 'virtual`', $sql);
    }

    /**
     * 获取预处理对象
     * @param string $sql       数据库语句
     * @return \PDOStatement
     */
    final public function getStmt(string $sql): PDOStatement
    {
        $sql = $this->replaceVirtual($sql);
        $key = md5($sql);
        $this->sql = $sql;
        if (isset($this->stmtCache[$key])) {
            return $this->stmtCache[$key];
        }
        $stmt = $this->getDB()->prepare($sql);
        if (!$stmt) {
            throw new PDOException('PDOError: stmt request is false!|sql:' . $sql . '|'.json_encode($this->getDB()->errorInfo()));
        }
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        return $this->stmtCache[$key] = $stmt;
    }

    /**
     * 获取数据库链接
     * @return object|PDO
     */
    final protected function getDB()
    {
        return DB::getDB($this->key);
    }

    /**
     * DELETE 删除(单表删除)
     */
    final protected function del()
    {
        $sqlArr = $this->sqlArrParse();
        if ($sqlArr === '')
            throw new PDOException('PDOError: DELETE is false!|where no empty!');
        $sql = "DELETE FROM {$sqlArr['table']} {$sqlArr['alias']}{$sqlArr['join']}{$sqlArr['where']}";
        return $this->exec($this->getStmt($sql));
    }

    /**
     * Query 查询只做查询 如果是插入更新或删除走 exec方法
     * @param PDOStatement $stmt
     * @param int $type             返回值设定   1-全部结果集(二维数组) 2取一条结果集 (一维数组)
     * @return array|ArrayObject|mixed
     */
    final protected function query(PDOStatement $stmt, int $type = 1)
    {
        $param = $this->sqlArr['param'];
        $this->sqlArrInit();
        if (!$stmt->execute($param)) {
            DB::PDOError($stmt, $param);
        }
        return $type === 1 ? $stmt->fetchAll() : $stmt->fetch();
    }

    /**
     *  exec 执行一条预处理sql语句插入更新或删除
     * @param PDOStatement $stmt    预处理语句
     * @param int $type             返回值设定  1-受影响行数 2-插入id
     * @return int|string
     */
    final protected function exec(PDOStatement $stmt, int $type = 1)
    {
        $param = $this->sqlArr['param'];
        $this->sqlArrInit();
        if (!$stmt->execute($param)) {
            DB::PDOError($stmt, $param);
        }
        return $type === 1 ? $stmt->rowCount() : $this->getDB()->lastInsertId();
    }

    /**
     * 开启事务（只开启主库的事务）
     * @return object|PDO    返回数据库连接用于 提交--$dbh->commit();回滚--$dbh->rollBack();
     */
    final public function begin()
    {
        return DB::begin($this->getDB());
    }


    /**
     * 事务处理
     * @param callable $func
     * @param string $name
     * @return array
     */
    final public function transaction(callable $func, string $name = ''): array
    {
        $dbh = DB::begin($this->getDB());
        try {
            $result = $func();
            if ($result['code'] < 0) {
                //回滚
                $dbh->rollBack();
            } else {
                //提交
                $dbh->commit();
            }
            return $result;
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, $name);
            return ['code' => -2, 'msg' => '系统错误', 'err' => $e->getMessage()];
        }
    }


    /**
     * 组装预处理INSERT语句
     * @param array $field
     * @param false $replace
     * @return string
     */
    final public function getInsertSql(array $field, bool $replace = false): string
    {
        $cmd = $replace ? 'REPLACE INTO' : 'INSERT INTO';
        return "{$cmd} {$this->sqlArr['table']} (`" . implode('`,`', $field) . '`) VALUES (' . implode(',', array_fill(0, count($field), '?')) . ');';
    }

    /**
     *获取IN条件的预处理语句
     * @param $param 1,2,3,5或数组
     * @return array
     */
    final public function getInSql($param): array
    {
        if (!is_array($param))
            $param = explode(',', $param);
        return ['IN' => implode(',', array_fill(0, count($param), '?')), 'param' => $param];
    }

    /**
     * 组装CASE的sql语句  只能组装简单的语句
     * @param string $field
     * @param array $data
     * @return string
     */
    final public function getCaseSql(string $field, array $data): string
    {
        $sql = "CASE {$field} ";
        foreach ($data as $k => $v) {
            //字符串结果
            $sql .= "WHEN '{$k}' THEN '{$v}' ";
        }
        $sql .= 'END';
        return $sql;
    }

    /**
     * 分页列表查询
     * @return array
     */
    final public function getListInfo(): array
    {
        $sqlArr = $this->sqlArrParse();
        //查询列表
        $list = $this->select();
        $this->sqlArr = $sqlArr;
        $total = $this->count();
        return ['list' => $list, 'total' => $total];
    }

}
