<?php
/**
 *用户账变
 */

namespace admin\controller;

use asura\Request;
use admin\classes\base;
use asura\Common;
use asura\Log;
use model\report_model;
use model\user_amount_model;
use model\user_log_model;
use model\user_model;
use model\user_quantify_model;
use model\user_rebate_model;
use model\user_recharge_model;
use model\user_withdraw_model;
use Exception;

class userAmount extends base
{

    public function getList($userType = '', $virtual = '', $type = '', $title = '', $des = '', $status = '', $date_time = [], $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['del' => 0];
        $userWhere=[];
//        $userWhere = ['status' => ['>=' => 0]];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        if ($userType !== '') {
            $userWhere['type']['='] = intval($userType);
        }
        //是否虚拟号
        if ($virtual !== '') {
            $userWhere['virtual'] = intval($virtual);
        }
        if ($type !== '') {
            $where['type']['='] = intval($type);
        }
        if ($status !== '') {
            $where['status']['='] = intval($status);
        }
        if ($title !== '') {
            $where['title'] = ['LIKE' => '%' . trim($title) . '%'];
        }
        if ($des !== '') {
            $where['des'] = ['LIKE' => '%' . trim($des) . '%'];
        }
        if ($date_time) {
            $where['create_time']['>='] = strtotime($date_time[0]);
            $where['create_time']['<='] = strtotime($date_time[1]);
        }
        $user_model = user_model::getInstance();
        $userWhere2=[];
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $userWhere['user_name'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['user_id'] = $search_val;
            } else if ($search_key == 'key_id') {
                $where['key_id'] = $search_val;
            } else if ($search_key == 'agentId') {
                $agentWhere = ['id' => intval($search_val)];
                if ($pid) {
                    $agentWhere['pid'] = ['LIKE' => $pid . '%'];
                }
                $res = $user_model->field('id,pid')
                    ->where($agentWhere)
                    ->getOne();
                if (!$res) {
                    $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'info' => ['recharge' => '0.00', 'withdraw' => '0.00', 'ks' => '0.00', 'balance' => '0.00'], 'total' => 0]);
                }
                $userWhere2['pid'] = ['LIKE' => "{$res['pid']}{$res['id']},%"];
                $userWhere2['id'] = $res['id'];
