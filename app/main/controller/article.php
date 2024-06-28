<?php
/**
 *文章，公告
 */

namespace main\controller;

use main\classes\base;
use model\article_model;

class article extends base
{
    /**
     * 获取公告列表
     * /main/article/getNoticeList
     */
    public function getNoticeList($limit = 15, $page = 1)
    {
        if ($limit > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过100条数据']);
        }
        $article_model = article_model::getInstance();
        $list = $article_model->field('id,title,des,content,read_nums,create_time')
            ->where(['type' => 1, 'create_time' => ['<=' => SYS_TIME], 'status' => 1])
            ->order('create_time DESC')->limit($limit, $page)->select();
        foreach ($list as $k => $v) {
            $v['title'] = $this->GlobalService->translate($v['title']);
            $v['des'] = $this->GlobalService->translate($v['des']);
            $v['content'] = $this->GlobalService->translate($v['content']);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }


    /**
     * 获取帮助中心
     * /main/article/getHelpList
     */
    public function getHelpList($limit = 200, $page = 1)
    {
        if ($limit > 200) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过200条数据']);
        }
        $article_model = article_model::getInstance();
        $list = $article_model->field('id,type,title,des,content,img,read_nums,create_time')
            ->where(['type' => 2, 'create_time' => ['<=' => SYS_TIME], 'status' => 1])
            ->order('create_time ASC')->limit($limit, $page)->select();
        foreach ($list as $k => $v) {
            $v['title'] = $this->GlobalService->translate($v['title']);
            $v['content'] = $this->GlobalService->translate($v['content']);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    /**
     * 获取新闻
     * /main/article/getNewsList
     */
    public function getNewsList($limit = 15, $page = 1)
    {
        if ($limit > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过100条数据']);
        }
        $article_model = article_model::getInstance();
        $list = $article_model->field('id,type,title,des,content,img,read_nums,create_time')
            ->where(['type' => 3, 'create_time' => ['<=' => SYS_TIME], 'status' => 1])
            ->order('create_time DESC')->limit($limit, $page)->select();
        foreach ($list as $k => $v) {
            $v['title'] = $this->GlobalService->translate($v['title']);
            $v['des'] = $this->GlobalService->translate($v['des']);
            $v['img'] = $this->GlobalService->translate($v['img'], 2);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    //获取挖矿问题
    public function getMiningList($limit = 100, $page = 1)
    {
        if ($limit > 100) {
            $this->GlobalService->json(['code' => -2, 'msg' => '一次获取不能超过100条数据']);
        }
        $article_model = article_model::getInstance();
        $list = $article_model->field('id,title,des,sort,create_time')
            ->where(['type' => 10, 'create_time' => ['<=' => SYS_TIME], 'status' => 1])
            ->order('sort DESC,id ASC')->limit($limit, $page)->select();
        foreach ($list as $k => $v) {
            $v['title'] = $this->GlobalService->translate($v['title']);
            $v['des'] = $this->GlobalService->translate($v['des']);
            $list[$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    //获取单个文章
    public function getInfo($id)
    {
        $article_model = article_model::getInstance();
        $article = $article_model->getData($id, ['status' => 1]);
        if ($article) {
            $article['title'] = $this->GlobalService->translate($article['title']);
            $article['des'] = $this->GlobalService->translate($article['des']);
            $article['content'] = $this->GlobalService->translate($article['content'], 1);
            $article['img'] = $this->GlobalService->translate($article['img'], 2);
            $article_model->edit(['id' => $id, 'read_nums' => $article['read_nums'] + 1]);
        } else {
            $article = (object)[];
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'info' => $article]);
    }


}
