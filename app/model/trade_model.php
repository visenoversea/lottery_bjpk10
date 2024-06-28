<?php
//

namespace model;

use asura\db\Model;

class trade_model extends Model
{
    protected static $instance;

    public function checkData($data): array
    {
        if ($data['min'] < 1) {
            return ['code' => -2, 'msg' => '最小金额不能小于1'];
        }
//        if (!$data['info']) {
//            return ['code' => -2, 'msg' => 'Info信息不能为空'];
//        }
        if (!is_array($data['info'])) {
            return ['code' => -2, 'msg' => 'Info信息异常'];
        }
        if (empty($data['title'])) {
            return ['code' => -2, 'msg' => '标题不能为空'];
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

}
