<?php
/**
 *快捷兑换
 */

namespace home\controller;

use asura\Common;
use asura\Log;
use home\classes\base;
use model\product_model;
use model\user_balance_model;
use model\user_exchange_model;
use model\user_model;
use model\user_wallet_model;
use service\RedisService;
use Exception;

class userExchange extends base
{
    /**
     * 获取记录列表
     * /home/userWithdraw/getList
     * @param string $startTime
     * @param string $endTime
     * @param int $page
     * @param int $limit
     */
    public function getList($startTime = '', $endTime = '', $page = 1, $limit = 20)
    {
        if ($limit > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过100条数据']);
        }
        $user = $this->GlobalService->getUser();
        $user_exchange_model = user_exchange_model::getInstance();
        $where = [
            'user_id' => $user['id'],
            'status' => 1
        ];
        if ($startTime) {
            $where['create_time']['>='] = strtotime($startTime);
        }
        if ($endTime) {
            $where['create_time']['<'] = strtotime($endTime) + 86400;
        }
        $data = $user_exchange_model->where($where)
            ->order('id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $v['from_amount'] = Common::formatAmount($v['from_amount']);
            $v['from_rate'] = Common::formatAmount($v['from_rate']);
            $v['to_amount'] = Common::formatAmount($v['to_amount']);
            $v['to_rate'] = Common::formatAmount($v['to_rate']);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    //新增快捷兑换
    public function add($fromId, $toId, $fromAmount)
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        if ($fromId == $toId) {
            $this->GlobalService->json(['code' => -2, 'msg' => '相同币种无法兑换']);
        }
        if ($fromAmount <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '金额异常']);
        }
        $user = $this->GlobalService->getUser();
        $user_balance_model = user_balance_model::getInstance();
        if ($fromId == 0) {
            //USDT
            if ($user['balance'] < $fromAmount) {
                $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
            }
            $fromData = [
                'id' => 0,
                'product_id' => 0,
                'product' => ['id' => 0, 'price' => 1],
                'icon' => '/img/icon/usdt.png',
                'currency' => 'USDT',
                'balance' => $user['balance'],
                'amount_fixed' => 2
            ];
        } else {
            $fromData = $user_balance_model->with(['product' => 'id,price'])
                ->where(['id' => $fromId, 'user_id' => $user['id'], 'status' => 1])->getOne();
            if (!$fromData) {
                $this->GlobalService->json(['code' => -2, 'msg' => '未知的币种']);
            }
            if ($fromData['balance'] < $fromAmount) {
                $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
            }
        }
        if ($toId == 0) {
            //USDT
            $toData = [
                'id' => 0,
                'product_id' => 0,
                'product' => ['id' => 0, 'price' => 1],
                'icon' => '/img/icon/usdt.png',
                'currency' => 'USDT',
                'balance' => $user['balance'],
                'amount_fixed' => 2,
            ];
        } else {
            $toData = $user_balance_model->with(['product' => 'id,price'])->where(['id' => $toId, 'user_id' => $user['id'], 'status' => 1])->getOne();
            if (!$toData) {
                $this->GlobalService->json(['code' => -2, 'msg' => '未知的兑换币种']);
            }
        }
        $data = [];
        $data['user_id'] = $user['id'];
        $data['from_currency'] = $fromData['currency'];
        $data['from_amount'] = $fromAmount;
        $data['from_rate'] = $fromData['product']['price'];
        $data['to_currency'] = $toData['currency'];
        $data['to_rate'] = $toData['product']['price'];
        //兑换金额
        $data['to_amount'] = round($data['from_amount'] * ($data['from_rate'] / $data['to_rate']), $toData['amount_fixed']);
        if ($data['to_amount'] <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '兑换金额异常']);
        }
        $data['status'] = 1;
        $user_exchange_model = user_exchange_model::getInstance();
        $dbh = $user_exchange_model->begin();
        try {
            //扣除金额
            $data['id'] = $user_exchange_model->add($data);
            //-兑换金额
            if ($data['from_currency'] == 'USDT') {
                $user_model = user_model::getInstance();
                $user_model->changeBalance($data['user_id'], -$data['from_amount'], "{$data['from_currency']}->{$data['to_currency']}", '转出', 9, $data['id']);
            } else {
                $user_balance_model->changeBalance($fromData['id'], -$data['from_amount'], "{$data['from_currency']}->{$data['to_currency']}", '转出', 9, $data['id']);
            }
            if ($data['to_currency'] == 'USDT') {
                $user_model = user_model::getInstance();
                $user_model->changeBalance($data['user_id'], $data['to_amount'], "{$data['from_currency']}->{$data['to_currency']}", '转入', 9, $data['id']);
            } else {
                $user_balance_model->changeBalance($toData['id'], $data['to_amount'], "{$data['from_currency']}->{$data['to_currency']}", '转入', 9, $data['id']);
            }
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '兑换成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'addUserExchange');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

}
