<template>
  <div class="v_login g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.push({ name: 'main' })" class="new-head-back">
        <!-- <i class="iconfont icon-zuojiantou"></i> -->
        <img
          style="width: 50px; height: 50px; border-radius: 8px"
          src="/images/back-icon.png"
          alt=""
        />
      </div>
      <div class="v-login-head-language g-flex-align-center">
        <!-- <div @click="kefuClick" class="v-login-head-language-kefu">
          <img src="/img/icon/icon_service.png" alt=""/>
        </div> -->
        <!-- <div @click="$router.push({ name: 'languageset' })" class="new-head-r">
          <i class="iconfont icon-duoyuyan"></i>
        </div> -->
        <img
          src="/images/kefu.png"
          alt=""
          @click="kefuClick"
          style="width: 50px; height: 50px; border-radius: 8px"
        />
        <img
          @click="$router.push({ name: 'languageset' })"
          style="width: 50px; height: 50px; border-radius: 8px"
          src="/images/blanguageset.png"
          alt=""
        />
      </div>
    </div>
    <img class="ch-bg" src="/images/ch-bg.png" />
    <div class="v-login-container">
      <div class="v-login-logo" style="display: inline-block !important">
        <!-- <div class="v-login-logo-img g-flex-align-center g-flex-justify-center">
          <img :src="store.banner.logo[1]" alt="" />
        </div> -->
        <div
          class="v-login-logo-title g-flex-align-center g-flex-justify-center"
        >
          {{ i18n.title2Text }}
        </div>
      </div>
      <div class="n-nav-list">
        <div
          @click="typeClick(1)"
          :class="form.type == 1 ? 'active' : ''"
          class="v-nav-item"
        >
          <span>{{ i18n.mobileLoginText }}</span>
        </div>
        <div
          @click="typeClick(0)"
          :class="form.type == 0 ? 'active' : ''"
          class="v-nav-item"
        >
          <span>{{ i18n.accountLoginText }}</span>
        </div>
      </div>
      <div class="v-form">
        <div class="n-form-box" v-show="form.type == 0">
          <div class="n-form-title">{{ i18n.emailAccountText }}</div>
          <!-- 用户名 -->
          <div v-show="form.type == 0" class="v-form-item">
            <div class="v-form-item-middle-input">
              <input
                type="text"
                v-model="form.account"
                :placeholder="i18n.emailAccountPlaceholderText"
              />
            </div>
          </div>
        </div>

        <!-- 手机 -->
        <div class="n-form-box" v-show="form.type == 1">
          <div class="n-form-title">{{ i18n.mobileText }}</div>
          <div class="v-form-item-box">
            <div class="v-form-item g-flex-align-center">
              <div
                @click="selectAreaClick"
                class="v-form-item-left g-flex-align-center"
                style="padding-left: 17px !important"
              >
                <span class="v-form-item-left-text">+{{ form.area_code }}</span>
                <i class="iconfont icon-right-1-copy"></i>
              </div>
              <div class="v-form-item-middle-input">
                <input
                  type="text"
                  v-model="form.mobile"
                  :placeholder="i18n.mobilePlaceholderText"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 密码 -->
        <div class="n-form-box">
          <div class="n-form-title">{{ i18n.pwdText }}</div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-middle-input">
              <input
                :type="pwdSeeeVal ? 'text' : 'password'"
                v-model="oldpassword"
                :placeholder="i18n.pwdPlaceholderText"
              />
            </div>
            <div
              @click="pwdSeeeVal = !pwdSeeeVal"
              class="v-form-item-middle-right g-flex-align-center"
            >
              <i v-show="!pwdSeeeVal" class="iconfont icon-bukejian"></i>
              <i v-show="pwdSeeeVal" class="iconfont icon-kejian"></i>
            </div>
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
        <div class="n-form-box">
          <div class="n-form-title">{{ i18n.codeText }}</div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-middle-input">
              <input
                type="text"
                v-model="form.code"
                :placeholder="i18n.codePlaceholderText"
              />
            </div>
            <div
              @click="apiGetImgCodeHandel"
              class="v-form-item-middle-right g-flex-align-center"
            >
              <img :src="codeImgUrl" alt="" />
            </div>
          </div>
        </div>
        <!-- <div class="v-form-btn-box">
          <div @click="apiLoginHandel" class="v-form-btn g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.loginBtnText }}</span>
          </div>
        </div> -->

        <!-- <div class="v-form-btn-box v-form-btn-down-box">
          <div class="v-form-btn g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.downAppText }}</span>
          </div>
        </div> -->

        <!-- <div class="v-form-bottom g-flex-align-center g-flex-justify-between">
          <div class="v-form-bottom-item g-flex-align-center">
            <div class="v-form-bottom-item-title">
              <span>{{ i18n.noAccountText }}</span>
            </div>
            <div @click="$router.push({ name: 'register' })" class="v-form-bottom-item-val">
              <span>{{ i18n.registerText }}</span>
            </div>
          </div>
          <div @click="$router.push({ name: 'forgetpwd' })" class="v-form-bottom-item g-flex-align-center">
            <div class="v-form-bottom-item-val">
              <span>{{ i18n.forgetText }}</span>
            </div>
          </div>
        </div> -->
        <div
          class="v-form-bottom g-flex-align-center g-flex-justify-between"
          style="float: right; font-weight: bold"
        >
          <!-- <div class="v-form-bottom-item g-flex-align-center">
            <div class="v-form-bottom-item-title">
              <span>{{ i18n.noAccountText }}</span>
            </div>
            
          </div> -->
          <div
            @click="$router.push({ name: 'forgetpwd' })"
            class="v-form-bottom-item g-flex-align-center"
          >
            <div class="v-form-bottom-item-val" style="color: #544277">
              {{ i18n.forgetText }}
            </div>
          </div>
        </div>
        <div class="n-btn-list" style="margin-top: 150px">
          <div class="n-btn-list-l" @click="$router.push({ name: 'register' })">
            <span>{{ i18n.registerText }}</span>
          </div>
          <div class="v-form-btn-box">
            <div
              @click="apiLoginHandel"
              class="v-form-btn g-flex-align-center g-flex-justify-center"
            >
              <!-- <span>{{ i18n.loginBtnText }}</span> -->
              <img src="/images/btn-right.png" />
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="v-login-footer-tips g-flex-justify-center g-flex-align-center">
        <span>官方客服邮箱：</span>
        <span>deficstcs@gmail.com</span>
      </div> -->
    </div>

    <BindPhonesPop
      ref="refBindPhonesPop"
      :list="areaList.list"
      @emitPhoneItemClick="emitPhoneItemClick"
    />
  </div>