//                $where['pid'] = ['LIKE' => "{$res['pid']}{$res['id']},%"];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        if (isset($where['user_id'])) {
            $res = $user_model->field('id,suffix')
                ->where(['id' => $where['user_id']])
                ->getOne();
            if ($res) {
                $this->GlobalService->setSuffix($res['suffix']);
            }
        }
        $user_amount_model = user_amount_model::getInstance();
        $data = $user_amount_model->with(['user' => 'id,type,pid,layer,user_name,virtual,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->hasWhere('user', $userWhere2,'OR')
            ->order('create_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $v['amount']=Common::formatAmount($v['amount']);
            $v['balance']=Common::formatAmount($v['balance']);
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'],'total' => $data['total']]);
    }

    public function add($user_id, $amount, $title, $des, $status = 1)
    {
        if ($amount == '') {
            $this->GlobalService->json(['code' => -2, 'msg' => '请填写变动金额']);
        }
        if ($amount == 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '变动金额不能为0']);
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $user_id])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
        }
        if ($user['status'] < 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户状态异常无法充值']);
        }
        if ($amount < 0 && $user['balance'] < -$amount) {
            //充值负数 判断余额
            $this->GlobalService->json(['code' => -2, 'msg' => '用户余额不足']);
        }
        $dbh = $user_model->begin();
        try {
            $res = $user_model->changeBalance($user_id, $amount, $title, $des, 0, 0, $status);
            if ($res['user']['balance'] < 0) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '用户余额不足']);
            }
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '操作成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'addUserAmount');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    public function edit($id, $status)
    {
        $data = [
            'id' => intval($id),
            'status' => intval($status)
        ];
        $user_amount_model = user_amount_model::getInstance();
        $res = $user_amount_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑账变信息', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    //根据代理id获取下级用户,注册,存款,提现
    public function getAgentReport($agentId='',$dateTime = [])
    {
        $yesterday = strtotime('today');
        $today = time();
        if($dateTime){
            $today = strtotime($dateTime[1]) + 86399;
            $yesterday = strtotime($dateTime[0]);
        }
        $userWhere = [];
        $userWhere['type']['<='] = 1;
        $userWhere['virtual']['='] = 0;
        $userWhere['status']['>='] = 0;
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        $user_model = user_model::getInstance();
        if ($agentId !== '') {
            if ($pid) {
                $agent = $user_model->where(['id' => intval($agentId), 'pid' => ['LIKE' => '%'.$pid . '%']])->getOne();
            } else {
                $agent = $user_model->where(['id' => intval($agentId)])->getOne();
            }
            if (!$agent) {
                $this->GlobalService->json(['code' => -2, 'msg' => '未找到下级代理ID']);
            }
            $userWhere['pid'] = ['LIKE' => $agent['pid'] . $agent['id'] . ',%'];
        }
        $user_model = user_model::getInstance();
        $user_recharge_model = user_recharge_model::getInstance();
        $user_withdraw_model = user_withdraw_model::getInstance();
        $data = [];
        $res = $user_model->field('COUNT(*) AS nums,SUM(balance) AS balance')->where($userWhere)->getOne();
//        //会员总人数
        $data['userNums'] = $res['nums'];
//        //会员总余额
//        $data['userBalance'] = $res['balance']?:'0.00';
//        //在线会员
//        $data['onlineNums'] = $user_model->where(array_merge($userWhere, ['login_time' => ['>=' => SYS_TIME - 600]]))->count();
//        //今日新增首充人数
//        $data['todayFirstRechargeNums'] = $user_model->where(array_merge($userWhere, ['recharge_time' => ['>=' => $today]]))->count();
//        //昨日新增首充人数
//        $data['yesterdayFirstRechargeNums'] = $user_model->where(array_merge($userWhere, ['recharge_time' => ['BETWEEN' => [$yesterday, $today]]]))->count();
        //充值
//        $res = $user_recharge_model->sumUserAgentInfo($userWhere);
//        $data['recharge'] = $res['amount'];
//        $data['rechargeNums'] = $res['nums'];
//        $data['rechargeUserNums'] = $res['userNums'];
//        $data['rechargeGift'] = $res['gift'];
//        $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['real_amount' => ['>' => 0]]);
//        $data['rechargeNums'] = $res['nums'];
//        $data['rechargeUserNums'] = $res['userNums'];
        //提现
//        $res = $user_withdraw_model->sumUserAgentInfo($userWhere);
//        $data['withdraw'] = $res['amount'];
//        $data['withdrawNums'] = $res['nums'];
//        $data['withdrawUserNums'] = $res['userNums'];
//        $data['kesun'] = round($data['recharge'] - $data['withdraw'], 2);
//        //今日充值
        $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['review_time' => ['BETWEEN' => [$yesterday, $today]],'mode'=>2]);
        $data['recharge'] = $res['amount'];
        $data['rechargeNums'] = $res['nums'];
        $data['rechargeUserNums'] = $res['userNums'];
        $data['rechargeGift'] = $res['gift'];
//        //昨日充值
//        $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['review_time' => ['BETWEEN' => [$yesterday, $today]]]);
//        $data['yesterdayRecharge'] = $res['amount'];
////        $data['yesterdayRechargeNums'] = $res['nums'];
////        $data['yesterdayRechargeUserNums'] = $res['userNums'];
//        $data['yesterdayRechargeGift'] = $res['gift'];
//        $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['review_time' => ['>=' => $today], 'real_amount' => ['>' => 0]]);
//        $data['todayRechargeNums'] = $res['nums'];
//        $data['todayRechargeUserNums'] = $res['userNums'];

//        $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['review_time' => ['BETWEEN' => [$yesterday, $today]], 'real_amount' => ['>' => 0]]);
//        $data['yesterdayRechargeNums'] = $res['nums'];
//        $data['yesterdayRechargeUserNums'] = $res['userNums'];
        //今日提款
        $res = $user_withdraw_model->sumUserAgentInfo($userWhere, ['review_time' => ['BETWEEN' => [$yesterday, $today]]]);
        $data['withdraw'] = $res['amount'];
        $data['withdrawNums'] = $res['nums'];
        $data['withdrawUserNums'] = $res['userNums'];
        $data['kesun'] = round($data['recharge'] - $data['withdraw'], 2);
//        //昨日提款
//        $res = $user_withdraw_model->sumUserAgentInfo($userWhere, ['review_time' => ['BETWEEN' => [$yesterday, $today]]]);
//        $data['yesterdayWithdraw'] = $res['amount'];
//        $data['yesterdayWithdrawNums'] = $res['nums'];
//        $data['yesterdayWithdrawUserNums'] = $res['userNums'];
//        $data['yesterdayKesun'] = round($data['yesterdayRecharge'] - $data['yesterdayWithdraw'], 2);
//        //今日操作人数
//        $user_quantify_model = user_quantify_model::getInstance();
//        $res = $user_quantify_model->sumUserAgentInfo(array_merge($userWhere, ['recharge_time' => ['>' => 0]]), ['create_time' => ['>=' => $today]]);
//        $data['quantifyUserNums'] = $res['userNums'];
//        //昨日操作人数
//        $user_quantify_model = user_quantify_model::getInstance();
//        $res = $user_quantify_model->sumUserAgentInfo(array_merge($userWhere, ['recharge_time' => ['>' => 0]]), ['create_time' => ['BETWEEN' => [$yesterday, $today]]]);
//        $data['yesterdayQuantifyUserNums'] = $res['userNums'];
        //今日申请提款金额
//        $res = $user_withdraw_model->alias('uw')
//            ->field('SUM(uw.apply_amount) AS amount')
//            ->hasWhere('user', $userWhere)
//            ->where(['create_time' => ['>=' => $today], 'del' => 0, 'status' => ['>' => 0]])
//            ->getOne();
//        $data['todayApplyWithdraw'] = Common::formatAmount($res['amount'],2);
//        //今日申请提款金额
//        $res = $user_withdraw_model->alias('uw')
//            ->field('SUM(uw.apply_amount) AS amount')
//            ->hasWhere('user', $userWhere)
//            ->where(['create_time' => ['>=' => strtotime('-2 day', $today)], 'del' => 0, 'status' => ['>' => 0]])
//            ->getOne();
//        $data['day3ApplyWithdraw'] = Common::formatAmount($res['amount'], 2);
//        $res = $user_withdraw_model->alias('uw')
//            ->field('SUM(uw.apply_amount) AS amount')
//            ->hasWhere('user', $userWhere)
//            ->where(['del' => 0, 'status' => 2])
//            ->getOne();
//        $data['reviewWithdraw'] = Common::formatAmount($res['amount'], 2);
        //今日注册
        $userWhere['create_time'] = ['BETWEEN' => [$yesterday, $today]];
        $data['regNums'] = $user_model->where($userWhere)->count();
//        //昨日注册
//        $userWhere['create_time'] = ['BETWEEN' => [$yesterday, $today]];
//        $data['yesterdayRegNums'] = $user_model->where($userWhere)->count();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data]);
    }


    public function getReportInfo()
    {
        $today=strtotime('today');
        $yesterday=strtotime('yesterday');
        $userWhere = [];
        $userWhere['type']['<='] = 1;
        $userWhere['virtual']['='] = 0;
        $userWhere['status']['>='] = 0;
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        $user_model = user_model::getInstance();
        $user_recharge_model = user_recharge_model::getInstance();
        $user_withdraw_model = user_withdraw_model::getInstance();
        $data = [];
        $res = $user_model->field('COUNT(*) AS nums,SUM(balance) AS balance')->where($userWhere)->getOne();
        //会员总人数
        $data['userNums'] = $res['nums'];
        //会员总余额
        $data['userBalance'] = $res['balance']?:'0.00';
        //在线会员
        $data['onlineNums'] = $user_model->where(array_merge($userWhere, ['login_time' => ['>=' => SYS_TIME - 600]]))->count();
        //今日新增首充人数
        $data['todayFirstRechargeNums'] = $user_model->where(array_merge($userWhere, ['recharge_time' => ['>=' => $today]]))->count();
        //昨日新增首充人数
        $data['yesterdayFirstRechargeNums'] = $user_model->where(array_merge($userWhere, ['recharge_time' => ['BETWEEN' => [$yesterday, $today]]]))->count();
        //充值
        $res = $user_recharge_model->sumUserAgentInfo($userWhere);
        $data['recharge'] = $res['amount'];
//        $data['rechargeNums'] = $res['nums'];
//        $data['rechargeUserNums'] = $res['userNums'];
        $data['rechargeGift'] = $res['gift'];
        $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['real_amount' => ['>' => 0]]);
        $data['rechargeNums'] = $res['nums'];
        $data['rechargeUserNums'] = $res['userNums'];
        //提现
        $res = $user_withdraw_model->sumUserAgentInfo($userWhere);
        $data['withdraw'] = $res['amount'];
        $data['withdrawNums'] = $res['nums'];
        $data['withdrawUserNums'] = $res['userNums'];
        $data['kesun'] = round($data['recharge'] - $data['withdraw'], 2);
        //今日充值
        $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['review_time' => ['>=' => $today]]);
        $data['todayRecharge'] = $res['amount'];
