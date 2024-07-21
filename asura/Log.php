<?php
/**
 * 日志类
 */

//declare(strict_types=1); //严格模式
namespace asura;

class Log
{
    private static $file_size = 5242880; //日志文件大小限制  1024*1024*5---5M
    public static $log_path = DATA_PATH . DS . 'log';
    const DEBUG = 1;
    const INFO = 2;
    const NOTICE = 3;
    const EXCEPTION = 4;
    const ERR = 5;

    /**
     * 记录异常捕获信息
     * @param $e
     * @param string $name
     * @param string $other
     */
    public static function logException($e, string $name = '',$other='')
    {
        $host = $_SERVER['HTTP_HOST'] ?? $_SERVER['PWD'];
        $uri = $_SERVER['REQUEST_URI'] ?? $_SERVER['SCRIPT_NAME'];
        $data = [
            'request_url' => $host . $uri,
            'msg' => '|MSG-' . $e->getMessage() . '|CLASS-' . get_class($e),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'code' => $e->getCode(),
            'type' => 'Exception',
            'ip' => Common::getIp(),
            'run_time' => (microtime(true) - SYS_MICRO_TIME) * 1000,
            'create_time' => SYS_TIME,
            'other' => $other,
        ];
        self::log($data, Log::INFO, $name);
    }


    /**
     * 日志记录
     * @param $data
     * @param int $level    级别 debug info notice exception err
     * @param string $name  追加文件名
     */
    public static function log($data, int $level = self::INFO, string $name = '')
    {
        switch ($level) {
            case 1:
                $file = 'debug';
                break;
            case 2:
                $file = 'info';
                break;
            case 3:
                $file = 'notice';
                break;
            case 4:
                $file = 'exception';
                break;
            case 5:
                $file = 'err';
                break;
            default:
                $file = 'unknown';
        }
        if (!empty($name)) {
            $file = $file . '_' . $name;
        }
        self::write(self::$log_path . DS . date('Ymd') . DS . $file . '.log', $data);
    }

    /**
     * 写入日志
     * @param $file
     * @param $data
     */
    public static function write($file, $data)
    {
        if (is_file($file)) {
            if (filesize($file) > self::$file_size) {
                rename($file, $file . '.bak' . date('YmdHis'));
            }
        } else {
            $path = dirname($file);
            if (!is_dir($path) && !mkdir($path, 0755, true)) {
                echo 'Log failed : mkdir() Permission denied!';
                exit;
            }
        }
        if (is_array($data)) {
            $data = json_encode($data,JSON_UNESCAPED_UNICODE);
        }
        file_put_contents($file, date('Y-m-d H:i:s') . ' : ' . $data . "\n", FILE_APPEND);
    }
}
