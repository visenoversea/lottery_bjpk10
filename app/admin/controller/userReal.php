<?php
/**
 *用户实名
 */

namespace admin\controller;

use admin\classes\base;
use model\user_log_model;
use model\user_model;
use model\user_real_model;

class userReal extends base
{

    public function getList($userType = '', $virtual = '', $id_card = '', $name = '', $status = '', $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['del' => 0];
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
        if ($id_card !== '') {
            $where['id_card'] = ['LIKE' => '%' . trim($id_card) . '%'];
        }
        if ($name !== '') {
            $where['name'] = ['LIKE' => '%' . trim($name) . '%'];
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
        $user_real_model = user_real_model::getInstance();
        $data = $user_real_model->with(['user' => 'id,type,pid,layer,user_name,virtual,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('create_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_model = user_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    /**
     * 新增
     * /admin/userReal/add
     */
    public function add($user_id, $name, $id_card, $country = '', $front_img='', $reverse_img='')
    {
        $adminUser = $this->GlobalService->getUser();
        $data = [
            'user_id' => intval($user_id),
            'name' => trim($name),
            'id_card' => trim($id_card),
            'front_img' => trim($front_img),
            'reverse_img' => trim($reverse_img),
            'country' => trim($country),
            'operator' => $adminUser['user_name'],
            'status' => 1
        ];
        $user_real_model = user_real_model::getInstance();
        $res = $user_real_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $user_model = user_model::getInstance();
        $res = $user_model->where(['id' => $data['user_id'], 'status' => ['>=' => 0]])->isExist();
        if (!$res) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户id不存在']);
        }
        $res = $user_real_model->field('id')->where(['user_id' => $data['user_id'], 'del' => 0])->isExist();
        if ($res) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已拥有用户的实名信息，请搜索编辑']);
        }
        //插入
        $data['id'] = $user_real_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增用户实名', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
    }

    //审核
    public function review($id, $status, $reason = '')
    {
        $adminUser = $this->GlobalService->getUser();
        $data = [
            'id' => intval($id),
            'reason' => '',
            'operator' => $adminUser['user_name'],
            'status' => intval($status)
        ];
        if ($data['status'] == 0) {
            //审核不通过
            $data['reason'] = trim($reason);
        }
        $user_real_model = user_real_model::getInstance();
        $res = $user_real_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('审核用户实名', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '审核失败']);
    }

    /**
     * 编辑
     * /admin/userReal/edit
     */
    public function edit($id, $name, $id_card, $front_img, $reverse_img, $country = '', $reason = '', $status = 1)
    {
        $adminUser = $this->GlobalService->getUser();
        $data = [
            'id' => intval($id),
            'name' => trim($name),
            'id_card' => trim($id_card),
            'front_img' => trim($front_img),
            'reverse_img' => trim($reverse_img),
            'reason' => '',
            'country' => trim($country),
            'operator' => $adminUser['user_name'],
            'status' => intval($status)
        ];
        if ($data['status'] == 0) {
            //审核不通过
            $data['reason'] = trim($reason);
        }
        $user_real_model = user_real_model::getInstance();
        $res = $user_real_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $res = $user_real_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑用户实名', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    /**
     * 删除实名
     * /admin/userReal/del
     */
    public function del($id)
    {
        $user_real_model = user_real_model::getInstance();
        $res = $user_real_model->delById($id);
        $this->GlobalService->json($res);
    }

}
