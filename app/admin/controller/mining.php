<?php
/**
 *锁仓挖矿
 */

namespace admin\controller;

use admin\classes\base;
use model\mining_model;
use model\user_log_model;

class mining extends base
{
    public function getList($title = '', $status = '', $page = 1, $limit = 15)
    {
        $where = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        if ($title !== '') {
            $where['title'] = ['LIKE' => '%' . trim($title) . '%'];
        }
        $mining_model = mining_model::getInstance();
        $data = $mining_model->where($where)
            ->order('sort DESC,create_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function add($title, $icon, $day, $min_rate, $max_rate, $bc_rate, $min, $max, $sort)
    {
        $data = [
            'title' => trim($title),
            'icon' => trim($icon),
            'day' => intval($day),
            'min_rate' => floatval($min_rate),
            'max_rate' => floatval($max_rate),
            'bc_rate' => floatval($bc_rate),
            'min' => intval($min),
            'max' => intval($max),
            'sort' => intval($sort),
        ];
        $mining_model = mining_model::getInstance();
        $res = $mining_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        //插入
        $data['id'] = $mining_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增锁仓挖矿', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
    }

    public function edit($id, $title, $icon, $day, $min_rate, $max_rate, $bc_rate, $min, $max, $sort, $status = 1)
    {
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'icon' => trim($icon),
            'day' => intval($day),
            'min_rate' => floatval($min_rate),
            'max_rate' => floatval($max_rate),
            'bc_rate' => floatval($bc_rate),
            'min' => intval($min),
            'max' => intval($max),
            'sort' => intval($sort),
            'status' => intval($status)
        ];
        $mining_model = mining_model::getInstance();
        $res = $mining_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $res = $mining_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑锁仓挖矿', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        $mining_model = mining_model::getInstance();
        $res = $mining_model->delById($id);
        $this->GlobalService->json($res);
    }

}
