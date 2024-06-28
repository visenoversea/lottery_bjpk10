<?php
/**
 *等级
 */

namespace home\controller;

use home\classes\base;
use model\level_model;
use model\user_model;

class level extends base
{

    //设置
//    public function up($id)
//    {
//        $user = $this->GlobalService->getUser();
//        $level_model = level_model::getInstance();
//        $level = $level_model->where(['id' => $id])->getOne();
//        if (!$level) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '未知的等级']);
//        }
//        if ($level['status'] != 1) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '升级异常']);
//        }
//        if ($level['id'] <= $user['level_id']) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '请选择更高等级']);
//        }
//        //验证条件
//        if ($user['balance'] < $level['amount']) {
//            $this->GlobalService->json(['code' => -2, 'msg' => "晋级条件不满足，金额需大于" . $level['amount']]);
//        }
//        $user_model = user_model::getInstance();
//        $where = [
//            'pid' => $user['pid'] . $user['id'] . ',',
//            'type' => ['<' => 10],
//            'recharge_time' => ['>' => 0],
//            'status' => ['>=' => 0]
//        ];
//        $spreadNums = $user_model->where($where)->count();
//        if ($spreadNums < $level['spread_nums']) {
//            $this->GlobalService->json(['code' => -2, 'msg' => "推广人数不足:" . $level['spread_nums']]);
//        }
//        $res = $user_model->edit(['id' => $user['id'], 'level_id' => $level['id']], ['level_id' => $user['level_id']]);
//        if (!$res) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '升级失败']);
//        }
//        if ($level['reward'] > 0) {
//            $user_model->changeBalance($user['id'], $level['reward'], $level['title'], '晋级奖励');
//        }
//        $this->GlobalService->json(['code' => 1, 'msg' => '升级成功']);
//    }

}
