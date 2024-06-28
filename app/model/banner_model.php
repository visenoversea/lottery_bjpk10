<?php
//

namespace model;

use asura\db\Model;
use service\GlobalService;

class banner_model extends Model
{
    protected static $instance;

    public function checkData($data): array
    {
        if (!isset($data['id']) && empty($data['code'])) {
            return ['code' => -2, 'msg' => '编码不能为空'];
        }
        if (empty($data['img'])) {
            return ['code' => -2, 'msg' => '图片地址不能为空'];
        }
        return ['code' => 1, 'msg' => '验证成功'];
    }

    public function getImg($code)
    {
        $data = $this->field('id,img')
            ->where(['code' => $code, 'status' => 1])
            ->order('sort DESC')
            ->getOne();
        return $data ? $data['img'] : '';
    }

    public function getArr($code): array
    {
        $list = $this->field('id,img')
            ->where(['code' => $code, 'status' => 1])
            ->order('sort DESC')
            ->select();
        $data = [];
        if ($list) {
            foreach ($list as $k => $v) {
                $data[$k] = $v['img'];
            }
        }
        return $data;
    }

    public function getBannerList(string $code, $limit = 10)
    {
        $list = $this->field('id,title,img')
            ->where(['code' => $code, 'status' => 1])
            ->order('sort DESC, id DESC')
            ->limit($limit)
            ->select();
        $GlobalService = GlobalService::getInstance();
        foreach ($list as $k => $v) {
            $v['img'] = $GlobalService->translate($v['img'], 2);
            $list[$k] = $v;
        }
        return $list;
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
