<template>
  <div class="v_my_team_member_list g-flex-column">
    <div class="v-head g-flex-align-center new-header">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuo"></i>
      </div>
    </div>
    <div class="gltitlexs">{{ i18n.chakanliushuixiangqing }}</div>
    <div class="v-my-team-member-list-container">
      <div class="v-my-team-member-list-list-one">
        <div class="v-my-team-member-list-list-one-title g-flex g-flex-column">
          <div class="v-my-team-member-list-list-one-title-left g-flex-align-center">
            <span class="v-my-team-member-list-list-one-title-left-title">{{ i18n.zongtouzhujine }}:</span>
            <span class="v-my-team-member-list-list-one-title-left-val">{{ list.totalBet }}</span>
          </div>
          <div class="v-my-team-member-list-list-one-title-left g-flex-align-center">
            <span class="v-my-team-member-list-list-one-title-left-title">{{ i18n.zongfanyongjine }}:</span>
            <span class="v-my-team-member-list-list-one-title-left-val">{{ list.totalRebate }}</span>
          </div>
        </div>

        <div class="v-my-team-member-list-list-one-head g-flex-align-center">
          <div class="v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.zhanghaoText }}</span>
          </div>
          <div class="v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.touzhujine }}</span>
          </div>
          <div class="v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.fanyongjine }}</span>
          </div>
        </div>

        <div class="v-list-box">
          <van-list class="v-list" v-model:loading="loading" :finished="finished"
            :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad" :immediate-check="false">
            <div class="v-list-item" v-for="(item, index) in list.list" :key="index">
              <div class="v-list-item-content g-flex-align-center">
                <div class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ item.account }}</span>
                </div>
                <div class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ item.betAmountSum }}</span>
                </div>
                <div class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ item.rebateAmountSum }}</span>
                </div>
              </div>
            </div>
          </van-list>
        </div>
      <NoList v-show="!list.list.length" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  apiApplyTeamAccount,
  apiGetTuiGuangList,
  apiGetUserInfo,
  apiGetTotalTuiGuang,
  apiGetTuiGuangDetailList,
  apiGetTeamBetInfo,
} from "@/utils/api.js";
import { reactive, ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import useStore from "@/store/index.js";
import { useRouter, useRoute } from "vue-router";
import { Dialog, ImagePreview, Toast } from "vant";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("myTeam");
});

const i18n2 = computed(() => {
  return i18nObj.tm("gongyong");
});
const loading = ref(false);
const finished = ref(false);

const form = reactive({
  layer: 1,
  page: 1,
  limit: 30,
})

const list = reactive({
  list: [],
  totalBet:"",
  totalRebate:"",
});

const onLoad = () => {
  form.page++;
  init();
}
onLoad()

// 获取团队投注流水和返佣
async function init() {
  store.loadingShow = true;
  const { success, data } = await apiGetTeamBetInfo(form);
  if (!success) return;
  list.list = list.list.concat(data.data.list);
  list.totalBet = data.data.totalBet || 0
  list.totalRebate = data.data.totalRebate || 0
  loading.value = false;
  finished.value = data.data.list.length ? false : true;
}

async function apiGetUserInfoHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetUserInfo();
  if (!success) return;
  store.setUserInfo(data.info);
}

apiGetUserInfoHandel();
</script>

