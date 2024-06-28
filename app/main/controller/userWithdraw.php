<?php
/**
 *充值订单回调
 */

namespace main\controller;

use asura\Log;
use asura\Request;
use main\classes\base;
use model\user_balance_model;
use model\user_model;
use service\DPayService;
use service\XuPayService;
use model\user_withdraw_model;
use Exception;

class userWithdraw extends base
{

    public function DPay()
    {
        Log::log(Request::post(), Log::INFO, 'DPayServiceWithdraw');
//        $post=json_decode('{"amount":1.000000,"code":200,"sign":"B3B6D703280751908F38EEB758899247","channelType":"TRC20","stateResult":"SUCCESS","params":"1864339","message":"交易成功","toAddress":"TEJJeAJgzpdiAV7mcUzeXF3PdPtQsYpqEZ","pOrderId":"1190158459012259840818","hx":"5f111d25c471e29fee3b1e5d5b6397a8c9bc4f812dec2bee52d1e1f28e6d25bc","money":1.000000,"mOrderId":"UW1679590195073","fromAddress":"THj7G4bAQ8ViEKm9Y3bEBGJDNqChwnt1dd","merchantNo":"G00282"}',true);
        $post = Request::post();
        $postSign = $post['sign'];
        $post['amount'] = number_format($post['amount'], 6, '.', '');
        $post['money'] = number_format($post['money'], 6, '.', '');
        unset($post['sign']);
        $DPayService = DPayService::getInstance();
        $res = $DPayService->checkSign($post, $postSign);
        if ($res) {
            $user_withdraw_model = user_withdraw_model::getInstance();
            $userWithdraw = $user_withdraw_model->where(['id' => $post['params'], 'order_no' => $post['mOrderId']])->getOne();
            if ($userWithdraw) {
                if ($userWithdraw['status'] == 1) {
                    echo 'SUCCESS';
                    return;
                }
                if ($userWithdraw['status'] == 3) {
                    $data = [
                        'id' => $userWithdraw['id'],
                        'reason' => '',
                        'review_time' => SYS_TIME,
//                        'operator' => 'DPayCallBack'
                    ];
                    //设置为成功
                    if ($post['code'] == 200) {
                        $data['status'] = 1;
                        $data['real_amount'] = $userWithdraw['amount'];
                    } else {
                        $data['status'] = 0;
                        $data['reason'] = $post['message'];
                    }
                    $dbh = $user_withdraw_model->begin();
                    try {
                        $res = $user_withdraw_model->edit($data, ['status' => 3]);
                        if (!$res) {
                            $dbh->rollBack();
                            echo 'STATUS ERROR';
                            return;
                        }
                        if ($data['status'] == 0) {
                            //审核不通过
                            if ($userWithdraw['currency'] == 'USDT') {
                                $user_model = user_model::getInstance();
                                $user_model->changeBalance($userWithdraw['user_id'], $userWithdraw['amount'], $userWithdraw['title'], '提现驳回', 2, $userWithdraw['id']);
                            } else {
                                //其他货币提现
                                $user_balance_model = user_balance_model::getInstance();
                                $res = $user_balance_model->getData($userWithdraw['user_id'], $userWithdraw['currency']);
                                if ($res['code'] != 1) {
                                    $dbh->rollBack();
                                    $this->GlobalService->json($res);
                                }
                                $userBalance = $res['data'];
                                $user_balance_model->changeBalance($userBalance['id'], $userWithdraw['amount'], $userWithdraw['title'], '提现驳回', 2, $userWithdraw['id']);
                            }
                        }
                        $dbh->commit();
                        echo 'SUCCESS';
                    } catch (Exception $e) {
                        $dbh->rollBack();
                        Log::logException($e, 'userWithdrawDPay');
                        echo 'Exception ERROR';
                    }
                    return;
                }
            }
        }
        echo 'ERROR';
    }

