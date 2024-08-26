<template>
  <div class="v_chip g-flex-column">
    <div class="v-chip-head">
      <div class="v-chip-head-top g-flex-align-center">
        <div
          @click="$router.go(-1)"
          class="v-chip-head-top-left g-flex-align-center"
        >
          <i class="iconfont icon-zuojiantou"></i>
        </div>
        <div
          class="v-chip-head-top-title g-flex-align-center g-flex-justify-center"
        >
          <span> {{ roomObj.obj.lottery.name }} {{ roomObj.obj.name }} </span>
        </div> 
        <div class="head-icon g-flex-align-center">
          <van-icon
            @click="apiGetChipListHandel()"
            color="#fff"
            name="replay"
            size="1.5rem"
          />
        </div>
        <div
          class="v-head-right g-flex-align-center"
          @click="$router.push('/betsrecord')"
        >
          <i class="iconfont icon-datijilu"></i>
        </div>
      </div>
      <div
        class="lottery-select-wrap g-flex-align-center g-flex-justify-between"
      >
        <div class="lottery-select g-flex" @click="chipQuickClick">
          <div class="label g-flex-align-center">{{ i18n.switch }}</div>
          <div class="v-content-right-icon g-flex-align-center">
            <i class="iconfont icon-you"></i>
          </div>
        </div>
        <div class="bet-info g-flex">
          <div class="bet-info-item">
            <label>{{ i18n.balance }}</label>
            <p>{{ betsInfo.balance }}</p>
          </div>
          <div class="bet-info-item">
            <label>{{ i18n.betAmount }}</label>
            <p>{{ betsInfo.betAmount }}</p>
          </div>
          <div class="bet-info-item">
            <label>{{ i18n.todayWin }}</label>
            <p>{{ betsInfo.todayWin }}</p>
          </div>
        </div>
      </div>
      <div class="v-chip-info">
        <div class="lottery-data g-flex-align-center">
          <img src="/img/chip/clock.png" alt="" />
          <div class="period">
            {{ lotteryObjInfo.obj.next.open_expect }}&nbsp;{{ i18n.expect }}
          </div>
          {{ i18n.close }}
          <span>{{ dealWithHourMinsSec(stopPhurchaseStamp) }}</span>
          {{ i18n.open }}
          <span>
            {{ dealWithHourMinsSec(openLotteryStamp) }}
          </span>
        </div>
        <div
          class="lottery-data g-flex-align-center"
          @click="
            $router.push({
              path: '/lotteryHistory',
              query: { id: roomObj.obj.lottery_id },
            })
          "
        >
          <img src="/img/chip/bell.png" alt="" />
          <div class="period">{{ prevObj.open_expect }}&nbsp;{{ i18n.expect }}</div>
          <div
            class="number g-flex-align-center g-flex-justify-center"
            :class="`number${prevObj.open_code.split(',')[0]}`"
          >
            {{ prevObj.open_code.split(",")[0] }}
          </div>
          <div
            class="number g-flex-align-center g-flex-justify-center"
            :class="`number${prevObj.open_code.split(',')[1]}`"
          >
            {{ prevObj.open_code.split(",")[1] }}
          </div>
          <div
            class="number g-flex-align-center g-flex-justify-center"
            :class="`number${prevObj.open_code.split(',')[2]}`"
          >
            {{ prevObj.open_code.split(",")[2] }}
          </div>
          <div
            class="number g-flex-align-center g-flex-justify-center"
            :class="`number${prevObj.open_code.split(',')[3]}`"
          >
            {{ prevObj.open_code.split(",")[3] }}
          </div>
          <div
            class="number g-flex-align-center g-flex-justify-center"
            :class="`number${prevObj.open_code.split(',')[4]}`"
          >
            {{ prevObj.open_code.split(",")[4] }}
          </div>
          <div
            class="number g-flex-align-center g-flex-justify-center"
            :class="`number${prevObj.open_code.split(',')[5]}`"
          >
            {{ prevObj.open_code.split(",")[5] }}
          </div>
          <div
            class="number g-flex-align-center g-flex-justify-center"
            :class="`number${prevObj.open_code.split(',')[6]}`"
          >
            {{ prevObj.open_code.split(",")[6] }}
          </div>
          <div
            class="number g-flex-align-center g-flex-justify-center"
            :class="`number${prevObj.open_code.split(',')[7]}`"
          >
            {{ prevObj.open_code.split(",")[7] }}
          </div>
          <div
            class="number g-flex-align-center g-flex-justify-center"
            :class="`number${prevObj.open_code.split(',')[8]}`"
          >
            {{ prevObj.open_code.split(",")[8] }}
          </div>
          <div
            class="number g-flex-align-center g-flex-justify-center"
            :class="`number${prevObj.open_code.split(',')[9]}`"
          >
            {{ prevObj.open_code.split(",")[9] }}
          </div>
        </div>
      </div>
    </div>
    <div class="v-chip-content g-flex">
      <div class="play-type">
        <div
          class="type-item g-flex-align-center g-flex-justify-center"
          :class="tabIndex === index ? 'active' : ''"
          v-for="(item, index) in roomObj.obj.lotteryGroupList"
          :key="`room${item.id}`"
          @click="tabIndex = index"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="type-content">
        <div
          class="content-item"
          v-for="(el, index) in roomObj.obj.lotteryGroupList"
          v-show="tabIndex === index"
          :key="`type${el.id}`"
        >
          <div class="content-title g-flex-align-center g-flex-justify-center">
            {{ el.name }}
          </div>
          <div class="nums-wrap">
            <div
              class="num-item g-flex-align-center g-flex-justify-center"
              :class="isActice(num) ? 'active' : ''"
              v-for="num in el.lotteryPlayedList"
              :key="`num${num.id}`"
              @click="betsClick(num)"
            >
              <div
                class="num g-flex-align-center g-flex-justify-center"
                :class="`number${num.name}`"
              >
                {{ num.name }}
              </div>
              <div class="rate">{{ num.odds }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="v-chip-footer g-flex-align-center">
      <div class="quick-list g-flex-align-center" v-show="quickShow">
        <div
          :class="getClass(index)"
          class="quick-item g-flex-align-center g-flex-justify-center"
          v-for="(item, index) in roomObj.obj.quickList"
          :key="`chips${item}`"
          @click="betAmount = item"
        >
          {{ calculateChips(item) }}
        </div>
      </div>
      <div class="amount">
        <p>
          {{ $t("chip.betedText", { num: betNums }) }}
        </p>
        <van-field
          class="chip-amount"
          v-model="betAmount"
          label=""
          label-width="0"
          :placeholder="i18n.betAmount"
        />
      </div>
      <div
        class="foot-btn btn-green g-flex-align-center g-flex-justify-center"
        @click="apiChipDownOrderHandel"
      >
        {{ i18n.betText }}
      </div>
      <div
        class="foot-btn btn-red g-flex-align-center g-flex-justify-center"
        @click="quickShow = !quickShow"
      >
        {{ i18n.chips }}
      </div>
      <div
        class="foot-btn btn-blue g-flex-align-center g-flex-justify-center"
        @click="betsList = []"
      >
        {{ i18n.reset }}
      </div>
      <div
        class="close g-flex-align-center g-flex-justify-center"
        v-show="stopPhurchaseStamp < 1"
      >
        {{ i18n.closed }}
      </div>
    </div>
    <ChipPop ref="refChipPop" @lotterySelected="lotterySelected" />
  </div>
</template>

<script setup>
import ChipCancelPop from "./ChipCancelPop.vue";
import ChipPop from "./ChipPop.vue";
import {
  apiGetUserInfo,
  apiGetRoomInfo,
  apiGetChipList,
  apiChipDownOrder,
  apiGetRoomGroup,
  apiBetInfo,
} from "@/utils/api.js";
import { reactive, ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import useStore from "@/store/index.js";
import { WebSocketInstance } from "@/utils/web_socket.js";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import { dealWithHourMinsSec } from "@/utils/index";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("chip");
});
const quickShow = ref(false);
let roomObj = reactive({
  obj: {
    lottery: {},
  },
});
const refIframe = ref();
const betAmount = ref();

