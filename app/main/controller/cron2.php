<?php
/**
 * 定时任务
 */

namespace main\controller;

use asura\Common;
use asura\Loader;
use asura\Log;
use asura\Request;
use Cron\CronExpression;
use model\country_area_model;
use model\crontab_log_model;
use model\crontab_model;
use model\ip_model;
use model\lang_config_list_model;
use model\level_model;
use model\product_hq_model;
use model\product_kline_model;
use model\product_minute_model;
use model\product_model;
use model\trade_model;
use model\user_amount_model;
use model\user_balance_model;
use model\user_log_model;
use model\user_mining_item_model;
use model\user_mining_model;
use model\user_model;
use model\user_product_contract_model;
use model\user_product_lever_model;
use model\user_product_time_model;
use model\user_product_trade_model;
use model\user_profit_model;
use model\user_quantify_model;
use model\user_rebate_model;
use model\user_recharge_model;
use model\user_task_model;
use model\user_withdraw_model;
use service\HuoBiService;
use service\RedisService;
use service\SinaService;
use service\WebSocketService;
use Exception;

class cron2
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

    public function testcron(){
        print_r($_SERVER);
        echo 'finish';
    }

    public function up()
    {
        $user_withdraw_model=user_withdraw_model::getInstance();
        $list=$user_withdraw_model->where(['before_balance'=>0,'status'=>['>='=>0]])->limit(1000)->select();
        $user_amount_model = user_amount_model::getInstance();
        if($list){
            foreach ($list as $v){
                $res = $user_amount_model->where([
                    'mode' => 1,
                    'user_id' => $v['user_id'],
                    'type' => 2,
                    'key_id' => $v['id']
                ])->order('create_time desc')->getOne();
                if ($res) {
                    $beforeBalance = round($res['balance'] - $res['amount'],2);
                    $user_withdraw_model->edit(['id'=>$v['id'],'before_balance'=>$beforeBalance]);
                }
            }
            echo '<script>setTimeout(function (){location.reload();},1000)</script>';
        }else{
            echo '完成';
        }
    }

    //晋级奖励数据修正
//    public function levelProfit()
//    {
//        $user_profit_model = user_profit_model::getInstance();
//        $list = $user_profit_model->where(['type' => 0, 'des' => '晋级奖励'])->select();
//        $user_task_model = user_task_model::getInstance();
//        foreach ($list as $v) {
//            $nums = $v['key_id'] - 1;
//            $task_id = 100 + $v['key_id'];
//            $res = $user_task_model->where(['user_id' => $v['user_id'], 'task_id' => $task_id])->isExist();
//            if (!$res) {
//                $user_task_model->add([
//                    'user_id' => $v['user_id'],
//                    'task_id' => $task_id,
//                    'title' => "VIP{$nums}晋升奖励",
//                    'amount' => $v['amount'],
//                    'status' => 1
//                ]);
//            }
//        }
//    }

    public function upay()
    {
//        $UPayService = UPayService::getInstance();
//        $UPayService->address('TRX');
//        $UPayService->balance('TDPE1E3dfvAJp7xziCcNRt8d21iugoLrg3','TRX');
    }

    /**
     *定时任务运行,每秒执行
     */
    public function run()
    {
        $crontab_model = crontab_model::getInstance();
        $crontab_log_model = crontab_log_model::getInstance();
        $list = $crontab_model->where(['run_time' => ['<=' => SYS_TIME], 'status' => 1])
            ->limit(-1)->select();
        foreach ($list as $v) {
            $CronExpression = new CronExpression($v['expression']);
            if ($v['second'] > 0 && $CronExpression->isDue()) {
                //秒级定时任务
                $runTime = SYS_TIME + $v['second'];
            } else {
                //获取下次执行时间
                try {
                    $runTime = strtotime($CronExpression->getNextRunDate()->format('Y-m-d H:i:s'));
                } catch (Exception $e) {
                    //异常
                    $crontab_log_model->addLog($v['id'], "表达式:{$v['expression']},获取下次执行时间异常,错误信息:{$e->getMessage()}");
                    continue;
                }
            }
            $res = $crontab_model->edit(['id' => $v['id'], 'run_time' => $runTime], ['run_time' => $v['run_time']]);
            if ($res) {
                try {
                    $this->asyncThread('/main/cron2/' . $v['fn'] .'?crontabId='. $v['id'] .'&logSwitch='. $v['log_switch']);
                } catch (Exception $e) {
                    //请求异常
                    $crontab_log_model->addLog($v['id'], "执行任务异常,,错误信息:{$e->getMessage()}");
                }
            }
        }
        echo 'crontab num:'.count($list).' ok';
        
    }

    public function asyncThread(string $request_url = '/', string $host = '', int $port = 80, int $timeout = 5, int $micro_seconds = 50000)
    {
        if ($host === '')
            $host = $_SERVER['HTTP_HOST'];
        $res = "asyncThread host:{$host},port:{$port} request_url:{$request_url}\r\n";
        $fp = fsockopen($host, $port, $errno, $errstr, $timeout);
        if (!$fp) {
            Log::log($res,Log::INFO, 'cron-err');
            throw new Exception($errstr, $errno);
        }
        fwrite($fp, "GET {$request_url} HTTP/1.1\r\nHost: {$host}\r\nConnection: Close\r\n\r\n");

        //while (!feof($fp)){
            //$res .= fgets($fp,128);
        //}
        fclose($fp);
        Log::log($res,Log::INFO, 'cron-ok');
        usleep($micro_seconds);//保证nginx正常执行

    }

    //更新ip地址信息
    public function upIp()
    {
        $ip_model = ip_model::getInstance();
        $ip_model->task();
        $this->log("IP地址更新");
    }

    //用户收益放发到余额
    public function userProfit()
    {
        $user_profit_model = user_profit_model::getInstance();
        $list = $user_profit_model->where(['status' => 2, 'end_time' => ['<' => SYS_TIME]])->limit(800)->select();
        $user_model = user_model::getInstance();
        $level_model = level_model::getInstance();
        $num = 0;
        foreach ($list as $v) {
            $dbh = $user_model->begin();
            try {
                $res = $user_profit_model->edit(['status' => 1], ['id' => $v['id']]);
                if ($res) {
                    //转移到余额
                    $res = $user_model->changeBalance($v['user_id'], $v['amount'], $v['title'], $v['des'], $v['type'], $v['key_id']);
                    //cron中处理升降级
//                    $user = $res['user'];
//                    $level_model->upLevel($user);
//                    $agentList = $user_model->getAgentList($user['pid']);
//                    if ($agentList) {
//                        $agent = array_pop($agentList);
//                        $level_model->upLevel($agent);
//                    }
                    $num ++;
                }
                $dbh->commit();
            } catch (Exception $e) {
                $dbh->rollBack();
                Log::logException($e, 'userProfitCron');
            }
        }
        $this->log("用户收益放发到余额");
        Log::log("finish num: {$num}",Log::INFO, 'userProfit');
        echo 'userProfit finish num:'. $num;
    }

    //数据修复
