<?php
/**
 *用户钱包
 */

namespace home\controller;

use home\classes\base;
use model\user_wallet_model;

class userWallet extends base
{
    //获取列表
    public function getList($currency = '', $chain = '')
    {
        $user = $this->GlobalService->getUser();
        $where = ['user_id' => $user['id'], 'status' => 1];
        if ($currency !== '') {
            $where['currency'] = $currency;
        }
        if ($chain !== '') {
            $where['chain'] = $chain;
        }
        $user_wallet_model = user_wallet_model::getInstance();
        $list = $user_wallet_model->where($where)->order('id DESC')->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    //获取信息
    public function getInfo($id)
    {
        $user = $this->GlobalService->getUser();
        $user_wallet_model = user_wallet_model::getInstance();
        $info = $user_wallet_model->where(['id' => intval($id), 'user_id' => $user['id']])->getOne() ?: (object)[];
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    //添加钱包
    public function add($currency, $chain, $address, $icon = '')
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        $data = [
            'user_id' => $user['id'],
            'currency' => trim($currency),
            'chain' => trim($chain),
            'address' => trim($address),
            'icon' => trim($icon)
        ];
        $user_wallet_model = user_wallet_model::getInstance();
        $nums = $user_wallet_model->where([
            'user_id' => $data['user_id'],
            'currency' => $data['currency'],
            'chain' => $data['chain'],
            'status' => 1
        ])->count();
        if ($nums >= 1) {
            $this->GlobalService->json(['code' => 1, 'msg' => '只能绑定一个地址']);
        }
        $res = $user_wallet_model->where(['address' => $data['address'], 'status' => ['>=' => 0]])->isExist();
        if ($res) {
            $this->GlobalService->json(['code' => 1, 'msg' => '钱包地址已被绑定过,无法重复绑定']);
        }
        $res = $user_wallet_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $user_wallet_model->add($data);
        $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
    }

    //编辑修改
    public function edit($id, $currency, $chain, $address,$icon='')
    {
        $this->GlobalService->json(['code' => 1, 'msg' => '修改失败']);
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $data = [
            'id' => $id,
            'currency' => trim($currency),
            'chain' => trim($chain),
            'address' => trim($address),
            'icon' => trim($icon)
        ];
        $user_wallet_model = user_wallet_model::getInstance();
        $res = $user_wallet_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $user = $this->GlobalService->getUser();
        $res = $user_wallet_model->edit($data, ['user_id' => $user['id']]);
        if ($res) {
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '修改失败']);
    }

    //删除
    public function del($id)
    {
        $this->GlobalService->json(['code' => 1, 'msg' => '修改失败']);
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        $user_wallet_model = user_wallet_model::getInstance();
        $res = $user_wallet_model->delById($id, ['user_id' => $user['id']]);
        $this->GlobalService->json($res);
    }
}
