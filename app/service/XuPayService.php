<?php
//测试商户
//对接文档：https://www.showdoc.com.cn/2378365587096537
//文档密码：123456
//测试服网关：https://api.trxcoinn.com

namespace service;

use asura\Common;
use asura\Log;
use model\domain_model;

/**
 *
 */
class XuPayService
{
    private static $instance;
    private $BaseUrl = 'https://api.cbilianpay.com';
    //商户号
    private $merchantNo = '153';

    //平台公钥用于商户解密
    private $publicKey = '-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi4J0o92ferhar+XajQ6/YUSTTgfv9Mc5DqLcAG9x+7sxnwKt1sq7Etb1BselxfiJ7lYuyKVaDdFerwjNNu8qO3HAFehv8Qcz3ZMgHJJnLOnrQCmNKPETxbipelDu1AUzQ5nvX1GCvgedf3g8mfSrifSEg/GHbGmG/o0DB2So1BwIDAQAB
-----END PUBLIC KEY-----';
    //商户公钥用于平台解密

    /*private string $publicKey = '-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpmobzTt7RpMRhEtQZ5MaU2cRD
B+plLjHI/pcBAnDnYjAoIlSgDs1r2QdDxHfBcN18Df15cEE24YMwKA9pL+jlCpgq
z/sD8YPe01Tgkep1yR7Ui8s53kmAWekNjh5mesnouk4QHgCmx7SMGWRxlt8KJGyp
n5ptqYXCaJsa12NJaQIDAQAB
-----END PUBLIC KEY-----';*/

    //商户私钥用于加密
    private $privateKey = '-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKmahvNO3tGkxGES
1BnkxpTZxEMH6mUuMcj+lwECcOdiMCgiVKAOzWvZB0PEd8Fw3XwN/XlwQTbhgzAo
D2kv6OUKmCrP+wPxg97TVOCR6nXJHtSLyzneSYBZ6Q2OHmZ6yei6ThAeAKbHtIwZ
ZHGW3wokbKmfmm2phcJomxrXY0lpAgMBAAECgYAsB9f9Fn62QmZRJUg3KLN9NUPE
eyuY9PMr0Rx2wKF7EHycDr2ViAJAe2ltaHYGnDyD1kX13vSvQMCEIgJONofpcidb
2PJlabwOWVQpENdPlOY/MkFOAqYdshGdjzkWqRttGYuxIDONtul+auJJg0uwnXjm
BmmWfFCE52QJpIaIAQJBANan1b2gE6v2MCtyc5XUXZk2/w7od2LukAos6j8nrdwU
iHZv7BRUEDnCiG9UsKnFSQnkRYOsUh8XiOVJhGjUv4ECQQDKRUjRvf+1FelQ6I8I
5nN8WBQxnbFMreZJqqEk6g3Hoix17iuQB1HBU2eoPtAZaMeOXhaKQaHBosdP2IIr
v33pAkEAi2vRuWuqu0uZN+8LwiqAbM661a0KNjjrV6CauVCFbWfsxrilZwK+0zVW
NrGUWYCpkwIwYHjhkg5QPVUF6q0cgQJBAIMEEcDZwtG22aOwn0VykAdQvfPNYtR6
J5o7zZktibNvlkDk/o6STyBcN95AoWZz+h57TzpKfM4B8/wCD37q0FECQEHr0zqn
Zmm51x338Me9Jf4moYC/kqTm+7YHfCxfuyQyayEu67Ce/5ACEKbCxcFWDYIwYLFM
UgMHI7Bk7g17b5s=
-----END PRIVATE KEY-----';

    /**
     * 不能被克隆
     */
    final protected function __clone()
    {
    }

    /**
     * 获取Redis单例实例
     * @return XuPayService
     */
    public static function getInstance(): XuPayService
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
            if(!$v) continue;
            $signStr .= $k . '=' . $v . '&';
        }
        return rtrim($signStr, '&');
    }


    //创建订单
    public function createOrder($user_id): array
    {
        $url = $this->BaseUrl . '/api/recharge';
        $domain_model = domain_model::getInstance();
        $domainUrl = $domain_model->getUrl();
        $data = [
            'merchantId' => $this->merchantNo,
            'notifyUrl' => $domainUrl . '/main/userRecharge/XuPay',
            'userId' => $user_id
        ];
        $data['sign'] = $this->getSign($data);

        $res = Common::curlRequest($url, json_encode($data), ['Content-Type: application/json']);

        $logInfo = [
            'data' => $data,
            'res' => $res,
        ];
        Log::log($logInfo, Log::INFO, 'xupay_createOrder');

        $res = json_decode($res, true);
        if ($res['code'] != 200) {
            return ['code' => -2, 'msg' => $res['msg']];
        }

        return ['code' => 1, 'msg' => '成功', 'data' => $res['data']];
    }

    public function withdrawal($id, $userId, $orderNo, $amount, $channelType, $address): array
    {
        return [];
        if (!in_array($channelType, ['TRC20', 'ERC20','ETH','TRX'])) {
            return ['code' => -2, 'msg' => '操作失败,当前链类型只支持TRC20,ERC20,ETH,TRX'];
        }
        $amount = number_format($amount, 8, '.', '');
        //$channelType='TRC20';//TRX,TRC20,ETH,ERC20,BNB,BEP20,DOGE
        $url = $this->BaseUrl . '/api/withdraw';
        $domain_model = domain_model::getInstance();
        $domainUrl = $domain_model->getUrl();
        $data = [
            'merchantId' => $this->merchantNo,
            'channelType' => $channelType,
            'address' => $address,
            'userId' => $userId,
            'amount' => $amount,
            'params' => (string)$id,
            'mOrderId' => $orderNo,
            'notifyUrl' => $domainUrl .  '/main/userWithdraw/XuPay',
        ];
        $data['sign'] = $this->getSign($data);
        $res = Common::curlRequest($url, json_encode($data), ['Content-Type: application/json']);
        Log::log( "url:{$url} result: " . $res . ' params:' . json_encode($data,JSON_UNESCAPED_UNICODE) , Log::INFO, 'XuPayService-withdrawal-curlRequest');
        $res = json_decode($res, true);
        if ($res['code'] != 200) {
            return ['code' => -2, 'msg' => $res['msg']];
        }
        return ['code' => 1, 'msg' => '成功', 'data' => $res['data']];
    }

}