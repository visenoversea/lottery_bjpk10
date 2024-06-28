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
use model\crontab_log_model;
use model\crontab_model;
use model\ip_model;
use model\lang_config_list_model;
use model\level_model;
use model\product_hq_model;
use model\product_kline_model;
use model\product_model;
use model\product_platform_model;
use model\task_model;
use model\trade_model;
use model\user_amount_model;
use model\user_log_model;
use model\user_mining_item_model;
use model\user_mining_model;
use model\user_model;
use model\user_quantify_model;
use model\user_rebate_model;
use model\user_recharge_model;
use model\user_task_model;
use model\user_withdraw_model;
use service\BinanceService;
use service\BitfinexService;
use service\DPayService;
use service\GateService;
use service\GlobalService;
use service\HuoBiService;
use service\KuCoinService;
use service\MEXCService;
use service\OKXService;
use service\RedisService;
use service\SinaService;
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

//    public function test()
//    {
//        $user_amount_model = user_amount_model::getInstance();
//        $user_model = user_model::getInstance();
//        $list = $user_amount_model
//            ->where(['type' => 0, 'des' => '注册奖励', 'amount' => 3, 'create_time' => ['>=' => strtotime('2023-08-28')]])
//            ->limit(-1)
//            ->select();
//        foreach ($list as $v) {
//            $user_model->changeBalance($v['user_id'], 2, 'USDT', '注册奖励', 0, 0, 0);
//            $user_amount_model->edit(['id' => $v['id'], 'amount' => 5]);
//        }
//        var_dump($list);
//    }

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
                    Common::asyncThread('/main/cron/' . $v['fn'] . '?crontabId=' . $v['id'] . '&logSwitch=' . $v['log_switch'], '', 80, 5, 250000);
                } catch (Exception $e) {
                    //请求异常
                    $crontab_log_model->addLog($v['id'], "执行任务异常,,错误信息:{$e->getMessage()}");
                }
            }
        }
    }

    public function up()
    {
        $id = Request::get('id');
        $user_model = user_model::getInstance();
        $user = $user_model->where(['id' => intval($id), 'status' => 1])->getOne();
        if ($user) {
            $agentList = $user_model->getAgentList($user['pid']);
            $level_model = level_model::getInstance();
            $res = $level_model->upLevel($user);
            var_dump($res);
            //判断上级代理升级
            if ($res['code'] == 1 && $agentList) {
                $level_model->upAgentLevel($agentList);
            }
        }
    }

    //更新ip地址信息
    public function upIp()
    {
        $ip_model = ip_model::getInstance();
        $ip_model->task();
    }

    //数据库分表更新
    public function upSubTable()
    {
        $RedisService = RedisService::getInstance();
        $GlobalService = GlobalService::getInstance();
        $user_amount_model = user_amount_model::getInstance();
        $key = 'lastUserAmountId';
        $lastId = $RedisService->getData($key);
        $where = ['run' => 0];
        if ($lastId) {
            $where['id'] = ['>=' => $lastId];
        }
        $list = $user_amount_model->with(['user' => 'id,suffix'])->where($where)->order('id ASC')->limit(300)->select();
        if ($list) {
            $dbh = $user_amount_model->begin();
            foreach ($list as $v) {
                $res = $user_amount_model->edit(['id' => $v['id'], 'run' => 1], ['run' => 0]);
                if ($res) {
                    $GlobalService->setSuffix($v['user']['suffix']);
                    unset($v['user']);
                    $user_amount_model->add($v);
                    $GlobalService->setSuffix('');
                }
            }
            $dbh->commit();
            $RedisService->setData($list[0]['id'], $key);
        } else {
            if ($lastId) {
                $RedisService->setData($lastId, $key);
            } else {
                //查找最新的数据
                $res = $user_amount_model->order('id DESC')->getOne();
                if ($res) {
                    $RedisService->setData($res['id'], $key);
                }
            }
        }
        var_dump($lastId);
        //同步返佣记录
        $user_rebate_model = user_rebate_model::getInstance();
        $key = 'lastUserRebateId';
        $lastId = $RedisService->getData($key);
        $where = ['run' => 0];
        if ($lastId) {
            $where['id'] = ['>=' => $lastId];
        }
        $list = $user_rebate_model->with(['user' => 'id,suffix'])
            ->where($where)->order('id ASC')->limit(300)->select();
        if ($list) {
            $dbh = $user_rebate_model->begin();
            foreach ($list as $v) {
                $res = $user_rebate_model->edit(['id' => $v['id'], 'run' => 1], ['run' => 0]);
                if ($res) {
                    $GlobalService->setSuffix($v['user']['suffix']);
                    unset($v['user']);
                    $user_rebate_model->add($v);
                    $GlobalService->setSuffix('');
                }
            }
            $dbh->commit();
            $RedisService->setData($list[0]['id'], $key);
        } else {
            if ($lastId) {
                $RedisService->setData($lastId, $key);
            } else {
                //查找最新的数据
                $res = $user_rebate_model->order('id DESC')->getOne();
                if ($res) {
                    $RedisService->setData($res['id'], $key);
                }
            }
        }
        var_dump($lastId);
        echo '<script>setTimeout(function (){location.reload();},3000)</script>';
    }

