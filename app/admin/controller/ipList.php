<?php
/**
 * ip黑名单
 */

namespace admin\controller;

use admin\classes\base;
use asura\Verify;
use model\ip_list_model;
use model\user_model;

class IPList extends base
{

    public function getList($ip = '', $page = 1, $limit = 15)
    {
        $where = ['status'=>['>='=>0]];
        if ($ip !== '') {
            $where['ip'] = ['LIKE' => '%' . trim($ip) . '%'];
        }
        $ip_list_model = ip_list_model::getInstance();
        $data = $ip_list_model->where($where)
            ->order('create_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function add($ip = '', $type = 0)
    {
        $ip = trim($ip);
        if (empty($ip)) {
            $this->GlobalService->json(['code' => -2, 'msg' => 'IP不能为空']);
        }
        if (!Verify::isIp($ip)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '请填写正确的IP']);
        }
        $ip_list_model = ip_list_model::getInstance();
        $res = $ip_list_model->where(['type' => $type, 'ip' => $ip, 'status' => ['>=' => 0]])->isExist();
        if ($res) {
            $this->GlobalService->json(['code' => -2, 'msg' => 'IP已存在黑名单，无需重复添加']);
        }
        $ip_list_model->add(['type' => 0, 'ip' => $ip]);
        if ($type == 0) {
            //把黑名单ip挤出登录
            $user_model = user_model::getInstance();
            $user_model->edit(['auth' => '{}'], ['login_ip' => $ip]);
            $user_model->edit(['auth' => '{}'], ['create_ip' => $ip]);
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
    }

    public function del($id)
    {
        $ip_list_model = ip_list_model::getInstance();
        $res = $ip_list_model->delById($id);
        $this->GlobalService->json($res);
    }

}
