<?php
/**
 *产品
 */

namespace main\controller;

use main\classes\base;
use model\config_model;
use model\product_kline_model;
use model\product_model;
use model\product_type_model;
use model\user_product_model;

class product extends base
{

    /**
     * 获取列表
     * /main/product/getList
     */
    public function getList($type = '', $title = '', $hot = '', $productTypeId = '', $limit = -1)
    {
        $where = ['status' => 1];
        if ($type !== '') {
            $where['type'] = intval($type);
        } else {
            $config_model = config_model::getInstance();
            $ProductType = $config_model->getConfig(1, 'ProductType');
            if (!$ProductType) {
                $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => []]);
            }
            $where['type'] = ['IN' => $ProductType];
        }
        //标题搜索
        if ($title !== '') {
            $where['title'] = ['LIKE' => "%{$title}%"];
        }
        //是否热门
        if ($hot !== '') {
            $where['hot'] = intval($hot);
        }
        $user = $this->GlobalService->getUser();
        $product_model = product_model::getInstance();
        $userProductWhere = [];
        if ($productTypeId !== '') {
            if ($productTypeId > 1000) {
                $where = ['product_type_id' => intval($productTypeId)];
            } else {
                if ($productTypeId>100) {
                    if (!$user) {
                        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => []]);
                    }
                    //获取用户自选
                    $userProductWhere['user_id'] = $user['id'];
                }
            }
        }
        $list = $product_model
            ->field('id,type,title,icon,price,fixed,kline,min,sort,status')
            ->where($where)
            ->hasWhere('userProduct', $userProductWhere)
            ->order('sort DESC,id ASC')
            ->limit($limit)
            ->select();
        $product_kline_model = product_kline_model::getInstance();
        $user_product_model = user_product_model::getInstance();
        foreach ($list as $k => $v) {
            $currency = explode('/', $v['title']);
            $v['baseCurrency'] = $currency[1] ?: '';
            $v['quoteCurrency'] = $currency[0];
            $v['kline'] = json_decode($v['kline'], true);
            if ($v['kline']['vol'] > 1000000) {
                $v['kline']['vol'] = round($v['kline']['vol'] / 1000000, 2) . 'M';
            }
            if ($user) {
                $res = $user_product_model->field('id')->where(['user_id' => $user['id'], 'product_id' => $v['id']])->isExist();
                $v['isCollected'] = $res ? 1 : 0;
            } else {
                $v['isCollected'] = 0;
            }
            /********************K线********************/
            $klineList = $product_kline_model->field('id,open,close,low,high,vol,kt')
                ->where(['product_id' => $v['id'], 'type' => 0])
                ->order('kt DESC')
                ->limit(100)
                ->select();
            foreach ($klineList as $key => $val) {
                $klineList[$key] = [date('m-d H:i', $val['kt']), $val['open'], $val['close'], $val['low'], $val['high'], round($val['vol'], 2)];
            }
            $klineList[0][2] = $v['price'];
            $v['klineList'] = array_reverse($klineList);
            /********************K线********************/
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功','list' => $list]);
    }


    /**
     * 获取搜索列表
     * /main/product/getSearchList
     */
    public function getSearchList($title = '',$type='', $hot = '')
    {
        $where = ['status' => 1];
        $config_model = config_model::getInstance();
        $ProductType = $config_model->getConfig(1, 'ProductType');
        if (!$ProductType) {
            $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => []]);
        }
        $where['type'] = ['IN' => $ProductType];
        //标题搜索
        if ($title !== '') {
            $where['title'] = ['LIKE' => "%{$title}%"];
        }
        if($type!==''){
            $where['type'] = intval($type);
        }
        //是否热门
        if ($hot !== '') {
            $where['hot'] = intval($hot);
        }
        $product_model = product_model::getInstance();
        $list = $product_model
            ->field('id,type,title,icon,price,fixed,min')
            ->where($where)
            ->order('sort DESC,id ASC')
            ->limit(-1)
            ->select();
        //获取自选
        $user=$this->GlobalService->getUser();
        $user_product_model = user_product_model::getInstance();
        foreach ($list as $k => $v) {
            $currency = explode('/', $v['title']);
            $v['baseCurrency'] = $currency[1] ?: '';
            $v['quoteCurrency'] = $currency[0];
            if($user){
                $res = $user_product_model->field('id')->where(['user_id' => $user['id'], 'product_id' => $v['id']])->isExist();
                $v['isCollected'] = $res ? 1 : 0;
            }else{
                $v['isCollected'] = 0;
            }
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功','list' => $list]);
    }

    /**
     * 获取列表
     * /main/product/getTypeList
     */
    public function getTypeList($type)
    {
        $product_type_model = product_type_model::getInstance();
        $list = $product_type_model->where(['type' => intval($type),'status'=>1])
            ->order('sort DESC,id ASC')->select();
        foreach ($list as $k => $v) {
            $v['title'] = $this->GlobalService->translate($v['title']);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    /**
     * 获取K线数据
     * /main/product/getDefault
     */
    public function getDefault($id = 0, $type = 0)
    {
        $product_model = product_model::getInstance();
        if ($id) {
            $product = $product_model->where(['id' => intval($id)])->getOne();
        } else {
            $product = $product_model->where(['type' => $type, 'status' => 1])->order('sort DESC,id ASC')->getOne();
        }
        if (!$product) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的产品']);
        }
        $currency = explode('/', $product['title']);
        $product['baseCurrency'] = $currency[1] ?: '';
        $product['quoteCurrency'] = $currency[0];
        $product['kline'] = json_decode($product['kline'], true);
        if ($product['kline']['vol'] > 1000000) {
            $product['kline']['vol'] = round($product['kline']['vol'] / 1000000, 2) . 'M';
        }
        $data_config = json_decode($product['data_config'], true);
        unset($product['data_config']);
        $product['contractConfig'] = $data_config['contract'];
        $product['timeConfig'] = $data_config['time'];
        $product['lever'] = $data_config['time'];
        $product['introduce'] = json_decode($product['introduce'], true);
        //获取自选
        $user = $this->GlobalService->getUser();
        if ($user) {
            $user_product_model = user_product_model::getInstance();
            $res = $user_product_model->field('id')
                ->where(['user_id' => $user['id'], 'product_id' => $product['id']])->getOne();
            $product['isCollected'] = $res ? 1 : 0;
        } else {
            $product['isCollected'] = 0;
        }
        $product['hq']=$product_model->getHq($product['price'],$product['fixed']);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $product]);
    }

    /**
     * 获取K线数据
     * /main/product/getInfo
     */
    public function getInfo($id, $period = 0, $limit = 100)
    {
        $product_model = product_model::getInstance();
        if ($id) {
            $product = $product_model->where(['id' => intval($id)])->getOne();
        } else {
            $config_model = config_model::getInstance();
            $ProductType = $config_model->getConfig(1, 'ProductType');
            if(!$ProductType){
                $this->GlobalService->json(['code' => -2, 'msg' => '未知的产品']);
            }
            $product = $product_model->where(['type' => ['IN' => $ProductType], 'status' => 1])
                ->order('sort DESC')->getOne();
        }
        if (!$product) {
            $this->GlobalService->json(['code' => -2, 'msg' => '未知的产品']);
        }
        $currency = explode('/', $product['title']);
        $product['baseCurrency'] = $currency[1] ?: '';
        $product['quoteCurrency'] = $currency[0];
        $product['kline'] = json_decode($product['kline'], true);
        if ($product['kline']['vol'] > 1000000) {
            $product['kline']['vol'] = round($product['kline']['vol'] / 1000000, 2) . 'M';
        }
        $data_config = json_decode($product['data_config'], true);
        unset($product['data_config']);
        $product['contractConfig'] = $data_config['contract'];
        $product['timeConfig'] = $data_config['time'];
        $product['leverConfig'] = $data_config['lever'];
        $product['introduce'] = json_decode($product['introduce'], true);
        //获取自选
        $user = $this->GlobalService->getUser();
        if ($user) {
            $user_product_model = user_product_model::getInstance();
            $res = $user_product_model->field('id')
                ->where(['user_id' => $user['id'], 'product_id' => $product['id']])->getOne();
            $product['isCollected'] = $res ? 1 : 0;
        } else {
            $product['isCollected'] = 0;
        }
        //K线
        $product_kline_model = product_kline_model::getInstance();
        $productKline = $product_kline_model->field('id,open,close,low,high,vol,kt')
            ->where(['product_id' => $product['id'], 'type' => $period])
            ->order('kt DESC')
            ->limit($limit)
            ->select();
        $klineList = [];
        if ($period >= 6) {
            foreach ($productKline as $v) {
                $klineList[] = [date('Y-m-d', $v['kt']), $v['open'], $v['close'], $v['low'], $v['high'], round($v['vol'], 2)];
            }
        } else {
            foreach ($productKline as $v) {
                $klineList[] = [date('m-d H:i', $v['kt']), $v['open'], $v['close'], $v['low'], $v['high'], round($v['vol'], 2)];
            }
        }
//        $nums = count($klineList);
//        if ($nums < $limit) {
//            $addNums = $limit - $nums;
//            for ($i = 0; $i < $addNums; $i++) {
//                $klineList[] = [];
//            }
//        }
        $klineList[0][2] = $product['price'];
        $klineList = array_reverse($klineList);
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $product,'klineList'=>$klineList]);
    }
}
