<?php

namespace service;

use asura\Common;
use asura\Log;
use model\hpay_address_model;
use model\user_withdraw_model;

/**
 *
 */
class HPayService
{

    private static $instance;
    private $base_url;
    private $app_id;
    private $public_key;
    private $this_private_key;
    private $public_param;
    private $withdraw_public_key;
    private $this_withdraw_private_key;

    public function __construct($data = [])
    {
        $this->base_url = 'https://api.hyperbc.com/shopapi';
        $this->app_id = 's58458dffrnkyw76';

        //HBC平台公钥
        $this->public_key = '-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6WevLJSBdKwYkDYn1SmF
4v2B5Bm/c+3tUuTr4lXARmSBi19HYv53ROBkfa6G7jhNT3yW2CGDGallpwwUFXa8
6u8/WnKWUVe5Xd3/EWdd8QkwT75d7oDI39QkItCO17B2bKOAvFiBsQUsTKfuW/eT
LpZihUFRwlQozj4HAIdA4OT+kDmcL6QwBRS2hVelrPWmmagh4OUNHBrZOOAW5tug
WaAGdJZ9OktiPAOs8LhpIsIAw/TMRWpFeT0hH5c7mA40XA8NPIUG8vFBI/sup8aP
brcCh7koiLapbCACrn1elTodFfl71hF0q2sAviReVSMKn5Fy1z1h08MTj9UkQLRh
wQIDAQAB
-----END PUBLIC KEY-----';

        //自己的平台私钥
        /*
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6sUOStpxIJuOq304/QFY
gEaeQ/RLJb5DhTpw9v5SI04WEwvKqADe9+liodBYAFJDzSweDyMeb9Qb01n+Mgnb
QUTh6xU0dNN5DY0qe0Q8LKmqi4vJqoOSyHClGF1XoqhDZmqS/yzXPz/eK2O8QwdA
hHAyPBg8KlVAunvIC9ZcfZVDvC5MiMozo6sLie3VOAkOm8G6m8h/q2tX5faptyKS
iIMOSKB1TNfiyT0lhiZ8FjR+mILPHvUv75LWrhmHoBniO3uj8VXUC9plMAU4+46Y
AhZhN45ZuU7iZSACq1/H8B3MeoV06OtokUkBwAsh8f7QdPkOBao2oSJjTEdFNyWB
/QIDAQAB
-----END PUBLIC KEY-----
         */
        $this->this_private_key = '-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDqxQ5K2nEgm46r
fTj9AViARp5D9EslvkOFOnD2/lIjThYTC8qoAN736WKh0FgAUkPNLB4PIx5v1BvT
Wf4yCdtBROHrFTR003kNjSp7RDwsqaqLi8mqg5LIcKUYXVeiqENmapL/LNc/P94r
Y7xDB0CEcDI8GDwqVUC6e8gL1lx9lUO8LkyIyjOjqwuJ7dU4CQ6bwbqbyH+ra1fl
9qm3IpKIgw5IoHVM1+LJPSWGJnwWNH6Ygs8e9S/vktauGYegGeI7e6PxVdQL2mUw
BTj7jpgCFmE3jlm5TuJlIAKrX8fwHcx6hXTo62iRSQHACyHx/tB0+Q4FqjahImNM
R0U3JYH9AgMBAAECggEAVMUyk/SsRInmyiU9Hp4NxsO5AfCD8ezxlHm1sHnETtsz
PU1Ur7UgzYOICcWhAPyzXrI/aFfV9asxIO+tyYOll7u3l5rghg6V9z6xyDCrSbU5
z4l6GAfKSHXkJxgNPL5lF+YDjgAy+LOnFSO+JrXHpgqdGPXnQ6Hk7XEkmqGcY/uA
iGPzqkPoM4ZLpdXi368OC8wW9DbwtYwVMvDNqRU4YBABM8Kyn6/i9dBh7gyv/hqg
AJw+Il7ecTYsE532YAYzE5ooSI3/UyhttkGnDDoPFQ2V7YE1+ujxUHT6WVHYNqF+
QjilEBLfza3bjjKfegNoUxEU9wqTxqyThwBdx5lmQQKBgQD89+66GVqO9+/LrJkV
Tg6sFuMmBsZUk0+MMl+qeSquxXScQf7/cfoOkyCtRUcQV5KBmFxWdRhUG8oXBVwS
G8xjRlpvqUbvutwjMyBRRqiHT/YG0fyQhurMWkiJ+/kRJ4Fpuzyaoej9K/q8+Cey
C0s2zx0n0RHjjSmNULhN5VALIwKBgQDtlUrdk1tdc1IFDkyFLR24QRTmn5b476Pm
ttBIhnY6xN6ornxZnZDGecDSRvIiwc5+LV4L+mHIcLoQu3+Oz0mnhxMOLB9sWkGU
kOSWjOcnjaP0rEk5Ol1gXoyUZeESbfrXBgDxB+s6DyHblbZJKlk40hF4YOk2rX+8
U55+Eg8gXwKBgQCTDkZXJPoB9pwN2M49Fl1tKPjvWCzfaatqorX+UeXAJ8U8ORlV
whpNcrYiRA2lsGLYt4umLvfvnSAD9feqB0LvyywzkUJNhmEGjWgSF3NNBezN1jBu
jB/en/VfUX1evYp7vn7inZDl7DUcuV3KIMqemBQo217820j2f6BEmDPJ5QKBgQC3
AKUvMZ9Rx09pR49Xkd3vnGnuDwWqcGSOhUjAZJpTQGvGAMkV+lGXIBePoUhHz4Mw
G9/yWAXT8EjSNKrXpQG2AkyCQShfPNKBDm6VLKmtBORCxiaM51EftxSQBj2tBXwO
/rfg8VmWWiuZSaOkjfM12lHMqNFa5Z+bv8k4kM6H/wKBgQCSDawPbp2oyJgF4eHv
/kr2CRjBZrSbT+rN47QPluabBHBm25ajW5AqAvgGHrSQWX0zVBDBxhn4aq9JO7Tx
c6jPoq7wOHEKwn537QELN5woJlCpjoYGoDsz9D68QNYd2OE6J8441DzOtYv+gfFa
rkI29GCbJXckkt5xg0PzopapqQ==
-----END PRIVATE KEY-----';

        //HBC风控公钥
        $this->withdraw_public_key = '-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4SCEhubD2qpCqg4H4wEl
8CM2RxEa7HQC6rJbUiVs/NmME+sAh70gRaC7E4x6/cajXbIMCKUCd67l++csEbSl
bnu3oizOoGYaOl0pR8iNw3d65vdat/6ZPi2Xbj4SrGfsQMK0SG1bYbCuK/hxzrzc
T2E/vjZ6tkI69PsSfmW+cCI2Ur9xk+5zxzbq/WiwKjI1sdqvZWZsztIC9l0kBcj5
yTAThpYjQ+2drFZi2UpfIuEGsPKtPBCs8/IxC2r6BIlHKT3UfRLCbJXnVukw5W3Q
tfYfT9MHHjyzJl27VdzUGQ3ax9iKqlLykn7t+8aeMS48NY37rYHPY8a3tVmo5a0e
jwIDAQAB
-----END PUBLIC KEY-----';

        //自己的风控私钥
/*
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0SoeJthWO/+vLwwGzkII
ViNoUAjFJMKmLaA2EIAyK2CMFwZlUYvflTdOrkGEN4E3KL4dNG9FRjnyRsnr66f0
3O1YCrJIjxarJJ9IUxwXG5E6Fe3xcx26B9ceD96z3mIRaGUYfhQsJso8YYau+e2V
HCxL8VOo4lrgLxzUZN4m1fdNq8HjtcTIywaC1wxPre5xPnlv+3CzMPNIUuU2xbQ+
ykyL02zUwvsia9peA8D2uArlo4l/ZbB+/f6+531fUdO84+AxlXfkSjS3uYBz0JLD
q+p2Nsv3+2nXAcXvFrsrcWeSN7yBs1bKymLOUC2M2jG9qOGG3C+27sT5m3gLKZGM
7wIDAQAB
-----END PUBLIC KEY-----
*/
        $this->this_withdraw_private_key = '-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRKh4m2FY7/68v
DAbOQghWI2hQCMUkwqYtoDYQgDIrYIwXBmVRi9+VN06uQYQ3gTcovh00b0VGOfJG
yevrp/Tc7VgKskiPFqskn0hTHBcbkToV7fFzHboH1x4P3rPeYhFoZRh+FCwmyjxh
hq757ZUcLEvxU6jiWuAvHNRk3ibV902rweO1xMjLBoLXDE+t7nE+eW/7cLMw80hS
5TbFtD7KTIvTbNTC+yJr2l4DwPa4CuWjiX9lsH79/r7nfV9R07zj4DGVd+RKNLe5
gHPQksOr6nY2y/f7adcBxe8WuytxZ5I3vIGzVsrKYs5QLYzaMb2o4YbcL7buxPmb
eAspkYzvAgMBAAECggEBAIwyxvMSnvqobywBy64E5MGYChtbRYlWTzzV3mdBBl+8
3ymvx8nZD4xc/ggfMhhiLC7K/5hd3Pktbg+02MWkVqSfEhxZU/lVIHHzse7DLVn1
BhIc43JdwovuzN+mTroI0dI/sSMRMmbtt3tHY5FyhjfUGTMw+EqAzzPFBzh1D2Lq
oj+lt02KiB0OZZ/9V2tAJGxnufMAkbJj9F9q0yA7n1iQZDBS0q8jkuGACrK90kVl
4Y9/zc7PElfzS++4Hv8VfFvbQB9gp2gn5mR2fRNzIXuFrVDC5uBHBvHi+auaTo6B
9H33Csw3JESZ3+Ej+QQGbQVEba/EdlI1fNEU5cWFcYECgYEA8otZDWNSh+PNOxmt
vcwubqBecBXZXj2tdYKtZEs9KPOSq2frVibuQr/oz0tzbA9iGcBrgHclPfC8sYJp
nQDTlLUovxCt8UTJ6a1MWGD5BlK90oXHJ02JS09d33dbcZG18PnHXtXmI/QOay8B
wuH02wf0dV2j4qm2W+axGo6zoNkCgYEA3MS0assXuk8DLvJEjvDzh3aLyYUdtwZy
rknzvVdF5t3EeowZpoGgO7hT85fZ4/eivd6KUFdqGW3TTZNNZBk3ArzGe6QpKHHo
+MY+E0QN/EuoseuTD2neRAixMJeofXKAtMbpYhCqgahrBO+i5RqCENsZ/paLO/bZ
qM97O5rw/wcCgYAwOPBdrw+roOkfBP38LGpW6F+eXVm4WP7xzCd5N1RTngndNm4d
1OOuNcWt4UxzgaN5hz5YblfjNsftawZghteKS3Jsen5657hVU3VIZQ9d6HmBL8Pm
1o2jgYYidfKiY9wOqzquaky1fUKYoOHyw0YRfkVmSFXbLO7q2rT/mLuyEQKBgQC3
440YS1TXVksjhp8+pUtkcYUcdan7sv5BWM4Sz6glFmI7ZYlUHTMXq4EaLUlMTxAa
sUxqgXWZ+tYADwturmYY/J8ji+jQjJlu5sn8CDrSBT9d/AiB1UBTUR4uiJTK8V5t
tiXeDl3IJD4IXYdE6GCgo7AyVLljWEmTCEfwrS3CbwKBgHdj4DGAWMPkP/FXClSF
4490/6VRbxZ69wMempOFuVq3YKHpkRXZvTMOLl1uIT70IJb2nqu2F7iJ0B19BJJ8
bkIWhPXDDRszvqhylEMBohcun3E4974d2WzcCZ4QYoUpjlr1MdcJ1EmMAPH75BBd
F/T8Fu81jSWzSveWKIXColrS
-----END PRIVATE KEY-----';
        $this->public_param = [
            'app_id' => $this->app_id,
            'version' => '1.0',
            'sign' => '',
            'time' => time(),
            'key_version' => 'admin'
        ];
    }

