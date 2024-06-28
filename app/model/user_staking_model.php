<?php
//

namespace model;

use asura\Common;
use asura\db\Model;
use asura\Log;
use Exception;
use service\GlobalService;

class user_staking_model extends Model
{
    protected static $instance;

    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
    }

    //表关联
    public function mining(): array
    {
        return $this->belongsTo(mining_model::class, 'mining_id');
    }

    //获取统计信息
    public function sumInfo($where = [], $userWhere = [], $userWhere2 = []): array
    {
        $where['del'] = 0;
        $res = $this->field('SUM(amount) AS amount')
            ->hasWhere('user', $userWhere)
            ->hasWhere('user', $userWhere2, 'OR')
            ->where($where)
            ->getOne();
        return [
            'amount' => $res['amount'] ? Common::formatAmount($res['amount'], 2) : '0.00'
        ];
    }

    //获取单条数据
    public function getData($id, $where = [], $field = '*')
    {
        $where['id'] = intval($id);
        return $this->field($field)->where($where)->getOne();
    }

    //赎回
    public function back($userMining): array
    {
        $data = ['id' => $userMining['id'], 'back_time' => SYS_TIME];
        if ($userMining['end_time'] > SYS_TIME) {
            //计算违约天数 提前赎回
            if ($userMining['bc_rate'] > 0) {
                $lastDay = ceil(($userMining['end_time'] - SYS_TIME) / 86400);
                $data['bc_amount'] = round($userMining['amount'] * $lastDay * $userMining['bc_rate'], 2);
                if ($data['bc_amount'] > $userMining['amount']) {
                    return ['code' => -2, 'msg' => '赎回失败,本金不足以支付违约金'];
                }
            } else {
                $data['bc_amount'] = 0;
            }
            $data['status'] = 4;
        } else {
            $data['bc_amount'] = 0;
            $data['status'] = 2;
        }
        $userMining['status'] = $data['status'];
        $userMining['bc_amount'] = $data['bc_amount'];
        $userMining['back_time'] = $data['back_time'];
        $userMining['modify_time'] = SYS_TIME;
        $dbh = $this->begin();
        try {
            //保存数据结算金额
            $res = $this->edit($data, ['status' => 1]);
            if (!$res) {
                $dbh->rollBack();
                return ['code' => -2, 'msg' => '赎回失败,订单状态已经变更'];
            }
            $amount = $userMining['amount'] - $userMining['bc_amount'];
            if ($amount > 0) {
                if ($data['status'] == 2) {
                    $des = '赎回';
                    $amount += $userMining['profit_amount'];
                } else {
                    $user_mining_item_model=user_mining_item_model::getInstance();
                    $user_mining_item_model->edit(['status' => 0], ['user_id' => $userMining['id'], 'user_mining_id' => $userMining['id']]);
                    $des = '提前赎回';
                }
                $user_model = user_model::getInstance();
                $res=$user_model->changeBalance($userMining['user_id'], $amount, $userMining['title'], $des, 10, $userMining['id'],1,$userMining['currency'],true);
                //cron中处理升降级
//                $level_model = level_model::getInstance();
//                $level_model->upLevel($res['user']);
            }
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('赎回持币生息', $userMining);
            /*********添加日志*********/
            $dbh->commit();
            return ['code' => 1, 'msg' => '赎回成功', 'info' => $userMining];
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userMiningBack');
            return ['code' => -2, 'msg' => '赎回异常'];
        }
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
        return '';
        $where['id'] = intval($id);
        $data = $this->with(['user'=>'id,suffix'])->where($where)->getOne();
        if (!$data) {
            return ['code' => -2, 'msg' => '未找到数据'];
        }
        $res = $this->edit(['del' => 0], $where);
        if ($res) {
            //删除账变
            $user_amount_model = user_amount_model::getInstance();
            $user_amount_model->edit(['del' => 1], ['user_id' => $data['user_id'], 'type' => 7, 'key_id' => $data['id']]);
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
