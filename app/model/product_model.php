<?php
//

namespace model;

use asura\db\Model;
use DateTime;
use DateTimeZone;

class product_model extends Model
{
    protected static $instance;

    public function productType(): array
    {
        return $this->belongsTo(product_type_model::class, 'product_type_id');
    }

    public function userProduct(): array
    {
        return $this->belongsTo(user_product_model::class, 'id','product_id');
    }

    /**
     * @throws \Exception
     */
    public function isForexTradingTime(): bool
    {
        $now = new DateTime('now', new DateTimeZone('Asia/Shanghai'));  // 获取当前时间（使用上海时区）
        $weekday = $now->format('N');  // 获取当前是星期几（1表示星期一，7表示星期日）
        $hour = $now->format('G');  // 获取当前小时数（24小时制）
        // 根据外汇市场的交易时间计算
        if (($weekday == 1 && $hour >= 5) || ($weekday >= 2 && $weekday <= 5) || ($weekday == 6 && $hour < 5)) {
            return true;
        } else {
            return false;
        }
    }

    //获取行情数据
    public function getHq($price, $fixed): array
    {
        $data = ['buy' => [], 'buyTotal' => 0, 'sell' => [], 'sellTotal' => 0];
        $mt = pow(10, $fixed);
        $sell['price'] = $buy['price'] = $price;
        for ($i = 1; $i <= 10; $i++) {
            $buy = [
                'price' => round($buy['price'] - mt_rand(1, 10) / $mt, $fixed),
                'num' => mt_rand(10, 10000) / 100,
            ];
            if ($i <= 5) {
                $data['buyTotal'] += $buy['num'];
            }
            $data['buy'][] = $buy;
            $sell = [
                'price' => round($sell['price'] + mt_rand(1, 10) / $mt, $fixed),
                'num' => mt_rand(10, 10000) / 100,
            ];
            if($i<=5){
                $data['sellTotal'] += $sell['num'];
            }
            $data['sell'][] = $sell;
        }
        $data['sell'] = array_reverse($data['sell']);
        return $data;
    }

    public function checkData($data): array
    {
        if (empty($data['title'])) {
            return ['code' => -2, 'msg' => '标题不能为空'];
        }
        if ($data['fixed'] > 8 || $data['fixed'] < 0) {
            return ['code' => -2, 'msg' => '小数位数参数异常'];
        }
        if ($data['type'] == 0 && !$data['data_config']['trade']) {
            return ['code' => -2, 'msg' => '请添加币币交易配置'];
        }
        if ($data['type'] == 1 && !$data['data_config']['contract']) {
            return ['code' => -2, 'msg' => '请添加杠杆配置'];
        }
        if ($data['type'] == 2 && !$data['data_config']['time']) {
            return ['code' => -2, 'msg' => '请添加秒合约配置'];
        }
        if ($data['type'] == 3 && !$data['data_config']['lever']) {
            return ['code' => -2, 'msg' => '请添加外汇配置'];
        }
        if ($data['fee_rate'] > 0 && $data['fee_rate'] < 0.0001) {
            return ['code' => -2, 'msg' => '手续费率配置异常'];
        }
        $where = ['title' => $data['title'], 'type' => $data['type'], 'status' => ['>=' => 0]];
        if (isset($data['id'])) {
            $where['id'] = ['<>' => $data['id']];
        }
        $res=$this->where($where)->isExist();
        if($res){
            return ['code' => -2, 'msg' => '已存在相同名字产品'];
        }
        return ['code' => 1, 'msg' => '验证成功'];
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
