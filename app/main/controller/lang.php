<?php
/**
 *语言
 */

namespace main\controller;

use main\classes\base;
use model\lang_model;


class lang extends base
{
    /**
     * 获取配置列表  /main/lang/getList
     */
    public function getList()
    {
        $lang_model = lang_model::getInstance();
        $list = $lang_model->where(['status' => 1])->limit(-1)->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    /**
     * 获取语言包数据
     * /home/lang/getData
     */
    public function getData($lang = 'zh-CN', $id = 1)
    {
        $jsonPath = INDEX_PATH . "/lang/{$id}/{$lang}.json";
        if (!is_file($jsonPath)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未找到对应的语言包']);
        }
        $data = json_decode(file_get_contents($jsonPath), true);
        if (!$data) {
            $this->GlobalService->json(['code' => -2, 'msg' => '语言包解析异常']);
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'data' => $data]);
    }

}
