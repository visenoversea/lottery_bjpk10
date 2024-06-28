<?php
//

namespace model;

use asura\db\Model;

class menu_model extends Model
{
    protected static $instance;

    /**
     * 数据验证
     * @param array $data
     * @return array
     */
    public function checkData(array $data): array
    {
        if (!in_array($data['type'], [1, 2])) {
            return ['code' => -2, 'msg' => '参数异常：type'];
        }
        if ($data['parent_id'] > 0) {
            $parent = $this->where(['id' => $data['parent_id']])->getOne();
            if (!$parent) {
                return ['code' => -2, 'msg' => '父id不存在'];
            }
            if ($data['type'] == 1 && $parent['parent_id'] > 0){
                return ['code' => -2, 'msg' => '不能超过三级菜单'];
            }
        }
        //标题
        if (empty($data['title'])) {
            return ['code' => -2, 'msg' => '标题不能为空'];
        }
        //路径
        if (empty($data['path'])) {
            return ['code' => -2, 'msg' => '路径不能为空'];
        }
        if ($data['type'] == 1 && $data['path'] == '/') {
            return ['code' => -2, 'msg' => '路径不能为(/)'];
        }
        //名称
        if (empty($data['name'])) {
            return ['code' => -2, 'msg' => '名称不能为空'];
        }
        $where = [
            'type' => $data['type'],
            'name' => $data['name']
        ];
        if (isset($data['id'])) {
            $where['id']['<>'] = $data['id'];
        }
        if ($this->where($where)->isExist()) {
            return ['code' => -2, 'msg' => '名称不能重复'];
        }
        $where['parent_id'] = $data['parent_id'];
        $where['path'] = $data['path'];
        unset($where['name']);
        if ($this->where($where)->isExist()) {
            return ['code' => -2, 'msg' => '访问路径不能重复'];
        }
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
            $this->edit(['status' => -1],['parent_id' => $data['id']]);
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
