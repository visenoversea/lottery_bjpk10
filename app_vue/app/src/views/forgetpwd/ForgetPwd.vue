<template>
  <div class="v_foget_pwd g-flex-column">
    <div class="v-foget-pwd-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-foget-pwd-head-back g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <div class="v-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div>
    </div>
    <div class="v-foget-pwd-container">
      <div class="v-nav-list g-flex-align-center">
        <div @click="typeClick(1)" :class="form.type == 1 ? 'active' : ''" class="v-nav-item">
          <span>{{ i18n.mobileLookText }}</span>
        </div>
        <div @click="typeClick(2)" :class="form.type == 2 ? 'active' : ''" class="v-nav-item">
          <span>{{ i18n.emailLookText }}</span>
        </div>
      </div>
      <div class="v-form">
        <!-- 手机 -->
        <div v-show="form.type == 1"  class="v-form-item-box">
          <div class="v-form-item-box-title">
            <span>{{ i18n.mobileText }}</span>
          </div>
          <div class="v-form-item g-flex-align-center">
            <div @click="selectAreaClick" class="v-form-item-left g-flex-align-center">
              <span class="v-form-item-left-text">+{{ form.area_code }}</span>
              <i class="iconfont icon-right-1-copy"></i>
            </div>
            <div class="v-form-item-middle-input">
              <input type="text" v-model="form.mobile" :placeholder="i18n.mobilePlaceholderText">
            </div>
          </div>
        </div>
        

        <!-- 邮箱 -->
        <div v-show="form.type == 2"  class="v-form-item-box">
          <div class="v-form-item-box-title">
            <span>{{ i18n.emailText }}</span>
          </div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-left g-flex-align-center">
              <i class="iconfont icon-youxiang"></i>
            </div>
            <div class="v-form-item-middle-input">
              <input type="text" v-model="form.email" :placeholder="i18n.emailPlaceholderText">
            </div>
          </div>
        </div>
        

        <!-- 密码 -->
        <div class="v-form-item-box">
          <div class="v-form-item-box-title">
            <span>{{ i18n.pwdText }}</span>
          </div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-left g-flex-align-center">
              <i class="iconfont icon-ziyuanxhdpi"></i>
            </div>
            <div class="v-form-item-middle-input">
              <input :type="pwdSeeeVal ? 'text' : 'password'" v-model="form.password" :placeholder="i18n.pwdPlaceholderText">
            </div>
            <div @click="pwdSeeeVal = !pwdSeeeVal" class="v-form-item-middle-right g-flex-align-center">
              <i v-show="!pwdSeeeVal" class="iconfont icon-bukejian"></i>
              <i v-show="pwdSeeeVal" class="iconfont icon-kejian"></i>
            </div>
          </div>
        </div>
        

        <!-- 确认密码 -->
        <div class="v-form-item-box">
          <div class="v-form-item-box-title">
            <span>{{ i18n.secondPwdText }}</span>
          </div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-left g-flex-align-center">
              <i class="iconfont icon-ziyuanxhdpi"></i>
            </div>
            <div class="v-form-item-middle-input">
              <input :type="pwdSecondSeeeVal ? 'text' : 'password'" v-model="form.password2" :placeholder="i18n.secondPwdPlaceholderText">
            </div>
            <div @click="pwdSecondSeeeVal = !pwdSecondSeeeVal" class="v-form-item-middle-right g-flex-align-center">
              <i v-show="!pwdSecondSeeeVal" class="iconfont icon-bukejian"></i>
              <i v-show="pwdSecondSeeeVal" class="iconfont icon-kejian"></i>
            </div>
          </div>
        </div>
        

        <!-- 验证码 -->
        <div class="v-form-item-box">
          <div class="v-form-item-box-title">
            <span>{{ i18n.codeText }}</span>
          </div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-left g-flex-align-center">
              <i class="iconfont icon-yanzhengma"></i>
            </div>
            <div class="v-form-item-middle-input">
              <input type="text" v-model="form.code" :placeholder="i18n.codePlaceholderText">
            </div>
            <div @click="getCode" class="v-form-item-middle-right g-flex-align-center">
              <span class="v-form-item-middle-right-text">
                {{ sendCodeText }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="v-form-btn-box">
          <div @click="apiForgetPwdHandel" class="v-form-btn g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.submitBtnText }}</span>
          </div>
        </div>

        <div class="v-form-bottom g-flex-align-center g-flex-justify-between">
          <!-- <div class="v-form-bottom-item g-flex-align-center">
            <div class="v-form-bottom-item-title">
              <span>已有账户?</span>
            </div>
            <div @click="$router.replace({ name: 'login'})" class="v-form-bottom-item-val">
              <span>去登录</span>
            </div>
          </div> -->
          <!-- <div class="v-form-bottom-item g-flex-align-center">
            <div class="v-form-bottom-item-val">
              <span>忘记密码?</span>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <BindPhonesPop ref="refBindPhonesPop" :list="areaList.list" @emitPhoneItemClick="emitPhoneItemClick"/>
  </div>
</template>

<script setup>
import { apiGetAreaList, apiSendEmailCode, apiSendMobileCode, apiForgetPwd } from '@/utils/api.js'
import BindPhonesPop from '@/components/BindPhonesPop.vue';
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRoute, useRouter } from 'vue-router';
import { Toast } from 'vant';
let router = useRouter()
let route = useRoute()
const i18nObj = useI18n()
const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})
const i18n = computed(() => {
  return i18nObj.tm('forgetPwd')
})
// pinia状态管理仓库
const store = useStore()

