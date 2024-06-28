<?php
//

namespace model;

use asura\db\Model;

class lottery2_model extends Model
{
    protected static $instance;

    public function spinWheel($prizes=[]) {
        $totalRange = 0; // 总范围
        $rangeSums = []; // 各个奖品范围之和

        // 计算总范围和范围之和
        foreach ($prizes as $prize) {
            $totalRange += $prize['ranges'];
            $rangeSums[] = $totalRange;
        }

        // 如果总范围为0，或者奖品列表为空，则返回空
        if ($totalRange === 0) {
            return [];
        }

        // 生成一个随机数
        $randomNumber = mt_rand(1, $totalRange);

        // 根据随机数确定抽中的奖品
        $selectedPrize = [];
        foreach ($rangeSums as $index => $rangeSum) {
            if ($randomNumber <= $rangeSum) {
                $selectedPrize = $prizes[$index];
                break;
            }
        }

        // 返回抽中的奖品
        return $selectedPrize;
    }

    //数据验证
    public function checkData($data): array
    {
        if ($data['amount'] < 0) {
            return ['code' => -2, 'msg' => '奖励金额不能小于0'];
        }
        if (empty($data['title'])) {
            return ['code' => -2, 'msg' => '奖品标题不能为空'];
        }
        return ['code' => 1, 'msg' => '成功'];
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
