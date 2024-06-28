<?php
/**
 *币币兑换
 */

namespace admin\controller;

use admin\classes\base;
use asura\Common;
use model\user_exchange_model;
use model\user_model;

class userExchange extends base
{

    public function getList($userType = '', $virtual = '', $search_key = 'user_id', $search_val = '',$date_time = [], $page = 1, $limit = 15)
    {
        $where = [];
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
        $user_exchange_model = user_exchange_model::getInstance();
        $data = $user_exchange_model
            ->with(['user' => 'id,type,pid,layer,user_name,virtual,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('user_id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_model = user_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $v['from_amount']=Common::formatAmount($v['from_amount']);
            $v['to_amount']=Common::formatAmount($v['to_amount']);
            $v['from_rate']=Common::formatAmount($v['from_rate']);
            $v['to_rate']=Common::formatAmount($v['to_rate']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

}
