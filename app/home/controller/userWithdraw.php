<?php
/**
 *提现
 */

namespace home\controller;

use asura\Common;
use asura\Log;
use asura\Param;
use Exception;
use home\classes\base;
use model\config_model;
use model\level_model;
use model\trade_model;
use model\user_balance_model;
use model\user_log_model;
use model\user_model;
use model\user_quantify_model;
use model\user_recharge_model;
use model\user_withdraw_model;
use service\WebSocketService;

class userWithdraw extends base
{
    /**
     * 获取记录列表
     * /home/userWithdraw/getList
     */
    public function getList($status = '', $page = 1, $limit = 20)
    {
        if ($limit > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过100条数据']);
        }
        $user = $this->GlobalService->getUser();
        $user_withdraw_model = user_withdraw_model::getInstance();
        $where = ['user_id' => $user['id'], 'del' => 0];
        if ($status !== '') {
            $where['status'] = intval($status);
            if ($where['status'] == 2) {
                $where['status'] = ['IN' => [2, 3]];
            }
        }
        $list = $user_withdraw_model->where($where)
            ->order('id DESC')
            ->limit($limit, $page)
            ->select();
        foreach ($list as $k => $v) {
            if ($v['status'] == 3) {
                $v['status'] = 2;
            }
            $v['info'] = json_decode($v['info'], true);
            if ($v['mode'] == 1) {
                $v['title'] = $this->GlobalService->translate($v['title']);
            }
            $v['amount']=Common::formatAmount($v['amount']);
            $v['apply_amount']=Common::formatAmount($v['apply_amount']);
			$v['fee'] = Common::formatAmount($v['fee']);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    /**
     * 提现货币到账对应货币
     * /home/userWithdraw/add
     */
//    public function add($id, $amount, $fundPassword='', $info = [])
//    {
//        if($this->systemUpgrade){
//            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
//        }
//        $user = $this->GlobalService->getUser();
//        if($user['type']==2){
//            $this->GlobalService->json(['code' => -2, 'msg' => '模拟盘无法充值，请切换成实盘']);
//        }
////        $user_real_model = user_real_model::getInstance();
////        $userReal = $user_real_model->where(['user_id' => $user['id'], 'del' => 0])->getOne();
////        if (!$userReal || $userReal['status'] != 1) {
////            $this->GlobalService->json(['code' => -2, 'msg' => '需要通过实名认证后才可以提款']);
////        }
//        if (in_array($user['status'], [2, 4])) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '提现异常，详情联系客服']);
//        }
//        if ($user['fund_password'] == '') {
//            $this->GlobalService->json(['code' => -2, 'msg' => '请先绑定提现密码']);
//        }
//        if (Param::md5str($fundPassword) !== $user['fund_password']) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '提现密码错误']);
//        }
//        $user_quantify_model = user_quantify_model::getInstance();
//        $res = $user_quantify_model->where(['user_id' => $user['id'], 'create_time' => ['<' => SYS_TIME - 86400 * 5]])->isExist();
//        if (!$res) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '需要操作5天以上才能申请提现']);
//        }
//        $user_withdraw_model = user_withdraw_model::getInstance();
//        if ($user_withdraw_model->where(['user_id' => $user['id'], 'status' => ['>' => 1]])->isExist()) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '你有提现申请未完成,无法提交新的申请']);
//        }
//        $trade_model = trade_model::getInstance();
//        $trade = $trade_model->where(['id' => $id, 'type' => 2])->getOne();
//        if (!$trade) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '未知的交易信息']);
//        }
//        if ($trade['status'] != 1) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '提现通道已关闭']);
//        }
//        $tradeInfo = json_decode($trade['info'], true);
//        $data = [
//            'user_id' => $user['id'],
//            'mode' => $trade['mode'],
//            'title' => $trade['title'],
//            'order_no' => 'UW' . round(microtime(true) * 1000),
//            'currency' => 'USDT',
//            'rate' => 1,
//            'apply_amount' => round($amount, 8),
//            'fee' => 0,
//            'status' => 2
//        ];
//        $data['amount'] = $data['apply_amount'];
//        if ($data['amount'] <= 0) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '请填写正确的金额']);
//        }
//        if ($data['amount'] < $trade['min']) {
//            $this->GlobalService->json(['code' => -2, 'msg' => "单笔提现金额不能小于{$trade['min']}"]);
//        }
//        if ($trade['max'] != '-1' && $data['amount'] > $trade['max']) {
//            $this->GlobalService->json(['code' => -2, 'msg' => "单笔提现金额不能大于{$trade['max']}"]);
//        }
//        //提现信息
//        $infoObj = ['fn' => $trade['fn']];
//        $config_model = config_model::getInstance();
//        if ($trade['fn'] == 'Bank') {
//            if (!$info) {
//                $this->GlobalService->json(['code' => -2, 'msg' => '请补充提现信息']);
//            }
//            //银行名称
//            if (empty($info['bank_name'])) {
//                $this->GlobalService->json(['code' => -2, 'msg' => '提现银行不能为空']);
//            }
//            $infoObj['bank_name'] = $info['bank_name'];
//            //卡号
//            if (empty($info['card_number'])) {
//                $this->GlobalService->json(['code' => -2, 'msg' => '银行卡号不能为空']);
//            }
//            $infoObj['card_number'] = $info['card_number'];
//            //姓名
//            if (empty($info['name'])) {
//                $this->GlobalService->json(['code' => -2, 'msg' => '姓名不能为空']);
//            }
//            $infoObj['name'] = $info['name'];
//            //银行代码
//            if (!empty($info['bank_code'])) {
//                $infoObj['bank_code'] = $info['bank_code'];
//            }
//            //开户分行
//            if (!empty($info['branch'])) {
//                $infoObj['branch'] = $info['branch'];
//            }
//            //汇率
//            $infoObj['currency'] = $tradeInfo['currency'];
//            $infoObj['symbol'] = $tradeInfo['symbol'];
//            $infoObj['rate'] = $tradeInfo['rate'];
//            $infoObj['fee'] = $tradeInfo['fee'];
//            $infoObj['fixed'] = $tradeInfo['fixed'];
//            $data['apply_amount'] = round($data['apply_amount'], $infoObj['fixed']);
//            $data['amount'] = round($data['amount'], $infoObj['fixed']);
//            //手续费
//            if ($tradeInfo['fee'] > 0) {
//                if ($tradeInfo['fee'] >= 1) {
//                    //固定手续费
//                    $data['fee'] = $tradeInfo['fee'];
//                } else {
//                    //按照比例收取
//                    $data['fee'] = round($data['amount'] * $tradeInfo['fee'], $infoObj['fixed']);
//                }
//                $WithdrawModel = $config_model->getConfig(7, 'WithdrawModel');
//                if ($WithdrawModel == 1) {
//                    //金额外收取手续费
//                    $data['apply_amount'] = round($data['amount'] + $data['fee'], $infoObj['fixed']);
//                } else {
//                    //金额内收取手续费
//                    $data['amount'] = round($data['apply_amount'] - $data['fee'], $infoObj['fixed']);
//                }
//            }
//        } else if ($trade['fn'] == 'Wallet') {
//            if (!$info) {
//                $this->GlobalService->json(['code' => -2, 'msg' => '请补充钱包信息']);
//            }
//            //货币
//            if (empty($info['currency'])) {
//                $this->GlobalService->json(['code' => -2, 'msg' => '货币不能为空']);
//            }
//            //寻找钱包配置
//            $currency = [];
//            foreach ($tradeInfo['list'] as $v) {
//                if ($v['currency'] == $info['currency']) {
//                    $currency = $v;
//                    $data['currency'] = $v['currency'];
//                    $data['rate'] = $v['rate'];
//                    $infoObj['currency'] = $v['currency'];
//                    $infoObj['symbol'] = $v['symbol'];
//                    $infoObj['rate'] = $v['rate'];
//                    $infoObj['fee'] = $v['fee'];
//                    $infoObj['fixed'] = $v['fixed'];
//                    $data['apply_amount'] = round($data['apply_amount'], $infoObj['fixed']);
//                    $data['amount'] = round($data['amount'], $infoObj['fixed']);
//                    //手续费
//                    if ($v['fee'] > 0) {
//                        if ($v['fee'] >= 1) {
//                            //固定手续费
//                            $data['fee'] = $v['fee'];
//                        } else {
//                            //按照比例收取
//                            $data['fee'] = round($data['amount'] * $v['fee'],$infoObj['fixed']);
//                        }
//                        $WithdrawModel = $config_model->getConfig(7, 'WithdrawModel');
//                        if ($WithdrawModel == 1) {
//                            //金额外收取手续费
//                            $data['apply_amount'] = round($data['amount'] + $data['fee'], $infoObj['fixed']);
//                        } else {
//                            //金额内收取手续费
//                            $data['amount'] = round($data['apply_amount'] - $data['fee'], $infoObj['fixed']);
//                        }
//                    }
//                    break;
//                }
//            }
//            //链类型
//            if (empty($info['chain'])) {
//                $this->GlobalService->json(['code' => -2, 'msg' => '链类型不能为空']);
//            }
//            if (!in_array($info['chain'], $currency['chainList'])) {
//                $this->GlobalService->json(['code' => -2, 'msg' => '链类型参数异常']);
//            }
//            $infoObj['chain'] = $info['chain'];
//            //链地址
//            if (empty($info['address'])) {
//                $this->GlobalService->json(['code' => -2, 'msg' => '链地址不能为空']);
//            }
//            $infoObj['address'] = $info['address'];
//        } else if ($trade['fn'] == 'KeFu') {
//            $infoObj['currency'] = $tradeInfo['currency'];
//            $infoObj['symbol'] = $tradeInfo['symbol'];
//            $infoObj['rate'] = $tradeInfo['rate'];
//            $infoObj['fee'] = $tradeInfo['fee'];
//            $infoObj['fixed'] = $tradeInfo['fixed'];
//            $data['apply_amount'] = round($data['apply_amount'], $infoObj['fixed']);
//            $data['amount'] = round($data['amount'], $infoObj['fixed']);
//            //手续费
//            if ($tradeInfo['fee'] > 0) {
//                if ($tradeInfo['fee'] >= 1) {
//                    //固定手续费
//                    $data['fee'] = $tradeInfo['fee'];
//                } else {
//                    //按照比例收取
//                    $data['fee'] = round($data['amount'] * $tradeInfo['fee'],$infoObj['fixed']);
//                }
//                $WithdrawModel = $config_model->getConfig(7, 'WithdrawModel');
//                if ($WithdrawModel == 1) {
//                    //金额外收取手续费
//                    $data['apply_amount'] = round($data['amount'] + $data['fee'],$infoObj['fixed']);
//                } else {
//                    //金额内收取手续费
//                    $data['amount'] = round($data['apply_amount'] - $data['fee'], $infoObj['fixed']);
//                }
//            }
//        }
//        $data['info'] = json_encode($infoObj, JSON_UNESCAPED_UNICODE);
//        $WithdrawReview = $config_model->getConfig(7,'WithdrawReview');
//        if ($user['virtual'] == 1 && $WithdrawReview == 0) {
//            //关闭虚拟号提现审核
//            $data['status'] = 1;
//            $data['real_amount'] = $data['amount'];
//            $data['review_time'] = SYS_TIME;
//        }
//        $user_model = user_model::getInstance();
//        $dbh = $user_withdraw_model->begin();
//        try {
//            //扣除金额
//            $data['id'] = $user_withdraw_model->add($data);
//            //冻结金额
//            if ($data['currency'] == 'USDT') {
//                $res = $user_model->changeBalance($data['user_id'], -$data['apply_amount'], $data['title'], '提款审核中', 2, $data['id']);
//                if ($res['user']['balance'] < 0) {
//                    $dbh->rollBack();
//                    $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
//                }
//            } else {
//                //其他货币提现
//                $user_balance_model = user_balance_model::getInstance();
//                $res = $user_balance_model->getData($data['user_id'], $data['currency']);
//                if ($res['code'] != 1) {
//                    $dbh->rollBack();
//                    $this->GlobalService->json($res);
//                }
//                $userBalance = $res['data'];
//                $res = $user_balance_model->changeBalance($userBalance['id'], -$data['apply_amount'], $data['title'], '提款审核中', 2, $data['id']);
//                if ($res['data']['balance'] < 0) {
//                    $dbh->rollBack();
//                    $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
//                }
//            }
//            if ($data['status'] != 1) {
//                (WebSocketService::getInstance())->SendAdminTips('提现提示', '你有新的提现消息等待审核', 'reviewUserWithdraw', 'UserWithdrawList');
//            }
//            $dbh->commit();
//            $this->GlobalService->json(['code' => 1, 'msg' => '申请成功,等待审核']);
//        } catch (Exception $e) {
//            $dbh->rollBack();
//            Log::logException($e, 'addUserWithdraw');
//            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
//        }
//    }

    /**
     * 提现U到账对应货币
     * /home/userWithdraw/add2
     */
    public function add2($id, $amount, $fundPassword = '', $info = [])
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        if ($user['type'] == 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '模拟盘无法充值，请切换成实盘']);
        }
//        $user_real_model = user_real_model::getInstance();
//        $userReal = $user_real_model->where(['user_id' => $user['id'], 'del' => 0])->getOne();
//        if (!$userReal || $userReal['status'] != 1) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '需要通过实名认证后才可以提款']);
//        }
        if (in_array($user['status'], [2, 4])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '提现异常，详情联系客服']);
        }
        if ($user['fund_password'] == '') {
            $this->GlobalService->json(['code' => -2, 'msg' => '请先绑定提现密码']);
        }
        if (Param::md5str($fundPassword) !== $user['fund_password']) {
            $this->GlobalService->json(['code' => -2, 'msg' => '提现密码错误']);
        }
