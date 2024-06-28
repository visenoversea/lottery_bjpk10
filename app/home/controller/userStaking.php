<?php
/**
 *用户锁仓订单
 */

namespace home\controller;

use asura\Common;
use asura\Log;
use home\classes\base;
use model\level_model;
use model\staking_model;
use model\user_amount_model;
use model\user_gift_model;
use model\user_mining_item_model;
use model\user_model;
use model\user_stake_settle_model;
use model\user_staking_model;
use Exception;
use model\user_profit_model;
use service\RedisService;

class userStaking extends base
{

    //获取统计接口
    public function getTotalInfo()
    {
        $info = [];
        //托管资金
        $user = $this->GlobalService->getUser();

        $info['balance'] = $user['balance'];
        $info['stake'] = $user['stake'];

        $user_staking_model = user_staking_model::getInstance();
        $user_profiy_model = user_profit_model::getInstance();

//        $res = $user_staking_model->field('SUM(amount) AS amount,count(*) AS nums')
//            ->whereRaw("(`status` = 1 or `status` = 3)")
//            ->where(['user_id' => $user['id'], 'del' => 0, 'currency' => 'USDT'])
//            ->getOne();

        $stakingAmount = $user['stake'] ?? 0;
        $user_profit_model = user_profit_model::getInstance();
//        $lockProfit = $user_staking_model->getUnReleasedAmount($user['id']);
        $lockProfit = 0.00;
        $lockAmount = round($stakingAmount + $lockProfit,2);
        $freeAmount = bcsub($user['balance'],$user['stake'],2) ;
        $totalAmount = round($user['balance'] + $lockProfit,2);

//        $info['orderAmount'] = 0;
//        $info['todayProfitAmount'] = 0;
//        $info['totalProfitAmount'] = 0;
        $info['totalAmount'] = $totalAmount;
        $info['freeAmount'] = $freeAmount;
        $info['lockAmount'] = $lockAmount;
//        //托管订单金额
//        $info['orderAmount'] = $stakingAmount ;

        //托管订单数量
//        $info['orderNums'] = $res['nums'] ?: 0;
        //今日收益
        $res=$user_profiy_model->field('SUM(amount) AS profitAmount')
            ->where(['user_id' => $user['id'], 'create_time' => ['>=' => strtotime('today')], 'type' => 22])->getOne();
        $info['todayProfitAmount'] = $res['profitAmount'] ?: '0.00';
        //累计收益
        $res=$user_profiy_model->field('SUM(amount) AS profitAmount')
            ->where(['user_id' => $user['id'], 'type' => 22])->getOne();
        $info['totalProfitAmount'] = $res['profitAmount'] ?: '0.00';

        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    public function getRates()
    {
        //TODO:缓存
        $staking_model = staking_model::getInstance();
        $list = $staking_model->field('id,title,rate')->where(['status'=>1])->order('id asc')->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    public function getInfo()
    {
        //TODO:缓存
        $user = $this->GlobalService->getUser();
//        可用余额，日收益率，当前已投资金额，今日收益，累计收益
        $data = [
            'freeAmount'=>$user['balance'],//可用余额
            'stakeAmount'=>$user['stake'],//当前已投资金额
//            'dailyRate'=>2,//日收益率
            'hourRate'=>0.0008,//日收益率
            'todayProfit'=>0.00,//今日收益
            'totalProfit'=>0.00,//累计收益
            'nextHourProfit'=>0.00,//累计收益
        ];
        $today = strtotime('today');
        $user_profit_model = user_profit_model::getInstance();
        $res = $user_profit_model->field('sum(`amount`) as today_profit')->where(['user_id' => $user['id'], 'create_time' => ['>='=>$today]])->getOne();
        $data['todayProfit'] = $res['today_profit'] ?? 0.00;
        $user_stake_settle = user_stake_settle_model::getInstance()->field('amount,profit')->where(['user_id'=>$user['id']])->getOne();
        $data['totalProfit'] = $user_stake_settle['profit'] ?? 0;
        $h = intval(date('H'));
        $rateInfo = staking_model::getInstance()->where(['id'=>$h])->getOne();
        $data['hourRate'] = $rateInfo['rate'];
        $data['nextHourProfit'] = bcmul($user_stake_settle['amount'],$rateInfo['rate'],4);

        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data]);
    }

