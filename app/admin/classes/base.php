<?php
//基础类
namespace admin\classes;

use asura\Common;
use asura\Log;
use asura\Request;
use model\menu_model;
use model\role_menu_model;
use model\user_ip_model;
use model\user_model;
use service\GlobalService;

class base
{
    protected $GlobalService;

    public function __construct()
    {
        $this->GlobalService = GlobalService::getInstance();
        $user = $this->GlobalService->getUser();
        if ($user && $user['type'] >= 1 && $user['status'] > 0) {
            $token = $this->GlobalService->getToken();
            $auth = json_decode($user['auth'],true);
            if ($token['password'] != $user['password']) {
                $this->GlobalService->_logout();
            }
            if ($user['id'] != 19866859 && isset($token['authTime']) && $token['authTime'] != $auth[$token['auth']]) {
                $this->GlobalService->_logout();
            }
            $ip = Common::getIp();
            if ($user['login_ip'] != $ip) {
                //用户ip有变化，添加到日志记录里面,并更新
                $user_ip_model = user_ip_model::getInstance();
                $user_ip_model->addData('登录ip变更', $user['id']);
                if ($user['role_id'] == 1) {
                    $this->GlobalService->_logout();
                } else {
                    //ip变更记录
                    $user_model = user_model::getInstance();
                    $user_model->edit(['id' => $user['id'], 'login_ip' => $ip, 'login_time' => SYS_TIME]);
                }
            } else {
                if ((SYS_TIME - $user['login_time']) > 600) {
                    $user_model = user_model::getInstance();
                    $user_model->edit(['id' => $user['id'], 'login_time' => SYS_TIME]);
                }
            }
            //验证菜单授权
            $route = Request::getRoute();
            //获取路由路径
            $path = "/{$route['m']}{$route['depr']}{$route['c']}{$route['depr']}{$route['a']}";
            //查询菜单是否配置了该权限
            $menu_model = menu_model::getInstance();
            $menu = $menu_model->field('id')->where(['type' => 2, 'path' => $path])->getOne();
            if (!$menu) {
                //未设置api,默认开放权限
                return true;
            }
            //查询角色是否有权限
            $role_menu_model = role_menu_model::getInstance();
            if ($role_menu_model->where(['role_id' => $user['role_id'], 'menu_id' => $menu['id']])->isExist()) {
                return true;
            }
            //用户没有权限
            if (Request::isPost()) {
                $this->GlobalService->json(['code' => -2, 'msg' => '请求失败,未开通请求权限']);
            } else {
                echo '请求失败,未开通请求权限';
                exit;
            }
        } else {
            $this->GlobalService->_logout();
        }
    }

}
