<template>
  <div class="v_cashout_history g-flex-column">
    <div class="v-head g-flex-justify-center g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

      <!-- <div @click="$router.push({ name: 'rechargehistory'})" class="v-head-right g-flex-align-center">
      <i class="iconfont icon-datijilu"></i>
    </div> -->
    </div>
    <div class="v-history-container g-flex-column">
      <div class="v-finance-list-box">
        <!-- <van-pull-refresh v-show="list.list.length" v-model="isLoading" :success-text="i18n.refreshSuccessText" @refresh="onRefresh"> -->
        <van-list v-show="list.list.length" class="v-list" v-model:loading="loading" :finished="finished"
          :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad"
          :immediate-check="false">
          <div v-for="(item, index) in list.list" :key="index" class="v-list-item">
            <div class="v-item-top g-flex-justify-between g-flex-align-center">
              <div class="v-item-top-title g-flex-align-center">
                <span>{{ item.from_currency }}</span>  
                <i class="iconfont icon-jiantou_xiangyou"></i> 
                <span>{{ item.to_currency }}</span>  
              </div>
              <div class="v-item-top-status g-flex-align-center">
                <span :class="filtersRealStatusClass(item.status)">{{ filtersRealStatus(item.status ) }}</span>
                <img src="/img/icon/user_icon_enter.png" alt="">
              </div>
            </div>
            <div class="v-item-bottom-list g-flex-align-center">
              <div class="v-bottom-list-item">
                <div class="v-bottom-list-item-title">
                  {{ i18n.exchangeText }}({{ item.from_currency }})
                </div>
                <div class="v-bottom-list-item-val">
                  {{ item.from_amount }} {{ item.from_currency }}
                </div>
              </div>

              <div class="v-bottom-list-item">
                <div class="v-bottom-list-item-title">
                  {{ i18n.getText }}({{ item.to_currency }})
                </div>
                <div class="v-bottom-list-item-val" >
                  {{ item.to_amount }} {{ item.to_currency }}
                </div>
              </div>

              <div class="v-bottom-list-item g-flex-column g-flex-align-end">
                <div class="v-bottom-list-item-title">
                  {{ i18n.timeText }}
                </div>
                <div class="v-bottom-list-item-val">
                  {{ formatDate(item.create_time, 'MM/dd hh:mm') }}
                </div>
              </div>
            </div>
          </div>
        </van-list>
        <!-- </van-pull-refresh> -->
        <NoList v-show="!list.list.length" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiExchangeOrderList } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
import { inoutClass, formatDate, filtersRealStatusClass, dotDealWith } from '@/utils/index.js'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('exchangeHistory')
})
const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})


let loading = ref(false)
let finished = ref(false)

let form = reactive({
  page: 1,
  limit: 30,
})

let list = reactive({
  list: []
})

// navTypeVal 充值
let navTypeVal = ref(1)

apiGetListHandel()

function onLoad() {
  form.page++
  apiGetListHandel()
}

// 获取充值记录
async function apiGetListHandel() {
  store.loadingShow = true
  const { success, data } = await apiExchangeOrderList(form)
  if (!success) return
  list.list = list.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}

function headNavItemClick() {
  form.page = 1
  list.list = []
  loading.value = true
  finished.value = false
  apiGetListHandel()
}

function filtersRealStatus(status) {
  if (status == 1) return i18n.value.statusAlreadyText
  else return i18n.value.statusNoFinishText
}


</script>

<style lang='scss'>
.v_cashout_history {
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

  .v-history-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;

    .v-history-nav-list {
      width: 100%;
      background-color: #f5f6f7;
      overflow: auto;

      .van-tabs__wrap {
        width: 100%;
      }

      .v-history-nav-list-item-title {
        font-size: 14px;
      }
    }
    .v-finance-list-box {
      flex: 1;
      overflow: auto;
      background: var(--g-white);
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
</style>