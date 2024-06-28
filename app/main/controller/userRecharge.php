<?php
/**
 *充值订单回调
 */

namespace main\controller;

use asura\Log;
use asura\Request;
use main\classes\base;
use model\level_model;
use model\user_model;
use model\user_rebate_model;
use model\user_recharge_model;
use service\DPayService;
use Exception;
use service\WebSocketService;
use service\XuPayService;

class userRecharge extends base
{

    public function bufa($json = '')
    {
        $post = json_decode($json, true);
        if($post){
            $this->DPay($post);
        }
    }

    public function DPay($jsonArr = [])
    {
//        $post = json_decode('{"amount":1.000000,"code":200,"sign":"A01A67056F14640D1E4DBB9AAFD9D9CF","channelType":"TRC20","stateResult":"SUCCESS","message":"交易成功","toAddress":"TUayxqgxw1RJe8SoA8jRxMds5o4pUatjUE","userId":"19866847","pOrderId":"1186394642998231040440","hx":"1c2c680afe17fd71eca3d195f912619f6784a9ca72d64cc73ea67ee8a52d64ac","money":1.000000,"fromAddress":"TLSrfQzedmNPvtpj6Ac5ZxbHm6XLoE415d","userType":"1","merchantNo":"G00282"}', true);
        //$post=json_decode('{"amount":0.98,"code":200,"sign":"64C04956ED3C6258226593D262F853F2","channelType":"TRC20","stateResult":"SUCCESS","message":"交易成功","toAddress":"TP4tq7XW4h96yEWPSnerkKhK8bUe6FQTLy","userId":"21981394","pOrderId":"577936532040581120","hx":"5bab01d61f58f261742ef20e4ae5c2adb376131832877d4f25717ff89646f952","money":0.98,"fromAddress":"TEJJeAJgzpdiAV7mcUzeXF3PdPtQsYpqEZ","userType":"1","merchantNo":"G00362"}',true);
        if($jsonArr){
            $post = $jsonArr;
        }else{
            $post = Request::post();
        }
        Log::log($post, Log::INFO, 'DPayService');
        $postSign = $post['sign'];
        $post['amount'] = number_format($post['amount'], 6, '.', '');
        $post['money'] = number_format($post['money'], 6, '.', '');
        unset($post['sign']);
        $DPayService = DPayService::getInstance();
        $res = $DPayService->checkSign($post, $postSign);
        if ($res) {
            $user_recharge_model = user_recharge_model::getInstance();
            $res = $user_recharge_model->where(['user_id' => $post['userId'], 'order_no' => $post['pOrderId']])->isExist();
            if ($res) {
                echo 'SUCCESS';
                return;
            }
            $data = [
                'user_id' => $post['userId'],
                'order_no' => $post['pOrderId'],
                'mode' => 2,
                'title' => 'USDT',
                'currency' => 'USDT',
                'rate' => '1',
                'amount' => round($post['money'], 2),
                'real_amount' => round($post['money'], 2),
                'info' => json_encode($post, JSON_UNESCAPED_UNICODE),
                'review_time' => SYS_TIME,
                'operator' => 'DPayCallBack',
                'status' => 1,
            ];
            //判断是否今日首充
            $todayTime = strtotime('today');
            $todayFirst = $user_recharge_model->where(['review_time'=>['>=' =>$todayTime],'user_id' => $user['id'], 'real_amount' => ['>' => 0], 'del' => 0, 'status' => 1])->getOne();
            $data['today_first'] = $todayFirst ? 0 : 1;
            $user_recharge_model = user_recharge_model::getInstance();
            $user_model = user_model::getInstance();
            $user = $user_model->where(['id' => $data['user_id']])->getOne();
            if (!$user) {
                $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
            }
            if ($user['recharge_time'] == 0) {
                $data['is_first'] = 1;
            }
            if($user['service_status']!=0){
                echo 'Migration Exception ERROR';
            }
            $dbh = $user_recharge_model->begin();
            try {
                $data['id'] = $user_recharge_model->add($data);
                $user_recharge_model->success($user, $data);
                (WebSocketService::getInstance())->SendAdminTips('充值到账提醒', '你有新的充值已到账', 'reviewUserRecharge', 'UserRechargeList');
                $dbh->commit();
                echo 'SUCCESS';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo 'Exception ERROR';
            }
        }
    }
    public function XuPay()
    {
        Log::log(Request::post(), Log::INFO, 'XuPayService');
//        $post = json_decode('{"amount":1.000000,"code":200,"sign":"A01A67056F14640D1E4DBB9AAFD9D9CF","channelType":"TRC20","stateResult":"SUCCESS","message":"交易成功","toAddress":"TUayxqgxw1RJe8SoA8jRxMds5o4pUatjUE","userId":"19866847","pOrderId":"1186394642998231040440","hx":"1c2c680afe17fd71eca3d195f912619f6784a9ca72d64cc73ea67ee8a52d64ac","money":1.000000,"fromAddress":"TLSrfQzedmNPvtpj6Ac5ZxbHm6XLoE415d","userType":"1","merchantNo":"G00282"}', true);
        //$post=json_decode('{"amount":0.98,"code":200,"sign":"64C04956ED3C6258226593D262F853F2","channelType":"TRC20","stateResult":"SUCCESS","message":"交易成功","toAddress":"TP4tq7XW4h96yEWPSnerkKhK8bUe6FQTLy","userId":"21981394","pOrderId":"577936532040581120","hx":"5bab01d61f58f261742ef20e4ae5c2adb376131832877d4f25717ff89646f952","money":0.98,"fromAddress":"TEJJeAJgzpdiAV7mcUzeXF3PdPtQsYpqEZ","userType":"1","merchantNo":"G00362"}',true);
        $post = Request::post();
        $postSign = $post['sign'];
        $post['amount'] = number_format($post['amount'], 8, '.', '');
        $post['money'] = number_format($post['money'], 8, '.', '');
        unset($post['sign']);
        $XuPayService = XuPayService::getInstance();
        $res = $XuPayService->checkSign($post, $postSign);
        if ($res && $post['stateResult'] == 'SUCCESS') {
            $user_recharge_model = user_recharge_model::getInstance();
            $res = $user_recharge_model->where(['user_id' => $post['userId'], 'order_no' => $post['pOrderId']])->isExist();
            if ($res) {
                echo 'SUCCESS';
                return;
            }
            $user_model = user_model::getInstance();
            $user = $user_model->where(['id' => $post['userId']])->getOne();
            if (!$user) {
                echo 'USER ERROR';
                $post['errinfo'] = 'USER ERROR';
                Log::log($post, Log::ERR, 'XuPayService');
                return;
            }
            /*********伪充值提交*********/
            $userRecharge = $user_recharge_model->where([
                'mode' => 2,
                'user_id' => $post['userId'],
                'amount' => round($post['money'], 2),
//                'create_time' => ['>' => SYS_TIME - 3600],
                'info' => ['LIKE' => '%XuPay%'],
                'del' => 0,
                'status' => 2
            ])->order('create_time desc')->getOne();
            if ($userRecharge) {
                $nums = $user_recharge_model->where(['user_id' => $user['id'], 'real_amount' => ['>' => 0],'del' => 0, 'status' => 1])->count();
                $userRecharge['info'] = json_decode($userRecharge['info'], true);
                $post['fn'] = $userRecharge['info']['fn'];
                $data = [
                    'id' => $userRecharge['id'],
                    'order_no' => $post['pOrderId'],
                    'real_amount' => round($post['money'], 2),
                    'reason' => '',
                    'operator' => 'XuPayCallBack',
                    'info' => json_encode($post, JSON_UNESCAPED_UNICODE),
                    'review_time' => SYS_TIME,
                    'is_first' => $nums + 1,
                    'status' => 1
                ];
                //判断是否今日首充
                $todayTime = strtotime('today');
                $todayFirst = $user_recharge_model->where(['review_time'=>['>=' =>$todayTime],'user_id' => $user['id'], 'real_amount' => ['>' => 0], 'del' => 0, 'status' => 1])->getOne();
                $data['today_first'] = $todayFirst ? 0 : 1;
                $success = false;
                $dbh = $user_recharge_model->begin();
                try {
                    $res = $user_recharge_model->edit($data, ['status' => 2]);
                    if (!$res) {
                        $dbh->rollBack();
                        echo 'STATUS ERROR';
                        $post['errinfo'] = 'STATUS ERROR';
                        Log::log($post, Log::ERR, 'XuPayService');
                        return;
                    }
                    $user_recharge_model->success($user, array_merge($userRecharge, $data),'XUPAY');
                    $dbh->commit();
                    $success = true;
                    echo 'SUCCESS';
                } catch (Exception $e) {
                    $dbh->rollBack();
                    $success = false;
                    echo 'Exception ERROR';
                    $post['errinfo'] = 'Exception:' . $e->getMessage();
                    Log::log($post, Log::ERR, 'XuPayService');
                }
                if($success){
                    (WebSocketService::getInstance())->SendAdminTips('充值提示', '你有一笔新的充值到账信息', 'reviewUserRecharge', 'UserRechargeList', 20000, 1);
                }
                return;
            }
            /*********伪充值提交*********/
            //判断是否有未充值的订单
            $data = [
                'user_id' => $post['userId'],
                'order_no' => $post['pOrderId'],
                'mode' => 2,
                'title' => 'XuPay',
                'currency' => 'USDT',
                'rate' => '1',
                'amount' => round($post['money'], 2),
                'real_amount' => round($post['money'], 2),
                'info' => json_encode($post, JSON_UNESCAPED_UNICODE),
                'review_time' => SYS_TIME,
                'operator' => 'XuPayCallBack',
                'status' => 1,
            ];
            //判断是否今日首充
            $todayTime = strtotime('today');
            $todayFirst = $user_recharge_model->where(['review_time'=>['>=' =>$todayTime],'user_id' => $user['id'], 'real_amount' => ['>' => 0], 'del' => 0, 'status' => 1])->getOne();
            $data['today_first'] = $todayFirst ? 0 : 1;
            $nums = $user_recharge_model->where(['user_id' => $user['id'], 'real_amount' => ['>' => 0],'del' => 0, 'status' => 1])->count();
            $data['is_first'] = $nums + 1;
            $dbh = $user_recharge_model->begin();
            try {
                $data['id'] = $user_recharge_model->add($data);
                $user_recharge_model->success($user, $data);
                (WebSocketService::getInstance())->SendAdminTips('充值提示', '你有一笔新的充值到账信息', 'reviewUserRecharge', 'UserRechargeList', 20000, 1);
                $dbh->commit();
                echo 'SUCCESS';
                Log::log(['user_id'=>$post['userId'], 'order_no'=>$post['pOrderId'], 'fromAddress'=>$post['fromAddress'],'toAddress'=>$post['toAddress'], 'money'=>$post['money'], 'status'=>'SUCCESS' ],Log::INFO, 'XuPayService');
            } catch (Exception $e) {
                $dbh->rollBack();
                echo 'Exception ERROR';
                $post['errinfo'] = 'Exception:' . $e->getMessage();
                Log::log($post, Log::ERR, 'XuPayService');
            }
        }else{
            echo "SIGN ERROR";
            $post['errinfo'] = 'SIGN ERROR';
            Log::log($post, Log::ERR, 'XuPayService');
        }
    }
}
