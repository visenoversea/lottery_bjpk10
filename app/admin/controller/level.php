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

    public function edit($id, $title, $img, $nums, $min, $max, $reward, $amount, $introduce, $spread_nums, $status)
    {

        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'img' => trim($img),
            'introduce' => trim($introduce),
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
