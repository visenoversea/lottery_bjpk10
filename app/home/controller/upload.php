<?php
/**
 *上传类
 */

namespace home\controller;

use home\classes\base;
use model\user_log_model;
use service\UploadService;

class upload extends base
{

    public function getSts()
    {
        $user = $this->GlobalService->getUser();
        $UploadService = UploadService::getInstance();
        $res = $UploadService->getSts($user['id']);
        $this->GlobalService->json($res);
    }

    /**
     * /home/upload/file
     * 单个文件上传
     * @param $suffix
     */
    public function file($suffix)
    {
        if (!isset($_FILES['file'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '上传的文件不存在']);
        }
        $user = $this->GlobalService->getUser();
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('文件上传-Home', $_FILES);
        /*********添加日志*********/
        //文件上传
        $UploadService = UploadService::getInstance();
        $res = $UploadService->upLoadFile('oss', $_FILES['file'], $user['id'], $suffix);
        $this->GlobalService->json($res);
    }

}
