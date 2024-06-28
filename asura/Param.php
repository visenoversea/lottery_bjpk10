<?php

namespace asura;

class Param
{
    //id数字加密字符串
    const NUM_KEY='PIJ2R0MWX7TUV6EFQ5KLC3DGA4HB1NO89YZ';

    /**
     * @param string $name      必需。规定 cookie 的名称。（主流浏览器默认最多可以设置50个cookie，每个cookie最大4097字节）
     * @param string $value     必需。规定 cookie 的值。不能为数组，必须是字符串，可以用json_encode(占用cookie字节少)或serialize(解析速度快)对数组格式化
     * @param int $expire       可选。规定 cookie 的有效期。默认0-浏览器关闭失效 时间有效期设置格式为时间戳+过期时间
     * @param string $path      可选。规定 cookie 的服务器路径。设置成 '/' 时，Cookie 对整个域名 domain 有效。 如果设置成 '/foo/'， Cookie 仅仅对 domain 中 /foo/ 目录及其子目录有效（比如 /foo/bar/）。
     * @param string $domain    可选。规定 cookie 的域名。如需二级域名共享cookie则需设置 例:www.asura.com和son.asura.com把$domain='.asura.com'则两个域名都可以访问这个cookie
     * @param false $secure     可选。规定是否通过安全的 HTTPS 连接来传输 cookie。也就是设为true，只有https头才能获取传输到cookie，通常不设置
     * @param bool $httponly    可选。规定是否通过 HTTP协议访问。 设置为true时 Cookie无法通过类似 JavaScript 这样的脚本语言访问
     */
    public static function setCookie(string $name, string $value, int $expire = 0, string $path = '/', string $domain = '', bool $secure = false, bool $httponly = true)
    {
        setcookie($name, self::auth($value), $expire, $path, $domain, $secure, $httponly);
    }

    /**
     * 获取COOKIE
     * @param string $name
     * @return string
     */
    public static function getCookie(string $name): string
    {
        return isset($_COOKIE[$name]) ? self::auth($_COOKIE[$name], true) : '';
    }

    /**
     * 设置SESSION
     * @param string $k
     * @param $v
     */
    public static function setSession(string $k, $v)
    {
        session_start();
        $_SESSION[$k] = $v;
        session_write_close();
    }

    /**
     * 获取SESSION
     * @param string|null $k
     * @return array|mixed|null
     */
    public static function getSession(string $k = null)
    {
        if (session_id() === '') {
            session_start();
            session_write_close();
        }
        return $k === null ? $_SESSION : ($_SESSION[$k] ?? null);
    }

    /**
     * 销毁session
     */
    public static function destroySession()
    {
        session_start();
        session_destroy();
    }

    //密码前一半字符与后一半字符调换,并base64解码
    public static function decodePassword($password){
        $len = strlen($password);

        $str1 = substr($password,0,$len-1);
        $str2 = substr($password,$len-1);
        $password = $str2 . $str1;
        $explode = $len/2;
        if($len % 2 >= 1){
            $explode = round($explode) -2;
        }
        $str1 = substr($password,0,$explode);
        $str2 = substr($password,$explode);
        $str = $str2 . $str1;
        $res = base64_decode($str);
        return $res;
    }

    //加密字符
    public static function encodePassword($password){
        $password = base64_encode($password);
        $len = strlen($password);
        $str1 = substr($password,0,$len-1);
        $str2 = substr($password,$len-1);
        $password = $str2 . $str1;
        $str1 = substr($password,0,$len/2);
        $str2 = substr($password,$len/2);
        return $str2 . $str1;
    }

    /**
     * 返回真正的token
     * @param $token
     * @return mixed
     */
    public static function decodeToken($token){
        $token = substr($token,0, strlen($token)-5);
        $arr = explode('.',$token);
        return $arr[0];
    }

    /**
     * 加解密函数
     * @param string $str       加密或解密字符串
     * @param bool $decode      false-加密(默认) true-解密(解密时必传)
     * @return string
     */
    public static function auth(string $str, bool $decode = false): string
    {
        if ($decode) {
            //解密
            $str = base64_decode($str);
            $md5 = substr($str, 0, 16);
            $str = substr($str, 16);
        } else {
            //加密
            $md5 = md5($str, true);
        }
        $code = '';
        foreach (str_split($str) as $k => $v) {
            $code .= $v ^ $md5[$k % 16];
        }
        return $decode ? (md5($code, true) === $md5 ? $code : '') : base64_encode($md5 . $code);
    }

    /**
     * md5字符串加密(高效简单防暴力破解等特点，常用于密码加密对比)
     * @param string $str   加密字符串
     * @return string       返回加密的md5
     */
    public static function md5str(string $str): string
    {
        return md5(md5($str, true));
    }

    //一次md5
    public static function md5strOne(string $str): string
    {
        return md5($str);
    }

    /**
     * 数字加密(生产code短可解密,常用于邀请码)
     * @param int $num 传入一个数字(如:用户id)
     * @param int $length 最小长度
     * @return string
     */
    public static function numEncode(int $num, int $length = 6): string
    {
        $code = '';
        while ($num > 0) {
            $mod = $num % 35;
            $num = ($num - $mod) / 35;
            $code = self::NUM_KEY[$mod] . $code;
        }
        if (strlen($code) < $length)
            $code = str_pad($code, $length, 'S', STR_PAD_LEFT);
        return $code;
    }

    /**
     * 数字解密
     * @param string $code
     * @return float|int
     */
    public static function numDecode(string $code)
    {
        $code=strtoupper($code);
        if (strrpos($code, 'S') !== false)
            $code = substr($code, strrpos($code, 'S') + 1);
        $len = strlen($code);
        $code = strrev($code);
        $num = 0;
        for ($i = 0; $i < $len; $i++) {
            $num += strpos(self::NUM_KEY, $code[$i]) * pow(35, $i);
        }
        return $num;
    }

    /**
     * 获取随机字符串，默认32位
     * @param int $len      输出的长度
     * @param string $chars 要进行随机的字符串(可选)
     * @return string
     */
    public static function getRandStr(int $len = 32, string $chars = 'abcdefghijklmnopqrstuvwxyz0123456789'): string
    {
        $str = '';
        $max = strlen($chars) - 1;
        for ($i = 0; $i < $len; $i++) {
            $str .= $chars[mt_rand(0, $max)];
        }
        return $str;
    }

    /**
     * 获取guid
     * @return string
     */
    public static function getGUID(): string
    {
        if (function_exists('com_create_guid') === true) {
            return trim(com_create_guid(), '{}');
        }
        return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
    }

}
