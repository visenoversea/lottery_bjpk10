<?php
//

namespace model;

use asura\db\Model;

class lang_model extends Model
{
    protected static $instance;

//    //表关联
//    public function demo(): array
//    {
//        return $this->belongsTo(demo_model::class, 'key_id');
//    }

    public function checkData($data): array
    {
        if (empty($data['icon'])) {
            return ['code' => -2, 'msg' => '请上传图标'];
        }
        if (empty($data['name'])) {
            return ['code' => -2, 'msg' => '语言不能为空'];
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
            $lang_config_list_model = lang_config_list_model::getInstance();
            $lang_config_list_model->where(['lang' => $data['code']])->del();
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
