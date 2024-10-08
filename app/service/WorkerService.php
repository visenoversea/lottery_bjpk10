<?php


namespace service;

use asura\Illuminate\DB;
use asura\Log;
//use asura\Illuminate\Redis;
use model\config_model;
use model\level_model;
use model\user_model;
use model\staking_model;
use service\RedisService;
use model\user_profit_model;
use model\user_staking_model;

class WorkerService
{

    public static function test(){
        return ;
        DB::table('user')->orderBy('id','asc')->chunk(1000, function ($records)  {
            $data = [];
            foreach ($records as $record){
                $data = ['user_id'=>$record->id,'create_time'=>time(),'next_settle_time'=>1718723599];
                try {
                    DB::table('user_stake_settle')->insert($data);
                }catch (\Exception $e){
                    echo 111;
                }
            }

        });

//        $res = DB::table('user_stake_settle')->first();
//        $data= [
//            'amount' => $res->amount,
//            'next_settle_time' => $res->next_settle_time,
//            'tmp_amount' => $res->tmp_amount,
//
//        ];
//        DB::table('user_stake_settle')->update($data);
    }


    //活期收益返佣
    public static function userRebate(){
        $redis = RedisService::getInstance();
        $lockKey = 'runUserRebate';
        $set = $redis->getDirect($lockKey);
        if($set){
            echo '重复计算...';
            Log::log('重复计算...',Log::INFO,'userRebate');
            return ;
        }
        $res = $redis->setnx($lockKey,time(),300);
        if(!$res){
            echo '重复计算2...';
            Log::log('重复计算2...',Log::INFO,'userRebate');
            return ;
        }
        $profits = DB::table('user_profit')->where('type',22)->where('rebate_status',0)->limit(200)->get()->toArray();
        foreach ($profits as $profit){
            //获取上级代理
            $pid = DB::table('user')->where('id',$profit->user_id)->value('pid');
//            $pid = DB::table('user')->where('id',$profit->user_id)->first();
            if(!$pid){
                DB::table('user_profit')->where('id',$profit->id)->update(['rebate_status'=>3]);
                Log::log("{$profit->user_id} 获取pid失败",Log::INFO,'rebateProfit');
                continue;
            }
            self::stakeRebateSingle($profit,$pid);
        }
        $redis->del($lockKey);
    }

    //活期收益计算
    public function stakeRebateSingle($userProfit, $agents)
    {
        if (!$agents) {
            return;
        }
        $agentList = array_filter(explode(',',$agents));
        if (!$agentList) {
            return;
        }
        $redis = RedisService::getInstance();
        $rebateConfig = $redis->get('rebateConfig');
        if(!$rebateConfig){
            $config_model = config_model::getInstance();
            $rebateConfig = $config_model->getConfigData(8);
            $redis->set('rebateConfig',$rebateConfig);
        }
        //1级
        if ($rebateConfig['Stake1'] <= 0) {
            return;
        }

        $agent = array_pop($agentList);
        if (!$agent) {
            return;
        }
        $data = [
            'create_time'=>time(),
            'type' => 23,
            'user_id' => $agent,
            'rebate_id' => $userProfit->user_id,
            'title' => 'Rebate',
            'key_id' => $userProfit->id,
            'currency' => 'USDT',
            'rate' => 1,
            'amount' => bcmul($userProfit->amount , $rebateConfig['Stake1'], 4)
        ];
        try{
            if ($data['amount'] > 0) {
                DB::beginTransaction();
                Log::log("{$userProfit->user_id} 返佣给1级代理 $agent",Log::INFO,'rebateProfit');
                DB::table('user_profit')->where('id',$userProfit->id)->update(['rebate_status'=>1]);
                $data['id'] = DB::table('user_rebate')->insertGetId($data);
                self::changeBalance($data['user_id'], 23,$data['title'], '活期收益返佣', $data['amount'],$data['id']);
                DB::commit();
            }
        }catch (\Exception $e){
            DB::rollback();
//            throw $e;
            Log::log(['e'=>$e->getMessage()], Log::EXCEPTION,'rebateProfit');
        }

        //2级
        if ($rebateConfig['Stake2'] <= 0) {
            return;
        }
        $agent = array_pop($agentList);
        if (!$agent) {
            return;
        }
        $data = [
            'create_time'=>time(),
            'type' => 23,
            'user_id' => $agent,
            'rebate_id' => $userProfit->user_id,
            'title' => 'Rebate',
            'key_id' => $userProfit->id,
            'currency' => 'USDT',
            'rate' => 1,
            'amount' => bcmul($userProfit->amount , $rebateConfig['Stake2'], 4)
        ];
        try{
            if ($data['amount'] > 0) {
                DB::beginTransaction();
                Log::log("{$userProfit->user_id} 返佣给2级代理 $agent",Log::INFO,'rebateProfit');
                $data['id'] = DB::table('user_rebate')->insertGetId($data);
                DB::table('user_profit')->where('id',$userProfit->id)->update(['rebate_status'=>1]);
                self::changeBalance($data['user_id'], 23,$data['title'], '活期收益返佣', $data['amount'],$data['id']);
                DB::commit();
            }
        }catch (\Exception $e){
            DB::rollback();
            Log::log(['info'=>"返佣失败，返佣记录{$userProfit->id}",'e'=>$e->getMessage()], Log::EXCEPTION,'rebateProfit');
        }
//        return '';
//        //3级
//        if ($rebateConfig['Stake3'] <= 0) {
//            return;
//        }
//        $agent = array_pop($agentList);
//        if (!$agent) {
//            return;
//        }
//        $data = [
//            'type' => 23,
//            'user_id' => $agent,
//            'rebate_id' => $userProfit['user_id'],
//            'title' => '活期收益返佣',
//            'key_id' => $userProfit['id'],
//            'currency' => 'USDT',
//            'rate' => 1,
//            'amount' => round($userProfit['profit'] * $rebateConfig['Quantify3'], 2)
//        ];
//        if ($data['amount'] > 0) {
//            $data['id'] = DB::table('user_profit')->insert($data);
//            self::changeBalance($data['user_id'],23, $data['amount'], $data['currency'], $data['title'], 3, $data['id']);
//        }
    }