//    public function runData()
//    {
//        $user_profit_model = user_profit_model::getInstance();
//        $list = $user_profit_model->where(['type' => 11, 'modify_time' => ['<' => 1683132900]])->limit(200)->select();
//        $user_quantify_model = user_quantify_model::getInstance();
//        $user_amount_model = user_amount_model::getInstance();
//        $user_model = user_model::getInstance();
//        foreach ($list as $v) {
//            $userQuantify = $user_quantify_model->where(['id' => $v['key_id']])->getOne();
//            if ($userQuantify) {
//                if ($userQuantify['gift_amount'] > 0) {
//                    //没有问题不在处理
//                    $user_profit_model->edit(['id' => $v['id']]);
//                } else {
//                    if (($v['end_time'] - $v['create_time']) <= 86400) {
//                        //纠正数据
//                        if ($v['status'] == 2) {
//                            //修改到期时间
//                            $user_profit_model->edit(['id' => $v['id'], 'end_time' => $v['create_time'] + 259200], ['status' => 2]);
//                        } else if ($v['status'] == 1) {
//                            //需要特殊处理
//                            $endTime = $v['create_time'] + 259200;
//                            if ($endTime <= SYS_TIME) {
//                                //收益已经发放
//                                $user_profit_model->edit(['id' => $v['id'], 'end_time' => $endTime], ['status' => 1]);
////                                $user_amount_model->edit(['create_time' => $endTime], ['user_id' => $v['user_id'], 'type' => 11, 'key_id' => $v['key_id']]);
//                                echo '时间已经超过不处理' . $v['id'].'<br/>';
//                            } else {
//                                $dbh = $user_model->begin();
//                                try {
//                                    //扣钱
//                                    $user_profit_model->edit(['id' => $v['id'], 'end_time' => $endTime, 'status' => 2], ['status' => 1]);
//                                    $res = $user_model->changeBalance($v['user_id'], -$v['amount'], '数据修复', '收益', 11, $v['key_id'], 0);
//                                    if ($res['user']['balance'] < 0) {
//                                        $dbh->rollBack();
//                                        echo '余额不足' . $v['user_id'].'<br/>';
//                                    } else {
//                                        $user_amount_model->edit(['status' => -1], ['user_id' => $v['user_id'], 'type' => 11, 'key_id' => $v['key_id']]);
//                                        $dbh->commit();
//                                        echo '数据修复' . $v['id'].'<br/>';
//                                    }
//                                } catch (Exception $e) {
//                                    $dbh->rollBack();
//                                    Log::logException($e, 'userProfitCron');
//                                }
//                            }
//                        } else {
//                            echo '异常订单' . $v['id'].'<br/>';
//                        }
//                    } else {
//                        echo '异常订单2' . $v['id'].'<br/>';
//                    }
//                }
//            }
//        }
//    }

    //用户充值订单超时
    public function userRechargeTimeout()
    {
        $user_recharge_model = user_recharge_model::getInstance();
        $list = $user_recharge_model->where([
            'mode' => 2,
            'info' => ['LIKE' => '%DPay%'],
            'create_time' => ['<' => SYS_TIME - 3600],
            'del'=>0,
            'status' => 2
        ])->limit(100)->select();
        foreach ($list as $v) {
            $data = [
                'id' => $v['id'],
                'reason' => 'Order Payment Timeout',
                'operator' => 'system',
                'review_time' => SYS_TIME,
                'status' => 0
            ];
            $user_recharge_model->edit($data, ['status' => 2]);
        }
        $this->log("DPay支付超时");
    }

    //量化任务
