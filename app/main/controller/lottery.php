<?php
/**
 *彩种
 */

namespace main\controller;

use main\classes\base;
use model\lottery_data_model;
use model\lottery_group_model;
use model\lottery_model;
use model\lottery_room_model;

class lottery extends base
{
    /**
     * /main/lottery/getList
     */
    public function getList()
    {
        $lottery_model = lottery_model::getInstance();
        $list = $lottery_model->where(['status'=>1])->order('sort DESC,id ASC')->limit(-1)->select();
        foreach ($list as $k => $v) {
            $v['banner'] = json_decode($v['banner'],true);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    public function getInfo($id)
    {
        $lottery_model = lottery_model::getInstance();
        $info = $lottery_model->where(['id' => intval($id)])->limit(-1)->getOne();
        $lottery_room_model = lottery_room_model::getInstance();
        $info['lotteryRoomList'] = $lottery_room_model->where(['lottery_id' => $info['id'], 'status' => 1])->select();
        foreach ($info['lotteryRoomList'] as $k => $v) {
            $v['name'] = $this->GlobalService->translate($v['name']);
            $info['lotteryRoomList'][$k] = $v;
        }
        $info['banner'] = json_decode($info['banner'], true);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    //获取房间详情
    public function getRoomInfo($id)
    {
        $lottery_room_model = lottery_room_model::getInstance();
        $info = $lottery_room_model->with(['lottery' => 'id,name,description,class_name,interval_time,stop_time,status'])
            ->where(['id' => intval($id)])->getOne();
        if (!$info) {
            $this->GlobalService->json(['code' => -2, 'msg' => '房间不存在']);
        }
        $info['quickList'] = explode('|', $info['quick_list']);
        $info['lottery']['description'] = $this->GlobalService->translate($info['lottery']['description'],1);
        $info['name'] = $this->GlobalService->translate($info['name']);
        $lottery_group_model = lottery_group_model::getInstance();
        $info['lotteryGroupList'] = $lottery_group_model->getDataInfo($info['lottery_id'], $info['id']);
        //获得下一期期号
        $res = call_user_func('\\service\\lottery\\' . $info['lottery']['class_name'] . '::getNextExpect', $info['lottery']);
        if ($res['code'] == 1) {
            $info['next'] = $res['next'];
        } else {
            $info['next'] = (object)[];
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    /**
     * 获取彩票信息
     */
    public function getDataList($id = 0)
    {
        $lottery_model = lottery_model::getInstance();
        $lottery = $lottery_model->where(['id' => intval($id)])->getOne();
        if (!$lottery) {
            $this->GlobalService->json(['code' => -2, 'msg' => '彩种不存在']);
        }
        //获取最新一期
        $lottery_data_model = lottery_data_model::getInstance();
        $lotteryDataList = $lottery_data_model
            ->where(['lottery_id' => $lottery['id'], 'open_time' => ['<' => SYS_TIME], 'status' => 1])
            ->order('open_time DESC')
            ->limit(10)
            ->select();
        //获得下一期期号
        $res = call_user_func('\\service\\lottery\\' . $lottery['class_name'] . '::getNextExpect', $lottery);
        if ($res['code'] == 1) {
            $lottery['next'] = $res['next'];
        } else {
            $lottery['next'] = (object)[];
        }
        unset($lottery['class_name']);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'lottery' => $lottery, 'lotteryDataList' => $lotteryDataList, 'nowTime' => SYS_TIME]);
    }


}
