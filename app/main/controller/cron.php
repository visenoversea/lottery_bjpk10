<?php
/**
 * 定时任务
 */

namespace main\controller;

use asura\Common;
use asura\Loader;
use asura\Log;
use asura\Param;
use model\crontab_model;
use model\ip_model;
use model\lang_config_list_model;
use model\lottery_data_model;
use model\lottery_group_model;
use model\lottery_model;
use model\lottery_played_model;
use model\lottery_room_model;
use model\trade_model;
use model\user_bet_item_model;
use model\user_bet_model;
use model\user_model;
use model\user_profit_model;
use service\HuoBiService;
use service\lottery\jnd28;
use service\RedisService;
use service\LotteryService;
use service\WebSocketService;
use Exception;

class cron
{
    public function __construct()
    {
//        if (strpos($_SERVER['HTTP_HOST'], '127.0.0') === false) {
//            http_response_code(404);
//            exit(0);
//        }
        //关掉浏览器，PHP脚本也可以继续执行.
        ignore_user_abort();
        //超时时间
        set_time_limit(120);
        //set_time_limit(0);// 通过set_time_limit(0)可以让程序无限制的执行下去
    }

    //定时任务运行,每分钟执行
    public function run()
    {
        return ;
        $crontab_model = crontab_model::getInstance();
        $list = $crontab_model->where(['run_time' => ['<=' => SYS_TIME], 'status' => 1])
            ->limit(-1)->select();
        foreach ($list as $v) {
            //获取下次执行时间
            $runTime = $crontab_model->getNextRunTime($v['expression']);
            $res = $crontab_model->edit(['id' => $v['id'], 'runTime' => $runTime], ['run_time' => $v['run_time']]);
            if ($res) {
                if($v['second']>0){
                    Common::asyncThread('/main/cron/minuteTask?crontabId='.$v['id']);
                }else{
                    Common::asyncThread('/main/cron/' . $v['fn']);
                }
            }
        }
    }

    //执行分钟任务
    public function minuteTask($crontabId = 0)
    {
        $crontab_model = crontab_model::getInstance();
        $crontab = $crontab_model->where(['id' => $crontabId, 'second' => ['>' => 0], 'status' => 1])->getOne();
        if ($crontab) {
        }
    }

