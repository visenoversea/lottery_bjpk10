<?php
//

namespace model;

use asura\db\Model;

class ip_white_model extends Model
{
    protected static $instance;

    //新增
    public function add(array $data = []): int
    {
        $data['create_time'] = $data['modify_time'] = date('Y-m-d H:i:s',SYS_TIME);
        return $this->insert($data);
    }
}
