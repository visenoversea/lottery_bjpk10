<template>
  <div id="app" class="v_app">
    <div v-if="show">
      <div class="v-app-head-box">
        <div class="v-app-head"></div>
      </div>

      <div  class="v-app-content-box g-flex-column g-flex-align-center">
        <!-- app logo -->
        <div class="v-app-content-logo g-flex-align-center g-flex-justify-center">
          <img :src="appInfo.logo" alt="">
        </div>

        <!-- app名称 -->
        <div class="v-app-content-name g-flex-align-center">
          <i class="iconfont icon-apple-fill" v-if="userAgent === 1"></i>
          <i class="iconfont icon-android-fill"  v-if="userAgent === 3 || userAgent === 2"></i>
          <p>{{appInfo.WebTitle}}</p>
  <!--        <span>{{i18n.versionTipText}}</span>-->
        </div>

        <!-- 信息 -->
        <ul class="v-app-content-detail-info g-flex-justify-center g-flex-align-center g-flex-wrap">
          <li class="v-app-info-level">
            <span>{{i18n.versionTitle}}:</span>
            <span>{{appInfo.Version}}</span>
          </li>
          <!-- <li class="v-app-info-size">
            <span>大小:</span>
            <span>42.9 MB</span>
          </li> -->
  <!--        <li class="v-app-info-time">-->
  <!--          <span>{{i18n.updateTimeText}}:</span>-->
  <!--          <span>{{appInfo.time}}</span>-->
  <!--        </li>-->
        </ul>
        <!-- 二维码 -->
        <div class="v-app-content-qrcode" v-if="userAgent === 2">
          <vue-qr :text="domain" :logoSrc="appInfo.logo" :margin="0" colorLight="#fff" :size="110"/>
        </div>

        <!-- 安装按钮 -->
        <div class="v-app-content-btn g-flex-justify-center g-flex-align-center" @click="downClick">
          <span>{{ iosMobileconfigDown ? i18n.downloadSecondText : i18n.downloadText }}</span>
        </div>

        <!-- 提示语 -->
        <div class="v-app-content-apk-tip" v-if="iosMobileconfigDown">
          {{i18n.iosapkTipText}}
          <p>{{i18n.iosapkTipSecondText}}</p>
        </div>

        <!-- 提示语 -->
        <p class="v-app-content-tip" v-if="userAgent === 2">{{i18n.scareTipText}}</p>
      </div>


      <ul class="v-app-footer g-flex-justify-center g-flex-align-center">
        <li v-for="(item, index) in langList" :key="index" @click="languageItemClick(item)">
          <img :src="item.icon" alt=""/>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 遮罩微信 -->
    <div class="v-shade" v-if="userAgent === 0 && show">
      <div class="v-shade-content">
        <div class="v-shade-content-list g-flex-column g-flex-align-center">
          <img src="./assets/img/arrow.png" alt="" srcset=""/>
          <div class="v-shade-content-item g-flex-align-center flex-wrap">
            <span>1</span>
            <p>{{i18n.weiChatOneTipText}}</p>
          </div>
          <div class="v-shade-content-item g-flex-align-center">
            <span>2</span>
            <p>{{i18n.weiChatTwoTipText}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 描述安装遮罩 -->
    <Loading v-show="isloading"/>

    <pc-toast v-show="$global.toastShow"/>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
import Loading from '@/components/Loading.vue'
import { isSafari } from '@/utils/index.js'
import PcToast from '@/components/PcToast.vue'
import { apiLoadLanguage, apiGetConfig, apiGetInfo } from '@/utils/api.js'
export default {
  name: 'App',
  components: { vueQr, Loading, PcToast },
  data() {
    return {
      show: false,
      domain:window.location.href,
      isloading: false,
      appInfo: {},
      iosMobileconfigDown: false,
    }
  },
  created() {
    this.apiGetInfoHandel()
    this.loadData()
  },
  methods: {
    // 获取全局初始化配置
   async loadData() {
      const { success, data } = await apiGetConfig().catch(() => { return { success: false, data: null } })
      if(!success) return { success: false, data: null }
      this.$global.langList = data.langList
      document.title = data.system.WebTitle
      if (this.$global.lang) {
        this.loadLanguageAsync(this.$global.lang)
      } else {
        if (data.system.Lang) {
          this.loadLanguageAsync(data.system.Lang)
        } else {
          this.loadLanguageAsync('en')
        }
      }
    },

    // // 根据浏览器识别语言 设置语言 加载语言包
    // setGlobalLang() {
    //   var codeList = this.$global.langList.map(item => {
    //     return item.code
    //   })
    //   var jsLanguage = (navigator.language || navigator.browserLanguage).toLowerCase();
    //   if (jsLanguage.indexOf('zh-TW') >= 0) {
    //     // 假如浏览器语言是繁体中文
    //     if (codeList.indexOf('zh-TW') > -1) {
    //       this.loadLanguageAsync('zh-TW')
    //       return
    //     }
    //   }
    //   else if (jsLanguage.indexOf('zh') >= 0) {
    //     // 假如浏览器语言是简体中文
    //     if (codeList.indexOf('zh-CN') > -1) {
    //       this.loadLanguageAsync('zh-CN')
    //       return
    //     }
    //   }
    //   else if (jsLanguage.indexOf('en') >= 0) {
    //     // 假如浏览器语言是英语
    //     if (codeList.indexOf('en') > -1) {
    //       this.loadLanguageAsync('en')
    //       return
    //     }
    //   }
    //   else if (jsLanguage.indexOf('de') >= 0) {
    //     if (codeList.indexOf('de') > -1) {
    //       this.loadLanguageAsync('de')
    //       return
    //     }
    //   } else if (jsLanguage.indexOf('fr') >= 0) {
    //     if (codeList.indexOf('fr') > -1) {
    //       this.loadLanguageAsync('fr')
    //       return
    //     }
    //   }
    //   this.loadLanguageAsync('en')
    // },

    // 加载语言包
    async loadLanguageAsync(lang) {
      if (this.$i18n.locale !== lang) { //如果传入的变量 不等于 i18插件的语言值 (切换过一次，再切换第二次就不会再去加载一遍了)
        if (!this.$global.loadedLanguages.includes(lang)) { //如果加载的这个语言不包含在默认加载的语言里面
          return this.apiLoadLanguageHandel(lang)
        } else {
          //如果传入的语言变量值等于现在i18n控件的默认语言值 //不等于也会去设置
          return Promise.resolve(this.setI18nLanguage(lang)); //处理一些默认信息
        }
      } else {
        this.apiLoadLanguageHandel(lang)
      }
    },

    // 请求语言数据
    async apiLoadLanguageHandel(lang) {
      this.isloading = true
      const { success, data } = await apiLoadLanguage({ lang: lang, id: 3 })
      this.isloading = false
      if (!success) return
      // 如果映射表存在这个
      this.$i18n.setLocaleMessage(lang, data.data);
      //设置i18n的语言message切换成这个
      this.$global.loadedLanguages.push(lang); //本地已经加载的语言 加入 loadedLanguages
      this.setI18nLanguage(lang);
    },

    // 设置语言
     setI18nLanguage(lang) {
      this.$global.setLanguage(lang)
      this.$i18n.locale = lang;
      //设置i18n的默认语言
      document.querySelector('html').setAttribute('lang', lang) //设置html的语言
      this.show = true
      return lang
    },

    // 获取信息
    async apiGetInfoHandel() {
      const { success, data } = await apiGetInfo()
      if(!success) return
      document.title = data.data.WebTitle
      this.appInfo = data.data
    },

    // 点击安装
    downClick() {
      if (this.userAgent === 2 || this.userAgent === 3) {
        if (!this.appInfo.apk) return
        return this.downLoadApp(this.appInfo.apk)
      }
      if(this.userAgent === 1 && isSafari()) {
        if(!this.iosMobileconfigDown) {
          this.iosMobileconfigDown = true
          return this.downLoadApp(this.appInfo.ios, 3000)
        }else {
          this.iosMobileconfigDown = false
          return this.downLoadApp(this.appInfo.mobileprovision, 2000)
        }
      }else {
        this.$global.setToastShow(true, this.i18n.SafariTipText)
      }
    },

    downLoadApp(url, time = 0) {
      let a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('download', "")
      a.click()
      if(time !== 0) {
        this.isloading = true
        setTimeout(() => {
          this.isloading = false
        }, time);
      }

    },

    // 切换语言
    languageItemClick(item) {
      this.loadLanguageAsync(item.code)
    },
  },
  computed: {
    userAgent() {
      let u = navigator.userAgent;
      let isMobile = !!u.match(/AppleWebKit.*Mobile.*/) //是否为移动端
      let isWeixin = u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger' //是否为微信
      if (isWeixin) return 0
      // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      let isQQ = (u.indexOf('QQ') > -1 && u.indexOf('mqqbrowser') < 0);
      if (isQQ) return 0
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) return 1
      if (!isMobile) return 2 // 是电脑
      return 3
    },
    i18n() {
      return this.$t('down')
    },
    langList() {
      if(!this.$global.langList.length) return []
      return this.$global.langList.slice(0, 3)
    }
  }
}
</script>

