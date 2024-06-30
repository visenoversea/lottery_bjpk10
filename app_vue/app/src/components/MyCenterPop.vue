<template>
<div class="c_my_center_pop">
  <van-popup safe-area-inset-bottom class="c-pop" v-model:show="show" position="left">
    <div class="c-pop-container g-flex-column">
      <div v-show="store.token && userInfo.wallet_address" class="c-pop-wallet-box g-flex-align-center g-flex-justify-end">
        <div @click="copyClick(userInfo.wallet_address)" class="c-pop-wallet-address g-flex-align-center g-flex-justify-center">
          <i class="iconfont icon-lianjie"></i>
          <div class="c-pop-wallet-address-val">
            {{ userInfo.wallet_address }}
          </div>
        </div>
      </div>
      <div class="c-pop-head g-flex-align-center">
        <div class="c-pop-head-img">
          <img :src="store.banner.logo[0]" alt=""/>
        </div>
        <div class="c-pop-head-right">
          <div class="c-pop-head-right-title g-flex-align-center">
            <span>{{ i18n.welcomeText }}</span>
            <span class="c-pop-head-right-webtitle g-blue">{{ store.system.WebTitle }}</span>
          </div>
          <div v-if="store.token" class="c-pop-head-right-id">
            ID: {{ userInfo.id }}
          </div>
          <div v-if="store.token" class="c-pop-head-right-id">
            {{ i18n.xinyongText }}: 100
          </div>
        </div>
      </div>

      <div class="c-pop-content">
        <ul class="c-pop-content-list">
          <!-- 推广中心 -->
          <li v-show="store.system.TidSet == 1" @click="itemClick('tuiguang')" class="c-pop-content-item g-flex-align-center">
            <div class="c-pop-content-item-left">
              <img src="/img/icon/tuiguang.png" alt="" />
            </div>
            <div class="c-pop-content-item-center">
              <span>{{ i18n.tuiguangText }}</span>
            </div>
            <div class="c-pop-content-item-right">
              <i class="iconfont icon-xiangyou1"></i>
            </div>
          </li>
          <!-- 我要分享 -->
          <li v-show="store.system.TidSet == 1" @click="itemClick('share')" class="c-pop-content-item g-flex-align-center">
            <div class="c-pop-content-item-left">
              <img src="/img/icon/share.png" alt="" />
            </div>
            <div class="c-pop-content-item-center">
              <span>{{ i18n.shareText }}</span>
            </div>
            <div class="c-pop-content-item-right">
              <i class="iconfont icon-xiangyou1"></i>
            </div>
          </li>
          <!-- 身份认证 -->
          <li @click="userRealClick" class="c-pop-content-item g-flex-align-center">
            <div class="c-pop-content-item-left">
              <img src="/img/icon/shenfeng.png" alt="" />
            </div>
            <div class="c-pop-content-item-center">
              <span>{{ i18n.userRealText }}</span>
            </div>
            <div class="c-pop-content-item-right">
              <i class="iconfont icon-xiangyou1"></i>
            </div>
          </li>
          <!-- 安全中心 -->
          <li @click="itemClick('safecenter')" class="c-pop-content-item g-flex-align-center">
            <div class="c-pop-content-item-left">
              <img src="/img/icon/safecenter.png" alt="" />
            </div>
            <div class="c-pop-content-item-center">
              <span>{{ i18n.safeText }}</span>
            </div>
            <div class="c-pop-content-item-right">
              <i class="iconfont icon-xiangyou1"></i>
            </div>
          </li>
          <!-- 在线客服 -->
          <li @click="kefuClick" class="c-pop-content-item g-flex-align-center">
            <div class="c-pop-content-item-left">
              <img src="/img/icon/kefu.png" alt="" />
            </div>
            <div class="c-pop-content-item-center">
              <span>{{ i18n.zaixiangkefuText }}</span>
            </div>
            <div class="c-pop-content-item-right">
              <i class="iconfont icon-xiangyou1"></i>
            </div>
          </li>
          <!-- 服务条款 -->
          <li @click="itemClick('tiaokuanfuwu')" class="c-pop-content-item g-flex-align-center">
            <div class="c-pop-content-item-left">
              <img src="/img/icon/fuwu.png" alt="" />
            </div>
            <div class="c-pop-content-item-center">
              <span>{{ i18n.fuwutiaokuanText }}</span>
            </div>
            <div class="c-pop-content-item-right">
              <i class="iconfont icon-xiangyou1"></i>
            </div>
          </li>
        </ul>
      </div>
      <div v-show="store.token" class="c-pop-exit-box g-flex-justify-center">
        <div @click="exitClick" class="c-pop-exit g-flex-align-center g-flex-justify-center">
          {{ i18n.exitLoginText }}
        </div>
      </div>
      <div v-show="!store.token" class="c-pop-exit-box g-flex-justify-center">
        <div @click="$router.push({ name: 'login' })" class="c-pop-exit c-pop-login-btn g-flex-align-center g-flex-justify-center">
          {{ i18n.gologinText }}
        </div>
      </div>
    </div>
  </van-popup>
