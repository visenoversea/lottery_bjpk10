<?php
/**
 *域名
 */

namespace admin\controller;

use admin\classes\base;
use model\domain_model;
use model\user_log_model;

class domain extends base
{

    public function getList($host = '', $status = 1, $page = 1, $limit = 20)
    {
        $where = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        if ($host !== '') {
            $where['host'] = ['LIKE' => '%' . $host . '%'];
        }
        $domain_model = domain_model::getInstance();
        $data = $domain_model->where($where)
            ->order('sort DESC,id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function add($type, $host, $port, $sort = 0, $remark = '')
    {
        $data = [
            'type' => intval($type),
            'host' => trim($host),
            'port' => intval($port),
            'sort' => intval($sort),
            'remark' => trim($remark)
        ];
        $domain_model = domain_model::getInstance();
        $res = $domain_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $data['id'] = $domain_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增域名', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
    }

    public function edit($id, $type, $host, $port, $sort = 0, $remark = '', $status = 1)
    {
        $data = [
            'id' => intval($id),
            'type' => intval($type),
            'host' => trim($host),
            'port' => intval($port),
            'sort' => intval($sort),
            'remark' => trim($remark),
            'status' => intval($status)
        ];
        $domain_model = domain_model::getInstance();
        $res = $domain_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $res = $domain_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑域名', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        $domain_model = domain_model::getInstance();
        $res = $domain_model->delById($id);
        $this->GlobalService->json($res);
    }

}
