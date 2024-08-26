<template>
  <div class="c_my_center_pop ">
    <van-popup safe-area-inset-bottom class="s-pop" v-model:show="show" position="left">
      <div class="s-pop-container">
        <div v-if="userInfo.id"  @click="$router.push({ name: 'safecenter' })" class="s-pop-head g-flex-align-center">
          <div class="s-pop-head-left g-flex-align-center">
            <div class="s-pop-head-left-img g-flex-align-center">
              <img src="/images/touxiang.png" alt=""/>
            </div>
            <div class="s-pop-head-left-content">
              <div class="s-pop-head-left-username">
                {{ filterBankCardNumber('+' + userInfo.area_code + userInfo.mobile) }}
              </div>
              <div class="s-pop-head-left-id g-flex-align-center">
                <div class="s-pop-head-left-id-text g-flex-align-center">
                  <span>UUID:</span>
                  <span>{{ userInfo.id }}</span>
<!--                  <span>{{ i18n.inviteCodeText }}:</span>-->
<!--                  <span>{{ userInfo.tid }}</span>-->
                </div>
                <div @click.stop="copyClick(userInfo.id)" class="s-pop-head-left-id-copy g-flex-align-center">
                  <i class="iconfont icon-ic_line_copy24px"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="s-pop-head-right">
            <i class="iconfont icon-you"></i>
          </div>
        </div>

        <div v-if="!userInfo.id"  @click="$router.push({ name: 'login' })" class="s-pop-head s-pop-head-no-login g-flex-align-center">
          <div class="s-pop-head-left g-flex-align-center">
            <div class="s-pop-head-left-img g-flex-align-center">
              <img :src="store.banner.logo[1]" alt=""/>
            </div>
            <div class="s-pop-head-left-content">
              <div class="s-pop-head-left-username">
                {{ i18n.qudengluText }}
              </div>
            </div>
          </div>
          <div class="s-pop-head-right">
            <i class="iconfont icon-you"></i>
          </div>
        </div>
        <div class="s-pop-head-list g-flex-align-center">
          <div @click="itemClick('rechargeselect')" class="s-pop-head-list-item g-flex-column g-flex-align-center">
            <div class="s-pop-head-item-img">
              <img src="/img/icon/mycenter-pop-recharge.png" alt=""/>
            </div>
            <div class="s-pop-head-item-text">
              <span>{{ i18n.chongzhiText }}</span>
            </div>
          </div>
          <div @click="itemClick('cashoutselect')" class="s-pop-head-list-item g-flex-column g-flex-align-center">
            <div class="s-pop-head-item-img">
              <img src="/img/icon/mycenter-pop-cashout.png" alt=""/>
            </div>
            <div class="s-pop-head-item-text">
              <span>{{ i18n.tixianText }}</span>
            </div>
          </div>
          <!--<div @click="itemClick('kefu')" class="s-pop-head-list-item g-flex-column g-flex-align-center">
            <div class="s-pop-head-item-img">
              <img src="/img/icon/mycenter-pop-kefu.png" alt=""/>
            </div>
            <div class="s-pop-head-item-text">
              <span>{{ i18n.kefuText }}</span>
            </div>
          </div>-->
        </div>

        <div class="s-pop-content-list">
          <!-- 身份认证 -->
          <div v-if="false" @click="userRealClick" class="s-pop-content-item g-flex-justify-between g-flex-align-center">
            <div class="s-pop-content-item-left g-flex-align-center">
              <div class="s-pop-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-userreal.png" alt=""/>
              </div>
              <div class="s-pop-content-left-text">
                <span>{{ i18n.shengfengRengZhengText }}</span>
              </div>
            </div>
            <div class="s-pop-content-item-right g-flex-align-center">
              <div :class="filtersRealStatusClass(userInfo.userReal.status)" class="s-pop-content-right-text">
                <span>{{ filtersRealStatus() }}</span>
              </div>
              <div class="s-pop-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>

          <!-- 钱包管理 -->
          <div v-if="false" @click="itemClick('walletlist')" class="s-pop-content-item g-flex-justify-between g-flex-align-center">
            <div class="s-pop-content-item-left g-flex-align-center">
              <div class="s-pop-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-wallet.png" alt=""/>
              </div>
              <div class="s-pop-content-left-text">
                <span>{{ i18n.qianbaoGuanLiText }}</span>
              </div>
            </div>
            <div class="s-pop-content-item-right g-flex-align-center">
              <!-- <div class="s-pop-content-right-text">
                <span>未认证</span>
              </div> -->
              <div class="s-pop-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>

          <!-- 银行卡管理 -->
          <div v-if="false" @click="itemClick('bankcardlist')" class="s-pop-content-item g-flex-justify-between g-flex-align-center">
            <div class="s-pop-content-item-left g-flex-align-center">
              <div class="s-pop-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-wallet.png" alt=""/>
              </div>
              <div class="s-pop-content-left-text">
                <span>{{ i18n.yinghangkaGuanLiText }}</span>
              </div>
            </div>
            <div class="s-pop-content-item-right g-flex-align-center">
              <!-- <div class="s-pop-content-right-text">
                <span>未认证</span>
              </div> -->
              <div class="s-pop-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>
          <!-- 常见问题 -->
          <div @click="ruleClick(8)" class="s-pop-content-item g-flex-justify-between g-flex-align-center">
            <div class="s-pop-content-item-left g-flex-align-center">
              <div class="s-pop-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-problem.png" alt=""/>
              </div>
              <div class="s-pop-content-left-text">
                <span>{{ i18n.changjianwentiText }}</span>
              </div>
            </div>
            <div class="s-pop-content-item-right g-flex-align-center">
              <!-- <div class="s-pop-content-right-text">
                <span>未认证</span>
              </div> -->
              <div class="s-pop-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>

          <!-- 安全中心 -->
          <div @click="itemClick('safecenter')" class="s-pop-content-item g-flex-justify-between g-flex-align-center">
            <div class="s-pop-content-item-left g-flex-align-center">
              <div class="s-pop-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-safe.png" alt=""/>
              </div>
              <div class="s-pop-content-left-text">
                <span>{{ i18n.safeCenterText }}</span>
              </div>
            </div>
            <div class="s-pop-content-item-right g-flex-align-center">
              <div class="s-pop-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>

          <!-- 资金明细 -->
          <div @click="itemClick('mybill')" class="s-pop-content-item g-flex-justify-between g-flex-align-center">
            <div class="s-pop-content-item-left g-flex-align-center">
              <div class="s-pop-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-mingxi.png" alt=""/>
              </div>
              <div class="s-pop-content-left-text">
                <span>{{ i18n.zijingmingxiText }}</span>
              </div>
            </div>
            <div class="s-pop-content-item-right g-flex-align-center">
              <div class="s-pop-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>

          <div @click="itemClick('invite')" class="s-pop-content-item g-flex-justify-between g-flex-align-center">
          <div class="s-pop-content-item-left g-flex-align-center">
            <div class="s-pop-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-pop-invite.png" alt="" />
            </div>
            <div class="s-pop-content-left-text">
              <span>{{ i18n.inviteFriendText }}</span>
            </div>
          </div>
          <div class="s-pop-content-item-right g-flex-align-center">
            <div class="s-pop-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <div @click="itemClick('myteam')" class="s-pop-content-item g-flex-justify-between g-flex-align-center">
          <div class="s-pop-content-item-left g-flex-align-center">
            <div class="s-pop-content-left-img g-flex-align-center">
              <img src="/img/icon/mycenter-myteam.png" alt="" />
            </div>
            <div class="s-pop-content-left-text">
              <span>{{ i18n.myTeamText }}</span>
            </div>
          </div>
          <div class="s-pop-content-item-right g-flex-align-center">
            <div class="s-pop-content-right-icon g-flex-align-center">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>
          <!-- 量化教程 -->
          <div @click="ruleClick(21)" class="s-pop-content-item g-flex-justify-between g-flex-align-center">
            <div class="s-pop-content-item-left g-flex-align-center">
              <div class="s-pop-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-jiaoxue.png" alt=""/>
              </div>
              <div class="s-pop-content-left-text">
                <span>{{ i18n.lianghuajiaochengText }}</span>
              </div>
            </div>
            <div class="s-pop-content-item-right g-flex-align-center">
              <!-- <div class="s-pop-content-right-text">
                <span>未认证</span>
              </div> -->
              <div class="s-pop-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>

          <!-- 语言设置 -->
          <div @click="itemClick('languageset')" class="s-pop-content-item g-flex-justify-between g-flex-align-center">
            <div class="s-pop-content-item-left g-flex-align-center">
              <div class="s-pop-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-language.png" alt=""/>
              </div>
              <div class="s-pop-content-left-text">
                <span>{{ i18n.yuyanSetText }}</span>
              </div>
            </div>
            <div class="s-pop-content-item-right g-flex-align-center">
              <div class="s-pop-content-right-text">
                <span>{{ selectLangObj.name }}</span>
              </div>
              <div class="s-pop-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>

          <!-- 关于我们 -->
          <div @click="ruleClick(6)" class="s-pop-content-item g-flex-justify-between g-flex-align-center">
            <div class="s-pop-content-item-left g-flex-align-center">
              <div class="s-pop-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-about-us.png" alt=""/>
              </div>
              <div class="s-pop-content-left-text">
                <span>{{ i18n.aboutUsText }}</span>
              </div>
            </div>
            <div class="s-pop-content-item-right g-flex-align-center">
              <!-- <div class="s-pop-content-right-text">
                <span>简体中文</span>
              </div> -->
              <div class="s-pop-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>

          <!-- 下载APP -->
          <div @click="downClick" class="s-pop-content-item g-flex-justify-between g-flex-align-center">
            <div class="s-pop-content-item-left g-flex-align-center">
              <div class="s-pop-content-left-img g-flex-align-center">
                <img src="/img/icon/mycenter-pop-down.png" alt=""/>
              </div>
              <div class="s-pop-content-left-text">
                <span>{{ i18n.xiazaiAppText }}</span>
              </div>
            </div>
            <div class="s-pop-content-item-right g-flex-align-center">
              <!-- <div class="s-pop-content-right-text">
                <span>简体中文</span>
              </div> -->
              <div class="s-pop-content-right-icon g-flex-align-center">
                <i class="iconfont icon-you"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="s-pop-exit-login-box g-flex-align-center g-flex-justify-center">
          <div @click="exitClick" class="s-pop-exit-login g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.tuichuLoginText }}</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { apiGetUserInfo } from '@/utils/api.js'
