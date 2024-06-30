<template>
  <div class="v_chip g-flex-column">
    <div class="v-chip-head">
      <div class="v-chip-head-top g-flex-align-center">
        <div @click="$router.go(-1)" class="v-chip-head-top-left g-flex-align-center">
          <i class="iconfont icon-zuojiantou"></i>
        </div>
        <div class="v-chip-head-top-title g-flex-align-center g-flex-justify-center">
          <span>
            {{ roomObj.obj.lottery.name }} {{ roomObj.obj.name }}
          </span>
        </div>
        <div class="v-chip-head-top-right g-flex-align-center">
          <div @click="headPopShow = !headPopShow" class="v-chip-head-top-right-img g-flex-align-center">
            <img src="/img/icon/menu.png" alt="" />
          </div>
          <div class="v-head-right-pop-overlay" @click="headPopShow = !headPopShow" v-show="headPopShow"></div>
          <!-- 右侧弹窗 -->
          <div v-show="headPopShow" class="v-head-right-pop-box">
            <div class="v-head-right-pop">
              <div @click="$router.push({ name: 'zoushi', query: { id: roomObj.obj.lottery_id } })"
                class="v-head-right-pop-item">
                <span>{{ i18n.zoushiText }}</span>
              </div>
              <div @click="$router.push({ name: 'mybill' })" class="v-head-right-pop-item">
                <span>{{ i18n.jiaoyiJiLuText }}</span>
              </div>
              <div @click="kefuClick" class="v-head-right-pop-item ">
                <span>{{ i18n.zaixiankefuText }}</span>
              </div>
              <div @click="descClick" class="v-head-right-pop-item">
                <span>{{ i18n.jiaoyiShuoMingText }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="v-chip-head-middle g-flex-align-center">
        <div class="v-chip-head-middle-left g-flex-column g-flex-align-center">
          <div class="v-chip-head-middle-left-title">
            <span>{{ i18n.juliText }}{{ lotteryObjInfo.obj.next.open_expect }}{{ i18n.qiFengpanText }}</span>
          </div>
          <div v-show="chazhi > 0" class="v-chip-head-middle-left-time g-flex-align-center">
            <div class="v-chip-head-middle-left-time-item">
              <span>{{ nowTime ? hour : '-' }}</span>
            </div>
            :
            <div class="v-chip-head-middle-left-time-item">
              <span>{{ nowTime ? min : '-' }}</span>
            </div>
            :
            <div class="v-chip-head-middle-left-time-item">
              <span>{{ nowTime ? sec : '-' }}</span>
            </div>
          </div>
          <div v-show="chazhi <= 0" class="v-chip-head-middle-left-time-jiezhi g-flex-align-center">
            {{ nowTime ? i18n.yifengpanText : '---' }}
          </div>
        </div>

        <div class="v-chip-head-middle-right g-flex-column g-flex-align-center">
          <div class="v-chip-head-middle-right-title">
            {{ i18n.yuerText }}
          </div>
          <div class="v-chip-head-middle-right-val">
            {{ userInfo.balance }}
          </div>
        </div>
      </div>

      <div class="v-chip-head-bottom">
        <div @click="historyPopShow = !historyPopShow" class="v-chip-head-bottom-content g-flex-align-center">
          <div class="v-chip-head-bottom-left">
            {{ i18n.diText }}<span>{{ prevObj.open_expect }}</span>{{ i18n.qiText }}
          </div>
          <!--  v-show="prevObj.open_code_arr.length" -->
          <div class="v-chip-head-bottom-right g-flex-align-center">
            <div class="v-chip-head-bottom-right-item g-flex-align-center g-flex-justify-center">
              {{ prevObj.open_code_arr[0] }}
            </div>
            +
            <div class="v-chip-head-bottom-right-item g-flex-align-center g-flex-justify-center">
              {{ prevObj.open_code_arr[1] }}
            </div>
            +
            <div class="v-chip-head-bottom-right-item  g-flex-align-center g-flex-justify-center">
              {{ prevObj.open_code_arr[2] }}
            </div>
            =
            <div
              class="v-chip-head-bottom-right-item  g-flex-align-center g-flex-justify-center v-chip-head-bottom-right-item-total">
              {{ prevObj.total }}
            </div>
            <div class="v-chip-head-bottom-right-item-text">
              ({{ filterBigSmall(prevObj.total) }}{{ filterDanShuang(prevObj.total) }})
            </div>
          </div>
        </div>
        <!-- 历史期 -->
        <div v-show="historyPopShow" class="v-chip-head-bottom-pop">
          <div class="v-chip-head-bottom-pop-title-list g-flex-align-center">
            <div class="v-chip-head-bottom-pop-title-item g-flex-align-center g-flex-justify-center">
              {{ i18n.qishuText }}
            </div>
            <div class="v-chip-head-bottom-pop-title-item g-flex-align-center g-flex-justify-center">
              {{ i18n.zongheText }}
            </div>
            <div class="v-chip-head-bottom-pop-title-item g-flex-align-center g-flex-justify-center">
              {{ i18n.jieguoText }}
            </div>
          </div>
          <div class="v-chip-head-bottom-pop-list">
            <div class="v-chip-head-bottom-pop-item g-flex-align-center"
              v-for="(item, index) in historyLotteryDataList.list" :key="index">
              <div class="v-chip-head-bottom-pop-item-one g-flex-justify-center g-flex-align-center">
                {{ i18n.diText }} <span>{{ item.open_expect }}</span> {{ i18n.qiText }}
              </div>
              <div class="v-chip-head-bottom-pop-item-two g-flex-justify-center g-flex-align-center">
                <div class="v-two-item g-flex-align-center g-flex-justify-center">{{ item.open_code_arr[0] }}</div>+
                <div class="v-two-item g-flex-align-center g-flex-justify-center">{{ item.open_code_arr[1] }}</div>+
                <div class="v-two-item g-flex-align-center g-flex-justify-center">{{ item.open_code_arr[2] }}</div>=
                <div class="v-two-item v-two-item-result g-flex-align-center g-flex-justify-center">{{ item.total }}</div>
              </div>
              <div class="v-chip-head-bottom-pop-item-three g-flex-justify-center g-flex-align-center">
                ({{ filterBigSmall(item.total) }}{{ filterDanShuang(item.total) }})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="v-chip-container g-flex-column">
      <div id="chip-order-list" class="v-chip-order-list">
        <div v-show="orderRadomList.list.length > 3" @click="scrollToBottom" class="v-chip-order-list-tobottom">
          <img src="/img/icon/down.png" alt="" />
        </div>
        <div class="v-chip-order-item-box" v-for="(item, index) in orderRadomList.list" :key="index">
          <div class="v-chip-order-item-card" v-if="item.type == 1">
            <div class="v-order-item-card-top" :class="item.userId == userInfo.id ? 'g-flex-justify-end': ''">
              <span>{{ formatDate(item.time, 'hh:mm:ss') }}</span>
            </div>
            <div class="v-order-item-card-bottom g-flex">
              <div v-show="item.userId != userInfo.id" class="v-order-item-card-bottom-img">
                <img :src="item.avatar" alt="" />
              </div>
              <div :class="item.userId == userInfo.id ? 'v-order-item-card-bottom-right-self': ''" class="v-order-item-card-bottom-right">
                <div :class="item.userId == userInfo.id ? 'g-flex-justify-end': ''" class="v-card-bottom-right-username">
                  {{ item.userName }}
                </div>
                <div class="v-card-bottom-right-info">
                  <div class="v-card-bottom-right-info-qi">
                    {{ item.openExpect }}{{ i18n.qiText }}
                  </div>

                  <div class="v-card-bottom-right-info-leixing g-flex-align-center g-flex-justify-between">
                    <div class="v-card-bottom-right-info-leixing-item">
                      {{ i18n.busTypeText }}
                    </div>
                    <div class="v-card-bottom-right-info-leixing-item">
                      {{ i18n.busAmountText }}
                    </div>
                  </div>

                  <div class="v-card-bottom-right-info-leixing-val g-flex-align-center g-flex-justify-between">
                    <div class="v-card-bottom-right-info-leixing-val-item">
                      {{ item.targetObj.name }}
                    </div>
                    <div class="v-card-bottom-right-info-leixing-val-item">
                      {{ Number(item.targetObj.amount).toFixed(2) }}{{ i18n.jinerText }}
                    </div>
                  </div>

                  <div class="v-card-bottom-right-info-total g-flex-align-center">
                    <div class="v-card-bottom-right-info-total-item">{{ i18n.totalText }},</div>
                    <div class="v-card-bottom-right-info-total-item">{{ Number(item.targetObj.amount).toFixed(2) }}{{ i18n.jinerText }}</div>
                  </div>
                </div>
              </div>
              <div v-show="item.userId == userInfo.id" class="v-order-item-card-bottom-img">
                <img :src="item.avatar" alt="" />
              </div>
            </div>
          </div>

          <div v-if="item.type == 2" class="v-chip-order-item-msg-box g-flex-column g-flex-align-center">
            <div class="v-chip-order-item-msg g-flex-column g-flex-align-center">
              <div class="v-chip-order-item-msg-title">
                【NO.{{ item.open_expect }}】
              </div>
              <div class="v-chip-order-item-msg-content">
                <span>{{ item.content }}</span>
              </div>
              <div v-if="item.content2" class="v-chip-order-item-msg-content">
                <span>{{ item.content2 }}</span>
              </div>
            </div>
          </div>

          <div v-if="item.type == 3" class="v-chip-order-item-msg-box g-flex-column g-flex-align-center">
            <div class="v-chip-order-item-msg g-flex-column g-flex-align-center">
              <div class="v-chip-order-item-msg-title">
                【NO.{{ item.open_expect }}】
              </div>
              <div class="v-chip-order-item-msg-content">
                <span>{{ item.content }}</span>
              </div>
              <div v-if="item.content2" class="v-chip-order-item-msg-content">
                <span>{{ item.content2 }}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="v-chip-btn-list-box">
      <div class="v-chip-btn-list g-flex-align-center g-flex-justify-between">
        <div @click="chipQuickClick"
          class="v-chip-btn-item g-flex-align-center g-flex-justify-center v-chip-btn-item-yellow">
          <span>{{ i18n.quickBusText }}</span>
        </div>
        <div @click="canCelClick" class="v-chip-btn-item g-flex-align-center g-flex-justify-center v-chip-btn-item-black">
          <span>{{ i18n.cancelBusText }}</span>
        </div>
      </div>
    </div>

    <ChipDescPop ref="refChipDescPop" />

    <ChipPop @emitDownOrderSuccess="apiGetUserInfoHandel" :openExpectVal="lotteryObjInfo.obj.next.open_expect"
      ref="refChipPop" />

      <ChipCancelPop @emitCancelSuccess="apiGetUserInfoHandel" ref="refChipCancelPop"/>
  </div>
</template>

<script setup>
import ChipCancelPop from './ChipCancelPop.vue'
import { apiGetUserInfo, apiGetRoomInfo, apiGetChipList } from '@/utils/api.js'
import { formatDate, kefuClick, filterDanShuangBgColorClass, filterBigSmallBgColorClass, filterDanShuang, filterBigSmall } from '@/utils/index.js'
import ChipPop from './ChipPop.vue'
import ChipDescPop from './ChipDescPop.vue'
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
import ws from "@/utils/ws.js";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("chip");
});

