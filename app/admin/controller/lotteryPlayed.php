<?php
/**
 *赔率设置
 */

namespace admin\controller;

use admin\classes\base;
use model\lottery_played_model;
use model\user_log_model;

class lotteryPlayed extends base
{
    public function getList($lottery_id = '',$lottery_room_id='',$name='',$page = 1, $limit = 15)
    {
        $where = ['status' => ['>='=>0]];
        if ($lottery_id !== '') {
            $where['lottery_id'] = intval($lottery_id);
        }
        if ($lottery_room_id !== '') {
            $where['lottery_room_id'] = intval($lottery_room_id);
        }
        if ($name !== '') {
            $where['name'] = ['LIKE'=>'%'.$name.'%'];
        }
        $lottery_played_model = lottery_played_model::getInstance();
        $data = $lottery_played_model
            ->with(['lottery' => 'id,name', 'lotteryGroup' => 'id,name', 'lotteryRoom' => 'id,name'])
            ->where($where)
            ->order('id ASC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function edit($id = '', $odds = '', $status = 1)
    {
        if ($odds <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '赔率不能小于等于0']);
        }
        $lottery_played_model = lottery_played_model::getInstance();
        $data = ['id' => intval($id), 'odds' => $odds, 'status' => intval($status)];
        $res = $lottery_played_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('修改赔率', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }
}
