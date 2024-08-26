<template>
  <div class="v_liang_hua g-flex-column">
    <div class="v-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuo"></i>
      </div>
      <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div>
      <div @click="$router.push({ name: 'lianghuahistory' })" class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div>
    </div>
    <div class="v-liang-hua-container">
      <!-- {{ totalInfo.balance }} {{ totalInfo.todayProfit }} {{ totalInfo.totalProfit }}-->
      <div class="v-liang-hua-top">
        <div class="v-liang-hua-top-title-list g-flex-align-center">
          <div class="v-liang-hua-top-title-item">
            <div class="v-lianghua-top-title">
              <span>{{ i18n.kelianghuaMoneyText }}</span>
            </div>
            <div class="v-lianghua-top-balance">
              <span class="v-lianghua-top-balance-value">{{ totalInfo.balance }}</span>
              <span class="v-lianghua-top-balance-danwei">USDT</span>
            </div>
          </div>

         <div class="v-liang-hua-top-title-item">
           <div class="v-lianghua-top-title">
            <span>{{ i18n.tiyanYuErText }}</span>
          </div>
            <div class="v-lianghua-top-balance">
              <span class="v-lianghua-top-balance-value">{{ Number(userInfo.giftAmount).toFixed(2) }}</span>
              <span class="v-lianghua-top-balance-danwei">USDT</span>
            </div>
          </div>
        </div>

        <div class="v-lianghua-top-btn-list g-flex-align-center g-flex-justify-between">
          <div @click="router.push({ name: 'lianghuahistory' })"
            class="v-lianghua-top-btn-item v-lianghua-top-btn-item-recharge g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.linaghuaShouruMingXiText }}</span>
          </div>
          <div @click="router.push({ name: 'myteam' })"
            class="v-lianghua-top-btn-item v-lianghua-top-btn-item-cashout g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.tuanduiShouruMingXiText }}</span>
          </div>
        </div>
      </div>

      <div class="v-liang-hua-card-box">
        <div class="v-liang-hua-card g-flex-align-center">
          <div class="v-liang-hua-card-item g-flex-column g-flex-align-center">
            <div class="v-liang-hua-card-item-value">
              <span>{{ totalInfo.todayQuantifyProfit }}</span>
            </div>
            <div class="v-liang-hua-card-item-title">
              <span>{{ i18n.jinriShouYiText }}</span>
            </div>
          </div>

          <div class="v-liang-hua-card-item g-flex-column g-flex-align-center">
            <div class="v-liang-hua-card-item-value">
              <span>{{ Number(totalInfo.monthQuantifyProfit).toFixed(2) }}</span>
            </div>
            <div class="v-liang-hua-card-item-title">
              <span>{{ i18n.benyueShouYiText }}</span>
            </div>
          </div>

          <div class="v-liang-hua-card-item g-flex-column g-flex-align-center">
            <div class="v-liang-hua-card-item-value">
              <span>{{ Number(totalInfo.quantifyProfit).toFixed(2) }}</span>
            </div>
            <div class="v-liang-hua-card-item-title">
              <span>{{ i18n.lianghuaZongShouYiText }}</span>
            </div>
          </div>
        </div>
        <div class="v-liang-hua-card g-flex-align-center">
          <div class="v-liang-hua-card-item g-flex-column g-flex-align-center">
            <div class="v-liang-hua-card-item-value">
              <span>{{ Number(totalInfo.todayRebateAmount).toFixed(2) }}</span>
            </div>
            <div class="v-liang-hua-card-item-title">
              <span>{{ i18n.jinriTuanDuiText }}</span>
            </div>
          </div>
          <div class="v-liang-hua-card-item g-flex-column g-flex-align-center">
            <div class="v-liang-hua-card-item-value">
              <span>{{ Number(totalInfo.monthRebateAmount).toFixed(2) }}</span>
            </div>
            <div class="v-liang-hua-card-item-title">
              <span>{{ i18n.benyueTuanDuiText }}</span>
            </div>
          </div>

          <div class="v-liang-hua-card-item g-flex-column g-flex-align-center">
            <div class="v-liang-hua-card-item-value">
              <span>{{ Number(totalInfo.rebateAmount).toFixed(2) }}</span>
            </div>
            <div class="v-liang-hua-card-item-title">
              <span>{{ i18n.tuanduiZongShouYiText }}</span>
            </div>
          </div>
        </div>

        <div class="v-liang-hua-card-btn-box g-flex-align-center g-flex-justify-center">
          <div @click="apiStartLiangHuaHandel" v-show="userInfo.level.taskStatus == 0"
            class="v-liang-hua-card-btn g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.danciqidongText }}({{ userInfo.level.shengyuNums }}/{{ userInfo.level.nums }})</span>
          </div>
          <div v-show="userInfo.level.taskStatus == 1"
            class="v-liang-hua-card-btn-ing g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.lianghuaIngText }}</span>
          </div>
        </div>

        <div v-show="userInfo.level.taskStatus == 1" class="v-liang-hua-step-box">
          <van-steps class="v-liang-hua-step" direction="vertical" :active="activeVal" active-icon="success"
            active-color="#644FDC">
            <van-step v-show="activeVal >= item.status" v-for="(item, index) in stepList">
              <span v-show="activeVal <= item.status">{{ item.title }}</span>
              <span v-show="activeVal > item.status">{{ item.title2 }}</span>
              <i v-if="activeVal == item.status" class="iconfont icon-loading"></i>
            </van-step>
          </van-steps>
        </div>

      </div>

      <div class="v-liang-hua-nav-list g-flex-align-center">
        <div :class="navTypeVal == 1 ? 'active' : ''" @click="typeItemClick(1)" class="v-liang-hua-nav-item">
          <span>{{ i18n.yonghuLiangHuaText }}</span>
        </div>
        <div :class="navTypeVal == 2 ? 'active' : ''" @click="typeItemClick(2)" class="v-liang-hua-nav-item">
          <span>{{ i18n.tuanduiFanYongText }}</span>
        </div>
      </div>
      <!-- {{ item.spread_nums }} -->
      <div v-show="navTypeVal == 1" class="v-liang-hua-swiper-two">
        <div class="v-liang-hua-swiper-two-list-head g-flex-align-center">
          <div class="v-liang-hua-swiper-two-list-head-item v-liang-hua-swiper-two-list-head-item-name">
            <span>{{ i18n.huiyuanNameText }}</span>
          </div>
          <div class="v-liang-hua-swiper-two-list-head-item v-liang-hua-swiper-two-list-head-item-shouyi">
            <span>{{ i18n.shouyiText }}</span>
          </div>
          <div
            class="v-liang-hua-swiper-two-list-head-item v-liang-hua-swiper-two-list-head-item-status g-flex-justify-end">
            <span>{{ i18n.statusText }}</span>
          </div>
        </div>
        <MainBottomSwiper v-show="twoSwiperShow" :list="radomList.list" ref="refMainBottomSwiper" />
      </div>


      <div v-show="navTypeVal == 2" class="v-liang-hua-swiper-one">
        <div class="v-liang-hua-swiper-one-list-head g-flex-align-center">
          <div class="v-liang-hua-swiper-one-list-head-item v-liang-hua-swiper-one-list-head-item-name">
            <span>{{ i18n.tuiguangrenText }}</span>
          </div>
          <div class="v-liang-hua-swiper-one-list-head-item v-liang-hua-swiper-one-list-head-item-name">
            <span>{{ i18n.huilirenText }}</span>
          </div>
          <div class="v-liang-hua-swiper-one-list-head-item v-liang-hua-swiper-one-list-head-item-shouyi">
            <span>{{ i18n.fanyongJinErText }}</span>
          </div>
        </div>
        <TuanDuiBottomSwiper v-show="oneSwiperShow" :list="tuanduiList.list" ref="refTuanDuiBottomSwiper" />
      </div>
    </div>
    <NoticePop ref="refNoticePop"/>
  </div>
