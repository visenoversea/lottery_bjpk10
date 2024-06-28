<?php
//

namespace model;

use asura\db\Model;

class user_balance_model extends Model
{
    protected static $instance;

    //表关联
    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
    }

    //ip
    public function product(): array
    {
        return $this->belongsTo(product_model::class, 'product_id');
    }

    public function getUsdtAmount($user_id)
    {
        $res = $this->field('SUM(ub.balance*p.price) AS amount')->alias('ub')
            ->join('product p', 'p.id=ub.product_id')
            ->where(['ub.user_id' => $user_id, 'ub.status' => 1])
            ->getOne();
        return $res['amount'] ?? 0;
    }

    public function getData($user_id, $currency): array
    {
        $data = $this->where(['user_id' => $user_id, 'currency' => $currency])
            ->getOne();
        if (!$data) {
            $product_model = product_model::getInstance();
            $product = $product_model->field('id,amount_fixed')
                ->where(['type' => 0, 'title' => "{$currency}/USDT", 'status' => ['>=' => 0]])->getOne();
            if (!$product) {
                return ['code' => -2, 'msg' => '未知的钱包'];
            }
            $data = ['user_id' => $user_id, 'currency' => $currency, 'product_id' => $product['id'], 'amount_fixed' => $product['amount_fixed'], 'status' => 1];
            $data['id'] = $this->add($data);
        }
        return ['code' => 1, 'msg' => '成功', 'data' => $data];
    }

    /**
     * 修改余额
     * @param int $id 用户id
     * @param float $amount 金额
     * @param string $title 标题
     * @param string $des   描述
     * @param int $type  类型 0-其他 1-充值 2-提现 3-推广 4-币币 5-合约 6-限时  7-点位  8-划转  9-锁仓挖矿
     * @param int $key_id 外键
     * @param int $status
     * @return array
     */
    public function changeBalance(int $id, float $amount = 0, string $title = '', string $des = '', int $type = 0, int $key_id = 0, int $status = 1): array
    {
        if ($amount >= 0) {
            $data = "balance=balance+{$amount}";
        } else {
            $data = "balance=balance{$amount}";
        }
        $data .= ',modify_time=' . SYS_TIME;
        $this->where(['id' => $id])->update($data);
        $userBalance = $this->where(['id' => $id])->getOne();
        user_amount_model::getInstance()->add([
            'user_id' => $userBalance['user_id'],
            'mode' => 1,
            'type' => $type,
            'title' => $title,
            'des' => $des,
            'currency' => $userBalance['currency'],
            'amount' => $amount,
            'balance' => $userBalance['balance'],
            'key_id' => $key_id,
            'status' => $status
        ]);
        return ['code' => 1, 'msg' => '成功', 'data' => $userBalance];
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
        $res = $this->edit(['status' => -1], $where);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
