<template>
  <div class="v_main g-flex-column">
    <div class="v-main-container">
      <div class="v-main-container_t">
        <div class="v-main-head-left">
          <img src="/images/touxiang.png" alt="" />
          <div class="n-moble">{{ userInfo.mobile || userInfo.user_name }}</div>
        </div>
        <div class="v-main-head-right">
          <div @click="kefuClick" class="v-main-head-right-img">
            <img src="/images/kefu.png" alt="" />
          </div>
          <div
            @click="$router.push('/msgcenter')"
            class="v-main-head-right-img"
          >
            <img src="/images/xiaoxi.png" alt="" />
            <div class="v-main-head-right-have-msg" v-show="unReadNums"></div>
          </div>
          <!-- <i
            @click="$router.push({ name: 'msgcenter' })"
            class="iconfont icon-youjian"
          >
            <div class="v-main-head-right-have-msg" v-show="unReadNums"></div>
          </i> -->
          <!-- <img src="/images/kefu.png" alt="" /> -->
        </div>
        <div class="b-head-content">
          <div class="wallet-balance">{{ i18n.walletBalance }}</div>
          <div class="wallet-amount g-flex-align-center">
            <div class="amount-item">
              MOP:
              <span>{{ userInfo.balance_mop }}</span>
            </div>
            <div class="amount-item">
              USDT:
              <span>{{ userInfo.balance }}</span>
            </div>
          </div>
          <div class="wallet-btn">
            <div @click="$router.push({ name: 'rechargeselect' })">
              <img src="/images/Recharge.png" alt="" />
              <span>{{ i18n.chongzhiText }}</span>
            </div>
            <div @click="email_tixian_click">
              <img src="/images/Withdraw.png" alt="" />
              <span>{{ i18n.tixianText }}</span>
            </div>
          </div>
          <div class="level-wrap g-flex-justify-between g-flex-align-center">
            <div class="level">{{ userInfo.level }}</div>
            <div class="today-income">
              {{ i18n.todayIncome }}： {{ userInfo.todayWin }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="noticeList.list.length"
        @click="noticeClick"
        class="v-notice-two g-flex-align-center"
      >
        <div class="v-notice-two-left g-flex-align-center">
          <img src="/images/laba.png" alt="" />
        </div>
        <van-notice-bar scrollable :speed="80">
          <p class="v-notice-two-tips-val">
            <span
              v-for="(item, index) in noticeList.list"
              :key="`notice${index}`"
            >
              <div v-html="item.content"></div>
            </span>
          </p>
        </van-notice-bar>
        <div
          @click.stop="$router.push({ name: 'msgcenter', query: { type: 2 } })"
          class="v-notice-two-right g-flex-align-center"
        >
          <span>{{ i18n.moreText }}&gt;</span>
        </div>
      </div>

      <div
        class="v-main-container-btn-list g-flex-align-center g-flex-justify-between"
      >
        <div
          @click="router.push({ name: 'myteam' })"
          class="v-lianghua-top-btn-item v-lianghua-top-btn-item-recharge g-flex-align-center g-flex-justify-center"
        >
          <img src="/images/Team.png" alt="" />
          <div>{{ i18n.tuanduiText }}</div>
        </div>
        <div
          @click="$router.push({ name: 'invite' })"
          class="v-lianghua-top-btn-item v-lianghua-top-btn-item-cashout g-flex-align-center g-flex-justify-center"
        >
          <img src="/images/currency2.png" alt="" />
          <div>{{ i18n.yaoqingHaoYouText }}</div>
        </div>
      </div>
      <div class="v-main-bottom">
        <div class="media2">
          <div class="v-main-bottom-part-aboutus-video">
            <!-- <VideoPlayer :url="store.system.AboutUs" :pic="store.system.AboutUsPic" ref="refVideoPlayer" /> -->
            <video controls width="640" height="480">
              <source src="/video/wetify.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <RadomList />
    </div>

    <NoticePop ref="refNoticePop" />

    <MyCenterPop ref="refMyCenterPop" />

    <UpdatePop ref="refUpdatePop" />

    <NoticeUserPop ref="refNoticeUserPop" />
  </div>
</template>

<script setup>
import NoticePop from "@/components/NoticePop.vue";
import MainBottomSwiper from "@/components/MainBottomSwiper.vue";
import TestSwiper from "@/components/TestSwiper.vue";
import MyCenterPop from "@/components/MyCenterPop.vue";
import NoticeUserPop from "@/components/NoticeUserPop.vue";
import RadomList from "./RadomList.vue";

import {
  dotDealWith,
  formatDate,
  copyClick,
  upDownClass,
  upDownBgClass,
  filtersZhangfu,
  kefuClick,
  upDownBgFontColorClass,
} from "@/utils/index.js";
import {
  apiGetWeiDuMsgNums,
  apiGetUserInfo,
  apiGetKefuConfig,
  apiGetNoticeList,
  apiGetNoticeInfo,
} from "@/utils/api.js";
import VideoPlayer from "@/components/VideoPlayer.vue";
import { reactive, ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import useStore from "@/store/index.js";
import UpdatePop from "@/components/UpdatePop.vue";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("mainView");
});

