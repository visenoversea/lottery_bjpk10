<template>
  <div class="v_transfer g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <!-- <i class="iconfont icon-zuo"></i> -->
        <img src="/images/back-icon.png" alt="" />
      </div>
      <!-- <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18nXX.titletext }}</span>
      </div> -->
      <div @click="$router.push({ name: 'transferrecord' })" class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div>
    </div>
    <div class="new-head_title_text">{{ i18nXX.titletext }}</div>
    <div class="v-transfer-title g-flex">
      <span class="name">Swap {{ consume.text }}</span>
      <span class=balance>{{ i18nXX.consumebalance }}: {{ type === 1 ? DCPTGBalance : USDTBalance }}</span>
    </div>
    <div class="v-transfer-content">
      <div class="v-transfer-content-item">
        <div class="item-left">
          <p>{{ i18n.consumeText }}  ({{ consume.text }})</p>
          <div class="consume-value"> 
            <van-field
              v-model="consume.amount"
              label=""
              placeholder="0.00"
            />
            <!-- <span>{{ consume.text }}</span> -->
          </div>
        </div>
        <div class="item-select">
          <div class="select-wrap">
            <img :src="consume.img" alt="">
            <div class="coins">
              {{ consume.text }}<span></span>
            </div>
            <div class="max" @click="allHandle">{{ i18nXX.consumeamountmax }}</div>
          </div>
        </div>
      </div>
      <div class="v-line">
        <div class="line"></div>
        <!-- <img src="/img/transfer/switch.png" @click="switchType" alt=""> -->
      </div>
      <div class="v-transfer-content-item v-transfer-content-item-bot">
        <div class="item-left">
          <p>{{ i18n.receiveText }} ({{ receive.text }})</p>
          <div class="consume-value"> 
            <van-field
              v-model="receive.amount"
              label=""
              readonly 
              placeholder="0.00"
            />
            <!-- <span>{{ receive.text }}</span> -->
          </div>
        </div>
        <div class="item-select">
          <div class="select-wrap">
            <img :src="receive.img" alt="">
            <div class="coins">
              {{ receive.text }}<span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="exchange-value">{{ i18n.EsimatedText }}:1 DCPTG≈{{ currentRate }} USDT</div>

    <div class="introduce-value">{{ i18n.introduceText }}</div>
    <div class="introduce-value">{{ i18n.introduce1Text }}</div>
    <div class="introduce-value">{{ i18n.introduce2Text }}</div>


    <div class="exchange-btn g-flex-align-center g-flex-justify-center" @click="exchangeHandle">{{ i18n.exchangeText }}</div>
  </div>
</template>
<script setup>
import { apiGetDCPTGRate, apiExchangeDCPTG, apiGetUserInfo } from '@/utils/api.js'
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
import { Toast } from 'vant';
// import DCPIMG from "@/assets/img/dc.png"
// import USDTIMG from "@/assets/img/USDT.svg"


// pinia状态管理仓库
const store = useStore();
const type = ref(1)
const DCPTGBalance = ref()
const USDTBalance = ref()
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('myTransfer')
})
const i18nXX = computed(() => {
  return i18nObj.tm('mytransfer')
})
let consume = ref({
  text: type.value === 2 ? 'USDT' : 'DCPTG',
  img: type.value === 2 ? USDTIMG : DCPIMG,
  amount: ''
})
let receive = ref({
  text: type.value === 1 ? 'USDT' : 'DCPTG',
  img: type.value === 1 ? USDTIMG : DCPIMG,
  amount: ''
})
const currentRate = ref(0.00)
let Timer = null
const consumeWrap = ref()
const getRate = async() => {
  const { data } = await apiGetDCPTGRate()
  currentRate.value = data.data.USDT
  Timer = setTimeout(getRate, 5000)
}
const exchangeHandle = async() => {
  if(!consume.value.amount) {
    return
  }
  store.loadingShow = true
  const { success, data } = await apiExchangeDCPTG({amount: consume.value.amount, type: type.value})
  if (!success) return
  Toast(data.msg)
  consume.value.amount = ''
  DCPTGBalance.value = data.balance_dcptg
  USDTBalance.value = data.balance
}

