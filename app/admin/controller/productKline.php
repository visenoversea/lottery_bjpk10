<?php
/**
 *产品K线
 */

namespace admin\controller;

use admin\classes\base;
use model\product_hq_model;
use model\product_minute_model;
use model\product_model;
use Exception;

class productKline extends base
{
    public function getList($id, $bodong, $type = 1, $date_time = [], $zdf = 50, $min = '', $max = '')
    {
        $product_model = product_model::getInstance();
        $product = $product_model->field('id,price,fixed,api,api_config')
            ->where(['id' => intval($id), 'status' => ['>=' => 0]])->getOne();
        if (!$product) {
            $this->GlobalService->json(['code' => -2, 'msg' => '产品不存在!']);
        }
        $api_config = json_decode($product['api_config'], true);
        $product_minute_model = product_minute_model::getInstance();
        //时间配置
        if ($type == 1) {
            //获取最后的时间节点
            $res = $product_minute_model->where([
                'product_id' => $product['id'],
                'kt' => ['>' => SYS_TIME]
            ])->order('kt DESC')->getOne();
            if ($res) {
                $start_time = $res['kt'];
                $openPrice = $res['close'];
            } else {
                $start_time = strtotime(date('Y-m-d H:i'));
                $product_hq_model = product_hq_model::getInstance();
                $hq = $product_hq_model->where(['product_id' => $product['id']])->order('kt DESC')->getOne();
                $openPrice = $hq ? $hq['price'] : $product['price'];
            }
            $end_time = $start_time + 86400;
        } else if ($type == 2) {
            //今日预览
            $start_time = strtotime(date('Y-m-d H:i', SYS_TIME + 120));
            $end_time = strtotime('today') + 86400;
            $minute = $product_minute_model->where(['product_id' => $product['id'], 'kt' => $start_time])->getOne();
            if ($minute) {
                $openPrice = $minute['close'];
            } else {
                $product_hq_model = product_hq_model::getInstance();
                $hq = $product_hq_model->where(['product_id' => $product['id']])->order('kt DESC')->getOne();
                $openPrice = $hq ? $hq['price'] : $product['price'];
            }
        } else {
            //自定义时间
            $start_time = strtotime($date_time[0]);
            if ($start_time <= SYS_TIME) {
                $start_time = strtotime(date('Y-m-d H:i', SYS_TIME + 120));
            } else {
                $start_time = strtotime(date('Y-m-d H:i', $start_time));
            }
            $end_time = strtotime($date_time[1]);
            if ($start_time >= $end_time) {
                $end_time = $start_time + 86400;
            } else {
                if (($end_time - $end_time) > 86400 * 3) {
                    $this->GlobalService->json(['code' => -2, 'msg' => '时间选择跨度不能超过3天!']);
                }
            }
            $res = $product_minute_model->where(['product_id' => $product['id'],
                'kt' => ['>' => SYS_TIME, '<=' => $start_time]])
                ->order('kt DESC')
                ->getOne();
            if ($res) {
                $openPrice = $res['close'];
            } else {
                $start_time = strtotime(date('Y-m-d H:i'));
                $product_hq_model = product_hq_model::getInstance();
                $hq = $product_hq_model->where(['product_id' => $product['id']])->order('kt DESC')->getOne();
                $openPrice = $hq ? $hq['price'] : $product['price'];
            }
        }
        $min = trim($min);
        $max = trim($max);
        $kline = $product_minute_model->kline($start_time, $end_time, $openPrice, $product['fixed'], $bodong, $api_config['minVol'], $api_config['maxVol'], $zdf, $min, $max);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功',
            'date_time' => [date('Y-m-d H:i', $start_time), date('Y-m-d H:i', $end_time)],
            'kline' => $kline
        ]);
    }

    public function getTargetList($id, $target, $bodong, $sudu = 3)
    {
        $product_model = product_model::getInstance();
        $product = $product_model->field('id,price,fixed,api,api_config')
            ->where(['id' => intval($id), 'status' => ['>=' => 0]])->getOne();
        if (!$product) {
            $this->GlobalService->json(['code' => -2, 'msg' => '产品不存在!']);
        }
        $api_config = json_decode($product['api_config'], true);
        $product_minute_model = product_minute_model::getInstance();
        //获取开始时间
        $start_time = strtotime(date('Y-m-d H:i', SYS_TIME + 120));
        $minute = $product_minute_model->where(['product_id' => $product['id'], 'kt' => $start_time])->getOne();
        if ($minute) {
            $openPrice = $minute['close'];
        } else {
            $product_hq_model = product_hq_model::getInstance();
            $hq = $product_hq_model->where(['product_id' => $product['id']])->order('kt DESC')->getOne();
            $openPrice = $hq ? $hq['price'] : $product['price'];
        }
        $kline = $product_minute_model->targetKline($start_time, $openPrice, $target, $product['fixed'], $bodong, $api_config['minVol'], $api_config['maxVol'], $sudu);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'kline' => $kline]);
    }

    public function getMinuteList($id, $date_time = [])
    {
        if ($id == '') {
            $this->GlobalService->json(['code' => -2, 'msg' => '请选择产品']);
        }
        if ($date_time) {
            $where['kt']['>='] = strtotime($date_time[0]);
            $where['kt']['<='] = strtotime($date_time[1]);
        } else {
            $this->GlobalService->json(['code' => -2, 'msg' => '请选择时间范围!']);
        }
        $where['product_id'] = intval($id);
        $product_minute_model = product_minute_model::getInstance();
        $list = $product_minute_model->where($where)->order('kt DESC')->limit(4320)->select();
        $kline = [];
        if ($list) {
            foreach ($list as $v) {
                $kline[] = [
                    date('Y-m-d H:i', $v['kt']),
                    $v['open'],
                    $v['close'],
                    $v['low'],
                    $v['high'],
                    $v['vol'],
                ];
            }
            $kline = array_reverse($kline);
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'kline' => $kline]);
    }

    public function add($id, $data)
    {
        $product_model = product_model::getInstance();
        $product = $product_model->field('id,price')->where(['id' => intval($id)])->getOne();
        if (!$product) {
            $this->GlobalService->json(['code' => -2, 'msg' => '产品不存在!']);
        }
        if (!$data) {
            $this->GlobalService->json(['code' => -2, 'msg' => '数据不能为空!']);
        }
        if (!is_array($data)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '数据格式错误!']);
        }
        $time = strtotime($data[0][0]);
        if ($time < SYS_TIME - 120) {
            $this->GlobalService->json(['code' => -2, 'msg' => 'K线的开始时间已经超过当前时间，请重新生成数据并保存!']);
        }
        $list = [];
        foreach ($data as $v) {
            $kt = strtotime($v[0]);
            if ($kt < SYS_TIME + 60) {
                continue;
            }
            $list[] = [$product['id'], $v[1], $v[2], $v[3], $v[4], $v[5], $kt, SYS_TIME, SYS_TIME];
        }
        $product_minute_model = product_minute_model::getInstance();
        $product_hq_model = product_hq_model::getInstance();
        $dbh = $product_minute_model->begin();
        try {
            $product_minute_model->delByWhere(['product_id' => $product['id'], 'kt' => ['>=' => $time]]);
            $product_hq_model->delByWhere(['product_id' => $product['id'], 'kt' => ['>=' => $time]]);
            $product_minute_model->batchAdd(['product_id', 'open', 'close', 'low', 'high', 'vol', 'kt', 'create_time', 'modify_time'], $list);
            $dbh->commit();
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        } catch (Exception $e) {
            $dbh->rollBack();
            $this->GlobalService->json(['code' => -2, 'msg' => '系统错误', 'err' => $e->getMessage()]);
        }
    }

}
