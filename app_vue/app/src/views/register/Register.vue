<template>
  <div class="v_register g-flex-column">
    <div class="v-register-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-register-head-back g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <div class="v-register-head-language g-flex-align-center">
        <!-- <div @click="$router.push({ name: 'concatkefu' })" class="v-register-head-language-img v-register-head-language-img-kefu g-flex-align-center">
          <i class="iconfont icon-zixun"></i>
        </div> -->
        <div @click="$router.push({ name: 'languageset' })" class="v-register-head-language-img g-flex-align-center g-flex-justify-center">
          <i class="iconfont icon-duoyuyan"></i>
        </div>
      </div>
    </div>
    <div class="v-register-container">
      <div class="v-register-logo">
        <div class="v-register-logo-img g-flex-align-center g-flex-justify-center">
          <img :src="store.banner.logo[1]" alt="" />
        </div>
        <!-- <div class="v-register-logo-title g-flex-align-center g-flex-justify-center">
          <img :src="store.banner.logo[2]" alt="">
        </div> -->
      </div>
      <div class="v-nav-list g-flex-align-center">
        <div v-show="store.system.RegMode.includes('0')" @click="typeClick(0)" :class="form.type == 0 ? 'active': ''" class="v-nav-item">
          <span>{{ i18n.userNameRegText }}</span>
        </div>
        <div v-show="store.system.RegMode.includes('1')"  @click="typeClick(1)" :class="form.type == 1 ? 'active' : ''" class="v-nav-item">
          <span>{{ i18n.mobileRegText }}</span>
        </div>
        <div v-show="store.system.RegMode.includes('2')" @click="typeClick(2)" :class="form.type == 2 ? 'active' : ''" class="v-nav-item">
          <span>{{ i18n.emailRegText }}</span>
        </div>
      </div>
      <div class="v-form">
        <!-- 用户名 -->
        <div v-show="store.system.UserShow == 1 || form.type == 0" class="v-form-item g-flex-align-center">
          <div class="v-form-item-left g-flex-align-center">
            <i class="iconfont icon-yonghu"></i>
          </div>
          <div class="v-form-item-middle-input">
            <input type="text" v-model="form.user_name" :placeholder="i18n.usernamePlaceholderText">
          </div>
        </div>

        <!-- 手机 -->
        <div v-show="form.type == 1" class="v-form-item g-flex-align-center">
          <div @click="selectAreaClick" class="v-form-item-left g-flex-align-center">
            <span class="v-form-item-left-text">+{{ form.area_code }}</span>
            <i class="iconfont icon-right-1-copy"></i>
          </div>
          <div class="v-form-item-middle-input">
            <input type="text" v-model="form.mobile" :placeholder="i18n.mobilePlaceholderText">
          </div>
        </div>

        <!-- 邮箱 -->
        <div v-show="form.type == 2" class="v-form-item g-flex-align-center">
          <div class="v-form-item-left g-flex-align-center">
            <i class="iconfont icon-youxiang"></i>
          </div>
          <div class="v-form-item-middle-input">
            <input type="text" v-model="form.email" :placeholder="i18n.emailPlaceholderText">
          </div>
        </div>

        <!-- 密码 -->
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

        <!-- 确认密码 -->
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

        <!-- 邀请码 -->
        <div v-show="store.system.TidSet != 0" class="v-form-item g-flex-align-center">
          <div class="v-form-item-left g-flex-align-center">
            <i class="iconfont icon-yaoqing"></i>
          </div>
          <div class="v-form-item-middle-input">
            <input type="text" v-model="form.tid" :placeholder="i18n.inviteCodeBiPlaceholderText">
          </div>
        </div>


        <!-- 验证码 -->
        <div v-show="form.type != 0" class="v-form-item g-flex-align-center">
          <div class="v-form-item-left g-flex-align-center">
            <i class="iconfont icon-yanzhengma"></i>
          </div>
          <div class="v-form-item-middle-input">
            <input type="text" v-model="form.code" :placeholder="i18n.yanzhengCodeText">
          </div>
          <div @click="getCode" class="v-form-item-middle-right g-flex-align-center">
            <span class="v-form-item-middle-right-text">
              {{ sendCodeText }}
            </span>
          </div>
        </div>

        <!-- 图片验证码 -->
        <!-- <div class="v-form-item g-flex-align-center">
          <div class="v-form-item-left g-flex-align-center">
            <i class="iconfont icon-yanzhengma"></i>
          </div>
          <div class="v-form-item-middle-input">
            <input type="text" v-model="form.account" placeholder="请输入验证码">
          </div>
          <div class="v-form-item-middle-right g-flex-align-center">
            <img src="/img/icon/code.gif" alt="" />
          </div>
        </div> -->

        <div class="v-form-btn-box">
          <div @click="apiRegisterHandel" class="v-form-btn g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.registerBtnText }}</span>
          </div>
        </div>

        <div class="v-form-bottom g-flex-align-center g-flex-justify-between">
          <div class="v-form-bottom-item g-flex-align-center">
            <div class="v-form-bottom-item-title">
              <span>{{ i18n.alreadyText }}</span>
            </div>
            <div @click="$router.replace({ name: 'login'})" class="v-form-bottom-item-val">
              <span>{{ i18n.loginBtnText }}</span>
            </div>
          </div>
          <!-- <div class="v-form-bottom-item g-flex-align-center">
            <div class="v-form-bottom-item-val">
              <span>忘记密码?</span>
            </div>
          </div> -->
        </div>
      </div>

      <!-- <div class="v-register-footer-tips g-flex-justify-center g-flex-align-center">
        <span> {{ i18n.registerTipsText }} </span>
        <span @click="$router.push({ name: 'rule', query: { id: 1 } })" class="v-register-footer-tips-val">{{ i18n.shiyongtiaokuanText }}</span>
        <span>{{ i18n.andText }}</span>
        <span @click="$router.push({ name: 'rule', query: { id: 2 } })" class="v-register-footer-tips-val">{{ i18n.yingsiText }}</span>
      </div> -->

    </div>
    
    <BindPhonesPop :list="areaList.list"  @emitPhoneItemClick="emitPhoneItemClick" ref="refBindPhonesPop"/>
  </div>
