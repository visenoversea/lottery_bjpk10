<template>
  <div class="v_lianghua_history g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <!-- <i class="iconfont icon-zuo"></i> -->
        <img src="/images/back-icon.png" alt="">
      </div>
      <!-- <div class="v-head-title g-flex-align-center g-flWex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div> -->
      <!-- <div class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div> -->
    </div>
    <div class="new-head_title_text">{{ i18n.titleText }}</div>
    <div class="v-history-container g-flex-column">
      <!-- <van-tabs line-height="2px" color="#5488f7" title-inactive-color="#b1b7c2" title-active-color="#fff"
          background="#203036" class="v-history-nav-list g-flex-align-center" @change="headNavItemClick"
        :ellipsis="false" v-model:active="form.status">
        <van-tab title-class="v-history-nav-list-item-title" :name="''" :title="i18n.statusAllText">
        </van-tab>
        <van-tab title-class="v-history-nav-list-item-title" :name="2" :title="i18n.statusIngText">
        </van-tab>
        <van-tab title-class="v-history-nav-list-item-title" :name="1" :title="i18n.statusSuccessText">
        </van-tab>
        <van-tab title-class="v-history-nav-list-item-title" :name="0" :title="i18n.statusFailText">
        </van-tab>
      </van-tabs> -->
      <div class="v-finance-list-box">
        <!-- <van-pull-refresh v-show="list.list.length" v-model="isLoading" :success-text="i18n.refreshSuccessText" @refresh="onRefresh"> -->
        <van-list v-show="list.list.length" class="v-list" v-model:loading="loading" :finished="finished"
          :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad"
          :immediate-check="false">
          <div v-for="(item, index) in list.list" :key="index" class="v-list-item">
            <div class="v-item-top g-flex-justify-between g-flex-align-center">
              <div class="v-item-top-title g-flex-align-center">
                <img :src="item.icon" alt="">
                {{ item.currency }}
              </div>
              <div class="v-item-top-status g-flex-align-center">
                <span :class="filtersRealStatusClass(item.status)">{{ filtersRealStatus(item.status ) }}</span>
                <i class="iconfont icon-you"></i>
              </div>
            </div>

            <div class="cw-content">
              <!-- 执行仓位 -->
              <div class="v-bottom-list-item">
                <div class="v-bottom-list-item-title">
                  {{ i18n.zhixingcangweiText }}
                </div>
                <div class="v-bottom-list-item-val">
                  {{ item.amount }}
                </div>
              </div>

              <!-- 购买平台 -->
              <div class="v-bottom-list-item">
                <div class="v-bottom-list-item-title">
                  {{ i18n.buyPlatText }}
                </div>
                <div class="v-bottom-list-item-val">
                  {{ item.buy_platform }}
                </div>
              </div>
              <!-- 买入价格 -->
              <div class="v-bottom-list-item">
                <div class="v-bottom-list-item-title">
                  {{ i18n.buyPriceText }}
                </div>
                <div class="v-bottom-list-item-val">
                  {{ item.buy_price }}
                </div>
              </div>

                <!-- 时间 -->
               <div class="v-bottom-list-item">
                <div class="v-bottom-list-item-title">
                  {{ i18n.timeText }}
                </div>
                <div class="v-bottom-list-item-val">
                  {{ formatDate(item.create_time, 'MM/DD HH:mm:ss')}}
                </div>
              </div>
              <!-- 销售平台 -->
              <div class="v-bottom-list-item">
                <div class="v-bottom-list-item-title">
                  {{ i18n.sellePlatText }}
                </div>
                <div class="v-bottom-list-item-val">
                  {{ item.sell_platform }}
                </div>
              </div>

              <!-- 卖出价 -->
              <div class="v-bottom-list-item">
                <div class="v-bottom-list-item-title">
                  {{ i18n.sellPirceText }}
                </div>
                <div class="v-bottom-list-item-val">
                  {{ item.sell_price }}
                </div>
              </div>
                <!-- 服务费 -->
               <div class="v-bottom-list-item">
                <div class="v-bottom-list-item-title">
                  {{ i18n.fuwufeiText }}
                </div>
                <div class="v-bottom-list-item-val">
                  {{ item.fee }}
                </div>
              </div>
             
              <!-- 利润 -->
              <div class="v-bottom-list-item">
                <div class="v-bottom-list-item-title">
                  {{ i18n.lirunText }}
                </div>
                <div class="v-bottom-list-item-val" :class="inoutClass(Number(item.profit))">
                  {{ Number(item.profit) >= 0 ? '+' + item.profit : item.profit }}
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
import { apiGetLiangHuaOrderList } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
import { inoutClass, formatDate, filtersRealStatusClass } from '@/utils/index.js'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('lianghuaHistory')
})
const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})


let loading = ref(false)
let finished = ref(false)

let form = reactive({
  page: 1,
  limit: 30,
  status: 1
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
  const { success, data } = await apiGetLiangHuaOrderList(form)
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
  // status 0 认证失败
  // status 1 认证成功
  // status 2 认证中
  if (status == 0) return i18n.value.statusFailText
  if (status == 1) return i18n.value.statusSuccessText
  if (status == 2) return i18n.value.statusIngText
  if (status == 3) return i18n.value.statusWaitText
}


</script>

<style lang='scss'>
.v_lianghua_history {
  height: 100%;
  overflow: auto;
  // background-color: var(--g-white);
  // background-color: #f6f4f5;
  padding-bottom: 10px;
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    background-color: #f6f4f5;
    // background-color: var(--g-white);
    .v-head-back-icon {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      padding: 0 16px;
      .iconfont {
        font-size: 26px;
        font-weight: 700;
        color: #fff;
      }
    }
    .v-head-title {
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }
    .v-head-right {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      padding: 0 0 0 10px;
      .iconfont {
        font-size: 22px;
        color: #fff;
      }
    }
  }

  .v-history-container {
    flex: 1;
    overflow: auto;
    padding-top: 20px;

    .v-history-nav-list {
      width: 100%;
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
      color: #fff;
      // background: #313132;
      .v-list {
        padding: 0 10px;
        .v-list-item {
          // background-color: var(--g-white);
          border-radius: 12px;
          padding: 15px;
          border-bottom: 1px solid #e4e7ed;
          margin-bottom: 10px;
          box-shadow: 0 2px 1px 0 rgba(0,0,0,.2);

          background: #313132;
          .v-item-top {
            .v-item-top-title {
              font-size: 16px;
              color: #fff;
              font-weight: 700;
              img {
                height: 20px;
                margin-right: 10px;                  
              }
            }

            .v-item-top-status {
              color: #474e5d;
              font-size: 14px;
              .iconfont {
                font-weight: 700;
                font-size: 20px;
              }
              img {
                margin-left: 5px;
                width: 10px;
              }
            }
          }

          .cw-content {
            padding: 15px 0;

            .v-bottom-list-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 40px;

              .v-bottom-list-item-title {
                color: #fff;
                width: 50%;
              }

              .v-bottom-list-item-val {
                color: #fff;
                width: 50%;
              }
            }

          }
        }
      }
    }
  }
}
</style>