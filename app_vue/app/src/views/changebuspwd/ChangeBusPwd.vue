<template>
  <div class="v_change_bus_pwd g-flex-column n-bg">
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
    <div class="v-change-bus-pwd-container">
      <div class="v-form">
        <!-- 旧密码 -->
        <div v-show="userInfo.fundPasswordStatus == 1" class="v-form-item-box">
          <div class="v-form-item-box-title">
            <span>{{ i18n.oldBusPwdText }}</span>
          </div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-middle-input">
              <input :type="pwdSeeeVal ? 'text' : 'password'" v-model="form.oldPassword"
                :placeholder="i18n.oldBusPwdPlaceholderText" />
            </div>
            <div @click="pwdSeeeVal = !pwdSeeeVal" class="v-form-item-middle-right g-flex-align-center">
              <i v-show="!pwdSeeeVal" class="iconfont icon-bukejian"></i>
              <i v-show="pwdSeeeVal" class="iconfont icon-kejian"></i>
            </div>
          </div>
        </div>

        <!-- 新密码 -->
        <div class="v-form-item-box">
          <div class="v-form-item-box-title">
            <span>{{ i18n.newBusPwdText }}</span>
          </div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-middle-input">
              <input :type="pwdSecondSeeeVal ? 'text' : 'password'" v-model="form.password"
                :placeholder="i18n.newBusPwdPlaceholderText" />
            </div>
            <div @click="pwdSecondSeeeVal = !pwdSecondSeeeVal" class="v-form-item-middle-right g-flex-align-center">
              <i v-show="!pwdSecondSeeeVal" class="iconfont icon-bukejian"></i>
              <i v-show="pwdSecondSeeeVal" class="iconfont icon-kejian"></i>
            </div>
          </div>
        </div>

        <!-- 确认新密码 -->
        <div class="v-form-item-box">
          <div class="v-form-item-box-title">
            <span>{{ i18n.comfirmBusPwdText }}</span>
          </div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-middle-input">
              <input :type="pwdThreeSeeeVal ? 'text' : 'password'" v-model="form.password2"
                :placeholder="i18n.comfirmBusPwdPlaceholderText" />
            </div>
            <div @click="pwdThreeSeeeVal = !pwdThreeSeeeVal" class="v-form-item-middle-right g-flex-align-center">
              <i v-show="!pwdThreeSeeeVal" class="iconfont icon-bukejian"></i>
              <i v-show="pwdThreeSeeeVal" class="iconfont icon-kejian"></i>
            </div>
          </div>
        </div>
      </div>
      <div @click="apiChangeTradePwdHandel" class="v-submit-btn g-flex-align-center g-flex-justify-center">
        {{ i18n.submitBtnText }}
      </div>
    </div>

    <BindPhonesPop :list="areaList.list" @emitPhoneItemClick="emitPhoneItemClick" ref="refBindPhonesPop" />
  </div>
</template>

<script setup>
import { apiGetAreaList, apiSendMobileCode, apiGetUserInfo, apiChangeTradePwd } from '@/utils/api.js'
import BindPhonesPop from '@/components/BindPhonesPop.vue'
import { Toast } from 'vant';
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRouter } from 'vue-router';
let router = useRouter()
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('changeBusPwd')
})
let pwdSeeeVal = ref(false)
let pwdSecondSeeeVal = ref(false)
let pwdThreeSeeeVal = ref(false)
let value = ref('')
let areaList = reactive({
  list: []
})

let againGetCodeText = ref(i18n.value.defaultCodeText)
let sendCodeText = ref(i18n.value.sendCodeText)
let timer = ref(0)

const refBindPhonesPop = ref(null)

function selectAreaClick() {
  refBindPhonesPop.value.onShow()
}

// 选择区号触发
function emitPhoneItemClick(item) {
  form.area_code = item.area_code
}

// 获取区号列表
async function apiGetAreaListHandel() {
  const { success, data } = await apiGetAreaList()
  if (!success) return
  areaList.list = data.list
  form.area_code = data.list[0].area_code
}

// 发送手机验证码
async function apiSendMobileCodeHandel() {
  store.loadingShow = true
  const { success, data } = await apiSendMobileCode({ area_code: form.area_code, mobile: form.mobile })
  if (!success) return
  let timeNum = 60
  Toast(data.msg)
  timer.value = setInterval(() => {
    timeNum--
    sendCodeText.value = timeNum === 0 ? againGetCodeText.value : timeNum + 's'
    if (timeNum === 0) {
      clearInterval(timer.value)
      timer.value = 0
    }
  }, 1000)
}

let userInfo = computed(() => {
  return store.userInfo
})

let form = reactive({
  oldPassword: '',
  password: '',
  password2: ''
})

async function apiGetUserInfoHandel() {
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
}

apiGetUserInfoHandel()

// 修改资金密码
async function apiChangeTradePwdHandel() {
  store.loadingShow = true
  const { success, data } = await apiChangeTradePwd(form)
  if (!success) return
  Toast.success(data.msg)
  setTimeout(() => {
    router.go(-1)
  }, 500);
}
</script>

<style lang='scss'>
.v_change_bus_pwd {
  height: 100%;
  overflow: auto;
  // background-color: #f6f4f5;
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
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
      font-size: 16px;
      font-weight: 700;
      
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

  .v-change-bus-pwd-container {
    flex: 1;
    overflow: auto;
    padding-bottom: 70px;
    padding-top: 50px;

    .v-form {
      padding: 15px;

      .v-form-item-box {
        margin-bottom: 15px;
        border: 1px solid #e4e7ed;
        padding: 10px;
        border-radius: 6px;
        .v-form-item-box-title {
          padding-left: 10px;
          padding-bottom: 4px;
          font-size: 14px;
          color: #fff;
          line-height: 20px;
        }

        .v-form-item {
          position: relative;
          padding: 4px 10px;
          height: 34px;
          // background: var(--g-white);
          // border: 1px solid #e4e7ed;
          // border-radius: 4px;
          &:nth-of-type(1) {
            margin-top: 15px;
          }

          .v-form-item-left {
            height: 100%;
            padding: 0 10px 0 0px;

            .v-form-item-left-text {
              font-size: 14px;
            }

            .iconfont {
              font-size: 18px;
              color: #c0c4cc;
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
              color: #fff;
              border: none;
              outline: none;
              &::placeholder {
                color: rgb(128, 127, 127);
                font-size: 12px;
              }
            }
          }

          .v-form-item-middle-right {
            padding: 0 0px 0 10px;
            height: 100%;

            .iconfont {
              font-size: 18px;
              color: #fff;
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
      border-radius: 50px;
    }
  }
}</style>