<?php
/**
 *房间设置
 */

namespace admin\controller;

use admin\classes\base;
use model\lottery_room_model;
use model\user_log_model;

class lotteryRoom extends base
{
    public function getList($lottery_id = '',$name='',$page = 1, $limit = 15)
    {
        $where = ['status' => ['>='=>0]];
        if ($lottery_id !== '') {
            $where['lottery_id'] = intval($lottery_id);
        }
        if ($name !== '') {
            $where['name'] = ['LIKE'=>'%'.$name.'%'];
        }
        $lottery_room_model = lottery_room_model::getInstance();
        $data = $lottery_room_model
            ->with(['lottery' => 'id,name'])
            ->where($where)
            ->order('sort DESC,id ASC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function edit($id = 0, $name = '',$quick_list='',$speed=10, $min = 0, $balance = 0, $sort = 0, $status = 1)
    {
        if ($min <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '最小下单金额不能小于0']);
        }
        if ($balance <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '最小余额不能小于0']);
        }
        $lottery_room_model = lottery_room_model::getInstance();
        $data = [
            'id' => intval($id),
            'name' => trim($name),
            'min' => $min,
            'balance' => $balance,
            'quick_list' => trim($quick_list),
            'speed' => intval($speed),
            'sort' => intval($sort),
            'status' => intval($status)
        ];
        if ($data['speed'] < 0 || $data['speed'] > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '机器人速度范围限制0-100']);
        }
        if (empty($data['name'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '房间名不能为空']);
        }
        $res = $lottery_room_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('修改房间设置', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }
}
