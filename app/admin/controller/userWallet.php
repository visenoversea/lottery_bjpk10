<?php
/**
 *用户钱包
 */

namespace admin\controller;

use admin\classes\base;
use model\user_log_model;
use model\user_model;
use model\user_wallet_model;

class userWallet extends base
{

    public function getList($userType = '', $virtual = '', $currency = '', $status = '', $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['status' => ['>=' => 0]];
        $userWhere = ['status' => ['>=' => 0]];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        if ($userType !== '') {
            $userWhere['type']['='] = intval($userType);
        }else{
            $userWhere['type']['<'] = 10;
        }
        //是否虚拟号
        if ($virtual !== '') {
            $userWhere['virtual'] = intval($virtual);
        }
        if ($status !== '') {
            $where['status'] = intval($status);
        }
        if ($currency !== '') {
            $where['currency'] = ['LIKE' => '%' . trim($currency) . '%'];
        }
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $userWhere['user_name'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['user_id'] = $search_val;
            } else if ($search_key == 'address') {
                $where['address'] = ['LIKE' => '%' . $search_val . '%'];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        $user_wallet_model = user_wallet_model::getInstance();
        $data = $user_wallet_model->with(['user' => 'id,type,pid,layer,user_name,virtual,status'])
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

    public function add($user_id,$chain, $address, $status = 1)
    {
        $data = [
            'user_id'=>intval($user_id),
            'currency'=>'USDT',
            'chain' => trim($chain),
            'address' => trim($address),
            'status' => intval($status)
        ];
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $data['user_id'],'type'=>['<'=>10]])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
        }
        if ($user['status'] < 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户状态异常添加钱包']);
        }
        if ($data['chain'] == 'TRC20' && (strlen($data['address']) !== 34 || $data['address'][0] !== 'T')) {
            $this->GlobalService->json(['code' => -2, 'msg' => '钱包地址错误']);
        }
        $user_wallet_model = user_wallet_model::getInstance();
        $res = $user_wallet_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $res = $user_wallet_model->add($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('添加用户钱包', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '添加失败']);
    }

    public function edit($id, $chain, $address, $status = 1)
    {
        $data = [
            'id' => intval($id),
            'chain' => trim($chain),
            'address' => trim($address),
            'status' => intval($status)
        ];
        $user_wallet_model = user_wallet_model::getInstance();
        $res = $user_wallet_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $res = $user_wallet_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑用户钱包', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        $user_wallet_model = user_wallet_model::getInstance();
        $res = $user_wallet_model->delById($id);
        $this->GlobalService->json($res);
    }

}
