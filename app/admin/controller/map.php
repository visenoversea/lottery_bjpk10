<?php
/**
 * 字段映射
 */

namespace admin\controller;

use admin\classes\base;
use model\map_model;
use model\task_model;
use model\user_log_model;

class map extends base
{

    public function getList($code = '', $title = '', $status = '', $page = 1, $limit = 15)
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
        if ($code !== '') {
            $where['code'] = ['LIKE' => '%' . trim($code) . '%'];
        }
        $map_model = map_model::getInstance();
        $data = $map_model->where($where)->order('sort DESC,id ASC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function edit($id, $title, $translate = 0, $sort = 0, $status = 1)
    {
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'translate' => intval($translate),
            'sort' => intval($sort),
            'status' => intval($status)
        ];
        if (empty($data['title'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '标题不能为空']);
        }
        $map_model = map_model::getInstance();
        $res = $map_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑字段映射', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

}
