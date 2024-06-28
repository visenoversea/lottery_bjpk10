<?php
/**
 * 语言包加载类
 */
namespace asura;

class Lang
{
    //默认语言
    private static $lang = 'zh-CN';
    //支持的语言包列表   语言列表参考 https://cloud.google.com/translate/docs/languages
    private static $lang_list = ['zh-CN', 'zh-TW', 'en'];
    //语言包数据
    private static $data = [];

    //获取模块全部数据
    public static function init(): array
    {
        if (!self::$data) {
            $route = Request::getRoute();
            //加载全局语言配置
            self::load(CONFIG_PATH . DS . 'lang' . DS . self::$lang . '.php');
            //加载模块配置
            self::load(APP_PATH . DS . $route['m'] . DS . 'lang' . DS . self::$lang . DS . $route['c'] . '.php');
        }
        return self::$data;
    }

    /**
     * 获取语言包数据
     * @param $k
     * @param array $replaceData  ['{{min}}'=>'100']
     * @return mixed|string
     */
    public static function get($k, array $replaceData = [])
    {
        $data = self::init();
        if (isset($data[$k])) {
            if ($replaceData) {
                $search = [];
                $replace = [];
                foreach ($replaceData as $key => $val) {
                    $search[] = $key;
                    $replace[] = $val;
                }
                $data[$k] = str_replace($search, $replace, $data[$k]);
            }
            return $data[$k];
        } else {
            return '';
        }
    }

    /**
     * 设置语言(设置后会重新初始化)
     * @param $lang
     */
    public static function setLang($lang)
    {
        if ($lang == self::$lang) return;
        if (in_array($lang, self::$lang_list)) {
            self::$lang = $lang;
            self::$data = [];
        }
    }

    /**
     * 获取当前语言
     * @return string
     */
    public static function getLang(): string
    {
        return self::$lang;
    }

    /**
     * 加载语言包配置
     * @param $path
     */
    public static function load($path)
    {
        self::$data = array_merge(self::$data, Loader::file($path));
    }

    /**
     * 清空语言包数据
     */
    public static function removeData()
    {
        self::$data = [];
    }

}