</template>
  
<script setup>
import { kefuClick } from "@/utils/index.js";
import {
  apiSendMobileCode,
  apiSendEmailCode,
  apiGetAreaList,
  apiLogin,
  apiGetKefuConfig,
  apiGetImgCode,
} from "@/utils/api.js";
import { ref, reactive, watch, computed, onMounted } from "vue";
import useStore from "@/store/index.js";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { Toast } from "vant";
import BindPhonesPop from "@/components/BindPhonesPop.vue";
import { WebSocketInstance } from "@/utils/web_socket.js";

// pinia 状态管理仓库
const store = useStore();

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("login");
});

const i18n2 = computed(() => {
  return i18nObj.tm("gongyong");
});
const route = useRoute();
const router = useRouter();

let oldpassword = ref("");
let form = reactive({
  type: 1, //0 用户名邮箱  1 手机登录 2 手机验证码登录  3邮箱验证码登录
  area_code: "",
  mobile: "",
  // email: '',
  account: "",
  password: "",
  code: "",
  codeKey: "",
});

function getParams() {
  let tid = route.query.tid;
  if (tid) {
    window.localStorage.setItem("tid", tid);
  }
}
getParams();

function typeClick(val) {
  form.type = val;
}

let pwdSeeeVal = ref(false);

let timer = ref(0);

let sendCodeText = ref("");

sendCodeText.value = i18n2.value.sendCodeText;

// 获取验证码
function getCode() {
  if (timer.value) return;
  if (form.type == 1) {
    apiSendMobileCodeHandel();
  } else if (form.type == 2) {
    apiSendEmailCodeHandel();
  }
}

// 获取手机验证码
async function apiSendMobileCodeHandel() {
  store.loadingShow = true;
  const { success, data } = await apiSendMobileCode({
    area_code: form.area_code,
    mobile: form.mobile,
  });
  if (!success) return;
  let timeNum = 60;
  Toast(data.msg);
  timer.value = setInterval(() => {
    timeNum--;
    sendCodeText.value =
      timeNum === 0 ? i18n2.value.againSendCodeText : timeNum + "s";
    if (timeNum === 0) {
      clearInterval(timer.value);
      timer.value = 0;
    }
  }, 1000);
}

