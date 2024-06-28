<?php
/**
 *用户站内信
 */

namespace admin\controller;

use admin\classes\base;
use model\user_log_model;
use model\user_model;
use model\user_msg_model;

class userMsg extends base
{

    public function getList($userType = '', $virtual = '', $title = '', $status = '', $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['status' => ['>=' => 0]];
        $userWhere = ['status' => ['>=' => 0]];
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
        if ($status !== '') {
            $where['status'] = intval($status);
        }
        if ($title !== '') {
            $where['title'] = ['LIKE' => '%' . trim($title) . '%'];
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
        $user_msg_model = user_msg_model::getInstance();
        $data = $user_msg_model->with(['user' => 'id,type,pid,layer,user_name,virtual,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_model = user_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function add($user_id, $title, $content)
    {
        $adminUser=$this->GlobalService->getUser();
        $data = [
            'user_id' => intval($user_id),
            'title' => trim($title),
            'content' => trim($content),
            'operator' => $adminUser['user_name'],
            'status' => 1
        ];
        $user_msg_model = user_msg_model::getInstance();
        $res = $user_msg_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $user_model = user_model::getInstance();
        $res = $user_model->where(['id' => $data['user_id'], 'status' => ['>=' => 0]])->isExist();
        if (!$res) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户id不存在']);
        }
        //插入
        $data['id'] = $user_msg_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增用户站内信', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '发送成功']);
    }

    public function edit($id, $title, $content, $status = 1)
    {
        $adminUser = $this->GlobalService->getUser();
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'content' => trim($content),
            'operator' => $adminUser['user_name'],
            'status' => intval($status)
        ];
        $user_msg_model = user_msg_model::getInstance();
        $res = $user_msg_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $res = $user_msg_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('用户站内信编辑', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        $user_msg_model = user_msg_model::getInstance();
        $res = $user_msg_model->delById($id);
        $this->GlobalService->json($res);
    }

}
