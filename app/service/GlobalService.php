<?php
//全局类
namespace service;

use asura\Param;
use model\translate_list_model;
use model\user_model;

class GlobalService
{
    private $user = null;
    private $lang = null;
    private $token = null;
    //表后缀
    private string $suffix = '';
    private static GlobalService $instance;

    /**
     * 不能被克隆
     */
    final protected function __clone(){}

    /**
     * 构造函数
     * Model constructor.
     */
    final protected function __construct(){
        if (!empty($_SERVER['HTTP_LANG'])) {
            $this->lang = $_SERVER['HTTP_LANG'];
        }
    }

    /**
     * 获取Redis单例实例
     * @return GlobalService
     */
    public static function getInstance(): GlobalService
    {
        return static::$instance ?? static::$instance = new static();
    }

    public function getSuffix(): string
    {
        return $this->suffix;
    }

    public function setSuffix($suffix = '')
    {
        if ($suffix) {
            $this->suffix = '_' . ltrim($suffix, '_');
        } else {
            $this->suffix = '';
        }
    }

    //获取用户信息
    public function getUser()
    {
        if (isset($this->user)) {
            return $this->user;
        }
        $token = $this->getToken();
        if ($token) {
            //设置用户信息
            $user_model = user_model::getInstance();
            $this->user = $user_model->where(['id' => $token['id']])->getOne() ?: [];
        } else {
            $this->user = [];
        }
        return $this->user;
    }

    //获取token信息
    public function getToken()
    {
        if (isset($this->token)) {
            return $this->token;
        }
        //获取用户信息
        if (!empty($_SERVER['HTTP_TOKEN'])) {
            $this->token = json_decode(Param::auth($_SERVER['HTTP_TOKEN'], true), true) ?: [];
        } else {
            $this->token = [];
        }
        return $this->token;
    }

    //获取自己的推广pid
    public function getPid(): string
    {
        $user = $this->getUser();
        return ($user && $user['type'] < 10) ? $user['pid'] . $user['id'] . ',' : '';
    }

    //获取语言信息
    public function getLang()
    {
        return $this->lang;
    }

    //获取语言信息
    public function setLang($lang)
    {
        return $this->lang = $lang;
    }

    /**
     * 翻译成需要的语言
     * @param string    $content    翻译的内容
     * @param int       $type
     * @param array     $replace
     * @param null      $sl         被翻译内容的语言  默认自动识别
     * @return string
     */
    public function translate(string $content, int $type = 0, array $replace = [], $sl = null): string
    {
        if (!$content) {
            return '';
        }
        $lang = $this->getLang();
        if ($lang === null || $sl === $lang) {
            if ($replace) {
                $content = str_replace(array_keys($replace), array_values($replace), $content);
            }
            return $content;
        }
        //翻译并得到结果
        $translate_list_model = translate_list_model::getInstance();
        return $translate_list_model->getTranslateData($type, $content, $lang, $replace, $sl);
    }

    //json转换
    public function json($data, $replace = [], $sl = null)
    {
        if (is_string($data['msg'])) {
            $data['msg'] = $this->translate($data['msg'], 0, $replace, $sl);
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit(1);
    }

    //判断是否需要系统维护
    public function service($status)
    {
        if ($status > 0) {
            if ($status == 1) {
                //系统维护
                $this->json(['code' => -2, 'msg' => '系统正在维护升级,请耐心等待,预计1小时完成', 'serviceStatus' => $status]);
            } else {
                //用户迁移
                $this->json(['code' => -2, 'msg' => '为了更好的服务用户，平台进行系统升级。', 'serviceStatus' => 2, 'url' => 'https://down.coslt.com/']);
            }
            exit(1);
        }
    }

    public function _logout($msg='未登录')
    {
        $this->json(['code' => -1, 'msg' => $msg]);
        exit(1);
    }
}
