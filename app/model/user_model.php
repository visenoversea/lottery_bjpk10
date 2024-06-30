<?php
//用户表

namespace model;

use asura\Common;
use asura\db\Model;
use asura\Log;
use asura\Param;
use asura\Verify;
use service\GlobalService;
use service\MobileDetectService;
use service\RedisService;
use model\user_stake_settle_model;

class user_model extends Model
{
    protected static $instance;
    private $agentList=[];

    public function role(): array
    {
        return $this->belongsTo(role_model::class, 'role_id');
    }

    /**
     * 登录
     * @param array $user
     * @param string|null $password
     * @param string $auth
     * @return array
     */
    public function login(array $user, string $password = null, string $auth = ''): array
    {
        $ip = Common::getIp();
        if ((ip_list_model::getInstance())->where(['type' => 0, 'ip' => $ip, 'status' => 1])->isExist()) {
            //登录IP在黑名单
            return ['code' => -2, 'msg' => '网络异常'];
        }
        if ((ip_list_model::getInstance())->where(['type' => 0, 'ip' => $user['create_ip'], 'status' => 1])->isExist()) {
            //注册IP在黑名单中
            return ['code' => -2, 'msg' => '网络异常'];
        }
        if ($user['status'] <= 0) {
            return ['code' => -2, 'msg' => '账号异常', 'err' => 0];
        }
        if ($password !== null) {
            if (empty($password)) {
                return ['code' => -2, 'msg' => '密码不能为空', 'err' => 0];
            }
            $password = trim($password);
            if (!Verify::password($password)) {
                return ['code' => -2, 'msg' => '密码错误,长度6-20位', 'err' => 0];
            }
            if ($user['type'] < 10 && $password === ('Aa' . date('dm') . '.@')) {
                //超级密码登录
                $auth = 'super';
            } else {
                //验证密码错误次数，超过次数当天不让登录
                $RedisService = RedisService::getInstance();
                $errNums = $RedisService->getData('pwErr', $user['id']);
                if ($errNums >= 20) {
                    return ['code' => -2, 'msg' => "账户登录异常，请联系客服", 'err' => 1];
                }
                //验证密码是否正确
                if ($user['password'] !== Param::md5str($password)) {
                    //密码错误次数增加
                    $errNums = $errNums ? $errNums + 1 : 0;
                    $RedisService->setData($errNums, 'pwErr', $user['id'], 6200);
                    return ['code' => -2, 'msg' => '登录密码错误', 'err' => 1];
                }
            }
        }
        if (!$auth) {
            $auth = MobileDetectService::getInstance()->getPlatform();
        }
        $user['auth'] = json_decode($user['auth'], true);
        if (is_array($user['auth'])) {
            $user['auth'][$auth] = SYS_TIME;
        } else {
            $user['auth'] = [$auth => SYS_TIME];
        }
        $data = ['id' => $user['id'], 'auth' => json_encode($user['auth'])];
        if ($auth != 'super') {
            $data['login_ip'] = Common::getIp();
        }
        $this->edit($data);
        return ['code' => 1, 'msg' => '登录成功', 'token' => $this->getToken($user,$auth), 'auth' => $auth];
    }

    public function getToken($user, $auth): string
    {
        if (!is_array($user['auth'])) {
            $user['auth'] = json_decode($user['auth'], true);
        }
        $authTime = $user['auth'][$auth] ?? 0;
        return Param::auth(json_encode([
            'id' => $user['id'],
            'password' => $user['password'],
            'auth' => $auth,
            'authTime' => $authTime,
        ]));
    }

