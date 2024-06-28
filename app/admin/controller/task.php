<?php
/**
 * 任务配置
 */

namespace admin\controller;

use admin\classes\base;
use model\task_model;
use model\user_log_model;

class task extends base
{

    public function getList($title = '', $des = '', $status = '', $page = 1, $limit = 15)
    {
        $where = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        if ($title !== '') {
            $where['title'] = ['LIKE' => '%' . trim($title) . '%'];
        }
        if ($des !== '') {
            $where['ip'] = ['LIKE' => '%' . trim($des) . '%'];
        }
        $task_model = task_model::getInstance();
        $data = $task_model->where($where)->order('sort DESC,id ASC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function edit($id, $title, $des, $condition = '', $other_info = '', $amount = 0,$lottery_nums=0, $nums = 1, $sort = 0, $status = 1)
    {
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'des' => trim($des),
            'amount' => trim($amount),
            'lottery_nums' => intval($lottery_nums),
            'nums' => intval($nums),
            'sort' => intval($sort),
            'status' => intval($status)
        ];
        if ($data['lottery_nums'] < 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '抽奖次数不能小于0']);
        }
        if ($data['nums'] < 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '任务次数不能小于1']);
        }
        if ($condition !== '') {
            $data['condition'] = trim($condition);
        }
        if (empty($data['title'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '任务名字不能为空']);
        }
        if ($data['amount'] <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '任务奖励不能小于等于0']);
        }
        if($id == 200){
            if(!isset($other_info[0]) || !isset($other_info[1])){
                $this->GlobalService->json(['code' => -2, 'msg' => '数据格式错误']);
            }
            if(floatval($other_info[0][2]) <= 0 || floatval($other_info[1][2]) <= 0){
                $this->GlobalService->json(['code' => -2, 'msg' => '数据格式错误']);
            }
            if(floatval($other_info[0][2]) >=  floatval($other_info[0][3]) || floatval($other_info[1][2]) >=  floatval($other_info[1][3])){
                $this->GlobalService->json(['code' => -2, 'msg' => '最小值必须小于最大值']);
            }
            $data['other_info'] = json_encode($other_info);
        }

        $task_model = task_model::getInstance();
        $res = $task_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑任务配置', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

}
