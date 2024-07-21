<?php

/**
 * 幸运飞艇
 * {"issue":"20240712001","drawResult":"04,09,06,02,07,08,10,01,05,03","drawTime":"2024-07-12 13:09:06","code":"xyft"}首期
 * {"issue":"20240712180","drawResult":"04,05,07,01,06,09,08,10,02,03","drawTime":"2024-07-13 04:04:06","code":"xyft"}末期
 */

namespace service\lottery;

use asura\Illuminate\DB;
use model\lottery_group_model;
use model\lottery_played_model;

class xyft
{
    private static $groups = ['冠军','亚军','季军','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];

    private static $interval_time = 300;
    private static $period = 180;
    //玩法玩法组数据生成
    public static function lotteryPlayer($lottery_id,$lottery_room_id)
    {
        return;
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
        $data = [];
        if($lastLotteryData) {
            $nowDay = date('d');
            $lastLotteryDay = date('d',$lastLotteryData['open_time']);
            echo $lastLotteryDay .PHP_EOL;
            $leftDays = $lastLotteryDay - $nowDay;
            if($leftDays >= 3){
                return [];
            }
            if($leftDays < 0){
                $leftDays = abs($leftDays) + 3;
            }
            if($leftDays > 0 && $leftDays < 3){
                $leftDays = 3-$leftDays;
            }

            for($day = 1 ; $day <= $leftDays ; $day++){
                $startDate = date('Y-m-d',$lastLotteryData['open_time'] + 86400 * ($day-1));
                $startTime = $startDate . ' 13:03:00';
                $open_time = strtotime($startTime);
                $open_expect = date('Ymd000',strtotime($startDate));
                $createTime = time();
                for($i=0; $i<self::$period; $i++){
                    $open_expect++;
                    $open_time = $open_time + self::$interval_time;
                    $data[] = [
                        'lottery_id' => $lottery['id'],
                        'open_expect' => $open_expect,
                        'open_code' => '',
                        'open_time' => $open_time,
                        'create_time' => $createTime,
                        'modify_time' => 0,
                    ];
                }
            }
        } else {
            //如果没有，就以今天开始创建

            $createTime = time();
            $data = [];
            for ($day = 1; $day <= 3; $day++) {
                $startTime = date('Y-m-d') . ' 13:03:00';
                $open_time = strtotime($startTime) + 86400 * ($day - 1 );
                $open_expect = date('Ymd000',$open_time);
                for ($i = 0; $i < self::$period; $i++) {
                    $open_expect++;
                    $open_time = $open_time + self::$interval_time;
                    $data[] = [
                        'lottery_id' => $lottery['id'],
                        'open_expect' => $open_expect,
                        'open_code' => '',
                        'open_time' => $open_time,
                        'create_time' => $createTime,
                        'modify_time' => 0,
                    ];
                }
            }
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
        $s = (time() - $today);
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
    public static function zh(array $userBetItem, array $open_code): array
    {

        $betNo = $userBetItem['bet_no'];
        $lotteryGroup = $userBetItem['lottery_group_name'];
        //0-未中奖 1-已中将 2-中奖一半(平局或赔率等有变化的特殊情况)
        $winStatus = 0;
        //中奖号码
        if (is_numeric($betNo)) {//定位胆
            $winStatus = self::resultQDwd($open_code,$lotteryGroup,$betNo);
        }else if(in_array($betNo,['龙','虎'])){
            //TODO:龙虎斗玩法
            $winStatus = self::resultQLhd($open_code,$lotteryGroup,$betNo);
        } else {
            $winStatus = self::resultQDxds($open_code,$lotteryGroup,$betNo);
        }
        return ['code' => 1, 'winStatus' => $winStatus];
    }

    //大小单双
    public static function resultQDxds($openCode,$lotteryGroup,$betNo) {
        $isWin = 0;
        $compDefine = [
            '大' => function ($v) {return in_array($v, [6, 7, 8, 9, 10]) ? true : false;},
            '小' => function ($v) {return in_array($v, [1, 2, 3, 4, 5]) ? true : false;},
            '单' => function ($v) {return in_array($v, [1, 3, 5, 7, 9]) ? true : false;},
            '双' => function ($v) {return in_array($v, [2, 4, 6, 8, 10]) ? true : false;},
        ];

        $getText = function ($v) use ($compDefine) {
            $texts = [];
            foreach ($compDefine as $key => $func) {
                if ($func($v)) {
                    $texts[] = $key;
                }
            }
            return $texts;
        };

        $num = array_search($lotteryGroup,self::$groups);
        if($num === false) return false;
        $localNum = $openCode[$num];
        $texts = $getText($localNum);
        $compFunc = $compDefine[$betNo];
        if ($compFunc($localNum) && in_array($betNo, $texts)) {
            $isWin = true;
        }
        return $isWin;
    }

    //定位胆
    public static function resultQDwd($openCode,$lotteryGroup,$betNo) {
        $num = array_search($lotteryGroup,self::$groups);
        if($num === false) return false;
        $localNum = $openCode[$num];
         return $localNum == $betNo;
    }

    // 龙虎斗
    public static function resultQLhd($openCode,$lotteryGroup,$betNo) {
        $index = array_search($lotteryGroup,self::$groups);
        if($index === false) return false;
        $localNum = $openCode[$index];
        $compareIndex = 9 - $index;
        $compareNum = $openCode[$compareIndex];
        $compDefine = [
            '龙' => function ($v1, $v2) {return $v1 > $v2 ? true : false;},
            '虎' => function ($v1, $v2) {return $v1 < $v2 ? true : false;},
        ];
        $compFunc = $compDefine[$betNo];
        if ($compFunc($localNum, $compareNum)) {
            return true;
        }
        return false;
    }

    public static function getRandomOpenCode(){
        $range = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
        shuffle($range);
        return join(',', $range);
    }

    public static function genLotteryPlayed(){
        $ranks = ['冠军','亚军','季军','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];
        $plays = ['大','小','单','双'];
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
//        $groups = DB::table('lottery_group')->where('lottery_id',8)->where('lottery_room_id',47)->get();
        DB::table('lottery_group')->where('lottery_id',8)->get()->each(function($item) use($plays){
            $datas = [];
            foreach ($plays as $play){
                $data = [];
                $data['lottery_id'] = 8;
                $data['lottery_group_id'] = $item->id;
                $data['lottery_room_id'] = $item->lottery_room_id;
                $data['name'] = $play;
                if($item->lottery_room_id == 47){
                    $data['odds'] = 1.90;
                }elseif($item->lottery_room_id == 48){
                    $data['odds'] = 1.92;
                }else{
                    $data['odds'] = 1.95;
                }
                $data['status'] = 1;
                array_push($datas,$data);
            }
            DB::table('lottery_played')->insert($datas);
        });

    }


    public static function genLotteryPlayedDwd(){
        $ranks = ['冠军','亚军','季军','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];
        $plays = ['01','02','03','04','05','06','07','08','09','10'];
        $odds = 9.90;//9.0，9.2，9.5

        $lotteryIds = [4,5,6];
        DB::table('lottery_group')->where('lottery_id',8)->get()->each(function($item) use($plays){
            $datas = [];
            foreach ($plays as $play){
                $data = [];
                $data['lottery_id'] = 8;
                $data['lottery_group_id'] = $item->id;
                $data['lottery_room_id'] = $item->lottery_room_id;
                $data['name'] = $play;
                if($item->lottery_room_id == 47){
                    $data['odds'] = 9.0;
                }elseif($item->lottery_room_id == 48){
                    $data['odds'] = 9.2;
                }else{
                    $data['odds'] = 9.5;
                }
                $data['status'] = 1;
                array_push($datas,$data);
            }
            DB::table('lottery_played')->insert($datas);
        });

    }

    public static function zhold(string $betNo, array $open_code): array
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


}
