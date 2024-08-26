<template>
  <div class="v_wa_kuang_list g-flex-column n-bg">
    <!-- <div class="v-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuo"></i>
      </div>
      <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div>
    </div> -->
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

    <div class="v-wakuang-list-container g-flex-column n-bg">
      <div class="v-wakuang-list-finance">
        <div class="v-wakuang-finance-top g-flex-align-center">
          <div class="v-wakuang-finance-top-left">
            <!-- <div @click="$router.go(-1)" class="v-wakuang-finance-top-left-title g-flex-align-center">
              <i class="iconfont icon-zuo"></i>
              {{ i18n.ingTuoguanText }}
              </div> -->
            <div class="v-wakuang-finance-top-left-val">
              {{ form.type === 1 ? totalInfo.obj.orderAmount : totalInfo.obj.orderAmount_dcptg }}
              <span>{{ form.type === 1 ? "USDT" : "DCPTG" }}</span>
            </div>
          </div>
          <div @click="shuoMingClick" class="v-wakuang-finance-top-right g-flex-align-center">
            <!-- <img src="/img/wakuang/mining_lock_order.png" alt=""/>
            <div class="v-wakuang-finance-top-right-title">{{ i18n.suocangOrderText }}</div> -->
            <div class="v-wakuang-finance-top-right-title">{{ i18n.shuimingText }}</div>
            <i class="iconfont icon-xiangyou1"></i>
          </div>
        </div>
        <div class="v-wakuang-finance-bottom g-flex-align-center">
          <div class="v-wakuang-finance-bottom-item g-flex-column g-flex-align-center">
            <div class="v-wakuang-finance-bottom-item-title">
              {{ i18n.yujiTodayShouyiText }}
            </div>
            <div class="v-wakuang-finance-bottom-item-val">
              {{ form.type === 1 ? totalInfo.obj.todayProfitAmount : totalInfo.obj.todayProfitAmount_dcptg }}
            </div>
          </div>
          <div class="v-wakuang-finance-bottom-item g-flex-column g-flex-align-center">
            <div class="v-wakuang-finance-bottom-item-title">
              {{ i18n.leijiShouyiText }}
            </div>
            <div class="v-wakuang-finance-bottom-item-val">
              {{ form.type === 1 ? totalInfo.obj.totalProfitAmount : totalInfo.obj.totalProfitAmount_dcptg }}
            </div>
          </div>
          <div class="v-wakuang-finance-bottom-item g-flex-column g-flex-align-center">
            <div class="v-wakuang-finance-bottom-item-title">
              {{ i18n.orderText }}
            </div>
            <div class="v-wakuang-finance-bottom-item-val">
              {{ form.type === 1 ? totalInfo.obj.orderNums : totalInfo.obj.orderNums_dcptg }}
            </div>
          </div>
        </div>
        <div class="v-wakuang-finance-order-detail">
          <div @click="$router.push({ name: 'wakuangorderlist', query: {type: form.type}})" class="v-wakuang-finance-order-detail-btn">
            <span>{{ i18n.orderDetailText }}</span>
          </div>
        </div>
      </div>
      <div class="v-my-team-nav-box g-flex-align-center">
        <van-tabs @change="headNavItemClick" color="#ffffff" title-inactive-color="#ffffff" title-active-color="#ffffff"
          background="#202021" class="v-msg-nav-list" v-model:active="tabtype.type">
          <van-tab class="v-my-team-nav-item" title="USDT" :name="1"></van-tab>
          <van-tab class="v-my-team-nav-item" title="DCPTG" :name="2"></van-tab>
        </van-tabs>
      </div>
      <div class="v-wakuang-list-box">
        <div class="v-list" v-if="list.list.length">
          <div class="v-item" v-for="(item, index) in list.list" :key="index">
            <!-- USDT -->
              <div class="v-item-top g-flex-align-center">
                <div class="v-item-top-left g-flex-align-center">
                  <img :src="form.type === 1 ? USDTIMG : DCPIMG" alt="" />
                  <span class="v-item-top-left-title">{{ item.title }}</span>
                </div>
                <div v-if="false" class="v-item-top-right g-flex-justify-center g-flex-align-center">
                  {{ i18n.canBuyNumsText }}: {{ item.limit == -1 ? 999999 : item.limit }}
                </div>

                <div @click="itemClick(item)" class="v-item-bottom-btn g-flex-align-center g-flex-justify-center">
                  <span>{{ i18n.buyText }}</span>
                </div>
              </div>
              <div class="v-item-bottom g-flex-align-center">
                <div class="v-item-bottom-item g-flex-column g-flex-align-center">
                  <p class="v-bottom-item-title">
                    {{ i18n.xianerText }}
                  </p>
                  <p class="v-bottom-item-val">
                    {{ item.min }}-{{ item.max == '-1' ? 999999 : item.max }}
                  </p>
                </div>

                <div class="v-item-bottom-item g-flex-column g-flex-align-center">
                  <p class="v-bottom-item-title">
                    {{ i18n.shouyiLvText }}
                  </p>
                  <!-- <p v-show="item.min_rate == item.max_rate" class="v-bottom-item-val">
                    {{ (Number(item.min_rate) * 100).toFixed(2) }} %
                  </p> -->
                  <!-- v-show="item.min_rate != item.max_rate"  -->
                  <p class="v-bottom-item-val" v-if="item.min_rate == item.max_rate">
                    {{ (item.min_rate * 100).toFixed(2) }}%
                  </p>
                  <p class="v-bottom-item-val" v-else>
                    {{ (item.min_rate * 100).toFixed(2) }}%-{{ (item.max_rate * 100).toFixed(2) }}%
                  </p>
                </div>
                <div class="v-item-bottom-item g-flex-column g-flex-align-end">
                  <p class="v-bottom-item-title">
                    {{ i18n.suocangZhouQiText }}
                  </p>
                  <p class="v-bottom-item-val">
                    {{ item.day }} ({{ i18n.dayText }})
                  </p>
                </div>
              </div>
              <!-- 待申请 -->
              <!-- <div @click="shengQingClick" v-show="userInfo.mining == 0 || userInfo.mining == 3" class="v-item-bottom-btn v-item-bottom-btn-wait g-flex-align-center g-flex-justify-center">
                <span>{{ i18n.shengqingRenGouText }}</span>
              </div> -->
              <!-- 审核通过 -->
              <!-- <div @click="itemClick(item)" class="v-item-bottom-btn g-flex-align-center g-flex-justify-center">
                <span>{{ i18n.buyText }}</span>
              </div> -->
              <!-- 审核中 -->
              <!-- <div @click="shenghezhongClick" v-show="userInfo.mining == 2"  class="v-item-bottom-btn v-item-bottom-btn-ing g-flex-align-center g-flex-justify-center">
                <span>{{ i18n.rengouShengHeZhongText }}</span>
              </div> -->
              <!-- 审核失败 -->
              <!-- <div @click="shengQingClick" v-show="userInfo.mining == 3"  class="v-item-bottom-btn v-item-bottom-btn-wait g-flex-align-center g-flex-justify-center">
                <span>审核失败，重新申请。</span>
              </div> -->
          </div>
        </div>
      </div>

      <div v-show="seeMoreFlag" @click="onLoad" class="v-wakuang-see-more">
        <span>{{ i18n.seemoreText }}</span>
      </div>

      <div class="v-wakuang-problem">
        <div class="v-wakuang-problem-title">
          <span>{{ i18n.changjianwentiText }}</span>
        </div>
        <div class="v-wakuang-problem-list">
          <div v-for="(item, index) in problemList.list" :key="index" class="v-wakuang-problem-item">
            <div @click="itemTitleClick(item, index)" class="v-wakuang-problem-item-title g-flex-align-center">
              <i class="v-square"></i>
              <div class="v-wakuang-problem-item-title-left">
                {{ item.title }}
              </div>
              <div class="v-wakuang-problem-item-title-right">
                <i v-show="!item.show" class="iconfont icon-you"></i>
                <i v-show="item.show" class="iconfont icon-xiangxia"></i>
              </div>
            </div>
            <div v-show="item.show" class="v-wakuang-problem-item-content">
              {{ item.des }}
            </div>
          </div>
        </div>
      </div>

    </div>

    <WaKuangPop ref="refWaKuangPop" />
  </div>
