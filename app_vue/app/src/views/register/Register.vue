<template>
  <div class="v_register g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <img
          style="width: 50px; height: 50px; border-radius: 8px"
          src="/images/back-icon.png"
          alt=""
        />
      </div>
      <div class="v-login-head-language g-flex-align-center">
        <!-- <div class="v-register-head-language-kefu" @click="kefuClick">
          <img src="/img/icon/icon_service.png" alt=""/>
        </div> -->
        <img
          src="/images/kefu.png"
          alt=""
          @click="kefuClick"
          style="width: 50px; height: 50px; border-radius: 8px"
        />
        <img
          style="width: 50px; height: 50px; border-radius: 8px"
          @click="$router.push({ name: 'languageset' })"
          src="/images/blanguageset.png"
          alt=""
        />
      </div>
    </div>
    <img class="ch-bg" src="/images/ch-bg.png" />
    <div class="v-register-container">
      <div class="v-register-logo">
        <!-- <div class="v-register-logo-img g-flex-align-center g-flex-justify-center">
          <img :src="store.banner.logo[1]" alt="" />
        </div> -->
        <div
          class="v-register-logo-title g-flex-align-center g-flex-justify-center n-s-title"
        >
          <span>{{ i18n.title2Text }}</span>
        </div>
      </div>
      <div class="v-nav-list g-flex-align-center n-r">
        <div v-if="false">
          <div
            v-show="store.system.RegMode.includes('0')"
            @click="typeClick(0)"
            :class="form.type == 0 ? 'active' : ''"
            class="v-nav-item"
          >
            <span>{{ i18n.userNameRegText }}</span>
          </div>
          <div
            v-show="store.system.RegMode.includes('1')"
            @click="typeClick(1)"
            :class="form.type == 1 ? 'active' : ''"
            class="v-nav-item"
          >
            <span>{{ i18n.mobileRegText }}</span>
          </div>
          <div
            v-show="store.system.RegMode.includes('2')"
            @click="typeClick(2)"
            :class="form.type == 2 ? 'active' : ''"
            class="v-nav-item"
          >
            <span>{{ i18n.emailRegText }}</span>
          </div>
          <div
            v-show="store.system.RegMode.includes('3')"
            @click="typeClick(3)"
            :class="form.type == 3 ? 'active' : ''"
            class="v-nav-item"
          >
            <span>{{ i18n.mobileRegText }}</span>
          </div>
          <div
            v-show="store.system.RegMode.includes('4')"
            @click="typeClick(4)"
            :class="form.type == 4 ? 'active' : ''"
            class="v-nav-item"
          >
            <span>{{ i18n.emailRegText }}</span>
          </div>
        </div>
      </div>
      <div class="v-form">
        <!-- 用户名 -->
        <div
          class="n-form-box"
          v-show="store.system.UserShow == 1 || form.type == 0"
        >
          <div class="n-form-title">{{ i18n.usernameText }}</div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-middle-input">
              <input
                type="text"
                v-model="form.user_name"
                :placeholder="i18n.usernamePlaceholderText"
              />
            </div>
          </div>
        </div>

        <!-- 手机 -->
        <div class="n-form-box" v-show="form.type == 1 || form.type == 3">
          <div class="n-form-title">{{ i18n.mobileText }}</div>
          <div class="v-form-item g-flex-align-center">
            <div
              @click="selectAreaClick"
              class="v-form-item-left g-flex-align-center"
              style="padding-left: 17px !important"
            >
              <span class="v-form-item-left-text">+{{ form.area_code }}</span>
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

        <!-- 邮箱 -->
        <div class="n-form-box" v-show="form.type == 2 || form.type == 4">
          <div class="n-form-title">{{ i18n.emailText }}</div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-middle-input">
              <input
                type="text"
                v-model="form.email"
                :placeholder="i18n.emailPlaceholderText"
              />
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
                v-model="form.password"
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

        <!-- 确认密码 -->
        <div class="n-form-box">
          <div class="n-form-title">{{ i18n.secondPwdText }}</div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-middle-input">
              <input
                :type="pwdSecondSeeeVal ? 'text' : 'password'"
                v-model="form.password2"
                :placeholder="i18n.secondPwdPlaceholderText"
              />
            </div>
            <div
              @click="pwdSecondSeeeVal = !pwdSecondSeeeVal"
              class="v-form-item-middle-right g-flex-align-center"
            >
              <i v-show="!pwdSecondSeeeVal" class="iconfont icon-bukejian"></i>
              <i v-show="pwdSecondSeeeVal" class="iconfont icon-kejian"></i>
            </div>
          </div>
        </div>

        <!-- 邀请码 -->
        <div class="n-form-box" v-if="store.system.TidSet != 0">
          <div class="n-form-title">{{ i18n.inviteCodeText }}</div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-middle-input">
              <input
                type="text"
                v-model="form.tid"
                :placeholder="i18n.inviteCodeBiTianPlaceholderText"
              />
            </div>
          </div>
        </div>

        <!-- 验证码 -->
        <div
          class="n-form-box"
          v-show="form.type != 0 && form.type != 3 && form.type != 4"
        >
          <div class="n-form-title">{{ i18n.codeText }}</div>
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-left g-flex-align-center">
              <i class="iconfont icon-yanzhengma"></i>
            </div>
            <div class="v-form-item-middle-input">
              <input
                type="text"
                v-model="form.code"
                :placeholder="i18n.yanzhengCodeText"
              />
            </div>
            <div
              @click="getCode"
              class="v-form-item-middle-right g-flex-align-center"
            >
              <span class="v-form-item-middle-right-text">
                {{ sendCodeText }}
              </span>
            </div>
          </div>
        </div>

        <!-- 图片验证码 -->
        <div
          class="n-form-box"
          v-show="form.type == 0 || form.type == 3 || form.type == 4"
        >
          <div class="v-form-item g-flex-align-center">
            <div class="v-form-item-left g-flex-align-center">
              <i class="iconfont icon-yanzhengma"></i>
            </div>
            <div class="v-form-item-middle-input">
              <input
                type="text"
                v-model="form.code"
                :placeholder="i18n.yanzhengCodeText"
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
          <div @click="apiRegisterHandel" class="v-form-btn g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.registerBtnText }}</span>
          </div>
        </div> -->

        <div class="v-form-bottom g-flex-align-center g-flex-justify-between">
          <div class="v-form-bottom-item g-flex-align-center">
            <div class="v-form-bottom-item-title">
              <span>{{ i18n.alreadyText }}</span>
            </div>
            <div
              @click="$router.replace({ name: 'login' })"
              class="v-form-bottom-item-val"
            >
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

      <div
        class="v-register-footer-tips g-flex-justify-center g-flex-align-center"
      >
        <span> {{ i18n.registerTipsText }} </span>
        <span
          @click="$router.push({ name: 'rule', query: { id: 1 } })"
          class="v-register-footer-tips-val"
          >{{ i18n.shiyongtiaokuanText }}</span
        >
        <span>{{ i18n.andText }}</span>
        <span
          @click="$router.push({ name: 'rule', query: { id: 2 } })"
          class="v-register-footer-tips-val"
          >{{ i18n.yingsiText }}</span
        >
      </div>
    </div>
    <div class="n-btn-list" style="padding: 0 30px">
      <div></div>
      <div class="v-form-btn-box">
        <div
          @click="apiRegisterHandel"
          class="v-form-btn g-flex-align-center g-flex-justify-center"
        >
          <img src="/images/btn-right.png" />
        </div>
      </div>
    </div>

    <BindPhonesPop
      :list="areaList.list"
      @emitPhoneItemClick="emitPhoneItemClick"
      ref="refBindPhonesPop"
    />
  </div>
