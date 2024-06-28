<?php
/**
 *用户充值
 */

namespace home\controller;

use asura\Common;
use asura\Log;
use Exception;
use home\classes\base;
use model\config_model;
use model\level_model;
use model\trade_model;
use model\user_balance_model;
use model\user_model;
use model\user_rebate_model;
use model\user_recharge_model;
use service\WebSocketService;

class userRecharge extends base
{
    //获取充值记录列表
    public function getList($status = '', $page = 1, $limit = 20)
    {
        if ($limit > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过100条数据']);
        }
        $user = $this->GlobalService->getUser();
        $user_recharge_model = user_recharge_model::getInstance();
        $where = ['user_id' => $user['id'], 'del' => 0];
        if ($status !== '') {
            $where['status'] = intval($status);
        }
        $list = $user_recharge_model->where($where)
            ->order('id DESC')
            ->limit($limit, $page)
            ->select();
        foreach ($list as $k => $v) {
            $v['info'] = json_decode($v['info'], true);
            if ($v['mode'] == 1) {
                $v['title'] = $this->GlobalService->translate($v['title']);
            }
            $v['amount']=Common::formatAmount($v['amount']);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    /**
     * 充值申请
     * /home/userRecharge/add
     */
    public function add($id, $amount, $img = '', $info = [])
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '通道已关闭']);
        $user = $this->GlobalService->getUser();
        if ($user['type'] == 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '模拟盘无法充值，请切换成实盘']);
        }
        $trade_model = trade_model::getInstance();
        $trade = $trade_model->where(['id' => intval($id), 'type' => 1])->getOne();
        if (!$trade) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的充值信息']);
        }
        if ($trade['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '充值通道已关闭']);
        }
        $config_model = config_model::getInstance();
        $OrderConfig = $config_model->getConfigData(7);
        $tradeInfo = json_decode($trade['info'], true);
        $infoObj = ['fn' => $trade['fn']];
        $data = [
            'user_id' => $user['id'],
            'mode' => $trade['mode'],
            'title' => $trade['title'],
            'order_no' => 'UR' . round(microtime(true) * 1000),
            'currency' => 'USDT',
            'rate' => 1,
            'amount' => $amount,
            'img' => $img,
            'status' => 2,
        ];
        if ($trade['mode'] == 1) {
            //线下充值
            if ($trade['fn'] == 'Bank' || $trade['fn'] == 'KeFu') {
                $infoObj = array_merge($infoObj, $tradeInfo);
            } else if ($trade['fn'] == 'Wallet') {
                if (!$info) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '请选择充值地址']);
                }
                //充值的货币
                if (empty($info['currency'])) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '货币参数异常']);
                }
                $currency = [];
                foreach ($tradeInfo as $v) {
                    if ($v['currency'] == $info['currency']) {
                        $data['currency'] = $v['currency'];
                        $data['rate'] = $v['rate'];
                        $infoObj['currency'] = $v['currency'];
                        $infoObj['rate'] = $v['rate'];
                        $infoObj['fixed'] = $v['fixed'];
                        $infoObj['symbol'] = $v['symbol'];
                        $currency = $v;
                        break;
                    }
                }
                if (!$currency) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '未知的货币']);
                }
                //链类型
                if (empty($info['chain'])) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '链参数异常']);
                }
                //充值地址
                foreach ($currency['chainList'] as $v) {
                    if ($v['chain'] == $info['chain']) {
                        $infoObj['chain'] = $v['chain'];
                        if ($info['address'] !== $v['address']) {
                            $this->GlobalService->json(['code' => -2, 'msg' => '充值钱包地址异常']);
                        }
                        $infoObj['address'] = $v['address'];
                        break;
                    }
                }
                if (!isset($infoObj['chain'])) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '链充值异常']);
                }
            }
            if ($OrderConfig['RechargeImg'] && empty($img)) {
                $this->GlobalService->json(['code' => -2, 'msg' => "请上传截图凭证"]);
            }
        }
        $data['info'] = json_encode($infoObj, JSON_UNESCAPED_UNICODE);
        if ($data['amount'] <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '请填写正确的金额']);
        }
        if ($data['amount'] < $trade['min']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "单笔充值金额不能小于{$trade['min']}"]);
        }
        if ($trade['max'] != '-1' && $data['amount'] > $trade['max']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "单笔充值金额不能大于{$trade['max']}"]);
        }
        if ($data['mode'] == 1 && $user['virtual'] == 1 && $OrderConfig['RechargeReview'] == 0) {
            //关闭虚拟号充值审核
            $data['status'] = 1;
            $data['real_amount'] = $data['amount'];
            if ($user['recharge_time'] == 0) {
                $data['is_first'] = 1;
            }
        }
        $user_recharge_model = user_recharge_model::getInstance();
        $dbh = $user_recharge_model->begin();
        try {
            $data['id'] = $user_recharge_model->add($data);
            if ($data['mode'] == 1) {
                if ($data['status'] == 1) {
                    //虚拟号自动充值通过
                    $user_model = user_model::getInstance();
                    if ($user['recharge_time'] == 0) {
                        $user_model->edit(['id' => $user['id'], 'recharge_time' => SYS_TIME]);
                    }
                    if ($data['currency'] == 'USDT') {
                        $res = $user_model->changeBalance($data['user_id'], $data['amount'], $data['title'], '充值到账', 1, $data['id']);
                        $user = $res['user'];
                    } else {
                        //其他货币充值
                        $user_balance_model = user_balance_model::getInstance();
                        $res = $user_balance_model->getData($data['user_id'], $data['currency']);
                        if ($res['code'] != 1) {
                            $dbh->rollBack();
                            $this->GlobalService->json($res);
                        }
                        $userBalance = $res['data'];
                        $user_balance_model->changeBalance($userBalance['id'], $data['amount'], $data['title'], '充值到账', 1, $data['id']);
                    }
                    //充值返佣
                    $agentList = $user_model->getAgentList($user['pid']);
                    $user_rebate_mode = user_rebate_model::getInstance();
                    $user_rebate_mode->rechargeRebate($data, $agentList);
                } else {
                    //消息推送
                    (WebSocketService::getInstance())->SendAdminTips('充值提示', '你有新的充值消息等待审核', 'reviewUserRecharge', 'UserRechargeList');
                }
                $dbh->commit();
                $this->GlobalService->json(['code' => 1, 'msg' => '提交成功,等待审核']);
            } else {
                $this->GlobalService->json(['code' => -2, 'msg' => '功能暂未开放']);
            }
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'addRecharge');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    /**
     * 单币种充值 只充值U自动换算汇率
     * /home/userRecharge/add
     */
    public function add2($id, $amount, $img = '', $info = [])
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        if($user['type']==2){
            $this->GlobalService->json(['code' => -2, 'msg' => '模拟盘无法充值，请切换成实盘']);
        }
        $trade_model = trade_model::getInstance();
        $trade = $trade_model->where(['id' => intval($id), 'type' => 1])->getOne();
        if (!$trade) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的充值信息']);
        }
        if ($trade['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '充值通道已关闭']);
        }
        $config_model = config_model::getInstance();
        $OrderConfig = $config_model->getConfigData(7);
        $tradeInfo = json_decode($trade['info'], true);
        $infoObj = ['fn' => $trade['fn']];
        $data = [
            'user_id' => $user['id'],
            'mode' => $trade['mode'],
            'title' => $trade['title'],
            'order_no' => 'UR' . round(microtime(true) * 1000),
            'currency' => 'USDT',
            'rate' => 1,
            'amount' => $amount,
            'img' => $img,
            'review_time' => SYS_TIME,
            'status' => 2,
        ];
        if ($trade['mode'] == 1) {
            //线下充值
            if ($trade['fn'] == 'Bank' || $trade['fn'] == 'KeFu') {
                $infoObj = array_merge($infoObj,$tradeInfo);
            } else if ($trade['fn'] == 'Wallet') {
                if (!$info) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '请选择充值地址']);
                }
                //充值的货币
                if (empty($info['currency'])) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '货币参数异常']);
                }
                $currency = [];
                foreach ($tradeInfo as $v) {
                    if ($v['currency'] == $info['currency']) {
                        $infoObj['currency'] = $v['currency'];
                        $infoObj['rate'] = $v['rate'];
                        $infoObj['fixed'] = $v['fixed'];
                        $infoObj['symbol'] = $v['symbol'];
                        $currency = $v;
                        break;
                    }
                }
                if (!$currency) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '未知的货币']);
                }
                //链类型
                if (empty($info['chain'])) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '链参数异常']);
                }
                //充值地址
                foreach ($currency['chainList'] as $v) {
                    if ($v['chain'] == $info['chain']) {
                        $infoObj['chain'] = $v['chain'];
                        if ($info['address'] !== $v['address']) {
                            $this->GlobalService->json(['code' => -2, 'msg' => '充值钱包地址异常']);
                        }
                        $infoObj['address'] = $v['address'];
                        break;
                    }
                }
                if (!isset($infoObj['chain'])) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '链充值异常']);
                }
            }
            if ($OrderConfig['RechargeImg'] && empty($img)) {
                $this->GlobalService->json(['code' => -2, 'msg' => "请上传截图凭证"]);
            }
        }
        $data['info'] = json_encode($infoObj, JSON_UNESCAPED_UNICODE);
        if ($data['amount'] <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '请填写正确的金额']);
        }
        if ($data['amount'] < $trade['min']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "单笔充值金额不能小于{$trade['min']}"]);
        }
        if ($trade['max'] != '-1' && $data['amount'] > $trade['max']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "单笔充值金额不能大于{$trade['max']}"]);
        }
        if ($data['mode'] == 1 && $user['virtual'] == 1 && $OrderConfig['RechargeReview'] == 0) {
            //关闭虚拟号充值审核
            $data['status'] = 1;
            $data['real_amount'] = $data['amount'];
            if ($user['recharge_time'] == 0) {
                $data['is_first'] = 1;
            }
        }
        $user_recharge_model = user_recharge_model::getInstance();
        $dbh = $user_recharge_model->begin();
        try {
            $data['id'] = $user_recharge_model->add($data);
            if ($data['mode'] == 1) {
                if ($data['status'] == 1) {
                    //虚拟号自动充值通过
                    $user_recharge_model->success($user,$data);
                } else {
                    //消息推送
                    (WebSocketService::getInstance())->SendAdminTips('充值提示', '你有新的充值消息等待审核', 'reviewUserRecharge', 'UserRechargeList');
                }
                $dbh->commit();
                $this->GlobalService->json(['code' => 1, 'msg' => '提交成功,等待审核']);
            } else {
                $this->GlobalService->json(['code' => -2, 'msg' => '功能暂未开放']);
            }
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'add2Recharge');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }


    //详情
    public function getInfo($id)
    {
        $user_recharge_model = user_recharge_model::getInstance();
        $user = $this->GlobalService->getUser();
        $userRecharge = $user_recharge_model->where(['id' => intval($id), 'user_id' => $user['id']])->getOne();
        if (!$userRecharge) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单不存在']);
        }
        $userRecharge['amount'] = Common::formatAmount($userRecharge['amount']);
        $userRecharge['info'] = json_decode($userRecharge['info'], true);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'data' => $userRecharge]);
    }

}
