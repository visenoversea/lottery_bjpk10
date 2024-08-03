<?php
/**
 *用户银行卡
 */

namespace main\controller;

use main\classes\base;
use model\user_bet_item_model;
use model\user_bet_model;
use model\user_model;
use model\lottery_model;

class userBet extends base
{   
    /*
    *  对外接口: 根据彩种获取对应配置
    */ 
    public function getLotteryInfo($lottery_id)
    {
        $lottery_model = lottery_model::getInstance();
        $lottery = [];

        if (intval($lottery_id) > 0) {
            // Fetch a single lottery by ID
            $lottery = $lottery_model->where(['id' => $lottery_id])->getOne();
            if ($lottery) {
                $lottery = [$lottery]; // Ensure $lottery is always an array for consistent processing
            }
        } else {
            // Fetch all lotteries
            $lottery_list = $lottery_model->where(['id' => ['>' => 0]])->getListInfo();
            $lottery = $lottery_list['list'];
        }

        if (empty($lottery)) {
            $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => []]);
        }

        // Process each lottery
        foreach ($lottery as $k => $value) {
            $class_name = $value['class_name'] ?? ''; // Ensure class_name exists
            if ($class_name) {
                $res = call_user_func('\\service\\lottery\\' . $class_name . '::getNextExpect', $value);
                if ($res['code'] == 1) {
                    $lottery[$k]['next'] = $res['next'];
                } else {
                    $lottery[$k]['next'] = (object)[];
                }
            } else {
                $lottery[$k]['next'] = (object)[];
            }
        }

        // Return the response
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $lottery, 'count' => count($lottery)]);
    }


    /*
    *  对外接口: 根据彩种id、期号、开奖状态、同步下注状态、来获取下注详情
    */ 
    public function getUserBetItems($lottery_id, $open_expect, $status = '', $is_run = '')
    {
        $user_bet_item_model = user_bet_item_model::getInstance();
        $user_bet_items = [];
        $where_user_bet = ['lottery_id' => $lottery_id, 'open_expect' => $open_expect];
        if ('' !== $status) {
            $where_user_bet['status'] = $status;
        }

        $where_user_bet_item = []; 
        if ('' !== $is_run) {
            $where_user_bet_item = ['is_run' => $is_run]; 
        }

        $user_bet_items = $user_bet_item_model
            ->with([
                'userBet' => '*'
            ])
            ->where($where_user_bet_item)
            ->hasWhere('userBet', $where_user_bet)
            ->order('id DESC')->getListInfo();
    
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $user_bet_items['list'], 'count' => $user_bet_items['total']]);
    }

    /*
    *  对外接口: 根据下注详情 id 更新同步下注状态
    */ 
    public function updateUserBetItem($user_bet_item_id, $is_run = '')
    {     
        $user_bet_item_model = user_bet_item_model::getInstance();
        $where = ['id' => intval($user_bet_item_id)];
        $data = ['id' => intval($user_bet_item_id)];
        if ('' !== $is_run) {
            $data['is_run'] = intval($is_run);
        } 
                
        if (0 == intval($is_run))
        {
            $this->GlobalService->json(['code' => -1, 'msg' => '失败', 'error' => '参数非法: ' . $is_run]);
        }

        $valid_is_run = [1, 2];
        if (!in_array($data['is_run'], $valid_is_run)) {
            $this->GlobalService->json(['code' => -1, 'msg' => '失败', 'error' => '参数非法: ' . $is_run]);
        }

        $res_bet_item = $user_bet_item_model->where($where)->getOne();
        if (empty($res_bet_item)) {
            $this->GlobalService->json(['code' => -1, 'msg' => '失败', 'error' => '参数非法: ' . $user_bet_item_id]);
        }
        
        $res = $user_bet_item_model->edit($data);  
        if ($res) {
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        } else {
            $this->GlobalService->json(['code' => -1, 'msg' => '失败', 'error' => $res]);
        }

    }

}
