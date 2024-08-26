<template>
  <div class="v_cash_out_coin g-flex-column n-bg">
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
    <div class="v-cashout-coin-container">
      <div class="v-cashout-coin-content">
        <div class="v-cashout-coin-top">
          <div class="v-cashout-sel">
            <p class="v-cashout-coin-title">{{ i18n.selectText }}</p>
            <div class="v-cashout-coin-two-select-box">
              <div class="v-cashout-coin-two-select g-flex-align-center" @click="selectCoinClick">
                <div class="v-cashout-coin-two-select-left g-flex-align-center">
                  <span>{{ seletCoinItem.obj.currency }}</span>
                </div>
                <i class="iconfont icon-xiala" :style="styObjOne"></i>
              </div>
              <!-- 选择币 -->
              <select-coin-pop :coinList="cashoutInfo.info.list" @emitCoinItemClick="emitCoinItemClick"
                ref="refSelectCoinPop" />
            </div>
          </div>
          

          <div class="v-cashout-sel">
            <p class="v-cashout-coin-title">{{ i18n.chianText }}</p>
            <ul class="v-cashout-coin-link-list g-flex-align-center">
              <li @click="linkItemClick(item, index)" :class="linkIndex == index ? 'active' : ''"
                class="v-cashout-coin-two-select-left g-flex-align-center" v-for="(item, index) in seletCoinItem.obj.chainList" :key="index">
                <span style="color:#fff">{{ item }}</span>
              </li>
            </ul>
          </div>

        </div>
        <div class="v-cashout-coin-bottom">
          
          <div class="v-cashout-sel">
            <!-- is-link  value="钱包地址" -->
            <van-cell class="v-cashout-coin-bottom-address-title" :title="i18n.addressText" value="" />
            <div class="v-cashout-coin-bottom-address">
              <van-field :readonly="(cashoutInfo.info.isSelect == 1) ? true: false" v-model="form.info.address" label="" label-width="0" :placeholder="i18n.addressPlaceholderText" />
              <div v-show="cashoutInfo.info.isSelect == 1" @click="selectAddressClick"  class="v-cashout-coin-bottom-address-select">
                <i class="iconfont icon-zu15"></i>
              </div>
            </div>
          </div>
          <div class="v-cashout-sel">
            <div class="v-cashout-coin-bottom-input-num">
              <van-field @input="amountChange" v-model="form.amount" label="" label-width="0"
                :placeholder="i18n.numTextPlaceholderText + '(' + seletCoinItem.obj.currency + ')'" />
              <span @click="allClick">{{ i18n.allText }}</span>
            </div>
          </div>
          <!-- <van-cell :title="i18n.numText" :value="`${i18n.minText}:${cashoutInfo.min}USDT，${i18n.maxText}:${cashoutInfo.max == -1 ? `${ i18n.nolimitText }`: (cashoutInfo.max + 'USDT')}`"/> -->
          <!-- 约等于 -->
          <div v-show="seletCoinItem.obj.currency != 'USDT' && form.amount" class="v-recharge-bi-yuedengyu g-flex-align-center">
             <span>≈</span>
             <p>{{ form.money }} </p>
             <span>{{seletCoinItem.obj.currency}}</span>
           </div>
           <p v-if="store.system.WithdrawModel == 2" class="v-cashout-coin-bottom-canuse g-flex-align-center">{{ i18n.shijidaozhangText
          }}({{ seletCoinItem.obj.currency }}): <span> {{ shijiDaoZhang }}</span></p>

          <p class="v-cashout-coin-bottom-canuse g-flex-align-center">{{ i18n.canUseText }}({{ canUserWallet.currency }}):
            <span> {{ canUserWallet.balance }}</span></p>
          <p class="v-cashout-coin-bottom-canuse g-flex-align-center">{{ i18n.shouxuFeiText
          }}({{ canUserWallet.currency }}): <span> {{ shouxuFei }}</span></p>
          <div v-if="cashoutInfo.remark" class="v-cashout-coin-bottom-tips">
            {{ cashoutInfo.remark }}
          </div>

          <div @click="$router.push({ name: 'rule', query: { id: 11 } })" class="v-cashout-coin-bottom-guize">
            <span>《{{ i18n.chukuanguizeText }}》</span>
          </div>
        </div>
        <div @click="cashOutClick" class="v-cashout-coin-btn g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.cashText }}</span>
        </div>
      </div>

    </div>


    <!-- 密码 -->
    <BussinessPwdPop ref="refBussinessPwdPop" @emitPwd="emitPwd" />

    <SelectWalletAddressPop :addressList="porpAddressList" @emitDelAddress="emitDelAddress"
      @emitSelectAddress="emitSelectAddress" ref="refSelectWalletAddressPop" />
  </div>
