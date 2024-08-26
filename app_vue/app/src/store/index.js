import { defineStore } from "pinia"

import enLocale from 'vant/es/locale/lang/en-US';

import zhLocale from 'vant/es/locale/lang/zh-CN'

import zhTWLocale from 'vant/es/locale/lang/zh-TW'

import deLocale from 'vant/es/locale/lang/de-DE'

import frLocale from 'vant/es/locale/lang/fr-FR'

import jaLocale from 'vant/es/locale/lang/ja-JP'

import router from "@/router/index"
import { Base64 } from 'js-base64';
//导出
 const store  = defineStore('store', {
  state: () => {
    return {
      isFirstNeedShow: 0,
      
      isClickTimeDownNotice: false,

      myWebMainUrl: (document.location.protocol == 'http:' ? 'http://': 'https://') + window.location.host + '/#/main',
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
      upColor :'#04AD90',

      // 下跌 #E15852 红
      downColor:'#E15852',

      audio: null, //发送消息audio

      token: localStorage.getItem('appToken'),

      lang: window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : '',

      loadingShow: false,

      userInfo: { userReal: {}, level: {}, levelNext: {}, userTeam: {}, userQuantify: {} }, //用户信息
      
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
    encodeString(str){
      let newStr = Base64.encode(str)
      const len = newStr.length
      const str1 = newStr.substring(0, len / 2)
      const str2 = newStr.substring(len / 2, len)
      newStr = str2 + str1
      const str3 = newStr.substring(0, 1)
      const str4 = newStr.substring(1, len)
      return str4+str3
    },
    changeToken(token){
      let newStr =    this.encodeString(location.host)
      // let newStr =    this.encodeString(location.host + '|' + new Date().getTime())

      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      console.log('newStr', newStr)
      console.log('result', result)
      return `${token}.${newStr}${result}`
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

    setIsFirstNeedShow(val) {
      this.isFirstNeedShow = val
    },

    //退出登录
    logout() {
      localStorage.removeItem('appToken')
      this.userInfo = { userReal: {}, level: {} }
      localStorage.removeItem('cashoutBankInfo')
      this.token = ''
      this.isFirstNeedShow = 0
      this.isClickTimeDownNotice = true
      router.push('/login')
    },
  }
})
export default store