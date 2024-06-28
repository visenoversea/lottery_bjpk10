<?php
/**
 * 公共方法
 */

namespace asura;

use Exception;
use Mobile_Detect;
use asura\other\QRcode;

class Common
{
    private static $ip = ''; //ip地址

    /**
     * 获取ip
     */
    public static function getIp()
    {
        if (self::$ip)
            return self::$ip;
        if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) {
            $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
        } elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            //客户端的ip
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            //浏览当前页面的用户计算机的网关
            $ip = preg_match('/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/', $_SERVER['HTTP_X_FORWARDED_FOR'], $matches) ? $matches [0] : '0.0.0.0';
        } elseif (!empty($_SERVER['HTTP_X_REAL_IP'])) {
            //nginx 代理模式下，获取客户端真实IP
            $ip = $_SERVER['HTTP_X_REAL_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED'];
        } elseif (!empty($_SERVER['HTTP_FORWARDED_FOR'])) {
            $ip = preg_match('/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/', $_SERVER['HTTP_FORWARDED_FOR'], $matches) ? $matches [0] : '0.0.0.0';
        } elseif (isset($_SERVER['HTTP_FORWARDED'])) {
            $ip = $_SERVER['HTTP_FORWARDED'];
        } else {
            //浏览当前页面的用户计算机的ip地址
            $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        }
        //IP地址合法验证
        //$long = sprintf("%u", ip2long($ip)); //long2ip反转
