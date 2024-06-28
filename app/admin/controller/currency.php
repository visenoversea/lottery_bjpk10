<?php
/**
 *广告图
 */

namespace admin\controller;

use admin\classes\base;
use model\currency_model;

class currency extends base
{
    public function getList($currencyTo = '', $currencyFrom = '', $status = '')
    {
        $where = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        if ($currencyTo !== '') {
            $where['currency_to'] = ['LIKE' => '%' . trim($currencyTo) . '%'];
        }
        if ($currencyFrom !== '') {
            $where['currency_from'] = ['LIKE' => '%' . trim($currencyFrom) . '%'];
        }
        $currency_model = currency_model::getInstance();
        $list = $currency_model->where($where)
            ->order('sort DESC,modify_time DESC')
            ->limit(-1)
            ->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }
}
