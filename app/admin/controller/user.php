<?php
/**
 *用户相关
 */

namespace admin\controller;

use asura\Common;
use asura\Param;
use admin\classes\base;
use asura\Verify;
use model\config_model;
use model\domain_model;
use model\ip_model;
use model\level_model;
use model\role_menu_model;
use model\user_log_model;
use model\user_model;
use model\user_rebate_model;
use model\user_recharge_model;
use model\user_withdraw_model;
use service\GoogleAuthenticatorService;

class user extends base
{
    /**
     * 修改密码
     * /admin/user/editPassword
     */
    public function editPassword($oldPassword = '', $password = '', $authCode = '')
    {
        if ($oldPassword === '') {
            $this->GlobalService->json(['code' => -2, 'msg' => '旧密码不能为空']);
        }
        if ($password === '') {
            $this->GlobalService->json(['code' => -2, 'msg' => '新密码不能为空']);
        }
        $adminUser = $this->GlobalService->getUser();
        if (Param::md5str($oldPassword) !== $adminUser['password']) {
            $this->GlobalService->json(['code' => -2, 'msg' => '旧密码错误']);
            return;
        }
        $config_model = config_model::getInstance();
        $system = $config_model->getConfigData(1);
        if ($adminUser['type'] !== 100 && $system['GoogleAuth'] && $adminUser['secret']) {
            //需要验证谷歌授权
            $GoogleAuthenticatorService = GoogleAuthenticatorService::getInstance();
            if ($authCode !== $GoogleAuthenticatorService->getCode($adminUser['secret'])) {
                $this->GlobalService->json(['code' => -2, 'msg' => '谷歌身份验证失败']);
            }
        }
        $user_model = user_model::getInstance();
        $res = $user_model->editUser(['id' => $adminUser['id'], 'password' => $password]);
        $this->GlobalService->json($res);
    }

