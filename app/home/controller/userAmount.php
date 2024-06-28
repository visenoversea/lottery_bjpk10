<?php

namespace home\controller;

use asura\Common;
use home\classes\base;
use model\user_amount_model;

class userAmount extends base
{

    public function getList($type='',$page=1, $limit=20)
    {
        $user = $this->GlobalService->getUser();
        $where=['user_id' => $user['id'], 'del' => 0,'status' => 1];
        if($type!==''){
            $where['type']=intval($type);
        }
        $user_amount_model = user_amount_model::getInstance();
        $list = $user_amount_model->where($where)->order('create_time DESC')
            ->limit($limit, $page)
            ->select();
        foreach ($list as $k => $v) {
            if(in_array($v['type'],[1,2])){
                $v['title'] = $this->GlobalService->translate($v['title']);
            }
            $v['amount']=Common::formatAmount($v['amount']);
            $v['des'] = $this->GlobalService->translate($v['des']);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

}
