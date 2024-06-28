<?php
/**
 *团队审核
 */

namespace admin\controller;

use admin\classes\base;
use model\user_log_model;
use model\user_model;
use model\user_team_model;

class userTeam extends base
{

    public function getList($userType = '', $virtual = '',  $status = '', $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['del' => 0];
        $userWhere = ['status' => ['>=' => 0]];
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
        }
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $userWhere['user_name'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'mobile') {
                $userWhere['mobile'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'email') {
                $userWhere['email'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['user_id'] = $search_val;
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        $user_team_model = user_team_model::getInstance();
        $data = $user_team_model->with(['user' => 'id,type,pid,layer,user_name,area_code,mobile,virtual,remark,status'])
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

    //审核
    public function review($id, $status, $reason = '')
    {
        $adminUser = $this->GlobalService->getUser();
        $user_team_model = user_team_model::getInstance();
        $userTeam = $user_team_model->where(['id' => $id, 'del' => 0])->getOne();
        if (!$userTeam) {
            $this->GlobalService->json(['code' => -2, 'msg' => '审核异常']);
        }
        if ($userTeam['status'] != 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '只能处理审核中的订单']);
        }
        $data = [
            'id' => intval($id),
            'reason' => '',
            'operator' => $adminUser['user_name'],
            'status' => intval($status)
        ];
        if ($data['status'] == 0) {
            //审核不通过
            $data['reason'] = trim($reason);
        }
        $res = $user_team_model->edit($data, ['status' => 2]);
        if ($res) {
            $user_model = user_model::getInstance();
            $user_model->edit(['id' => $userTeam['user_id'], 'is_team' => 1]);
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('审核用户团队申请', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '审核失败']);
    }

    /**
     * 删除实名
     * /admin/userReal/del
     */
    public function del($id)
    {
        $user_team_model = user_team_model::getInstance();
        $res = $user_team_model->delById($id);
        $this->GlobalService->json($res);
    }

}
