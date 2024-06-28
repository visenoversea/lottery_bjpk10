<?php
/**
 *用户银行卡
 */

namespace admin\controller;

use admin\classes\base;
use model\user_log_model;
use model\user_model;
use model\user_bank_model;

class userBank extends base
{
    public function getList($userType = '',$virtual = '', $bank_name = '', $name = '', $status = '', $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
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
        if ($bank_name !== '') {
            $where['bank_name'] = ['LIKE' => '%' . trim($bank_name) . '%'];
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
            } else if ($search_key == 'card_number') {
                $where['card_number'] = ['LIKE' => '%' . $search_val . '%'];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        $user_bank_model = user_bank_model::getInstance();
        $data = $user_bank_model->with(['user' => 'id,type,pid,layer,user_name,virtual,status'])
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

    public function edit($id, $bank_name, $card_number, $name, $branch = '', $bank_code = '', $status = 1)
    {
        $data = [
            'id' => intval($id),
            'bank_name' => trim($bank_name),
            'card_number' => trim($card_number),
            'name' => trim($name),
            'branch' => trim($branch),
            'bank_code' => trim($bank_code),
            'status' => intval($status)
        ];
        $user_bank_model = user_bank_model::getInstance();
        $res = $user_bank_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $res = $user_bank_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑用户银行卡', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        $user_bank_model = user_bank_model::getInstance();
        $res = $user_bank_model->delById($id);
        $this->GlobalService->json($res);
    }

}
