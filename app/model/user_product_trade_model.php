<?php
//

namespace model;

use asura\db\Model;
use asura\Log;
use Exception;
use service\GlobalService;

class user_product_trade_model extends Model
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

    public function cancel($userProductTrade): array
    {
        $dbh = $this->begin();
        try {
            $res = $this->edit(['id' => $userProductTrade['id'], 'status' => 0], ['status' => 2]);
            if (!$res) {
                $dbh->rollBack();
                return ['code' => -2, 'msg' => '撤销失败，订单状态已变更'];
            }
            if ($userProductTrade['currency'] == 'USDT') {
                $user_model = user_model::getInstance();
                $user_model->changeBalance($userProductTrade['user_id'], $userProductTrade['amount'], $userProductTrade['title'], '取消委托', 4, $userProductTrade['id']);
            } else {
                $user_balance_model=user_balance_model::getInstance();
                $res = $user_balance_model->getData($userProductTrade['user_id'], $userProductTrade['currency']);
                if ($res['code'] !== 1) {
                    return $res;
                }
                $userBalance = $res['data'];
                $user_balance_model->changeBalance($userBalance['id'], $userProductTrade['amount'], $userProductTrade['title'], '取消委托', 4, $userProductTrade['id']);
            }
            $dbh->commit();
            return ['code' => 1, 'msg' => '取消成功'];
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userProductContractCancel');
            return ['code' => -2, 'msg' => '撤单异常'];
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
        $data = $this->with(['user'=>'id,suffix'])->where($where)->getOne();
        if (!$data) {
            return ['code' => -2, 'msg' => '未找到数据'];
        }
        $res = $this->edit(['del' => 1], $where);
        if ($res) {
            //删除
            $user_amount_model = user_amount_model::getInstance();
            $GlobalService = GlobalService::getInstance();
            $GlobalService->setSuffix('');
            $user_amount_model->edit(['del' => 1], ['user_id' => $data['user_id'], 'type' => 4, 'key_id' => $data['id']]);
            $GlobalService->setSuffix($data['user']['suffix']);
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
