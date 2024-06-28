<?php
/**
 *用户杠杆
 */

namespace home\controller;

use asura\Common;
use asura\Log;
use home\classes\base;
use model\product_model;
use model\user_model;
use model\user_product_lever_model;
use Exception;

class userProductLever extends base
{
    public function getList($status = '', $dateTime = [], $page = 1, $limit = 20)
    {
        if ($limit > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过100条数据']);
        }
        $user = $this->GlobalService->getUser();
        $user_product_lever_model = user_product_lever_model::getInstance();
        $where = ['user_id' => $user['id'], 'del' => 0];
        if ($status !== '') {
            $where['status'] = intval($status);
        }
        if ($dateTime) {
            $where['create_time'] = ['>=' => intval($dateTime[0]), '<' => (intval($dateTime[1]) + 86400)];
        }
        $list = $user_product_lever_model->with(['product' => 'id,price,fixed,amount_fixed'])
            ->where($where)
            ->order('id DESC')
            ->limit($limit, $page)
            ->select();
        foreach ($list as $k => $v) {
            $v['open_price'] = Common::formatAmount($v['open_price']);
            $v['sell_price'] = Common::formatAmount($v['sell_price']);
            $v['tp_price'] = Common::formatAmount($v['tp_price']);
            $v['sl_price'] = Common::formatAmount($v['sl_price']);
            $v['wt_price'] = Common::formatAmount($v['wt_price']);
            $list[$k] = $v;
        }
        if ($status == 2) {
            //平仓订单计算总盈亏
            $res = $user_product_lever_model->field('SUM(sell_profit) AS totalProfit')->where($where)->getOne();
            $totalProfit = $res['totalProfit'] ? Common::formatAmount($res['totalProfit'], 2) : '0.00';
        } else {
            $totalProfit = '0.00';
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list, 'totalProfit' => $totalProfit]);
    }

    public function getInfo($id)
    {
        $user = $this->GlobalService->getUser();
        $user_product_lever_model = user_product_lever_model::getInstance();
        $info = $user_product_lever_model->where(['id' => $id, 'user_id' => $user['id']])->getOne();
        if ($info) {
            $info['open_price'] = Common::formatAmount($info['open_price']);
            $info['sell_price'] = Common::formatAmount($info['sell_price']);
            $info['tp_price'] = Common::formatAmount($info['tp_price']);
            $info['sl_price'] = Common::formatAmount($info['sl_price']);
            $info['wt_price'] = Common::formatAmount($info['wt_price']);
        } else {
            $info = (object)[];
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    /**
     * 下单
     * @param $id
     * @param $side
     * @param $handNums
     * @param $type
     * @param $price
     * @param $tpPrice
     * @param $slPrice
     */
    public function add($id, $side, $handNums, $type = 1, $price = '', $tpPrice = '', $slPrice = '')
    {
        $user = $this->GlobalService->getUser();
        if (in_array($user['status'], [3, 4])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '下单异常，详情联系客服']);
        }
        $product_model = product_model::getInstance();
        $product = $product_model->where(['id' => intval($id), 'type' => 3])->getOne();
        if (!$product) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的产品']);
        }
        if ($product['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已停止交易']);
        }
        $dataConfig = json_decode($product['data_config'], true);
        $leverConfig = $dataConfig['lever'];
        if ($leverConfig['timeLimit'] == 1 && !$product_model->isForexTradingTime()) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已停止交易,不在交易时间段']);
        }
        $data = [];
        $data['user_id'] = $user['id'];
        $data['product_id'] = $product['id'];
        $data['order_no'] = 'UPL'.round(microtime(true) * 1000);
        //交易方向  买涨 买跌
        $data['side'] = $side == 1 ? 1 : 2;
        //标题
        $data['title'] = $product['title'];
        $data['fixed'] = $product['fixed'];
        //手续费率
        $data['fee_rate'] = $product['fee_rate'];
        //手数
        $data['hand_nums'] = round($handNums, 2);
        //杠杆
        $data['multiple'] = $leverConfig['multiple'];
        $data['contract_nums'] = $leverConfig['contract'];
        if (isset($leverConfig['min']) && $data['hand_nums'] < $leverConfig['min']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "手数最小限制:{$leverConfig['min']}"]);
        }
        if (isset($leverConfig['max']) && $data['hand_nums'] > $leverConfig['max']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "手数最大限制:{$leverConfig['max']}"]);
        }
        if ($data['hand_nums'] < 0.01) {
            $this->GlobalService->json(['code' => -2, 'msg' => '下单手数不能小于0.01']);
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
            if ($data['side'] == 1) {
                //做多
                if ($data['tp_price'] > 0 && $data['tp_price'] <= $data['open_price']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需大于开仓价']);
                }
                if ($data['sl_price'] > 0 && $data['sl_price'] >= $data['open_price']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '止损价需小于开仓价']);
                }
            } else {
                //做空
                if ($data['tp_price'] > 0 && $data['tp_price'] >= $data['open_price']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需小于开仓价']);
                }
                if ($data['sl_price'] > 0 && $data['sl_price'] <= $data['open_price']) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '止损价需大于开仓价']);
                }
            }
            $data['status'] = 1;
        } else {
            //限价委托
            $data['wt_price'] = round($price, $data['fixed']);
            if ($data['wt_price'] < 0) {
                $this->GlobalService->json(['code' => -2, 'msg' => '委托价格不能小于0']);
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
        //保证金额=开仓*手数、杠杆
        $data['amount'] = round($data['hand_nums']*$leverConfig['deposit'], 2);
        //本金=交易币种单价 * 合约数量 * 手数 / 杠杆
        $data['amount'] = round($data['wt_price'] * $data['contract_nums'] * $data['hand_nums'] / $data['multiple'], 2);
        if ($data['fee_rate'] > 0) {
            if ($data['fee_rate'] >= 1) {
                //固定手续费
                $data['fee'] = $data['fee_rate'] * $data['hand_nums'];
            } else {
                //按照比例收取
                $data['fee'] = round($data['amount'] * $data['fee_rate'], 2);
            }
        } else {
            $data['fee'] = 0;
        }
        //获取订单的保证金
        $user_product_lever_model = user_product_lever_model::getInstance();
        $bzj = $user_product_lever_model->getAmountByUser($user['id']);
        //可用保证金
        $kybzj = $user['balance'] - $bzj;
        if ($kybzj < ($data['amount'] + $data['fee'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => "余额不足"]);
        }
        if ($user['balance'] < $product['min']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "下单失败,余额限制:{$product['min']}"]);
        }
        $user_model = user_model::getInstance();
        $dbh = $user_product_lever_model->begin();
        try {
            $data['id'] = $user_product_lever_model->add($data);
            $res=$user_model->changeBalance($data['user_id'], -$data['fee'],$data['title'],'手续费',7,$data['id']);
            if ($res['user']['balance'] < 0) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
            }
