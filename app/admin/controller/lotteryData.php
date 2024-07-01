<?php
/**
 *
 */

namespace admin\controller;

use admin\classes\base;
use model\lottery_data_model;
use model\user_log_model;

class lotteryData extends base
{
    public function getList($lottery_id='',$open_expect='',$page = 1, $limit = 15)
    {
        $where = ['status' => 1, 'open_time' => ['>' => time() + 60*5*4]];
        if ($open_expect !== '') {
            $where['open_expect'] = ['LIKE' => '%' . $open_expect . '%'];
        }
        if($lottery_id!==''){
            $where['lottery_id'] = intval($lottery_id);
        }
        $where['lottery_id'] = 4;
        $lottery_data_model = lottery_data_model::getInstance();
        $data = $lottery_data_model->with(['lottery'=>'id,name'])
            ->where($where)
            ->order('open_time ASC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $openCode = explode(',', $v['open_code']);
            $v['zh'] = array_sum($openCode);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function getHistoryList($lottery_id='',$open_expect='',$date_time = [],$page = 1, $limit = 15)
    {
        $where = ['status' => 1,'open_time'=>['<='=>SYS_TIME]];
        if ($date_time) {
            $where['open_time']['>='] = strtotime($date_time[0]);
            $where['open_time']['<='] = strtotime($date_time[1]);
        }
        if ($open_expect !== '') {
            $where['open_expect'] = ['LIKE' => '%' . $open_expect . '%'];
        }
        if($lottery_id!==''){
            $where['lottery_id'] = intval($lottery_id);
        }
        $where['lottery_id'] = 4;
        $lottery_data_model = lottery_data_model::getInstance();
        $data = $lottery_data_model->with(['lottery'=>'id,name,class_name'])
            ->where($where)
            ->order('open_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $openCode = explode(',', $v['open_code']);
            $v['zh'] = array_sum($openCode);
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function setLottery($id = '', $open_code = '')
    {
        if (!$open_code) {
            $this->GlobalService->json(['code' => -2, 'msg' => '开奖号码不能为空']);
        }
        $openCode = explode(',', $open_code);
        if ($openCode[0] < 0 || $openCode[0] > 9) {
            $this->GlobalService->json(['code' => -2, 'msg' => '开奖号码格式错误']);
        }
        if ($openCode[1] < 0 || $openCode[1] > 9) {
            $this->GlobalService->json(['code' => -2, 'msg' => '开奖号码格式错误']);
        }
        if ($openCode[2] < 0 || $openCode[2] > 9) {
            $this->GlobalService->json(['code' => -2, 'msg' => '开奖号码格式错误']);
        }
        $openCode = implode(',', [$openCode[0], $openCode[1], $openCode[2]]);
        $lottery_data_model = lottery_data_model::getInstance();
        $data=['id' => intval($id), 'open_code' => $openCode];
        $res = $lottery_data_model->edit($data, ['open_time' => ['>' => SYS_TIME]]);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('修改开奖结果', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败，彩种已开奖']);
    }

//    public function del($id)
//    {
//        $user_bank_model = user_bank_model::getInstance();
//        $res = $user_bank_model->delById($id);
//        $this->GlobalService->json($res);
//    }

}
