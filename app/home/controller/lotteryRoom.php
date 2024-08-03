<?php
/**
 *彩种
 */

namespace home\controller;

use asura\Common;
use main\classes\base;
use asura\Illuminate\DB;
use model\lottery_data_model;
use model\lottery_group_model;
use model\lottery_model;
use model\lottery_room_model;
use model\user_bet_model;

class lotteryRoom extends base
{
    /**
     * /main/lottery/getList
     */
    public function getList()
    {
        $lottery_model = lottery_model::getInstance();
        $list = $lottery_model->where(['status'=>1])->order('sort DESC,id ASC')->limit(-1)->select();
        foreach ($list as $k => $v) {
            $v['banner'] = json_decode($v['banner'],true);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    public function betInfo($id)
    {
        $user = $this->GlobalService->getUser();
        $data = [];
        $data['balance'] = $user['balance'];

        $betAmount = DB::table('user_bet')->where(['user_id'=>$user['id'],'lottery_room_id'=>$id])->sum('bet_amount');
        $data['betAmount'] = $betAmount ? Common::formatAmount($betAmount,2) : "0.00";
        $todayWinAmount = DB::table('user_bet_item')->where('user_id',$user['id'])->where('create_time','>=',strtotime('today'))->sum('win_amount' );
        $todayBetAmount = DB::table('user_bet_item')->where('user_id',$user['id'])->where('create_time','>=',strtotime('today'))->sum('bet_amount' );
        $data['todayWin'] = bcsub($todayWinAmount,$todayBetAmount,2);

        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data]);
    }

}
