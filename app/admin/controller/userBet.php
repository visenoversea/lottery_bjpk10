<?php
/**
 *用户银行卡
 */

namespace admin\controller;

use admin\classes\base;
use model\user_bet_item_model;
use model\user_bet_model;
use model\user_model;

class userBet extends base
{
    public function getList($userType = '',$virtual = '', $status = '',$open_expect='',$order_no='', $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
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
        if ($status !== '') {
            $where['status'] = intval($status);
        }
        if ($open_expect !== '') {
            $where['open_expect'] = ['LIKE' => '%' . $open_expect . '%'];
        }
        if ($order_no !== '') {
            $where['order_no'] = ['LIKE' => '%' . $order_no . '%'];
        }
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $userWhere['user_name'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['user_id'] = $search_val;
            } else if ($search_key == 'card_number') {
                $where['card_number'] = ['LIKE' => '%' . $search_val . '%'];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        $user_bet_model = user_bet_model::getInstance();
        $data = $user_bet_model
            ->with([
                'lottery'=>'id,name',
                'user' => 'id,type,pid,layer,user_name,virtual,status'
            ])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_model = user_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function getItemList($id)
    {
        $user_bet_item_model = user_bet_item_model::getInstance();
        $list = $user_bet_item_model->where(['user_bet_id' => intval($id), 'status' => 1])->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    //查看详情
    public function getList2($userType = '',$virtual = '', $status = '',$open_expect='',$order_no='', $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['status' => ['>=' => 0]];
        $userWhere = ['status' => ['>=' => 0]];
        $userBetWhere=[];
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
            $userBetWhere['status'] = intval($status);
        }else{
            $userBetWhere = ['status' => ['>=' => 0]];
        }
        if ($open_expect !== '') {
            $userBetWhere['open_expect'] = ['LIKE' => '%' . $open_expect . '%'];
        }
        if ($order_no !== '') {
            $userBetWhere['order_no'] = ['LIKE' => '%' . $order_no . '%'];
        }
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $userWhere['user_name'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['user_id'] = $search_val;
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        $user_bet_item_model = user_bet_item_model::getInstance();
        $data = $user_bet_item_model->with([
            'lottery'=>'id,name',
            'user' => 'id,type,pid,layer,user_name,virtual,status',
            'userBet' => 'id,order_no,open_expect,open_code,status',
        ])->where($where)
            ->hasWhere('user', $userWhere)
            ->hasWhere('userBet',$userBetWhere)
            ->order('id DESC')->limit($limit, $page)->getListInfo();
        $user_model = user_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    //取消订单
//    public function cancel($id)
//    {
//
//    }
//
//    public function del($id)
//    {
//        $user_bet_model = user_bet_model::getInstance();
//        $res = $user_bet_model->delById($id);
//        $this->GlobalService->json($res);
//    }

}
