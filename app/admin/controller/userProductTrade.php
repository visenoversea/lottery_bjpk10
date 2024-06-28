<?php
/**
 *币币交易
 */

namespace admin\controller;

use admin\classes\base;
use asura\Common;
use model\user_model;
use model\user_product_trade_model;

class userProductTrade extends base
{
    public function getList($userType = '', $virtual = '', $side = '', $order_no = '', $status = '', $date_time = [], $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
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
        if ($side !== '') {
            $where['side']['='] = intval($side);
        }
        if ($status !== '') {
            $where['status']['='] = intval($status);
        }
        if ($order_no !== '') {
            $where['order_no'] = ['LIKE' => '%' . trim($order_no) . '%'];
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
            } else if ($search_key == 'mobile') {
                $userWhere['mobile'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'email') {
                $userWhere['email'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['user_id'] = $search_val;
            } else if ($search_key == 'title') {
                $where['title'] = ['LIKE' => '%' . $search_val . '%'];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        $user_product_trade_model = user_product_trade_model::getInstance();
        $data = $user_product_trade_model
            ->with(['user' => 'id,type,pid,layer,user_name,area_code,mobile,virtual,remark,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('create_time desc')
            ->limit($limit, $page)
            ->getListInfo();
        $user_model = user_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['wt_price']=Common::formatAmount($v['wt_price']);
            $v['trade_price']=Common::formatAmount($v['trade_price']);
            $v['amount']=Common::formatAmount($v['amount']);
            $v['trade_amount']=Common::formatAmount($v['trade_amount']);
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    //取消委托订单
    public function cancel($id)
    {
        $user_product_trade_model = user_product_trade_model::getInstance();
        $userProductTrade = $user_product_trade_model->where(['id' => $id,  'del' => 0])->getOne();
        if (!$userProductTrade) {
            $this->GlobalService->json(['code' => -2, 'msg' => '委托订单不存在']);
        }
        if ($userProductTrade['status'] != 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单状态已变更，无法取消']);
        }
        $res = $user_product_trade_model->cancel($userProductTrade);
        $this->GlobalService->json($res);
    }

    public function del($id)
    {
        $user_product_trade_model = user_product_trade_model::getInstance();
        $res = $user_product_trade_model->delById($id);
        $this->GlobalService->json($res);
    }

}