let roomObj = reactive({
  obj: {
    lottery: {}
  }
})

let userInfo = computed(() => {
  return store.userInfo
})

// 用户信息
async function apiGetUserInfoHandel() {
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
}

apiGetUserInfoHandel()


let form = reactive({
  id: route.query.id
})

// type 1卡片 2是文字 3封盘
let orderRadomList = reactive({
  list: []
})

function scrollToBottom() {
  nextTick(() => {
    let scrollDom = document.getElementById('chip-order-list')
    scrollDom.scrollTo({ top: scrollDom.scrollHeight, behavior: 'smooth' });
  })
}

// 获取房间信息
async function apiGetRoomInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetRoomInfo({ id: form.id })
  if (!success) return
  roomObj.obj = data.info
  store.loadingShow = true
  if (data.info.next.lottery_id) {
    let template1Data = {
      type: 2,
      open_expect: data.info.next.open_expect,
      content:'',
      // content: `${i18n.value.danbiText}${roomObj.obj.min}${i18n.value.startText}，${i18n.value.zongjinerFengtingText}`,
      content2: '',
    }
    orderRadomList.list.unshift(template1Data)
  }
  wsJoinGroupHandel()
  apiGetChipListHandel()
}

apiGetRoomInfoHandel()


// 订阅推送 type 1卡片 2是文字 3封盘
function wsJoinGroupHandel() {
  ws.joinGroup('lotteryRoom' + form.id, (data) => {
    // console.log('lotteryRoom', data)
    let template1Data = {
      type: 2,
      open_expect: data.openExpect,
      content:'',
      // content: `${i18n.value.danbiText}${roomObj.obj.min}${i18n.value.startText}，${i18n.value.zongjinerFengtingText}`,
      content2: '',
    }
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
      content2: '',
    })
    // 卡片
    if (data.type == 1) {
      let templateCardData = data
      // console.log('xxxx', findWsDownOrderTypeText(data.lotteryPlayed)) 
      // 找到对应的下单类型 语言文字
      let target = findWsDownOrderTypeText(data.lotteryPlayed)
      templateCardData.targetObj = target
      orderRadomList.list.unshift(templateCardData)
    } else if (data.type == 2) {
      orderRadomList.list.unshift(template1Data)
    } else if (data.type == 3) {
      // orderRadomList.list.unshift(template2Data)
      orderRadomList.list.unshift(template3Data)
    }
    // 数组长度最长到1000 超出需要清除
    if(orderRadomList.list.length >= 1000) {
      orderRadomList.list = orderRadomList.list.slice(0,1000)
    }
  })
}