    public static function getInstance()
    {
        return static::$instance ?? static::$instance = new static();
    }

    /**
     * 不能被克隆
     */
    final protected function __clone()
    {
    }

    /**
     * 私钥签名
     * @param $data
     * @return string
     */
    public function encryption(&$data, $is_withdraw = false)
    {
        unset($data['rsa_path']);
        if (is_array($data)) {
            $signString = $this->getSignString($data);
        } else {
            $signString = $data;
        }
        if($is_withdraw){
            $private_key = $this->this_withdraw_private_key;
        } else {
            $private_key = $this->this_private_key;
        }
        //Log::log( "encryption signString:{$signString} " , Log::INFO, 'HPayServiceEncryption');
        $privKeyId = openssl_pkey_get_private($private_key);
        $signature = '';
        openssl_sign($signString, $signature, $privKeyId, OPENSSL_ALGO_MD5);
        openssl_free_key($privKeyId);
        return base64_encode($signature);
    }
    /**
     * 使用对方的公钥验签，并且判断签名是否匹配
     * @param $sign
     * @param $data
     * @param bool
     * @return bool
     */
    public function checkSignature($sign, $data, $is_withdraw = false)
    {
        $toSign = $this->getSignString($data);

        if($is_withdraw){
            $public_key = $this->withdraw_public_key;
        } else {
            $public_key = $this->public_key;
        }
        $publicKeyId = openssl_pkey_get_public($public_key);
        $result = openssl_verify($toSign, base64_decode($sign), $publicKeyId, OPENSSL_ALGO_MD5);
        openssl_free_key($publicKeyId);
        return $result === 1 ? true : false;
    }

