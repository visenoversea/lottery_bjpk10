<?php
/**
 *用户合约
 */

namespace home\controller;

use asura\Common;
use asura\Log;
use home\classes\base;
use model\product_model;
use model\user_model;
use model\user_product_contract_model;
use Exception;

class userProductContract extends base
{
    public function getList($status = '', $page = 1, $limit = 20)
    {
        if ($limit > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过100条数据']);
        }
        $user = $this->GlobalService->getUser();
        $user_product_contract_model = user_product_contract_model::getInstance();
        $where = ['user_id' => $user['id'], 'del' => 0];
        if ($status !== '') {
            $where['status'] = intval($status);
        }
        $list = $user_product_contract_model->with(['product'=>'id,price,fixed,amount_fixed'])
            ->where($where)
            ->order('id DESC')
            ->limit($limit, $page)
            ->select();
        foreach ($list as $k=>$v){
            $v['open_price'] = Common::formatAmount($v['open_price']);
            $v['sell_price'] = Common::formatAmount($v['sell_price']);
            $v['tp_price'] = Common::formatAmount($v['tp_price']);
            $v['sl_price'] = Common::formatAmount($v['sl_price']);
            $v['wt_price'] = Common::formatAmount($v['wt_price']);
            $list[$k]=$v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    public function getInfo($id)
    {
        $user = $this->GlobalService->getUser();
        $user_product_contract_model = user_product_contract_model::getInstance();
        $info = $user_product_contract_model->where(['id'=>$id, 'user_id' => $user['id']])->getOne();
        if($info){
            $info['open_price'] = Common::formatAmount($info['open_price']);
            $info['sell_price'] = Common::formatAmount($info['sell_price']);
            $info['tp_price'] = Common::formatAmount($info['tp_price']);
            $info['sl_price'] = Common::formatAmount($info['sl_price']);
            $info['wt_price'] = Common::formatAmount($info['wt_price']);
        }else{
            $info=(object)[];
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }
    
    //下单 $type  1-市价 2-限价
    public function add($id, $amount, $side, $multiple, $type = 1, $price='', $tpPrice = '', $slPrice = '')
    {
        $user = $this->GlobalService->getUser();
        if (in_array($user['status'], [3, 4])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '下单异常，详情联系客服']);
        }
        $product_model = product_model::getInstance();
        $product = $product_model->where(['id' => intval($id), 'type' => 1])->getOne();
        if (!$product) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的产品']);
        }
        if ($product['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已停止交易']);
        }
        $data_config = json_decode($product['data_config'], true);
        unset($product['data_config']);
        $contractConfigList = $data_config['contract'];
        $contractConfig = [];
        if ($contractConfigList) {
            foreach ($contractConfigList as $v) {
                if ($v['multiple'] == $multiple) {
                    $contractConfig = $v;
                    break;
                }
            }
        }
        if(!$contractConfig){
            $this->GlobalService->json(['code' => -2, 'msg' => '未找到配置']);
        }
        $data = [];
        $data['user_id'] = $user['id'];
        $data['product_id'] = $product['id'];
        $data['order_no'] = 'UPC' . round(microtime(true) * 1000);
        //交易方向  买涨 买跌
        $data['side'] = $side == 1 ? 1 : 2;
        //标题
        $data['title'] = $product['title'];
        $data['fixed'] = $product['fixed'];
        $data['multiple'] = $contractConfig['multiple'];
        if(!is_numeric($amount)){
            $this->GlobalService->json(['code' => -2, 'msg' => '请输入下单金额']);
        }
        $data['amount'] = floor($amount * 100) / 100;
        if (isset($contractConfig['min']) && $data['amount'] < $contractConfig['min']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "下单金额限制:{$contractConfig['min']}"]);
        }
        if (isset($contractConfig['max']) && $contractConfig['max'] != -1 && $data['amount'] > $contractConfig['max']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "最大限制:{$contractConfig['max']}"]);
        }
        if ($data['amount'] < 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '下单金额不能小于1']);
        }
        if ($product['fee_rate'] > 0) {
            if ($product['fee_rate'] >= 1) {
                //固定手续费
                $data['fee'] = $product['fee_rate'];
            } else {
                //按照比例收取
                $data['fee'] = floor($data['amount'] * $data['multiple'] * $product['fee_rate'] * 100) / 100;
            }
        } else {
            $data['fee'] = 0;
        }
        if ($user['balance'] < ($data['amount'] + $data['fee'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => "余额不足"]);
        }
        if ($user['balance'] < $product['min']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "下单失败,余额限制:{$product['min']}"]);
        }
        //止盈价
        $data['tp_price'] = $tpPrice ?: 0;
        //止损价
        $data['sl_price'] = $slPrice ?: 0;
        if ($type == 1) {
            //市价委托
            $data['open_price'] = $data['wt_price'] = $product['price'];
            //开仓时间
            $data['open_time'] = SYS_TIME;
            $data['trade_amount'] = round($data['amount'] * $data['multiple'] / $data['open_price'], 8);
            if ($data['trade_amount'] <= 0) {
                $this->GlobalService->json(['code' => -2, 'msg' => '交易数量不足']);
            }
            if ($data['side'] == 1) {
                //做多
                $data['enforce_price'] = $data['open_price'] - $data['open_price'] / $data['multiple'];
                if ($data['tp_price'] > 0 && $data['tp_price'] <= $data['open_price']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需大于开仓价']);
                }
                if ($data['sl_price'] > 0 && $data['sl_price'] >= $data['open_price']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '止损价需小于开仓价']);
                }
            } else {
                //做空
                $data['enforce_price'] = $data['open_price'] + $data['open_price'] / $data['multiple'];
                if ($data['tp_price'] > 0 && $data['tp_price'] >= $data['open_price']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需小于开仓价']);
                }
                if ($data['sl_price'] > 0 && $data['sl_price'] <= $data['open_price']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '止损价需大于开仓价']);
                }
            }
            $data['enforce_price'] = round($data['enforce_price'], $data['fixed']);
            $data['status'] = 1;
        } else {
            //限价委托
            $data['wt_price'] = round($price, $data['fixed']);
            if ($data['wt_price'] < 0) {
                $this->GlobalService->json(['code' => -2, 'msg' => '委托价格不能小于0']);
            }
            $data['trade_amount'] = round($data['amount'] * $data['multiple'] / $data['wt_price'], 8);
            if ($data['trade_amount'] <= 0) {
                $this->GlobalService->json(['code' => -2, 'msg' => '委托交易数量不足']);
            }
            if ($data['side'] == 1) {
                //做多
                if ($data['tp_price'] > 0 && $data['tp_price'] <= $data['wt_price']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需大于委托价']);
                }
                if ($data['sl_price'] > 0 && $data['sl_price'] >= $data['wt_price']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '止损价需小于委托价']);
                }
            } else {
                //做空
                if ($data['tp_price'] > 0 && $data['tp_price'] >= $data['wt_price']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需小于委托价']);
                }
                if ($data['sl_price'] > 0 && $data['sl_price'] <= $data['wt_price']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '止损价需大于委托价']);
                }
            }
            $data['status'] = 3;
        }
        $user_product_contract_model = user_product_contract_model::getInstance();
        $user_model = user_model::getInstance();
        $dbh = $user_product_contract_model->begin();
        try {
            $data['id'] = $user_product_contract_model->add($data);
            $res = $user_model->changeBalance($data['user_id'], -$data['amount']-$data['fee'], $data['title'],'买入', 5, $data['id']);
            if ($res['user']['balance'] < 0) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
            }
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '下单成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userProductContractAdd');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    //添加保证金
    public function setAmount($id, $type, $amount)
    {
        $user = $this->GlobalService->getUser();
        $user_product_contract_model = user_product_contract_model::getInstance();
        $userProductContract = $user_product_contract_model->where(['id' => $id, 'user_id' => $user['id'], 'del' => 0])->getOne();
        if (!$userProductContract) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的订单']);
        }
        if ($userProductContract['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '追加失败,订单状态已变更']);
        }
        if (!is_numeric($amount)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '请输入追加金额']);
        }
        if ($amount < 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '追加金额不能小于1']);
        }
        $data = ['id' => $userProductContract['id']];
        if ($type == 1) {
            //追加保证金
            $data['amount'] = $userProductContract['amount'] + $amount;
            if ($user['balance'] < $amount) {
                $this->GlobalService->json(['code' => -2, 'msg' => "余额不足"]);
            }
        } else {
            //减少保证金
            $data['amount'] = $userProductContract['amount'] - $amount;
            //计算最低保证金
            $deposit = round($userProductContract['open_price'] * $userProductContract['trade_amount'] / $userProductContract['multiple']);
            if ($data['amount'] < $deposit) {
                $min = $userProductContract['amount'] - $deposit;
                $this->GlobalService->json(['code' => -2, 'msg' => "可减少金额:{$min}"]);
            }
        }
        if ($userProductContract['side'] == 1) {
            //买涨
            $data['enforce_price'] = $userProductContract['open_price'] - $data['amount'] / $userProductContract['trade_amount'];
            if ($data['enforce_price'] < 0) {
                $data['enforce_price'] = 0;
            }
        } else {
            //买跌
            $data['enforce_price'] = $userProductContract['open_price'] + $data['amount'] / $userProductContract['trade_amount'];
        }
        $data['enforce_price'] = round($data['enforce_price'], $userProductContract['fixed']);
        $user_model = user_model::getInstance();
        $dbh = $user_product_contract_model->begin();
        try {
            $res = $user_product_contract_model->edit($data, ['amount' => $userProductContract['amount'], 'modify_time' => $userProductContract['modify_time'], 'status' => 1]);
            if (!$res) {
                $this->GlobalService->json(['code' => -2, 'msg' => '更新失败']);
            }
            if ($type == 1) {
                //追加保证金
                $res = $user_model->changeBalance($userProductContract['user_id'], -$amount, $userProductContract['title'],'追加金额', 5, $data['id']);
                if ($res['user']['balance'] < 0) {
                    $dbh->rollBack();
                    $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
                }
            } else {
                //减少保证金
                $user_model->changeBalance($userProductContract['user_id'], $amount, $userProductContract['title'],'减少金额', 5, $data['id']);
            }
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userProductContractAddAmount');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    /**
     * 设置止盈止损
     * @param $id
     * @param $tpPrice
     * @param $slPrice
     */
    public function setSellPrice($id, $tpPrice, $slPrice)
    {
        $user = $this->GlobalService->getUser();
        $user_product_contract_model = user_product_contract_model::getInstance();
        $userProductContract = $user_product_contract_model->where(['id' => $id, 'user_id' => $user['id'], 'del' => 0])->getOne();
        if (!$userProductContract) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的订单']);
        }
        if ($userProductContract['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '修改失败,订单状态已变更']);
        }
        $data = ['id' => $userProductContract['id']];
        //止盈价
        $data['tp_price'] = $tpPrice ?: 0;
        //止损价
        $data['sl_price'] = $slPrice ?: 0;
        if ($userProductContract['side'] == 1) {
            //做多
            if ($data['tp_price'] > 0 && $data['tp_price'] <= $userProductContract['open_price']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需大于开仓价']);
            }
            if ($data['sl_price'] > 0 && $data['sl_price'] >= $userProductContract['open_price']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '止损价需小于开仓价']);
            }
        } else {
            //做空
            if ($data['tp_price'] > 0 && $data['tp_price'] >= $userProductContract['open_price']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需小于开仓价']);
            }
            if ($data['sl_price'] > 0 && $data['sl_price'] <= $userProductContract['open_price']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '止损价需大于开仓价']);
            }
        }
        $res = $user_product_contract_model->edit($data, ['status' => 1]);
        if ($res) {
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    //平仓
    public function sell($id)
    {
        $user = $this->GlobalService->getUser();
        $user_product_contract_model = user_product_contract_model::getInstance();
        $userProductContract = $user_product_contract_model->with(['product' => 'id,price'])
            ->where(['id' => $id, 'user_id' => $user['id'], 'del' => 0])
            ->getOne();
        if (!$userProductContract) {
            $this->GlobalService->json(['code' => -2, 'msg' => '仓位不存在']);
        }
        if ($userProductContract['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未在持仓中,无法结算']);
        }
        if ($userProductContract['open_time'] > (SYS_TIME - 300)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作异常，交割时间不能低于5分钟']);
        }
        $res = $user_product_contract_model->sell($userProductContract);
        $this->GlobalService->json($res);
    }

    //取消委托订单
    public function cancel($id)
    {
        $user = $this->GlobalService->getUser();
        $user_product_contract_model = user_product_contract_model::getInstance();
        $userProductContract = $user_product_contract_model->where(['id' => $id, 'user_id' => $user['id'], 'del' => 0])->getOne();
        if (!$userProductContract) {
            $this->GlobalService->json(['code' => -2, 'msg' => '委托订单不存在']);
        }
        if ($userProductContract['status'] != 3) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单状态已变更，无法取消']);
        }
        $res = $user_product_contract_model->cancel($userProductContract);
        $this->GlobalService->json($res);
    }

}
