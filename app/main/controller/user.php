<?php
/**
 *用户相关
 */

namespace main\controller;

use asura\Common;
use asura\Param;
use asura\Verify;
use main\classes\base;
use model\config_model;
use model\ip_list_model;
use model\ip_white_model;
use model\send_model;
use model\user_ip_model;
use model\user_model;
use service\GoogleAuthenticatorService;
use service\RedisService;

class user extends base
{

    /**
     * 后台登录
     * /main/user/adminLogin
     */
    public function adminLogin($account = '', $password = '', $authCode = '')
    {
        $account = trim($account);
        $password = trim($password);
        $user_model = user_model::getInstance();
        if (Verify::userName($account)) {
            $user = $user_model->where(['user_name' => $account, 'status' => ['>=' => 0]])->getOne();
        } else if (Verify::isEmail($account)) {
            $user = $user_model->where(['email' => $account, 'status' => ['>=' => 0]])->getOne();
        } else if (Verify::isMobileNumber($account)) {
            $user = $user_model->where(['mobile' => $account, 'status' => ['>=' => 0]])->getOne();
        } else {
            $this->GlobalService->json(['code' => -2, 'msg' => '账号或密码错误']);
            return;
        }
        if (!$user || $user['type'] < 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '账号或密码错误']);
        }
        $config_model = config_model::getInstance();
        $GoogleAuth = $config_model->getConfig(1, 'GoogleAuth');
        if ($user['type'] !== 100 && $GoogleAuth && $user['secret']) {
            //需要验证谷歌授权
            $GoogleAuthenticatorService = GoogleAuthenticatorService::getInstance();
            if ($authCode !== $GoogleAuthenticatorService->getCode($user['secret'])) {
                $this->GlobalService->json(['code' => -2, 'msg' => '谷歌身份验证失败']);
            }
        }
        //ip白名单
        $IpWhite = $config_model->getConfig(1, 'IpWhiteAdmin');
        if($user['type'] !== 100 && $IpWhite){
            $one = ip_white_model::getInstance()->where(['ip'=>Common::getIp()])->getOne();
            if(empty($one)){
                $this->GlobalService->json(['code' => -2, 'msg' => 'ip非法,请添加ip：'.Common::getIp()]);
            }
        }
        $res = $user_model->login($user, $password, 'admin');
        $user_ip_model = user_ip_model::getInstance();
        if ($res['code'] == 1) {
            $user_ip_model->addData('后端登陆', $user['id']);
        } else {
            $user_ip_model->addData('后端登陆', $user['id'], $res['msg'], 0);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 前台登录
     * /main/user/login
     */
    public function login($type = 0, $account = '', $password = '', $area_code = 86, $mobile = '', $code = '',$codeKey = '')
    {
        if ($type == 0) {
            //用户名和邮箱   密码登录
            if (Verify::isEmail($account)) {
                //邮箱登录
                $this->emailLogin($account, $password);
            } else {
                //用户名登录
                $this->userLogin($account, $password,$code,$codeKey);
            }
        } else if ($type == 1) {
            //手机号  密码登录
            $this->mobileLogin($area_code, $mobile, $password);
        } else if ($type == 2) {
            //手机号  验证码登录
            $this->mobileCodeLogin($area_code, $mobile, $code);
        } else if ($type == 3) {
            //邮箱   验证码登录
            $this->emailCodeLogin($account, $code);
        } else {
            $this->GlobalService->json(['code' => -2, 'msg' => '参数异常']);
        }
    }

    //钱包登录
    public function walletLogin($walletAddress = '', $tid = '')
    {
        $ip = Common::getIp();
        if ((ip_list_model::getInstance())->where(['type' => 0, 'ip' => $ip, 'status' => 1])->isExist()) {
            //在黑名单
            $this->GlobalService->json(['code' => -2, 'msg' => '网络异常']);
        }
        $walletAddress = trim($walletAddress);
        if (empty($walletAddress)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '钱包地址不能为空']);
        }
        $user_model = user_model::getInstance();
        $user = $this->GlobalService->getUser();
        if ($user) {
            if ($user['wallet_address']) {
                //地址不一样
                if ($user['wallet_address'] != $walletAddress) {
                    $user = $user_model->where(['wallet_address' => $walletAddress, 'status' => ['>=' => 0]])->getOne();
                }
            } else {
                $user_model->edit(['id' => $user['id'], 'wallet_address' => $walletAddress]);
                $user['wallet_address'] = $walletAddress;
            }
        } else {
            $user = $user_model->where(['wallet_address' => $walletAddress, 'status' => ['>=' => 0]])->getOne();
        }
        if (!$user) {
            //用户不存在,注册新用户
            $data = [
                'type' => 1,
                'user_name' => '',
                'wallet_address' => $walletAddress
            ];
            $user_model = user_model::getInstance();
            $res = $user_model->getTidInfo($tid);
            if ($res['code'] != 1) {
                $this->GlobalService->json($res);
            }
            $data['pid'] = $res['pid'];
            $data['layer'] = $res['layer'];
            $res = $user_model->reg($data);
            if ($res['code'] == 1) {
                $res['msg'] = '授权登录成功';
            }
            $this->GlobalService->json($res);
        }
        $res = $user_model->login($user);
        $user_ip_model = user_ip_model::getInstance();
        if ($res['code'] == 1) {
            $user_ip_model->addData('钱包登陆-' . $res['auth'], $user['id']);
        } else {
            $user_ip_model->addData('钱包登陆', $user['id'], $res['msg'], 0);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 用户名登录
     * /main/user/login
     */
    public function userLogin($user_name = '', $password = '',$code = '',$codeKey = '')
    {
        $RedisService = RedisService::getInstance();
        if($codeKey && $code){
            //验证验证码
            $cacheImgCode = $RedisService->getData('imgCode', $codeKey);
            if(!$cacheImgCode){
                $this->GlobalService->json(['code' => -2, 'msg' => '请重新获取验证码','$codeKey'=>$codeKey]);
            }
            $RedisService->setData('', 'imgCode', $codeKey, 1);
            if (strtolower($cacheImgCode) !== strtolower($code)) {
                $this->GlobalService->json(['code' => -2, 'msg' => '验证码错误']);
            }
        }else{
            $this->GlobalService->json(['code' => -2, 'msg' => '验证码错误']);
        }
        $user_name = trim($user_name);
        $password = trim($password);
        $user_model = user_model::getInstance();
        $user = $user_model->where(['user_name' => $user_name, 'status' => ['>=' => 0]])->getOne();
        if (!$user || $user['type'] > 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户名或密码错误']);
        }
        $res = $user_model->login($user, $password);
        $user_ip_model = user_ip_model::getInstance();
        if ($res['code'] == 1) {
            $user_ip_model->addData('用户名登陆-' . $res['auth'], $user['id']);
        }else{
            $user_ip_model->addData('用户名登陆', $user['id'], $res['msg'], 0);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 邮箱登陆接口
     * /main/user/emailLogin
     */
    public function emailLogin($email = '', $password = '')
    {
        $email = trim($email);
        $password = trim($password);
        $user_model = user_model::getInstance();
        $user = $user_model->where(['email' => $email, 'status' => ['>=' => 0]])->getOne();
        if (!$user || $user['type'] > 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '邮箱或密码错误']);
        }
        $res = $user_model->login($user, $password);
        $user_ip_model = user_ip_model::getInstance();
        if ($res['code'] == 1) {
            $user_ip_model->addData('邮箱登陆-' . $res['auth'], $user['id']);
        } else {
            $user_ip_model->addData('邮箱登陆', $user['id'], $res['msg'], 0);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 邮箱验证码登录
     * /main/user/emailCodeLogin
     */
    public function emailCodeLogin($email = '', $code = '')
    {
        $email = trim($email);
        $user_model = user_model::getInstance();
        $user = $user_model->where(['email' => $email,'status'=>['>='=>0]])->getOne();
        if (!$user || $user['type'] > 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '邮箱或密码错误']);
        }
        $send_model = send_model::getInstance();
        $res = $send_model->VerifyCode($email, $code);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $res = $user_model->login($user);
        $user_ip_model = user_ip_model::getInstance();
        if ($res['code'] == 1) {
            $user_ip_model->addData('邮箱验证码登陆-' . $res['auth'], $user['id']);
        }else{
            $user_ip_model->addData('邮箱验证码登陆', $user['id'], $res['msg'], 0);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 手机登陆接口
     * /main/user/mobileLogin
     */
    public function mobileLogin($area_code = 86, $mobile = '', $password = '')
    {
        $mobile = str_replace(' ', '', $mobile);
        $password = trim($password);
        if (empty($mobile)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '手机号不能为空']);
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where(['mobile' => $mobile, 'area_code' => $area_code, 'status' => ['>=' => 0]])->getOne();
        if (!$user || $user['type'] > 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '手机或密码错误']);
        }
        $res = $user_model->login($user, $password);
        $user_ip_model = user_ip_model::getInstance();
        if ($res['code'] == 1) {
            $user_ip_model->addData('手机号登陆-' . $res['auth'], $user['id']);
        }else{
            $user_ip_model->addData('手机号登陆', $user['id'], $res['msg'], 0);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 手机验证码登录
     * /main/user/mobileCodeLogin
     */
    public function mobileCodeLogin($area_code = 86, $mobile = '', $code = '')
    {
        $mobile = str_replace(' ', '', $mobile);
        $user_model = user_model::getInstance();
        $user = $user_model->where(['mobile' => $mobile, 'area_code' => $area_code, 'status' => ['>=' => 0]])->getOne();
        if (!$user || $user['type'] > 2) {
            $this->GlobalService->json(['code' => -2, 'msg' => '手机或密码错误']);
        }
        //验证验证码
        $send_model = send_model::getInstance();
        $res = $send_model->VerifyCode($area_code . $mobile, $code);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $res = $user_model->login($user);
        $user_ip_model = user_ip_model::getInstance();
        if ($res['code'] == 1) {
            $user_ip_model->addData('手机验证码登陆-' . $res['auth'], $user['id']);
        } else {
            $user_ip_model->addData('手机验证码登陆', $user['id'], $res['msg'], 0);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 注册
     * /main/user/reg
     */
    public function reg($type = 0, $user_name = '', $password = '', $nick_name = '', $area_code = 852, $mobile = '', $email = '', $code = '', $tid = '')
    {
        if ($type == 0) {
            //用户名注册
            $this->userReg($user_name, $password, $nick_name, $tid);
        } else if ($type == 1) {
            //手机注册
            $this->mobileReg($area_code, $mobile, $password, $code, $user_name, $nick_name, $tid);
        } else if ($type == 2) {
            //邮箱注册
            $this->emailReg($email, $password, $code, $user_name, $nick_name, $tid);
        } else {
            $this->GlobalService->json(['code' => -2, 'msg' => '参数异常']);
        }
    }

    /**
     * 用户名注册
     * /main/user/reg
     */
    public function userReg($user_name = '', $password = '', $nick_name = '', $tid = '')
    {
        $ip = Common::getIp();
        if ((ip_list_model::getInstance())->where(['type' => 0, 'ip' => $ip, 'status' => 1])->isExist()) {
            //在黑名单
            $this->GlobalService->json(['code' => -2, 'msg' => '网络异常']);
        }
        $user_name = trim($user_name);
        if (empty($user_name)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户名不能为空']);
        }
        $data = [
            'type' => 1,
            'user_name' => $user_name,
            'password' => $password,
            'nick_name' => $nick_name
        ];
        $user_model = user_model::getInstance();
        $res = $user_model->getTidInfo($tid);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $data['pid'] = $res['pid'];
        $data['layer'] = $res['layer'];
        $res = $user_model->reg($data);
        if ($res['code'] == 1) {
            $user_ip_model = user_ip_model::getInstance();
            $user_ip_model->addData('用户名注册登陆', $res['id']);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 手机验证码注册
     * /main/user/mobileReg
     */
    public function mobileReg($area_code=0, $mobile='', $password = '', $code = '', $user_name = '', $nick_name = '', $tid = '')
    {
        $ip = Common::getIp();
        if ((ip_list_model::getInstance())->where(['type' => 0, 'ip' => $ip, 'status' => 1])->isExist()) {
            //在黑名单
            $this->GlobalService->json(['code' => -2, 'msg' => '网络异常']);
        }
        $mobile = str_replace(' ', '', $mobile);
        if (!Verify::isMobileNumber($mobile)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '手机号码格式错误']);
        }
        //验证验证码
        $send_model = send_model::getInstance();
        $res = $send_model->VerifyCode($area_code . $mobile, $code);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $data = [
            'type' => 1,
            'user_name' => $user_name,
            'password' => $password,
            'nick_name' => $nick_name,
            'mobile' => $mobile,
            'area_code' => $area_code
        ];
        $user_model = user_model::getInstance();
        $res = $user_model->getTidInfo($tid);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $data['pid'] = $res['pid'];
        $data['layer'] = $res['layer'];
        $res = $user_model->reg($data);
        if ($res['code'] == 1) {
            $user_ip_model = user_ip_model::getInstance();
            $user_ip_model->addData('手机注册登陆', $res['id']);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 邮箱验证码注册
     * /main/user/emailReg
     */
    public function emailReg($email = '', $password = '', $code = '', $user_name = '', $nick_name = '', $tid = '')
    {
        $ip = Common::getIp();
        if ((ip_list_model::getInstance())->where(['type' => 0, 'ip' => $ip, 'status' => 1])->isExist()) {
            //在黑名单
            $this->GlobalService->json(['code' => -2, 'msg' => '网络异常']);
        }
        $email = trim($email);
        $send_model = send_model::getInstance();
        $res = $send_model->VerifyCode($email, $code);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $data = [
            'type' => 1,
            'user_name' => $user_name,
            'password' => $password,
            'nick_name' => $nick_name,
            'email' => $email,
        ];
        if (empty($data['user_name'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户名不能为空']);
        }
        $user_model = user_model::getInstance();
        $res = $user_model->getTidInfo($tid);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $data['pid'] = $res['pid'];
        $data['layer'] = $res['layer'];
        $res = $user_model->reg($data);
        if ($res['code'] == 1) {
            $user_ip_model = user_ip_model::getInstance();
            $user_ip_model->addData('邮箱注册登陆', $res['id']);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 邮箱验证码注册
     * /main/user/emailReg
     */
    public function emailCodeReg($email = '', $password = '', $code = '',$codeKey = '', $user_name = '', $nick_name = '', $tid = '')
    {
        $ip = Common::getIp();
        if ((ip_list_model::getInstance())->where(['type' => 0, 'ip' => $ip, 'status' => 1])->isExist()) {
            //在黑名单
            $this->GlobalService->json(['code' => -2, 'msg' => '网络异常']);
        }
        $email = trim($email);
        if(empty($email)){
            $this->GlobalService->json(['code' => -2, 'msg' => '邮箱不能为空']);
        }
        $RedisService = RedisService::getInstance();
        $imgCode = $RedisService->getData('imgCode', $codeKey);
        if(!$imgCode){
            $this->GlobalService->json(['code' => -2, 'msg' => '请重新获取验证码']);
        }
        if (strtolower($imgCode) !== strtolower($code)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '验证码错误']);
        }
        $data = [
            'type' => 1,
            'user_name' => $user_name,
            'password' => $password,
            'nick_name' => $nick_name,
            'email' => $email,
        ];
        if (empty($data['user_name'])) {
            $this->GlobalService->json(['code' => -2, 'msg' => '用户名不能为空']);
        }
        $user_model = user_model::getInstance();
        $res = $user_model->getTidInfo($tid);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $data['pid'] = $res['pid'];
        $data['layer'] = $res['layer'];
        $res = $user_model->reg($data);
        if ($res['code'] == 1) {
            $user_ip_model = user_ip_model::getInstance();
            $user_ip_model->addData('邮箱注册登陆', $res['id']);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 忘记密码
     */
    public function forgot($type = 1, $area_code = 852, $mobile = '', $email = '', $code = '', $password = '')
    {
        if ($type == 1) {
            //手机找回
            $this->mobileForgot($area_code, $mobile, $code, $password);
        } else if ($type == 2) {
            //邮箱找回
            $this->emailForgot($email, $code, $password);
        } else {
            $this->GlobalService->json(['code' => -2, 'msg' => '参数异常']);
        }
    }

    /**
     * 手机忘记密码找回
     */
    public function mobileForgot($area_code = 852, $mobile = '', $code = '', $password = '')
    {
        $ip = Common::getIp();
        if ((ip_list_model::getInstance())->where(['type' => 0, 'ip' => $ip, 'status' => 1])->isExist()) {
            //在黑名单
            $this->GlobalService->json(['code' => -2, 'msg' => '网络异常']);
        }
        $mobile = str_replace(' ', '', $mobile);
        $password = trim($password);
        if (empty($password)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '密码不能为空']);
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where(['area_code' => $area_code, 'mobile' => $mobile, 'status' => ['>=' => 0]])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '手机号未注册']);
        }
        //验证验证码
        $send_model = send_model::getInstance();
        $res = $send_model->VerifyCode($area_code . $mobile, $code);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $data = ['id' => $user['id'], 'password' => $password];
        $user_model = user_model::getInstance();
        $res = $user_model->editUser($data);
        if ($res['code'] == 1) {
            $user_ip_model = user_ip_model::getInstance();
            $user_ip_model->addData('手机忘记密码修改', $user['id']);
        }
        $this->GlobalService->json($res);
    }

    /**
     * 邮箱密码忘记找回
     */
    public function emailForgot($email = '', $code = '', $password = '')
    {
        $ip = Common::getIp();
        if ((ip_list_model::getInstance())->where(['type' => 0, 'ip' => $ip, 'status' => 1])->isExist()) {
            //在黑名单
            $this->GlobalService->json(['code' => -2, 'msg' => '网络异常']);
        }
        $email = trim($email);
        $password = trim($password);
        if (empty($password)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '密码不能为空']);
        }
        $user_model = user_model::getInstance();
        $user = $user_model->where(['email' => $email, 'status' => ['>=' => 0]])->getOne();
        if (!$user) {
            $this->GlobalService->json(['code' => -2, 'msg' => '邮箱未注册']);
        }
        //验证验证码
        $send_model = send_model::getInstance();
        $res = $send_model->VerifyCode($email, $code);
        if ($res['code'] != 1) {
            $this->GlobalService->json($res);
        }
        $data = ['id' => $user['id'], 'password' => $password];
        $user_model = user_model::getInstance();
        $res = $user_model->editUser($data);
        if ($res['code'] == 1) {
            $user_ip_model = user_ip_model::getInstance();
            $user_ip_model->addData('邮箱忘记密码修改', $user['id']);
        }
        $this->GlobalService->json($res);
    }


}