//    public function taskQuantify()
//    {
//        echo '开始量化任务';
//        $RedisService = RedisService::getInstance();
//        $user_quantify_model = user_quantify_model::getInstance();
//        $user_model = user_model::getInstance();
//        $WebSocketService = WebSocketService::getInstance();
//        $user_rebate_mode = user_rebate_model::getInstance();
//        $user_profit_model = user_profit_model::getInstance();
//        do {
//            $userQuantify = $RedisService->popData('TaskQuantifyList');
//            if ($userQuantify) {
//                if (in_array($userQuantify['user']['status'], [3, 4])) {
//                    if ((SYS_TIME - $userQuantify['create_time']) > 300) {
//                        //匹配失败
//                        $user_quantify_model->edit(['id' => $userQuantify['id'], 'status' => 0]);
//                        $WebSocketService->quantify($userQuantify['user_id'], ['code' => 0, '匹配失败']);
//                    }
//                    continue;
//                }
//                $dbh = $user_model->begin();
//                try {
//                    $res = $user_quantify_model->edit([
//                        'id' => $userQuantify['id'],
//                        'status' => 1
//                    ], ['status' => 2]);
//                    if (!$res) {
//                        echo '<br/>更新失败:' . $userQuantify['id'];
//                        $dbh->rollBack();
//                        continue;
//                    }
//                    if ($userQuantify['gift_amount'] > 0) {
//                        $user_profit_model->addData($userQuantify['user_id'], $userQuantify['profit'], $userQuantify['currency'], '收益', 11, $userQuantify['id'], 86400);
//                    } else {
//                        $user_profit_model->addData($userQuantify['user_id'], $userQuantify['profit'], $userQuantify['currency'], '收益', 11, $userQuantify['id']);
//                        $agentList = $user_model->getAgentList($userQuantify['user']['pid']);
//                        $user_rebate_mode->quantifyRebate($userQuantify, $agentList);
//                    }
//                    $WebSocketService->quantify($userQuantify['user_id'], ['code' => 1, '量化成功']);
//                    $dbh->commit();
//                } catch (Exception $e) {
//                    var_dump($e->getMessage());
//                    $dbh->rollBack();
//                    Log::logException($e, 'userProductTradeCron');
//                }
//            }
//        } while ($userQuantify);
//        $res = $RedisService->getset('TaskQuantifyListLock', SYS_TIME);
//        if (!$res || $res < SYS_TIME - 10) {
//            $user_quantify_model = user_quantify_model::getInstance();
//            $list = $user_quantify_model->with(['user' => 'id,pid,status'])
//                ->where(['status' => 2, 'create_time' => ['<' => SYS_TIME - 90]])
//                ->limit(1000)->order('create_time desc')->select();
//            foreach ($list as $v) {
//                $RedisService->pushData($v, 'TaskQuantifyList');
//            }
//            $RedisService->getset('TaskQuantifyListLock', 0);
//            var_dump('获取队列成功');
//        } else {
//            var_dump('已开启队列锁，获取队列失败');
//        }
//        echo '<script>setTimeout(function (){location.reload();},1000)</script>';
//    }


    /**
     * 执行所有表到时间的量化完成
     */
    public function taskQuantifyAllTable()
    {
        $num = 0;//量化的数量
        $s1=[];
        $s2=[];
        $s3=[];
        for($table_id=0;$table_id<20;$table_id++) {
            $s1[$table_id] = microtime();
            $user_quantify_model_new = user_quantify_model::getInstance($table_id);
            $list = $user_quantify_model_new->with(['user' => 'id,pid,status'])
                ->where(['status' => 2, 'create_time' => ['<' => SYS_TIME - 90]])
//            ->order('modify_time ASC')
                ->limit(200)->select();
            $s2[$table_id] = microtime();
            if ($list) {
                $num += count($list);
                $user_model = user_model::getInstance();
                $WebSocketService = WebSocketService::getInstance();
                $user_rebate_mode = user_rebate_model::getInstance();
                $user_profit_model = user_profit_model::getInstance();
                foreach ($list as $userQuantify) {
                    if (in_array($userQuantify['user']['status'], [3, 4])) {
                        if ((SYS_TIME - $userQuantify['create_time']) > 300) {
                            //匹配失败
                            $user_quantify_model_new->edit(['id' => $userQuantify['id'], 'status' => 0]);
                            $WebSocketService->quantify($userQuantify['user_id'], ['code' => 0, '匹配失败']);
                        }
                        continue;
                    }
                    $data = [
                        'id' => $userQuantify['id'],
                        'step_time' => SYS_TIME,
                        'status' => 1
                    ];
                    $dbh = $user_model->begin();
                    try {
                        $res = $user_quantify_model_new->edit($data, ['status' => 2]);
                        if (!$res) {
                            $dbh->rollBack();
                            continue;
                        }
                        if (isset($data['status']) && $data['status'] == 1) {
                            if ($userQuantify['gift_amount'] > 0) {
                                $user_profit_model->addData($userQuantify['user_id'], $userQuantify['profit'], $userQuantify['currency'], '收益', 11, $userQuantify['id'], 86400);
                            } else {
                                $user_profit_model->addData($userQuantify['user_id'], $userQuantify['profit'], $userQuantify['currency'], '收益', 11, $userQuantify['id']);
                                $agentList = $user_model->getAgentList($userQuantify['user']['pid']);
                                $user_rebate_mode->quantifyRebate($userQuantify, $agentList);
                            }
                            $WebSocketService->quantify($userQuantify['user_id'], ['code' => 1, '量化成功']);
                        }
                        $dbh->commit();
                    } catch (Exception $e) {
                        $dbh->rollBack();
                        Log::logException($e, 'userProductTradeCron');
                    }
                }
            }
            $s3[$table_id] = microtime();
        }

        $this->log("量化收益");
        echo "量化收益 num:{$num}, <br>\r\n";
        foreach ($s1 as $k => $v){
            echo 'cost1:'. sprintf('%.6fs',$s2[$k]-$v) . ' run cost2:' . sprintf('%.6fs',$s3[$k]-$s2[$k]) . "<br>\r\n";
        }

    }

    public function taskQuantify()
    {
        $s1 = microtime();
        $user_quantify_model = user_quantify_model::getInstance();
        $list = $user_quantify_model->with(['user' => 'id,pid,status'])
            ->where(['status' => 2, 'create_time' => ['<' => SYS_TIME - 90]])
//            ->order('modify_time ASC')
            ->limit(200)->select();
        $s2 = microtime();
        if ($list) {
            $user_model = user_model::getInstance();
            $WebSocketService = WebSocketService::getInstance();
            $user_rebate_mode = user_rebate_model::getInstance();
            $user_profit_model=user_profit_model::getInstance();
            foreach ($list as $userQuantify) {
                if (in_array($userQuantify['user']['status'], [3, 4])) {
                    if ((SYS_TIME - $userQuantify['create_time']) > 300) {
                        //匹配失败
                        $user_quantify_model->edit(['id' => $userQuantify['id'], 'status' => 0]);
                        $WebSocketService->quantify($userQuantify['user_id'], ['code' => 0, '匹配失败']);
                    }
                    continue;
                }
                $data = [
                    'id' => $userQuantify['id'],
                    'step_time'=>SYS_TIME,
                    'status'=>1
                ];
                $dbh = $user_model->begin();
                try {
                    $res = $user_quantify_model->edit($data, ['status' => 2]);
                    if (!$res) {
                        $dbh->rollBack();
                        continue;
                    }
                    if (isset($data['status']) && $data['status'] == 1) {
                        if ($userQuantify['gift_amount'] > 0) {
                            $user_profit_model->addData($userQuantify['user_id'], $userQuantify['profit'], $userQuantify['currency'], '收益', 11, $userQuantify['id'], 86400);
                        } else {
                            $user_profit_model->addData($userQuantify['user_id'], $userQuantify['profit'], $userQuantify['currency'], '收益', 11, $userQuantify['id']);
                            $agentList = $user_model->getAgentList($userQuantify['user']['pid']);
                            $user_rebate_mode->quantifyRebate($userQuantify, $agentList);
                        }
                        $WebSocketService->quantify($userQuantify['user_id'], ['code' => 1, '量化成功']);
                    }
                    $dbh->commit();
                } catch (Exception $e) {
                    $dbh->rollBack();
                    Log::logException($e, 'userProductTradeCron');
                }
            }
        }
        $s3 = microtime();
        $this->log("量化收益");
        echo "量化收益".' select:'. count($list) . ' select cost1:'. sprintf('%.6fs',$s2-$s1) . ' run cost2:' . sprintf('%.6fs',$s3-$s2);
    }

    //废弃步骤条步骤
    public function taskQuantifyBak()
    {
        $user_quantify_model = user_quantify_model::getInstance();
        $list = $user_quantify_model->with(['user' => 'id,pid,status'])
            ->where(['status' => 2, 'step_time' => ['<=' => SYS_TIME - 5]])
            ->order('modify_time ASC')
            ->limit(200)->select();
        //0-正在启动量化机器人
        //1-正在扫描行情
        //2-订单匹配成功
        //3-正在发起买单
        //4-发起卖单
        //5-系统结算中
        //6-发放收益中-量化完成
        if ($list) {
            $stepArr = ['0' => 5, '1' => 15, '2' => 20, '3' => 20, '4' => 15, '5' => 10, '6' => 5];
            $user_model = user_model::getInstance();
            $WebSocketService = WebSocketService::getInstance();
            $user_rebate_mode = user_rebate_model::getInstance();
//            $level_model = level_model::getInstance();
            $user_profit_model=user_profit_model::getInstance();
            foreach ($list as $userQuantify) {
                if ($userQuantify['step'] == 2 && in_array($userQuantify['user']['status'], [3, 4])) {
                    if ((SYS_TIME - $userQuantify['create_time']) > 300) {
                        //匹配失败
                        $user_quantify_model->edit(['id' => $userQuantify['id'], 'status' => 0]);
                        $WebSocketService->quantify($userQuantify['user_id'], ['code' => 0, '匹配失败']);
                    } else {
                        //禁止量化
                        $user_quantify_model->edit(['id' => $userQuantify['id']]);
                    }
                    continue;
                }
                $data = [
                    'id' => $userQuantify['id']
                ];
                if (isset($stepArr[$userQuantify['step']])) {
                    if ($userQuantify['step_time'] <= SYS_TIME - $stepArr[$userQuantify['step']]) {
                        $data['step'] = $userQuantify['step'] + 1;
                        $data['step_time'] = SYS_TIME;
                    }
                } else {
                    $data['step_time'] = SYS_TIME;
                    $data['status'] = 1;
                }
                $dbh = $user_model->begin();
                try {
                    $res = $user_quantify_model->edit($data, ['status' => 2]);
                    if (!$res) {
                        $dbh->rollBack();
                        continue;
                    }
                    if (isset($data['status']) && $data['status'] == 1) {
//                        $res = $user_model->changeBalance($userQuantify['user_id'], $userQuantify['profit'], $userQuantify['currency'], '收益', 11, $userQuantify['id']);
//                        $user = $res['user'];
                        if ($userQuantify['gift_amount'] > 0) {
                            $user_profit_model->addData($userQuantify['user_id'], $userQuantify['profit'], $userQuantify['currency'], '收益', 11, $userQuantify['id'], 86400);
                        } else {
                            $user_profit_model->addData($userQuantify['user_id'], $userQuantify['profit'], $userQuantify['currency'], '收益', 11, $userQuantify['id']);
                            $agentList = $user_model->getAgentList($userQuantify['user']['pid']);
                            $user_rebate_mode->quantifyRebate($userQuantify, $agentList);
                        }
                        //判断升级条件
//                        $level_model->upLevel($user);
                        $WebSocketService->quantify($userQuantify['user_id'], ['code' => 1, '量化成功']);
                    }
                    $dbh->commit();
                } catch (Exception $e) {
                    $dbh->rollBack();
                    Log::logException($e, 'userProductTradeCron');
                }
            }
        }
    }

    //充值的汇率修改
    public function upRate()
    {
        $trade_model = trade_model::getInstance();
        $trade = $trade_model->where(['id' => 20, 'fn' => 'Wallet', 'status' => 1])->getOne();
        if (!$trade) {
            echo '未知交易';
            return;
        }
        $trade['info'] = json_decode($trade['info'], true);
        $HuoBiService = HuoBiService::getInstance();
        foreach ($trade['info'] as $k => $v) {
            if ($v['currency'] !== 'USDT') {
                $res = $HuoBiService->get_history_kline(strtolower($v['currency']) . 'usdt', 6, 1);
                if ($res['status'] == 'ok' && isset($res['data'][0])) {
                    $trade['info'][$k]['rate'] = number_format(1 / $res['data'][0]['close'], 8, '.', '');
                }
            }
        }
        $trade_model->edit(['id' => $trade['id'], 'info' => json_encode($trade['info'], JSON_UNESCAPED_UNICODE)]);
        $trade = $trade_model->where(['id' => 50, 'fn' => 'Wallet', 'status' => 1])->getOne();
        if (!$trade) {
            echo '未知提现交易';
            return;
        }
        $trade['info'] = json_decode($trade['info'], true);
        if(isset($trade['info']['list'])){
            foreach ($trade['info']['list'] as $k => $v) {
                if ($v['currency'] !== 'USDT') {
                    $res = $HuoBiService->get_history_kline(strtolower($v['currency']) . 'usdt', 6, 1);
                    if ($res['status'] == 'ok' && isset($res['data'][0])) {
                        $trade['info']['list'][$k]['rate'] = number_format(1 / $res['data'][0]['close'], 8, '.', '');
                    }
                }
            }
            $trade_model->edit(['id' => $trade['id'], 'info' => json_encode($trade['info'], JSON_UNESCAPED_UNICODE)]);
        }
        $this->log("更新汇率");
    }

    //更新用户等级
    public function upLevel()
    {
        $RedisService = RedisService::getInstance();
        $user_model = user_model::getInstance();
        $level_model = level_model::getInstance();
        do {
            $data = $RedisService->popData($RedisService->UserLevelUpKey);
            if ($data) {
                $user = $user_model->where(['id' => $data['id']])->getOne();
                //变动金额
                if ($data['amount'] > 0) {
                    $res = $level_model->upLevel($user);
                    //echo "upLevel user_id:{$user['id']} res:{$res} <br>\r\n";
                    $agentList = $user_model->getAgentList($data['user']['pid']);
                    if ($agentList) {
                        $level_model->upAgentLevel($agentList);
                    }
//                    if ($res['code'] == 1) {
//                        $agentList = $user_model->getAgentList($data['user']['pid']);
//                        if ($agentList) {
//                            $level_model->upAgentLevel($agentList);
//                        }
//                    }
                } else {
                    $res = $level_model->downLevel($user);
                    $res = json_encode($res,JSON_UNESCAPED_UNICODE);
                   // echo "downLevel user_id:{$user['id']} res:{$res} <br>\r\n";
                }
            }
        } while ($data);
        echo 'upLevel finish';
        $this->log('更新用户等级');
    }

    //系统K线数据生成
    public function sysKline()
    {
        $product_model = product_model::getInstance();
        $list = $product_model->field('id,title,price,fixed,api,api_config,kline')
            ->where(['api' => ['>' => 0], 'status' => ['>=' => 0]])
            ->limit(-1)->select();
        $product_minute_model = product_minute_model::getInstance();
        $product_hq_model = product_hq_model::getInstance();
        foreach ($list as $product) {
            //获取大于当前时间的K线分钟数据
            $productMinute = $product_minute_model->where(['product_id' => $product['id'], 'kt' => ['>' => SYS_TIME]])->order('kt ASC')->getOne();
            if (!$productMinute) {
                if ($product['api'] != 1) {
                    //非自营数据不自动生成
                    continue;
                }
                //获取最新的价格
                $hq = $product_hq_model->where(['product_id' => $product['id']])->order('kt DESC')->getOne();
                $price = $hq ? $hq['price'] : $product['price'];
                $api_config = json_decode($product['api_config'], true);
                //生成数据
                $rawData = $product_minute_model->kline(SYS_TIME, SYS_TIME + 180, $price, $product['fixed'], $price * $api_config['ratio'], $api_config['minVol'], $api_config['maxVol'],50,$api_config['min'],$api_config['max']);
                if ($rawData) {
                    foreach ($rawData as $val) {
                        $product_minute_model->add([
                            'product_id' => $product['id'],
                            'open' => $val[1],
                            'close' => $val[2],
                            'low' => $val[3],
                            'high' => $val[4],
                            'vol' => $val[5],
                            'kt' => strtotime($val[0])
                        ]);
                    }
                    $productMinute = $product_minute_model->where(['product_id' => $product['id'], 'kt' => ['>' => SYS_TIME]])->order('kt ASC')->getOne();
                }
                if (!$productMinute) {
                    continue;
                }
            }
            if ($productMinute['status'] == 1) {
                //已经运行
                continue;
            }
            //生成秒数据
            $dbh = $product_minute_model->begin();
            try {
                //执行数据
                $res = $product_minute_model->edit(['id' => $productMinute['id'], 'status' => 1], ['status' => 0]);
                if (!$res) {
                    $dbh->rollBack();
                    continue;
                }
                $productMinute['fixed'] = $product['fixed'];
                $product_hq_model->dataCreat($productMinute);
                $dbh->commit();
            } catch (Exception $e) {
                $dbh->rollBack();
                return ['code' => -2, 'msg' => '系统错误', 'err' => $e->getMessage()];
            }
        }
        echo '完成';
    }

    public function userMiningSettle()
    {
        //用户开始挖矿xm
        $today = strtotime('today');
        $user_mining_model = user_mining_model::getInstance();
        $userMiningList = $user_mining_model->where(['status' => 1, 'del' => 0, 'task_time' => ['<=' => $today]])->limit(1000)->select();
        if (!$userMiningList) {
            echo '没有需要执行的数据';
            return;
        }
        $user_mining_item_model = user_mining_item_model::getInstance();
        $user_model = user_model::getInstance();
        foreach ($userMiningList as $userMining) {
            $userMiningItemNums = $user_mining_item_model
                ->where(['user_id' => $userMining['user_id'], 'user_mining_id' => $userMining['id']])
                ->count();
            //计算需要发放收益的次数
            $nums = floor((SYS_TIME - strtotime('today', $userMining['create_time'])) / 86400) - $userMiningItemNums;
            //xm
            //var_dump($nums);
            if (($userMiningItemNums + $nums) > $userMining['day']) {
                //超过发放收益的次数
                $nums = $userMining['day'] - $userMiningItemNums;
            }
            if ($nums > 0) {
                //计算收益
                $profitAmount = $userMining['amount'] * $userMining['now_rate'];
                //发放收益
                $totalProfitAmount = 0;
                $dbh = $user_model->begin();
                try {
                    for ($i = 1; $i <= $nums; $i++) {
                        $user_mining_item_model->add([
                            'user_id' => $userMining['user_id'],
                            'user_mining_id' => $userMining['id'],
                            'profit_amount' => $profitAmount,
                            'currency' => $userMining['currency'],
                        ]);
//                        $user_model->changeBalance($userMining['user_id'], $profitAmount, $userMining['title'], '收益', 10, $userMining['id']);
                        $totalProfitAmount += $profitAmount;
                    }
                    $userMining['now_rate'] = mt_rand($userMining['min_rate'] * 10000, $userMining['max_rate'] * 10000) / 10000;
                    $userMining['profit_amount'] = $userMining['profit_amount'] + $totalProfitAmount;
                    $res = $user_mining_model->edit([
                        'id' => $userMining['id'],
                        'now_rate' => $userMining['now_rate'],
                        'profit_amount' => $userMining['profit_amount'],
                    ], ['task_time' => $userMining['task_time']]);
                    if (!$res) {
                        $dbh->rollBack();
                        continue;
                    }
                    $dbh->commit();
                    //var_dump($userMining['profit_amount']);
                } catch (Exception $e) {
                    $dbh->rollBack();
                    Log::logException($e, 'cronUserMiningSettle');
                    echo '任务执行异常';
                    continue;
                }
            } else {
                //无需发放收益
                $user_mining_model->edit(['id' => $userMining['id'], 'task_time' => SYS_TIME]);
            }
            //查看是否需要赎回
            if ($userMining['end_time'] <= SYS_TIME) {
                $user_mining_model->back($userMining);
            }
        }
        $this->log("持币生息收益结算");
    }

    //更新和推送产品数据
    public function updateProduct()
    {
        $product_model = product_model::getInstance();
        $list = $product_model->field('id,title,price,fixed,api,api_config,kline')
            ->where(['api' => ['>' => 0], 'status' => ['>=' => 0]])
            ->limit(8)->order('modify_time ASC')->select();
        $HuoBiService = HuoBiService::getInstance();
        $WebSocketService = WebSocketService::getInstance();
        $product_hq_model = product_hq_model::getInstance();
        $product_kline_model = product_kline_model::getInstance();
        $sinaList = [];
        $sinaProduct = [];
        foreach ($list as $product) {
            $product['api_config'] = json_decode($product['api_config'], true);
            $product['kline']=json_decode($product['kline'], true);
            $volume = 0;//交易增量
            $res = $product_hq_model->where(['product_id' => $product['id'], 'kt' => SYS_TIME])->getOne();
            if ($product['api'] == 1 || $res) {
                //自营币
                if(!$res){
                    $res = $product_hq_model->where(['product_id' => $product['id'], 'kt' => ['>=' => SYS_TIME - 60, '<' => SYS_TIME]])->order('kt DESC')->getOne();
                }
                if (!$res) {
                    continue;
                }
                $kline = [
                    'open' => $product['kline']['open'],
                    'close' => round($res['price'], $product['fixed']),
                    'low' => $product['kline']['low'],
                    'high' => $product['kline']['high'],
                ];
                if ($kline['low'] > $kline['close']) {
                    $kline['low'] = $kline['close'];
                } else if ($kline['high'] < $kline['close']) {
                    $kline['high'] = $kline['close'];
                }
                $volume = $res['vol'];
                $kline['vol'] = round($product['kline']['vol'] + $res['vol'], 2);
            } else if ($product['api'] == 2) {
                //火币数据
                $res = $HuoBiService->get_history_kline($product['api_config']['symbol'], 6, 1);
                if ($res['status'] == 'ok' && isset($res['data'][0])) {
                    $kline = [
                        'open' => round($res['data'][0]['open'], $product['fixed']),
                        'close' => round($res['data'][0]['close'], $product['fixed']),
                        'low' => round($res['data'][0]['low'], $product['fixed']),
                        'high' => round($res['data'][0]['high'], $product['fixed']),
                        'vol' => round($res['data'][0]['vol'], 2)
                    ];
                    $volume = round($kline['vol'] - $product['kline']['vol'], 2);
                    $product_hq_model->add([
                        'product_id' => $product['id'],
                        'price' => $kline['close'],
                        'vol' => $volume,
                        'kt' => SYS_TIME,
                        'm' => floor(SYS_TIME / 60),
                    ]);
                } else {
                    continue;
                }
            } else if ($product['api'] == 4) {
                //新浪数据
                $sinaList[] = $product['api_config']['symbol'];
                $sinaProduct[] = $product;
                continue;
            }
            if (!isset($kline)) {
                echo '未知数据' . $product['id'];
                continue;
            }
            $product_model->edit(['id' => $product['id'], 'price' => $kline['close'], 'kline' => json_encode($kline)]);
            //推送数据
            $kline['volume'] = $volume;
            if ($kline['vol'] > 1000000) {
                $kline['vol'] = round($kline['vol'] / 1000000, 2) . 'M';
            }
            $WebSocketService->market($product['id'], $kline);
            if (mt_rand(0, 1) == 1) {
                $WebSocketService->hq($product['id'], $product_model->getHq($kline['close'], $product['fixed']));
            }
        }
        if($sinaList){
            //新浪数据更新
            $SinaService = SinaService::getInstance();
            $SinaData = $SinaService->getKlineData($sinaList);
            foreach ($sinaProduct as $product) {
                $sinaKline = $SinaData[$product['api_config']['symbol']];
                if(!$sinaKline){
                    //没有数据
                    continue;
                }
                if ($product['api_config']['ratio'] > 0) {
                    //随机波动
                    $mt = pow(10, $product['fixed']);
                    $bd = intval($product['price'] * $product['api_config']['ratio'] * $mt);
                    if ($bd < 2) {
                        $bd = 2;
                    }
                    if (mt_rand(1, 100) <= 50) {
                        $sinaKline['close'] += mt_rand(1, $bd) / $mt;
                    } else {
                        $sinaKline['close'] -= mt_rand(1, $bd) / $mt;
                    }
                    if ($sinaKline['low'] > $sinaKline['close']) {
                        $sinaKline['low'] = $sinaKline['close'];
                    } else if ($sinaKline['high'] < $sinaKline['close']) {
                        $sinaKline['high'] = $sinaKline['close'];
                    }
                }else{
                    if ($sinaKline['close'] == $product['price']) {
                        //价格不变
                        continue;
                    }
                }
                $volume = round(mt_rand($product['api_config']['minVol'] * 100, $product['api_config']['maxVol'] * 100) / 100, 2);
                $kline = [
                    'open' => round($sinaKline['open'], $product['fixed']),
                    'close' => round($sinaKline['close'], $product['fixed']),
                    'low' => round($sinaKline['low'], $product['fixed']),
                    'high' => round($sinaKline['high'], $product['fixed']),
                    'vol' => $product['kline']['vol'] + $volume
                ];
                $product_hq_model->add([
                    'product_id' => $product['id'],
                    'price' => $kline['close'],
                    'vol' => $volume,
                    'kt' => SYS_TIME,
                    'm' => floor(SYS_TIME / 60),
                ]);
                $product_model->edit(['id' => $product['id'], 'price' => $kline['close'], 'kline' => json_encode($kline)]);
                //推送数据
                $kline['volume'] = $volume;
                if ($kline['vol'] > 1000000) {
                    $kline['vol'] = round($kline['vol'] / 1000000, 2) . 'M';
                }
                $WebSocketService->market($product['id'], $kline);
                if (mt_rand(0, 1) == 1) {
                    $WebSocketService->hq($product['id'], $product_model->getHq($kline['close'], $product['fixed']));
                }
            }
        }
        $list = $product_hq_model->getMinuteKline(SYS_TIME);
        foreach ($list as $v) {
            $product_kline_model->updateKline($v);
        }
        $this->log("产品数据更新");
    }

    //更新K线
    public function updateKline()
    {
        $product_hq_model = product_hq_model::getInstance();
        $product_kline_model = product_kline_model::getInstance();
        $list = $product_hq_model->getMinuteKline(SYS_TIME - 60);
        foreach ($list as $v) {
            $product_kline_model->updateKline($v);
        }
        $product_model = product_model::getInstance();
        $list = $product_model->field('id')
            ->where(['status' => ['>=' => 0]])
            ->limit(-1)->select();
        foreach ($list as $product) {
            $product_kline_model->kline5Min($product['id']);
            $product_kline_model->kline15Min($product['id']);
            $product_kline_model->kline30Min($product['id']);
            $product_kline_model->kline60Min($product['id']);
            $product_kline_model->kline4hour($product['id']);
            $product_kline_model->kline1Day($product['id']);
            $product_kline_model->kline1week($product['id']);
            $product_kline_model->kline1mon($product['id']);
        }
        $this->log("K线数据");
    }

    //同步火币数据
    public function syncHuobi()
    {
        $RedisService = RedisService::getInstance();
        $data = $RedisService->popData('productList', 'Huobi');
        if ($data) {
            $product_kline_model = product_kline_model::getInstance();
            $product_kline_model->syncHuobi($data, 0);
            $product_kline_model->syncHuobi($data, 1);
            $product_kline_model->syncHuobi($data, 2);
            $product_kline_model->syncHuobi($data, 3);
            $product_kline_model->syncHuobi($data, 4);
            $product_kline_model->syncHuobi($data, 5);
            $product_kline_model->syncHuobi($data, 6);
            $product_kline_model->syncHuobi($data, 7);
            $product_kline_model->syncHuobi($data, 8);
        } else {
            $product_model = product_model::getInstance();
            $list = $product_model->field('id,api,api_config,fixed')
                ->where(['api' => 2, 'status' => ['>=' => 0]])
                ->limit(-1)
                ->order('modify_time ASC')
                ->select();
            foreach ($list as $v) {
                //压入队列
                $RedisService->pushData($v, 'productHuobiList', 'sync');
            }
        }
    }

    //定时清理数据
    public function clear()
    {
        $product_minute_model = product_minute_model::getInstance();
        $product_minute_model->delByWhere(['status' => 1, 'kt' => ['<' => SYS_TIME - 86400 * 2]]);
        $product_kline_model = product_kline_model::getInstance();
        $product_kline_model->delByWhere([
            'kt' => ['<' => SYS_TIME - 86400],
            'type' => ['BETWEEN' => [0, 1]]
        ]);
        $product_kline_model->delByWhere(['kt' => ['<' => SYS_TIME - 86400 * 3], 'type' => 2]);
        $product_kline_model->delByWhere(['kt' => ['<' => SYS_TIME - 86400 * 8], 'type' => ['BETWEEN' => [3, 4]]]);
        $product_hq_model = product_hq_model::getInstance();
        $product_hq_model->delByWhere(['kt' => ['<' => SYS_TIME - 7200]]);
        //清理日志
        $path = DATA_PATH . DS . 'log';
        exec('find ' . $path . ' -mtime +7 -name "*" -exec rm -rf {} \;');
        //清理nginx日志
        exec('find /var/log/nginx/ -mtime +7 -name "*.gz" -exec rm -rf {} \;');
    }

    //数据库备份
    public function saveDB()
    {
        set_time_limit(120);
        $db = Loader::config('db');
        //保存路径
        $path = DATA_PATH . DS . 'log' . DS . date('Ymd_His') . '.sql.gz';
        exec("mysqldump -u{$db['username']} -p'{$db['password']}' {$db['dbname']} | gzip > {$path}");
    }

    //重置opcacheReset
    public function opcacheReset($crontabId = 0, $logSwitch = 1)
    {
        opcache_reset();
        if ($logSwitch) {
            (crontab_log_model::getInstance())->addLog($crontabId, '重置opcache缓存');
        }
        echo '重置opcache缓存';
    }

    /**
     * 翻译并生成文件
     */
    public function translate($crontabId = 0, $logSwitch = 1)
    {
        $lang_config_list_model = lang_config_list_model::getInstance();
        $res = $lang_config_list_model->translate();
        if ($logSwitch) {
            (crontab_log_model::getInstance())->addLog($crontabId, $res['msg']);
        }
    }

    /**
     * 定时任务日志
     */
    private function log($msg = [])
    {
        $logSwitch = Request::get('logSwitch') ?? 0;
        //echo "logSwitch {$logSwitch} <br>\r\n";
        if ($logSwitch) {
            $crontabId = Request::get('crontabId') ?? 0;
            //echo "crontabId {$crontabId} <br>\r\n";
            (crontab_log_model::getInstance())->addLog($crontabId, $msg);
        }
    }

    public function checkAllUserLevel(){

        $user_model = user_model::getInstance();
        $list = $user_model->field('*')
            ->where(['check_status' => 0])
            ->limit(500)->select();
        $ids =[];
        foreach ($list as $v) {
            $res = level_model::getInstance()->checkLevel($v);
            if($res['code'] == 2){
                $ids[] = $v['id'];
            }
            $user_model->edit(['check_status'=>1], ['id'=>$v['id'] ]);
        }
        echo json_encode($ids);
        //$this->log("");

    }

}
