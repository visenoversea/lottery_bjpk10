<?php
/**
 *系统相关
 */

namespace admin\controller;

use admin\classes\base;
use asura\Log;
use model\config_model;
use model\level_model;
use model\role_menu_model;
use model\user_amount_model;
use model\user_log_model;
use model\user_model;
use model\user_recharge_model;
use model\user_withdraw_model;
use Exception;
use service\RedisService;

class system extends base
{

    /**
     * 后台初始化
     * /admin/system/init
     */
    public function init()
    {
        $adminUser = $this->GlobalService->getUser();
        $role_menu_model = role_menu_model::getInstance();
        $list = $role_menu_model->getRoleMenuList($adminUser['role_id']);
        $menuList = [];
        $apiList = [];
        foreach ($list as $v) {
            if ($v['type'] == 1) {
                //菜单权限
                $menuList[] = $v;
            } else {
                //api接口权限
                $apiList[] = $v['name'];
            }
        }
        $user = [
            'id' => $adminUser['id'],
            'type' => $adminUser['type'],
            'nick_name' => $adminUser['nick_name'],
            'avatar' => $adminUser['avatar'] ?: '/img/logo.png',
            'user_name' => $adminUser['user_name'],
            'login_ip' => $adminUser['login_ip'],
            'login_time' => $adminUser['login_time']
        ];
        $config_model = config_model::getInstance();
        $system = $config_model->getConfigData(1);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功',
            'system'=>$system,
            'menuList' => $menuList,
            'apiList' => $apiList,
            'user' => $user
        ]);
    }


    //充值撤回
    public function rechargeBack($orderNo = '')
    {
        if (empty($orderNo)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单号不能为空']);
        }
        $user_recharge_model = user_recharge_model::getInstance();
        $userRecharge = $user_recharge_model->with(['user' => '*'])
            ->where(['order_no' => $orderNo])->getOne();
        if (!$userRecharge) {
            $this->GlobalService->json(['code' => -2, 'msg' => '充值订单不存在']);
        }
        if (!in_array($userRecharge['status'], [0, 1, 3])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '当前订单状态不可撤回']);
        }
        if ($userRecharge['status'] != 3 && $userRecharge['review_time'] < SYS_TIME - 86400) {
            $this->GlobalService->json(['code' => -2, 'msg' => '审核超过一天的订单无法撤回']);
        }
        $dbh = $user_recharge_model->begin();
        try {
            $data = ['id' => $userRecharge['id'], 'real_amount' => 0, 'reason' => '', 'status' => 2];
            $res = $user_recharge_model->edit($data, ['status' => $userRecharge['status']]);
            if (!$res) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '操作失败,订单状态已变更']);
            }
            if ($userRecharge['status'] == 1) {
                //充值成功的订单扣钱
                if ($userRecharge['amount'] > $userRecharge['user']['balance']) {
                    $dbh->rollBack();
                    $this->GlobalService->json(['code' => -2, 'msg' => '用户余额不足，订单无法撤回']);
                }
                $user_model = user_model::getInstance();
                $res = $user_model->changeBalance($userRecharge['user_id'], -$userRecharge['amount'], $userRecharge['title'], '充值撤回', 1, $userRecharge['id'], 0);
                if ($res['user']['balance'] < 0) {
                    $dbh->rollBack();
                    $this->GlobalService->json(['code' => -2, 'msg' => '用户余额不足，订单无法撤回']);
                }
                //删除账变
                $user_amount_model = user_amount_model::getInstance();
                $user_amount_model->edit(['status' => -1], ['type' => 1, 'user_id' => $userRecharge['user_id'], 'key_id' => $userRecharge['id']]);
            }
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('用户充值订单撤回待审核', array_merge($userRecharge, $data));
            /*********添加日志*********/
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '撤回成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userRechargeBack');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    //提现撤回
    public function withdrawBack($orderNo = '')
    {
        if (empty($orderNo)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单号不能为空']);
        }
        $user_withdraw_model = user_withdraw_model::getInstance();
        $userWithdraw = $user_withdraw_model->with(['user' => '*'])
            ->where(['order_no' => $orderNo])->getOne();
        if (!$userWithdraw) {
            $this->GlobalService->json(['code' => -2, 'msg' => '提现订单不存在']);
        }
        if (!in_array($userWithdraw['status'], [0, 1, 3])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '当前订单状态不可撤回']);
        }
        if ($userWithdraw['status'] != 3 && $userWithdraw['review_time'] < SYS_TIME - 86400) {
            $this->GlobalService->json(['code' => -2, 'msg' => '审核超过一天的订单无法撤回']);
        }
        $dbh = $user_withdraw_model->begin();
        try {
            $data = ['id' => $userWithdraw['id'], 'real_amount' => 0, 'reason' => '', 'status' => 2];
            $res = $user_withdraw_model->edit($data, ['status' => $userWithdraw['status']]);
            if (!$res) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '操作失败,订单状态已变更']);
            }
            if ($userWithdraw['status'] == 0) {
                //提现失败的订单扣钱
                if ($userWithdraw['amount'] > $userWithdraw['user']['balance']) {
                    $dbh->rollBack();
                    $this->GlobalService->json(['code' => -2, 'msg' => '用户余额不足，订单无法撤回']);
                }
                $user_model = user_model::getInstance();
                $res = $user_model->changeBalance($userWithdraw['user_id'], -$userWithdraw['apply_amount'], $userWithdraw['title'], '提现撤回', 2, $userWithdraw['id'], 0);
                if ($res['user']['balance'] < 0) {
                    $dbh->rollBack();
                    $this->GlobalService->json(['code' => -2, 'msg' => '用户余额不足，订单无法撤回']);
                }
                //删除账变
                $user_amount_model = user_amount_model::getInstance();
                $user_amount_model->edit(['status' => -1], ['type' => 2, 'amount' => ['>' => 0], 'user_id' => $userWithdraw['user_id'], 'key_id' => $userWithdraw['id']]);
            }
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('用户提现订单撤回待审核', array_merge($userWithdraw, $data));
            /*********添加日志*********/
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '撤回成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userRechargeBack');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }

    }

    //禁用代理线
    public function disableAgentLine($userId = '')
    {
        if (empty($userId)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户id不能为空']);
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => $userId])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
        }
        $pid = $user['pid'] . $user['id'] . ',';
        $nums = $user_model->edit(['status' => 0], [
            'pid' => ['LIKE' => "{$pid}%"],
            'recharge_amount' => 0,
            'status' => ['<>' => 0]
        ]);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog("禁用代理线{$nums}个用户", $userId);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => "已禁用{$nums}用户"]);
    }

    //等级排查
    public function userUpLevel($userId = '')
    {
        if (empty($userId)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户id不能为空']);
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => intval($userId)])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户不存在']);
        }
        $agentList = $user_model->getAgentList($user['pid']);
        $level_model = level_model::getInstance();
        $res = $level_model->upLevel($user);
        //判断上级代理升级
        if ($res['code'] == 1 && $agentList) {
            $level_model->upAgentLevel($agentList);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 清除缓存
     * /admin/system/clearCache
     */
    public function clearCache()
    {
        $RedisService=RedisService::getInstance();
        $RedisService->flushdb();
        $this->GlobalService->json(['code' => 1, 'msg' => '清理完成']);
    }
    public function addWhiteIp($ip = '')
    {
        if (empty($ip)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '请输入ip地址']);
        }
        $ip_white_model = ip_white_model::getInstance();
        $one = $ip_white_model->where(['ip'=>$ip])->getOne();
        if ($one) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已经存在该ip地址']);
        }

        $id = $ip_white_model->add(['ip'=>$ip]);
        if(!$id){
            $this->GlobalService->json(['code' => -2, 'msg' => '操作失败']);
        }

        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('加后台的ip白名单', $ip, $id);
        /*********添加日志*********/

        $this->GlobalService->json(['code' => 1, 'msg' => "操作完成"]);
    }

}