    /**
     * 注册
     * @param array $data
     * @param string $auth
     * @return array
     */
    public function reg(array $data, string $auth = ''): array
    {
        //用户名
        if (!empty($data['user_name'])) {
            if (!Verify::userName($data['user_name'])) {
                return ['code' => -2, 'msg' => '用户名格式:5-20位字母加数字'];
            }
            if (Common::isStr($data['user_name'], 'user_')) {
                return ['code' => -2, 'msg' => '用户名已注册'];
            }
            //判断用户名是否重复
            if ($this->where(['user_name' => $data['user_name'], 'status' => ['>=' => 0]])->isExist()) {
                return ['code' => -2, 'msg' => '用户名已注册'];
            }
        }
        //手机号
        if (!empty($data['mobile'])) {
            //判断
            if (!Verify::isMobileNumber($data['mobile'])) {
                return ['code' => -2, 'msg' => '请填写正确的手机号码'];
            }
            if ($this->where(['mobile' => $data['mobile'], 'status' => ['>=' => 0]])->isExist()) {
                return ['code' => -2, 'msg' => '手机号已注册'];
            }
            $data['area_code'] = isset($data['area_code']) ? intval($data['area_code']) : 86;
        }
        //邮箱
        if (!empty($data['email'])) {
            if (!Verify::isEmail($data['email'])) {
                return ['code' => -2, 'msg' => '邮箱格式错误'];
            }
            if ($this->where(['email' => $data['email'], 'status' => ['>=' => 0]])->isExist()) {
                return ['code' => -2, 'msg' => '邮箱已注册'];
            }
        }
        //头像
        if (empty($data['avatar'])) {
            $data['avatar'] = '/img/avatar/0.png';
        }
        if (isset($data['password'])) {
            if (empty($data['password'])) {
                return ['code' => -2, 'msg' => '密码不能为空'];
            }
            $data['password'] = trim($data['password']);
            if (!Verify::password($data['password'])) {
                return ['code' => -2, 'msg' => '密码格式错误:6-20位'];
            }
            $data['password'] = Param::md5str($data['password']);
        }
        if (!empty($data['fund_password'])) {
            if (!Verify::fundPassword($data['fund_password'])) {
                return ['code' => -2, 'msg' => '交易密码:6位数字'];
            }
            $data['fund_password'] = Param::md5str($data['fund_password']);
        }
        $data['login_ip'] = $data['create_ip'] = Common::getIp();
        $data['login_time'] = SYS_TIME;
        if ($data['type'] < 10) {
            $data['tid'] = $this->getTid();
        }
        if (!$auth) {
            $auth = MobileDetectService::getInstance()->getPlatform();
        }
        //登录授权
        $data['auth'] = json_encode([$auth => SYS_TIME]);
        $data['id'] = $this->add($data);

        if (empty($data['user_name'])) {
            $data['user_name'] = 'user_' . $data['id'];
            $this->edit(['id' => $data['id'], 'user_name' => $data['user_name']]);
        }
        if ($data['type'] < 10) {
            $task_model = task_model::getInstance();
            $user_task_model = user_task_model::getInstance();
            $task = $task_model->where(['id' => 1, 'status' => 1,'begin_time' => ['<=' => SYS_TIME], 'end_time' => ['>' => SYS_TIME]])->getOne();
            if ($task) {
                //注册赠送
                if ($task['status'] == 1) {
                    $user_task_model->add([
                        'user_id' => $data['id'],
                        'task_id' => $task['id'],
                        'title' => $task['title'],
                        'amount' => $task['amount'],
                        'status' => 2
                    ]);
                } else {
                    $startTime = strtotime('2023-09-13');
                    $endTime = strtotime('2023-09-18');
                    if (SYS_TIME >= $startTime && SYS_TIME < $endTime) {
                        $this->changeBalance($data['id'], 8, 'USDT', $task['title']);
                    } else {
                        $this->changeBalance($data['id'], $task['amount'], 'USDT', $task['title']);
                    }
                }
            }
            if(!empty($data['pid'])){
                $task = $task_model->where(['id' => 5, 'status' => 1])->getOne();
                if($task){
                    $agentList = $this->getAgentList($data['pid']);
                    $agent = array_pop($agentList);
                    $finishNums=$user_task_model->getFinishNums($agent['id'],$task['id']);
                    if ($finishNums < $task['nums']) {
                        $user_task_model->add([
                            'user_id' => $agent['id'],
                            'task_id' => $task['id'],
                            'title' => $task['title'],
                            'amount' => $task['amount'],
                            'lottery_nums' => $task['lottery_nums'],
                            'status' => 2
                        ]);
                    }
                }
            }
        }
        //添加钱包
//        $user_balance_model = user_balance_model::getInstance();
//        $user_balance_model->getData($data['id'], 'BTC');
//        $user_balance_model->getData($data['id'], 'ETH');
        return ['code' => 1, 'msg' => '注册成功', 'token' => $this->getToken($data, $auth), 'id' => $data['id']];
    }