</div>
</template>

<script setup>
import { kefuClick, copyClick } from "@/utils/index";
import { apiGetUserInfo } from '@/utils/api.js'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
import { Toast, Dialog  } from 'vant'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('myCenterPop')
})

const route = useRoute()
const router = useRouter()
let show = ref(false)
function onShow() {
  if(store.token) {
    apiGetUserInfoHandel()
  }
  show.value = true
}

function onClose() {
  show.value = false
}

function itemClick(name) {
  router.push({ name: name })
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

function userRealClick() {
  if(!store.token) return router.push({ name: 'login' })
  if((!userInfo.value.userReal.id) || userInfo.value.userReal.status == 0) return router.push({ name: 'userreal' })
  if(userInfo.value.userReal.status == 1) return Toast(i18n.value.userRealSuccessTipsText)
  if(userInfo.value.userReal.status == 2) return Toast(i18n.value.userRealIngTipsText)
}

function exitClick() {
  Dialog.confirm({
    title: i18n.value.exitLoginTipsText,
    confirmButtonColor: '#FF2742',
  })
  .then(() => {
    store.logout()
  })
  .catch(() => {
  });
}

defineExpose({
  onShow
})
</script>

<style lang='scss'>
.c_my_center_pop {
  .van-overlay {
    filter: blur(0.08rem);
    -webkit-backdrop-filter: blur(.08rem);
    backdrop-filter: blur(0.08rem);
    background-color: rgba(0,0,0,.2);
  }

  .c-pop {
    height: 100%;
    .c-pop-container {
      height: 100%;
      overflow: auto;
      .c-pop-wallet-box {
        width: 100%;
        padding: 30px 15px 0 15px;
        .c-pop-wallet-address {
          width: 120px;
          height: 30px;
          background: #f4f4f4;
          border-radius: 30px;
          padding: 0 12px;
          overflow: hidden;
          .iconfont {
            color: #161616;
            font-size: 18px;
          }
          .c-pop-wallet-address-val {
            color: #161616;
            font-size: 14px;
            flex: 1;
            @include textManyOverflow();
          }
        }
      }
      .c-pop-head {
        padding: 20px 20px 0 20px;
        .c-pop-head-img {
          img {
            width: 50px;
            height: 50px;
          }
        }
        .c-pop-head-right {
          flex: 1;
          padding-left: 10px;
          .c-pop-head-right-title {
            font-size: 17px;
            line-height: 26px;
            color: #333;
            padding-bottom: 6px;
            .c-pop-head-right-webtitle {
              padding-left: 4px;
            }
          }
          .c-pop-head-right-id {
            color: #7d919d;
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
      .c-pop-content {
        flex: 1;
        overflow: auto;
        padding-top: 40px;
        .c-pop-content-list {
          padding: 0 30px;
          .c-pop-content-item {
            padding-bottom: 30px;
            overflow: hidden;
            .c-pop-content-item-left {
              img {
                width: 22px;
                height: 22px;
                object-fit: contain;
              }
            }
            .c-pop-content-item-center {
              flex: 1;
              padding-left: 15px;
              font-size: 17px;
              line-height: 22px;
              @include textManyOverflow();
            }
            .c-pop-content-item-right {
              padding-left: 15px;
              font-size: 20px;
              font-weight: 700;
            }
          }
        }
      }
      .c-pop-exit-box {
        padding-bottom: 50px;
        padding-top: 20px;
        .c-pop-exit {
          height: 40px;
          width: 80%;
          background: #dbdbdb;
          font-size: 17px;
          color: var(--g-less-black);
          border-radius: 6px;
          &.c-pop-login-btn {
            background-color: var(--g-main_color);
            color: var(--g-white);
          }
        }
      }
    }
  }
}
</style>