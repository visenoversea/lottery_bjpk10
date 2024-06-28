<?php
//

namespace model;

use asura\db\Model;

class product_hq_model extends Model
{
    protected static $instance;

    //获取分钟K线
    public function getMinuteKline($start_time)
    {
        //分钟数据
        $start_time = strtotime(date('YmdHi', $start_time));
        $end_time = SYS_TIME;
        if ($start_time > $end_time) {
            //时间异常
            return [];
        }
        return $this->field("`product_id`,0 AS type,SUBSTRING_INDEX(GROUP_CONCAT(`price` ORDER BY `kt`),',',1) AS `open`,SUBSTRING_INDEX(GROUP_CONCAT(`price` ORDER BY `kt` DESC),',',1) AS `close`,MIN(`price`) AS `low`,MAX(`price`) AS `high`,SUM(`vol`) AS `vol`,(`m`*60) AS `kt`")
            ->where(['kt' => ['BETWEEN' => [$start_time,$end_time]]])
            ->group('`product_id`,`m`')
            ->select();
    }

    //生成自营币行情数据(定时任务)
    public function dataCreat($data)
    {
        $m = $data['kt'] / 60;
        $start_time = $data['kt'];      //开始时间
        $end_time = $data['kt'] + 60;   //结束时间
        $price = $data['open'];         //当前价格
        $mt = pow(10, $data['fixed']);
        //最低价格
        /*************************参数配置************************/
        if (mt_rand(0, 1) == 1) {
            $aims = [
                //平横
                ['aims' => $data['close'], 'run' => 'p'],
                //跌
                ['aims' => $data['low'], 'run' => 'd'],
                //涨
                ['aims' => $data['high'], 'run' => 'z']
            ];
        } else {
            $aims = [
                //平横
                ['aims' => $data['close'], 'run' => 'p'],
                //涨
                ['aims' => $data['high'], 'run' => 'z'],
                //跌
                ['aims' => $data['low'], 'run' => 'd']
            ];
        }
        $mubiao = array_pop($aims);
        $beishu = 3;//起伏速度，倍数越高波动越大
        //设置初始波动
        if ($data['high'] == $data['low']) {
            $bodong = 1;
        } else {
            $bodong = intval(($data['high'] - $data['low']) * $mt / 40);
            if ($bodong < 1) {
                $bodong = 1;
            }
        }
        /*************************参数配置************************/
        $hqData = [];
        while ($start_time < $end_time) {
            //计算当前价
            if ($price > $data['high']) {
                $price = $data['high'];
            } else if ($price < $data['low']) {
                $price = $data['low'];
            }
            //计算当前销量
//            [
//                'product_id' => $data['product_id'],
//                'price' => $price,
//                'vol' => round($data['vol'] / mt_rand(50, 60), 2),
//                'kt' => $start_time,
//                'm' => $m,
//            ];
            $hqData[] = [
                $data['product_id'],
                $price,
                round($data['vol'] / mt_rand(10, 30), 2),
                $start_time,
                $m,
                SYS_TIME
            ];
            $start_time += 1;
            if ($mubiao['run'] == 'z') {
                $min_rand = round($price * $mt - $bodong);
                $max_rand = round($price * $mt + $bodong * $beishu);
                $price = mt_rand($min_rand, $max_rand) / $mt;
                //涨
                if ($price > $mubiao['aims']) {
                    $price = $mubiao['aims'];
                    $mubiao = array_pop($aims);
                }
            } else if ($mubiao['run'] == 'd') {
                //跌
                $min_rand = round($price * $mt - $bodong * $beishu);
                $max_rand = round($price * $mt + $bodong);
                $price = mt_rand($min_rand, $max_rand) / $mt;
                if ($price < $mubiao['aims']) {
                    $price = $mubiao['aims'];
                    $mubiao = array_pop($aims);
                }
            } else {
                //平衡
                if ($price > $mubiao['aims']) {
                    //var_dump('跌平衡----');
                    $min_rand = round($price * $mt - $bodong * $beishu);
                    $max_rand = round($price * $mt + $bodong);
                    $price = mt_rand($min_rand, $max_rand) / $mt;
                } else {
                    //var_dump('----涨平衡');
                    $min_rand = round($price * $mt - $bodong);
                    $max_rand = round($price * $mt + $bodong * $beishu);
                    $price = mt_rand($min_rand, $max_rand) / $mt;
                }
            }
        }
        $hqData[count($hqData) - 1][1] = $data['close'];
        $this->batchAdd($hqData);
    }

    //获取单条数据
    public function getData($id, $where = [], $field = '*')
    {
        $where['id'] = intval($id);
        return $this->field($field)->where($where)->getOne();
    }

    //批量新增
    public function batchAdd($data)
    {
        $this->insertAll(['product_id', 'price', 'vol', 'kt', 'm','create_time'], $data);
    }

    //新增
    public function add(array $data = []): int
    {
        $data['create_time'] = SYS_TIME;
        return $this->insert($data);
    }

    //编辑
    public function edit(array $data, array $where = [])
    {
        if (isset($data['id'])) {
            $where['id'] = intval($data['id']);
            unset($data['id']);
        }
        return $this->where($where)->update($data);
    }

    public function delByWhere($where = [])
    {
        return $this->where($where)->del();
    }

}
