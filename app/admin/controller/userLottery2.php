<?php
/**
 * 用户抽奖
 */

namespace admin\controller;

use admin\classes\base;
use model\lottery2_model;
use model\user_log_model;
use model\user_lottery2_model;
use model\user_model;

class userLottery2 extends base
{

    public function getList($userType = '', $virtual = '', $status = '', $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = [];
        $userWhere = [];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        if ($userType !== '') {
            $userWhere['type']['='] = intval($userType);
        }
        //是否虚拟号
        if ($virtual !== '') {
            $userWhere['virtual'] = intval($virtual);
        }
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $userWhere['user_name'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['user_id'] = $search_val;
            } else if ($search_key == 'title') {
                $where['title'] = ['LIKE' => '%' . trim($search_val) . '%'];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        $user_lottery2_model = user_lottery2_model::getInstance();
        $data = $user_lottery2_model->with(['user' => 'id,type,pid,layer,user_name,virtual,remark,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('create_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_model = user_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function setRemark($id, $remark = '')
    {
        $data = [
            'id' => intval($id),
            'remark' => trim($remark)
        ];
        $user_lottery2_model = user_lottery2_model::getInstance();
        $res = $user_lottery2_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑用户抽奖备注', $data);
            /*********添加日志*********/
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '编辑成功']);
    }

    //添加抽奖次数
    public function add($user_id, $nums = 1, $lottery_id = 0)
    {
        if ($nums < 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '抽奖次数不能小于1']);
        }
        if ($nums > 20) {
            $this->GlobalService->json(['code' => -2, 'msg' => '赠送抽奖次数不能大于20']);
        }
        $data = [
            'user_id' => intval($user_id),
            'lottery_id' => intval($lottery_id),
            'status' => 2
        ];
        $user_model = user_model::getInstance();
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            if (!$user_model->where(['id' => $data['user_id'], 'pid' => ['LIKE' => $pid . '%'], 'status' => ['>=' => 0]])->isExist()) {
                $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
            }
        } else {
            if (!$user_model->where(['id' => $data['user_id'], 'status' => ['>=' => 0]])->isExist()) {
                $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
            }
        }
        if ($data['lottery_id'] > 0) {
            $lottery2_model = lottery2_model::getInstance();
            $lottery = $lottery2_model->where(['id' => $data['lottery_id']])->getOne();
            if (!$lottery) {
                $this->GlobalService->json(['code' => -2, 'msg' => '未知的奖品']);
            }
            if ($lottery['status'] != 1) {
                $this->GlobalService->json(['code' => -2, 'msg' => '奖品未开启']);
            }
            $data['title'] = $lottery['title'];
            $data['img'] = $lottery['img'];
            $data['amount'] = $lottery['amount'];
        }
        $user_lottery2_model = user_lottery2_model::getInstance();
        for ($i = 0; $i < $nums; ++$i) {
            $user_lottery2_model->add($data);
        }
        /*********添加日志*********/
        $data['nums'] = $nums;
        (user_log_model::getInstance())->addLog('新增用户转盘抽奖', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
    }

    public function edit($id, $lottery_id = 0)
    {
        $data = [
            'id' => intval($id),
            'lottery_id' => intval($lottery_id),
        ];
        if ($data['lottery_id'] > 0) {
            $lottery2_model = lottery2_model::getInstance();
            $lottery = $lottery2_model->where(['id' => $data['lottery_id']])->getOne();
            if (!$lottery) {
                $this->GlobalService->json(['code' => -2, 'msg' => '未知的奖品']);
            }
            if ($lottery['status'] != 1) {
                $this->GlobalService->json(['code' => -2, 'msg' => '奖品未开启']);
            }
            $data['title'] = $lottery['title'];
            $data['img'] = $lottery['img'];
            $data['amount'] = $lottery['amount'];
        } else {
            $data['title'] = '';
            $data['img'] = '';
            $data['amount'] = 0;
        }
        $user_lottery2_model = user_lottery2_model::getInstance();
        $userLottery2 = $user_lottery2_model->where(['id' => $data['id']])->getOne();
        if (!$userLottery2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的ID']);
        }
        if ($userLottery2['status'] != 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '当前状态无法修改']);
        }
        $res = $user_lottery2_model->edit($data, ['status' => 2]);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑用户转盘抽奖', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        $user_lottery2_model = user_lottery2_model::getInstance();
        $res = $user_lottery2_model->delById($id);
        $this->GlobalService->json($res);
    }

}