// 离开取消订阅
function wsLeaveGroupHandel() {
  ws.leaveGroup('lotteryRoom' + form.id)
}

// websocket找到对应的下单类型 文字
function findWsDownOrderTypeText(paramsTarget) {
  let oneArrrayList = []
  roomObj.obj.lotteryGroupList.forEach(item => {
    oneArrrayList = oneArrrayList.concat(item.lotteryPlayedList)
  });
  let target = oneArrrayList.find(item => {
    return paramsTarget.id == item.id
  })
  if (target) {
    return Object.assign(target, paramsTarget)
  } else {
    return { id: '', name: '', amount: '' }
  }
}

// 右边的弹窗
let headPopShow = ref(false)

// 往期弹窗
let historyPopShow = ref(false)

let timer = ref(0)
let stopTime = ref(0)
let endTime = ref(0)
let nowTime = ref(0)
let chazhi = ref(0)
let hour = ref('')
let min = ref('')
let sec = ref('')

let historyLotteryDataList = reactive({
  list: []
})

let lotteryObjInfo = reactive({
  obj: {
    next: {
      open_expect: '-'
    }
  }
})

// 上一期的信息
const prevObj = computed(() => {
  if (!historyLotteryDataList.list.length) {
    return {
      "open_expect": "-",
      "open_code": "",
      "open_code_arr": [],
      "open_time": '',
      "total": 0
    }
  } else {
    let lastObj = historyLotteryDataList.list[0]
    lastObj.open_code_arr = lastObj.open_code.split(',').map(item => {
      return Number(item)
    })
    lastObj.total = lastObj.open_code_arr.reduce((current, next) => {
      return current + next
    })
    return lastObj
  }
});