    //XuPay回调
    public function XuPay(){
        Log::log(Request::post(), Log::INFO, 'XuPayServiceWithdraw');
//        $post=json_decode('{"amount":1.000000,"code":200,"sign":"B3B6D703280751908F38EEB758899247","channelType":"TRC20","stateResult":"SUCCESS","params":"1864339","message":"交易成功","toAddress":"TEJJeAJgzpdiAV7mcUzeXF3PdPtQsYpqEZ","pOrderId":"1190158459012259840818","hx":"5f111d25c471e29fee3b1e5d5b6397a8c9bc4f812dec2bee52d1e1f28e6d25bc","money":1.000000,"mOrderId":"UW1679590195073","fromAddress":"THj7G4bAQ8ViEKm9Y3bEBGJDNqChwnt1dd","merchantNo":"G00282"}',true);
        $post = Request::post();
        $postSign = $post['sign'];
        $post['amount'] = number_format($post['amount'], 8, '.', '');
        if(isset($post['money'])) $post['money'] = number_format($post['money'], 8, '.', '');
        unset($post['sign']);
        $XuPayService = XuPayService::getInstance();
        $res = $XuPayService->checkSign($post, $postSign);
        ///xm暂时跳过验签
        if ($res && $post['stateResult'] == 'SUCCESS') {
            $user_withdraw_model = user_withdraw_model::getInstance();
            $userWithdraw = $user_withdraw_model->where(['id' => $post['params'], 'order_no' => $post['mOrderId']])->getOne();
            if (!$userWithdraw) {
                echo 'ORDER ERROR';
                $post['errinfo'] = 'ORDER ERROR';
                Log::log($post, Log::ERR, 'XuPayServiceWithdraw');
                return;
            }

            if ($userWithdraw['status'] == 1) {
                echo 'SUCCESS';
                return;
            }
            if ($userWithdraw['status'] != 3) {
                echo 'STATUS ERROR';
                $post['errinfo'] = 'STATUS ERROR';
                Log::log($post, Log::ERR, 'XuPayServiceWithdraw');
                return;
            }

            $data = [
                'id' => $userWithdraw['id'],
                'reason' => '',
                'review_time' => SYS_TIME,
//                        'operator' => 'XuPayCallBack'
            ];
            //设置为成功
            if ($post['code'] == 200) {
                $data['status'] = 1;
                $data['real_amount'] = $userWithdraw['amount'];
            } else {
                $data['status'] = 0;
                $data['reason'] = $post['message'];
            }
            $dbh = $user_withdraw_model->begin();
            try {
                $res = $user_withdraw_model->edit($data, ['status' => 3]);
                if (!$res) {
                    $dbh->rollBack();
                    echo 'STATUS ERROR';
                    $post['errinfo'] = 'STATUS ERROR';
                    Log::log($post, Log::ERR, 'XuPayServiceWithdraw');
                    return;
                }
                if ($data['status'] == 0) {
                    //审核不通过
                    $user_model = user_model::getInstance();
                    $user_model->changeBalance($userWithdraw['user_id'], $userWithdraw['apply_amount'], $userWithdraw['title'], '提现驳回', 2, $userWithdraw['id']);
                    //cron中处理升降级
//                            $agentList = $user_model->getAgentList($res['user']['pid']);
//                            $level_model = level_model::getInstance();
//                            //判断自己升级
//                            $level_model->upLevel($res['user']);
//                            //判断上级代理升级
//                            if ($agentList) {
//                                $level_model->upAgentLevel($agentList);
//                            }
                }
                $dbh->commit();
                echo 'SUCCESS';
                Log::log(['user_id' => $userWithdraw['user_id'], 'order_no' => $post['mOrderId'], 'fromAddress' => $post['fromAddress'], 'toAddress' => $post['toAddress'], 'money' => $post['money'], 'status' => 'SUCCESS'],
                    Log::INFO, 'XuPayServiceWithdraw');
            } catch (Exception $e) {
                $dbh->rollBack();
                //Log::logException($e, 'userWithdrawXuPay');
                echo 'Exception ERROR';
                $post['errinfo'] = 'Exception:' . $e->getMessage();
                Log::log($post, Log::ERR, 'XuPayServiceWithdraw');
            }
            return;
        }
        echo 'SIGN ERROR';
        $post['errinfo'] = 'SIGN ERROR';
        Log::log($post, Log::ERR, 'XuPayServiceWithdraw');
    }


}
