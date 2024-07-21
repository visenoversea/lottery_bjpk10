<?php
require __DIR__ . '/../vendor/autoload.php';

const TIME_ZONE = 'PRC';
date_default_timezone_set(TIME_ZONE);
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

\Workerman\Worker::$logFile = __DIR__.'/../data/log/workerServer.log';
//\Workerman\Worker::$logFile = __DIR__.'/../data/log/workerServer-'.$time.'.log';
//\Workerman\Worker::log('test');

$worker = new \Workerman\Worker();
$worker->count = 3;
$worker->name = 'lottery jobs';

//service\WorkerService::stakeProfit();
$worker->onWorkerStart = function ($worker) {
    $lotteryService = \service\LotteryService::getInstance();
    $lotteryService->lotteryData();
    $proccId = 0;
    if ($worker->id === $proccId) {
        $interval = 60 * 5;
        \Workerman\Lib\Timer::add($interval, function () use ($lotteryService) {
            $lotteryService->lotteryData();
        });

    }

    $proccId++;
    if ($worker->id === $proccId) {
        $interval = 10;
        \Workerman\Lib\Timer::add($interval, function () use ($lotteryService) {
            $lotteryService->lotterySettle();
        });
    }

    $proccId++;
    if ($worker->id === $proccId) {
        $interval = 31;
        \Workerman\Lib\Timer::add($interval, function () use ($lotteryService) {
            $lottery = DB::table('lottery')->where('id', 4)->take(1)->first();
            $kaicai = new service\SpiderService();
            $kaicai->getHistory($lottery);
        });
    }

//    $proccId++;
//    if ($worker->id === $proccId) {
//        $interval = 5;
//        \Workerman\Lib\Timer::add($interval, function () use ($lotteryService) {
//            $lotteryService->sendLotteryMsg();
//        });
//
//    }

};
\Workerman\Worker::runAll();