    private function getSignString($data)
    {
        unset($data['sign']);
        ksort($data);
        reset($data);
        $pairs = array();
        foreach ($data as $k => $v) {
            if (is_array($v)) $v = $this->arrayToString($v);
            $pairs[] = "$k=$v";
        }
        return implode('&', $pairs);
    }

    private function arrayToString($data)
    {
        $str = '';
        foreach ($data as $list) {
            if (is_array($list)) {
                $str .= $this->arrayToString($list);
            } else {
                $str .= $list;
            }
        }
        return $str;
    }

    //创建订单，获取地址并绑定
    public function createOrder($user_id): array
    {
        Log::log("createOrder user_id:{$user_id} " , Log::INFO, 'HPayService-http_post');
        $user_id = intval($user_id);
        //查是否已经有绑定的地址
        $hpay_model = hpay_address_model::getInstance();
        $res = $hpay_model->getUserAddress($user_id);
        if ($res) {
            return ['code' => 1, 'msg' => '成功', 'data' => ['address' => $res['address']]];
        }

        //从redis库中获取未分配的地址
        $res = $this->bindAddressFromRedis($user_id);
        if ($res !== false) {
            return $res;
        }

        //从接口获取地址
        $res = $this->getAddressBatch();
        if ($res['code'] != 1) {
            return ['code' => -2, 'msg' => $res['msg']];
        }
        if (empty($res['addresses'])) {
            return ['code' => -2, 'msg' => '获取地址失败'];
        }
        //批量插入到数据库
        $hpay_model->addMultiAddress($res['addresses']);

        //同时插入到redis队列中
        $RedisService = RedisService::getInstance();
        $RedisService->pushData($res['addresses'], $RedisService->HPayAddressListKey.$this->app_id, '', true);

        //重新从库中获取未分配的地址
        $res = $this->bindAddressFromRedis($user_id);
        if ($res !== false) {
            return $res;
        }
        return ['code' => -2, 'msg' => "获取地址失败"];
    }