</template>

<script setup>
import WaKuangPop from './WaKuangPop.vue'
import { apiGetWaKuangProductList, apiGetWaKuangBalance, apiGetWakuangProblemList, apiGetUserInfo, apiShengQingRenGou } from '@/utils/api.js'
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { Dialog, Toast } from 'vant';
import DCPIMG from "@/assets/img/dc.png"
import USDTIMG from "@/assets/img/USDT.svg"

// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('wakuang')
})

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})

const router = useRouter()

function shenghezhongClick() {
  Toast(i18n.value.rengGouShengQingShengHeZhongTipsText)
}

function shengQingClick() {
  Dialog.confirm({
    title: '',
    message: i18n.value.shengqingTipsText,
    cancelButtonColor: '#fff',
    confirmButtonColor: '#12b888'
  }).then(() => { apiShengQingRenGouHandel() }).catch(() => { });
}

// 申请认购
async function apiShengQingRenGouHandel() {
  store.loadingShow = true
  const { success, data } = await apiShengQingRenGou()
  if (!success) return
  Toast.success(data.msg)
  apiGetUserInfoHandel()
  console.log(data)
}

function itemTitleClick(item, index) {
  problemList.list[index].show = !problemList.list[index].show
}

let form = reactive({
  page: 1,
  limit: 100,
  type: 1
})


