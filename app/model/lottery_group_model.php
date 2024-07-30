<?php
//

namespace model;

use asura\db\Model;
use service\GlobalService;

class lottery_group_model extends Model
{
    protected static $instance;

//    //表关联
//    public function demo(): array
//    {
//        return $this->belongsTo(demo_model::class, 'key_id');
//    }

    public function getDataInfo($lottery_id, $lottery_room_id): array
    {
        $list = $this->where(['lottery_id' => $lottery_id, 'lottery_room_id' => $lottery_room_id, 'status' => 1])
            ->order('sort DESC,id ASC')->limit(-1)->select();
        $lottery_played_model = lottery_played_model::getInstance();
        $GlobalService=GlobalService::getInstance();
        foreach ($list as &$v) {
            $v['name'] = $GlobalService->translate($v['name']);
            $lotteryPlayedList = $lottery_played_model->where(['lottery_id' => $lottery_id, 'lottery_group_id' => $v['id'], 'status' => 1,'lottery_room_id'=>$lottery_room_id])
                ->order('sort DESC,id ASC')->limit(-1)->select();
            foreach ($lotteryPlayedList as $key=>$val){
//                if(!is_numeric($val['name'])){
                    $val['name'] = $GlobalService->translate($val['name']);
                    $val['name2'] = $GlobalService->translate($v['name'].'-'.$val['name']);
//                }
                $lotteryPlayedList[$key] = $val;
            }
            $v['lotteryPlayedList'] = $lotteryPlayedList;
        }
        return $list;
    }

    //数据验证
    public function checkData($data): array
    {
        return ['code' => 1, 'msg' => '成功'];
    }

    //获取单条数据
    public function getData($id, $where = [], $field = '*')
    {
        $where['id'] = intval($id);
        return $this->field($field)->where($where)->getOne();
    }

    //新增
    public function add(array $data = []): int
    {
        $data['create_time'] = $data['modify_time'] = SYS_TIME;
        return $this->insert($data);
    }

    //编辑
    public function edit(array $data, array $where = [])
    {
        if (isset($data['id'])) {
            $where['id'] = intval($data['id']);
            unset($data['id']);
        }
        $data['modify_time'] = SYS_TIME;
        return $this->where($where)->update($data);
    }

    /**
     * 删除
     * @param $id
     * @param array $where
     * @return array
     */
    public function delById($id, array $where = []): array
    {
        $where['id'] = intval($id);
        $data = $this->where($where)->getOne();
        if (!$data) {
            return ['code' => -2, 'msg' => '未找到数据'];
        }
        $res = $this->edit(['status' => -1], $where);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
