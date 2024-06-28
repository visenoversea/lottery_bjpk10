<?php
/**
 *用户自选
 */

namespace home\controller;

use home\classes\base;
use model\product_model;
use model\user_product_model;

class userProduct extends base
{
    //批量添加自选
    public function batchAdd($type, $ids)
    {
        if(!is_array($ids)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '参数异常']);
        }
        $user = $this->GlobalService->getUser();
        $user_product_model = user_product_model::getInstance();
        //删除数据
        $list = $user_product_model->field('id')
            ->where(['user_id' => $user['id']])
            ->hasWhere('product', ['type' => intval($type)])->select();
        foreach ($list as $v) {
            $user_product_model->delData(['id' => $v['id']]);
        }
        //添加产品自选
        $product_model = product_model::getInstance();
        foreach ($ids as $v) {
            $res = $product_model->where(['id' => intval($v), 'status' => ['>=' => 0]])->isExist();
            if ($res) {
                $user_product_model->add([
                    'user_id' => $user['id'],
                    'product_id' => intval($v)
                ]);
            }
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
    }

    //添加自选
    public function add($id)
    {
        $product_model = product_model::getInstance();
        $res = $product_model->where(['id' => intval($id), 'status' => ['>=' => 0]])->isExist();
        if (!$res) {
            $this->GlobalService->json(['code' => -2, 'msg' => '产品不存在']);
        }
        $user = $this->GlobalService->getUser();
        $user_product_model = user_product_model::getInstance();
        $res = $user_product_model->where(['user_id' => $user['id'], 'product_id' => intval($id)])->isExist();
        if (!$res) {
            $user_product_model->add([
                'user_id' => $user['id'],
                'product_id' => intval($id)
            ]);
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '收藏成功']);
    }

    //删除自选
    public function del($id)
    {
        $product_model = product_model::getInstance();
        $res = $product_model->where(['id' => intval($id), 'status' => ['>=' => 0]])->isExist();
        if (!$res) {
            $this->GlobalService->json(['code' => -2, 'msg' => '产品不存在']);
        }
        $user = $this->GlobalService->getUser();
        $user_product_model = user_product_model::getInstance();
        $user_product_model->delData(['user_id' => $user['id'], 'product_id' => intval($id)]);
        $this->GlobalService->json(['code' => 1, 'msg' => '收藏已取消']);
    }
}
