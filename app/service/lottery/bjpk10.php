<?php

/**
 * 快三派奖类
 */

namespace service\lottery;

use asura\Illuminate\DB;
use model\lottery_group_model;
use model\lottery_played_model;

class bjpk10
{
    //玩法玩法组数据生成
    public static function lotteryPlayer($lottery_id,$lottery_room_id)
    {
        //彩种id
        $lottery_group_model = lottery_group_model::getInstance();
        $lottery_played_model = lottery_played_model::getInstance();
        $list = [
            [
                'name' => '大小单双',
                'fn' => 'zh',
                'lotteryPlayedList' => [
                    ['name' => '大', 'odds' => 1.98],
                    ['name' => '小', 'odds' => 1.98],
                    ['name' => '单', 'odds' => 1.98],
                    ['name' => '双', 'odds' => 1.98],
                    ['name' => '大单', 'odds' => 3.8],
                    ['name' => '小单', 'odds' => 3.8],
                    ['name' => '大双', 'odds' => 3.8],
                    ['name' => '小双', 'odds' => 3.8],
                ]
            ],
            [
                'name' => '数字',
                'fn' => 'zh',
                'lotteryPlayedList' => [
                    ['name' => '0', 'odds' => 188],
                    ['name' => '1', 'odds' => 100],
                    ['name' => '2', 'odds' => 20],
                    ['name' => '3', 'odds' => 19],
                    ['name' => '4', 'odds' => 18],
                    ['name' => '5', 'odds' => 17],
                    ['name' => '6', 'odds' => 16],
                    ['name' => '7', 'odds' => 15],
                    ['name' => '8', 'odds' => 14],
                    ['name' => '9', 'odds' => 14],
                    ['name' => '10', 'odds' => 13],
                    ['name' => '11', 'odds' => 13],
                    ['name' => '12', 'odds' => 12],
                    ['name' => '13', 'odds' => 11],
                    ['name' => '14', 'odds' => 11],
                    ['name' => '15', 'odds' => 12],
                    ['name' => '16', 'odds' => 13],
                    ['name' => '17', 'odds' => 13],
                    ['name' => '18', 'odds' => 14],
                    ['name' => '19', 'odds' => 14],
                    ['name' => '20', 'odds' => 15],
                    ['name' => '21', 'odds' => 16],
                    ['name' => '22', 'odds' => 17],
                    ['name' => '23', 'odds' => 18],
                    ['name' => '24', 'odds' => 19],
                    ['name' => '25', 'odds' => 20],
                    ['name' => '26', 'odds' => 100],
                    ['name' => '27', 'odds' => 188],
                ]
            ],
            [
                'name' => '特殊投法',
                'fn' => 'zh',
                'lotteryPlayedList' => [
                    ['name' => '豹子', 'odds' => 40],
                    ['name' => '顺子', 'odds' => 9],
                    ['name' => '对子', 'odds' => 3],
                ]
            ],
        ];
        foreach ($list as $v) {
            $lottery_group_id = $lottery_group_model->add([
                'lottery_id' => $lottery_id,
                'lottery_room_id' => $lottery_room_id,
                'name' => $v['name'],
                'fn' => $v['fn'],
                'status' => 1
            ]);
            foreach ($v['lotteryPlayedList'] as $val) {
                $lottery_played_model->add([
                    'lottery_id' => $lottery_id,
                    'lottery_group_id' => $lottery_group_id,
                    'lottery_room_id' => $lottery_room_id,
                    'name' => $val['name'],
                    'odds' => $val['odds'],
                    'status' => 1
                ]);
            }
        }
    }

    /**
     * @param $lottery
     * @param array $lastLotteryData 最后一条开奖数据
     * @param mixed $endTime
     * @return array[]
     */
    public static function createData($lottery, array $lastLotteryData = [], $endTime = SYS_TIME): array
    {
        if ($lastLotteryData) {
            $open_time = $lastLotteryData['open_time'];
            $open_expect = $lastLotteryData['open_expect'];
        } else {
            $open_time = strtotime('today');
            if ($lottery['interval_time'] < 90) {
                $open_expect = date('Ymd0000');
            } else {
                $open_expect = date('Ymd000');
            }
        }
        $data = [];
        while (($open_time + $lottery['interval_time']) <= $endTime) {
            //开奖时间当天0点的时间戳
            $open_day = strtotime(date('Ymd', $open_time));
            if ($open_time == $open_day) {
                //第一期
                $open_time = $open_day + $lottery['interval_time'];
                if ($lottery['interval_time'] < 90) {
                    $open_expect = date('Ymd0001', $open_time);
                } else {
                    $open_expect = date('Ymd001', $open_time);
                }
            } else {
                $open_time += $lottery['interval_time'];
                //下期开奖期号
                $open_expect++;
            }
            $data[] = [
                'lottery_id' => $lottery['id'],
                'open_expect' => $open_expect,
                'open_code' => self::getRandomOpenCode(),
                'open_time' => $open_time,
                'create_time' => $open_time,
                'modify_time' => $open_time,
            ];
        }
        return ['code' => 1, 'msg' => '成功', 'data' => $data];
    }

