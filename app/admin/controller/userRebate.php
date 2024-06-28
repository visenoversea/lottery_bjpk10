<?php
/**
 *返佣记录
 */

namespace admin\controller;

use admin\classes\base;
use asura\Common;
use model\user_model;
use model\user_rebate_model;

class userRebate extends base
{

    public function getList($userType = '', $virtual = '', $type = '', $title = '', $date_time = [], $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['status' => 1];
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
        if ($type !== '') {
            $where['type']['='] = intval($type);
        }
        if ($title !== '') {
            $where['title'] = ['LIKE' => '%' . trim($title) . '%'];
        }
        if ($date_time) {
            $where['create_time']['>='] = strtotime($date_time[0]);
            $where['create_time']['<='] = strtotime($date_time[1]);
        }
        //搜索
        $user_model = user_model::getInstance();
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
        if (isset($where['user_id'])) {
            $res = $user_model->field('id,suffix')
                ->where(['id' => $where['user_id']])
                ->getOne();
            if ($res) {
                $this->GlobalService->setSuffix($res['suffix']);
            }
        }
        $user_rebate_model = user_rebate_model::getInstance();
        $data = $user_rebate_model
            ->with(['user' => 'id,type,pid,layer,user_name,virtual,status','rebate'=>'id,user_name'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $v['amount']=Common::formatAmount($v['amount']);
            $v['agentList'] = $user_model->getAgent($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

}