    /**
     * 从队列中获取未分配的地址
     */
    private function bindAddressFromRedis($user_id)
    {
        $RedisService = RedisService::getInstance();
        //从redis队列中取地址
        $address = $RedisService->popData($RedisService->HPayAddressListKey.$this->app_id);
        //Log::log("bindAddressFromRedis " . json_encode($address), Log::INFO, 'HPayService-http_post');
        if ($address) {
            $hpay_model = hpay_address_model::getInstance();
            $one = $hpay_model->getOneByAddress($address);
            if (empty($one)) {//数据库中没有,则加入到数据库
                $one = ['address' => $address, 'status' => 0, 'user_id' => 0];
                $one['id'] = $hpay_model->add($one);
            }
            if ($one['status'] > 0) {//该地址正在被绑定
                return $this->bindAddressFromRedis($user_id);//重新从redis中取,直到空
            }

            $dbh = $hpay_model->begin();
            //正在绑定
            $hpay_model->edit(array("status" => 1), ['id' => $one['id']]);
            //通过接口绑定
            $res = $this->bindUserAddress($user_id, $one['address']);
            if ($res['code'] != 1) {
                //修改为未绑定
                $dbh->rollBack();
                //放回到redis中
                $RedisService->pushData($address, $RedisService->HPayAddressListKey.$this->app_id);
                return ['code' => -2, 'msg' => $res['msg']];
            }
            //修改为绑定成功
            $hpay_model->edit(array("status" => 2, 'user_id' => $user_id), ['id' => $one['id']]);
            $dbh->commit();
            return ['code' => 1, 'msg' => '成功', 'data' => ['address' => $one['address']]];

            //放回到redis中
            //$RedisService->pushData($address, $RedisService->HPayAddressListKey);
            //return ['code' => -2, 'msg' => '绑定地址失败'];
        }
        return false;
    }

