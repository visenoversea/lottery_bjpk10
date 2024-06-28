<?php
//

namespace model;

use asura\Common;
use asura\db\Model;
use service\GlobalService;

class user_recharge_model extends Model
{
    protected static $instance;

    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
    }

    public function success($user, $userRecharge)
    {
        $user_model = user_model::getInstance();
        if ($userRecharge['real_amount'] > 0) {
            //更新累计充值
            $userUpdate = ['id' => $user['id'], 'recharge_amount' => $user['recharge_amount'] + $userRecharge['real_amount']];
            if ($user['recharge_time'] == 0) {
                //首次充值
                $userUpdate['recharge_first'] = $userRecharge['real_amount'];
                $userUpdate['recharge_time'] = SYS_TIME;
                $res = $user_model->edit($userUpdate, ['recharge_time' => 0]);
                if (!$res) {
                    //不是首次充值
                    if ($userRecharge['is_first'] == 1) {
                        $this->edit(['id' => $userRecharge['id'], 'is_first' => 0]);
                        $userRecharge['is_first'] = 0;
                    }
                    unset($userUpdate['recharge_first']);
                    unset($userUpdate['recharge_time']);
                    $user_model->where(['id' => $user['id']])
                        ->update("recharge_amount=recharge_amount+{$userRecharge['real_amount']},modify_time=" . SYS_TIME);
                }
            } else {
                $user_model->edit($userUpdate);
            }
        }
        //充值到账
        $res = $user_model->changeBalance($userRecharge['user_id'], $userRecharge['amount'], $userRecharge['title'], '充值到账', 1, $userRecharge['id']);
        $user = $res['user'];
        //充值返佣
        $agentList = $user_model->getAgentList($user['pid']);
        $user_rebate_mode = user_rebate_model::getInstance();
        $user_rebate_mode->rechargeRebate($userRecharge, $agentList);
        if (isset($userUpdate['recharge_time'])) {
            $task_model = task_model::getInstance();
            $user_task_model = user_task_model::getInstance();
            //新用户首充值奖励
            $task = $task_model->where(['id' => 3, 'status' => 1])->getOne();
            if ($task && $userRecharge['amount'] >= $task['condition']) {
                $user_task_model->add([
                    'user_id' => $user['id'],
                    'task_id' => $task['id'],
                    'title' => $task['title'],
                    'amount' => $task['amount'],
                    'lottery_nums' => $task['lottery_nums'],
                    'status' => 2
                ]);
            }
            //邀请下级首充奖励
            $startTime = strtotime('2023-10-30');
            $endTime = strtotime('2023-11-04');
            if (SYS_TIME >= $startTime && SYS_TIME < $endTime) {
                if ($agentList && $userRecharge['amount'] >= 100) {
                    $agent = $agentList[count($agentList) - 1];
                    $user_model->changeBalance($agent['id'], 12, 'USDT', '邀请首充奖励', 12);
                }
            } else {
//                if ($agentList && $userRecharge['amount'] >= 50) {
//                    $agent = $agentList[count($agentList) - 1];
//                    $user_model->changeBalance($agent['id'], 5, 'USDT', '邀请首充奖励', 12);
//                }
//                $task = $task_model->where(['id' => 4, 'status' => 1])->getOne();
//                if ($agentList && $userRecharge['amount'] >= $task['condition']) {
//                    if ($task) {
//                        $agent = $agentList[count($agentList) - 1];
//                        $user_task_model->add([
//                            'user_id' => $agent['id'],
//                            'task_id' => $task['id'],
//                            'title' => $task['title'],
//                            'amount' => $task['amount'],
//                            'lottery_nums' => $task['lottery_nums'],
//                            'status' => 2
//                        ]);
//                    }
//                }
            }
        }
        ///判断自己升级
        $level_model = level_model::getInstance();
        $level_model->upLevel($user);
        //判断上级代理升级
        if ($agentList) {
            $level_model->upAgentLevel($agentList);
        }
    }

    //获取统计信息
    public function sumInfo($where = [], $userWhere = [],$userWhere2=[]): array
    {
        $where['del']=0;
        $res = $this->field('SUM(real_amount) AS realAmount')
            ->hasWhere('user', $userWhere)
            ->hasWhere('user', $userWhere2,'OR')
            ->where($where)
            ->getOne();
        return [
            'realAmount' => $res['realAmount'] ?Common::formatAmount($res['realAmount'],2): '0.00'
        ];
    }

    //获取用户充值信息
    public function sumUserInfo($user_id, $date_time = []): array
    {
        $where = ['user_id' => $user_id, 'status' => 1];
        //时间筛选
        if ($date_time) {
            $where['create_time']['>='] = strtotime($date_time[0]);
            $where['create_time']['<='] = strtotime($date_time[1]);
        }
        $res = $this->field('SUM(real_amount) AS amount,count(*) as nums,SUM((amount-real_amount) *rate) AS gift')
            ->where($where)
            ->getOne();
        return [
            'amount' => $res['amount'] ? Common::formatAmount($res['amount'], 2) : '0.00',
            'gift' => $res['gift'] ? Common::formatAmount($res['gift'], 2) : '0.00',
            'nums' => $res['nums']
        ];
    }

    //统计用户实际金额
    public function sumUserRealAmount($user_id, $date_time = [])
    {
        $where = ['user_id' => $user_id, 'status' => 1];
        //时间筛选
        if ($date_time) {
            $where['create_time']['>='] = strtotime($date_time[0]);
            $where['create_time']['<='] = strtotime($date_time[1]);
        }
        $res = $this->field('SUM(real_amount) AS real_amount')
            ->where($where)
            ->getOne();
        return $res['real_amount'] ? Common::formatAmount($res['real_amount'], 2) : '0.00';
    }

    public function sumUserAgentInfo($userWhere, $where = []): array
    {
        $where['status'] = 1;
        $userWhere['status']['>='] = 0;
        $userWhere['virtual'] = 0;
        $res = $this->alias('ur')
            ->field('SUM(ur.real_amount) AS amount,COUNT(DISTINCT ur.user_id) AS userNums,COUNT(*) AS nums,SUM((ur.amount-ur.real_amount) * ur.rate) AS gift')
            ->hasWhere('user', $userWhere)
            ->where($where)
            ->getOne();
        return [
            'amount' => $res['amount'] ? Common::formatAmount($res['amount'], 2) : '0.00',
            'gift' => $res['gift'] ? Common::formatAmount($res['gift'], 2) : '0.00',
            'userNums' => $res['userNums'],
            'nums' => $res['nums']
        ];
    }

    //获取代理下级实际充值金额
    public function sumUserAgentAmount($userWhere = [], $where = [])
    {
        //时间筛选
        $where['status'] = 1;
        $userWhere['status']['>='] = 0;
        $userWhere['virtual'] = 0;
        $res = $this->field('SUM(real_amount) AS real_amount')
            ->hasWhere('user', $userWhere)
            ->where($where)
            ->getOne();
        return $res['real_amount'] ? Common::formatAmount($res['real_amount'], 2) : '0.00';
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
        $data = $this->with(['user'=>'id,suffix'])->where($where)->getOne();
        if (!$data) {
            return ['code' => -2, 'msg' => '未找到数据'];
        }
        $res = $this->edit(['id' => $data['id'], 'del' => 1], $where);
        if ($res) {
            //删除账变
            $user_amount_model = user_amount_model::getInstance();
            $GlobalService = GlobalService::getInstance();
            $GlobalService->setSuffix('');
            $user_amount_model->edit(['del' => 1], ['user_id' => $data['user_id'], 'type' => 1, 'key_id' => $data['id']]);
            $GlobalService->setSuffix($data['user']['suffix']);
            $user_amount_model->edit(['del' => 1], ['user_id' => $data['user_id'], 'type' => 1, 'key_id' => $data['id']]);
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
