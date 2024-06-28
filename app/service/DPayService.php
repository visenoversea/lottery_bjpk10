<?php
//测试商户
//对接文档：https://www.showdoc.com.cn/2378365587096537
//文档密码：123456
//测试服网关：https://api.trxcoinn.com

namespace service;

use asura\Common;
use model\domain_model;

/**
 *
 */
class DPayService
{
    private static DPayService $instance;
    private string $BaseUrl = 'https://api.ylpayway.com';
    //商户号
    private string $merchantNo = 'B01197';
    //废弃
    private string $key = '';
    //平台公钥用于商户解密
    private string $publicKey = '-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDB3QNfLbLWyY2ZOkDMiwohuZh0
ITx3lXO/Erwr8B1yfqjRLGZVocgBbIo8IN4si2CXmoKqOH2HMDsvmZ+8aEBESimq
tUwbOW8aP6fT2FVEDCPYMoR6p+FCfMTBlrGF8esQbp7GqLU1L3joaO/2M8cXcwYh
GW+swwiRSvX07AyV+QIDAQAB
-----END PUBLIC KEY-----';
    //商户公钥用于平台解密
//    private string $publicKey = '-----BEGIN PUBLIC KEY-----
//MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtp57VavqgC3bBWlS/nD+jWdKi
//MnTCa8kb2VQmLzRrrAsqEyKW58UJSj2kCDKA5dK++dgSV450s8nTtn/LTYKWRqdf
//Z3pqWYdWU5M8piqe8mAKdo4EpWFpzAbLvsuNMwT5QqdUKTO0/6MK4NFlA8vAtx8U
//JZuqmIxMBqB1PeMoawIDAQAB
//-----END PUBLIC KEY-----';
    //商户私钥用于加密
    private string $privateKey = '-----BEGIN PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAK2nntVq+qALdsFa
VL+cP6NZ0qIydMJryRvZVCYvNGusCyoTIpbnxQlKPaQIMoDl0r752BJXjnSzydO2
f8tNgpZGp19nempZh1ZTkzymKp7yYAp2jgSlYWnMBsu+y40zBPlCp1QpM7T/owrg
0WUDy8C3HxQlm6qYjEwGoHU94yhrAgMBAAECgYEApzf11wUA+gSQAnh9i1VmYmIo
Vk/H5z/rlImeYnaqP9SXm5h5gl8EeYGoAcBzAXRNj+D+lAsD/pTyEJB4Vsj4qS4x
Nu/ZcsjS2u/9Uass930MtXRGMPIZZPD+KFo0cu3Bo7hI11z4AxM4eomW7Rt5Jgxa
zb/QsxycZMJYc71vfsECQQDdHpaH29DfJtpSYjg+sTi3F/q87r2G+2w0r092eJ15
wLROvxXCkOI8IEWxORp//miFEh1qM8p7z9Mnxuq4im5jAkEAyQxG3YIxbT5H1554
23bbdRQHvOKUNUBmA1SXfgd/Fsq6vy+oDuuEKtc8iX+At3koNWwW1T58o//aksKr
hGiYWQJAa8SNrxdWPHxOKZrPONbdAneAb/aXjqMZQLA0tVPhxEZEWqDM9S/x40YD
UXW4Uatnu3txtKIbTK6khh1vppNpawJAXWiP0EC6GCh0lpBxVH4PjoDk63RWKbum
6es2i36OJJfCViudKHlyKblgzf1oX1YyQUfb/+2NWWD5O3Co4db62QJAIAbaGTSU
ETreyAVwUNft0iVxBpxZYRjDSpwwCY2wtoTTJlz8yrKb4DmOJkAPMS09y6MwKGXe
hbX3QyMhtiYnlA==
-----END PRIVATE KEY-----';

    /**
     * 不能被克隆
     */
    final protected function __clone()
    {
    }

    /**
     * 获取Redis单例实例
     * @return DPayService
     */
    public static function getInstance(): DPayService
    {
        return static::$instance ?? static::$instance = new static();
    }

    /**
     * 生成SHA256withRSA签名
     */
    public function getSign($data): string
    {
        $signStr = $this->getSignStr($data);
        //$signStr = 'merchantNo=C99999&notifyUrl=https://www.xxx.com&type=1&userId=111';
        $privKeyId = openssl_get_privatekey($this->privateKey);
        $res = openssl_sign($signStr, $sign, $privKeyId, OPENSSL_ALGO_SHA256);
        openssl_free_key($privKeyId);
        if ($res) {
            return base64_encode($sign);
        }
        return '';
    }

    /**
     * 校验SHA256withRSA签名
     */
    public function checkSign($data, $sign): bool
    {
        $signStr = $this->getSignStr($data);
        $publicKeyId = openssl_get_publickey($this->publicKey);
        $res = openssl_verify($signStr, base64_decode($sign), $publicKeyId, OPENSSL_ALGO_SHA256);
        openssl_free_key($publicKeyId);
        return $res === 1;
    }

    /**
     * 获取待签名字符串
     */
    private function getSignStr($data): string
    {
        unset($data['sign']);
        ksort($data);
        $signStr = '';
        foreach ($data as $k => $v) {
            $signStr .= $k . '=' . $v . '&';
        }
        return rtrim($signStr, '&');
    }

    //废弃
    public function sign($data): string
    {
        ksort($data);
        $str='';
        foreach ($data as $k => $v) {
            $str .= $k . '=' . $v . '&';
        }
        $str.= 'key=' . $this->key;
        return strtoupper(md5($str));
    }

    //创建订单
    public function createOrder($user_id): array
    {
        $url = $this->BaseUrl . '/api/recharge';
        $domain_model = domain_model::getInstance();
        $domainUrl = $domain_model->getUrl();
        $data = [
            'merchantNo' => $this->merchantNo,
            'notifyUrl' => $domainUrl . '/main/userRecharge/DPay',
            'type' => 1,
            'userId' => $user_id
        ];
        $data['sign'] = $this->getSign($data);
        $res = Common::curlRequest($url, json_encode($data), ['Content-Type: application/json']);
        $res = json_decode($res, true);
        if ($res['code'] !== 0) {
            return ['code' => -2, 'msg' => $res['message']];
        }
        return ['code' => 1, 'msg' => '成功', 'data' => $res['data']];
    }

    public function withdrawal($id, $userId, $orderNo, $amount, $channelType, $address): array
    {
        if (!in_array($channelType, ['TRC20', 'ERC20'])) {
            return ['code' => -2, 'msg' => '操作失败,当前链类型只支持TRC20,ERC20'];
        }
        $amount = number_format($amount, 6, '.', '');
        //$channelType='TRC20';//TRX,TRC20,ETH,ERC20,BNB,BEP20,DOGE
        $url = $this->BaseUrl . '/api/withdrawal';
        $domain_model = domain_model::getInstance();
        $domainUrl = $domain_model->getUrl();
        $data = [
            'merchantNo' => $this->merchantNo,
            'channelType' => $channelType,
            'address' => $address,
            'notifyUrl' => $domainUrl . '/main/userWithdraw/DPay',
            'type' => 1,
            'amount' => $amount,
            'params' => (string)$id,
            'mOrderId' => $orderNo,
            'userId' => $userId
        ];
        $data['sign'] = $this->getSign($data);
        $res = Common::curlRequest($url, json_encode($data), ['Content-Type: application/json']);
        $res = json_decode($res, true);
        if ($res['code'] !== 0) {
            return ['code' => -2, 'msg' => $res['message']];
        }
        return ['code' => 1, 'msg' => '成功', 'data' => $res['data']];
    }

}
