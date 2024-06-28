<?php
//默认主入口
namespace main\controller;

use main\classes\base;
use model\map_model;

class map extends base
{

    public function getList($code)
    {
        $map_model = map_model::getInstance();
        $list = $map_model->getListByCode($code);
        foreach ($list as $k => $v) {
            if ($v['translate']) {
                $v['title'] = $this->GlobalService->translate($v['title']);
            }
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }
}
