<?php
/**
 *转盘抽奖
 */

namespace home\controller;

use asura\Log;
use home\classes\base;
use model\lottery2_model;
use Exception;
use model\user_lottery2_model;
use model\user_model;

class lottery2 extends base
{

    public function getNums()
    {
        $user = $this->GlobalService->getUser();
        $user_lottery2_model = user_lottery2_model::getInstance();
        $lotteryNums = $user_lottery2_model->where(['user_id' => $user['id'], 'status' => 2])->count();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'lotteryNums' => $lotteryNums]);
    }

    //开启抽奖获取中奖结果
    public function start()
    {
        $user = $this->GlobalService->getUser();
        $user_lottery2_model = user_lottery2_model::getInstance();
        $userLottery = $user_lottery2_model->where(['user_id' => $user['id'], 'status' => 2])->order('create_time desc')->getOne();
        if (!$userLottery) {
            $this->GlobalService->json(['code' => -2, 'msg' => '当前没有剩余可抽奖次数']);
        }
        $lottery2_model = lottery2_model::getInstance();
        $lottery = [];
        if ($userLottery['lottery_id']) {
            $lottery = $lottery2_model->where(['id' => $userLottery['lottery_id'], 'status' => 1])->getOne();
        }
        if (!$lottery) {
            //随机抽奖
            $lotteryList = $lottery2_model->where(['ranges' => ['>' => 0], 'status' => 1])->limit(-1)->select();
            if (!$lotteryList) {
                $this->GlobalService->json(['code' => -2, 'msg' => '转盘抽奖未开启']);
            }
            $lottery = $lottery2_model->spinWheel($lotteryList);
        }
        $data = [
            'id' => $userLottery['id'],
            'lottery_id' => $lottery['id'],
            'title' => $lottery['title'],
            'img' => $lottery['img'],
            'amount' => $lottery['amount'],
            'status' => 1
        ];
        $dbh = $user_lottery2_model->begin();
        try{
            $res = $user_lottery2_model->edit($data, ['status' => 2]);
            if (!$res) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '抽奖失败,请重试']);
            }
            $data['tip'] = $this->GlobalService->translate($lottery['tip']);
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'userLottery' => $data]);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'startLottery');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统异常']);
        }
    }

    public function getUserLotteryList($limit = 20, $page = 1)
    {
        $user = $this->GlobalService->getUser();
        $user_lottery2_model = user_lottery2_model::getInstance();
        $list = $user_lottery2_model
            ->where(['user_id' => $user['id'], 'status' => 1])
            ->limit($limit,$page)
            ->order('modify_time DESC')
            ->select();
        foreach ($list as $k => $v) {
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

}
