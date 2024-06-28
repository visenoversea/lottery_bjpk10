<?php
/**
 * 微信相关
 *
 */

namespace asura;


class WeChat
{
    /**
     * 检查微信爆红
     * @param string $url
     * @return array
     */
    public static function checkUrl(string $url): array
    {
        $url = trim($url);
        if (empty($url)) {
            return ['code' => -2, 'msg' => '请传入需要检测的URL'];
        }
        // 官方API接口
        $api = get_headers('https://mp.weixinbridge.com/mp/wapredirect?url=' . $url);
        //判断是否被拦截，主要是下标为6的节点返回的是weixin110就代表被封了
        if ($api[6] !== "Location: {$url}") {
            return ['code' => -2, 'msg' => '域名被拦截'];
        } else {
            return ['code' => 1, 'msg' => '域名正常'];
        }
    }




}