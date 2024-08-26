import qs from 'qs'
import axios from 'axios';
import { Toast } from 'vant'
// pinia要从store.js导入 不然会出现错误 和base.js共用一个pinia实例
import pinia from '@/store/store'
import useStore from '@/store/index.js'
var store = useStore(pinia)

// 环境
const MODE = import.meta.env.MODE
console.log("🚀 ~ file: api.js ~ line 5 ~ MODE", MODE)

axios.defaults.baseURL = MODE == 'development' ? '/api' : ''
axios.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['token'] = store.token
  config.headers['lang'] = store.lang
  if(config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
    config.data = qs.stringify(config.data)
  }
  return config
},error => {
  return Promise.reject(error)
})


axios.interceptors.response.use(response => {
  store.loadingShow = false
  if (response.data.code === -1 ) { //没登陆 或者token过期
    if(store.token){
      Toast(response.data.msg)
      setTimeout(()=>{
        store.logout()
      },1500)
    }else{
      store.logout()
    }
  }else if(response.data.code === -2 ) {
    Toast(response.data.msg)
  }
  return response
},error => {
  store.loadingShow = false
  //Toast('Network Err:'+error.response.status)
  return Promise.reject(error)
})

const handleResponse = (data) => {
  if(data.data.code < 0) return Object.assign(data, { success: false })
  return Object.assign(data, { success: true })
}

// post 请求 表单格式
export const apiFormPostData = async (url, params = {}) => handleResponse(await axios.post(url, qs.stringify(params),  { headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}} ))

// post 请求 json格式
export const apiPostData = async (url, params = {},baseURL) => handleResponse(await axios.post(url, params,{baseURL: baseURL || (MODE == 'development' ? '/api' : '')}))

// post 请求 上传文件
export const apiPostFile = async (url, params ={}) => handleResponse(await axios.post(url, params, { headers: {'Content-Type': 'multipart/form-data' }}))

// 获取初始化
export const apiGetConfig = (params) => apiPostData('/main/index/init', params)

// 加载语言包
export const apiLoadLanguage =  (params) => apiPostData('/main/lang/getData', params)

// 发送邮箱验证码
export const apiSendEmailCode = (params) => apiPostData('/main/send/getEmailCode', params)

// 注册 三合一
export const apiRegister = (params) => apiPostData('/main/user/reg', params)

// 发送手机验证码
export const apiSendMobileCode = (params) => apiPostData('/main/send/getMobileCode', params)

// 登录 三合一
export const apiLogin = (params) => apiPostData('/main/user/login', params)

// 获取客服配置
export const apiGetKefuConfig = (params) => apiPostData('/main/config/getInfo', params)

// 忘记密码
export const apiForgetPwd = (params) => apiPostData('/main/user/forgot', params)

// 获取用户信息
export const apiGetUserInfo = (params) => apiPostData('/home/user/getInfo', params)

// 身份认证接口
export const apiRealName = (params) => apiPostData('/home/userReal/add', params)

// 获取OSS key
export const apiGetOssKey = (params) => apiPostData('/home/upload/getSts', params)

// 绑定邮箱
export const apiBindEmail = (params) => apiPostData('/home/user/editEmail', params)

// 绑定手机
export const apiBindMobile = (params) => apiPostData('/home/user/editMobile', params)

// 获取电话区号列表
export const apiGetAreaList = (params) => apiPostData('/main/countryArea/getList', params)

// 修改登录密码
export const apiChangeLoginPwd = (params) => apiPostData('/home/user/editPassword', params)

// 修改资金密码
export const apiChangeTradePwd = (params) => apiPostData('/home/user/editFundPassword', params)


// 获取银行卡列表
export const apiGetBankList = (params) => apiPostData('/home/userBank/getList', params)

// 添加银行卡
export const apiAddBank = (params) => apiPostData('/home/userBank/add', params)

// 解绑银行卡
export const apiDeleteBank = (params) => apiPostData('/home/userBank/del', params)

// 根据id获取银行卡信息
export const apiGetBankInfo = (params) => apiPostData('/home/userBank/getInfo', params)

// 编辑银行卡
export const apiEditBank = (params) => apiPostData('/home/userBank/edit', params)

// 添加钱包
export const apiAddWalletAddress = (params) => apiPostData('/home/userWallet/add', params)

