<?php
/**
 * 等级配置
 */

namespace admin\controller;

use admin\classes\base;
use model\level_model;
use model\user_log_model;

class level extends base
{

    /**
     * 获取配置列表  /admin/level/getList
     */
    public function getList($status = '')
    {
        $where = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        $level_model = level_model::getInstance();
        $list = $level_model->where($where)->order('id ASC')->limit(-1)->select();
        foreach ($list as $k => $v) {
            $v['min_rate'] = round($v['min_rate'] * 100, 2);
            $v['max_rate'] = round($v['max_rate'] * 100, 2);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    public function edit($id, $title, $img, $nums, $min, $max,  $min_rate, $max_rate, $reward, $amount, $introduce, $spread_nums, $status)
    {
        if ($min_rate <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '请填写正确的最小收益']);
        }
        if ($max_rate <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '请填写正确的最大收益']);
        }
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'img' => trim($img),
            'nums' => intval($nums),
            'min' => trim($min),
            'max' => trim($max),
            'introduce' => trim($introduce),
            'min_rate' => round($min_rate / 100, 4),
            'max_rate' => round($max_rate / 100, 4),
            'spread_nums' => intval($spread_nums),
            'amount' => trim($amount),
            'reward' => trim($reward),
            'status' => intval($status),
        ];
        $level_model = level_model::getInstance();
        $res = $level_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        //编辑
        $res = $level_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑等级', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '编辑失败']);
    }

    //删除
    public function del($id)
    {
        $level_model = level_model::getInstance();
        $res = $level_model->delById($id);
        $this->GlobalService->json($res);
    }

}
