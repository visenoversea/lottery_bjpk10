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
    private $merchantNo = '133';

    //平台公钥用于商户解密
    private $publicKey = '-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDYOBAvx5gk90Nr+Lw6W91scdm
UyQRRmGQ3rc4ld+3tvHDsKuin5wzM6FuPPL520czv1SirzXyY2SjCOyA6AkfDH2
Y4HEFmC6qPLtRXi3cmqRvniwrSv53NAD4zTr9GcIJHwRK6quuJtmZyW8rs+8khz
HmAW2MUiIUvIRxQjpINuwIDAQAB
-----END PUBLIC KEY-----';
    //商户公钥用于平台解密

    /*private string $publicKey = '-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrV41SJgNhxIg6BrnkmgUbb195
9TY1IoitIbPJldmcIb7gaYk/IzkH5ProwFkB6yz9vohA8/zeH30HE6+2saQ0wUXJ
uTaaydrNHzbLWsv2ri9AbO6envLaJ5ib40rh42466TpZvYW3fYVJZMiHrC1x3qzt
Xv2WQIEFNNTlhdJ2GQIDAQAB
-----END PUBLIC KEY-----';*/

    //商户私钥用于加密
    private $privateKey = '-----BEGIN PRIVATE KEY-----
MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAOeolvY25Iynezdu
X5Vr/exv5qkcgqWnVpaWVN9wMLA1jfFrr8DgGj/h10Tp917dT1UMGr/wYew5TXuI
C8fhhin9Ms44d8ToRGn07sYsS5WPhbwGEDHjkPNKYVKkgq9gi2GKc4J4cZj5ubVD
osuZgppB6f5l8Jlcn/eCMUnpsZ5zAgMBAAECgYEAzN5Vkyz8dj9vQphDw7sbdsuH
a6shByqz8rzEFk37YPobq5OWfLYzwKcTX4iiEa0aiZYI2hHWJ7iNg1/PO1eA81aQ
n8CEGfPKZcNPRw2TFLEqSOILvA4cuBR8QGrEp3fZ/oTRksTG4mc3HIdyxGLAa/KE
u6TG4OI6/QbvEDD9+jECQQD1FxLnttKebIrfsv5t2fOku8+Txdkux2SPG3CsTAEa
7aIgZft6hQv+qRskH/+SA/6dwfFfT7blMuzmUhY6YC3PAkEA8fh0yemUqFR6Coft
dhWJezPQ/SzyUi3SiS7N6XTD0xqI8Ln8dLCLilPkQWIuwo82eGYS1Pztam6FHnAQ
vwYyHQJBAMIXb8VIpysG0kOtQIhGHgjLIuvntsKw7RXXqTcJSabFoar+mFTCoGkg
CnplTMOZnj3YpQnR2wlPdwQ+5ZN9L0kCQQDjNKtlVOFz1i7qaIw/DyYS+6rHsEax
h7ljewF6r1uZhBcGA33cjFHax79S7cB+jD9XenFAcWb1Q2XYGN6AoG65AkBJ45Hh
KRvNLkT5F4siR74KyKAL5NWEDZxQsmTgrOKWl7ILnaBKd0Eeg0Hb17M59vcyfUbj
6Wcp/5mbzIvj10or
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
        $domainUrl = $domain_model->getUrl(7);
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
        if (!in_array($channelType, ['TRC20', 'ERC20','ETH','TRX'])) {
            return ['code' => -2, 'msg' => '操作失败,当前链类型只支持TRC20,ERC20,ETH,TRX'];
        }
        $amount = number_format($amount, 8, '.', '');
        //$channelType='TRC20';//TRX,TRC20,ETH,ERC20,BNB,BEP20,DOGE
        $url = $this->BaseUrl . '/api/withdraw';
        $domain_model = domain_model::getInstance();
        $domainUrl = $domain_model->getUrl(7);
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