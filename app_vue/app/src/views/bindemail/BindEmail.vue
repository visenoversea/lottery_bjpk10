<template>
  <div class="v_bind_email">
    <div class="v-head g-flex-justify-center g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

      <!-- <div @click="$router.push({ name: 'rechargehistory'})" class="v-head-right g-flex-align-center">
      <i class="iconfont icon-datijilu"></i>
    </div> -->
    </div>
    <div class="v-bind-email-container">
      <div class="v-form">
        <!-- 旧邮箱 -->
        <div v-show="userInfo.email" class="v-form-item-box">
          <div class="v-form-item-box-title">
            <span>{{ i18n.oldEmailText }}</span>
          </div>
          <div class="v-form-item g-flex-align-center">
            <!-- <div @click="selectAreaClick" class="v-form-item-left g-flex-align-center">
              <span class="v-form-item-left-text">+{{ form.area_code }}</span>
              <i class="iconfont icon-right-1-copy"></i>
            </div> -->
            <div class="v-form-item-middle-input">
              <input type="text" readonly v-model="userInfo.email" :placeholder="i18n.newEmailPlaceholderText" >
            </div>
          </div>
        </div>

        <div v-show="userInfo.email" class="v-form-item-box">
          <div class="v-form-item-box-title">
            <span>{{ i18n.codeText }}</span>
          </div>
          <div class="v-form-item g-flex-align-center">
            <!-- <div @click="selectAreaClick" class="v-form-item-left g-flex-align-center">
              <span class="v-form-item-left-text">+{{ form.area_code }}</span>
              <i class="iconfont icon-right-1-copy"></i>
            </div> -->
            <div class="v-form-item-middle-input">
              <input type="text" v-model="form.oldCode" :placeholder="i18n.codePlaceholderText" >
            </div>
            <div @click="apiSendOldEmailCodeHandel" class="v-form-item-middle-right g-flex-align-center">
              <span class="v-form-item-middle-right-text">
                {{ sendOldCodeText }}
              </span>
            </div>
          </div>
        </div>

        <!-- 新邮箱 -->
        <div class="v-form-item-box">
          <div class="v-form-item-box-title">
            <span>{{ i18n.newEmailText }}</span>
          </div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-middle-input">
              <input type="text" v-model="form.email"  :placeholder="i18n.newEmailPlaceholderText"  >
            </div>
          </div>
        </div>

        <div class="v-form-item-box">
          <div class="v-form-item-box-title">
            <span>{{ i18n.codeText }}</span>
          </div>
          <div class="v-form-item g-flex-align-center">
            <!-- <div @click="selectAreaClick" class="v-form-item-left g-flex-align-center">
              <span class="v-form-item-left-text">+{{ form.area_code }}</span>
              <i class="iconfont icon-right-1-copy"></i>
            </div> -->
            <div class="v-form-item-middle-input">
              <input type="text" v-model="form.code" :placeholder="i18n.codePlaceholderText"  >
            </div>
            <div @click="apiSendEmailCodeHandel" class="v-form-item-middle-right g-flex-align-center">
              <span class="v-form-item-middle-right-text">
                {{ sendCodeText }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div @click="apiBindEmailHandel" class="v-submit-btn g-flex-align-center g-flex-justify-center">
        {{ i18n.submitText }}
      </div>
    </div>

  </div>
</template>

<script setup>
import { apiSendEmailCode, apiGetUserInfo, apiBindEmail } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import { Toast } from 'vant'
import useStore from '@/store/index.js'
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";

let router = useRouter()
let route = useRoute()
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('bindEmail')
})
const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})



let value = ref('')

let form = reactive({
  email: '',
  code: '',
  oldCode: ''
})

let sendOldCodeText = ref(i18n2.value.sendCodeText)
let sendCodeText = ref(i18n2.value.sendCodeText)
let againGetCodeText = ref(i18n2.value.againSendCodeText)

let timer = ref(0)
let timerSecond = ref(0)

let userInfo = computed(() => {
  return store.userInfo
})

async function apiGetUserInfoHandel() {
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
  console.log(data)
}

apiGetUserInfoHandel()

// 获取旧邮箱验证码
async function apiSendOldEmailCodeHandel() {
  if (timer.value) return
  store.loadingShow = true
  const { success, data } = await apiSendEmailCode({ email: userInfo.value.email })
  if (!success) return
  let timeNum = 60
  Toast(data.msg)
  timer.value = setInterval(() => {
    timeNum--
    sendOldCodeText.value = timeNum == 0 ? againGetCodeText.value : timeNum + 's'
    if (timeNum === 0) {
      clearInterval(timer.value)
      timer.value = 0
    }
  }, 1000)
}

// 获取邮箱验证码
async function apiSendEmailCodeHandel() {
  if (timerSecond.value) return
  store.loadingShow = true
  const { success, data } = await apiSendEmailCode({ email: form.email })
  if (!success) return
  let timeNum = 60
  Toast(data.msg)
  timerSecond.value = setInterval(() => {
    timeNum--
    sendCodeText.value = timeNum == 0 ? againGetCodeText.value : timeNum + 's'
    if (timeNum === 0) {
      clearInterval(timerSecond.value)
      timerSecond.value = 0
    }
  }, 1000)
}

// 绑定邮箱
async function apiBindEmailHandel() {
  store.loadingShow = true
  const { success, data } = await apiBindEmail(form)
  if (!success) return
  Toast.success(data.msg)
  setTimeout(() => {
    router.back(-1)
  }, 500);
}

</script>

<style lang='scss'>
.v_bind_email {
  height: 100%;
  overflow: auto;

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

  .v-bind-email-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-title {
      padding: 20px 15px 15px 15px;
      font-size: 22px;
      line-height: 26px;
      color: #333;
      font-weight: 600;
    }

    .v-form {
      padding: 15px;

      .v-form-item-box {
        .v-form-item-box-title {
          font-size: 16px;
          font-weight: 700;
          margin-top: 20px;
        }
        .v-form-item {
          margin-top: 10px;
          width: 100%;
          height: 46px;
          background: #f2f4f7;
          border-radius: 4px;
          padding: 0 15px;
          &:nth-of-type(1) {
            margin-top: 15px;
          }

          .v-form-item-left {
            height: 100%;
            padding: 0 10px 0 15px;
            .v-form-item-left-text {
              font-size: 16px;
            }
            .iconfont {
              font-size: 18px;
              color: #7B869E;
            }
          }

          .v-form-item-middle-input {
            height: 100%;
            flex: 1;

            input {
              height: 100%;
              width: 100%;
              background-color: transparent;
              font-size: 14px;
              font-weight: 400;
              color: #333;
              border: none;
              outline: none;

              &::placeholder {
                color: #7D919D;
                font-weight: 700;
                font-size: 14px;
              }
            }
          }

          .v-form-item-middle-right {
            padding: 0 0px 0 10px;
            height: 100%;

            .iconfont {
              font-size: 18px;
              color: #7B869E;
            }

            img {
              width: 74px;
            }

            .v-form-item-middle-right-text {
              color: var(--g-main_color);
              font-size: 14px;
            }
          }

        }
      }
    }

    .v-submit-btn {
      background: var(--g-main_color);
      color: var(--g-white);
      font-size: 14px;
      height: 44px;
      position: absolute;
      width: 90%;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 4px;
    }
  }
}
</style>