<?php
//测试商户
//https://pay.trxcoinn.com/
//G00362
//admin
//123456
//
//谷歌口令密钥：F2QJFOO3LE33NHY7
//资金密码：123456
//密钥ee1f4d805514a32c71fce16d57906682

namespace service;

use asura\Common;
use model\domain_model;

/**
 * 文档 密码123456
 * https://www.showdoc.com.cn/huangdisasas
 */
class UPayService
{
    private static $instance;

    private $apiUrl = 'http://api.uanapi.com';
//    private $apiUrl = 'http://upay.dongdiankeji.cn';
    //商户号
    private $appId='9081882572';
    private $key='cdt8le2neq4q7lw7jjknoyeqmbkwamrp';

    /**
     * 不能被克隆
     */
    final protected function __clone()
    {
    }

    /**
     * 获取Redis单例实例
     * @return UPayService
     */
    public static function getInstance(): UPayService
    {
        return static::$instance ?? static::$instance = new static();
    }


    public function address($coinType='TRC20-USDT')
    {
        $url = $this->apiUrl . '/address.do';
        $data = [
            'appId' => $this->appId,
            'coinType' => $coinType,
        ];
        $data['sign']=$this->sign($data);
        echo 'appId:'.$this->appId.'<br/>';
        echo 'coinType:'.$coinType.'<br/>';
        echo 'sign:'.$data['sign'].'<br/>';
        echo '返回结果:<br/>';
        $res = Common::curlRequest($url, $data);
        echo json_encode($res, JSON_UNESCAPED_UNICODE);
//        echo 'code:' . $res['code'] . '<br/>';
//        echo 'msg:' . $res['msg'] . '<br/>';
//        echo 'data:' . json_encode($res['data'], JSON_UNESCAPED_UNICODE);
    }

    //查余额
    public function balance($address,$coinType='TRC20-USDT')
    {
        $url = $this->apiUrl . '/balance.do';
        $data = [
            'appId' => $this->appId,
            'address'=>$address,
            'coinType' => $coinType,
        ];
        $data['sign']=$this->sign($data);
        var_dump($data);
        $res = Common::curlRequest($url, $data);
        var_dump($res);
    }

    public function transfer($orderNo,$amount,$fromAddr,$fromKey,$toAddr,$coinType='TRC20-USDT')
    {
        $url = $this->apiUrl . '/transfer.do';
        $domain_model = domain_model::getInstance();
        $domainUrl = $domain_model->getUrl();
        $data = [
            'appId' => $this->appId,
            'orderNo' => $orderNo,
            'fromAddr'=>$fromAddr,
            'fromKey'=>$fromKey,
            'toAddr'=>$toAddr,
            'amount'=>$amount,
            'notify' => $domainUrl . '/main/userWithdraw/UPay',
            'coinType' => $coinType,
        ];
        $data['sign']=$this->sign($data);
        var_dump($data);
        $res = Common::curlRequest($url, $data);
        var_dump($res);
    }


    //签名
    public function sign($data): string
    {
        ksort($data);
        $signStr = '';
        foreach ($data as $key => $val) {
            if (!empty($key)) {
                $signStr .= $key . "=" . $val . "&";
            }
        }
        $signStr .= "key=" . $this->key;
        return md5($signStr);
    }

}
