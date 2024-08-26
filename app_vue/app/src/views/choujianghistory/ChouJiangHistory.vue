<template>
  <div class="v_choujiang_history g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <!-- <i class="iconfont icon-zuo"></i> -->
        <img src="/images/back-icon.png" alt="" />
      </div>
      <!-- <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div> -->
      <!-- <div class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div> -->
    </div>
    <div class="new-head_title_text">{{ i18n.titleText }}</div>
    <div class="v-choujiang-history-container-box g-flex-column">
      <!-- <div class="v-choujiang-history-head g-flex-align-center g-flex-justify-center">
        <div class="v-choujiang-history-head-list g-flex-align-center">
          <div @click="navItemClick(0)" :class="navTypeVal == 0 ? 'active' : ''"
            class="v-choujiang-history-head-item g-flex-justify-center g-flex-align-center">
            <div class="v-choujiang-history-head-item-title">{{ i18n.minxiText }}</div>
          </div>
          <div @click="navItemClick(1)" :class="navTypeVal == 1 ? 'active' : ''"
            class="v-choujiang-history-head-item g-flex-justify-center g-flex-align-center">
            <div class="v-choujiang-history-head-item-title">{{ i18n.rechargeHistoryText }}</div>
          </div>
          <div @click="navItemClick(2)" :class="navTypeVal == 2 ? 'active' : ''"
            class="v-choujiang-history-head-item g-flex-align-center g-flex-justify-center">
            <div class="v-choujiang-history-head-item-title">{{ i18n.cashoutHistoryText }}</div>
          </div>
        </div>
      </div> -->
      <div class="v-my-bill-container">
        <div class="v-my-bill-content">
          <van-list v-show="list.list.length" class="v-list" v-model:loading="loading" :finished="finished"
            :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad" :immediate-check="false">
            <div v-for="(item, index) in list.list" :key="index" class="v-list-item">
              <div class="v-list-item-top g-flex-align-center g-flex-justify-between">
                <div class="v-list-item-top-title">
                  {{ item.title }}
                </div>
                <div :class="inoutClass(item.amount)" class="v-list-item-top-money">
                  {{ Number(item.amount) >= 0 ? ('+' + item.amount) : item.amount }} {{ item.currency }}
                </div>
              </div>

              <div v-if="false" class="v-list-item-middle g-flex-align-center">
                <div class="v-list-item-middle-title">
                  {{ item.des }}
                </div>
              </div>

              <div class="v-list-item-bottom g-flex-justify-between g-flex-align-center">
                <div class="v-list-item-middle-time">
                  {{ formatDate(item.modify_time, 'YYYY/MM/DD HH:mm:ss') }}
                </div>
                <!-- <div class="v-list-item-middle-balance">
                {{ i18n.balanceText }}: {{ item.balance }}
              </div> -->
              </div>

            </div>
          </van-list>
          <no-list v-show="!list.list.length" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiChouJiangHistoryList } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
import { inoutClass, formatDate, filtersRealStatusClass, dotDealWith } from '@/utils/index.js'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('choujiangHistory')
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

async function apiGetListHandel() {
  store.loadingShow = true
  const { success, data } = await apiChouJiangHistoryList(form)
  if (!success) return
  list.list = list.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}
</script>

<style lang='scss'>
.v_choujiang_history {
  height: 100%;
  overflow: auto;
  background-color: #f6f4f5;
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    background-color: #f6f4f5;
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

  .v-choujiang-history-container-box {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-choujiang-history-head {
      height: 60px;
      // position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 9;

      .v-choujiang-history-head-list {
        // border: 1px solid #525252;
        height: 35px;
        border-radius: 4px;
        overflow: hidden;

        .v-choujiang-history-head-item {
          height: 100%;
          width: 116px;
          padding: 0 5px;
          font-weight: 500;
          color: var(--g-less-most-black);
          font-size: 14px;

          .v-choujiang-history-head-item-title {
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
      color: var(--g-less-most-black);
      padding: 0 15px;
      .v-my-bill-content {
        .v-list {
          .v-list-item {
            border-radius: 10px;
            background: var(--g-white);
            padding: 15px;
            margin-bottom: 10px;
            .v-list-item-top {
              .v-list-item-top-title {
                font-size: 16px;
                color: var(--g-main_color);
              }

              .v-list-item-top-money {
                font-size: 16px;
              }
            }

            .v-list-item-middle {
              padding: 10px 0;
              font-size: 14px;
            }

            .v-list-item-bottom {
              padding-top: 10px;
              font-size: 14px;
            }
          }
        }
      }

      .v-finance-list-box {
        height: 100%;
        overflow: auto;
        color: var(--g-white);

        .v-list {
          .v-list-item {
            padding: 15px;
            border-bottom: 1px solid #474e5d;

            .v-item-top {
              .v-item-top-title {
                font-size: 16px;
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

            .v-item-bottom-list {
              padding-top: 15px;

              .v-bottom-list-item {
                font-size: 14px;
                flex: 1;

                .v-bottom-list-item-title {
                  color: #c1c1c1;
                }

                .v-bottom-list-item-val {
                  padding-top: 8px;
                  color: var(--g-white);
                }
              }

            }
          }
        }
      }
    }
  }

}</style>