<?php

namespace asura\err;

use asura\Common;
use asura\Loader;
use asura\Log;
use asura\Request;
use asura\db\DB;

class Error
{
    public static $data;

    /**
     * 错误处理
     * @param $e
     */
    public static function handler($e)
    {
        self::$data = [
            'request_url' => $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],
            'msg' => $e['message'],
            'file' => $e['file'],
            'line' => $e['line'],
            'code' => $e['type'],
            'type' => 'Error',
            'ip' => Common::getIp(),
            'run_time' => (microtime(true) - SYS_MICRO_TIME) * 1000,
            'create_time' => SYS_TIME
        ];
        //关闭对应等级的错误 默认E_NOTICE
        if (self::$data['code'] == 8) {
            Log::log(self::$data, Log::NOTICE);
            return;
        }
        if (strpos(self::$data['msg'], 'stream_socket_client') !== false && strpos(strtolower(PHP_OS), 'win') !== 0) {
            //重新启动websocket
            $lockFile = ROOT_PATH . DS . 'workerman' . DS . 'lock.log';
            //10秒间隔重启
            if (!is_file($lockFile) || (SYS_TIME - filemtime($lockFile)) > 10) {
                file_put_contents($lockFile,date('Y-m-d H:i:s') . ' : ' . self::$data['msg'] . "\n", FILE_APPEND);
                $ROOT_PATH = ROOT_PATH;
                exec("php {$ROOT_PATH}/workerman/gateway.php stop");
                exec("php {$ROOT_PATH}/workerman/gateway.php start -d");
            }
        }
        self::outErr();
        exit(1);
    }

    /**
     * 注册异常处理
     * @param object $e 异常对象
     */
    public static function exception(object $e)
    {
        self::$data = [
            'request_url' => $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],
            'msg' => '|MSG-' . $e->getMessage() . '|CLASS-' . get_class($e),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'code' => $e->getCode(),
            'type' => 'Exception',
            'ip' => Common::getIp(),
            'run_time' => (microtime(true) - SYS_MICRO_TIME) * 1000,
            'create_time' => SYS_TIME
        ];
        self::outErr();
        exit(1);
    }

    /**
     * 返回错误信息
     */
    private static function outErr()
    {
        ob_clean(); //清空输出
        if (self::run() === null) {
            //日志记录
            if (self::$data['type'] === 1) {
                Log::log(self::$data, Log::ERR);
            } else {
                Log::log(self::$data, Log::EXCEPTION);
            }
            if (Loader::config('sys')['debug']) {
                if (Request::isPost()) {
                    // 是ajax请求
                    //header("Content-type: application/json;charset=utf-8");
                    echo json_encode(['code' => -2, 'msg' => 'System Error!', 'data' => self::$data], JSON_UNESCAPED_UNICODE);
                } else {
                    // 不是ajax请求
                    echo 'requestUrl:' . self::$data['request_url'] . '<br>';
                    echo 'code:' . self::$data['code'] . '<br>';
                    echo 'msg:' . self::$data['msg'] . '<br>';
                    echo 'file:' . self::$data['file'] . '<br>';
                    echo 'line:' . self::$data['line'] . '<br>';
                    echo 'type:' . self::$data['type'] . '<br>';
                    echo 'ip:' . self::$data['ip'] . '<br>';
                    echo 'runTime:' . self::$data['run_time'] . '<br>';
                }
            } else {
                if (Request::isPost()) {
                    //是ajax请求
                    //header("Content-type: application/json;charset=utf-8");
                    echo json_encode(['code' => -2, 'msg' => 'System Error!'], JSON_UNESCAPED_UNICODE);
                } else {
                    echo 'System Error!';
                }
            }
        }
        //释放数据库连接
        DB::destructDB();
    }

    /**
     * @return bool|object|void
     * @throws \Exception
     */
    private static function run()
    {
        $route = Request::getRoute();
        $file = APP_PATH . DS . $route['m'] . DS . 'err' . DS . $route['c'] . '.php';
        //判断错误执行文件是否存在
        if (!is_file($file)) return;
        return Loader::make('\\' . $route['m'] . '\\err\\' . $route['c'], [], $route['a']);
    }

}