</template>
 
<script setup>
import SelectCoinPop from '@/components/SelectCoinPop.vue'
import { apiCashout, apiGetCashoutInfo, apiGetUserInfo, apiGetWalletAddressList, apiGetDuoWalletList } from '@/utils/api.js'
import BussinessPwdPop from '@/components/BussinessPwdPop.vue'
import { cashoutMoney, formatDownFloat } from '@/utils/index.js'
import SelectWalletAddressPop from '@/components/SelectWalletAddressPop.vue'
import { reactive, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { Toast } from 'vant';
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('cashoutBi')
})
const router = useRouter()
const route = useRoute()

let form = reactive({
  id: route.params.id,
  info: {
    address: '',
    chain: '',
    currency: ''
  },
  amount: '', //数量
  fundPassword: '',
  money: ''
})

let addressList = reactive({
  list: []
})

let porpAddressList = computed(() => {
  if (!addressList.list.length) return []
  let reusltArr = addressList.list.filter(item => {
    return (item.currency == form.info.currency) && (item.chain == form.info.chain)
  })
  return reusltArr
})

const refSelectWalletAddressPop = ref(null)

function selectAddressClick() {
  refSelectWalletAddressPop.value.onShow(seletCoinItem.obj.currency)
}

// 获取钱包地址列表
async function apiGetWalletAddressListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetWalletAddressList()
  if (!success) return
  addressList.list = data.list
  console.log(data)
}

apiGetWalletAddressListHandel()

function emitDelAddress(item) {
  if (item.address == form.info.address) {
    form.info.address = ''
  }
  apiGetWalletAddressListHandel()
}

function emitSelectAddress(item) {
  console.log('item', item)
  form.info.address = item.address
}

let userInfo = computed(() => {
  return store.userInfo
})

async function apiGetUserInfoHandel() {
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  // data.info.balance = '10000'
  store.setUserInfo(data.info)
  // if ((!userInfo.value.userReal.id) || userInfo.value.userReal.status != 1) {
  //   Toast(i18n.value.realNameText)
  //   setTimeout(() => {
  //     router.replace({ name: 'userreal' })
  //   }, 500);
  //   return
  // }
  if (!userInfo.value.fundPasswordStatus) {
    Toast(i18n.value.setBusPwdText)
    setTimeout(() => {
      router.replace({ name: 'changebuspwd' })
    }, 500);
    return
  }
}

apiGetUserInfoHandel()


let cashoutInfo = reactive({
  info: {
    list: [],
    isSelect: ''
  }
})

// 获取提现信息
async function apiGetCashoutInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetCashoutInfo({ id: form.id })
  if (!success) return
  console.log(data)
  Object.assign(cashoutInfo, data.info)
  seletCoinItem.obj = data.info.info.list[0]
  form.info.chain = seletCoinItem.obj.chainList[0]
  form.info.currency = seletCoinItem.obj.currency
}

apiGetCashoutInfoHandel()

function allClick() {
  if(store.system.WithdrawModel == 1) {
    if (seletCoinItem.obj.fee == 0) {
      form.amount = canUserWallet.value.balance
    } else {
      form.amount = cashoutMoney(canUserWallet.value.balance, seletCoinItem.obj.fee, 2)
    }
  }else {
    form.amount = canUserWallet.value.balance
  }
  amountChange()
}

// 输入密码触发
function emitPwd(val) {
  form.fundPassword = val
  apiCashoutHandel()
}

