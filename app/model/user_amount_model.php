<?php
//用户金额账变

namespace model;

use asura\db\Model;
use service\GlobalService;

class user_amount_model extends Model
{
    protected static $instance;

    protected function getSuffix(): string
    {
        return GlobalService::getInstance()->getSuffix();
    }

    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
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
        $data['modify_time'] = SYS_TIME;
        return $this->where($where)->update($data);
    }

    /**
     * 删除
     * @param $id
     * @return array
     */
    public function delById($id): array
    {
        $data = $this->where(['id' => intval($id)])->getOne();
        if (!$data) {
            return ['code' => -2, 'msg' => '未找到数据'];
        }
        $res = $this->edit(['id' => $data['id'], 'status' => -1]);
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
