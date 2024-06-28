<?php
/**
 *用户账户余额
 */

namespace admin\controller;

use admin\classes\base;
use asura\Common;
use model\user_balance_model;
use model\user_model;

class userBalance extends base
{

    public function getList($hide=1,$userType = '', $virtual = '', $currency = '', $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
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
        if ($hide) {
            $where['balance'] = ['>'=>0];
        }
        if ($currency !== '') {
            $where['currency'] = ['LIKE' => '%' . trim($currency) . '%'];
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
        $user_balance_model = user_balance_model::getInstance();
        $data = $user_balance_model
            ->with([
                'user' => 'id,type,pid,layer,user_name,virtual,status',
                'product'=>'id,price,fixed'
            ])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('user_id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_model = user_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['agentList'] = $user_model->getAgent($v['user']['pid']);
            $v['balance']=Common::formatAmount($v['balance']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

}
