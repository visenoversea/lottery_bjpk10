<?php
//

namespace model;

use asura\db\Model;

class mining_model extends Model
{
    protected static $instance;

//    //表关联
//    public function demo(): array
//    {
//        return $this->belongsTo(demo_model::class, 'key_id');
//    }

    public function checkData($data): array
    {
        if (empty($data['title'])) {
            return ['code' => -2, 'msg' => '标题不能为空'];
        }
        if ($data['day'] < 1) {
            return ['code' => -2, 'msg' => '周期不能小于1天'];
        }
        if ($data['min_rate'] < 0) {
            return ['code' => -2, 'msg' => '最小收益不能小于0'];
        }
        if ($data['min_rate'] < $data['max_rate']) {
            return ['code' => -2, 'msg' => '最小收益不能大于最大收益'];
        }
        if ($data['bc_rate'] < 0 || $data['bc_rate'] > 1) {
            return ['code' => -2, 'msg' => '违约比例异常'];
        }
        return ['code' => 1, 'msg' => '验证成功'];
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