//        $user_quantify_model = user_quantify_model::getInstance();
        $user_withdraw_model = user_withdraw_model::getInstance();
        if ($user['virtual'] == 0) {
//            $res = $user_quantify_model->where(['user_id' => $user['id'], 'create_time' => ['<' => SYS_TIME - 86400 * 3]])->isExist();
//            ///XM个别用户不需要超过三天提现
//            if(in_array($user['id'], [19879442, 19879442,19879427,19878634, 19878636,19878591,19878786, 19878633]))
//            {
//                $res=1;
//            }
//            if($user['withdraw_value']==1){
//                $res=1;
//            }
//            if (!$res) {
//                $this->GlobalService->json(['code' => -2, 'msg' => '需要操作3天以上才能申请提现']);
//            }
            if ($user_withdraw_model->where(['user_id' => $user['id'], 'del'=>0,'status' => ['>' => 1]])->isExist()) {
                $this->GlobalService->json(['code' => -2, 'msg' => '你有提现申请未完成,无法提交新的申请']);
            }
            if ($user_withdraw_model->where(['user_id' => $user['id'], 'review_time' => ['>' => SYS_TIME - 86400 * 2], 'del'=>0,'status' => 1])->isExist()) {
                $this->GlobalService->json(['code' => -2, 'msg' => '提款失败,距上次提款未超过48小时']);
            }
        }
        $trade_model = trade_model::getInstance();
        $trade = $trade_model->where(['id' => $id, 'type' => 2])->getOne();
        if (!$trade) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的交易信息']);
        }
        if ($trade['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '提现通道已关闭']);
        }
        $tradeInfo = json_decode($trade['info'], true);
        $data = [
            'user_id' => $user['id'],
            'mode' => $trade['mode'],
            'title' => $trade['title'],
            'order_no' => 'UW' . round(microtime(true) * 1000),
            'currency' => 'USDT',
            'rate' => 1,
            'apply_amount' => round($amount, 2),
            'fee' => 0,
            'review_time' => SYS_TIME,
            'status' => 2
        ];
        $data['amount'] = $data['apply_amount'];
        if ($data['amount'] <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '请填写正确的金额']);
        }
        if ($data['amount'] < $trade['min']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "单笔提现金额不能小于{$trade['min']}"]);
        }
        if ($trade['max'] != '-1' && $data['amount'] > $trade['max']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "单笔提现金额不能大于{$trade['max']}"]);
        }
        //提现信息
        $infoObj = ['fn' => $trade['fn']];
        $config_model = config_model::getInstance();
        if ($trade['fn'] == 'Bank') {
            if (!$info) {
                $this->GlobalService->json(['code' => -2, 'msg' => '请补充提现信息']);
            }
            //银行名称
            if (empty($info['bank_name'])) {
                $this->GlobalService->json(['code' => -2, 'msg' => '提现银行不能为空']);
            }
            $infoObj['bank_name'] = $info['bank_name'];
            //卡号
            if (empty($info['card_number'])) {
                $this->GlobalService->json(['code' => -2, 'msg' => '银行卡号不能为空']);
            }
            $infoObj['card_number'] = $info['card_number'];
            //姓名
            if (empty($info['name'])) {
                $this->GlobalService->json(['code' => -2, 'msg' => '姓名不能为空']);
            }
            $infoObj['name'] = $info['name'];
            //银行代码
            if (!empty($info['bank_code'])) {
                $infoObj['bank_code'] = $info['bank_code'];
            }
            //开户分行
            if (!empty($info['branch'])) {
                $infoObj['branch'] = $info['branch'];
            }
            //汇率
            $infoObj['currency'] = $tradeInfo['currency'];
            $infoObj['symbol'] = $tradeInfo['symbol'];
            $infoObj['rate'] = $tradeInfo['rate'];
            $infoObj['fee'] = $tradeInfo['fee'];
            $infoObj['fixed'] = $tradeInfo['fixed'];
//            //手续费
//            if ($tradeInfo['fee'] > 0) {
//                //金额外收取手续费
//                if ($tradeInfo['fee'] >= 1) {
//                    //固定手续费
//                    $data['fee'] = $tradeInfo['fee'];
//                } else {
//                    //按照比例收取
//                    $data['fee'] = round($data['amount'] * $tradeInfo['fee'], 2);
//                }
//                $WithdrawModel = $config_model->getConfig(7, 'WithdrawModel');
//                if ($WithdrawModel == 1) {
//                    //金额外收取手续费
//                    $data['apply_amount'] = round($data['amount'] + $data['fee'], 2);
//                } else {
//                    //金额内收取手续费
//                    $data['amount'] = round($data['apply_amount'] - $data['fee'], 2);
//                }
//            }
        } else if ($trade['fn'] == 'Wallet') {
            if (!$info) {
                $this->GlobalService->json(['code' => -2, 'msg' => '请补充钱包信息']);
            }
            //货币
            if (empty($info['currency'])) {
                $this->GlobalService->json(['code' => -2, 'msg' => '货币不能为空']);
            }
            //寻找钱包配置
            $currency = [];
            foreach ($tradeInfo['list'] as $v) {
                if ($v['currency'] == $info['currency']) {
                    $currency = $v;
                    $infoObj['currency'] = $v['currency'];
                    $infoObj['symbol'] = $v['symbol'];
                    $infoObj['rate'] = $v['rate'];
                    $infoObj['fee'] = $v['fee'];
                    $infoObj['fixed'] = $v['fixed'];
                    break;
                }
            }
            //链类型
            if (empty($info['chain'])) {
                $this->GlobalService->json(['code' => -2, 'msg' => '链类型不能为空']);
            }
            if (!in_array($info['chain'], $currency['chainList'])) {
                $this->GlobalService->json(['code' => -2, 'msg' => '链类型参数异常']);
            }
            $infoObj['chain'] = $info['chain'];
            //链地址
            if (empty($info['address'])) {
                $this->GlobalService->json(['code' => -2, 'msg' => '链地址不能为空']);
            }
            $infoObj['address'] = $info['address'];
        } else if ($trade['fn'] == 'KeFu') {
            $infoObj['currency'] = $tradeInfo['currency'];
            $infoObj['symbol'] = $tradeInfo['symbol'];
            $infoObj['rate'] = $tradeInfo['rate'];
            $infoObj['fee'] = $tradeInfo['fee'];
            $infoObj['fixed'] = $tradeInfo['fixed'];
        }
        //完成量化任务
