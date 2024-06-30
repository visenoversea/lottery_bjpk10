<template>
  <div class="v_app">
    <router-view v-if="show" v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component"></component>
      </transition>
    </router-view>
    <Loading color="#F9436B" v-show="store.loadingShow"/>
    <!-- <AudioPlay @init="init"/> -->
  </div>
</template>
<script setup>
import { apiLogin, apiGetConfig, apiLoadLanguage } from '@/utils/api.js'
import { useI18n } from "vue-i18n";
import { ref, watch, nextTick, reactive, computed } from 'vue'
import { RouterView } from 'vue-router'
import useStore from '@/store/index.js'
import Loading from '@/components/Loading.vue'
import ws from "@/utils/ws.js"
import { useRouter } from 'vue-router'
import { Locale } from 'vant';
const router = useRouter()
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('hourechargeselect')
})
// pinia状态管理仓库
const store = useStore();

var bodyDom = document.querySelector('body')
console.log('bodyDom', bodyDom)
setStyleDark()
// 设置样式
function setStyleDark() {
  if(store.isDark) {
    nextTick(() => {
      bodyDom.className = 'v_theme_dark'
    })
  }else {
    nextTick(() => {
      bodyDom.className = ''
    })
  }
}

var transitionName = ref('')

let show = ref(false)

apiGetConfigHandel()

// 获取系统配置
async function apiGetConfigHandel() {
  const { success, data } = await apiGetConfig()
  if(!success) return
  store.langList = data.langList
  store.banner = data.banner
  store.kefu = data.kefu
  store.system = data.system
  document.title = data.system.WebTitle
  console.log(data)
  if(store.lang) {
    loadLanguageAsync(store.lang)
  }else {
      if(data.system.Lang) {
        loadLanguageAsync(data.system.Lang)
      }else {
        browserSetGlobalLang()
      }
  }
  console.log('store', store)
}

// 浏览器识别语言
function browserSetGlobalLang() {
  var codeList = store.langList.map(item => {
    return item.code 
  })
  var jsLanguage = (navigator.language || navigator.browserLanguage).toLowerCase();
  console.log('jsLanguage12222222111', jsLanguage)
  // 假如浏览器语言是繁体中文且在语言列表中存在
  if(jsLanguage.indexOf('zh-tw')>= 0 && codeList.indexOf('zh-TW') > -1) {
      loadLanguageAsync('zh-TW')
      return
  }
  else if(jsLanguage.indexOf('zh')>= 0 && codeList.indexOf('zh-CN') > -1) {
    loadLanguageAsync('zh-CN')
    return
  }
  else if(jsLanguage.indexOf('en')>= 0 && codeList.indexOf('en') > -1) {
    loadLanguageAsync('en')
    return
  }
  else if(jsLanguage.indexOf('vi')>= 0 && codeList.indexOf('vi') > -1) {
    loadLanguageAsync('vi')
    return
  }
  loadLanguageAsync('en')
}

// 获取本地货币 先不做
async function apiGetCurrencyDataHandel(lang) {
  const { success, data } = await apiGetCurrencyData({ lang: lang })
  if(!success) return
  store.setCurrency(data.currency)
  console.log('store.currency', store.currency)
  loadLanguageAsync(lang)
}

// 加载语言包
async function loadLanguageAsync (lang) {
  console.log('i18nObj.locale.value222222222', i18nObj.locale.value)
  console.log('params', lang)
  if (i18nObj.locale.value !== lang) { //如果传入的变量 不等于 i18插件的语言值 (切换过一次，再切换第二次就不会再去加载一遍了)
    if(!store.loadedLanguages.includes(lang)) { //如果加载的这个语言不包含在默认加载的语言里面
        return apiLoadLanguageHandel(lang)
    }else {
      //如果传入的语言变量值等于现在i18n控件的默认语言值 //不等于也会去设置
      return Promise.resolve(setI18nLanguage(lang)); //处理一些默认信息
    }   
  } else {
      apiLoadLanguageHandel(lang)
  }
}

