<template>
  <div class="v_my_bill g-flex-column">
    <div class="v-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <div class="v-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div>
    </div>
    <div class="v-licai-container-box g-flex-column">
      <div class="v-licai-head g-flex-align-center g-flex-justify-center">
        <div class="v-licai-head-list g-flex-align-center">
          <div @click="navItemClick(0)" :class="navTypeVal == 0 ? 'active' : ''"
            class="v-licai-head-item g-flex-justify-center g-flex-align-center">
            <div class="v-licai-head-item-title">{{ i18n.minxiText }}</div>
          </div>
          <div @click="navItemClick(1)" :class="navTypeVal == 1 ? 'active' : ''"
            class="v-licai-head-item g-flex-justify-center g-flex-align-center">
            <div class="v-licai-head-item-title">{{ i18n.rechargeHistoryText }}</div>
          </div>
          <div @click="navItemClick(2)" :class="navTypeVal == 2 ? 'active' : ''"
            class="v-licai-head-item g-flex-align-center g-flex-justify-center">
            <div class="v-licai-head-item-title">{{ i18n.cashoutHistoryText }}</div>
          </div>
        </div>
      </div>
      <div class="v-my-bill-container">
        <div v-if="navTypeVal == 0" class="v-my-bill-content">
          <van-list v-show="list.list.length" class="v-list" v-model:loading="loading" :finished="finished"
            :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad" :immediate-check="false">
            <div v-for="(item, index) in list.list" :key="index" class="v-list-item">
              <div class="v-list-item-top g-flex-align-center g-flex-justify-between">
                <div class="v-list-item-top-title">
                  {{ item.title }}
                </div>
                <div :class="inoutClass(item.amount)" class="v-list-item-top-money">
                  <!-- {{ item.currency }} -->
                  {{ Number(item.amount) >= 0 ? ('+' + item.amount) : item.amount }} 
                </div>
              </div>

              <div class="v-list-item-middle g-flex-align-center">
                <div class="v-list-item-middle-title">
                  {{ item.des }}
                </div>
              </div>

              <div class="v-list-item-bottom g-flex-justify-between g-flex-align-center">
                <div class="v-list-item-middle-time">
                  {{ formatDate(item.create_time, 'yyyy/MM/dd hh:mm:ss') }}
                </div>
                <!-- <div class="v-list-item-middle-balance">
                {{ i18n.balanceText }}: {{ item.balance }}
              </div> -->
              </div>

            </div>
          </van-list>
          <no-list v-show="!list.list.length" />
        </div>

        <div v-if="navTypeVal != 0" class="v-finance-list-box">
          <!-- <van-pull-refresh v-show="listSecond.list.length" v-model="isLoading" :success-text="i18n3.refreshSuccessText" @refresh="onRefresh"> -->
          <van-list v-show="listSecond.list.length" class="v-list" v-model:loading="loading" :finished="finished"
            :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onSecondLoad"
            :immediate-check="false">
            <div @click="orderItemClick(item)" v-for="(item, index) in listSecond.list" :key="index" class="v-list-item">
              <div class="v-item-top g-flex-justify-between g-flex-align-center">
                <div class="v-item-top-title">
                  {{ item.title }}
                </div>
                <div class="v-item-top-status g-flex-align-center">
                  <span :class="filtersRealStatusClass(item.status)">{{ filtersRealStatus(item.status ) }}</span>
                  <img src="/img/icon/user_icon_enter.png" alt="">
                </div>
              </div>
              <div class="v-item-bottom-list g-flex-align-center">
                <!-- <div class="v-bottom-list-item">
                  <div class="v-bottom-list-item-title" v-show="navTypeVal == 1">
                    {{ i18n3.rechargeBiZhongText }}
                  </div>
                  <div class="v-bottom-list-item-title" v-show="navTypeVal == 2">
                    {{ i18n3.tixianBiZhongText }}
                  </div>
                  <div class="v-bottom-list-item-val">
                    {{ item.currency }}
                  </div>
                </div> -->

                <div class="v-bottom-list-item">
                  <div class="v-bottom-list-item-title">
                    {{ i18n3.moneyText }}
                  </div>
                  <div class="v-bottom-list-item-val" v-show="navTypeVal == 1">
                    <!-- {{ item.currency }} -->
                    {{ item.amount }} 
                  </div>
                  <div class="v-bottom-list-item-val" v-show="navTypeVal != 1 && store.system.WithdrawModel == 1">
                    <!--  {{ item.currency }} -->
                    {{ item.amount }}
                  </div>
                  <div class="v-bottom-list-item-val" v-show="navTypeVal != 1 && store.system.WithdrawModel == 2">
                    <!-- {{ item.currency }} -->
                    {{ item.apply_amount }} 
                  </div>
                </div>

                <div class="v-bottom-list-item g-flex-column g-flex-align-end">
                  <div class="v-bottom-list-item-title">
                    {{ i18n3.timeText }}
                  </div>
                  <div class="v-bottom-list-item-val">
                    {{ formatDate(item.create_time, 'MM/dd hh:mm') }}
                  </div>
                </div>
              </div>
            </div>
          </van-list>
          <!-- </van-pull-refresh> -->
          <NoList v-show="!listSecond.list.length" />
        </div>
      </div>
    </div>
    

    <CashoutDetailPop :typeVal="navTypeVal" ref="refCashoutDetailPop" />

  </div>
</template>

<script setup>
import CashoutDetailPop from '@/components/CashoutDetailPop.vue'
import { apiMyBillList, apiGetRechargeHistory, apiGetCashoutHistory } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
import { inoutClass, formatDate, filtersRealStatusClass, dotDealWith  } from '@/utils/index.js'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('mybill')
})
const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})

