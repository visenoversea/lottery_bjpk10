<?php
//默认主入口
namespace main\controller;

use main\classes\base;
use model\config_model;

class config extends base
{
    public function getInfo($id)
    {
        $config_model = config_model::getInstance();
        $info = $config_model->getConfigData($id, 0);
        if (!$info) {
            $info = (object)[];
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }
}
