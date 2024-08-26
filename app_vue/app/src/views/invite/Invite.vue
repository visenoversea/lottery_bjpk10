<template>
  <div class="v_share g-flex-column n-bg">
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
    <!-- <div class="new-head_title_text">{{ i18n.titleText }}</div> -->
    
    <div  class="v-share-container">
      <img class="feiji" src="/images/feiji.png" alt="" />
      <div class="v-share-card g-flex-column g-flex-align-center">
        <div class="v-share-qr-box g-flex-justify-center">
          <vue-qr v-if="form.address" :correctLevel="3" ref="refVueQr" :text="form.address" :margin="marginVal"
            :size="130"></vue-qr>
        </div>
        <div class="v-share-address">
          <span>{{ form.address }}</span>
        </div>
        
      </div>
    </div>

    <div @click="copyClick(form.address)" class="v-shares-btn g-flex-align-center g-flex-justify-center">
      <span>{{ i18n.copyInviteText }}</span>
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
  return i18nObj.tm('invite')
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
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
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
        color: var(--g-black);
      }
    }
    .v-head-title {
      flex: 1;
      height: 100%;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      color: var(--g-black);
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
        color: var(--g-black);
      }
    }
  }

  .v-share-container {
    // flex: 1;
    overflow: hidden;
    // margin-top: -180px;
    // padding-bottom: 30px;
    // background-image: url('/images/ewmBg.png');
    // background-size: 100% 70%;
    // background-position: center;
    // background-repeat: no-repeat;
    position: relative;

    .feiji {
      width: 160px;
      position: absolute;
      right: -0px;
      top: -24px;
    }
    .v-share-card {
      // padding: 10px 0 10px 0;
        background: #4d4d50;
        margin: 30px;
        padding: 0 0 10px;
        border-radius: 20px;
      .v-share-qr-box {
        // margin: 80px;
        // border: 1px solid var(--g-main_color);
        padding: 20px;
        margin-top: 100px;
        background-color: #fff;
        border-radius: 10px;

        img {
          width: 175px;
          height: 175px;
        }
      }

      .v-share-address {
        padding: 40px 10px 10px 10px;
        line-height: 26px;
        border-radius: 5px;
        font-size: 14px;
        color: #fff;
        margin: 0px auto 0px;
        border-radius: 50px;  
      }


    }
  }
  .v-shares-btn {
    margin-top: 50px;
    height: 60px;
    width: 84%;
    border-radius: 5px;
    background: var(--g-main_color);
    color: var(--g-white);
    font-size: 16px;
    margin: 0 auto 30px;
    border-radius: 50px;
  }
}</style>