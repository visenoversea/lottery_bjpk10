<?php
/**
 * 手机区号
 */

namespace admin\controller;

use admin\classes\base;
use model\country_area_model;
use model\user_log_model;

class countryArea extends base
{

    public function getList($country = '', $area_code = '', $status = '', $page = 1, $limit = 15)
    {
        $where = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        if ($country !== '') {
            $where['country'] = ['LIKE' => '%' . trim($country) . '%'];
        }
        if ($area_code !== '') {
            $where['area_code'] = ['LIKE' => '%' . trim($area_code) . '%'];
        }
        $country_area_model = country_area_model::getInstance();
        $data = $country_area_model->where($where)
            ->order('sort DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function edit($id, $country, $area_code, $icon, $sort = 0, $status = 1)
    {
        $data = [
            'id' => intval($id),
            'country' => trim($country),
            'area_code' => trim($area_code),
            'icon' => trim($icon),
            'sort' => intval($sort),
            'status' => intval($status)
        ];
        if (empty($data['country'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '国家不能为空']);
        }
        if ($data['area_code'] <= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '区号不能小于0']);
        }
        $country_area_model = country_area_model::getInstance();
        $res = $country_area_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑手机区号', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

}
