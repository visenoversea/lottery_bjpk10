<?php
/**
 *Demo
 */

namespace main\controller;

use asura\Request;
use main\classes\base;
use model\hpay_address_model;
use model\user_dpay_model;

class wallet extends base
{

    /**
     * 获取列表  /main/wallet/getList
     */
    public function getList($id=0)
    {
        if($get = Request::get()){
            $id=$get['id'];
        }
        $user_dpay_model = user_dpay_model::getInstance();
        $list = $user_dpay_model->where(['status' => 1,'id'=>['>'=>$id]])->limit(-1)->select();
        $data = [];
        foreach ($list as $v) {
            $data[] = array(
                'id' => $v['id'],
                'address' => $v['address'],
            );
        }
        //echo json_encode(['code' => 0, 'message' => 'success', 'error' => null,'LastID'=>$lastId, 'data' => $data]);
        echo json_encode(['data' => $data, 'code' => 0, 'message' => 'success', 'error' => null ] );
       // echo str_replace('",','",'."<br>\r\n", $str);

    }

    public function getList2($id=0)
    {
        if($get = Request::get()){
            $id=$get['id'];
        }
        $hpay_address_model = hpay_address_model::getInstance();
        $list = $hpay_address_model->where(['id'=>['>'=>$id], 'status' => ['>='=>0]])->limit(-1)->select();
        $data = [];
        foreach ($list as $v) {
            $data[] = array(
                'id' => $v['id'],
                'address' => $v['address'],
            );
        }
        //echo json_encode(['code' => 0, 'message' => 'success', 'error' => null,'LastID'=>$lastId, 'data' => $data]);
        echo json_encode(['data' => $data, 'code' => 0, 'message' => 'success', 'error' => null ] );
        // echo str_replace('",','",'."<br>\r\n", $str);

    }

}
