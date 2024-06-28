<?php

namespace service;

/**
 * OKX文档
 * https://www.okx.com/docs-v5/zh/
 */
class OKXService
{
    private static $instance;
    //https://aws.okx.com
    private $url = 'https://www.okx.com';
    private $periodArr = ['1m', '5m', '15m', '30m', '1H', '4H', '1D','1W', '1M'];
    /**
     * 不能被克隆
     */
    final protected function __clone()
    {
    }

//	function __construct() {
//		date_default_timezone_set("Etc/GMT+0");
//	}

    public static function getInstance(): ?OKXService
    {
        return static::$instance ?? static::$instance = new static();
    }

    /**
     * 行情类API
     */
    /**
     *K 线数据
     * @param string $symbol btcusdt, ethbtc等\
     *
     * @param string $period '1m', '5m', '15m', '30m', '1H', '4H', '1D','1W', '1M'
     * @param int $size [1-2000]
     * @return mixed
     */
    public function get_history_kline($symbol = '', $period = 0, $size = 100)
    {
        if (!isset($this->periodArr[$period])) {
            return ['status' => 'error', 'err-msg' => 'period Err'];
        }
        $path = "/api/v5/market/candles";
        //?instId=BTC-USDT&bar=1D&limit=1
        $param = [
            'instId' => $symbol,
            'bar' => $this->periodArr[$period],
            'limit' => intval($size)
        ];
        $apiUrl = $this->url . $path . '?' . http_build_query($param);
        $res = $this->curl($apiUrl);
        if ($res['code'] == 0) {
            $data=[];
            //{"open":64.68,"close":64.33,"low":62.57,"high":65.02,"vol":794211.16}
            foreach ($res['data'] as $v){
                $data[]=[
                    'open'=>$v[1],
                    'high'=>$v[2],
                    'low'=>$v[3],
                    'close'=>$v[4],
                    'vol'=>$v[5],
                    'kt' => floor($v[0] / 1000),
                ];
            }
            return ['code' => 1, 'msg' => '成功','data'=>$data];
        }
        return ['code' => -2, 'msg' => '失败'];
    }

    /**
     * curl请求
     * @param string $url 请求地址
     * @param array $data 请求数据数组 默认为空，有数据时为post传值
     * @return bool|string
     */
    public function curl(string $url, array $data = [])
    {
        $ch = curl_init();
        $opt = [
            CURLOPT_URL => $url,
            CURLOPT_HEADER => false,
            CURLOPT_SSL_VERIFYPEER => false, //禁止cURL验证对等证书
            CURLOPT_SSL_VERIFYHOST => false, //检查证书公用名
            CURLOPT_RETURNTRANSFER => true,  //文件流的形式返回，而不是直接输出
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_HTTPHEADER => [
                "Content-Type: application/json",
            ]
        ];
        if ($data) {
            $opt[CURLOPT_POST] = true;
            $opt[CURLOPT_POSTFIELDS] = json_encode($data);
        }
        curl_setopt_array($ch, $opt);
        $res = curl_exec($ch);
        curl_close($ch);
        return json_decode($res, true);
    }
}