let refMyCenterPop = ref(null);
function mycenterClick() {
  refMyCenterPop.value.onShow();
}

///绑定邮箱提现
function email_tixian_click() {
  if (store.userInfo.email == "") {
    router.push({ name: "bindemail" });
  } else {
    router.push({ name: "cashoutselect" });
  }
}
let noticeObj = reactive({ obj: {} });
let refNoticeUserPop = ref(null);
async function apiGetNoticeInfoHandel(id) {
  store.loadingShow = true;
  const { success, data } = await apiGetNoticeInfo({ id });
  if (!success) return;
  noticeObj.obj = data.list;
  console.log(noticeObj.obj);
  nextTick(() => {
    refNoticeUserPop.value.onShow(noticeObj.obj);
  });
}
const roomsList = ref([]);
const lotteryList = ref([]);

onMounted(() => {
  apiGetNoticeListHandel();
  console.log(store);
  if (window.localStorage.getItem("appToken")) {
    apiGetUserInfoHandel();
    apiGetWeiDuMsgNumsHandel();
  }
});

let refUpdatePop = ref(null);
let HomeVideo = ref();

apiGetKefuConfigHandel();

// 获取配置
async function apiGetKefuConfigHandel() {
  const { success, data } = await apiGetKefuConfig({ id: 1 });
  if (!success) return;
  HomeVideo.value = data.info.AboutUs;
  if (store.system.Version != data.info.Version) {
    refUpdatePop.value.onShow();
  }
}

let noticeList = reactive({ list: [] });
// 获取公告列表
async function apiGetNoticeListHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetNoticeList();
  if (!success) return;
  noticeList.list = data.list;
  console.log(9999);
  console.log(noticeList.list);
  if (!noticeList.list.length) {
    return;
  } else {
    noticeClick();
  }
}
let refNoticePop = ref(null);
function noticeClick() {
  refNoticePop.value.onShow(noticeList.list);
}

let userInfo = computed(() => {
  return store.userInfo;
});

// 获取用户信息
async function apiGetUserInfoHandel() {
  console.log(5555);
  store.loadingShow = true;
  const { success, data } = await apiGetUserInfo();
  if (!success) return;
  store.setUserInfo(data.info);
  console.log(data);
  console.log(8888);
}