// 编辑钱包
export const apiEidtWalletAddress = (params) => apiPostData('/home/userWallet/edit', params)

// 根据钱包id获取信息
export const apiGetWalletAddressInfo = (params) => apiPostData('/home/userWallet/getInfo', params)

// 删除钱包
export const apiDelWalletAddress = (params) => apiPostData('/home/userWallet/del', params)

// 获取钱包列表
export const apiGetWalletAddressList = (params) => apiPostData('/home/userWallet/getList', params)

// 获取钱包配置
export const apiGetWalletConfig = (params) => apiPostData('/home/trade/getWalletConfig', params)

// 获取充值通道
export const apiGetRechargeList = (params) => apiPostData('/home/trade/getRechargeList', params)

// 获取提现通道
export const apiGetCashOutList = (params) => apiPostData('/home/trade/getWithdrawList', params)

// 获取充值的信息
export const apiGeRechargeInfo = (params) => apiPostData('/home/trade/getInfo', params)

// 网银充值完成转账
export const apiBankFinishPay = (params) => apiPostData('/home/userRecharge/add2', params)

// 获取提现信息
export const apiGetCashoutInfo = (params) => apiPostData('/home/trade/getInfo', params)

// 提现
export const apiCashout = (params) => apiPostData('/home/userWithdraw/add2', params)

// 充值记录
export const apiGetRechargeHistory = (params) => apiPostData('/home/userRecharge/getList', params)

// 提现记录
export const apiGetCashoutHistory = (params) => apiPostData('/home/userWithdraw/getList', params)

// 获取公告列表
export const apiGetNoticeList = (params) => apiPostData('/main/article/getNoticeList', params)

// 获取帮助中心
export const apiGetHelpCenterList = (params) => apiPostData('/main/article/getHelpList', params)

// 获取公告 新闻详情
export const apiGetNoticeInfo = (params) => apiPostData('/main/article/getInfo', params)

// 获取新闻列表
export const apiGetNewsList = (params) => apiPostData('/main/article/getNewsList', params)

// 站内信列表
export const apiGetZhanNeiList = (params) => apiPostData('/home/userMsg/getList', params)

// 站内信全部已读
export const apiGetZhanNeiAllRead = (params) => apiPostData('/home/userMsg/setAllRead', params)

// 站内信信息
export const apiGetZhanNeiInfo = (params) => apiPostData('/home/userMsg/getInfo', params)

// 单条删除站内信
export const apiDelZhanNeiItem = (params) => apiPostData('/home/userMsg/del', params)

// 全部删除站内信
export const apiDelZhanNeiAll = (params) => apiPostData('/home/userMsg/delAll', params)

// 获取未读消息数量
export const apiGetWeiDuMsgNums = (params) => apiPostData('/home/userMsg/getReadNums', params)

// 修改用户头像
export const apiChangeAvatar =  (params) => apiPostData('/home/user/edit', params)



// 获取板块列表
export const apiGetPartList = (params) => apiPostData('/main/product/getTypeList', params)

// 获取币种列表
export const apiGetProductList = (params) => apiPostData('/main/product/getList', params)

// 获取产品信息
export const apiGetKlineData = (params) => apiPostData('/main/product/getInfo', params)

// 添加自选
export const apiCollectProduct = (params) => apiPostData('/home/userProduct/add', params)

// 删除自选
export const apiDelCollectProduct = (params) => apiPostData('/home/userProduct/del', params)

// 批量添加删除
export const apiBatchCollectProduct = (params) => apiPostData('/home/userProduct/batchAdd', params)

// 获取搜索列表
export const apiSearchList = (params) => apiPostData('/main/product/getSearchList', params)

// 获取账变
export const apiMyBillList = (params) => apiPostData('/home/userAmount/getList', params)

// 期权下单
export const apiQiQuanDownOrder = (params) => apiPostData('/home/userProductTime/add', params)

// 期权单个订单
export const apiGetQiQuanOrderItem = (params) => apiPostData('/home/userProductTime/getInfo', params)

// 合约下单
export const apiHeYueDownOrder = (params) => apiPostData('/home/userProductContract/add', params)

// 点位下单
export const apiPointDownOrder = (params) => apiPostData('/home/userProductPoint/add', params)

// 获取期权订单列表
export const apiGetQiQuanOrderList = (params) => apiPostData('/home/userProductTime/getList', params)