// 获取开奖信息
async function apiGetChipListHandel() {
  const { success, data } = await apiGetChipList({ id: roomObj.obj.lottery_id })
  if (!success) return
  // 处理历史数据
  historyLotteryDataList.list = data.lotteryDataList.map((item) => {
    item.open_code_arr = item.open_code.split(',').map(item => {
      return Number(item)
    })
    item.total = item.open_code_arr.reduce((current, next) => {
      return current + next
    })
    return item
  })
  lotteryObjInfo.obj = data.lottery
  stopTime.value = data.lottery.stop_time * 1000
  nowTime.value = data.nowTime * 1000
  endTime.value = Number(data.lottery.next.open_time * 1000) - Number(stopTime.value)
  // 处理1秒后才显示数据的问题
  chazhi.value = endTime.value - nowTime.value
  dealWithHourMinsSec()
  endTime.value = endTime.value - 1000
  timeDown()
  apiGetUserInfoHandel()
}

function dealWithHourMinsSec() {
  hour.value = Math.floor((chazhi.value / 3600000) % 24)
  min.value = Math.floor((chazhi.value / 60000) % 60)
  sec.value = Math.floor((chazhi.value / 1000) % 60)
  hour.value = hour.value < 10 ? "0" + hour.value : hour.value
  min.value = min.value < 10 ? "0" + min.value : min.value
  sec.value = sec.value < 10 ? "0" + sec.value : sec.value
}

