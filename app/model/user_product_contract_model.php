<?php
//

namespace model;

use asura\db\Model;
use asura\Log;
use Exception;

class user_product_contract_model extends Model
{
    protected static $instance;

    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
    }

    public function product(): array
    {
        return $this->belongsTo(product_model::class, 'product_id');
    }

    //平仓
    public function sell($userProductContract): array
    {
        $data = [
            'id' => $userProductContract['id'],
            'sell_price' => $userProductContract['product']['price'],
            'sell_time' => SYS_TIME,
            'status' => 2
        ];
        //平仓收益
        if ($userProductContract['side'] == 1) {
            //做多
            $data['sell_profit'] = ($data['sell_price'] - $userProductContract['open_price']) * $userProductContract['trade_amount'];
        } else {
            //做空
            $data['sell_profit'] = ($userProductContract['open_price'] - $data['sell_price']) * $userProductContract['trade_amount'];
        }
        //计算结算金额
        $amount = $data['sell_profit'] + $userProductContract['amount'];
        if ($amount <= 0) {
            $data['sell_profit'] = -$userProductContract['amount'];
        } else {
            $data['sell_profit'] = round($data['sell_profit'], 2);
        }
        $userProductContract['sell_price'] = $data['sell_price'];
        $userProductContract['sell_profit'] = $data['sell_profit'];
        $userProductContract['sell_time'] = $data['sell_time'];
        $userProductContract['status'] = $data['status'];
        $userProductContract['modify_time'] = SYS_TIME;
        $dbh = $this->begin();
        try {
            //保存数据结算金额
            $res = $this->edit($data, ['status' => 1]);
            if (!$res) {
                $dbh->rollBack();
                return ['code' => -2, 'msg' => '平仓失败,订单状态已经变更'];
            }
            if ($amount > 0) {
                $user_model = user_model::getInstance();
                $user_model->changeBalance($userProductContract['user_id'], $amount, $userProductContract['title'],'平仓', 5, $userProductContract['id']);
            }
            $dbh->commit();
            return ['code' => 1, 'msg' => '平仓成功', 'info' => $userProductContract];
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userProductContractSell');
            return ['code' => -2, 'msg' => '平仓异常'];
        }
    }

    //取消
    public function cancel($userProductContract): array
    {
        $dbh = $this->begin();
        try {
            $res = $this->edit(['id' => $userProductContract['id'], 'status' => 0], ['status' => 3]);
            if (!$res) {
                $dbh->rollBack();
                return ['code' => -2, 'msg' => '撤销失败，订单状态已变更'];
            }
            $user_model = user_model::getInstance();
            $user_model->changeBalance($userProductContract['user_id'], $userProductContract['amount'] + $userProductContract['fee'], $userProductContract['title'],'撤单', 5, $userProductContract['id']);
            $dbh->commit();
            return ['code' => 1, 'msg' => '取消成功'];
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userProductContractCancel');
            return ['code' => -2, 'msg' => '平仓异常'];
        }
    }

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
            //删除账变
            $user_amount_model = user_amount_model::getInstance();
            $user_amount_model->edit(['del' => 1], ['user_id' => $data['user_id'], 'type' => 4, 'key_id' => $data['id']]);
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
