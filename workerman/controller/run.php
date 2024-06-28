<?php

namespace workerman\controller;

use asura\Loader;
use asura\Log;
use GatewayWorker\Register;
use GatewayWorker\Gateway;
use GatewayWorker\BusinessWorker;

class run
{
    private $config = [];

    public function __construct()
    {
        //修改日志目录
        Log::$log_path = DATA_PATH . DS . 'log' . DS . 'WebSocket';
        $this->config = Loader::config('WebSocket');
    }

    public function Register()
    {
        // register 服务必须是text协议
        new Register($this->config['Register'] ?? 'text://127.0.0.1:1236');
    }

    public function BusinessWorker()
    {
        $BusinessWorkerConfig = $this->config['BusinessWorker'];
        //bussinessWorker 进程
        $BusinessWorker = new BusinessWorker();
        //worker名称
        $BusinessWorker->name = $BusinessWorkerConfig['name'] ?? 'BusinessWorker';
        //bussinessWorker进程数量
        $BusinessWorker->count = $BusinessWorkerConfig['count'] ?? 4;
        //服务注册地址
        $BusinessWorker->registerAddress = $BusinessWorkerConfig['registerAddress'] ?? '127.0.0.1:1236';
        $BusinessWorker->eventHandler = $BusinessWorkerConfig['eventHandler'] ?? '\workerman\events\Events';
    }

    public function Gateway()
    {
        $GatewayConfig = $this->config['Gateway'];
        //gateway进程
        $Gateway = new Gateway($GatewayConfig['address'] ?? 'Websocket://0.0.0.0:7272', $GatewayConfig['context'] ?? []);
        //设置名称，方便status时查看
        $Gateway->name = $GatewayConfig['name'] ?? 'Gateway';
        //设置进程数，gateway进程数建议与cpu核数相同
        $Gateway->count = $GatewayConfig['count'] ?? 4;
        //分布式部署时请设置成内网ip（非127.0.0.1）
        $Gateway->lanIp = $GatewayConfig['lanIp'] ?? '127.0.0.1';
        //内部通讯起始端口。假如$gateway->count=4，起始端口为2300
        //则一般会使用2300 2301 2302 2303 4个端口作为内部通讯端口
        $Gateway->startPort = $GatewayConfig['startPort'] ?? 2300;
        //心跳间隔
        $Gateway->pingInterval = $GatewayConfig['pingInterval'] ?? 50;
        //$pingNotResponseLimit * $pingInterval 时间内，客户端未发送任何数据，断开客户端连接,建议设置1
        $Gateway->pingNotResponseLimit = $GatewayConfig['pingNotResponseLimit'] ?? 1;
        //心跳数据
        $Gateway->pingData = $GatewayConfig['pingData'] ?? '{"type":"ping"}';
        //服务注册地址
        $Gateway->registerAddress = $GatewayConfig['registerAddress'] ?? '127.0.0.1:1236';
    }
}