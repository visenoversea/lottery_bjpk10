<?php
//

namespace model;

use asura\Common;
use asura\db\Model;
use asura\Verify;
use service\RedisService;

class ip_model extends Model
{
    protected static $instance;

    //定时任务获取地址信息
    public function task()
    {
        $list = $this->where(['status' => 2])
            ->order('modify_time ASC')
            ->limit(100)
            ->select();
        foreach ($list as $v) {
            $res = Common::getIpApi($v['ip']);
            if ($res['status'] == 'success') {
                $address = $res['continent'];
                if ($res['country']) {
                    $address .= '-' . $res['country'];
                }
                if ($res['regionName']) {
                    $address .= '-' . $res['regionName'];
                }
                if ($res['city']) {
                    $address .= '-' . $res['city'];
                }
                if ($res['district']) {
                    $address .= '-' . $res['district'];
                }
                $isp = $res['isp'];
                $this->edit(['id' => $v['id'], 'address' => $address, 'isp' => $isp, 'status' => 1]);
            } else {
                if ((SYS_TIME - $v['create_time']) > 86400) {
                    $this->edit(['id' => $v['id'], 'status' => 0]);
                } else {
                    $this->edit(['id' => $v['id']]);
                }
            }
        }
    }

    public function getTid()
    {
        $data = $this->where(['ip' => Common::getIp(), 'status' => ['>=' => 0]])->getOne();
        if ($data) {
            return $data['tid'];
        }
        return '';
    }

    //设置推广id
    public function setTid($tid)
    {
        $data = $this->where(['ip' => Common::getIp(), 'status' => ['>=' => 0]])->getOne();
        if ($data) {
            if ($data['tid'] != $tid) {
                $this->edit(['id' => $data['id'], 'tid' => trim($tid)]);
            }
        } else {
            $this->add(['ip' => Common::getIp(), 'tid' => trim($tid), 'status' => 2]);
        }
    }

    public function getData($ip, $tid = ''): array
    {
        if (!$ip) {
            return ['code' => -2, 'msg' => 'IP地址是空的'];
        }
        $data = $this->where(['ip' => $ip, 'status' => ['>=' => 0]])->getOne();
        if (!$data) {
//            if (!Verify::isIp($ip)) {
//                return ['code' => -2, 'msg' => 'IP地址不正确'];
//            }
            $data = ['ip' => $ip, 'tid' => $tid, 'status' => 2];
            $data['id'] = $this->add($data);
        }
        return ['code' => 1, 'msg' => '成功', 'data' => $data];
    }

    public function addIP($ip)
    {
        $res = $this->where(['ip' => $ip, 'status' => ['>=' => 0]])->isExist();
        if (!$res) {
            $this->add(['ip' => $ip, 'status' => 2]);
        }
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
     * @param array $where
     * @return array
     */
    public function delById($id, array $where = []): array
    {
        $where['id'] = intval($id);
        $data = $this->where($where)->getOne();
        if (!$data) {
            return ['code' => -2, 'msg' => '未找到数据'];
        }
        $res = $this->edit(['status' => -1], $where);
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
