<?php
/**
 *产品
 */

namespace admin\controller;

use admin\classes\base;
use model\product_kline_model;
use model\product_model;
use model\user_log_model;
use service\HuoBiService;
use service\RedisService;
use service\SinaService;

class product extends base
{

    public function getAllList($type = '')
    {
        $where = [];
        if ($type !== '') {
            $where['type'] = ['IN' => $type];
        }
        $product_model = product_model::getInstance();
        $list = $product_model->field('id,type,title,fixed,price,api,api_config')
            ->where($where)
            ->order('sort DESC,modify_time DESC')
            ->limit(-1)
            ->select();
        foreach ($list as $k => $v) {
            $mt = pow(10, $v['fixed']);
            $v['api_config'] = json_decode($v['api_config'], true);
            $bd = intval($v['price'] * $v['api_config']['ratio'] * $mt);
            if ($bd < 2) {
                $bd = 2;
            }
            $v['bodong'] = $bd / $mt;
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    public function getList($title = '', $type = '', $status = '', $page = 1, $limit = 15)
    {
        $where = [];
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        if ($title !== '') {
            $where['title'] = ['LIKE' => '%' . trim($title) . '%'];
        }
        if ($type !== '') {
            $where['type'] = intval($type);
        }
        $product_model = product_model::getInstance();
        $data = $product_model->where($where)
            ->order('sort DESC,id ASC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function sync($id)
    {
        $RedisService = RedisService::getInstance();
        $lock = $RedisService->getData('productSyncLock');
        if ($lock) {
            $this->GlobalService->json(['code' => -2, 'msg' => '操作过于频繁，请过一会重试']);
        }
        $RedisService->setData(1, 'productSyncLock', '', 15);
        $product_model = product_model::getInstance();
        $data = $product_model->field('id,api,api_config,fixed')
            ->where(['id' => $id, 'status' => ['>=' => 0]])
            ->getOne();
        if ($data['api'] < 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '同步失败，请选择官方数据源']);
        }
        $product_kline_model = product_kline_model::getInstance();
        if ($data['api'] == 2) {
            $product_kline_model->syncHuobi($data, 0);
            $product_kline_model->syncHuobi($data, 1);
            $product_kline_model->syncHuobi($data, 2);
            $product_kline_model->syncHuobi($data, 3);
            $product_kline_model->syncHuobi($data, 4);
            $product_kline_model->syncHuobi($data, 5);
            $product_kline_model->syncHuobi($data, 6);
            $product_kline_model->syncHuobi($data, 7);
            $product_kline_model->syncHuobi($data, 8);
        } else if ($data['api'] == 4) {
            //新浪数据同步
            $product_kline_model->syncSina($data, 0);
            $product_kline_model->syncSina($data, 6);
            $product_kline_model->kline5Min($data['id'], SYS_TIME - 86400);
            $product_kline_model->kline15Min($data['id'], SYS_TIME - 86400);
            $product_kline_model->kline30Min($data['id'], SYS_TIME - 86400);
            $product_kline_model->kline60Min($data['id'], SYS_TIME - 86400);
            $product_kline_model->kline4hour($data['id'], SYS_TIME - 86400);
            $product_kline_model->kline1week($data['id'], SYS_TIME - 86400 * 365 * 3);
            $product_kline_model->kline1mon($data['id'], SYS_TIME - 86400 * 365 * 3);
        } else {
            $this->GlobalService->json(['code' => -2, 'msg' => '目前只支持火币数据同步']);
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '同步完成']);
    }

    public function add($type, $title, $icon, $price, $fixed, $api, $api_config, $data_config, $fee_rate, $min, $introduce, $hot, $sort, $status)
    {
        $data = [
            'type' => intval($type),
            'title' => trim($title),
            'icon' => trim($icon),
            'price' => trim($price),
            'fixed' => intval($fixed),
            'api' => intval($api),
            'api_config' => $api_config,
            'data_config' => $data_config,
            'fee_rate' => trim($fee_rate),
            'min' => intval($min),
            'introduce' => $introduce,
            'hot' => intval($hot),
            'sort' => intval($sort),
            'status' => intval($status),
        ];
        if ($data['api'] == 1) {
            if ($data['price'] <= 0) {
                $this->GlobalService->json(['code' => -2, 'msg' => '价格不能小于等于0']);
            }
            $data['kline'] = [
                'open' => round($data['price'], $data['fixed']),
                'close' => round($data['price'], $data['fixed']),
                'low' => round($data['price'], $data['fixed']),
                'high' => round($data['price'], $data['fixed']),
                'vol' => mt_rand(1000, 100000)
            ];
        } else if ($data['api'] == 2) {
            //火币网获取最新价格
            if (empty($data['api_config']['symbol'])) {
                $this->GlobalService->json(['code' => -2, 'msg' => 'api参数不能为空']);
            }
            $HuoBiService = HuoBiService::getInstance();
            $res = $HuoBiService->get_history_kline($data['api_config']['symbol'], 6, 1);
            if ($res['code'] == 1 && isset($res['data'][0])) {
                $kline = [
                    'open' => round($res['data'][0]['open'], $data['fixed']),
                    'close' => round($res['data'][0]['close'], $data['fixed']),
                    'low' => round($res['data'][0]['low'], $data['fixed']),
                    'high' => round($res['data'][0]['high'], $data['fixed']),
                    'vol' => round($res['data'][0]['vol'], 2)
                ];
                $data['price'] = $kline['close'];
                $data['kline'] = $kline;
            } else {
                $this->GlobalService->json(['code' => -2, 'msg' => '无法获取到火币接口数据，请检查api参数是否正确']);
            }
        } else if ($data['api'] == 3) {
            //币安
            $this->GlobalService->json(['code' => -2, 'msg' => '暂不支持币安接口']);
        } else if ($data['api'] == 4) {
            if (empty($data['api_config']['symbol'])) {
                $this->GlobalService->json(['code' => -2, 'msg' => 'api参数不能为空']);
            }
            $SinaService = SinaService::getInstance();
            $SinaData = $SinaService->getKlineData([$data['api_config']['symbol']]);
            $kline = $SinaData[$data['api_config']['symbol']];
            if (!$kline) {
                $this->GlobalService->json(['code' => -2, 'msg' => '无法获取到新浪接口数据，请检查api参数是否正确']);
            }
            $kline['vol'] = mt_rand(1000, 100000);
            $data['price'] = $kline['close'];
            $data['kline'] = $kline;
        }
        $product_model = product_model::getInstance();
        $res = $product_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        //插入
        $data['kline']=json_encode($data['kline']);
        $data['api_config']=json_encode($data['api_config'],JSON_UNESCAPED_UNICODE);
        $data['data_config']=json_encode($data['data_config'],JSON_UNESCAPED_UNICODE);
        $data['introduce']=json_encode($data['introduce'],JSON_UNESCAPED_UNICODE);
        $data['id'] = $product_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增产品', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
    }

    public function edit($id, $type, $title, $icon, $fixed, $api, $api_config, $data_config, $fee_rate, $min, $introduce, $hot, $sort, $status)
    {
        $data = [
            'id' => intval($id),
            'type' => intval($type),
            'title' => trim($title),
            'icon' => trim($icon),
            'fixed' => intval($fixed),
            'api' => intval($api),
            'api_config' => $api_config,
            'data_config' => $data_config,
            'fee_rate' => trim($fee_rate),
            'min' => intval($min),
            'introduce' => $introduce,
            'hot' => intval($hot),
            'sort' => intval($sort),
            'status' => intval($status),
        ];
        $product_model = product_model::getInstance();
        $res = $product_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $data['api_config']=json_encode($data['api_config'],JSON_UNESCAPED_UNICODE);
        $data['data_config']=json_encode($data['data_config'],JSON_UNESCAPED_UNICODE);
        $data['introduce']=json_encode($data['introduce'],JSON_UNESCAPED_UNICODE);
        $res = $product_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑产品', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        $product_model = product_model::getInstance();
        $res = $product_model->delById($id);
        $this->GlobalService->json($res);
    }
}
