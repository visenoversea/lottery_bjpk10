<?php
/**
 *用户
 */

namespace home\controller;

use asura\Common;
use asura\Log;
use asura\Param;
use home\classes\base;
use model\domain_model;
use model\level_model;
use model\send_model;
use model\user_amount_model;
use model\user_balance_model;
use model\user_model;
use model\user_product_lever_model;
use model\user_quantify_model;
use model\user_real_model;
use Exception;
use model\user_rebate_model;
use model\user_recharge_model;
use service\RedisService;

class user extends base
{

    /**
     * 获取用户信息
     * /home/user/getInfo
     */
    public function getInfo()
    {
        $user = $this->GlobalService->getUser();
        $data = [
            'id' => $user['id'],
            'type' => $user['type'],
            'user_name' => $user['user_name'],
            'nick_name' => $user['nick_name'],
            'area_code' => $user['area_code'],
            'mobile' => $user['mobile'],
            'email' => $user['email'],
            'avatar' => empty($user['avatar']) ? '/img/avatar/0.png' : $user['avatar'],
            'login_ip' => $user['login_ip'],
            'balance' => $user['balance'],
            'deposit' => $user['deposit'],
            'wallet_address' => $user['wallet_address'],
            'create_time' => $user['create_time'],
            'tid' => $user['tid'],
            'status' => $user['status']
        ];
        //量化
        $level_model = level_model::getInstance();
        $data['level'] = $level_model->getData($user['level_id']);
        if (!$data['level']) {
            $data['level'] = (object)[];
        } else {
            if ($user['recharge_amount'] < 30 && $user['level_id']==1) {
                $data['level']['title'] = 'VIP0';
            }
        }
        $user_quantify_model = user_quantify_model::getInstance();
        $data['level']['todayNums'] = $user_quantify_model->getTodayNums($user['id']);
        $data['userQuantify'] = $user_quantify_model->where([
            'user_id' => $user['id'],
            'status' => 2,
        ])->getOne();
        if($data['userQuantify']){
            $data['level']['taskStatus'] = 1;
        }else{
            $data['userQuantify']=(object)[];
            $data['level']['taskStatus'] = 0;
        }
        $data['freeze'] = 0;
        $data['promoteUrl'] = (domain_model::getInstance())->getNowUrl() . '/#/register?tid=' . $data['tid'];
        $user_real_model = user_real_model::getInstance();
        $userReal = $user_real_model->where(['user_id' => $data['id'], 'del' => 0])->getOne();
        if ($userReal) {
            $data['userReal'] = $userReal;
            unset($data['userReal']['operator']);
        } else {
            $data['userReal'] = (object)[];
        }
        //绑定提现密码状态
        $data['fundPasswordStatus'] = empty($user['fund_password']) ? 0 : 1;
        $data['passwordStatus'] = empty($user['password']) ? 0 : 1;
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data]);
    }

    //切换虚拟盘或者实盘
    public function setDisk()
    {
        $user = $this->GlobalService->getUser();
        $token = $this->GlobalService->getToken();
        $user_model = user_model::getInstance();
        if ($user['type'] == 2) {
            //切换实盘
            $data = explode('_', $user['user_name']);
            $user = $user_model->where(['id' => intval($data[1])])->getOne();
        } else {
            //切换虚拟盘
            $user_name = 'u_' . $user['id'];
            $user = $user_model->where(['user_name' => $user_name])->getOne();
            if (!$user) {
                //没有虚拟账户，创建
                $res = $user_model->reg([
                    'type' => 2,
                    'virtual' => 1,
                    'user_name' => $user_name,
                    'balance' => 1000000,
                    'password' => '24&@#' . mt_rand(1000, 9999)
                ], $token['auth']);
                if ($res['code'] == 1) {
                    $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'token' => $res['token']]);
                }
                $this->GlobalService->json(['code' => -2, 'msg' => '系统异常']);
            }
        }
        if ($user) {
            $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'token' => $user_model->getToken($user, $token['auth'])]);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '系统异常']);
    }

    //重置余额
    public function resetBalance()
    {
        $user = $this->GlobalService->getUser();
        if ($user['type'] != 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '无法重置']);
        }
        $user_model = user_model::getInstance();
        $user_model->edit(['id' => $user['id'], 'balance' => 1000000]);
        $this->GlobalService->json(['code' => 1, 'msg' => '重置成功']);
    }

    //余额列表
    public function getBalanceList($type = 1)
    {
        $user = $this->GlobalService->getUser();
        if ($type == 1) {
            $list = [
                [
                    'id' => 0,
                    'product_id' => 0,
                    'icon' => '/img/icon/usdt.png',
                    'currency' => 'USDT',
                    'balance' => Common::formatAmount($user['balance']),
                    'freeze' => 0,
                    'amount_fixed' => 2,
                    'usdtRate' => 1
                ]
            ];
        } else if ($type == 2) {
            $list = [
                ['id' => 0, 'product_id' => 0, 'icon' => '/img/icon/usdt.png', 'currency' => 'USDT', 'balance' => Common::formatAmount($user['deposit']), 'amount_fixed' => 2, 'usdtRate' => 1]
            ];
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    //划转
    public function transfer($from, $to, $amount)
    {
        if ($amount <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '请填写正确的划转金额']);
        }
        $user = $this->GlobalService->getUser();
        if ($from == 1) {
            //币币账户
            if ($user['balance'] < $amount) {
                $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
            }
        } else if ($from == 2) {
            //合约账户
            if ($user['deposit'] < $amount) {
                $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
            }
        } else {
            $this->GlobalService->json(['code' => -2, 'msg' => '账户异常']);
        }
        if ($to == 1) {
            //币币账户
            if ($from == 1) {
                $this->GlobalService->json(['code' => -2, 'msg' => '同账户无法转入']);
            }
        } else if ($to == 2) {
            //合约账户
            if ($from == 2) {
                $this->GlobalService->json(['code' => -2, 'msg' => '同账户无法转入']);
            }
        } else {
            $this->GlobalService->json(['code' => -2, 'msg' => '账户异常']);
        }
        $user_model = user_model::getInstance();
        $dbh = $user_model->begin();
        try {
            if ($from == 1) {
                $res = $user_model->changeBalance($user['id'], -$amount, 'USDT', '划转', 8);
                $user_model->changeDeposit($user['id'], $amount, 'USDT', '划转', 8);
                if ($res['user']['balance'] < 0) {
                    $dbh->rollBack();
                    $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
                }
            } else if ($from == 2) {
                $user_model->changeBalance($user['id'], $amount, 'USDT', '划转', 8);
                $res = $user_model->changeDeposit($user['id'], -$amount, '划转', 8);
                if ($res['user']['deposit'] < 0) {
                    $dbh->rollBack();
                    $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
                }
            }
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '划转成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userTransfer');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    //获取量化信息
    public function getQuantifyInfoBak()
    {
        $today = strtotime('today');
        $user = $this->GlobalService->getUser();
        $user_quantify_model = user_quantify_model::getInstance();
        $quantifyProfit = $user_quantify_model->getSumAmount($user['id']);
        $todayProfit = $user_quantify_model->getSumAmount($user['id'], ['create_time' => ['>=' => $today]]);
        $yesterdayProfit = $user_quantify_model->getSumAmount($user['id'], ['create_time' => ['>=' => strtotime('yesterday'), '<' => $today]]);
        $user_rebate_model = user_rebate_model::getInstance();
        $todayRebateAmount = $user_rebate_model->getSumAmount($user['id'], ['create_time' => ['>=' => strtotime('today')]]);
        $rebateAmount = $user_rebate_model->getSumAmount($user['id']);
        $user_recharge_model = user_recharge_model::getInstance();
        $totalProfit = $quantifyProfit + $rebateAmount;
        $res = $user_recharge_model->field('SUM(amount) AS amount')
            ->where(['user_id' => $user['id'], 'real_amount' => 0])
            ->getOne();
        $giftAmount = $res['amount'] ?: 0;
        $totalProfit += $giftAmount;
        $user_amount_model = user_amount_model::getInstance();
        $res = $user_amount_model->field('SUM(amount) AS amount')
            ->where(['user_id' => $user['id'], 'type' => 0, 'del' => 0, 'des' => '晋级奖励'])
            ->getOne();
        $rewardAmount = $res['amount'] ?: 0;
        $totalProfit += $rewardAmount;
        $info = [
            //总余额
            'balance' => $user['balance'],
            //总收益
            'totalProfit' => Common::formatAmount($totalProfit, 2),
            //今日收益
            'todayProfit' => $todayProfit,
            //昨日收益
            'yesterdayProfit' => $yesterdayProfit,
            //今日佣金
            'todayRebateAmount' => $todayRebateAmount
        ];
        $user_model = user_model::getInstance();
        $where = [
            'pid' => ['LIKE' => $user['pid'] . $user['id'] . '%'],
            'layer' => $user['layer'] + 1,
            'type' => ['<' => 10],
            'status' => ['>=' => 0]
        ];
        //1代人数
        $info['agent1'] = $user_model->where($where)->count();
        $info['agentValid1'] = $user_model->where(array_merge($where, ['recharge_amount' => ['>=' => 30]]))->count();
        //2代人数
        $where['layer']++;
        $info['agent2'] = $user_model->where($where)->count();
        $info['agentValid2'] = $user_model->where(array_merge($where, ['recharge_amount' => ['>=' => 30]]))->count();
        //3代人数
        $where['layer']++;
        $info['agent3'] = $user_model->where($where)->count();
        $info['agentValid3'] = $user_model->where(array_merge($where, ['recharge_amount' => ['>=' => 30]]))->count();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    //获取量化信息
    public function getQuantifyInfo()
    {
        $RedisService = RedisService::getInstance();
        $today = strtotime('today');
        $yesterday = $today - 86400;
        $user = $this->GlobalService->getUser();
        $user_quantify_model = user_quantify_model::getInstance();
        $todayQuantifyProfit = $user_quantify_model->getSumAmount($user['id'], ['create_time' => ['>=' => $today]]);
        $yesterdayQuantifyProfit = $user_quantify_model->getSumAmount($user['id'], ['create_time' => ['>=' => $yesterday, '<' => $today]]);
        //本月收益
        $month = strtotime(date('Y-m-01'));
        $monthQuantifyProfit = $user_quantify_model->getSumAmount($user['id'], ['create_time' => ['>=' => $month]]);

        $quantifyKey = 'cacheHomeUserQuantify';
        $quantifyProfit = $RedisService->getRedisData($quantifyKey, function () use ($user, $yesterday, $user_quantify_model) {
            return $user_quantify_model->getSumAmount($user['id'], ['create_time' => ['<' => $yesterday]]);
        }, md5($user['id'] . '-' . $yesterday), 86400);
        //$quantifyProfit = $user_quantify_model->getSumAmount($user['id'], ['create_time' => ['<' => strtotime('yesterday')]]);
        $quantifyProfit = $quantifyProfit + $todayQuantifyProfit + $yesterdayQuantifyProfit;

        $user_rebate_model = user_rebate_model::getInstance();
        $todayRebateAmount = $user_rebate_model->getSumAmount($user['id'], ['create_time' => ['>=' => $today]]);
        //本月返佣
        $monthRebateAmount = $user_rebate_model->getSumAmount($user['id'], ['create_time' => ['>=' => $month]]);
        $RebateKey = 'cacheHomeRebate';
        $rebateAmount = $RedisService->getRedisData($RebateKey, function () use ($user, $today, $user_rebate_model) {
            return $user_rebate_model->getSumAmount($user['id'], ['create_time' => ['<' => $today]]);
        }, md5($user['id'] . '-' . $today), 86400);
        $rebateAmount = $rebateAmount + $todayRebateAmount;

        $user_recharge_model = user_recharge_model::getInstance();
        $totalProfit = $quantifyProfit + $rebateAmount;
        $res = $user_recharge_model->field('SUM(amount) AS amount')
            ->where(['user_id' => $user['id'], 'real_amount' => 0])
            ->getOne();
        $giftAmount = $res['amount'] ?: 0;
        $totalProfit += $giftAmount;
        $user_amount_model = user_amount_model::getInstance();
        $res = $user_amount_model->field('SUM(amount) AS amount')
            ->where(['user_id' => $user['id'], 'type' => 0, 'del' => 0, 'des' => '晋级奖励'])
            ->getOne();
        $rewardAmount = $res['amount'] ?: 0;
        $totalProfit += $rewardAmount;
        $info = [
            //总余额
            'balance' => $user['balance'],
            //总收益
            'totalProfit' => Common::formatAmount($totalProfit, 2),
            //今日量化收益
            'todayQuantifyProfit' => $todayQuantifyProfit,
            //昨日量化收益
            'yesterdayQuantifyProfit' => $yesterdayQuantifyProfit,
            //本月量化收益
            'monthQuantifyProfit'=>$monthQuantifyProfit,
            //量化总收益
            'quantifyProfit' => $quantifyProfit,
            //今日佣金
            'todayRebateAmount' => $todayRebateAmount,
            //本月佣金
            'monthRebateAmount' => $monthRebateAmount,
            //总佣金
            'rebateAmount' => $rebateAmount,
        ];
        $user_model = user_model::getInstance();
        $where = [
            'pid' => ['LIKE' => $user['pid'] . $user['id'] . '%'],
            'layer' => $user['layer'] + 1,
            'type' => ['<' => 10],
            'status' => ['>=' => 0]
        ];
        //1代人数
        $info['agent1'] = $user_model->where($where)->count();
        $info['agentValid1'] = $user_model->where(array_merge($where, ['recharge_amount' => ['>=' => 30]]))->count();
        //2代人数
        $where['layer']++;
        $info['agent2'] = $user_model->where($where)->count();
        $info['agentValid2'] = $user_model->where(array_merge($where, ['recharge_amount' => ['>=' => 30]]))->count();
        //3代人数
        $where['layer']++;
        $info['agent3'] = $user_model->where($where)->count();
        $info['agentValid3'] = $user_model->where(array_merge($where, ['recharge_amount' => ['>=' => 30]]))->count();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    /**
     * 绑定资金密码
     * /home/user/bindFundPassword
     */
    public function editFundPassword($password, $oldPassword = '')
    {
        if ($this->systemUpgrade) {
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        if (!empty($user['fund_password'])) {
            if (Param::md5str($oldPassword) !== $user['fund_password']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '旧密码错误']);
            }
        }
        $data = ['id' => $user['id'], 'fund_password' => $password];
        $user_model = user_model::getInstance();
        $res = $user_model->editUser($data);
        $this->GlobalService->json($res);
    }

    //修改登陆密码
    public function editPassword($password, $oldPassword = '')
    {
        if ($this->systemUpgrade) {
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        //验证旧的密码
        if (!empty($user['password'])) {
            if (Param::md5str($oldPassword) !== $user['password']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '旧密码错误']);
            }
        }
        $data = ['id' => $user['id'], 'password' => $password];
        $user_model = user_model::getInstance();
        $res = $user_model->editUser($data);
        $this->GlobalService->json($res);
    }

    public function editMobile($area_code, $mobile, $code, $oldCode = '')
    {
        if ($this->systemUpgrade) {
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        //验证验证码
        $send_record_model = send_model::getInstance();
        if (!empty($user['mobile'])) {
            //验证旧的手机号验证码
            $res = $send_record_model->VerifyCode($user['area_code'] . $user['mobile'], $oldCode);
            if ($res['code'] !== 1) {
                $this->GlobalService->json($res);
            }
        }
        $res = $send_record_model->VerifyCode($area_code . $mobile, $code);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $data = [
            'id' => $user['id'],
            'area_code' => $area_code,
            'mobile' => $mobile,
        ];
        $user_model = user_model::getInstance();
        $res = $user_model->editUser($data);
        $this->GlobalService->json($res);
    }

    public function editEmail($email, $code, $oldCode = '')
    {
        if ($this->systemUpgrade) {
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        //验证验证码
        $send_record_model = send_model::getInstance();
        if (!empty($user['email'])) {
            //验证旧的手机号验证码
            $res = $send_record_model->VerifyCode($user['email'], $oldCode);
            if ($res['code'] !== 1) {
                $this->GlobalService->json($res);
            }
        }
        $res = $send_record_model->VerifyCode($email, $code);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $data = ['id' => $user['id'], 'email' => $email];
        $user_model = user_model::getInstance();
        $res = $user_model->editUser($data);
        $this->GlobalService->json($res);
    }

    public function edit($nick_name = '', $avatar = '')
    {
        if ($this->systemUpgrade) {
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        $data = ['id' => $user['id']];
        if ($nick_name !== '') {
            $data['nick_name'] = trim($nick_name);
        }
        if ($avatar !== '') {
            $data['avatar'] = $avatar;
        }
        $user_model = user_model::getInstance();
        $res = $user_model->editUser($data);
        $this->GlobalService->json($res);
    }

}