//    public function getLayerVipInfo()
//    {
//        $RedisService = RedisService::getInstance();
//        $user_model = user_model::getInstance();
//        $key = 'userLayerVipId';
//        $LayerId = $RedisService->getData($key);
//        $where = ['type' => ['<' => 10], 'pid' => ['LIKE' => '19866857,19866880,%'], 'status' => ['>' => 0]];
//        if ($LayerId) {
//            $where['id'] = ['>' => $LayerId];
//        }
//        $list = $user_model->where($where)->order('id ASC')->limit(500)->select();
//        $vip2 = INDEX_PATH . '/' . 'vip2.txt';
//        $vip3 = INDEX_PATH . '/' . 'vip3.txt';
//        foreach ($list as $v) {
//            $data = [];
//            $data['id'] = $v['id'];
//            if ($v['level_id'] == 2) {
//                file_put_contents($vip2, $v['id'] . "\n", FILE_APPEND);
//            } else if ($v['level_id'] == 3) {
//                file_put_contents($vip3, $v['id'] . "\n", FILE_APPEND);
//            }
//        }
//        if ($list) {
//            var_dump($LayerId);
//            $RedisService->setData($list[count($list) - 1]['id'], $key);
//            echo '<script>setTimeout(function (){location.reload();},500)</script>';
//        }
//    }

