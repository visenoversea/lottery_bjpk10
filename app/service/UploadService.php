<?php
/**
 * 上传服务
 */

namespace service;

use AlibabaCloud\Client\AlibabaCloud;
use AlibabaCloud\Client\Exception\ClientException;
use AlibabaCloud\Client\Exception\ServerException;
use asura\Common;
use asura\upload\File;
use asura\upload\OSS;

class UploadService
{
    private static $instance;
    private $File;
    private $OSS;
    //asd
//    private $accessKeyId = 'LTAI5t87gdfFpuMUEGZpTNmH';
//    private $accessSecret = 'Hk3ZG7XxMAOn3OnagSCUMlOndeQ1vQ';

    ///xm
    private $accessKeyId = 'LTAI5tRYZ2SUBeEJj5sgymcF';
    private $accessSecret = 'QusckZLq07kqSF1ns3sRdckcE8PiU5';
    //加速域名
    private $endpoint = 'oss-ap-northeast-1.aliyuncs.com';
//    //普通域名
//    private $endpoint = 'oss-ap-northeast-1.aliyuncs.com';
    //全球加速
    private $region = 'oss-ap-northeast-1';
//    private $region = 'oss-ap-northeast-1';
    private $bucket = 'filevtss';

    /**
     * 不能被克隆
     */
    final protected function __clone(){}

    /**
     * 构造函数
     * Model constructor.
     */
    final protected function __construct(){}

    final protected function getOSS(): OSS
    {
        return $this->OSS ?? $this->OSS = new OSS($this->accessKeyId, $this->accessSecret, $this->endpoint, $this->bucket);
    }

    /**
     * 获取授权
     * @param $RoleSessionName
     * @return array
     */
    public function getSts($RoleSessionName): array
    {
        $RedisService = RedisService::getInstance();
        $res = $RedisService->getData('AlibabaCloudSts', $RoleSessionName);
        if ($res) {
            return $res;
        }
        try {
            //构建一个阿里云客户端，用于发起请求。
            //设置调用者（RAM用户或RAM角色）的AccessKey ID和AccessKey Secret。
            AlibabaCloud::accessKeyClient($this->accessKeyId, $this->accessSecret)
                ->regionId($this->region)
                ->asDefaultClient();
            //设置参数，发起请求。
            $result = AlibabaCloud::rpc()
                ->product('Sts')
                // https | http
                ->scheme('https')
                ->version('2015-04-01')
                ->action('AssumeRole')
                ->method('POST')
                ->host('sts.aliyuncs.com')
                ->options([
                    'query' => [
                        'RegionId' => "*",
                        'RoleArn' => "acs:ram::5719301956183290:role/auth",
                        'RoleSessionName' => $RoleSessionName,
                    ],
                ])->request();
            $data = $result->toArray();
            $data['oss'] = ['region' => $this->region, 'bucket' => $this->bucket];
            $res = ['code' => 1, 'msg' => '成功', 'data' => $data];
            $RedisService->setData($res, 'AlibabaCloudSts', $RoleSessionName);
            return $res;
        } catch (ClientException | ServerException $e) {
            return ['code' => -2, 'msg' => $e->getErrorMessage() . PHP_EOL];
        }
    }

    final protected function getFile(): File
    {
        return $this->File ?? $this->File = new File();
    }

    /**
     * @return UploadService
     */
    public static function getInstance(): UploadService
    {
        return static::$instance ?? static::$instance = new static();
    }

    /**
     * 文件上传(默认传图片)
     * @param string $type
     * @param array $file
     * @param string $filePath 路径(包括文件名)
     * @param string $fileTypeLimit 限制类型
     * @param int $size 大小1024倍数  20971520=20M
     * @return array
     */
    public function upLoadFile(string $type, array $file, string $filePath = '', string $fileTypeLimit = '', int $size = 20971520): array
    {
        $RedisService = RedisService::getInstance();
        $tag = md5(Common::getIp());
        $nums = $RedisService->getData('uploadLimit', $tag);
        if ($nums >= 1000) {
            $RedisService->setData($nums + 1, 'uploadLimit', $tag, 3600);
            return ['code' => -2, 'msg' => '上传次数过于频繁,请稍后重试'];
        }
        if ($type == 'oss') {
            $Upload = $this->getOSS();
        } else {
            $Upload = $this->getFile();
        }
        $RedisService->setData(intval($nums) + 1, 'uploadLimit', $tag, 3600);
        return $Upload->upLoadFile($file, $filePath, $fileTypeLimit, $size);
    }


}