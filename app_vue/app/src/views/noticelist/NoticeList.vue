<template>
  <div class="v_notice_list g-flex-column">
    <div class="v-head g-flex-justify-center g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

      <!-- <div @click="$router.push({ name: 'rechargehistory'})" class="v-head-right g-flex-align-center">
     <i class="iconfont icon-datijilu"></i>
   </div> -->
    </div>
    <div class="v-notice-list-container">
      <van-list v-show="noticeList.list.length" class="v-list" v-model:loading="loading" :finished="finished"
        :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad" :immediate-check="false">
        <div @click="itemClick(item)" class="v-list-item" v-for="(item, index) in noticeList.list" :key="index">
          <p class="v-list-item-title">{{ item.title }}</p>
          <p class="v-list-item-des">{{ item.des }}</p>
        </div>
      </van-list>
      <NoList v-show="!noticeList.list.length" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { Dialog } from 'vant';
import { apiGetNoticeList } from '@/utils/api.js'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('noticelist')
})

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})

const router = useRouter()

let loading = ref(false)
let finished = ref(false)
let form = reactive({
  page: 1,
  limit: 30
})

let noticeList = reactive({ list: [] })

// 获取公告列表
async function apiGetListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetNoticeList(form)
  if (!success) return
  noticeList.list = noticeList.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}

apiGetListHandel()

function onLoad() {
  form.page++
  apiGetListHandel()
}
function itemClick(item) {
  router.push({ name: 'noticedetail', query: { id: item.id } })
}
</script>

<style lang='scss'>
.v_notice_list {
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

  .v-notice-list-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-title {
      padding: 20px 15px 15px 15px;
      font-size: 22px;
      line-height: 26px;
      color: #333;
      font-weight: 600;
    }

    .v-list {
      padding: 15px 15px 15px 15px;

      .v-list-item {
        border-bottom: 1px solid #f5f5f5;

        .v-list-item-title {
          color: #111;
          padding-top: 10px;
          font-size: 14px;
          line-height: 24px;
        }
        .v-list-item-des {
          color: #8b8b8b;
          font-size: 12px;
          line-height: 20px;
          padding-bottom: 10px;
          @include textEllipsis();
        }
      }
    }
  }
}
</style>