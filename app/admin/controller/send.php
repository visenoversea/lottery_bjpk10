<?php
/**
 * 手机邮箱发送记录
 */

namespace admin\controller;

use admin\classes\base;
use model\ip_model;
use model\send_model;

class send extends base
{

    public function getList($account = '', $ip = '', $code = '',$status='', $date_time = [], $search_key = 'content', $search_val = '', $page = 1, $limit = 15)
    {
        $where = [];
        if($status!==''){
            $where['status']=intval($status);
        }else{
            $where['status']=['>=' => 0];
        }
        if ($account !== '') {
            $where['account'] = ['LIKE' => '%' . trim($account) . '%'];
        }
        if ($ip !== '') {
            $where['ip'] = ['LIKE' => '%' . trim($ip) . '%'];
        }
        if ($code !== '') {
            $where['code'] = ['LIKE' => '%' . trim($code) . '%'];
        }
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'content') {
                $where['address'] = ['LIKE' => '%' . $search_val . '%'];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        if ($date_time) {
            $where['create_time']['>='] = strtotime($date_time[0]);
            $where['create_time']['<='] = strtotime($date_time[1]);
        }
        $send_model = send_model::getInstance();
        $ip_model = ip_model::getInstance();
        $data = $send_model->where($where)
            ->order('create_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $res = $ip_model->getData($v['ip']);
            if ($res['code'] == 1) {
                $v['ipAddress'] = $res['data']['address'];
            } else {
                $v['ipAddress'] = '-';
            }
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

}