const tabIndex = ref(0);
let form = reactive({
  id: route.query.id,
  room: route.query.room,
});

// type 1卡片 2是文字 3封盘
let orderRadomList = reactive({
  list: [],
});
function lotterySelected(id) {
  form.id = id;
  apiGetRoomInfoHandel();
}
function scrollToBottom() {
  nextTick(() => {
    let scrollDom = document.getElementById("chip-order-list");
    scrollDom.scrollTo({ top: scrollDom.scrollHeight, behavior: "smooth" });
  });
}

// 获取房间信息
async function apiGetRoomInfoHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetRoomInfo({ id: form.id });
  if (!success) return;
  roomObj.obj = data.info;
  store.loadingShow = true;
  if (data.info.next.lottery_id) {
    let template1Data = {
      type: 2,
      open_expect: data.info.next.open_expect,
      content: "",
      // content: `${i18n.value.danbiText}${roomObj.obj.min}${i18n.value.startText}，${i18n.value.zongjinerFengtingText}`,
      content2: "",
    };
    orderRadomList.list.unshift(template1Data);
  }
  wsJoinGroupHandel();
  apiGetChipListHandel();
}

apiGetRoomInfoHandel();

// 订阅推送 type 1卡片 2是文字 3封盘
function wsJoinGroupHandel() {
  WebSocketInstance.joinGroup("lotteryRoom" + form.id, (data) => {
    // console.log('lotteryRoom', data)
    let template1Data = {
      type: 2,
      open_expect: data.openExpect,
      content: "",
      // content: `${i18n.value.danbiText}${roomObj.obj.min}${i18n.value.startText}，${i18n.value.zongjinerFengtingText}`,
      content2: "",
    };
    // let template2Data = reactive({
    //   type: 3,
    //   open_expect: data.openExpect,
    //   content: `${i18n.value.qihaoText}:` + data.openExpect,
    //   content2: `${i18n.value.guanbiTipsText}${roomObj.obj.min}`,
    // })

    let template3Data = reactive({
      type: 3,
      open_expect: data.openExpect,
      content: `${i18n.value.yifengpanText}:`,
      content2: "",
    });
    // 卡片
    if (data.type == 1) {
      let templateCardData = data;
      // console.log('xxxx', findWsDownOrderTypeText(data.lotteryPlayed))
      // 找到对应的下单类型 语言文字
      let target = findWsDownOrderTypeText(data.lotteryPlayed);
      templateCardData.targetObj = target;
      orderRadomList.list.unshift(templateCardData);
    } else if (data.type == 2) {
      orderRadomList.list.unshift(template1Data);
    } else if (data.type == 3) {
      // orderRadomList.list.unshift(template2Data)
      orderRadomList.list.unshift(template3Data);
    }
    // 数组长度最长到1000 超出需要清除
    if (orderRadomList.list.length >= 1000) {
      orderRadomList.list = orderRadomList.list.slice(0, 1000);
    }
  });
}

