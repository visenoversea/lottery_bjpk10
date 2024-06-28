<?php
//

namespace model;

use asura\Common;
use asura\db\Model;
use asura\Log;
use Exception;

class user_quantify_model extends Model
{
    protected static $instance;

    //表关联
    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
    }

    //获取用户今日量化次数
    public function getTodayNums($user_id)
    {
        return $this->where([
            'user_id' => $user_id,
            'status' => ['>' => 0],
            'create_time' => ['>=' => strtotime('today')]
        ])->count();
    }

    public function getTodayInfo($user_id)
    {
        $res = $this->field('SUM(profit) AS profit,count(*) AS nums')
            ->where([
                'user_id' => $user_id,
                'status' => ['>' => 0],
                'create_time' => ['>=' => strtotime('today')]
            ])->getOne();
        return [
            'profit' => $res['profit'] ? Common::formatAmount($res['profit'], 2) : '0.00',
            'nums' => $res['nums']
        ];
    }

    public function sumUserAgentInfo($userWhere, $where = []): array
    {
        $where['status'] = 1;
        $res = $this->alias('uq')
            ->field('SUM(uq.profit) AS profit,COUNT(DISTINCT uq.user_id) AS userNums')
            ->hasWhere('user', $userWhere)
            ->where($where)
            ->getOne();
        return [
            'profit' => $res['profit'] ? Common::formatAmount($res['profit'], 2) : '0.00',
            'userNums' => $res['userNums']
        ];
    }

    public function getSumAmount($user_id, $where = [])
    {
        $where['user_id'] = $user_id;
        $where['status'] = 1;
        $res = $this->field('SUM(profit) AS profit')->where($where)->getOne();
        return $res['profit'] ? Common::formatAmount($res['profit'], 2) : 0.00;
    }

    //取消量化
    public function cancel($userQuantify): array
    {
        $res = $this->edit(['id' => $userQuantify['id'], 'status' => 0], ['status' => 2]);
        if ($res) {
            return ['code' => 1, 'msg' => '取消成功'];
        }
        return ['code' => -2, 'msg' => '取消失败，订单状态已变更'];
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
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