import { filterBankCardNumber, dotDealWith, filtersRealStatusClass, formatDate, copyClick, upDownClass, upDownBgClass, filtersZhangfu, kefuClick, upDownBgFontColorClass } from "@/utils/index.js";
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
import { Dialog, Toast } from "vant";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("myCenterPop");
});

let show = ref(false)
function onShow() {
  if(store.token) {
    apiGetUserInfoHandel()
  }
  show.value = true
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

function downClick() {
  window.location.href = store.system.downUrl
}

function userRealClick() {
  if(!store.token) return router.push({ name: 'login' })
  if((!userInfo.value.userReal.id) || userInfo.value.userReal.status == 0) return router.push({ name: 'userreal' })
  if(userInfo.value.userReal.status == 1) return Toast(i18n.value.userRealSuccessTipsText)
  if(userInfo.value.userReal.status == 2) return Toast(i18n.value.userRealIngTipsText)
}

function filtersRealStatus() {
  // status 0 认证失败
  // status 1 认证成功
  // status 2 认证中
  if((!userInfo.value.userReal.id)) return i18n.value.noRenzhengText
  if (userInfo.value.userReal.status == 0) return i18n.value.statusFailText
  if (userInfo.value.userReal.status == 1) return i18n.value.statusSuccessText
  if (userInfo.value.userReal.status == 2) return i18n.value.statusIngText
}


function onClose() {
  show.value = false
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
    cancelButtonColor: '#000',
    confirmButtonColor: '#5488f7' 
  })
  .then(() => { store.logout() }).catch(() => { });
}

