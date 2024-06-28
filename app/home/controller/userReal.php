<?php
/**
 *用户实名
 */

namespace home\controller;

use home\classes\base;
use model\user_real_model;
use service\WebSocketService;

class userReal extends base
{
    //添加用户实名
    public function add($type,$id_card, $name, $front_img, $reverse_img,$country='')
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        $data = [
            'user_id' => $user['id'],
            'type' => intval($type),
            'id_card' => trim($id_card),
            'front_img' => trim($front_img),
            'reverse_img' => trim($reverse_img),
            'name' => trim($name),
            'country' => trim($country),
            'reason' => '',
            'status' => 2,
        ];
        $user_real_model = user_real_model::getInstance();
        $userReal = $user_real_model->where(['user_id' => $user['id'], 'del' => 0])->getOne();
        if ($userReal) {
            if ($userReal['status'] == 1) {
                $this->GlobalService->json(['code' => -2, 'msg' => '实名已认证']);
            } else if ($userReal['status'] == 2) {
                $this->GlobalService->json(['code' => -2, 'msg' => '实名正在认证中，请耐心等待审核']);
            } else if ($userReal['status'] == 0) {
                $data['id'] = $userReal['id'];
            } else {
                $this->GlobalService->json(['code' => -2, 'msg' => '系统异常']);
            }
        }
        $res = $user_real_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        if(isset($data['id'])){
            $user_real_model->edit($data);
        }else{
            $user_real_model->add($data);
        }
        (WebSocketService::getInstance())->SendAdminTips('实名提示', '你有新的实名信息等待审核', 'editUserReal', 'UserRealList');
        $this->GlobalService->json(['code' => 1, 'msg' => '已提交等待审核']);
    }
}
