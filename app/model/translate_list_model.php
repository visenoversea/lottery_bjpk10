<?php
//

namespace model;

use asura\db\Model;
use service\GoogleTranslateService;

class translate_list_model extends Model
{
    protected static $instance;

    public function translate(): array
    {
        return $this->belongsTo(translate_model::class, 'md5', 'md5');
    }

    /**
     * 获取翻译数据
     * 语言列表参考       https://cloud.google.com/translate/docs/languages
     * @param int $type 0-文本 1-富文本 2-图片不翻译
     * @param string $content 要翻译的内容不能超过5000
     * @param string $tl 目标语言
     * @param array $replace 翻译后替换的变量
     * @param null $sl 被翻译的语言
     * @return string
     */
    public function getTranslateData(int $type, string $content, string $tl, array $replace = [], $sl = null): string
    {
        if (!$content) {
            return $content;
        }
        $info = $this->getInfo($type, $content, $tl, $sl);
        if ($info) {
            $tl_content = $info['tl_content'];
        } else {
            $tl_content = $content;
        }
        if ($replace) {
            $tl_content = str_replace(array_keys($replace), array_values($replace), $tl_content);
        }
        return $tl_content;
    }

    public function getInfo(int $type, string $content, string $tl, $sl = null)
    {
        $md5 = md5($content);
        $data = $this->where(['md5' => $md5, 'type' => $type, 'tl' => $tl])->getOne();
        if ($data) {
            //返回翻译结果
            if ($data['status'] > 0) {
                //直接获取翻译结果
                return $data;
            } else if ($data['err_nums'] >= 20 || $type == 2 || $data['modify_time'] > (SYS_TIME - 900)) {
                //暂不翻译
                return $data;
            } else {
                //开始翻译
                $GoogleTranslateService = GoogleTranslateService::getInstance();
                $tl_content = $GoogleTranslateService->translate($content, $tl, $sl);
                if ($tl_content) {
                    //翻译成功
                    $this->edit(['id' => $data['id'], 'tl_content' => $tl_content, 'status' => 1]);
                    $data['tl_content'] = $tl_content;
                } else {
                    //翻译失败
                    $this->edit(['id' => $data['id'], 'err_nums' => $data['err_nums'] + 1]);
                }
                return $data;
            }
        } else {
            if ($type == 2) {
                //图片不翻译
                $tl_content = $content;
            } else {
                $GoogleTranslateService = GoogleTranslateService::getInstance();
                $tl_content = $GoogleTranslateService->translate($content, $tl, $sl);
            }
            //新增
            $translate_model = translate_model::getInstance();
            $translate_model->addData($type, $md5, $content);
            $data = ['md5' => $md5, 'type' => $type, 'tl' => $tl];
            if ($tl_content) {
                //翻译成功
                $data['status'] = 1;
                $data['tl_content'] = $tl_content;
            } else {
                //翻译失败
                $data['err_nums'] = 1;
                $data['status'] = 0;
                $data['tl_content'] = $content;
            }
//            $data['id'] = $this->add($data);
            return $data;
        }
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
        $res = $this->where(['id' => $data['id']])->del();
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