let tabtype = reactive({
  type: 1,
})


let seeMoreFlag = ref(true)

let list = reactive({
  list: []
})

let userInfo = computed(() => {
  return store.userInfo
})

// mining 0 待申请 1申请通过 2审核中 3审核不通过 
async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
  // if(userInfo.value.mining == 3) {
  //   Dialog({ 
  //   title: '',
  //   message: i18n.value.shengqingFailText,
  //   cancelButtonColor: '#fff',
  //   confirmButtonColor: '#12b888'
  // }).then(() => { }).catch(() => { });
  // }
  console.log(data)
}

apiGetUserInfoHandel()


let totalInfo = reactive({
  obj: {
    "orderAmount": "0.00",
    "orderNums": 0,
    "todayProfitAmount": "0.00",
    "totalProfitAmount": "0.00"
  }
})

apiGetWaKuangBalanceHandel()

// 获取余额
async function apiGetWaKuangBalanceHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetWaKuangBalance()
  if (!success) return
  totalInfo.obj = data.info
  console.log(data)
}

function onLoad() {
  form.page++
  apiGetListHandel()
}

apiGetListHandel()

async function apiGetListHandel() {
  const { success, data } = await apiGetWaKuangProductList(form)
  if (!success) return
  list.list = list.list.concat(data.list)
  if (!data.list.length) {
    seeMoreFlag.value = false
  } else {
    seeMoreFlag.value = true
  }
}

function itemClick(item) {
  router.push({ name: 'wakuangdetail', query: { id: item.id } })
}

let refWaKuangPop = ref(null)
function shuoMingClick() {
  refWaKuangPop.value.onShow()
}

apiGetWakuangProblemListHandel()
let problemList = reactive({
  list: []
})

// 获取挖矿问题列表
async function apiGetWakuangProblemListHandel() {
  const { success, data } = await apiGetWakuangProblemList()
  if (!success) return
  problemList.list = data.list.map(item => {
    item.show = false
    return item
  })
  console.log(data)
}


function headNavItemClick(e) {
  console.log("e",e)
  form.type = e
  console.log(form)
  list.list = []
  apiGetListHandel()
  // form.page = 1
  // list.list = []
  // shouyiList.list = []
  // loading.value = true
  // finished.value = false
  // if(form.type == 1) {
  //   apiGetListHandel()
  // }else {
  //   apiGetTuiGuangDetailListHandel()
  // }
}
</script>