// 校准数据 5秒一次
let jiaoZhunNums = ref(1)

function timeDown() {
  if (timer.value) clearInterval(timer.value)
  timer.value = setInterval(() => {
    jiaoZhunNums.value++
    if (jiaoZhunNums.value % 5 == 0) {
      apiGetChipListHandel()
    }
    if (endTime.value) {
      chazhi.value = endTime.value - nowTime.value
      if (chazhi.value > 0) {
        dealWithHourMinsSec()
        endTime.value = endTime.value - 1000
      } else {
        hour.value = min.value = sec.value = '-'
        clearInterval(timer.value)
        setTimeout(() => {
          // store.loadingShow = true
          apiGetChipListHandel()
        }, stopTime.value);
      }
    } else {
      hour.value = min.value = sec.value = '-'
      clearInterval(timer.value)
    }
  }, 1000)
}



let refChipDescPop = ref(null)
function descClick() {
  refChipDescPop.value.onShow(lotteryObjInfo.obj.description)
  headPopShow.value = false
}


let refChipPop = ref(null)
// 快速交易
function chipQuickClick() {
  refChipPop.value.onShow()
}
let refChipCancelPop = ref('ChipCancelPop')
// 交易取消
function canCelClick() {
  refChipCancelPop.value.onShow(roomObj.obj)
}

onUnmounted(() => {
  clearInterval(timer.value)
  wsLeaveGroupHandel()
});
</script>

