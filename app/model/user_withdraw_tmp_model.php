<?php
//

namespace model;

use asura\db\Model;

class user_withdraw_tmp_model extends Model
{
    protected static $instance;

    //编辑
    public function edit(array $data, array $where = [])
    {
        if (isset($data['id'])) {
            $where['id'] = intval($data['id']);
            unset($data['id']);
        }
        return $this->where($where)->update($data);
    }


}
