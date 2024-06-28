<?php
//

namespace model;

use asura\Common;
use asura\db\Model;

class user_gift_model extends Model
{
    protected static $instance;

    //表关联
    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
    }

    //移除体验金
    public function removeGiftAmount($userId, $remark='')
    {
        return $this->edit(['status' => 0, 'remark' => $remark], ['user_id' => $userId, 'status' => 1, 'end_time' => ['>=' => SYS_TIME]]);
    }

    public function getGiftAmount($userId)
    {
        $res = $this->field('SUM(amount) AS amount')
            ->where(['user_id' => $userId, 'end_time' => ['>=' => SYS_TIME], 'status' => 1])->getOne();
        return $res['amount'] ? $res['amount'] : 0.00;
    }

    //添加用户体验金
    public function addUserGiftAmount($userId, $title, $amount, $day)
    {
        $end_time = strtotime('today') + intval($day) * 86400;
        $this->add([
            'user_id' => $userId,
            'title' => trim($title),
            'amount' => $amount,
            'end_time' => $end_time,
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

}
