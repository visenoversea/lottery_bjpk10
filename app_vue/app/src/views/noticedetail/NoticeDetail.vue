<template>
  <div class="v_notice_detail g-g-flex-column">
    <div class="v-head g-flex-justify-center g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

      <!-- <div @click="$router.push({ name: 'rechargehistory'})" class="v-head-right g-flex-align-center">
     <i class="iconfont icon-datijilu"></i>
   </div> -->
    </div>
    <div class="v-notice-detail-container">
      <div class="v-notice-detail-title">
        {{ infoObj.obj.title }}
      </div>
      <div class="v-notice-detail-time">
        {{ formatDate(infoObj.obj.create_time, 'yyyy/MM/dd hh:mm') }}
      </div>
      <!-- <div class="v-notice-detail-time">
        {{ infoObj.obj.des }}
      </div> -->
      <div class="v-notice-content" v-html="infoObj.obj.content"></div>
    </div>
  </div>
</template>

<script setup>
import { apiGetNoticeInfo } from '@/utils/api.js'
import { useRouter, useRoute } from 'vue-router';
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { formatDate } from '@/utils/index.js'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()

const i18n = computed(() => {
  return i18nObj.tm('noticedetail')
})

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})

const route = useRoute()
const router = useRouter()

let infoObj = reactive({ obj: { create_time: 0 } })

async function apiGetNoticeInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetNoticeInfo({ id: route.query.id })
  if (!success) return
  infoObj.obj = data.info
  console.log(data)
}

apiGetNoticeInfoHandel()
</script>

<style lang='scss'>
.v_notice_detail {
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

  .v-notice-detail-container {
    flex: 1;
    overflow: auto;
    padding: 15px;
    padding-top: 50px;
    .v-notice-detail-title {
      font-size: 20px;
      color: #111;
      line-height: 26px;
    }

    .v-notice-detail-time {
      padding-top: 10px;
      font-size: 14px;
      color: var(--g-grey);
    }

    .v-notice-content {
      padding: 15px 0;
      font-size: 14px;
      line-height: 1.5;
    }
  }
}
</style>