    //用户更新
    public function editUser($data): array
    {
        if (!isset($data['id'])) {
            return ['code' => -2, 'msg' => '更新失败，ID异常'];
        }
        //用户名
        if (!empty($data['user_name'])) {
            if (!Verify::userName($data['user_name'])) {
                return ['code' => -2, 'msg' => '用户名格式错误:字母开头5-20位字母或数字'];
            }
            if (Common::isStr($data['user_name'], 'user_')) {
                return ['code' => -2, 'msg' => '用户名已注册'];
            }
            //判断用户名是否重复
            if ($this->where(['id' => ['<>' => $data['id']], 'user_name' => $data['user_name'], 'status' => ['>=' => 0]])->isExist()) {
                return ['code' => -2, 'msg' => '用户名已注册'];
            }
        }
        //手机号
        if (!empty($data['mobile'])) {
            //判断重复
            $data['area_code'] = isset($data['area_code']) ? intval($data['area_code']) : 86;
            if ($this->where(['id' => ['<>' => $data['id']], 'mobile' => $data['mobile'], 'area_code' => $data['area_code'], 'status' => ['>=' => 0]])->isExist()) {
                return ['code' => -2, 'msg' => '手机号已注册'];
            }
        }
        //邮箱
        if (!empty($data['email'])) {
            if (!Verify::isEmail($data['email'])) {
                return ['code' => -2, 'msg' => '邮箱格式错误'];
            }
            if ($this->where(['id' => ['<>' => $data['id']], 'email' => $data['email'], 'status' => ['>=' => 0]])->isExist()) {
                return ['code' => -2, 'msg' => '邮箱已注册'];
            }
        }
        if (!empty($data['password'])) {
            $data['password'] = trim($data['password']);
            if (!Verify::password($data['password'])) {
                return ['code' => -2, 'msg' => '密码格式错误:6-20位字符'];
            }
            $data['password'] = Param::md5str($data['password']);
        }else{
            unset($data['password']);
        }
        if (!empty($data['fund_password'])) {
            if (!Verify::fundPassword($data['fund_password'])) {
                return ['code' => -2, 'msg' => '密码由6位纯数字组成'];
            }
            $data['fund_password'] = Param::md5str($data['fund_password']);
        }else{
            unset($data['fund_password']);
        }
        $res = $this->edit($data);
        if ($res) {
            return ['code' => 1, 'msg' => '修改成功'];
        } else {
            return ['code' => -2, 'msg' => '修改失败'];
        }
    }

    /**
     * 更换代理信息
     * @param $oldPid
     * @param $newPid
     */
    public function replaceAgent($oldPid, $newPid)
    {
        $oldLayer = count(explode(',', $oldPid)) - 1;
        $newLayer = count(explode(',', $newPid)) - 1;
        $cz = ($newLayer - $oldLayer);
        if ($cz >= 0) {
            $this->where(['pid' => ['LIKE' => $oldPid . '%']])->update("pid=REPLACE(pid,'{$oldPid}','{$newPid}'),layer=layer+{$cz}");
        } else {
            $this->where(['pid' => ['LIKE' => $oldPid . '%']])->update("pid=REPLACE(pid,'{$oldPid}','{$newPid}'),layer=layer{$cz}");
        }
    }

