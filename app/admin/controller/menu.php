<?php
/**
 *菜单
 */

namespace admin\controller;

use admin\classes\base;
use model\menu_model;
use model\user_log_model;

class menu extends base
{

    /**
     * 获取列表
     * /admin/menu/getList
     */
    public function getList()
    {
        $adminUser = $this->GlobalService->getUser();
        $where = ['status' => ['>=' => 0]];
        if ($adminUser['type'] < 100) {
            $where['level'] = ['<' => 2];
        }
        $menu_model = menu_model::getInstance();
        $list = $menu_model->order('parent_id ASC,sort DESC')
            ->where($where)
            ->limit(-1)
            ->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    /**
     * 新增
     * /admin/menu/add
     */
    public function add($parent_id, $type, $title, $icon, $path, $name, $component, $level = 1, $sort = 0, $status = 1)
    {
        $data = [
            'parent_id' => intval($parent_id),
            'type' => intval($type),
            'title' => trim($title),
            'path' => trim($path),
            'name' => trim($name),
            'level'=>intval($level),
            'sort' => intval($sort)
        ];
        if ($data['type'] == 1) {
            $data['component'] = trim($component);
            $data['status'] = intval($status);
            if($data['parent_id']==0){
                $data['icon'] = trim($icon);
            }
        } else {
            $data['status'] = 1;
        }
        $menu_model = menu_model::getInstance();
        $res = $menu_model->checkData($data);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        //插入
        $data['id'] = $menu_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增后台菜单', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
    }

    /**
     * 编辑
     * /admin/menu/edit
     */
    public function edit($id, $parent_id, $type, $title, $icon, $path, $name, $component, $level = 1, $sort = 0, $status = 1)
    {
        $data = [
            'id' => intval($id),
            'parent_id' => intval($parent_id),
            'type' => intval($type),
            'title' => trim($title),
            'path' => trim($path),
            'name' => trim($name),
            'level'=>intval($level),
            'sort' => intval($sort)
        ];
        if ($data['type'] == 1) {
            $data['component'] = trim($component);
            $data['status'] = intval($status);
            if($data['parent_id']==0){
                $data['icon'] = trim($icon);
            }
        } else {
            $data['status'] = 1;
        }
        $menu_model = menu_model::getInstance();
        $res = $menu_model->checkData($data);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        //插入
        $res = $menu_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑后台菜单', $data);
            /*********添加日志*********/
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '编辑成功']);
    }

    /**
     * 删除
     * /admin/menu/del
     */
    public function del($id)
    {
        $menu_model = menu_model::getInstance();
        $res = $menu_model->delById($id);
        $this->GlobalService->json($res);
    }
}