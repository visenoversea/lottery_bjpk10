<?php
//默认主入口
namespace main\controller;

use asura\Common;
use asura\Param;
use asura\Request;
use asura\tpl\Tpl;
use main\classes\base;
use asura\other\ValidateCode;
use model\banner_model;
use model\config_model;
use model\domain_model;
use model\ip_model;
use model\lang_model;
use service\RedisService;
use Mobile_Detect;

class index extends base
{

    public function domain($auth, $type = 0, $tid = '')
    {
        if ($auth !== null) {
            //登录
            $RedisService = RedisService::getInstance();
            $token = $RedisService->getData('loinAuth', $auth);
            if ($token) {
                //有授权信息
                echo "<script>localStorage.setItem('token', '{$token}');window.location.href='/';</script>";
                return;
            }
        }
        $domain_model = domain_model::getInstance();
        $domain = $domain_model->getInfo();
        if ($domain) {
            if ($domain['type'] == 1) {
                //手机端域名
                if ($tid !== '') {
//                    $ip_model = ip_model::getInstance();
//                    $ip_model->setTid($tid);
                    echo "<script>localStorage.setItem('tid', '{$tid}');window.location.href='/#/register';</script>";
                    return;
                } else {
                    echo file_get_contents(INDEX_PATH . DS . 'app.html');
                    return;
                }
            } else if ($domain['type'] == 2) {
                //后台域名
                $html = file_get_contents(INDEX_PATH . DS . 'super.html');
                $config_model = config_model::getInstance();
                $system = $config_model->getConfigData(1);
                $system = json_encode($system, JSON_UNESCAPED_UNICODE);
                echo str_replace('</title>', "</title><script>localStorage.setItem('system', JSON.stringify({$system}));</script>", $html);
                return;
            } else if ($domain['type'] == 3) {
                //下载推广域名
                echo file_get_contents(INDEX_PATH . DS . 'down.html');
                return;
            }
        }
        $Mobile_Detect = new Mobile_Detect();
        if ($Mobile_Detect->isMobile() || $type) {
            //手机端
            if ($tid !== '') {
//                $ip_model = ip_model::getInstance();
//                $ip_model->setTid($tid);
                echo "<script>localStorage.setItem('tid', '{$tid}');window.location.href='/#/register';</script>";
            } else {
                echo file_get_contents(INDEX_PATH . DS . 'app.html');
            }
        } else {
            //电脑端显示
            $Tpl = new Tpl();
            $url = '/app.html';
            if ($tid !== null) {
                $Tpl->assign('url', $url.'?type=1&tid=' . $tid);
            } else {
                $Tpl->assign('url', $url.'?type=1');
            }
            $Tpl->assign('WebTitle', '');
            $Tpl->display();
        }
    }

    //获取初始化数据
    public function init()
    {
        $config_model = config_model::getInstance();
        $system = $config_model->getConfigData(1);
        //域名
        $system['downUrl'] = (domain_model::getInstance())->getUrl(3);
        if (isset($system['ProductType'])) {
            $system['ProductTypeId'] = $system['ProductType'];
            $ProductType = [];
            if ($system['Lang']) {
                $lang = $this->GlobalService->getLang();
                if (!$lang) {
                    $this->GlobalService->setLang($system['Lang']);
                }
            }
            foreach ($system['ProductType'] as $v) {
                if ($v == 0) {
                    //币币
                    $ProductType[] = ['id' => $v, 'title' => $this->GlobalService->translate('币币')];
                } else if ($v == 1) {
                    //杠杆
                    $ProductType[] = ['id' => $v, 'title' => $this->GlobalService->translate('杠杆')];
                } else if ($v == 2) {
                    //秒合约
                    $ProductType[] = ['id' => $v, 'title' => $this->GlobalService->translate('秒合约')];
                } else if ($v == 3) {
                    //外汇
                    $ProductType[] = ['id' => $v, 'title' => $this->GlobalService->translate('外汇')];
                }
            }
            $system['ProductType'] = $ProductType;
        }
        //获取期权的模式
        $system['ProductTimeMode'] = $config_model->getConfig(7,'ProductTimeMode');
        //提现手续费模式
        $system['WithdrawModel'] = $config_model->getConfig(7,'WithdrawModel');
        $kefu = $config_model->getConfigData(2);
        if (Common::isStr($kefu['KefuUrl'], 'meeline') || Common::isStr($kefu['KefuUrl'], 'chatlink') || Common::isStr($kefu['KefuUrl'], 'meiqia')) {
            $user = $this->GlobalService->getUser();
            if ($user) {
                $kefu['KefuUrl'] = $kefu['KefuUrl'] . '&' . http_build_query(['clientId' => $user['id'], 'metadata' => json_encode(['name' => "用户id:{$user['id']}", JSON_UNESCAPED_UNICODE])]);
            }
        }
        $banner_model = banner_model::getInstance();
        $banner = [];
        $banner['logo'] = $banner_model->getArr('logo');
        $banner['tg'] = $banner_model->getImg('tg');
        $banner['lunbo'] = $banner_model->getBannerList('lunbo');
        $lang_model = lang_model::getInstance();
        $langList = $lang_model->field('id,name,code,icon')->where(['status' => 1])->select();
        $this->GlobalService->json([
            'code' => 1,
            'msg' => '成功',
            'system' => $system,
            'kefu'=>$kefu,
            'banner' => $banner,
            'langList' => $langList,
        ]);
    }

