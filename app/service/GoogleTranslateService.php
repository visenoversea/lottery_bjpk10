<?php
//

namespace service;

use asura\Log;
use Stichoza\GoogleTranslate\GoogleTranslate;
use Exception;

class GoogleTranslateService
{
    private static $instance;
    private $GoogleTranslate;

    /**
     * 不能被克隆
     */
    final protected function __clone(){}

    /**
     * 构造函数
     * Model constructor.
     */
    final protected function __construct(){
        $this->GoogleTranslate = new GoogleTranslate();
    }

    /**
     * @return GoogleTranslateService
     */
    public static function getInstance(): GoogleTranslateService
    {
        return static::$instance ?? static::$instance = new static();
    }

    /**
     * 谷歌翻译
     * @param string $content  要翻译的内容不能超过5000
     * @param string $tl       需要翻译的语言
     * @param null $sl         被翻译的语言(默认自动识别)
     * @return string          翻译结果  翻译失败返回空
     */
    public function translate(string $content, string $tl, $sl = null): string
    {
        if (mb_strlen($content) >= 5000) {
            return '';
        }
        $this->GoogleTranslate->setSource($sl);
        $this->GoogleTranslate->setTarget($tl);
        try {
            $res = $this->GoogleTranslate->translate($content);
            if (!$res) {
                throw new Exception("翻译失败:{$content}");
            }
            if ($tl == 'en') {
                //英文首字母大写
                $res = ucfirst($res);
            }
            return $res;
        } catch (Exception $e) {
            //翻译失败
            Log::logException($e, 'translate');
            return '';
        }
    }
}