    /**
     * 获取下一期数据
     * @param array $lottery
     * @return array
     */
    public static function getNextExpect(array $lottery = []): array
    {
        if ($lottery['type'] == 1) {
            //官方彩
            return ['code' => 1, 'msg' => '成功', 'next' => (object)[]];
        }
        $today = strtotime('today');
        //今日凌晨与当前时间差秒数
        $s = (SYS_TIME - $today);
        if ($s == 0) {
            $nums = 1;
        } else {
            $nums = floor($s / $lottery['interval_time']) + 1;
        }
        //下一期开奖时间
        $open_time = $today + $lottery['interval_time'] * $nums;
        if ($lottery['interval_time'] < 90) {
            $open_expect = date('Ymd0000', $today) + $nums;
        } else {
            $open_expect = date('Ymd000', $today) + $nums;
        }
        $next = [
            'lottery_id' => $lottery['id'],
            'open_expect' => $open_expect,
            'open_time' => $open_time
        ];
        return ['code' => 1, 'msg' => '成功', 'next' => $next];
    }

    /**
     * 总和
     * @param string $betNo     下注号码
     * @param array $open_code 开奖号码
     * @return array
     */
    public static function zh(string $betNo, array $open_code): array
    {
        //0-未中奖 1-已中将 2-中奖一半(平局或赔率等有变化的特殊情况)
        $winStatus = 0;
        $hz = array_sum($open_code);
        //中奖号码
        if (is_numeric($betNo)) {
            if ($hz == $betNo) {
                $winStatus = 1;
            }
        } else {
            if ($betNo == '大') {
                if ($hz >= 14) {
                    $winStatus = 1;
                }
            } else if ($betNo == '小') {
                if ($hz <= 13) {
                    $winStatus = 1;
                }
            } else if ($betNo == '单') {
                if ($hz % 2 != 0) {
                    $winStatus = 1;
                }
            } else if ($betNo == '双') {
                if ($hz % 2 == 0) {
                    $winStatus = 1;
                }
            } else if ($betNo == '大单') {
                if ($hz >= 14 && $hz % 2 != 0) {
                    $winStatus = 1;
                }
            } else if ($betNo == '大双') {
                if ($hz >= 14 && $hz % 2 == 0) {
                    $winStatus = 1;
                }
            } else if ($betNo == '小单') {
                if ($hz <= 13 && $hz % 2 != 0) {
                    $winStatus = 1;
                }
            } else if ($betNo == '小双') {
                if ($hz <= 13 && $hz % 2 == 0) {
                    $winStatus = 1;
                }
            } else if ($betNo == '豹子') {
                if ($hz == 27) {
                    $winStatus = 1;
                }
            } else if ($betNo == '顺子') {
                sort($open_code);
                if (($open_code[0] + 1) == $open_code[1] && ($open_code[1] + 1) == $open_code[2]) {
                    $winStatus = 1;
                }
            } else if ($betNo == '对子') {
                if ($open_code[0] == $open_code[1] || $open_code[1] == $open_code[2] || $open_code[0] == $open_code[2]) {
                    $winStatus = 1;
                }
            }
        }
        return ['code' => 1, 'winStatus' => $winStatus];
    }

    public static function getRandomOpenCode(){
        $range = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
        shuffle($range);
        return join(',', $range);
    }

    public static function genLotteryPlayed(){
        $ranks = ['冠亚和','冠军','亚军','季军','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];
        $plays = ['大','小','单','双','龙','虎'];
        $odds = 1.98;
//        $odds = [
//            '大'=>1.98,
//            '小',
//            '单',
//            '双',
//            '龙',
//            '虎'
//        ];
        $lotteryIds = [4,5,6];
        DB::table('lottery_group')->where('lottery_id',4)->get()->each(function($item) use($plays){
            $datas = [];
            foreach ($plays as $play){
                $data = [];
                $data['lottery_id'] = 4;
                $data['lottery_group_id'] = $item->id;
                $data['lottery_room_id'] = 41;
                $data['name'] = $play;
                $data['odds'] = 1.98;
                $data['status'] = 1;
                array_push($datas,$data);
            }
            DB::table('lottery_played')->insert($datas);
        });



    }
}
