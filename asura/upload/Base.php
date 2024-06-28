<?php

namespace asura\upload;

abstract class Base
{

    /**
     * 文件上传(默认传图片)
     * @param array $file
     * @param string $filePath 路径(包括文件名)
     * @param string $fileTypeLimit 限制类型
     * @param int $size 大小1024倍数  20971520=20M
     * @return array
     */
    abstract public function upLoadFile(array $file, string $filePath = '', string $fileTypeLimit = '', int $size = 20971520): array;


    /**
     * 文件验证
     * @param array $file           文件对象
     * @param string $filePath      上传文件路径
     * @param string $fileTypeLimit 文件类型限制  png,jpeg,jpg,gif
     * @param int $size 文件大小限制
     * @return array
     */
    public function VerifyFile(array $file, string $filePath = '', string $fileTypeLimit = '', int $size = 20971520): array
    {
        if ($file['error'] > 0) {
            return ['code' => -2, "msg" => "错误:{$file["error"]}"];
        }
        //过滤特殊文件名
//        $file['name'] = str_replace(['/', '\\', ':', '*', '"', '<', '>', '|', '?'], '_', $file['name']);
        //获取文件后缀
        $fileSuffix = strtolower(ltrim(strrchr($file['name'], '.'), '.'));
        if (!in_array($fileSuffix, ['png', 'jpeg', 'jpg', 'gif', 'svg','jfif', 'txt', 'xlsx', 'xls', 'csv', 'rar', 'zip', 'apk', 'ipa', 'mobileconfig'])) {
            return ['code' => -2, "msg" => "当前不支持{$fileSuffix}文件格式上传"];
        }
        //设置默认限制类型 上传类型验证
        if (!empty($fileTypeLimit)) {
            $fileTypeLimit = explode(',', $fileTypeLimit);
            if (!in_array($fileSuffix, $fileTypeLimit)) {
                return ['code' => -2, "msg" => '上传文件类型限制:' . implode("|", $fileTypeLimit)];
            }
        }
        if (in_array($fileSuffix, ['png', 'jpeg', 'jpg', 'gif'])) {
            $fileType = 'image';
        } else {
            $fileType = 'file';
        }
        if ($file['size'] > $size) {
            $m = round($size / 1024 / 1024, 2);
            return ['code' => -2, "msg" => "文件不能大于{$m}M"];
        }
        if ($filePath == '') {
            $filePath = '/upload/' . date('Ymd/His', SYS_TIME) . mt_rand(1000, 9999) . '.' . $fileSuffix;
        } else {
            //判断全路径还是分目录
            if (strpos($filePath, '.') === false) {
                $filePath = '/upload/' . trim($filePath, '/') . '/' . date('Ymd/His', SYS_TIME) . mt_rand(1000, 9999) . '.' . $fileSuffix;
            }
        }
        //文件名
        $fileName = basename($filePath);
        return [
            'code' => 1,
            'msg' => '文件验证通过',
            'file' => [
                //判断是否是图片
                'fileType' => $fileType,
                //上传路径
                'filePath' => $filePath,
                'fileName' => $fileName,
                'fileSize' => $file['size']
            ]
        ];
    }

}
