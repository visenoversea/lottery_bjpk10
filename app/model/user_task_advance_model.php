<?php
//

namespace model;

use asura\db\Model;

class user_task_advance_model extends Model
{
    protected static $instance;

//    //表关联
//    public function demo(): array
//    {
//        return $this->belongsTo(demo_model::class, 'key_id');
//    }

    //数据验证
    public function checkData($data): array
    {
        return ['code' => 1, 'msg' => '成功'];
    }

    /**
     * 获取已完成任务次数
     * @param $userId
     * @param $taskId
     * @return int
     */
    public function getFinishNums($userId,$taskId): int
    {
        return $this->where(['user_id' => $userId, 'task_id' => $taskId, 'status' => ['>' => 0]])->count();
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
        $data['create_time']  = SYS_TIME;
        return $this->insert($data);
    }

    //编辑
    public function edit(array $data, array $where = [])
    {
        if (isset($data['id'])) {
            $where['id'] = intval($data['id']);
            unset($data['id']);
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

}
