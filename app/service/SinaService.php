<?php

namespace service;

use asura\Common;

/**
 * 新浪接口
 */
class SinaService
{
    private static $instance;
    private $url = 'http://hq.sinajs.cn';
    private $periodArr = ['1', '2', '15', '30', '60', '240', 'd', '', '', ''];

    /**
     * 不能被克隆
     */
    final protected function __clone()
    {
    }

//	function __construct() {
//		date_default_timezone_set("Etc/GMT+0");
//	}

    public static function getInstance(): ?SinaService
    {
        return static::$instance ?? static::$instance = new static();
    }

    //解析jsonp数据
    public function extractJson($jsonp) {
        $start = strpos($jsonp, '[');
        $end = strrpos($jsonp, ']');
        $json = substr($jsonp, $start, $end - $start + 1);
        return json_decode($json, true);
    }

    function extractJsonStr($jsonp)
    {
        $start = strpos($jsonp, '"') + 1;
        $end = strrpos($jsonp, '"') - 1;
        $data = substr($jsonp, $start, $end - $start + 1);
        $data = explode('|', $data);
        $list = [];
        if($data){
            foreach ($data as $k => $v) {
                if($k>1000){
                    break;
                }
                $fields = explode(',', $v);
                $list[] = [
                    'd' => $fields[0],
                    'o' => $fields[1],
                    'l' => $fields[2],
                    'h' => $fields[3],
                    'c' => $fields[4]
                ];
            }
        }
        return $list;
    }

    /**
     *K 线数据
     * @param string $symbol btcusdt, ethbtc等
     * @param string $period 0-1min, 1-5min, 2-15min, 3-30min, 4-60min, 5-4hour, 6-1day,7-1week, 8-1mon
     * @param int $size [1-2000]
     * @return mixed
     */
    public function getHistoryKlineData($symbol = '', $period = 0, $size = 1440)
    {
        if (!isset($this->periodArr[$period])) {
            return ['code' => -2, 'msg' => '未知的period'];
        }
        $symbolArr = explode('_', $symbol);
        if ($symbolArr[0] == 'fx') {
            $apiUrl = 'http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/fx/';
            //外汇数据
            if ($this->periodArr[$period] == 'd') {
                //天数据
                $apiUrl .= "NewForexService.getDayKLine?symbol={$symbol}";
                $jsonp = file_get_contents($apiUrl);
                $json = $this->extractJsonStr($jsonp);
            } else {
                //分钟数据
                $apiUrl .= "NewForexService.getMinKline?symbol={$symbol}&scale={$this->periodArr[$period]}&datalen={$size}";
                $jsonp = file_get_contents($apiUrl);
                $json = $this->extractJson($jsonp);
            }
        } else if ($symbolArr[0] == 'hf') {
            if ($this->periodArr[$period] == 'd') {
                return ['code' => -2, 'msg' => '未知的period'];
            }
            $apiUrl = "https://gu.sina.cn/ft/api/jsonp.php/hf/GlobalService.getMink?symbol={$symbolArr[1]}&type={$this->periodArr[$period]}";
            $jsonp = file_get_contents($apiUrl);
            $json = $this->extractJson($jsonp);
        } else if ($symbolArr[0] == 'nf') {
            if ($this->periodArr[$period] == 'd') {
                return ['code' => -2, 'msg' => '未知的period'];
            }
            $apiUrl = "https://stock2.finance.sina.com.cn/futures/api/jsonp.php/nf/InnerFuturesNewService.getFewMinLine?symbol={$symbolArr[1]}&type={$this->periodArr[$period]}";
            $jsonp = file_get_contents($apiUrl);
            $json = $this->extractJson($jsonp);
        } else {
            return ['code' => -2, 'msg' => '未知的类型', 'symbolArr' => $symbolArr];
        }
        if ($json) {
            $data = [];
            foreach ($json as $v) {
                $data[] = [
                    'kt' => strtotime($v['d']),
                    'open' => $v['o'],
                    'close' => $v['c'],
                    'low' => $v['l'],
                    'high' => $v['h'],
                    'vol' => $v['v'] ?: mt_rand(100, 1000),
                ];
            }
            return ['code' => 1, 'msg' => '成功', 'data' => $data];
        } else {
            return ['code' => -2, 'msg' => '数据获取失败'];
        }
    }