// 获取合约订单列表
export const apiHeYueOrderList = (params) => apiPostData('/home/userProductContract/getList', params)

// 取消委托
export const apiCancelHeYueOrder = (params) => apiPostData('/home/userProductContract/cancel', params)

// 获取诈骗弹窗
export const apiGetZaPianInfo = (params) => apiPostData('/main/userMsg/getInfo', params)

// 合约平仓
export const apiPingHeYueOrder = (params) => apiPostData('/home/userProductContract/sell', params)

// 点位订单列表
export const apiGetPointOrderList = (params) => apiPostData('/home/userProductPoint/getList', params)

// 调整保证金
export const apiChangeBond = (params) => apiPostData('/home/userProductContract/setAmount', params)

// 止损止盈
export const apiZhiSunZhiYing = (params) => apiPostData('/home/userProductContract/setSellPrice', params)

// 获取锁仓挖矿描述
export const apiGetWaKuangDesInfo = (params) => apiPostData('/main/mining/getRule', params)

// 获取锁仓挖矿余额
export const apiGetWaKuangBalance = (params) => apiPostData('/home/userMining/getTotalInfo', params)

// 获取锁仓挖矿产品列表
export const apiGetWaKuangProductList = (params) => apiPostData('/main/mining/getList', params)

// 获取锁仓挖矿产品列表
export const apiGetWaKuangProductItem = (params) => apiPostData('/main/mining/getInfo', params)

// 锁仓挖矿
export const apiWaKuang = (params) => apiPostData('/home/userMining/add', params)

// 挖矿申请认购
export const apiShengQingRenGou = (params) => apiPostData('/home/userMining/apply', params)


// 获取挖矿列表
export const apiWaKuangOrderList = (params) => apiPostData('/home/userMining/getList', params)

// 挖矿提前赎回
export const apiWaKuangOrderShuHui = (params) => apiPostData('/home/userMining/back', params)


// 获取余额今日收益
export const apiGetFinanceProfit = (params) => apiPostData('/home/user/getTotalInfo', params)

// 模拟账号
export const apiSwitchMoNi = (params) => apiPostData('/home/user/setDisk', params)

// 模拟账号重置余额
export const apiMoniResetBalance = (params) => apiPostData('/home/user/resetBalance', params)

// 获取多钱包余额列表
export const apiGetDuoWalletList = (params) => apiPostData('/home/user/getBalanceList', params)

// 划转
export const apiHuaZhuan = (params) => apiPostData('/home/user/transfer', params)

// 兑换
export const apiExchange = (params) => apiPostData('/home/userExchange/add', params)

// 兑换订单列表
export const apiExchangeOrderList = (params) => apiPostData('/home/userExchange/getList', params)

// 获取默认币种的数据
export const apiGetDefaultProduct = (params) => apiPostData('/main/product/getDefault', params)

// 币币交易
export const apiBiBiTrade = (params) => apiPostData('/home/userProductTrade/add', params)

// 币币交易订单
export const apiBiBiTradeOrderList = (params) => apiPostData('/home/userProductTrade/getList', params)

// 币币交易取消委托
export const apiCancelBiBiOrder = (params) => apiPostData('/home/userProductTrade/cancel', params)

// 获取挖矿问题
export const apiGetWakuangProblemList =  (params) => apiPostData('/main/article/getMiningList', params)

// 获取推广总数
export const apiGetTotalTuiGuang = (params) => apiPostData('/home/userRebate/getSpreadInfo', params)

// 获取推广一代二代三代列表
export const apiGetTuiGuangList = (params) => apiPostData('/home/userRebate/getUserList', params)

// 获取推广佣金详情列表
export const apiGetTuiGuangDetailList = (params) => apiPostData('/home/userRebate/getList', params)

// 钱包登录
export const apiWalletLogin = (params) => apiPostData('/main/user/walletLogin', params)

// 获取实名认证证件类型
export const apiGetUserRealTypeList = (params) => apiPostData('/main/map/getList', params)

// 获取量化随机列表
export const apiGetLiangHuaRadomList = (params) => apiPostData('/main/index/getRandList', params)

// 获取个人中心余额统计
export const apiGetLiangHuaTotalInfo = (params) => apiPostData('/home/user/getQuantifyInfo', params)

