<?php
/**
 * 文件缓存类
 */

namespace asura;

class Cache
{
    const CACHE_PATH = DATA_PATH . DS . 'cache';

    /**
     * 设置缓存数据
     * @param string $channel   频道(作用域)
     * @param string $key       关键字
     * @param $data
     */
    public static function setData(string $channel,string $key, $data)
    {
        $path = self::CACHE_PATH . DS . $channel . DS;
        if (!is_dir($path))
            mkdir($path, 0755, true);
        file_put_contents($path . md5($key) . '.cache', json_encode($data));
    }

    /**
     * 获取缓存数据
     * @param string $channel 频道(作用域)
     * @param string $key
     * @param int $expire (秒)      数据有效期 0-永久有效
     * @return mixed|null
     */
    public static function getData(string $channel, string $key, int $expire = 0)
    {
        $cache_file = self::CACHE_PATH . DS . $channel . DS . md5($key) . '.cache';
        if (is_file($cache_file) && ($expire == 0 || (SYS_TIME - filemtime($cache_file)) < $expire)) {
            return json_decode(file_get_contents($cache_file), true);
        }
        return null;
    }

    /**
     * 获取并删除数据
     * @param string $channel
     * @param string $key
     * @param int $expire
     * @return mixed|null
     */
    public static function getDataDel(string $channel, string $key, int $expire = 0)
    {
        $data = self::getData($channel, $key, $expire);
        self::delCache($channel, $key);
        return $data;
    }

    /**
     * 删除缓存数据
     * @param string $channel   频道(作用域)
     * @param string $key       关键字
     */
    public static function delCache(string $channel = '__ALL__', string $key = '__ALL__')
    {
        if ($channel === '__ALL__') {
            $path = self::CACHE_PATH . DS;
        } else {
            $path = self::CACHE_PATH . DS . $channel . DS;
        }
        if ($key === '__ALL__') {
            self::unlinkRecursive($path);
        } else {
            $cache_file = $path . md5($key) . '.cache';
            if (is_file($cache_file)) {
                unlink($cache_file);
            }
        }
    }

    /**
     * 回调的方式缓存数据
     * @param $channel      频道(作用域)
     * @param $key          关键字
     * @param $expire (秒)  数据有效期 0-永久有效
     * @param $fuc          回调函数 当数据不存在或过期则执行该函数重新获取并设置
     * @return mixed|null
     */
    public static function callData($channel, $key, $fuc, $expire = 0)
    {
        $data = self::getData($channel, $key, $expire);
        if ($data == null) {
            $data = call_user_func($fuc);
            self::setData($channel, $key, $data);
        }
        return $data;
    }

    /**
     * 递归实现删除目录下的所有的文件和文件夹
     * @param $path 要删除的目录
     * @param bool $delRoot 是否删除根目录 默认不删除
     */
    private static function unlinkRecursive($path, bool $delRoot = false): bool
    {
        if (!is_dir($path)) {
            return false;
        }
        if ($dh = opendir($path)) {
            while (($file_name = readdir($dh)) !== false) {
                if ($file_name == '.' || $file_name == '..') {
                    continue;
                }
                $file = $path . DS . $file_name;
                if (is_file($file)) {
                    unlink($file);
                } else {
                    self::unlinkRecursive($file, true);
                }
            }
            closedir($dh);
            if ($delRoot) {
                rmdir($path);//删除目录
            }
        }
        return true;
    }


}
