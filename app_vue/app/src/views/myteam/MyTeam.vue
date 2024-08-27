<template>
  <div class="v_my_team g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
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
    <div class="v-my-team-container">
      <div class="v-my-team-card-one">
        <div class="v-my-team-card-title g-flex-align-center g-flex-justify-between">
          <div class="v-my-team-card-title-left">
            <span>{{ i18n.tuanduiShuJuGaiLanText }}</span>
          </div>
          <div @click="selectTopTimeClick"
            class="v-my-team-card-title-right g-flex-align-center g-flex-justify-between">
            <span class="v-my-team-card-title-right-text">
              {{ topForm.topDayText }}
            </span>
            <i class="iconfont icon-xiala"></i>
          </div>
        </div>
        <div class="v-my-team-card-one-middle-list g-flex-align-center">
          <div class="v-my-team-card-one-middle-item g-flex-column g-flex-align-center">
            <!-- <div class="v-my-team-card-one-middle-item g-flex-column g-flex-align-center">
              <div class="v-my-team-card-one-middle-item-title">
                <span>{{ i18n.zhuceHuiYuanText }}</span>
              </div>
              <div class="v-my-team-card-one-middle-item-val">
                <span>{{ topTotalInfo.obj.agentNums }}</span>
              </div>
            </div> -->
            <div class="v-my-team-card-one-middle-item-title">
              <span>{{ i18n.zhuceHuiYuanText }}</span>
            </div>
            <div class="v-my-team-card-one-middle-item-val">
              <span>{{ topTotalInfo.obj.agentNums }}</span>
            </div>
          </div>
          <div class="v-my-team-card-one-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-one-middle-item-title">
              <span>{{ i18n.youxiaoHuiYuanText }}</span>
            </div>
            <div class="v-my-team-card-one-middle-item-val">
              <span>{{ topTotalInfo.obj.agentValidNums }}</span>
            </div>
          </div>
          <div class="v-my-team-card-one-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-one-middle-item-title">
              <span>{{ i18n.tuanduiShouRuText }}</span>
            </div>
            <div class="v-my-team-card-one-middle-item-val">
              <span>{{ topTotalInfo.obj.totalAmount }}</span>
            </div>
          </div>
        </div>
        <div class="v-my-team-card-one-bottom g-flex-align-center g-flex-justify-between">
          <div class="v-my-team-card-one-bottom-left g-flex-align-center">
            <div class="v-my-team-card-one-bottom-left-title">
              {{ i18n.leijiTuanDuiGuiMiText }}:
            </div>
            <span class="v-my-team-card-one-bottom-left-val">{{
              topTotalInfo.obj.totalAgentNums
            }}</span>
          </div>
          <div @click="$router.push({ name: 'myteammemberlist' })"
            class="v-my-team-card-one-bottom-right g-flex-align-center">
            <span class="v-my-team-card-one-bottom-right-val">{{ i18n.chakanliushuixiangqing3}}</span>
          </div>
        </div>
      </div>

      <div class="v-my-team-card-two">
        <div class="v-my-team-card-title g-flex-align-center g-flex-justify-between">
          <div class="v-my-team-card-title-left">
            <span>{{ i18n.zuijingSanDaiShuJuText }}</span>
          </div>
          <div @click="selectBottomTimeClick"
            class="v-my-team-card-title-right g-flex-align-center g-flex-justify-between">
            <span class="v-my-team-card-title-right-text">
              {{ bottomForm.bottomDayText }}
            </span>
            <i class="iconfont icon-xiala"></i>
          </div>
        </div>
        <div class="v-my-team-card-two-second-title">
          {{ i18n.yidaiShuJuText }}
        </div>
        <div class="v-my-team-card-two-middle-list g-flex-align-center">
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.betRebate1 }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.commissionText }}</span>
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agent1 }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.zhuceHuiYuanText }}</span>
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agentValid1 }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.youxiaoHuiYuanText }}</span>
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agentAmount1 }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.incomeText }}</span>
            </div>
          </div>
        </div>
        <div class="v-my-team-card-two-second-title">
          {{ i18n.erdaiShuJuText }}
        </div>
        <div class="v-my-team-card-two-middle-list g-flex-align-center">
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.betRebate2 }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.commissionText }}</span>
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agent2 }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.zhuceHuiYuanText }}</span>
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agentValid2 }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.youxiaoHuiYuanText }}</span>
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agentAmount2 }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.incomeText }}</span>
            </div>
          </div>
        </div>

        <div class="v-my-team-card-two-second-title">
          {{ i18n.sandaiShuJuText }}
        </div>
        <div class="v-my-team-card-two-middle-list g-flex-align-center">
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.betRebate3 }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.commissionText }}</span>
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agent3 }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.zhuceHuiYuanText }}</span>
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agentValid3 }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.youxiaoHuiYuanText }}</span>
            </div>
          </div>
          <div class="v-my-team-card-two-middle-item g-flex-column g-flex-align-center">
            <div class="v-my-team-card-two-middle-item-val">
              <span>{{ bottomTotalInfo.obj.agentAmount3 }}</span>
            </div>
            <div class="v-my-team-card-two-middle-item-title">
              <span>{{ i18n.incomeText }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SelectRadioPop :columns="timeListTop.list" @emitsSelectConfirm="emitsSelectConfirm" :selectVal="topForm.day"
      ref="refSelectRadioPop" />

    <SelectRadioPop :columns="timeList.list" @emitsSelectConfirm="emitsSelectBottomConfirm" :selectVal="bottomForm.day"
      ref="refBottomSelectRadioPop" />
  </div>
</template>

<script setup>
import SelectRadioPop from "@/components/SelectRadioPop.vue";
import {
  apiGetUserInfo,
  apiNewTeamGetTeamInfo,
  apiNewTeamGetThreeLayerInfo,
} from "@/utils/api.js";
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
  return i18nObj.tm("myteam");
});

