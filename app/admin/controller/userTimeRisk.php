<?php
/**
 *用户限时风控
 */

namespace admin\controller;

use admin\classes\base;
use model\user_log_model;
use model\user_model;
use model\user_time_risk_model;

class userTimeRisk extends base
{

    public function getList($userType = '', $virtual = '', $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['status' => ['>=' => 0]];
        $userWhere = ['status' => ['>=' => 0]];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        $adminUser = $this->GlobalService->getUser();
        if ($userType !== '') {
            $userWhere['type']['='] = intval($userType);
        }
        //是否虚拟号
        if ($virtual !== '') {
            $userWhere['virtual'] = intval($virtual);
        }
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $userWhere['user_name'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['user_id'] = $search_val;
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'rows' => [], 'total' => 0]);
            }
        }
        $user_time_risk_model = user_time_risk_model::getInstance();
        $data = $user_time_risk_model->with(['user' => 'id,type,pid,layer,user_name,virtual,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
            ->order('id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_model = user_model::getInstance();
        foreach ($data['list'] as $k => $v) {
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function add($user_id, $risk)
    {
        $adminUser = $this->GlobalService->getUser();
        $data = [
            'user_id' => intval($user_id),
            'risk' => intval($risk),
            'operator' => $adminUser['user_name']
        ];
        if ($data['risk'] < 0 || $data['risk'] > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '胜率范围0-100']);
        }
        $user_model=user_model::getInstance();
        $res=$user_model->where(['id'=>$data['user_id'],'type'=>['<'=>10],'status'=>['>='=>0]])->isExist();
        if(!$res){
            $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
        }
        $user_time_risk_model = user_time_risk_model::getInstance();
        $res = $user_time_risk_model->where(['user_id' => $data['user_id'], 'status' => ['>=' => 0]])->isExist();
        if ($res) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户配置已存在,请选择搜索编辑']);
        }
        $user_time_risk_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增用户风控', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
    }

    //编辑用户风控
    public function edit($id, $risk, $status)
    {
        $adminUser = $this->GlobalService->getUser();
        $data = [
            'id' => intval($id),
            'risk' => intval($risk),
            'operator' => $adminUser['user_name'],
            'status' => intval($status)
        ];
        if ($data['risk'] < 0 || $data['risk'] > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '胜率范围0-100']);
        }
        if (!in_array($data['status'], [0, 1])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '状态参数异常']);
        }
        $user_time_risk_model = user_time_risk_model::getInstance();
        $userTimeRisk = $user_time_risk_model->where(['id' => $data['id'], 'status' => ['>=' => 0]])->getOne();
        if (!$userTimeRisk) {
            $this->GlobalService->json(['code' => -2, 'msg' => '配置不存在']);
        }
        $res = $user_time_risk_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑用户风控', ['userTimeRisk' => $userTimeRisk, 'data' => $data]);
            /*********添加日志*********/
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
    }

    public function del($id)
    {
        $user_time_risk_model = user_time_risk_model::getInstance();
        $res = $user_time_risk_model->delById($id);
        $this->GlobalService->json($res);
    }

}
