<template>
  <div class="v_mycenter g-flex-column">
    <div class="v-mycenter-container">
      <!-- {{ userInfo.user_name }} {{ userInfo.id }}-->
      <div class="mycenterel">
        <img class="mycenterelimg" src="/images/touxiang.png" alt="" />
        <div
          @click="$router.push({ name: 'safecenter' })"
          class="v-mycenter-head"
        >
          <div class="v-mycenter-head-top g-flex-align-center">
            <div class="v-mycenter-head-title">
              <span>{{
                filterBankCardNumber("+" + userInfo.area_code + userInfo.mobile)
              }}</span>
            </div>
          </div>
          <div
            @click.stop="copyClick(userInfo.id)"
            class="v-mycenter-head-bottom g-flex-align-center"
          >
            <div class="v-mycenter-head-bottom-id">ID: {{ userInfo.id }}</div>
            <div class="v-mycenter-head-bottom-copy g-flex-align-center">
              <!-- <img src="/img/icon/icon_copy.png" alt="" /> -->
              <i class="iconfont icon-ic_line_copy24px"></i>
            </div>
          </div>
        </div>
        <!-- <img
          class="mycenterelimg"
          src="/images/help.png"
          alt=""
          @click="ruleClick(8)"
        /> -->
        <img
          class="mycenterelimg"
          src="/images/biao.png"
          alt=""
          @click="itemClick('mybill')"
        />
      </div>

      <div class="cardeleCon">
        <div class="cardConel1">
          <div class="cardConel1-lable">
            <div>MOP {{ i18n.balance }}</div>
            <div style="margin-top: 4px">
              <span style="margin-right: 6px; color: #fff">$</span>
              <span style="color: #fff">
                {{ Number(userInfo.balance_mop).toFixed(2) }}
              </span>
            </div>
          </div>
          <div class="cardConel1-lable">
            <div>USDT {{ i18n.balance }}</div>
            <div style="margin-top: 4px">
              <span style="margin-right: 6px; color: #fff"> {{ Number(userInfo.balance).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="v-mycenter-content-list">
        <!-- 语言设置 -->
         <div
          @click="itemClick('languageset')"
          class="v-mycenter-userreal g-flex-align-center"
        >
          <div class="v-mycenter-userreal-left g-flex-align-center">
            <div class="v-mycenter-userreal-left-img g-flex-align-center">
              <img src="/images/Languagesettings.png" alt="" />
            </div>
            <div class="v-mycenter-userreal-left-title g-flex-align-center">
              <span>{{ i18n.yuyanSetText }}</span>
            </div>
          </div>

          <div class="v-mycenter-userreal-right g-flex-align-center">
            <div class="v-mycenter-userreal-right-text">
              <span>{{ selectLangObj.name }}</span>
            </div>
            <div class="v-mycenter-userreal-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>
        <!-- 身份认证 -->
        <div
          @click="userRealClick"
          class="v-mycenter-userreal g-flex-align-center"
        >
          <div class="v-mycenter-userreal-left g-flex-align-center">
            <div class="v-mycenter-userreal-left-img g-flex-align-center">
              <img src="/images/reamName.png" alt="" />
            </div>
            <div class="v-mycenter-userreal-left-title g-flex-align-center">
              <span>{{ i18n.shengfengRengZhengText }}</span>
            </div>
          </div>

          <div class="v-mycenter-userreal-right g-flex-align-center">
            <div class="v-mycenter-userreal-right-text">
              <span>{{ filtersRealStatus() }}</span>
            </div>
            <div class="v-mycenter-userreal-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>
        <div
          v-if="false"
          @click="itemClick('wakuang')"
          class="v-mycenter-content-item g-flex-justify-between g-flex-align-center"
        >
          <div class="v-mycenter-content-item-left">
            <div class="v-mycenter-content-left-img">
              <img src="/images/earninterest.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.suocangWaKuanText || "Earn interest" }}</span>
            </div>
          </div>
        </div>

        <!-- 安全中心 -->
        <div
          @click="itemClick('safecenter')"
          class="v-mycenter-userreal g-flex-align-center"
        >
          <div class="v-mycenter-userreal-left g-flex-align-center">
            <div class="v-mycenter-userreal-left-img g-flex-align-center">
              <img src="/images/Securitycenter.png" alt="" />
            </div>
            <div class="v-mycenter-userreal-left-title g-flex-align-center">
              <span>{{ i18n.safeCenterText }}</span>
            </div>
          </div>
          <div class="v-mycenter-userreal-right g-flex-align-center">
            <div class="v-mycenter-userreal-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- 量化教程 -->
        <div
          v-if="false"
          @click="ruleClick(21)"
          class="v-mycenter-content-item g-flex-justify-between g-flex-align-center"
        >
          <div class="v-mycenter-content-item-left">
            <div class="v-mycenter-content-left-img">
              <img src="/images/QuantizationTutorial.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.lianghuajiaochengText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <!-- <div class="v-mycenter-content-right-text">
                <span>未认证</span>
              </div> -->
          </div>
        </div>

        <!-- 关于我们 -->
        <div
          @click="itemClick('aboutus')"
          class="v-mycenter-userreal g-flex-align-center"
        >
          <div class="v-mycenter-userreal-left g-flex-align-center">
            <div class="v-mycenter-userreal-left-img g-flex-align-center">
              <img src="/images/Aboutus.png" alt="" />
            </div>
            <div class="v-mycenter-userreal-left-title g-flex-align-center">
              <span>{{ i18n.aboutUsText }}</span>
            </div>
          </div>
          <div class="v-mycenter-userreal-right g-flex-align-center">
            <div class="v-mycenter-userreal-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>
        <!-- 下载APP -->
        <div
          @click="downClick"
          v-if="false"
          class="v-mycenter-content-item g-flex-justify-between g-flex-align-center"
        >
          <div class="v-mycenter-content-item-left">
            <div class="v-mycenter-content-left-img">
              <img src="/images/Downloadapp.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.xiazaiAppText }}</span>
            </div>
          </div>
          <!-- <div class="v-mycenter-content-item-right g-flex-align-center"> -->
          <!-- <div class="v-mycenter-content-right-text">
                <span>简体中文</span>
              </div> -->
          <!-- </div> -->
        </div>
        <div
          @click="exitClick"
          class="v-mycenter-userreal g-flex-align-center"
        >
          <div class="v-mycenter-userreal-left g-flex-align-center">
            <div class="v-mycenter-userreal-left-img g-flex-align-center">
              <img src="/images/Signout.png" alt="" />
            </div>
            <div class="v-mycenter-userreal-left-title g-flex-align-center">
              <span>{{ i18n.tuichuLoginText }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mine-btnSA" @click="downClick">
        {{ i18n.xiazaiAppText }}
      </div>

      <!-- <div class="v-mycenter-exit-login-box g-flex-align-center g-flex-justify-center">
        <div @click="exitClick" class="v-mycenter-exit-login g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.tuichuLoginText }}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import Frame from "@/assets/img/Frame.png";
import Vector from "@/assets/img/Vector.png";
import {
  apiGetUserInfo,
  apiGetLiangHuaLevelList,
} from "@/utils/api.js";
import {
  filterBankCardNumber,
  dotDealWith,
  filtersRealStatusClass,
  formatDate,
  copyClick,
  upDownClass,
  upDownBgClass,
  filtersZhangfu,
  kefuClick,
  upDownBgFontColorClass,
} from "@/utils/index.js";
import { reactive, ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { WebSocketInstance } from "@/utils/web_socket.js";
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
  return i18nObj.tm("mycenter");
});
const i18n1 = computed(() => {
  return i18nObj.tm("orderHeYue");
});
const i18n2 = computed(() => {
  return i18nObj.tm("tokenInfo");
});

const i18n3 = computed(() => {
  return i18nObj.tm("lianghua");
});
const i18n4 = computed(() => {
  return i18nObj.tm("lianghuaHistory");
});

function downClick() {
  window.location.href = store.system.downUrl;
}

function userRealClick() {
  if (!store.token) return router.push({ name: "login" });
  if (!userInfo.value.userReal.id || userInfo.value.userReal.status == 0)
    return router.push({ name: "userreal" });
  if (userInfo.value.userReal.status == 1)
    return Toast(i18n.value.userRealSuccessTipsText);
  if (userInfo.value.userReal.status == 2)
    return Toast(i18n.value.userRealIngTipsText);
}

function itemClick(name) {
  router.push({ name: name });
}
function ruleClick(id) {
  router.push({ name: "rule", query: { id: id } });
}

function exitClick(item) {
  Dialog.confirm({
    title: "",
    message: i18n.value.exitLoginOutTipsText,
    cancelButtonColor: "#000",
    confirmButtonColor: "#5488f7",
  })
    .then(() => {
      store.logout();
    })
    .catch(() => {});
}

let userInfo = computed(() => {
  return store.userInfo;
});

async function apiGetUserInfoHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetUserInfo();
  if (!success) return;
  store.setUserInfo(data.info);
  apiGetLiangHuaLevelListHandel();
}

apiGetUserInfoHandel();

let levelList = reactive({
  list: [],
});

function filtersSperadLevelTitle(obj) {
  let target = levelList.list.find((item) => {
    return item.id == obj.spread_level;
  });
  if (target) return target.title;
  else return "";
}

// 获取等级列表
async function apiGetLiangHuaLevelListHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetLiangHuaLevelList();
  if (!success) return;
  levelList.list = data.list;
}

