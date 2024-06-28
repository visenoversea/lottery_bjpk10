<?php
//

namespace model;

use asura\db\Model;

class user_amount_unique_model extends Model
{
    protected static $instance;

    //user_id_currency_type_key_id
    public function addData($user_id,$currency='', $type = 0, $key_id=0)
    {
        $this->insert([
            'unique_id' => $user_id.':'.$currency.':'. $type .':'.$key_id,
        ]);
    }


}
