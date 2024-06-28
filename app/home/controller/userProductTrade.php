<?php
/**
 *币币交易
 */

namespace home\controller;

use asura\Common;
use asura\Log;
use home\classes\base;
use model\product_model;
use model\user_balance_model;
use Exception;
use model\user_model;
use model\user_product_trade_model;

class userProductTrade extends base
{
    public function getList($status = '', $page = 1, $limit = 20)
    {
        if ($limit > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过100条数据']);
        }
        $user = $this->GlobalService->getUser();
        $user_product_trade_model = user_product_trade_model::getInstance();
        $where = ['user_id' => $user['id'], 'del' => 0];
        if ($status !== '') {
            $where['status'] = intval($status);
            if ($where['status'] == 1) {
                $where['status'] = ['IN' => [0, 1]];
            }
        }
        $list = $user_product_trade_model->with(['product' => 'id,price,fixed,amount_fixed'])
            ->where($where)
            ->order('id DESC')
            ->limit($limit, $page)
            ->select();
        foreach ($list as $k => $v) {
            $v['trade_price'] = Common::formatAmount($v['trade_price']);
            $v['wt_price'] = Common::formatAmount($v['wt_price']);
            $v['amount'] = Common::formatAmount($v['amount']);
            $v['trade_amount'] = Common::formatAmount($v['trade_amount']);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    public function getInfo($id)
    {
        $user = $this->GlobalService->getUser();
        $user_product_trade_model = user_product_trade_model::getInstance();
        $info = $user_product_trade_model->where(['id' => $id, 'user_id' => $user['id']])->getOne();
        if ($info) {
            $info['trade_price'] = Common::formatAmount($info['trade_price']);
            $info['wt_price'] = Common::formatAmount($info['wt_price']);
            $info['amount'] = Common::formatAmount($info['amount']);
            $info['trade_amount'] = Common::formatAmount($info['trade_amount']);
        } else {
            $info = (object)[];
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    public function add($id, $side, $amount, $type = 1, $price = '')
    {
        $user = $this->GlobalService->getUser();
        if (in_array($user['status'], [3, 4])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '下单异常，详情联系客服']);
        }
        $product_model = product_model::getInstance();
        $product = $product_model->where(['id' => intval($id), 'type' => 0])->getOne();
        if (!$product) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的产品']);
        }
        if ($product['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已停止交易']);
        }
        $currency = explode('/', $product['title']);
        $product['baseCurrency'] = $currency[1] ?: '';
        $product['quoteCurrency'] = $currency[0];
        $data = [];
        $data['user_id'] = $user['id'];
        //标题
        $data['title'] = $product['title'];
        $data['product_id'] = $product['id'];
        $data['order_no'] = 'UPT' . round(microtime(true) * 1000);
        //交易方向  买涨 买跌
        $data['side'] = $side == 1 ? 1 : 2;
        if ($type == 1) {
            //市价委托
            $data['trade_price'] = $data['wt_price'] = $product['price'];
            //交易时间
            $data['trade_time'] = SYS_TIME;
            $data['status'] = 1;
        } else {
            //限价委托
            $data['trade_price'] = $data['wt_price'] = round($price, $product['fixed']);
            if ($data['wt_price'] <= 0) {
                $this->GlobalService->json(['code' => -2, 'msg' => '委托价格不能小于0']);
            }
            $data['status'] = 2;
        }
        //金额
        $data['amount'] = round($amount, 8);
        if ($data['amount'] <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '金额异常']);
        }
        //获取配置
        $dataConfig = json_decode($product['data_config'], true);
        unset($product['data_config']);
        $tradeConfig = $dataConfig['trade'];
        if ($data['side'] == 1) {
            if (isset($tradeConfig['buyMin']) && $data['amount'] < $tradeConfig['buyMin']) {
                $this->GlobalService->json(['code' => -2, 'msg' => "限制:{$tradeConfig['buyMin']}"]);
            }
            $data['currency'] = $product['baseCurrency'];
            $data['trade_currency'] = $product['quoteCurrency'];
            $data['trade_amount'] = round($data['amount'] / $data['trade_price'], $product['amount_fixed']);
        } else {
            if (isset($tradeConfig['sellMin']) && $data['amount'] < $tradeConfig['sellMin']) {
                $this->GlobalService->json(['code' => -2, 'msg' => "限制:{$tradeConfig['sellMin']}"]);
            }
            $data['currency'] = $product['quoteCurrency'];
            $data['trade_currency'] = $product['baseCurrency'];
            $data['trade_amount'] = round($data['amount'] * $data['trade_price'], 2);
        }
        $user_model = user_model::getInstance();
        $user_balance_model = user_balance_model::getInstance();
        $user_product_trade_model = user_product_trade_model::getInstance();
        $dbh = $user_product_trade_model->begin();
        try {
            $data['id'] = $user_product_trade_model->add($data);
            if ($data['currency'] == 'USDT') {
                if ($user['balance'] < $data['amount']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
                }
                $res = $user_model->changeBalance($data['user_id'], -$data['amount'], $data['title'], '委托购买', 4, $data['id']);
                if ($res['user']['balance'] < 0) {
                    $dbh->rollBack();
                    $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
                }
            } else {
                $res = $user_balance_model->getData($data['user_id'], $data['currency']);
                if ($res['code'] !== 1) {
                    $this->GlobalService->json($res);
                }
                $userBalance = $res['data'];
                if ($userBalance['balance'] < $data['amount']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
                }
                $user_balance_model->changeBalance($userBalance['id'], -$data['amount'], $data['title'], '委托购买', 4, $data['id']);
            }
            if ($data['status'] == 1) {
                $des = $data['side'] == 1 ? '购买成功' : '出售成功';
                if ($data['trade_currency'] == 'USDT') {
                    $user_model = user_model::getInstance();
                    $user_model->changeBalance($data['user_id'], $data['trade_amount'], $data['title'], $des, 4, $data['id']);
                } else {
                    $user_balance_model = user_balance_model::getInstance();
                    $res = $user_balance_model->getData($data['user_id'], $data['trade_currency']);
                    if ($res['code'] !== 1) {
                        $dbh->rollBack();
                        return;
                    }
                    $userBalance = $res['data'];
                    $user_balance_model->changeBalance($userBalance['id'], $data['trade_amount'], $data['title'], $des, 4, $data['id']);
                }
            }
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '下单成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userProductTradeAdd');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    //取消委托订单
    public function cancel($id)
    {
        $user = $this->GlobalService->getUser();
        $user_product_trade_model = user_product_trade_model::getInstance();
        $userProductTrade = $user_product_trade_model
            ->where(['id' => $id, 'user_id' => $user['id'], 'del' => 0])
            ->getOne();
        if (!$userProductTrade) {
            $this->GlobalService->json(['code' => -2, 'msg' => '委托订单不存在']);
        }
        if ($userProductTrade['status'] != 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单状态已变更，无法取消']);
        }
        $res = $user_product_trade_model->cancel($userProductTrade);
        $this->GlobalService->json($res);
    }


}
