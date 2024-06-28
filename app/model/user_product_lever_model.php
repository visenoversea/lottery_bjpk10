<?php
//

namespace model;

use asura\db\Model;
use asura\Log;
use Exception;

class user_product_lever_model extends Model
{
    protected static $instance;

    //表关联
    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
    }

    public function product(): array
    {
        return $this->belongsTo(product_model::class, 'product_id');
    }

    //获取用户保证金
    public function getAmountByUser($user_id)
    {
        $res = $this->field('SUM(amount) AS amount')->where(['user_id' => $user_id, 'status' => ['IN' => [1, 3]]])->getOne();
        return $res['amount'] ?: 0;
    }

    //获取总收益
    public function getProfitByUser($user_id)
    {
        $res = $this->alias('upl')->join('product p', 'p.id=upl.product_id')
            ->field('SUM(CASE WHEN upl.side=1 THEN (p.price-upl.open_price)*upl.contract_nums*upl.hand_nums ELSE 0 END)+SUM(CASE WHEN upl.side=2 THEN (upl.open_price-p.price)*upl.contract_nums*upl.hand_nums ELSE 0 END) AS profit')
            ->where(['upl.user_id' => $user_id, 'upl.status' => 1])->getOne();
        return $res['profit'] ?: 0;
    }

//    public function getProfitByUser($user_id)
//    {
//        $res = $this->alias('upl')->join('product p', 'p.id=upl.product_id')
//            ->field('SUM(CASE WHEN upl.side=1 THEN (p.price-upl.open_price)*upl.hand_nums ELSE 0 END)+SUM(CASE WHEN upl.side=2 THEN (upl.open_price-p.price)*upl.hand_nums ELSE 0 END) AS profit')
//            ->where(['upl.user_id' => $user_id, 'upl.status' => 1])->getOne();
//        return $res['profit'] ?: 0;
//    }

    //平仓
    public function sell($userProductLever): array
    {
        $data = [
            'id' => $userProductLever['id'],
            'sell_price' => $userProductLever['product']['price'],
            'sell_time' => SYS_TIME,
            'status' => 2
        ];
        //平仓收益
        if ($userProductLever['side'] == 1) {
            //做多
            $data['sell_profit'] = ($data['sell_price'] - $userProductLever['open_price']) * $userProductLever['contract_nums'] * $userProductLever['hand_nums'];
        } else {
            //做空
            $data['sell_profit'] = ($userProductLever['open_price'] - $data['sell_price']) * $userProductLever['contract_nums'] * $userProductLever['hand_nums'];
        }
        $userProductLever['sell_price'] = $data['sell_price'];
        $userProductLever['sell_profit'] = $data['sell_profit'];
        $userProductLever['sell_time'] = $data['sell_time'];
        $userProductLever['status'] = $data['status'];
        $userProductLever['modify_time'] = SYS_TIME;
        $dbh = $this->begin();
        try {
            //保存数据结算金额
            $res = $this->edit($data, ['status' => 1]);
            if (!$res) {
                $dbh->rollBack();
                return ['code' => -2, 'msg' => '平仓失败,订单状态已经变更'];
            }
            if ($userProductLever['sell_profit'] != 0) {
                $user_model = user_model::getInstance();
                $user_model->changeBalance($userProductLever['user_id'], $userProductLever['sell_profit'],$userProductLever['title'],'平仓',7,$userProductLever['id']);
//                $user_model->changeDeposit($userProductLever['user_id'], $userProductLever['sell_profit']);
            }
            $dbh->commit();
            return ['code' => 1, 'msg' => '平仓成功', 'info' => $userProductLever];
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userProductContractSell');
            return ['code' => -2, 'msg' => '平仓异常'];
        }
    }

//    public function sell($userProductLever): array
//    {
//        $data = [
//            'id' => $userProductLever['id'],
//            'sell_price' => $userProductLever['product']['price'],
//            'sell_time' => SYS_TIME,
//            'status' => 2
//        ];
//        //平仓收益
//        if ($userProductLever['side'] == 1) {
//            //做多
//            $data['sell_profit'] = ($data['sell_price'] - $userProductLever['open_price']) * $userProductLever['hand_nums'];
//        } else {
//            //做空
//            $data['sell_profit'] = ($userProductLever['open_price'] - $data['sell_price']) * $userProductLever['hand_nums'];
//        }
//        $userProductLever['sell_price'] = $data['sell_price'];
//        $userProductLever['sell_profit'] = $data['sell_profit'];
//        $userProductLever['sell_time'] = $data['sell_time'];
//        $userProductLever['status'] = $data['status'];
//        $userProductLever['modify_time'] = SYS_TIME;
//        $dbh = $this->begin();
//        try {
//            //保存数据结算金额
//            $res = $this->edit($data, ['status' => 1]);
//            if (!$res) {
//                $dbh->rollBack();
//                return ['code' => -2, 'msg' => '平仓失败,订单状态已经变更'];
//            }
//            if ($userProductLever['sell_profit'] != 0) {
//                $user_model = user_model::getInstance();
//                $user_model->changeDeposit($userProductLever['user_id'], $userProductLever['sell_profit']);
//            }
//            $dbh->commit();
//            return ['code' => 1, 'msg' => '平仓成功', 'info' => $userProductLever];
//        } catch (Exception $e) {
//            $dbh->rollBack();
//            Log::logException($e, 'userProductContractSell');
//            return ['code' => -2, 'msg' => '平仓异常'];
//        }
//    }

    //获取单条数据
    public function getData($id, $where = [], $field = '*')
    {
        $where['id'] = intval($id);
        return $this->field($field)->where($where)->getOne();
    }

    //新增
    public function add(array $data = []): int
    {
        $data['create_time'] = $data['modify_time'] = SYS_TIME;
        return $this->insert($data);
    }

    //编辑
    public function edit(array $data, array $where = [])
    {
        if (isset($data['id'])) {
            $where['id'] = intval($data['id']);
            unset($data['id']);
        }
        $data['modify_time'] = SYS_TIME;
        return $this->where($where)->update($data);
    }

    /**
     * 删除
     * @param $id
     * @param array $where
     * @return array
     */
    public function delById($id, array $where = []): array
    {
        $where['id'] = intval($id);
        $data = $this->where($where)->getOne();
        if (!$data) {
            return ['code' => -2, 'msg' => '未找到数据'];
        }
        $res = $this->edit(['del' => 1], $where);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

    //取消
    public function cancel($userProductLever): array
    {
        $dbh = $this->begin();
        try {
            $res = $this->edit(['id' => $userProductLever['id'], 'status' => 0], ['status' => 3]);
            if (!$res) {
                $dbh->rollBack();
                return ['code' => -2, 'msg' => '撤销失败，订单状态已变更'];
            }
            $user_model = user_model::getInstance();
            $user_model->changeDeposit($userProductLever['user_id'], $userProductLever['fee']);
            $dbh->commit();
            return ['code' => 1, 'msg' => '取消成功'];
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userProductContractCancel');
            return ['code' => -2, 'msg' => '平仓异常'];
        }
    }

}