const i18n3 = computed(() => {
  return i18nObj.tm('mybill')
})

let loading = ref(false)
let finished = ref(false)

let form = reactive({
  page: 1,
  limit: 30
})

let navTypeVal = ref(0)

let list = reactive({
  list: []
})

apiGetListHandel()

function onLoad() {
  form.page++
  apiGetListHandel()
}

async function apiGetListHandel() {
  store.loadingShow = true
  const { success, data } = await apiMyBillList(form)
  if (!success) return
  list.list = list.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}

function navItemClick(val) {
  if (navTypeVal.value == val) return
  navTypeVal.value = val
  loading.value = true
  finished.value = false
  form.page = 1
  list.list = []
  listSecond.list = []
  if (navTypeVal.value == 0) {
    store.loadingShow = true
    apiGetListHandel()
  }
  else if (navTypeVal.value == 1) {
    store.loadingShow = true
    apiGetRechargeHistoryHandel()
  } else {
    store.loadingShow = true
    apiGetCashoutHistoryHandel()
  }
}

let isLoading = ref(false)

let listSecond = reactive({
  list: []
})

function onRefresh() {
  form.page = 1
  list.list = []
  listSecond.list = []
  if (navTypeVal.value == 1) {
    store.loadingShow = true
    apiGetRechargeHistoryHandel()
  } else {
    store.loadingShow = true
    apiGetCashoutHistoryHandel()
  }
}

function onSecondLoad() {
  form.page++
  if (navTypeVal.value == 1) return apiGetRechargeHistoryHandel()
  apiGetCashoutHistoryHandel()
}

// 获取充值记录
async function apiGetRechargeHistoryHandel() {
  const { success, data } = await apiGetRechargeHistory(form)
  if (!success) return
  listSecond.list = listSecond.list.concat(data.list)
  loading.value = false
  isLoading.value = false;
  finished.value = data.list.length ? false : true
  console.log(data)
}

// 获取提现记录
async function apiGetCashoutHistoryHandel() {
  const { success, data } = await apiGetCashoutHistory(form)
  if (!success) return
  listSecond.list = listSecond.list.concat(data.list)
  isLoading.value = false;
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}


const refCashoutDetailPop = ref(null)

function orderItemClick(item) {
  refCashoutDetailPop.value.onShow(item)
}

function filtersRealStatus(status) {
  // status 0 认证失败
  // status 1 认证成功
  // status 2 认证中
  if (status == 0) return i18n3.value.statusFailText
  if (status == 1) return i18n3.value.statusSuccessText
  if (status == 2) return i18n3.value.statusIngText
  if (status == 3) return i18n3.value.statusWaitText
}
</script>

<style lang='scss'>
.v_my_bill {
  height: 100%;
  overflow: auto;

  .v-head {
    position: fixed;
    width: 100%;
    padding: 0 15px;
    height: 50px;
    top: 0;
    left: 0;
    background-color: var(--g-white);
    z-index: 9;

    .v-head-back {
      position: absolute;
      height: 100%;

      .iconfont {
        font-size: 26px;
        font-weight: 700;
      }
    }

    .v-title {
      height: 100%;
      flex: 1;
      font-size: 18px;
      font-weight: 700;
    }

    .v-head-language {
      position: absolute;
      height: 100%;
      right: 15px;

      .v-head-language-img {
        padding: 3px;
        border-radius: 50%;
        overflow: hidden;
        background: #F5F7F9;

        .iconfont {
          font-size: 22px;
          color: #333;
          font-weight: 700;
        }
      }
    }
  }

  .v-licai-container-box {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-licai-head {
      height: 60px;
      // position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 9;
      background-color: var(--g-white);

      .v-licai-head-list {
        border: 1px solid #cfd1d0;
        height: 35px;
        border-radius: 4px;
        overflow: hidden;

        .v-licai-head-item {
          height: 100%;
          width: 116px;
          padding: 0 5px;
          font-weight: 500;
          color: #333;
          font-size: 14px;

          .v-licai-head-item-title {
            @include textManyOverflow()
          }

          &.active {
            background-color: var(--g-main_color);
            color: var(--g-white);
            border-radius: 4px;
          }
        }
      }
    }

    .v-my-bill-container {
      flex: 1;
      overflow: auto;
      color: #111;

      .v-title {
        padding: 20px 15px 15px 15px;
        font-size: 22px;
        line-height: 26px;
        color: #333;
        font-weight: 600;
      }

      .v-my-bill-content {
        .v-list {
          .v-list-item {
            padding: 15px;
            border-bottom: 1px solid #f2f2f2;

            .v-list-item-top {
              .v-list-item-top-title {
                font-size: 16px;
              }

              .v-list-item-top-money {
                font-size: 18px;
              }
            }

            .v-list-item-middle {
              padding: 10px 0;
              font-size: 14px;
            }

            .v-list-item-bottom {
              font-size: 14px;
            }
          }
        }
      }

      .v-finance-list-box {
        height: 100%;
        overflow: auto;
        color: #111;

        .v-list {
          .v-list-item {
            padding: 15px;
            border-bottom: 1px solid #f2f2f2;

            .v-item-top {
              .v-item-top-title {
                font-size: 16px;
              }

              .v-item-top-status {
                color: #878F94;
                font-size: 14px;

                img {
                  margin-left: 5px;
                  width: 10px;
                }
              }
            }

            .v-item-bottom-list {
              padding-top: 15px;

              .v-bottom-list-item {
                font-size: 14px;
                flex: 1;

                .v-bottom-list-item-title {
                  color: #878F94;
                }

                .v-bottom-list-item-val {
                  padding-top: 8px;
                  color: #111;
                }
              }

            }
          }
        }
      }
    }
  }
  
}
</style>