const i18n_mycenter = computed(() => {
  return i18nObj.tm("mycenter");
});

const i18n2 = computed(() => {
  return i18nObj.tm("gongyong");
});
let loading = ref(false);
let finished = ref(false);

let timeListTop = reactive({
  list: [
    { title: i18n.value.allText, val: "" },
    { title: i18n.value.oneDayText, val: 1 },
    { title: i18n.value.yesterdayText, val: 2 },
    { title: i18n.value.threeDayText, val: 3 },
    { title: i18n.value.sevenDayText, val: 7 },
    { title: i18n.value.fifteenDayText, val: 15 },
    { title: i18n.value.thirdtyDayText, val: 30 },
  ],
});

let timeList = reactive({
  list: [
    { title: i18n.value.allText, val: "" },
    { title: i18n.value.oneDayText, val: 1 },
    { title: i18n.value.yesterdayText, val: 2 },
    { title: i18n.value.threeDayText, val: 3 },
    { title: i18n.value.sevenDayText, val: 7 },
    { title: i18n.value.fifteenDayText, val: 15 },
    { title: i18n.value.thirdtyDayText, val: 30 },
  ],
});

let topForm = reactive({
  day: "",
  topDayText: timeListTop.list[0].title,
});

let bottomForm = reactive({
  day: "",
  bottomDayText: timeList.list[0].title,
});

// 上面的
let refSelectRadioPop = ref(null);
function selectTopTimeClick() {
  refSelectRadioPop.value.onShow();
}

function emitsSelectConfirm(item) {
  topForm.day = item.val;
  topForm.topDayText = item.title;
  apiNewTeamGetTeamInfoHandel();
}

// 下面的
let refBottomSelectRadioPop = ref(null);
function selectBottomTimeClick() {
  refBottomSelectRadioPop.value.onShow();
}
function emitsSelectBottomConfirm(item) {
  bottomForm.day = item.val;
  bottomForm.bottomDayText = item.title;
  apiNewTeamGetThreeLayerInfoHandel();
}

let topTotalInfo = reactive({
  obj: {
    totalAgentNums: "-",
    agentNums: "-",
    agentValidNums: "-",
    totalAmount: "-",
  },
});

// 获取统计
async function apiNewTeamGetTeamInfoHandel() {
  store.loadingShow = true;
  const { success, data } = await apiNewTeamGetTeamInfo(topForm);
  if (!success) return;
  data.info.totalAmount = Number(data.info.totalAmount).toFixed(2);
  topTotalInfo.obj = data.info;
}

apiNewTeamGetTeamInfoHandel();

let bottomTotalInfo = reactive({
  obj: {
    Quantify1: "-",
    Quantify2: "-",
    Quantify3: "-",
    agent1: "-",
    agentValid1: "-",
    agentAmount1: "-",
    agent2: "-",
    agentValid2: "-",
    agentAmount2: "-",
    agent3: "-",
    agentValid3: "-",
    agentAmount3: "-",
  },
});

// 获取三代数据
async function apiNewTeamGetThreeLayerInfoHandel() {
  store.loadingShow = true;
  const { success, data } = await apiNewTeamGetThreeLayerInfo(bottomForm);
  if (!success) return;
  data.info.betRebate1 = Number(data.info.betRebate1 * 100).toFixed(2) + "%";
  data.info.betRebate2 = Number(data.info.betRebate2 * 100).toFixed(2) + "%";
  data.info.betRebate3 = Number(data.info.betRebate3 * 100).toFixed(2) + "%";
  data.info.agentAmount1 = Number(data.info.agentAmount1).toFixed(2);
  data.info.agentAmount2 = Number(data.info.agentAmount2).toFixed(2);
  data.info.agentAmount3 = Number(data.info.agentAmount3).toFixed(2);
  bottomTotalInfo.obj = data.info;
  console.log(data);
}

