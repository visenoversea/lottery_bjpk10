<?php

//declare(strict_types=1);

namespace asura\tpl;

use Exception;

class TplParser
{

    /**
     * 对标签内容不改变
     * @param array $matches
     * @return string
     */
    public static function noChange(array $matches): string
    {
        if ($matches[1] === '') {
            return ltrim(rtrim($matches[2], ' ;')) . ';';
        } else {
            return $matches[1] . rtrim($matches[2], ' ;') . ';';
        }
    }

    /**
     * 闭合标签解析
     * @param array $matches
     * @return string
     */
    public static function closeCompile(array $matches): string
    {
        return $matches[1] . '(' . trim($matches[2]) . '){';
    }

    /**
     * else标签解析
     * @param array $matches
     * @return string
     * @throws Exception
     */
    public static function elseCompile(array $matches): string
    {
        if (empty($matches[2]))
            return '}' . $matches[1] . '{';
        throw new Exception('模板标签解析错误:' . $matches[0] . '(else标签后面不能有空格或内容，如需使用else if语句请使用<{elseif xxx}>标签)');
    }

    /**
     * elseif标签解析
     * @param array $matches
     * @return string
     */
    public static function elseifCompile(array $matches): string
    {
        return '}' . $matches[1] . '(' . trim($matches[2]) . '){';
    }

    /**
     * 其他标签解析 case和default
     * @param array $matches
     * @return string
     * @throws Exception
     */
    public static function otherCompile(array $matches): string
    {
        if (empty($matches[2]))
            return $matches[1] . ':';
        throw new Exception('模板标签解析错误:' . $matches[0] . '(' . $matches[1] . '标签后面不能有空格或内容)');
    }

}