let value = ref('')

let sendCodeText = ref(i18n2.value.sendCodeText) 

let areaList = reactive({ list: []})

let timer = ref(0)

//1 手机 2邮箱 0用户名
let form = reactive({
  type: 1, //1-手机找回 2-邮箱找回
  mobile: '',
  password: '',
  code: '',
  email: '',
  area_code: '',
  password2: ''
})

let pwdSeeeVal = ref(false)

let pwdSecondSeeeVal = ref(false)



function typeClick(val) {
  form.type = val
}


apiGetAreaListHandel()
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
  if(!success) return
  areaList.list = data.list
  form.area_code = data.list[0].area_code
}



// 获取验证码
function getCode() {
  if(timer.value) return
  if(form.type == 1) {
    apiSendMobileCodeHandel()
  }else if(form.type == 2) {
    apiSendEmailCodeHandel()
  }
}

// 获取手机验证码
async function apiSendMobileCodeHandel() {
  store.loadingShow = true
  const { success, data } = await apiSendMobileCode({ area_code: form.area_code, mobile: form.mobile })
  if(!success) return
  let timeNum = 60
  Toast(data.msg)
  timer.value = setInterval(() => {
    timeNum --
    sendCodeText.value = timeNum === 0 ? i18n2.value.againSendCodeText : timeNum + 's'
    if(timeNum === 0) {
      clearInterval(timer.value)
      timer.value = 0
    }
  }, 1000)
}

// 获取邮箱验证码
async function apiSendEmailCodeHandel() {
  store.loadingShow = true
  const { success, data } = await apiSendEmailCode({ email: form.email })
  if(!success) return
  let timeNum = 60
  Toast(data.msg)
  timer.value = setInterval(() => {
    timeNum --
    sendCodeText.value = timeNum == 0 ? i18n2.value.againSendCodeText : timeNum + 's'
    if(timeNum === 0) {
      clearInterval(timer.value)
      timer.value = 0
    }
  }, 1000)
}

// 忘记密码
async function apiForgetPwdHandel() {
  if(form.password != form.password2) return Toast(i18n.value.pwdSecondTipsText)
  store.loadingShow = true
  const { success, data } = await apiForgetPwd(form)
  if(!success) return
  Toast.success(data.msg)
  router.replace({ name: 'login' })
}
</script>

<style lang='scss'>
.v_foget_pwd {
  height: 100%;
  overflow: auto;

  .v-foget-pwd-head {
    position: fixed;
    width: 100%;
    padding: 0 15px;
    height: 50px;
    top: 0;
    left: 0;
    background-color: var(--g-white);
    z-index: 9;

    .v-foget-pwd-head-back {
      position: absolute;
      height: 100%;

      .iconfont {
        font-size: 26px;
        font-weight: 700;
      }
    }

    .v-title {
      height: 100%;
      flex: 1;
      font-size: 16px;
      font-weight: 700;
    }

    .v-foget-pwd-head-language {
      position: absolute;
      height: 100%;
      right: 15px;

      .v-foget-pwd-head-language-img {
        padding: 3px;
        border-radius: 50%;
        overflow: hidden;
        background: #F5F7F9;

        .iconfont {
          font-size: 22px;
          color: #333;
          font-weight: 700;
        }
      }
    }
  }

  .v-foget-pwd-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-nav-list {
      padding: 0 20px;
      margin-top: 40px;

      .v-nav-item {
        font-weight: 600;
        color: #333;
        font-size: 16px;
        line-height: 25px;
        margin-right: 15px;

        &.active {
          color: var(--g-main_color);
        }
      }
    }
    .v-form {
      padding: 0 20px;
      padding-top: 15px;
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
            padding: 0 15px 0 10px;
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
      

      .v-form-btn-box {
        margin-top: 30px;

        .v-form-btn {
          width: 100%;
          height: 45px;
          background: var(--g-main_color);
          color: var(--g-white);
          border-radius: 5px;
        }
      }

      .v-form-bottom {
        margin-top: 15px;

        .v-form-bottom-item {
          font-size: 14px;

          .v-form-bottom-item-title {
            padding-right: 10px;
          }

          .v-form-bottom-item-val {
            color: var(--g-main_color);
          }
        }
      }
    }
  }
}
</style>