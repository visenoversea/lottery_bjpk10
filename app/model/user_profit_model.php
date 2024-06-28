<?php
//

namespace model;

use asura\db\Model;
use asura\Log;
use service\RedisService;

class user_profit_model extends Model
{
    protected static $instance;
    //表关联
    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
    }

    /**
     * 获取未释放资金 有缓存 5分钟
     * @param int $userId
     * @param array $userWhere
     * @return float|mixed
     */
    public function getUnReleasedAmountByCache($userId = 0,$userWhere=[])
    {
        $redisService = RedisService::getInstance();
        $key = $redisService->UnReleasedAmountKey . $userId . md5(json_encode($userWhere));
        $amount = $redisService->get($key);
        if(null ===$amount || false === $amount){
            $amount = $this->getUnReleasedAmount($userId, $userWhere);
            $redisService->set($key, $amount, 300);
        }

        return $amount;
    }

    //获取未释放资金
    public function getUnReleasedAmount($userId = 0, $userWhere = [])
    {
        $where = ['status' => 2];
        if ($userId) {
            $where['user_id'] = $userId;
        }
        $res = $this->field('SUM(amount) AS amount')
            ->hasWhere('user', $userWhere)
            ->where($where)->getOne();
        return $res['amount'] ? $res['amount'] : 0.00;
    }

    //添加未释放资金 默认72小时自动释放
    public function addData($userId, $amount, $title, $des, $type = 0, $key_id = 0, $time = 259200, $status = 2)
    {
//        user_profit_unique_model::getInstance()->addData($userId, $type, $key_id);//用于唯一索引辅助判断
        return $this->add([
            'user_id' => $userId,
            'type' => $type,
            'title' => $title,
            'des' => $des,
            'amount' => $amount,
            'key_id' => $key_id,
            'end_time' => SYS_TIME + $time,
            'status' => $status,
        ]);
    }

    //数据验证
    public function checkData($data): array
    {
        return ['code' => 1, 'msg' => '成功'];
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

    //释放收益
    public function doReleasedProfit($userId=0){
        $where = ['status' => 2, 'end_time' => ['<' => SYS_TIME]];
        if($userId>0){
            $where['user_id'] = $userId;
        }
        $list = $this->where($where)->limit(800)->select();
        $user_model = user_model::getInstance();
        $num = 0;
        foreach ($list as $v) {
            $dbh = $user_model->begin();
            try {
                $res = $this->edit(['status' => 1], ['id' => $v['id']]);
                if ($res) {
                    //转移到余额
                    $res = $user_model->changeBalance($v['user_id'], $v['amount'], $v['title'], $v['des'], $v['type'], $v['key_id']);
                    //cron中处理升降级
//                    $user = $res['user'];
//                    $level_model->upLevel($user);
//                    $agentList = $user_model->getAgentList($user['pid']);
//                    if ($agentList) {
//                        $agent = array_pop($agentList);
//                        $level_model->upLevel($agent);
//                    }
                    $num ++;
                }
                $dbh->commit();
            } catch (Exception $e) {
                $dbh->rollBack();
                Log::logException($e, 'userProfitCron');
            }
        }
        return $num;
    }

    public function getSumAmount($user_id, $where = [],$userWhere)
    {
        if($user_id){
            $where['user_id'] = $user_id;
        }
        $where['status'] = ['>'=>0];
        $res = $this->field('SUM(amount) AS amount')->where($where)->hasWhere('user',$userWhere)->getOne();
        return $res['amount'] ? round($res['amount'],2) : '0.00';
    }

}