</template>

<script setup>
import { kefuClick } from "@/utils/index.js";
import { apiGetImgCode } from "@/utils/api.js";
import BindPhonesPop from "@/components/BindPhonesPop.vue";
import {
  apiSendMobileCode,
  apiSendEmailCode,
  apiGetAreaList,
  apiGetKefuConfig,
  apiRegister,
} from "@/utils/api.js";
import { ref, reactive, watch, computed } from "vue";
import useStore from "@/store/index.js";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { Toast } from "vant";
import { WebSocketInstance } from "@/utils/web_socket.js";

// pinia 状态管理仓库
const store = useStore();

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("register");
});

const i18n2 = computed(() => {
  return i18nObj.tm("gongyong");
});
const route = useRoute();
const router = useRouter();

let pwdSeeeVal = ref(false);

let pwdSecondSeeeVal = ref(false);

//type 1 手机 2邮箱 0用户名
// RegMode数组 0用户名 1手机 2邮箱 3手机图片验证注册 4邮箱图片验证注册
let form = reactive({
  type: Number(store.system.RegMode[0]),
  user_name: "",
  area_code: "",
  mobile: "",
  email: "",
  code: "",
  tid: "",
  password: "",
  password2: "",
  codeKey: "",
  type: "1",
});

getParams();

