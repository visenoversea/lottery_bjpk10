<?php
/**
 * 配置
 */

namespace admin\controller;

use admin\classes\base;
use model\config_model;
use model\user_log_model;
use Exception;

class config extends base
{
    /**
     * 获取列表
     * /admin/config/getList
     */
    public function getList($status = '', $search_key = '', $search_val = '')
    {
        $adminUser = $this->GlobalService->getUser();
        $where = ['parent_id' => 0];
        if ($adminUser['type'] < 100) {
            $where['level'] = ['<' => 2];
        }
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'title') {
                $where['title'] = ['LIKE' => '%' . $search_val . '%'];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
            }
        }
        $config_model = config_model::getInstance();
        $list = $config_model->field('id,title,level,sort,remark,create_time,modify_time,status')
            ->where($where)
            ->order('sort DESC,id ASC')
            ->limit(-1)
            ->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    /**
     * 新增
     * /admin/config/add
     */
    public function add($title = '', $level = 0, $sort = 0, $remark = '')
    {
        if (empty($title)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '标题不能为空']);
        }
        $data = [
            'title' => trim($title),
            'level' => intval($level),
            'sort' => intval($sort),
            'remark' => trim($remark),
        ];
        $config_model = config_model::getInstance();
        if ($config_model->where(['parent_id' => 0, 'title' => $data['title']])->isExist()) {
            $this->GlobalService->json(['code' => -2, 'msg' => '标题重复']);
        }
        $data['id'] = $config_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增配置', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
    }

    /**
     * 编辑
     * /admin/config/edit
     */
    public function edit($id = 0, $title = '', $level = 0, $sort = 0, $remark = '', $status = 0)
    {
        if (empty($title)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '标题不能为空']);
        }
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'level' => intval($level),
            'sort' => intval($sort),
            'remark' => trim($remark),
            'status'=>intval($status)
        ];
        $config_model = config_model::getInstance();
        if ($config_model->where(['id' => ['<>' => $data['id']], 'parent_id' => 0, 'title' => $data['title']])->isExist()) {
            $this->GlobalService->json(['code' => -2, 'msg' => '标题重复']);
        }
        $config_model->edit($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('编辑配置', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '编辑成功']);
    }

    /**
     * 删除
     * /admin/config/del
     */
    public function del($id)
    {
        $config_model = config_model::getInstance();
        $res=$config_model->delById($id);
        $this->GlobalService->json($res);
    }


    /**
     * 获取配置详情
     * /admin/config/getItem
     */
    public function getItem($id)
    {
        $config_model = config_model::getInstance();
        $data = $config_model->field('id,title,remark')->where(['id' => $id])->getOne();
        if (!$data) {
            $this->GlobalService->json(['code' => -2, 'msg' => '配置信息不存在']);
        }
        $list = $config_model->field('id,title,k,v,remark,param,status')
            ->where(['parent_id' => $id, 'status' => ['>=' => 0]])->order('id ASC')
            ->limit(-1)->select();
        foreach ($list as $k => $v) {
            $cache = json_decode($v['param'], true);
            $cache['id'] = $v['id'];
            $cache['title'] = $v['title'];
            $cache['k'] = $v['k'];
            $cache['v'] = json_decode($v['v'],true);
            $cache['remark'] = $v['remark'];
            $list[$k] = $cache;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $data, 'list' => $list]);
    }

    /**
     * 表单配置编辑
     * /admin/config/editForm
     */
    public function editForm($id, $list)
    {
        $config_model = config_model::getInstance();
        $dbh = $config_model->begin();
        try {
            //删除
            $config_model->edit(['status' => -1], ['parent_id' => $id]);
            $cache = [];
            foreach ($list as $v) {
                if (empty($v['k'])) {
                    $this->GlobalService->json(['code' => -2, 'msg' => "Key不能为空"]);
                }
                if (isset($cache[$v['k']])) {
                    $dbh->rollBack();
                    //Key重复
                    $this->GlobalService->json(['code' => -2, 'msg' => "Key重复:{$v['k']}"]);
                }
                $cache[$v['k']] = 1;
                $data = [
                    'parent_id' => $id,
                    'title' => $v['title'],
                    'k' => $v['k'],
                    'v' => json_encode($v['v'], JSON_UNESCAPED_UNICODE),
                    'remark' => $v['remark'] ?? '',
                    'status' => 1
                ];
                unset($v['parent_id']);
                unset($v['title']);
                unset($v['k']);
                unset($v['v']);
                unset($v['level']);
                unset($v['remark']);
                unset($v['sort']);
                unset($v['create_time']);
                unset($v['modify_time']);
                unset($v['status']);
//                if ($v['id']) {
//                    $data['id'] = $v['id'];
//                }
                unset($v['id']);
                $data['param'] = json_encode($v, JSON_UNESCAPED_UNICODE);
                $config_model->add($data);
//                if ($data['id']) {
//                    $config_model->edit($data);
//                } else {
//                    $config_model->add($data);
//                }
            }
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑表单配置', ['id' => $id, 'data' => $list]);
            /*********添加日志*********/
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            $this->GlobalService->json(['code' => -2, 'msg' => '失败', 'e' => $e->getMessage()]);
        }
    }

    /**
     * 修改配置
     * /admin/config/editData
     */
    public function editData($list = [])
    {
        if (!is_array($list)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '参数异常']);
        }
        $config_model = config_model::getInstance();
        $dbh = $config_model->begin();
        try {
            foreach ($list as $v) {
                $config_model->edit(['id' => $v['id'], 'v' => json_encode($v['v'],JSON_UNESCAPED_UNICODE)]);
            }
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('修改配置', $list);
            /*********添加日志*********/
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '修改成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            $this->GlobalService->json(['code' => -2, 'msg' => '更新失败,系统异常', 'err' => $e->getMessage()]);
        }
    }
}