    //开奖
    public function paijiang()
    {
        $redis = RedisService::getInstance();
        $lotteryService = \service\LotteryService::getInstance();
        $lotteryService->paijiang();
        exit;
        $bingKey = 'paijiang';
        $set = $redis->getDirect($bingKey);
        if($set) return'';
        $redis->setDirect($bingKey, time(),30);

        $user_bet_model = user_bet_model::getInstance();
        $userBetList = $user_bet_model->field('ub.*,ld.open_code AS openCode')->alias('ub')
            ->join('lottery_data ld', 'ld.lottery_id=ub.lottery_id AND ld.open_expect=ub.open_expect AND ld.open_time<' . SYS_TIME)
            ->where(['ub.status' => 2])
            ->limit(30)
            ->select();
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
                    $dbh->rollBack();
                    continue;
                }
                $dbh->commit();
            } catch (Exception $e) {
                $dbh->rollBack();
                $redis->del($bingKey);
                Log::logException($e, 'CronPaiJiang');
                echo $e->getMessage();
            }
        }
        $redis->del($bingKey);
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
                'open_time' => ['>=' => SYS_TIME - 86400]
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

    //彩票风控吃大陪小,封盘时候执行
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
            'open_time' => ['>' => SYS_TIME + 1]
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

    public function userRebate()
    {
        $user_profit_model = user_profit_model::getInstance();
        $user_model = user_model::getInstance();

        $RedisService = RedisService::getInstance();
        $num = 0;
        do {
            $popData = $RedisService->popData($RedisService->CronUserProfitConsumeKey);
            if ($popData) {
                $lock_one_key = $RedisService->CronUserProfitConsumeKey . $popData['id'];
                $lock = $RedisService->setnx($lock_one_key,1,20);
                if(!$lock){
                    Log::log('userProfit重复id:'.$popData['id'],Log::INFO,'cron_repeated_check_profit' );
                    continue;//这里不能删除key
                }
                //$RedisService->setDirect($lock_one_key,1,10);//马上设置redis

                $userProfit = $user_profit_model->where(['id'=> $popData['id'], 'status'=> 2])->getOne();
                if($userProfit){
                    $dbh = $user_profit_model->begin();
                    try {
                        $res = $user_profit_model->edit(['status' => 1], ['id' => $userProfit['id']]);
                        if ($res) {
                            //转移到余额
                            $res = $user_model->changeBalance($userProfit['user_id'], $userProfit['amount'], $userProfit['title'], $userProfit['des'], $userProfit['type'], $userProfit['key_id']);
                            if($res['code'] != 1 ){
                                $dbh->rollBack();
                                echo 'rollBack1 user_id:' . $userProfit['user_id'] . ' id:' . $userProfit['id'];
                                $RedisService->del($lock_one_key); //删除key
                                continue;
                            }
                        }
                        $dbh->commit();
                    } catch (Exception $e) {
                        echo 'rollBack2 user_id:' . $userProfit['user_id'] . ' id:' . $userProfit['id'];
                        $dbh->rollBack();
                        $this->checkUnique('t_user_amount_unique', $e->getMessage());//如果是 Duplicate entry 则记录日志
                        Log::logException($e, 'ExceptionUserProfit' , $userProfit['id']);
                        $RedisService->del($lock_one_key); //删除key
                        continue;
                    }
                    $num ++;
                }
                $RedisService->del($lock_one_key); //删除key
            }
        } while ($popData);

        echo 'userProfit finish num:'. $num;

        $this->log("用户收益放发到余额{$num}");

        //防止重复生产
        $lock = $RedisService->setnx($RedisService->CronUserProfitLockKey, 1, 6  );
        if(!$lock){
            echo 'lock userProfit';
            return;
        }

        //取出符合条件的放到redis队列
        $where = ['status' => 2, 'end_time' => ['<' => SYS_TIME]];
        $list = $user_profit_model->field('id')->where($where)->limit(500)->select();
        foreach ($list as $v){
            $RedisService->pushData($v, $RedisService->CronUserProfitConsumeKey);
        }
        $RedisService->del($RedisService->CronUserProfitLockKey); //删除key
        echo 'userProfit make new num:'. count($list);

        //(crontab_log_model::getInstance())->addLog(104, "用户收益放发到余额");

        $t=SYS_TIME;
        echo "
        <script>
        function run(){
        location.href = 'https://super.dcptg.vip/main/cron/userProfit?t={$t}';    
        }
        //setTimeout('run()', 1000);
       
</script>
        ";

    }

    //发送信息
    public function sendLotteryMsg()
    {
        $lottery_model = lottery_model::getInstance();
        $lotteryList = $lottery_model->where(['status' => 1])->select();
        $WebSocketService = WebSocketService::getInstance();
        $lottery_room_model = lottery_room_model::getInstance();
        $lottery_played_model = lottery_played_model::getInstance();
        foreach ($lotteryList as $lottery) {
            //获得下一期期号 判断封盘
            $res = call_user_func('\\service\\lottery\\' . $lottery['class_name'] . '::getNextExpect', $lottery);
            if ($res['code'] != 1) {
                continue;
            }
            $lotteryRoomList = $lottery_room_model->where(['lottery_id'=>$lottery['id'],'status' => 1])->select();
            $next = $res['next'];
            $intervalTime = $next['open_time'] - SYS_TIME;
            if ($intervalTime == $lottery['interval_time']) {
                //新的一期
                foreach ($lotteryRoomList as $lotteryRoom) {
                    $WebSocketService->lotteryRoom($lotteryRoom['id'], [
                        'type' => 2,
                        'openExpect' => $next['open_expect'],
                        'time' => SYS_TIME
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
                            'time' => SYS_TIME
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
                    'time' => SYS_TIME
                ];
                $WebSocketService->lotteryRoom($lotteryRoom['id'],$data);
            }
        }

    }

//    public function addLottery()
//    {
//        $lottery_model = lottery_model::getInstance();
//        $list = $lottery_model->where(['status' => 1])->select();
//        foreach ($list as $v) {
//            $lottery_room_model = lottery_room_model::getInstance();
//            $list2 = $lottery_room_model->where(['lottery_id' => $v['id'], 'status' => 1])->select();
//            foreach ($list2 as $val) {
//                jnd28::lotteryPlayer($v['id'], $val['id']);
//            }
//        }
//    }


    //更新ip地址信息
    public function upIp()
    {
        $ip_model = ip_model::getInstance();
        $ip_model->task();
    }



    //数据库备份
    public function saveDB()
    {
        set_time_limit(120);
        $db = Loader::config('db');
        //保存路径
        $path = DATA_PATH . DS . 'log' . DS . date('Ymd_His') . '.sql.gz';
        exec("mysqldump -u{$db['username']} -p'{$db['password']}' {$db['dbname']} | gzip > {$path}");
        //清理日志
        $path = DATA_PATH . DS . 'log';
        exec('find ' . $path . ' -mtime +7 -name "*" -exec rm -rf {} \;');
        //清理nginx日志
        exec('find /var/log/nginx/ -mtime +7 -name "*.gz" -exec rm -rf {} \;');
    }

    /**
     * 翻译并生成文件
     */
    public function translate()
    {
        $lang_config_list_model = lang_config_list_model::getInstance();
        $lang_config_list_model->translate();
    }
}
