<?php
/**
 * This file is part of workerman.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author walkor<walkor@workerman.net>
 * @copyright walkor<walkor@workerman.net>
 * @link http://www.workerman.net/
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 */

/**
 * 用于检测业务代码死循环或者长时间阻塞等问题
 * 如果发现业务卡死，可以将下面declare打开（去掉//注释），并执行php start.php reload
 * 然后观察一段时间workerman.log看是否有process_timeout异常
 */
//declare(ticks=1);

/**
 * 聊天主逻辑
 * 主要是处理 onMessage onClose
 */

namespace workerman\events;

use asura\Param;
use GatewayWorker\Lib\Gateway;

class Events
{
    //当客户端连接上gateway完成websocket握手时触发的回调函数。
    public static function onWebSocketConnect($client_id, $data)
    {
        $get = $data['get'];
        //用户id
        if (!empty($get['token'])) {
            $token = Param::decodeToken($get['token']);
            $user = json_decode(Param::auth($token, true), true);
            if ($user) {
                $uid = $user['id'];
                Gateway::bindUid($client_id, $uid);
                Gateway::sendToClient($client_id, json_encode(['type' => 'fn', 'fn' => 'token', 'data' => 'success']));
            } else {
                Gateway::sendToClient($client_id, json_encode(['type' => 'fn', 'fn' => 'token', 'data' => 'token is error']));
            }
        }
//        else if (isset($get['id']) && $get['id'] > 0) {
//            $uid = $get['id'];
//            Gateway::bindUid($client_id, $uid);
//            Gateway::sendToClient($client_id, json_encode(['type' => 'fn', 'fn' => 'bindUid', 'data' => 'success']));
//        }
        //发送退出登录信息
//        Gateway::closeClient($client_id);
    }

    /**
     * 有消息时
     * @param $client_id
     * @param $data
     */
    public static function onMessage($client_id, $data)
    {
        // 客户端传递的是json数据
        $data = json_decode($data, true);
        if (!$data) {
            return;
        }
        // 根据类型执行不同的业务
        switch ($data['type']) {
            //订阅分组
            case 'joinGroup':
                if (!empty($data['group'])) {
                    Gateway::joinGroup($client_id, $data['group']);
                    Gateway::sendToClient($client_id, json_encode(['type' => 'joinGroup', 'group' => $data['group'], 'data' => 'success!']));
                }
                return;
            //解绑分组
            case 'leaveGroup':
                if (!empty($data['group'])) {
                    Gateway::leaveGroup($client_id, $data['group']);
                    Gateway::sendToClient($client_id, json_encode(['type' => 'leaveGroup', 'group' => $data['group'], 'data' => 'success!']));
                }
                return;
            //心跳检测
            case 'ping':
                Gateway::sendToClient($client_id, json_encode(['type' => 'pong', 'data' => 'success']));
                return;
            //token绑定
            case 'token':
                if (!empty($data['token'])) {
                    $token = Param::decodeToken($data['token']);
                    //解析token
                    $user = json_decode(Param::auth($token, true), true);
                    if ($user) {
                        Gateway::bindUid($client_id, $user['id']);
                        Gateway::sendToClient($client_id, json_encode(['type' => 'fn', 'fn' => 'token', 'data' => 'success']));
                    } else {
                        Gateway::sendToClient($client_id, json_encode(['type' => 'fn', 'fn' => 'token', 'data' => 'token is error']));
                    }
                }
                return;
            case 'unToken':
                if (!empty($data['token'])) {
                    $token = Param::decodeToken($data['token']);
                    //解析token
                    $user = json_decode(Param::auth($token, true), true);
                    if ($user) {
                        Gateway::unbindUid($client_id, $user['id']);
                        Gateway::sendToClient($client_id, json_encode(['type' => 'fn', 'fn' => 'unToken', 'data' => 'success']));
                    } else {
                        Gateway::sendToClient($client_id, json_encode(['type' => 'fn', 'fn' => 'unToken', 'data' => 'token is error']));
                    }
                }
                return;
//            case 'bindUid':
//                if (!empty($data['id'])) {
//                    Gateway::bindUid($client_id, $data['id']);
//                    Gateway::sendToClient($client_id, json_encode(['type' => 'fn', 'fn' => 'bindUid', 'data' => 'success']));
//                }
//                return;
//            case 'unbindUid':
//                if (!empty($data['id'])) {
//                    Gateway::unbindUid($client_id, $data['id']);
//                    Gateway::sendToClient($client_id, json_encode(['type' => 'fn', 'fn' => 'unbindUid', 'data' => 'success']));
//                }
//                return;
        }
    }

    /**
     * 当客户端断开连接时
     * @param $client_id
     */
    public static function onClose($client_id)
    {
//        if(isset($_SESSION['group_id'])&&$_SESSION['group_id']>0){
//            //发送用户退出的消息
//            Gateway::sendToGroup($_SESSION['group_id'], json_encode([ 'fun' => 'logout']));
//        }
    }

}
