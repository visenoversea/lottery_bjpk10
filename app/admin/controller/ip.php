<?php
/**
 * ip记录
 */

namespace admin\controller;

use admin\classes\base;
use model\ip_model;

class IP extends base
{

    public function getList($ip = '', $date_time = [], $search_key = 'address', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['status' => ['>=' => 0]];
        if ($ip !== '') {
            $where['ip'] = ['LIKE' => '%' . trim($ip) . '%'];
        }
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'address') {
                $where['address'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'isp') {
                $where['isp'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'tid') {
                $where['tid'] = ['LIKE' => '%' . $search_val . '%'];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        if ($date_time) {
            $where['create_time']['>='] = strtotime($date_time[0]);
            $where['create_time']['<='] = strtotime($date_time[1]);
        }
        $ip_model = ip_model::getInstance();
        $data = $ip_model->where($where)
            ->order('create_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

}
