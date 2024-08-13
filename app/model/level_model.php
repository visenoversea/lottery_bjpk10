<?php
//

namespace model;

use asura\db\Model;

class level_model extends Model
{
    protected static $instance;

    public function checkData($data): array
    {


        if ($data['amount'] <= 0) {
            return ['code' => -2, 'msg' => '升级金额不能小与0'];
        }
        if (empty($data['title'])) {
            return ['code' => -2, 'msg' => '标题不能为空'];
        }
        if (empty($data['img'])) {
            return ['code' => -2, 'msg' => '图片地址不能为空'];
        }
        return ['code' => 1, 'msg' => '验证成功'];
    }

    //升级等级
    public function upLevel($user): array
    {


        $level = $this->where(['id' => $user['level_id'] + 1])->getOne();
        if (!$level) {
            return ['code' => -2, 'msg' => '未知的等级'];
        }
        if ($level['status'] != 1) {
            return ['code' => -2, 'msg' => '等级禁用'];
        }
        $up = false;
        //验证条件
        if ($user['balance'] >= $level['amount']) {
//            return ['code' => -2, 'msg' => "晋级条件不满足，金额需大于" . $level['amount']];
            $up = true;
        }
        $user_model = user_model::getInstance();

        $spreadNums = $user_model->where([
            'pid' => $user['pid'] . $user['id'] . ',',
            'type' => ['<' => 10],
            //累计充值100才算有效客户
//            'recharge_amount' => ['>=' => 100],
            'status' => ['>=' => 0]
        ])->count();
        if ($spreadNums >= $level['spread_nums']) {
//            return ['code' => -2, 'msg' => "首次充值大于100的有效推广下线不足:" . $level['spread_nums']];
            $up = true;
        }
        if (!$up) {
            return ['code' => -2, 'msg' => "余额不足{$level['amount']},或推广人数不足:" . $level['spread_nums']];
        }
        //满足条件升级
        $res = $user_model->edit(['id' => $user['id'], 'level_id' => $level['id']], ['level_id' => $user['level_id']]);
        if (!$res) {
            return ['code' => -2, 'msg' => '升级失败'];
        }
        if ($level['reward'] > 0) {
            $user_amount_model = user_amount_model::getInstance();
            $res = $user_amount_model->where(['type' => 0, 'del' => 0,'user_id' => $user['id'], 'title' => $level['title'], 'des' => '晋级奖励'])->isExist();
            if (!$res) {
                $res = $user_model->changeBalance($user['id'], $level['reward'], $level['title'], '晋级奖励');
                $user = $res['user'];
            }
        } else {
            $user['level_id'] = $level['id'];
        }
        $this->upLevel($user);
        return ['code' => 1, 'msg' => '升级成功'];
    }

    //升级代理的等级
    public function upAgentLevel($agentList)
    {
        $agent = array_pop($agentList);
        $res = $this->upLevel($agent);
        if ($res['code'] == 1 && $agentList) {
            //代理升级成功，继续追寻上级代理的升级
            $this->upAgentLevel($agentList);
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
