<?php
//

namespace model;

use asura\Common;
use asura\db\Model;
use asura\Email;
use asura\Log;
use asura\Param;
use service\GlobalService;
use Exception;

class send_model extends Model
{
    protected static $instance;

    /**
     * 验证码验证
     * @param string $account 账号
     * @param string $code 验证码
     * @param int $expire 有效期  默认600秒
     * @return array
     */
    public function VerifyCode(string $account = '', string $code = '', int $expire = 3600): array
    {
        $code = trim($code);
        if (empty($code)) {
            return ['code' => -2, 'msg' => '验证码不能为空'];
        }
        $res = $this->where(['account' => $account, 'code' => $code, 'status' => 1])->order('id DESC')->getOne();
        if ($res) {
            if ($res['create_time'] >= (SYS_TIME - $expire)) {
                return ['code' => 1, 'msg' => '验证成功'];
            } else {
                return ['code' => -2, 'msg' => '验证码已失效，请获取新的验证码'];
            }
        } else {
            return ['code' => -2, 'msg' => '验证码错误'];
        }
    }

    //https://github.com/SMSPlant/apiDocument/wiki/
    //http://www.xqtxhn.com/
    public function SMSPlant($param): array
    {
        $data = Common::curlRequest('http://api.wftqm.com/api/sms/mtsend', $param);
        if ($data) {
            $data = json_decode($data, true);
            if ($data['code'] == '0') {
                return ['code' => 1, 'msg' => '发送成功'];
            } else {
                return ['code' => -2, 'msg' => '发送异常','reason'=>json_encode($data,JSON_UNESCAPED_UNICODE)];
            }
        } else {
            return ['code' => -2, 'msg' => '发送失败', 'reason' => '请求接口失败'];
        }
    }

    /**
     * 验证码短信发送
     */
    public function sendMobileCode($mobile, $area_code = 0): array
    {
        $config_model = config_model::getInstance();
        $systemConfig = $config_model->getConfigData(1);
        $smsConfig = $config_model->getConfigData(3);
        $ip = Common::getIp();
        $today = strtotime('today');
        $nums = $this->where(['ip' => $ip, 'create_time' => ['>=' => $today]])->count();
        if ($nums >= $smsConfig['IPLimit']) {
            return ['code' => -2, 'msg' => '请求地址异常,请联系客服'];
        }
        $nums = $this->where(['account' => $area_code . $mobile, 'create_time' => ['>=' => $today]])->count();
        if ($nums >= $smsConfig['SendLimit']) {
            return ['code' => -2, 'msg' => '请求异常,请联系客服'];
        }
        if ($smsConfig['Sign'] == '') {
            //签名为空的修改成网站标题
            $smsConfig['Sign'] = "【{$systemConfig['WebTitle']}】";
        }
        $code = Param::getRandStr(6, '0123456789');
        $msg = str_replace("#code#", $code, $smsConfig['Tpl']);
        if ($smsConfig['ApiType'] == 1) {
            $content = $smsConfig['Sign'] . $msg;
            $content = str_replace(['{WebTitle}'], [$systemConfig['WebTitle']], $content);
            $res = $this->SMSPlant([
                'appkey' => $smsConfig['AppKey'],
                'secretkey' => $smsConfig['Secretkey'],
                'phone' => $area_code . $mobile,
                'content' => $content
            ]);
        } else if ($smsConfig['ApiType'] == 2) {
            $res = $this->abosend($smsConfig['key'],$smsConfig['secretkey'],$area_code . $mobile, $smsConfig['sign'] . ' ' . $msg);
        }else if ($smsConfig['ApiType'] == 3) {
            $content = $smsConfig['Sign'] . $msg;
            $content = str_replace(['{WebTitle}'], [$systemConfig['WebTitle']], $content);
            $res = $this->buka($smsConfig['AppKey'], $smsConfig['Secretkey'], $area_code . $mobile, $content);
        } else {
            return ['code' => -2, 'msg' => '未知的短信配置'];
        }
        $data = ['account' => $area_code . $mobile, 'content' => $msg, 'code' => $code, 'ip' => $ip];
        if ($res['code'] != 1) {
            $data['status'] = 0;
            if (isset($res['reason'])) {
                $data['reason'] = $res['reason'];
            }
        }
        $this->add(['account' => $area_code . $mobile, 'content' => $msg, 'code' => $code, 'ip' => $ip]);
        return $res;
    }