//        $data['todayRechargeNums'] = $res['nums'];
//        $data['todayRechargeUserNums'] = $res['userNums'];
        $data['todayRechargeGift'] = $res['gift'];
        //昨日充值
        $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['review_time' => ['BETWEEN' => [$yesterday, $today]]]);
        $data['yesterdayRecharge'] = $res['amount'];
//        $data['yesterdayRechargeNums'] = $res['nums'];
//        $data['yesterdayRechargeUserNums'] = $res['userNums'];
        $data['yesterdayRechargeGift'] = $res['gift'];
        $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['review_time' => ['>=' => $today], 'real_amount' => ['>' => 0]]);
        $data['todayRechargeNums'] = $res['nums'];
        $data['todayRechargeUserNums'] = $res['userNums'];

        $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['review_time' => ['BETWEEN' => [$yesterday, $today]], 'real_amount' => ['>' => 0]]);
        $data['yesterdayRechargeNums'] = $res['nums'];
        $data['yesterdayRechargeUserNums'] = $res['userNums'];
        //今日提款
        $res = $user_withdraw_model->sumUserAgentInfo($userWhere, ['review_time' => ['>=' => $today]]);
        $data['todayWithdraw'] = $res['amount'];
        $data['todayWithdrawNums'] = $res['nums'];
        $data['todayWithdrawUserNums'] = $res['userNums'];
        $data['todayKesun'] = round($data['todayRecharge'] - $data['todayWithdraw'], 2);
        //昨日提款
        $res = $user_withdraw_model->sumUserAgentInfo($userWhere, ['review_time' => ['BETWEEN' => [$yesterday, $today]]]);
        $data['yesterdayWithdraw'] = $res['amount'];
        $data['yesterdayWithdrawNums'] = $res['nums'];
        $data['yesterdayWithdrawUserNums'] = $res['userNums'];
        $data['yesterdayKesun'] = round($data['yesterdayRecharge'] - $data['yesterdayWithdraw'], 2);
        //今日操作人数
        $user_quantify_model = user_quantify_model::getInstance();
        $res = $user_quantify_model->sumUserAgentInfo(array_merge($userWhere, ['recharge_time' => ['>' => 0]]), ['create_time' => ['>=' => $today]]);
        $data['quantifyUserNums'] = $res['userNums'];
        //昨日操作人数
        $user_quantify_model = user_quantify_model::getInstance();
        $res = $user_quantify_model->sumUserAgentInfo(array_merge($userWhere, ['recharge_time' => ['>' => 0]]), ['create_time' => ['BETWEEN' => [$yesterday, $today]]]);
        $data['yesterdayQuantifyUserNums'] = $res['userNums'];
        //今日申请提款金额
        $res = $user_withdraw_model->alias('uw')
            ->field('SUM(uw.apply_amount) AS amount')
            ->hasWhere('user', $userWhere)
            ->where(['create_time' => ['>=' => $today], 'del' => 0, 'status' => ['>' => 0]])
            ->getOne();
        $data['todayApplyWithdraw'] = Common::formatAmount($res['amount'],2);
        //今日申请提款金额
        $res = $user_withdraw_model->alias('uw')
            ->field('SUM(uw.apply_amount) AS amount')
            ->hasWhere('user', $userWhere)
            ->where(['create_time' => ['>=' => strtotime('-2 day', $today)], 'del' => 0, 'status' => ['>' => 0]])
            ->getOne();
        $data['day3ApplyWithdraw'] = Common::formatAmount($res['amount'], 2);
        $res = $user_withdraw_model->alias('uw')
            ->field('SUM(uw.apply_amount) AS amount')
            ->hasWhere('user', $userWhere)
            ->where(['del' => 0, 'status' => 2])
            ->getOne();
        $data['reviewWithdraw'] = Common::formatAmount($res['amount'], 2);
        //今日注册
        $userWhere['create_time'] = ['>=' => $today];
        $data['todayRegNums'] = $user_model->where($userWhere)->count();
        //昨日注册
        $userWhere['create_time'] = ['BETWEEN' => [$yesterday, $today]];
        $data['yesterdayRegNums'] = $user_model->where($userWhere)->count();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data]);
    }

    public function getReportList($agentId='',$date_time = [])
    {
        $userWhere = [];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        $user_model = user_model::getInstance();
        if ($agentId !== '') {
            if ($pid) {
                $agent = $user_model->where(['id' => intval($agentId), 'pid' => ['LIKE' => $pid . '%']])->getOne();
            } else {
                $agent = $user_model->where(['id' => intval($agentId)])->getOne();
            }
            if (!$agent) {
                $this->GlobalService->json(['code' => -2, 'msg' => '未找到下级代理ID']);
            }
            $pid = $agent['pid'] . $agent['id'] . ',';
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        if ($date_time) {
            $start_time = strtotime($date_time[0]);
            $end_time = strtotime($date_time[1]) + 86399;
        } else {
            $start_time = strtotime(date('Y-m-01'));
            $end_time = strtotime('today') + 86399;
        }
        $list = Common::timeArr($start_time, $end_time);
        $rows = [];
        $count = [
            'date' => '统计',
            //首充用户
            'firstRechargeNums'=>0,
            //首充金额
            'firstRechargeAmount'=>0,
            //充值金额
            'recharge' => 0,
            //充值笔数
            'rechargeNums' => 0,
            //充值人数
            'rechargeUserNums' => '-',
            //赠送
            'rechargeGift' => 0,
            //提现金额
            'withdraw' => 0,
            //提现人数
            'withdrawNums' => 0,
            //提现笔数
            'withdrawUserNums' => '-',
            //客损
            'kesun' => 0,
            //个人收益
            'profit'=>0,
            //返佣收益
            'commission' => 0,
            //合计收益
            'totalProfit' => 0,
            //推广人数
            'userNums' => 0
        ];
        $where = ['status' => 1];
        $userWhere['status']['>='] = 0;
        $userWhere['virtual'] = 0;
        $user_recharge_model = user_recharge_model::getInstance();
        $user_withdraw_model = user_withdraw_model::getInstance();
        $user_rebate_model = user_rebate_model::getInstance();
        $user_quantify_model = user_quantify_model::getInstance();
        $report_model = report_model::getInstance();
        foreach ($list as $k => $v) {
            $md5 = md5($k . $pid);
            $res = $report_model->where(['md5' => $md5])->getOne();
            if ($res) {
                $data = json_decode($res['json'], true);
            } else {
                $where['create_time'] = ['BETWEEN' => [$v, $v + 86399]];
                $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['review_time' => ['BETWEEN' => [$v, $v + 86399]]]);
                $recharge = $res['amount'];
//            $rechargeNums = $res['nums'];
//            $rechargeUserNums = $res['userNums'];
                $rechargeGift = $res['gift'];
                $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['review_time' => ['BETWEEN' => [$v, $v + 86399]], 'real_amount' => ['>' => 0]]);
                $rechargeNums = $res['nums'];
                $rechargeUserNums = $res['userNums'];
                $res = $user_recharge_model->sumUserAgentInfo($userWhere, ['review_time' => ['BETWEEN' => [$v, $v + 86399]], 'is_first' => 1]);
                $firstRechargeAmount = $res['amount'];
                $firstRechargeNums = $res['userNums'];
                $res = $user_withdraw_model->sumUserAgentInfo($userWhere, ['review_time' => ['BETWEEN' => [$v, $v + 86399]]]);
                $withdraw = $res['amount'];
                $withdrawNums = $res['nums'];
                $withdrawUserNums = $res['userNums'];
                $kesun = round($recharge - $withdraw, 2);
                $res = $user_rebate_model->sumUserAgentInfo($userWhere, $where);
                $commission = $res['amount'];
                $res = $user_quantify_model->sumUserAgentInfo($userWhere, $where);
                $profit = $res['profit'];
                $totalProfit = round($commission + $profit, 2);
                $userNmus = $user_model->where(array_merge($userWhere, ['create_time' => ['BETWEEN' => [$v, $v + 86399]]]))->count();
                $data = [
                    'date' => $k,
                    'firstRechargeNums' => $firstRechargeNums,
                    'firstRechargeAmount' => $firstRechargeAmount,
                    'recharge' => $recharge,
                    'rechargeNums' => $rechargeNums,
                    'rechargeUserNums' => $rechargeUserNums,
                    'rechargeGift' => $rechargeGift,
                    'withdraw' => $withdraw,
                    'withdrawNums' => $withdrawNums,
                    'withdrawUserNums' => $withdrawUserNums,
                    'kesun' => $kesun,
                    'commission' => $commission,
                    'profit' => $profit,
                    'totalProfit' => $totalProfit,
                    'userNums' => $userNmus
                ];
                if ($v < (SYS_TIME - 86400 * 2)) {
                    $report_model->add(['md5' => $md5, 'remark' => $pid, 'json' => json_encode($data)]);
                }
            }
            $rows[] = $data;
            $count['firstRechargeNums'] += $data['firstRechargeNums'];
            $count['firstRechargeAmount'] += $data['firstRechargeAmount'];
            $count['rechargeGift'] += $data['rechargeGift'];
            $count['recharge'] += $data['recharge'];
            $count['withdraw'] += $data['withdraw'];
            $count['rechargeNums'] += $data['rechargeNums'];
            $count['withdrawNums'] += $data['withdrawNums'];
            $count['kesun'] += $data['kesun'];
            $count['commission'] += $data['commission'];
            $count['profit'] += $data['profit'];
            $count['totalProfit'] += $data['totalProfit'];
            $count['userNums'] += $data['userNums'];
        }
        $rows = array_reverse($rows);
        $count['firstRechargeAmount']=round($count['firstRechargeAmount'],2);
        $count['rechargeGift']=round($count['rechargeGift'],2);
        $count['recharge']=round($count['recharge'],2);
        $count['withdraw']=round($count['withdraw'],2);
        $count['kesun']=round($count['kesun'],2);
        $count['commission']=round($count['commission'],2);
        $count['profit']=round($count['profit'],2);
        $count['totalProfit']=round($count['totalProfit'],2);
        $rows[] = $count;
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $rows]);
    }

}
