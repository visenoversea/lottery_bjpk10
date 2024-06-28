<?php
//

namespace model;

use asura\db\Model;

class user_profit_unique_model extends Model
{
    protected static $instance;

    //user_id_type_key_id
    public function addData($userId, $type = 0, $key_id=0)
    {
        $this->insert([
            'unique_id' => $userId.':'. $type .':'.$key_id,
        ]);
    }


}
