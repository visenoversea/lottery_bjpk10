<?php
//linux启动
if (strpos(strtolower(PHP_OS), 'win') === 0) {
    exit("start.php not support windows, please use start_for_win.bat\n");
}
// 检查扩展
if (!extension_loaded('pcntl')) {
    exit("Please install pcntl extension. See http://doc3.workerman.net/appendices/install-extension.html\n");
}
if (!extension_loaded('posix')) {
    exit("Please install posix extension. See http://doc3.workerman.net/appendices/install-extension.html\n");
}
ini_set('display_errors', 'on');
//设置时区
date_default_timezone_set('America/New_York');
//系统路径分隔符
const DS = DIRECTORY_SEPARATOR;
//根目录路径
define('ROOT_PATH', dirname(__DIR__));
//定义数据目录(用于存放缓存，日志，上传文件等)
const DATA_PATH = ROOT_PATH . DS . 'data';
//定义配置目录
const CONFIG_PATH = ROOT_PATH . DS . 'config';
// 载入Loader类
require ROOT_PATH . DS . 'asura' . DS . 'Loader.php';
//注册系统自动加载
spl_autoload_register('\asura\Loader::autoload', true, true);
//添加命名空间
\asura\Loader::addNamespace([ROOT_PATH]);
//开启服务
$run = new \workerman\controller\run();
$run->Register();
$run->BusinessWorker();
$run->Gateway();
//运行所有服务
\Workerman\Worker::runAll();