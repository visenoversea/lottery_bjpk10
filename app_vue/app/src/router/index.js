import { createRouter, createWebHashHistory  } from 'vue-router'
import MainLayout from '../components/MainLayout.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      redirect: '/main',
      children: [
        { path: '/main', name: 'main', component: () => import(/* webpackChunkName: "main" */'@/views/mainview/MainView.vue'), meta: { index: 0, name: '首页' } },
        // 选择充值方式
        { path: '/rechargeselect', name: 'rechargeselect', component: () => import('@/views/rechargeselect/RechargeSelect.vue'), meta: { index: 0, name: '选择充值' } },
         // 联系客服
        { path: '/concatkefu', name: 'concatkefu', component: () => import('@/views/concatkefu/ConcatKeFu.vue'), meta: { index: 0, name: '联系客服' } },
        { path: '/finance', name: 'finance', component: () => import(/* webpackChunkName: "main" */'@/views/finance/Finance.vue'), meta: { index: 0, name: '资产' } },
      ]
    },
    // vip大厅
    { path: '/vipdetail', name: 'vipdetail', component: () => import(/* webpackChunkName: "main" */'@/views/vipdetail/VipDetail.vue'), meta: { index: 4, name: 'vip' } },

    // 下单
    { path: '/chip', name: 'chip', component: () => import(/* webpackChunkName: "main" */'@/views/chip/Chip.vue'), meta: { index: 40, name: '下注' } },
    
    { path: '/zoushi', name: 'zoushi', component: () => import(/* webpackChunkName: "main" */'@/views/zoushi/ZouShi.vue'), meta: { index: 46, name: '走势图' } },
    
    
    // 搜索
    { path: '/mainsearch', name: 'mainsearch', component: () => import(/* webpackChunkName: "main" */'@/views/mainsearch/MainSearch.vue'), meta: { index: 11, name: '新闻详情' } },

    // 语言设置
    { path: '/languageset', name: 'languageset', component: () => import('@/views/languageset/LanguageSet.vue'), meta: { index: 6, name: '语言设置' } },
    
     
  
    // 用户实名
    { path: '/userreal', name: 'userreal', component: () => import('@/views/userreal/UserReal.vue'), meta: { index: 4, name: '用户实名' } },

    // 修改交易密码
    { path: '/changebuspwd', name: 'changebuspwd', component: () => import('@/views/changebuspwd/ChangeBusPwd.vue'), meta: { index: 10, name: '修改交易密码' } },
    // 修改登录密码
    { path: '/changepwd', name: 'changepwd', component: () => import('@/views/changepwd/ChangePwd.vue'), meta: { index: 11, name: '修改登录密码' } },
    
    // 绑定手机
    { path: '/bindmobile', name: 'bindmobile', component: () => import('@/views/bindmobile/BindMobile.vue'), meta: { index: 9, name: '绑定手机' } },
    // 绑定邮箱
    { path: '/bindemail', name: 'bindemail', component: () => import('@/views/bindemail/BindEmail.vue'), meta: { index: 9, name: '绑定邮箱' } },
    
    // 安全中心
    { path: '/safecenter', name: 'safecenter', component: () => import('@/views/safecenter/SafeCenter.vue'), meta: { index: 8, name: '安全中心' } },

    { path: '/login', name: 'login', component: () => import('@/views/login/Login.vue'), meta: { index: 1, name: '登录' } },
    
    { path: '/register', name: 'register', component: () => import('@/views/register/Register.vue'), meta: { index: 2, name: '注册' } },
    
    { path: '/rule', name: 'rule', component: () => import('@/views/rule/Rule.vue'), meta: { index: 20, name: '规则' } },

    { path: '/forgetpwd', name: 'forgetpwd', component: () => import('@/views/forgetpwd/ForgetPwd.vue'), meta: { index: 20, name: '忘记密码' } },

    // 平台币充值
    {
      path: '/rechargebi/:id',
      name: 'rechargebi',
      component: () => import('@/views/rechargebi/RechargeBi.vue'),
      meta: { index: 16 }
    },
    // 平台网银充值
    {
      path: '/rechargebank/:id',
      name: 'rechargebank',
      component: () => import('@/views/rechargebank/RechargeBank.vue'),
      meta: { index: 16 }
    },
    // 平台客服充值
    {
      path: '/rechargekefu/:id',
      name: 'rechargekefu',
      component: () => import('@/views/rechargekefu/RechargeKefu.vue'),
      meta: { index: 16 }
    },
    // 第三方充值
    {
      path: '/rechargethird/:id',
      name: 'rechargethird',
      component: () => import('@/views/rechargethird/RechargeThird.vue'),
      meta: { index: 16 }
    },
    // 资金明细
    { path: '/mybill', name: 'mybill', component: () => import('@/views/mybill/MyBill.vue'), meta: { index: 24, name: '资金明细' } },
    
    // 充值记录
    { path: '/rechargehistory', name: 'rechargehistory', component: () => import('@/views/rechargehistory/RechargeHistory.vue'), meta: { index: 24, name: '充值记录' } },
    
    // 提现记录
    { path: '/cashouthistory', name: 'cashouthistory', component: () => import('@/views/cashouthistory/CashoutHistory.vue'), meta: { index: 24, name: '提现记录' } },
    
    // 选择提现方式
    { path: '/cashoutselect', name: 'cashoutselect', component: () => import('@/views/cashoutselect/CashoutSelect.vue'), meta: { index: 15, name: '选择提现' } },
    
    // 提现到用户钱包
    {
      path: '/cashoutbi/:id',
      name: 'cashoutbi',
      component: () => import('@/views/cashoutbi/CashoutBi.vue'),
      meta: { index: 16 }
    },

     // 提现到银行卡
     {
      path: '/cashoutbank/:id',
      name: 'cashoutbank',
      component: () => import('@/views/cashoutbank/CashoutBank.vue'),
      meta: { index: 16 }
    },
    // 钱包地址列表
    { path: '/walletlist', name: 'walletlist', component: () => import('@/views/walletlist/WalletList.vue'), meta: { index: 13, name: '钱包地址列表' } },

    // 添加钱包
    { path: '/walletadd', name: 'walletadd', component: () => import('@/views/walletadd/WalletAdd.vue'), meta: { index: 14, name: '添加钱包' } },
    
    // 公告列表
    { path: '/noticelist', name: 'noticelist', component: () => import(/* webpackChunkName: "main" */'@/views/noticelist/NoticeList.vue'), meta: { index: 10, name: '公告列表' } },
    // 公告详情
    { path: '/noticedetail', name: 'noticedetail', component: () => import('@/views/noticedetail/NoticeDetail.vue'), meta: { index: 11, name: '公告详情' } },

    // 银行卡列表
    { path: '/bankcardlist', name: 'bankcardlist', component: () => import('@/views/bankcardlist/BankCardList.vue'), meta: { index: 39, name: '银行卡列表' } },

    // 添加银行卡
    { path: '/addbankcard', name: 'addbankcard', component: () => import('@/views/addbankcard/AddBankCard.vue'), meta: { index: 40, name: '添加银行卡' } },

    // 推广中心
    { path: '/tuiguang', name: 'tuiguang', component: () => import('@/views/tuiguang/TuiGuang.vue'), meta: { index: 10, name: '推广中心' } },
    
    // 推广详情
    { path: '/tuiguangdetail', name: 'tuiguangdetail', component: () => import('@/views/tuiguangdetail/TuiGuanDetail.vue'), meta: { index: 12, name: '推广中心' } },

    // 分享
    { path: '/share', name: 'share', component: () => import('@/views/share/Share.vue'), meta: { index: 12, name: '推广中心' } },
    
    {
      path: '/refresh',
      name: 'refresh', 
      component: () => import( '@/views/refresh/Refresh.vue'),
      meta: { index: 24 }
    },
  ]
})


router.beforeEach((to, from, next) => {
  if(to.name == from.name) {
    console.log('=================', to, from)
    Object.assign(from, to)
    next({ name: 'refresh' })
  }else {
    next()
  }
})


export default router
