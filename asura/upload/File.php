<?php


namespace asura\upload;

class File extends Base
{

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
//        $data['filePath'] = '/upload/' . $data['filePath'];
        $saveFile = INDEX_PATH . $data['filePath'];
        $path = dirname($saveFile);
        if (!is_dir($path) && !mkdir($path, 0755, true)) {
            return ['code' => -2, 'msg' => '上传失败，没有目录权限'];
        }
        if (strpos(strtolower($saveFile), 'php') !== false) {
            return ['code' => -2, "msg" => "非法上传"];
        }
        $res = move_uploaded_file($file['tmp_name'], $saveFile);
        $data['filePath'] .= '?t=' . SYS_TIME;
        if ($res) {
            return ['code' => 1, 'msg' => '文件上传成功', 'file' => $data];
        } else {
            return ['code' => -2, 'msg' => '上传失败，文件上传异常'];
        }
    }

}
