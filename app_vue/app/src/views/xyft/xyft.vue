<template>
  <div class="v_wallet_list g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <img src="/images/back-icon.png" alt="" />
      </div>
    </div>
    <div class="new-head_title_text">幸运飞艇</div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import useStore from "@/store/index.js";
import { apiGetWalletAddressList, apiDelWalletAddress } from "@/utils/api.js";
import { Dialog, Toast } from "vant";
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("walletlist");
});

</script>

<style lang='scss'>
.v_wallet_list {
  height: 100%;
  overflow: auto;
  // background-color: var(--g-white);
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    z-index: 99;
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
        color: var(--g-black);
      }
    }
    .v-head-title {
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 16px;
      color: var(--g-black);
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
        color: var(--g-black);
      }
    }
  }
}
</style>