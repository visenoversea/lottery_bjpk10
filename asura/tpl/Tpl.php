<?php

//declare(strict_types=1);

namespace asura\tpl;

use asura\Loader;
use asura\Request;
use Exception;

class Tpl
{
    protected $config;              //模板配置
    protected $label;               //为模板设置默认的标签解析
    protected $var = [];            //变量赋值
    protected $tplFile = '';        //模板文件对应地址
    protected $compileFile = '';    //编译文件对应地址

    /**
     * 初始化配置
     */
    public function __construct($config = [])
    {
        $this->config = array_merge([
            'tagBegin' => '<!--#',                                  //模板开始标签 $this->tagReplace('<{')
            'tagEnd' => '-->',                                      //模板结束标签 $this->tagReplace('}>')
            'cachePath' => DATA_PATH . DS . 'tpl',                  //缓存路径
            'staticTime' => -1,                                     //静态缓存时间(秒) 0-永远不过期 -1-不缓存
            'staticTag' => '',                                      //静态标记
            'stripSpace' => true,                                   //去除html空格与换行
            'stripNotes' => true,                                   //去除注释
            'ext' => '.html',                                       //文件后缀
        ], $config);
        $this->label = [
            'include' => array($this, 'includeCompile'),
            'foreach' => '\\asura\\tpl\\TplParser::closeCompile',
            'if' => '\\asura\\tpl\\TplParser::closeCompile',
            'else' => '\\asura\\tpl\\TplParser::elseCompile',
            'elseif' => '\\asura\\tpl\\TplParser::elseifCompile',
            'echo' => '\\asura\\tpl\\TplParser::noChange',
            'url' => '\\asura\\tpl\\TplParser::urlCompile',
            'break' => '\\asura\\tpl\\TplParser::noChange',
            'continue' => '\\asura\\tpl\\TplParser::noChange',
            'for' => '\\asura\\tpl\\TplParser::closeCompile',
            'switch' => '\\asura\\tpl\\TplParser::closeCompile',
            'case' => '\\asura\\tpl\\TplParser::otherCompile',
            'default' => '\\asura\\tpl\\TplParser::otherCompile',
            '' => '\\asura\\tpl\\TplParser::noChange'
        ];
    }

    /**
     * 模板赋值操作
     * @param string $k 变量
     * @param null $v   默认为 null
     */
    final public function assign(string $k, $v = null)
    {
        $this->var[$k] = $v;
    }

    /**
     * 设置模板
     * @param null $tplFile
     * @throws Exception
     */
    public function setTpl($tplFile = null)
    {
        if ($tplFile === null) {
            $route = Request::getRoute();
            $this->tplFile = APP_PATH . DS . $route['m'] . DS . 'tpl' . DS . $route['c'] . DS . $route['a'] . $this->config['ext'];
        } else {
            $this->tplFile = $tplFile;
        }
        //判断模板文件是否存在
        if (!is_file($this->tplFile))
            throw new Exception('模板文件不存在:' . $this->tplFile);
    }

    /**
     * 获取内容
     * @param string $file
     * @return false|string
     * @throws Exception
     */
    public function getContents(string $file = '')
    {
        ob_start();
        $this->display($file);
        return ob_get_clean();
    }

    /**
     * 内容输出
     * @param null $file
     * @throws Exception
     */
    public function display($file = null)
    {
        $this->setTpl($file);
        if ($this->config['staticTime'] >= 0) {
            //静态文件地址
            $staticFile = $this->config['cachePath'] . DS . md5($this->tplFile . $this->config['staticTag']) . '.static';
            //判断静态缓存文件是否存在或过期
            if (is_file($staticFile) && ($this->config['staticTime'] == 0 || (SYS_TIME - filemtime($staticFile)) < $this->config['staticTime'])) {
                $data = file_get_contents($staticFile);
            } else {
                //输出内容
                $data = $this->output();
                //保存静态文件
                file_put_contents($staticFile, $data);
            }
        } else {
            $data = $this->output();
        }
        echo $data;
    }

    /**
     * js加密输出 返回加密后内容
     * @param null $file
     * @throws Exception
     */
    public function jsShow($file = null)
    {
        $this->setTpl($file);
        if ($this->config['staticTime'] >= 0) {
            //静态文件地址
            $jsFile = $this->config['cachePath'] . DS . md5($this->tplFile . $this->config['staticTag']) . '.js.static';
            //判断静态缓存文件是否存在或过期
            if (is_file($jsFile) && ($this->config['staticTime'] == 0 || (SYS_TIME - filemtime($jsFile)) < $this->config['staticTime'])) {
                $data = file_get_contents($jsFile);
            } else {
                //输出内容
                $data = "<script>\n<!--\ndocument.write(decodeURIComponent(escape(window.atob('" . base64_encode($this->output()) . "'))));\n//-->\n</script>";
                //保存静态文件
                file_put_contents($jsFile, $data);
            }
        } else {
            $data = "<script>\n<!--\ndocument.write(decodeURIComponent(escape(window.atob('" . base64_encode($this->output()) . "'))));\n//-->\n</script>";
        }
        echo $data;
    }

