<?php
/**
 *用户充值
 */

namespace admin\controller;

use admin\classes\base;
use asura\Common;
use asura\Log;
use model\level_model;
use model\user_balance_model;
use model\user_log_model;
use model\user_model;
use model\user_rebate_model;
use model\user_recharge_model;
use Exception;

class userRecharge extends base
{

    public function getList($userType = '', $virtual = '', $amountType = '',$min = '', $max = '', $layer = '', $isFirst = '', $order_no = '', $status = '', $date_time = [], $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['del' => 0];
        $userWhere = [];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        if ($userType !== '') {
            $userWhere['type']['='] = intval($userType);
        }
        if ($layer !== '') {
            $userWhere['layer'] = intval($layer);
        }
        //是否虚拟号
        if ($virtual !== '') {
            $userWhere['virtual'] = intval($virtual);
        }
        if ($isFirst !== '') {
            $where['is_first'] = intval($isFirst);
        }
        if ($amountType !== '') {
            if($amountType==1){
                $where['real_amount'] = ['>'=>0];
            }else{
                $where['real_amount'] = ['='=>0];
            }
        }
        if ($min !== '') {
            $where['amount']['>='] = floatval($min);
        }
        if ($max !== '') {
            $where['amount']['<='] = floatval($max);
        }
        if ($status !== '') {
            $where['status'] = intval($status);
        }
        if ($order_no !== '') {
            $where['order_no'] = ['LIKE' => '%' . trim($order_no) . '%'];
        }
        if ($date_time) {
            $where['review_time']['>='] = strtotime($date_time[0]);
            $where['review_time']['<='] = strtotime($date_time[1]);
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
            } else if ($search_key == 'title') {
                $where['title'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'info') {
                $where['info'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'agentId') {
                $agentWhere = ['id' => intval($search_val)];
                if ($pid) {
                    $agentWhere['pid'] = ['LIKE' => $pid . '%'];
                }
                $res = $user_model->field('id,pid')
                    ->where($agentWhere)
                    ->getOne();
                if (!$res) {
                    $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
                }
                $userWhere2['pid'] = ['LIKE' => "{$res['pid']}{$res['id']},%"];
                $userWhere2['id'] = $res['id'];
//                $userWhere['pid'] = ['LIKE' => "{$res['pid']}{$res['id']},%"];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        $user_recharge_model = user_recharge_model::getInstance();
        $data = $user_recharge_model->with(['user' => 'id,type,pid,layer,user_name,virtual,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->hasWhere('user', $userWhere2,'OR')
            ->order('id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $v['amount']=Common::formatAmount($v['amount']);
            $v['real_amount']=Common::formatAmount($v['real_amount']);
            $v['rate']=Common::formatAmount($v['rate']);
            $v['info']=json_decode($v['info'],true);
            $v['agentList'] = $user_model->getAgent($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        //统计
        $userWhere['virtual'] = 0;
        $res = $user_recharge_model->field('SUM(real_amount) AS real_amount')
            ->where($where)->hasWhere('user', $userWhere)->hasWhere('user', $userWhere2,'OR')->getOne();
        $rechargeAmount = $res['real_amount'] ? Common::formatAmount($res['real_amount'], 2) : '0.00';
        $this->GlobalService->json(['code' => 1, 'msg' => '成功','rechargeAmount'=>$rechargeAmount, 'list' => $data['list'], 'total' => $data['total']]);
    }

    //新增充值
    public function add($user_id, $title, $type = 0, $amount = '', $img = '', $remark = '')
    {
        $adminUser = $this->GlobalService->getUser();
        $info = [
            'fn' => 'System',
            'currency' => 'USDT',
            'symbol' => '',
            'rate' => '1',
            'fixed' => 2
        ];
        $data = [
            'user_id' => $user_id,
            'mode' => 1,
            'title' => $title,
            'order_no' => 'UR' . round(microtime(true) * 1000),
            'currency' => 'USDT',
            'rate' => '1',
            'amount' => $amount,
            'img' => trim($img),
            'info' => json_encode($info, JSON_UNESCAPED_UNICODE),
            'remark' => $remark,
            'review_time' => SYS_TIME,
            'operator' => $adminUser['user_name'],
            'status' => 1,
        ];
        if ($type == 1) {
            $data['real_amount'] = 0;
        } else {
            $data['real_amount'] = $data['amount'];
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $data['user_id']])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
        }
        if ($user['status'] < 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户状态异常无法充值']);
        }
        if ($data['amount'] == '') {
            $this->GlobalService->json(['code' => -2, 'msg' => '请填写充值金额']);
        }
        if ($data['amount'] == 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '充值金额不能为0']);
        }
        if ($data['amount'] < 0 && $user['balance'] < -$data['amount']) {
            //充值负数 判断余额
            $this->GlobalService->json(['code' => -2, 'msg' => '用户余额不足']);
        }
        if ($data['real_amount'] > 0 && $user['recharge_time'] == 0) {
            $data['is_first'] = 1;
        }
        $user_recharge_model = user_recharge_model::getInstance();
        $dbh = $user_recharge_model->begin();
        try {
            $data['id'] = $user_recharge_model->add($data);
            $user_recharge_model->success($user, $data);
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '充值成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'addRecharge');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    public function edit($id, $real_amount, $info, $reason, $remark)
    {
        $data = [
            'id' => intval($id),
            'info' => json_encode($info),
            'real_amount' => trim($real_amount),
            'reason' => trim($reason),
            'remark' => trim($remark)
        ];
        $user_recharge_model = user_recharge_model::getInstance();
        $res = $user_recharge_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑用户充值信息', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    //审核
    public function review($id, $status, $reason = '')
    {
        $user_recharge_model = user_recharge_model::getInstance();
        $userRecharge = $user_recharge_model->where(['id' => intval($id), 'del' => 0])->getOne();
        if (!$userRecharge) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的订单']);
        }
        if ($userRecharge['status'] != 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作失败，只能处理待审核订单']);
        }
        $adminUser = $this->GlobalService->getUser();
        $data = [
            'id' => intval($id),
            'reason' => '',
            'operator' => $adminUser['user_name'],
            'review_time' => SYS_TIME,
            'status' => intval($status)
        ];
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $userRecharge['user_id']])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
        }
        if ($user['status'] < 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户状态异常无法充值']);
        }
        if ($data['status'] == 0) {
            //审核不通过
            $data['reason'] = trim($reason);
        } else if ($data['status'] == 1) {
            $data['reason'] = '';
            $data['real_amount'] = $userRecharge['amount'];
            if ($user['recharge_time'] == 0) {
                $data['is_first'] = 1;
            }
        } else {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作失败，变更状态异常']);
        }
        $dbh = $user_recharge_model->begin();
        try {
            $res = $user_recharge_model->edit($data, ['status' => 2]);
            if (!$res) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '操作失败,状态以变更']);
            }
            if ($data['status'] == 1) {
                if ($userRecharge['currency'] == 'USDT') {
                    $user_recharge_model->success($user, $userRecharge);
                } else {
                    $this->GlobalService->json(['code' => -2, 'msg' => '操作失败,其他货币充值关闭']);
                    //其他货币充值
//                    $user_balance_model = user_balance_model::getInstance();
//                    $res = $user_balance_model->getData($userRecharge['user_id'], $userRecharge['currency']);
//                    if ($res['code'] != 1) {
//                        $dbh->rollBack();
//                        $this->GlobalService->json($res);
//                    }
//                    $userBalance = $res['data'];
//                    $user_balance_model->changeBalance($userBalance['id'], $userRecharge['amount'], $userRecharge['title'], '充值到账', 1, $userRecharge['id']);
                }
            }
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('审核用户充值订单', $data);
            /*********添加日志*********/
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userRechargeReview');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    public function del($id)
    {
        $user_recharge_model = user_recharge_model::getInstance();
        $res = $user_recharge_model->delById($id);
        $this->GlobalService->json($res);
    }

}
