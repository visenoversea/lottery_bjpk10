<?php
/**
 *用户账变
 */

namespace admin\controller;

use admin\classes\base;
use asura\Common;
use asura\Log;
use asura\Illuminate\DB;
use model\user_amount_model;
use model\user_log_model;
use model\user_model;
use model\user_bet_model;
use model\user_rebate_model;
use model\user_recharge_model;
use model\user_withdraw_model;
use Exception;

class userAmount extends base
{

    public function getList($userType = '', $virtual = '', $type = '', $title = '', $des = '', $status = '', $date_time = [], $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['status' => ['>=' => 0]];
        $userWhere = ['status' => ['>=' => 0]];
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
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $userWhere['user_name'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['user_id'] = $search_val;
            } else if ($search_key == 'key_id') {
                $where['key_id'] = $search_val;
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        $user_amount_model = user_amount_model::getInstance();
        $data = $user_amount_model->with(['user' => 'id,type,pid,layer,user_name,virtual,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_model = user_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['amount']=Common::formatAmount($v['amount']);
            $v['balance']=Common::formatAmount($v['balance']);
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
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


    public function getReportInfo()
    {
        $today=strtotime('today');
        $yesterday=strtotime('yesterday');
        $userWhere = [];
        $userWhere['type']['<'] = 10;
        $userWhere['`virtual`']['='] = 0;
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
        $data['yesterdayFirstRechargeNums'] = $user_model->where(array_merge($userWhere, ['recharge_time' => ['>=' => $yesterday, '<' => $today]]))->count();
        //充值
        $res = $user_recharge_model->sumUserAgentInfo($userWhere);
        $data['recharge'] = $res['amount'];
        $data['rechargeNums'] = $res['nums'];
        $data['rechargeUserNums'] = $res['userNums'];
        $data['rechargeGift'] = $res['gift'];
        //提现
        $res = $user_withdraw_model->sumUserAgentInfo($userWhere);
        $data['withdraw'] = $res['amount'];
        $data['withdrawNums'] = $res['nums'];
        $data['withdrawUserNums'] = $res['userNums'];
        $data['kesun'] = round($data['recharge'] - $data['withdraw'], 2);
        $where = ['create_time' => ['>=' => strtotime('today')]];
        //今日充值
        $res = $user_recharge_model->sumUserAgentInfo($userWhere, $where);
        $data['todayRecharge'] = $res['amount'];
        $data['todayRechargeNums'] = $res['nums'];
        $data['todayRechargeUserNums'] = $res['userNums'];
        $data['todayRechargeGift'] = $res['gift'];
        //今日提款
        $res = $user_withdraw_model->sumUserAgentInfo($userWhere, $where);
        $data['todayWithdraw'] = $res['amount'];
        $data['todayWithdrawNums'] = $res['nums'];
        $data['todayWithdrawUserNums'] = $res['userNums'];
        $data['todayKesun'] = round($data['todayRecharge'] - $data['todayWithdraw'], 2);
        $userWhere['create_time'] = ['>=' => $today];
        //今日注册
        $data['todayRegNums'] = $user_model->where($userWhere)->count();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data]);
    }

    public function getReportList($date_time = [])
    {
        $userWhere = [];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        if ($date_time) {
            $start_time = strtotime($date_time[0]);
            $end_time = strtotime($date_time[1]) + 86399;
        } else {
//            $start_time = strtotime(date('Y-m-01'));
            $start_time = strtotime('yesterday');
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
        $userWhere['`virtual`'] = 0;
        $user_recharge_model = user_recharge_model::getInstance();
        $user_withdraw_model = user_withdraw_model::getInstance();
        $user_model = user_model::getInstance();
        $user_rebate_model = user_rebate_model::getInstance();
        foreach ($list as $k => $v) {
            $where['create_time'] = ['BETWEEN' => [$v, $v + 86399]];
            $res = $user_recharge_model->sumUserAgentInfo($userWhere, $where);
            $recharge = $res['amount'];
            $rechargeNums = $res['nums'];
            $rechargeUserNums = $res['userNums'];
            $rechargeGift = $res['gift'];
            $res = $user_recharge_model->sumUserAgentInfo($userWhere, array_merge($where, ['is_first' => 1]));
            $firstRechargeAmount = $res['amount'];
            $firstRechargeNums = $res['userNums'];
            $res = $user_withdraw_model->sumUserAgentInfo($userWhere, $where);
            $withdraw = $res['amount'];
            $withdrawNums = $res['nums'];
            $withdrawUserNums = $res['userNums'];
            $kesun = round($recharge - $withdraw, 2);
            $res = $user_rebate_model->sumUserAgentInfo($userWhere, $where);
            $commission = $res['amount'];
            $totalProfit = round($commission, 2);
            $userNmus = $user_model->where(array_merge($userWhere, ['create_time' => ['BETWEEN' => [$v, $v + 86399]]]))->count();
            $rows[] = [
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
                'totalProfit' => $totalProfit,
                'userNums' => $userNmus
            ];
            $count['firstRechargeNums'] += $firstRechargeNums;
            $count['firstRechargeAmount'] += $firstRechargeAmount;
            $count['rechargeGift'] += $rechargeGift;
            $count['recharge'] += $recharge;
            $count['withdraw'] += $withdraw;
            $count['rechargeNums'] += $rechargeNums;
            $count['withdrawNums'] += $withdrawNums;
            $count['kesun'] += $kesun;
            $count['commission'] += $commission;
            $count['totalProfit'] += $totalProfit;
            $count['userNums'] += $userNmus;
        }
        $rows = array_reverse($rows);
        $rows[] = $count;
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $rows]);
    }

    public function getUserReport($date_time = [],$search_key = '',$search_val = '')
    {
        $search_key = trim($search_key);
        $search_val = trim($search_val);
        $userWhere = [];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        if ($date_time) {
            $start_time = strtotime($date_time[0]);
            $end_time = strtotime($date_time[1]) + 86399;
        } else {
            $start_time = strtotime('yesterday');
            $end_time = strtotime('today') + 86399;
        }

        if (!empty($search_val)) {
            if ($search_key == 'user_id') {
                $userWhere['id'] = $search_val;
            } else if ($search_key == 'agent') {
                $agent = DB::table('user')->find($search_val);
                if(!$agent){
                    $this->GlobalService->json(['code' => -2, 'msg' => '代理不存在', 'list' => []]);
                }

                $where['pid'] = ['LIKE' => $agent->pid . '%'];
            }
        }
        $list = Common::timeArr($start_time, $end_time);
        $rows = [];
        $count = [
            'date' => '统计',
            //下注金额
            'betAmount'=>0.00,
            //派奖金额
            'winAmount'=>0,
            //盈亏
            'betProfit' => 0,
            //推广人数
            'userNums' => 0
        ];
        $where = ['status' => 1];
        $userWhere['status']['>='] = 0;
        $userWhere['`virtual`'] = 0;
        $user_bet_model = user_bet_model::getInstance();
        foreach ($list as $k => $v) {
            $where['create_time'] = ['BETWEEN' => [$v, $v + 86399]];
            $res = $user_bet_model->sumUserAgentInfo($userWhere,$where);
            $betAmount = $res['betAmount'];
            $winAmount = $res['winAmount'];
            $betProfit = $winAmount - $betAmount;

            $rows[] = [
                'date' => $k,
                'betAmount' => $betAmount,
                'winAmount' => $winAmount,
                'betProfit' => $betProfit,

            ];
            $count['betAmount'] += $betAmount;
            $count['winAmount'] += $winAmount;
            $count['betProfit'] += $betProfit;

        }
        $rows = array_reverse($rows);
        $rows[] = $count;
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $rows]);
    }
}
