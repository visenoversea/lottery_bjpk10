<?php
/**
 *用户银行卡
 */

namespace home\controller;

use home\classes\base;
use model\user_bank_model;

class userBank extends base
{

    //获取列表
    public function getList()
    {
        $user = $this->GlobalService->getUser();
        $where = ['user_id' => $user['id'], 'status' => 1];
        $user_bank_model = user_bank_model::getInstance();
        $list = $user_bank_model->where($where)->order('id DESC')->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    //获取信息
    public function getInfo($id)
    {
        $user = $this->GlobalService->getUser();
        $user_bank_model = user_bank_model::getInstance();
        $info = $user_bank_model->where(['id' => intval($id), 'user_id' => $user['id']])->getOne() ?: (object)[];
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    //添加银行卡信息
    public function add($bank_name, $card_number, $name, $branch = '', $bank_code = '')
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        $data = [
            'user_id' => $user['id'],
            'bank_name' => trim($bank_name),
            'card_number' => trim($card_number),
            'name' => trim($name),
            'branch' => trim($branch),
            'bank_code' => trim($bank_code)
        ];
        $user_bank_model = user_bank_model::getInstance();
        $res=$user_bank_model->checkData($data);
        if($res['code']!==1){
            $this->GlobalService->json($res);
        }
        $user_bank_model->add($data);
        $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
    }

    /**
     * 编辑
     * /home/userBank/edit
     */
    public function edit($id, $bank_name, $name, $card_number, $branch = '', $bank_code = '')
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $data = [
            'id' => $id,
            'bank_name' => trim($bank_name),
            'name' => trim($name),
            'card_number' => trim($card_number),
            'branch' => trim($branch),
            'bank_code' => trim($bank_code)
        ];
        $user_bank_model = user_bank_model::getInstance();
        $res=$user_bank_model->checkData($data);
        if($res['code']!==1){
            $this->GlobalService->json($res);
        }
        $user = $this->GlobalService->getUser();
        $res = $user_bank_model->edit($data, ['user_id' => $user['id']]);
        if ($res) {
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    //删除
    public function del($id)
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        $user_bank_model = user_bank_model::getInstance();
        $res = $user_bank_model->delById($id, ['user_id' => $user['id']]);
        $this->GlobalService->json($res);
    }

}