let totalInfo = reactive({
  balance: "0",
  totalProfit: "0",
  todayQuantifyProfit: "0",
  yesterdayQuantifyProfit: "0",
  todayRebateAmount: "0",
  yesterdayRebateAmount: "0",
  monthProfit: "0",
  lastMonthProfit: "0",
  agent1: 0,
  agentValid1: 0,
  agent2: 0,
  agentValid2: 0,
  agent3: 0,
  agentValid3: 0,
});

function filtersRealStatus() {
  // status 0 认证失败
  // status 1 认证成功
  // status 2 认证中
  if (!userInfo.value.userReal.id) return i18n.value.noRenzhengText;
  if (userInfo.value.userReal.status == 0) return i18n.value.statusFailText;
  if (userInfo.value.userReal.status == 1) return i18n.value.statusSuccessText;
  if (userInfo.value.userReal.status == 2) return i18n.value.statusIngText;
}

let selectLangObj = computed(() => {
  console.log("store.lang", store.lang);
  if (!store.langList.length) return {};
  var target = store.langList.find((item) => item.code == store.lang);
  console.log("target", target);
  if (target) return target;
  else return store.langList[0];
});
const DCPTGGroup = ref({
  close: null,
  increase: 0.0,
});
const handleSubscribeData = () => {
  WebSocketInstance.joinGroup("market_60000", (data) => {
    DCPTGGroup.value.price = Number(data.close).toFixed(4);
    DCPTGGroup.value.increase =
      Math.formatFloat(Number(data.close) - Number(data.open), 4) /
      Number(data.open);
  });
};

