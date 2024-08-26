<?php
/**
 *用户返佣
 */

namespace home\controller;

use asura\Common;
use asura\Illuminate\DB;
use home\classes\base;
use model\config_model;
use model\level_model;
use model\user_bet_model;
use model\user_model;
use model\user_rebate_model;

class userRebate extends base
{
    //获取推广传播的信息
    public function getSpreadInfo()
    {
        $user = $this->GlobalService->getUser();
        $user_model = user_model::getInstance();
        $where = [
            'pid' => ['LIKE' => $user['pid'] . $user['id'] . '%'],
            'layer' => $user['layer'] + 1,
            'type' => ['<' => 10],
            'status' => ['>=' => 0]
        ];
        $data = [];
        //1代人数
        $data['agent1'] = $user_model->where($where)->count();
        //2代人数
        $where['layer']++;
        $data['agent2'] = $user_model->where($where)->count();
        //3代人数
        $where['layer']++;
        $data['agent3'] = $user_model->where($where)->count();
        //总人数
        $data['agentNums'] = $data['agent1'] + $data['agent2'] + $data['agent3'];
        $user_rebate_model = user_rebate_model::getInstance();
        //总收益
        $data['totalAmount'] = $user_rebate_model->getSumAmount($user['id']);
        //今日收益
        $data['todayAmount'] = $user_rebate_model->getSumAmount($user['id'], ['create_time' => ['>=' => strtotime('today')]]);
        //今日新增注册
        $where['layer'] = ['>' => $user['layer'], '<=' => $user['layer'] + 3];
        $where['create_time'] = ['>=' => strtotime('today')];
        $data['todayRegNums'] = $user_model->where($where)->count();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data]);
    }

    public function getTeamInfo($day = 1)
    {
        //注册会员  有效会员  团队收入
        $user = $this->GlobalService->getUser();
        $user_model = user_model::getInstance();
        if ($day != '') {
            $time = strtotime('today') - ($day - 1) * 86400;
        } else {
            $time = 0;
        }
        $where = [
            'pid' => ['LIKE' => $user['pid'] . $user['id'] . '%'],
            'layer' => ['<=' => $user['layer'] + 3],
            'type' => ['<' => 10],
            'status' => ['>=' => 0]
        ];
        $data = [];
        //总人数
        $data['totalAgentNums'] = $user_model->where($where)->count();
        if($time>0){
            $where['create_time']=['>=' => $time];
        }
        //3代以内注册会员
        $data['agentNums'] = $user_model->where($where)->count();
        //有效会员
        $where['recharge_amount'] = ['>' => 0];
        $data['agentValidNums'] = $user_model->where($where)->count();
        $user_rebate_model = user_rebate_model::getInstance();
        //总收益
        if($time>0){
            $rebateWhere=['create_time' => ['>=' => $time]];
        }else{
            $rebateWhere=[];
        }
        $data['totalAmount'] = $user_rebate_model->getSumAmount($user['id'], $rebateWhere);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data]);
    }

    public function getLayerInfo($day = 1)
    {
        $user_rebate_model = user_rebate_model::getInstance();
        $config_model = config_model::getInstance();
        $rebateConfig = $config_model->getConfigData(8);
        //注册会员  有效会员  团队收入
        $user = $this->GlobalService->getUser();
        $user_model = user_model::getInstance();
        if ($day != '') {
            $time = strtotime('today') - ($day - 1) * 86400;
        } else {
            $time = 0;
        }
        $where = [
            'pid' => ['LIKE' => $user['pid'] . $user['id'] . '%'],
            'layer' => $user['layer'],
            'type' => ['<' => 10],
            'status' => ['>=' => 0]
        ];
        if ($time > 0) {
//            $where['create_time'] = ['>=' => $time];
            $userRebateWhere = ['create_time' => ['>=' => $time]];
        } else {
            $userRebateWhere = [];
        }
        $data = [
            'betRebate1' => $rebateConfig['betRebate1'],
            'betRebate2' => $rebateConfig['betRebate2'],
            'betRebate3' => $rebateConfig['betRebate3'],
        ];
        //3代以内注册会员
        $where['balance'] = ['>' => 0];
        //1代注册会员
        $where['layer']++;
        $data['agent1'] = $user_model->where($where)->count();
//        $where['recharge_amount'] = ['>=' => 30];
        $data['agentValid1'] = $user_model->where($where)->count();
        $data['agentAmount1'] = $user_rebate_model->getSumAmount($user['id'], $userRebateWhere, ['layer' => $where['layer']]);
        //2代人数
        $where['layer']++;
        $data['agent2'] = $user_model->where($where)->count();
//        $where['recharge_amount'] = ['>=' => 30];
        $data['agentValid2'] = $user_model->where($where)->count();
        $data['agentAmount2'] = $user_rebate_model->getSumAmount($user['id'], $userRebateWhere, ['layer' => $where['layer']]);
        //3代人数
        $where['layer']++;
        $data['agent3'] = $user_model->where($where)->count();
//        $where['recharge_amount'] = ['>=' => 30];
        $data['agentValid3'] = $user_model->where($where)->count();
        $data['agentAmount3'] = $user_rebate_model->getSumAmount($user['id'], $userRebateWhere, ['layer' => $where['layer']]);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data]);
    }

    //获取列表
    public function getUserList($layer = 1, $day = '', $page = 1, $limit = 20)
    {
        $user = $this->GlobalService->getUser();
        $user_model = user_model::getInstance();
        $list = $user_model->field('id,level_id,user_name,email,create_time')
            ->where([
                'pid' => ['LIKE' => $user['pid'] . $user['id'] . '%'],
                'layer' => $user['layer'] + $layer,
                'type' => ['<' => 10],
                'status' => ['>=' => 0]
            ])->order('level_id DESC,id DESC')->limit($limit, $page)->select();
        $user_rebate_model = user_rebate_model::getInstance();
        $where = [];
        if ($day != '') {
            $where['create_time'] = ['>=' => strtotime("-{$day} day")];
        }
        $level_model = level_model::getInstance();
        foreach ($list as $k => $v) {
            if (!empty($v['email'])) {
                //加密
                $v['account'] = substr($v['email'], 0, 3) . '***' . strrchr($v['email'], '@');
            } else {
                $v['account'] = substr($v['user_name'], 0, 3) . '***' . substr($v['user_name'], -2);
            }
            $v['level'] = $level_model->getData($v['level_id'],[],'id,title');
            unset($v['email']);
            unset($v['user_name']);
            $v['layer'] = $layer;
            $v['amount'] = $user_rebate_model->getRebateAmount($user['id'], $v['id'], $where);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    //获取列表
    public function getList($day = '', $page = 1, $limit = 20)
    {
        $user = $this->GlobalService->getUser();
        $where = ['user_id' => $user['id'], 'status' => 1];
        $timeWhere = [];
        if ($day != '') {
            $dayTime = strtotime("-{$day} day",strtotime('today')+86400);
            $timeWhere['create_time'] = ['>=' => $dayTime];
            $where['create_time'] = ['>=' => $dayTime];
        }
        $user_rebate_model = user_rebate_model::getInstance();
        $list = $user_rebate_model->with(['rebate' => 'id,user_name,email,layer'])
            ->where($where)
            ->order('create_time DESC')
            ->limit($limit, $page)->select();
        foreach ($list as $k => $v) {
            if (!empty($v['rebate']['email'])) {
                //加密
                $v['rebate']['account'] = substr($v['rebate']['email'], 0, 3) . '***' . strrchr($v['rebate']['email'], '@');
            } else {
                $v['rebate']['account'] = substr($v['rebate']['user_name'], 0, 3) . '***' . substr($v['rebate']['user_name'], -2);
            }
            unset($v['rebate']['email']);
            unset($v['rebate']['user_name']);
            $v['layer'] = $v['rebate']['layer'] - $user['layer'];
            $v['amount'] = Common::formatAmount($v['amount']);
            $list[$k] = $v;
        }
        $todayAmount = $user_rebate_model->getSumAmount($user['id'], $timeWhere);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list, 'todayAmount' => $todayAmount]);
    }

    //获取团队投注流水和返佣
    public function getTeamBetInfo($layer = 1, $page = 1, $limit = 20)
    {
        //返回   用户名、等级信息、返佣金额、返佣总金额、投注流水、投注总流水
        //筛选条件： 团队层级
        $user = $this->GlobalService->getUser();
        $user_model = user_model::getInstance();
        $where = [
            'pid' => ['LIKE' => $user['pid'] . $user['id'] . '%'],
            'layer' => $user['layer']+$layer,
            'type' => ['<' => 10],
            'status' => ['>=' => 0]
        ];
        $where['balance'] = ['>' => 0];

        $list = $user_model->field('id,level_id,user_name,email,layer,create_time')
            ->where($where)
            ->order('create_time DESC')
            ->limit($limit, $page)->select();;
        $level_model = level_model::getInstance();
        $user_rebate_model = user_rebate_model::getInstance();
        $data=[
            'totalBet'=>0,//投注总流水
            'totalRebate'=>0,//返佣总金额
            'list'=>[]
        ];
        if(!array($list)){
            $this->GlobalService->json(['code' => 1, 'msg' => '暂无数据', 'data' => $data]);
        }
        foreach ($list as $k => $v) {
            if (!empty($v['user_name'])) {
                //加密
                $v['account'] = substr($v['user_name'], 0, 3) . '***' . substr($v['user_name'], -2);
            } else {
                $v['account'] = substr($v['email'], 0, 3) . '***' . strrchr($v['email'], '@');
            }
            $v['level'] = $level_model->getData($v['level_id'],[],'id,title');
            unset($v['user_name']);
            unset($v['email']);
            $v['rebateAmountSum'] = $user_rebate_model->getRebateAmount($user['id'], $v['id']);//返佣
            $betAmount = DB::table('user_bet')->where(
                          ['user_id'=>$v['id']]
                           )->sum('bet_amount_mop');
            $v['betAmountSum'] = $betAmount ? Common::formatAmount($betAmount,2) : "0.00";
            $list[$k] = $v;
            $data['totalBet']+=$v['rebateAmountSum'];
            $data['totalRebate']+=$v['betAmountSum'];
        }
        $data['list']=$list;
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'data' => $data]);
    }



}