//            $res = $user_model->changeDeposit($data['user_id'], -$data['fee']);
//            if ($res['user']['deposit'] < 0) {
//                $dbh->rollBack();
//                $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
//            }
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '下单成功','info'=>$data]);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userProductContractAdd');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

//    public function add($id, $side, $handNums, $type = 1, $price = '', $tpPrice = '', $slPrice = '')
//    {
//        $user = $this->GlobalService->getUser();
//        if (in_array($user['status'], [3, 4])) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '下单异常，详情联系客服']);
//        }
//        $product_model = product_model::getInstance();
//        $product = $product_model->where(['id' => intval($id), 'type' => 4])->getOne();
//        if (!$product) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '未知的产品']);
//        }
//        if ($product['status'] != 1) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '已停止交易']);
//        }
//        $dataConfig = json_decode($product['data_config'], true);
//        $leverConfig = $dataConfig['lever'];
//        if ($leverConfig['timeLimit'] == 1 && !$product_model->isForexTradingTime()) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '已停止交易,不在交易时间段']);
//        }
//        $data = [];
//        $data['user_id'] = $user['id'];
//        $data['product_id'] = $product['id'];
//        $data['order_no'] = round(microtime(true) * 1000);
//        //交易方向  买涨 买跌
//        $data['side'] = $side == 1 ? 1 : 2;
//        //标题
//        $data['title'] = $product['title'];
//        $data['fixed'] = $product['fixed'];
//        //手续费率
//        $data['fee_rate'] = $product['fee_rate'];
//        //手数
//        $data['hand_nums'] = round($handNums, 2);
//        //杠杆
//        $data['multiple'] = $leverConfig['multiple'];
//        if (isset($leverConfig['min']) && $data['hand_nums'] < $leverConfig['min']) {
//            $this->GlobalService->json(['code' => -2, 'msg' => "下单手数限制:{$leverConfig['min']}"]);
//        }
//        if ($data['hand_nums'] < 0.01) {
//            $this->GlobalService->json(['code' => -2, 'msg' => '下单手数不能小于0.01']);
//        }
//        //止盈价
//        $data['tp_price'] = $tpPrice ?: 0;
//        //止损价
//        $data['sl_price'] = $slPrice ?: 0;
//        if ($type == 1) {
//            //市价委托
//            $data['open_price'] = $data['wt_price'] = $product['price'];
//            //开仓时间
//            $data['open_time'] = SYS_TIME;
//            if ($data['side'] == 1) {
//                //做多
//                if ($data['tp_price'] > 0 && $data['tp_price'] <= $data['open_price']) {
//                    $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需大于开仓价']);
//                }
//                if ($data['sl_price'] > 0 && $data['sl_price'] >= $data['open_price']) {
//                    $this->GlobalService->json(['code' => -2, 'msg' => '止损价需小于开仓价']);
//                }
//            } else {
//                //做空
//                if ($data['tp_price'] > 0 && $data['tp_price'] >= $data['open_price']) {
//                    $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需小于开仓价']);
//                }
//                if ($data['sl_price'] > 0 && $data['sl_price'] <= $data['open_price']) {
//                    $this->GlobalService->json(['code' => -2, 'msg' => '止损价需大于开仓价']);
//                }
//            }
//            $data['status'] = 1;
//        } else {
//            //限价委托
//            $data['wt_price'] = round($price, $data['fixed']);
//            if ($data['wt_price'] < 0) {
//                $this->GlobalService->json(['code' => -2, 'msg' => '委托价格不能小于0']);
//            }
//            if ($data['side'] == 1) {
//                //做多
//                if ($data['tp_price'] > 0 && $data['tp_price'] <= $data['wt_price']) {
//                    $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需大于委托价']);
//                }
//                if ($data['sl_price'] > 0 && $data['sl_price'] >= $data['wt_price']) {
//                    $this->GlobalService->json(['code' => -2, 'msg' => '止损价需小于委托价']);
//                }
//            } else {
//                //做空
//                if ($data['tp_price'] > 0 && $data['tp_price'] >= $data['wt_price']) {
//                    $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需小于委托价']);
//                }
//                if ($data['sl_price'] > 0 && $data['sl_price'] <= $data['wt_price']) {
//                    $this->GlobalService->json(['code' => -2, 'msg' => '止损价需大于委托价']);
//                }
//            }
//            $data['status'] = 3;
//        }
//        //保证金额=开仓*手数、杠杆
//        $data['amount'] = round($data['wt_price'] * $data['hand_nums'] / $data['multiple'], 2);
//        if ($data['fee_rate'] > 0) {
//            if ($data['fee_rate'] >= 1) {
//                //固定手续费
//                $data['fee'] = $data['fee_rate'];
//            } else {
//                //按照比例收取
//                $data['fee'] = round($data['amount'] * $data['multiple'] * $data['fee_rate'], 2);
//            }
//        } else {
//            $data['fee'] = 0;
//        }
//        //获取订单的保证金
//        $user_product_lever_model = user_product_lever_model::getInstance();
//        $bzj = $user_product_lever_model->getAmountByUser($user['id']);
//        //可用保证金
//        $kybzj = $user['deposit'] - $bzj;
//        if ($kybzj < ($data['amount'] + $data['fee'])) {
//            $this->GlobalService->json(['code' => -2, 'msg' => "余额不足"]);
//        }
//        if ($user['deposit'] < $product['min']) {
//            $this->GlobalService->json(['code' => -2, 'msg' => "下单失败,余额限制:{$product['min']}"]);
//        }
//        $user_model = user_model::getInstance();
//        $dbh = $user_product_lever_model->begin();
//        try {
//            $data['id'] = $user_product_lever_model->add($data);
//            $res = $user_model->changeDeposit($data['user_id'], -$data['fee']);
//            if ($res['user']['deposit'] < 0) {
//                $dbh->rollBack();
//                $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
//            }
//            $dbh->commit();
//            $this->GlobalService->json(['code' => 1, 'msg' => '下单成功']);
//        } catch (Exception $e) {
//            $dbh->rollBack();
//            Log::logException($e, 'userProductContractAdd');
//            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
//        }
//    }

    /**
     * 设置止盈止损
     * @param $id
     * @param $tpPrice
     * @param $slPrice
     */
    public function setSellPrice($id, $tpPrice, $slPrice)
    {
        $user = $this->GlobalService->getUser();
        $user_product_lever_model = user_product_lever_model::getInstance();
        $userProductLever = $user_product_lever_model->where(['id' => $id, 'user_id' => $user['id'], 'del' => 0])->getOne();
        if (!$userProductLever) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的订单']);
        }
        if ($userProductLever['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '修改失败,订单状态已变更']);
        }
        $data = ['id' => $userProductLever['id']];
        //止盈价
        $data['tp_price'] = $tpPrice ?: 0;
        //止损价
        $data['sl_price'] = $slPrice ?: 0;
        if ($userProductLever['side'] == 1) {
            //做多
            if ($data['tp_price'] > 0 && $data['tp_price'] <= $userProductLever['open_price']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需大于开仓价']);
            }
            if ($data['sl_price'] > 0 && $data['sl_price'] >= $userProductLever['open_price']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '止损价需小于开仓价']);
            }
        } else {
            //做空
            if ($data['tp_price'] > 0 && $data['tp_price'] >= $userProductLever['open_price']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '止盈价需小于开仓价']);
            }
            if ($data['sl_price'] > 0 && $data['sl_price'] <= $userProductLever['open_price']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '止损价需大于开仓价']);
            }
        }
        $res = $user_product_lever_model->edit($data, ['status' => 1]);
        if ($res) {
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    //平仓
    public function sell($id)
    {
        $user = $this->GlobalService->getUser();
        $user_product_lever_model = user_product_lever_model::getInstance();
        $userProductLever = $user_product_lever_model->with(['product' => 'id,price'])
            ->where(['id' => $id, 'user_id' => $user['id'], 'del' => 0])
            ->getOne();
        if (!$userProductLever) {
            $this->GlobalService->json(['code' => -2, 'msg' => '仓位不存在']);
        }
        if ($userProductLever['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未在持仓中,无法结算']);
        }
        if ($userProductLever['open_time'] > (SYS_TIME - 300)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作异常，交割时间不能低于5分钟']);
        }
        $res = $user_product_lever_model->sell($userProductLever);
        $this->GlobalService->json($res);
    }

    //取消委托订单
    public function cancel($id)
    {
        $user = $this->GlobalService->getUser();
        $user_product_lever_model = user_product_lever_model::getInstance();
        $userProductLever = $user_product_lever_model->where(['id' => $id, 'user_id' => $user['id'], 'del' => 0])->getOne();
        if (!$userProductLever) {
            $this->GlobalService->json(['code' => -2, 'msg' => '委托订单不存在']);
        }
        if ($userProductLever['status'] != 3) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单状态已变更，无法取消']);
        }
        $res = $user_product_lever_model->cancel($userProductLever);
        $this->GlobalService->json($res);
    }

}
