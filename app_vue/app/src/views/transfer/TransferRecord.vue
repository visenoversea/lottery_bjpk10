<template>
    <div class="v_transfer g-flex-column n-bg">
      <div class="new-head">
        <div @click="$router.go(-1)" class="new-head-back">
          <img src="/images/back-icon.png" alt="" />
        </div>
        <!-- <div class="v-head-title g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.titleText }}</span>
        </div> -->
      </div>
    <div class="new-head_title_text">{{ i18n.titleText }}</div>
      <div class="v-transfer-title g-flex">{{ i18n.pendingTitleText }}</div>
      <div class="v-transfer-list-content">
        <van-list v-show="list.list.length" class="v-list" v-model:loading="loading" :finished="finished"
          :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad"
          :immediate-check="false">
          <div v-for="(item, index) in list.list" :key="index" class="v-list-item  g-flex-justify-between">
            <div class="item-left">
              <p>Swap:{{ item.from_amount }} {{ item.from_currency }}</p>
              <span>{{ formatDate(item.create_time, 'YY/MM/DD HH:mm') }}</span>
            </div>
            <div class="item-right">
              <p class="item-top-amount">+{{ item.to_amount }} {{ item.to_currency }}</p>
              <span :class="item.status === 1 ? 'green' : 'red'">{{ item.status === 1 ? i18n.successText : i18n.FailedText }}</span>
            </div>
          </div>
           </van-list>
      </div>
    </div>
  </template>
  <script setup>
  import { apiExchangeList } from '@/utils/api.js'
  import { reactive, ref, computed, onMounted } from 'vue';
  import useStore from '@/store/index.js'
  import { useI18n } from "vue-i18n";
  import { formatDate } from '@/utils/index.js'
  // pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('myTransferRecord')
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
  // 获取充值记录
  const fetchData = async () => {
    store.loadingShow = true
    const { success, data } = await apiExchangeList(form)
    if (!success) return
    list.list = list.list.concat(data.list)
    loading.value = false
    finished.value = data.list.length ? false : true
  }
  const onLoad = () => {
    form.page++
    fetchData()
  }
  onMounted(() => {
    fetchData()
  })
  </script>
  <style lang='scss'>
  .v_transfer {
    height: 100%;
    overflow: auto;
    background-color: #f6f4f5;
    padding: 46px 20px 30px;
    .v-head {
      height: 46px;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      background: #fff;
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
        font-weight: 700;
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
    .v-transfer-title {
      padding: 23px 12px 10px;
      .name {
        font-family: Poppins, Poppins;
        font-weight: 600;
        font-size: 16px;
        color: #000000;
        font-style: normal;
        text-transform: none;
      }
      .balance {
        flex: 1;
        font-family: Poppins, Poppins;
        font-weight: 500;
        font-size: 14px;
        color: #5475F7;
        text-align: right;
        font-style: normal;
        text-transform: none;
      }
    }
    .v-transfer-list-content {
      width: 335px;
      border-radius: 8px;
      padding: 0 16px;
      background: var(--g-white);
      .v-list-item {
        height: 66px;
        padding: 16px 0;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        .item-left {
          p {
            height: 13px;
            font-family: Poppins, Poppins;
            font-weight: 500;
            font-size: 13px;
            color: #000000;
            line-height: 13px;
            font-style: normal;
            text-transform: none;
            margin-bottom: 5px;
          }
          span {
            height: 12px;
            font-family: Poppins, Poppins;
            font-weight: 400;
            font-size: 12px;
            color: #929292;
            line-height: 12px;
            font-style: normal;
            text-transform: none;
          }
        }
        .item-right {
          p {
            height: 14px;
            font-family: Poppins, Poppins;
            font-weight: 600;
            font-size: 14px;
            color: #000000;
            line-height: 14px;
            text-align: right;
            font-style: normal;
            text-transform: none;
            margin-bottom: 4px;
          }
          span {
            height: 13px;
            font-family: Poppins, Poppins;
            font-weight: 400;
            font-size: 13px;
            line-height: 13px;
            display: block;
            text-align: right;
            font-style: normal;
            text-transform: none;
            &.green {
              color: #1EB483;
            }
            &.red {
              color: #DE1B1B;
            }

          }
        }
      }
    }
  }
  </style>