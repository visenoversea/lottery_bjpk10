<?php
/**
 *发送信息
 */

namespace main\controller;

use asura\Common;
use asura\Verify;
use main\classes\base;
use model\ip_list_model;
use model\send_model;


class send extends base
{

    /**
     * 获取手机验证码
     * /main/sendMsg/getMobileCode
     */
    public function getMobileCode($mobile, $area_code = 0)
    {
        $ip = Common::getIp();
        if ((ip_list_model::getInstance())->where(['type' => 0, 'ip' => $ip, 'status' => 1])->isExist()) {
            //在黑名单
            $this->GlobalService->json(['code' => -2, 'msg' => '网络异常']);
        }
        $mobile = str_replace(' ', '', $mobile);
        if (empty($mobile)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '手机号码不能为空']);
        }
        if (!Verify::isMobileNumber($mobile)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '手机号码格式错误']);
        }
        $send_model = send_model::getInstance();
        $res = $send_model->sendMobileCode($mobile, $area_code);
        $this->GlobalService->json($res);
    }

    /**
     * 获取邮箱验证码
     *  /main/sendMsg/getEmailCode
     */
    public function getEmailCode($email='')
    {
        $ip = Common::getIp();
        if ((ip_list_model::getInstance())->where(['type' => 0, 'ip' => $ip, 'status' => 1])->isExist()) {
            //在黑名单
            $this->GlobalService->json(['code' => -2, 'msg' => '网络异常']);
        }
        $email = trim($email);
        if (!Verify::isEmail($email)) {
            $this->GlobalService->json(['code' => -2, 'msg' => '请填写正确的邮箱地址']);
        }
        $send_model = send_model::getInstance();
        $res = $send_model->sendEmailCode($email);
        $this->GlobalService->json($res);
    }

}
