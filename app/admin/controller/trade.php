<?php
/**
 *交易相关
 */

namespace admin\controller;

use admin\classes\base;
use model\config_model;
use model\trade_model;
use model\user_log_model;
use service\GoogleAuthenticatorService;

class trade extends base
{
    public function getList($type = '', $mode = '', $title = '', $status = '', $page = 1, $limit = 15)
    {
        $where = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        if ($type !== '') {
            $where['type'] = intval($type);
        }
        if ($mode !== '') {
            $where['mode'] = intval($mode);
        }
        if ($title !== '') {
            $where['title'] = ['LIKE' => '%' . trim($title) . '%'];
        }
        $trade_model = trade_model::getInstance();
        $data = $trade_model->where($where)
            ->order('sort DESC,modify_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k=>$v){
            $v['info']=json_decode($v['info'],true);
            $data['list'][$k]=$v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function edit($id, $authCode, $title, $icon, $info, $min=1, $max=-1, $remark='', $sort=0, $status = 1)
    {
        $adminUser = $this->GlobalService->getUser();
        $config_model = config_model::getInstance();
        $GoogleAuth = $config_model->getConfig(1, 'GoogleAuth');
        if ($adminUser['type'] !== 100 && $GoogleAuth) {
            //需要验证谷歌授权
            $GoogleAuthenticatorService = GoogleAuthenticatorService::getInstance();
            if ($authCode !== $GoogleAuthenticatorService->getCode($adminUser['secret'])) {
                $this->GlobalService->json(['code' => -2, 'msg' => '谷歌身份验证失败']);
            }
        }
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'icon' => trim($icon),
            'info' => $info,
            'min' => intval($min),
            'max' => intval($max),
            'sort' => intval($sort),
            'remark' => trim($remark),
            'status' => intval($status)
        ];
        $trade_model = trade_model::getInstance();
        $res = $trade_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $data['info']=json_encode($info,JSON_UNESCAPED_UNICODE);
        $res = $trade_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑交易信息', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        if ($id < 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '无法删除']);
        }
        $trade_model = trade_model::getInstance();
        $res = $trade_model->delById($id);
        $this->GlobalService->json($res);
    }

}
