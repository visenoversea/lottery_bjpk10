<?php
/**
 *用户提现
 */

namespace admin\controller;

use admin\classes\base;
use asura\Common;
use asura\Log;
use model\level_model;
use model\user_amount_model;
use model\user_balance_model;
use model\user_log_model;
use model\user_model;
use model\user_withdraw_model;
use model\user_wallet_model;
use Exception;
use service\DPayService;
use service\XuPayService;

class userWithdraw extends base
{

    public function getList($userType = '', $virtual = '', $order_no = '',$min = '', $max = '',  $status = '', $date_time = [], $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
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
        //是否虚拟号
        if ($virtual !== '') {
            $userWhere['virtual'] = intval($virtual);
        }
        if ($status !== '') {
            $where['status'] = intval($status);
        }
        if ($order_no !== '') {
            $where['order_no'] = ['LIKE' => '%' . trim($order_no) . '%'];
        }
        if ($min !== '') {
            $where['amount']['>='] = floatval($min);
        }
        if ($max !== '') {
            $where['amount']['<='] = floatval($max);
        }
        if ($date_time) {
            $where['review_time']['>='] = strtotime($date_time[0]);
            $where['review_time']['<='] = strtotime($date_time[1]);
        }
        $user_model = user_model::getInstance();
        $userWhere2 = [];
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
        $user_withdraw_model = user_withdraw_model::getInstance();
        $data = $user_withdraw_model->with(['user' => 'id,type,pid,layer,user_name,virtual,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->hasWhere('user', $userWhere2,'OR')
            ->order('id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $numsCache=[];
        foreach ($data['list'] as $k => $v) {
            if (!isset($numsCache[$v['user_id']])) {
                $numsCache[$v['user_id']] = $user_withdraw_model->where(['user_id' => $v['user_id'], 'del'=>0,'status' => ['>' => 0]])->count();
            }
            $v['nums'] = $numsCache[$v['user_id']];
            $v['apply_amount'] = Common::formatAmount($v['apply_amount']);
            $v['amount'] = Common::formatAmount($v['amount']);
            $v['real_amount'] = Common::formatAmount($v['real_amount']);
            $v['fee'] = Common::formatAmount($v['fee']);
            $v['rate'] = Common::formatAmount($v['rate']);
            $v['info'] = json_decode($v['info'], true);
            $v['agentList'] = $user_model->getAgent($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $where['status'] = 1;
        $userWhere['virtual'] = 0;
        $res = $user_withdraw_model->field('SUM(real_amount) AS amount')
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->hasWhere('user', $userWhere2,'OR')
            ->getOne();
        $where['status'] = ['>' => 1];
        $totalAmount = $res['amount'] ? round($res['amount'], 2) : '0.00';
        $res = $user_withdraw_model->field('SUM(amount) AS amount')
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->hasWhere('user', $userWhere2,'OR')
            ->getOne();
        $reviewAmount = $res['amount'] ? round($res['amount'], 2) : '0.00';
        $this->GlobalService->json(['code' => 1, 'msg' => '成功',
            'list' => $data['list'],
            'total' => $data['total'],
            'totalAmount'=>$totalAmount,
            'reviewAmount'=>$reviewAmount,
        ]);
    }

    public function edit($id, $real_amount, $reason, $remark)
    {
        $data = [
            'id' => intval($id),
            'real_amount' => trim($real_amount),
            'reason' => trim($reason),
            'remark' => trim($remark)
        ];
        $user_withdraw_model = user_withdraw_model::getInstance();
        $res = $user_withdraw_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑用户提现信息', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    //审核
    public function review($id, $status, $reason = '')
    {
        $user_withdraw_model = user_withdraw_model::getInstance();
        $userWithdraw = $user_withdraw_model->where(['id' => intval($id), 'del' => 0])->getOne();
        if (!$userWithdraw) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的订单']);
        }
        if ($userWithdraw['status'] != 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作失败，只能处理待审核订单']);
        }
        $adminUser = $this->GlobalService->getUser();
        $data = [
            'id' => intval($id),
            'reason' => '',
            'review_time' => SYS_TIME,
            'operator' => $adminUser['user_name'],
            'status' => intval($status)
        ];
        if ($data['status'] == 0) {
            //审核不通过
            $data['reason'] = trim($reason);
        } else if ($data['status'] == 1) {
            $data['reason'] = '';
            $data['real_amount'] = $userWithdraw['amount'];
        } else {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作失败，变更状态异常']);
        }
        $dbh = $user_withdraw_model->begin();
        try {
            $res = $user_withdraw_model->edit($data, ['status' => 2]);
            if (!$res) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '操作失败,状态以变更']);
            }
            if ($data['status'] == 0) {
                //审核不通过
                $user_model = user_model::getInstance();
                $res = $user_model->changeBalance($userWithdraw['user_id'], $userWithdraw['apply_amount'], $userWithdraw['title'], '提现驳回', 2, $userWithdraw['id']);
                
                $user = $res['user'];
                $level_model = level_model::getInstance();
                $res = $level_model->upLevel($user);
                //判断上级代理升级
                if ($res['code'] == 1) {
                    $agentList = $user_model->getAgentList($user['pid']);
                    if ($agentList) {
                        $level_model->upAgentLevel($agentList);
                    }
                }
            }
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('审核用户提现订单', $data);
            /*********添加日志*********/
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userWithdrawReview');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    public function setRemark($id, $remark = '')
    {
        $data = [
            'id' => intval($id),
            'remark' => trim($remark)
        ];
        $user_withdraw_model = user_withdraw_model::getInstance();
        $res = $user_withdraw_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑用户提现备注', $data);
            /*********添加日志*********/
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '编辑成功']);
    }

    //XuPay支付
    public function XuPay($id)
    {
        $user_withdraw_model = user_withdraw_model::getInstance();
        $userWithdraw = $user_withdraw_model->where(['id' => intval($id), 'del' => 0])->getOne();
        if (!$userWithdraw) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的订单']);
        }
        if ($userWithdraw['status'] != 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作失败，只能处理待审核订单']);
        }
        if ($userWithdraw['currency'] !== 'USDT') {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作失败，当前只支持USDT出款']);
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $userWithdraw['user_id']])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
        }
        if ($user['status'] < 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户状态异常无法出款']);
        }
        if ($user['virtual'] == 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '无法给虚拟号提现']);
        }
        $info = json_decode($userWithdraw['info'], true);
        //查地址是否一致
        $user_wallet_model = user_wallet_model::getInstance();
        $one = $user_wallet_model->field('id')->where(['user_id'=>$user['id'],'chain' => $info['chain'],'address'=> $info['address'],'status'=>1])->getOne();
        if(!$one){
            $this->GlobalService->json(['code' => -2, 'msg' => '用户绑定的钱包地址错误']);
        }

        $DPayService = XuPayService::getInstance();
        $res = $DPayService->withdrawal($userWithdraw['id'], $userWithdraw['user_id'], $userWithdraw['order_no'], $userWithdraw['amount'], $info['chain'], $info['address']);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $info['data'] = $res['data'];
        $adminUser = $this->GlobalService->getUser();
        $data = [
            'id' => $userWithdraw['id'],
            'info' => json_encode($info, JSON_UNESCAPED_UNICODE),
            'operator' => $adminUser['user_name'],
            'status' => 3
        ];
        $res = $user_withdraw_model->edit($data, ['status' => 2]);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('XuPay出款', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '操作成功，请等待出款']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '操作失败，请重试']);
    }

    //Dpay支付
    public function DPay($id)
    {
        return '' ;
        $user_withdraw_model = user_withdraw_model::getInstance();
        $userWithdraw = $user_withdraw_model->where(['id' => intval($id), 'del' => 0])->getOne();
        if (!$userWithdraw) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的订单']);
        }
        if ($userWithdraw['status'] != 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作失败，只能处理待审核订单']);
        }
        if ($userWithdraw['currency'] !== 'USDT') {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作失败，当前只支持USDT出款']);
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $userWithdraw['user_id']])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
        }
        if ($user['status'] < 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户状态异常无法出款']);
        }
        if ($user['virtual'] == 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '无法给虚拟号提现']);
        }
        $info = json_decode($userWithdraw['info'], true);
        $DPayService = DPayService::getInstance();
        $res = $DPayService->withdrawal($userWithdraw['id'], $userWithdraw['user_id'], $userWithdraw['order_no'], $userWithdraw['amount'], $info['chain'], $info['address']);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $info['data'] = $res['data'];
        $adminUser = $this->GlobalService->getUser();
        $data = [
            'id' => $userWithdraw['id'],
            'info' => json_encode($info, JSON_UNESCAPED_UNICODE),
            'operator' => $adminUser['user_name'],
            'status' => 3
        ];
        $res = $user_withdraw_model->edit($data, ['status' => 2]);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('DPay出款', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '操作成功，请等待出款']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '操作失败，请重试']);
    }

    public function del($id)
    {
        $user_withdraw_model = user_withdraw_model::getInstance();
        $res = $user_withdraw_model->delById($id);
        $this->GlobalService->json($res);
    }

}
