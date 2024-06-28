<?php
/**
 *产品
 */

namespace admin\controller;

use admin\classes\base;
use model\wallet_model;
use model\user_log_model;
use service\HuoBiService;
use service\RedisService;
use service\SinaService;

class wallet extends base
{

    public function getList($title = '', $type = '', $status = '', $page = 1, $limit = 15)
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

        $wallet_model = wallet_model::getInstance();
        $data = $wallet_model->where($where)
            ->order('sort DESC,id ASC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function add($title, $icon, $safety, $device, $sort, $status)
    {
        $data = [
            'title' => trim($title),
            'icon' => trim($icon),
            'safety' => intval($safety),
            'device' => trim($device),
            'sort' => intval($sort),
            'status' => intval($status),
        ];

        $wallet_model = wallet_model::getInstance();
        //插入
        $data['id'] = $wallet_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增钱包', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
    }

    public function edit($id, $title, $icon, $safety, $device, $sort, $status)
    {
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'icon' => trim($icon),
            'safety' => intval($safety),
            'device' => trim($device),
            'sort' => intval($sort),
            'status' => intval($status),
        ];
        $wallet_model = wallet_model::getInstance();
        $res = $wallet_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑钱包', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        $wallet_model = wallet_model::getInstance();
        $res = $wallet_model->delById($id);
        $this->GlobalService->json($res);
    }
}
