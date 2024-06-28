<?php
//

namespace model;

use asura\db\Model;
use service\HuoBiService;
use service\SinaService;
use service\WebSocketService;

class product_kline_model extends Model
{
    protected static $instance;

    /**
     * 更新K线
     * @param $data
     * @param int $up
     */
    public function updateKline($data, int $up = 1)
    {
        $productKline = $this->where(['product_id' => $data['product_id'], 'type' => $data['type'], 'kt' => $data['kt']])->getOne();
        if ($productKline) {
            //更新
            $this->edit([
                'id' => $productKline['id'],
                'close' => $data['close'],
                'low' => $data['low'],
                'high' => $data['high'],
                'vol' => $data['vol']
            ]);
        } else {
            $kline=[
                'product_id' => $data['product_id'],
                'type' => $data['type'],
                'open' => $data['open'],
                'close' => $data['close'],
                'low' => $data['low'],
                'high' => $data['high'],
                'vol' => $data['vol'],
                'kt' => $data['kt']
            ];
            //插入
            $kline['id']=$this->add($kline);
            if($up==1){
                if ($data['type'] == 6) {
                    //更新产品数据
                    $product_model = product_model::getInstance();
                    $product_model->edit([
                        'id'=>$data['product_id'],
                        'price'=>$data['close'],
                        'kline'=>json_encode([
                            'open' => $data['open'],
                            'close' => $data['close'],
                            'low' => $data['low'],
                            'high' => $data['high'],
                            'vol' => $data['vol'],
                        ]),
                    ]);
                }
                //推送更新数据
                $WebSocketService = WebSocketService::getInstance();
                $WebSocketService->klineTime($data['product_id'],$data['type']);
            }
        }
    }

    public function kline5Min($product_id, $start_time = 0, $end_time = 0)
    {
        if ($start_time == 0) {
            $start_time = SYS_TIME;
        }
        $start_time = floor($start_time / 300) * 300;
        if ($end_time > 0) {
            $end_time = ceil($end_time / 300) * 300 + 299;
        } else {
            $end_time = SYS_TIME;
        }
        if ($start_time > $end_time) {
            //时间异常
            return [];
        }
        $list = $this->field("`product_id`,1 AS type,SUBSTRING_INDEX(GROUP_CONCAT(`open` ORDER BY `kt`),',',1) AS `open`,SUBSTRING_INDEX(GROUP_CONCAT(`close` ORDER BY `kt` DESC),',',1) AS `close`,MIN(`low`) AS `low`,MAX(`high`) AS `high`,SUM(`vol`) AS `vol`,FLOOR(`kt`/300)*300 AS `time`")
            ->where(['type' => 0, 'product_id' => $product_id, 'kt' => ['BETWEEN' => [$start_time, $end_time]]])
            ->group('`time`')
            ->select();
        foreach ($list as $v) {
            $v['kt'] = $v['time'];
            $this->updateKline($v);
        }
    }

    //统计15MinK线
    public function kline15Min($product_id, $start_time = 0, $end_time = 0)
    {
        if ($start_time == 0) {
            $start_time = SYS_TIME;
        }
        $start_time = floor($start_time / 900) * 900;
        if ($end_time > 0) {
            $end_time = ceil($end_time / 900) * 900 + 899;
        } else {
            $end_time = SYS_TIME;
        }
        if ($start_time > $end_time) {
            //时间异常
            return [];
        }
        $list = $this->field("`product_id`,2 AS type,SUBSTRING_INDEX(GROUP_CONCAT(`open` ORDER BY `kt`),',',1) AS `open`,SUBSTRING_INDEX(GROUP_CONCAT(`close` ORDER BY `kt` DESC),',',1) AS `close`,MIN(`low`) AS `low`,MAX(`high`) AS `high`,SUM(`vol`) AS `vol`,FLOOR(`kt`/900)*900 AS `time`")
            ->where(['type' => 1, 'product_id' => $product_id, 'kt' => ['BETWEEN' => [$start_time, $end_time]]])
            ->group('`time`')
            ->select();
        foreach ($list as $k => $v) {
            $v['kt'] = $v['time'];
            $this->updateKline($v);
        }
    }