let unReadNums = ref(0);
// 获取未读消息数量
async function apiGetWeiDuMsgNumsHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetWeiDuMsgNums();
  if (!success) return;
  unReadNums.value = data.readNums;
}
</script>
<style lang='scss' scoped>
.v_main {
  height: 100%;
  overflow: auto;
  background-color: #202021;
  .v-main-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9;
    height: 46px;
    // background: var(--g-main_bgColor);
    // background-color: #f6f4f5;
  }

  .v-main-container {
    // flex: 1;
    // padding-top: 46px;
    overflow: auto;

    .v-main-container_t {
      height: 222px;
      // background: radial-gradient(circle at left top, #EA3663, #F5C01C);
      // padding-top: 60px;
      position: relative;
      margin-bottom: 82px;
      padding-top: 50px;
      .b-head-content {
        width: 345px;
        height: 180px;
        border-radius: 8px;
        // background: #fff;
        position: absolute;
        top: 110px;
        left: 15px;
        margin-bottom: 80px;
        padding: 15px;
        color: #fff;
        background: linear-gradient(90deg, #009afe, #8169ff);
        text-align: center;
        .wallet-balance {
          font-weight: 400;
          text-align: center;
          font-size: 14px;
          line-height: 32px;
        }
        .wallet-amount {
          border-bottom: 1px dashed #f1a9a9;
          padding-bottom: 5px;
          .amount-item {
            flex: 1;
            font-size: 14px;
            line-height: 40px;
            font-style: normal;
            text-transform: none;
            span {
              font-size: 18px;
              font-weight: 600;
            }
          }
        }
        .wallet-btn {
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-weight: 400;
          font-size: 14px;
          color: #fff;
          padding-top: 15px;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              line-height: 22px;
            }

            img {
              height: 32px;
              width: 32px;
              margin-right: 10px;
              border-radius: 4px;
            }
          }
        }
        .level-wrap {
          height: 40px;
          padding: 10px 0;
          .level {
            padding-left: 40px;
          }
        }
      }
      .v-main-head-left {
        position: absolute;
        left: 10px;
        padding: 0 5px;
        font-size: 24px;
        color: #fff;
        line-height: 38px;
        text-align: left;
        display: flex;
        width: 30px;
        margin-right: 10px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          margin-right: 10px;
        }
      }

      .v-main-head-middle {
        flex: 1;
        height: 100%;

        img {
          width: 100px;
        }
      }

      .v-main-head-right {
        position: absolute;
        right: 0px;
        padding: 0 5px 0 6px;
        // height: 100%;
        display: flex;
        .v-main-head-right-img {
          margin-right: 10px;
          img {
            // width: 30px;
            width: 40px;
            height: 40px;
          }
        }
        .v-main-head-right-have-msg {
          position: absolute;
          top: 5px;
          right: 30px;
          background: #e82020;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          transform: translateX(50%) translateY(-50%);
        }
      }
    }

    .v-main-container-btn-list {
      padding-top: 15px;
      padding-bottom: 15px;
      margin: auto 15px;
      .v-lianghua-top-btn-item {
        width: 174px;
        background-color: #5314d6;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        height: 40px;
        border: 0;
        border-radius: 6px;

        &.v-lianghua-top-btn-item-recharge {
          background: #483b90;
          width: 174px;
          height: 48px;
          img {
            width: 22px;
            height: 22px;
            margin-right: 20px;
          }
        }

        &.v-lianghua-top-btn-item-cashout {
          background: #483b90;
          width: 160px;
          height: 48px;
          img {
            width: 22px;
            height: 22px;
            margin-right: 20px;
          }
        }
      }
    }

    .v-main-container-btn-list2 {
      padding: 5px 0;
      width: 300px;
      background: #312c4d;
      border-radius: 12px;
      margin: 10px auto;
      color: #fff;
      img {
        width: 38px;
        height: 42px;
        margin-right: 40px;
      }
    }
    .v-main-rooms {
      padding: 0 15px;
      .v-main-room-item {
        background: #312c4d;
        margin-bottom: 10px;
        color: var(--g-white);
        padding: 10px 0;
        border-radius: 10px;
        .room-title {
          width: 100%;
          padding: 8px 15px 13px;
          border-bottom: 1px solid #a39898;
        }
        .room-lottery-box {
          padding: 10px 10px 0;
          .room-lottery-list {
            display: flex;
            width: 100%;
            overflow-x: auto;
            .room-lottery-item {
              flex: 0 0 auto;
              margin-right: 5px;
              .lottery-icon {
                width: 100%;
                margin-bottom: 8px;
                img {
                  width: 40px;
                  height: 40px;
                  background: #fff;
                  border-radius: 8px;
                }
              }
              .name {
                padding: 0 5px;
              }
            }
            &::-webkit-scrollbar {
              display: none;
            }
          }
        }
      }
    }
    .v-main-swipe {
      .van-swipe__track {
        .v-main-swipe-item {
          padding: 0px 10px 0px 10px;
          border-radius: 8px;
          img {
            width: 100%;
            //height: 190px;
            object-fit: cover;
            border-radius: 8px;
          }
        }
      }
    }

    .v-notice-two {
      margin-top: 5px;
      height: 40px;
      padding: 10px 9px;
      margin: auto 15px;
      border: 1px solid #ccc;
      border-radius: 40px;
      .v-notice-two-left {
        padding-right: 4px;
        img {
          height: 16px;
        }
      }
      .v-notice-two-tips-val {
        background: #202021;
        color: #fff;
        span {
          padding: 0 10px;
        }
      }
      .van-notice-bar {
        flex: 1;
        padding: 0;
        width: 100%;
        height: 20px;
        color: var(--g-black);
        background: #202021;
      }
      .v-notice-two-right {
        padding: 0 4px;
        flex-shrink: 0;
        color: #fff;
        font-size: 12px;
      }
    }

    .v-main-view-chibi {
      margin: 5px 10px;
      height: 80px;
      background-image: url("/img/icon/yqs.jpg");
      background-position: 0px 0px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .v-main-view-chibi-title {
        color: var(--g-white);
        font-size: 14px;
        .iconfont {
          padding-left: 4px;
          font-weight: 700;
          font-size: 20px;
        }
      }
    }

    .v-main-card-one {
      padding: 10px 10px 0 10px;
      .v-main-card-one-list {
        border-radius: 6px;
        gap: 15px;
        .v-main-card-one-item {
          width: calc(100% / 3);
          height: 90px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(50, 121, 246, 0.1);
          background-color: var(--g-white);
          border-radius: 8px;
          .v-card-one-item-title {
            width: 100%;
            font-size: 13px;
            @include textManyOverflow();
            height: 24px;
            color: var(--g-white);
            font-weight: 700;
            text-align: center;
            line-height: 24px;
            background: #c1d7fc;
          }
          .v-card-one-item-price {
            padding: 5px 0;
            width: 100%;
            text-align: center;
            @include textManyOverflow();
            font-size: 20px;
            font-weight: 600;
            color: var(--g-main_color);
          }
          .v-card-one-item-zhangfu {
            padding-bottom: 20px;
            width: 100%;
            text-align: center;
            @include textManyOverflow();
            font-size: 13px;
          }
        }
      }
    }

    .v-main-card-two {
      padding: 10px;
      .v-main-card-two-list {
        padding: 15px 0px;
        border-radius: 6px;
        background-color: var(--g-white);
        .v-main-card-two-item {
          width: calc(100% / 5);
          .v-card-two-item-top {
            img {
              width: 50px;
              height: 50px;
              object-fit: contain;
            }
          }
          .v-card-two-item-bottom {
            width: 100%;
            text-align: center;
            @include textManyOverflow();
            color: var(--g-black);
            font-size: 14px;
            padding-top: 4px;
          }
        }
      }
    }

    .v-main-card-three-box {
      padding: 0 10px 10px 10px;
      .v-main-card-three {
        padding: 10px;
        border-radius: 6px;
        background-image: url("/img/icon/list_bg.png");
        background-position: 0px 0px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .v-main-card-three-left {
          flex: 1;
          .v-main-card-three-left-img {
            img {
              width: 48px;
              height: 48px;
              border-radius: 50%;
            }
          }
          .v-main-card-three-left-content {
            padding-left: 5px;
            .v-main-card-three-left-title {
              color: var(--g-white);
              font-size: 14px;
            }
            .v-main-card-three-left-desc {
              color: var(--g-black);
              font-size: 13px;
              padding-top: 8px;
            }
          }
        }
        .v-main-card-three-right {
          .iconfont {
            font-size: 18px;
            color: #969799;
          }
        }
      }
    }

    .v-main-bottom {
      padding: 0 5px 8px 5px;
      .v-main-nav-list {
        padding: 7px 5px;
        height: 45px;
        .v-main-nav-item {
          line-height: 16px;
          font-size: 16px;
          margin: 0 7px;
          color: var(--g-less-white);
          position: relative;
          &:nth-of-type(1) {
            margin: 0;
          }
          &.active {
            font-size: 16px;
            color: var(--g-white);
            &::before {
              content: "";
              position: absolute;
              width: 80%;
              height: 2px;
              background: #5488f7;
              left: 10%;
              bottom: -6px;
            }
          }
        }
      }
      .v-main-bottom-list-one-box {
        padding: 0 5px 0 5px;
        .v-main-bottom-list-one-head {
          padding: 10px 5px;
          background: var(--g-white);
          border-radius: 6px;
          .v-main-bottom-list-one-head-item {
            line-height: 18px;
            color: var(--g-black);
            font-size: 13px;
            &.v-main-bottom-list-one-head-item-name {
              width: 50%;
            }
            &.v-main-bottom-list-one-head-item-price {
              width: 25%;
            }
            &.v-main-bottom-list-one-head-item-zhangfu {
              width: 25%;
              padding-left: 6px;
            }
          }
        }
        .v-main-bottom-list-one {
          margin: 5px;
          background: #363637;
          padding: 10px;
          border-radius: 12px;
          .v-main-bottom-list-one-item {
            padding: 10px 0 10px 5px;
            // border-bottom: 0.5px solid #f6f6f7;
            .v-main-bottom-list-one-item-second {
              .v-main-bottom-list-one-item-img {
                padding-right: 5px;
                img {
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  object-fit: contain;
                  margin-right: 5px;
                }
              }
              .v-main-bottom-list-one-item-text {
                font-size: 18px;
                color: #fff;
                font-weight: 500;
              }
              .v-main-bottom-list-one-item-price {
                font-size: 14px;
                font-weight: 700;
                color: #fff;
              }
              .v-main-bottom-list-one-item-zhangfu {
                list-style: 45px;
                font-size: 18px;
                min-width: 90%;
                max-width: 100%;
                border-radius: 4px;
                font-weight: 400;
                font-size: 14px;
                color: #fff;
                img {
                  width: 15px;
                  height: 8px;
                  margin-right: 5px;
                }
              }
              &:nth-of-type(1) {
                width: 50%;
              }
              &:nth-of-type(2) {
                width: 50%;
                text-align: right;
              }
              // &:nth-of-type(3) {
              //   width: 25%;
              //   padding-left: 6px;
              // }
            }
          }
        }

        .vb-main-bottom {
          img {
            width: 50px;
          }
        }
      }

      .v-main-bottom-list-two-box {
        padding: 5px 3px;
        .v-main-bottom-list-two-head {
          padding: 10px 5px;
          background: var(--g-main_less_bgColor);
          .v-main-bottom-list-two-head-item {
            line-height: 18px;
            color: var(--g-white);
            font-size: 13px;
            &.v-main-bottom-list-two-head-item-name {
              width: 100px;
            }
            &.v-main-bottom-list-two-head-item-shouyi {
              flex: 2;
            }
            &.v-main-bottom-list-two-head-item-status {
              flex: 2;
              padding-left: 6px;
            }
          }
        }
      }
    }
    .v-main-bottom-part-aboutus-video {
      margin: 10px;
      height: 180px;
      border-radius: 5px;
      overflow: hidden;
      video {
        width: 100%;
        height: 180px;
      }
    }
    .media2h2 {
      margin: 10px 15px 10px 0;
      font-size: 18px;
      color: #fff;
      line-height: 26px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    .mediabox {
      margin: 11px;
      color: #fff;

      .media1 {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-left: 5px;
        padding: 0 10px;
        img {
          margin-right: 12px;
          margin-bottom: 10px;
          width: 90px;
        }
      }
      .media2 {
        display: flex;
        justify-content: space-between;
        // margin-left: 5px;
        .media2-div {
          width: 60px;
          height: 64px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          // margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        img {
          width: 65px;
        }
      }
    }
  }
}
</style>