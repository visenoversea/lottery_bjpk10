<?php
/**
 *文章,公告
 */

namespace admin\controller;

use admin\classes\base;
use model\article_model;
use model\user_log_model;

class article extends base
{
    public function getList($type = '', $title = '', $des = '', $status = '', $page = 1, $limit = 15)
    {
        $where = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        if ($type !== '') {
            $where['type'] = intval($type);
        }
        if ($title !== '') {
            $where['title'] = ['LIKE' => '%' . trim($title) . '%'];
        }
        if ($des !== '') {
            $where['des'] = ['LIKE' => '%' . trim($des) . '%'];
        }
        $article_model = article_model::getInstance();
        $data = $article_model->where($where)
            ->order('create_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function add($type, $title, $des, $content, $img, $create_time)
    {
        $data = [
            'type' => intval($type),
            'title' => trim($title),
            'des' => trim($des),
            'img' => $img,
            'content' => trim($content),
        ];
        if ($create_time) {
            $data['create_time'] = strtotime($create_time);
        }
        $article_model = article_model::getInstance();
        $res = $article_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        //插入
        $data['id'] = $article_model->add($data);
        /*********添加日志*********/
        unset($data['content']);
        (user_log_model::getInstance())->addLog('新增文章', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
    }

    public function edit($id, $title, $des, $content, $img, $read_nums, $create_time, $sort=0, $status = 1)
    {
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'des' => trim($des),
            'img' => $img,
            'content' => trim($content),
            'read_nums' => intval($read_nums),
            'sort' => intval($sort),
            'status' => intval($status)
        ];
        if ($create_time) {
            $data['create_time'] = strtotime($create_time);
        }
        $article_model = article_model::getInstance();
        $res = $article_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $res = $article_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            unset($data['content']);
            (user_log_model::getInstance())->addLog('编辑文章', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        if ($id < 1000) {
            $this->GlobalService->json(['code' => -2, 'msg' => '无法删除']);
        }
        $article_model = article_model::getInstance();
        $res = $article_model->delById($id);
        $this->GlobalService->json($res);
    }
}