// 获取量化等级列表
export const apiGetLiangHuaLevelList = (params) => apiPostData('/main/level/getList', params)

// 获取量化平台列表
export const apiGetLiangHuaPlatformList = (params) => apiPostData('/main/platform/getList', params)

// 开始量化
export const apiStartLiangHua = (params) => apiPostData('/home/userQuantify/add', params)

// 获取量化订单
export const apiGetLiangHuaOrderList = (params) => apiPostData('/home/userQuantify/getList', params)

// 领取会员
export const apiGetVip = (params) => apiPostData('/home/level/up', params)


// 获取图片验证码
export const apiGetImgCode = (params) => apiPostData('/main/index/getImgCode', params)

// 申请团队账号
export const apiApplyTeamAccount = (params) => apiPostData('/home/userTeam/add', params)

// 获取任务列表
export const apiGetTaskList = (params) => apiPostData('/home/task/getList', params)

// 领取任务
export const apiLingQuTask = (params) => apiPostData('/home/task/endTask', params)


// 获取抽奖列表
export const apiChouJiangList = (params) => apiPostData('/home/lottery/getList', params)

// 抽奖
export const apiChouJiang = (params) => apiPostData('/home/lottery/start', params)

export const apiChouJiangHistoryList = (params) => apiPostData('/home/lottery/getUserLotteryList', params)

// 撤回提现
export const apiCeHuiCashOut = (params) => apiPostData('home/userWithdraw/cancel', params)


export const apiGetInfo = (params)  => apiPostData('/main/article/getInfo', params)
export const apiGetWallet = ()  => apiPostData('/main/wallet/getList')
export const apiGetPie = (params)  => apiPostData('/main/config/getInfo', params)
export const apiGetKline = (params)  => apiPostData('/main/product/getKline', params,'')
export const apiGetDCPTGData = ()  => apiPostData('/main/product/getDCPTGData',null)
export const apiGetQaList = ()  => apiPostData('/main/article/getQaList',null)

//获取汇率
export const apiGetDCPTGRate = ()  => apiPostData('/main/product/getDCPTGRate',null)
//提交兑换
export const apiExchangeDCPTG = (params)  => apiPostData('home/userExchange/exchangeDCPTG', params)
//兑换列表
export const apiExchangeList = (params)  => apiPostData('/home/userExchange/getList ',params)

// 获取首页彩种列表
export const apiGetLotteryList =  (params) => apiPostData('/main/lottery/getList', params)

// 获取单个彩种的房间列表
export const apiGetLotteryRoomList =  (params) => apiPostData('/main/lottery/getInfo', params)


// 获取房间信息
export const apiGetRoomInfo =  (params) => apiPostData('/main/lottery/getRoomInfo', params)
// 获取大厅列表
export const apiGetRooms =  (params) => apiPostData('/main/lottery/rooms', params)
//根据大厅id获取房间分组，房间彩种
export const apiGetRoomGroup =  (params) => apiPostData('/main/lottery/roomGroup', params)

// 获取开奖信息
export const apiGetChipList =  (params) => apiPostData('/main/lottery/getDataList', params)

// 下注
export const apiChipDownOrder =  (params) => apiPostData('/home/userBet/add', params)

//下注列表
export const apiBetInfo =  (params) => apiPostData('/home/lotteryRoom/betInfo', params)

//下注历史
export const apiBetHistory =  (params) => apiPostData('/home/userBet/history', params)

//开奖历史
export const apilotteryHistory =  (params) => apiPostData('/main/lottery/getHistory', params)
// 走势列表
export const apiChipZouShiList =  (params) => apiPostData('/main/lotteryData/getList', params)

// 获取已经下注的订单列表 
export const apiAlreadyChipOrderList = (params) => apiPostData('/home/userBet/getList', params)
// 获取已经下注的订单列表详情
export const apiUserBetInfo = (params) => apiPostData('/home/userBet/getInfo', params)
// 撤销订单 
export const apiCancelOrder = (params) => apiPostData('/home/userBet/cancel', params)

// 新团队获取团队数据
export const apiNewTeamGetTeamInfo =  (params) => apiPostData('/home/userRebate/getTeamInfo', params)

// 新团队获取三代团队数据
export const apiNewTeamGetThreeLayerInfo =  (params) => apiPostData('/home/userRebate/getLayerInfo', params)


