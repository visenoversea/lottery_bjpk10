<?php
//

namespace model;

use asura\Common;
use asura\db\Model;
use service\GoogleTranslateService;
use Exception;

class lang_config_list_model extends Model
{
    protected static $instance;
    //过滤Key值不翻译
    private $filterLangKey = ['type', 'status', 'val', 'value', 'name', 'icon', 'img', 'imgUrl', 'path', 'event'];
    //Number类型
    private $numberKey = ['type', 'val', 'status'];

    //表关联
    public function langConfig(): array
    {
        return $this->belongsTo(lang_config_model::class, 'lang_config_id');
    }

    /**
     * 解析语言包数据
     * @param array $data           语言包数组
     * @param int $lang_config_id   配置id
     * @param string $lang          语言
     * @param string $prefix        前缀
     * @return array
     */
    private function parseData(array $data, int $lang_config_id, string $lang, string $prefix = ''): array
    {
        $list = [];
        foreach ($data as $k => $v) {
            if (is_array($v)) {
                foreach ($this->parseData($v, $lang_config_id, $lang, $prefix . $k . '.') as $val) {
                    $list[] = $val;
                }
            } else {
                $type = 0;
                if (in_array($k, $this->filterLangKey)) {
                    if ($k != 0 && in_array($k, $this->numberKey)) {
                        //数字类型
                        $type = 1;
                    }
                    $status = 2;
                } else {
                    $status = 1;
                }
                $list[] = [$lang_config_id, $lang, $type, $prefix . $k, $v, SYS_TIME, SYS_TIME, $status];
            }
        }
        return $list;
    }

    /**
     * 导入翻译数据
     * @param array $langData       语言数据
     * @param int $lang_config_id   配置id
     * @param string $lang          语言
     * @return array
     */
    public function addData(array $langData, int $lang_config_id, string $lang): array
    {
        $data = $this->parseData($langData, $lang_config_id, $lang);
        if (!$data) {
            return ['code' => -2, 'msg' => '数据解析失败'];
        }
        $lang_model = lang_model::getInstance();
        $list = $lang_model->field('id,code')->where(['status' => ['>=' => 0]])->select();
        //更新数据
        $langConfigList = $this->where(['lang_config_id' => $lang_config_id])->getOne();
        if ($langConfigList) {
            //增量更新
            foreach ($data as $v) {
                $res = $this->field('id,content')->where(['lang_config_id' => $lang_config_id, 'lang' => $lang, 'k' => $v[3]])->getOne();
                if (!$res || $res['content'] != $v[4]) {
                    $dbh = $this->begin();
                    try {
                        if ($res) {
                            //语言包内容有变化需要更新
                            $this->where(['lang_config_id' => $lang_config_id, 'k' => $v[3]])->del();
                        }
                        foreach ($list as $val) {
                            $this->insert(['lang_config_id' => $v[0], 'lang' => $val['code'], 'type' => $v[2], 'k' => $v[3], 'content' => $v[4], 'create_time' => $v[5], 'modify_time' => $v[6], 'status' => $val['code'] == $lang ? $v[7] : 0]);
                        }
                        $dbh->commit();
                    } catch (Exception $e) {
                        $dbh->rollBack();
                        return ['code' => -2, 'msg' => '系统错误', 'err' => $e->getMessage()];
                    }
                }
            }
        } else {
            //没有语言包
            $dbh = $this->begin();
            try {
                $this->insertAll(['lang_config_id', 'lang', 'type', 'k', 'content', 'create_time', 'modify_time', 'status'], $data);
                $dbh->commit();
            } catch (Exception $e) {
                $dbh->rollBack();
                return ['code' => -2, 'msg' => '系统错误', 'err' => $e->getMessage()];
            }
        }
        //添加语言
        foreach ($list as $v) {
            if (!$this->where(['lang_config_id' => $lang_config_id, 'lang' => $v['code']])->isExist()) {
                //没有这个语言的语言包 导入
                $this->field("lang_config_id,type,'{$v['code']}',k,content,create_time,modify_time,0")
                    ->where(['lang_config_id' => $lang_config_id, 'lang' => $lang])
                    ->limit(-1)->insertToTable(lang_config_list_model::class, ['lang_config_id', 'type', 'lang', 'k', 'content', 'create_time', 'modify_time', 'status']);
            }
        }
        return ['code' => 1, 'msg' => '导入成功'];
    }