const switchType = () => {
  type.value = type.value === 1 ? 2 : 1
  consume.value = {
    text: type.value === 2 ? 'USDT' : 'DCPTG',
    img: type.value === 2 ? USDTIMG : DCPIMG,
    amount: receive.value.amount || ''
  }
  receive.value = {
    text: type.value === 1 ? 'USDT' : 'DCPTG',
    img: type.value === 1 ? USDTIMG : DCPIMG,
    amount: consume.value.amount || ''
  }
}
const allHandle = () => {
  consume.value.amount = type.value === 1 ?  DCPTGBalance.value : USDTBalance.value
}
const getInfo = async() => {
  const { success, data } = await apiGetUserInfo()
  DCPTGBalance.value = data.info?.balance_dcptg
  USDTBalance.value = data.info.balance
}
watch(
  consume,
  (newValue) => {
    if(type.value === 1) {
      receive.value.amount = (newValue.amount * currentRate.value).toFixed(2) + ''
    } else {
      receive.value.amount = (newValue.amount / currentRate.value).toFixed(2) + ''
    }
  },
  { deep: true }
)
// watch(
//   receive,
//   (newValue) => {
//     if(type.value === 2) {
//       consume.value.amount = newValue.amount * currentRate.value + ''
//     } else {
//       consume.value.amount = newValue.amount / currentRate.value + ''
//     }
//   },
//   { deep: true }
// )
onMounted(() => {
  getRate()
  getInfo()
})
onUnmounted(() => {
  Timer && clearTimeout(Timer)
})
</script>
<style lang='scss'>
.v_transfer {
  height: 100%;
  overflow: auto;
  background-color: #f6f4f5;
  padding: 46px 20px 0;
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background: #fff;
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
        font-weight: 700;
        color: var(--g-black);
      }
    }
  }
  .new-head {
    .iconfont {
      font-size: 26px;
      font-weight: 700;
      color: var(--g-black);
    }
  }
  .v-transfer-title {
    padding: 23px 12px 10px;
    .name {
      font-family: Poppins, Poppins;
      font-weight: 600;
      font-size: 16px;
      color: #000000;
      font-style: normal;
      text-transform: none;
    }
    .balance {
      flex: 1;
      font-family: Poppins, Poppins;
      font-weight: 500;
      font-size: 14px;
      color: #5475F7;
      text-align: right;
      font-style: normal;
      text-transform: none;
    }
  }
  .v-transfer-content {
    width: 335px;
    height: 202px;
    padding-top: 8px;
    border-radius: 8px;
    background: var(--g-white);
    .v-transfer-content-item {
      height: 83px;
      padding: 17px 20px 0;
      display: flex;
      .item-left {
        width: 155px;
        position: relative;
        p {
          font-family: Poppins, Poppins;
          font-weight: 500;
          font-size: 14px;
          line-height: 14px;
          color: #000000;
          font-style: normal;
          text-transform: none;
        }
        .consume-value {
          height: 36px;
          display: flex;
          .van-field {
            height: 100%;
            padding: 6px 0;
            background: transparent;
            &::after {
              border-bottom: none;
            }
            .van-cell__value  {
              height: 100%;
              
            .van-field__body {
                .van-field__control {
                    font-family: Poppins, Poppins;
                    font-weight: 600;
                    font-size: 24px;
                    line-height: 24px;
                    color: #A6A0BC;
                    font-style: normal;
                    text-transform: none;
                }
              }
            }
          }
          span {
            font-family: Poppins, Poppins;
            font-weight: 400;
            font-size: 12px;
            color: #010101;
            font-style: normal;
            padding-bottom: 6px;
            text-transform: none;
            display: flex;
            align-items: end;
          }
        }
      }
      .item-select {
        flex: 1;
        display: flex;
        justify-content: end;
        .select-wrap {
          padding-right: 8px;
          width: 50px;
          position: relative;
          img {
            width: 26px;
            height: 26px;
            margin-left: 14px;
          }
          .coins {
            font-family: Poppins, Poppins;
            font-weight: 500;
            font-size: 12px;
            color: #000000;
            text-align: left;
            font-style: normal;
            text-transform: none;
            position: relative;
            text-align: right;
            span {
              position: absolute;
              right: -8px;
              top: 5px;
              width: 0;
              height: 0;
              border-width: 3px;
              border-style: solid;
              border-color: #000 transparent transparent transparent;
            }
          }
          .max {
            font-family: Inter, Inter;
            font-weight: bold;
            font-size: 14px;
            color: #5475F7;
            line-height: 14px;
            font-style: normal;
            text-transform: none;
            position: absolute;
            top: 30px;
            right: 75px;
          }
        }
      }
      &.v-transfer-content-item-bot {
        padding: 10px 20px 0;
      }
    }
    .v-line {
      position: relative;
      width: 295px;
      height: 1px;
      margin: 18px auto;
      .line {
        width: 100%;
        height: 1px;
        opacity: 0.1;
        background: #000;
      }
      img {
        width: 36px;
        height: 36px;
        display: block;
        border-radius: 18px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    
  }
  .introduce-value {
    font-family: Inter, Inter;
    font-weight:bold;
    font-size: 12px;
    color: rgba(19, 18, 18, 0.6);
    font-style: normal;
    padding: 12px 20px 0;
  }
  .exchange-value {
    font-family: Inter, Inter;
    font-weight: 400;
    font-size: 12px;
    color: rgba(0,0,0,0.6);
    font-style: normal;
    padding: 12px 20px 0;
  }
  .exchange-btn {
    width: 335px;
    height: 52px;
    background: #5475F7;
    border-radius: 50px;
    font-family: Poppins, Poppins;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
    font-style: normal;
    text-transform: none;
    position: fixed;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
  }
}
</style>