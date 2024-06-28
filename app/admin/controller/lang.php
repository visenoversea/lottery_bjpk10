<?php
/**
 * 语言列表
 */

namespace admin\controller;

use admin\classes\base;
use model\lang_config_list_model;
use model\lang_model;
use model\user_log_model;

class lang extends base
{

    /**
     * 获取配置列表  /admin/lang/getList
     */
    public function getList($code = '', $remark='',$status = '')
    {
        $where = [];
        if ($code !== '') {
            $where['code'] = ['LIKE' => '%' . trim($code) . '%'];
        }
        if ($remark !== '') {
            $where['remark'] = ['LIKE' => '%' . trim($remark) . '%'];
        }
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        $lang_model = lang_model::getInstance();
        $list = $lang_model->where($where)->order('sort DESC,id ASC')->limit(-1)->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    public function add($code, $name, $icon, $remark, $sort)
    {
        $data = [
            'code' => trim($code),
            'name' => trim($name),
            'icon' => trim($icon),
            'remark' => trim($remark),
            'sort' => intval($sort),
            'status' => 0
        ];
        $lang_model = lang_model::getInstance();
        $lang = $lang_model->where(['code' => $data['code']])->getOne();
        if (!$lang) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的语言编码，无法添加该语言']);
        }
        if ($lang['status'] >= 0) {
            $this->GlobalService->json(['code' => -2, 'msg' => '已有相同语言编码配置,无法重复添加']);
        }
        $res = $lang_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $data['id'] = $lang['id'];
        //插入
        $res = $lang_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('新增语言', $data);
            /*********添加日志*********/
            $lang_config_list_model = lang_config_list_model::getInstance();
            $lang_config_list_model->addLang($data['code']);
            $this->GlobalService->json(['code' => 1, 'msg' => '新增成功，请等待语言翻译结束后，修改语言状态']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '新增失败']);
    }

    public function edit($id, $name, $icon, $remark, $sort, $status)
    {
        $data = [
            'id' => intval($id),
            'name' => trim($name),
            'icon' => trim($icon),
            'remark' => trim($remark),
            'sort' => intval($sort),
            'status' => intval($status)
        ];
        $lang_model = lang_model::getInstance();
        $res = $lang_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        //编辑
        $res = $lang_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑语言', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '编辑失败']);
    }

    //删除
    public function del($id)
    {
        $lang_model = lang_model::getInstance();
        $res = $lang_model->delById($id);
        $this->GlobalService->json($res);
    }

}
