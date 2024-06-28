<?php
//基础类

namespace home\classes;

use asura\Common;
use model\ip_list_model;
use model\user_ip_model;
use model\user_model;
use service\GlobalService;

class base
{
    protected $GlobalService;
    //系统升级  0-关闭 1-开启  注册那边需要单独关闭
    protected $systemUpgrade = 0;

    public function __construct()
    {
        $this->GlobalService = GlobalService::getInstance();
        $user = $this->GlobalService->getUser();
        if ($user && $user['type'] <= 2 && $user['status'] > 0) {
            $this->GlobalService->setSuffix($user['suffix']);
            $token = $this->GlobalService->getToken();
            $auth = json_decode($user['auth'],true);
            if ($token['password'] != $user['password'] || (isset($token['authTime']) && $token['authTime'] != $auth[$token['auth']])) {
                $this->GlobalService->_logout();
            }
            //判断是否需要迁移用户
//            $this->GlobalService->service($user['service_status']);
            $ip = Common::getIp();
            if ($user['login_ip'] != $ip) {
                //用户ip有变化，添加到日志记录里面,并更新
                $user_ip_model = user_ip_model::getInstance();
                $user_ip_model->addData('登录ip变更', $user['id']);
                //ip变更记录
                $user_model = user_model::getInstance();
                if ((ip_list_model::getInstance())->where(['type' => 0, 'ip' => $ip, 'status' => 1])->isExist()) {
                    //在黑名单，踢出用户登录
                    $user_model->edit(['id' => $user['id'], 'login_ip' => $ip, 'auth' => '{}']);
                    $this->GlobalService->_logout('网络异常');
                } else {
                    $user_model->edit(['id' => $user['id'], 'login_ip' => $ip, 'login_time' => SYS_TIME]);
                }
            } else {
                if ((SYS_TIME - $user['login_time']) > 600) {
                    $user_model = user_model::getInstance();
                    $user_model->edit(['id' => $user['id'], 'login_time' => SYS_TIME]);
                }
            }
        } else {
            $this->GlobalService->_logout();
        }
    }

}