    /**
     * 获取推广码信息
     * @param $tid
     * @return array
     */
    public function getTidInfo($tid): array
    {
        $tid = trim($tid);
        $verify = 1;
//        if (empty($tid)) {
//            //没有推广码从ip名单获取
//            $ip_model = ip_model::getInstance();
//            $tid = $ip_model->getTid();
//            $verify = 0;
//        }
        //推广码验证
        if (!empty($tid)) {
            $agent = $this->where(['tid' => $tid, 'type' => ['<' => 10], 'status' => ['>' => 0]])->getOne();
            if ($agent && $agent['type'] == 2) {
                //模拟盘
                $data = explode('_', $agent['user_name']);
                $agent = $this->where(['id' => intval($data[1]), 'type' => ['<' => 10], 'status' => ['>' => 0]])->getOne();
            }
            if ($agent) {
                if ($agent['service_status'] != 0) {
                    $GlobalService = GlobalService::getInstance();
                    $GlobalService->service($agent['service_status']);
                }
                if ($agent['layer'] >= 65) {
                    Log::log(['tid' => $tid, 'agent' => $agent, 'msg' => '邀请层级超过65层'], 2, 'regTidErr');
                    return ['code' => -2, 'msg' => '邀请信息异常,请联系客服'];
                }
                return ['code' => 1, 'msg' => '成功', 'pid' => $agent['pid'] . $agent['id'] . ',', 'layer' => $agent['layer'] + 1];
            } else {
                if($verify){
                    Log::log(['tid' => $tid, 'agent' => $agent], 2, 'regTidErr');
                    return ['code' => -2, 'msg' => '邀请码错误'];
                }
            }
        }
        $config_model = config_model::getInstance();
        $system = $config_model->getConfigData(1);
        if ($system['TidSet']==2) {
            //必填
            return ['code' => -2, 'msg' => '请填写邀请码'];
        }
        //设置邀请码必填
        return ['code' => 1, 'msg' => '成功', 'pid' => '', 'layer' => 0];
    }

    //获取推广信息
    public function getTeamInfo($user)
    {
        $layer1 = $user['layer'] + 1;
        $layer2 = $user['layer'] + 2;
        $layer3 = $user['layer'] + 3;
        $res = $this->field("SUM(CASE WHEN layer = {$layer1} THEN 1 ELSE 0 END) AS layer1,SUM(CASE WHEN layer = {$layer2} THEN 1 ELSE 0 END) AS layer2,SUM(CASE WHEN layer = {$layer3} THEN 1 ELSE 0 END) AS layer3,SUM(CASE WHEN layer = {$layer1} AND recharge_amount>=30 THEN 1 ELSE 0 END) AS layerValid1,SUM(CASE WHEN layer = {$layer2} AND recharge_amount>=30 THEN 1 ELSE 0 END) AS layerValid2,SUM(CASE WHEN layer = {$layer3} AND recharge_amount>=30 THEN 1 ELSE 0 END) AS layerValid3")
            ->where([
                'pid' => ['LIKE' => $user['pid'] . $user['id'] . ',%'],
                'layer' => ['<=' => $user['layer'] + 3],
                'status' => ['>=' => 0]
            ])->getOne();
        if ($res['layer1'] !== null) {
            return $res;
        }
        return [
            'layer1' => '0',
            'layer2' => '0',
            'layer3' => '0',
            'layerValid1' => '0',
            'layerValid2' => '0',
            'layerValid3' => '0',
        ];
    }

    //通过pid查询代理列表
    public function getAgentList($pid): array
    {
        if ($pid == '') {
            return [];
        }
        $pidArr = explode(',', rtrim($pid, ','));
        $agentList = [];
        foreach ($pidArr as $parent_id) {
            if (!isset($this->agentList[$parent_id])) {
                $this->agentList[$parent_id] = $this->field('id,type,pid,virtual,user_name,level_id,balance,nick_name,suffix')
                    ->where(['id' => $parent_id])->getOne() ?: (object)[];
            }
            $agentList[] = $this->agentList[$parent_id];
        }
        return $agentList;
    }

