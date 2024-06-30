<template>
  <div class="v_cashout_bank_select g-flex-column">
    <div class="v-head g-flex-justify-center g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

      <!-- <div @click="$router.push({ name: 'rechargehistory'})" class="v-head-right g-flex-align-center">
      <i class="iconfont icon-datijilu"></i>
    </div> -->
    </div>
    <div class="v-cashout-bank-select-container">
      <div class="v-cashout-bank-select-content">
        <div class="v-cashout-bank-select-from">
          <!-- 提现银行卡 -->
          <div v-show="cashoutInfo.info.isSelect == 1"
            class="v-cashout-bank-select-form-item v-cashout-bank-select-form-item-select">
            <van-cell @click="selectBankClick" class="v-cashout-bank-select-form-item-right-input"
              :title="i18n.cardText" is-link
              :value="form.info.bank_name ? form.info.bank_name + ' ' + filterBankCardNumber(form.info.card_number) + ' ' + form.info.name : i18n.selectText" />
          </div>

          <div v-show="cashoutInfo.info.isSelect == 0">
            <!-- 银行名称 -->
            <div class="v-cashout-bank-select-form-item v-cashout-bank-select-form-item-second">
              <p class="v-cashout-bank-select-form-item-title">{{ i18n.bankNameText }}</p>
              <div class="v-cashout-bank-select-form-item-right">
                <van-field class="v-cashout-bank-select-form-item-right-input" v-model="form.info.bank_name" label=""
                  :label-width="0" :placeholder="i18n.bankNamePlaceholderText" />
              </div>
            </div>

            <!-- 银行卡号 -->
            <div class="v-cashout-bank-select-form-item v-cashout-bank-select-form-item-second">
              <p class="v-cashout-bank-select-form-item-title">{{ i18n.cardNumText }}</p>
              <div class="v-cashout-bank-select-form-item-right">
                <van-field class="v-cashout-bank-select-form-item-right-input" v-model="form.info.card_number" label=""
                  :label-width="0" :placeholder="i18n.cardNumberPlaceholderText" />
              </div>
            </div>

            <!-- 银行姓名 -->
            <div class="v-cashout-bank-select-form-item v-cashout-bank-select-form-item-second">
              <p class="v-cashout-bank-select-form-item-title">{{ i18n.nameText }}</p>
              <div class="v-cashout-bank-select-form-item-right">
                <van-field class="v-cashout-bank-select-form-item-right-input" v-model="form.info.name" label=""
                  :label-width="0" :placeholder="i18n.namePlaceholderText" />
              </div>
            </div>

            <!-- 支行名称 -->
            <div class="v-cashout-bank-select-form-item v-cashout-bank-select-form-item-second">
              <p class="v-cashout-bank-select-form-item-title">{{ i18n.zhihangText }}</p>
              <div class="v-cashout-bank-select-form-item-right">
                <van-field class="v-cashout-bank-select-form-item-right-input" v-model="form.info.branch" label=""
                  :label-width="0" :placeholder="i18n.zhihangPlaceholderText" />
              </div>
            </div>

            <!-- 银行编号或支行编号 -->
            <div class="v-cashout-bank-select-form-item v-cashout-bank-select-form-item-second">
              <p class="v-cashout-bank-select-form-item-title">{{ i18n.zhihangCodeText }}</p>
              <div class="v-cashout-bank-select-form-item-right">
                <van-field class="v-cashout-bank-select-form-item-right-input" v-model="form.info.bank_code" label=""
                  :label-width="0" :placeholder="i18n.zhihangCodePlaceholderText" />
              </div>
            </div>
          </div>

          <!-- 提现金额 -->
          <div class="v-cashout-bank-select-form-item v-cashout-bank-select-form-item-second">
            <p class="v-cashout-bank-select-form-item-title">{{ i18n.tixianMoneyText }}:</p>
            <div class="v-cashout-bank-select-form-item-right">
              <van-field @input="amountChange" class="v-cashout-bank-select-form-item-right-input"
                v-model="form.amount" label="" :label-width="0" :placeholder="i18n.tixianMoneyPlaceholderText" />
              <span @click="allClick">{{ i18n.allText }}</span>
            </div>
          </div>

          <!-- <div v-show="form.amount" class="v-hou-bi-recharge-yuedengyu g-flex-align-center">
            <span>≈</span>
            <span>{{ cashoutInfo.info.symbol }}</span>
            <p>{{ form.money }} </p>
          </div> -->
          
          <!-- ({{ cashoutInfo.info.symbol }}) -->
