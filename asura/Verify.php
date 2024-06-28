<?php
/**
 * 验证类
 */

namespace asura;

use Mobile_Detect;

class Verify
{
    /**
     * 验证用户名字母开头 英文、数字、下划线6-20位字符
     * @param $user_name
     * @return bool
     */
    public static function userName($user_name): bool
    {
        return (bool)preg_match("/^[A-Za-z][A-Za-z0-9_]{5,20}$/", $user_name);
    }

    /**
     * 验证中国手机号
     * @param $mobile
     * @return bool
     */
    public static function isChinaMobile($mobile): bool
    {
        return (bool)preg_match("/^1\d{10}$/", $mobile);
    }

    /**
     * 验证手机号格式
     * @param $mobile
     * @return bool
     */
    public static function isMobileNumber($mobile): bool
    {
        return (bool)preg_match("/^\d{7,16}$/", $mobile);
    }

    /**
     * 验证数字
     * @param $number
     * @return bool
     */
    public static function isNumber($number): bool
    {
        return (bool)preg_match("/^\d*$/", $number);
    }

    /**
     * 邮箱格式验证
     * @param $email
     * @return bool
     */
    public static function isEmail($email): bool
    {
        $index = strpos($email, '@');
        if ($index !== false && $index > 0) {
            return true;
        }
        return false;
//        return preg_match("/^.*@.*(\.[a-z]{2,})$/", $email) ? true : false;
//        return (bool)preg_match("/^[a-zA-Z0-9]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-z]{2,})$/", $email);
    }


    /**
     * 验证密码格式 6-20位数
     * @param $password
     * @return bool
     */
    public static function password($password): bool
    {
        $len = strlen($password);
        return $len >= 6 && $len <= 20;
    }

    /**
     * 匹配ip地址
     * @param $ip
     * @return bool
     */
    public static function isIp($ip): bool
    {
        return (bool)preg_match("/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/", $ip);
    }

    /**
     * 验证资金密码
     * @param $password
     * @return bool
     */
    public static function fundPassword($password): bool
    {
        return (bool)preg_match("/^\d{6}$/", $password);
    }

    /**
     * 验证银行卡信息 中国各大银行卡号查询
     * https://github.com/digglife/cnbankcard                               接口说明
     * https://github.com/digglife/cnbankcard/blob/master/bankname.json     银行列表
     * @param string $cardNo    银行卡号
     * @return string           该接口返回银行Bin号的合法与否（validated），所属银行(bank)，银行卡类型(cardType,DC:借记卡，CC:信用卡)
     * */
    public static function bankCard(string $cardNo): string
    {
        $data = json_decode(file_get_contents("https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo={$cardNo}&cardBinCheck=true"), ture);
        if ($data) {
            if ($data['validated']) {
                $bank = Loader::config('bank');
                $data['bank_name'] = $bank[$data['bank']] ?? '未知的银行';
            }
        }
        return $data;
    }

    /**
     * 验证是否手机端
     * @return bool
     */
    public static function isMobileDetect(): bool
    {
        return (new Mobile_Detect())->isMobile();
    }


}