//    public function getLayerInfo()
//    {
//        $RedisService = RedisService::getInstance();
//        $user_model = user_model::getInstance();
//        $key = 'userId19866979';
//        $LayerId = $RedisService->getData($key);
//        $where = ['type' => ['<' => 10], 'pid' => ['LIKE' => '19866859,19866979,%'], 'status' => ['>' => 0]];
//        if ($LayerId) {
//            $where['id'] = ['>' => $LayerId];
//        }
//        $list = $user_model->where($where)->order('id ASC')->limit(300)->select();
////        var_dump($where);
////        var_dump($list);
//        $tableList = [];
//        foreach ($list as $v) {
//            $data = [];
//            $data['id'] = $v['id'];
//            //1代
//            $data['layer1'] = $user_model->where([
//                'pid' => ['LIKE' => $v['pid'] . $v['id'] . '%'],
//                'layer' => $v['layer'] + 1,
//                'recharge_amount' => ['>' => 0],
//                'status' => ['>' => 0]
//            ])->count();
//            //2代
//            $data['layer2'] = $user_model->where([
//                'pid' => ['LIKE' => $v['pid'] . $v['id'] . '%'],
//                'layer' => $v['layer'] + 2,
//                'recharge_amount' => ['>' => 0],
//                'status' => ['>' => 0]
//            ])->count();
//            //3代
//            $data['layer3'] = $user_model->where([
//                'pid' => ['LIKE' => $v['pid'] . $v['id'] . '%'],
//                'layer' => $v['layer'] + 3,
//                'recharge_amount' => ['>' => 0],
//                'status' => ['>' => 0]
//            ])->count();
//            $data['layer'] = $data['layer1'] + $data['layer2'] + $data['layer3'];
//            if ($data['layer'] >= 10 && $data['layer'] <= 50) {
//                $tableList[] = "{$data['id']},{$data['layer']},{$data['layer1']},{$data['layer2']},{$data['layer3']}";
//            }
//        }
//        $file = INDEX_PATH . '/' . 'user.txt';
//        foreach ($tableList as $v) {
//            file_put_contents($file, $v . "\n", FILE_APPEND);
//        }
//        if ($list) {
//            var_dump($LayerId);
//            $RedisService->setData($list[count($list) - 1]['id'], $key);
//            echo '<script>setTimeout(function (){location.reload();},500)</script>';
//        }
//    }

    //更新用户表
    public function upUserTable()
    {
        exit;
        $fromSuffix = '002';
        $toSuffix = '004';
        $user_model = user_model::getInstance();
        $GlobalService = GlobalService::getInstance();
        $user_amount_model = user_amount_model::getInstance();
        $user_rebate_model = user_rebate_model::getInstance();
        $list = $user_model->where(['suffix' => $fromSuffix])->order('modify_time ASC')->limit(10)->select();
        $GlobalService->setSuffix($fromSuffix);
        foreach ($list as $v) {
            var_dump($v['id']);
            $res = $user_model->edit(['id' => $v['id'], 'suffix' => $toSuffix], ['suffix' => $fromSuffix]);
            if ($res) {
                $user_amount_model->where(['user_id' => $v['id']])->limit(-1)->insertToTable(user_amount_model::class, '', '_' . $toSuffix);
                $user_rebate_model->where(['user_id' => $v['id']])->limit(-1)->insertToTable(user_rebate_model::class, '', '_' . $toSuffix);
                $user_rebate_model->delData(['user_id' => $v['id']]);
                $user_amount_model->delData(['user_id' => $v['id']]);
            }
        }
        echo '<script>setTimeout(function (){location.reload();},1000)</script>';
    }

    //更新代理线
    public function upAgentTable()
    {
        $toSuffix = '005';
        $user_model = user_model::getInstance();
        $GlobalService = GlobalService::getInstance();
        $user_amount_model = user_amount_model::getInstance();
        $user_rebate_model = user_rebate_model::getInstance();
        $list = $user_model->where(['suffix' => ['<>' => $toSuffix], 'pid' => ['LIKE' => "19866853,19867690,%"], 'modify_time' => ['<' => SYS_TIME - 800]])->order('modify_time ASC')->limit(10)->select();
        foreach ($list as $v) {
            var_dump($v['id']);
            $res = $user_model->edit(['id' => $v['id'], 'suffix' => $toSuffix], ['suffix' => $v['suffix']]);
            if ($res) {
                $GlobalService->setSuffix($v['suffix']);
                $user_amount_model->where(['user_id' => $v['id']])->limit(-1)->insertToTable(user_amount_model::class, '', '_' . $toSuffix);
                $user_rebate_model->where(['user_id' => $v['id']])->limit(-1)->insertToTable(user_rebate_model::class, '', '_' . $toSuffix);
                $user_rebate_model->delData(['user_id' => $v['id']]);
                $user_amount_model->delData(['user_id' => $v['id']]);
            }
        }
        if ($list) {
            echo '<script>setTimeout(function (){location.reload();},1000)</script>';
        }
    }

    public function upSubTable2()
    {
        exit;
        $RedisService = RedisService::getInstance();
        $user_rebate_model = user_rebate_model::getInstance();
        $key = 'lastUserRebateId';
        $lastUserRebateId = $RedisService->getData($key);
        $where = ['run' => 0];
        if ($lastUserRebateId) {
            $where['id'] = ['>=' => $lastUserRebateId];
        }
        $list = $user_rebate_model->with(['user' => 'id,suffix'])
            ->where($where)->order('id ASC')->limit(1000)->select();
        if ($list) {
            $dbh = $user_rebate_model->begin();
            foreach ($list as $v) {
                $res = $user_rebate_model->edit(['id' => $v['id'], 'run' => 1], ['run' => 0]);
                if ($res) {
                    $user_rebate_model->setSuffix($v['user']['suffix']);
//                    $GlobalService->setSuffix($v['user']['suffix']);
                    unset($v['user']);
                    $user_rebate_model->add($v);
                    $user_rebate_model->setSuffix('');
//                    $GlobalService->setSuffix('');
                    //$user_rebate_model->edit(['id' => $v['id'], 'run' => 1], ['run' => 2]);
                }
            }
            $dbh->commit();
            $RedisService->setData($list[0]['id'], $key);
            echo '<script>setTimeout(function (){location.reload();},1000)</script>';
        }
        var_dump($lastUserRebateId);

    }

    public function taskQuantify()
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
            $user_rebate_model = user_rebate_model::getInstance();
            $level_model = level_model::getInstance();
            foreach ($list as $userQuantify) {
//                if ($userQuantify['step'] == 2 && in_array($userQuantify['user']['status'], [3, 4])) {
//                    if ((SYS_TIME - $userQuantify['create_time']) > 300) {
//                        //匹配失败
//                        $user_quantify_model->edit(['id' => $userQuantify['id'], 'status' => 0]);
//                        $WebSocketService->quantify($userQuantify['user_id'], ['code' => 0, '匹配失败']);
//                    } else {
//                        //禁止量化
//                        $user_quantify_model->edit(['id' => $userQuantify['id']]);
//                    }
//                    continue;
//                }
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
                    $res = $user_quantify_model->edit($data);
                    if (!$res) {
                        $dbh->rollBack();
                        continue;
                    }
                    if (isset($data['status']) && $data['status'] == 1) {
                        $res = $user_model->changeBalance($userQuantify['user_id'], $userQuantify['profit'], $userQuantify['currency'], '收益', 11, $userQuantify['id']);
                        $user = $res['user'];
                        $agentList = $user_model->getAgentList($userQuantify['user']['pid']);
                        $user_rebate_model->quantifyRebate($userQuantify, $agentList);
                        //判断升级条件
                        $level_model->upLevel($user);
                        if ($agentList) {
                            $level_model->upAgentLevel($agentList);
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
                if ($res['code'] == 1 && isset($res['data'][0])) {
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
        if (isset($trade['info']['list'])) {
            foreach ($trade['info']['list'] as $k => $v) {
                if ($v['currency'] !== 'USDT') {
                    $res = $HuoBiService->get_history_kline(strtolower($v['currency']) . 'usdt', 6, 1);
                    if ($res['code'] == 1 && isset($res['data'][0])) {
                        $trade['info']['list'][$k]['rate'] = number_format(1 / $res['data'][0]['close'], 8, '.', '');
                    }
                }
            }
            $trade_model->edit(['id' => $trade['id'], 'info' => json_encode($trade['info'], JSON_UNESCAPED_UNICODE)]);
        }
    }

    //持币生息结算
    public function userMiningSettle()
    {
        $today = strtotime('today');
        $user_mining_model = user_mining_model::getInstance();
        $userMiningList = $user_mining_model->where(['status' => 1, 'del' => 0, 'task_time' => ['<=' => $today]])->limit(100)->select();
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
                            'profit_amount' => $profitAmount
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
        foreach ($list as $product) {
            $product['api_config'] = json_decode($product['api_config'], true);
            $product['kline'] = json_decode($product['kline'], true);
            if ($product['api'] == 2) {
                //火币数据
                $res = $HuoBiService->get_history_kline($product['api_config']['symbol'], 6, 1);
                if ($res['code'] == 1 && isset($res['data'][0])) {
                    $kline = [
                        'open' => round($res['data'][0]['open'], $product['fixed']),
                        'close' => round($res['data'][0]['close'], $product['fixed']),
                        'low' => round($res['data'][0]['low'], $product['fixed']),
                        'high' => round($res['data'][0]['high'], $product['fixed']),
                        'vol' => round($res['data'][0]['vol'], 2)
                    ];
                    $volume = round($kline['vol'] - $product['kline']['vol'], 2);
                } else {
                    continue;
                }
            } else {
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
            var_dump($product['id']);
//            if (mt_rand(0, 1) == 1) {
//                $WebSocketService->hq($product['id'], $product_model->getHq($kline['close'], $product['fixed']));
//            }
        }
    }

//    public function updateProductBak()
//    {
//        $product_model = product_model::getInstance();
//        $list = $product_model->field('id,title,price,fixed,api,api_config,kline')
//            ->where(['api' => ['>' => 0], 'status' => ['>=' => 0]])
//            ->limit(8)->order('modify_time ASC')->select();
//        $HuoBiService = HuoBiService::getInstance();
//        $WebSocketService = WebSocketService::getInstance();
//        $product_hq_model = product_hq_model::getInstance();
//        $product_kline_model = product_kline_model::getInstance();
//        $sinaList = [];
//        $sinaProduct = [];
//        foreach ($list as $product) {
//            $product['api_config'] = json_decode($product['api_config'], true);
//            $product['kline'] = json_decode($product['kline'], true);
//            $volume = 0;//交易增量
//            $res = $product_hq_model->where(['product_id' => $product['id'], 'kt' => SYS_TIME])->getOne();
//            if ($product['api'] == 1 || $res) {
//                //自营币
//                if (!$res) {
//                    $res = $product_hq_model->where(['product_id' => $product['id'], 'kt' => ['>=' => SYS_TIME - 60, '<' => SYS_TIME]])->order('kt DESC')->getOne();
//                }
//                if (!$res) {
//                    continue;
//                }
//                $kline = [
//                    'open' => $product['kline']['open'],
//                    'close' => round($res['price'], $product['fixed']),
//                    'low' => $product['kline']['low'],
//                    'high' => $product['kline']['high'],
//                ];
//                if ($kline['low'] > $kline['close']) {
//                    $kline['low'] = $kline['close'];
//                } else if ($kline['high'] < $kline['close']) {
//                    $kline['high'] = $kline['close'];
//                }
//                $volume = $res['vol'];
//                $kline['vol'] = round($product['kline']['vol'] + $res['vol'], 2);
//            } else if ($product['api'] == 2) {
//                //火币数据
//                $res = $HuoBiService->get_history_kline($product['api_config']['symbol'], 6, 1);
//                if ($res['code'] == 1 && isset($res['data'][0])) {
//                    $kline = [
//                        'open' => round($res['data'][0]['open'], $product['fixed']),
//                        'close' => round($res['data'][0]['close'], $product['fixed']),
//                        'low' => round($res['data'][0]['low'], $product['fixed']),
//                        'high' => round($res['data'][0]['high'], $product['fixed']),
//                        'vol' => round($res['data'][0]['vol'], 2)
//                    ];
//                    $volume = round($kline['vol'] - $product['kline']['vol'], 2);
//                    $product_hq_model->add([
//                        'product_id' => $product['id'],
//                        'price' => $kline['close'],
//                        'vol' => $volume,
//                        'kt' => SYS_TIME,
//                        'm' => floor(SYS_TIME / 60),
//                    ]);
//                } else {
//                    continue;
//                }
//            } else if ($product['api'] == 4) {
//                //新浪数据
//                $sinaList[] = $product['api_config']['symbol'];
//                $sinaProduct[] = $product;
//                continue;
//            }
//            if (!isset($kline)) {
//                echo '未知数据' . $product['id'];
//                continue;
//            }
//            $product_model->edit(['id' => $product['id'], 'price' => $kline['close'], 'kline' => json_encode($kline)]);
//            //推送数据
//            $kline['volume'] = $volume;
//            if ($kline['vol'] > 1000000) {
//                $kline['vol'] = round($kline['vol'] / 1000000, 2) . 'M';
//            }
//            $WebSocketService->market($product['id'], $kline);
//            if (mt_rand(0, 1) == 1) {
//                $WebSocketService->hq($product['id'], $product_model->getHq($kline['close'], $product['fixed']));
//            }
//        }
//        if ($sinaList) {
//            //新浪数据更新
//            $SinaService = SinaService::getInstance();
//            $SinaData = $SinaService->getKlineData($sinaList);
//            foreach ($sinaProduct as $product) {
//                $sinaKline = $SinaData[$product['api_config']['symbol']];
//                if (!$sinaKline) {
//                    //没有数据
//                    continue;
//                }
//                if ($product['api_config']['ratio'] > 0) {
//                    //随机波动
//                    $mt = pow(10, $product['fixed']);
//                    $bd = intval($product['price'] * $product['api_config']['ratio'] * $mt);
//                    if ($bd < 2) {
//                        $bd = 2;
//                    }
//                    if (mt_rand(1, 100) <= 50) {
//                        $sinaKline['close'] += mt_rand(1, $bd) / $mt;
//                    } else {
//                        $sinaKline['close'] -= mt_rand(1, $bd) / $mt;
//                    }
//                    if ($sinaKline['low'] > $sinaKline['close']) {
//                        $sinaKline['low'] = $sinaKline['close'];
//                    } else if ($sinaKline['high'] < $sinaKline['close']) {
//                        $sinaKline['high'] = $sinaKline['close'];
//                    }
//                } else {
//                    if ($sinaKline['close'] == $product['price']) {
//                        //价格不变
//                        continue;
//                    }
//                }
//                $volume = round(mt_rand($product['api_config']['minVol'] * 100, $product['api_config']['maxVol'] * 100) / 100, 2);
//                $kline = [
//                    'open' => round($sinaKline['open'], $product['fixed']),
//                    'close' => round($sinaKline['close'], $product['fixed']),
//                    'low' => round($sinaKline['low'], $product['fixed']),
//                    'high' => round($sinaKline['high'], $product['fixed']),
//                    'vol' => $product['kline']['vol'] + $volume
//                ];
//                $product_hq_model->add([
//                    'product_id' => $product['id'],
//                    'price' => $kline['close'],
//                    'vol' => $volume,
//                    'kt' => SYS_TIME,
//                    'm' => floor(SYS_TIME / 60),
//                ]);
//                $product_model->edit(['id' => $product['id'], 'price' => $kline['close'], 'kline' => json_encode($kline)]);
//                //推送数据
//                $kline['volume'] = $volume;
//                if ($kline['vol'] > 1000000) {
//                    $kline['vol'] = round($kline['vol'] / 1000000, 2) . 'M';
//                }
//                $WebSocketService->market($product['id'], $kline);
//                if (mt_rand(0, 1) == 1) {
//                    $WebSocketService->hq($product['id'], $product_model->getHq($kline['close'], $product['fixed']));
//                }
//            }
//        }
//        $list = $product_hq_model->getMinuteKline(SYS_TIME);
//        foreach ($list as $v) {
//            $product_kline_model->updateKline($v);
//        }
//    }

    //更新K线
//    public function updateKline()
//    {
//        $product_hq_model = product_hq_model::getInstance();
//        $product_kline_model = product_kline_model::getInstance();
//        $list = $product_hq_model->getMinuteKline(SYS_TIME - 60);
//        foreach ($list as $v) {
//            $product_kline_model->updateKline($v);
//        }
//        $product_model = product_model::getInstance();
//        $list = $product_model->field('id')
//            ->where(['status' => ['>=' => 0]])
//            ->limit(-1)->select();
//        foreach ($list as $product) {
//            $product_kline_model->kline5Min($product['id']);
//            $product_kline_model->kline15Min($product['id']);
//            $product_kline_model->kline30Min($product['id']);
//            $product_kline_model->kline60Min($product['id']);
//            $product_kline_model->kline4hour($product['id']);
//            $product_kline_model->kline1Day($product['id']);
//            $product_kline_model->kline1week($product['id']);
//            $product_kline_model->kline1mon($product['id']);
//        }
//    }

    //同步火币数据
//    public function syncHuobi()
//    {
//        $RedisService = RedisService::getInstance();
//        $data = $RedisService->popData('productList', 'Huobi');
//        if ($data) {
//            $product_kline_model = product_kline_model::getInstance();
//            $product_kline_model->syncHuobi($data, 0);
//            $product_kline_model->syncHuobi($data, 1);
//            $product_kline_model->syncHuobi($data, 2);
//            $product_kline_model->syncHuobi($data, 3);
//            $product_kline_model->syncHuobi($data, 4);
//            $product_kline_model->syncHuobi($data, 5);
//            $product_kline_model->syncHuobi($data, 6);
//            $product_kline_model->syncHuobi($data, 7);
//            $product_kline_model->syncHuobi($data, 8);
//        } else {
//            $product_model = product_model::getInstance();
//            $list = $product_model->field('id,api,api_config,fixed')
//                ->where(['api' => 2, 'status' => ['>=' => 0]])
//                ->limit(-1)
//                ->order('modify_time ASC')
//                ->select();
//            foreach ($list as $v) {
//                //压入队列
//                $RedisService->pushData($v, 'productHuobiList', 'sync');
//            }
//        }
//    }

    //重置opcacheReset
    public function opcacheReset($crontabId = 0, $logSwitch = 1)
    {
        opcache_reset();
        if ($logSwitch) {
            (crontab_log_model::getInstance())->addLog($crontabId, '重置opcache缓存');
        }
        echo '重置opcache缓存';
    }

    //定时清理数据
    public function clear()
    {
        //默认设置主表
        $GlobalService = GlobalService::getInstance();
        $GlobalService->setSuffix('');
        $product_kline_model = product_kline_model::getInstance();
        $product_kline_model->delByWhere([
            'kt' => ['<' => SYS_TIME - 86400],
            'type' => ['BETWEEN' => [0, 1]]
        ]);
        $product_kline_model->delByWhere(['kt' => ['<' => SYS_TIME - 86400 * 3], 'type' => 2]);
        $product_kline_model->delByWhere(['kt' => ['<' => SYS_TIME - 86400 * 8], 'type' => ['BETWEEN' => [3, 4]]]);
        $product_hq_model = product_hq_model::getInstance();
        $product_hq_model->delByWhere(['kt' => ['<' => SYS_TIME - 7200]]);
        $user_amount_model = user_amount_model::getInstance();
        $delNums = $user_amount_model->delData([
            'create_time' => ['<' => SYS_TIME - 86400 * 5],
            'run' => 1
        ]);
        echo "user_amount数据删除:{$delNums}";
        $user_rebate_model = user_rebate_model::getInstance();
        $delNums = $user_rebate_model->delData([
            'create_time' => ['<' => SYS_TIME - 86400 * 5],
            'run' => 1
        ]);
        echo "user_rebate数据删除:{$delNums}";
        //清理日志
        $path = DATA_PATH . DS . 'log';
        exec('find ' . $path . ' -mtime +7 -name "*" -exec rm -rf {} \;');
        //清理nginx日志
        exec('find /var/log/nginx/ -mtime +7 -name "*.gz" -exec rm -rf {} \;');
    }

    public function upProductPlatform()
    {
        $product_platform_model = product_platform_model::getInstance();
        $list = $product_platform_model->where(['status' => 1])->limit(30)->order('modify_time ASC')->select();
        $BinanceService = BinanceService::getInstance();
        $OKXService = OKXService::getInstance();
        $KuCoinService = KuCoinService::getInstance();
        $GateService = GateService::getInstance();
        $BitfinexService = BitfinexService::getInstance();
        $HuoBiService = HuoBiService::getInstance();
        $MEXCService = MEXCService::getInstance();
        foreach ($list as $v) {
            switch ($v['platform_id']) {
                case 1:
                    $res = $BinanceService->get_history_kline($v['symbol'], 0, 1);
                    break;
                case 2:
                    $res = $OKXService->get_history_kline($v['symbol'], 0, 1);
                    break;
                case 5:
                    $res = $KuCoinService->get_history_kline($v['symbol'], 0, 1);
                    break;
                case 6:
                    $res = $GateService->get_history_kline($v['symbol'], 0, 1);
                    break;
                case 7:
                    $res = $BitfinexService->get_history_kline($v['symbol'], 0, 1);
                    break;
                case 8:
                    $res = $HuoBiService->get_history_kline($v['symbol'], 0, 1);
                    break;
                case 10:
                    $res = $MEXCService->get_history_kline($v['symbol'], 0, 1);
                    break;
                default:
                    $res = ['code' => -2, 'msg' => '失败'];
            }
            if ($res['code'] == 1 && isset($res['data'][0])) {
                $data = ['id' => $v['id'], 'price' => $res['data'][0]['close'], 'err' => 0, 'modify_time' => SYS_TIME];
                if ($v['platform_id'] == 7) {
                    $data['modify_time'] += mt_rand(6, 21);
                }
                $product_platform_model->edit($data);
            } else {
                $data = ['id' => $v['id'], 'err' => $v['err'] + 1, 'modify_time' => SYS_TIME];
                if ($v['platform_id'] == 7) {
                    $data['modify_time'] += mt_rand(6, 21);
                }
                $product_platform_model->edit($data);
                $res['id'] = $v['id'];
                var_dump($res);
            }
        }
    }

//    public function addProductPlatform()
//    {
//        $product_model = product_model::getInstance();
//        $list = $product_model->where(['status' => 1])->limit(-1)->select();
//        $product_platform_model = product_platform_model::getInstance();
//        foreach ($list as $v) {
//            $coin = explode('/', $v['title']);
//            $product_platform_model->add([
//                'product_id' => $v['id'],
//                'platform_id' => 1,
//                'symbol' => $coin[0] . 'USDT',
//            ]);
//            $product_platform_model->add([
//                'product_id' => $v['id'],
//                'platform_id' => 2,
//                'symbol' => $coin[0] . '-USDT',
//            ]);
//            $product_platform_model->add([
//                'product_id' => $v['id'],
//                'platform_id' => 5,
//                'symbol' => $coin[0] . '-USDT',
//            ]);
//            $product_platform_model->add([
//                'product_id' => $v['id'],
//                'platform_id' => 6,
//                'symbol' => $coin[0] . '_USDT',
//            ]);
//            $product_platform_model->add([
//                'product_id' => $v['id'],
//                'platform_id' => 7,
//                'symbol' => 't'.$coin[0] . 'UST',
//            ]);
//            $product_platform_model->add([
//                'product_id' => $v['id'],
//                'platform_id' => 8,
//                'symbol' => strtolower($coin[0] . 'USDT'),
//            ]);
//            $product_platform_model->add([
//                'product_id' => $v['id'],
//                'platform_id' => 10,
//                'symbol' => $coin[0] . 'USDT',
//            ]);
//        }
//    }

    //数据库备份
    public function saveDB()
    {
        set_time_limit(120);
        $db = Loader::config('db');
        //保存路径
        $path = DATA_PATH . DS . 'log' . DS . date('Ymd_His') . '.sql.gz';
        exec("mysqldump -u{$db['username']} -p'{$db['password']}' {$db['dbname']} | gzip > {$path}");
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
}
