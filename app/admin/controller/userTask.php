<?php
/**
 *用户任务
 */

namespace admin\controller;

use admin\classes\base;
use model\user_task_model;


class userTask extends base
{

    public function getList($date_time = [], $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = [];
        $userWhere=[];

        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
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
            }
        }
        $user_task_model = user_task_model::getInstance();
        $data = $user_task_model->with(['user' => 'id,type,user_name,virtual,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('create_time desc')
            ->limit($limit, $page)
            ->getListInfo();

        $this->GlobalService->json(['code' => 1, 'msg' => '成功',
            'list' => $data['list'],
            'total' => $data['total'],
        ]);
    }


}