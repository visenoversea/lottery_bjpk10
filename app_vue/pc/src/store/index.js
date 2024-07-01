import { defineStore } from "pinia"

import zhLocale from 'element-plus/dist/locale/zh-cn.min.js'

import enLocale from 'element-plus/dist/locale/en.min.js'

import zhTWLocale from 'element-plus/dist/locale/zh-tw.min.js'

import deLocale from 'element-plus/dist/locale/de.min.js'

import frLocale from 'element-plus/dist/locale/fr.min.js'

import jaLocale from 'element-plus/dist/locale/ja.min.js'

import router from "@/router/index"

import { ElLoading } from 'element-plus'
//导出
 const store  = defineStore('store', {
  state: () => {
    return {
      
      appUrl: '',
      
      fullscreen: false,
      teleport: true,

      loginPopShow: false,
      
      langObj: {
        'zh-CN': zhLocale,
        'zh-TW': zhTWLocale,
        'en': enLocale,
        'de': deLocale,
        'fr': frLocale,
        'ja': jaLocale
      },

      isDark: window.localStorage.getItem('isDark') ? Number(window.localStorage.getItem('isDark')) : 0,

      MACDColor:'#22ab94',
      DIFColor:'#2196f3',
      DEAColor:'#ff6d00',

      MA5Color:'#D6C863',

      MA10Color: '#16AC90',

      MA20Color:'#A995D4',

        // 上涨 #04AD90 绿
      upColor :'#0065ff',

      // 下跌 #E15852 红
      downColor:'#f05150',

      audio: null, //发送消息audio

      token: localStorage.getItem('appToken'),

      lang: window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : '',

      loadingShow: false,

      loadingInstance: {},

      setLoadingShow(flag = true) {
        if(flag) {
          this.loadingInstance =  ElLoading.service({
            fullscreen: true,
             // text: 'Loading',
            background: 'rgba(0, 0, 0, 0.1)',
          });
        }else {
          if(!this.loadingInstance.close) return
          this.loadingInstance.close()
        }
      },

      userInfo: { userReal: {}, balance: '0.00', freeze: '0.00' }, //用户信息
      
      banner: {
        logo: [],
        lunbo: []
      },
      
      loadedLanguages: [], //已经加载的语言吧

      langList: [], //语言列表
      
      currency: {
        fixed: 0,
        create_time: 0,
        currency_from: "",
        currency_to: "",
        modify_time: 0,
        rate: "",
        symbol: "",
        status: 0
      },

      tg: {
        code: "",
        create_time: 0,
        id: 0,
        img: "",
        modify_time: 0,
        path: "/img/tg.jpg",
        remark: "",
        sort: 0,
        status: 1,
        suffix: "",
        title: "",
      },
      webLogo: {
        logo: '',
        logo2: ''
      },

      kefu: {
        "KefuMode": "",
        "KefuUrl": "",
        "KefuLine": "",
        "KefuWhatsapp": "",
        "KefuTelegram": ""
      },

      system: {
        "Version": "",
        "WebTitle": "",
        "GoogleAuth": "",
        "RegMode": "",
        "TidSet": "",
        "UserShow": "",
        "Lang": "",
        "downUrl": "",
        "AboutUs": '',
        "AboutUsPic": '',
        "ProductType": [] //1 合约 2期权 3点位
      }
    }
  },
  actions: {
    setLanguage(lang) {
      window.localStorage.setItem('lang', lang)
      this.lang = lang
    },
    setThemeIsDark(val) {
      val = Number(val)
      window.localStorage.setItem('isDark', val)
      this.isDark = val
    },

    setCurrency(obj) {
      this.currency = obj
    },
    // 设置token
    setToken(token) {
      window.localStorage.setItem('appToken', token)
      this.token = token
      console.log('this.token', this.token)
    },
  
    // 设置用户信息
    setUserInfo(obj) {
      this.userInfo = obj
    },

    //退出登录
    logout() {
      localStorage.removeItem('appToken')
      this.userInfo = { userReal: {} }
      localStorage.removeItem('localSearchList')
      localStorage.removeItem('cashoutBankInfo')
      this.token = ''
      // router.push('/login')
      this.loginPopShow = true
    },
  }
})
export default store