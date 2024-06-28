<?php
/**
 *定时任务
 */

namespace admin\controller;

use admin\classes\base;
use asura\Common;
use model\crontab_log_model;
use model\crontab_model;
use model\user_log_model;
use Exception;

class crontab extends base
{

    public function getList($title = '', $log_switch='',$status = 1, $page = 1, $limit = 20)
    {
        $where = [];
        if ($title !== '') {
            $where['title'] = ['LIKE' => '%' . $title . '%'];
        }
        if ($log_switch !== '') {
            $where['log_switch'] = intval($log_switch);
        }
        if ($status !== '') {
            $where['status'] = intval($status);
        } else {
            $where['status'] = ['>=' => 0];
        }
        $crontab_model = crontab_model::getInstance();
        $data = $crontab_model->where($where)
            ->order('id ASC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function getLogList($crontabId = '', $date_time = [], $page = 1, $limit = 20)
    {
        $where = [];
        if ($crontabId !== '') {
            $where['crontab_id'] = intval($crontabId);
        }
        if ($date_time) {
            $where['create_time']['>='] = strtotime($date_time[0]);
            $where['create_time']['<='] = strtotime($date_time[1]);
        }
        $crontab_log_model = crontab_log_model::getInstance();
        $data = $crontab_log_model->where($where)
            ->order('create_time DESC')
            ->limit($limit, $page)
            ->getListInfo();
        foreach ($data['list'] as $k => $v) {
            $data['list'][$k] = $v;
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $data['list'], 'total' => $data['total']]);
    }

    public function run($id)
    {
        $crontab_model = crontab_model::getInstance();
        $crontab = $crontab_model->where(['id'=>$id,'status'=>['>='=>0]])->getOne();
        if(!$crontab){
            $this->GlobalService->json(['code' => 1, 'msg' => '未知的数据']);
        }
        try {
            Common::asyncThread('/main/cron/' . $crontab['fn'] . '?crontabId=' . $crontab['id'] . '&logSwitch=' . 1);
            $this->GlobalService->json(['code' => 1, 'msg' => '执行成功']);
        } catch (Exception $e) {
            //请求异常
            $this->GlobalService->json(['code' => 1, 'msg' => '执行失败', 'err' => $e->getMessage()]);
        }
    }

    public function add($title, $fn, $expression=[], $second=0,$log_switch = 0,  $remark = '')
    {
        foreach ($expression as $k => $v) {
            if ($v == '') {
                $v = '*';
            }else{
                $v =trim($v);
            }
            $expression[$k] = $v;
        }
        $data = [
            'title' => trim($title),
            'fn' => trim($fn),
            'expression' =>implode(' ',$expression),
            'second' => intval($second),
            'log_switch' => intval($log_switch),
            'remark' => trim($remark)
        ];
        $crontab_model = crontab_model::getInstance();
        $res = $crontab_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $data['run_time']=$crontab_model->getNextRunTime($data['expression']);
        $data['id'] = $crontab_model->add($data);
        /*********添加日志*********/
        (user_log_model::getInstance())->addLog('新增定时任务', $data);
        /*********添加日志*********/
        $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
    }

    public function edit($id, $title, $fn, $expression = [], $second = 0, $log_switch = 0, $remark = '', $status = 1)
    {
        foreach ($expression as $k => $v) {
            if ($v == '') {
                $v = '*';
            }else{
                $v =trim($v);
            }
            $expression[$k] = $v;
        }
        $data = [
            'id' => intval($id),
            'title' => trim($title),
            'fn' => trim($fn),
            'expression' =>implode(' ',$expression),
            'second' => intval($second),
            'log_switch' => intval($log_switch),
            'remark' => trim($remark),
            'status' => intval($status)
        ];
        $crontab_model = crontab_model::getInstance();
        $res = $crontab_model->checkData($data);
        if ($res['code'] !== 1) {
            $this->GlobalService->json($res);
        }
        $data['run_time'] = $crontab_model->getNextRunTime($data['expression']);
        $res = $crontab_model->edit($data);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('编辑定时任务', $data);
            /*********添加日志*********/
            $this->GlobalService->json(['code' => 1, 'msg' => '成功']);
        }
        $this->GlobalService->json(['code' => -2, 'msg' => '修改失败']);
    }

    public function del($id)
    {
        $crontab_model = crontab_model::getInstance();
        $res = $crontab_model->delById($id);
        $this->GlobalService->json($res);
    }

}
