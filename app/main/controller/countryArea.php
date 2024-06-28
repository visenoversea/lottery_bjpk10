<?php
/**
 *国家地区
 */

namespace main\controller;

use main\classes\base;
use model\country_area_model;

class countryArea extends base
{

    /**
     * 获取列表  /main/countryArea/getList
     */
    public function getList()
    {
        $country_area_model = country_area_model::getInstance();
        $list = $country_area_model->field('id,country,area_code,icon')
            ->where(['status'=>1])->order('sort DESC,id ASC')->limit(-1)->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

}
