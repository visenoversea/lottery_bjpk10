<?php
/**
 * 转盘配置
 */

namespace admin\controller;

use admin\classes\base;
use model\lottery2_model;
use model\user_log_model;

class lottery2 extends base
{

    public function getList($title = '', $status = '', $page = 1, $limit = 200)
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
        $lottery2_model = lottery2_model::getInstance();
        $data = $lottery2_model->where($where)->order('sort DESC,id ASC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function add($title, $img, $amount = 0, $ranges = 1, $tip = '', $sort = 0)
    {
        $data = [
            'title' => trim($title),
            'img' => trim($img),
            'amount' => trim($amount),
            'ranges' => intval($ranges),
            'tip' => trim($tip),
            'sort' => intval($sort),
        ];
        $lottery2_model = lottery2_model::getInstance();
        $res = $lottery2_model->checkData($data);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $data['id'] = $lottery2_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增转盘配置', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
    }

    public function edit($id, $title, $img, $amount = 0, $ranges = 1, $tip = '', $sort = 0, $status = 1)
    {
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'img' => trim($img),
            'amount' => trim($amount),
            'ranges' => intval($ranges),
            'tip' => trim($tip),
            'sort' => intval($sort),
            'status' => intval($status)
        ];
        $lottery2_model = lottery2_model::getInstance();
        $res = $lottery2_model->checkData($data);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $res = $lottery2_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑转盘配置', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        $lottery2_model = lottery2_model::getInstance();
        $res = $lottery2_model->delById($id);
        $this->GlobalService->json($res);
    }

}
