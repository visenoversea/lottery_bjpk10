<?php

require __DIR__ . '/../vendor/autoload.php';

const TIME_ZONE = 'America/Los_Angeles';
date_default_timezone_set(TIME_ZONE);//美国德州时间
const DS = DIRECTORY_SEPARATOR;
//系统请求时间(秒)
define('SYS_TIME', $_SERVER['REQUEST_TIME']);
//时间(微秒)浮点数
define('SYS_MICRO_TIME', $_SERVER['REQUEST_TIME_FLOAT']);
//根目录路径
define('ROOT_PATH', dirname(__DIR__));

//静态资源地址
//定义数据目录(用于存放缓存，日志，上传文件等)
const DATA_PATH = ROOT_PATH . DS . 'data';
//定义配置目录
const CONFIG_PATH = ROOT_PATH . DS . 'config';

require ROOT_PATH . DS . 'asura' . DS . 'Loader.php';
//注册系统自动加载
spl_autoload_register('\asura\Loader::autoload', true, true);

asura\Loader::init();

\Workerman\Worker::$logFile = __DIR__ . '/../data/log/workerServer.log';
//\Workerman\Worker::$logFile = __DIR__.'/../data/log/workerServer-'.$time.'.log';
//\Workerman\Worker::log('test');

service\WorkerService::stakeRebate();