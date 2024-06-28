<?php
/**
 *转盘抽奖
 */

namespace home\controller;

use asura\Log;
use home\classes\base;
use model\level_model;
use model\lottery_model;
use model\user_lottery_model;
use Exception;
use model\user_model;

class lottery extends base
{

    /**
     * 获取充值列表信息
     * /home/lottery/getList
     */
    public function getList()
    {
        $lottery_model = lottery_model::getInstance();
        $lotteryList = $lottery_model->where(['status' => 1])->order('sort DESC,id ASC')->limit(-1)->select();
        $list = [];
//        $background='#206455';
        $background='#ddfff7';
        foreach ($lotteryList as $v) {
            if ($background == '#2c5f53') {
//                $background = '#206455';
                $background = '#ddfff7';
            } else {
//                $background = '#1C3A3A';
                $background = '#2c5f53';
            }
            $list[] = [
                'id'=>$v['id'],
                'background' => $background,
                //文字
                'fonts' => [[
                    'text' => $v['title'],
                    'top' => 5,
                    'fontColor' => '#3BAC92',
                    'fontWeight' => '700',
                    'fontSize' => '18px'
                ]],
                //图片
                'imgs' => [[
                    'src' => $v['img'],
                    'width' => 40,
                    'top' => 34,
                ]],
            ];
        }
        $user = $this->GlobalService->getUser();
        $user_lottery_model = user_lottery_model::getInstance();
        $lotteryNums = $user_lottery_model->where(['user_id' => $user['id'], 'status' => 2])->count();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list, 'lotteryNums' => $lotteryNums]);
    }

    //开启抽奖获取中奖结果
    public function start()
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        $user_lottery_model = user_lottery_model::getInstance();
        $userLottery = $user_lottery_model->where(['user_id' => $user['id'], 'status' => 2])->order('id ASC')->getOne();
        if (!$userLottery) {
            $this->GlobalService->json(['code' => -2, 'msg' => '当前没有剩余可抽奖次数']);
        }
        $lottery_model = lottery_model::getInstance();
        $lottery = [];
        if ($userLottery['lottery_id']) {
            $lottery = $lottery_model->where(['id' => $userLottery['lottery_id'], 'status' => 1])->getOne();
        }
        if (!$lottery) {
            //随机抽奖
            $lotteryList = $lottery_model->where(['ranges' => ['>' => 0], 'status' => 1])->limit(-1)->select();
            if (!$lotteryList) {
                $this->GlobalService->json(['code' => -2, 'msg' => '转盘抽奖未开启']);
            }
            $lottery = $lottery_model->spinWheel($lotteryList);
        }
        $data = [
            'id' => $userLottery['id'],
            'lottery_id' => $lottery['id'],
            'title' => $lottery['title'],
            'img' => $lottery['img'],
            'amount' => $lottery['amount'],
            'status' => 1
        ];
        $user_model=user_model::getInstance();
        $dbh=$user_lottery_model->begin();
        try{
            $res = $user_lottery_model->edit($data, ['status' => 2]);
            if (!$res) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '抽奖失败,请重试']);
            }
            $data['tip'] = $this->GlobalService->translate($lottery['tip']);
            if($data['amount']>0){
                $user_model->changeBalance($user['id'], $data['amount'], $data['title'], '转盘抽奖', 11, $data['id']);
                $level_model = level_model::getInstance();
                $res = $level_model->upLevel($user);
                //判断上级代理升级
                if ($res['code'] == 1) {
                    $agentList = $user_model->getAgentList($user['pid']);
                    if ($agentList) {
                        $level_model->upAgentLevel($agentList);
                    }
                }
            }
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
        $user_lottery_model = user_lottery_model::getInstance();
        $list = $user_lottery_model
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
