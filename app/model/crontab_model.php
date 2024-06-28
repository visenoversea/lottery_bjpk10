<?php
//

namespace model;

use asura\db\Model;
use Cron\CronExpression;
use Exception;

class crontab_model extends Model
{
    protected static $instance;

    //数据验证
    public function checkData($data): array
    {
        if (empty($data['title'])) {
            return ['code' => -2, 'msg' => '标题不能为空'];
        }
        if (empty($data['expression'])) {
            return ['code' => -2, 'msg' => '表达式不能为空'];
        }
        if ($data['second']<0||$data['second']>15) {
            return ['code' => -2, 'msg' => '执行设定异常'];
        }
        if (!CronExpression::isValidExpression($data['expression'])) {
            return ['code' => -2, 'msg' => '表达式格式错误'];
        }
        return ['code' => 1, 'msg' => '成功'];
    }

    //开启定时任务
    public function start($fn)
    {
        $list = $this->where(['fn' => $fn, 'status' => 0])->select();
        foreach ($list as $v) {
            $cron = new CronExpression($v['expression']);
            if ($v['second'] > 0 && $cron->isDue()) {
                //秒级任务
                $runTime = SYS_TIME;
            } else {
                try {
                    $runTime = strtotime($cron->getNextRunDate()->format('Y-m-d H:i:s'));
                } catch (Exception $e) {
                    //异常
                    $crontab_log_model = crontab_log_model::getInstance();
                    $crontab_log_model->addLog($v['id'], "Start获取下次执行时间异常,表达式:{$v['expression']},错误信息:{$e->getMessage()}");
                    continue;
                }
            }
            $this->edit(['id' => $v['id'], 'run_time' => $runTime, 'status' => 1], ['status' => 0]);
        }
    }

    //获取下一次运行时间
    public function getNextRunTime($expression)
    {
        $cron = new CronExpression($expression);
        $date = $cron->getNextRunDate()->format('Y-m-d H:i:s');
        return strtotime($date);
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
