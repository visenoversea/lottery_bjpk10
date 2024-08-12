//异步路由组件
export default {
  //布局组件
  Layout: () => import('@/views/Layout/IndexView.vue'),
  //空组件
  // Empty: () => import('@/views/Empty/IndexView.vue'),
  //首页
  Home: () => import('@/views/Home/IndexView.vue'),
  /****************用户管理****************/
  OnlineUser: () => import('@/views/OnlineUser/IndexView.vue'),
  //用户列表
  UserList: () => import('@/views/UserList/IndexView.vue'),
  //用户实名
  UserRealList: () => import('@/views/UserRealList/IndexView.vue'),
  //用户消息
  UserMsgList: () => import('@/views/UserMsgList/IndexView.vue'),
  //用户钱包
  UserWalletList: () => import('@/views/UserWalletList/IndexView.vue'),
  //用户银行卡
  UserBankList: () => import('@/views/UserBankList/IndexView.vue'),
  //用户IP记录
  UserIPList: () => import('@/views/UserIPList/IndexView.vue'),
  /****************用户管理****************/

  /****************推广统计****************/
  //代理列表
  UserAgentList: () => import('@/views/UserAgentList/IndexView.vue'),
  //代理推广
  // UserAgentLayer: () => import('@/views/UserAgentLayer/IndexView.vue'),
  //资金报表
  UserReportList: () => import('@/views/UserReportList/IndexView.vue'),
  // 用户报表
  Userreport: () => import('@/views/Userreport/IndexView.vue'),
  //推广链接
  UserAgentLink: () => import('@/views/UserAgentLink/IndexView.vue'),
  /****************推广统计****************/

  /****************资金管理****************/
  //用户充值
  UserRechargeList: () => import('@/views/UserRechargeList/IndexView.vue'),
  //用户提现
  UserWithdrawList: () => import('@/views/UserWithdrawList/IndexView.vue'),
  //用户账变
  UserAmountList: () => import('@/views/UserAmountList/IndexView.vue'),
  //返佣记录
  UserRebateList: () => import('@/views/UserRebateList/IndexView.vue'),
  /****************资金管理****************/

  /****************订单管理****************/
  UserBetList: () => import('@/views/UserBetList/IndexView.vue'),
  UserBetItemList: () => import('@/views/UserBetItemList/IndexView.vue'),
  lotteryDataList: () => import('@/views/lotteryDataList/IndexView.vue'),
  lotteryDataSet: () => import('@/views/lotteryDataSet/IndexView.vue'),
  /****************订单管理****************/

  /****************订单管理****************/
  lotteryOdds1: () => import('@/views/lotteryOdds1/IndexView.vue'),
  lotteryOdds2: () => import('@/views/lotteryOdds2/IndexView.vue'),
  lotteryOdds3: () => import('@/views/lotteryOdds3/IndexView.vue'),
  /****************订单管理****************/

  /****************文章管理****************/
  SingleList: () => import('@/views/SingleList/IndexView.vue'),
  NoticeList: () => import('@/views/NoticeList/IndexView.vue'),
  HelpList: () => import('@/views/HelpList/IndexView.vue'),
  NewsList: () => import('@/views/NewsList/IndexView.vue'),
  /****************文章管理****************/

  /****************运营配置****************/
  //充值配置
  RechargeList: () => import('@/views/RechargeList/IndexView.vue'),
  //提现配置
  WithdrawList: () => import('@/views/WithdrawList/IndexView.vue'),
  //任务配置
  TaskList: () => import('@/views/TaskList/IndexView.vue'),
  //房间设置
  LotteryRoomList: () => import('@/views/LotteryRoomList/IndexView.vue'),
  // 彩种配置
  lotteryList: () => import('@/views/lotteryList/IndexView.vue'),
  // 等级配置
  levelConfig: () => import('@/views/levelConfig/IndexView.vue'),
  /****************运营配置****************/

  /****************系统配置****************/
  //全局配置
  GlobalConfig: () => import('@/views/GlobalConfig/IndexView.vue'),
  //图片配置
  BannerList: () => import('@/views/BannerList/IndexView.vue'),
  //语言配置
  LangConfig: () => import('@/views/LangConfig/IndexView.vue'),
  //语言翻译
  LangConfigList: () => import('@/views/LangConfigList/IndexView.vue'),
  //翻译列表
  TranslateList: () => import('@/views/TranslateList/IndexView.vue'),
  //语言列表
  LangList: () => import('@/views/LangList/IndexView.vue'),
  //手机区号
  CountryAreaList: () => import('@/views/CountryAreaList/IndexView.vue'),
  /****************系统配置****************/


  /****************系统管理****************/
  //管理员列表
  AdminList: () => import('@/views/AdminList/IndexView.vue'),
  //角色管理
  RoleList: () => import('@/views/RoleList/IndexView.vue'),
  //用户日志
  UserLogList: () => import('@/views/UserLogList/IndexView.vue'),
  //菜单管理
  MenuList: () => import('@/views/MenuList/IndexView.vue'),
  //配置管理
  ConfigList: () => import('@/views/ConfigList/IndexView.vue'),
  FormConfig: () => import('@/views/FormConfig/IndexView.vue'),
  IPList: () => import('@/views/IPList/IndexView.vue'),
  IPRecord: () => import('@/views/IPRecord/IndexView.vue'),
  SendList: () => import('@/views/SendList/IndexView.vue'),
  MapList: () => import('@/views/MapList/IndexView.vue'),
  DomainList: () => import('@/views/DomainList/IndexView.vue'),
  CrontabList: () => import('@/views/CrontabList/IndexView.vue'),
  // 异常处理
  SystemEdit: () => import('@/views/SystemEdit/IndexView.vue'),
  /****************系统管理****************/
}
