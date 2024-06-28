<?php
/**
 * WebSocket消息推送
 */

namespace asura;

use GatewayWorker\Lib\Gateway;

class WebSocket
{
    /**
     * 构造函数
     * Model constructor.
     */
    final protected function __construct(){
        $WebSocket = Loader::config('WebSocket');
        Gateway::$registerAddress = $WebSocket['Gateway']['registerAddress'] ?? 'text://127.0.0.1:1236';
    }

    /**
     * 给单个用户发送信息
     * @param $uid
     * @param $data
     * @param string $fn
     */
    public function sendToUid($uid, $data, string $fn = 'msg')
    {
        Gateway::sendToUid($uid, json_encode(['type' => 'fn', 'fn' => $fn, 'data' => $data],JSON_UNESCAPED_UNICODE));
    }

    /**
     * Gateway给所有的用户发送消息
     * @param $data
     * @param string $fn
     * @throws \Exception
     */
    public function sendToAll($data, string $fn = 'msg')
    {
        Gateway::sendToAll(json_encode(['type' => 'fn', 'fn' => $fn, 'data' => $data],JSON_UNESCAPED_UNICODE));
    }

    /**
     * 按分组发送
     * @param $data
     * @param $group
     */
    public function sendToGroup($data, $group)
    {
        if (is_array($group)) {
            foreach ($group as $v) {
                Gateway::sendToGroup($group, json_encode(['type' => 'group', 'fn' => $v, 'data' => $data],JSON_UNESCAPED_UNICODE));
            }
        } else {
            Gateway::sendToGroup($group, json_encode(['type' => 'group', 'fn' => $group, 'data' => $data],JSON_UNESCAPED_UNICODE));
        }
    }

    /**
     * 判断用户是否在线
     * @param $uid
     * @return bool
     */
    public function isOnline($uid): bool
    {
        $res = Gateway::getClientIdByUid($uid);
        return (bool)$res;
    }

}
