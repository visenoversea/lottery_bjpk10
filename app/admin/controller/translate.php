<?php
/**
 *翻译
 */

namespace admin\controller;

use admin\classes\base;
use model\translate_list_model;
use model\user_log_model;

class translate extends base
{
    public function getList($type = '', $md5 = '', $lang = '', $tl_content = '', $content = '', $status = '', $page = 1, $limit = 15)
    {
        $where = [];
        $hasWhere = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        if ($lang !== '') {
            $where['tl'] = trim($lang);
        }
        if ($md5 !== '') {
            $where['md5'] = trim($md5);
        }
        if ($type !== '') {
            $where['type'] = intval($type);
        }
        if ($tl_content !== '') {
            $where['tl_content'] = ['LIKE' => '%' . trim($tl_content) . '%'];
        }
        if ($content !== '') {
            $hasWhere['content'] = ['LIKE' => '%' . trim($content) . '%'];
        }
        $translate_list_model = translate_list_model::getInstance();
        $data = $translate_list_model->with(['translate' => 'id,type,content,status'])
            ->where($where)
            ->hasWhere('translate', $hasWhere)
            ->order('id DESC')
            ->limit($limit, $page)
            ->getListInfo();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    /**
     * 获取
     */
    public function getInfo($type, $content, $tl)
    {
        if (!$content) {
            $this->GlobalService->json(['code' => -2, 'msg' => '内容不能为空']);
        }
        $translate_list_model = translate_list_model::getInstance();
        $data = $translate_list_model->getInfo($type, $content, $tl);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data]);
    }

    public function edit($id, $tl_content, $err_nums=0, $status = 1)
    {
        $data = [
            'id' => intval($id),
            'tl_content' => trim($tl_content),
            'err_nums' => intval($err_nums),
            'status' => intval($status)
        ];
        $translate_list_model = translate_list_model::getInstance();
        $res = $translate_list_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑翻译', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        $translate_list_model = translate_list_model::getInstance();
        $res = $translate_list_model->delById($id);
        $this->GlobalService->json($res);
    }
}
