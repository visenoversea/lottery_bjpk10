<?php

namespace model;

use asura\Common;
use asura\db\Model;
use service\GlobalService;

class user_withdraw_model extends Model
{
    protected static $instance;

    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
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

    //获取用户信息
    public function sumUserInfo($user_id, $date_time = []): array
    {
        $where = ['user_id' => $user_id, 'status' => 1];
        //时间筛选
        if ($date_time) {
            $where['review_time']['>='] = strtotime($date_time[0]);
            $where['review_time']['<='] = strtotime($date_time[1]);
        }
        $res = $this->field('SUM(real_amount) AS amount,count(*) as nums')
            ->where($where)
            ->getOne();
        return [
            'amount' => $res['amount'] ? Common::formatAmount($res['amount'], 2) : '0.00',
            'nums' => $res['nums']
        ];
    }

    //统计用户实际金额
    public function sumUserRealAmount($user_id, $date_time = [])
    {
        $where = ['user_id' => $user_id, 'status' => 1];
        //时间筛选
        if ($date_time) {
            $where['review_time']['>='] = strtotime($date_time[0]);
            $where['review_time']['<='] = strtotime($date_time[1]);
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
        $where['del'] = 0;
        $res = $this->alias('uw')
            ->field('SUM(uw.real_amount * uw.rate) AS amount,COUNT(DISTINCT uw.user_id) AS userNums,COUNT(*) AS nums')
            ->hasWhere('user', $userWhere)
            ->where($where)
            ->getOne();
        return [
            'amount' => $res['amount'] ? Common::formatAmount($res['amount'], 2) : '0.00',
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
            //删除账变
            $user_amount_model = user_amount_model::getInstance();
            $GlobalService = GlobalService::getInstance();
            $GlobalService->setSuffix('');
            $user_amount_model->edit(['del' => 1], ['user_id' => $data['user_id'], 'type' => 2, 'key_id' => $data['id']]);
            $GlobalService->setSuffix($data['user']['suffix']);
            $user_amount_model->edit(['del' => 1], ['user_id' => $data['user_id'], 'type' => 2, 'key_id' => $data['id']]);
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