apiNewTeamGetThreeLayerInfoHandel();

let userInfo = computed(() => {
  return store.userInfo;
});

async function apiGetUserInfoHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetUserInfo();
  if (!success) return;
  store.setUserInfo(data.info);
}
</script>

<style lang='scss'>
.v-my-team-card-one-bottom-right-val {
  max-width: 120px;
  text-align: center;
  padding: 5px 0;
}
.v_my_team {
  height: 100%;

  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: var(--g-white);

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
        font-weight: 700;
        color: #fff;
      }
    }
  }

  .v-my-team-container {
    flex: 1;
    flex-shrink: 0;
    padding-top: 46px;
    overflow: auto;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;

    .v-my-team-card-one {
      background: var(--g-white);
      border-radius: 6px;
      box-shadow: 1px 1px 10px #d3d3d3;
      padding: 15px;

      .v-my-team-card-title {
        .v-my-team-card-title-left {
          font-size: 16px;
          color: #000;
          font-weight: 700;
        }

        .v-my-team-card-title-right {
          padding: 0 10px;
          width: 100px;
          height: 30px;
          border-radius: 4px;
          border: 1px solid #b9b9b9;
          font-size: 14px;
          color: #000;
          font-weight: 700;
          overflow: hidden;

          .v-my-team-card-title-right-text {
            flex: 1;
            @include textEllipsis();
          }

          .iconfont {
            font-size: 20px;
            color: #969696;
            font-weight: normal;
          }
        }
      }

      .v-my-team-card-one-middle-list {
        gap: 5px;
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e7e7e7;

        .v-my-team-card-one-middle-item {
          width: calc(100% / 3);
          position: relative;
          flex-shrink: 0;

          &::after {
            position: absolute;
            right: 0;
            content: "";
            width: 1px;
            height: 40px;
            background: #e7e7e7;
            top: 50%;
            transform: translateY(-50%);
            z-index: 9;
          }

          &:nth-last-of-type(1) {
            &::after {
              display: none;
            }
          }

          .v-my-team-card-one-middle-item-title {
            color: #8b9592;
            font-size: 15px;
            text-align: center;
            width: 100%;
            padding: 0 15px;
            height: 30px;

            span {
              @include textEllipsis(2);
            }
          }

          .v-my-team-card-one-middle-item-val {
            font-size: 20px;
            padding-top: 5px;
            color: #000;
            font-weight: 700;
          }
        }
      }

      .v-my-team-card-one-bottom {
        padding-top: 15px;

        .v-my-team-card-one-bottom-left {
          font-size: 15px;
          color: #8b9592;

          .v-my-team-card-one-bottom-left-val {
            color: #000;
            font-size: 16px;
            padding-left: 5px;
          }
        }

        .v-my-team-card-one-bottom-right {
          border-radius: 4px;
          border: 1px solid #b9b9b9;
          font-size: 14px;
          color: var(--g-main_color);
          font-weight: 700;
          overflow: hidden;
          border-radius: 13px;
          display: flex;
          align-items: center;
        }
      }
    }

    .v-my-team-card-two {
      margin-top: 15px;
      background: var(--g-white);
      border-radius: 6px;
      box-shadow: 1px 1px 10px #d3d3d3;
      padding: 15px;
      padding-bottom: 0;

      .v-my-team-card-title {
        .v-my-team-card-title-left {
          font-size: 16px;
          color: #000;
          font-weight: 700;
        }

        .v-my-team-card-title-right {
          padding: 0 10px;
          width: 100px;
          height: 30px;
          border-radius: 4px;
          border: 1px solid #b9b9b9;
          font-size: 14px;
          color: #000;
          font-weight: 700;
          overflow: hidden;

          .v-my-team-card-title-right-text {
            flex: 1;
            @include textEllipsis();
          }

          .iconfont {
            font-size: 20px;
            color: #969696;
            font-weight: normal;
          }
        }
      }

      .v-my-team-card-two-second-title {
        color: var(--g-main_color);
        font-size: 15px;
        font-weight: 700;
        padding-top: 15px;
      }

      .v-my-team-card-two-middle-list {
        gap: 5px;
        padding-top: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e7e7e7;

        &:nth-last-of-type(1) {
          border-bottom: none;
        }

        .v-my-team-card-two-middle-item {
          width: calc(100% / 4);
          position: relative;
          flex-shrink: 0;

          .v-my-team-card-two-middle-item-val {
            color: #000;
            font-weight: 700;
            font-size: 18px;
          }

          .v-my-team-card-two-middle-item-title {
            margin-top: 15px;
            height: 36px;
            font-size: 14px;
            line-height: 18px;
            width: 100%;
            text-align: center;
            word-break: keep-all;
            color: #8b9592;

            span {
              width: 100%;
              padding: 0 5px;
              display: inline-block;
              @include textEllipsis(2);
            }
          }
        }
      }
    }
  }
}
</style>