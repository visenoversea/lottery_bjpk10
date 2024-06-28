<?php
//

namespace model;

use asura\db\Model;
use Exception;

class role_menu_model extends Model
{
    protected static $instance;

    public function role(): array
    {
        return $this->belongsTo(role_model::class, 'role_id');
    }

    public function menu(): array
    {
        return $this->belongsTo(menu_model::class, 'menu_id');
    }

    //Api验证权限
    public function apiAuth($role_id, $name): bool
    {
        $res = $this->field('id')->where(['role_id' => $role_id, 'status' => 1])
            ->hasWhere('menu', ['type' => 2, 'name' => $name, 'status' => ['>=' => 0]])
            ->getOne();
        return (bool)$res;
    }

    //获取授权的菜单ids
    public function menuChecked($role_id)
    {
        $res = $this->field('GROUP_CONCAT(menu_id) AS menuChecked')->where(['role_id' => intval($role_id)])->getOne();
        return $res['menuChecked'] ? explode(',', $res['menuChecked']) : [];
    }

    public function getRoleMenuList(int $role_id)
    {
        return $this->field('m.*')->alias('rm')
            ->join('menu m', 'm.id=rm.menu_id')
            ->where(['rm.role_id' => $role_id, 'rm.status' => 1, 'm.status' => ['>=' => 0]])
            ->order('m.parent_id ASC,m.sort DESC')
            ->limit(-1)->select();
    }

    //编辑授权
    public function editAuth(int $role_id, array $menuChecked = []): array
    {
        $role_model = role_model::getInstance();
        $role = $role_model->where(['id' => $role_id])->getOne();
        if (!$role) {
            return ['code' => -2, 'msg' => '角色不存在'];
        }
        if ($role['status'] != 1) {
            return ['code' => -2, 'msg' => '当前角色状态无法修改权限'];
        }
        $dbh = $this->begin();
        try {
            //删除旧授权建立新授权
            $data = [];
            foreach ($menuChecked as $v) {
                $data[] = [$role_id, intval($v), SYS_TIME, SYS_TIME];
            }
            $this->where(['role_id' => $role_id])->del();
            if ($data) {
                $this->insertAll(['role_id', 'menu_id', 'create_time', 'modify_time'], $data);
            }
            $dbh->commit();
            return ['code' => 1, 'msg' => '权限编辑成功'];
        } catch (Exception $e) {
            $dbh->rollBack();
            return ['code' => -2, 'msg' => '系统异常', 'err' => $e->getMessage()];
        }
    }

    //获取单条数据
    public function getData($id, $where = [], $field = '*')
    {
        $where['id'] = intval($id);
        return $this->field($field)->where($where)->getOne();
    }

    //新增
    public function add(array $data = []): int
    {
        $data['create_time'] = $data['modify_time'] = SYS_TIME;
        return $this->insert($data);
    }

    //编辑
    public function edit(array $data, array $where = [])
    {
        if (isset($data['id'])) {
            $where['id'] = intval($data['id']);
            unset($data['id']);
        }
        $data['modify_time'] = SYS_TIME;
        return $this->where($where)->update($data);
    }

    /**
     * 删除
     * @param $id
     * @return array
     */
    public function delById($id): array
    {
        $data = $this->where(['id' => intval($id)])->getOne();
        if (!$data) {
            return ['code' => -2, 'msg' => '未找到数据'];
        }
        $res = $this->edit(['id' => $data['id'], 'status' => -1]);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
