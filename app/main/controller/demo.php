<?php
/**
 *Demo
 */

namespace main\controller;

use asura\excel\Excel;
use asura\Illuminate\DB;
use asura\Log;
use main\classes\base;
use model\demo_model;
use model\user_amount_model;
use model\user_log_model;
use model\user_mining_item_model;
use model\user_mining_model;
use model\user_model;
use model\user_rebate_model;
use model\user_withdraw_model;
use model\balance_tmp_model;
use service\RedisService;
use model\user_quantify_model;
use model\task_model;
use model\user_task_model;
use service\WorkerService;

class demo extends base
{

    public function test(){
        echo 456456;exit;
        WorkerService::test();exit;
        DB::table('user')->orderBy('id','asc')->chunk(100, function ($records) {

            $data = [];
            foreach ($records as $record){
                $data[] = ['user_id'=>$record->id];
            }
            DB::table('user_stake_settle')->insert($data);

        });

    }

    public function checktime(){
        $unix = 1711922140; //create_time
        $d = date('Y-m-d', $unix);
        $t1 = strtotime($d);
        $t2 = strtotime('today', $unix);


        $minus = SYS_TIME - $t2;
        $c = $minus / 86400;
        $nums = floor($c);

        $today1 = strtotime(date('Y-m-d', SYS_TIME));
        $today2 = strtotime('today');

        echo '$today1:',$today1, ' $today2:',$today2 , "<br>\r\n";

        echo ' $d:', $d, ' $t1:', $t1, ' $t2:', $t2 , ' SYS_TIME:',SYS_TIME,  ' $minus:',$minus, ' $c:',$c, ' $nums:', $nums ;

        //$d:2024-03-31 $t1:1711839600 $t2:1711839600 SYS_TIME:1711992950 $minus:153350 $c:1.7748842592593 $nums:1

    }

    public function checktoday(){
        $user_mining_model = user_mining_model::getInstance();
        $user_mining_item_model = user_mining_item_model::getInstance();

        $userMining = $user_mining_model->where(['id'=>12384])->getOne();
        $userMiningItemNums = $user_mining_item_model
            ->where(['user_id' => $userMining['user_id'], 'user_mining_id' => $userMining['id']])
            ->count();
        //计算需要发放收益的次数
        $nums = floor((SYS_TIME - strtotime('today', $userMining['create_time'])) / 86400) - $userMiningItemNums;
        echo '$userMining: ',$userMining['id'] , " nums:{$nums}  userMiningItemNums:{$userMiningItemNums} day:{$userMining['day']} <br>\r\n";
        if (($userMiningItemNums + $nums) > $userMining['day']) {
            //超过发放收益的次数
            $nums = $userMining['day'] - $userMiningItemNums;
        }
        echo "after nums:{$nums} <br>\r\n";

    }

    public function testAddProfig(){

        $user_quantify_model = user_quantify_model::getInstance();
//        $user_id = [];
        $orders = $user_quantify_model->where(['gift_amount'=>['>'=>0],'create_time'=>['>='=>1716926400],'status'=>1])->select();
        $user_model = user_model::getInstance();
        $user_rebate_mode = user_rebate_model::getInstance();
        foreach ($orders as $order){
            $user = $user_model->where(['id'=>$order['user_id']])->getOne();
            $agentList = $user_model->getAgentList($user['pid']);
            $user_rebate_mode->quantifyRebate($order, $agentList);
        }

    }

    public function phpCheckBalanceAllUser(){
        //>=20120000
        $beginTime = 1711720800;//SYS_TIME - 20 * 60 * 60 ; 1711720800 2024-03-29 22:00:00 ;
        $beginTime2 = 1711695600; //2024-03-29 15:00:00
        $modify_time = 1711634400;

        $user_model = user_model::getInstance();
        $user_list = $user_model->field('id,balance')->where( ['id'=>['<'=>20120000], 'check_status' => 8,  'status'=> ['>'=>0], 'modify_time'=>['>'=> $modify_time],  'virtual'=>0 ])
            //->where(['id'=> 20209165])
            ->limit(50000)->select();

        $num = 0;
        foreach ($user_list as $user) {
            $this->checkBalanceoneUser($beginTime2, $user );
            $num++;
            echo  $num , ' ';
        }

        echo 'finish all';
    }


