<template>
  <div class="v_my_team_member_list g-flex-column">
    <div class="v-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuo"></i>
      </div>
      <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.title2Text }}</span>
      </div>
      <!-- <div class="v-head-right g-flex-align-center">
      <i class="iconfont icon-datijilu"></i>
    </div> -->
    </div>
    <div class="v-my-team-member-list-container">
      <div class="v-my-team-member-list-nav-box g-flex-align-center">
        <van-tabs @change="headNavItemClick" color="#644FDC" title-inactive-color="#000" title-active-color="#644FDC"
          background="transparent" class="v-msg-nav-list" v-model:active="form.type">
          <van-tab class="v-my-team-member-list-nav-item" :title="i18n.tuanduiRenYuanText" :name="1"></van-tab>
          <van-tab class="v-my-team-member-list-nav-item" :title="i18n.tuanduigongxianText" :name="2"></van-tab>
        </van-tabs>
        <!-- <div @click="applyTeamAccountClick" v-show="!userInfo.userTeam.id || userInfo.userTeam.status == 0" class="v-my-team-member-list-apply g-flex-align-center">
          <span>{{ i18n.tobeTeamAccountText }}</span>
        </div> -->
        <!-- <div v-show="userInfo.userTeam.id && userInfo.userTeam.status == 1" class="v-my-team-member-list-apply g-flex-align-center">
          <span>{{ i18n.teamAccountText }}</span>
        </div>
        <div v-show="userInfo.userTeam.id && userInfo.userTeam.status == 2" class="v-my-team-member-list-apply g-flex-align-center">
          <span>{{ i18n.shenghezhongText }}</span>
        </div> -->
      </div>

      <div v-show="form.type == 1" class="v-my-team-member-list-list-one">
        <div class="v-my-team-member-list-list-one-title g-flex-align-center">
          <div class="v-my-team-member-list-list-one-title-left g-flex-align-center">
            <span class="v-my-team-member-list-list-one-title-left-title">{{ i18n.jinriZhuceNumsText }}:</span>
            <span class="v-my-team-member-list-list-one-title-left-val">{{ totalInfo.obj.todayRegNums }}</span>
          </div>
          <div class="v-my-team-member-list-list-one-title-right">
            <van-dropdown-menu>
              <van-dropdown-item @change="layerChange" v-model="form.layer" :options="option1" />
            </van-dropdown-menu>
          </div>
        </div>

        <div class="v-my-team-member-list-list-one-head g-flex-align-center">
          <div class="v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.zhanghaoText }}</span>
          </div>
          <div class="v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.cengjiText }}</span>
          </div>
          <div class="v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.levelText }}</span>
          </div>
          <div class="v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.zhuceTimeText }}</span>
          </div>
        </div>

        <div class="v-list-box">
          <van-list v-show="list.list.length" class="v-list" v-model:loading="loading" :finished="finished" :loading-text="i18n2.loadingText"
            :finished-text="i18n2.finishText" @load="onLoad" :immediate-check="false">
            <div class="v-list-item" v-for="(item, index) in list.list" :key="index">
              <div class="v-list-item-content g-flex-align-center">
                <div class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ item.account }}</span>
                </div>
                <div v-show="item.layer == 1" class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ i18n.yijiText }}</span>
                </div>
                <div v-show="item.layer == 2" class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ i18n.erjiText }}</span>
                </div>
                <div v-show="item.layer == 3" class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ i18n.sanjiText }}</span>
                </div>
                <div class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ item.level.title }}</span>
                </div>
                <div class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ formatDate(item.create_time, 'MM/DD HH:mm')}}</span>
                </div>
              </div>
            </div>
          </van-list>
        </div>

        <NoList v-show="!list.list.length"/>
      </div>



      <div v-show="form.type == 2" class="v-my-team-member-list-list-one v-my-team-member-list-list-two">
        <div class="v-my-team-member-list-list-one-title g-flex-align-center">
          <div class="v-my-team-member-list-list-one-title-left g-flex-align-center">
            <span class="v-my-team-member-list-list-one-title-left-title" v-show="form.day == 1">{{ i18n.oneDayShouYiText }}:</span>
            <span class="v-my-team-member-list-list-one-title-left-title" v-show="form.day == 3">{{ i18n.threeDayShouYiText }}:</span>
            <span class="v-my-team-member-list-list-one-title-left-title" v-show="form.day == 7">{{ i18n.sevenDayShouYiText }}:</span>
            <span class="v-my-team-member-list-list-one-title-left-title" v-show="form.day == 15">{{ i18n.fifteenDayShouYiText }}:</span>
            <span class="v-my-team-member-list-list-one-title-left-title" v-show="form.day == 30">{{ i18n.thirdtyDayShouYiText }}:</span>

            <span class="v-my-team-member-list-list-one-title-left-val">{{ shouyiTotalAmount }}</span>
          </div>
          <div class="v-my-team-member-list-list-one-title-right">
            <van-dropdown-menu>
              <van-dropdown-item @change="dayChange" v-model="form.day" :options="option2" />
            </van-dropdown-menu>
          </div>
        </div>

        <div class="v-my-team-member-list-list-one-head g-flex-align-center">
          <div class="v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.zhanghaoText }}</span>
          </div>
          <div class="v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.cengjiText }}</span>
          </div>
          <div class="v-my-team-member-list-list-one-head-item g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.timeText }}</span>
          </div>
          <div class="v-my-team-member-list-list-one-head-item v-my-team-member-list-list-one-head-item-money g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.shouyiText }}</span>
          </div>
        </div>

        <div class="v-list-box">
          <van-list v-show="shouyiList.list.length"  class="v-list" v-model:loading="loading" :finished="finished" :loading-text="i18n2.loadingText"
            :finished-text="i18n2.finishText" @load="onLoad2" :immediate-check="false">
            <div class="v-list-item" v-for="(item, index) in shouyiList.list" :key="index">
              <div class="v-list-item-content g-flex-align-center">
                <div class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ item.rebate.account }}</span>
                </div>
                <div v-show="item.layer == 1" class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ i18n.yijiText }}</span>
                </div>
                <div v-show="item.layer == 2" class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ i18n.erjiText }}</span>
                </div>
                <div v-show="item.layer == 3" class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ i18n.sanjiText }}</span>
                </div>
                <div class="v-list-item-content-val g-flex-align-center g-flex-justify-center">
                  <span>{{ formatDate(item.create_time, 'MM/DD HH:mm')}}</span>
                </div>
                <div class="v-list-item-content-val v-list-item-content-val-money g-flex-align-center g-flex-justify-center">
                  <span>+{{item.amount}}{{ item.currency }}</span>
                </div>
              </div>
            </div>
          </van-list>
        </div>

        <NoList v-show="! shouyiList.list.length"  />
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiApplyTeamAccount, apiGetTuiGuangList, apiGetUserInfo, apiGetTotalTuiGuang, apiGetTuiGuangDetailList } from '@/utils/api.js'
import { dotDealWith, formatDate, copyClick, upDownClass, upDownBgClass, filtersZhangfu, kefuClick, upDownBgFontColorClass } from "@/utils/index.js";
import {
  reactive,
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";
import { useI18n } from "vue-i18n";
import useStore from "@/store/index.js";
import { useRouter, useRoute } from "vue-router";
import { Dialog, ImagePreview, Toast } from 'vant';
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("myTeam");
});

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})
let loading = ref(false)
let finished = ref(false)

