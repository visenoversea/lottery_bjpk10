<?php

namespace asura\sms;

abstract class Base
{

    /**
     * 短信发送接口
     * @param string    $mobile     手机号
     * @param string    $msg        信息
     * @param int       $area_code  区号
     */
    abstract public function sendSMS(string $mobile,string $msg, int $area_code = 86);

}