    //下单
    /*public function add($id, $amount)
    {
//        if($this->systemUpgrade){
//            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
//        }
        $user = $this->GlobalService->getUser();
        if (in_array($user['status'], [3, 4])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '下单异常，详情联系客服']);
        }
        $staking_model = staking_model::getInstance();
        $user_staking_model = user_staking_model::getInstance();
        $staking = $staking_model->where(['id' => intval($id)])->getOne();
        if (!$staking) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的产品']);
        }
        if ($staking['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已停止交易']);
        }
        if ($staking['limit'] != '-1') {
            $buyNums = $user_staking_model->where(['user_id' => $user['id'], 'staking_id' => $staking['id'], 'del' => 0])->count();
            if ($buyNums >= $staking['limit']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '已超过购买次数,无法再购买产品']);
            }
        }
        $data = [];
        $data['currency'] = $staking['currency'];
        $data['user_id'] = $user['id'];
        $data['staking_id'] = $staking['id'];
        $data['order_no'] = 'UM' . round(microtime(true) * 1000);
        $data['title'] = $staking['title'];
        $data['day'] = $staking['day'];
        $data['min_rate'] = $staking['min_rate'];
        $data['max_rate'] = $staking['max_rate'];
        $data['now_rate'] = mt_rand($data['min_rate'] * 10000, $data['max_rate'] * 10000) / 10000;
        $data['bc_rate'] = $staking['bc_rate'];
        if(!is_numeric($amount)){
            $this->GlobalService->json(['code' => -2, 'msg' => '请输入下单金额']);
        }
        $data['amount'] = floor($amount * 100) / 100;
        if ($data['amount'] < $staking['min']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "最小金额限制:{$staking['min']}"]);
        }
        if ($staking['max'] != -1 && $data['amount'] > $staking['max']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "最大金额限制:{$staking['max']}"]);
        }
        $field_balance = user_model::$field_balance;

        if ($user[$field_balance] < $data['amount']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "余额不足"]);
        }
        $data['end_time'] = strtotime('today') + $data['day'] * 86400 + 60;
        $data['task_time'] = SYS_TIME;
        $data['status'] = 3;
        $user_model = user_model::getInstance();
        $dbh = $user_staking_model->begin();
        try {
            $times = $user_staking_model->where(['user_id' => $user['id'], 'currency'=>$staking['currency'], 'del' => 0, 'status' => ['IN'=>'1,2,4']])->count();
            $data['times'] = $times + 1;
            $data['id'] = $user_staking_model->add($data);
            $res = $user_model->changeBalance($data['user_id'], -$data['amount'], $data['title'],'买入', 10, $data['id'],1, $staking['currency']);
            if ($res['user'][$field_balance] < 0) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
            }
            //$level_model = level_model::getInstance(); //在cron中处理等级问题
            //$level_model->checkLevel($res['user']);
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '购买中', 'info' => $data]);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userstakingAdd');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }*/

    //余币宝转入
    public function transferIn($amount)
    {

        $amount = intval($amount);
        if($amount < 1){
            $this->GlobalService->json(['code' => -2, 'msg' => '投资最少金额为1U']);
        }
//        if($this->systemUpgrade){
//            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
//        }
        $user = $this->GlobalService->getUser();
        $redis = RedisService::getInstance();
        $lockKey = 'transferInStake:' . $user['id'];
        if(!$redis->setnx($lockKey,1,3)){
            $this->GlobalService->json(['code' => -2, 'msg' => '请求过快,请稍候再试']);
        }
        if($amount > $user['balance']){
            $this->GlobalService->json(['code' => -2, 'msg' => '输入金额超过持有余额!']);
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $user['id']])->getOne();
        if(!$user){
            $this->GlobalService->json(['code' => -1, 'msg' => '登录信息有误,请重新登录!']);
        }
        if($amount > $user['balance']){
            $this->GlobalService->json(['code' => -2, 'msg' => '输入金额超过持有余额!']);
        }

