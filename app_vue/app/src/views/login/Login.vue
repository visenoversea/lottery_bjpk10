<template>
<div class="v_login g-flex-column">
  <div class="v-login-head g-flex-align-center">
    <!-- <div @click="$router.push({ name: 'main' })" class="v-login-head-back g-flex-align-center">
      <i class="iconfont icon-zuojiantou"></i>
    </div> -->
    <div class="v-login-head-language g-flex-align-center">
      <!-- <div @click="$router.push({ name: 'concatkefu' })" class="v-login-head-language-img v-login-head-language-img-kefu g-flex-align-center">
        <i class="iconfont icon-zixun"></i>
      </div> -->
      <div @click="$router.push({ name: 'languageset' })" class="v-login-head-language-img g-flex-justify-center g-flex-align-center">
        <i class="iconfont icon-duoyuyan"></i>
      </div>
    </div>
  </div>
  <div class="v-login-container">
    <div class="v-login-logo">
      <div class="v-login-logo-img g-flex-align-center g-flex-justify-center">
        <img :src="store.banner.logo[1]" alt=""/>
      </div>
      <!-- <div class="v-login-logo-title g-flex-align-center g-flex-justify-center">
        <img :src="store.banner.logo[2]" alt="">
      </div> -->
    </div>
    <div class="v-nav-list g-flex-align-center">
      <div @click="typeClick(0)" :class="form.type == 0 ? 'active': ''" class="v-nav-item">
        <span>{{ i18n.accountLoginText }}</span>
      </div>
      <!-- <div @click="typeClick(1)" :class="form.type == 1 ? 'active': ''" class="v-nav-item">
        <span>{{ i18n.mobileLoginText }}</span>
      </div> -->
    </div>
    <div class="v-form">
      <!-- 用户名 -->
      <div v-show="form.type == 0" class="v-form-item g-flex-align-center">
        <div class="v-form-item-left g-flex-align-center">
          <i class="iconfont icon-yonghu"></i>
        </div>
        <div class="v-form-item-middle-input">
          <input type="text" v-model="form.account" :placeholder="i18n.emailAccountPlaceholderText">
        </div>
      </div>

      <!-- 手机 -->
      <div v-show="form.type == 1"  class="v-form-item-box">
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

      
      <!-- 密码 -->
      <div class="v-form-item g-flex-align-center">
        <div class="v-form-item-left g-flex-align-center">
          <i class="iconfont icon-ziyuanxhdpi"></i>
        </div>
        <div class="v-form-item-middle-input">
          <input :type="pwdSeeeVal ? 'text': 'password'" v-model="form.password" :placeholder="i18n.pwdPlaceholderText">
        </div>
        <div @click="pwdSeeeVal = !pwdSeeeVal" class="v-form-item-middle-right g-flex-align-center">
          <i v-show="!pwdSeeeVal" class="iconfont icon-bukejian"></i>
          <i v-show="pwdSeeeVal" class="iconfont icon-kejian"></i>
        </div>
      </div>

      <!-- 验证码 -->
      <!-- <div class="v-form-item g-flex-align-center">
        <div class="v-form-item-left g-flex-align-center">
          <i class="iconfont icon-yanzhengma"></i>
        </div>
        <div class="v-form-item-middle-input">
          <input type="text" v-model="form.code" placeholder="请输入验证码">
        </div>
        <div @click="getCode" class="v-form-item-middle-right g-flex-align-center">
          <span class="v-form-item-middle-right-text">
            {{ sendCodeText }}
          </span>
        </div>
      </div> -->

      <!-- 图片验证码 -->
      <!-- <div class="v-form-item g-flex-align-center">
        <div class="v-form-item-left g-flex-align-center">
          <i class="iconfont icon-yanzhengma"></i>
        </div>
        <div class="v-form-item-middle-input">
          <input type="text" v-model="form.account" placeholder="请输入验证码">
        </div>
        <div class="v-form-item-middle-right g-flex-align-center">
          <img src="/img/icon/code.gif" alt=""/>
        </div>
      </div> -->

      <div class="v-form-btn-box">
        <div @click="apiLoginHandel" class="v-form-btn g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.loginBtnText }}</span>
        </div>
      </div>

      <div class="v-form-btn-box">
        <div @click="$router.push({ name: 'register' })" class="v-form-btn g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.registerText }}</span>
        </div>
      </div>

      <div v-if="false" class="v-form-bottom g-flex-align-center g-flex-justify-between">
        <div class="v-form-bottom-item g-flex-align-center">
          <div class="v-form-bottom-item-title">
            <span>{{ i18n.noAccountText }}</span>
          </div>
          <div @click="$router.push({ name: 'register' })" class="v-form-bottom-item-val">
            <span>{{ i18n.registerText }}</span>
          </div>
        </div>
        <!-- <div @click="$router.push({ name: 'forgetpwd' })" class="v-form-bottom-item g-flex-align-center">
          <div class="v-form-bottom-item-val">
            <span>{{ i18n.forgetText }}</span>
          </div>
        </div> -->
      </div>
    </div>

    <!-- <div class="v-login-footer-tips g-flex-justify-center g-flex-align-center">
      <span>官方客服邮箱：</span>
      <span>deficstcs@gmail.com</span>
    </div> -->

  </div>

  <div class="v-login-kefu">
    <div @click="loginKefuClick"  class="v-login-kefu-img"></div>
  </div>
  <BindPhonesPop ref="refBindPhonesPop" :list="areaList.list" @emitPhoneItemClick="emitPhoneItemClick"/>
  
