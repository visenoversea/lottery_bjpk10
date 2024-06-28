<?php
/**
 *用户相关
 */

namespace admin\controller;

use admin\classes\base;
use model\menu_model;
use model\role_menu_model;
use model\role_model;
use model\user_log_model;


class role extends base
{

    /**
     * 获取列表
     * /admin/role/getList
     */
    public function getList($status = '', $type = '',$search_key = '', $search_val = '')
    {
        $where = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        if (!empty($search_val)) {
            $search_val = trim($search_val);
            if ($search_key == 'name') {
                $where['name'] = ['LIKE' => '%' . $search_val . '%'];
            } else {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => [], 'total' => 0]);
            }
        }
        $adminUser = $this->GlobalService->getUser();
        if ($adminUser['type'] !== 100) {
            if ($type) {
                $where['id'] = ['>=' => 10];
            }else{
                $where['id'] = ['>' => 1];
            }
        }else{
            if ($type) {
                $where['id'] = ['>=' => 10];
            }
        }
        $role_model = role_model::getInstance();
        $list = $role_model->order('sort DESC,id ASC')
            ->where($where)
            ->limit(-1)
            ->select();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    /**
     * 新增
     * /admin/role/add
     */
    public function add($name, $remark, $sort)
    {
        $data = [
            'name' => trim($name),
            'remark' => trim($remark),
            'sort' => intval($sort)
        ];
        $role_model = role_model::getInstance();
        if ($role_model->where(['name' => $data['name'], 'status' => ['>=' => 0]])->isExist()) {
            $this->GlobalService->json(['code' => -2, 'msg' => '角色名称已存在']);
        }
        //插入
        $data['id'] = $role_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增角色', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '添加成功']);
    }

    /**
     * 编辑
     * /admin/role/edit
     */
    public function edit($id, $name, $remark, $sort, $status = 1)
    {
        $data = [
            'id' => intval($id),
            'name' => trim($name),
            'remark' => trim($remark),
            'sort' => intval($sort),
            'status' => intval($status)
        ];
        $role_model = role_model::getInstance();
        if ($role_model->where(['id' => ['<>' => $data['id']], 'name' => $data['name'], 'status' => ['>=' => 0]])->isExist()) {
            $this->GlobalService->json(['code' => -2, 'msg' => '角色名称已存在']);
        }
        $res = $role_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('角色编辑', $data);
            /*********添加日志*********/
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '编辑成功']);
    }

    /**
     * 删除
     * /admin/role/del
     */
    public function del($id)
    {
        if ($id < 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '当前角色无法删除']);
        }
        $role_model = role_model::getInstance();
        $res = $role_model->delById($id);
        $this->GlobalService->json($res);
    }

    //获取角色菜单列表
    public function getAuthList($id)
    {
        $adminUser = $this->GlobalService->getUser();
        $where = ['status' => ['>=' => 0]];
        if ($adminUser['type'] < 100) {
            $where['level'] = ['<' => 2];
        }
        $menu_model = menu_model::getInstance();
        $list = $menu_model->field('id,type,title,parent_id,sort,status')
            ->order('parent_id ASC,sort DESC')->where($where)->limit(-1)->select();
        $role_menu_model = role_menu_model::getInstance();
        $menuChecked = $role_menu_model->menuChecked($id);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list, 'menuChecked' => $menuChecked]);
    }

    //保存角色权限
    public function editAuth($id, $menuChecked = [])
    {
        $role_menu_model = role_menu_model::getInstance();
        $res = $role_menu_model->editAuth($id, $menuChecked);
        $this->GlobalService->json($res);
    }

}
