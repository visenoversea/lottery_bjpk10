<template>
  <div class="v_recharge_select g-flex-column">
    <div class="v-recharge-select-head">
      <div class="v-recharge-select-head-title">
        <span>{{ i18n.balanceText }}</span>
      </div>
      <div class="v-recharge-select-head-val">
        <span>{{ Number(userInfo.balance).toFixed(2) }}</span>
      </div>
      <div class="v-recharge-select-head-id">
        <span>ID: {{ userInfo.id }}</span>
      </div>
    </div>
    <div class="v-recharge-select-container">
      <div class="v-recharge-select-card-one">
        <div class="v-recharge-select-card-one-title">
          {{ i18n.zhunguiText }}
        </div>
        <div class="v-recharge-select-card-one-text">
          &nbsp;&nbsp;&nbsp;&nbsp;{{ i18n.rechargeDesText }}
        </div>
        <div class="v-recharge-select-card-one-text">
          【{{ store.system.WebTitle }}】 {{ i18n.zhuheText }}   
        </div>
      </div>
      <div class="v-recharge-select-card-two">
        <div class="v-recharge-select-card-two-input g-flex-align-center g-flex-justify-center">
          <input :placeholder="i18n.namePlaceholderText" v-model="form.info.name" type="text">
        </div>
        <div class="v-recharge-select-card-two-input g-flex-align-center g-flex-justify-center">
          <input :placeholder="i18n.amountInputPlaceHolderText" v-model="form.amount" type="number">
        </div>
        <div class="v-recharge-select-card-two-btn-box g-flex-align-center g-flex-justify-center">
          <div @click="apiBankFinishPayHandel" class="v-recharge-select-card-two-btn g-flex-align-center g-flex-justify-center">{{ i18n.subBtnText }}</div>
        </div>
      </div>

      <div class="v-recharge-select-tips g-flex-align-center g-flex-justify-center">
        <van-icon name="warning-o" />
        <span>{{ i18n.rechargeTipsText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiGetUserInfo, apiBankFinishPay } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRoute, useRouter } from 'vue-router';
import { kefuClick } from '@/utils/index'
import { Toast } from 'vant';
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('rechargeSelect')
})

const route = useRoute()
const router = useRouter()

let userInfo = computed(() => {
  return store.userInfo
})

async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
  console.log(data)
}

apiGetUserInfoHandel()

let form = reactive({
  id: 30,
  amount: '',
  info: {
    name: ''
  },
})

// 我已确认转账
async function apiBankFinishPayHandel() {
  store.loadingShow = true
  const { success, data } = await apiBankFinishPay(form)
  if (!success) return
  Toast.success(data.msg)
  setTimeout(() => {
    router.push({ name: 'rechargehistory' })
  }, 500);
  console.log(data)
}
</script>

<style lang='scss'>
.v_recharge_select {
  height: 100%;
  overflow: auto;
  background: #EFEFEF;
  .v-recharge-select-head {
    background: #1C1C34;
    color: var(--g-white);
    text-align: center;
    font-size: 15px;
    padding: 50px 0;
    border-radius: 0 0 15% 15%;
    .v-recharge-select-head-val {
      padding: 9px 0;
      font-size: 28px;
      line-height: 30px;
      font-weight: bold;
    }
    .v-recharge-select-head-id {
      font-size: 15px;
      font-weight: 500;
      color: var(--g-white);
      opacity: 0.5;
    }
  }
  .v-recharge-select-container {
    position: relative;
    margin-top: -40px;
    padding: 12px 15px;
    .v-recharge-select-card-one {
      background: var(--g-white);
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      .v-recharge-select-card-one-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        line-height: 21px;
        padding-bottom: 10px;
      }
      .v-recharge-select-card-one-text {
        font-size: 12px;
        font-weight: 500;
        color: #969696;
        line-height: 21px;
        padding-bottom: 10px;
      }
    }

    .v-recharge-select-card-two {
      background: var(--g-white);
      padding: 10px 0;
      border-radius: 5px;
      margin-bottom: 10px;
      .v-recharge-select-card-two-input {
        padding: 10px 7px;
        border-bottom: 1px solid #F2F2F2;
        input {
          flex: 1;
          height: 60px;
          line-height: 30px;
          border: 0;
          margin: 0;
          outline: none;
          font-size: 20px;
          font-weight: 500;
          color: #222;
          border-radius: 20px;
          padding: 5px 25px;
          &::placeholder {
            font-size: 20px;
          }
        }
      }

      .v-recharge-select-card-two-btn-box {
        padding: 30px 30px 15px 30px;
        .v-recharge-select-card-two-btn {
          flex: 1;
          height: 46px;
          background: linear-gradient(90deg, #D4B38F 0%, #B88964 100%);
          border-radius: 46px;
          color: var(--g-white);
          font-size: 18px;
        }
      }
    }

    .v-recharge-select-tips {
      color: #969696;
      font-size: 13px;
      line-height: 22px;
      .van-icon {
        line-height: 22px;
        font-size: 20px;
        margin-right: 5px;
      }
    }
  }
}
</style>