    /**
     * 获取列表
     * /admin/user/getList
     */
    public function getList($online='',$userType = '', $virtual = '', $status = '', $min = '', $max = '', $date_time = [], $search_key = 'user_name', $search_val = '', $orderBy = '', $page = 1, $limit = 15)
    {
        $where = [];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $where['pid'] = ['LIKE' => $pid . '%'];
        }
        if ($online) {
            $where['login_time'] = ['>=' => SYS_TIME - 600];
        }
        //类型判断
        if ($userType !== '') {
            $where['type'] = intval($userType);
        } else {
            $where['type'] = ['IN' => '1,2'];
        }
        if($min!==''){
            $where['balance']['>='] = floatval($min);
        }
        if($max!==''){
            $where['balance']['<='] = floatval($max);
        }
        //是否虚拟号
        if ($virtual !== '') {
            $where['`virtual`'] = intval($virtual);
        }
        if ($status !== '') {
            $where['status'] = intval($status);
        }else{
            $where['status'] = ['>=' => 0];
        }
        $user_model = user_model::getInstance();
        //搜索
        if (!empty($search_val)) {
            $search_key = trim($search_key);
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $where['user_name'] = ['LIKE' => $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['id'] = $search_val;
            } else if ($search_key == 'mobile') {
                $where['mobile'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'email') {
                $where['email'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'agent') {
                $res = $user_model->field('id,pid')
                    ->where(['user_name' => $search_val, 'pid' => ['LIKE' => $pid . '%']])
                    ->getOne();
                if (!$res) {
                    $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
                }
                $where['pid'] = ['=' => "{$res['pid']}{$res['id']},"];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
            }
        }
        $order = 'modify_time DESC,id DESC';
        if ($orderBy !== '') {
            if ($orderBy == 'create_time') {
                $order = 'create_time DESC,id DESC';
            }
        }
        $data = $user_model->where($where)
            ->order($order)
            ->limit($limit, $page)
            ->getListInfo();
        $user_recharge_model = user_recharge_model::getInstance();
        $user_withdraw_model = user_withdraw_model::getInstance();
        $user_rebate_model = user_rebate_model::getInstance();
        $ip_model = ip_model::getInstance();
        //获取下线人数
        foreach ($data['list'] as $k => $v) {
            $res = $ip_model->getData($v['login_ip']);
            if ($res['code'] == 1) {
                $v['ipAddress'] = $res['data']['address'];
            } else {
                $v['ipAddress'] = '-';
            }
            $v['rebateAmount'] = $user_rebate_model->sumUserAmount($v['id'], $date_time);
            $res = $user_recharge_model->sumUserInfo($v['id'], $date_time);
            //充值
            $v['recharge'] = $res['amount'];
            $v['rechargeGift'] = $res['gift'];
            $v['rechargeNums'] = $res['nums'];
            //提现
            $res = $user_withdraw_model->sumUserInfo($v['id'], $date_time);
            $v['withdraw'] = $res['amount'];
            $v['withdrawNums'] = $res['nums'];
            //客损
            $v['ks'] = round($v['recharge'] - $v['withdraw'],2);
            $v['agentList'] = $user_model->getAgentList($v['pid']);
            if ($v['login_time'] > (SYS_TIME - 600)) {
                $v['isOnline'] = true;
            } else {
                $v['isOnline'] = false;
            }
            //查询下级人数
            $v['team'] = $user_model->getTeamInfo($v);
            //今日佣金
            $v['todayRebateAmount'] = $user_rebate_model->getSumAmount($v['id'], ['create_time' => ['>=' => strtotime('today')]]);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    //提下线
    public function offline($id)
    {
        $user_model=user_model::getInstance();
        $user=$user_model->where(['id'=>$id,'type'=>['<'=>10]])->getOne();
        if($user){
            $data = ['id' => $user['id'], 'auth' => '{}'];
            $login_time = SYS_TIME - 600;
            if ($user['login_time'] >= $login_time) {
                $data['login_time'] = $login_time - 1;
            }
            $res = $user_model->edit($data);
            if($res){
                /*********添加日志*********/
                (user_log_model::getInstance())->addLog('踢用户下线', ['id'=>$user['id'],'auth'=>$user['auth']]);
                /*********添加日志*********/
                $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
            }
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '操作失败']);
    }

    //获取用户的注册列表
    public function getRegList($userType = '', $virtual = '', $status = '', $dateTime = [], $page = 1, $limit = 20)
    {
        $where = [];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $where['pid'] = ['LIKE' => $pid . '%'];
        }
        //类型判断
        if ($userType !== '') {
            $where['type'] = intval($userType);
        } else {
            $where['type'] = ['IN' => '1,2'];
        }
        //是否虚拟号
        if ($virtual !== '') {
            $where['virtual'] = intval($virtual);
        }
        if ($status !== '') {
            $where['status'] = intval($status);
        }else{
            $where['status'] = ['>=' => 0];
        }
        if ($dateTime) {
            $where['create_time']['>='] = strtotime($dateTime[0]);
            $where['create_time']['<='] = strtotime($dateTime[1]);
        }
        $user_model = user_model::getInstance();
        $data = $user_model->where($where)
            ->order('create_time DESC,id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_recharge_model = user_recharge_model::getInstance();
        $user_withdraw_model = user_withdraw_model::getInstance();
        $user_rebate_model = user_rebate_model::getInstance();
        $ip_model = ip_model::getInstance();
        //获取下线人数
        foreach ($data['list'] as $k => $v) {
            $res = $ip_model->getData($v['login_ip']);
            if ($res['code'] == 1) {
                $v['ipAddress'] = $res['data']['address'];
            } else {
                $v['ipAddress'] = '-';
            }
            $v['rebateAmount'] = $user_rebate_model->sumUserAmount($v['id']);
            $res = $user_recharge_model->sumUserInfo($v['id']);
            //充值
            $v['recharge'] = $res['amount'];
            $v['rechargeGift'] = $res['gift'];
            $v['rechargeNums'] = $res['nums'];
            //提现
            $res = $user_withdraw_model->sumUserInfo($v['id']);
            $v['withdraw'] = $res['amount'];
            $v['withdrawNums'] = $res['nums'];
            //客损
            $v['ks'] = round($v['recharge'] - $v['withdraw'],2);
            $v['agentList'] = $user_model->getAgentList($v['pid']);
            if ($v['login_time'] > (SYS_TIME - 600)) {
                $v['isOnline'] = true;
            } else {
                $v['isOnline'] = false;
            }
            //查询下级人数
            $v['team'] = $user_model->getTeamInfo($v);
            //今日佣金
            $v['todayRebateAmount'] = $user_rebate_model->getSumAmount($v['id'], ['create_time' => ['>=' => strtotime('today')]]);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function getInfo($id)
    {
        $where = ['id' => intval($id)];
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $where['pid'] = ['LIKE' => $pid . '%'];
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where($where)->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知用户']);
        }
        $user_recharge_model = user_recharge_model::getInstance();
        $user_withdraw_model = user_withdraw_model::getInstance();
        $user_rebate_model = user_rebate_model::getInstance();
        $ip_model = ip_model::getInstance();
        $level_model = level_model::getInstance();
        //查询下级人数
        $user['team'] = $user_model->getTeamInfo($user);
        $user['todayRebateAmount'] = $user_rebate_model->getSumAmount($user['id'], ['create_time' => ['>=' => strtotime('today')]]);
        $user['rebateAmount'] = $user_rebate_model->getSumAmount($user['id']);
        $user['totalProfit'] = round($user['quantifyProfit'] + $user['rebateAmount'], 2);
        $res = $ip_model->getData($user['login_ip']);
        if ($res['code'] == 1) {
            $user['ipAddress'] = $res['data']['address'];
        } else {
            $user['ipAddress'] = '-';
        }
        $res = $user_recharge_model->sumUserInfo($user['id']);
        $user['recharge'] = $res['amount'];
        $user['rechargeGift'] = $res['gift'];
        $user['rechargeNums'] = $res['nums'];
        $res = $user_withdraw_model->sumUserInfo($user['id']);
        $user['withdraw'] = $res['amount'];
        $user['withdrawNums'] = $res['nums'];
        $user['ks'] = round($user['recharge'] - $user['withdraw'], 2);
        $userWhere = ['pid' => ['LIKE' => $user['pid'] . $user['id'] . ',%'], 'layer' => ['<=' => $user['layer'] + 3], 'status' => ['>=' => 0], 'virtual' => 0];
        $res = $user_recharge_model->sumUserAgentInfo($userWhere);
        $user['recharge3'] = $res['amount'];
        $user['rechargeGift3'] = $res['gift'];
        $res = $user_withdraw_model->sumUserAgentInfo($userWhere);
        $user['withdraw3'] = $res['amount'];
        $user['ks3'] = round($user['recharge3'] - $user['withdraw3'], 2);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $user]);
    }

    /**
     * 获取用户下级信息
     * /admin/user/getAgent
     */
    public function getSpreadList($user_id = 0, $userType = '', $virtual = '', $search_key = 'user_name', $search_val = '', $layer = 0, $page = 1, $limit = 15)
    {
        $pid = $this->GlobalService->getPid();
        $user_model = user_model::getInstance();
        if ($pid) {
            //代理
            $user = $user_model->where(['id' => $user_id, 'pid' => ['LIKE' => $pid . '%']])->getOne();
        } else {
            //管理员
            $user = $user_model->where(['id' => $user_id])->getOne();
        }
        if (!$user) {
            $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
            return;
        }
        $where = [];
        //类型判断
        if ($userType !== '') {
            $where['type'] = intval($userType);
        }
        //是否虚拟号
        if ($virtual !== '') {
            $where['virtual'] = intval($virtual);
        }
        $where['status'] = ['>=' => 0];
        if ($layer > 0) {
            $where['layer'] = $user['layer'] + $layer;
        }
        $where['pid'] = ['LIKE' => $user['pid'] . $user['id'] . ',%'];
        //搜索
        if (!empty($search_val)) {
            $search_key = trim($search_key);
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $where['user_name'] = ['LIKE' => $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['id'] = $search_val;
            } else if ($search_key == 'agent_name') {
                $agent = $user_model->field('id,pid')
                    ->where(['user_name' => $search_val, 'pid' => $where['pid']])
                    ->getOne();
                if (!$agent) {
                    $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
                }
                $where['pid'] = ['=' => "{$agent['pid']}{$agent['id']},"];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
            }
        }
        $data = $user_model->where($where)
            ->order('modify_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $v['spreadLayer'] = $v['layer'] - $user['layer'];
            $v['agentList'] = $user_model->getAgentList($v['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    /**
     * 新增用户--只能新增代理和用户
     * /admin/user/add
     */
    public function add($type, $virtual, $user_name, $password, $nick_name = '', $fund_password = '', $area_code = '', $mobile = '', $email = '', $agentAcount = '')
    {
        $data = [
            'type' => intval($type),
            'virtual' => intval($virtual),
            'user_name' => trim($user_name),
            'password' => trim($password),
            'nick_name' => trim($nick_name),
            'fund_password' => trim($fund_password),
            'area_code' => intval($area_code),
            'mobile' => trim($mobile),
            'email' => trim($email),
        ];
        if (!in_array($data['type'], [1,2])) {
            $this->GlobalService->json(['code' => -2, 'msg' => 'Type参数异常']);
        }
        if (!in_array($data['virtual'], [0, 1])) {
            $this->GlobalService->json(['code' => -2, 'msg' => 'Virtual参数异常']);
        }
        if ($data['type'] == 2) {
            //代理
            $data['role_id'] = 2;
        }
        $user_model = user_model::getInstance();
        $adminUser = $this->GlobalService->getUser();
        if ($adminUser['type'] == 2) {
            //代理新增下级
            $data['layer'] = $adminUser['layer'] + 1;
            $data['pid'] = $adminUser['pid'] . $adminUser['id'] . ',';
        } else if (!empty($agentAcount)) {
            //有上级
            $where = ['type' => ['IN' => '1,2'], 'status' => ['>=' => 0]];
            if (Verify::isNumber($agentAcount)) {
                $where['id'] = $agentAcount;
            } else {
                $where['user_name'] = $agentAcount;
            }
            $agent = $user_model->where($where)->getOne();
            if ($data['type'] == 1 && $agent['type'] == 0) {
                $this->GlobalService->json(['code' => -2, 'msg' => '代理的上级不能是会员']);
            }
            if ($agent) {
                $data['layer'] = $agent['layer'] + 1;
                $data['pid'] = $agent['pid'] . $agent['id'] . ',';
            } else {
                $this->GlobalService->json(['code' => -2, 'msg' => '上级账号不存在']);
                return;
            }
        }
        $res = $user_model->reg($data);
        if ($res['code'] == 1) {
            $data['id'] = $res['id'];
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('新增用户', $data);
            /*********添加日志*********/
        }
        $this->GlobalService->json($res);
    }

    /**
     * 用户编辑
     * /admin/user/edit
     */
    public function edit($id, $type, $virtual, $waterAmount='',$password = '', $fund_password = '', $area_code = 0, $mobile = '', $email = '', $nick_name = '', $agentAcount = '', $status = 1)
    {
        $data = [
            'id' => $id,
            'type' => intval($type),
            'virtual' => intval($virtual),
            'password' => trim($password),
            'nick_name' => trim($nick_name),
            'fund_password' => trim($fund_password),
            'area_code' => intval($area_code),
            'mobile' => trim($mobile),
            'email' => trim($email),
            'status' => intval($status)
        ];
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $id, 'status' => ['>=' => 0]])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未找到用户数据']);
        }
        if ($user['type'] >= 10) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('用户编辑入侵', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => -2, 'msg' => '未找到用户数据']);
        }
        if ($data['type'] == 0) {
            //代理
            $data['role_id'] = 0;
        }else if($data['type'] == 1){
            $data['role_id'] = 2;
        }
        $agentAcount = trim($agentAcount);
        if (!empty($agentAcount)) {
            //有上级代理
            $where = ['type' => ['IN' => '1,2'], 'status' => ['>=' => 0]];
            if (Verify::isNumber($agentAcount)) {
                $where['id'] = $agentAcount;
            } else {
                $where['user_name'] = $agentAcount;
            }
            $agent = $user_model->where($where)->getOne();
            if ($agent) {
                $pid = $agent['pid'] . $agent['id'] . ',';
                if ($user['pid'] !== $pid) {
                    if ($user['type'] == 2 && $agent['type'] != 2) {
                        $this->GlobalService->json(['code' => -2, 'msg' => '代理账号的上级代理必须也是代理账号']);
                    }
                    if ($user['pid'] !== '' && Common::isStr($pid, $user['pid'] . $user['id'] . ',')) {
                        $this->GlobalService->json(['code' => -2, 'msg' => '代理不能是自己或者自己的下级']);
                    }
                    //修改上级代理
                    $data['pid'] = $pid;
                    $data['layer'] = $agent['layer'] + 1;
                }
            } else {
                $this->GlobalService->json(['code' => -2, 'msg' => '上级账号不存在']);
            }
        } else {
            //无上级代理
            if ($user['pid'] !== '') {
                //有上级代理变无代理
                $data['pid'] = '';
                $data['layer'] = 0;
            }
        }
        $res = $user_model->editUser($data);
        if ($res['code'] == 1) {
            if($waterAmount!==''){
                $water_amount = $user['water_amount'] + $waterAmount;
                $water_amount = $water_amount > 0 ? $water_amount : 0;
                $user_model->edit(['id' => $user['id'], 'water_amount' => $water_amount]);
            }
            if (isset($data['pid'])) {
                //代理更换
                $user_model->replaceAgent($user['pid'] . $user['id'] . ',', $data['pid'] . $data['id'] . ',');
            }
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('用户编辑', $data);
            /*********添加日志*********/
        }
        $this->GlobalService->json($res);
    }