const refBussinessPwdPop = ref(null)

// 提币点击
function cashOutClick() {
  if (!userInfo.value.fundPasswordStatus) {
    Toast(i18n.value.setBusPwdText)
    setTimeout(() => {
      router.push({ name: 'changebuspwd' })
    }, 500);
    return
  }
  refBussinessPwdPop.value.onShow()
}

// 提现提交
async function apiCashoutHandel() {
  store.loadingShow = true
  const { success, data } = await apiCashout(form)
  if (!success) return
  Toast(data.msg)
  router.go(-1)
}

let styObjOne = reactive({ transform: '' })

let selectCoinShow = ref(false)

let seletCoinItem = reactive({ obj: {} })

const refSelectCoinPop = ref(null)

// 点击币
function selectCoinClick() {
  selectCoinShow.value = !selectCoinShow.value
  if (selectCoinShow.value) {
    refSelectCoinPop.value.onShow()
    styObjOne.transform = 'rotate(180deg)'
  } else {
    styObjOne.transform = 'rotate(0deg)'
    refSelectCoinPop.value.onClose()
  }
}

// 选择币触发
function emitCoinItemClick(item) {
  refSelectCoinPop.value.onClose()
  selectCoinShow.value = false
  styObjOne.transform = 'rotate(0deg)'
  seletCoinItem.obj = item
  linkIndex.value = 0
  form.info.currency = seletCoinItem.obj.currency
  form.info.chain = seletCoinItem.obj.chainList[0]
  amountChange()
}

let linkIndex = ref(0) //链 index

// 链点击
function linkItemClick(item, index) {
  linkIndex.value = index
  form.info.chain = item
}

let balanceList = reactive({
  list: []
})

// 获取钱包余额列表
async function apiGetDuoWalletListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetDuoWalletList({ type: 1 })
  if (!success) return
  balanceList.list = data.list
  console.log(data)
}

apiGetDuoWalletListHandel()

function amountChange() {
  if(!form.amount) return form.money = ''
  // WithdrawModel 1 金额外收取手续费  2 金额内收取手续费
  form.money = (formatDownFloat(Number(form.amount) * Number(seletCoinItem.obj.rate), seletCoinItem.obj.fixed)).toFixed(seletCoinItem.obj.fixed)
}

// 实际到账
const shijiDaoZhang = computed(() => {
  if(!form.amount) return '0.00'
  return ((Number(form.amount) - Number(shouxuFei.value)) * Number(seletCoinItem.obj.rate)).toFixed(seletCoinItem.obj.fixed) 
})

// 可用余额
const canUserWallet = computed(() => {
  console.log(balanceList.list)
  console.log(seletCoinItem.obj)
  if ((!balanceList.list.length) || (!seletCoinItem.obj.currency)) return { balance: '', currency: '' }
  let target = balanceList.list.find((item, index) => {
    return item.currency == seletCoinItem.obj.currency
  })
  console.log(target)
  console.log('====================================')
  if (target) {
    return { balance: target.balance, currency: target.currency }
  }
  return { balance: '', currency: '' }
})


// 手续费
const shouxuFei = computed(() => {
  if (!seletCoinItem.obj.fee) return '0.00'
  else {
    if (Number(seletCoinItem.obj.fee) == 0) {
      return '0.00'
    } else if (Number(seletCoinItem.obj.fee) < 1) {
      return (form.amount * seletCoinItem.obj.fee).toFixed(2)
    } else {
      return Number(seletCoinItem.obj.fee).toFixed(2)
    }
  }
})
</script>
 
