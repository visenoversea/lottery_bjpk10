import http from './http'
//导出
export default {
    //后台登陆
    login: data => http.post('/main/user/adminLogin', data),
    //后台初始化
    init: () => http.post('/admin/system/init'),
    //修改密码
    editPassword: data => http.post('/admin/user/editPassword',data),
    //清理系统缓存
    clearSystemCache: () => http.get('/admin/system/clearCache'),
    //上传文件
    uploadFile:  data => http.postFile('/admin/upload/file', data),

    //获取Demo列表
    getDemoList: data => http.post('/main/demo/getList', data),
    //新增
    addDemo: data => http.post('/main/demo/add', data),
    //编辑
    editDemo: data => http.post('/main/demo/edit', data),
    //删除
    delDemo: data => http.post('/main/demo/del', data),

    //获取用户列表
    getUserList: data => http.post('/admin/user/getList', data),
    //获取用户信息
    getUserInfo: data => http.post('/admin/user/getInfo', data),
    //新增
    addUser: data => http.post('/admin/user/add', data),
    //编辑
    editUser: data => http.post('/admin/user/edit', data),
    //删除
    delUser: data => http.post('/admin/user/del', data),
    //获取推广信息
    getSpreadList: data => http.post('/admin/user/getSpreadList', data),
    //用户下线
    offlineUser: data => http.post('/admin/user/offline', data),

    //获取ip信息
    getUserIPList: data => http.post('/admin/userIP/getList', data),
    //IP记录
    getIPRecord: data => http.post('/admin/ip/getList', data),
    //IP黑名单
    getIPList: data => http.post('/admin/ipList/getList', data),
    addIPList: data => http.post('/admin/ipList/add', data),
    delIPList: data => http.post('/admin/ipList/del', data),

    getSendList: data => http.post('/admin/send/getList', data),

    //获取用户余额列表
    getUserBalanceList: data => http.post('/admin/userBalance/getList', data),

    //获取用户实名列表
    getUserRealList: data => http.post('/admin/userReal/getList', data),
    //新增
    addUserReal: data => http.post('/admin/userReal/add', data),
    //编辑
    editUserReal: data => http.post('/admin/userReal/edit', data),
    //删除
    delUserReal: data => http.post('/admin/userReal/del', data),
    //审核用户实名
    reviewUserReal: data => http.post('/admin/userReal/review', data),

    //获取用户站内信
    getUserMsgList: data => http.post('/admin/userMsg/getList', data),
    //新增
    addUserMsg: data => http.post('/admin/userMsg/add', data),
    //编辑
    editUserMsg: data => http.post('/admin/userMsg/edit', data),
    //删除
    delUserMsg: data => http.post('/admin/userMsg/del', data),

    //获取用户钱包
    getUserWalletList: data => http.post('/admin/userWallet/getList', data),
    //编辑
    editUserWallet: data => http.post('/admin/userWallet/edit', data),
    //删除
    delUserWallet: data => http.post('/admin/userWallet/del', data),

    //获取用户银行卡
    getUserBankList: data => http.post('/admin/userBank/getList', data),
    //编辑
    editUserBank: data => http.post('/admin/userBank/edit', data),
    //删除
    delUserBank: data => http.post('/admin/userBank/del', data),

    //获取代理列表
    getUserAgentList: data => http.post('/admin/user/getAgentList', data),
    addUserAgent: data => http.post('/admin/user/addAgent', data),
    editUserAgent: data => http.post('/admin/user/editAgent', data),
    //获取代理层级列表
    getUserAgentLayer: data => http.post('/admin/user/getAgentLayer', data),
    //获取推广链接
    getUserAgentLink: data => http.post('/admin/user/getLink', data),
    //获取统计列表
    getReportList: data => http.post('/admin/userAmount/getReportList', data),
    // 获取用户报表
    getUserReport: data => http.post('/admin/userAmount/getUserReport', data),
    //获取统计信息
    getReportInfo: data => http.post('/admin/userAmount/getReportInfo', data),

    //获取用户充值
    getUserRechargeList: data => http.post('/admin/userRecharge/getList', data),
    //审核
    reviewUserRecharge: data => http.post('/admin/userRecharge/review', data),
    //新增
    addUserRecharge: data => http.post('/admin/userRecharge/add', data),
    //编辑
    editUserRecharge: data => http.post('/admin/userRecharge/edit', data),
    //删除
    delUserRecharge: data => http.post('/admin/userRecharge/del', data),

    //获取用户充值
    getUserWithdrawList: data => http.post('/admin/userWithdraw/getList', data),
    //审核
    reviewUserWithdraw: data => http.post('/admin/userWithdraw/review', data),
    //编辑
    editUserWithdraw: data => http.post('/admin/userWithdraw/edit', data),
    //删除
    delUserWithdraw: data => http.post('/admin/userWithdraw/del', data),
    DPayWithdraw: data => http.post('/admin/userWithdraw/DPay', data),
    DogPayBatchWithdraw: data => http.post('/admin/dogPay/withdrawBatch', data),
    DogPayWithdraw: data => http.post('/admin/dogPay/withdraw', data),
    //获取兑换记录
    getUserExchangeList: data => http.post('/admin/userExchange/getList', data),

    //获取用户账变
    getUserAmountList: data => http.post('/admin/userAmount/getList', data),
    //新增账款
    addUserAmount: data => http.post('/admin/userAmount/add', data),
    //编辑
    editUserAmount: data => http.post('/admin/userAmount/edit', data),
    //删除
    delUserAmount: data => http.post('/admin/userAmount/del', data),

    getUserRebateList: data => http.post('/admin/userRebate/getList', data),

    //币币交易
    // getUserProductTradeList: data => http.post('/admin/userProductTrade/getList', data),
    // cancelUserProductTrade: data => http.post('/admin/userProductTrade/cancel', data),
    // delUserProductTrade: data => http.post('/admin/userProductTrade/del', data),
    getUserBetList: data => http.post('/admin/userBet/getList', data),
    getUserBetItemList: data => http.post('/admin/userBet/getItemList', data),
    getUserBetList2: data => http.post('/admin/userBet/getList2', data),
    getLotteryDataList: data => http.post('/admin/lotteryData/getList', data),
    setLotteryData: data => http.post('/admin/lotteryData/setLottery', data),
    getLotteryDataHistoryList: data => http.post('/admin/lotteryData/getHistoryList', data),

    getLotteryPlayedList: data => http.post('/admin/lotteryPlayed/getList', data),
    editLotteryPlayed: data => http.post('/admin/lotteryPlayed/edit', data),

    getLotteryRoomList: data => http.post('/admin/lotteryRoom/getList', data),
    editLotteryRoom: data => http.post('/admin/lotteryRoom/edit', data),

    getLotteryList: data => http.post('/admin/lottery/getList', data),
    editLottery: data => http.post('/admin/lottery/edit', data),

    //用户挖矿
    getUserMiningList: data => http.post('/admin/userMining/getList', data),
    delUserMining: data => http.post('/admin/userMining/del', data),

    //文章
    getArticleList: data => http.post('/admin/article/getList', data),
    //新增
    addArticle: data => http.post('/admin/article/add', data),
    //编辑
    editArticle: data => http.post('/admin/article/edit', data),
    //删除
    delArticle: data => http.post('/admin/article/del', data),

    //交易
    getTradeList: data => http.post('/admin/trade/getList', data),
    //编辑
    editTrade: data => http.post('/admin/trade/edit', data),
    //删除
    delTrade: data => http.post('/admin/trade/del', data),

    //锁仓挖矿
    getMiningList: data => http.post('/admin/mining/getList', data),
    //编辑
    addMining: data => http.post('/admin/mining/add', data),
    //编辑
    editMining: data => http.post('/admin/mining/edit', data),
    //删除
    delMining: data => http.post('/admin/mining/del', data),

    //获取所有产品
    getAllProductList: data => http.post('/admin/product/getAllList', data),
    //获取产品列表
    getProductList: data => http.post('/admin/product/getList', data),
    //编辑
    addProduct: data => http.post('/admin/product/add', data),
    //同步
    syncProduct: data => http.post('/admin/product/sync', data),
    //编辑
    editProduct: data => http.post('/admin/product/edit', data),
    //删除
    delProduct: data => http.post('/admin/product/del', data),

    //任务配置
    getTaskList: data => http.post('/admin/task/getList', data),
    editTask: data => http.post('/admin/task/edit', data),

    //国家手机区号
    getCountryAreaList: data => http.post('/admin/countryArea/getList', data),
    editCountryArea: data => http.post('/admin/countryArea/edit', data),

    //等级配置
    getLevelList: data => http.post('/admin/level/getList', data),
    editLevel: data => http.post('/admin/level/edit', data),

    //获取产品K线
    getProductKlineList: data => http.post('/admin/productKline/getList', data),
    getTargetKlineList: data => http.post('/admin/productKline/getTargetList', data),
    getMinuteKlineList: data => http.post('/admin/productKline/getMinuteList', data),
    addProductKline: data => http.post('/admin/productKline/add', data),

    //获取管理员列表
    getAdminList: data => http.post('/admin/user/getAdminList', data),
    //新增
    addAdmin: data => http.post('/admin/user/addAdmin', data),
    //编辑
    editAdmin: data => http.post('/admin/user/editAdmin', data),
    //删除
    delAdmin: data => http.post('/admin/user/delAdmin', data),
    //重置谷歌密钥
    resetSecret: data => http.post('/admin/user/resetSecret', data),

    //获取角色列表
    getRoleList: data => http.post('/admin/role/getList', data),
    //新增
    addRole: data => http.post('/admin/role/add', data),
    //编辑
    editRole: data => http.post('/admin/role/edit', data),
    //删除
    delRole: data => http.post('/admin/role/del', data),
    //获取授权信息
    getAuthList: data => http.post('/admin/role/getAuthList', data),
    //编辑授权
    editAuth: data => http.post('/admin/role/editAuth', data),

    //获取语言列表
    getLangList:  data => http.post('/admin/lang/getList', data),
    addLang:  data => http.post('/admin/lang/add', data),
    editLang:  data => http.post('/admin/lang/edit', data),
    delLang:  data => http.post('/admin/lang/del', data),
    getTranslateList:  data => http.post('/admin/translate/getList', data),
    getTranslateInfo:  data => http.post('/admin/translate/getInfo', data),
    editTranslate:  data => http.post('/admin/translate/edit', data),
    addLangConfigList: data => http.post('/admin/langConfigList/add', data),
    delTranslate:  data => http.post('/admin/translate/del', data),
    //获取语言配置列表
    getLangConfig: data => http.post('/admin/langConfig/getList', data),
    uploadLangConfig: data => http.post('/admin/langConfig/upload', data),
    //生成翻译文件
    langConfigMakeFile:  data => http.post('/admin/langConfig/makeFile', data),
    //获取翻译语言列表
    getLangConfigList:  data => http.post('/admin/langConfigList/getList', data),
    editLangConfigList:  data => http.post('/admin/langConfigList/edit', data),
    translateLangConfigList:  data => http.post('/admin/langConfigList/translate', data),
    exportTranslate:  data => http.post('/admin/langConfigList/export', data),
    importTranslate:  data => http.post('/admin/langConfigList/import', data),

    getCurrencyList:  data => http.post('/admin/currency/getList', data),

    //广告图
    getBannerList:  data => http.post('/admin/banner/getList', data),
    addBanner:  data => http.post('/admin/banner/add', data),
    editBanner:  data => http.post('/admin/banner/edit', data),
    delBanner:  data => http.post('/admin/banner/del', data),
    uploadBanner:  data => http.post('/admin/banner/upload', data),

    //用户日志
    getUserLogList: data => http.post('/admin/userLog/getList', data),

    //获取列表
    getMenuList: data => http.post('/admin/menu/getList', data),
    //新增
    addMenu: data => http.post('/admin/menu/add', data),
    //编辑
    editMenu: data => http.post('/admin/menu/edit', data),
    //删除
    delMenu: data => http.post('/admin/menu/del', data),

    //获取列表
    getConfigList: data => http.post('/admin/config/getList', data),
    //获取详情
    getConfigItem: data => http.post('/admin/config/getItem', data),
    //新增
    addConfig: data => http.post('/admin/config/add', data),
    //编辑
    editConfig: data => http.post('/admin/config/edit', data),
    //编辑form表单
    editFormConfig: data => http.post('/admin/config/editForm', data),
    //修改配置
    editDataConfig: data => http.post('/admin/config/editData', data),
    //删除
    delConfig: data => http.post('/admin/config/del', data),

    //字段映射
    getMapList: data => http.post('/admin/map/getList', data),
    editMap: data => http.post('/admin/map/edit', data),

    //获取列表
    getDomainList: data => http.post('/admin/domain/getList', data),
    //新增
    addDomain: data => http.post('/admin/domain/add', data),
    //编辑
    editDomain: data => http.post('/admin/domain/edit', data),
    //删除
    delDomain: data => http.post('/admin/domain/del', data),

    //获取列表
    getCrontabList: data => http.post('/admin/crontab/getList', data),
    //新增
    addCrontab: data => http.post('/admin/crontab/add', data),
    //编辑
    editCrontab: data => http.post('/admin/crontab/edit', data),
    //删除
    delCrontab: data => http.post('/admin/crontab/del', data),

    // 异常处理
    
    userUpLevel: data => http.post('/admin/system/userUpLevel', data), 
    addWhiteIp: data => http.post('/admin/system/addWhiteIp', data), 
    kickUser: data => http.post('/admin/system/kickUser', data), 
    resetDomainCache: data => http.post('/admin/system/resetDomainCache', data), 
}