<?php

namespace service;

use asura\Common;
use asura\Illuminate\DB;
use asura\Log;
use asura\Redis;

class KaicaiService
{

    public $url = 'https://kclm.xyz/api/trial/drawResult?format=json&token=abiao888&rows=200';

    protected $codes = [

        // 幸运飞艇
        8  => 'xyft',

        // sg飞艇
        9  => 'sgft',

    ];

    private static $instance;

    /**
     * 不能被克隆
     */
    final protected function __clone()
    {

    }

    public static function getInstance(): ?KaicaiService
    {
        return static::$instance ?? static::$instance = new static();
    }

    public function getHistory($fetchOne, $date = '') {

        $fetchOne = is_object($fetchOne) ? (array)$fetchOne : $fetchOne;
        try {
            $code = isset($this->codes[$fetchOne['id']]) ? $this->codes[$fetchOne['id']] : 0;
            if (empty($code)) {
                Log::log("【开彩网】{$fetchOne['name']} code is empty",Log::INFO,'kaicaiwang');
                return false;
            }
//            $response = Common::curlRequest($this->url."&code={$code}&date={$date}");
            $response = '{"code":0,"msg":"\u6210\u529f","data":[{"issue":"20240715071","drawResult":"02,05,04,06,03,08,01,07,09,10","drawTime":"2024-07-15 18:59:06","code":"xyft"},{"issue":"20240715070","drawResult":"04,08,01,06,02,05,09,10,03,07","drawTime":"2024-07-15 18:54:03","code":"xyft"}]}';

            Log::log($response,Log::INFO,'kaicaiwang');
            $content = json_decode($response, true);
            if (empty($content)) {
                Log::log($content,Log::INFO,'kaicaiwang');
                return false;
            }
            $this->_fetch($fetchOne, $content, true);
            return true;
        } catch (\Exception $e) {
            Log::logException($e,'kaicaiwang','error');
            return false;
        } catch (\Error $e) {
            Log::logException($e,'kaicaiwang','error');
            return false;
        }
    }

    protected function _fetch($fetchOne, $content, $cacheFilter = true) {
        foreach ($content['data'] as $val) {
//            if ($fetchOne['id'] == 52) {
//                $opencodeBases = $this->resultFormat($val['drawResult']);
//                $periodCodes = explode(',', $opencodeBases[0]);
//                array_push($periodCodes, $opencodeBases[1]);
//                $opencodeBase = implode(',', $periodCodes);
//            } else {
//                $opencodeBase = $this->resultFormat($val['drawResult']);
//            }
            $opencode = $val['drawResult'];
            if ($this->savePeriod($fetchOne['id'], $val['issue'], $opencode, $val['drawTime'], $cacheFilter)) {
                Log::log("【开彩网】 【{$fetchOne['name']}】 结果保存成功 {$val['issue']}  {$opencode}",Log::INFO,'kaicaiwang');
                // 消息通知 和 after执行
                /*if (!empty($fetchOne['after'])) {

                    foreach ($fetchOne['after'] as $v) {
                        $opencode2 = $v['resultFormat']($opencodeBase);
                        if ($this->savePeriod($v['id'], $val['expect'], $opencode2, $val['opentimestamp'], $cacheFilter)) {
                            // 消息通知
                            $this->logger->info("【开彩网】 【{$v['name']}】 结果保存成功 {$val['expect']}  {$opencode2}");
                        }
                    }
                }*/
            }
        }
    }

    /**
     * 保存结果并刷新缓存
     * @param  [type] $ci            [description]
     * @param  [type] $id            [description]
     * @param  [type] $lotteryNumber [description]
     * @param  [type] $periodCode    [description]
     * @param  string $openTime [description]
     * @return [type]                [description]
     */
    public function savePeriod($id, $lotteryNumber, $periodCode, $openTime, $cacheFilter = true)
    {
        $openTime = is_numeric($openTime) ? $openTime : strtotime($openTime);
        //echo 'savePeriod before:', $id, ' ', $lotteryNumber, PHP_EOL;
        $RedisService = RedisService::getInstance();
        $redisClient = (new Redis())->getClient();

        if ($cacheFilter && false === $redisClient->sadd('lottery_period_set' . $id, $lotteryNumber)) {
            return false;
        }
//        echo 'savePeriod:', $id, ' ', $lotteryNumber, PHP_EOL;exit;
        $time = time();
//        $periodCodes = explode(',', $periodCode);
//        $periodResult = array_sum($periodCodes);
//          var_dump('lottery_id=' .$id); echo PHP_EOL;
//          var_dump('open_expect='.$lotteryNumber);   echo PHP_EOL;
//          var_dump('openTime='.$openTime);   echo PHP_EOL;
//          exit;

        $res = DB::table('lottery_data')->where('lottery_id', $id)
            ->whereRaw("(open_code = '') ")
//            ->whereRaw("now() > (end_time + 5)")
            ->where('open_expect', $lotteryNumber)
            ->where('open_time', '<', $openTime)
            ->update([
                'open_code' => $periodCode,
                'catch_time' => $time,
                'official_time' => $openTime,
                'state' => 1
            ]);
        if(!$res) return false;
        $lotteryInfo = DB::table('lottery_data')->where('lottery_id', $id)
            ->where('open_expect', $lotteryNumber)
            ->first();
        //var_dump(\DB::getQueryLog());die;

        $RedisService->set('lottery_period_set'  . $id, json_encode($lotteryInfo));
        //发送结算通知
        $RedisService->pushData(json_encode($lotteryInfo),'lotterySettle', 'sync');
//        \Logic\Lottery\Common::sendQueOpenPrize($v2['lottery_type'],$v2['lottery_number'],$v2['period_code']);
        return true;
    }

    public function resultFormat($opencode)
    {
        $res = explode(',', $opencode);
        return $res[0];
    }
}