// 离开取消订阅
function wsLeaveGroupHandel() {
  WebSocketInstance.leaveGroup("lotteryRoom" + form.id);
}

// websocket找到对应的下单类型 文字
function findWsDownOrderTypeText(paramsTarget) {
  let oneArrrayList = [];
  roomObj.obj.lotteryGroupList.forEach((item) => {
    oneArrrayList = oneArrrayList.concat(item.lotteryPlayedList);
  });
  let target = oneArrrayList.find((item) => {
    return paramsTarget.id == item.id;
  });
  if (target) {
    return Object.assign(target, paramsTarget);
  } else {
    return { id: "", name: "", amount: "" };
  }
}

// 右边的弹窗
let headPopShow = ref(false);

// 往期弹窗
let historyPopShow = ref(false);

let timer = ref(0);

let historyLotteryDataList = reactive({
  list: [],
});

let lotteryObjInfo = reactive({
  obj: {
    next: {
      open_expect: "-",
    },
  },
});

// 上一期的信息
const prevObj = computed(() => {
  if (!historyLotteryDataList.list.length) {
    return {
      open_expect: "-",
      open_code: "",
      open_code_arr: [],
      open_time: "",
      total: 0,
    };
  } else {
    let lastObj = historyLotteryDataList.list[0];
    lastObj.open_code_arr = lastObj.open_code.split(",").map((item) => {
      return Number(item);
    });
    lastObj.total = lastObj.open_code_arr.reduce((current, next) => {
      return current + next;
    });
    return lastObj;
  }
});
//封盘时间戳
const stopPhurchaseStamp = ref(0);
//开奖时间戳
const openLotteryStamp = ref(0);
// 获取开奖信息
async function apiGetChipListHandel() {
  const { success, data } = await apiGetChipList({
    id: roomObj.obj.lottery_id,
  });
  if (!success) return;
  // 处理历史数据
  historyLotteryDataList.list = data.lotteryDataList.map((item) => {
    item.open_code_arr = item.open_code.split(",").map((item) => {
      return Number(item);
    });
    item.total = item.open_code_arr.reduce((current, next) => {
      return current + next;
    });
    return item;
  });
  if (
    lotteryObjInfo.obj.next.open_expect === "-" ||
    lotteryObjInfo.obj.next.open_expect !== data.lottery.next.open_expect
  ) {
    getBetInfo(data.lottery.next.open_expect);
  }
  lotteryObjInfo.obj = data.lottery;
  stopPhurchaseStamp.value =
    data.lottery.next.open_time - data.nowTime - data.lottery.stop_time;
  openLotteryStamp.value = data.lottery.next.open_time - data.nowTime;
  timeDown();
}