onMounted(() => {
  handleSubscribeData();
});
onUnmounted(() => {
  WebSocketInstance.leaveGroup("market_60000");
});
</script>

<style lang='scss'>
.v-mycenter-swap {
  width: 355px;
  height: 45px;
  background: #ffffff;
  border-radius: 5px;
  border-bottom: 1px solid #d4d4d4;
  padding: 0 11px;
  margin-bottom: 15px;
  .v-mycenter-swap-left {
    height: 100%;
    img {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
    span {
      font-weight: 400;
      font-size: 12px;
      color: #000000;
      font-style: normal;
      text-transform: none;
    }
  }
  .v-mycenter-swap-right {
    flex: 1;
    span {
      font-weight: 600;
      font-size: 12px;
      color: #000000;
      font-style: normal;
      text-transform: none;
      &.green {
        color: #0f9e7b;
        font-weight: 500;
      }

      &.red {
        color: #de1b1b;
      }
    }
    img {
      width: 24px;
      height: 24px;
      margin-left: 14px;
    }
  }
}
.my_token {
  background: linear-gradient(180deg, #eaf1ff 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 10px 10px 10px 10px;
  border: 1px solid #4879e9;
  padding: 16px;
  margin-bottom: 4vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-weight: bold;
    font-size: 14px;
    color: #333333;
    line-height: 17px;
  }
  .right {
    display: flex;
    align-items: center;
    span {
      font-weight: bold;
      font-size: 16px;
      color: #5a86ee;
      line-height: 19px;
      margin: 0 10px;
    }
    img {
      &:first-child {
        width: 20px;
        height: 20px;
      }
      &:last-child {
        width: 9px;
        height: 16px;
      }
    }
  }
}
.v_mycenter {
  height: 100%;
  overflow: auto;
  // background-color: #f6f4f5;

  .v-mycenter-container {
    // background: url(../images/bg1.png) !important;
    // background-size: 100% 100% !important;
    background: #202021;
    padding: 10px 10px;
    flex: 1;
    overflow: auto;

    .cardeleCon {
      margin-top: 20px;
      text-align: center;
      .cardConel1 {
        display: flex;
        justify-content: space-between;

        .cardConel1-lable {
          width: 174px;
          height: 56px;
          border-radius: 12px;
          // border: 1px solid #ccc;
          background: linear-gradient(90deg, #6b50ff, #8169ff);

          // display: flex;
          // align-items: center;
          padding: 10px 15px;
          font-size: 16px;
          color: #b9acff;
          line-height: 18px;
          text-align: left;
          padding: 10px 10px 10px 20px;
          div {
            &:nth-child(2) {
              color: #b9acff;
              font-weight: 600;
            }
          }
        }
      }
      .cardbg {
        background: #312c4d !important;
        .cardConel2-lable {
          background: #312c4d;
        }
      }
      .cardConel2 {
        display: flex;
        justify-content: space-between;
        height: 70px;
        border-radius: 12px;
        background: #363637;
        margin: 8px 0 0;

        overflow: hidden;
        .cardConel2-lable {
          width: 48%;
          // margin: auto;
          font-weight: bold;
          font-size: 12px;
          line-height: 14px;
          color: #8d8d8e;
          line-height: 18px;
          padding: 10px 4px 10px 15px;
          text-align: left;
          margin-bottom: 6px;
          div {
            &:nth-child(2) {
              color: #fff;
              font-weight: 600;
            }
          }
        }
      }
      .cardConelh {
        font-size: 18px;
        color: #fff;
        line-height: 21px;
        margin: 10px 10px;
        text-align: left;
      }
    }

    .mycenterel {
      display: flex;
      justify-content: flex-start;
      .mycenterelimg {
        width: 45px;
        height: 45px;
        margin-left: 10px;
        border-radius: 8px;
      }
    }

    .v-mycenter-head {
      flex: 1;
      // line-height: 30px;
      padding-left: 10px;

      .v-mycenter-head-top {
        // margin-bottom: 10px;

        .v-mycenter-head-title {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
        }

        .v-mycenter-head-level {
          margin-left: 10px;

          img {
            width: 16px;
            object-fit: contain;
          }
        }

        .v-my-center-team {
          margin-left: 10px;
          padding: 5px 10px;
          border-radius: 20px;
          background: var(--g-main_color);
          color: var(--g-white);
          font-size: 12px;

          .iconfont {
            font-size: 15px;
            margin-right: 4px;
          }
        }
        .v-my-center-no-active {
          margin-left: 10px;
          padding: 5px 10px;
          border-radius: 20px;
          background: var(--g-red);
          color: var(--g-white);
          font-size: 12px;

          .iconfont {
            font-size: 15px;
            margin-right: 4px;
          }
        }
      }

      .v-mycenter-head-bottom {
        .v-mycenter-head-bottom-id {
          font-size: 13px;
          color: #9198a4;
        }

        .v-mycenter-head-bottom-copy {
          padding-left: 10px;

          .iconfont {
            width: 18px;
            color: #8169ff;
          }
        }
      }
    }

    .v-mycenter-userreal {
      margin-top: 5px;
      background: linear-gradient(90deg, #1e5bdd, #5e89ef);
      border-radius: 10px;
      height: 40px;
      padding: 0 15px;
      .v-mycenter-userreal-left {
        flex: 1;
        .v-mycenter-userreal-left-img {
          img {
            width: 24px;
            height: 24px;
          }
        }
        .v-mycenter-userreal-left-title {
          color: var(--g-white);
          padding-left: 10px;
          font-size: 14px;
        }
      }
      .v-mycenter-userreal-right {
        color: var(--g-white);
        font-size: 12px;
        padding: 2px 10px;
        border-radius: 10px;
      }
    }

    .v-mycenter-top-card {
      padding: 15px 0px;

      .v-mycenter-top-card-list {
        border-radius: 10px;
        background: linear-gradient(#1e5bdd, #5e89ef);

        .van-grid-item {
          background: transparent;

          .van-grid-item__content {
            background: transparent;
          }
        }

        .v-mycenter-top-card-item {
          flex: 1;
          line-height: 18px;
          color: var(--g-white);
          position: relative;

          .v-mycenter-top-card-item-title {
            text-align: center;
            font-size: 12px;
            padding-top: 2px;
          }

          .v-mycenter-top-card-item-val {
            font-weight: 700;
            font-size: 14px;
          }

          // &:nth-of-type(1) {
          //   &::after {
          //     content: "";
          //     position: absolute;
          //     right: 0;
          //     top: 4px;
          //     width: 1px;
          //     height: 30px;
          //     background: #e8e7e7;
          //   }
          // }
        }
      }
    }

    .v-mycenter-top-next {
      margin-top: 0px;
      background: #fff;
      box-shadow: 0 4px 3px 0 rgba(0, 0, 0, 0.3);
      // background: linear-gradient(#1e5bdd,#5e89ef);
      padding: 15px 10px;
      border-radius: 10px;

      .v-mycenter-top-next-title {
        text-align: center;
        color: var(--g-black);
        font-weight: 700;
        line-height: 30px;
        font-size: 19px;
      }

      .v-mycenter-top-next-card {
        padding-top: 5px;
        .v-mycenter-top-next-card-top {
          .v-next-card-left {
            font-weight: 700;
            font-size: 22px;
            letter-spacing: 0;
            color: var(--g-main_color);
            width: 35%;
            text-align: center;
            border-right: 1px solid var(--g-main_color);
          }

          .v-next-card-right {
            color: #686868;
            font-size: 13px;
            flex: 1;

            .v-next-card-right-money {
              line-height: 22px;
            }
          }
        }

        .v-mycenter-top-next-card-bottom {
          padding-top: 10px;
          .v-mycenter-top-next-card-bottom-item {
            flex: 1;
            color: #686868;
            font-size: 13px;
            .v-mycenter-top-next-card-bottom-item-val {
              padding-top: 5px;
              color: var(--g-black);
              font-size: 15px;
            }
          }
        }
      }
    }

    .v-mycenter-content-list {
      // box-shadow: 0 2px 1px 0 rgba(0,0,0,.3);
      margin-top: 15px;
      // padding-top: 10px;
      border-radius: 4px;
      background: #2b2b2c;

      .v-mycenter-content-item {
        padding: 11px 9px;
        // border-bottom: 0.8px solid #ccc;

        &:nth-last-of-type(1) {
          border-bottom: none;
        }

        .v-mycenter-content-item-left {
          .v-mycenter-content-left-img {
            padding-right: 4px;

            img {
              width: 22px;
              height: 22px;
            }
          }

          .v-mycenter-content-left-text {
            padding-left: 4px;
            color: #fff;
            font-size: 13px;
          }
        }

        .v-mycenter-content-item-right {
          .v-mycenter-content-right-text {
            font-size: 12px;
            color: #000;
            padding-right: 4px;
          }

          .v-mycenter-content-right-icon {
            .iconfont {
              font-size: 18px;
            }
          }
        }
      }
    }
    .v-mycenter-exit-login-box {
      margin-top: 10px;
      padding: 10px 10px;
      width: 100%;

      .v-mycenter-exit-login {
        background: var(--g-main_color);
        width: 100%;
        height: 40px;
        color: var(--g-white);
        font-size: 14px;
        border-radius: 4px;
      }
    }
  }
}

.mine-btnSA {
  width: 90%;
  height: 44px;
  color: var(--g-white);
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 40px auto 20px;
  line-height: 44px;
  height: 44px;
  background: #fd990f;
  border-radius: 48px;
}
</style>
