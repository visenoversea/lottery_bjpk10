<?php
/**
 *下单
 */

namespace home\controller;

use asura\Log;
use home\classes\base;
use asura\Illuminate\DB;
use model\lottery_played_model;
use model\lottery_room_model;
use model\user_bet_item_model;
use model\user_bet_model;
use model\user_model;
use Exception;
use service\RedisService;
use service\WebSocketService;

class userBet extends base
{
    /**
     * 获取列表
     */
    public function getList($lotteryId='',$lotteryRoomId='',$status='',$limit = 20, $page = 1)
    {
        $user = $this->GlobalService->getUser();
        $user_bet_model=user_bet_model::getInstance();
        $where=[
            'user_id'=>$user['id']
        ];
        if($lotteryId!==''){
            $where['lottery_id']=intval($lotteryId);
        }
        if($lotteryRoomId!==''){
            $where['lottery_room_id']=intval($lotteryRoomId);
        }
        if($status!==''){
            $where['status']=intval($status);
        }
        $list=$user_bet_model->where($where)->limit($limit,$page)->select();
        $user_bet_item_model=user_bet_item_model::getInstance();
        foreach ($list as $k=>$v){
            $userBetItemList = $user_bet_item_model->where(['user_bet_id' => $v['id'], 'status' => 1])
                ->limit(-1)->select();
            foreach ($userBetItemList as $key=>$val){
                if (!is_numeric($val['bet_no'])) {
                    $val['bet_no'] = $this->GlobalService->translate($val['bet_no']);
                }
                $userBetItemList[$key]=$val;
            }
            $v['userBetItemList']=$userBetItemList;
            $list[$k]=$v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功','list'=>$list]);
    }

    /**
     * 获取列表
     */
    public function getInfo($id)
    {
        $user = $this->GlobalService->getUser();
        $user_bet_item_model=user_bet_item_model::getInstance();
        $userBetItem = $user_bet_item_model->field('lottery_id,lottery_group_name,bet_no,bet_amount,win_amount,odds,create_time')->where(['id' => $id, 'user_id' => $user['id']])->getOne();
//        $userBetItem = $user_bet_item_model->where(['id' => $id, 'user_id' => $user['id']])->getOne();
        if($userBetItem){
            $userBetItem['lottery_group_name'] = $this->GlobalService->translate($userBetItem['lottery_group_name']);
            $userBetItem['bet_no'] = $this->GlobalService->translate($userBetItem['bet_no']);
        }else{
            $this->GlobalService->json(['code' => -2, 'msg' => '记录不存在','info'=>[]]);
        }
        $userBetItem['lottery_name'] = DB::table('lottery')->where('id', $userBetItem['lottery_id'])->value('name');
        $this->GlobalService->json(['code' => 1, 'msg' => '成功','info'=>$userBetItem]);
    }


    //下注
    public function add($id = 0, $openExpect = '', $betList = [])
    {
        $user = $this->GlobalService->getUser();
        $RedisService = RedisService::getInstance();
        $lockKey = 'lotteryBet:'.$user['id'];
        $set = $RedisService->setnx($lockKey,1,3);
        if(!$set) $this->GlobalService->json(['code' => -2, 'msg' => '投注过快，请勿重复下单']);
        if (in_array($user['status'], [3, 4])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '状态异常,无法下单，请联系客服']);
        }
        if (!$betList) {
            $this->GlobalService->json(['code' => -2, 'msg' => '请选择下注内容']);
        }
        $lottery_room_model = lottery_room_model::getInstance();
        $lotteryRoom = $lottery_room_model->with(['lottery' => 'id,name,class_name,interval_time,stop_time,status'])
            ->where(['id' => intval($id)])->getOne();
        if (!$lotteryRoom) {
            $this->GlobalService->json(['code' => -2, 'msg' => '房间不存在']);
        }
        if ($lotteryRoom['status'] != 1) {
            $RedisService->del($lockKey);
            $this->GlobalService->json(['code' => -2, 'msg' => '房间已关闭,无法下注']);
        }
        $lottery = $lotteryRoom['lottery'];
        unset($lotteryRoom['lottery']);
        if ($lottery['status'] != 1) {
            $RedisService->del($lockKey);
            $this->GlobalService->json(['code' => -2, 'msg' => '未开盘,无法下注']);
        }
        //获得下一期期号
        $res = call_user_func('\\service\\lottery\\' . $lottery['class_name'] . '::getNextExpect', $lottery);
        if ($res['code'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未开盘,无法下注']);
        }
        $next = $res['next'];
        if ($openExpect != $next['open_expect']) {
            $RedisService->del($lockKey);
            $this->GlobalService->json(['code' => -2, 'msg' => '下注期号已结束,无法下注']);
        }
        if (($next['open_time'] - SYS_TIME) <= $lottery['stop_time']) {
            $RedisService->del($lockKey);
            $this->GlobalService->json(['code' => -2, 'msg' => '已封盘，无法下注']);
        }
        $usdt2cnyRate = $RedisService->getDirect('usdt2cnyRate');
        $lottery_played_model = lottery_played_model::getInstance();
        $userBet = [
            'user_id' => $user['id'],
            'lottery_id' => $lottery['id'],
            'lottery_room_id' => $lotteryRoom['id'],
            'order_no' => 'UB' . round(microtime(true) * 1000),
            'open_expect' => $next['open_expect'],
            'bet_amount' => 0,
            'rate_cny' => $usdt2cnyRate,
            'status' => 2
        ];
        $userBetItemList = [];
        $lotteryRoomSend = [];


        foreach ($betList as $v) {
            $lotteryPlayed = $lottery_played_model->with(['lotteryGroup' => 'id,name,fn,status'])
                ->where(['id' => $v['id'], 'status' => 1])
                ->hasWhere('lotteryGroup', ['status' => 1])
                ->getOne();
            if (!$lotteryPlayed) {
                $this->GlobalService->json(['code' => -2, 'msg' => '玩法已关闭,请重新下注']);
            }
            $betAmount = round($v['amount'], 2);
            if($betAmount<=0){
                $this->GlobalService->json(['code' => -2, 'msg' => '下注金额异常']);
            }
            if ($betAmount < $lotteryRoom['min']) {
                $this->GlobalService->json(['code' => -2, 'msg' => '底注不能低于:' . $lotteryRoom['min']]);
            }
            $userBetItemList[] = [
                'user_id' => $user['id'],
                'lottery_id' => $lottery['id'],
                'lottery_group_id' => $lotteryPlayed['lottery_group_id'],
                'lottery_played_id' => $lotteryPlayed['id'],
                'lottery_group_name' => $lotteryPlayed['lotteryGroup']['name'],
                'fn' => '\\service\\lottery\\' . $lottery['class_name'] . '::'.$lotteryPlayed['lotteryGroup']['fn'],
                'bet_no' => $lotteryPlayed['name'],
                'bet_amount' => $betAmount,
                'rate_cny' => $usdt2cnyRate,
                'odds' => $lotteryPlayed['odds'],
            ];
            $userBet['bet_amount'] += $betAmount;
            $lotteryRoomSend[] = [
                //1-下注信息
                'type' => 1,
                'userId' => $user['id'],
                'avatar' => $user['avatar'],
                'lottery_room_id' => $lotteryRoom['id'],
                //用户名
                'userName' => substr($user['id'], 0, 2) . '***' . substr($user['id'], -2),
                //下注内容
                "lotteryPlayed" => ['id' => $lotteryPlayed['id'], 'amount' => $betAmount],
                'openExpect' => $userBet['open_expect'],
                'time' => SYS_TIME
            ];
        }
        if ($user['balance'] < $userBet['bet_amount']) {
            $RedisService->del($lockKey);
            $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
        }
        $user_bet_model = user_bet_model::getInstance();
        $user_bet_item_model = user_bet_item_model::getInstance();
        $user_model = user_model::getInstance();
        $dbh = $user_bet_model->begin();
        try {
            $userBet['id'] = $user_bet_model->add($userBet);
            foreach ($userBetItemList as $v) {
                $v['user_bet_id'] = $userBet['id'];
                $v['id'] = $user_bet_item_model->add($v);
                $res = $user_model->changeBalance($userBet['user_id'], -$v['bet_amount'], $userBet['open_expect'], '下注', 4, $v['id']);
                if ($res['user']['balance'] < 0) {
                    $dbh->rollBack();
                    $RedisService->del($lockKey);
                    $this->GlobalService->json(['code' => -2, 'msg' => '余额不足']);
                }
                $water_amount = $res['user']['water_amount'] - $v['bet_amount'];
                $water_amount = $water_amount > 0 ? $water_amount : 0;
                $user_model->edit(['id' => $res['user']['id'], 'water_amount' => $water_amount]);
            }
            $WebSocketService = WebSocketService::getInstance();
            foreach ($lotteryRoomSend as $v) {
                $WebSocketService->lotteryRoom($v['lottery_room_id'], $v);
            }
//            (WebSocketService::getInstance())->SendAdminTips('下注提示', '你有新的下注信息', 'getUserBetList2', 'UserBetItemList');
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '下注成功!']);
        } catch (Exception $e) {
            $dbh->rollBack();
            $RedisService->del($lockKey);
            Log::logException($e, 'userBet');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
        $RedisService->del($lockKey);
    }

    public function cancel($id = 0)
    {
        $user_bet_item_model = user_bet_item_model::getInstance();
        $userBetItem = $user_bet_item_model
            ->with(['userBet' => '*', 'lottery' => '*'])
            ->where(['id' => $id])
            ->getOne();
        if (!$userBetItem) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未找到订单']);
        }
        if ($userBetItem['status'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单已取消']);
        }
        if ($userBetItem['userBet']['status'] != 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '订单状态已变更，无法撤单']);
        }
        //获得下一期期号
        $res = call_user_func('\\service\\lottery\\' . $userBetItem['lottery']['class_name'] . '::getNextExpect', $userBetItem['lottery']);
        if ($res['code'] != 1) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未开盘,无法撤单']);
        }
        $next = $res['next'];
        if ($userBetItem['userBet']['open_expect'] != $next['open_expect']) {
            $this->GlobalService->json(['code' => -2, 'msg' => '下注期号已结束,无法撤单']);
        }
        if (($next['open_time'] - SYS_TIME) <= $userBetItem['lottery']['stop_time']) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已封盘，无法撤单']);
        }
        $user_model = user_model::getInstance();
        $user_bet_model = user_bet_model::getInstance();
        $dbh = $user_model->begin();
        try {
            $res = $user_model->changeBalance($userBetItem['user_id'], $userBetItem['bet_amount'], $userBetItem['userBet']['open_expect'], '撤单', 4, $userBetItem['id']);
            $water_amount = $res['user']['water_amount'] + $userBetItem['bet_amount'];
            $water_amount = $water_amount > 0 ? $water_amount : 0;
            $user_model->edit(['id' => $res['user']['id'], 'water_amount' => $water_amount]);
            $res = $user_bet_item_model->edit(['id' => $userBetItem['id'], 'status' => 0], ['status' => 1]);
            if (!$res) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '撤单失败']);
            }
            $userBetAmount = $userBetItem['userBet']['bet_amount'] - $userBetItem['bet_amount'];
            if ($userBetAmount <= 0) {
                $res = $user_bet_model->edit(['id' => $userBetItem['userBet']['id'], 'status' => 0], ['status' => 2]);
                if (!$res) {
                    $dbh->rollBack();
                    $this->GlobalService->json(['code' => -2, 'msg' => '撤单失败']);
                }
            } else {
                $res = $user_bet_model->edit(['id' => $userBetItem['userBet']['id'], 'bet_amount' => $userBetAmount], ['status' => 2]);
                if (!$res) {
                    $dbh->rollBack();
                    $this->GlobalService->json(['code' => -2, 'msg' => '撤单失败']);
                }
            }
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '撤单成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'userBet');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }


}
