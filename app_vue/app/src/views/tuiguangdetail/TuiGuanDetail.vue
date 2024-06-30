<template>
<div class="v_tuiguang_deatil g-flex-column">
  <div class="v-head g-flex-justify-center g-flex-align-center">
    <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
      <i class="iconfont icon-zuojiantou"></i>
    </div>
    <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

    <!-- <div @click="$router.push({ name: 'rechargehistory'})" class="v-head-right g-flex-align-center">
    <i class="iconfont icon-datijilu"></i>
  </div> -->
  </div>
  <div class="v-tuiguang-container g-flex-column">
    <div class="v-tuiguang-bottom-title-list g-flex-align-center">
      <div class="v-tuiguang-bottom-title-item g-flex-align-center">
        <span>{{ i18n.userIdText }}</span>
      </div>
      <div class="v-tuiguang-bottom-title-item g-flex-justify-center g-flex-align-center">
        <span>{{ i18n.bizhongText }}</span>
      </div>
      <div class="v-tuiguang-bottom-title-item g-flex-align-center g-flex-justify-end">
        <span>{{ i18n.shuerText }}</span>
      </div>
    </div>

    <div class="v-tuiguang-bottom-list-box">
      <van-list v-show="list.list.length" class="v-list" v-model:loading="loading" :finished="finished"
      :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad"
      :immediate-check="false">
        <div class="v-tuiguang-bottom-item g-flex-align-center" v-for="(item, index) in list.list" :key="index">
          <div class="v-tuiguang-bottom-item-content g-flex-align-center">
            <span>{{ item.rebate_id }}</span>
          </div>
          <div class="v-tuiguang-bottom-item-content g-flex-align-center g-flex-justify-center">
            <span>{{ item.currency }}</span>
          </div>
          <div class="v-tuiguang-bottom-item-content v-tuiguang-bottom-item-content-money g-flex-align-center g-flex-justify-end">
            <span>{{ item.amount }}</span>
          </div>
        </div>
      </van-list>
      <NoList v-show="!list.list.length"/>
    </div>
  </div>
</div>
</template>

<script setup>
import { apiGetTuiGuangDetailList } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('tuiguangDetail')
})
const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})


let loading = ref(false)
let finished = ref(false)

let form = reactive({
  page: 1,
  limit: 30
})

let list = reactive({
  list: []
})

apiGetListHandel()

function onLoad() {
  form.page++
  apiGetListHandel()
}

// 获取推广详情
async function apiGetListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetTuiGuangDetailList(form)
  if (!success) return
  list.list = list.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}
</script>

<style lang='scss'>
.v_tuiguang_deatil {
  height: 100%;
  overflow: auto;
  background-color: #f5f6f7;

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
  .v-tuiguang-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-tuiguang-bottom-title-list {
      padding: 15px;
      background-color: var(--g-white);
      border-bottom: 1px solid #f2f4f7;
      .v-tuiguang-bottom-title-item {
        flex: 1;
        font-size: 12px;
        font-weight: 700;
      }
    }
    .v-tuiguang-bottom-list-box {
      flex: 1;
      overflow: auto;
      position: relative;
      background-color: var(--g-white);
      .v-list {
        .v-tuiguang-bottom-item {
          border-bottom: 1px solid #f2f4f7;
          padding: 15px;
          .v-tuiguang-bottom-item-content {
            flex: 1;
            font-size: 14px;
            font-weight: 600;
            &.v-tuiguang-bottom-item-content-money {
              color: var(--g-red);
            }
          }
        }
      }
    }
  }
}
</style>