// 校准数据 5秒一次
let jiaoZhunNums = ref(1);

function timeDown() {
  if (timer.value) clearInterval(timer.value);
  timer.value = setInterval(() => {
    jiaoZhunNums.value++;
    if (jiaoZhunNums.value % 5 == 0) {
      apiGetChipListHandel();
    }
    if (stopPhurchaseStamp.value > 0) {
      stopPhurchaseStamp.value--;
    }
    if (openLotteryStamp.value > 0) {
      openLotteryStamp.value--;
    } else {
      apiGetChipListHandel();
    }
  }, 1000);
}

let refChipPop = ref(null);
// 快速交易
function chipQuickClick() {
  refChipPop.value.onShow(lotteryList.value);
}

let refChipCancelPop = ref("ChipCancelPop");
// 交易取消
function canCelClick() {
  refChipCancelPop.value.onShow(roomObj.obj);
}

const betNums = computed(() => betsList.value.length);
const betsList = ref([]);
const getClass = (index) => {
  if (index === 0 || index === 3 || index === 6) {
    return "chip-red";
  } else if (index === 1 || index === 4 || index === 7) {
    return "chip-blue";
  } else if (index === 2 || index === 5 || index === 8) {
    return "chip-green";
  }
};
const calculateChips = (chip) => {
  if (chip < 1000) {
    return chip;
  } else if (chip < 1000000) {
    return chip / 1000 + "K";
  } else {
    return chip / 1000000 + "M";
  }
};
// 是否active
const isActice = (item) => {
  let findIndex = betsList.value.findIndex((item2) => {
    return item.id == item2.id;
  });
  if (findIndex == -1) {
    return false;
  } else {
    return true;
  }
};
const betsClick = (item) => {
  let findIndex = betsList.value.findIndex((item2) => {
    return item.id == item2.id;
  });
  if (findIndex == -1) {
    betsList.value.push(item);
  } else {
    betsList.value.splice(findIndex, 1);
  }
  console.log(betsList.value);
};
// 下单请求
const apiChipDownOrderHandel = async () => {
  if (!betAmount.value) {
    Toast.fail(i18n.value.amountPlaceholder);
    return;
  }
  if (!betsList.value.length) {
    Toast.fail(i18n.value.betsPlaceholder);
    return;
  }
  if (betsList.value.length) {
    betsList.value.forEach((item) => {
      item.amount = betAmount.value;
    });
  }
  store.loadingShow = true;
  const { success, data } = await apiChipDownOrder({
    amount: betAmount.value,
    betList: betsList.value,
    id: form.id,
    openExpect: lotteryObjInfo.obj.next.open_expect,
  });
  if (!success) return;
  Toast.success(data.msg);
  getBetInfo();
  betAmount.value = "";
  betsList.value = [];
  resetData();
  emits("emitDownOrderSuccess");
  onClose();
};
const lotteryList = ref();
async function getLotterys() {
  const { success, data } = await apiGetRoomGroup({ id: form.room });
  if (!success) return;
  lotteryList.value = data.info;
}
getLotterys();
const betsInfo = ref({});
const getBetInfo = async (expect) => {
  const { success, data } = await apiBetInfo({
    id: form.id,
    lottery_expect: expect ? expect : lotteryObjInfo.obj.next.open_expect,
  });
  if (!success) return;
  betsInfo.value = data.info;
};
onUnmounted(() => {
  clearInterval(timer.value);
  wsLeaveGroupHandel();
});
</script>

