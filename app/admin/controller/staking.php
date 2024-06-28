<?php
/**
 *锁仓挖矿
 */

namespace admin\controller;

use admin\classes\base;
use model\staking_model;
use model\user_log_model;

class staking extends base
{
    public function getList($status = '', $page = 1, $limit = 24)
    {

        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }

        $mining_model = staking_model::getInstance();
        $data = $mining_model->field('id,title,currency,icon,rate,create_time,modify_time')->where($where)
            ->order('id asc')
            ->limit($limit, $page)
            ->getListInfo();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }



    public function edit($id, $title, $icon, $rate)
    {
        $id = intval($id);
        $data = [
            'title' => trim($title),
            'icon' => trim($icon),
            'rate' => floatval($rate),
        ];
        $staking_model = staking_model::getInstance();
        $res = $staking_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $ise = $staking_model->where(['id'=>$id])->getOne();
        if(!$ise) $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        $res = $staking_model->edit($data,['id'=>$id]);
        if ($res) {
            $data['orignal'] = $ise;
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑余币宝费率', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }


}
