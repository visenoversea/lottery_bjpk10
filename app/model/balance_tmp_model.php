<?php
//

namespace model;

use asura\db\Model;

class balance_tmp_model extends Model
{
    protected static $instance;


    //新增
    public function add(array $data = []): int
    {
        //$data['modify_time'] = SYS_TIME;
        if (empty($data['create_time'])) {
            $data['create_time'] = SYS_TIME;
        }
        return $this->insert($data);
    }


}