    public function checkBalanceAllUser(){
        //<20120000
        $beginTime = 1711720800;//SYS_TIME - 20 * 60 * 60 ; 1711720800 2024-03-29 22:00:00 ;
        $beginTime2 = 1711695600; //2024-03-29 15:00:00
        $modify_time = 1711634400;

        $user_model = user_model::getInstance();
        $user_list = $user_model->field('id,balance')->where( ['id'=>['<'=>20120000], 'check_status' => 8,  'status'=> ['>'=>0], 'modify_time'=>['>'=> $modify_time],  'virtual'=>0 ])
            //->where(['id'=> 20209165])
            ->limit(20)->select();

        $num = 0;
        foreach ($user_list as $user) {
            $this->checkBalanceoneUser($beginTime2, $user );
            $num++;
            echo 'finish ' , $num;
        }

        echo 'finish all';
        $t=SYS_TIME;
        echo "
        <script>
        function run(){
        location.href = '/main/demo/checkBalanceAllUser?t={$t}';    
        }
        setTimeout('run()', 500);
       
</script>
        ";
    }

    //强制刷新
    public function changeBalanceForce($user_id=0,$before_balance=0,$change=0){

        if(!$user_id){
            $user_id = intval($_GET['user_id']);
        }
        if(!$before_balance){
            $before_balance = floatval($_GET['before_balance']);
        }
        if(!$change){
            $change = trim($_GET['change']);
        }

        $user_model = user_model::getInstance();
        $user_amount_model=user_amount_model::getInstance();
        $user_quantify_model=user_quantify_model::getInstance();
        $balance_tmp_model = balance_tmp_model::getInstance();
        $user = $user_model->field('id,balance')->where(['id' => $user_id])->getOne();
        if(!$user){
            $this->GlobalService->json(['code' => -2, 'msg' => '不存在用户']);
        }
        $beginTime = 1711695600;

        //查该用户是否有 1711695600 以前的账变, 如果有则不改变
        $beginDate = date('Y-m-d H:i:s', $beginTime);

        $user_amount = $user_amount_model->field('id,balance')->where(['user_id' => $user_id, 'status'=>1,'currency'=>'USDT'])
            ->where(['create_time'=>['<'=>$beginTime ]])
            ->order('create_time desc')
            ->getOne();
        if($user_amount){
            $this->GlobalService->json(['code' => -2, 'msg' => '存在'.$beginDate.' | '.$beginTime.'之前的账变记录']);
        }

        //查是否有之后的账变记录 有则修改,没有则退出
        $list = $user_amount_model->where(['create_time' => ['>=' => $beginTime]])
            ->where(['user_id' => $user_id])
            ->where(['status' => 1])
            ->where(['currency'=>'USDT'])
            ->order('create_time asc')
            ->limit(8000)
            ->select();
        if(empty($list)){
            $this->GlobalService->json(['code' => -2, 'msg' => '不存在'.$beginDate.' | '.$beginTime.'之后的账变记录']);
        }
        $last_true = $before_balance;
        foreach ($list as $userAmount){
            $last_true = $userAmount['amount'] + $last_true;
            //修改账变的变动后余额
            if($change == '1'){
                $user_amount_model->edit(['balance' => $last_true, 'status' => 1], ['id' => $userAmount['id'], 'user_id' => $user_id]);  //------------
            }
            echo "-- amount_id:{$userAmount['id']} , balance: {$userAmount['balance']}, last_true:{$last_true} <br>\r\n";
        }
        if($change == '1') {
            $user_model->edit(['balance' => $last_true], ['id' => $user_id]);
            $balance_tmp_model->add([
                'user_id' => $user_id + 200000000,
                'now_balance' => $user['balance'],
                'true_balance' => $last_true,
            ]);
        }
        $str = "未修改";
        if($change=='1'){
            $str = "修改完成";
        }
        $this->GlobalService->json(['code' => 1, 'msg' => "{$str},当前余额是:{$user['balance']} 最后余额是:{$last_true}" ]);
    }