</template>

<script setup>
import BindPhonesPop from '@/components/BindPhonesPop.vue'
import { apiSendMobileCode, apiSendEmailCode, apiGetAreaList, apiGetKefuConfig, apiRegister } from '@/utils/api.js'
import { ref, reactive, watch, computed } from 'vue'
import useStore from '@/store/index.js'
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant';
import ws from "@/utils/ws.js";

// pinia 状态管理仓库
const store = useStore()

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('register')
})

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})
const route = useRoute()
const router = useRouter()

let pwdSeeeVal = ref(false)

let pwdSecondSeeeVal = ref(false)

  //type 1 手机 2邮箱 0用户名
  // RegMode数组 0用户名 1手机 2邮箱 
let form = reactive({
  type: Number(store.system.RegMode[0]),
  user_name: '',
  area_code: '',
  mobile: '',
  email: '',
  code: '',
  tid: '',
  password: '',
  password2: ''
})

getParams()

function getParams() {
  var tid = route.query.tid
  if(tid) {
    window.localStorage.setItem('tid', tid)
    form.tid = tid
  }else {
    var localTid = window.localStorage.getItem('tid')
    form.tid = localTid ? localTid : ''
  }
}

function typeClick(val) {
  form.type = val
}


let areaList = reactive({ list: []})
// 获取区号列表
async function apiGetAreaListHandel() {
  const { success, data } = await apiGetAreaList()
  if(!success) return
  areaList.list = data.list
  form.area_code = data.list[0].area_code
}
apiGetAreaListHandel()
const refBindPhonesPop = ref(null)
function selectAreaClick() {
  refBindPhonesPop.value.onShow()
}
// 选择区号触发
function emitPhoneItemClick(item) {
  console.log('xxx', item.area_code)
  form.area_code = item.area_code
}



