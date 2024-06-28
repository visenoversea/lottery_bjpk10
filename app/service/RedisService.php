<?php

namespace service;

use asura\Redis;

/**
 * 应用redis管理
 * Class AppRedis
 */
class RedisService extends Redis
{
    private static $instance;
    public $data = [
        'loinAuth',
        'domain',
        'AlibabaCloudSts',
        'pwErr',
        'uploadLimit',
        'taskRank',
        'imgCode',
        'productList',
        'productLever',
        'productSyncLock',
        'lastUserAmountId',
        'lastUserRebateId',
        'cacheHomeUserQuantify',
        'cacheHomeRebate'
    ];

    /**
     * 获取Redis单例实例
     * @return Redis|null
     */
    public static function getInstance(): ?RedisService
    {
        return static::$instance ?? static::$instance = new static();
    }

    /**
     * 获取缓存数据
     * @param string $key
     * @param callable $func    没有缓存时执行
     * @param string $tag
     * @param int $seconds
     * @return mixed
     */
    public function getRedisData(string $key, callable $func, string $tag = '', int $seconds = 3600)
    {
        $data = $this->getData($key, $tag);
        if (!$data) {
            $data = $func();
            if ($data) {
                $this->setData($data, $key, $tag, $seconds);
            }
        }
        return $data;
    }

    /**
     * 缓存数据
     * @param $data
     * @param string $key
     * @param string $tag
     * @param int $seconds
     * @return int|mixed
     */
    public function setData($data, string $key, string $tag = '', int $seconds = 3600)
    {
        $key .= $tag;
        return $this->set($key, $data, $seconds);
    }

    /**
     * 获取数据
     * @param string $key
     * @param string $tag
     * @return mixed
     */
    public function getData(string $key, string $tag = '')
    {
        $key .= $tag;
        return $this->get($key);
    }

    public function llenData($key, $tag = '')
    {
        $key .= $tag;
        return $this->llen($key);
    }

    public function pushData($data, $key, $tag = ''): int
    {
        $key .= $tag;
        return $this->push($key,$data);
    }

    public function popData($key, $tag = '')
    {
        $key .= $tag;
        return $this->pop($key);
    }

    /**
     * 清理
     * @param $index
     * @return int
     */
    public function delData($index): int
    {
        return $this->del($index . '*');
    }

    /**
     * 禁止克隆
     */
    private function __clone(){}
}