<style lang='scss'>
.v_chip {
  height: 100%;
  overflow: auto;
  background: #f3f3f3;

  .v-chip-head {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 9;
    background: #1E1C38;
    height: 175px;

    .v-chip-head-top {
      height: 50px;
      position: relative;

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

      .v-chip-head-top-right {
        position: absolute;
        height: 100%;
        right: 0;
        padding: 15px;

        .v-head-right-pop-overlay {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 8;
          background-color: rgba(0, 0, 0, .3);
        }

        .v-head-right-pop-box {
          width: 140px;
          position: absolute;
          z-index: 26;
          top: 55px;
          border-radius: 7px;
          right: 10px;

          .v-head-right-pop {
            border-radius: 7px;
            max-height: 300px;
            overflow: auto;
            margin-bottom: 0;
            background-color: #f7f7f7;

            .v-head-right-pop-item {
              padding: 12px 15px;
              width: 100%;
              text-align: center;
              color: #333333;
              font-size: 15px;
              @include textEllipsis(1);
            }
          }

          &::after {
            z-index: 999;
            top: -6px;
            position: absolute;
            right: 5px;
            width: 26px;
            height: 26px;
            content: ' ';
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
            border-radius: 3px;
            background: #f7f7f7;
          }
        }

        .v-chip-head-top-right-img {
          img {
            width: 22px;
            object-fit: contain;
            height: 22px;
          }
        }

      }
    }

    .v-chip-head-middle {
      padding-top: 10px;

      .v-chip-head-middle-left {
        padding: 0 15px;
        position: relative;

        &::after {
          content: " ";
          position: absolute;
          top: 0;
          width: 1px;
          bottom: 0;
          color: #c7c7c7;
          height: 80%;
          right: -10px;
          border-right: 1px solid #c7c7c7;
          -webkit-transform-origin: 100% 0;
          transform-origin: 100% 0;
          -webkit-transform: scaleX(0.5);
          transform: scaleX(0.5);
        }

        .v-chip-head-middle-left-title {
          color: var(--g-white);
          font-size: 14px;
        }

        .v-chip-head-middle-left-time {
          padding: 10px;

          // color: var(--g-white);
          .v-chip-head-middle-left-time-item {
            background: var(--g-white);
            width: 27px;
            height: 24px;
            margin: 0 5px;
            color: #424242;
            font-weight: 600;
            line-height: 24px;
            text-align: center;
            border-radius: 2px;
            font-size: 14px;
          }
        }

        .v-chip-head-middle-left-time-jiezhi {
          color: var(--g-white);
          padding: 10px;
          font-size: 14px;
        }
      }

      .v-chip-head-middle-right {
        flex: 1;
        color: var(--g-white);
        padding: 0 15px;
        font-size: 14px;
        padding-bottom: 10px;
        color: #fff;

        .v-chip-head-middle-right-title {
          color: #2aa7f6;
          line-height: 22px;
        }

        .v-chip-head-middle-right-val {
          font-size: 20px;
          line-height: 26px;
        }
      }
    }

    .v-chip-head-bottom {
      padding: 0px 16px 5px 16px;
      margin: 15px 0;
      position: relative;

      &::after {
        bottom: 0;
        border-bottom: 1px solid #c7c7c7;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        color: var(--g-white);
      }

      .v-chip-head-bottom-content {
        .v-chip-head-bottom-left {
          padding-right: 15px;
          color: var(--g-white);
          font-size: 12px;

          span {
            padding: 0 5px;
          }
        }

        .v-chip-head-bottom-right {
          color: var(--g-white);
          font-size: 12px;

          .v-chip-head-bottom-right-item {
            margin: 3px;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 0.8px solid var(--g-white);
            color: var(--g-white);
            font-size: 12px;

            &.v-chip-head-bottom-right-item-total {
              background-color: rgb(42, 167, 246);
              border-color: rgb(42, 167, 246);
            }
          }

          .v-chip-head-bottom-right-item-text {
            padding-left: 5px;
            font-size: 14px;
          }
        }
      }

      .v-chip-head-bottom-pop {
        border-radius: 15px;
        left: 50%;
        transform: translateX(-50%) translateY(100%);
        bottom: -10px;
        z-index: 1;
        position: absolute;
        width: 93%;
        background: var(--g-white);

        .v-chip-head-bottom-pop-title-list {
          gap: 4px;
          padding: 5px 0;
          border-bottom: 1px solid #E5E5E5;

          .v-chip-head-bottom-pop-title-item {
            padding: 0 4px;
            flex: 1;
            font-size: 15px;
            height: 30px;
          }
        }

        .v-chip-head-bottom-pop-list {
          height: 360px;
          overflow: auto;

          .v-chip-head-bottom-pop-item {
            height: 36px;
            border-bottom: 1px solid #c7c7c7;
            gap: 4px;

            .v-chip-head-bottom-pop-item-one {
              flex: 1;
              padding: 0 4px;
              font-size: 15px;

              span {
                font-size: 12px;
                color: #2aa7f6;
                padding: 0 5px;
              }
            }

            .v-chip-head-bottom-pop-item-two {
              flex: 1;
              padding: 0 4px;
              font-size: 14px;

              .v-two-item {
                margin: 0 1px;
                width: 22px;
                height: 22px;
                border: 1px solid #2aa7f6;
                border-radius: 50%;
                color: #2aa7f6;
                font-size: 14px;
                background-color: var(--g-white);

                &.v-two-item-result {
                  background: #2aa7f6;
                  color: var(--g-white);
                }
              }
            }

            .v-chip-head-bottom-pop-item-three {
              padding: 0 4px;
              flex: 1;
              font-size: 15px;
              color: #2aa7f6;
            }
          }
        }
      }
    }
  }

  .v-chip-container {
    flex: 1;
    overflow: auto;
    padding-top: 175px;
    padding-bottom: 15px;

    .v-chip-order-list {
      flex: 1;
      overflow: auto;

      .v-chip-order-list-tobottom {
        position: fixed;
        z-index: 2;
        left: 10px;
        bottom: calc(82px + constant(safe-area-inset-bottom));
        bottom: calc(82px + env(safe-area-inset-bottom));

        img {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }
      }

      .v-chip-order-item-box {
        .v-chip-order-item-card {
          padding: 12px;

          .v-order-item-card-top {
            padding: 5px 16px;
            border-radius: 7px;
            font-size: 14px;
            color: rgb(192, 192, 192);
          }

          .v-order-item-card-bottom {
            .v-order-item-card-bottom-img {
              width: 46px;
              height: 46px;
              border-radius: 50%;
              margin: 0px 11px;

              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
              }
            }

            .v-order-item-card-bottom-right {
              flex: 1;
              padding-right: 36px;
              &.v-order-item-card-bottom-right-self {
                padding-right: 0px;
                padding-left: 30px;
              }
              .v-card-bottom-right-username {
                font-size: 17px;
                color: #333333;
                line-height: 32px;
              }

              .v-card-bottom-right-info {
                background-color: var(--g-white);
                color: #676767;
                font-size: 15px;
                box-shadow: 0 1px 3px rgba(35, 24, 21, 0.27);
                padding: 5px;
                border-radius: 3px;

                .v-card-bottom-right-info-qi {
                  color: #676767;
                  font-size: 15px;
                  line-height: 30px;
                }

                .v-card-bottom-right-info-leixing {
                  color: #8f8f94;
                  border-bottom: 1px solid #dadada;
                  font-size: 15px;
                  line-height: 26px;
                }

                .v-card-bottom-right-info-leixing-val {
                  color: #8f8f94;
                  font-size: 15px;
                  line-height: 26px;
                }

                .v-card-bottom-right-info-total {
                  color: #8f8f94;
                  font-size: 14px;
                  line-height: 1.8;
                }
              }
            }
          }
        }

        .v-chip-order-item-msg-box {
          padding: 12px;

          .v-chip-order-item-msg {
            background: #c9c8cd;
            max-width: 80%;
            padding: 5px 11px;
            font-size: 13px;
            border-radius: 8px;

            .v-chip-order-item-msg-title {
              font-size: 13px;
              color: #FF2742;
              line-height: 1.8;
            }

            .v-chip-order-item-msg-content {
              color: rgb(68, 121, 199);
              font-size: 13px;
              line-height: 1.8;
            }
          }
        }
      }
    }
  }

  .v-chip-btn-list-box {
    padding: 12px 15px;

    .v-chip-btn-list {
      gap: 10px;

      .v-chip-btn-item {
        flex: 1;
        height: 44px;
        border-radius: 20px;
        color: #fff;
        font-size: 17px;

        &.v-chip-btn-item-yellow {
          background: linear-gradient(90deg, #D4B38F 0%, #B88964 100%);
        }

        &.v-chip-btn-item-black {
          background: linear-gradient(90deg, #1E1C38, #1E1C38);
        }

        &.v-chip-btn-item-grey {
          background: linear-gradient(90deg, rgb(53, 53, 53), rgb(200, 199, 204));
        }
      }
    }
  }
}</style>