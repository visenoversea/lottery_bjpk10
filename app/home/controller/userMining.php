<?php
/**
 *用户锁仓订单
 */

namespace home\controller;

use asura\Log;
use home\classes\base;
use model\mining_model;
use model\user_mining_item_model;
use model\user_model;
use model\user_mining_model;
use Exception;

class userMining extends base
{

    //获取统计接口
    public function getTotalInfo()
    {
        $info = [
            'orderAmount'=>0.00,
            'orderNums'=>0.00,
            'totalProfitAmount'=>0.00,
        ];
        return $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
            $info = [];
        //托管资金
        $user = $this->GlobalService->getUser();
        $user_mining_model = user_mining_model::getInstance();
        $res = $user_mining_model->field('SUM(amount) AS amount,count(*) AS nums')
            ->where(['user_id' => $user['id'], 'del' => 0, 'status' => 1])->getOne();
        //托管订单金额
        $info['orderAmount'] = $res['amount'] ?: '0.00';
        //托管订单数量
        $info['orderNums'] = $res['nums'] ?: 0;
        //今日收益
        $user_mining_item_model = user_mining_item_model::getInstance();
        $res=$user_mining_item_model->field('SUM(profit_amount) AS profitAmount')
            ->where(['user_id' => $user['id'], 'create_time' => ['>=' => strtotime('today')], 'status' => 1])->getOne();
        $info['todayProfitAmount'] = $res['profitAmount'] ?: '0.00';
        //累计收益
        $res = $user_mining_model->field('SUM(profit_amount) AS profitAmount')
            ->where(['user_id' => $user['id'], 'del' => 0, 'status' => ['IN'=>[1, 2]]])->getOne();
        $info['totalProfitAmount'] = $res['profitAmount'] ?: '0.00';
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    public function getList($status = '', $page = 1, $limit = 20)
    {
        if ($limit > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过100条数据']);
        }
        $user = $this->GlobalService->getUser();
        $user_mining_model = user_mining_model::getInstance();
        $where = ['user_id' => $user['id'], 'del' => 0];
        if ($status !== '') {
            $where['status'] = intval($status);
        }
        $list = $user_mining_model->where($where)
            ->order('id DESC')
            ->limit($limit, $page)
            ->select();
        foreach ($list as $k => $v) {
            $v['lastDay']=0;
            if ($v['status'] == 1) {
                //计算剩余天数
                if ($v['end_time'] > SYS_TIME) {
                    $v['lastDay'] = ceil(($v['end_time'] - SYS_TIME) / 86400);
                }
            }
            $v['buyNums'] = $user_mining_model->where(['user_id' => $user['id'], 'mining_id' => $v['id'], 'del' => 0])->count();
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    public function getInfo($id)
    {
        $user = $this->GlobalService->getUser();
        $user_mining_model = user_mining_model::getInstance();
        $info = $user_mining_model->where(['id' => $id, 'user_id' => $user['id']])->getOne();
        if (!$info) {
            $info = (object)[];
        }else{
            $info['buyNums'] = $user_mining_model->where(['user_id' => $user['id'], 'mining_id' => $info['id'], 'del' => 0])->count();
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    //下单
    public function add($id, $amount)
    {
//        $this->GlobalService->json(['code' => -2, 'msg' => '暂未开放']);
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        if (in_array($user['status'], [3, 4])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '下单异常，详情联系客服']);
        }
        $mining_model = mining_model::getInstance();
        $user_mining_model = user_mining_model::getInstance();
        $mining = $mining_model->where(['id' => intval($id)])->getOne();
        if (!$mining) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的产品']);
        }
        if ($mining['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已停止交易']);
        }
        if ($mining['limit'] != '-1') {
            $buyNums = $user_mining_model->where(['user_id' => $user['id'], 'mining_id' => $mining['id'], 'del' => 0])->count();
            if ($buyNums >= $mining['limit']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '已超过购买次数,无法再购买产品']);
            }
        }
        $data = [];
        $data['user_id'] = $user['id'];
        $data['mining_id'] = $mining['id'];
        $data['order_no'] = 'UM' . round(microtime(true) * 1000);
        $data['title'] = $mining['title'];
        $data['day'] = $mining['day'];
        $data['min_rate'] = $mining['min_rate'];
        $data['max_rate'] = $mining['max_rate'];
        $data['now_rate'] = mt_rand($data['min_rate'] * 10000, $data['max_rate'] * 10000) / 10000;
        $data['bc_rate'] = $mining['bc_rate'];
        if(!is_numeric($amount)){
            $this->GlobalService->json(['code' => -2, 'msg' => '请输入下单金额']);
        }
        $data['amount'] = floor($amount * 100) / 100;
        if ($data['amount'] < $mining['min']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "最小金额限制:{$mining['min']}"]);
        }
        if ($mining['max'] != -1 && $data['amount'] > $mining['max']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "最大金额限制:{$mining['max']}"]);
        }
        if ($user['balance'] < $data['amount']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "余额不足"]);
        }
        $data['end_time'] = strtotime('today') + $data['day'] * 86400 + 60;
        $data['task_time'] = SYS_TIME;
        $data['status'] = 3;
        $user_model = user_model::getInstance();
        $dbh = $user_mining_model->begin();
        try {
            $data['id'] = $user_mining_model->add($data);
            $res = $user_model->changeBalance($data['user_id'], -$data['amount'], $data['title'],'买入', 10, $data['id']);
            if ($res['user']['balance'] < 0) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
            }
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '购买中', 'info' => $data]);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userMiningAdd');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    //订单赎回
    public function back($id)
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        $user_mining_model = user_mining_model::getInstance();
        $userMining = $user_mining_model->where(['id' => $id, 'user_id' => $user['id'], 'del' => 0])->getOne();
        if (!$userMining) {
            $this->GlobalService->json(['code' => -2, 'msg' => '锁仓订单不存在']);
        }
        if ($userMining['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单状态已变更']);
        }
        $res = $user_mining_model->back($userMining);
        $this->GlobalService->json($res);

    }
}
