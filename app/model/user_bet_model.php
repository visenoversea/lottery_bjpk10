<?php
//

namespace model;

use asura\Common;
use asura\db\Model;

class user_bet_model extends Model
{
    protected static $instance;

    public function user(): array
    {
        return $this->belongsTo(user_model::class, 'user_id');
    }

    public function lottery(): array
    {
        return $this->belongsTo(lottery_model::class, 'lottery_id');
    }

    //获取开奖数据统计
    public function getRiskData($lottery_id, $open_expect)
    {
        $data = [
            '大' => 0, '小' => 0, '单' => 0, '双' => 0, '大单' => 0, '小单' => 0, '大双' => 0, '小双' => 0,
            '豹子' => 0, '顺子' => 0, '对子' => 0,
            '1' => 0, '2' => 0, '3' => 0, '4' => 0, '5' => 0, '6' => 0, '7' => 0, '8' => 0, '9' => 0,
            '10' => 0, '11' => 0, '12' => 0, '13' => 0, '14' => 0, '15' => 0, '16' => 0, '17' => 0, '18' => 0,
            '19' => 0, '20' => 0, '21' => 0, '22' => 0, '23' => 0, '24' => 0, '25' => 0, '26' => 0, '27' => 0,
        ];
        $list = $this->field('ubi.bet_no,SUM(ubi.bet_amount*ubi.odds) AS winAmount')->alias('ub')
            ->join('user_bet_item ubi', 'ubi.user_bet_id=ub.id')
            ->join('user u', 'u.id=ub.user_id AND u.virtual=0')
            ->where(['ub.status' => 2, 'ub.lottery_id' => $lottery_id, 'open_expect' => $open_expect])
            ->group('ubi.bet_no')
            ->select();
        if (!$list) {
            //无需风控,没有订单
            return '';
        }
        foreach ($list as $v) {
            $data[$v['bet_no']] = $v['winAmount'];
        }
        $open = $this->getMinRand([
            '小单' => $data['小单'] + $data['小'] + $data['单'],
            '大单' => $data['大单'] + $data['大'] + $data['单'],
            '小双' => $data['小双'] + $data['小'] + $data['双'],
            '大双' => $data['大双'] + $data['大'] + $data['双'],
        ]);
        if ($open == '小单') {
            $openCodeArr = [
                '1' => $data['1'], '3' => $data['3'], '5' => $data['5'], '7' => $data['7'],
                '9' => $data['9'], '11' => $data['11'], '13' => $data['13']
            ];
            if ($data['对子'] > 0) {
                unset($openCodeArr['1']);
                if ($data['顺子'] > 0 && $data['豹子'] > 0) {
                    unset($openCodeArr['3']);
                }
            }
        } else if ($open == '大单') {
            $openCodeArr = [
                '15' => $data['15'], '17' => $data['17'], '19' => $data['19'], '21' => $data['21'],
                '23' => $data['23'], '25' => $data['25'], '27' => $data['27']
            ];
            if ($data['豹子'] > 0 || mt_rand(1, 10) < 8) {
                //豹子不中奖
                unset($openCodeArr['27']);
            }
            if ($data['对子'] > 0) {
                unset($openCodeArr['27']);
                unset($openCodeArr['25']);
            }
        } else if ($open == '小双') {
            $openCodeArr = [
                '0' => $data['0'], '2' => $data['2'], '4' => $data['4'], '6' => $data['6'],
                '8' => $data['8'], '10' => $data['10'], '12' => $data['12']
            ];
            if ($data['豹子'] > 0 || mt_rand(1, 10) < 8) {
                //豹子不中奖
                unset($openCodeArr['0']);
            }
            if ($data['对子'] > 0) {
                unset($openCodeArr['0']);
                unset($openCodeArr['2']);
            }
        } else if ($open == '大双') {
            $openCodeArr = [
                '14' => $data['14'], '16' => $data['16'], '18' => $data['18'], '20' => $data['20'],
                '22' => $data['22'], '24' => $data['24'], '26' => $data['26']
            ];
            if ($data['对子'] > 0) {
                unset($openCodeArr['26']);
                if ($data['顺子'] > 0 && $data['豹子'] > 0) {
                    unset($openCodeArr['24']);
                }
            }
        } else {
            //异常
            return '';
        }
        $zh = $this->getMinRand($openCodeArr);
        $zh = intval($zh);
        $openCode = [];
        //计算开奖结果
        if ($data['对子'] > 0) {
            if ($zh == 3) {
                if ($data['顺子'] == 0) {
                    $openCode = [0, 1, 2];
                } else if ($data['豹子'] == 0) {
                    $openCode = [1, 1, 1];
                }
            } else if ($zh == 4) {
                $openCode = [0, 1, 3];
            } else if ($zh == 24) {
                if ($data['顺子'] == 0) {
                    $openCode = [7, 8, 9];
                } else if ($data['豹子'] == 0) {
                    $openCode = [8, 8, 8];
                }
            }
        }
        if (!$openCode) {
            $openCode[0] = mt_rand(0, $zh);
            $zh = $zh - $openCode[0];
            $openCode[1] = mt_rand(0, $zh);
            $openCode[2] = $zh - $openCode[1];
        } else {
            //打乱
            shuffle($openCode);
        }
        if ($data['豹子'] > 0) {
            if ($openCode[0] == $openCode[1] && $openCode[1] == $openCode[2]) {
                $openCode[0] -= 1;
                $openCode[mt_rand(1, 2)] += 1;
            }
        }
        if ($data['顺子'] > 0) {
            sort($openCode);
            if (($openCode[0] + 1) == $openCode[1] && ($openCode[1] + 1) == $openCode[2]) {
                //是顺子  修改结果要求不是豹子
                if ($openCode[2] == 9) {
                    //7,8,9
                    $openCode[0] -= 1;
                    $openCode[1] += 1;
                } else {
                    $openCode[1] -= 1;
                    $openCode[2] += 1;
                }
                shuffle($openCode);
            }
        }
        return implode(',', $openCode);
    }

    public function getMinRand($data)
    {
        $min = '';
        $arr = [];
        foreach ($data as $k => $v) {
            if ($min === '') {
                $min = $v;
                $arr = [$k];
            } else {
                if ($v === $min) {
                    $arr[] = $k;
                } else if ($v < $min) {
                    $min = $v;
                    $arr = [$k];
                }
            }
        }
        return $arr[array_rand($arr)];
    }

    //获取用户充值信息
    public function sumInfo($where=[],$userWhere=[]): array
    {
        $res = $this->field('SUM(bet_amount) AS betBmount,SUM(win_amount) as winAmount')
            ->where($where)
            ->hasWhere('user',$userWhere)
            ->getOne();
        return [
            'betBmount' => $res['betBmount']?Common::formatAmount($res['betBmount'],2):'0.00',
            'winAmount' => $res['winAmount']?Common::formatAmount($res['winAmount'],2):'0.00',
        ];
    }

    public function sumUserAgentInfo($userWhere, $where = []): array
    {
        $where['status'] = 1;
        $res = $this->field('SUM(bet_amount) AS betAmount,SUM(win_amount) as winAmount')
            ->hasWhere('user', $userWhere)
            ->where($where)
            ->getOne();
        return [
            'betAmount' => $res['betAmount']?Common::formatAmount($res['betAmount'],2):'0.00',
            'winAmount' => $res['winAmount']?Common::formatAmount($res['winAmount'],2):'0.00',
        ];
    }

    //数据验证
    public function checkData($data): array
    {
        return ['code' => 1, 'msg' => '成功'];
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
        $res = $this->edit(['status' => -1], $where);
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
