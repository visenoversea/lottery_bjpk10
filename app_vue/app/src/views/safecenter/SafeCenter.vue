<template>
  <div class="v_safe_center">
    <div class="v-head g-flex-justify-center g-flex-align-center">
    <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
      <i class="iconfont icon-zuojiantou"></i>
    </div>
    <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

    <!-- <div @click="$router.push({ name: 'exchangehistory'})" class="v-head-right g-flex-align-center">
      <i class="iconfont icon-datijilu"></i>
    </div> -->
  </div>
    <div class="v-safe-center-container">
      <div class="v-safe-center-list">
        <!-- <div @click="bindEmailClick" class="v-safe-center-item g-flex-align-center g-flex-justify-between">
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
              <img src="/img/icon/user_icon_enter.png" alt="" />
            </div>
          </div>
        </div> -->

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
              <img  src="/img/icon/user_icon_enter.png" alt="" />
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
              <img src="/img/icon/user_icon_enter.png" alt="" />
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
              <img src="/img/icon/user_icon_enter.png" alt="" />
            </div>
          </div>
        </div>

        <!-- <div @click="$router.push({ name: 'bankcardlist'})"  class="v-safe-center-item g-flex-align-center g-flex-justify-between">
          <div class="v-safe-center-item-left">
            {{ i18n.backCardText }}
          </div>
          <div class="v-safe-center-item-right g-flex-align-center">
            <div class="v-safe-center-item-right-icon g-flex-align-center">
              <img src="/img/icon/user_icon_enter.png" alt="" />
            </div>
          </div>
        </div> -->
        
        <!-- <div @click="$router.push({ name: 'walletlist'})"  class="v-safe-center-item g-flex-align-center g-flex-justify-between">
          <div class="v-safe-center-item-left">
            {{ i18n.mywalletText }}
          </div>
          <div class="v-safe-center-item-right g-flex-align-center">
            <div class="v-safe-center-item-right-icon g-flex-align-center">
              <img src="/img/icon/user_icon_enter.png" alt="" />
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
    height: 50px;
    width: 100%;
    line-height: 50px;
    position: fixed;
    top: 0;
    background-color: var(--g-white);
    font-size: 14px;
    color: var(--g-less-black);
    z-index: 999;

    .v-head-back-icon {
      position: absolute;
      height: 100%;
      left: 0;
      padding: 15px;

      .iconfont {
        position: absolute;
        font-size: 26px;
        left: 10px;
        font-weight: 700;
      }
    }

    .v-title {
      font-size: 18px;
      flex: 1;
      height: 100%;
      font-weight: 600;
    }

    .v-head-right {
      position: absolute;
      height: 100%;
      right: 15px;

      .iconfont {
        font-size: 22px;
      }
    }
  }

  .v-safe-center-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-title {
      padding: 20px 15px 15px 15px;
      font-size: 22px;
      line-height: 26px;
      color: #333;
      font-weight: 600;
    }

    .v-safe-center-list {
      padding: 15px;

      .v-safe-center-item {
        padding: 15px 0;
        border-bottom: 1px solid #e2e2e2;

        .v-safe-center-item-left {
          font-size: 14px;
          color: #111;
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
            padding-left: 10px;

            img {
              width: 10px;
            }
          }
        }
      }
    }
  }
}
</style>