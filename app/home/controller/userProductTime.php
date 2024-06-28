<?php
/**
 *用户期权
 */

namespace home\controller;

use asura\Common;
use asura\Log;
use home\classes\base;
use model\product_model;
use model\user_model;
use model\user_product_time_model;
use Exception;

class userProductTime extends base
{
    public function getList($status = '', $page = 1, $limit = 20)
    {
        if ($limit > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过100条数据']);
        }
        $user = $this->GlobalService->getUser();
        $user_product_time_model = user_product_time_model::getInstance();
        $where = ['user_id' => $user['id'], 'del' => 0];
        if ($status !== '') {
            $where['status'] = intval($status);
        }
        $list = $user_product_time_model
            ->with(['product' => 'id,price,fixed,amount_fixed'])
            ->where($where)
            ->order('id DESC')
            ->limit($limit, $page)
            ->select();
        foreach ($list as $k => $v) {
            if ($v['status'] == 1 && $v['sell_time'] <= SYS_TIME) {
                $res = $user_product_time_model->sell($v);
                if ($res['code'] == 1) {
                    $v = $res['info'];
                } else {
                    $v = $user_product_time_model->with(['product' => 'id,price'])->where(['id' => $v['id']])->getOne();
                }
            }
            $v['open_price'] = Common::formatAmount($v['open_price']);
            $v['sell_price'] = Common::formatAmount($v['sell_price']);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list, 'nowTime' => SYS_TIME]);
    }

    public function getInfo($id)
    {
        $user = $this->GlobalService->getUser();
        $user_product_time_model = user_product_time_model::getInstance();
        $info = $user_product_time_model->with(['product' => 'id,price'])->where(['id' => $id, 'user_id' => $user['id']])->getOne();
        if ($info) {
            if ($info['status'] == 1 && $info['sell_time'] <= SYS_TIME) {
                $res = $user_product_time_model->sell($info);
                if ($res['code'] == 1) {
                    $info = $res['info'];
                } else {
                    $info = $user_product_time_model->with(['product' => 'id,price'])->where(['id' => $id])->getOne();
                }
            }
            $info['nowTime'] = SYS_TIME;
            $info['open_price'] = Common::formatAmount($info['open_price']);
            $info['sell_price'] = Common::formatAmount($info['sell_price']);
        } else {
            $info = (object)[];
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    //下单
    public function add($id, $amount, $side, $time)
    {
        $user = $this->GlobalService->getUser();
        if (in_array($user['status'], [3, 4])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '下单异常，详情联系客服']);
        }
        $product_model = product_model::getInstance();
        $product = $product_model->where(['id' => intval($id), 'type' => 2])->getOne();
        if (!$product) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的产品']);
        }
        if ($product['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已停止交易']);
        }
        $data_config = json_decode($product['data_config'], true);
        unset($product['data_config']);
        $timeConfigList = $data_config['time'];
        $timeConfig = [];
        if ($timeConfigList) {
            foreach ($timeConfigList as $v) {
                if ($v['time'] == $time) {
                    $timeConfig = $v;
                    break;
                }
            }
        }
        if(!$timeConfig){
            $this->GlobalService->json(['code' => -2, 'msg' => '未找到配置']);
        }
        $data = [];
        $data['user_id'] = $user['id'];
        $data['product_id'] = $product['id'];
        $data['order_no'] = 'UPT' . round(microtime(true) * 1000);
        //标题
        $data['title'] = $product['title'];
        $data['fixed'] = $product['fixed'];
        $data['open_price'] = $product['price'];
        if(!is_numeric($amount)){
            $this->GlobalService->json(['code' => -2, 'msg' => '请输入下单金额']);
        }
        $data['amount'] = floor($amount * 100) / 100;
        if (isset($timeConfig['min']) && $data['amount'] < $timeConfig['min']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "下单金额限制:{$timeConfig['min']}"]);
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
                $data['fee'] = floor($data['amount'] * $product['fee_rate'] * 100) / 100;
            }
        }else{
            $data['fee'] = 0;
        }
        if ($user['deposit'] < ($data['amount'] + $data['fee'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => "余额不足"]);
        }
        if ($user['balance'] < $product['min']) {
            $this->GlobalService->json(['code' => -2, 'msg' => "下单失败,余额限制:{$product['min']}"]);
        }
        //交易方向  买涨 买跌
        $data['side'] = $side == 1 ? 1 : 2;
        $data['time'] = $timeConfig['time'];
        $data['profit'] = $timeConfig['profit'];
        $data['sell_time'] = SYS_TIME + $timeConfig['time'];
        $data['status'] = 1;
        $user_product_time_model = user_product_time_model::getInstance();
        $user_model = user_model::getInstance();
        $dbh = $user_product_time_model->begin();
        try {
            $data['id'] = $user_product_time_model->add($data);
            $res = $user_model->changeDeposit($data['user_id'], -$data['amount'] - $data['fee'], $data['title'],'购买', 6, $data['id']);
//            $res = $user_model->changeBalance($data['user_id'], -$data['amount'] - $data['fee'], $data['title'],'购买', 6, $data['id']);
            if ($res['user']['balance'] < 0) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
            }
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '下单成功', 'info' => $data]);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userProductTimeAdd');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }
}