    //通过基准数据修正用户余额
    public function changeBalance($user_id,$balance,$beginTime = 0,$change=0){
        $user_model = user_model::getInstance();
        $user_amount_model=user_amount_model::getInstance();
        $user_quantify_model=user_quantify_model::getInstance();
        $balance_tmp_model = balance_tmp_model::getInstance();
        $user = $user_model->field('id,balance')->where(['id' => $user_id])->getOne();
        if(!$user){
            $this->GlobalService->json(['code' => -2, 'msg' => '不存在用户']);
        }
        if($balance == $user['balance']){
            $this->GlobalService->json(['code' => 1, 'msg' => '用户余额相同,不同修改']);
        }

        //查该用户是否有 1711695600 以前的账变, 如果有则不改变

        if(!$beginTime){
            $beginTime = 1711695600;
        }
        $beginDate = date('Y-m-d H:i:s', $beginTime);

        $user_amount = $user_amount_model->field('id,balance')->where(['user_id' => $user_id, 'status'=>1,'currency'=>'USDT'])
            ->where(['create_time'=>['<'=>$beginTime ]])
            ->order('create_time desc')
            ->getOne();
        if($user_amount){
            $this->GlobalService->json(['code' => -2, 'msg' => '存在'.$beginDate.' | '.$beginTime.'之前的账变记录']);
        }

        //查是否有之前的量化记录,基准是以量化记录为依据
        $user_quantify = $user_quantify_model->field('id,amount')->where(['user_id' => $user_id, 'status'=>1,'del'=>0])
            ->where(['create_time'=>['<'=>$beginTime ]])
            ->order('create_time desc')
            ->getOne();
        if(!$user_quantify){
            $this->GlobalService->json(['code' => -2, 'msg' => '不存在'.$beginDate.' | '.$beginTime.'之前的量化记录']);
        }
        if($user_quantify['amount'] != $balance){
            $this->GlobalService->json(['code' => -2, 'msg' => $beginDate .' | '.$beginTime.'之前的最后一条量化记录执行仓位与基准不一致']);
        }

        //查是否有之后的账变记录 有则修改,没有则退出
        $list = $user_amount_model->where(['create_time' => ['>=' => $beginTime]])
            ->where(['user_id' => $user_id])
            ->where(['status' => 1])
            ->where(['currency'=>'USDT'])
            ->order('create_time asc')
            ->limit(8000)
            ->select();
        if(empty($list)){
            $this->GlobalService->json(['code' => -2, 'msg' => '不存在'.$beginDate.' | '.$beginTime.'之后的账变记录']);
        }
        $last_true = $balance;
        foreach ($list as $userAmount){
            $last_true = $userAmount['amount'] + $last_true;
            //修改账变的变动后余额
            if($change == '1'){
                $user_amount_model->edit(['balance' => $last_true, 'status' => 1], ['id' => $userAmount['id'], 'user_id' => $user_id]);  //------------
            }
            echo "-- amount_id:{$userAmount['id']} , balance: {$userAmount['balance']}, last_true:{$last_true} <br>\r\n";
        }
        if($change == '1') {
            $user_model->edit(['balance' => $last_true], ['id' => $user_id]);
            $balance_tmp_model->add([
                'user_id' => $user_id + 200000000,
                'now_balance' => $user['balance'],
                'true_balance' => $last_true,
            ]);
        }
        $this->GlobalService->json(['code' => 1, 'msg' => "完成,当前余额是:{$user['balance']} 最后余额是:{$last_true}" ]);
    }


    //驳回
    public function checkuserBo(){

        //从user表取数据
//        $user_model = user_model::getInstance();
//        $user_list = $user_model->field('id')->where( ['status'=> ['>'=>0], 'modify_time'=>['>'=> 1711634400],  'virtual'=>0 ])
//            ->where(['id' => ['IN' =>[] ] ])
//            //->where(['id'=>20045626])
//            ->limit(1000)->select();
        $i = 0;
        $user_list = [19867123,20173638,20174140,20176052,20180503,20190514,20191274,20191509,19911192,19915999,19925557,19978926,19939519,19946914,19953262,20197179,20203583,20207397,20208627,20215779,20221040,20221109,20222549,20224031,20224513,20227989,20231499,20231516,20231522,20237441,20237855,20241905,20243667,20246388,20246618,20248498,20248621,20261032,20262338,20265541,20266265,20266552,20268522,20268585,20269280,20271269,20272677,20064001,20064193,20067211,20068179,20068590,20072451,20077297,20079202,20080548,20081075,20083213,20086161,20086894,20096355,20097287,20097546,19886361,19896167,19897678,19904076,19906986,20099117,20101080,20101172,20101487,20102068,20103227,20104120,20106828,20109640,20109999,20110253,20113665,20117622,20117848,20118273,20118338,20122032,20123569,20124582,20125827,20126463,20126697,20126839,20127481,20127669,20127722,20128365,20131242,20133362,20135566,20136311,20138185,20143070,20143173,20143191,20143612,20145889,20151015,20154959,20154960,20155618,20161127,20163794,19990612,19992886,20001560,20007072,20007205,20008872,20019665,20019894,20020269,20028211,20035079,20041530,20044460];
        foreach ($user_list as $user_id){
            $this->checkAmountBo($user_id);
            $i ++;
            echo 'finish one', " $i\r\n";
        }
        echo 'finish all', "\r\n";
    }

