<template>
  <div class="v_language_set n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <img src="/images/back-icon.png" alt="" />
      </div>
      <!-- <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div> -->
      <!-- <div class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div> -->
    </div>
    <div class="new-head_title_text">{{ i18n.titleText }}</div>
    <div class="v-language-set-container">
      <div class="v-language-set-list">
        <div @click="itemClick(item, index)" :class="languageIndex == index ? 'active' : ''"
          class="v-language-set-item g-flex-align-center" v-for="(item, index) in store.langList" :key="index">
          <div class="v-item-left g-flex-align-center">
            <img :src="item.icon" alt="" />
            <span>{{ item.name }}</span>
          </div>
          <div v-show="languageIndex == index" class="v-item-right">
            <i class="iconfont icon-xuanzhong" ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {apiGetKefuConfig, apiGetConfig, apiLoadLanguage} from "@/utils/api.js";
import { computed } from "vue";
import useStore from "@/store/index.js";
import { useI18n } from "vue-i18n";
import { Locale } from "vant";
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("languageSet");
});

// pinia状态管理仓库
const store = useStore();

let languageIndex = computed(() => {
  if (!store.langList.length) return -1;
  return store.langList.findIndex((item) => {
    return item.code == store.lang;
  });
});

console.log("languageIndex.value", languageIndex.value);

function itemClick(item, index) {
  if (languageIndex.value == index) return;
  loadLanguageAsync(item.code);
}

// 获取配置
// async function apiGetConfigHandel() {
//   const { success, data } = await apiGetKefuConfig({ id: 1 });
//   if (!success) return;
//   store.system.ProductType = data.info.ProductType;
// }

// 获取系统配置
async function apiGetConfigHandel() {
  const { success, data } = await apiGetConfig()
  if(!success) return
  store.banner = data.banner
}

// 获取本地货币 先不做
async function apiGetCurrencyDataHandel(lang) {
  const { success, data } = await apiGetCurrencyData({ lang: lang });
  if (!success) return;
  store.setCurrency(data.currency);
  console.log("store.currency", store.currency);
  loadLanguageAsync(lang);
}

// 加载语言包
async function loadLanguageAsync(lang) {
  console.log("i18nObj.locale.value222222222", i18nObj.locale.value);
  console.log("params", lang);
  if (i18nObj.locale.value !== lang) {
    //如果传入的变量 不等于 i18插件的语言值 (切换过一次，再切换第二次就不会再去加载一遍了)
    if (!store.loadedLanguages.includes(lang)) {
      //如果加载的这个语言不包含在默认加载的语言里面
      return apiLoadLanguageHandel(lang);
    } else {
      //如果传入的语言变量值等于现在i18n控件的默认语言值 //不等于也会去设置
      return Promise.resolve(setI18nLanguage(lang)); //处理一些默认信息
    }
  } else {
    apiLoadLanguageHandel(lang);
  }
}

// 请求语言数据
async function apiLoadLanguageHandel(lang) {
  store.loadingShow = true;
  const { success, data } = await apiLoadLanguage({ lang: lang, id: 1 });
  if (!success) return;
  // 如果映射表存在这个
  console.log(Object.prototype.hasOwnProperty.call(store.langObj, lang));
  i18nObj.setLocaleMessage(lang, data.data);
  //设置i18n的语言message切换成这个
  store.loadedLanguages.push(lang); //本地已经加载的语言 加入 loadedLanguages
  setI18nLanguage(lang);
}

// 设置语言
function setI18nLanguage(lang) {
  store.setLanguage(lang);
  i18nObj.locale.value = lang;
  console.log("i18nObj.locale.value", i18nObj.locale.value);
  console.log("store.lang", store.lang);
  if (Object.prototype.hasOwnProperty.call(store.langObj, lang)) {
    Locale.use(lang, store.langObj[lang]);
  } else {
    Locale.use("en", store.langObj["en"]);
  }
  //设置i18n的默认语言
  document.querySelector("html").setAttribute("lang", lang); //设置html的语言
  apiGetConfigHandel();
  return lang;
}
</script>

<style lang="scss">
.v_language_set {
  height: 100%;
  overflow: auto;
  // background-color: var(--g-white);

  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    z-index: 9;
    top: 0;
    width: 100%;
    background-color: var(--g-white);

    .v-head-back-icon {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      padding: 0 16px;

      .iconfont {
        font-size: 26px;
        font-weight: 700;
        color: #fff;
      }
    }

    .v-head-title {
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 16px;
      color: #fff;
      font-weight: 700;
    }

    .v-head-right {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      padding: 0 0 0 10px;

      .iconfont {
        font-size: 22px;
        font-weight: 700;
        color: #fff;
      }
    }
  }

  .v-language-set-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;

    .v-language-set-list {
      padding: 15px;
      color: #fff;
      .v-language-set-item {
        position: relative;
        padding: 15px 0;
        border-bottom: 0.5px solid #e4e7ed;

        .icon-xuanzhong {
          color: #fff!important;
        }

        &.active {
          color: var(--g-main_color);
        }

        .v-item-left {
          flex: 1;

          img {
            width: 22px;
            height: 22px;
            border-radius: 50%;
          }

          span {
            font-size: 14px;
            padding-left: 10px;
          }
        }

        .v-item-right {
          right: 0;
          position: absolute;
          .iconfont {
            color: var(--g-main_color);
            font-size: 24px;
          }
          img {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
}
</style>
