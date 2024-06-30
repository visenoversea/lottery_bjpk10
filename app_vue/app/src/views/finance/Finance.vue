<template>
  <div class="v_mycenter g-flex-column">
    <div class="v-mycenter-head g-flex-align-center">
        <div class="v-mycenter-head-left g-flex-align-center">
          <div @click.stop="changeAvatarClick" class="v-mycenter-head-left-img g-flex-align-center">
            <img :src="userInfo.avatar" alt="" />
          </div>
          <div class="v-mycenter-head-left-content">
            <div class="v-mycenter-head-left-username">
              Hi,{{ userInfo.user_name }}
            </div>
            <div @click.stop="copyClick(userInfo.id)" class="v-mycenter-head-left-id g-flex-align-center">
              <span>ID:</span>
              <span>{{ userInfo.id }}</span>
              <div class="v-mycenter-id-copy g-flex-align-center">
                <img src="/img/icon/copy.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="v-mycenter-head-right">
          <i class="iconfont icon-you"></i>
        </div>
      </div>
    <div class="v-mycenter-container">
      <div class="v-mycenter-top-card">
        <div class="v-mycenter-top-card-list g-flex-align-center">
          <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
            <div class="v-mycenter-top-card-item-val">
              <span>{{ Number(totalInfo.totalAmount).toFixed(2) }}</span>
            </div>
            <div class="v-mycenter-top-card-item-title">
              <span>{{ i18n.zongyuerText }}</span>
            </div>
          </div>
          <div class="v-mycenter-top-card-item g-flex-column g-flex-align-center">
            <div class="v-mycenter-top-card-item-val">
              <span>{{ Number(totalInfo.todayProfit).toFixed(2) }}</span>
            </div>
            <div class="v-mycenter-top-card-item-title">
              <span>{{ i18n.jingriYingKuiText }}</span>
            </div>
          </div>
        </div>
        </div>
      <div class="v-mycenter-content-list">
         <!-- 钱包 -->
         <!-- <div @click="itemClick('rechargeselect')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/qianbao.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>钱包</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div> -->
        <!-- 充值 -->
        <div @click="itemClick('rechargeselect')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/recharge.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.chongzhiText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- 提现 -->
        <div @click="itemClick('cashoutselect')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/withdraw.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.tixianText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- 明细 -->
        <div @click="itemClick('mybill')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/Trade.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.mingxitouzhuText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- 充值记录 -->
        <div @click="itemClick('rechargehistory')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/Trade.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.rechargeHistoryText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

         <!-- 充值记录 -->
         <div @click="itemClick('cashouthistory')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/Trade.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.cashoutHistoryText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- 身份认证 -->
        <!-- <div @click="userRealClick" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-userreal.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.shengfengRengZhengText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div :class="filtersRealStatusClass(userInfo.userReal.status)" class="v-mycenter-content-right-text">
              <span>{{ filtersRealStatus() }}</span>
            </div>
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div> -->
        <!-- 安全中心 -->
        <div @click="itemClick('safecenter')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-safe.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.safeCenterText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- 邀请好友 -->
        <!-- <div @click="itemClick('share')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-invite.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.inviteFriendText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div> -->
        <!-- 语言设置 -->
        <div @click="itemClick('languageset')" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-language.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.yuyanSetText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-text">
              <span>{{ selectLangObj.name }}</span>
            </div>
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- 关于我们 -->
        <!-- <div @click="ruleClick(1)" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-about-us.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.aboutUsText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div> -->

        <!-- 下载APP -->
        <!-- <div @click="downClick" class="v-mycenter-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-mycenter-content-item-left g-flex-align-center">
            <div class="v-mycenter-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-down.png" alt="" />
            </div>
            <div class="v-mycenter-content-left-text">
              <span>{{ i18n.xiazaiAppText }}</span>
            </div>
          </div>
          <div class="v-mycenter-content-item-right g-flex-align-center">
            <div class="v-mycenter-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div> -->
        
      </div>

      <div class="v-mycenter-exit-login-box g-flex-align-center g-flex-justify-center">
        <div @click="exitClick" class="v-mycenter-exit-login g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.tuichuLoginText }}</span>
        </div>
      </div>
    </div>
    <OssUpload MidrPath="/avatar/" idString="c-avatar-upload-1" @emitUploadSuccess="emitUploadSuccess"
      ref="refOssUpload" />
  </div>
</template>

<script setup>
import OssUpload from '@/components/OssUpload.vue'
import { apiGetUserInfo, apiGetTotalInfo, apiChangeAvatar } from '@/utils/api.js'
import { dotDealWith, filtersRealStatusClass, formatDate, copyClick, upDownClass, upDownBgClass, filtersZhangfu, kefuClick, upDownBgFontColorClass } from "@/utils/index.js";
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
import { Dialog, ImagePreview, Toast } from 'vant';
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("finance");
});

const refOssUpload = ref(null)

function changeAvatarClick() {
  refOssUpload.value.onUploadClick()
}
function emitUploadSuccess(url) {
  console.log('url', url)
  apiChangeAvatarHandel(url)
}

async function apiChangeAvatarHandel(avatar) {
  store.loadingShow = true
  const { success, data } = await apiChangeAvatar({ avatar })
  if(!success) return
  Toast(data.msg)
  apiGetUserInfoHandel()
  console.log(data)
}

function downClick() {
  window.location.href = store.system.downUrl
}