    public function checkAmountBo($user_id){
        $beginTime = 1711720800;//SYS_TIME - 20 * 60 * 60 ;

        $last_true = []; //用户正确时候的 最后的余额

        //账变表
        $user_model = user_model::getInstance();
        $user_amount_model=user_amount_model::getInstance();
        $user_withdraw_model=user_withdraw_model::getInstance();

        //查提现表
        $list = $user_withdraw_model->where(['create_time' => ['>' => $beginTime], 'status' => 2  ])
            ->where(['user_id' => $user_id])
            ->order('create_time desc')
            ->where(['currency'=>'USDT'])
            ->limit(5000)
            ->select();

        foreach ($list as $userWithdraw) {
            $id = $userWithdraw['id'];

            $status = 0;//驳回
            $reason = 'Contact product manager';
            $data = [
                'id' => intval($id),
                'reason' => $reason,
                'review_time' => SYS_TIME,
                'operator' => 'svip',
                'status' => intval($status)
            ];

            $dbh = $user_withdraw_model->begin();
            try {
                echo $id , ' ';
                $res = $user_withdraw_model->edit($data, ['status' => 2]);
                if (!$res) {
                    $dbh->rollBack();
                    (user_log_model::getInstance())->addLog('驳回失败svip', $data);
                    return;
                }
                if ($data['status'] == 0) {
                    //审核不通过
                    $res = $user_model->changeBalance($userWithdraw['user_id'], $userWithdraw['apply_amount'], $userWithdraw['title'], '提现驳回', 2, $userWithdraw['id'], 1, $userWithdraw['currency']);
                }
                /*********添加日志*********/
                (user_log_model::getInstance())->addLog('驳回处理svip', $data);
                /*********添加日志*********/
                $dbh->commit();
            } catch (Exception $e) {
                $dbh->rollBack();
                (user_log_model::getInstance())->addLog('驳回失败svip2', $data);
            }
        }
    }

    public function checkuserType(){

        //从user表取数据
        $user_model = user_model::getInstance();
        $user_list = $user_model->field('id')->where( ['status'=> ['>'=>0], 'modify_time'=>['>'=> 1711634400],  'virtual'=>0 ])
            ->where(['id'=> ['IN'=> [19870430,19872389,19873123,19874760,19875470,19875971,19876809,19879916,19880102,19880365,19881034,19881523,19881797,19882779,19883353,19883717,19886535,19886560,19886713,19887461,19887558,19888226,19891616,19892438,19893301,19893968,19894822,19895066,19896082,19896520,19896657,19897666,19897736,19898231,19899728,19901210,19902339,19902450,19902574,19905155,19908910,19910988,19912228,19913399,19915300,19915578,19917422,19918651,19923589,19923602,19924193,19924422,19926439,19929482,19929633,19933648,19935272,19935919,19937499,19938002,19939862,19942193,19943758,19945698,19946462,19946513,19947600,19947772,19947998,19948032,19948178,19948520,19948586,19948676,19948892,19950795,19950943,19951516,19952084,19952809,19954096,19955205,19955815,19957384,19960020,19960891,19960930,19965465,19966196,19966238,19966299,19967827,19970083,19970344,19972601,19972800,19973031,19973215,19974913,19977427,19978926,19981694,19984792,19985451,19985847,19985896,19988698,19989336,19989855,19990145,19990652,19992305,19992632,19994538,19994638,19995670,19996781,19998769,19998789,19999385,19999496,20001560,20002398,20003148,20003663,20005401,20005433,20005801,20005847,20006015,20008006,20009290,20009703,20010727,20012539,20012556,20012825,20014132,20015880,20016163,20016253,20017618,20017847,20025912,20026608,20028560,20030288,20031996,20035001,20035430,20035654,20036007,20037261,20038802,20039599,20039769,20040276,20040561,20041868,20041903,20041953,20044365,20044446,20044905,20045368,20045626,20048565,20048581,20049058,20050070,20050539,20051400,20051660,20052029,20054120] ] ])
            // ->where(['check_status' => ['!='=>7]])
            //->where(['id'=> 20054120])
            ->limit(500)->select();
        $i = 0;
        foreach ($user_list as $users){
            $this->checkAmountType($users['id']);
            $i ++;
            echo 'finish one', " $i\r\n";
        }
        echo 'finish all', "\r\n";
    }

