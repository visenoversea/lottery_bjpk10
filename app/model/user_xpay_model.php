<?php

namespace model;

use asura\db\Model;

class user_xpay_model extends Model
{
    protected static $instance;

    public function getUserAddress($user_id){
        return $this->where(['user_id' => (int)($user_id) , 'status' => 2])->getOne();
    }

    public function getUserAddressByAddress($address){
        return $this->where(['address' => $address , 'status' => 2])->getOne();
    }

    /**
     * 获取一个未被绑定的地址
     * @return boolean|array
     */
    public function getOneByAddress($address)
    {
        return $this->where(['address'=>$address ])->field("id,status,user_id,address")->getOne();
    }

    //新增
    public function add(array $data = []): int
    {
        $data['create_time'] = $data['modify_time'] = SYS_TIME;
        return $this->insert($data);
    }

    //新增多个地址
    public function addMultiAddress(array $addresses = []): int
    {
        if(empty($addresses)){
            return false;
        }
        $data = [];
        foreach ($addresses as $item){
            $data[] = [$item, SYS_TIME, SYS_TIME];
        }
        return  $this->insertAll(['address','create_time', 'modify_time'], $data);
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

}