// 请求语言数据
async function apiLoadLanguageHandel(lang) {
  const { success, data } = await apiLoadLanguage({ lang: lang, id: 1 })
  if(!success) return
  // 如果映射表存在这个
  console.log(Object.prototype.hasOwnProperty.call(store.langObj, lang))
  i18nObj.setLocaleMessage(lang, data.data);
  //设置i18n的语言message切换成这个
  store.loadedLanguages.push(lang); //本地已经加载的语言 加入 loadedLanguages
  setI18nLanguage(lang);
}

let loadingDom = document.getElementById('app-loading')

// 设置语言
function setI18nLanguage(lang) {
  store.setLanguage(lang)
  i18nObj.locale.value = lang;  
  console.log('i18nObj.locale.value', i18nObj.locale.value) 
  console.log('store.lang', store.lang) 
  if(Object.prototype.hasOwnProperty.call(store.langObj,lang)) {
    Locale.use(lang, store.langObj[lang]);
  }else {
    Locale.use('en', store.langObj['en']);
  }
  //设置i18n的默认语言
  document.querySelector('html').setAttribute('lang', lang) //设置html的语言
  loadingDom.style.display = 'none'
  show.value = true
  return lang
}   

// 全局audio静音播放触发
function init(audio) {
  store.audio = audio.value
}

console.log('router', router)

watch(() => router.currentRoute.value, (to, from) => {
  if(from.fullPath == '/') return
  if(to.meta.index > from.meta.index) {  //前进
      // console.log('前进')
      transitionName.value = 'slide-left';
    }else if(to.meta.index == from.meta.index){ 
      // console.log('没进没退')
      transitionName.value = ''
    } else {
      //后退
      console.log('后退')
      transitionName.value = 'slide-right';
    }
}, { deep: true })
</script>
<style lang="scss">
// 骨架屏测试 暂时无用
.skeleton {
  background-image: linear-gradient(-45deg, #f5f5f5 40%, #fff 55%, #f5f5f5 63%);
  // width: 300px;
  // height: 100px;
  list-style: none;
  background-size: 400% 100%;
  background-position: 100% 50%;
  animation: skeleton-animation 2s ease infinite;
}

@keyframes skeleton-animation {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: constant(safe-area-inset-bottom); //苹果底部安全距离
  padding-bottom: env(safe-area-inset-bottom); //苹果底部安全距离
}


// body,html {
//   @include mediaMaxWidth();
//   margin: 0 auto;
// }

body,html,#app, .v_app {
  width: 100%;
  height: 100%;
  color: var(--g-black);
}

.v_app {
  position: relative;
}


// 前进
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
  width: 0%;
}

.slide-left-enter-active {
  will-change: transform;
  position: absolute;
  transition: all .4s;
  width:100%;
}

.slide-left-enter-to {
  transform: translateX(0px);
  opacity: 1;
  width: 100%;
}

.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
  width:100%;
}

.slide-left-leave-active {
  will-change: transform;
  transition: all .4s;
  position: absolute;
  opacity: 0;
  width: 0%;
}

.slide-left-leave-to {
  transform: translateX(-140px);
  opacity: 0;
  width: 0%;
}


// 后退
.slide-right-enter-from {
  transform: translateX(-140px);
  opacity: 1;
  width:100%;
}

.slide-right-enter-active {
  will-change: transform;
  position: absolute;
  transition: all .4s;
  opacity: 1;
  width:100%;
}

.slide-right-enter-to {
  transform: translateX(0%);
  opacity: 1;
  width:100%;
}

.slide-right-leave-from {
  transform: translateX(0);
  opacity: 0;
  width:0%;
}

.slide-right-leave-active {
  will-change: transform;
  transition: all .4s;
  position: absolute;
  opacity: 0;
  width: 0%;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
  width: 0%;
}

</style>
