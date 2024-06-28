<?php
/**
 * 语言配置
 */

namespace admin\controller;

use admin\classes\base;
use model\lang_config_list_model;
use model\lang_config_model;
use model\lang_model;

class langConfig extends base
{

    /**
     * 获取配置列表
     * /admin/langConfig/getList
     */
    public function getList()
    {
        $lang_config_model = lang_config_model::getInstance();
        $list = $lang_config_model->where(['status' => ['>=' => 0]])->limit(-1)->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    /**
     * 生成翻译文件
     * /admin/langConfig/makeFile
     */
    public function makeFile($id)
    {
        $lang_config_list_model = lang_config_list_model::getInstance();
        $lang_model = lang_model::getInstance();
        $list = $lang_model->limit(-1)->select();
        foreach ($list as $v) {
            $lang_config_list_model->makeFile($id, $v['code']);
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
    }

    /**
     * 语言包上传
     * /admin/langConfig/upload
     */
    public function upload($id)
    {
        $lang_config_model = lang_config_model::getInstance();
        $langConfig = $lang_config_model->where(['id' => $id])->getOne();
        if (!$langConfig) {
            $this->GlobalService->json(['code' => -2, 'msg' => '配置不存在']);
        }
        if (!isset($_FILES['file'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '上传的文件不存在']);
        }
        $json = trim(file_get_contents($_FILES['file']['tmp_name']), "'");
        $langData = json_decode($json, true);
        if (!$langData) {
            $this->GlobalService->json(['code' => -2, 'msg' => 'json格式错误']);
        }
        $lang_config_list_model = lang_config_list_model::getInstance();
        $res = $lang_config_list_model->addData($langData, $langConfig['id'], $langConfig['lang']);
        $this->GlobalService->json($res);
    }

}