</template>

<script setup>
import { apiStartLiangHua, apiGetVip, apiGetLiangHuaRadomList, apiGetNoticeList,apiGetLiangHuaTotalInfo, apiGetLiangHuaPlatformList, apiGetLiangHuaLevelList, apiGetUserInfo } from '@/utils/api.js'
import MainBottomSwiper from '@/components/MainBottomSwiper.vue'
import NoticePop from '@/components/NoticePop.vue'
import TuanDuiBottomSwiper from '@/components/TuanDuiBottomSwiper.vue'
import Swiper, { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
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
import { ImagePreview, Toast } from 'vant';
import ws from "@/utils/ws.js";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("lianghua");
});

let activeVal = ref(0)
let buyPlatForm = ref('')
let sellPlatForm = ref('')
let stepList = computed(() => {
  return [
    {
      title: i18n.value.zhengzaiqidongText,
      title2: i18n.value.qidongSuccessText,
      status: 0
    },
    {
      title: i18n.value.zhengzaisaomiaoText,
      title2: i18n.value.saomiaoSuccessText,
      status: 1
    },
    {
      title: i18n.value.dingDanPipeiZhongText,
      title2: i18n.value.dingDanPiPeiSuccess,
      status: 2
    },
    {
      title: `${i18n.value.zhengzaiText}${buyPlatForm.value}${i18n.value.faqiBullDanText}`,
      title2: `${i18n.value.zaiText}${buyPlatForm.value}${i18n.value.buySuccessText}`,
      status: 3
    },
    {
      title: `${i18n.value.zhengzaiText}${sellPlatForm.value}${i18n.value.faqiSellDanText}`,
      title2: `${i18n.value.zaiText}${sellPlatForm.value}${i18n.value.sellSuccessText}`,
      status: 4
    },
    {
      title: i18n.value.xitongJieSuanZhongText,
      title2: i18n.value.xitongJieSuanSuccessText,
      status: 5
    },
    {
      title: i18n.value.shouyiFaFangZhongText,
      title2: i18n.value.lianghuaWanChengText,
      status: 6
    }
  ]
})


