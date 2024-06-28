<?php
//

namespace model;

use asura\db\Model;
use asura\Log;
use Exception;

class user_product_time_model extends Model
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
    public function sell($userProductTime, $orderConfig = []): array
    {
        $data = [
            'id' => $userProductTime['id'],
            'sell_price' => $userProductTime['product']['price'],
            'status' => 2,
        ];
        //获取全局风控
        if (!$orderConfig) {
            $config_model = config_model::getInstance();
            $orderConfig = $config_model->getConfigData(7);
        }
        if ($userProductTime['risk_status'] == 0) {
            $user_time_risk_model = user_time_risk_model::getInstance();
            //全局风控
            $userTimeRisk = $user_time_risk_model->where(['user_id' => $userProductTime['user_id'], 'status' => 1])->getOne();
            if ($userTimeRisk) {
                $risk = $userTimeRisk['risk'];
            } else {
                $risk = $orderConfig['ProductTimeRisk'] ? intval($orderConfig['ProductTimeRisk']) : 45;
            }
            if ($risk > 0 && mt_rand(1, 100) <= $risk) {
                //赢
                $userProductTime['risk_status'] = 1;
            } else {
                //亏
                $userProductTime['risk_status'] = 2;
            }
        }
        if ($userProductTime['risk_status'] == 1) {
            //盈利
            $data['sell_profit'] = round($userProductTime['amount'] * $userProductTime['profit'], 2);
            if ($userProductTime['side'] == 1) {
                //买涨
                if ($data['sell_price'] <= $userProductTime['open_price']) {
                    $data['sell_price'] = $userProductTime['open_price'] + 1 / pow(10, $userProductTime['fixed']) * mt_rand(1, 20);
                }
            } else {
                //买跌
                if ($data['sell_price'] >= $userProductTime['open_price']) {
                    $data['sell_price'] = $userProductTime['open_price'] - 1 / pow(10, $userProductTime['fixed']) * mt_rand(1, 50);
                }
            }
        } else if ($userProductTime['risk_status'] == 2) {
            //亏损
            if ($orderConfig['ProductTimeMode'] == 0 || $userProductTime['profit'] >= 1) {
                $data['sell_profit'] = -$userProductTime['amount'];
            } else {
                $data['sell_profit'] = -round($userProductTime['amount'] * $userProductTime['profit'], 2);
            }
            if ($userProductTime['side'] == 1) {
                //买涨
                if ($data['sell_price'] >= $userProductTime['open_price']) {
                    $data['sell_price'] = $userProductTime['open_price'] - 1 / pow(10, $userProductTime['fixed']) * mt_rand(1, 20);
                }
            } else {
                //买跌
                if ($data['sell_price'] <= $userProductTime['open_price']) {
                    $data['sell_price'] = $userProductTime['open_price'] + 1 / pow(10, $userProductTime['fixed']) * mt_rand(1, 50);
                }
            }
        } else if ($userProductTime['risk_status'] == 3) {
            //平局
            $data['sell_price'] = $userProductTime['open_price'];
            $data['sell_profit'] = 0;
        }
        $dbh = $this->begin();
        try {
            //保存数据结算
            $res = $this->edit($data, ['status' => 1]);
            if (!$res) {
                $dbh->rollBack();
                return ['code' => -2, 'msg' => '失败'];
            }
            $amount = $userProductTime['amount'] + $data['sell_profit'];
            if ($amount > 0) {
                $user_model = user_model::getInstance();
                $user_model->changeDeposit($userProductTime['user_id'], $amount, $userProductTime['title'],'结算', 6, $userProductTime['id']);
//                $user_model->changeBalance($userProductTime['user_id'], $amount, $userProductTime['title'],'结算', 6, $userProductTime['id']);
            }
            $userProductTime['sell_price'] = $data['sell_price'];
            $userProductTime['sell_profit'] = $data['sell_profit'];
            $userProductTime['modify_time'] = SYS_TIME;
            $userProductTime['status'] = $data['status'];
            $dbh->commit();
            return ['code' => 1, 'msg' => '成功', 'info' => $userProductTime];
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userProductTimeSell');
            return ['code' => -2, 'msg' => '失败'];
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
            $user_amount_model->edit(['del' => 1], ['user_id' => $data['user_id'], 'type' => 5, 'key_id' => $data['id']]);
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