<style lang='scss'>
.v_chip {
  height: 100%;
  overflow: auto;
  background: #f3f3f3;

  .v-chip-head {
    width: 100%;
    .v-chip-head-top {
      height: 50px;
      position: relative;
      background: #1e1c38;
      .v-chip-head-top-left {
        position: absolute;
        height: 100%;
        left: 0;
        padding-left: 15px;

        .iconfont {
          font-size: 26px;
          color: var(--g-white);
          font-weight: 700;
        }
      }

      .v-chip-head-top-title {
        font-size: 16px;
        height: 100%;
        font-weight: 700;
        color: var(--g-white);
        flex: 1;
        text-align: center;
      }
      .head-icon {
        position: absolute;
        right: 44px;
      }
      .v-head-right {
        position: absolute;
        height: 100%;
        right: 5px;
        top: 0;
        padding: 0 0 0 10px;

        .iconfont {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
        }
      }
    }
    .lottery-select-wrap {
      padding: 5px 10px;
      .lottery-select {
        padding: 0 15px;
        height: 34px;
        font-size: 14px;
        background: rgb(79, 117, 188);
        color: #fff;
        border-radius: 8px;
        &.lottery-video {
          background: rgb(197, 94, 71);
        }
      }
      .bet-info {
        flex: 1;
        .bet-info-item {
          flex: 1;
          text-align: center;
          font-size: 12px;
          padding-top: 3px;
          p {
            margin-top: 3px;
          }
        }
      }
    }
    .v-chip-info {
      background: #fff;
      .lottery-data {
        padding: 10px 0 10px 10px;
        font-size: 12px;
        border-bottom: 1px solid #f2f2f2;
        img {
          width: 20px;
          margin-right: 6px;
        }
        .period {
          margin-right: 5px;
        }
        span {
          color: red;
          margin: 0 6px;
        }
        .number {
          width: 18px;
          height: 18px;
          color: #fff;
          border-radius: 4px;
          margin-right: 3px;
        }
      }
    }
  }
  .v-chip-content {
    width: 100%;
    height: calc(100vh - 257px);
    .play-type {
      width: 100px;
      height: 100%;
      overflow-y: scroll;
      border-right: 1px solid rgb(7, 7, 7);
      .type-item {
        height: 35px;
        font-size: 12px;
        background: #fff;
        border-bottom: 1px solid #f2f2f2;
        &.active {
          background: rgb(7, 7, 7);
          color: #fff;
          font-weight: 600;
        }
      }
    }
    .type-content {
      flex: 1;
      height: 100%;
      overflow-y: scroll;
      .content-item {
        .content-title {
          height: 35px;
          color: rgb(183, 66, 69);
          font-size: 16px;
          font-weight: 600;
        }
        .nums-wrap {
          display: flex;
          flex-wrap: wrap;
          background: #fff;
          position: relative;
          .num-item {
            width: 50%;
            height: 45px;
            border-bottom: 1px solid #f2f2f2;
            &.active {
              background: rgb(192, 192, 192);
            }
            .num {
              width: 25px;
              height: 25px;
              border-radius: 4px;
              color: #c5bdbd;
              margin-right: 10px;
            }
          }
          &::after {
            content: "";
            width: 2px;
            height: 100%;
            background: #f2f2f2;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
  .v-chip-footer {
    height: 80px;
    width: 100%;
    background: rgb(102, 102, 102);
    position: fixed;
    left: 0;
    bottom: 0;
    .amount {
      width: 140px;
      margin: 0 10px;
      p {
        color: #fff;
        font-size: 18px;
      }
      .chip-amount {
        margin-top: 10px;
        height: 30px;
        border-radius: 8px;
        padding: 0 10px;
        display: flex;
        align-items: center;
      }
    }
    .foot-btn {
      width: 60px;
      height: 60px;
      margin-right: 10px;
      color: #fff;
      border-radius: 8px;
      text-align: center;
      &.btn-green {
        background: rgb(153, 189, 123);
      }
      &.btn-red {
        background: rgb(197, 94, 71);
      }
      &.btn-blue {
        background: rgb(79, 117, 188);
      }
    }
    .quick-list {
      position: absolute;
      left: 0;
      top: -46px;
      height: 44px;
      .quick-item {
        color: #000;
        width: 44px;
        height: 44px;
        margin: 0 5px;
        font-size: 12px;
        &.chip-red {
          background: url(/img/chip/betRed.png) no-repeat;
          background-size: 100% 100%;
        }
        &.chip-blue {
          background: url(/img/chip/betBlue.png) no-repeat;
          background-size: 100% 100%;
        }
        &.chip-green {
          background: url(/img/chip/betGreen.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .close {
      background: rgba(217, 162, 162, 0.6);
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      color: #111;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
.number01 {
  background: #fff401;
}
.number02 {
  background: #0b99e1;
}
.number03 {
  background: #4b4b4b;
}
.number04 {
  background: #ff7000;
}
.number05 {
  background: #7ff9f9;
}
.number06 {
  background: #5135fc;
}
.number07 {
  background: #bb6d6d;
}
.number08 {
  background: #d80404;
}
.number09 {
  background: #770700;
}
.number10 {
  background: #13980e;
}
</style>