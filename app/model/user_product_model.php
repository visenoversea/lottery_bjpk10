<?php
//

namespace model;

use asura\db\Model;

class user_product_model extends Model
{
    protected static $instance;

    //表关联
    public function product(): array
    {
        return $this->belongsTo(product_model::class, 'product_id');
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

    public function delData(array $where)
    {
        return $this->where($where)->del();
    }


}