    //统计30MinK线
    public function kline30Min($product_id, $start_time = 0, $end_time = 0)
    {
        if ($start_time == 0) {
            $start_time = SYS_TIME;
        }
        $start_time = floor($start_time / 1800) * 1800;
        if ($end_time > 0) {
            $end_time = ceil($end_time / 1800) * 1800 + 1799;
        } else {
            $end_time = SYS_TIME;
        }
        if ($start_time > $end_time) {
            //时间异常
            return [];
        }
        $list = $this->field("`product_id`,3 AS type,SUBSTRING_INDEX(GROUP_CONCAT(`open` ORDER BY `kt`),',',1) AS `open`,SUBSTRING_INDEX(GROUP_CONCAT(`close` ORDER BY `kt` DESC),',',1) AS `close`,MIN(`low`) AS `low`,MAX(`high`) AS `high`,SUM(`vol`) AS `vol`,FLOOR(`kt`/1800)*1800 AS `time`")
            ->where(['type' => 2, 'product_id' => $product_id, 'kt' => ['BETWEEN' => [$start_time, $end_time]]])
            ->group('`time`')
            ->select();
        foreach ($list as $v) {
            $v['kt'] = $v['time'];
            $this->updateKline($v);
        }
    }

    //统计60MinK线
    public function kline60Min($product_id, $start_time = 0, $end_time = 0)
    {
        if ($start_time == 0) {
            $start_time = SYS_TIME;
        }
        $start_time = floor($start_time / 3600) * 3600;
        if ($end_time > 0) {
            $end_time = ceil($end_time / 3600) * 3600 + 3599;
        } else {
            $end_time = SYS_TIME;
        }
        if ($start_time > $end_time) {
            //时间异常
            return [];
        }
        $list = $this->field("`product_id`,4 AS type,SUBSTRING_INDEX(GROUP_CONCAT(`open` ORDER BY `kt`),',',1) AS `open`,SUBSTRING_INDEX(GROUP_CONCAT(`close` ORDER BY `kt` DESC),',',1) AS `close`,MIN(`low`) AS `low`,MAX(`high`) AS `high`,SUM(`vol`) AS `vol`,FLOOR(`kt`/3600)*3600 AS `time`")
            ->where(['type' => 3, 'product_id' => $product_id, 'kt' => ['BETWEEN' => [$start_time, $end_time]]])
            ->group('`time`')
            ->select();
        foreach ($list as $k => $v) {
            $v['kt'] = $v['time'];
            $this->updateKline($v);
        }
    }

    //统计4小时
    public function kline4hour($product_id, $start_time = 0, $end_time = 0)
    {
        if ($start_time == 0) {
            $start_time = SYS_TIME;
        }
        $start_time = floor($start_time / 14400) * 14400;
        if ($end_time > 0) {
            $end_time = ceil($end_time / 14400) * 14400 + 14399;
        } else {
            $end_time = SYS_TIME;
        }
        if ($start_time > $end_time) {
            //时间异常
            return [];
        }
        $list = $this->field("`product_id`,5 AS type,SUBSTRING_INDEX(GROUP_CONCAT(`open` ORDER BY `kt`),',',1) AS `open`,SUBSTRING_INDEX(GROUP_CONCAT(`close` ORDER BY `kt` DESC),',',1) AS `close`,MIN(`low`) AS `low`,MAX(`high`) AS `high`,SUM(`vol`) AS `vol`,FLOOR(`kt`/14400)*14400 AS `time`")
            ->where(['type' => 4, 'product_id' => $product_id, 'kt' => ['BETWEEN' => [$start_time, $end_time]]])
            ->group('`time`')
            ->select();
        foreach ($list as $k => $v) {
            $v['kt'] = $v['time'];
            $this->updateKline($v);
        }
    }

    //统计日K线
    public function kline1Day($product_id, $start_time = 0, $end_time = 0)
    {
        if ($start_time == 0) {
            $start_time = SYS_TIME;
        }
        $start_time = strtotime(date('Ymd', $start_time));
        if ($end_time > 0) {
            $end_time = strtotime(date('Ymd', $end_time)) + 86399;
        } else {
            $end_time = SYS_TIME;
        }
        if ($start_time > $end_time) {
            //时间异常
            return [];
        }
        $list = $this->field("`product_id`,6 AS type,SUBSTRING_INDEX(GROUP_CONCAT(`open` ORDER BY `kt`),',',1) AS `open`,SUBSTRING_INDEX(GROUP_CONCAT(`close` ORDER BY `kt` DESC),',',1) AS `close`,MIN(`low`) AS `low`,MAX(`high`) AS `high`,SUM(`vol`) AS `vol`,FROM_UNIXTIME(`kt`,'%Y%m%d') AS `time`")
            ->where(['type' => 4, 'product_id' => $product_id, 'kt' => ['BETWEEN' => [$start_time, $end_time]]])
            ->group('`time`')
            ->select();
        foreach ($list as $v) {
            $v['kt'] = strtotime($v['time']);
            $this->updateKline($v);
        }
    }

