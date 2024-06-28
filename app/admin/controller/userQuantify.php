<?php
/**
 *量化
 */

namespace admin\controller;

use admin\classes\base;
use asura\Common;
use model\user_model;
use model\user_quantify_model;

class userQuantify extends base
{
    public function getList($userType = '', $virtual = '', $order_no = '', $status = '', $date_time = [], $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['del' => 0];
        $userWhere = ['status' => ['>=' => 0]];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        if ($userType !== '') {
            $userWhere['type']['='] = intval($userType);
        }else{
            $userWhere['type']['<'] = 10;
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
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        $user_quantify_model = user_quantify_model::getInstance();
        $data = $user_quantify_model
            ->with(['user' => 'id,type,pid,layer,user_name,virtual,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('create_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_model = user_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['buy_price'] = Common::formatAmount($v['buy_price']);
            $v['sell_price'] = Common::formatAmount($v['sell_price']);
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function cancel($id)
    {
        $user_quantify_model=user_quantify_model::getInstance();
        $userQuantify = $user_quantify_model->where(['id' => $id,  'del' => 0])->getOne();
        if (!$userQuantify) {
            $this->GlobalService->json(['code' => -2, 'msg' => '量化订单不存在']);
        }
        if ($userQuantify['status'] != 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单状态已变更，无法取消']);
        }
        $res = $user_quantify_model->cancel($userQuantify);
        $this->GlobalService->json($res);
    }

}