<style lang='scss'>
.v_cash_out_coin {
  height: 100%;
  overflow: auto;
  // background: var(--g-white);
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    background: var(--g-white);
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
      font-weight: 700;
      font-size: 16px;
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


  .v-cashout-coin-container {
    flex: 1;
    overflow: auto;
    padding-top: 10px;

    .v-cashout-coin-content {
      padding: 0px 15px 15px 15px;


      .v-cashout-sel {
        border: 1px solid #ccc;
        border-radius: 10px;
        margin-bottom: 15px;
        padding: 15px;
      }
      .v-cashout-coin-top {
        border-radius: 5px;

        .v-cashout-coin-title {
          padding: 15px 0px 10px 0;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
        }

        .v-cashout-coin-two-select-box {
          position: relative;
          flex: 1;

          .v-cashout-coin-two-select {
            user-select: none;
            cursor: pointer;
            position: relative;
            // border: 1px solid #c5cfd5;
            height: 40px;
            border-radius: 4px;
            color: #fff;

            .v-cashout-coin-two-select-left {
              img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                object-fit: contain;
              }

              span {
                font-size: 14px;
                line-height: 20px;
                margin-left: 8px;
                margin-right: 8px;
              }
            }

            .icon-xiala {
              right: 10px;
              position: absolute;
              margin-left: 10px;
              color: #fff;
              font-size: 20px;
              transition: transform .2s linear, -webkit-transform .2s linear;
            }
          }
        }

        .v-cashout-coin-link-list {
          .v-cashout-coin-link-item {
            padding: 6px;
            font-size: 14px;
            color: #fff;
            // background: #a09e9e;
            // margin-right: 30px;

            &.active {
              color: #fff;
              background: var(--g-main_color);
            }
          }
        }
      }

      .v-cashout-coin-bottom {
        margin-top: 20px;
        border-radius: 5px;
        overflow: hidden;

        .van-cell {
          padding-left: 0;
          padding-right: 0;
          &::after {
            left: 0;
          }
          &.v-cashout-coin-bottom-address-title {
            padding-top: 0;
            padding-bottom: 0;
            &::after {
              display: none;
            }
          }
          .van-cell__title {
            font-weight: 700;
            color: #fff;
            font-size: 14px;
          }

          .van-cell__value {
            font-size: 12px;
          }
        }

        .v-cashout-coin-bottom-address {
          position: relative;

          .v-cashout-coin-bottom-address-select {
            position: absolute;
            width: 36px;
            padding: 5px;
            right: 15px;
            z-index: 99;
            top: 50%;
            transform: translateY(-50%);
            .iconfont {
              color: #c7c7c7;
              font-size: 22px;
            }
          }

          .van-cell {
            padding-left: 0;
            padding-right: 0;
            background:none;
            .van-cell__value {
              .van-field__body {
                input {
                  color: #fff;
                  font-size: 16px;
                  &::placeholder {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }

        .v-cashout-coin-bottom-input-num {
          position: relative;

          span {
            position: absolute;
            font-size: 14px;
            color: var(--g-main_color);
            top: 50%;
            transform: translateY(-50%);
            right: 15px;
            z-index: 99;
          }

          .van-cell {
            background: transparent;
            .van-cell__value {
              .van-field__body {
                input {
                  padding-right: 40px;
                  font-size: 16px;
                  color: #fff;
                  &::placeholder {
                    font-size: 20px;
                  }
                }
              }
            }
          }
        }

        .v-recharge-bi-yuedengyu {
          padding: 10px 15px;
          font-size: 14px;

          p {
            color: red;
            padding-left: 10px;
            padding-right: 10px;
          }
        }

        .v-cashout-coin-bottom-canuse {
          color: #fff;
          font-size: 14px;
          margin-top: 15px;
          padding-bottom: 10px;

          span {
            padding-left: 5px;
          }
        }

        .v-cashout-coin-bottom-tips {
          font-size: 12px;
          padding-right: 15px;
          padding-bottom: 10px;
          line-height: 18px;
          color: var(--g-white);
        }

        .v-cashout-coin-bottom-guize {
          font-size: 14px;
          color: var(--g-main_color);
          line-height: 22px;
          margin-top: 10px;
        }
      }

      .v-cashout-coin-btn {
        margin: 15px 0;
        margin-top: 20px;
        height: 44px;
        line-height: 44px;
        color: var(--g-white);
        font-size: 14px;
        background: var(--g-main_color);
        border-radius: 30px;
      }
    }

    .van-cell {
      background: none!important;
    }

  }
}</style>