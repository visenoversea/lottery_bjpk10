<?php
/**
 * 语言配置
 */

namespace admin\controller;

use admin\classes\base;
use asura\excel\Excel;
use model\lang_config_list_model;
use model\lang_config_model;
use model\lang_model;
use model\user_log_model;

class langConfigList extends base
{
    /**
     * 获取配置列表
     * /admin/langConfigList/getList
     */
    public function getList($lang_config_id, $lang = '', $status = '', $k = '', $content = '', $page = 1, $limit = 15)
    {
        $where = ['lang_config_id' => $lang_config_id];
        if ($lang !== '') {
            $where['lang'] = $lang;
        }
        if ($status !== '') {
            $where['status'] = $status;
        } else {
            $where['status']['>='] = 0;
        }
        if ($k !== '') {
            $where['k'] = ['LIKE' => '%' . trim($k) . '%'];
        }
        if ($content !== '') {
            $where['content'] = ['LIKE' => '%' . trim($content) . '%'];
        }
        $lang_config_list_model = lang_config_list_model::getInstance();
        $data = $lang_config_list_model->where($where)->limit($limit, $page)->getListInfo();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    /**
     * 编辑
     * /admin/langConfigList/edit
     * @param $id
     * @param $type
     * @param $content
     * @param $status
     */
    public function edit($id, $type, $content, $status)
    {
        $data = [
            'id' => $id,
            'type' => intval($type),
            'content' => trim($content),
            'status' => intval($status),
        ];
        $lang_config_list_model = lang_config_list_model::getInstance();
        $res = $lang_config_list_model->getData($id);
        if (!$res) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的语言配置']);
        }
        $lang_config_list_model->edit($data);
        $lang_config_list_model->makeFile($id, $res['lang']);
        $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
    }

    /**
     * 删除
     * /admin/langConfigList/del
     * @param $lang_config_id
     * @param $k
     */
    public function del($lang_config_id, $k)
    {
        $lang_config_list_model = lang_config_list_model::getInstance();
        $lang_config_list_model->edit(['status' => -1], ['lang_config_id' => intval($lang_config_id), 'k' => trim($k)]);
        $lang_model = lang_model::getInstance();
        $list = $lang_model->limit(-1)->select();
        foreach ($list as $v) {
            $lang_config_list_model->makeFile($lang_config_id, $v['code']);
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '删除成功']);
    }

    /**
     * 翻译并生成文件
     */
    public function translate()
    {
        $lang_config_list_model = lang_config_list_model::getInstance();
        $res=$lang_config_list_model->translate();
        $this->GlobalService->json($res);
    }

    //语言导出
    public function export($lang_config_id, $lang = '')
    {
        $lang_config_list_model = lang_config_list_model::getInstance();
        $list = $lang_config_list_model->field('id,k,lang,content')
            ->where(['lang_config_id' => $lang_config_id, 'lang' => 'zh-CN'])
            ->order('k ASC')
            ->limit(-1)->select();
        foreach ($list as $k => $v) {
            $res = $lang_config_list_model->field('id,content')
                ->where(['lang_config_id' => $lang_config_id, 'k' => $v['k'], 'lang' => $lang])
                ->getOne();
            $v['lang'] = $lang;
            $v['translate'] = $res ? $res['content'] : '';
            $list[$k] = $v;
        }
        $res = Excel::exportData(['lang' => '翻译语言', 'k' => '键值', 'content' => '原文', 'translate' => '翻译结果'], $list, $lang);
        $this->GlobalService->json($res);
    }

    //导入
    public function import($langConfigId = 0)
    {
        if (!$langConfigId) {
            $this->GlobalService->json(['code' => -2, 'msg' => '配置参数异常']);
        }
        if (!isset($_FILES['file'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '上传的文件不存在']);
        }
        $list = Excel::readFileData($_FILES['file']['tmp_name']);
        if (!$list) {
            $this->GlobalService->json(['code' => -2, 'msg' => 'Excel文件读取失败']);
        }
        $lang_config_list_model = lang_config_list_model::getInstance();
        foreach ($list as $v) {
            if (empty($v[3])) {
                continue;
            }
            $res = $lang_config_list_model->field('id,content')
                ->where(['lang_config_id' => $langConfigId, 'lang' => $v[0], 'k' => $v[1]])
                ->getOne();
            if ($res && $v[3] != $res['content']) {
                $lang_config_list_model->edit(['id' => $res['id'], 'content' => trim($v[3])]);
            }
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '导入成功']);
    }

    //新增单个key
    public function add($k= '',$type=0, $content='', $status=0, $langConfigId = 0)
    {
        if (!$langConfigId) {
            $this->GlobalService->json(['code' => -2, 'msg' => 'langConfigId参数异常']);
        }
        if (!$k) {
            $this->GlobalService->json(['code' => -2, 'msg' => '键值不能为空']);
        }

        $lang_config_model = lang_config_model::getInstance();
        $one = $lang_config_model->where(['id' => $langConfigId])->getOne();
        if(!$one){
            $this->GlobalService->json(['code' => -2, 'msg' => 'langConfigId参数异常']);
        }

        $data = [
            'lang_config_id' => $langConfigId,
            'type' => intval($type),
            'k' => $k,
            'content' => trim($content),
            'status' => intval($status),
        ];

        $lang_config_list_model = lang_config_list_model::getInstance();
        $one = $lang_config_list_model->where(['lang_config_id'=>$langConfigId,'k'=>$k, 'status' => ['>'=>0]])->getOne();
        if ($one) {
            $this->GlobalService->json(['code' => -2, 'msg' => '当前键值已经存在系统中']);
        }
        //保存到所有语言中
        $lang_model = lang_model::getInstance();
        $list = $lang_model->field('id,code')->where(['status' => ['>=' => 0]])->select();
        foreach ($list as $v){
            $data['lang'] = $v['code'];
            $lang_config_list_model->add($data);
        }

        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增一条语言', $data);
        /*********添加日志*********/

        $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
    }

}
