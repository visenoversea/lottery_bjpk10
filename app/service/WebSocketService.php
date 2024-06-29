<?php

namespace service;

use asura\WebSocket;

/**
 * WebSocket消息推送
 */

class WebSocketService extends WebSocket
{
    private static $instance;
    //提示信息
    private static $AdminTips = 'AdminTips';

    private static $lotteryRoom = 'lotteryRoom{id}';

    //发送Kline数据
    private static $market = 'market_{id}';
    //发送行情数据
    private static $hq = 'hq_{id}';
    //k线刷新推送
    private static $klineTime = 'klineTime_{id}_{type}';

    /**
     * 获取Redis单例实例
     * @return WebSocketService
     */
    public static function getInstance(): WebSocketService
    {
        return static::$instance ?? static::$instance = new static();
    }

    /**
     * 禁止克隆
     */
    private function __clone(){}

    //发送房间数据
    public function lotteryRoom($id, $data): array
    {
        $lotteryRoom = str_replace('{id}', $id, self::$lotteryRoom);
        $this->sendToGroup($data, $lotteryRoom);
        return ['code' => 1, 'msg' => '成功'];
    }

    /**
     * 发送充值申请通知
     * @param $id
     * @param $data
     * @return array
     */
    public function market($id, $data): array
    {
        $market = str_replace('{id}', $id, self::$market);
        $this->sendToGroup($data, $market);
        return ['code' => 1, 'msg' => '成功'];
    }

    /**
     * 发送充值申请通知
     * @param $id
     * @param $data
     * @return array
     */
    public function hq($id, $data): array
    {
        $hq = str_replace('{id}', $id, self::$hq);
        $this->sendToGroup($data, $hq);
        return ['code' => 1, 'msg' => '成功'];
    }

    /**
     * 发送K线刷新推送
     * @param $id
     * @param $type
     * @return array
     */
    public function klineTime($id, $type): array
    {
        $klineTime = str_replace(['{id}', '{type}'], [$id, $type], self::$klineTime);
        $this->sendToGroup([], $klineTime);
        return ['code' => 1, 'msg' => '成功'];
    }

    public function leverSell($user_id)
    {
        $this->sendToUid($user_id, ['code' => 1, 'msg' => '平仓杠杆订单'], 'leverSell');
    }

    public function quantify($user_id, $data = [])
    {
        $this->sendToUid($user_id, $data, 'quantify');
    }

    /**
     * 发送后台提示
     * @param string $title         标题
     * @param string $message       消息
     * @param string $auth          授权
     * @param string $routerName    跳转路由
     * @param int $duration         延迟关闭毫秒 0-不关闭
     */
    public function SendAdminTips(string $title = '', string $message = '', string $auth = '', string $routerName = '', int $duration = 20000): array
    {
        $data = [
            'title' => trim($title),
            'message' => trim($message),
            'routerName' => trim($routerName),
            'auth' => trim($auth),
            'duration' => intval($duration)
        ];
        $this->sendToGroup($data, self::$AdminTips);
        return ['code' => 1, 'msg' => '成功'];
    }



}
