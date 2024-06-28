<?php
/**
 *用户杠杆
 */

namespace home\controller;

use asura\Common;
use home\classes\base;
use model\level_model;
use model\platform_model;
use model\product_model;
use model\product_platform_model;
use model\user_quantify_model;
use model\user_recharge_model;

class userQuantify extends base
{
    public function getList($status = 1, $page = 1, $limit = 20)
    {
        $user = $this->GlobalService->getUser();
        $where = ['user_id' => $user['id'], 'del' => 0];
        if ($status !== '') {
            $where['status'] = intval($status);
        }
        $user_quantify_model=user_quantify_model::getInstance();
        $list = $user_quantify_model
            ->where($where)
            ->order('modify_time DESC')
            ->limit($limit, $page)
            ->select();
        foreach ($list as $k=>$v){
            $v['buy_price'] = Common::formatAmount($v['buy_price']);
            $v['sell_price'] = Common::formatAmount($v['sell_price']);
            $list[$k]=$v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    public function add()
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        if (!$user['balance']) {
            $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
        }
        if (in_array($user['status'], [3, 4])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '下单异常，详情联系客服']);
        }
        $level_model = level_model::getInstance();
        $level = $level_model->where(['id' => $user['level_id']])->getOne();
        if (!$level) {
            $this->GlobalService->json(['code' => -2, 'msg' => '等级异常']);
        }
        if ($level['min_rate'] != $level['max_rate']) {
            $rate = mt_rand($level['min_rate'] * 10000, $level['max_rate'] * 10000) / 10000;
        } else {
            $rate = $level['min_rate'];
        }
        $rate = round($rate / $level['nums'],4);
        $user_quantify_model = user_quantify_model::getInstance();
        $res = $user_quantify_model->where([
            'user_id' => $user['id'],
            'status' => 2,
        ])->isExist();
        if ($res) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已有一笔正在量化的订单']);
        }
        if ($user['balance'] < $level['min']) {
            $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
        }
//        if ($user['level_id'] == 1) {
//            //判断是不是充值了30，赠送不算
//            $user_recharge_model = user_recharge_model::getInstance();
//            $res = $user_recharge_model->field('SUM(real_amount) AS realAmount')
//                ->where(['user_id' => $user['id'], 'status' => 1])
//                ->getOne();
//            $realAmount = $res['realAmount'] ? $res['realAmount'] : 0;
//            if ($realAmount < 30) {
//                $this->GlobalService->json(['code' => -2, 'msg' => '必须充值30以上才能开始量化']);
//            }
//        }
        $product_model = product_model::getInstance();
        $productList = $product_model->field('id,title,kline,icon,price,fixed')
            ->where(['type' => 0, 'status' => 1])
            ->limit(10)
            ->order('modify_time ASC')->select();
        if (!$productList) {
            $this->GlobalService->json(['code' => -2, 'msg' => '产品数据获取异常']);
        }
        $product = [];
        foreach ($productList as $v) {
            $kline = json_decode($v['kline'], true);
            if ($kline['open'] < $kline['close']) {
                $product = $v;
                break;
            }
        }
        if (!$product) {
            $randomIndex = array_rand($productList);
            $product = $productList[$randomIndex];
        }
        $product_platform_model=product_platform_model::getInstance();
        $productPlatform = $product_platform_model->with(['platform' => 'id,title'])
            ->where(['product_id' => $product['id'],'status'=>1])->order('price DESC')->getOne();
        $platform_model = platform_model::getInstance();
        $platformData = $platform_model->where(['id'=>['<>'=>$productPlatform['platform_id']],'status' => 1])->order('modify_time ASC')->getOne();
        $platform_model->edit(['id' => $platformData['id'], 'modify_time' => SYS_TIME]);
        $data = [
            'user_id' => $user['id'],
            'order_no' => 'UQ' . round(microtime(true) * 1000),
            'currency' => $product['title'],
            'icon' => $product['icon'],
            'amount' => $user['balance'],
            'buy_platform' => $platformData['title'],
            'sell_platform' => $productPlatform['platform']['title'],
            'status' => 2
        ];
        if ($user['balance'] >= $level['max']) {
            $data['amount'] = $level['max'];
        } else {
            $data['amount'] = $user['balance'];
        }
        $data['rate'] = $rate;
        $data['buy_price'] = round($productPlatform['price'] / (1 + $rate * 2), $product['fixed']);
        $data['sell_price'] = round($productPlatform['price'], $product['fixed']);
        $data['fee'] = $data['profit'] = round($data['amount'] * $data['rate'], 2);
        if ($data['profit'] <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
        }
        $todayNums = $user_quantify_model->getTodayNums($user['id']);
        if ($todayNums >= $level['nums']) {
            $this->GlobalService->json(['code' => -2, 'msg' => '量化次数已用完']);
        }
        $user_quantify_model->add($data);
        $this->GlobalService->json(['code' => 1, 'msg' => '量化已开启,请耐心等待几分钟']);
    }

}