    //统计1week线
    public function kline1week($product_id, $start_time = 0, $end_time = 0)
    {
        if ($start_time == 0) {
            $start_time = SYS_TIME;
        }
        $w = date('w', $start_time);
        $w = $w ?: 7;
        $start_time = strtotime(date('Ymd', $start_time)) - ($w - 1) * 86400;
        if ($end_time > 0) {
            $end_time = strtotime(date('Ymd', $start_time)) - date('w', $start_time) * 86400 + 86400 * 7-1;
        } else {
            $end_time = SYS_TIME;
        }
        if ($start_time > $end_time) {
            //时间异常
            return [];
        }
        $list = $this->field("`product_id`,7 AS type,SUBSTRING_INDEX(GROUP_CONCAT(`open` ORDER BY `kt`),',',1) AS `open`,SUBSTRING_INDEX(GROUP_CONCAT(`close` ORDER BY `kt` DESC),',',1) AS `close`,MIN(`low`) AS `low`,MAX(`high`) AS `high`,SUM(`vol`) AS `vol`,FROM_UNIXTIME(`kt`,'%Y%u') AS `time`,`kt`")
            ->where(['type' => 6, 'product_id' => $product_id, 'kt' => ['BETWEEN' => [$start_time, $end_time]]])
            ->group('`time`')
            ->select();
        foreach ($list as $k => $v) {
            $v['kt'] = strtotime(date('Y-m-d', $v['kt']));
            $this->updateKline($v);
        }
    }

    //统计1monK线
    public function kline1mon($product_id, $start_time = 0, $end_time = 0)
    {
        if ($start_time == 0) {
            $start_time = SYS_TIME;
        }
        $start_time = strtotime(date('Ym01', $start_time));
        if ($end_time > 0) {
            $end_time = strtotime('first day of +1 month', $end_time)-1;
        } else {
            $end_time = SYS_TIME;
        }
        if ($start_time > $end_time) {
            //时间异常
            return [];
        }
        $list = $this->field("`product_id`,8 AS type,SUBSTRING_INDEX(GROUP_CONCAT(`open` ORDER BY `kt`),',',1) AS `open`,SUBSTRING_INDEX(GROUP_CONCAT(`close` ORDER BY `kt` DESC),',',1) AS `close`,MIN(`low`) AS `low`,MAX(`high`) AS `high`,SUM(`vol`) AS `vol`,FROM_UNIXTIME(`kt`,'%Y-%m') AS `time`")
            ->where(['type' => 6, 'product_id' => $product_id, 'kt' => ['BETWEEN' => [$start_time, $end_time]]])
            ->group('`time`')
            ->select();
        foreach ($list as $k => $v) {
            $v['kt'] = strtotime($v['time']);
            $this->updateKline($v);
        }
    }

    //同步火币数据
    public function syncHuobi($product, $period)
    {
        $api_config = json_decode($product['api_config'], true);
        $HuoBiService = HuoBiService::getInstance();
        $res = $HuoBiService->get_history_kline($api_config['symbol'], $period, 100);
        if ($res['code'] == 1 && isset($res['data'][0])) {
            foreach ($res['data'] as $kline) {
                $this->updateKline([
                    'product_id' => $product['id'],
                    'type' => $period,
                    'open' => round($kline['open'], $product['fixed']),
                    'close' => round($kline['close'], $product['fixed']),
                    'low' => round($kline['low'], $product['fixed']),
                    'high' => round($kline['high'], $product['fixed']),
                    'vol' => round($kline['vol'], 2),
                    'kt' => $kline['id'],
                ],0);
            }
        }
    }

    public function syncSina($product, $period, $size = 1440)
    {
        $api_config = json_decode($product['api_config'], true);
        $SinaService = SinaService::getInstance();
        $res = $SinaService->getHistoryKlineData($api_config['symbol'], $period, $size);
        if ($res['code'] == 1) {
            foreach ($res['data'] as $kline) {
                $this->updateKline([
                    'product_id' => $product['id'],
                    'type' => $period,
                    'open' => round($kline['open'], $product['fixed']),
                    'close' => round($kline['close'], $product['fixed']),
                    'low' => round($kline['low'], $product['fixed']),
                    'high' => round($kline['high'], $product['fixed']),
                    'vol' => round($kline['vol'], 2),
                    'kt' => $kline['kt'],
                ], 0);
            }
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

    public function delByWhere($where = [])
    {
        return $this->where($where)->del();
    }

}
