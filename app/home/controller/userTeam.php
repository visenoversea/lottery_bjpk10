<?php
/**
 *申请团队
 */

namespace home\controller;

use home\classes\base;
use model\config_model;
use model\level_model;
use model\user_model;
use model\user_quantify_model;
use model\user_rebate_model;
use model\user_profit_model;
use model\user_team_model;
use service\RedisService;
use service\WebSocketService;

class userTeam extends base
{
    //添加用户实名
    public function add()
    {
        $user = $this->GlobalService->getUser();
        if($user['virtual'] == 0 ){
            //判断有没有申请条件
            $user_model = user_model::getInstance();
            $spreadNums = $user_model->where([
                'pid' => $user['pid'] . $user['id'] . ',',
                'type' => ['<' => 10],
                'level_id' => ['>' => 1],
                'status' => ['>=' => 0]
            ])->count();
            if ($spreadNums<3) {
                $this->GlobalService->json(['code' => -2, 'msg' => '至少邀请3各有效直属,才可以申请团队账号']);
            }
        }
        $data = [
            'user_id' => $user['id'],
            'reason' => '',
            'status' => 2,
        ];
        $user_team_model = user_team_model::getInstance();
        $userTeam = $user_team_model->where(['user_id' => $user['id'], 'del' => 0])->getOne();
        if ($userTeam) {
            if ($userTeam['status'] == 1) {
                $this->GlobalService->json(['code' => -2, 'msg' => '已成为团队账号']);
            } else if ($userTeam['status'] == 2) {
                $this->GlobalService->json(['code' => -2, 'msg' => '团队账号正在审核中，请耐心等待']);
            } else if ($userTeam['status'] == 0) {
                $data['id'] = $userTeam['id'];
            } else {
                $this->GlobalService->json(['code' => -2, 'msg' => '系统异常']);
            }
        }
        if(isset($data['id'])){
            $user_team_model->edit($data);
        }else{
            $user_team_model->add($data);
        }
        (WebSocketService::getInstance())->SendAdminTips('团队账号申请提示', '你有新的团队账号申请等待审核', 'editUserTeam', 'UserTeamList');
        $this->GlobalService->json(['code' => 1, 'msg' => '已提交等待审核']);
    }

    public function getInfo($day=0){
        $user = $this->GlobalService->getUser();
        $data = [];
        $data['spreadNums'] = 0;
        $data['validSpreadNums'] = 0;
        $data['totalProfit'] = 0;
        //注册人数
        $user_model = user_model::getInstance();
        $spreadNums = $user_model->whereRaw("find_in_set({$user['id']},`pid`)")->count();
        $data['spreadNums'] = $spreadNums;

        $validSpreadNums = $user_model->where([
            'pid' => ['LIKE' => $user['pid'] . $user['id'] . '%' ],
            'type' => ['<' => 10],
            'balance' => ['>=' => 50],
            'status' => ['>' => 0]
        ])->count();
        $data['validSpreadNums'] = $validSpreadNums;
        //团队返佣
        //今日收益
        $user_rebate_model = user_rebate_model::getInstance();
//        $data['todayAmount'] = $user_rebate_model->getSumAmount($user['id'], ['create_time' => ['>=' => $today]]);

        //总收益
        $whereTime = [];
        $day = intval($day);
        if($day > 0 ){
            if ($day > 60) $day = 60;
            $endTime = strtotime('today') + 86400;
            $startTime = $endTime - (86400 * $day);
            $whereTime['create_time'] =  ['>=' => $startTime, '<' => $endTime];
//            $whereTime['create_time'] =  ['>=' => date("Y-m-d H:i:s",$startTime), '<' => date("Y-m-d H:i:s",$endTime)];
        }
        $RedisService = RedisService::getInstance();
        $data['totalProfit'] = $user_rebate_model->getSumAmount($user['id'],$whereTime);
        $cacheKey = 'user_total_profit:' .$user['id'];
        $RedisService->setnx($cacheKey,$data['totalProfit'],5);
        $res = config_model::getInstance()->where(['id'=>['>=' => 100601]])->where(['id'=>['<='=>100603]])->select();
        $quantifyRebate = array_column($res,'v');
        foreach ($quantifyRebate as &$item){
            $item = str_replace("\"",'',$item);
            $item = intval($item * 100);
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data,'quantifyRebate'=>$quantifyRebate]);

