<template>
  <div class="v_exchange g-flex-column">
    <div class="v-head g-flex-justify-center g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

      <div @click="$router.push({ name: 'exchangehistory' })" class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div>
    </div>
    <div class="v-exchange-container">
      <div class="v-exchange-title">
        <span>{{ i18n.titleText }}</span>
      </div>
      <div class="v-exchage-card g-flex-align-center">
        <div @click="exchangeImgClick" class="v-card-left g-flex-align-center">
          <img src="/img/icon/exchange.png" alt="" />
        </div>
        <div class="v-card-right">
          <div class="v-card-right-item g-flex-align-center">
            <div class="v-card-right-item-input">
              <van-field @input="amountChange" v-model="form.fromAmount" :placeholder="i18n.formAmountPlaceHolderText" />
            </div>
            <div @click="selectCoinClick(1)" class="v-car-right-item-coin g-flex-align-center">
              <img :src="selectFromItem.obj.icon" alt="" />
              <div class="v-car-right-item-title">
                <span>{{ selectFromItem.obj.currency }}</span>
              </div>
              <div class="v-car-right-item-down-icon">
                <i class="iconfont icon-xiangxia"></i>
              </div>
            </div>
          </div>
          <div class="v-card-right-item g-flex-align-center">
            <div class="v-card-right-item-input">
              <van-field readonly v-model="form.toAmount" :placeholder="i18n.toAmountPlaceHolderText" />
            </div>
            <div @click="selectCoinClick(2)" class="v-car-right-item-coin g-flex-align-center">
              <img :src="selectToItem.obj.icon" alt="" />
              <div class="v-car-right-item-title">
                <span>{{ selectToItem.obj.currency }}</span>
              </div>
              <div class="v-car-right-item-down-icon">
                <i class="iconfont icon-xiangxia"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="v-exchange-balance g-flex-align-center g-flex-justify-between">
        <div class="v-exchange-balance-left g-flex-align-center">
          <div class="v-exchange-balance-left-title">
            <span>{{ i18n.moreMoseAmountText }}:</span>
          </div>
          <div class="v-exchange-balance-left-val">
            <span>{{ canUseBalance.balance }} {{ canUseBalance.currency }}</span>
          </div>
        </div>
        <div @click="allClick" class="v-exchange-balance-right">
          <span>{{ i18n.allExchangeText }}</span>
        </div>
      </div>

      <div class="v-exchange-feilv g-flex-align-center g-flex-justify-between">
        <div class="v-exchange-feilv-left">
          <span>{{ i18n.exchangeHuiLvText }}:</span>
        </div>
        <div class="v-exchange-feilv-right">
          <span>{{ exchageRate }}</span>
        </div>
      </div>

      <div class="v-exchange-feilv g-flex-align-center g-flex-justify-between">
        <div class="v-exchange-feilv-left">
          <span>{{ i18n.getText }} {{ selectToItem.obj.currency }}:</span>
        </div>
        <div class="v-exchange-feilv-right">
          <span>{{ form.toAmountDefault }}</span>
        </div>
      </div>

      <div class="v-exchange-btn-box g-flex-align-center">
        <div @click="apiExchangeHandel" class="v-exchange-btn g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.sureText }}</span>
        </div>
      </div>
    </div>

    <ExchangePop :hideId="formPopHidId" :list="balanceList.list" ref="refFromExchangePop"
      @emitSelctCoinSuccess="emitFromSelctCoinSuccess" />

    <ExchangePop :hideId="toPopHidId" :list="balanceList.list" ref="refToExchangePop"
      @emitSelctCoinSuccess="emitToSelctCoinSuccess" />

  </div>
</template>
  
<script setup>
import { apiGetDuoWalletList, apiExchange } from '@/utils/api.js'
import { reactive, ref, computed, onUnmounted } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRoute, useRouter } from 'vue-router';
import { Toast } from 'vant';
import ExchangePop from './ExchangePop.vue'
import ws from "@/utils/ws.js";
let router = useRouter()
let route = useRoute()
const i18nObj = useI18n()

const i18n = computed(() => {
  return i18nObj.tm('exchange')
})
// pinia状态管理仓库
const store = useStore()

let form = reactive({
  fromAmount: '',
  toAmount: '',
  toAmountDefault: '0.00',
  fromId: '',
  toId: ''
})

let selectFromItem = reactive({
  obj: {}
})

let selectToItem = reactive({
  obj: {}
})


let balanceList = reactive({
  list: []
})

// 获取列表
async function apiGetDuoWalletListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetDuoWalletList({ type: 1 })
  if (!success) return
  balanceList.list = data.list
  selectFromItem.obj = data.list[0]
  selectToItem.obj = data.list[1]
  form.fromId = selectFromItem.obj.id
  form.toId = selectToItem.obj.id
  balanceList.list.forEach((item) => {
    ws.joinGroup('market_' + item.product_id, (data) => {
      item.usdtRate = data.close
    })
  })
}

apiGetDuoWalletListHandel()


let refToExchangePop = ref(null)
function emitFromSelctCoinSuccess(obj) {
  selectFromItem.obj = obj
  amountChange()
}

