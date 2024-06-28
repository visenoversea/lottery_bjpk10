<?php
/**
 *上传类
 */

namespace admin\controller;

use admin\classes\base;
use model\user_log_model;
use service\UploadService;

class upload extends base
{

    /**
     * 获取阿里云oss上传授权
     * /admin/upload/getSts
     */
    public function getSts()
    {
        $adminUser = $this->GlobalService->getUser();
        $UploadService = UploadService::getInstance();
        $res = $UploadService->getSts($adminUser['id']);
        $this->GlobalService->json($res);
    }

    /**
     * 文件上传
     * /admin/upload/file
     */
    public function file($type = '', $suffix = '')
    {
        if (!isset($_FILES['file'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '上传的文件不存在']);
        }
        $adminUser = $this->GlobalService->getUser();
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('文件上传-Admin', $_FILES);
        /*********添加日志*********/
        //文件上传
        $UploadService = UploadService::getInstance();
        $res = $UploadService->upLoadFile('oss', $_FILES['file'], $adminUser['id'], $suffix);
        $this->GlobalService->json($res);
    }

}
