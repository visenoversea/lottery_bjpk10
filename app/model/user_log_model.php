<?php
//日志库

namespace model;

use asura\Common;
use asura\db\Model;
use asura\Request;
use service\GlobalService;

class user_log_model extends Model
{
    protected static $instance;
    private $GlobalService;

    protected function __construct()
    {
        parent::__construct();
        $this->GlobalService = GlobalService::getInstance();
    }

    //表关联
    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
    }

    //添加记录
    public function addLog($title, $msg): int
    {
        $user = $this->GlobalService->getUser();
        $user_id = $user ? $user['id'] : 0;
        if (is_array($msg)) {
            $msg = json_encode($msg, JSON_UNESCAPED_UNICODE);
        }
        return $this->add([
            'user_id' => $user_id,
            'path' => Request::getPath(),
            'host' => $_SERVER['HTTP_HOST'],
            'title' => $title,
            'msg' => $msg,
            'ip' => Common::getIp()
        ]);
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
        $res = $this->edit(['id' => intval($id), 'status' => -1]);
        if ($res) {
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
