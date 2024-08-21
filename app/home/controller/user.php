<?php
/**
 *用户
 */

namespace home\controller;

use asura\Common;
use asura\Param;
use home\classes\base;
use model\domain_model;
use model\send_model;
use model\user_balance_model;
use model\user_bet_item_model;
use model\user_bet_model;
use model\user_model;
use model\user_product_lever_model;
use model\user_real_model;
use asura\Illuminate\DB;
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
            'balance_mop' => Common::formatAmount($user['balance'] * 8,2),
            'wallet_address' => $user['wallet_address'],
            'create_time' => $user['create_time'],
            'tid'=>$user['tid'],
            'status' => $user['status'],
            'level_id' => $user['level_id'],
            'level' => 'VIP' . $user['level_id'],
        ];
        $data['promoteUrl'] = (domain_model::getInstance())->getUrl() . '/?tid=' . $data['tid'];
        $user_real_model = user_real_model::getInstance();
        $userReal = $user_real_model->where(['user_id' => $data['id'], 'del' => 0])->getOne();
        if ($userReal) {
            $data['userReal'] = $userReal;
            unset($data['userReal']['operator']);
        } else {
            $data['userReal'] = (object)[];
        }

        //今日盈亏
//        $todayWin = 0.00;
        $winAmount = DB::table('user_bet_item')->where('user_id',$user['id'])->where('create_time','>=',strtotime('today'))->sum('win_amount' );
        $betAmount = DB::table('user_bet_item')->where('user_id',$user['id'])->where('create_time','>=',strtotime('today'))->sum('bet_amount' );
        $data['todayWin'] = bcsub($winAmount,$betAmount,2);
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
        if ($user['type'] == 0) {
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
                    'type' => 0,
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

    //余额列表
    public function getBalanceList($type = 1)
    {
        $user = $this->GlobalService->getUser();
        if ($type == 1) {
            $user_product_lever_model = user_product_lever_model::getInstance();
            $freeze = $user_product_lever_model->getAmountByUser($user['id']);
            $list = [
                [
                    'id' => 0,
                    'product_id' => 0,
                    'icon' => '/img/icon/usdt.png',
                    'currency' => 'USDT',
                    'balance' => Common::formatAmount($user['balance']),
                    'freeze' => $freeze,
                    'amount_fixed' => 2,
                    'usdtRate' => 1
                ],
            ];
            $user_balance_model = user_balance_model::getInstance();
            $userBalancelist = $user_balance_model->with(['product' => 'id,title,icon,price'])
                ->where(['user_id' => $user['id'], 'status' => 1])
                ->order('create_time desc')
                ->select();
            foreach ($userBalancelist as $v) {
                $list[] = [
                    'id' => $v['id'],
                    'product_id' => $v['product_id'],
                    'icon' => $v['product']['icon'],
                    'currency' => $v['currency'],
                    'balance' => Common::formatAmount($v['balance']),
                    'amount_fixed' => $v['amount_fixed'],
                    'usdtRate' => $v['product']['price']
                ];
            }
        } else if ($type == 2) {
            $list = [
                ['id' => 0, 'product_id' => 0, 'icon' => '/img/icon/usdt.png', 'currency' => 'USDT', 'balance' => Common::formatAmount($user['deposit']), 'amount_fixed' => 2, 'usdtRate' => 1]
            ];
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    //重置余额
    public function resetBalance()
    {
        $user = $this->GlobalService->getUser();
        if ($user['type'] != 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '无法重置']);
        }
        $user_model = user_model::getInstance();
        $user_model->edit(['id' => $user['id'], 'balance' => 1000000]);
        $this->GlobalService->json(['code' => 1, 'msg' => '重置成功']);
    }

    //获取统计信息
    public function getTotalInfo()
    {
        //总资产
        $user = $this->GlobalService->getUser();
        $info = ['totalAmount' => round($user['balance'], 2)];
        $user_bet_model = user_bet_model::getInstance();
        $today = strtotime('today');
        $res = $user_bet_model->sumInfo(['user_id' => $user['id'], 'create_time' => ['>=' => $today], 'status' => ['>' => 0]]);
        $info['betBmount'] = $res['betBmount'];
        $info['winAmount'] = $res['winAmount'];
        $info['todayProfit'] = Common::formatAmount($info['winAmount'] - $info['betBmount'], 2);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    /**
     * 绑定资金密码
     * /home/user/bindFundPassword
     */
    public function editFundPassword($password, $oldPassword = '')
    {
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
