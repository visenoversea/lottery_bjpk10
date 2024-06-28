<?php
//

namespace model;

use asura\db\Model;

class user_msg_read_model extends Model
{
    protected static $instance;

    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
    }

    //新增
    public function add(array $data = []): int
    {
        $data['create_time'] = SYS_TIME;
        return $this->insert($data);
    }

}