    /**
     * 删除用户
     * /admin/user/del
     */
    public function del($id)
    {
        $user_model = user_model::getInstance();
        $res = $user_model->delById($id, ['type' => ['<' => 10]]);
        $this->GlobalService->json($res);
    }

    /**
     * 获取管理员吧列表
     * /admin/user/getAdminList
     */
    public function getAdminList($status = '', $search_key = 'user_name', $search_val = '', $page = 1, $limit = 15)
    {
        $where = [];
        $field = 'id,type,user_name,role_id,nick_name,create_time,login_time,create_ip,login_ip,status';
        $adminUser = $this->GlobalService->getUser();
        $role_menu_model = role_menu_model::getInstance();
        $GoogleSecret = $role_menu_model->apiAuth($adminUser['role_id'], 'GoogleSecret');
        if ($GoogleSecret) {
            $field .= ',secret';
        }
        $where['type'] = 10;
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status']['>='] = 0;
        }
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $where['user_name'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['id'] = $search_val;
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
            }
        }
        $user_model = user_model::getInstance();
        $data = $user_model->field($field)
            ->with(['role' => 'id,name'])
            ->where($where)
            ->order('modify_time DESC,id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    /**
     * 新增管理员
     * /admin/user/addAdmin
     * @throws \Exception
     */
    public function addAdmin($user_name = '', $password = '', $nick_name = '', $remark = '', $role_id = 10)
    {
        $secret = GoogleAuthenticatorService::getInstance()->createSecret();
        $data = [
            'type' => 10,
            'user_name' => trim($user_name),
            'nick_name' => trim($nick_name),
            'password' => trim($password),
            'role_id' => intval($role_id),
            'secret' => $secret,
            'remark' => $remark
        ];
        if ($data['role_id'] < 10) {
            $this->GlobalService->json(['code' => -2, 'msg' => '角色参数异常']);
        }
        $user_model = user_model::getInstance();
        $res = $user_model->reg($data);
        if ($res['code'] == 1) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('新增管理员', $data);
            /*********添加日志*********/
        }
        $this->GlobalService->json($res);
    }

    /**
     * 编辑管理员
     * /admin/user/editAdmin
     */
    public function editAdmin($id, $role_id, $password = '', $nick_name = '', $remark = '', $status = 1)
    {
        if ($role_id < 10) {
            $this->GlobalService->json(['code' => -2, 'msg' => '角色参数异常']);
        }
        $data = [
            'id' => $id,
            'nick_name' => trim($nick_name),
            'password' => trim($password),
            'role_id' => intval($role_id),
            'remark' => $remark,
            'status' => trim($status),
        ];
        $user_model = user_model::getInstance();
        $res = $user_model->editUser($data);
        if ($res['code'] == 1) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('管理员编辑', $data);
            /*********添加日志*********/
        }
        $this->GlobalService->json($res);
    }

    //重置谷歌密钥
    public function resetSecret($id)
    {
        $secret = GoogleAuthenticatorService::getInstance()->createSecret();
        $data = [
            'id' => intval($id),
            'secret' => $secret,
        ];
        $user_model = user_model::getInstance();
        $res = $user_model->editUser($data);
        if ($res['code'] == 1) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('重置谷歌密钥', $data);
            /*********添加日志*********/
        }
        $this->GlobalService->json($res);
    }


    /**
     * 删除管理员
     * /admin/user/delAdmin
     */
    public function delAdmin($id)
    {
        $user_model = user_model::getInstance();
        $res = $user_model->delById($id, ['type' => 10]);
        $this->GlobalService->json($res);
    }

    /**
     * 获取代理列表
     * /admin/user/getAgentList
     */
    public function getAgentList($virtual = '', $status = '', $date_time = [], $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = [];
        $where['type'] = 2;
        if ($virtual !== '') {
            $where['virtual'] = intval($virtual);
        }
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status']['>='] = 0;
        }
        $pid = $this->GlobalService->getPid();
        if ($pid) {
            $where['pid'] = ['LIKE' => $pid . '%'];
        }
        $user_model = user_model::getInstance();
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $where['user_name'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['id'] = $search_val;
            } else if ($search_key == 'email') {
                $where['email'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'mobile') {
                $where['mobile'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'agent') {
                $res = $user_model->field('id,pid')
                    ->where(['user_name' => $search_val, 'pid' => ['LIKE' => $pid . '%']])
                    ->getOne();
                if (!$res) {
                    $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
                }
                $where['pid'] = ['=' => "{$res['pid']}{$res['id']},"];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
            }
        }
        $data = $user_model->where($where)
            ->order('modify_time DESC,id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_recharge_model = user_recharge_model::getInstance();
        $user_withdraw_model = user_withdraw_model::getInstance();
        $ip_model = ip_model::getInstance();
        if ($date_time) {
            $dateWhere['create_time']['BETWEEN'] = [strtotime($date_time[0]), strtotime($date_time[1])];
        } else {
            $dateWhere = [];
        }
        foreach ($data['list'] as $k => $v) {
            $userWhere = ['virtual' => 0, 'status' => ['>=' => 0], 'pid' => ['LIKE' => $v['pid'] . $v['id'] . ',%']];
            $res = $ip_model->getData($v['login_ip']);
            if ($res['code'] == 1) {
                $v['ipAddress'] = $res['data']['address'];
            } else {
                $v['ipAddress'] = '-';
            }
            $res = $user_model->field('COUNT(*) AS nums,SUM(balance) AS balance')->where($userWhere)->getOne();
            //会员总人数
            $v['userNums'] = $res['nums'];
            //会员总余额
            $v['userBalance'] = $res['balance']?:'0.00';
            //充值
            $res = $user_recharge_model->sumUserAgentInfo($userWhere, $dateWhere);
            $v['recharge'] = $res['amount'];
            $v['rechargeNums'] = $res['nums'];
            $v['rechargeUserNums'] = $res['userNums'];
            $v['rechargeGift'] = $res['gift'];
            //提现
            $res = $user_withdraw_model->sumUserAgentInfo($userWhere, $dateWhere);
            $v['withdraw'] = $res['amount'];
            $v['withdrawNums'] = $res['nums'];
            $v['withdrawUserNums'] = $res['userNums'];
            //客损
            $v['ks'] = round($v['recharge'] - $v['withdraw'],2);
            //1代充值
            $userWhere['layer'] = $v['layer'] + 1;
            $v['recharge1'] = $user_recharge_model->sumUserAgentAmount($userWhere, $dateWhere);
            //2代充值
            $userWhere['layer'] = $v['layer'] + 2;
            $v['recharge2'] = $user_recharge_model->sumUserAgentAmount($userWhere, $dateWhere);
            //3代充值
            $userWhere['layer'] = $v['layer'] + 3;
            $v['recharge3'] = $user_recharge_model->sumUserAgentAmount($userWhere, $dateWhere);
            $v['agentList'] = $user_model->getAgentList($v['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    /**
     * 新增代理
     * /admin/user/add
     */
    public function addAgent($user_name, $password, $nick_name = '', $area_code = '', $mobile = '', $email = '')
    {
        $data = [
            'type' => 2,
            'virtual' => 0,
            'role_id' => 2,
            'user_name' => trim($user_name),
            'password' => trim($password),
            'nick_name' => trim($nick_name),
            'area_code' => intval($area_code),
            'mobile' => trim($mobile),
            'email' => trim($email),
        ];
        $adminUser = $this->GlobalService->getUser();
        if ($adminUser['type'] == 2) {
            //代理新增下级代理
            $data['layer'] = $adminUser['layer'] + 1;
            $data['pid'] = $adminUser['pid'] . $adminUser['id'] . ',';
        }
        $user_model = user_model::getInstance();
        $res = $user_model->reg($data);
        if ($res['code'] == 1) {
            $data['id'] = $res['id'];
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('新增代理', $data);
            /*********添加日志*********/
        }
        $this->GlobalService->json($res);
    }

    //编辑代理
    public function editAgent($id, $password = '', $area_code = 0, $mobile = '', $email = '', $nick_name = '', $status = 1)
    {
        $data = [
            'id' => $id,
            'password' => trim($password),
            'nick_name' => trim($nick_name),
            'area_code' => intval($area_code),
            'mobile' => trim($mobile),
            'email' => trim($email),
            'status' => intval($status)
        ];
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $id, 'status' => ['>=' => 0]])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未找到用户数据']);
        }
        if ($user['type'] >= 10) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('用户编辑入侵', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => -2, 'msg' => '未找到用户数据']);
        }
        $res = $user_model->editUser($data);
        if ($res['code'] == 1) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('代理编辑', $data);
            /*********添加日志*********/
        }
        $this->GlobalService->json($res);
    }

    /**
     * 获取代理列表
     * /admin/user/getAgentLayer
     */
    public function getAgentLayer($virtual = '', $pid = '',  $status = '',$date_time = [], $search_key = 'user_id', $search_val = '', $page = 1, $limit = 15)
    {
        $where = [];
        $where['type'] = 2;
        if ($virtual !== '') {
            $where['virtual'] = intval($virtual);
        }
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status']['>='] = 0;
        }
        if ($pid) {
            $where['pid'] = ['=' => $pid];
            $pid = $this->GlobalService->getPid();
            if ($pid) {
                $where['pid']['LIKE'] = $pid . '%';
            }
        } else {
            $pid = $this->GlobalService->getPid();
            $where['pid']['='] = $pid;
        }
        //搜索
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'user_name') {
                $where['user_name'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'user_id') {
                $where['id'] = $search_val;
            } else if ($search_key == 'email') {
                $where['email'] = ['LIKE' => '%' . $search_val . '%'];
            } else if ($search_key == 'mobile') {
                $where['mobile'] = ['LIKE' => '%' . $search_val . '%'];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
            }
        }
        $user_model = user_model::getInstance();
        $data = $user_model->where($where)
            ->order('modify_time DESC,id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $user_recharge_model = user_recharge_model::getInstance();
        $user_withdraw_model = user_withdraw_model::getInstance();
        if ($date_time) {
            $dateWhere['create_time']['BETWEEN'] = [strtotime($date_time[0]), strtotime($date_time[1])];
        } else {
            $dateWhere = [];
        }
        foreach ($data['list'] as $k => $v) {
            $userWhere = ['pid' => ['LIKE' => $v['pid'] . $v['id'] . ',%']];
            $v['xj'] = $user_model->where(['type' => 1, 'pid' => $v['pid'] . $v['id'].',', 'status' => ['>=' => 0]])->isExist();
            //充值
            $v['recharge'] = $user_recharge_model->sumUserAgentAmount($userWhere, $dateWhere);
            //提现
            $v['withdraw'] = $user_withdraw_model->sumUserAgentAmount($userWhere, $dateWhere);
            //客损
            $v['ks'] = $v['recharge'] - $v['withdraw'];
            $v['agentList'] = $user_model->getAgentList($v['pid']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    //获取推广信息
    public function getLink()
    {
        $adminUser=$this->GlobalService->getUser();
        $domain_model = domain_model::getInstance();
        $info=[];
        $info['downUrl'] = $domain_model->getUrl(3);
        if($adminUser['type']<10){
            $info['promoteUrl'] = $domain_model->getUrl() . '/?tid=' . $adminUser['tid'];
        }else{
            $info['promoteUrl'] = $domain_model->getUrl() . '/';
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }


}