<!--          <p v-if="store.system.WithdrawModel == 2" class="v-cashout-coin-bottom-canuse g-flex-align-center">{{ i18n.shijidaozhangText }}:-->
<!--            <span> {{ shijiDaoZhang }}</span></p>-->
          
          <!-- ({{ canUserWallet.currency }}) -->
          <p class="v-cashout-coin-bottom-canuse g-flex-align-center">{{ i18n.canUseText }}:
            <span> {{ canUserWallet.balance }}</span></p>
<!--          <p class="v-cashout-coin-bottom-canuse g-flex-align-center">{{-->
<!--            i18n.shouxuFeiText-->
<!--          }}: <span> {{ shouxuFei }}</span></p>-->
        </div>

        <div @click="sbumitClick" class="v-cashout-bank-select-submit-btn g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.submitText }}</span>
        </div>
      </div>
    </div>

    <BussinessPwdPop ref="refBussinessPwdPop" @emitPwd="emitPwd" />

    <SelectCashoutBackCardPop ref="refSelectCashoutBackCardPop" @emitSelectBank="emitSelectBank" />

  </div>
</template>

<script setup>
import { apiGetCashoutInfo, apiCashout, apiGetUserInfo } from '@/utils/api'
import { filterBankCardNumber } from '@/utils/index.js'
import BussinessPwdPop from '@/components/BussinessPwdPop.vue'
import SelectCashoutBackCardPop from '@/components/SelectCashoutBackCardPop.vue'
import { cashoutMoney, formatDownFloat } from '@/utils/index.js'
import { reactive, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { Toast } from 'vant';
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('cashoutBank')
})


const router = useRouter()
const route = useRoute()
let form = reactive({
  id: route.params.id, //id获取充值信息
  amount: '', //充值金额
  money: '',
  fundPassword: '',
  info: {
    bank_name: '',
    bank_code: '',
    card_number: '',
    name: '',
    branch: ''
  }
})

let seletCoinItem = reactive({
  chain: []
})


let cashoutInfo = reactive({
  info: {} // //收款银行信息
})

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

// 获取提现信息
async function apiGetCashoutInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetCashoutInfo({ id: form.id })
  if (!success) return
  console.log(data)
  Object.assign(cashoutInfo, data.info)
  if (cashoutInfo.info.isSelect == 0) {
    let obj = JSON.parse(localStorage.getItem('cashoutBankInfo'))
    if (obj == null) return
    Object.assign(form.info, obj)
  }
}

apiGetCashoutInfoHandel()

// 取出全部
function allClick() {
  if(store.system.WithdrawModel == 1) {
    if (cashoutInfo.info.fee == 0) {
      form.amount = canUserWallet.value.balance
    } else {
      form.amount = cashoutMoney(canUserWallet.value.balance, cashoutInfo.info.fee, cashoutInfo.info.fixed)
    }
  }else {
    form.amount = canUserWallet.value.balance
  }
  amountChange()
}


// 银行卡触发
function emitSelectBank(item) {
  console.log('emitSelectBank', item)
  form.info = item
}

const refSelectCashoutBackCardPop = ref(null)

// 选择银行卡
function selectBankClick() {
  refSelectCashoutBackCardPop.value.onShow()
}


const refBussinessPwdPop = ref(null)

function sbumitClick() {
  refBussinessPwdPop.value.onShow()
}

// 输入密码触发
function emitPwd(val) {
  form.fundPassword = val
  apiCashoutHandel()
}

// 提现提交
async function apiCashoutHandel() {
  store.loadingShow = true
  const { success, data } = await apiCashout(form)
  if (!success) return
  if (cashoutInfo.info.isSelect == 0) {
    localStorage.setItem('cashoutBankInfo', JSON.stringify(form.info))
  }
  Toast(data.msg)
  router.go(-1)
}

// 提现金额变化
function amountChange() {
  if (!form.amount) return form.money = ''
  form.money = (formatDownFloat(Number(form.amount) * Number(cashoutInfo.info.rate), cashoutInfo.info.fixed)).toFixed(cashoutInfo.info.fixed)
}

// 可用余额
const canUserWallet = computed(() => {
  if (!userInfo.value.id) return { balance: '', currency: '' }
  return { balance: userInfo.value.balance, currency: 'HK' }
})

// 实际到账
const shijiDaoZhang = computed(() => {
  if(!form.amount) return '0.00'
  return ((Number(form.amount) - Number(shouxuFei.value)) * Number(cashoutInfo.info.rate)).toFixed(cashoutInfo.info.fixed) 
})

