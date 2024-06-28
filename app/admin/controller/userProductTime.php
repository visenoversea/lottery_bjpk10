<?php
/**
 *用户限时
 */

namespace admin\controller;

use admin\classes\base;
use model\user_log_model;
use model\user_model;
use model\user_product_time_model;

class userProductTime extends base
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
        $user_product_time_model = user_product_time_model::getInstance();
        $data = $user_product_time_model
            ->with(['user' => 'id,type,pid,layer,user_name,area_code,mobile,virtual,remark,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('create_time desc')
            ->limit($limit, $page)
            ->getListInfo();
        $user_model = user_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    //风控设置
    public function setRisk($id, $riskStatus)
    {
        $user_product_time_model = user_product_time_model::getInstance();
        $userProductTime = $user_product_time_model
            ->field('id,user_id,risk_status,status')
            ->where(['id' => $id])
            ->getOne();
        if (!$userProductTime) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单不存在']);
        }
        if ($userProductTime['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '修改失败,订单已平仓']);
        }
        $adminUser = $this->GlobalService->getUser();
        $res = $user_product_time_model->edit([
            'id' => $userProductTime['id'],
            'risk_status' => intval($riskStatus),
            'operator' => $adminUser['user_name']
        ], ['status' => 1]);
        if (!$res) {
            $this->GlobalService->json(['code' => -2, 'msg' => '修改失败,订单已平仓']);
        }
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('修改风控', [
            'userProductTime' => $userProductTime,
            'risk_status' => $riskStatus
        ]);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
    }


    public function del($id)
    {
        $user_product_time_model = user_product_time_model::getInstance();
        $res = $user_product_time_model->delById($id);
        $this->GlobalService->json($res);
    }
}