    /**
     *K 线数据
     * @param array $list
     * @return array
     */
    public function getKlineData(array $list = []): array
    {
        $apiUrl = $this->url . '/format=text&rn=' . floor(SYS_MICRO_TIME * 1000) . '&list=' . implode(',', $list);
        $sinaData = $this->curlRequest($apiUrl, [], [], [CURLOPT_REFERER => 'http://finance.sina.com.cn']);
        //编码转换
        $sinaData = explode("\n", iconv("GB18030", "utf-8", $sinaData));
        $sinaList = [];
        foreach ($sinaData as $v) {
            if ($v != '') {
                $res = explode('=', $v);
                if (!in_array($res[0], $list) || $res[1] == '') {
                    continue;
                }
                $symbol = explode('_', $res[0]);
                $data = explode(',', $res[1]);
                if ($symbol[0] == 'rt') {
                    //股票数据  rt_前缀    $data[1]-名称  $data[2]-今开盘 $data[3]-昨收  $data[4]-最高 $data[5]-最低 $data[6]-最新价 $data[7]-涨跌幅 $data[8]-涨跌幅比例 $data[17]-日期  $data[18]-时间
                    $sinaList[$res[0]] = [
                        'open' => $data[2],
                        'close' => $data[6],
                        'low' => $data[5],
                        'high' => $data[4],
                    ];
                } else if ($symbol[0] == 'nf') {
                    //期货数据 nf_前缀    $data[0]-名称  $data[2]-开盘价 $data[3]-最高  $data[4]-最低   $data[6]-买价 [7]-卖价 $data[8]-最新价  $data[9]-结算价 $data[10]-昨结算 $data[13]-持仓量 $data[14]-成交量
                    $sinaList[$res[0]] = [
                        'open' => $data[2],
                        'close' => $data[8],
                        'low' => $data[4],
                        'high' => $data[3],
                    ];
                } else if ($symbol[0] == 'fx') {
                    $sinaList[$res[0]] = [
                        'open' => $data[5],
                        'close' => $data[1],
                        'low' => $data[7],
                        'high' => $data[6],
                    ];
                } else if ($symbol[0] == 'hf') {
                    $sinaList[$res[0]] = [
                        'open' => $data[8],
                        'close' => $data[0],
                        'low' => $data[5],
                        'high' => $data[4],
                    ];
                }
            }
        }
        return $sinaList;
    }

    /**
     * curl请求
     * @param $url       请求地址
     * @param $data       请求数据数组 默认为空，有数据时为post传值
     * @param $header     设置头部 ['Content-Type: application/json']
     * @param $config     修改opt配置文件
     * @return bool|string
     */
    public function curlRequest($url, $data, $header = [], $config = [])
    {
        $ch = curl_init();
        $opt = [
            CURLOPT_URL => $url,
            CURLOPT_SSL_VERIFYPEER => false, //禁止cURL验证对等证书
            CURLOPT_SSL_VERIFYHOST => false, //检查证书公用名
            CURLOPT_RETURNTRANSFER => true,  //文件流的形式返回，而不是直接输出
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_TIMEOUT => 60,
        ];
        if ($data) {
            $opt[CURLOPT_POST] = true;
            if (is_array($data)) {
                $data = http_build_query($data);
            }
            $opt[CURLOPT_POSTFIELDS] = $data;
        }
        if ($header) {
            $opt[CURLOPT_HTTPHEADER] = $header;
        }
        if ($config) {
            foreach ($config as $k => $v) {
                $opt[$k] = $v;
            }
        }
        curl_setopt_array($ch, $opt);
        $res = curl_exec($ch);
        curl_close($ch);
        return $res;
    }
}
