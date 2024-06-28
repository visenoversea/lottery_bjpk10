<?php
/**
 * Redis单例类
 */

namespace asura;

use Predis\Client;

class Redis
{
    private $client;
    private $config;

    public function __construct()
    {
        $this->config = Loader::config('redis');
        $this->client = new Client([
            //连接方式
            'scheme' => $this->config['scheme'] ?? 'tcp',
            //ip地址
            'host' => $this->config['host'] ?? '127.0.0.1',
            //默认使用数据库0-15  默认使用0
            'database' => $this->config['database'] ?? 0,
            //端口
            'port' => $this->config['port'] ?? '6379',
        ]);
    }

    /**
     * 获取Client对象实例
     * @return Client
     */
    public function getClient(): Client
    {
        return $this->client;
    }

    /**
     * 设置key-value
     * @param $key
     * @param $value
     * @param int $seconds 有效期(秒) 小于等于0-永不失效
     * @return int|mixed
     */
    public function set($key, $value, int $seconds = 86400)
    {
        if ($seconds > 0) {
            return $this->client->setex($this->config['prefix'] . $key, $seconds, json_encode($value));
        } else {
            return $this->client->set($this->config['prefix'] . $key, json_encode($value));
        }
    }

    public function setnx($key, $value, int $seconds = 86400){
        $res = $this->client->setnx($this->config['prefix'] . $key, $value);
        if($res){
            $this->client->expire($this->config['prefix'] . $key, $seconds);
        }
        return $res;
    }

    /**
     * 获取key对应$value
     * @param $key
     * @return mixed
     */
    public function get($key)
    {
        return json_decode($this->client->get($this->config['prefix'] . $key), true);
    }

    public function getDirect($key)
    {
        return $this->client->get($this->config['prefix'] . $key);
    }

    public function setDirect($key, $value, int $seconds = 86400)
    {
        $this->client->set($this->config['prefix'] . $key, $value);
        return $this->client->expire($this->config['prefix'] . $key, $seconds);
    }

    /**
     * 检测值是否存在
     * @param $key
     * @return int
     */
    public function exists($key): int
    {
        return $this->client->exists($key);
    }


    /**
     * 获取并设置
     * @param $key
     * @param $value
     * @return string
     */
    public function getset($key, $value): string
    {
        return json_decode($this->client->getset($this->config['prefix'] . $key, json_encode($value)),true);
    }

    /**
     * hash设置
     * @param string $key   键值
     * @param string $field 字段
     * @param array|mixed $value     值
     */
    public function hset(string $key, string $field, $value)
    {
        $this->client->hset($this->config['prefix'] . $key, $field, json_encode($value));
    }

    /**
     * hash设置
     * @param string $key 键值
     * @param null $field 字段
     * @return array|mixed
     */
    public function hget(string $key, $field = null)
    {
        if ($field == null) {
            $data = $this->client->hgetall($this->config['prefix'] . $key);
            foreach ($data as $k => $v) {
                $data[$k] = json_decode($v, true);
            }
            return $data;
        } else {
            return json_decode($this->client->hget($this->config['prefix'] . $key, $field), true);
        }
    }

    public function hdel(string $key, $field)
    {
        $this->client->hdel($this->config['prefix'] . $key, $field  );
    }

    /**
     * 获取所有的key
     * @param $key
     * @return array
     */
    public function hkeys($key): array
    {
        return $this->client->hkeys($this->config['prefix'] . $key);
    }

    /**
     * 获取所有的value
     * @param $key
     * @return array
     */
    public function hvals($key): array
    {
        return $this->client->hvals($this->config['prefix'] . $key);
    }

    /**
     * 设置key有效期
     * @param $key
     * @param $seconds
     * @return int
     */
    public function expire($key, $seconds): int
    {
        return $this->client->expire($this->config['prefix'] . $key, $seconds);
    }

    /**
     * 查看key有效期
     * @param $key
     * @return int (秒) -1-永久有效 -2-key不存在
     */
    public function ttl($key): int
    {
        return $this->client->ttl($this->config['prefix'] . $key);
    }

//    /**
//     * 对值的递增(值必须是数字)
//     * @param $key
//     * @param int $increment
//     * @return int
//     */
//    public function incrby($key, int $increment = 1): int
//    {
//        return $this->client->incrby($this->config['prefix'] . $key, $increment);
//    }
//
//    /**
//     * 对值的递减(值必须是数字)
//     * @param $key
//     * @param int $decrement
//     * @return int
//     */
//    public function decrby($key, int $decrement = 1): int
//    {
//        return $this->client->decrby($this->config['prefix'] . $key, $decrement);
//    }

    /**
     * 模糊查找,支持*号以及?号(匹配一个字符)
     * @param $pattern
     * @return array
     */
    public function keys($pattern): array
    {
        return $this->client->keys($this->config['prefix'] . $pattern);
    }

    /**
     * 随机返回一个key
     * @return string
     */
    public function randomkey(): string
    {
        return $this->client->randomkey();
    }

    /**
     * 删除指定key      不支持模糊查找
     * @param $key
     * @return int
     */
    public function del($key): int
    {
        return $this->client->del($this->config['prefix'] .$key);

        if (!$key) {
            return 0;
        }
        $keys = $this->keys($key);
        if ($keys) {
            return $this->client->del($keys);
        }
        return 0;
    }

    /**
     * 返回记录数
     * @return int
     */
    public function dbsize(): int
    {
        return $this->client->dbsize();
    }

    /**
     * 左边插入队列
     * @param $key
     * @param $values       字符串数组都可以  $batch=true时必须为数组
     * @param bool $batch   是否批量插入
     * @return int
     */
    public function push($key, $values, bool $batch = false): int
    {
        if ($batch && is_array($values)) {
            $data = [];
            foreach ($values as $v) {
                $data[] = json_encode($v);
            }
            return $this->client->lpush($this->config['prefix'] .$key, $data);
        } else {
            return $this->client->lpush($this->config['prefix'] .$key, json_encode($values));
        }
    }

    /**
     * 右边插入队列
     * @param $key
     * @param $values       字符串数组都可以  $batch=true时必须为数组
     * @param bool $batch   是否批量插入
     * @return int
     */
    public function rpush($key, $values, bool $batch = false): int
    {
        if ($batch && is_array($values)) {
            $data = [];
            foreach ($values as $v) {
                $data[] = json_encode($v);
            }
            return $this->client->rpush($this->config['prefix'] .$key, $data);
        } else {
            return $this->client->rpush($this->config['prefix'] .$key, json_encode($values));
        }
    }

    /**
     * 左边出队列
     * 队列操作
     */
    public function lpop($key)
    {
        return json_decode($this->client->lpop($this->config['prefix'] .$key),true);
    }

    /**
     * 右边出队列
     * 队列操作
     */
    public function pop($key)
    {
        return json_decode($this->client->rpop($this->config['prefix'] .$key),true);
    }

    /**
     * 返回队列长度
     * @param $key
     * @return int
     */
    public function llen($key): int
    {
        return $this->client->llen($this->config['prefix'] .$key);
    }

    /**
     * 指定操作的数据库
     * @param $database 默认0 0-15
     * @return mixed
     */
    public function select($database = 0)
    {
        return $this->client->select($database);
    }

    /**
     * 清空当前库
     * @return mixed
     */
    public function flushdb()
    {
        return $this->client->flushdb();
    }

    /**
     * 查看redis信息
     * @return array
     */
    public function info(): array
    {
        return $this->client->info();
    }

}