    //获取随机动态展示数据
    public function getRandList($limit = 100)
    {
        $list = [];
        $amount = [0.89, 0.66, 0.97, 0.69, 0.79, 5.18, 0.66, 5.69, 8.69, 11.86,18.77,25.25, 29.25, 99.98, 77.98, 43.25, 88.25, 50.25, 151.11, 351.11, 651.11, 1152.23, 1852.64, 3812.88, 4152.24];
        for ($i = 1; $i <= 30; $i++) {
            $amount[] = mt_rand(59, 460000) / 100;
        }
        for ($i = 1; $i <= $limit; $i++) {
            $list[] = [
                'id' => $i,
                'user_name' => Param::getRandStr(2) . '***' . Param::getRandStr(1),
                'amount' => $amount[array_rand($amount)],
                //'amount' => round(mt_rand(200, 20000)/100,2),
                'currency' => 'USDT'
            ];
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'list' => $list]);
    }

    public function getAppInfo()
    {
        $config_model = config_model::getInstance();
        $system = $config_model->getConfigData(1);
        $appConfig = $config_model->getConfigData(6);
        $banner_model = banner_model::getInstance();
        $logo = $banner_model->getImg('logo');
        $data = [
            'apk' => $appConfig['Apk'] ?? '',
            'logo' => $logo,
            'mobileprovision' => '/app.mobileprovision',
            'Version' => $system['Version'],
            'WebTitle' => $system['WebTitle']
        ];
        if ($appConfig['AppleType'] == 0) {
            $data['ios'] = '/main/index/app.mobileconfig';
        } else {
            $data['ios'] = $appConfig['Mobileconfig'] ?: '';
        }
        $this->GlobalService->json(['code' => 1, 'msg' => '成功', 'data' => $data]);
    }

    /**
     * 描述安装文件
     * @throws \Exception
     */
    public function app()
    {
        $icon = INDEX_PATH . DS . 'img' . DS . 'logo.png';
        if (!is_file($icon)) {
            echo 'icon图标不存在';
            return;
        }
        if (getimagesize($icon)) {
            $icon = chunk_split(base64_encode(fread(fopen($icon, 'r'), filesize($icon))));
        } else {
            echo $this->GlobalService->translate('logo异常');
            return;
        }
        $domain_model = domain_model::getInstance();
        //获取打包域名地址
        $appUrl = $domain_model->getUrl(1);
        if (!$appUrl) {
            echo $this->GlobalService->translate('未配置域名');
            return;
        }
        $config_model = config_model::getInstance();
        $system = $config_model->getConfigData(1);
        $appConfig = $config_model->getConfigData(6);
        $click = $this->GlobalService->translate('Click to install');
        $title = $system['WebTitle'];
        $des = $this->GlobalService->translate('Please click the "Install" button in the upper right corner, please ignore the red sign. This installation will add an application entry on your phone desktop, and you need to enter a password to complete the installation! This is your phone lock screen password');
        $data = [
            'url' => $appUrl . '/',
            'title' => $title,
            'click' => $click,
            'des' => $des,
            'icon' => $icon,
            'guid' => $appConfig['UID']
        ];
        $Tpl = new Tpl(['stripSpace' => false]);
        $Tpl->assign('data', $data);
        header('Content-Type: application/octet-stream');
        $Tpl->display();
    }

    //获取图片验证码
    public function getImgCode()
    {
        $ValidateCode = new ValidateCode();
        $code = $ValidateCode->getCode();
        $RedisService = RedisService::getInstance();
        $key = SYS_TIME . mt_rand(1000, 9999);
        $RedisService->setData($code, 'imgCode', $key);
        $this->GlobalService->json([
            'code' => 1,
            'msg' => '成功',
            'codeKey' => $key,
            'imgUrl' => '/main/index/imgCode?key=' . $key
        ]);
    }

    public function imgCode()
    {
        $key = Request::get('key');
        if(!$key){
            return;
        }
        $ValidateCode = new ValidateCode();
        $RedisService = RedisService::getInstance();
        $code = $RedisService->getData('imgCode', $key);
        if ($code) {
            $ValidateCode->setCode($code);
            $ValidateCode->doimg();
        }
    }

}