    //余额变动
    public static function changeBalance($user_id,$type,$title,$des,$amount,$key_id){
        $amountData = [
            'user_id' => $user_id,
            'mode' => 1,
            'type' => $type,
            'title' => $title,
            'des' => $des,
            'currency' => 'USDT',
            'amount' => $amount,
//            'balance' => $balance,
            'key_id' => $key_id,
            'status' => 1,
            'create_time' => time(),
        ];
        $user = DB::table('user')->where('id',$user_id)->lockForUpdate()->first();
        if(!$user){
            throw new \Exception("用户id {$user_id} 不存在}",10000);
        }
        $amountData['balance'] = bcadd($user->balance,$amount,4);
        DB::table('user_amount')->insert($amountData);
        DB::table('user')->where('id',$user_id)->update(['balance'=>$amountData['balance']]);
    }

    public static function cclStakingProfit(){

        //查看上一个小时是否存入金额,如果有,需要减掉
        $now = time();
        $h = $nh = date('H');
        if($nh == 0){
            $h = 24;
        }
        $redis = RedisService::getInstance();
        $lasth = $redis->get('cclStakingProfit');
        if($lasth == $h){
            Log::log(['h'=>$h,'m'=>'重复计算'],Log::EXCEPTION,'cclStakingProfit');
            echo 'cclStakingProfit-重复计算';
//            return;
        }
        $userStakingModel = user_staking_model::getInstance();
        $stakingModel = staking_model::getInstance();
        $userProfitModel = user_profit_model::getInstance();
        $userModel = user_model::getInstance();
        $users = $userModel->where(['stake'=>['>'=>0]])->select();

        var_dump($h);
        $wholeHourTime = strtotime(date('Y-m-d H:00:00', $now));
        $lastWholeHourTime = $wholeHourTime - 3600;
        foreach ($users as $user){
            $res = $userStakingModel->field('sum(`amount`) as excluded_amount')->where(['user_id'=>$user['id'],'create_time'=>['>='=>$lastWholeHourTime]])->getOne();
            print_r($res);
            $excludedAmount = $res['excluded_amount'] ?? 0;
            $calculateAmount = bcsub($user['stake'],$excludedAmount,4);
            var_dump($calculateAmount);
            //读取该时间段利率配置
            $config = $stakingModel->where(['id'=>$h])->getOne();
            if(!$config){
                Log::log(['h'=>$h,'user'=>['id'=>$user['id'],'stake'=>$calculateAmount]],Log::EXCEPTION,'cclStakingProfit');
                continue;
            }
            $dbh = $userProfitModel->begin();
            try{
                $profit = bcmul($calculateAmount,$config['rate'],4);
                var_dump($profit);
                if(!$profit) continue;
                $profitId = $userProfitModel->addData($user['id'], $profit, 'USDT', '收益', 22, $h, 86400,1);
                $userModel->changeBalance($user['id'], $profit, '活期投资收益', '活期投资收益', 22, $profitId);
                Log::log(['h'=>$h,'user'=>['id'=>$user['id'],'stake'=>$calculateAmount,'profit'=>$profit,'config'=>$config]],Log::EXCEPTION,'cclStakingProfit');
                $dbh->commit();
                //设置缓存
                $redis->hset('cclStakingProfits',$user['id'],$h);
            }catch (\Exception $e){
                $dbh->rollBack();
                Log::log(['e'=>$e], Log::EXCEPTION,'cclStakingProfit');
                continue;
            }

        }
        $redis->set('cclStakingProfit',$h);
    }


}