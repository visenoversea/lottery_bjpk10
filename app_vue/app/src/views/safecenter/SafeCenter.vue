<template>
  <div class="v_safe_center g-flex-column n-bg">
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

    <div class="v-safe-center-container">
      <div class="v-safe-center-list">
         <div @click="bindEmailClick" class="v-safe-center-item g-flex-align-center g-flex-justify-between">
          <div class="v-safe-center-item-left">
            {{ i18n.emailText }}
          </div>
          <div class="v-safe-center-item-right g-flex-align-center">
            <div v-show="userInfo.email" class="v-safe-center-item-right-have">
              {{ userInfo.email }}
            </div>
            <div v-show="!userInfo.email" class="v-safe-center-item-right-no g-flex-align-center">
              <img src="/img/icon/user_icon_tips.png" alt="" />
              <span>{{ i18n.noBindeText }}</span>
            </div>
            <div class="v-safe-center-item-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- <div @click="bindMobileClick" class="v-safe-center-item g-flex-align-center g-flex-justify-between">
          <div class="v-safe-center-item-left">
            {{ i18n.mobileText }}
          </div>
          <div class="v-safe-center-item-right g-flex-align-center">
            <div v-show="userInfo.mobile" class="v-safe-center-item-right-have">
              +{{ userInfo.area_code }} {{ userInfo.mobile }}
            </div>
            <div v-show="!userInfo.mobile" class="v-safe-center-item-right-no g-flex-align-center">
              <img src="/img/icon/user_icon_tips.png" alt="" />
              <span>{{ i18n.noBindeText }}</span>
            </div>
            <div class="v-safe-center-item-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div> -->


        <div @click="busPwdClick" class="v-safe-center-item g-flex-align-center g-flex-justify-between">
          <div class="v-safe-center-item-left">
            {{ i18n.busPwdText }}
          </div>
          <div class="v-safe-center-item-right g-flex-align-center">
            <div v-show="userInfo.fundPasswordStatus == 0" class="v-safe-center-item-right-no g-flex-align-center">
              <img src="/img/icon/user_icon_tips.png" alt="" />
              <span>{{ i18n.noSetText }}</span>
            </div>
            <div class="v-safe-center-item-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <div @click="loginPwdClick" class="v-safe-center-item g-flex-align-center g-flex-justify-between">
          <div class="v-safe-center-item-left">
            {{ i18n.loginPwdText }}
          </div>
          <div class="v-safe-center-item-right g-flex-align-center">
            <div v-show="userInfo.passwordStatus == 0" class="v-safe-center-item-right-no g-flex-align-center">
              <img src="/img/icon/user_icon_tips.png" alt="" />
              <span>{{ i18n.noSetText }}</span>
            </div>
            <div class="v-safe-center-item-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <!-- <div @click="$router.push({ name: 'bankcardlist' })"
          class="v-safe-center-item g-flex-align-center g-flex-justify-between">
          <div class="v-safe-center-item-left">
            {{ i18n.backCardText }}
          </div>
          <div class="v-safe-center-item-right g-flex-align-center">
            <div class="v-safe-center-item-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div> -->

        <!-- <div @click="$router.push({ name: 'walletlist' })"
          class="v-safe-center-item g-flex-align-center g-flex-justify-between">
          <div class="v-safe-center-item-left">
            {{ i18n.mywalletText }}
          </div>
          <div class="v-safe-center-item-right g-flex-align-center">
            <div class="v-safe-center-item-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRoute, useRouter } from 'vue-router';
import { apiGetUserInfo } from '@/utils/api.js'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('safecenter')
})
const router = useRouter()

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

function bindEmailClick() {
  router.push({ name: 'bindemail' })
}
function bindMobileClick() {
  router.push({ name: 'bindmobile' })
}
function busPwdClick() {
  router.push({ name: 'changebuspwd' })
}
function loginPwdClick() {
  router.push({ name: 'changepwd' })
}
</script>

<style lang='scss'>
.v_safe_center {
  height: 100%;
  overflow: auto;
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: var(--g-white);

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

  .v-safe-center-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-safe-center-list {
      padding: 15px;
      .v-safe-center-item {
        // background: #203036;
        padding: 15px 10px;
        border-bottom: 0.8px solid #e4e7ed;
        .v-safe-center-item-left {
          font-size: 14px;
          color: #fff;
        }
        .v-safe-center-item-right {
          .v-safe-center-item-right-have {
            color: var(--g-grey);
            font-size: 14px;
          }

          .v-safe-center-item-right-no {
            font-size: 14px;
            color: #E7464D;

            span {
              padding-left: 5px;
            }

            img {
              width: 18px;
            }
          }

          .v-safe-center-item-right-icon {
            padding-left: 4px;
            .iconfont {
              font-size: 18px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}</style>