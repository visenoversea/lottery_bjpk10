<?php

namespace service;

/**
 * 火币REST API库
 * https://huobiapi.github.io/docs/spot/v1/cn/#185368440e
 */
class HuoBiService
{
    private static $instance;
    private $url = 'https://api.huobi.pro';
    private $periodArr = ['1min', '5min', '15min', '30min', '60min', '4hour', '1day','1week', '1mon', '1year'];
    /**
     * 不能被克隆
     */
    final protected function __clone()
    {
    }

//	function __construct() {
//		date_default_timezone_set("Etc/GMT+0");
//	}

    public static function getInstance(): ?HuoBiService
    {
        return static::$instance ?? static::$instance = new static();
    }

    /**
     * 行情类API
     */
    /**
     *K 线数据
     * @param string $symbol btcusdt, ethbtc等
     * @param string $period 0-1min, 1-5min, 2-15min, 3-30min, 4-60min, 5-4hour, 6-1day,7-1week, 8-1mon
     * @param int $size [1-2000]
     * @return mixed
     */
    public function get_history_kline($symbol = '', $period = 0, $size = 200)
    {
        if (!isset($this->periodArr[$period])) {
            return ['status' => 'error', 'err-msg' => 'period Err'];
        }
        $path = "/market/history/kline";
        $param = [
            'symbol' => $symbol,
            'period' => $this->periodArr[$period]
        ];
        if ($size) $param['size'] = $size;
        $apiUrl = $this->url . $path . '?' . http_build_query($param);
        $res = $this->curl($apiUrl);
        if ($res['code'] == 0) {
            return ['code' => 1, 'msg' => '成功', 'data' => $res['data']];
        }
        return ['code' => -2, 'msg' => '失败'];
    }

    // 获取聚合行情(Ticker)
	public function get_detail_merged($symbol = '')
    {
        $path = "/market/detail/merged";
        $param = [
            'symbol' => $symbol,
        ];
        $apiUrl = $this->url . $path . '?' . http_build_query($param);
        return $this->curl($apiUrl);
    }

    // 获取 Market Depth 数据
	public function get_market_depth($symbol = '', $type = '')
    {
        $path = "/market/depth";
        $param = [
            'symbol' => $symbol,
            'type' => $type
        ];
        $apiUrl = $this->url . $path . '?' . http_build_query($param);
        return $this->curl($apiUrl);
    }

    // 获取 Trade Detail 数据
	public function get_market_trade($symbol = '')
    {
        $path = "/market/trade";
        $param = [
            'symbol' => $symbol
        ];
        $apiUrl = $this->url . $path . '?' . http_build_query($param);
        return $this->curl($apiUrl);
    }

    // 批量获取最近的交易记录
	public function get_history_trade($symbol = '', $size = '')
    {
        $path = "/market/history/trade";
        $param = [
            'symbol' => $symbol
        ];
        if ($size) $param['size'] = $size;
        $apiUrl = $this->url . $path . '?' . http_build_query($param);
        return $this->curl($apiUrl);
    }

    // 获取 Market Detail 24小时成交量数据
	public function get_market_detail($symbol = '')
    {
        $path = "/market/detail";
        $param = [
            'symbol' => $symbol
        ];
        $apiUrl = $this->url . $path . '?' . http_build_query($param);
        return $this->curl($apiUrl);
    }
    /**
     * 公共类API
     */
    // 查询系统支持的所有交易对及精度
	public function get_common_symbols()
    {
        $path = '/v1/common/symbols';
        $apiUrl = $this->url . $path;
        return $this->curl($apiUrl);
    }

    // 查询系统支持的所有币种
	public function get_common_currencys()
    {
        $path = "/v1/common/currencys";
        $apiUrl = $this->url . $path;
        return $this->curl($apiUrl);
    }

    // 查询系统当前时间
	public function get_common_timestamp()
    {
        $path = "/v1/common/timestamp";
        $apiUrl = $this->url . $path;
        return $this->curl($apiUrl);
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