    /**
     * 编辑输出内容
     * @return false|string 返回编译结果
     */
    protected function output()
    {
        ob_start();
        //编译文件地址
        $this->compileFile = $this->config['cachePath'] . DS . md5($this->tplFile) . '.tpl';
        //导入模板变量
        extract($this->var);
        //引入编译文件
        include $this->getCompileFile();
        return ob_get_clean();
    }

    /**
     * 获取编译文件
     * @return string
     */
    protected function getCompileFile(): string
    {
        //判断编译文件是否存在并且编译文件修改时间要大于模板修改时间
        if (is_file($this->compileFile) && filemtime($this->compileFile) > filemtime($this->tplFile))
            return $this->compileFile;
        $path = dirname($this->compileFile);
        if (!is_dir($path))
            mkdir($path, 0755, true);
        //对文件解析编译
        return $this->fileCompile();
    }

    /**
     * 对模板文件编译解析(同时保存编译文件)
     * @return string
     */
    protected function fileCompile(): string
    {
        $patterns_and_callbacks = ['/' . $this->config['tagBegin'] . '.*?' . $this->config['tagEnd'] . '/s' => array($this, 'replace')];
        if ($this->config['stripNotes']) {
            ////去掉注释
            $patterns_and_callbacks['/<!--[^\!\[]*?(?<!\/\/)-->/'] = function ($matches) {
                return '';
            };
        }
        //优化生成的php代码
        $patterns_and_callbacks['/\?>\s*<\?php\s/s'] = function ($matches) {
            return '';
        };
        if ($this->config['stripSpace']) {
            //去除html空格与换行
            $patterns_and_callbacks['/>\s+</'] = function ($matches) {
                return '><';
            };
            $patterns_and_callbacks['/>(\s+\n|\r)/'] = function ($matches) {
                return '>';
            };
        }
        //编译模板内容并保存编译文件
        file_put_contents(
            $this->compileFile,
            preg_replace_callback_array($patterns_and_callbacks, file_get_contents($this->tplFile))
        );
        return $this->compileFile;
    }

    /**
     * 正则替换回调函数(针对模板文件的标签进行正则替换)
     * @param $matches
     * @return string
     */
    protected function replace($matches): string
    {
        preg_match('/^' . $this->config['tagBegin'] . '(\S*)(.*)' . $this->config['tagEnd'] . '$/s', $matches[0], $matches);
        //标签解析
        if (isset($this->label[$matches[1]]))
            return '<?php ' . call_user_func($this->label[$matches[1]], $matches) . '?>';
        $f = $matches[1][0];
        //变量输出
        return $f === '/' ? '<?php }?>' : ($f === '#' ? '' : '<?php echo ' . TplParser::noChange($matches) . '?>');
    }

    /**
     * 文件引入解析(支持绝对路径,相对路径,变量(assign赋值变量),全局变量 原生include语法)
     * @param $matches
     * @return string
     */
    protected function includeCompile($matches): string
    {
        return 'include $this->getIncludeFile(' . trim($matches[2]) . ',\'' . addslashes(dirname($this->tplFile) . DS) . '\');';
    }

    /**
     * 获取引入文件并编译
     * @param $file
     * @param $path
     * @return string
     * @throws Exception
     */
    protected function getIncludeFile($file, $path): string
    {
        if (($this->tplFile = realpath($path . $file)) || ($this->tplFile = realpath($file))) {
            $this->compileFile = $this->config['cachePath'] . DS . md5($this->tplFile) . '.tpl';
            return $this->getCompileFile();
        }
        throw new Exception($file . '找不到引入文件路径');
    }

    /**
     * 字符串替换 避免正则混淆
     * @param string $str
     * @return string
     */
    final protected function tagReplace(string $str): string
    {
        return str_replace(['{', '}', '(', ')', '[', ']', '|', '+', '*', '.', '^', '?', '$'], ['\{', '\}', '\(', '\)', '\[', '\]', '\|', '\+', '\*', '\.', '\^', '\?', '\$'], $str);
    }

    /**
     * 获取配置
     * @param $key
     * @return array|\asura\type
     */
    final protected function getConfig($key)
    {
        return Loader::config($key);
    }
}