        /*$where = [
            'pid' => ['LIKE' => $user['pid'] . $user['id'] . '%'],
            'layer' => $user['layer'] + 1,
            'type' => ['<' => 10],
            'status' => ['>=' => 0]
        ];
        $whereVaild = [
            'pid' => ['LIKE' => $user['pid'] . $user['id'] . '%'],
            'layer' => $user['layer'] + 1,
            'type' => ['<' => 10],
            'status' => ['>=' => 0],
            'recharge_amount' => ['>=' => 50],
        ];

        //1代人数
        $data['user1'] = $user_model->where($where)->count();
        $data['validUser1'] = $user_model->where($whereVaild)->count();
        //2代人数
        $where['layer']++;
        $whereVaild['layer']++;
        $data['user2'] = $user_model->where($where)->count();
        $data['validUser2'] = $user_model->where($whereVaild)->count();
        //3代人数
        $where['layer']++;
        $whereVaild['layer']++;
        $data['user3'] = $user_model->where($where)->count();
        $data['validUser3'] = $user_model->where($whereVaild)->count();*/

    }

    public function getInfoByLayer($layer=1 , $day=0){

        $layer = intval($layer);
        if(!is_numeric($layer) || $layer > 3 || $layer < 0 ) $layer = 1;
        $user = $this->GlobalService->getUser();
        $data = [];
        $data['layerProfit'] = 0.00;
        $data['layerProfitPercent'] = 0;
        $data['userCount'] = 0;
        $data['validUserCount'] = 0;
        $whereTime = [];
        $where = [
            'pid' => ['LIKE' => $user['pid'] . $user['id'] . '%' ],
            'layer' => $user['layer'] + $layer,
            'type' => ['<' => 10],
            'status' => ['>' => 0]
        ];

        $whereVaild = $where;
        $whereVaild['recharge_amount'] = ['>=' => 50];
        $user_model = user_model::getInstance();
        $user_rebate_model = user_rebate_model::getInstance();
        //人数
        $layerUsers = $user_model->field('id')->where($where)->select();
        $data['userCount'] = count($layerUsers);
        if(!$data['userCount']){
            $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data]);
        }
        $data['validUserCount'] = $user_model->where($whereVaild)->count();
        $layerUserIds = array_column($layerUsers,'id');
        $whereRebate = ['user_id'=>$user['id']];
        $layerUserIds = implode(',',$layerUserIds);
        $day = intval($day);
        if($day > 0 ){
            if ($day > 60) $day = 60;
            $endTime = strtotime('today') + 86400;
            $startTime = $endTime - (86400 * $day);
            $whereRebate['create_time'] = $whereTime['create_time'] =  ['>=' => $startTime, '<' => $endTime];
        }

        $RedisService = RedisService::getInstance();
        $cacheKey = 'user_total_profit:' .$user['id'];
        $totalProfit = $RedisService->get($cacheKey);
        if(!$totalProfit){
            $totalProfit = $user_rebate_model->getSumAmount($user['id'],$whereTime);
        }
        $res = $user_rebate_model->field('sum(amount) as layerProfit')
            ->where($whereRebate)
            ->whereRaw("rebate_id in ($layerUserIds)")
            ->getOne();
        $data['layerProfit'] = $res['layerProfit'] > 0 ? round($res['layerProfit'],2) : 0.00;
        if($data['layerProfit'] <= 0){
            $data['layerProfitPercent'] = 0;
        }else{
            $data['layerProfitPercent'] = number_format($data['layerProfit']/$totalProfit, 2) * 100;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data]);

    }

    public function getInfoDetailByLayer($layer=1,$page=1,$limit=10){

        $layer = intval($layer);
        if(!is_numeric($layer) || $layer > 3 || $layer < 0 ) $layer = 1;
        $user = $this->GlobalService->getUser();
//        $data = [];
//        $data['layerProfit'] = 0;
//        $data['layerBalance'] = 0;
//        $data['userCount'] = 0;
//        $data['quantifyChances'] = 0;
//        $data['quantifyTimes'] = 0;
        $where = [
            'pid' => ['LIKE' => $user['pid'] . $user['id'] . '%'],
            'layer' => $user['layer'] + $layer,
            'type' => ['<' => 10],
            'status' => ['>' => 0]
        ];
        $startTime = strtotime('today');
        $levelConfig = level_model::getInstance()->field('id,nums')->select();
        $lcs = [];
        foreach ($levelConfig as $config){
            $lcs[$config['id']] = $config['nums'];
        }
        $user_model = user_model::getInstance();
        $user_rebate_model = user_rebate_model::getInstance();
        $user_profit_model = user_profit_model::getInstance();
        $userQuantifyModel = user_quantify_model::getInstance();
        //人数
        $total = $user_model->where($where)->count();
        $users = $user_model->field('id,pid,level_id,user_name,nick_name,area_code,mobile,balance,create_time')->where($where)->limit($limit,$page)->select();
        foreach ($users as &$row){
            $where['pid'] = ['LIKE' => $row['pid'] . $row['id'] . '%'];
            unset($where['layer']);
            $row['teamNums'] = $user_model->where($where)->count();

            $where['balance'] = ['>=' => 50];//有效人数
            $row['teamValidNums'] = $user_model->where($where)->count();
            $row['mobile'] = strlen($row['mobile']) > 6 ? str_replace(substr($row['mobile'], 3, 3), '***', $row['mobile']) : '820***'. rand(10,1000);
            //收益
            $res = $user_profit_model->field('SUM(amount) AS profit')->where(['user_id'=>$row['id'],'status'=>['>'=>0]])->getOne();
            $row['profit'] = $res['profit'] ? round($res['profit'],2) : '0.00';
            //可量化次数
            $row['quantifyChances'] = $lcs[$row['level_id']];
            //已量化次数
            $row['quantifyTimes'] = $userQuantifyModel->where(['user_id'=>$row['id'],'create_time'=>['>='=>$startTime]])->count();
        }

        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $users,'total'=>$total]);

    }
}