// 手续费
const shouxuFei = computed(() => {
  console.log('cashoutInfo.info.fee', cashoutInfo.info.fee)
  if (!cashoutInfo.info.fee) return '0.00'
  else {
    if (Number(cashoutInfo.info.fee) == 0) {
      return '0.00'
    } else if (Number(cashoutInfo.info.fee) < 1) {
      return (form.amount * cashoutInfo.info.fee).toFixed(cashoutInfo.info.fixed)
    } else {
      return Number(cashoutInfo.info.fee).toFixed(cashoutInfo.info.fixed)
    }
  }
})

</script>

<style lang='scss'>
.v_cashout_bank_select {
  height: 100%;
  overflow: auto;
  background: #eff2f2;

  .v-head {
    height: 50px;
    width: 100%;
    line-height: 50px;
    position: fixed;
    top: 0;
    background-color: var(--g-white);
    font-size: 14px;
    color: var(--g-less-black);
    z-index: 999;

    .v-head-back-icon {
      position: absolute;
      height: 100%;
      left: 0;
      padding: 15px;

      .iconfont {
        position: absolute;
        font-size: 26px;
        left: 10px;
        font-weight: 700;
      }
    }

    .v-title {
      font-size: 18px;
      flex: 1;
      height: 100%;
      font-weight: 600;
    }

    .v-head-right {
      position: absolute;
      height: 100%;
      right: 15px;

      .iconfont {
        font-size: 22px;
      }
    }
  }

  .v-cashout-bank-select-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;

    .v-cashout-bank-select-content {
      margin: 8px 10px;
      background: #f8f8f8;
      border-radius: 10px;
      padding: 15px;

      .v-cashout-bank-select-content-title {
        color: #333;
        font-size: 16px;
        font-weight: bold;
      }

      .v-cashout-bank-select-from {
        .v-cashout-bank-select-form-item {
          padding-top: 25px;

          &.v-cashout-bank-select-form-item-select {
            padding-top: 0;

            .v-cashout-bank-select-form-item-right-input {
              background-color: var(--g-white);
              color: #333;

              .van-cell__value {
                color: #333;
              }

              .van-icon {
                color: #333;
              }
            }
          }

          &.v-cashout-bank-select-form-item-second {
            .v-cashout-bank-select-form-item-right {
              .v-cashout-bank-select-form-item-right-input {
                margin-top: 10px;
                background: var(--g-white);
              }

              .van-cell__value {
                color: #333;

                .van-field__control {
                  color: #333;
                }
              }
            }
          }

          .v-cashout-bank-select-form-item-title {
            color: #333;
            font-size: 14px;
          }

          .v-cashout-bank-select-form-item-right {
            position: relative;
            color: #333;

            span {
              position: absolute;
              font-size: 14px;
              color: #0685e6;
              top: 50%;
              transform: translateY(-50%);
              right: 15px;
            }
          }
        }

        .v-hou-bi-recharge-yuedengyu {
          padding: 10px 15px;
          background: var(--g-white);
          font-size: 16px;

          span {
            padding: 0 4px;
          }

          p {
            color: red;
            padding-right: 10px;
          }
        }



        .v-cashout-bank-select-form-tips {
          color: var(--g-green);
          font-size: 15px;
          padding: 10px 0;
          line-height: 20px;
        }
      }

      .v-cashout-bank-select-coin-upload-box {
        padding: 15px 15px 15px 0;
        margin-top: 10px;

        .v-cashout-bank-select-coin-upload-title {
          color: var(--g-white);
          font-size: 14px;
        }

        .v-cashout-bank-select-coin-upload {
          width: 100px;
          height: 100px;
          border: 1px solid #959595;
          margin-top: 10px;
          position: relative;
          border-radius: 4px;
          color: var(--g-white);

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .v-real-name-delete {
            position: absolute;
            width: 24px;
            height: 24px;
            background: rgba(0, 0, 0, .5);
            border-radius: 0 0 0 10px;
            right: 0;
            top: 0;
            z-index: 9;

            .iconfont {
              color: #333;
              font-size: 14px;
            }
          }

          .v-cashout-bank-select-coin-upload-tips {
            width: 100%;
            height: 100%;

            .iconfont {
              font-size: 30px;
              line-height: 30px;
            }

            p {
              font-size: 14px;
              padding-top: 5px;
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
        color: #0685e6;
        top: 50%;
        transform: translateY(-50%);
        right: 15px;
      }
    }

    .v-cashout-coin-bottom-canuse {
      color: #a09e9e;
      font-size: 14px;
      padding-left: 15px;
      margin-top: 10px;
      padding-bottom: 15px;

      span {
        padding-left: 5px;
      }
    }

    .v-cashout-bank-select-submit-btn {
      margin-top: 20px;
      background-color: var(--g-main_color);
      height: 40px;
      width: 100%;
      border-radius: 6px;
      margin: 20px auto;
      color: var(--g-white);
      font-size: 14px;
    }
  }

}
</style>