<?php
/**
 *用户锁仓挖矿
 */

namespace admin\controller;

use admin\classes\base;
use asura\Log;
use model\level_model;
use model\user_log_model;
use model\user_mining_model;
use model\user_model;
use Exception;

class userMining extends base
{
    public function getList($userType = '', $virtual = '', $order_no = '', $title = '', $status = '', $date_time = [], $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['del' => 0];
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
        if ($status !== '') {
            $where['status']['='] = intval($status);
        }
        if ($order_no !== '') {
            $where['order_no'] = ['LIKE' => '%' . trim($order_no) . '%'];
        }
        if ($title !== '') {
            $where['title'] = ['LIKE' => '%' . trim($title) . '%'];
        }
        if ($date_time) {
            $where['create_time']['>='] = strtotime($date_time[0]);
            $where['create_time']['<='] = strtotime($date_time[1]);
        }
        $where2=[];
        $user_model = user_model::getInstance();
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $userWhere['user_name'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['user_id'] = $search_val;
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
                $where2['pid'] = ['LIKE' => "{$res['pid']}{$res['id']},%"];
                $where2['id'] = $res['id'];
//                $where['pid'] = ['LIKE' => "{$res['pid']}{$res['id']},%"];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        $user_mining_model = user_mining_model::getInstance();
        $data = $user_mining_model
            ->with(['user' => 'id,type,pid,layer,user_name,level_id,virtual,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $level_model = level_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['level'] = $level_model->getData($v['user']['level_id']);
            if (!$v['level']) {
                $v['level'] = (object)[];
            }
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $v['lastDay'] = 0;
            if ($v['status'] == 1) {
                //计算剩余天数
                if ($v['end_time'] > SYS_TIME) {
                    $v['lastDay'] = ceil(($v['end_time'] - SYS_TIME) / 86400);
                }
            }
            $data['list'][$k] = $v;
        }
        $info = [];
        $userWhere['virtual'] = 0;
        $where['status'] = 1;
        $res = $user_mining_model->sumInfo($where, $userWhere, $where2);
        $info['totalAmount'] = $res['amount'];
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info, 'list' => $data['list'], 'total' => $data['total']]);
    }

    //审核
    public function review($id, $status, $reason = '')
    {
        $user_mining_model = user_mining_model::getInstance();
        $userMining = $user_mining_model->where(['id' => intval($id), 'del' => 0])->getOne();
        if (!$userMining) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的订单']);
        }
        if ($userMining['status'] != 3) {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作失败，只能处理待审核订单']);
        }
        $adminUser = $this->GlobalService->getUser();
        $data = [
            'id' => intval($id),
            'reason' => '',
            'operator' => $adminUser['user_name'],
            'status' => intval($status)
        ];
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $userMining['user_id']])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
        }
        if ($user['status'] < 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户状态异常无法操作']);
        }
        if ($data['status'] == 0) {
            //审核不通过
            $data['reason'] = trim($reason);
        } else if ($data['status'] == 1) {
            $data['reason'] = '';
        } else {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作失败，变更状态异常']);
        }
        $dbh = $user_mining_model->begin();
        try {
            $res = $user_mining_model->edit($data, ['status' => 3]);
            if (!$res) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '操作失败,状态以变更']);
            }
            if($data['status']==0){
                //审核不通过退款
                $user_model->changeBalance($userMining['user_id'], $userMining['amount'], $userMining['title'],'驳回', 10, $userMining['id']);
            }
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('审核持币生息', array_merge($userMining, $data));
            /*********添加日志*********/
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userMiningReview');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    public function redemption($id)
    {
        $user_mining_model = user_mining_model::getInstance();
        $userMining = $user_mining_model->where(['id' => $id, 'del' => 0])->getOne();
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
