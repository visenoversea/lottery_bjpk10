import qs from 'qs'
import axios from 'axios';
import { ElMessage } from 'element-plus'
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
  store.setLoadingShow(false)
  if (response.data.code === -1 ) { //没登陆 或者token过期
    store.logout()
  }else if(response.data.code === -2 ) {
    ElMessage({
      message: response.data.msg,
      type: 'error',
    })
  }
  return response
},error => {
  store.loadingShow = false
  ElMessage({
    message: 'Network Err:'+error.response.status,
    type: 'error',
  })
  return Promise.reject(error)
})

const handleResponse = (data) => {
  if(data.data.code < 0) return Object.assign(data, { success: false })
  return Object.assign(data, { success: true })
}

// post 请求 表单格式
export const apiFormPostData = async (url, params = {}) => handleResponse(await axios.post(url, qs.stringify(params),  { headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}} ))

// post 请求 json格式
export const apiPostData = async (url, params = {}) => handleResponse(await axios.post(url, params))

// get 请求 json格式
export const apiGetData = async (url, params = {}) => handleResponse(await axios.get(url, { params }))

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


// 外汇下单
export const apiWaiHuiDownOrder = (params) => apiPostData('/home/userProductLever/add', params)

// 获取外汇订单
export const apiGetWaiHuiOrderList = (params) => apiPostData('/home/userProductLever/getList', params)

// 平仓外汇订单
export const apiWaiHuiPingOrder = (params) => apiPostData('/home/userProductLever/sell', params)

// 外汇取消委托
export const apiCancelWaiHuiOrder = (params) => apiPostData('/home/userProductLever/cancel', params)

// 外汇设置止损止盈
export const apiWaiHuiZhiSunZhiYing = (params) => apiPostData('/home/userProductLever/setSellPrice', params)

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

// 获取线路列表
export const apiGetJumpList = (params) => apiPostData('/main/index/getJumpList', params) 
