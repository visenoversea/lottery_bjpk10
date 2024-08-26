<template>
  <div class="v_foget_pwd g-flex-column  n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <img src="/images/back-icon.png" alt=""/>
      </div>
      <!-- <div class="v-login-head-language g-flex-align-center">
        <span>{{ i18n.titleText }}</span>
      </div> -->
      <!-- <div class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div> -->
    </div>
    <div class="new-head_title_text">{{ i18n.titleText }}</div>
    <img class="ch-bg" src="/images/ch-bg.png" />
    <div class="v-foget-pwd-container">
      <div class="n-nav-list g-flex-align-center" style="margin:0 20px">
        <div @click="typeClick(1)" :class="form.type == 1 ? 'active' : ''" class="v-nav-item">
          <span>{{ i18n.mobileLookText }}</span>
        </div>
        <div @click="typeClick(2)" :class="form.type == 2 ? 'active' : ''" class="v-nav-item">
          <span>{{ i18n.emailLookText }}</span>
        </div>
      </div>
      <div class="v-form">
        <!-- 手机 -->
        <div class="n-form-box" v-show="form.type == 1">
          <div class="n-form-title">{{ i18n.mobileText }}</div>
          <div class="v-form-item-box">
            <!-- <div class="v-form-item-box-title">
              <span>{{ i18n.mobileText }}</span>
            </div> -->
            <div class="v-form-item g-flex-align-center">
              
              <div @click="selectAreaClick" class="v-form-item-left g-flex-align-center" style="padding-left: 17px !important;">
                <span class="v-form-item-left-text">+{{ form.area_code }}</span>
                <i class="iconfont icon-right-1-copy"></i>
              </div>
              <div class="v-form-item-middle-input">
                <input type="text" v-model="form.mobile" :placeholder="i18n.mobilePlaceholderText">
              </div>
            </div>
          </div>
        </div>
        

        <!-- 邮箱 -->
        <div class="n-form-box" v-show="form.type == 2">
          <div class="n-form-title">{{ i18n.emailText }}</div>

            <div class="v-form-item-box">
              <!-- < class="v-form-item-box-title">
                <span>{{ i18n.emailText }}</span>
              </div> -->
              <div class="v-form-item g-flex-align-center">
                <div class="v-form-item-middle-input">
                  <input type="text" v-model="form.email" :placeholder="i18n.emailPlaceholderText">
                </div>
              </div>
            </div>
        </div>

        <!-- 密码 -->
        <div class="n-form-box">
          <div class="n-form-title">{{ i18n.pwdText }}</div>
          <div class="v-form-item-box">
            <!-- <div class="v-form-item-box-title">
              <span>{{ i18n.pwdText }}</span>
            </div> -->
            <div class="v-form-item g-flex-align-center">

              <div class="v-form-item-middle-input">
                <input :type="pwdSeeeVal ? 'text' : 'password'" v-model="form.password" :placeholder="i18n.pwdPlaceholderText">
              </div>
              <div @click="pwdSeeeVal = !pwdSeeeVal" class="v-form-item-middle-right g-flex-align-center">
                <i v-show="!pwdSeeeVal" class="iconfont icon-bukejian"></i>
                <i v-show="pwdSeeeVal" class="iconfont icon-kejian"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- 确认密码 -->
        <div class="n-form-box">
          <!-- <div class="v-form-item-box-title">
            <span>{{ i18n.secondPwdText }}</span>
          </div> -->
          <div class="n-form-title">{{ i18n.secondPwdText }}</div>
           <div class="v-form-item-box">
            <div class="v-form-item g-flex-align-center">
              <div class="v-form-item-left g-flex-align-center">
                <!-- <i class="iconfont icon-ziyuanxhdpi"></i> -->
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
        </div>
        

        <!-- 验证码 -->
        <div class="n-form-box">
          <div class="n-form-title">{{ i18n.codeText }}</div>
          <div class="v-form-item-box">
            <!-- <div class="v-form-item-box-title">
              <span>{{ i18n.codeText }}</span>
            </div> -->
            <div class="v-form-item g-flex-align-center">
              <div class="v-form-item-left g-flex-align-center">
                <!-- <i class="iconfont icon-yanzhengma"></i> -->
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
        </div>
        <!-- <div class="v-form-btn-box">
          <div @click="apiForgetPwdHandel" class="v-form-btn g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.submitBtnText }}</span>
          </div>
        </div> -->
        <div class="n-btn-list" style="padding: 30px 0px; position: fixed; bottom: 20px; right: 30px;">
          <div></div>
          <div class="v-form-btn-box">
            <div @click="apiForgetPwdHandel" class="v-form-btn g-flex-align-center g-flex-justify-center">
              <img src="/images/btn-right.png"/>
            </div>
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
 background-color: #202021;
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
        color: var(--g-black);
      }
    }
    .v-head-title {
      flex: 1;
      height: 100%;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
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

  .v-foget-pwd-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    z-index: 1;
    .v-nav-list {
      padding: 0 20px;
      margin-top: 20px;
      .v-nav-item {
        font-weight: 600;
        color: var(--g-black);
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
      padding-top: 5px;
      .v-form-item-box {
        .v-form-item-box-title {
          font-size: 14px;
          margin-top: 20px;
          color: var(--g-black);
        }
        .v-form-item {
        // margin-top: 10px;
          width: 100%;
          height: 30px!important;
          // background: var(--g-white);
          // border-radius: 4px;
          // border: 1px solid #e4e7ed;
          color: #fff;

          &:nth-of-type(1) {
            // margin-top: 15px;
          }

          .v-form-item-left {
            height: 100%;
            // padding: 0 10px 0 15px;
            .v-form-item-left-text {
              font-size: 14px;
              font-weight: 700;
              color: #fff;
            }
            .iconfont {
              font-size: 18px;
              color: var(--g-black);
            }
          }

          .v-form-item-middle-input {
            height: 100%;
            flex: 1;
            margin-left: 10px;

            input {
              height: 100%;
              width: 100%;
              background-color: transparent;
              font-size: 14px;
              font-weight: 400;
              // color: var(--g-black);
              border: none;
              outline: none;

              &::placeholder {
                // color: var(--g-black);
                font-size: 14px;
              }
            }
          }

          .v-form-item-middle-right {
            padding: 0 15px 0 10px;
            height: 100%;

            .iconfont {
              font-size: 18px;
              color: #c0c4cc;
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
            color: #fff;
          }
        }
      }
    }
  }
}
</style>