    public function checkuser(){

        //从user表取数据
        $user_model = user_model::getInstance();
        $user_list = $user_model->field('id')->where( ['check_status'=>1, 'status'=> ['>'=>0], 'modify_time'=>['>'=> 1711634400],  'virtual'=>0 ])
            //->where(['id'=>19876936])
            ->limit(50000)->select();
        $i = 0;
        foreach ($user_list as $users){
            $this->checkAmount($users['id']);
            $i ++;
            echo 'finish one', " $i\r\n";
        }
        echo 'finish all', "\r\n";
    }

    //处理有提现的用户
    public function checkuserWithdraw(){

        $user_model = user_model::getInstance();
        $user_list = $user_model->field('id')->where( ['check_status'=>3, 'status'=> ['>'=>0], 'modify_time'=>['>'=> 1711634400],  'virtual'=>0 ])
            //->where(['id'=>19874760])
            ->limit(1000)->select();
        $i = 0;
        foreach ($user_list as $users){
            $this->checkAmountWithdraw($users['id']);
            $i ++;
            echo 'finish one', " $i\r\n";
        }
        echo 'finish all', "\r\n";
    }

    public function checkAmountWithdraw($user_id=0){

        $beginTime = 1711720800;//SYS_TIME - 20 * 60 * 60 ;

        $last_true = []; //用户正确时候的 最后的余额

        //账变表
        $user_model = user_model::getInstance();
        $user_amount_model=user_amount_model::getInstance();

        $dbh = $user_model->begin();
        try {

            $list = $user_amount_model->where(['create_time' => ['>' => $beginTime], 'status' => 1])
                ->where(['user_id' => $user_id])
                ->order('create_time desc')
                ->limit(10000)
                ->select();

            //echo count($list);return;

            $now_balances = [];

            $error_amount_num = [];
            $change_amount_num = [];

            $change_keys = [];

            $liuxia = 0;

            if ($list) {

                $user = $user_model->field('id,balance')->where(['id' => $user_id])->getOne();
                //  echo $user_id, ' balance ', $user['balance'], " <br>\r\n";
                $now_balances[$user_id] = $user['balance'];

                foreach ($list as $userAmount) {

                    $key = sprintf("%s:%s:%s", $userAmount['type'], $user_id, $userAmount['key_id']);

                    if (isset($change_keys[$key])) {//存在key,则有重复的
                        //修改账变状态-1
                        $user_amount_model->edit(['status' => -1], ['id' => $userAmount['id'], 'user_id' => $user_id]); //------------
                        $change_amount_num [$user_id]++;
                        $change_keys[$key] ++;
                        continue;

                    } else {
                        $liuxia++;
                        if (isset($last_true[$user_id])) {
                            $max_balance = $last_true[$user_id];//最后一条正确的余额
                        } else {
                            //查该用户这个数据之前的最后10条里,变动后金额最大的作为用户余额
                            $balance_amounts = $user_amount_model->field('id,user_id,balance')
                                ->where(['id' => ['<' => $userAmount['id']], 'user_id' => $user_id])
                                ->order('create_time desc')->getOne();

                            $max_balance = $last_true[$user_id] = $balance_amounts['balance'];
                        }

                        //如果当前是提现,则查余额是否足够
                        if($userAmount['type'] == 2){
                            //足够则继续
                            if($max_balance + $userAmount['amount'] > 0.00001){

                            } else {//不够,则记录再返回
                                $user_model->edit(['id' => $user_id, 'check_status' => 6], ['id' => $user_id]); //表示提现不够
                                $error_amount_num[$user_id] ++;
                                $dbh->commit();
                                return;
//                                $res = $this->review_withdraw($userAmount['key_id'], $user_id, $max_balance);
//                                if(!$res){
//                                    $user_model->edit(['id' => $user_id, 'check_status' => 6], ['id' => $user_id]); //表示提现处理失败
//                                    $dbh->rollBack();
//                                    return;
//                                }
                            }
                        }

                        $change_keys[$key] = 1; //加入到唯一标志中

                        $last_true[$user_id] = $max_balance + $userAmount['amount']; //真实的余额

                        //修改账变的变动后余额
                        $user_amount_model->edit(['balance' => $last_true[$user_id]], ['id' => $userAmount['id'], 'user_id' => $user_id]);  //------------

                    }
                }

                //修改用户余额
                $user_model->edit(['balance' => $last_true[$user_id]], ['id' => $user_id]);

            }

            $user_model->edit(['id' => $user_id, 'check_status' => 5], ['id' => $user_id]); //处理成功
            $dbh->commit();
        } catch (Exception $e) {
            $dbh->rollBack();
            // $user_model->edit(['id' => $user_id, 'check_status' => 4], ['id' => $user_id]); //表示处理失败
            Log::logException($e, 'checkAmount');
        }

        //  echo '$liuxia';
        // echo $liuxia;
        echo '$now_balances';
        print_r($now_balances);
        echo '$last_true';
        print_r($last_true);
        echo '$error_amount_num';
        print_r($error_amount_num);
        // echo '$change_amount_num';
        // print_r($change_amount_num);
        // echo '$change_keys';
        //print_r($change_keys);

    }

