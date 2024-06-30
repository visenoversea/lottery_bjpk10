<template>
<div class="v_share g-flex-column">
  <div class="v-head g-flex-justify-center g-flex-align-center">
    <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
      <i class="iconfont icon-zuojiantou"></i>
    </div>
    <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

    <!-- <div @click="$router.push({ name: 'rechargehistory'})" class="v-head-right g-flex-align-center">
    <i class="iconfont icon-datijilu"></i>
  </div> -->
  </div>
  <div :style="{ backgroundImage: `url(${store.banner.tg})` }" class="v-share-container">
    <div class="v-share-card g-flex-column g-flex-align-center">
      <div class="v-share-qr-box g-flex-justify-center">
        <vue-qr v-if="form.address" :correctLevel="3" ref="refVueQr" :text="form.address" :margin="marginVal" :size="130" ></vue-qr>
      </div>
      <div class="v-share-address">
        <span>{{ form.address }}</span>
      </div>
      <div @click="copyClick(form.address)" class="v-share-btn g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.shareLinkText }}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { apiGetUserInfo } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
import { copyClick } from '@/utils/index.js'
let form = reactive({
  address: ''
})
let marginVal = ref(5)
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('share')
})
const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})

let userInfo = computed(() => {
  return store.userInfo
})

async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
  form.address = data.info.promoteUrl
  console.log(data)
}

apiGetUserInfoHandel()
</script>

<style lang='scss'>
.v_share {
  height: 100%;
  overflow: auto;

  .v-head {
    height: 50px;
    width: 100%;
    line-height: 50px;
    position: fixed;
    top: 0;
    background-color: var(--g-white);
    font-size: 14px;
    color: var(--g-less-black);
    z-index: 999;

    .v-head-back-icon {
      position: absolute;
      height: 100%;
      left: 0;
      padding: 15px;

      .iconfont {
        position: absolute;
        font-size: 26px;
        left: 10px;
        font-weight: 700;
      }
    }

    .v-title {
      font-size: 18px;
      flex: 1;
      height: 100%;
      font-weight: 700;
    }

    .v-head-right {
      position: absolute;
      height: 100%;
      right: 15px;

      .iconfont {
        font-size: 22px;
      }
    }
  }
  .v-share-container {
    flex: 1;
    overflow: auto;
    padding-top: 80px;
    padding-bottom: 30px;
    background-size: cover;
    .v-share-card {
      width: 90%;
      margin: 40px auto 0 auto;
      padding: 30px 0 40px 0;
      border-radius: 15px;
      background-color: var(--g-white);
      .v-share-qr-box {
        margin-top: 30px;
        border: 1px solid var(--g-main_color);
        img {
          width: 175px;
          height: 175px;
        }
      }
      .v-share-address {
        width: 93%;
        margin-top: 40px;
        padding: 10px;
        line-height: 26px;
        background: linear-gradient(180deg,#dfe9fb,#fcf4e4);
        border-radius: 5px;
        font-size: 14px;
        text-decoration: underline;
      }
      .v-share-btn {
        margin-top: 34px;
        height: 44px;
        width: 93%;
        border-radius: 5px;
        background: var(--g-main_color);
        color: var(--g-white);
        font-size: 16px;
      }
    }
  }
}
</style>