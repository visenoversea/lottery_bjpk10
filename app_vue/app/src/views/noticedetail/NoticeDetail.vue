<template>
  <div class="v_notice_detail g-g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <img src="/images/back-icon.png" alt="" />
        <!-- <i class="iconfont icon-zuo"></i> -->
      </div>
      <!-- <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div> -->
      <!-- <div class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div> -->
    </div>
    <div class="new-head_title_text">{{ i18n.titleText }}</div>
    <div class="v-notice-detail-container">
      <div class="v-notice-detail-title">
        {{ infoObj.obj.title }}
      </div>
      <div class="v-notice-detail-time">
        {{ formatDate(infoObj.obj.create_time, 'YYYY/MM/DD HH:mm') }}
      </div>
      <!-- <div class="v-notice-content" v-html="infoObj.obj.des"></div> -->
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

  .v-notice-detail-container {
    flex: 1;
    overflow: auto;
    padding: 15px;
    padding-top: 50px;
    .v-notice-detail-title {
      font-size: 20px;
      color: #fff;
      line-height: 26px;
    }

    .v-notice-detail-time {
      padding-top: 10px;
      font-size: 14px;
      color: #fff;
    }

    .v-notice-content {
      padding: 15px 0;
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>