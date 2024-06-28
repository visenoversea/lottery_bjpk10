<?php
/**
 *用户日志
 */

namespace admin\controller;

use admin\classes\base;
use model\ip_model;
use model\user_ip_model;
use model\user_model;
use service\WebSocketService;

class userIP extends base
{

    public function getList($userType = '', $virtual = '', $ip = '', $date_time = [], $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = ['status'=>['>='=>0]];
        $userWhere = [];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $userWhere['pid'] = ['LIKE' => $pid . '%'];
        }
        $adminUser = $this->GlobalService->getUser();
        if ($userType !== '') {
            $userWhere['type']['='] = intval($userType);
        } else {
            if ($adminUser['type'] !== 100) {
                $userWhere['type']['<'] = 100;
            }
        }
        //是否虚拟号
        if ($virtual !== '') {
            $userWhere['virtual'] = intval($virtual);
        }
        if ($ip !== '') {
            $where['ip'] = ['LIKE' => '%' . trim($ip) . '%'];
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
        if ($date_time) {
            $where['create_time']['>='] = strtotime($date_time[0]);
            $where['create_time']['<='] = strtotime($date_time[1]);
        }
        $user_ip_model = user_ip_model::getInstance();
        $data = $user_ip_model->with(['user' => 'id,type,pid,layer,user_name,virtual,login_time,status'])
            ->where($where)
            ->hasWhere('user', $userWhere)
//            ->order('create_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_model = user_model::getInstance();
        $ip_model = ip_model::getInstance();
//        $WebSocketService = WebSocketService::getInstance();
        foreach ($data['list'] as $k => $v) {
            $res = $ip_model->getData($v['ip']);
            if($res['code']==1){
                $v['address']=$res['data']['address'];
                $v['isp']=$res['data']['isp'];
            }else{
                $v['address']='-';
                $v['isp']='-';
            }
            $v['agentList'] = $user_model->getAgentList($v['user']['pid']);
            if ($v['user']['login_time'] > (SYS_TIME - 600)) {
                $v['user']['isOnline'] = true;
            } else {
                $v['user']['isOnline'] = false;
            }
//            $v['user']['isOnline'] = $WebSocketService->isOnline($v['user']['id']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

}