let form = reactive({
  type: 1,
  layer: 1,
  day: 1,
  page: 1,
  limit: 30,
})

const option1 = reactive([
  { text: i18n.value.yicengText, value: 1 },
  { text: i18n.value.ercengText, value: 2 },
  { text: i18n.value.sancengText, value: 3 },
])

const option2 = reactive([
  { text: i18n.value.oneDayText, value: 1 },
  { text: i18n.value.threeDayText, value: 3 },
  { text: i18n.value.sevenDayText, value: 7 },
  { text: i18n.value.fifteenDayText, value: 15 },
  { text: i18n.value.thirdtyDayText, value: 30 },
])

if(form.type == 1) {
  apiGetListHandel()
}else {
  apiGetTuiGuangDetailListHandel()
}

let list = reactive({
  list: []
})

function onLoad() {
  form.page++
  apiGetListHandel()
}

function layerChange() {
  form.page = 1
  list.list = []
  loading.value = true
  finished.value = false
  apiGetListHandel()
}

// 获取团队人员
async function apiGetListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetTuiGuangList(form)
  if (!success) return
  list.list = list.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}

let totalInfo = reactive({
  obj: {
  "agent1": 0,
  "agent2": 0,
  "agent3": 0,
  "agentNums": 0,
  "totalAmount": 0,
  "todayRegNums": 0,
  "todayAmount": 0
  }
})

// 获取统计
async function apiGetTotalTuiGuangHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetTotalTuiGuang()
  if(!success) return
  totalInfo.obj = data.info
}

apiGetTotalTuiGuangHandel()

function headNavItemClick() {
  form.page = 1
  list.list = []
  shouyiList.list = []
  loading.value = true
  finished.value = false
  if(form.type == 1) {
    apiGetListHandel()
  }else {
    apiGetTuiGuangDetailListHandel()
  }
}


function onLoad2() {
  form.page++
  apiGetTuiGuangDetailListHandel()
}

function dayChange() {
  form.page = 1
  shouyiList.list = []
  loading.value = true
  finished.value = false
  apiGetTuiGuangDetailListHandel()
}

let shouyiTotalAmount = ref(0)
let shouyiList = reactive({
  list: []
})

// 获取团队收益列表
async function apiGetTuiGuangDetailListHandel() {
  const { success, data } = await apiGetTuiGuangDetailList(form)
  if(!success) return
  shouyiList.list = shouyiList.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  shouyiTotalAmount.value = data.todayAmount
  console.log(data)
}



let userInfo = computed(() => {
  return store.userInfo
})

async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
}

apiGetUserInfoHandel()


// 申请团队账号
async function applyTeamAccountClick() {
  store.loadingShow = true
  const { success, data } = await apiApplyTeamAccount()
  if(!success) return
  Toast(data.msg)
  apiGetUserInfoHandel()
}

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

  .v-my-team-member-list-container {
    flex: 1;
    flex-shrink: 0;
    padding-top: 46px;
    overflow: auto;
    background: var(--g-white);
    .v-my-team-member-list-top-card {
      margin: 0 10px 10px 10px;
      padding: 15px 10px;
      border-radius: 6px;
      background: var(--g-white);
      box-shadow: 0 4px 3px 0 rgba(0,0,0,.3);

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

    .v-my-team-member-list-nav-box {
      .v-msg-nav-list {
        padding: 0 8px 0px 8px;

        .van-tabs__wrap {
          .van-tab {
            flex: none;
            padding: 0 8px;
            font-size: 14px;
          }
        }
      }
      .v-my-team-member-list-apply  {
        margin-left: 5px;
        background-color: var(--g-main_color);
        padding: 5px 10px;
        border-radius: 20px;
        color: var(--g-white);
        font-size: 13px;
      }
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
          color: var(--g-red)!important;
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
        background: var(--g-main_color);
        height: 36px;
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
}</style>