        $dbh = $user_model->begin();
        try {
            //增加质押金额
            $data['stake'] = bcadd($user['stake'],$amount,4);
            $data['balance'] = bcsub($user['balance'],$amount,4);//balance减少,影响vip层级判断
            $user_model->edit($data,['id'=>$user['id'],'stake'=>$user['stake'],'balance'=>$user['balance']]);
            //添加转出记录
            $user_staking_model = user_staking_model::getInstance();
            $staking = [
                'user_id' => $user['id'],
                'type' => 1,
                'order_no' => 'SK-'.$user['id'].'-'.time(),
                'des' => '余币宝转入',
                'amount' => $amount,
                'stake' => $data['stake'],
                'create_time' => $data['stake'],
            ];
            $id = $user_staking_model->add($staking);//添加转入记录
            $user_stake_settle_model = user_stake_settle_model::getInstance();
            $user_stake_settle = $user_stake_settle_model->where(['user_id'=>$user['id']])->getOne();
            if($user_stake_settle['amount'] == 0 || $user_stake_settle['next_settle_time'] == 0){
                $settle_amount = bcadd($user_stake_settle['tmp_amount'],$amount,4);
                $settleData = ['amount'=>$settle_amount,'last_transferin_time'=>time(), 'last_transferin_amount'=>$amount,'next_settle_time'=>time() + 3600];
                $user_stake_settle_model->edit($settleData,['user_id'=>$user['id']]);
            }else{
                $tmp_amount = bcadd($user_stake_settle['tmp_amount'],$amount,4);
                $user_stake_settle_model->edit(['tmp_amount'=>$tmp_amount,'last_transferin_time'=>time(),'last_transferin_amount'=>$amount],['user_id'=>$user['id'],'tmp_amount'=>$user_stake_settle['tmp_amount']]);
            }

            //添加账变记录
            $userAmount = [
                'user_id' => $user['id'],
                'mode' => 1,
                'type' => 20,
                'title' => '余额转到余币宝',
                'des' => '余额转到余币宝',
                'currency' => "USDT",
                'amount' => -$amount,
                'balance' => $data['balance'],
                'key_id' => $id,
                'status' => 1
            ];
            user_amount_model::getInstance()->add($userAmount);
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '转入成功', 'info' => $data]);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userstaking');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }

    }

    public function transback($orderNo,$order_no){
        if($order_no){
            $orderNo = $order_no;
        }
        $user = $this->GlobalService->getUser();
        $redis = RedisService::getInstance();
        $lockKey = 'transferOutStake:' . $user['id'];
        if(!$redis->setnx($lockKey,1,3)){
            $this->GlobalService->json(['code' => -2, 'msg' => '请求过快,请稍候再试']);
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $user['id']])->getOne();
        if(!$user){
            $this->GlobalService->json(['code' => -1, 'msg' => '登录信息有误,请重新登录!']);
        }
        $order = user_staking_model::getInstance()->where(['user_id'=>$user['id'],'order_no'=>$orderNo,'type'=>1])->getOne();
        if(!$order || $order['status'] != 1){
            $this->GlobalService->json(['code' => -2, 'msg' => '订单已赎回!']);
        }
        if($order['amount'] > $user['stake'] || $order['amount'] < 0){
            $this->GlobalService->json(['code' => -2, 'msg' => '金额异常,请联系客服!']);
        }
        $amount = $order['amount'];
        $user_stake_settle_model = user_stake_settle_model::getInstance();
        $dbh = $user_model->begin();
        try {
            $user_stake_settle = $user_stake_settle_model->where(['user_id'=>$user['id']])->getOne();
            $stakeAmount = bcadd($user_stake_settle['amount'],$user_stake_settle['tmp_amount'],4);
            if($stakeAmount < $amount){
                $dbh->rollBack();
                $this->GlobalService->json(['code' => 1, 'msg' => '赎回失败,可赎回金额不足!', 'info' => []]);
            }
            //减少质押金额
            $data['stake'] = bcsub($user['stake'],$amount,4);
            $data['balance'] = bcadd ($user['balance'],$amount,4);//余额增加,影响vip层级判断
            $user_model->edit($data,['id'=>$user['id'],'stake'=>$user['stake'],'balance'=>$user['balance']]);
            //更改订单状态为赎回
            $user_staking_model = user_staking_model::getInstance();
            $user_staking_model->edit(['status'=>2],['order_no'=>$orderNo,'user_id'=>$user['id'],'status'=>$order['status']]);

            if($user_stake_settle['tmp_amount'] > $amount){
                $tmp_amount = bcsub($user_stake_settle['tmp_amount'],$amount,4);
                $user_stake_settle_model->edit(['tmp_amount'=>$tmp_amount,'last_transferout_time'=>time(),'last_transferout_amount'=>$amount],['user_id'=>$user['id'],'tmp_amount'=>$user_stake_settle['tmp_amount']]);
            }else{
                $tmp_amount = bcsub($user_stake_settle['tmp_amount'],$amount,4);//tmp_amount不够减,负数或0
                $settle_amount = bcadd($user_stake_settle['amount'],$tmp_amount,4);
                $updateSettle = ['amount'=>$settle_amount,'last_transferout_time'=>time(),'last_transferout_amount'=>$amount];
                if($settle_amount == 0) $updateSettle['next_settle_time'] = 0;
                $user_stake_settle_model->edit($updateSettle,['user_id'=>$user['id'],'amount'=>$user_stake_settle['amount']]);
            }
            //添加账变记录
            $userAmount = [
                'user_id' => $user['id'],
                'mode' => 1,
                'type' => 21,
                'title' => '余币宝转到余额',
                'des' => '余币宝转到余额',
                'currency' => "USDT",
                'amount' => $user['stake'],
                'balance' => $data['balance'],
                'key_id' => $order['id'],
                'status' => 1
            ];
            user_amount_model::getInstance()->add($userAmount);
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '赎回成功', 'info' => $data]);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userstaking');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }

    }

    //余币宝转出
    public function transferOut($amount)
    {
        return;
        $amount = intval($amount);
        if($amount <= 0){
            $this->GlobalService->json(['code' => -2, 'msg' => '请输入正确的金额!']);
        }
//        if($this->systemUpgrade){
//            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
//        }
        $user = $this->GlobalService->getUser();
        $redis = RedisService::getInstance();
        $lockKey = 'transferOutStake:' . $user['id'];
        if(!$redis->setnx($lockKey,1,3)){
            $this->GlobalService->json(['code' => -2, 'msg' => '请求过快,请稍候再试']);
        }
        if($amount > $user['stake']){
            $this->GlobalService->json(['code' => -2, 'msg' => '输入金额超过持有金额!']);
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $user['id']])->getOne();
        if(!$user){
            $this->GlobalService->json(['code' => -1, 'msg' => '登录信息有误,请重新登录!']);
        }
        if($amount > $user['stake']){
            $this->GlobalService->json(['code' => -2, 'msg' => '输入金额超过持有金额!']);
        }

        $dbh = $user_model->begin();
        try {

            //减少质押金额
            $data['stake'] = bcsub($user['stake'],$amount,4);
            $data['balance'] = bcadd ($user['balance'],$amount,4);//余额增加,影响vip层级判断
            $user_model->edit($data,['id'=>$user['id'],'stake'=>$user['stake'],'balance'=>$user['balance']]);
            //添加转出记录
            $user_staking_model = user_staking_model::getInstance();
            $staking = [
                'user_id'=>$user['id'],
                'type' => 2,
                'order_no'=>'SK-'.$user['id'].'-'.time(),
                'des'=>'余币宝转出',
                'amount'=> -$amount,
                'stake'=>$data['stake'],
                'create_time'=>$data['stake'],
            ];
            $id = $user_staking_model->add($staking);
            //添加账变记录
            $userAmount = [
                'user_id' => $user['id'],
                'mode' => 1,
                'type' => 21,
                'title' => '余币宝转到余额',
                'des' => '余币宝转到余额',
                'currency' => "USDT",
                'amount' => $user['stake'],
                'balance' => $data['balance'],
                'key_id' => $id,
                'status' => 1
            ];
            user_amount_model::getInstance()->add($userAmount);
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '转入成功', 'info' => $data]);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userstaking');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }

    }

    public function history($page = 1, $limit = 20){
        $user = $this->GlobalService->getUser();

        $user_staking_model = user_staking_model::getInstance();
        $total = $user_staking_model->where(['user_id'=>$user['id']])->count();
        $orders = $user_staking_model->field('user_id,order_no,amount,currency,create_time,`status`')->where(['user_id'=>$user['id']])->order('id desc')->limit($limit,$page)->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $orders,'total'=>$total]);
    }

    public function profits($page = 1, $limit = 20){
        $user = $this->GlobalService->getUser();

        $user_profit_model = user_profit_model::getInstance();
        $total = $user_profit_model->where(['user_id'=>$user['id'],'type'=>22])->count();
        $orders = $user_profit_model->field('amount,calculate_amount,create_time')->where(['user_id'=>$user['id'],'type'=>22])->order('id desc')->limit($limit,$page)->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $orders,'total'=>$total]);
    }
}
