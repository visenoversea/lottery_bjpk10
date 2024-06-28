<?php
/**
 *广告图
 */

namespace admin\controller;

use admin\classes\base;
use model\banner_model;
use model\user_log_model;
use service\UploadService;

class banner extends base
{
    public function getList($code = '', $title = '', $status = '', $page = 1, $limit = 15)
    {
        $where = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        if ($title !== '') {
            $where['title'] = ['LIKE' => '%' . trim($title) . '%'];
        }
        if ($code !== '') {
            $where['code'] = ['LIKE' => '%' . trim($code) . '%'];
        }
        $banner_model = banner_model::getInstance();
        $data = $banner_model->where($where)
            ->order('code ASC,sort DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function add($code, $title, $img, $remark, $sort)
    {
        $data = [
            'code' => trim($code),
            'title' => trim($title),
            'img' => trim($img),
            'remark' => trim($remark),
            'sort' => intval($sort)
        ];
        $banner_model = banner_model::getInstance();
        $res = $banner_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        //插入
        $data['id'] = $banner_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增广告图', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
    }

    public function edit($id, $title, $img, $remark, $sort, $status = 1)
    {
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'img' => trim($img),
            'remark' => trim($remark),
            'sort' => intval($sort),
            'status' => intval($status)
        ];
        $banner_model = banner_model::getInstance();
        $res = $banner_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $res = $banner_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑广告图', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function upload($id)
    {
        $banner_model = banner_model::getInstance();
        $banner = $banner_model->where(['id' => $id])->getOne();
        if (!$banner) {
            $this->GlobalService->json(['code' => -2, 'msg' => '广告图配置不存在']);
        }
        if (!isset($_FILES['file'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '上传的图片不存在']);
        }
        //获取路径和后缀
        $path = explode('?', $banner['img'])[0];
        //获取后缀
        $temp = explode('.', $path);
        $suffix = $temp[count($temp) - 1];
        $UploadService = UploadService::getInstance();
        $res = $UploadService->upLoadFile('', $_FILES['file'], $path, $suffix);
        if($res['code']==1){
            $banner_model->edit(['id'=>$banner['id'],'img'=>$res['file']['filePath']]);
        }
        $this->GlobalService->json($res);
    }

    public function del($id)
    {
        $banner_model = banner_model::getInstance();
        $res = $banner_model->delById($id);
        $this->GlobalService->json($res);
    }
}