<style lang='scss'>
.v_my_team_member_list {
  height: 100%;
  overflow: auto;
  background-color: var(--g-main-bgColor);

  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    background-color: var(--g-main-bgColor);

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

  .gltitlexs {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 46px;
    padding: 10px 0;
  }

  .v-my-team-member-list-container {
    margin-left: auto;
    margin-right: auto;
    background-color: #fff;
    width: calc(100% - 40px);
    display: block;
    padding-bottom: 80px;
    border-radius: 15px;
    -webkit-box-shadow: 0 0 10px #ccc;
    box-shadow: 0 0 10px #ccc;
    padding: 10px 0;
    padding-bottom: 5px;

    .v-my-team-member-list-top-card {
      margin: 0 10px 10px 10px;
      padding: 15px 10px;
      border-radius: 6px;
      background: var(--g-white);
      box-shadow: 0 4px 3px 0 rgba(0, 0, 0, 0.3);

      .v-my-team-member-list-top-card-list {
        height: 50px;

        // &.v-my-team-member-list-top-card-second-list {
        //   .v-my-team-member-list-top-card-item {
        //     &:nth-of-type(2) {
        //       &::after {
        //         content: "";
        //         position: absolute;
        //         right: 0;
        //         top: 4px;
        //         width: 1px;
        //         height: 30px;
        //         background: #203036;
        //       }
        //     }
        //   }
        // }

        .v-my-team-member-list-top-card-item {
          flex: 1;
          line-height: 18px;
          color: var(--g-black);
          font-size: 13px;
          position: relative;

          // &:nth-of-type(1) {
          //   &::after {
          //     content: "";
          //     position: absolute;
          //     right: 0;
          //     top: 4px;
          //     width: 1px;
          //     height: 30px;
          //     background: #203036;
          //   }
          // }
        }
      }
    }

    .v-msg-nav-list {
      width: 100%;
      overflow: auto;

      .van-tabs__wrap {
        height: 32px;
        // .van-tab {
        //   flex: none;
        //   padding: 0 8px;
        //   font-size: 14px;
        // }
      }

      .van-tabs__nav--card {
        margin: 0 4px;
        border-radius: 4px;
        padding: 2px 2px;
        border-color: #000;
        border-radius: 10px;
      }

      .van-tab--card {
        border-radius: 6px;
        background-color: #adc1ff;
        margin: 0 6px;
        border: none;

        .van-tab__text {
          color: #fff;
        }
      }
    }

    .v-my-team-member-list-apply {
      margin-left: 5px;
      background-color: var(--g-main_color);
      padding: 5px 10px;
      border-radius: 20px;
      color: var(--g-white);
      font-size: 13px;
    }

    .v-my-team-member-list-list-one {
      position: relative;
      min-height: 350px;

      &.v-my-team-member-list-list-two {
        .v-my-team-member-list-list-one-title {
          .v-my-team-member-list-list-one-title-left {
            .v-my-team-member-list-list-one-title-left-val {
              color: var(--g-red);
            }
          }
        }

        .v-list-item-content-val-money {
          color: var(--g-red) !important;
        }
      }

      .v-my-team-member-list-list-one-title {
        padding: 10px;

        .v-my-team-member-list-list-one-title-left {
          flex: 1;
          font-size: 13px;

          .v-my-team-member-list-list-one-title-left-title {
            color: var(--g-black);
          }

          .v-my-team-member-list-list-one-title-left-val {
            padding-left: 8px;
            color: var(--g-main_color);
          }
        }

        .v-my-team-member-list-list-one-title-right {
          .van-dropdown-menu {
            .van-dropdown-menu__bar {
              width: 95px;
              height: 28px;
              background: var(--g-white);

              .van-dropdown-menu__title {
                color: var(--g-black);
                font-size: 12px;
              }
            }

            .van-dropdown-item--down {
              .van-dropdown-item__content {
                background: var(--g-white);

                .van-dropdown-item__option {
                  background: var(--g-white);

                  &::after {
                    border-color: #c5c5c5;
                  }

                  &.van-dropdown-item__option--active {
                    .van-cell__title {
                      color: var(--g-main_color);
                    }

                    .van-cell__value {
                      .van-icon {
                        color: var(--g-main_color);
                      }
                    }
                  }

                  .van-cell__title {
                    color: var(--g-black);
                  }
                }
              }
            }
          }
        }
      }

      .v-my-team-member-list-list-one-head {
        // background: var(--g-main_color);
        background: #0a96fe;
        height: 26px;
        margin: 0 10px;
        border-radius: 4px;

        .v-my-team-member-list-list-one-head-item {
          flex: 1;
          flex-shrink: 0;
          height: 100%;
          font-size: 13px;
          color: var(--g-white);
        }
      }

      .v-list-box {
        padding: 10px;
        height: 400px;
        overflow: auto;

        .v-list {
          .v-list-item {
            height: 36px;

            .v-list-item-content {
              height: 100%;
              padding: 10px 0;
              border-bottom: 1px solid #dbdada;

              .v-list-item-content-val {
                flex: 1;
                flex-shrink: 0;
                font-size: 13px;
                color: var(--g-black);
              }
            }
          }
        }
      }
    }
  }
}
</style>