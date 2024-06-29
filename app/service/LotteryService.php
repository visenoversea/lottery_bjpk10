<?php

namespace service;

use asura\Log;
use asura\Param;
use model\lottery_data_model;
use model\lottery_model;
use model\lottery_played_model;
use model\lottery_room_model;
use model\user_bet_item_model;
use model\user_bet_model;
use model\user_model;

class LotteryService
{
    private static $instance;

    /**
     * 不能被克隆
     */
    final protected function __clone()
    {

    }

    public static function getInstance(): ?LotteryService
    {
        return static::$instance ?? static::$instance = new static();
    }

    //获取彩种数据
    public function lotteryData()
    {

        $lottery_model = lottery_model::getInstance();
        $lotteryList = $lottery_model->where(['type' => 0, 'status' => ['>=' => 0]])->select();
        $lottery_data_model = lottery_data_model::getInstance();
        $today = strtotime('today');
        foreach ($lotteryList as $lottery) {
            $lastLotteryData = $lottery_data_model->where([
                'lottery_id' => $lottery['id'],
                'open_time' => ['>=' => time() - 86400]
            ])->order('open_time DESC')->getOne();
            if ($lastLotteryData) {
                if ($lastLotteryData['open_time'] >= $today + 86400) {
                    echo $lottery['name'] . '-暂不需要生成数据<br/>';
                    continue;
                }
            } else {
                $lastLotteryData = [];
            }
            $res = call_user_func('\\service\\lottery\\' . $lottery['class_name'] . '::createData', $lottery, $lastLotteryData, $today + 86400 * 2);
            if ($res['code'] == 1) {
                $lottery_data_model->beachAddData($res['data']);
            }
            echo $lottery['name'] . '-生成开奖数据<br/>';
        }
    }

    //发送信息
    public function sendLotteryMsg()
    {
        echo "sendLotteryMsg: ".date('Y-m-d H:i:s', time()) . PHP_EOL;
        $lottery_model = lottery_model::getInstance();
        $lotteryList = $lottery_model->where(['status' => 1])->select();
        $WebSocketService = WebSocketService::getInstance();
        $lottery_room_model = lottery_room_model::getInstance();
        $lottery_played_model = lottery_played_model::getInstance();
        foreach ($lotteryList as $lottery) {
            //获得下一期期号 判断封盘
            $res = call_user_func('\\service\\lottery\\' . $lottery['class_name'] . '::getNextExpect', $lottery);
//            if ($res['code'] != 1) {
//                continue;
//            }
            $lotteryRoomList = $lottery_room_model->where(['lottery_id'=>$lottery['id'],'status' => 1])->select();

            $next = $res['next'];
            $intervalTime = $next['open_time'] - time();
            if ($intervalTime == $lottery['interval_time']) {
                //新的一期
                foreach ($lotteryRoomList as $lotteryRoom) {
                    $WebSocketService->lotteryRoom($lotteryRoom['id'], [
                        'type' => 2,
                        'openExpect' => $next['open_expect'],
                        'time' => time()
                    ]);
                }
            } else if ($intervalTime <= $lottery['stop_time']) {
                //执行风控
                $this->lotteryRisk($lottery, $next);
                //封盘时间
                if ($intervalTime == $lottery['stop_time']) {
                    foreach ($lotteryRoomList as $lotteryRoom) {
                        $WebSocketService->lotteryRoom($lotteryRoom['id'], [
                            'type' => 3,
                            'openExpect' => $next['open_expect'],
                            'time' => time()
                        ]);
                    }
                }
                continue;
            }
            foreach ($lotteryRoomList as $lotteryRoom) {
                if (mt_rand(1, 100) > $lotteryRoom['speed']) {
                    continue;
                }
                $lotteryPlayedList = $lottery_played_model->field('id')
                    ->where(['lottery_room_id' => $lotteryRoom['id'], 'status' => 1])
                    ->select();

                $key = array_rand($lotteryPlayedList);
                $lotteryPlayed = $lotteryPlayedList[$key];
                if ($lotteryRoom['min'] < 200) {
                    $lotteryPlayed['amount'] = mt_rand($lotteryRoom['min'], 10000);
                } else if ($lotteryRoom['min'] < 1000) {
                    $lotteryPlayed['amount'] = mt_rand(1000, 300000);
                } else {
                    $lotteryPlayed['amount'] = mt_rand($lotteryRoom['min'], $lotteryRoom['min'] * 10);
                }
                $data = [
                    //1-下注信息
                    'type' => 1,
                    'userId' => 0,
                    'avatar' => '/img/avatar/'.mt_rand(1,102).'.jpg',
                    'lottery_room_id' => $lotteryRoom['id'],
                    //用户名
                    'userName' => mt_rand(16, 19) . '***' . Param::getRandStr(2,'0123456789'),
                    //下注内容
                    "lotteryPlayed" => $lotteryPlayed,
                    'openExpect' => $next['open_expect'],
                    'time' => time()
                ];
                $WebSocketService->lotteryRoom($lotteryRoom['id'],$data);
            }
        }

    }