    /**
     * 获取批量地址，如HBC充值地址已全部绑定用户，则需要调用该方法拉取新地址
     * @return array
     */
    private function getAddressBatch(){

        $data = $this->public_param;
        $data['coin'] = 'trx';
        $sign = $this->encryption($data);
        $data['sign'] = $sign;
        $result = $this->http_post("{$this->base_url}/address/getBatch", $data);
        if($result['status'] == '200') {
            if (!$this->checkSignature($result['sign'], $result)) {
                return [
                    'code' => -2,
                    'msg' => '钱包地址获取失败'
                ];
            }
        }else{
            return [
                'code' => -2,
                'msg' => '钱包地址获取失败'
            ];
        }

        return [
            'code' => 1,
            'addresses' => $result['data'],
        ];
    }

    /**
     * 用户与HBC地址绑定，每个用户独立绑定一个HBC充值地址
     * @param $uid
     * @param $address
     * @return array|int[]|mixed
     */
    private function bindUserAddress($uid, $address){
        $data = $this->public_param;
        $data['coin'] = 'trx';
        $data['address'] = $address;
        $data['user_id'] = $uid;
        $sign = $this->encryption($data );
        $data['sign'] = $sign;
        $result = $this->http_post("{$this->base_url}/address/syncStatus", $data);
        if($result['status'] == '200'){
            if(!$this->checkSignature($result['sign'], $result )){
                return [
                    'code' => -2,
                    'msg' => '绑定钱包地址验签失败'
                ];
            }
        }else{
            return [
                'code' => -2,
                'msg' => '绑定钱包地址失败'
            ];
        }
        return [
            'code' => 1
        ];
    }