//        $long = ip2long($ip);
//        self::$ip = $ip ? [$ip, $long] : ['0.0.0.0', 0];
        return self::$ip = $ip;
    }

    /**
     * 获取ip地址信息
     * {"status":"success","continent":"亚洲","country":"香港","countryCode":"HK","regionName":"中西區","city":"中環","district":"","isp":"China Mobile Hong Kong Company Limited"}
     * 1分钟只能获取45个ip信息
     * @param string $ip
     * @return mixed
     */
    public static function getIpApi(string $ip)
    {
        return json_decode(file_get_contents("http://ip-api.com/json/{$ip}?fields=1622555&lang=zh-CN"),true);
//        return json_decode(file_get_contents("https://ipapi.co/{$ip}/json/"));
    }

    //获取ip字符串地址信息
    public static function getIpAddress(string $ip): string
    {
        $ipInfo = self::getIpInfo($ip);
        if ($ipInfo) {
            $ip_address = '';
            if ($ipInfo['country'] != 'XX' && $ipInfo['country'] != '') {
                $ip_address .= $ipInfo['country'] . '-';
            }
            if ($ipInfo['area'] != 'XX' && $ipInfo['area'] != '') {
                $ip_address .= $ipInfo['area'] . '-';
            }
            if ($ipInfo['region'] != 'XX' && $ipInfo['region'] != '') {
                $ip_address .= $ipInfo['region'] . '-';
            }
            if ($ipInfo['city'] != 'XX' && $ipInfo['city'] != '') {
                $ip_address .= $ipInfo['city'] . '-';
            }
            if ($ipInfo['county'] != 'XX' && $ipInfo['county'] != '') {
                $ip_address .= $ipInfo['county'] . '-';
            }
            if ($ipInfo['isp'] != 'XX' && $ipInfo['isp'] != '') {
                $ip_address .= $ipInfo['isp'] . '-';
            }
            return rtrim($ip_address, '-');
        }
        return '';
    }

    /**
     * 伪造ip
     * @return string
     */
    public static function createIp(): string
    {
        $ip_arr = [
            '36.57.79', '106.116.82', '182.99.208', '115.230.18', '42.59.110',
            '27.191.26', '36.102.175', '119.109.82', '223.242.222', '114.99.23',
            '171.41.130', '122.143.83', '111.77.99', '183.166.164', '222.77.215',
            '182.134.233', '36.62.216', '27.44.215', '1.70.76', '112.84.210',
            '114.103.21', '116.22.51', '121.226.2', '122.143.87', '175.12.203',
            '123.54.47', '122.192.226', '60.169.59', '110.86.180', '183.48.254',
            '114.101.180', '115.153.110', '139.213.139', '110.255.243', '114.104.129',
            '119.132.45', '42.54.88', '119.109.80', '119.54.20', '1.70.103',
            '120.39.238', '120.38.66', '27.191.67', '113.223.214', '121.207.93',
            '223.241.50', '125.106.81', '115.152.211', '115.210.30', '114.99.11'
        ];
        $key = rand(0, 49);
        return $ip_arr[$key].'.'.rand(1, 255);
    }

    /**
     * 获取ip相关地理位置信息
     * @param string $ip ip地址
     * @return boolean   返回数组,空数组表示地址有错或查询不到  ['country'=>中国,'country_id'=>'CN','area'=>'华东','area_id'=>'300000','region'=>'福建省','region_id': '350000','city': '厦门市','city_id': '350200','county': '','county_id': '-1','isp': '电信','isp_id': '100017','ip': '120.42.1.226']
     */
    public static function getIpInfo(string $ip)
    {
        $clientIp = self::createIp();
        $res = json_decode(self::curlRequest("https://ip.taobao.com/outGetIpInfo?ip={$ip}&accessKey=alibaba-inc", [], [], [
            CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; MSIE 6.0; Windows NT 5.0)',
            CURLOPT_HTTPHEADER => ['X-FORWARDED-FOR:' . $clientIp, 'CLIENT-IP:' . $clientIp],
            CURLOPT_TIMEOUT => 5
        ]), true);
        if (isset($res['code']) && $res['code'] == 0) {
            return $res['data'] ?? [];
        }
        return [];
    }

    /**
     * curl请求
     * @param string $url       请求地址
     * @param $data             请求数据数组 默认为空，有数据时为post传值
     * @param array $header     设置头部 ['Content-Type: application/json']
     * @param array $config     修改opt配置文件
     * @return bool|string
     */
    public static function curlRequest(string $url, $data=[], array $header = [], array $config = [])
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

    /**
     * 解析UserAgent
     * @param null $userAgent
     * @return array
     */
    public static function parseUserAgent($userAgent = null): array
    {
        $userAgent = $userAgent ?? $_SERVER['HTTP_USER_AGENT'];
        //浏览器
        $data = [];
        $Mobile_Detect = new Mobile_Detect();
        if ($Mobile_Detect->isMobile($userAgent)) {
            //手机
            $data['type'] = 'mobile';
            //手机端检测浏览器
            $browsers = $Mobile_Detect->getBrowsers();
            foreach ($browsers as $k => $v) {
                if ($Mobile_Detect->match($v)) {
                    $data['browsers'] = $k;
                    $data['browsers_version'] = $Mobile_Detect->version($k) ?? '';
                    break;
                }
            }
            if ($Mobile_Detect->is('AndroidOS')) {
                //安卓
                $data['system'] = 'Android';
            } else if ($Mobile_Detect->is('iOS')) {
                //苹果
                if ($Mobile_Detect->is('iPad')) {
                    $data['system'] = 'iPad';
                } else {
                    $data['system'] = 'iPhone';
                }
            } else {
                $data['system'] = 'other';
            }
            $data['system_version'] = str_replace('_', '.', $Mobile_Detect->version($data['system'])) ?? '';
        } else {
            $data['type'] = 'pc';
            if (!empty($userAgent)) {
                //系统
                if (preg_match('/win/i', $userAgent)) {
                    $data['system'] = 'Windows';
                } else if (preg_match('/mac/i', $userAgent)) {
                    $data['system'] = 'MAC';
                } else if (preg_match('/linux/i', $userAgent)) {
                    $data['system'] = 'Linux';
                } else if (preg_match('/unix/i', $userAgent)) {
                    $data['system'] = 'Unix';
                } else if (preg_match('/bsd/i', $userAgent)) {
                    $data['system'] = 'BSD';
                } else {
                    $data['system'] = 'Other';
                }
                preg_match('#' . $data['system'] . '[^0-9]*([\w._\+]+)#is', $userAgent, $match);
                if (!empty($match[1])) {
                    $data['system_version'] = $match[1];
                } else {
                    $data['system_version'] = '';
                }
                //浏览器
                if (preg_match('/MSIE/i', $userAgent)) {
                    $data['browsers'] = 'MSIE';
                } else if (preg_match('/Firefox/i', $userAgent)) {
                    $data['browsers'] = 'Firefox';
                } else if (preg_match('/Chrome/i', $userAgent)) {
                    $data['browsers'] = 'Chrome';
                } else if (preg_match('/Safari/i', $userAgent)) {
                    $data['browsers'] = 'Safari';
                } else if (preg_match('/Opera/i', $userAgent)) {
                    $data['browsers'] = 'Opera';
                } else {
                    $data['browsers'] = 'Other';
                }
                preg_match('#' . $data['browsers'] . '[^0-9]*([\w._\+]+)#is', $userAgent, $match);
                if (!empty($match[1])) {
                    $data['browsers_version'] = $match[1];
                } else {
                    $data['browsers_version'] = '';
                }
            } else {
                $data['system'] = 'unknow';
                $data['system_version'] = '';
                $data['browsers'] = 'unknow';
                $data['browsers_version'] = '';
            }
        }
        return $data;
    }

    /**
     * 字符串替换
     * @param string $str
     * @param array $replaceData
     * @return array|string|string[]
     */
    public static function stringReplace(string $str, array $replaceData = [])
    {
        if ($replaceData) {
            $search = [];
            $replace = [];
            foreach ($replaceData as $k => $v) {
                $search[] = $k;
                $replace[] = $v;
            }
            $str = str_replace($search, $replace, $str);
        }
        return $str;
    }

    /**
     * 异步线程
     * @param string $request_url       请求url链接 /index.php?m=index&c=xxx&a=xxx
     * @param string $host              主机
     * @param int $port                 端口
     * @param int $timeout              超时时间
     * @param int $micro_seconds        保证nginx正常执行
     * @throws Exception
     */
    public static function asyncThread(string $request_url = '/', string $host = '', int $port = 80, int $timeout = 5, int $micro_seconds = 50000)
    {
        if ($host === '')
            $host = $_SERVER['HTTP_HOST'];
        $fp = fsockopen($host, $port, $errno, $errstr, $timeout);
        if (!$fp) {
            throw new Exception($errstr, $errno);
        }
        fwrite($fp, "GET {$request_url} HTTP/1.1\r\nHost: {$host}\r\nConnection: Close\r\n\r\n");
        usleep($micro_seconds);//保证nginx正常执行
        fclose($fp);
    }

    /**
     * 创建二维码图片
     * @param string $text 二维码内容
     * @param string $logo logo默认空不添加
     * @param string $level 纠错级别：L、M、Q、H
     * @param string $file 保存在本地的图片路径，默认不保存图片（false）
     * @param int $size 图片像素大小
     * @param int $margin 外边框
     */
    public static function createQRcode(string $text, string $logo='', string $level = 'H', int $size = 8, $file = false, int $margin = 1)
    {
        if ($logo && is_file($logo)) {
            ob_start();
            QRcode::png($text, $file, $level, $size, $margin);
            $qr = ob_get_contents();
            ob_clean();
            $qrcode = imagecreatefromstring($qr);
            $logo = imagecreatefromstring(file_get_contents($logo));
            $qr_w = imagesx($qrcode);//二维码宽度
//            $qr_h = imagesy($qrcode);//二维码高度
            $logo_w = imagesx($logo);//logo宽度
            $logo_h = imagesy($logo);//logo高度
            $logo_qr_w = $qr_w / 4;//logo缩放宽度
            $scale = $logo_w / $logo_qr_w;
            $logo_qr_h = $logo_h / $scale;//logo缩放高度
            $x_y = ($qr_w - $logo_qr_w) / 2;
            imagecopyresampled($qrcode, $logo, $x_y, $x_y, 0, 0, $logo_qr_w, $logo_qr_h, $logo_w, $logo_h);
            header('Content-Type: image/png');
            if ($file === false) {
                imagepng($qrcode);
            } else {
                imagepng($qrcode, $file);
            }
        } else {
            QRcode::png($text, $file, $level, $size, $margin);
        }
    }

    /**
     * 保存文件
     * @param $data
     * @param string $fileName 要保存的文件名
     * @param string $filePath 要保存的文件地址
     * @param boolean $backup 是否对原有文件备份
     * @return array
     */
    public static function saveFile($data, string $fileName, string $filePath = '', $backup=false): array
    {
        if ($filePath == '') {
            $filePath = INDEX_PATH . '/upload/' . date('Ym/d/His', SYS_TIME);
        }
        $saveFile = rtrim($filePath, '/') . DS . $fileName;
        if (!is_file($saveFile)) {
            $path = dirname($saveFile);
            if (!is_dir($path) && !mkdir($path, 0755, true)) {
                return ['code' => -2, 'msg' => '上传失败，没有目录权限'];
            }
        } else if($backup){//备份
            $bakup_path = dirname($saveFile). DS . '/bak' ;
            if (!is_dir($bakup_path) && !mkdir($bakup_path, 0755, true)) {
                return ['code' => -2, 'msg' => '上传失败，没有目录权限'];
            } else{
                copy($saveFile, $bakup_path. DS . $fileName .date('d-H-i-s', SYS_TIME));//备份文件
            }
        }
        if (file_put_contents($saveFile, $data)) {
            return ['code' => 1, 'msg' => '成功', 'filePath' => $filePath];
        } else {
            return ['code' => -2, 'msg' => '系统异常'];
        }
    }

    /**
     * 获取上传的图片base64数据
     * @param $file
     * @param int $size
     * @return array|转为base64的图片
     */
    public static function getBase64Img($file, int $size = 20971520)
    {
        if ($file['error'] > 0) {
            return ['code' => -2, "msg" => "错误:{$file["error"]}"];
        }
        if ($file['size'] > $size) {
            $m = round($size / 1024 / 1024, 2);
            return ['code' => -2, "msg" =>"文件不能大于{$m}M"];
        }
        return self::Base64EncodeImage($file["tmp_name"]);
    }

    /**
     * 图片转base64
     * @param ImageFile String 图片路径
     * @return 转为base64的图片
     */
    public static function Base64EncodeImage($ImageFile)
    {
        if (is_file($ImageFile)) {
            $imgInfo = getimagesize($ImageFile);
            if ($imgInfo) {
                return ['code' => 1, 'msg' => '成功!', 'img' => 'data:' . $imgInfo['mime'] . ';base64,' . chunk_split(base64_encode(fread(fopen($ImageFile, 'r'), filesize($ImageFile))))];
            } else {
                return ['code' => -2, 'msg' => '图片格式错误!'];
            }
        } else {
            return ['code' => -2, 'msg' => '文件不存在!'];
        }
    }

    /**
     * base64编码图片转图片
     * @param $base64_image_content
     * @param $filePath     文件完整路径
     * @return bool|string  返回图片路径
     */
    public static function base64_image_content($base64_image_content, $filePath = '')
    {
        //匹配出图片的格式
        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)) {
            $type = $result[2];//图片类型
            $fileName = mt_rand(1000, 9999) . '.' . $type;
            return self::saveFile(base64_decode(str_replace($result[1], '', $base64_image_content)), $fileName, $filePath);
        } else {
            return ['code' => -2, 'msg' => '数据异常!'];
        }
    }

    //获取域名信息
    public static function getDomain($host = '', $port = ''): string
    {
        $port = $port ?: $_SERVER['SERVER_PORT'];
        $host = $host ?: $_SERVER['HTTP_HOST'];
        $host = str_replace(":{$port}", '', $host);
        if ($port == 80) {
            $domain = "http://{$host}";
        } else if ($port == 443) {
            $domain = "https://{$host}";
        } else {
            $domain = "http://{$host}:{$port}";
        }
        return $domain;
    }

    /**
     * 搜索数据是否存在某个字符串
     * @param string $str       字符串
     * @param string $search    搜索的内容
     * @return bool  true-存在  false-不存在
     */
    public static function isStr(string $str, string$search): bool
    {
        if (strpos($str, $search) !== false) {
            return true;
        }
        return false;
    }

    //过滤特殊字符串
    public static function filterSpecialChars($str)
    {
        // 匹配空格符、控制字符、标点符号（除 @ 符号外）、特殊符号等
        $pattern = '/[\x00-\x1F\x7F\x20\xA0\x{200B}-\x{200D}\x{2028}-\x{202F}\x{205F}\x{2060}\x{FEFF}\p{P}[^\p{C}@]]+/u';
        // 将匹配到的字符替换为空字符串
        return preg_replace($pattern, '', $str);
    }

	 /**
     * 查看非常大和非常小的数字（例如来自数据库 DECIMAL），而不显示科学记数法或前导零。
     * @param $val
     * @return string
     */
    public static function floatToStr($val): string
    {
        preg_match( "#^([\+\-]|)([0-9]*)(\.([0-9]*?)|)(0*)$#", trim($val), $o );
        return $o[1].sprintf('%d',$o[2]).($o[3]!='.'?$o[3]:'');
    }

    //格式化金额成字符串
    public static function formatAmount($amount, $decimals = 0, $thousands_separator = ''): string
    {
        if ($decimals) {
            $amountStr = number_format($amount, $decimals, '.', $thousands_separator);
        } else {
            $amountStr = number_format($amount, 8, '.', $thousands_separator);
            //去除末尾的0
            $amountStr = rtrim($amountStr, '0');
            //去除末尾的小数点
            $amountStr = rtrim($amountStr, '.');
        }
        return $amountStr;
    }

    /**
     * 内容摘要截取
     * @param $html
     * @param int $len
     * @return string
     */
    public static function summary($html, int $len = 80): string
    {
        return mb_substr(preg_replace(array('/\s/', '/ /'), array('', ''), trim(strip_tags(htmlspecialchars_decode($html)))), 0, $len);
    }

    /**
     * 时间数组创建
     * @param $start_time
     * @param $end_time
     * @return array
     */
    public static function timeArr($start_time, $end_time): array
    {
        if (!$start_time) {
            return [];
        }
        $start_time = strtotime(date('Y-m-d', $start_time));
        $data = [];
        while ($start_time <= $end_time) {
            $data[date('Y-m-d', $start_time)] = $start_time;
            $start_time += 86400;
        }
        return $data;
    }

    /**
     * 过滤文件名
     * @param string $fileName
     * @return array|string|string[]
     */
    public static function filterFileName(string $fileName)
    {
        return str_replace(['/', '\\', ':', '*', '"', '<', '>', '|', '?'], '_', $fileName);
    }


    /**
     * 返回状态码
     * @param $num
     */
    public static function httpStatus($num)
    {
        $http = [
            200 => 'HTTP/1.1 OK',
            204 => "HTTP/1.1 204 No Content", //服务器端已经处理完了客户端发送的请求,但没有任何资源返回.
            301 => "HTTP/1.1 301 Moved Permanently", //永久性的重定向
            302 => "HTTP/1.1 302 Found", //暂时性的重定向
            400 => "HTTP/1.1 400 Bad Request", //请求报文中存在错误信息
            401 => "HTTP/1.1 401 Unauthorized", //需要提供认证信息,如果之前已经请求过一次认证,则表示认证失败
            403 => "HTTP/1.1 403 Forbidden", //访问被服务器拒绝
            404 => "HTTP/1.1 404 Not Found", //没有找到相关的资源
            500 => "HTTP/1.1 500 Internal Server Error", //服务器执行请求时候发生了错误
        ];
        header($http[$num]);
        exit(0);
    }

    public static function getFirstCharter($str): string
    {
        if (empty($str)) {
            return '#';
        }
//        if(is_numeric($str[0])) return $str[0];// 如果是数字开头 则返回数字
        if (is_numeric($str[0])) return '#';// 如果是数字开头 则返回数字
        $fchar = ord($str[0]);
        if ($fchar >= ord('A') && $fchar <= ord('z')) return strtoupper($str[0]); //如果是字母则返回字母的大写
        $s1 = iconv('UTF-8', 'gb2312', $str);
        $s2 = iconv('gb2312', 'UTF-8', $s1);
        $s = $s2 == $str ? $s1 : $str;
        $asc = ord($s[0]) * 256 + ord($s[1]) - 65536;
        if ($asc >= -20319 && $asc <= -20284) return 'A';//这些都是汉字
        if ($asc >= -20283 && $asc <= -19776) return 'B';
        if ($asc >= -19775 && $asc <= -19219) return 'C';
        if ($asc >= -19218 && $asc <= -18711) return 'D';
        if ($asc >= -18710 && $asc <= -18527) return 'E';
        if ($asc >= -18526 && $asc <= -18240) return 'F';
        if ($asc >= -18239 && $asc <= -17923) return 'G';
        if ($asc >= -17922 && $asc <= -17418) return 'H';
        if ($asc >= -17417 && $asc <= -16475) return 'J';
        if ($asc >= -16474 && $asc <= -16213) return 'K';
        if ($asc >= -16212 && $asc <= -15641) return 'L';
        if ($asc >= -15640 && $asc <= -15166) return 'M';
        if ($asc >= -15165 && $asc <= -14923) return 'N';
        if ($asc >= -14922 && $asc <= -14915) return 'O';
        if ($asc >= -14914 && $asc <= -14631) return 'P';
        if ($asc >= -14630 && $asc <= -14150) return 'Q';
        if ($asc >= -14149 && $asc <= -14091) return 'R';
        if ($asc >= -14090 && $asc <= -13319) return 'S';
        if ($asc >= -13318 && $asc <= -12839) return 'T';
        if ($asc >= -12838 && $asc <= -12557) return 'W';
        if ($asc >= -12556 && $asc <= -11848) return 'X';
        if ($asc >= -11847 && $asc <= -11056) return 'Y';
        if ($asc >= -11055 && $asc <= -10247) return 'Z';
        return '#';
    }


    /**
     * 图片合并
     */
    public static function imgMerge(array $pic_list,$file='')
    {
        $pic_list = array_slice($pic_list, 0, 9); // 只操作前9个图片
        $bg_w = 150; // 背景图片宽度
        $bg_h = 150; // 背景图片高度
        $background = imagecreatetruecolor($bg_w,$bg_h); // 背景图片
        $color = imagecolorallocate($background, 202, 201, 201); //为真彩色画布创建白色背景，再设置为透明
        imagefill($background, 0, 0, $color);
        imageColorTransparent($background, $color);
        $pic_count = count($pic_list);
        $lineArr = []; // 需要换行的位置
        $space_x = 3;
        $space_y = 3;
        $line_x = 0;
        switch($pic_count) {
            case 1: // 正中间
                $start_x = intval($bg_w/4); // 开始位置X
                $start_y = intval($bg_h/4); // 开始位置Y
                $pic_w = intval($bg_w/2); // 宽度
                $pic_h = intval($bg_h/2); // 高度
                break;
            case 2: // 中间位置并排
                $start_x = 2;
                $start_y = intval($bg_h/4) + 3;
                $pic_w = intval($bg_w/2) - 5;
                $pic_h = intval($bg_h/2) - 5;
                $space_x = 5;
                break;
            case 3:
                $start_x = 40; // 开始位置X
                $start_y = 5; // 开始位置Y
                $pic_w = intval($bg_w/2) - 5; // 宽度
                $pic_h = intval($bg_h/2) - 5; // 高度
                $lineArr = array(2);
                $line_x = 4;
                break;
            case 4:
                $start_x = 4; // 开始位置X
                $start_y = 5; // 开始位置Y
                $pic_w = intval($bg_w/2) - 5; // 宽度
                $pic_h = intval($bg_h/2) - 5; // 高度
                $lineArr = array(3);
                $line_x = 4;
                break;
            case 5:
                $start_x = 30; // 开始位置X
                $start_y = 30; // 开始位置Y
                $pic_w = intval($bg_w/3) - 5; // 宽度
                $pic_h = intval($bg_h/3) - 5; // 高度
                $lineArr = array(3);
                $line_x = 5;
                break;
            case 6:
                $start_x = 5; // 开始位置X
                $start_y = 30; // 开始位置Y
                $pic_w = intval($bg_w/3) - 5; // 宽度
                $pic_h = intval($bg_h/3) - 5; // 高度
                $lineArr = array(4);
                $line_x = 5;
                break;
            case 7:
                $start_x = 53; // 开始位置X
                $start_y = 5; // 开始位置Y
                $pic_w = intval($bg_w/3) - 5; // 宽度
                $pic_h = intval($bg_h/3) - 5; // 高度
                $lineArr = array(2,5);
                $line_x = 5;
                break;
            case 8:
                $start_x = 30; // 开始位置X
                $start_y = 5; // 开始位置Y
                $pic_w = intval($bg_w/3) - 5; // 宽度
                $pic_h = intval($bg_h/3) - 5; // 高度
                $lineArr = array(3,6);
                $line_x = 5;
                break;
            case 9:
                $start_x = 5; // 开始位置X
                $start_y = 5; // 开始位置Y
                $pic_w = intval($bg_w/3) - 5; // 宽度
                $pic_h = intval($bg_h/3) - 5; // 高度
                $lineArr = array(4,7);
                $line_x = 5;
                break;
        }
        foreach( $pic_list as $k=>$pic_path ) {
            $kk = $k + 1;
            if (in_array($kk, $lineArr)) {
                $start_x = $line_x;
                $start_y = $start_y + $pic_h + $space_y;
            }
            $pathInfo = pathinfo($pic_path);
            switch (strtolower($pathInfo['extension'])) {
                case 'jpg':
                case 'jpeg':
                    $imagecreatefromjpeg = 'imagecreatefromjpeg';
                    break;
                case 'png':
                    $imagecreatefromjpeg = 'imagecreatefrompng';
                    break;
                case 'gif':
                default:
                    $imagecreatefromjpeg = 'imagecreatefromstring';
                    $pic_path = file_get_contents($pic_path);
                    break;
            }
            $resource = $imagecreatefromjpeg($pic_path);
            // $start_x,$start_y copy图片在背景中的位置
            // 0,0 被copy图片的位置
            // $pic_w,$pic_h copy后的高度和宽度
            imagecopyresized($background,$resource,$start_x,$start_y,0,0,$pic_w,$pic_h,imagesx($resource),imagesy($resource)); // 最后两个参数为原始图片宽度和高度，倒数两个参数为copy时的图片宽度和高度
            $start_x = $start_x + $pic_w + $space_x;
        }
        header("Content-type: image/jpg");
        if ($file == '') {
            $file = '/upload/' . date('Ymd/His', SYS_TIME) . mt_rand(1000, 9999) . '.jpg';
        }
        $saveFile = INDEX_PATH . $file;
        $path = dirname($saveFile);
        if (!is_dir($path) && !mkdir($path, 0755, true)) {
            return ['code' => -2, 'msg' => '上传失败，没有目录权限!'];
        }
        imagejpeg($background, $saveFile);
        return ['code' => 1, 'msg' => '成功', 'file' => $file];
//        imagegif($background, "./hero_gam.png");
    }
}
