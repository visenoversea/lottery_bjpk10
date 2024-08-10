<?php
/**
 *房间设置
 */

namespace admin\controller;

use admin\classes\base;
use model\lottery_model;
use model\user_log_model;

class lottery extends base
{
    public function getList($page = 1, $limit = 15)
    {
        $where = ['status' => ['>='=>0]];
        $lottery_model = lottery_model::getInstance();
        $data = $lottery_model->where($where)
            ->order('sort DESC,id ASC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function edit($id = 0, $risk = 100, $stop_time = 3, $status = 1,$description = '')
    {
        $lottery_model = lottery_model::getInstance();
        $data = [
            'id' => intval($id),
            'risk' => intval($risk),
            'stop_time'=>intval($stop_time),
            'status'=>$status,
            'description' => $description
        ];
        if ($data['risk'] <= 0 || $data['risk'] > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '杀率范围0-100']);
        }
        if($data['stop_time']>70){
            $this->GlobalService->json(['code' => -2, 'msg' => '封盘时间不能超过70秒']);
        }
        $res = $lottery_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('修改杀率', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }
}
