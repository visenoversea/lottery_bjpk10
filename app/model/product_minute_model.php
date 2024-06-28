<?php
//

namespace model;

use asura\db\Model;

class product_minute_model extends Model
{
    protected static $instance;

    public function kline($start_time, $end_time, $price, $fixed, $bd, $minVol, $maxVol, $zdRate = 50, $min = '', $max = ''): array
    {
        //小数位数
        $mt = pow(10, $fixed);
        $bd = intval($bd * $mt);
        if ($bd < 2) {
            $bd = 2;
        }
        //最低价限制,防止出现负数
        $minPrice = 1 / $mt * 200;
        $price = round($price, $fixed);
        $list = [];
        do {
            $data = [];
            $start_time += 60;
            //分钟日期时间
            $data[0] = date('Y-m-d H:i', $start_time);
            //开盘价
            $data[1] = $price;
            //涨跌 1-涨 0-跌
            if ($data[1] < $minPrice) {
                //价格过低只能上涨
                $zd = 1;
            } else {
                if ($min !== '' && $data[1] < $min) {
                    //价格低于限制，增加涨的概率
                    $zdRate = 62;
                }
                if ($max !== '' && $data[1] > $max) {
                    //价格高于限制，减少涨的概率
                    $zdRate = 38;
                }
                $zd = mt_rand(1, 100) <= $zdRate ? 1 : 0;
            }
            //收盘价
            if ($zd == 1) {
                //涨
                $data[2] = $data[1] + mt_rand(1, $bd) / $mt;
                //最低
                $data[3] = $data[1] - mt_rand(0, $bd / 2) / $mt;
                //最高
                $data[4] = $data[2] + mt_rand(0, $bd) / $mt;
            } else {
                //跌
                $data[2] = $data[1] - mt_rand(1, $bd) / $mt;
                //最低
                $data[3] = $data[2] - mt_rand(0, $bd) / $mt;
                //最高
                $data[4] = $data[1] + mt_rand(0, $bd / 2) / $mt;
            }
            $data[2] = round($data[2], $fixed);
            $data[3] = round($data[3], $fixed);
            $data[4] = round($data[4], $fixed);
            //重置开盘价
            $price = $data[2];
            //交易量
            $data[5] = mt_rand($minVol * 100, $maxVol * 100) / 100;
            $list[] = $data;
        } while ($start_time < $end_time);
        return $list;
    }

    public function targetKline($start_time, $price, $target, $fixed, $bd, $minVol, $maxVol, $sudu = 3): array
    {
        //小数位数
        $mt = pow(10, $fixed);
        $bd = intval($bd * $mt);
        if ($bd < 5) {
            $bd = 5;
        }
        //开盘价
        $price = round($price, $fixed);
        //目标价
        $target = round($target, $fixed);
        //涨跌幅
        $zdf = 50;
        if ($target > $price) {
            $type = 1;
            //涨
            $bd1 = $bd;
            $bd2 = $bd / 10 * (10 - $sudu);
            $zdf += $sudu;
        } else {
            $type = 2;
            //跌
            $bd1 = $bd / 10 * (10 - $sudu);
            $bd2 = $bd;
            $zdf -= $sudu;
        }
        $list = [];
        //循环次数
        $i = 0;
        do {
            $i++;
            $data = [];
            $start_time += 60;
            //分钟日期时间
            $data[0] = date('Y-m-d H:i', $start_time);
            //开盘价
            $data[1] = $price;
            //涨跌1-涨 0-跌
            $zd = mt_rand(1, 100) <= $zdf ? 1 : 0;
            //收盘价
            if ($zd == 1) {
                //涨
                $data[2] = $data[1] + mt_rand(1, $bd1) / $mt;
                $data[3] = $data[1] - mt_rand(0, $bd / 2) / $mt;//最低
                $data[4] = $data[2] + mt_rand(0, $bd) / $mt;//最高
            } else {
                //跌
                $data[2] = $data[1] - mt_rand(1, $bd2) / $mt;
                $data[3] = $data[2] - mt_rand(0, $bd) / $mt;//最低
                $data[4] = $data[1] + mt_rand(0, $bd / 2) / $mt;//最高
            }
            $data[2] = round($data[2], $fixed);
            $data[3] = round($data[3], $fixed);
            $data[4] = round($data[4], $fixed);
            //重置开盘价
            $price = $data[2];
            //交易量
            $data[5] = mt_rand($minVol * 100, $maxVol * 100) / 100;
            $list[] = $data;
            if ($type == 1) {
                //目标价为涨
                if ($data[2] > $target) {
                    //达到目标价退出循环
                    $i = 360;
                }
            } else if ($type == 2) {
                //目标价为跌
                if ($data[2] < $target) {
                    //达到目标价退出循环
                    $i = 360;
                }
            }
        } while ($i < 360);
        return $list;
    }

    //获取单条数据
    public function getData($id, $where = [], $field = '*')
    {
        $where['id'] = intval($id);
        return $this->field($field)->where($where)->getOne();
    }

    //批量插入数据
    public function batchAdd($field, $data)
    {
        $this->insertAll($field, $data);
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

    public function delByWhere($where = [])
    {
        return $this->where($where)->del();
    }

}
