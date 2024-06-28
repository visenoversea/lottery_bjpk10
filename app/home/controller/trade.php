<?php
/**
 *交易相关
 */

namespace home\controller;

use home\classes\base;
use model\trade_model;
use model\user_xpay_model;
use service\DPayService;
use service\XuPayService;

class trade extends base
{
    /**
     * 获取充值列表信息
     * /home/trade/getRechargeList
     */
    public function getRechargeList()
    {
        $trade_model = trade_model::getInstance();
        $list = $trade_model->where(['type' => 1, 'status' => 1])->order('sort DESC')->select();
        foreach ($list as $k => $v) {
            $v['title'] = $this->GlobalService->translate($v['title']);
            $v['info'] = json_decode($v['info'], true);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    /**
     * 获取提现列表信息
     * /home/trade/getWithdrawList
     */
    public function getWithdrawList()
    {
        $trade_model = trade_model::getInstance();
        $list = $trade_model->where(['type' => 2, 'status' => 1])->order('sort DESC')->select();
        foreach ($list as $k => $v) {
            $v['title'] = $this->GlobalService->translate($v['title']);
            $v['info'] = json_decode($v['info'], true);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    /**
     * 获取渠道详情
     * /home/trade/getWithdrawList
     * @param $id
     */
    public function getInfo($id)
    {
        $trade_model = trade_model::getInstance();
        $trade = $trade_model->getData($id);
        if (!$trade) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的交易信息']);
        }
        if ($trade['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '通道已经关闭']);
        }
        $user = $this->GlobalService->getUser();
        if ($trade['fn'] == 'DPay') {
            $trade['info'] = [[
                'chainList' => [],
                'currency' => 'USDT',
                'icon' => "/img/coin/usdt.png",
                'fixed' => 2,
                'rate' => 1,
                'symbol' => '',
            ]];
            $DPayService = DPayService::getInstance();
            $res = $DPayService->createOrder($user['id']);
            if ($res['code'] == 1) {
                $trade['info'][0]['chainList'] = [
                    ['chain' => 'TRC-20', 'address' => $res['data']['addressList']['TRC20']],
//                    ['chain' => 'ERC20', 'address' => $res['data']['addressList']['ERC20']]
                ];
            } else {
                $this->GlobalService->json($res);
            }
        } else if ($trade['fn'] == 'XuPay') {
            $trade['info'] = [[
                'chainList' => [],
                'currency' => 'USDT',
                'icon' => "/img/coin/usdt.png",
                'fixed' => 2,
                'rate' => 1,
                'symbol' => '',
            ]];
            $XuPayService = XuPayService::getInstance();
            $res = $XuPayService->createOrder($user['id']);
            if ($res['code'] == 1) {

                $recharge_address = $trade['info'][0]['chainList'] = [
                    ['chain' => 'TRC-20', 'address' => $res['data']['addressList']['TRC20']],
//                    ['chain' => 'ERC20', 'address' => $res['data']['addressList']['ERC20']]
                ];
                $user_xpay_model = user_xpay_model::getInstance();
                $userSpay = $user_xpay_model->where(['user_id' => $user['id'], 'address' => $res['data']['addressList']['TRC20']])
                    ->isExist();
                if (!$userSpay) {
                    $user_xpay_model->add(['user_id' => $user['id'], 'chain' => 'TRC-20', 'address' => $res['data']['addressList']['TRC20']]);
                }
            } else {
                $this->GlobalService->json($res);
            }
        } else {
            $trade['info'] = json_decode($trade['info'], true);
        }
        $trade['title'] = $this->GlobalService->translate($trade['title']);
        $trade['remark'] = $this->GlobalService->translate($trade['remark']);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $trade]);
    }

    //获取钱包配置
    public function getWalletConfig()
    {
        $trade_model = trade_model::getInstance();
        $data = $trade_model->getData(50);
        if (!$data) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的钱包配置']);
        }
        $info = json_decode($data['info'], true);
        if(isset($info['list'])){
            $list=$info['list'];
        }else{
            $list=[];
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

}
