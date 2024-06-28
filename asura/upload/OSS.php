<?php


namespace asura\upload;

use OSS\Core\OssException;
use OSS\OssClient;

class OSS extends Base
{
    private $ossClient;
    private $bucket;

    /**
     * OSS constructor.
     * @param string $accessKeyId 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
     * @param string $accessKeySecret
     * @param string $endpoint Endpoint以杭州为例，其它Region请按实际情况填写。
     * @param string $bucket 设置存储空间名称
     * @throws OssException
     */
    public function __construct(string $accessKeyId, string $accessKeySecret, string $endpoint, string $bucket)
    {
        $this->bucket = $bucket;
        $this->ossClient = new OssClient($accessKeyId, $accessKeySecret, $endpoint);
    }

    /**
     * 文件上传(默认传图片)
     * @param array $file
     * @param string $filePath 路径(包括文件名)
     * @param string $fileTypeLimit 限制类型
     * @param int $size 大小1024倍数  20971520=20M
     * @return array
     */
    public function upLoadFile(array $file, string $filePath = '', string $fileTypeLimit = '', int $size = 20971520): array
    {
        $res = $this->VerifyFile($file, $filePath, $fileTypeLimit, $size);
        if ($res['code'] != 1) return $res;
        $data = $res['file'];
        try {
            $res = $this->ossClient->uploadFile($this->bucket, ltrim($data['filePath'],'/'), $file['tmp_name']);
            $data['filePath'] = str_replace('http:', 'https:', $res['oss-request-url']);
            return ['code' => 1, 'msg' => '上传成功', 'file' => $data];
        } catch (OssException $e) {
            return ['code' => -2, 'msg' => $e->getMessage()];
        }
    }

}
