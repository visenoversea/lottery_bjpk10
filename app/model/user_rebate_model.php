<?php
//

namespace model;

use asura\db\Model;
use service\GlobalService;

class user_rebate_model extends Model
{
    protected static $instance;

    protected function getSuffix(): string
    {
        return GlobalService::getInstance()->getSuffix();
    }

    //表关联
    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
    }

    public function rebate(): array
    {
        return $this->belongsTo(user_model::class, 'rebate_id');
    }

    public function sumUserAgentInfo($userWhere, $where = []): array
    {
        $where['status'] = 1;
        $res = $this->field('SUM(amount) AS amount')
            ->hasWhere('user', $userWhere)
            ->where($where)
            ->getOne();
        return ['amount' => $res['amount'] ? round($res['amount'], 2) : '0.00'];
    }

    public function sumUserAmount($user_id, $date_time = []): string
    {
        $where = ['user_id' => $user_id, 'status' => 1];
        //时间筛选
        if ($date_time) {
            $where['create_time']['>='] = strtotime($date_time[0]);
            $where['create_time']['<='] = strtotime($date_time[1]);
        }
        $res = $this->field('SUM(amount) AS amount')
            ->where($where)
            ->getOne();
        return $res['amount'] ? round($res['amount']) : '0.00';
    }

    //用户充值返佣
    public function rechargeRebate($userRecharge, $agentList = [])
    {
        if (!$agentList) {
            return;
        }
        $config_model = config_model::getInstance();
        $rebateConfig = $config_model->getConfigData(8);
        //1级
        if ($rebateConfig['Rebate1'] <= 0) {
            return;
        }
        $GlobalService = GlobalService::getInstance();
        $suffix = $GlobalService->getSuffix();

        $user_model = user_model::getInstance();
        $user_balance_model = user_balance_model::getInstance();
        $agent = array_pop($agentList);
        $data = [
            'type' => 1,
            'user_id' => $agent['id'],
            'rebate_id' => $userRecharge['user_id'],
            'title' => '充值',
            'key_id' => $userRecharge['id'],
            'currency' => $userRecharge['currency'],
            'rate' => $userRecharge['rate'],
            'amount' => round($userRecharge['amount'] * $rebateConfig['Rebate1'],2)
        ];
        if ($data['amount'] > 0) {
            $GlobalService->setSuffix('');
            $data['id'] = $this->add($data);
            $GlobalService->setSuffix($suffix);
            if ($data['currency'] == 'USDT') {
                $user_model->changeBalance($agent['id'], $data['amount'], $data['currency'], $data['title'], 3, $data['id']);
            } else {
                $res = $user_balance_model->getData($data['user_id'], $data['currency']);
                if ($res['code'] !== 1) {
                    return;
                }
                $userBalance = $res['data'];
                $user_balance_model->changeBalance($userBalance['id'], $data['amount'], $data['currency'], $data['title'], 3, $data['id']);
            }
        }
        //2级
        if ($rebateConfig['Rebate2'] <= 0) {
            return;
        }
        $agent = array_pop($agentList);
        if (!$agent) {
            return;
        }
        $data = [
            'type' => 1,
            'user_id' => $agent['id'],
            'rebate_id' => $userRecharge['user_id'],
            'title' => '充值',
            'key_id' => $userRecharge['id'],
            'currency' => $userRecharge['currency'],
            'rate' => $userRecharge['rate'],
            'amount' => round($userRecharge['amount'] * $rebateConfig['Rebate2'],2)
        ];
        if ($data['amount'] > 0) {
            $GlobalService->setSuffix('');
            $data['id'] = $this->add($data);
            $GlobalService->setSuffix($suffix);
            if ($data['currency'] == 'USDT') {
                $user_model->changeBalance($agent['id'], $data['amount'], $data['currency'], $data['title'], 3, $data['id']);
            } else {
                $res = $user_balance_model->getData($data['user_id'], $data['currency']);
                if ($res['code'] !== 1) {
                    return;
                }
                $userBalance = $res['data'];
                $user_balance_model->changeBalance($userBalance['id'], $data['amount'], $data['currency'], $data['title'], 3, $data['id']);
            }
        }
        //3级
        if ($rebateConfig['Rebate3'] <= 0) {
            return;
        }
        $agent = array_pop($agentList);
        if (!$agent) {
            return;
        }
        $data = [
            'type' => 1,
            'user_id' => $agent['id'],
            'rebate_id' => $userRecharge['user_id'],
            'title' => '充值',
            'key_id' => $userRecharge['id'],
            'currency' => $userRecharge['currency'],
            'rate' => $userRecharge['rate'],
            'amount' => round($userRecharge['amount'] * $rebateConfig['Rebate3'],2)
        ];
        if ($data['amount'] > 0) {
            $GlobalService->setSuffix('');
            $data['id'] = $this->add($data);
            $GlobalService->setSuffix($suffix);
            if ($data['currency'] == 'USDT') {
                $user_model->changeBalance($agent['id'], $data['amount'], $data['currency'], $data['title'], 3, $data['id']);
            } else {
                $res = $user_balance_model->getData($data['user_id'], $data['currency']);
                if ($res['code'] !== 1) {
                    return;
                }
                $userBalance = $res['data'];
                $user_balance_model->changeBalance($userBalance['id'], $data['amount'], $data['currency'], $data['title'], 3, $data['id']);
            }
        }
    }

    //量化返佣
    public function quantifyRebate($userQuantify, $agentList = [])
    {
        if (!$agentList) {
            return;
        }
        $config_model = config_model::getInstance();
        $rebateConfig = $config_model->getConfigData(8);
        //1级
        if ($rebateConfig['Quantify1'] <= 0) {
            return;
        }
        $GlobalService = GlobalService::getInstance();
        $suffix = $GlobalService->getSuffix();

        $level_model = level_model::getInstance();
        $user_model = user_model::getInstance();
        $agent = array_pop($agentList);
        $data = [
            'type' => 2,
            'user_id' => $agent['id'],
            'rebate_id' => $userQuantify['user_id'],
            'title' => '量化',
            'key_id' => $userQuantify['id'],
            'currency' => 'USDT',
            'rate' => 1,
            'amount' => round($userQuantify['profit'] * $rebateConfig['Quantify1'], 2)
        ];
        if ($data['amount'] > 0) {
            $GlobalService->setSuffix('');
            $data['id'] = $this->add($data);
            $GlobalService->setSuffix($suffix);
            $res = $user_model->changeBalance($data['user_id'], $data['amount'], $data['currency'], $data['title'], 3, $data['id']);
            $level_model->upLevel($res['user']);
        }
        //2级
        if ($rebateConfig['Quantify2'] <= 0) {
            return;
        }
        $agent = array_pop($agentList);
        if (!$agent) {
            return;
        }
        $data = [
            'type' => 2,
            'user_id' => $agent['id'],
            'rebate_id' => $userQuantify['user_id'],
            'title' => '量化',
            'key_id' => $userQuantify['id'],
            'currency' => 'USDT',
            'rate' => 1,
            'amount' => round($userQuantify['profit'] * $rebateConfig['Quantify2'], 2)
        ];
        if ($data['amount'] > 0) {
            $GlobalService->setSuffix('');
            $data['id'] = $this->add($data);
            $GlobalService->setSuffix($suffix);
            $res = $user_model->changeBalance($data['user_id'], $data['amount'], $data['currency'], $data['title'], 3, $data['id']);
            $level_model->upLevel($res['user']);
        }
        //2级
        if ($rebateConfig['Quantify3'] <= 0) {
            return;
        }
        $agent = array_pop($agentList);
        if (!$agent) {
            return;
        }
        $data = [
            'type' => 2,
            'user_id' => $agent['id'],
            'rebate_id' => $userQuantify['user_id'],
            'title' => '量化',
            'key_id' => $userQuantify['id'],
            'currency' => 'USDT',
            'rate' => 1,
            'amount' => round($userQuantify['profit'] * $rebateConfig['Quantify3'], 2)
        ];
        if ($data['amount'] > 0) {
            $GlobalService->setSuffix('');
            $data['id'] = $this->add($data);
            $GlobalService->setSuffix($suffix);
            $res = $user_model->changeBalance($data['user_id'], $data['amount'], $data['currency'], $data['title'], 3, $data['id']);
            $level_model->upLevel($res['user']);
        }
    }

    public function getSumAmount($user_id, $where = [])
    {
        $where['user_id'] = $user_id;
        $where['status'] = 1;
        $res = $this->field('SUM(amount) AS amount')->where($where)->getOne();
        return $res['amount'] ? round($res['amount'],2) : 0.00;
    }

    public function getRebateAmount($user_id, $rebate_id, $where = [])
    {
        $where['user_id'] = $user_id;
        $where['rebate_id'] = $rebate_id;
        $where['status'] = 1;
        $res = $this->field('SUM(amount*rate) AS amount')
            ->where($where)
            ->getOne();
        return $res['amount'] ? round($res['amount'],2) : '0.00';
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
        if (!isset($data['create_time'])) {
            $data['create_time'] = SYS_TIME;
        }
        if (!isset($data['modify_time'])) {
            $data['modify_time'] = SYS_TIME;
        }
        return $this->insert($data);
    }

    //编辑
    public function edit(array $data, array $where = [])
    {
        if (isset($data['id'])) {
            $where['id'] = intval($data['id']);
            unset($data['id']);
        }
        if (!isset($data['modify_time'])) {
            $data['modify_time'] = SYS_TIME;
        }
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

    public function delData($where)
    {
        return $this->where($where)->del();
    }

}