<style lang="scss">
body,html,#app {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.v_app {
  font-size: $middle-font-size;
  color: #333;
  .v-app-head-box {
    margin-bottom: 20px;
    .v-app-head {
      background: url('./assets/img/top_bg_middle.png') top center no-repeat;
      height: 160px;
    }
  }
  .v-app-content-box {
    padding: 10px 20px 40px 20px;
    // app logo
    .v-app-content-logo {
      background: url('./assets/img/app_bg.png') top center no-repeat #fff;
      width: 160px;
      height: 160px;
      background-size: 100% 100%;
      img {
        width: 100px;
        height: 100px;
        border-radius: 24px;
      }
    }
    // app名称
    .v-app-content-name {
      margin-bottom: 20px;
      i {
        font-size: 26px;
      }
      p {
        font-size: $big-font-size;
        padding-left: 5px;
        padding-right: 10px;
      }
      span {
        background-color:#e84d67;
        font-size: $most-font-size;
        color: $white;
        padding: 4px 8px;
        border-radius: 4px;
      }
    }
    // 信息
    .v-app-content-detail-info {
      margin-bottom: 10px;
      li {
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 8px;
        span {
          color: #969b9d;
          &:nth-of-type(2) {
            padding-left: 6px;
          }
        }
      }
    }
    // 二维码
    .v-app-content-qrcode {
      border: 1px solid #c2c2c2;
      padding: 6px;
      margin-bottom: 20px;
      cursor: pointer;
      transition: transform 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }

    // 安装按钮
    .v-app-content-btn {
      cursor: pointer;
      border-radius: 30px;
      background: #28caad;
      margin-bottom: 20px;
      span {
        font-size: $middle-more-font-size;
        padding: 10px 60px;
        color: $white;
      }
    }
    .v-app-content-apk-tip {
      color: #e84d67;;
      font-size: 14px;
      line-height: 20px;
      word-break: break-all;
      text-align: center;
    }

    // 提示语
    .v-app-content-tip {
      color: #969b9d;
      font-size: 14px;
      padding-top: 20px;
    }
  }
  .v-app-footer {
    border-top: 1px solid #e5e5e5;
    padding: 20px 0;
    li {
      cursor: pointer;
      padding: 0 10px;
      img {
        width: 16px;
        height: 12px;
        object-fit: cover;
      }
      span {
        padding-left: 6px;
      }
    }
  }

  .v-shade {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    .v-shade-content {
      height: 100%;
      width: 100%;
      position: absolute;
      .v-shade-content-list {
        position: relative;
        color: #fff;
        margin-top: 150px;
        img{
          position: absolute;
          width: 100px;
          height: 100px;
          right: 10px;
          top: 0;
          transform: translateY(-100%);
        }
        .v-shade-content-item {
          padding-bottom: 30px;
          span {
            flex-shrink: 0;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 50%;
            background:#e84d67;
          }
          p {
            padding-left: 10px;
            font-size: 16px;
          }
        }
      }
    }
  }
}



@media (max-width: 770px) {
  .v_app {
    .v-app-head-box {
      .v-app-head {
        background: url('./assets/img/top_bg_mobile.png') top center no-repeat;
        background-size: 100% auto;
        height: 60px;
      }
    }
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2), not all {
  .v_app {
    .v-app-head-box {
      .v-app-head {
        background: url('./assets/img/top_bg_mobile_ratio.png') top center no-repeat;
        background-size: 100% auto;
        height: 60px;
      }
    }
  }
}

@media (min-width: 1200px) {
  .v_app {
    .v-app-head-box {
      .v-app-head {
        background: url('./assets/img/top_bg.png') top center no-repeat;
        height: 160px;
      }
    }
  }
}


</style>