//        $level_model = level_model::getInstance();
//        $level = $level_model->getData($user['level_id']);
//        $todayNums = $user_quantify_model->getTodayNums($user['id']);
//        if ($todayNums < $level['nums']) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '今日量化任务未完成,无法提现']);
//        }
        //提现手续费  首笔免费，17天无提现免手续费
//        $user_withdraw_model = user_withdraw_model::getInstance();
        $lastWithdraw = $user_withdraw_model->where(['user_id' => $user['id'], 'status' => 1])->order('review_time desc')->getOne();
        if(!$lastWithdraw || ($lastWithdraw['review_time'] + 86400 * 17) <= time()) {
            $infoObj['fee'] = 0;
        }
        $data['fee'] = 1.00;
        if ($infoObj['fee'] > 0) {
            //金额外收取手续费
            if ($infoObj['fee'] >= 1) {
                //固定手续费
                $data['fee'] = $infoObj['fee'];
            } else {
                //按照比例收取
                $data['fee'] = bcmul($data['amount'],$infoObj['fee'],4);
                if($data['fee'] < 1) $data['fee'] = 1.00;
                if($data['fee'] > 50) $data['fee'] = 50.00;
            }

        }
        $data['real_amount'] = bcsub($data['amount'],$data['fee'],4);
        $data['info'] = json_encode($infoObj, JSON_UNESCAPED_UNICODE);
        if ($user['balance'] < $data['amount']) {
            $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
        }
        if ($user['virtual'] == 1) {
            //关闭虚拟号提现审核
            $data['status'] = 1;
            $data['real_amount'] = $data['amount'];
        }
        $user_withdraw_model = user_withdraw_model::getInstance();
        $user_model = user_model::getInstance();
        $dbh = $user_withdraw_model->begin();
        try {
            //扣除金额
            $data['before_balance'] = $user['balance'];
            $data['id'] = $user_withdraw_model->add($data);
            //冻结金额
            $res = $user_model->changeBalance($data['user_id'], -$data['apply_amount'], $data['title'], '提款审核中', 2, $data['id']);
            if ($res['user']['balance'] < 0) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
            }
            if ($data['status'] != 1) {
                (WebSocketService::getInstance())->SendAdminTips('提现提示', '你有新的提现消息等待审核', 'reviewUserWithdraw', 'UserWithdrawList');
            }
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '申请成功,等待审核', '$data' => $data]);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'addUserWithdraw');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    public function getInfo($id)
    {
        $user = $this->GlobalService->getUser();
        $user_withdraw_model = user_withdraw_model::getInstance();
        $info = $user_withdraw_model->where(['id' => intval($id), 'user_id' => $user['id']])->getOne();
        if (!$info) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单不存在']);
        }
        if ($info['status'] == 3) {
            $info['status'] = 2;
        }
        $info['amount']=Common::formatAmount($info['amount']);
        $info['apply_amount']=Common::formatAmount($info['apply_amount']);
		$info['fee'] = Common::formatAmount($info['fee']);
        $info['info'] = json_decode($info['info'], true);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    //取消提现订单
    public function cancel($id)
    {
        $user = $this->GlobalService->getUser();
        $user_withdraw_model = user_withdraw_model::getInstance();
        $userWithdraw = $user_withdraw_model->where(['id' => intval($id), 'user_id' => $user['id'], 'del' => 0])->getOne();
        if (!$userWithdraw) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的订单']);
        }
        if ($userWithdraw['status']!=2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '撤销失败,当前状态无法取消订单']);
        }
        $data = [
            'id' => $userWithdraw['id'],
            'review_time' => SYS_TIME,
            'operator' => $user['user_name'],
            'reason' => 'Cancel Order',
            'status' => 0
        ];
        $dbh = $user_withdraw_model->begin();
        try {
            $res = $user_withdraw_model->edit($data, ['status' => 2]);
            if (!$res) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '撤销失败']);
            }
            $user_model = user_model::getInstance();
            $res = $user_model->changeBalance($userWithdraw['user_id'], $userWithdraw['apply_amount'], $userWithdraw['title'], '提现驳回', 2, $userWithdraw['id']);
            $user = $res['user'];
            $level_model = level_model::getInstance();
            $res = $level_model->upLevel($user);
            //判断上级代理升级
            if ($res['code'] == 1) {
                $agentList = $user_model->getAgentList($user['pid']);
                if ($agentList) {
                    $level_model->upAgentLevel($agentList);
                }
            }
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('用户提现订单撤回', $data);
            /*********添加日志*********/
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userWithdrawReview');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }

    }

}