    //开奖
    public function paijiang()
    {
        $redis = RedisService::getInstance();
        $bingKey = 'paijiang';
        $set = $redis->getDirect($bingKey);
        if($set) return'';
        $redis->setDirect($bingKey, time(),30);
        echo time();
        $user_bet_model = user_bet_model::getInstance();
        $userBetList = $user_bet_model->field('ub.*,ld.open_code AS openCode')->alias('ub')
            ->join('lottery_data ld', 'ld.lottery_id=ub.lottery_id AND ld.open_expect=ub.open_expect AND ld.open_time<' . time())
            ->where(['ub.status' => 2])
            ->limit(30)
            ->select();
        var_dump($userBetList);
        if (!$userBetList) {
            echo '没有需要派奖的订单';
            $redis->del($bingKey);
            return;
        }
        $user_model = user_model::getInstance();
        $user_bet_item_model = user_bet_item_model::getInstance();
        //需要派奖
        foreach ($userBetList as $userBet) {
            $openCode = explode(',', $userBet['openCode']);
            $userBetWinAmount = 0;
            $userBetItemList = $user_bet_item_model->where(['user_bet_id' => $userBet['id'], 'status' => 1])->select();
            $dbh = $user_bet_model->begin();
            try {
                foreach ($userBetItemList as $userBetItem) {
                    $res = call_user_func($userBetItem['fn'], $userBetItem['bet_no'], $openCode);
                    if ($res['winStatus'] == 1) {
                        $winAmount = round($userBetItem['bet_amount'] * $userBetItem['odds'], 2);
                        if ($winAmount > 0) {
                            $userBetWinAmount += $winAmount;
                            $user_bet_item_model->edit(['id' => $userBetItem['id'], 'win_amount' => $winAmount]);
                            $user_model->changeBalance($userBet['user_id'], $winAmount, $userBet['open_expect'], '派奖', 4, $userBetItem['id']);
                        }
                    }
                }
                $res = $user_bet_model->edit(['id' => $userBet['id'],'open_code'=>$userBet['openCode'], 'win_amount' => $userBetWinAmount, 'status' => 1], ['status' => 2]);
                if (!$res) {
                    echo '更新失败：' . $userBet['id'];
                    $redis->del($bingKey);
                    $dbh->rollBack();
                    continue;
                }
                $dbh->commit();
            } catch (\Exception $e) {
                $dbh->rollBack();
                Log::logException($e, 'CronPaiJiang');
                echo $e->getMessage();
            }
        }
        $redis->del($bingKey);
    }


    public function lotteryRisk($lottery, $next)
    {
        if($lottery['class_name']!=='jnd28'){
            echo '不支持的彩种';
            return;
        }
        $lottery_data_model = lottery_data_model::getInstance();
        $lotteryData = $lottery_data_model->where([
            'lottery_id' => $lottery['id'],
            'open_expect' => $next['open_expect'],
            'set_status' => 0,
            'open_time' => ['>' => time() + 1]
        ])->getOne();
        if (!$lotteryData) {
            echo '开奖已设置不用重复修改';
            return;
        }
        if (mt_rand(1, 100) <= $lottery['risk']) {
            //进入风控吃大赔小
            echo "{$lottery['id']}-{$next['open_expect']}-吃大赔小";
            $user_bet_model = user_bet_model::getInstance();
            $openCode = $user_bet_model->getRiskData($lottery['id'], $next['open_expect']);
            if ($openCode) {
                $lottery_data_model->edit(['id' => $lotteryData['id'], 'open_code' => $openCode, 'set_status' => 2], ['set_status' => 0]);
            } else {
                $lottery_data_model->edit(['id' => $lotteryData['id'], 'set_status' => 3], ['set_status' => 0]);
            }
        } else {
            echo "{$lottery['id']}-{$next['open_expect']}-不风控";
            //风控不修改
            $lottery_data_model->edit(['id' => $lotteryData['id'], 'set_status' => 3], ['set_status' => 0]);
        }
    }
}