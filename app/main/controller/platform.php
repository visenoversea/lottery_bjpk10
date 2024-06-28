<?php
//默认主入口
namespace main\controller;

use main\classes\base;
use model\platform_model;

class platform extends base
{

    public function getList()
    {
        $platform_model = platform_model::getInstance();
        $list = $platform_model->where(['status' => 1])
            ->order('sort DESC,id ASC')
            ->limit(-1)
            ->select();
//        foreach ($list as $k => $v) {
//            $list[$k] = $v;
//        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }
}