let levelList = reactive({
  list: []
})

function filtersSperadLevelTitle(obj) {
  let target = levelList.list.find(item => {
    return item.id == obj.spread_level
  })
  if (target) return target.title
  else return ''
}


apiGetLiangHuaLevelListHandel()

// 获取等级列表
async function apiGetLiangHuaLevelListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetLiangHuaLevelList()
  if (!success) return
  levelList.list = data.list
}


Swiper.use([Pagination, Navigation, Autoplay]);

let radomList = reactive({
  list: []
})
let twoSwiperShow = ref(false)
let refMainBottomSwiper = ref(null)

let tuanduiList = reactive({
  list: []
})
let oneSwiperShow = ref(false)
let refTuanDuiBottomSwiper = ref(null)

// 用户随机滚动列表
async function apiGetLiangHuaRadomListHandel() {
  const { success, data } = await apiGetLiangHuaRadomList()
  if (!success) return
  radomList.list = data.list
  tuanduiList.list = data.list2
  twoSwiperShow.value = true
  refMainBottomSwiper.value.onShow()
  console.log(data)
}

onMounted(() => {
  apiGetLiangHuaRadomListHandel()
})

let navTypeVal = ref(1)

function typeItemClick(val) {
  navTypeVal.value = val
  if (navTypeVal.value == 1) {
    twoSwiperShow.value = true
    refMainBottomSwiper.value.onShow()
  } else {
    oneSwiperShow.value = true
    refTuanDuiBottomSwiper.value.onShow()
  }
}

let totalInfo = reactive({
  "balance": "0",
  "totalProfit": "0",
  "todayQuantifyProfit": "0",
  "monthQuantifyProfit": "0",
  "yesterdayQuantifyProfit": "0",
  "todayRebateAmount": "0",
  "monthProfit": "0",
  "lastMonthProfit": "0",
  "agent1": 0,
  "agentValid1": 0,
  "agent2": 0,
  "agentValid2": 0,
  "agent3": 0,
  "agentValid3": 0,
  "quantifyProfit": '0',
  "monthRebateAmount": 0,
  "rebateAmount": 0
})

async function apiGetLiangHuaTotalInfoHandel() {
  const { success, data } = await apiGetLiangHuaTotalInfo()
  if (!success) return
  Object.assign(totalInfo, data.info)
  console.log(data)
}

apiGetLiangHuaTotalInfoHandel()


let userInfo = computed(() => {
  return store.userInfo
})

let timer = ref(0)

apiGetUserInfoHandel()

// 用户信息
async function apiGetUserInfoHandel(flag = true) {
  if (flag) store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  data.info.level.shengyuNums = (Number(data.info.level.nums) - Number(data.info.level.todayNums))
  data.info.level.shengyuNums = data.info.level.shengyuNums < 0 ? 0 : data.info.level.shengyuNums
  store.setUserInfo(data.info)
  if (data.info.userQuantify.id) {
    activeVal.value = data.info.userQuantify.step
    buyPlatForm.value = data.info.userQuantify.buy_platform
    sellPlatForm.value = data.info.userQuantify.sell_platform
    if (timer.value) clearInterval(timer.value)
    timer.value = setTimeout(() => {
      apiGetUserInfoHandel(false)
    }, 2000);
  } else {
    clearInterval(timer.value)
  }
  // console.log(data)
}


