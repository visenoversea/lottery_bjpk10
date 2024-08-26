<template>
  <div class="v_wakuang_order_list g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <!-- <i class="iconfont icon-zuo"></i> -->
        <img src="/images/back-icon.png" alt="" />
      </div>
      <!-- <div class="v-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div> -->
      <!-- <div class="v-head-right g-flex-align-center">
      <i class="iconfont icon-datijilu"></i>
    </div> -->
    </div>
    <div class="new-head_title_text">{{ i18n.titleText }}</div>
    <div class="v-wakuang-order-container">
      <van-list class="v-list" v-model:loading="loading" :finished="finished" :loading-text="i18n2.loadingText"
        :finished-text="i18n2.finishText" @load="onLoad" :immediate-check="false">
        <div class="v-item" v-for="(item, index) in list.list" :key="index">
          <div class="v-item-top g-flex-justify-between g-flex-align-center">
            <div class="v-item-top-left">
              {{ item.title }}{{ i18n.suochangText }}/{{ item.day }} {{ i18n.dayText }}
            </div>
            <div :class="filtersStatusClassName(item.status)" class="v-item-top-right">
              {{ filtersStatus(item.status) }}
            </div>
          </div>
          <div class="v-item-bottom-list g-flex-align-center">
            <div class="v-bottom-list-item g-flex-column">
              <p class="v-bottom-list-item-title">{{ i18n.suocangMoneyText }}</p>
              <span class="v-bottom-list-item-val">{{ item.amount }}{{item.currency}}</span>
            </div>
            <div class="v-bottom-list-item g-flex-column">
              <p class="v-bottom-list-item-title">{{ i18n.rishouyiLvText }}</p>
              <span class="v-bottom-list-item-val" v-if="item.min_rate == item.max_rate">{{ (Number(item.min_rate) * 100).toFixed(2) }}%</span>
              <span class="v-bottom-list-item-val" v-else>{{ (Number(item.min_rate) * 100).toFixed(2) }} - {{
              (Number(item.max_rate) * 100).toFixed(2) }}%</span>
            </div>
            <div class="v-bottom-list-item g-flex-column g-flex-align-end">
              <p class="v-bottom-list-item-title">{{ i18n.suocangDayText }}</p>
              <span class="v-bottom-list-item-val">{{ item.day }} {{ i18n.dayText }}</span>
            </div>
          </div>
          <div class="v-item-bottom-list g-flex-align-center">
            <div class="v-bottom-list-item g-flex-column">
              <p class="v-bottom-list-item-title">{{ i18n.suocangTimeText }}</p>
              <span class="v-bottom-list-item-val">{{ formatDate(item.create_time, 'MM/DD HH:mm') }}</span>
            </div>
            <div class="v-bottom-list-item g-flex-column" v-show="item.status == 1">
              <p class="v-bottom-list-item-title">{{ i18n.daoqiTimeText }}</p>
              <span class="v-bottom-list-item-val">{{ formatDate(item.end_time, 'MM/DD HH:mm') }}</span>
            </div>
            <div class="v-bottom-list-item g-flex-column" v-show="item.status == 2">
              <p class="v-bottom-list-item-title">{{ i18n.shuhuiTimeText }}</p>
              <span class="v-bottom-list-item-val">{{ formatDate(item.back_time, 'MM/DD HH:mm') }}</span>
            </div>
            <div v-if="item.status != 4" class="v-bottom-list-item g-flex-column g-flex-align-end">
              <p class="v-bottom-list-item-title">{{ i18n.shouyiText }}</p>
              <span class="v-bottom-list-item-val">{{ item.profit_amount }} {{item.currency}}</span>
            </div>
            <div v-if="item.status == 4" class="v-bottom-list-item g-flex-column g-flex-align-end">
              <p class="v-bottom-list-item-title">{{ i18n.shouyiText }}</p>
              <span class="v-bottom-list-item-val">{{ '0.00' }} {{item.currency}}</span>
            </div>
          </div>
          <div v-show="item.status == 0" class="v-item-bottom-list g-red g-flex-align-center">
            <div class="v-bottom-list-item v-bottom-list-item-fail-reason g-flex-align-center">
              <span>{{ i18n.shibaiYuanYingText }}:</span>
              <span>{{ item.reason }}</span>
            </div>
          </div>
          <div v-show="item.status == 1" class="v-item-btn-list g-flex-justify-end">
            <div @click="shuhuiClick(item)" class="v-item-btn-item g-flex-align-center g-flex-justify-center">
              <span>{{ i18n.tiqianShuHuiText }}</span>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <WaKuangOrderListPop @emitShuHuiSuccess="emitShuHuiSuccess" ref="refWaKuangOrderListPop" />
  </div>
</template>

<script setup>
import { apiWaKuangOrderList } from '@/utils/api.js'
import WaKuangOrderListPop from './WaKuangOrderListPop.vue'
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { formatDate } from '@/utils/index.js'
import { Toast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
// pinia状态管理仓库
const store = useStore();
const route = useRoute()
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('waKuangOrderList')
})

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})

let loading = ref(false)

let finished = ref(false)

let form = reactive({
  page: 1,
  limit: 30,
  type: Number(route.query.type) || 1
})


let list = reactive({
  list: []
})


// status 0 审核失败 1锁仓中 2赎回 3审核中 4提前赎回
function filtersStatus(status) {
  if (status == 0) return i18n.value.shenheshibaiText
  if (status == 1) return i18n.value.suocangIngText
  if (status == 2) return i18n.value.yishuhuiText
  if (status == 3) return i18n.value.shenhezhongText
  if (status == 4) return i18n.value.tiqianShuHuiText
}

function filtersStatusClassName(status) {
  if (status == 0) return 'g-red'
  if (status == 1) return 'g-green'
  if (status == 2) return 'g-grey'
  if (status == 3) return 'g-blue'
  if (status == 4) return 'g-yellow'
}

const refWaKuangOrderListPop = ref(null)

function shuhuiClick(item) {
  Toast(i18n.value.lianxikefuText)
  // refWaKuangOrderListPop.value.onShow(item)
}

function onLoad() {
  form.page++
  apiGetListHandel()
}

apiGetListHandel()

async function apiGetListHandel() {
  const { success, data } = await apiWaKuangOrderList(form)
  if (!success) return
  list.list = list.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}

// 赎回成功触发
function emitShuHuiSuccess() {
  form.page = 1
  list.list = []
  loading.value = false
  loading.finished = false
  apiGetListHandel()
}
</script>

<style lang='scss'>
.v_wakuang_order_list {
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

  .v-wakuang-order-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-list {
      .v-item {
        padding: 15px;
        border-bottom: 1px solid #e2e2e2;

        .v-item-top {
          color: #111;

          .v-item-top-left {
            font-size: 17px;
          }

          .v-item-top-right {
            font-size: 14px;
            color: #9ba7b2;
          }
        }

        .v-item-bottom-list {
          padding-top: 15px;

          .v-bottom-list-item {
            flex: 1;

            .v-bottom-list-item-title {
              color: #9ba7b2;
              font-size: 13px;
            }

            .v-bottom-list-item-val {
              color: #111;
              font-size: 14px;
              padding-top: 5px;
            }
          }
        }

        .v-item-btn-list {
          padding-top: 10px;

          .v-item-btn-item {
            background-color: var(--g-main_color);
            color: #fff;
            height: 32px;
            padding: 0 15px;
            border-radius: 5px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>