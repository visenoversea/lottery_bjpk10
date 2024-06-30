<template>
  <!-- 废弃废弃 -->
 <div class="v_cashout_control">
  <div class="v-head g-flex-justify-center g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i> 
      </div>
      <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

      <div @click="$router.push({ name: 'cashouthistory'})" class="v-head-right g-flex-align-center">
      <i class="iconfont icon-datijilu"></i>
    </div>
  </div>
  <div class="v-cashout-control-container">
    <div class="v-cashout-control-list">
      <div @click="$router.push({ name: 'bankcardlist' })" class="v-cashout-control-item g-flex-align-center">
        <div class="v-cashout-methon-item-left g-flex-align-center">
          <img src="/img/icon/extract_mode_bank.png" alt=""/>
          <span>{{ i18n.mycardText }}</span>
        </div>
        <div class="v-cashout-methon-item-right g-flex-align-center">
          <img src="/img/icon/user_icon_enter.png" alt=""/>
        </div>
      </div>
      <div @click="$router.push({ name: 'walletlist' })" class="v-cashout-control-item g-flex-align-center">
        <div class="v-cashout-methon-item-left g-flex-align-center">
          <img src="/img/icon/extract_mode_number.png" alt=""/>
          <span>{{ i18n.mywalletText }}</span>
        </div>
        <div class="v-cashout-methon-item-right g-flex-align-center">
          <img src="/img/icon/user_icon_enter.png" alt=""/>
        </div>
      </div>
    </div>
  </div>
 </div>
</template>

<script setup>
import { computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('cashoutControl')
})
</script>

<style lang='scss'>
.v_cashout_control {
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
      font-weight: 600;
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
  .v-cashout-control-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    padding-bottom: 70px;
    .v-cashout-control-list {
      padding: 15px;
      .v-cashout-control-item {
        padding: 15px 0;
        border-bottom: 1px solid #e2e2e2;
        .v-cashout-methon-item-left {
          flex: 1;
          img {
            width: 22px;
          }
          span {
            font-size: 14px;
            color: #111;
            padding-left: 10px;
          }
        }
        .v-cashout-methon-item-right {
          padding-right: 5px;
          img {
            width: 10px;
          }
        }
      }
    }
  }
}
</style>