let selectLangObj = computed(() => {
  console.log("store.lang", store.lang);
  if (!store.langList.length) return {};
  var target = store.langList.find((item) => item.code == store.lang);
  console.log("target", target);
  if (target) return target;
  else return store.langList[0];
});
defineExpose({
  onShow
})
</script>

<style lang='scss'>
.c_my_center_pop {
  .s-pop {
    height: 100%;
    width: 70vw;
    background-color: #202021;
    padding: 20px 0 60px 0;
    .s-pop-container {
      position: relative;
      height: 100%;
      overflow: auto;
      .s-pop-head {
        padding: 7px 11px;
        &.s-pop-head-no-login {
          padding-top: 0!important;
          img {
            width: 80px!important;
          }
          .s-pop-head-left-username {
            font-size: 18px!important;
          }
        }
        .s-pop-head-left {
          flex: 1;
          overflow: hidden;
          flex-shrink: 1;
          .s-pop-head-left-img {
            padding-right: 8px;
            img {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              object-fit: contain;
            }
          }
          .s-pop-head-left-content {
            flex: 1;
            .s-pop-head-left-username {
              width: 100%;
              line-height: 24px;
              font-size: 15px;
              color: #fff;
              @include textManyOverflow();
            }
            .s-pop-head-left-id {
              padding-top: 4px;
              .s-pop-head-left-id-text {
                font-size: 13px;
                line-height: 18px;
                color: #969799;
              }
              .s-pop-head-left-id-copy {
                padding-left: 4px;
                .iconfont {
                 color: #8169FF;
                }
              }
            }
          }
        }
        .s-pop-head-right {
          .iconfont {
            font-size: 20px;
          }
        }
      }
      .s-pop-head-list {
        gap: 10px; 
        padding: 0 10px;
        margin: 7px 0;
        .s-pop-head-list-item {
          flex: 1;
          padding: 6px;
          background: linear-gradient(90deg,#009AFE,#8169FF);
          border-radius: 6px;
          .s-pop-head-item-img {
            img {
              width: 28px;
              height: 28px;
              object-fit: contain;
            }
          }
          .s-pop-head-item-text {
            font-size: 12px;
            color: var(--g-white);
            line-height: 16px;
            padding-top: 2px;
          }
        }
      }

      .s-pop-content-list {
        .s-pop-content-item {
          padding: 11px 9px;
          border-bottom: 0.8px solid #e4e7ed;
          .s-pop-content-item-left {
            flex: 1;
            .s-pop-content-left-img {
              padding-right: 4px;
              img {
                width: 22px;
                height: 22px;
              }
            }
            .s-pop-content-left-text {
              color: #fff;
              font-size: 13px;
            }
          }
          .s-pop-content-item-right {
            text-align: right;
            .s-pop-content-right-text {
              font-size: 12px;
              color: #fff;
              padding-right: 4px;
            }
            .s-pop-content-right-icon {
              .iconfont {
                font-size: 18px;
                color: #fff;
              }
            }
          }
        }
      }

      .s-pop-exit-login-box {
        position: fixed;
        bottom: 30px;
        padding: 0 10px;
        width: 100%;
        .s-pop-exit-login {
          background: var(--g-main_color);
          width: 100%;
          height: 40px;
          color: var(--g-white);
          font-size: 14px;
          border-radius: 4px;
          border-radius: 40px;
        }
      }
    }
  }
}
</style>