function userRealClick() {
  if(!store.token) return router.push({ name: 'login' })
  if((!userInfo.value.userReal.id) || userInfo.value.userReal.status == 0) return router.push({ name: 'userreal' })
  if(userInfo.value.userReal.status == 1) return Toast(i18n.value.userRealSuccessTipsText)
  if(userInfo.value.userReal.status == 2) return Toast(i18n.value.userRealIngTipsText)
}

function itemClick(name) {
  router.push({ name: name })
}
function ruleClick(id) {
  router.push({ name: 'rule', query: { id: id } })
}

function exitClick(item) {
  Dialog.confirm({
    title: '',
    message: i18n.value.exitLoginOutTipsText,
    confirmButtonColor: '#FF2742'
  })
    .then(() => { store.logout() }).catch(() => { });
}


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

let totalInfo = reactive({
  "totalAmount": '0.00',
  "betBmount": "0.00",
  "winAmount": "0.00",
  "todayProfit": "0.00",
})

async function apiGetTotalInfoHandel() {
  const { success, data } = await apiGetTotalInfo()
  if(!success) return
  Object.assign(totalInfo, data.info)
  console.log(data)
}

apiGetTotalInfoHandel()

function filtersRealStatus() {
  // status 0 认证失败
  // status 1 认证成功
  // status 2 认证中
  if((!userInfo.value.userReal.id)) return i18n.value.noRenzhengText
  if (userInfo.value.userReal.status == 0) return i18n.value.statusFailText
  if (userInfo.value.userReal.status == 1) return i18n.value.statusSuccessText
  if (userInfo.value.userReal.status == 2) return i18n.value.statusIngText
}

let selectLangObj = computed(() => {
  console.log("store.lang", store.lang);
  if (!store.langList.length) return {};
  var target = store.langList.find((item) => item.code == store.lang);
  console.log("target", target);
  if (target) return target;
  else return store.langList[0];
});
</script>

<style lang='scss'>
.v_mycenter {
  height: 100%;
  overflow: auto;
  background: var(--g-main_bgColor);
  .v-mycenter-head {
      height: 160px;
      padding: 0px 15px;
      background: #1C1C34;
      border-radius: 0 0 15% 15%;
      z-index: 20;
      width: 100%;
      top: 0;
      position: absolute;
      .v-mycenter-head-left {
        flex: 1;
        overflow: hidden;
        flex-shrink: 1;

        .v-mycenter-head-left-img {
          padding-right: 8px;

          img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            object-fit: cover;
          }
        }

        .v-mycenter-head-left-content {
          flex: 1;

          .v-mycenter-head-left-username {
            padding-right: 10px;
            width: 100%;
            line-height: 24px;
            font-size: 18px;
            color: var(--g-white);
            @include textManyOverflow();
          }

          .v-mycenter-head-left-id {
            max-width: 140px;
            margin-top: 5px;
            color: var(--g-white);
            font-size: 14px;
            line-height: 18px;
            .v-mycenter-id-copy {
              img {
                width: 14px;
                margin-left: 4px;
              }
            }
          }

        }
      }

      
      .v-mycenter-head-right {
        .iconfont {
          color: var(--g-white);
          font-size: 18px;
        }
      }
    }
  .v-mycenter-container {
    flex: 1;
    overflow: auto;
    padding: 0 10px;
    margin-top: 130px;
    width: 100%;
    z-index: 22;
    .v-mycenter-top-card {
      background: var(--g-white);
      padding: 15px 10px;
      border-radius: 6px;
      .v-mycenter-top-card-list {
        height: 50px;
        .v-mycenter-top-card-item {
          flex: 1;
          line-height: 18px;
          color: var(--g-black);
          font-size: 13px;
          position: relative;
          font-size: 16px;
          .v-mycenter-top-card-item-title {
            padding-top: 5px;
            text-align: center;
            font-size: 14px;
          }
          .v-mycenter-top-card-item-val {
            color: var(--g-main_color);
          }
          //&:nth-of-type(1) {
          //  &::after {
          //    content: "";
          //    position: absolute;
          //    right: 0;
          //    top: 4px;
          //    width: 1px;
          //    height: 30px;
          //    background: #cececf;
          //  }
          //}
        }
      }
    }
    .v-mycenter-content-list {
      border-radius: 6px;
      margin-top: 10px;
      background: var(--g-white);
      .v-mycenter-content-item {
        padding: 11px 9px;
        border-bottom: 0.8px solid #F3F3F3;

        .v-mycenter-content-item-left {
          .v-mycenter-content-left-img {
            padding-right: 4px;

            img {
              width: 22px;
            }
          }

          .v-mycenter-content-left-text {
            padding-left: 6px;
            color: var(--g-black);
            font-size: 14px;
          }
        }

        .v-mycenter-content-item-right {
          .v-mycenter-content-right-text {
            font-size: 12px;
            color: var(--g-black);
            padding-right: 4px;
          }

          .v-mycenter-content-right-icon {
            .iconfont {
              font-size: 18px;
              color: #bbb;
            }
          }
        }
      }
    }

    .v-mycenter-exit-login-box {
      margin-top: 10px;
      padding: 10px 10px;
      width: 100%;

      .v-mycenter-exit-login {
        background: var(--g-main_color);
        width: 100%;
        height: 40px;
        color: var(--g-white);
        font-size: 14px;
        border-radius: 4px;
      }
    }
  }

}</style>