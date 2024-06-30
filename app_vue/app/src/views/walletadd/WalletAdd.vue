<template>
 <div class="v_wallet_add g-flex-column">
  <div class="v-head g-flex-justify-center g-flex-align-center">
    <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
      <i class="iconfont icon-zuojiantou"></i>
    </div>
    <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

    <!-- <div @click="$router.push({ name: 'walletadd' })" class="v-head-right g-flex-align-center">
      <img src="/img/icon/public_increase_black.png" alt="" />
    </div> -->
  </div>
  <div class="v-user-real-list-container">
    <div class="v-title">
      {{i18n.titleText}}
    </div>
    <div class="v-wallet-add-content">
      <div class="v-cashout-coin-top">
        <p class="v-cashout-coin-title">{{ i18n.selectText }}</p>
        <div class="v-cashout-coin-two-select-box">
          <div class="v-cashout-coin-two-select g-flex-align-center" @click="selectCoinClick">
            <div class="v-cashout-coin-two-select-left g-flex-align-center">
              <img :src="seletCoinItem.obj.icon" alt="">
              <span>{{ seletCoinItem.obj.currency }}</span>
            </div>
            <i class="iconfont icon-xiala" :style="styObjOne"></i>
          </div>
          <!-- 选择币 -->
          <select-coin-pop :coinList="coinList.list" @emitCoinItemClick="emitCoinItemClick" ref="refSelectCoinPop"/>
        </div>

        <p class="v-cashout-coin-title">{{ i18n.linkNameText }}</p>
        <ul class="v-cashout-coin-link-list g-flex-align-center">
          <li @click="linkItemClick(item, index)" :class="linkIndex == index ? 'active': ''" class="v-cashout-coin-link-item" v-for="(item, index) in seletCoinItem.obj.chainList" :key="index">
            <span>{{ item }}</span>
          </li>
        </ul>

        <p class="v-cashout-coin-title">{{ i18n.addressText }}</p>
        <div class="v-cashout-coin-address-input">
          <van-field v-model="form.address" label="" label-width="0" :placeholder="i18n.addressPlaceholderText" />
        </div>
     </div>

     <div class="v-wallet-add-btn-list g-flex-align-center g-flex-justify-center">
      <!-- <div v-show="form.id" class="v-wallet-add-btn-item v-wallet-add-btn-item-unbind g-flex-align-center g-flex-justify-center">
        <span>解绑</span>
      </div>
      <div v-show="false" class="v-wallet-add-btn-item v-wallet-add-btn-item-change g-flex-align-center g-flex-justify-center">
        <span>修改</span>
      </div> -->
      <div @click="apiAddWalletAddressHandel" v-show="!form.id" class="v-wallet-add-btn-item v-wallet-add-btn-item-submit g-flex-align-center g-flex-justify-center">
        <span>{{i18n.submitText }}</span>
      </div>
     </div>
    </div>
  </div>
 </div>
</template>

<script setup>
import { apiGetWalletConfig, apiAddWalletAddress } from '@/utils/api.js'
import SelectCoinPop from '@/components/SelectCoinPop.vue'
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
let router = useRouter()
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('walletadd')
})

let styObjOne = reactive({ transform: '' })

let selectCoinShow = ref(false)

let seletCoinItem = reactive({ obj: {}})

// 币列表
let coinList = reactive({ list: []})

let form = reactive({
  id: '',
  chain: '',
  currency: '',
  address: '',
  icon: ''
})

let linkIndex = ref(0) //链Index

// 点击链
function linkItemClick(item, index) {
  linkIndex.value = index
}

// 获取钱包配置
async function apiGetWalletConfigHandel() {
  const { success, data } = await apiGetWalletConfig()
  if(!success) return
  coinList.list = data.list
  seletCoinItem.obj = data.list[0]
  console.log(data)
}

apiGetWalletConfigHandel()

const refSelectCoinPop = ref(null)

// 选择币触发
function emitCoinItemClick(item) {
  refSelectCoinPop.value.onClose()
  selectCoinShow.value = false
  styObjOne.transform = 'rotate(0deg)'
  seletCoinItem.obj = item
  linkIndex.value = 0
  console.log(item)
}

// 点击币
function selectCoinClick() {
  selectCoinShow.value = !selectCoinShow.value
  if(selectCoinShow.value) {
    refSelectCoinPop.value.onShow()
    styObjOne.transform = 'rotate(180deg)'
  } else {
    styObjOne.transform = 'rotate(0deg)'
    refSelectCoinPop.value.onClose()
  }
}

// 添加钱包
async function apiAddWalletAddressHandel() {
  if(seletCoinItem.obj.currency) {
    form.currency = seletCoinItem.obj.currency
    form.icon = seletCoinItem.obj.icon
    if(seletCoinItem.obj.chainList.length) {
      form.chain = seletCoinItem.obj.chainList[linkIndex.value]
    }
  }
  store.loadingShow = true
  const { success, data } = await apiAddWalletAddress(form)
  if(!success) return
  Toast.success(data.msg)
  setTimeout(() => {
    router.go(-1)
  }, 500);
}

</script>

<style lang='scss'>
.v_wallet_add {
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

      img {
        padding: 5px 5px;
        height: 28px;
      }

      .iconfont {
        font-size: 22px;
      }
    }
  }
  .v-user-real-list-container {
    flex: 1;
    .v-title {
      padding: 20px 15px 15px 15px;
      font-size: 22px;
      line-height: 26px;
      color: #333;
      font-weight: 600;
    }
    .v-wallet-add-content {
      padding: 15px;
      padding-bottom: 80px;
      .v-cashout-coin-top {
        border-radius: 5px;
        .v-cashout-coin-title {
          padding: 15px 0px 10px 0;
          font-weight: 700;
          font-size: 14px;
          &:nth-of-type(1) {
            padding-top: 0;
          }
        }
        .v-cashout-coin-two-select-box {
          background: var(--g-white);
          position: relative;
          flex: 1;
          border-radius: 4px;
          .v-cashout-coin-two-select {
              user-select: none;
              cursor: pointer;
              position: relative;
              border: 1px solid #fff;
              height: 40px;
              padding: 0 10px;
              border-radius: 4px;
              .v-cashout-coin-two-select-left {
                color: rgba(0,0,0,.85);
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
                color: #7b8293;
                font-size: 20px;
                transition: transform .2s linear,-webkit-transform .2s linear;
              }
            }
        }
        .v-cashout-coin-link-list {
          background: var(--g-white);
          padding: 10px;
          border-radius: 4px;
          .v-cashout-coin-link-item {
            padding: 6px;
            font-size: 14px;
            color: #a09e9e;
            background: #f8f8f8;
            margin-right: 30px;
            &.active {
              color: #0685e6;
              // background: #f3f3f3;
            }
          }
        }
        .v-cashout-coin-address-input {
          background: var(--g-white);
          padding: 10px 15px;
          border-radius: 4px;
          .van-cell {
            padding: 0;
            .van-cell__value {
              .van-field__body {
                input {
                  color: #111;
                }
              }
            }
          }
        }
      }
      .v-wallet-add-btn-list {
        position: absolute;
        width: 100%;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        .v-wallet-add-btn-item {
          margin-top: 20px;
          background: var(--g-main_color);
          color: var(--g-white);
          border-radius: 6px;
          height: 40px;
          width: 55%;
          font-size: 14px;
          &.v-wallet-add-btn-item-unbind {
            width: 40%;
            background: #E1E1E1;
            color: #32313D;
          }
          &.v-wallet-add-btn-item-submit {
            width: 90%;
          }
        }
      }
    }
  }
}
</style>