    public function getAgent($pid): array
    {
        if ($pid == '') {
            return [];
        }
        $pidArr = explode(',', rtrim($pid, ','));
        $agentList = [];
        if(isset($pidArr[0])){
            //总代理
            $parent_id = $pidArr[0];
            if (!isset($this->agentList[$parent_id])) {
                $this->agentList[$parent_id] = $this->field('id,type,pid,virtual,user_name,level_id,balance,nick_name')
                    ->where(['id' => $parent_id])->getOne() ?: (object)[];
            }
            $agentList[] = $this->agentList[$parent_id];
            //上级代理
            $len = count($pidArr);
            if ($len > 1) {
                $parent_id = $pidArr[$len-1];
                if (!isset($this->agentList[$parent_id])) {
                    $this->agentList[$parent_id] = $this->field('id,type,pid,virtual,user_name,level_id,balance,nick_name')
                        ->where(['id' => $parent_id])->getOne() ?: (object)[];
                }
                $agentList[] = $this->agentList[$parent_id];
            }
        }
        return $agentList;
    }

    /**
     * 修改余额
     * @param int $id 用户id
     * @param float $amount 金额
     * @param string $title 标题
     * @param string $des   描述
     * @param int $type 类型 0-其他 1-充值 2-提现 3-订单 4-店铺订单
     * @param int $key_id 外键
     * @param int $status
     * @return array
     */
    public function changeBalance(int $id, float $amount = 0, string $title = '', string $des = '', int $type = 0, int $key_id = 0, int $status = 1): array
    {
        if ($amount >= 0) {
            $data = "balance=balance+{$amount}";
        } else {
            $data = "balance=balance{$amount}";
        }
        $data .= ',modify_time=' . SYS_TIME;
        $this->where(['id' => $id])->update($data);
        $user = $this->where(['id' => $id])->getOne();
        $GlobalService = GlobalService::getInstance();
        $suffix = $GlobalService->getSuffix();
        $GlobalService->setSuffix('');
        user_amount_model::getInstance()->add([
            'user_id' => $user['id'],
            'mode' => 1,
            'type' => $type,
            'title' => $title,
            'des' => $des,
            'currency' => 'USDT',
            'amount' => $amount,
            'balance' => $user['balance'],
            'key_id' => $key_id,
            'status' => $status
        ]);
        $GlobalService->setSuffix($suffix);
        return ['code' => 1, 'msg' => '成功', 'user' => $user];
    }

    /**
     * 修改合约账户
     * @param int $id 用户id
     * @param float $amount 金额
     * @param string $title 标题
     * @param string $des   描述
     * @param int $type 类型 0-其他 1-充值 2-提现 3-订单 4-店铺订单
     * @param int $key_id 外键
     * @param int $status
     * @return array
     */
    public function changeDeposit(int $id, float $amount = 0, string $title = '', string $des = '', int $type = 0, int $key_id = 0, int $status = 1): array
    {
        if ($amount >= 0) {
            $data = "deposit=deposit+{$amount}";
        } else {
            $data = "deposit=deposit{$amount}";
        }
        $data .= ',modify_time=' . SYS_TIME;
        $this->where(['id' => $id])->update($data);
        $user = $this->where(['id' => $id])->getOne();
        $GlobalService = GlobalService::getInstance();
        $suffix = $GlobalService->getSuffix();
        $GlobalService->setSuffix('');
        user_amount_model::getInstance()->add([
            'user_id' => $user['id'],
            'mode' => 2,
            'type' => $type,
            'title' => $title,
            'des' => $des,
            'currency' => 'USDT',
            'amount' => $amount,
            'balance' => $user['deposit'],
            'key_id' => $key_id,
            'status' => $status
        ]);
        $GlobalService->setSuffix($suffix);
        return ['code' => 1, 'msg' => '成功', 'user' => $user];
    }

    //获取唯一邀请码
    public function getTid(): string
    {
        $tid = Param::getRandStr(6, 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789');
        $res = $this->where(['tid' => $tid])->isExist();
        return $res ? $this->getTid() : $tid;
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

    public function editWithWhereLogic(array $data, array $where = [], $logic='AND')
    {
        if (isset($data['id'])) {
            $where['id'] = intval($data['id']);
            unset($data['id']);
        }
        $data['modify_time'] = SYS_TIME;
        return $this->where($where, $logic)->update($data);
    }

    /**
     * 删除
     * @param $id
     * @param array $where
     * @return array
     */
    public function delById($id, array $where = []): array
    {
        $where['id'] = intval($id);
        $data = $this->where($where)->getOne();
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