function getParams() {
  var tid = route.query.tid;
  if (tid) {
    window.localStorage.setItem("tid", tid);
    form.tid = tid;
  } else {
    var localTid = window.localStorage.getItem("tid");
    form.tid = localTid ? localTid : "";
  }
}

function typeClick(val) {
  form.type = val;
}

let areaList = reactive({ list: [] });
// 获取区号列表
async function apiGetAreaListHandel() {
  const { success, data } = await apiGetAreaList();
  if (!success) return;
  areaList.list = data.list;
  form.area_code = data.list[0].area_code;
}
apiGetAreaListHandel();
const refBindPhonesPop = ref(null);
function selectAreaClick() {
  refBindPhonesPop.value.onShow();
}
// 选择区号触发
function emitPhoneItemClick(item) {
  console.log("xxx", item.area_code);
  form.area_code = item.area_code;
}

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

// 注册接口
async function apiRegisterHandel() {
  if (form.password != form.password2) return Toast(i18n.value.pwdNoSame);
  store.loadingShow = true;
  const { success, data } = await apiRegister(form);
  if (!success) return apiGetImgCodeHandel();
  Toast(data.msg);
  store.setToken(data.token);
  WebSocketInstance.setToken(data.token);
  apiGetKefuConfigHandel();
  setTimeout(() => {
    router.replace({ name: "main" });
  }, 500);
  console.log(data);
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
  console.log(data);
}

apiGetImgCodeHandel();
</script>

<style lang='scss'>
.v_register {
  height: 100%;
  overflow: auto;
  background-color: #202021;
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
        font-size: 26px;
        font-weight: 700;
      }
    }

    .v-register-head-language {
      position: absolute;
      height: 100%;
      right: 15px;

      // .v-register-head-language-kefu {
      //   padding: 4px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 4px;
      }
      // }
      .v-register-head-language-img {
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
  .v-register-container {
    padding-top: 50px;
    flex: 1;
    overflow: auto;
    padding-bottom: 60px;
    position: relative;

    .v-register-logo {
      margin-top: 10px;
      color: #fff;
      .v-register-logo-title {
        font-size: 24px;
        font-weight: 700;
        margin-left: 20px;
        color: #fff;
      }
      .v-register-logo-img {
        img {
          height: 50px;
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
      margin-top: 40px;

      .v-nav-item {
        font-weight: 600;
        color: #fff;
        font-size: 16px;
        line-height: 25px;
        margin-right: 15px;

        &.active {
          color: #fff;
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
          // margin-top: 15px;
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
            width: 84px;
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
            color: #fff !important;
          }

          .v-form-bottom-item-val {
            color: #5488f7;
          }
        }
      }
    }

    .v-register-footer-tips {
      font-size: 12px;
      width: 100%;
      margin-top: 10px;
      color: #fff;
      .v-register-footer-tips-val {
        padding: 0 5px;
        color: #5488f7;
      }
    }
  }
}
</style>