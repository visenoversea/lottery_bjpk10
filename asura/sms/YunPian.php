<?php

namespace asura\sms;

use asura\Common;

class YunPian extends Base
{

    /**
     * 短信发送接口
     * @param string    $mobile     手机号
     * @param string    $msg        信息
     * @param int       $area_code  区号
     */
    public function sendSMS(string $mobile,string $msg, int $area_code = 86){

        $data = Common::curlRequest('https://sms.yunpian.com/v2/sms/single_send.json', [
            'apikey' => $apikey,
            'mobile' => '+' . $area_code . $mobile,
            'text' => $msg
        ]);
        if ($data == false) {
            $res = ['code' => -2, 'msg' => '发送失败'];
        } else {
            $data = json_decode($data, true);
            if ($data['code'] == '0') {
                $res = ['code' => 1, 'msg' => '发送成功'];
            } else {
                $res = ['code' => -2, 'msg' => $data['msg']];
            }
        }
        return $res;
    }

}