let timer = ref(0)
let sendCodeText = ref('')
sendCodeText.value = i18n2.value.sendCodeText
// 获取验证码
function getCode() {
  if (timer.value) return
  if (form.type == 1) {
    apiSendMobileCodeHandel()
  } else if (form.type == 2) {
    apiSendEmailCodeHandel()
  }
}

// 获取手机验证码
async function apiSendMobileCodeHandel() {
  store.loadingShow = true
  const { success, data } = await apiSendMobileCode({ area_code: form.area_code, mobile: form.mobile })
  if (!success) return
  let timeNum = 60
  Toast(data.msg)
  timer.value = setInterval(() => {
    timeNum--
    sendCodeText.value = timeNum === 0 ? i18n2.value.againSendCodeText : timeNum + 's'
    if (timeNum === 0) {
      clearInterval(timer.value)
      timer.value = 0
    }
  }, 1000)
}

// 获取邮箱验证码
async function apiSendEmailCodeHandel() {
  store.loadingShow = true
  const { success, data } = await apiSendEmailCode({ email: form.email })
  if (!success) return
  let timeNum = 60
  Toast(data.msg)
  timer.value = setInterval(() => {
    timeNum--
    sendCodeText.value = timeNum == 0 ? i18n2.value.againSendCodeText : timeNum + 's'
    if (timeNum === 0) {
      clearInterval(timer.value)
      timer.value = 0
    }
  }, 1000)
}

// 注册接口
async function apiRegisterHandel() {
  if (form.password != form.password2) return Toast(i18n.value.pwdNoSame)
  store.loadingShow = true
  const { success, data } = await apiRegister(form)
  if (!success) return
  Toast(data.msg)
  store.setToken(data.token)
  ws.setToken(data.token)
  apiGetKefuConfigHandel()
  setTimeout(() => {
    router.replace({ name: 'main' })
  }, 500);
  console.log(data)
}

async function apiGetKefuConfigHandel() {
  const { success, data } = await apiGetKefuConfig({ id: 2 })
  if (!success) return
  store.kefu = data.info
  console.log('store', store)
}
</script>

<style lang='scss'>
.v_register {
  height: 100%;
  overflow: auto;
  background: var(--g-white);
  background-image: url('/img/banner/loginbg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .v-register-head {
    position: fixed;
    width: 100%;
    padding: 0 15px;
    height: 50px;
    top: 0;
    left: 0;
    z-index: 9;
    .v-register-head-back {
      position: absolute;
      height: 100%;

      .iconfont {
        color: var(--g-white);
        font-size: 26px;
        font-weight: 700;
      }
    }

    .v-register-head-language {
      position: absolute;
      height: 100%;
      right: 15px;

      .v-register-head-language-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        background: #F5F7F9;
        &.v-register-head-language-img-kefu {
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

  .v-register-container {
    padding-top: 50px;
    flex: 1;
    overflow: auto;
    padding-bottom: 30px;
    position: relative;

    .v-register-logo {
      margin-top: 10px;

      .v-register-logo-img {
        img {
          width: 150px;
          object-fit: contain;
        }
      }

      .v-register-logo-title {
        padding-top: 10px;

        img {
          height: 38px;
          object-fit: contain;
        }
      }
    }

    .v-nav-list {
      padding: 0 20px;
      margin-top: 30px;

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
          opacity: 1;
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
            padding-right: 10px;
            color: var(--g-white);
          }

          .v-form-bottom-item-val {
            color: var(--g-main_color);
          }
        }
      }
    }

    .v-register-footer-tips {
      font-size: 12px;
      width: 100%;
      margin-top: 40px;
      .v-register-footer-tips-val {
        padding: 0 5px;
        color: var(--g-main_color);
      }
    }
  }

}
</style>