    public function review_withdraw($id, $user, $max_balance)
    {
        $user_id = $user['id'];
        $status = 0;//驳回
        $reason = '联系产品经理';
        $user_withdraw_model = user_withdraw_model::getInstance();
        $userWithdraw = $user_withdraw_model->where(['id' => intval($id), 'status'=>2,  'user_id' => $user_id, 'del' => 0])->getOne();
        if (!$userWithdraw) {
            $msg = array(
                'user_id' => $user_id,
                'withdraw_id' => $id,
            );
            (user_log_model::getInstance())->addLog('提现表不存在', $msg);
            return false;
        }

        $data = [
            'id' => intval($id),
            'reason' => trim($reason),
            'review_time' => SYS_TIME,
            'operator' => 'svip',
            'status' => intval($status)
        ];

        $res = $user_withdraw_model->edit($data, ['status' => 2]);
        if (!$res) {
            $msg = array(
                'user_id' => $user_id,
                'withdraw_id' => $id,
            );
            (user_log_model::getInstance())->addLog('提现表编辑失败', $msg);
            return false;
        }
//$res=$user_model->changeBalance($userWithdraw['user_id'], $userWithdraw['apply_amount'], $userWithdraw['title'], '提现驳回', 2, $userWithdraw['id'],1,$userWithdraw['currency']);
        $userAmount = [
            'user_id' => $user['id'],
            'mode' => 1,
            'type' => 2,
            'title' => $userWithdraw['title'],
            'des' =>'提现驳回',
            'currency' => $userWithdraw['currency'],
            'amount' => $userWithdraw['apply_amount'],
            'balance' => $max_balance + $userWithdraw['apply_amount'],
            'key_id' => $userWithdraw['id'],
            'status' => $status
        ];
        user_amount_model::getInstance()->add($userAmount);

        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('联系产品经理', $data);
        /*********添加日志*********/
        return true;

    }

