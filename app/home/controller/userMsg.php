<?php
/**
 *站内信
 */

namespace home\controller;

use home\classes\base;
use model\user_msg_model;

class userMsg extends base
{
    /**
     * 获取列表
     * /main/userMsg/getList
     */
    public function getList($limit = 15, $page = 1)
    {
        if ($limit > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过100条数据']);
        }
        $user = $this->GlobalService->getUser();
        $user_msg_model = user_msg_model::getInstance();
        $list = $user_msg_model->where(['user_id' => $user['id'], 'create_time' => ['<=' => SYS_TIME], 'status' => 1])
            ->order('create_time DESC')->limit($limit, $page)->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    //获取信息
    public function getInfo($id)
    {
        $user = $this->GlobalService->getUser();
        $user_msg_model = user_msg_model::getInstance();
        $info = $user_msg_model->where(['id' => intval($id), 'user_id' => $user['id']])->getOne() ?: (object)[];
        if(!$info['is_read']){
            $user_msg_model->edit(['id'=>$info['id'],'is_read'=>1]);
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }

    //设置全部已读
    public function setAllRead()
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        $user_msg_model = user_msg_model::getInstance();
        $user_msg_model->edit(['is_read' => 1], ['is_read' => 0, 'user_id' => $user['id']]);
        $this->GlobalService->json(['code' => 1, 'msg' => '设置成功']);
    }

    public function getReadNums()
    {
        $user = $this->GlobalService->getUser();
        $user_msg_model = user_msg_model::getInstance();
        $readNums = $user_msg_model->where(['user_id' => $user['id'], 'is_read' => 0, 'status' => 1])->count();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'readNums' => $readNums]);
    }

    public function del($id)
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        $user_msg_model = user_msg_model::getInstance();
        $res = $user_msg_model->delById($id, ['user_id' => $user['id']]);
        $this->GlobalService->json($res);
    }

    public function delAll()
    {
        if($this->systemUpgrade){
            $this->GlobalService->json(['code' => -2, 'msg' => '系统正在升级,请耐心等待几分钟']);
        }
        $user = $this->GlobalService->getUser();
        $user_msg_model = user_msg_model::getInstance();
        $user_msg_model->edit(['status' => -1], ['user_id' => $user['id'], 'status' => 1]);
        $this->GlobalService->json(['code' => 1, 'msg' => '删除成功']);
    }

}