let refFromExchangePop = ref(null)
function emitToSelctCoinSuccess(obj) {
  selectToItem.obj = obj
  amountChange()
}

function selectCoinClick(val) {
  if (val == 1) {
    refFromExchangePop.value.onShow()
  } else {
    refToExchangePop.value.onShow()
  }
}

function amountChange() {
  if(!form.fromAmount) {
    form.toAmount = ''
    form.toAmountDefault = '0.00'
    return
  } 
  form.toAmount = (form.fromAmount * exchageRate.value).toFixed(8)
  form.toAmountDefault = form.toAmount
}

function exchangeImgClick() {
  let copyToObj = selectToItem.obj
  selectToItem.obj = selectFromItem.obj
  selectFromItem.obj = copyToObj
  amountChange()
}

// 弹窗需要隐藏的id
const formPopHidId = computed(() => {
  return selectToItem.obj.id
})

// 弹窗需要隐藏的id
const toPopHidId = computed(() => {
  return selectFromItem.obj.id
})


// 弹窗需要隐藏的id
const exchageRate = computed(() => {
  if ((!selectFromItem.obj.usdtRate) || (!selectToItem.obj.usdtRate)) return '0.000000'
  // let targetFrom = balanceList.list.find(item => {
  //   return item.product_id == selectFromItem.obj.product_id
  // })
  // let targetTo = balanceList.list.find(item => {
  //   return item.product_id == selectToItem.obj.product_id
  // })
  // selectFromItem.obj.usdtRate = targetFrom.usdtRate
  // selectToItem.obj.usdtRate = targetTo.usdtRate
  console.log(selectFromItem.obj.usdtRate / selectToItem.obj.usdtRate)
  return (selectFromItem.obj.usdtRate / selectToItem.obj.usdtRate).toFixed(8)
})


onUnmounted(() => {
  leaveGroupHandle()
})

// 离开订阅当前k线数据
function leaveGroupHandle() {
  balanceList.list.forEach((item) => {
    ws.leaveGroup('market_' + item.product_id, () => { })
  })
}

// 点击全部
function allClick() {
  form.fromAmount = canUseBalance.value.balance
  amountChange()
}

// 余额
const canUseBalance = computed(() => {
  if((!balanceList.list.length) || (!selectFromItem.obj.currency)) return { balance: '', currency: '' }
  let target = balanceList.list.find((item, index) => {
    return item.currency == selectFromItem.obj.currency
  })
  if(target) return { balance: target.balance, currency: target.currency }
  return { balance: '', currency: '' }
})

// 兑换接口
async function apiExchangeHandel() {
  form.fromId = selectFromItem.obj.id
  form.toId = selectToItem.obj.id
  store.loadingShow = true
  const { success, data } = await apiExchange(form)
  if(!success) return
  Toast.success(data.msg)
  setTimeout(() => {
    router.go(-1)
  }, 300);
  console.log(data)
}
</script>
  
<style lang='scss'>
.v_exchange {
  height: 100%;
  overflow: auto;
  background-color: var(--g-white);

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

  .v-exchange-container {
    flex: 1;
    overflow: auto;
    padding-top: 65px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;

    .v-exchange-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--g-less-black);
      padding-bottom: 15px;
    }

    .v-exchage-card {
      background: #f2f4f7;
      border-radius: 4px;

      .v-card-left {
        padding: 0 18px;

        img {
          width: 30px;
          height: 30px;
          object-fit: contain;
        }
      }

      .v-card-right {
        flex: 1;

        .v-card-right-item {
          border-bottom: 1px solid #e4e4e4;

          &:nth-last-of-type(1) {
            border-bottom: none;
          }

          .v-card-right-item-input {
            .van-cell {
              width: 100%;
              padding: 10px 16px;
              overflow: hidden;
              color: #323233;
              font-size: 14px;
              line-height: 24px;
              background: #f2f4f7;

              .van-cell__value {
                .van-field__body {
                  input {
                    color: var(--g-less-black);

                    &::placeholder {
                      color: #858585;
                    }
                  }
                }
              }
            }
          }

          .v-car-right-item-coin {
            padding-right: 13px;

            img {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              object-fit: contain;
            }

            .v-car-right-item-title {
              font-size: 14px;
              line-height: 20px;
              padding-left: 10px;
              width: 50px;
            }

            .v-car-right-item-down-icon {
              padding-left: 10px;

              .iconfont {
                font-size: 12px;
                font-weight: 700;
              }
            }
          }

        }
      }
    }

    .v-exchange-balance {
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 13px;
      padding: 10px;
      border-radius: 4px;
      background-color: #f2f4f7;

      .v-exchange-balance-left {
        .v-exchange-balance-left-val {
          padding-left: 4px;
        }
      }

      .v-exchange-balance-right {
        padding: 0 10px;
        color: var(--g-main_color);
      }
    }

    .v-exchange-feilv {
      padding: 10px 0;
      font-size: 14px;
      font-weight: 700;

    }

    .v-exchange-btn-box {
      padding: 15px 2px;

      .v-exchange-btn {
        width: 100%;
        background-color: var(--g-main_color);
        color: var(--g-white);
        font-size: 16px;
        height: 38px;
        border-radius: 4px;
      }
    }
  }
}</style>