<?php

namespace asura\db;

use PDO;
use PDOException;
use asura\Loader;

class DB
{
    private static $db = [];        //pdo连接
//    private static $dbKey = '';    //分库时有效 对应数据库配置文件分库的key值,用于Model类调用

    /**
     * 获取数据连接
     * @param string $key 数据库配置键值
     * @return object
     */
    final public static function getDB(string $key)
    {
//        $config = Loader::config($key);
//        switch ($config['deploy']) {
//            case 1:
//                //单一部署
//                return self::$db[$key] ?? self::$db[$key] = self::newPDO($config);
//            case 2:
//                //分库部署
//                $dbKey = self::$dbKey;
//                return self::$db[$key][$dbKey] ?? self::$db[$key][$dbKey] = self::newPDO($config + $config[$dbKey]);
//            default:
//                throw new PDOException("PDOError:config exception!");
//        }
        return self::$db[$key] ?? self::$db[$key] = self::newPDO(Loader::config($key));
    }

    /**
     * 获取PDO实例
     * @param array $db_config 数据库连接dsn配置
     * @return PDO
     */
    final public static function newPDO(array $db_config): PDO
    {
        $db_config['options'][PDO::MYSQL_ATTR_INIT_COMMAND] = 'SET NAMES ' . $db_config['charset'];
        return new PDO(
            "{$db_config['type']}:host={$db_config['host']};port={$db_config['port']};dbname={$db_config['dbname']};charset={$db_config['charset']}", $db_config['username'], $db_config['password'], $db_config['options']
        );
    }

//    /**
//     * 设置分库key
//     * @param $key
//     */
//    final public static function setDBKey($key)
//    {
//        self::$dbKey = $key;
//    }

    /**
     * getPDOError 捕获PDO错误信息
     */
    final public static function PDOError($stmt, $param = [])
    {
        $error = $stmt->errorInfo();
        if ($error[0] !== '00000')
            throw new PDOException('sql:' . $stmt->queryString . '|param:' . json_encode($param) . '|PDOError: ' . $error[2] . '|errorCode:' . $error[0], $error[0]);
    }

    /**
     * 开启事务
     * @param  PDO $dbh  pdo数据库链接
     * @return PDO       返回数据库连接用于 提交--$dbh->commit();回滚--$dbh->rollBack();
     */
    final public static function begin(PDO $dbh)
    {
        $dbh->inTransaction() or $dbh->beginTransaction();
        return $dbh;
    }

    /**
     * 关闭数据库连接(默认关闭全部连接)
     * @param string $key   数据库配置键 传key时关闭对应key的数据库连接
     */
    final public static function destructDB(string $key = 'ALL')
    {
        if ($key == 'ALL') {
            self::closeTransaction(self::$db);
            self::$db = [];
        } else {
            if (isset(self::$db[$key])) {
                self::closeTransaction(self::$db[$key]);
                unset(self::$db[$key]);
            }
        }
    }

    /**
     * 关闭事务
     * @param $dbh
     */
    final public static function closeTransaction($dbh)
    {
        if (is_array($dbh)) {
            foreach ($dbh as $v) {
                self::closeTransaction($v);
            }
        } else {
            if ($dbh->inTransaction())
                $dbh->rollBack();
        }
    }

}