// 获取邮箱验证码
async function apiSendEmailCodeHandel() {
  store.loadingShow = true;
  const { success, data } = await apiSendEmailCode({ email: form.email });
  if (!success) return;
  let timeNum = 60;
  Toast(data.msg);
  timer.value = setInterval(() => {
    timeNum--;
    sendCodeText.value =
      timeNum == 0 ? i18n2.value.againSendCodeText : timeNum + "s";
    if (timeNum === 0) {
      clearInterval(timer.value);
      timer.value = 0;
    }
  }, 1000);
}

let areaList = reactive({ list: [] });

apiGetAreaListHandel();
const refBindPhonesPop = ref(null);
function selectAreaClick() {
  refBindPhonesPop.value.onShow();
}
// 选择区号触发
function emitPhoneItemClick(item) {
  form.area_code = item.area_code;
}
// 获取区号列表
async function apiGetAreaListHandel() {
  const { success, data } = await apiGetAreaList();
  if (!success) return;
  areaList.list = data.list;
  form.area_code = data.list[0].area_code;
}

// 登录
async function apiLoginHandel() {
  store.loadingShow = true;
  // form.password = store.encodeString(oldpassword.value)
  form.password = oldpassword.value;

  const { success, data } = await apiLogin(form);
  //console.log(data)
  if (!success) {
    apiGetImgCodeHandel();
    return;
  }
  // let token = store.changeToken(data.token)
  let token = data.token;

  WebSocketInstance.setToken(token);
  store.setToken(token);
  Toast(data.msg);
  apiGetKefuConfigHandel();
  router.replace({ name: "main" });
}
async function apiGetKefuConfigHandel() {
  const { success, data } = await apiGetKefuConfig({ id: 2 });
  if (!success) return;
  store.kefu = data.info;
  console.log("store", store);
}

let codeImgUrl = ref("");
const MODE = import.meta.env.MODE;

async function apiGetImgCodeHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetImgCode();
  if (!success) return;
  form.codeKey = data.codeKey;
  codeImgUrl.value = MODE == "development" ? "/api" + data.imgUrl : data.imgUrl;
  //console.log(data)
}

onMounted(() => {
  apiGetImgCodeHandel();
  console.log("login in 88888");
  console.log(store.system.wsUrl);
  console.log(WebSocketInstance.connected);
  if (store.system.wsUrl && !WebSocketInstance.connected) {
    WebSocketInstance.connect(store.system.wsUrl, store.token);
  }
});
</script>
  
<style lang='scss'>
.v_login {
  height: 100%;
  overflow: auto;
  background-color: #202021;
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
      }
    }

    .v-login-head-language {
      position: absolute;
      height: 100%;
      right: 15px;

      // .v-login-head-language-kefu {
      //   padding: 4px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 4px;
        margin-left: 8px;
      }
      // }
      .v-login-head-language-img {
        margin-left: 5px;
        padding: 4px;
        // padding: 3px;
        // border-radius: 50%;
        // overflow: hidden;
        // background: #203036;
        .iconfont {
          font-size: 25px;
          color: var(--g-main_color);
        }
      }
    }
  }
  .new-head {
    .v-login-head-language {
      img {
        margin-left: 10px;
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
      color: #fff;
      .v-login-logo-title {
        font-size: 24px;
        font-weight: 700;
        margin-left: 20px;
      }
      .v-login-logo-img {
        img {
          height: 50px;
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
      margin-top: 40px;

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

      .v-form-item {
        // margin-top: 10px;
        width: 100%;
        height: 30px !important;
        // background: var(--g-white);
        // border-radius: 4px;
        // border: 1px solid #e4e7ed;
        color: #fff;
        &:nth-of-type(1) {
          // margin-top: 10px;
        }

        .v-form-item-left {
          height: 100%;
          padding: 0 10px 0 15px;

          .v-form-item-left-text {
            font-size: 14px;
            font-weight: 700;
            color: #fff;
          }

          .iconfont {
            font-size: 18px;
            color: var(--g-black);
            &.icon-right-1-copy {
              font-weight: 700;
              color: #fff;
            }
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

      .v-form-btn-box {
        margin-top: 20px;
        &.v-form-btn-down-box {
          margin-top: 10px;
        }
        .v-form-btn {
          font-size: 14px;
          width: 100%;
          height: 40px;
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

    .v-login-footer-tips {
      position: absolute;
      bottom: 40px;
      font-size: 12px;
      width: 100%;
    }
  }
}
</style>