<style lang='scss'>
.v_wa_kuang_list {
  height: 100%;
  overflow: auto;
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

  .v-wakuang-list-container {
    flex: 1;
    overflow: auto;
    // padding-top: 46px;
    .v-wakuang-list-finance {
      // background-image: url(/img/icon/quantify_top_inset.png);
      background: linear-gradient( 90deg, #009AFE 0%, #8169FF 100%);
      background-position: center;
      background-size: cover;
      color: #86A4F2;
      margin: 15px;
      text-align: center;
      // padding: 10px;
      border-radius: 10px;
      .v-wakuang-finance-top {
        padding: 15px;
        position: relative;

        .v-wakuang-finance-top-left {
          color: var(--g-white);
          .v-wakuang-finance-top-left-title {
            font-size: 14px;
            .iconfont {
              font-size: 22px;
              color: var(--g-white);
              font-weight: 700;
            }
          }

          .v-wakuang-finance-top-left-val {
            padding-top: 10px;
            font-size: 24px;
            color: #fff;
            line-height: 30px;

            span {
              font-size: 16px;
              font-weight: 700;
            }
          }
        }

        .v-wakuang-finance-top-right {
          right: 0px;
          border-radius: 20px 0 0 20px;
          position: absolute;
          height: 30px;
          padding: 0 10px 0 10px;
          // background: var(--g-main_color);
          color: #fff;
          background: linear-gradient(to right, #FFDAAF, #FFB864);  

          border: 1px solid  #beb4fb;
          font-size: 14px;
          top: 50%;
          transform: translateY(-50%);

          img {
            width: 15px;
          }

          .v-wakuang-finance-top-right-title {
            padding-left: 10px;
          }
        }
      }

      .v-wakuang-finance-bottom {
        padding: 10px 0 20px 0;
        // background: #2d5dbf;

        .v-wakuang-finance-bottom-item {
          flex: 1;

          &:nth-of-type(1) {
            .v-wakuang-finance-bottom-item-val {
              color: #FFFFFF;
            }
          }

          .v-wakuang-finance-bottom-item-val {
            font-size: 18px;
            color: #fff;
            padding-top: 10px;
            line-height: 18px;
            font-weight: 700;
          }

          .v-wakuang-finance-bottom-item-title {
            font-weight: 400;
            font-size: 10px;
            color: #FFFFFF;
            line-height: 12px;
          }
        }
      }

      .v-wakuang-finance-order-detail {
        padding: 0 16px;
        padding-bottom: 15px;

        .v-wakuang-finance-order-detail-btn {
          width: 100%;
          height: 40px;
          line-height: 40px;
          border-radius: 6px;
          background: transparent;
          color: #fff;
          // border: 1px solid var(--g-white);
          text-align: center;
        }
      }
    }
    .v-my-team-nav-box {
            background: #202021;
        .v-msg-nav-list {
          padding: 8px 8px 0px 8px;

          .van-tabs__wrap {
            .van-tab {
              flex: none;
              padding: 0 8px;
              font-size: 14px;
            }
          }
        }
        .v-my-team-apply  {
          margin-left: 5px;
          background-color: var(--g-main_color);
          padding: 5px 10px;
          border-radius: 20px;
          color: var(--g-white);
          font-size: 13px;
        }
    }
    .v-wakuang-list-box {
      .v-list {
        min-height: 600px;

        .v-item {
          background: #2b2b2c;
          padding: 15px;
          margin-bottom: 10px;
          border: 1px solid  #ccc;
          margin: 10px;
          border-radius: 10px;

          &:nth-last-of-type(1) {
            border-bottom: none;
          }

          .v-item-top {
            .v-item-top-left {
              flex: 1;
              font-size: 16px;

              img {
                width: 32px;
                height: 32px;
                object-fit: cover;
              }

              .v-item-top-left-title {
                padding-left: 7px;
                font-weight: 600;
                line-height: 25px;
              }
            }

            .v-item-top-right {
              height: 30px;
              border-radius: 5px;
              min-width: 90px;
              font-size: 14px;
            }
          }

          .v-item-bottom {
            padding-top: 15px;

            .v-item-bottom-item {
              flex: 1;

              .v-bottom-item-title {
                color: #7d919d;
                font-size: 14px;
                text-align: center;
              }

              .v-bottom-item-val {
                padding-top: 6px;
                color: #fff;
                font-size: 16px;
                font-weight: 700;
              }

              &:nth-of-type(2) {
                .v-bottom-item-val {
                  color: #fff;
                }
              }
            }
          }

          .v-item-bottom-btn {
            height: 40px;
            background-color: var(--g-main_color);
            border-radius: 50px;
            width: 100px;
            color: var(--g-white);
            
          }
        }
      }
    }

    .v-wakuang-see-more {
      color: #8497a2;
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
      display: none;
    }

    .v-wakuang-problem {
      // background: var(--g-white);
      padding: 15px;

      .v-wakuang-problem-title {
        font-weight: 600;
        color: #333;
        line-height: 25px;
        font-size: 18px;
      }

      .v-wakuang-problem-list {
        padding: 10px 0;

        .v-wakuang-problem-item {
          .v-wakuang-problem-item-title {
            padding: 10px 0;

            .v-square {
              width: 6px;
              height: 6px;
              background: #333;
              margin-top: 2px;
            }

            .v-wakuang-problem-item-title-left {
              flex: 1;
              font-size: 14px;
              padding-left: 10px;
              @include textManyOverflow();
            }

            .v-wakuang-problem-item-title-right {
              .iconfont {
                font-weight: 700;
                font-size: 26px;
                color: #000;
              }
            }
          }

          .v-wakuang-problem-item-content {
            font-weight: 400;
            color: #7d919d;
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }
  }
}</style>