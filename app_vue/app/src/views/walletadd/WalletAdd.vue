<template>
<div class="v_wallet_add g-flex-column n-bg">
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
  <div class="v-wallet-add-container">
    <div class="v-form">
      <div class="v-form-item">
        <div class="v-form-item-title">
          {{ i18n.selectText }}
        </div>
        <div @click="selectCoinClick" class="v-form-item-input">
          <input type="text" readonly v-model="form.currency" :placeholder="i18n.selectPlaceholderText">
          <div class="v-form-item-input-icon">
            <i class="iconfont icon-you"></i>
          </div>
        </div>
      </div>
      <div class="v-form-item">
        <div class="v-form-item-title">
          {{ i18n.xieyiLeiXingText }}
        </div>
        <div @click="selectLinkClick" class="v-form-item-input">
          <input type="text" readonly v-model="form.chain" :placeholder="i18n.xieyiLeiXingPlaceholderText">
          <div class="v-form-item-input-icon">
            <i class="iconfont icon-you"></i>
          </div>
        </div>
      </div>
      <div class="v-form-item">
        <div class="v-form-item-title">
          {{ i18n.addressText }}
        </div>
        <div class="v-form-item-input">
          <input type="text" v-model="form.address" :placeholder="i18n.addressPlaceholderText">
        </div>
      </div>

      <!-- <div class="v-form-item">
        <div class="v-form-item-title">
          资金密码
        </div>
        <div class="v-form-item-input">
          <input type="password" v-model="form.address" :placeholder="'请输入资金密码'">
        </div>
      </div> -->
    </div>

    <div class="v-form-btn-box">
      <div @click="apiAddWalletAddressHandel" class="v-form-btn g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.submitText }}</span>
      </div>
    </div>
  </div>

  <SelectRadioPop :columns="coinList.list" @emitsSelectConfirm="emitCoinItemClick" :selectVal="form.currency" ref="refSelectCoinPop"/>


  <SelectRadioPop :columns="seletCoinItem.obj.chainList" @emitsSelectConfirm="emitsSelectLinkClick" :selectVal="form.chain" ref="refSelectLinkPop"/>

</div>
</template>

<script setup>
import { apiGetWalletConfig, apiAddWalletAddress } from '@/utils/api.js'
import SelectRadioPop from '@/components/SelectRadioPop.vue'
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
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("walletadd");
});

let form = reactive({
  // id: '',
  address: '',
  chain: '',
  currency: route.query.currency ? route.query.currency : '',
})

let refSelectCoinPop = ref(null)
function selectCoinClick() {
  refSelectCoinPop.value.onShow()
}
// 选择币触发
function emitCoinItemClick(item) {
  seletCoinItem.obj = item
  form.currency = seletCoinItem.obj.currency
  form.chain = seletCoinItem.obj.chainList[0].title
}


let refSelectLinkPop = ref(null)
function selectLinkClick() {
  refSelectLinkPop.value.onShow()
}

function emitsSelectLinkClick(item) {
  console.log('item', item)
  form.chain = item.title
}

let seletCoinItem = reactive({ obj: {}})

// 币列表
let coinList = reactive({ list: []})

// 获取钱包配置
async function apiGetWalletConfigHandel() {
  const { success, data } = await apiGetWalletConfig()
  if(!success) return
  coinList.list = data.list.map(item => {
    item.title = item.currency
    item.val = item.currency
    item.chainList = item.chainList.map(item2 => {
      return { title: item2, val: item2 }
    })
    return item
  })
  // 如果是有带currency参数
  if(form.currency) {
    let targetIndex = data.list.findIndex(item => {
      return item.currency == form.currency
    })
    if(targetIndex != -1) {
      seletCoinItem.obj = data.list[targetIndex]
      form.currency = seletCoinItem.obj.currency
      form.chain = seletCoinItem.obj.chainList[0].title
    }else {
      seletCoinItem.obj = data.list[0]
      form.currency = seletCoinItem.obj.currency
      form.chain = seletCoinItem.obj.chainList[0].title
    }
  }else {
    seletCoinItem.obj = data.list[0]
    form.currency = seletCoinItem.obj.currency
    form.chain = seletCoinItem.obj.chainList[0].title
  }
}

apiGetWalletConfigHandel()


// 添加钱包
async function apiAddWalletAddressHandel() {
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
  // background-color: #f6f4f5;
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: #f6f4f5;
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
  .v-wallet-add-container {
    flex: 1;
    overflow: auto;
    padding-top: 46px;
    .v-form {
      margin-top: 10px;
      padding: 10px;
      .v-form-item {
        margin-bottom: 15px;
        border: 1px solid #e4e7ed;
        padding: 10px;
        .v-form-item-title {
          padding-left: 10px;
          padding-bottom: 4px;
          font-size: 14px;
          color: #fff;
          line-height: 20px;
        }
        .v-form-item-input {
          position: relative;
          padding: 4px 10px;
          height: 34px;
          // background: var(--g-white);
          // border-radius: 4px;
          // border: 1px solid #e4e7ed;
          input {
            height: 100%;
            width: 100%;
            background-color: transparent;
            font-size: 14px;
            font-weight: 400;
            color: #fff;
            border: none;
            outline: none;
            &::placeholder {
              color: rgb(128, 127, 127);
              font-size: 12px;
            }
          }
          .v-form-item-input-icon {
            position: absolute;
            right: 0;
            top: 50%;
            padding: 0 10px;
            transform: translateY(-50%);
            .iconfont {
              font-size: 18px;
            }
          }
        }
      }
    }
    .v-form-btn-box {
      width: 100%;
      padding: 10px;
      .v-form-btn {
        width: 100%;
        height: 44px;
        background: var(--g-main_color);
        color: var(--g-white);
        border-radius: 50px;
        font-size: 14px;
      }
    }
   
  }
}
</style>