// 量化接口
async function apiStartLiangHuaHandel() {
  store.loadingShow = true
  const { success, data } = await apiStartLiangHua()
  if (!success) return
  Toast.success(data.msg)
  apiGetUserInfoHandel()
  apiGetLiangHuaTotalInfoHandel()
}

function addFnQuantify() {
  ws.addFn('quantify', data => {
    if(data.code==1){
      Toast.success(i18n.value.lianghuaSuccessText)
    }else{
      Toast.success(i18n.value.lianghuaFailText)
    }
    apiGetUserInfoHandel()
    apiGetLiangHuaTotalInfoHandel()
  })
}
addFnQuantify()
onUnmounted(() => {
  ws.removeFn('quantify')
  clearInterval(timer.value)
});

async function lingquItemClick(item) {
  store.loadingShow = true
  const { success, data } = await apiGetVip({ id: item.id })
  if (!success) return
  Toast.success(data.msg)
  apiGetUserInfoHandel()
  console.log(data)
}

let noticeList = reactive({ list: [] });
onMounted(() => {
  apiGetNoticeListHandel();
})

let refNoticePop = ref(null)
function noticeClick() {
  refNoticePop.value.onShow(noticeList.list)
}
//获取公告
async function apiGetNoticeListHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetNoticeList();
  if (!success) return;
  noticeList.list = data.list;
  if (noticeList.list.length > 0) {
    noticeClick()
  }
}

</script>

