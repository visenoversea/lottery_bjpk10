<?php
//

namespace model;

use asura\db\Model;
use service\GlobalService;
use service\RedisService;

class config_model extends Model
{
    protected static $instance;
    private $data=[];

    /**
     * 通过父id获取配置
     * @param int $parent_id
     * @param string $k
     * @param int $level
     * @return array
     */
    public function getConfigData(int $parent_id, int $level = 2): array
    {
        if (isset($this->data[$parent_id])) {
            return $this->data[$parent_id];
        }
        $where = ['parent_id' => $parent_id, 'level' => ['<=' => $level], 'status' => 1];
        $list = $this->field('id,k,v')->where($where)
            ->order('id ASC')->limit(-1)->select();
        $data = [];
        foreach ($list as $v) {
            $data[$v['k']] = json_decode($v['v'], true);
        }
        return $this->data = $data;
    }

    //获取单条数据
    public function getConfig(int $parent_id, string $k = '')
    {
        $res = $this->field('id,k,v')->where(['parent_id' => $parent_id, 'k' => $k, 'status' => 1])->getOne();
        if ($res) {
            return json_decode($res['v'], true);
        }
        return '';
    }

    //获取单条数据,带缓存
    public function getCacheConfig(int $parent_id, string $k = '')
    {
        $RedisService = RedisService::getInstance();
        $cacheKey = 'config_global';
        $config = $RedisService->hget($cacheKey,$k);
        if($config == null){
            $res = $this->field('id,k,v')->where(['parent_id' => $parent_id, 'k' => $k, 'status' => 1])->getOne();
            if (!$res) {
                return null;
            }
            $config = $res['v'];
            $RedisService->hset($cacheKey,$k,$config);
        }
        return $config;
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
            $this->edit(['status' => -1],['parent_id' => $data['id']]);
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