    public function checkAmount($user_id=0){
        return ; //有bug
        $beginTime = 1711720800;//SYS_TIME - 20 * 60 * 60 ;

        $last_true = []; //用户正确时候的 最后的余额

        //账变表
        $user_model = user_model::getInstance();
        $user_amount_model=user_amount_model::getInstance();

        $dbh = $user_model->begin();
        try {

            //查是否提现
            $one = $user_amount_model->where(['user_id' => $user_id, 'create_time' => ['>' => $beginTime], 'type' => 2])->getOne();
            if ($one) {//有提现
                $user_model->edit(['id' => $user_id, 'check_status' => 3], ['id' => $user_id]); //有提现
                $dbh->commit();
                return;
            }

            $list = $user_amount_model->where(['create_time' => ['>' => $beginTime], 'status' => 1, 'type' => ['!=' => 2]])
                ->where(['user_id' => $user_id])
                ->where(['currency'=>'USDT']) //后加的
                ->order('create_time desc')
                ->limit(10000)
                ->select();

            $change_balances = [];
            $now_balances = [];

            $change_amount_num = [];

            $change_keys = [];

            //echo count($list);

            $liuxia = 0;

            if ($list) {

                $user = $user_model->field('id,balance')->where(['id' => $user_id])->getOne();
                //  echo $user_id, ' balance ', $user['balance'], " <br>\r\n";
                $now_balances[$user_id] = $user['balance'];

                foreach ($list as $userAmount) {

                    $key = sprintf("%s:%s:%s", $userAmount['type'], $user_id, $userAmount['key_id']);

                    if (isset($change_keys[$key])) {//存在key,则有重复的
                        //修改账变状态-1
                        $user_amount_model->edit(['status' => -1], ['id' => $userAmount['id'], 'user_id' => $user_id]); //------------
                        $change_amount_num [$user_id]++;
                        continue;

                    } else {
                        $liuxia++;
                        if (isset($last_true[$user_id])) {
                            $max_balance = $last_true[$user_id];//最后一条正确的余额
                        } else {
                            //查该用户这个数据之前的最后10条里,变动后金额最大的作为用户余额
                            $balance_amounts = $user_amount_model->field('id,user_id,balance')
                                ->where(['id' => ['<' => $userAmount['id']], 'user_id' => $user_id])
                                ->where(['currency'=>'USDT']) //后加的
                                ->order('create_time desc')->getOne();

                            $max_balance = $last_true[$user_id] = $balance_amounts['balance'];
                        }
                        $change_keys[$key] = 1; //加入到唯一标志中

                        $last_true[$user_id] = $max_balance + $userAmount['amount']; //真实的余额

                        // echo  '$userAmount[id]', $userAmount['id'],  ' amount:',$userAmount['amount'],    ' $last_true[$user_id]:',"{$last_true[$user_id]}<br>\r\n";

                        //修改账变的变动后余额
                        $user_amount_model->edit(['balance' => $last_true[$user_id]], ['id' => $userAmount['id'], 'user_id' => $user_id]);  //------------

                    }
                }

                //修改用户余额
                $user_model->edit(['balance' => $last_true[$user_id]], ['id' => $user_id]);

            }

            $user_model->edit(['id' => $user_id, 'check_status' => 5], ['id' => $user_id]); //处理成功
            $dbh->commit();
        } catch (Exception $e) {
            $dbh->rollBack();
            $user_model->edit(['id' => $user_id, 'check_status' => 4], ['id' => $user_id]); //表示处理失败
            Log::logException($e, 'checkAmount');
        }

        //  echo '$liuxia';
        // echo $liuxia;
        echo '$now_balances';
        print_r($now_balances);
        echo '$last_true';
        print_r($last_true);

    }

    /**
     * 获取列表  /main/demo/getList
     */
    public function getList($status = '',$search_key = '', $search_val = '', $limit = 15, $page = 1)
    {
        $where = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status']['>='] = 0;
        }
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'title') {
                $where['title'] = ['LIKE' => '%' . $search_val . '%'];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
            }
        }
        $demo_model = demo_model::getInstance();
        $data = $demo_model->where($where)
            ->order('sort DESC,id ASC')
            ->limit($limit, $page)
            ->getListInfo();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function getInfo()
    {
        $demo_model = demo_model::getInstance();
        $info = $demo_model->where(['status' => 1])->getOne();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    //新增
    public function add($title = '', $img = '', $sort = 0)
    {
        $demo_model = demo_model::getInstance();
        $data = [
            'title' => trim($title),
            'img' => trim($img),
            'sort' => intval($sort),
        ];
        $data['id'] = $demo_model->add($data);
        $this->GlobalService->json(['code' => 1, 'msg' => '新增成功', 'info' => $data]);
    }

    //编辑
    public function edit($id, $title, $img, $sort, $status)
    {
        $demo_model = demo_model::getInstance();
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'img' => trim($img),
            'sort' => intval($sort),
            'status' => intval($status)
        ];
        $res = $demo_model->edit($data);
        if (!$res) {
            $this->GlobalService->json(['code' => -2, 'msg' => '编辑失败']);
            return;
        }
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('Demo编辑', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '编辑成功']);
    }

}