    //添加新的语言包
    public function addLang($lang)
    {
        $lang_config_model = lang_config_model::getInstance();
        $langConfigList = $lang_config_model->where(['status' => 1])->select();
        foreach ($langConfigList as $v) {
            if (!$this->where(['lang_config_id' => $v['id'], 'lang' => $lang])->isExist()) {
                //没有这个语言的语言包 导入
                $this->field("lang_config_id,type,'{$lang}',k,content,create_time,modify_time,0")
                    ->where(['lang_config_id' => $v['id'], 'lang' => $v['lang']])
                    ->limit(-1)
                    ->insertToTable(
                        lang_config_list_model::class,
                        ['lang_config_id', 'type', 'lang', 'k', 'content', 'create_time', 'modify_time', 'status']
                    );
            }
        }
    }

    /**
     * 生成翻译文件
     * @param int $lang_config_id   配置id
     * @param string $lang          语言
     */
    public function makeFile(int $lang_config_id, string $lang)
    {
        $list = $this->field('id,type,k,content')
            ->where(['lang_config_id' => $lang_config_id, 'lang' => $lang, 'status' => ['>=' => 0]])
            ->limit(-1)->select();
        $json = [];
        foreach ($list as $v) {
            if ($v['type'] == 1) {
                //数字
                $v['content'] = floatval($v['content']);
            }
            $key = explode('.', $v['k']);
            $len = count($key);
            switch ($len) {
                case 1;
                    $json[$key[0]] = $v['content'];
                    break;
                case 2;
                    $json[$key[0]][$key[1]] = $v['content'];
                    break;
                case 3;
                    $json[$key[0]][$key[1]][$key[2]] = $v['content'];
                    break;
                case 4;
                    $json[$key[0]][$key[1]][$key[2]][$key[3]] = $v['content'];
                    break;
                case 5;
                    $json[$key[0]][$key[1]][$key[2]][$key[3]][$key[4]] = $v['content'];
                    break;
                case 6;
                    $json[$key[0]][$key[1]][$key[2]][$key[3]][$key[4]][$key[5]] = $v['content'];
                    break;
                case 7;
                    $json[$key[0]][$key[1]][$key[2]][$key[3]][$key[4]][$key[5]][$key[6]] = $v['content'];
                    break;
                case 8;
                    $json[$key[0]][$key[1]][$key[2]][$key[3]][$key[4]][$key[5]][$key[6]][$key[7]] = $v['content'];
                    break;
            }
        }
        if ($json) {
            Common::saveFile(json_encode($json, JSON_UNESCAPED_UNICODE), "{$lang}.json", INDEX_PATH . "/lang/{$lang_config_id}");
        }
    }

    /**
     * 翻译
     * @param int $id
     * @return array
     */
    public function translate(int $id = 0): array
    {
        if ($id > 0) {
            $where = ['id' => $id, 'status' => 0];
        } else {
            $where = ['status' => 0];
        }
        $list = $this->with(['langConfig' => 'id,lang'])->where($where)
            ->order('modify_time ASC')->limit(15)
            ->select();
        if (!$list) {
            return ['code' => 1, 'msg' => '翻译完成'];
        }
        foreach ($list as $v) {
            $key = explode('.', $v['k']);
            if (in_array($key[count($key) - 1], $this->filterLangKey) || !$v['content']) {
                //设置成不翻译
                $this->edit(['id' => $v['id'], 'status' => 2]);
                continue;
            }
            $GoogleTranslateService = GoogleTranslateService::getInstance();
            try {
                $content = $GoogleTranslateService->translate($v['content'], $v['lang'], $v['langConfig']['lang']);
                if (!$content) {
                    //翻译失败
                    $this->edit(['id' => $v['id']]);
                    continue;
                }
                $this->edit(['id' => $v['id'], 'content' => $content, 'status' => 1]);
            } catch (Exception $e) {
                $this->edit(['id' => $v['id']]);
                return ['code' => -2, 'msg' => '翻译接口异常,请休息下', 'err' => $e->getMessage()];
            }
        }
        return ['code' => 2, 'msg' => '翻译成功'];
    }

    //获取单条数据
    public function getData($id, $where = [], $field = '*')
    {
        $where['id'] = intval($id);
        return $this->field($field)->where($where)->getOne();
    }

    //新增
    public function add(array $data = []): int
    {
        $data['create_time'] = $data['modify_time'] = SYS_TIME;
        return $this->insert($data);
    }

    //编辑
    public function edit(array $data, array $where = [])
    {
        if (isset($data['id'])) {
            $where['id'] = intval($data['id']);
            unset($data['id']);
        }
        $data['modify_time'] = SYS_TIME;
        return $this->where($where)->update($data);
    }

    /**
     * 删除
     * @param $id
     * @return array
     */
    public function delById($id): array
    {
        $data = $this->where(['id' => intval($id)])->getOne();
        if (!$data) {
            return ['code' => -2, 'msg' => '未找到数据'];
        }
        $res = $this->edit(['id' => $data['id'], 'status' => -1]);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
