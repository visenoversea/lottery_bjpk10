<?php
//当前框架版本
const ASURA_VERSION = '11.0.1';
//设置时区
//const TIME_ZONE = 'Asia/Shanghai';
//const TIME_ZONE = 'America/New_York';
const TIME_ZONE = 'America/New_York';
date_default_timezone_set(TIME_ZONE);//美国德州时间
//系统路径分隔符
const DS = DIRECTORY_SEPARATOR;
//是否windows系统
//define('IS_WIN', DS === '\\');
//根目录路径
const ROOT_PATH = __DIR__;
//应用
const APP = 'app';
//定义配置目录
const CONFIG_PATH = ROOT_PATH . DS . 'config';
//应用目录
const APP_PATH = ROOT_PATH . DS . APP;
//定义数据目录(用于存放缓存，日志，上传文件等)
const DATA_PATH = ROOT_PATH . DS . 'data';
//系统请求时间(秒)
define('SYS_TIME', $_SERVER['REQUEST_TIME']);
//时间(微秒)浮点数
define('SYS_MICRO_TIME', $_SERVER['REQUEST_TIME_FLOAT']);
//静态资源地址
const STATIC_SITE = '';
//内存的使用查看
//define('SYS_MEM', memory_get_usage());
// 载入Loader类
require ROOT_PATH . DS . 'asura' . DS . 'Loader.php';
//注册系统自动加载
spl_autoload_register('\asura\Loader::autoload', true, true);
//添加命名空间
asura\Loader::addNamespace([ROOT_PATH, APP_PATH]);
//注册异常捕获
set_exception_handler(function ($e) {
    asura\err\Error::exception($e);
});
//注册错误捕获(只能捕获系统产生的一些Warning、Notice级别的Error)
set_error_handler(function ($type, $message, $file, $line) {
    asura\err\Error::handler(['type' => $type, 'message' => $message, 'file' => $file, 'line' => $line]);
});
//注册致命捕获 进程退出时捕获PHP的Fatal Error、Parse Error等错误信息
register_shutdown_function(function () {
    //获取最后发生的错误
    $e = error_get_last();
    if ($e !== null)
        asura\err\Error::handler($e);
});
asura\Loader::init();
//加载应用
asura\Loader::app();