<style lang='scss'>
.v_liang_hua {
  height: 100%;
  overflow: auto;
  background-color: var(--g-main-bgColor);
  padding-bottom: 10px;

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
        color: var(--g-black);
      }
    }
  }

  .v-liang-hua-container {
    padding-top: 46px;
    flex: 1;
    overflow: auto;
    padding-left: 10px;
    padding-right: 11px;
    .v-liang-hua-top {
      padding: 20px 20px;
      background-image: url(/img/icon/quantify_top_inset.png);
      border-radius: 10px;
      background-position: center;
      background-size: cover;
      .v-liang-hua-top-title-list {
        gap: 15px;

        .v-liang-hua-top-title-item {
          overflow: hidden;
          flex: 1;

          .v-lianghua-top-title {
            font-size: 18px;
            @include textEllipsis();
            line-height: 150%;
            // font-weight: 600;
            color: var(--g-white);
          }

          .v-lianghua-top-balance {
            margin-top: 10px;
            font-size: 24px;
            line-height: 120%;
            // font-weight: 600;
            color: var(--g-white);

            .v-lianghua-top-balance-danwei {
              font-size: 14px;
              color: var(--g-white);
              padding-left: 5px;
            }
          }
        }
      }


      .v-lianghua-top-btn-list {
        padding-top: 15px;

        .v-lianghua-top-btn-item {
          width: 135px;
          background-color: transparent;
          color: #fff;
          font-size: 16px;
          height: 36px;
          border: 0;
          border-radius: 25px;
          border: 1px solid var(--g-white);
          // &.v-lianghua-top-btn-item-recharge {
          //   background: var(--g-main_color);
          // }

          // &.v-lianghua-top-btn-item-cashout {
          //   background-color: #ccc;
          // }
        }
      }
    }

    .v-liang-hua-card-box {
      background: var(--g-white);
      margin-top: 15px;
      border-radius: 10px;
      box-shadow: 0px 0px 5px #d3d3d3;
      .v-liang-hua-card {
        .v-liang-hua-card-item {
          padding: 20px 0;
          flex: 1;
          .v-liang-hua-card-item-value {
            color: var(--g-black);
            font-weight: 700;
            font-size: 18px;
          }
          .v-liang-hua-card-item-title {
            padding-top: 10px;
            color: #b0aebe;
            font-size: 12px;
          }
        }
      }

      .v-liang-hua-card-btn-box {
        padding: 0 0 15px 0;

        .v-liang-hua-card-btn {
          width: 180px;
          background-color: #EDEBFA;
          color: var(--g-main_color);
          font-size: 16px;
          // font-weight: 600;
          border: 0;
          height: 40px;
          line-height: 40px;
          border-radius: 25px;
        }

        .v-liang-hua-card-btn-ing {
          width: 180px;
          background-color: #644FDC;
          color: #fff;
          font-size: 16px;
          border: 0;
          height: 40px;
          line-height: 40px;
          border-radius: 25px;
        }
      }

      .v-liang-hua-step-box {
        padding-bottom: 15px;

        .v-liang-hua-step {
          .van-steps__items {
            text-align: center;
          }

          .iconfont {
            margin-left: 10px;
            display: inline-block;
            color: var(--g-grey);
            animation: step-spin 1s infinite linear;
          }
        }
      }


    }

    .v-liang-hua-nav-list {
      margin-top: 15px;
      padding: 10px 15px;
      height: 45px;
      background: var(--g-white);
      border-bottom: 1px solid #E9E8F0;
      border-radius: 10px 10px 0 0;
      .v-liang-hua-nav-item {
        line-height: 16px;
        font-size: 14px;
        margin: 0 10px;
        color: var(--g-black);
        position: relative;
        transform: all 0.5s;
        font-weight: 700;
        &:nth-of-type(1) {
          margin: 0;
        }

        &.active {
          font-size: 15px;
          color: var(--g-main_color);
          font-weight: 600;

          &::before {
            content: "";
            position: absolute;
            width: 40px;
            height: 3px;
            border-radius: 25px;
            background: #654EE3;
            left: 50%;
            transform: translateX(-50%);
            bottom: -15px;
          }
        }
      }
    }

    .v-liang-hua-swiper-two {

      .v-liang-hua-swiper-two-list-head {
        padding: 10px 15px;
        background: var(--g-white);

        .v-liang-hua-swiper-two-list-head-item {
          line-height: 18px;
          color: #b0aebe;
          font-size: 13px;

          &.v-liang-hua-swiper-two-list-head-item-name {
            width: 100px;
          }

          &.v-liang-hua-swiper-two-list-head-item-shouyi {
            flex: 2;
          }

          &.v-liang-hua-swiper-two-list-head-item-status {
            flex: 2;
            padding-left: 6px;
          }
        }
      }
    }

    .v-liang-hua-swiper-one {

      .v-liang-hua-swiper-one-list-head {
        padding: 10px 15px;
        background: var(--g-white);

        .v-liang-hua-swiper-one-list-head-item {
          line-height: 18px;
          color: #b0aebe;
          font-size: 13px;

          &.v-liang-hua-swiper-one-list-head-item-name {
            width: 120px;
          }

          &.v-liang-hua-swiper-one-list-head-item-shouyi {
            flex: 2;
            text-align: center;
          }

          &.v-liang-hua-swiper-one-list-head-item-status {
            flex: 1;
            padding-left: 6px;
          }
        }
      }
    }

    @keyframes step-spin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    .v-liang-hua-swiper-title {
      padding: 0 8px;

      .v-liang-hua-swiper-title-left {
        flex: 1;
        color: var(--g-white);
        font-size: 14px;

        img {
          width: 16px;
          margin-right: 4px;
        }
      }

      .v-liang-hua-swiper-title-right {
        img {
          height: 22px;
        }
      }
    }

    .v-liang-hua-level-list {
      padding: 10px;

      .v-liang-hua-level-item {
        box-shadow: 0 4px 3px 0 rgba(0, 0, 0, .3);
        background: var(--g-white);
        padding: 10px 0;
        margin-bottom: 10px;
        border-radius: 15px;

        .v-liang-hua-level-item-top {
          padding: 0 20px;

          .v-liang-hua-level-item-left {
            flex: 1;

            .v-liang-hua-level-item-left-img {
              img {
                width: 30px;
              }
            }

            .v-liang-hua-level-item-left-title {
              color: var(--g-main_color);
              line-height: 20px;
              margin-left: 5px;
              font-size: 14px;
              font-weight: 700;
            }
          }

          .v-liang-hua-level-item-middle {
            flex: 2;

            .v-liang-hua-level-item-middle-title {
              font-size: 12px;
              color: #9198a4;
            }

            .v-liang-hua-level-item-middle-value {
              color: #475060;
              font-weight: 700;
              padding-top: 5px;
              font-size: 14px;
            }
          }

          .v-liang-hua-level-item-right {
            flex: 1;

            .v-liang-hua-level-item-right-title {
              font-size: 12px;
              color: #9198a4;
            }

            .v-liang-hua-level-item-right-value {
              color: #475060;
              font-weight: 700;
              padding-top: 4px;
              font-size: 14px;
            }
          }
        }

        .v-liang-hua-level-item-bottom {
          padding: 0 20px;
          font-size: 12px;
          color: #9198a4;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 0.5px solid #ccc;
        }
      }
    }
  }
}</style>