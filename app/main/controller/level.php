<?php
//默认主入口
namespace main\controller;

use asura\Common;
use main\classes\base;
use model\level_model;
use model\platform_model;

class level extends base
{

    public function getList()
    {
        $level_model = level_model::getInstance();
        $list = $level_model->where(['status' => 1])
            ->order('id ASC')
            ->limit(-1)
            ->select();
        foreach ($list as $k => $v) {
//            $v['introduce'] = $this->GlobalService->translate($v['introduce']);
            $v['min']=Common::formatAmount($v['min']);
            $v['max']=Common::formatAmount($v['max']);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }
}