    //https://antxline.com/
//Linzijin88
//aa100200
    public function buka($appKey, $appSecret, $phone, $message): array
    {
        // 构造请求参数
        $url = 'https://api.antxline.com/api/is/export/sendOneMessage';
//        $appKey = '14bc76f04cba0fb022b529b296387f6d';
//        $appSecret = '5c60a2530cc6f2a1f2d4b831f8edd8a6';
        $data = ['content' => $message, 'phone' => $phone];
        $jsonData = json_encode($data, JSON_UNESCAPED_UNICODE);
        $timestamp = round(microtime(true) * 1000); // 当前时间戳，精确到毫秒
        $number = '3658742'; // 生成随机数
        $jsonArr = str_split($jsonData);
        sort($jsonArr);
        $signStr = $appKey . $timestamp . $number . $appSecret . implode('', $jsonArr);
        $sign = md5(preg_replace('/\s+/', '', $signStr)); // 去除空白符后计算md5
        // 构造请求头
        $headers = [
            'Content-Type: application/json',
            'appKey: ' . $appKey,
            'number: ' . $number,
            'timestamp: ' . $timestamp,
            'sign: ' . $sign,
        ];
        // 发送POST请求
        $data = Common::curlRequest($url, $jsonData, $headers);
        if ($data == false) {
            $res = ['code' => -2, 'msg' => '发送失败', 'reason' => '请求接口失败'];
        } else {
            $data = json_decode($data, true);
            if ($data['code'] == 200) {
                $res = ['code' => 1, 'msg' => '发送成功'];
            } else {
                $res = ['code' => -2, 'msg' => '发送异常', 'reason' => json_encode($data, JSON_UNESCAPED_UNICODE)];
            }
        }
        return $res;
    }
//www.abosend.com
    //账号：zglobal2_otp
    //密码：QQ123123
    //企业编号
    //zRzHXnaW
    //MD5秘钥
    //YUOZUZBEMUBTSZYYMFSIBFAQXBGGQDJA
    //HTTP对接
    //OG - HTTP [smsapi.abosend.com:8205]；
    //接口文档
    //http://apidoc.universeaction.com/web/#/20/335
    public function abosend($orgCode, $key, $mobiles, $content)
    {
        $orgCode='zRzHXnaW';
        $key='YUOZUZBEMUBTSZYYMFSIBFAQXBGGQDJA';
        // 构造请求参数
        $url = 'http://smsapi.abosend.com:8205/api/sendSMS';
        $param = [
            'orgCode' => $orgCode,
            'mobileArea' => '+0',
            'mobiles' => '+'.$mobiles,
            'content' => $content,
            'rand' => Param::getRandStr(6, '0123456789')
        ];
        $param['sign'] = strtoupper(md5($param['orgCode'] . $param['content'] . $param['rand'] . $key));
        $data = Common::curlRequest($url, $param);
        if ($data == false) {
            $res = ['code' => -2, 'msg' => '发送失败'];
        } else {
            $data = json_decode($data, true);
            if ($data['code'] == 200) {
                $res = ['code' => 1, 'msg' => '发送成功'];
            } else {
                $res = ['code' => -2, 'msg' => '发送异常', 'err' => $data];
            }
        }
        return $res;
    }
    /**
     * 邮箱验证码发送
     * @param $email
     * @return array
     */
    public function sendEmailCode($email): array
    {
        $config_model = config_model::getInstance();
        $systemConfig = $config_model->getConfigData(1);
        $emailConfig = $config_model->getConfigData(4);
        $ip = Common::getIp();
        $today = strtotime('today');
        $nums = $this->where(['ip' => $ip, 'create_time' => ['>=' => $today]])->count();
        if ($nums >= $emailConfig['IPLimit']) {
            return ['code' => -2, 'msg' => '请求地址异常,请联系客服'];
        }
        $nums = $this->where(['account' => $email, 'create_time' => ['>=' => $today]])->count();
        if ($nums >= $emailConfig['SendLimit']) {
            return ['code' => -2, 'msg' => '请求异常,请联系客服'];
        }
        $code = Param::getRandStr(6, '0123456789');
        $GlobalService = GlobalService::getInstance();
        if ($emailConfig['Translate']) {
            $subject = $GlobalService->translate($emailConfig['Subject'], 0, ['{0}' => $systemConfig['WebTitle']]);
            $body = $GlobalService->translate($emailConfig['Tpl'], 0, ['{0}' => $systemConfig['WebTitle'], '{1}' => $code]);
        } else {
            $subject = str_replace(['{0}'], [$systemConfig['WebTitle']], $emailConfig['Subject']);
            $body = str_replace(['{0}', '{1}'], [$systemConfig['WebTitle'], $code], $emailConfig['Tpl']);
        }
        $Email = new Email($emailConfig['UserName'], $emailConfig['Password'], $emailConfig['Host'], $emailConfig['Port']);
        $res = $Email->send($emailConfig['UserName'], $email, $subject, $body);
        $data = ['account' => $email, 'content' => $body, 'code' => $code, 'ip' => $ip];
        if ($res['code'] != 1) {
            $data['status'] = 0;
            $data['reason'] = $res['err'];
        }
        $this->add($data);
        return $res;
    }

    //获取单条数据
    public function getData($id, $where = [], $field = '*')
    {
        $where['id'] = intval($id);
        return $this->field($field)->where($where)->getOne();
    }

    //新增
    public function add(array $data = []): int
    {
        $data['create_time'] = $data['modify_time'] = SYS_TIME;
        return $this->insert($data);
    }

    //编辑
    public function edit(array $data, array $where = [])
    {
        if (isset($data['id'])) {
            $where['id'] = intval($data['id']);
            unset($data['id']);
        }
        $data['modify_time'] = SYS_TIME;
        return $this->where($where)->update($data);
    }

    /**
     * 删除
     * @param $id
     * @return array
     */
    public function delById($id): array
    {
        $data = $this->where(['id' => intval($id)])->getOne();
        if (!$data) {
            return ['code' => -2, 'msg' => '未找到数据'];
        }
        $res = $this->edit(['id' => $data['id'], 'status' => -1]);
        if ($res) {
            /*********添加日志*********/
            (user_log_model::getInstance())->addLog('数据删除', ['model' => get_class($this), 'data' => $data]);
            /*********添加日志*********/
            return ['code' => 1, 'msg' => '删除成功'];
        } else {
            return ['code' => -2, 'msg' => '删除失败'];
        }
    }

}
