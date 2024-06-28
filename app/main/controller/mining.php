<?php
/**
 *锁仓挖矿
 */

namespace main\controller;

use main\classes\base;
use model\article_model;
use model\mining_model;

class mining extends base
{

    /**
     * 获取列表
     * /main/mining/getList
     */
    public function getList($page = 1, $limit = 20)
    {
        $where = ['status' => ['>='=>1]];
        $mining_model = mining_model::getInstance();
        $list = $mining_model->where($where)
            ->order('sort DESC,id ASC')
            ->limit($limit, $page)
            ->select();
//        foreach ($list as $k => $v) {
//            $list[$k] = $v;
//        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功','list' => $list]);
    }

    /**
     * 获取详情
     * /main/mining/getInfo
     */
    public function getInfo($id)
    {
        $mining_model = mining_model::getInstance();
        $mining = $mining_model->where(['id' => intval($id)])->getOne();
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $mining]);
    }

    public function getRule()
    {
        $article_model = article_model::getInstance();
        $info=[];
        //违约金规则
        $bcInfo = $article_model->getData(11, ['status' => 1]);
        if ($bcInfo) {
            $info['bcTitle'] = $this->GlobalService->translate($bcInfo['title']);
            $info['bcContent'] = $this->GlobalService->translate($bcInfo['content'], 1);
        } else {
            $info['bcTitle'] = '';
            $info['bcContent'] = '';
        }
        //收益计算规则
        $profitInfo = $article_model->getData(12, ['status' => 1]);
        if ($profitInfo) {
            $info['profitTitle'] = $this->GlobalService->translate($profitInfo['title']);
            $info['profitContent'] = $this->GlobalService->translate($profitInfo['content'], 1);
        } else {
            $info['profitTitle'] = '';
            $info['profitContent'] = '';
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $info]);
    }
}