</div>
</template>

<script setup>
import { apiSendMobileCode, apiSendEmailCode, apiGetAreaList, apiLogin, apiGetKefuConfig } from '@/utils/api.js'
import { ref, reactive, watch, computed } from 'vue'
import useStore from '@/store/index.js'
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant';
import BindPhonesPop from '@/components/BindPhonesPop.vue'
import ws from "@/utils/ws.js";


// pinia 状态管理仓库
const store = useStore()

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('login')
})

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})
const route = useRoute()
const router = useRouter()

function loginKefuClick() {
  window.location.href = store.kefu.KefuUrl
}

let form = reactive({
  type: 0, //0 用户名邮箱  1 手机登录 2 手机验证码登录  3邮箱验证码登录
  area_code: '',
  mobile: '',
  // email: '',
  account: '',
  password: '',
  code: ''
})

function getParams() {
  let tid = route.query.tid
  if(tid) {
    window.localStorage.setItem('tid', tid)
  }
}
getParams()

function typeClick(val) {
  form.type = val
}

let pwdSeeeVal = ref(false)

let timer = ref(0)

let sendCodeText = ref('')

sendCodeText.value = i18n2.value.sendCodeText

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


let areaList = reactive({ list: []})

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

// 登录
async function apiLoginHandel() {
  store.loadingShow = true
  const { success, data } = await apiLogin(form)
  console.log(data)
  if(!success) return
  ws.setToken(data.token)
  store.setToken(data.token)
  Toast(data.msg)
  apiGetKefuConfigHandel()
  router.replace({ name: 'main' })
}

async function apiGetKefuConfigHandel() {
  const { success, data } = await apiGetKefuConfig({ id: 2 })
  if(!success) return
  store.kefu = data.info
  console.log('store', store)
}
</script>

<style lang='scss'>
.v_login {
  height: 100%;
  overflow: auto;
  background: var(--g-white);
  background-image: url('/img/banner/loginbg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .v-login-head {
    position: fixed;
    width: 100%;
    padding: 0 15px;
    height: 50px;
    top: 0;
    left: 0;
    z-index: 9;
    .v-login-head-back {
      position: absolute;
      height: 100%;
      .iconfont {
        font-size: 26px;
        font-weight: 700;
        color: var(--g-white);
      }
    }
    .v-login-head-language {
      position: absolute;
      height: 100%;
      right: 15px;
      .v-login-head-language-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        background: #F5F7F9;
        &.v-login-head-language-img-kefu {
          margin-right: 10px;
          .iconfont {
            font-size: 24px;
            line-height: 26px;
          }
        }
        .iconfont {
          font-size: 22px;
          line-height: 22px;
          color: #333;
          font-weight: 700;
        }
      }
    }
  }
  .v-login-container {
    padding-top: 50px;
    flex: 1;
    overflow: auto;
    padding-bottom: 60px;
    position: relative;
    .v-login-logo {
      margin-top: 20px;
      .v-login-logo-img {
        img {
          width: 200px;
          height: 100px;
          object-fit: contain;
        }
      }
      .v-login-logo-title {
        padding-top: 10px;
        img {
          height: 38px;
          object-fit: contain;
        }
      }
    }
    .v-nav-list {
      padding: 0 20px;
      margin-top: 15px;
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
      .v-form-item {
        margin-top: 20px;
        width: 100%;
        height: 46px;
        background: #f2f4f7;
        border-radius: 4px;
        opacity: 0.8;
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
            opacity: 1;
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
            color: var(--g-white);
            padding-right: 10px;
          }
          .v-form-bottom-item-val {
            color: var(--g-main_color);
          }
        }
      }
    }

    .v-login-footer-tips {
      position: absolute;
      bottom: 40px;
      font-size: 12px;
      width: 100%;
    }
  }
  .v-login-kefu {
    .v-login-kefu-img {
      width: 60px;
      height: 60px;
      background-color: #f2f2f2;
      position: fixed;
      bottom: calc(25px + constant(safe-area-inset-bottom));
      bottom: calc(25px + env(safe-area-inset-bottom));
      right: 20px;
      border-radius: 50%;
      cursor: pointer;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 40px 40px;
      -webkit-animation: wobble 250ms infinite;
      animation: wobble 250ms infinite;
      background-image: url('/img/icon/kefulogin.png')
    }
  }

  @keyframes wobble {
    0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 0.8;
    }
    30% {
        -webkit-transform: rotate(-10deg);
        transform: rotate(-10deg);
        opacity: 0.9;
    }
    50% {
        -webkit-transform: rotate(10deg);
        transform: rotate(10deg);
        opacity: 1;
    }
    85% {
        -webkit-transform: rotate(15deg);
        transform: rotate(15deg);
        opacity: 0.9;
    }
    100% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        opacity: 1;
    }
  }
}
</style>