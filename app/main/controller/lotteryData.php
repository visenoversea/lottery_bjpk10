<?php
/**
 *彩种
 */

namespace main\controller;

use main\classes\base;
use model\lottery_data_model;

class lotteryData extends base
{
    /**
     * /main/lottery/getList
     */
    public function getList($id, $page = 1, $limit = 20)
    {
        $lottery_data_model = lottery_data_model::getInstance();
        $list = $lottery_data_model->where(['lottery_id'=>$id,'open_time'=>['<='=>SYS_TIME],'status'=>1])
            ->order('open_time DESC')
            ->limit($limit,$page)->select();
        foreach ($list as $k => $v) {
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }


}