    /**
     * 发起提币
     * @return array
     */
    public function withdrawal( $userId, $orderNo, $amount,  $address): array{
        return ['code' => -2, 'msg' => 'DPAY不能提现' ];
        $data = $this->public_param;
        $data['user_id'] = $userId;//系统用户ID
        $data['coin'] = 'usdt_trc20';
        $data['amount'] = $amount;//提币金额
        $data['address'] = $address;//提币地址
        $data['trade_id'] = $orderNo;//系统提币订单号
        $sign = $this->encryption($data);
        $data['sign'] = $sign;
        $result = $this->http_post("{$this->base_url}/transfer", $data);
        if($result['status'] == '200'){
            if(!$this->checkSignature($result['sign'], $result )){
                return [
                    'code' => -2,
                    'msg' => '提现申请失败'
                ];
            }

            return ['code'=>1,'msg'=>'提交成功'];

        }else{
            return ['code'=>-2,'msg'=>$result['msg']];
        }
    }

    /**
     * @param $status int 200表示成功
     * @param null $msg
     * @return array
     */
    public function notify_result($status,$msg=null){
        if($status==200){
            $data = ['success_data'=>'success'];
        } else if($msg){
            $data = ['error_data'=>$msg];
        }
        $sign = $this->encryption($data);
        return [
            'status'=>$status,
            'sign'=>$sign,
            'data'=>$data
        ];
    }

    public function withdrawal_notify_result($status,$order_id){
        $data = array(
            'timestamp' => SYS_TIME,
            'status_code' => $status,
            'order_id' => $order_id,
        );
        $sign = $this->encryption($data, true);
        return [
            'status'=>$status,
            'sign'=>$sign,
            'data'=>$data
        ];
    }

    /**
     * 风控回调，主要处理提币的风控验证
     * @return array
     */
    public function withdrawal_order_check($sign, $notifyData){

        if(empty($sign) || empty($notifyData)){
            return  $this->withdrawal_notify_result(5007, $notifyData['order_id']);
        }
        if(!$this->checkSignature($sign, $notifyData, true)){
            return  $this->withdrawal_notify_result(5400, $notifyData['order_id']);
        }
        $user_withdraw_model = user_withdraw_model::getInstance();
        $orderInfo = $user_withdraw_model->where(['order_no' => $notifyData['order_id']])->getOne();
        if(!$orderInfo){
            return  $this->withdrawal_notify_result(5402, $notifyData['order_id']);
        }
        if(!empty($orderInfo['info'])){
            $orderInfo['info'] = json_decode($orderInfo['info'], true);
        }
        if($orderInfo['user_id'] != $notifyData['user_id']){
            return  $this->withdrawal_notify_result(5003, $notifyData['order_id']);
        }elseif(strtoupper($notifyData['coin_symbol']) != 'USDT_TRC20'){
            return  $this->withdrawal_notify_result(5005, $notifyData['order_id']);
        }elseif($orderInfo['info']['address'] != $notifyData['address']){
            return  $this->withdrawal_notify_result(5004, $notifyData['order_id']);
        }elseif(intval($orderInfo['amount'] * 10000) != intval($notifyData['amount'] * 10000) ){
            return  $this->withdrawal_notify_result(5002, $notifyData['order_id']);
        }else{
            //风控正常通过
            return  $this->withdrawal_notify_result(200, $notifyData['order_id']);
        }
    }

    public function http_post($url, $data) {
        $data_string = json_encode($data);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'X-AjaxPro-Method:ShowList',
                'Content-Type: application/json; charset=utf-8',
                'Content-Length: ' . strlen($data_string))
        );
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $data = curl_exec($ch);
        curl_close($ch);
        Log::log( "url:{$url} " . $data , Log::INFO, 'HPayService-http_post');
        $data = json_decode($data, true);
        return $data;
    }

}