<?php
/**
 *任务中心
 */

namespace home\controller;

use asura\Log;
use home\classes\base;
use model\level_model;
use model\task_model;
use model\user_lottery_model;
use model\user_model;
use model\user_task_model;
use model\user_task_advance_model;
use Exception;
use service\RedisService;

class task extends base
{

    /**
     * 获取充值列表信息
     * /home/task/getList
     */
    public function getList()
    {
        $user = $this->GlobalService->getUser();
        $task_model = task_model::getInstance();
        $list = $task_model->where(['status' => 1])
            ->order('sort DESC,id ASC')->limit(200)->select();
        $list1 = [];//可领取奖励
        $list2 = [];//未完成任务
        $list3 = [];//已领取奖励
        $user_task_model = user_task_model::getInstance();
        foreach ($list as $v) {
            $v['title'] = $this->GlobalService->translate($v['title']);
            $v['des'] = str_replace(['{{任务条件}}'], [$v['condition']], $v['des']);
            $v['des'] = str_replace(['{{奖励金额}}'], [$v['amount']], $v['des']);
            $v['des'] = str_replace(['{{抽奖次数}}'], [$v['lottery_nums']], $v['des']);
            $v['des'] = $this->GlobalService->translate($v['des']);
            $v['finishNums'] = $user_task_model->getFinishNums($user['id'], $v['id']);
            //查询有没有可以领取奖励的任务
            $userTask = $user_task_model->field('id')
                ->where(['user_id' => $user['id'], 'task_id' => $v['id'], 'status' => 2])
                ->getOne();
            if ($userTask) {
                $v['userTaskId'] = $userTask['id'];
                $list1[] = $v;
            } else {
                $v['userTaskId'] = 0;
                if ($v['finishNums'] < $v['nums']) {
                    //任务未做完
                    if($v['id']==1){
                        //注册奖励未完成忽略
                        continue;
                    } else if ($v['id'] == 3) {
                        //首充奖励
                        if ($user['recharge_time'] > 0) {
                            //无法继续做这个任务忽略
                            continue;
                        }
                    }
                    $list2[] = $v;
                } else {
                    //任务已经做完
                    $list3[] = $v;
                }
            }
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => array_merge($list1, $list2, $list3)]);
    }

    //结束任务
    public function endTask($userTaskId)
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        $user_task_model = user_task_model::getInstance();
        $userTask = $user_task_model->where(['id' => intval($userTaskId), 'user_id' => $user['id']])->getOne();
        if (!$userTask) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的任务']);
        }
        if ($userTask['status'] != 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已领取奖励']);
        }
        $user_model = user_model::getInstance();
        $dbh = $user_model->begin();
        try {
            $res = $user_task_model->edit(['id' => $userTask['id'], 'status' => 1], ['status' => 2]);
            if (!$res) {
                $dbh->rollBack();
                $this->GlobalService->json(['code' => -2, 'msg' => '已领取奖励']);
            }
            if ($userTask['amount'] > 0) {
                $user_model->changeBalance($userTask['user_id'], $userTask['amount'], 'USDT', $userTask['title'], 12, $userTask['id']);
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
            if($userTask['lottery_nums']>0){
                $user_lottery_model = user_lottery_model::getInstance();
                for ($i = 0; $i < $userTask['lottery_nums']; ++$i) {
                    $user_lottery_model->add([
                        'user_id' => intval($userTask['user_id']),
                        'lottery_id' => 0,
                        'status' => 2
                    ]);
                }
            }
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '领取成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            Log::logException($e, 'add2Recharge');
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误,请重试', 'err' => $e->getMessage()]);
        }
    }

    //接受任务
    public function reviceTask($id){
        $taskIds = [200];
        if(!in_array($id,$taskIds)){
            $this->GlobalService->json(['code' => -2, 'msg' => '领取失败!']);
        }

        $task = task_model::getInstance()->where(['id'=>$id])->getOne();
        if(!$task){
            $this->GlobalService->json(['code' => -2, 'msg' => '任务不存在!']);
        }
        $user = $this->GlobalService->getUser();
        $user_task = user_task_model::getInstance();
        $set = $user_task->where(['user_id'=>$user['id'],'task_id'=>$id])->getOne();
        if($set){
            $this->GlobalService->json(['code' => -2, 'msg' => '任务已接收!']);
        }
        $data = ['user_id'=>$user['id'],'task_id'=>$id,'title'=>'接受任务','remark'=>'接受任务','status'=>1];
        $user_task->add($data);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
    }

    //宝箱签到
    public function chestSign(){
        /*        $config = [
            ['start'=>1,'end'=>10,'min'=>1,'max'=>2.5],
            ['start'=>11,'end'=>365,'min'=>0.25,'max'=>0.75],
        ];*/
        $redis = RedisService::getInstance();
        $user = $this->GlobalService->getUser();
        $bingKey = 'CHEST_SIGN_' . $user['id'];
        $set = $redis->setnx($bingKey,1,3);
        if(!$set){
            $this->GlobalService->json(['code' => -2, 'msg' => '请勿重复签到!']);
        }
        $user_task_advance_model = user_task_advance_model::getInstance();
        $date = date('Y-m-d',SYS_TIME);
        $sign = $user_task_advance_model->where(['user_id'=>$user['id'],'date'=>$date,'task_id'=>200])->getOne();
        if($sign){
            $key = 'chestSignToday:' . $user['id'];
            $leftTime = strtotime('today') + 86400 - SYS_TIME ;
            RedisService::getInstance()->setnx($key,1,$leftTime);
            $this->GlobalService->json(['code' => -2, 'msg' => '今天已签到!']);
        }
        //获取签到配置
        $defaultConfig = [
            [1,10,1,2.5],
            [11,365,0.25,0.75],
        ];
        $task = task_model::getInstance()->where(['id'=>200])->getOne();
        if(!$task){
            $this->GlobalService->json(['code' => -2, 'msg' => '获取活动失败!']);
        }
        $taskConfig = json_decode($task['other_info'],true);
        if(!$taskConfig){
            $this->GlobalService->json(['code' => -2, 'msg' => '获取活动配置失败!']);
        }
        $count = $user_task_advance_model->where(['user_id'=>$user['id']])->count();
        $cursor = $count + 1;
        if($cursor <= 10){
            $config = $taskConfig[0];
        }else{
            $config = $taskConfig[1];
        }
        //随机金额
        //首页签到后台设置例如区间值10-30usdt 之间保留2位小数点
        // 1-10次签到 区间值  可以设置 例如 1-5之间  10次以后都是例如0.31  0.78
        $min = $config[2];
        $max = $config[3];
        $reward = mt_rand($min * 10000, $max * 10000) / 10000;
        $month = date('m');
        $data = ['task_id'=>200,'user_id'=>$user['id'],'amount'=>$reward,'type'=>200,'date'=>$date,'month'=>$month];
        $dbh = $user_task_advance_model->begin();
        try{
            $user_task_advance_model->add($data);
            $user_model = user_model::getInstance();
            $user_info = $user_model->field('chest_amount')->where(['id'=>$user['id']])->getOne();
            $chest_amount = bcadd($user_info['chest_amount'] , $reward,4);
            user_model::getInstance()->edit(['chest_amount'=>$chest_amount],['id'=>$user['id']]);
            $dbh->commit();
            $key = 'chestSignToday:' . $user['id'];
            $leftTime = strtotime('today') + 86400 - SYS_TIME ;
            RedisService::getInstance()->setnx($key,1,$leftTime);
        }catch (\Exception $e){
            $dbh->rollBack();
//            throw  $e;
            Log::logException($e, 'hometask');
            $this->GlobalService->json(['code' => -2, 'msg' => '签到失败','info'=>[]]);
        }

        $this->GlobalService->json(['code' => 1, 'msg' => '签到成功!','info'=>$data]);

    }

    //宝箱签到信息
    public function chestSignInfo($year,$month){
        if(!(int)$year){
            $year = date("Y");
        }
        if(!(int)$month){
            $month = date("m");
        }
        $nextMonth = $month == 12 ? 01 : $month+1 ;
        $startDate = "$year-$month-01";
        $endDate = "$year-$nextMonth-01";
        $user = $this->GlobalService->getUser();
        $user_task_advance_model = user_task_advance_model::getInstance();
        $data = [];
        //累计签到金额,
        $res = $user_task_advance_model->field('sum(amount) as totalAmount')->where(['user_id'=>$user['id'],'task_id'=>200])->getOne();
        $data['totalAmount'] = $res['totalAmount'] ? $res['totalAmount'] : 0.00 ;
        $data['monthSignList'] = $user_task_advance_model->field('amount,date,create_time')
            ->where(['user_id'=>$user['id'],'task_id'=>200,'month'=>$month])
            ->where(['date'=>['>='=>$startDate,'<'=>$endDate]])
            ->select();
        foreach ($data['monthSignList'] as &$v){
            $v['day'] = date('d',$v['create_time']);
        }
        $key = 'chestSignToday:' . $user['id'];
        $set = RedisService::getInstance()->getDirect($key);
        $data['todaySign'] = $set ? 1 : 0 ;
        $data['goalAmount'] = 200 ;
        $this->GlobalService->json(['code' => 1, 'msg' => '成功!','info'=>$data]);

    }

}
