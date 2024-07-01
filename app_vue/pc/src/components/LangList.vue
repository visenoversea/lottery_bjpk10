<template>
  <div class="s_lang_list">
    <div class="s-list">
      <div @click="itemClick(item, index)" :class="languageIndex == index ? 'active' : ''"
        class="s-item g-flex-align-center" v-for="(item, index) in store.langList" :key="index">
        <div class="s-item-item-left">
          {{ item.name }}
        </div>
        <div class="s-item-item-right" v-show="languageIndex == index">
          <i class="iconfont icon-zhengquewancheng"></i>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { apiGetKefuConfig, apiLoadLanguage } from '@/utils/api.js'
import { computed, ref } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
// import { Locale } from 'vant';
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('languageSet')
})


// pinia状态管理仓库
const store = useStore();

// let elementLocal = ref(store.langObj['zh-CN'])

let languageIndex = computed(() => {
  if (!store.langList.length) return - 1
  return store.langList.findIndex(item => {
    return item.code == store.lang
  })
})

console.log('languageIndex.value', languageIndex.value)

function itemClick(item, index) {
  console.log('xxx')
  if (languageIndex.value == index) return
  loadLanguageAsync(item.code)
}

// 获取配置
async function apiGetConfigHandel() {
  const { success, data } = await apiGetKefuConfig({ id: 1 })
  if (!success) return
  store.system.ProductType = data.info.ProductType
}

// 获取本地货币 先不做
async function apiGetCurrencyDataHandel(lang) {
  const { success, data } = await apiGetCurrencyData({ lang: lang })
  if (!success) return
  store.setCurrency(data.currency)
  console.log('store.currency', store.currency)
  loadLanguageAsync(lang)
}

// 加载语言包
async function loadLanguageAsync(lang) {
  console.log('i18nObj.locale.value222222222', i18nObj.locale.value)
  console.log('params', lang)
  if (i18nObj.locale.value !== lang) { //如果传入的变量 不等于 i18插件的语言值 (切换过一次，再切换第二次就不会再去加载一遍了)
    if (!store.loadedLanguages.includes(lang)) { //如果加载的这个语言不包含在默认加载的语言里面
      return apiLoadLanguageHandel(lang)
    } else {
      //如果传入的语言变量值等于现在i18n控件的默认语言值 //不等于也会去设置
      return Promise.resolve(setI18nLanguage(lang)); //处理一些默认信息
    }
  } else {
    apiLoadLanguageHandel(lang)
  }
}

// 请求语言数据
async function apiLoadLanguageHandel(lang) {
  store.setLoadingShow(true)
  const { success, data } = await apiLoadLanguage({ lang: lang, id: 5 })
  if (!success) return
  // 如果映射表存在这个
  console.log(Object.prototype.hasOwnProperty.call(store.langObj, lang))
  i18nObj.setLocaleMessage(lang, data.data);
  //设置i18n的语言message切换成这个
  store.loadedLanguages.push(lang); //本地已经加载的语言 加入 loadedLanguages
  setI18nLanguage(lang);
}

let emits = defineEmits(['emitsSetLangeSuccess'])

// 设置语言
function setI18nLanguage(lang) {
  store.setLanguage(lang)
  i18nObj.locale.value = lang;
  console.log('i18nObj.locale.value', i18nObj.locale.value)
  console.log('store.lang', store.lang)
  // if(Object.prototype.hasOwnProperty.call(store.langObj,lang)) {
  //   elementLocal.value = store.langObj[lang]
  // }else {
  //   elementLocal.value = store.langObj['en']
  // }
  //设置i18n的默认语言
  document.querySelector('html').setAttribute('lang', lang) //设置html的语言
  // apiGetConfigHandel()
  emits('emitsSetLangeSuccess')
  return lang
}
</script>
  
<style lang='scss'>
.s_lang_list {
  width: 100%;

  .s-list {
    .s-item {
      margin-bottom: 8px;
      cursor: pointer;
      padding: 2px 10px;
      border-radius: 2px;

      &:hover {
        background-color: #EFF6FF;
      }

      &.active {
        color: var(--g-main_color);

        .s-item-item-right {
          .iconfont {
            color: var(--g-main_color);
          }
        }
      }

      .s-item-item-left {
        flex: 1;
        font-size: 14px;
      }

      .s-item-item-right {
        .iconfont {
          font-size: 22px;
        }
      }
    }
  }
}</style>