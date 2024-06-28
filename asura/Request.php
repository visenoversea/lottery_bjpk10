<?php
//Request请求类 用与解析路由，过滤请求数据等

namespace asura;

use voku\helper\AntiXSS;

class Request
{
    private static $AntiXSS = null;
    private static $route = [];   //路由信息
    private static $data = [];

    /**
     * 获取get数据
     * @param string $k
     * @return array|mixed|string|null
     */
    public static function get(string $k = '')
    {
        if (!isset(self::$data['get'])) {
            self::$data['get'] = self::filter($_GET);
        }
        return $k ? (self::$data['get'][$k] ?? null) : self::$data['get'];
    }

    /**
     * 获取post数据
     * @param string $k
     * @return array|mixed|string|null
     */
    public static function post(string $k = '')
    {
        if (!isset(self::$data['post'])) {
            //判断是否json传值
            if (isset($_SERVER['CONTENT_TYPE']) && (strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false)) {
                //支持POST的json格式
                $post = json_decode(file_get_contents("php://input"), true) ?? [];
                if ($post) {
                    self::$data['post'] = self::filter($post);
                } else {
                    self::$data['post'] = [];
                }
            } else {
                self::$data['post'] = self::filter($_POST);
            }
        }
        return $k ? (self::$data['post'][$k] ?? null) : self::$data['post'];
    }

    /**
     * 获取request数据
     * @param string $k
     * @return array|mixed|string|null
     */
    public static function request(string $k = '')
    {
        if (!isset(self::$data['request'])) {
            //支持json格式
            if ((strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false)) {
                if (isset(self::$data['post'])) {
                    self::$data['request'] = self::filter(array_merge($_REQUEST, self::$data['post']));
                } else {
                    $post = json_decode(file_get_contents("php://input"), true) ?? [];
                    if ($post) {
                        self::$data['post'] = $post;
                        self::$data['request'] = self::filter(array_merge($_REQUEST, $post));
                    } else {
                        self::$data['post'] = [];
                        self::$data['request'] = self::filter($_REQUEST);
                    }
                }
            } else {
                self::$data['request'] = self::filter($_REQUEST);
            }
        }
        return $k ? (self::$data['request'][$k] ?? null) : self::$data['request'];
    }

    /**
     * 过滤函数防止XSS攻击
     * @param array $data
     * @return array|mixed|string
     */
    public static function filter(array $data)
    {
        if (!$data) return $data;
        //实例化
        if (!self::$AntiXSS) {
            self::$AntiXSS = new AntiXSS();
        }
        self::$AntiXSS->removeEvilAttributes(array('style'));
        return self::$AntiXSS->xss_clean($data);
    }

    public static function isPost(): bool
    {
        return $_SERVER['REQUEST_METHOD'] == 'POST';
    }

    public static function isGet(): bool
    {
        return $_SERVER['REQUEST_METHOD'] == 'GET';
    }

    /**
     * 获取请求时间(毫秒)
     * @return float|int
     */
    public static function getTime()
    {
        return (microtime(true) - SYS_MICRO_TIME) * 1000;
    }

    public static function isHttps(): bool
    {
        if (!empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off') {
            return true;
        } elseif (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
            return true;
        } elseif (!empty($_SERVER['HTTP_FRONT_END_HTTPS']) && strtolower($_SERVER['HTTP_FRONT_END_HTTPS']) !== 'off') {
            return true;
        }
        return false;
    }

    //获取请求路径
    public static function getPath(): string
    {
        $route = self::getRoute();
        return '/' . $route['m'] . $route['depr'] . $route['c'] . $route['depr'] . $route['a'];
    }

    //获取路由信息
    public static function getRoute(): array
    {
        //判断是否已经解析路由信息
        if (self::$route) return self::$route;
        //路由配置
        $route_config = Loader::config('sys')['route'];
        //获取pathInfo
        if (!empty($_GET['s'])) {
            $pathInfo = ltrim($_GET['s'], '/');
            unset($_GET['s']);
            unset($_REQUEST['s']);
        } else if (!empty($_SERVER['PATH_INFO'])) {
            //去除前缀
            $pathInfo = ltrim($_SERVER['PATH_INFO'], '/');
        } else {
            if ($route_config['default'] == '') {
                //默认路由不存在跳转index页面
                header('Location: /index.html');
                exit(0);
            } else {
                //默认值
                $pathInfo = ltrim($route_config['default'], '/');
            }
        }
        //解析pathInfo
        if (preg_match('/.*(?=\.(' . $route_config['ext'] . ')$)/', $pathInfo, $match)) {
            //带后缀路由
            $pathInfo = $match[0];
            self::$route['ext'] = $match[1];
        } else {
            //不带后缀
            self::$route['ext'] = '';
        }
        $pathInfo = explode($route_config['depr'], $pathInfo);
        self::$route['depr'] = $route_config['depr'];
        self::$route['m'] = array_shift($pathInfo);
        self::$route['c'] = array_shift($pathInfo);
        self::$route['a'] = array_shift($pathInfo);
        if ($pathInfo) {
            //路由带参数
            $argsNums = count($pathInfo);
            for ($i = 0; $i < $argsNums; $i++) {
                $k = $pathInfo[$i];
                $i++;
                $_GET[$k] = $pathInfo[$i] ?? '';
            }
        }
        return self::$route;
    }
}
