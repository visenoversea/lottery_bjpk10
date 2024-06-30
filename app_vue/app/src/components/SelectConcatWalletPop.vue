<template>
  <div class="s_tuiguang_code_pop">
    <van-popup safe-area-inset-bottom class="s-pop" v-model:show="show" position="center">
      <div class="s-pop-container">
        <div @click="onClose" class="s-pop-close">
          <i class="iconfont icon-guanbi"></i>
        </div>
        <div class="s-pop-head g-flex-align-center">
          <div class="s-pop-head-title">
            <span>{{ i18n.titleText }}</span>
          </div>
        </div>
        <div class="s-pop-bottom">
          <div class="s-pop-bottom-list">
            <div @click="mateMaskWalletClick" class="s-pop-bottom-item g-flex-align-center g-flex-justify-between">
              <div class="s-item-left">
                <span>MetaMask</span>
              </div>
              <div class="s-item-right">
                <img src="/img/icon/metamask.svg" alt="">
              </div>
            </div>

            <div @click="coinBaseWalletClick" class="s-pop-bottom-item g-flex-align-center g-flex-justify-between">
              <div class="s-item-left">
                <span>Coinbase</span>
              </div>
              <div class="s-item-right">
                <img src="/img/icon/coinbase.svg" alt=""/>
              </div>
            </div>

            <div @click="imTokenWalletClick" class="s-pop-bottom-item g-flex-align-center g-flex-justify-between">
              <div class="s-item-left">
                <span>imToken</span>
              </div>
              <div class="s-item-right">
                <img src="/img/icon/imtoken.svg" alt="">
              </div>
            </div>

            <div @click="tpWalletClick" class="s-pop-bottom-item g-flex-align-center g-flex-justify-between">
              <div class="s-item-left">
                <span>TokenPocket</span>
              </div>
              <div class="s-item-right">
                <img src="/img/icon/tp.svg" alt="">
              </div>
            </div>
            <div class="s-pop-bottom-item s-pop-bottom-item-copy g-flex-align-center g-flex-justify-between">
              <div class="s-item-left">
                <span>{{ i18n.moreTipsText }}</span>
              </div>
              <div class="s-item-right">
                <div @click="copyClick(store.myWebMainUrl)" class="s-item-right-btn">
                  <span>{{ i18n.copyText }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>


    <a :href="form.iosTpWalletDappAddress" id="tp-link" style="display:none;"></a>
    
    <a :href="form.iosimTokenWalletDappAddress" id="imtoken-link" style="display:none;"></a>

    <a :href="form.iosMetaMaskWalletDappAddress" id="matemask-link" style="display:none;"></a>

    <a :href="form.iosCoinBaseWalletDappAddress" id="coinbase-link" style="display:none;"></a>


  </div>
</template>

<script setup>
import { copyClick } from '@/utils/index.js'
import useStore from '@/store/index.js'
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('selectConcatWalletPop')
})
const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})

const props = defineProps({
  address: {
    type: String,
    defaule() {
      return ''
    }
  }
})
let form = reactive({
  // 'tpdapp://open?params={"url":"https://coin-vip.com?sid=30&productId=30&invite=null&main=1"}'
  iosTpWalletDappAddress: `https://apps.apple.com/hk/app/tp-global-wallet/id6444625622`,
  iosTpWalletAppStoreAddress: 'https://apps.apple.com/hk/app/tp-global-wallet/id6444625622',
  andriodTpWalletDownAddress: 'https://www.tokenpocket.pro/en/download/app',

// imtokenv2://navigate/DappView?url=https://www.baidu.com/
  iosimTokenWalletDappAddress: `imtokenv2://navigate/DappView?url=${store.myWebMainUrl}`,
  iosimTokenWalletAppStoreAddress: 'https://apps.apple.com/app/imtoken-ethereum-wallet/id1384798940',
  andriodimTokenWalletDownAddress: 'https://token.im/',

  iosMetaMaskWalletDappAddress: `https://metamask.app.link/dapp/${store.myWebMainUrl}`,
  iosMetaMaskWalletAppStoreAddress: 'https://apps.apple.com/us/app/metamask/id1438144202',
  andriodMetaMaskWalletDownAddress: 'https://metamask.io/download/',

  
  // https://myappxyz.com/mycallback
  iosCoinBaseWalletDappAddress: `https://go.cb-w.com/dapp?cb_url=${store.myWebMainUrl}`,
  iosCoinBaseWalletAppStoreAddress: 'https://apps.apple.com/us/app/coinbase-wallet/id1278383455',
  andriodCoinBaseWalletDownAddress: 'https://www.coinbase.com/wallet/downloads',
})

let show = ref(false)
function onShow() {
  show.value = true
}

function onClose() {
  show.value = false
}
defineExpose({
  onShow
})

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
const isAndroid = /android/.test(navigator.userAgent.toLowerCase())

function tpWalletClick() {
  if (isMobile) {
    if(isIOS) {
        // // 使用Universal Links方法来实现ios端的打开网页操作
        document.getElementById("tp-link").click();
        setTimeout(function() {
          document.addEventListener("visibilitychange",  () => {
            if (document.visibilityState == "visible") {
              // 可见
              document.removeEventListener('visibilitychange')
              window.location.href = form.iosTpWalletAppStoreAddress;
            } else if (document.visibilityState == "hidden") {
            // 页面不可见 打开了
              document.removeEventListener('visibilitychange')
            }
          })
        }, 1000);
        // const coinbaseLink = 'imtoken:'
        // window.location.href = coinbaseLink
    }else if(isAndroid) {
      window.location.href = form.andriodTpWalletDownAddress;
    }
  } else {
    window.location.href = form.andriodTpWalletDownAddress;
    // Toast("您的浏览器不支持");
  }
}

function imTokenWalletClick() {
  if (isMobile) {
    if(isIOS) {
      // // 使用Universal Links方法来实现ios端的打开网页操作
      document.getElementById("imtoken-link").click()
      if (document.visibilityState == "visible") {
          window.location.href = form.iosimTokenWalletAppStoreAddress;
      } else if (document.visibilityState == "hidden") {
      // 页面不可见 打开了
      }
    }else if(isAndroid) {
      window.location.href = form.andriodimTokenWalletDownAddress;
    }
  } else {
    window.location.href = form.andriodimTokenWalletDownAddress;
    // Toast("您的浏览器不支持");
  }
}


function mateMaskWalletClick() {
  if (isMobile) {
    if(isIOS) {
        // 使用Universal Links方法来实现ios端的打开网页操作
        document.getElementById("matemask-link").click();
        setTimeout(function() {
          document.addEventListener("visibilitychange",  () => {
            if (document.visibilityState == "visible") {
              // 可见
              document.removeEventListener('visibilitychange')
              window.location.href = form.iosimTokenWalletAppStoreAddress;
            } else if (document.visibilityState == "hidden") {
            // 页面不可见 打开了
              document.removeEventListener('visibilitychange')
            }
          })
        }, 1000);
    }else if(isAndroid) {
      window.location.href = form.andriodMetaMaskWalletDownAddress;
    }
  } else {
    window.location.href = form.andriodMetaMaskWalletDownAddress;
  }
}

function coinBaseWalletClick() {
  if (isMobile) {
    if(isIOS) {
        // 使用Universal Links方法来实现ios端的打开网页操作
        document.getElementById("coinbase-link").click();
        setTimeout(function() {
          document.addEventListener("visibilitychange",  () => {
            if (document.visibilityState == "visible") {
              // 可见
              document.removeEventListener('visibilitychange')
              window.location.href = form.iosCoinBaseWalletAppStoreAddress;
            } else if (document.visibilityState == "hidden") {
            // 页面不可见 打开了
              document.removeEventListener('visibilitychange')
            }
          })
        }, 1000);
    }else if(isAndroid) {
      window.location.href = form.andriodCoinBaseWalletDownAddress;
    }
  } else {
    window.location.href = form.andriodCoinBaseWalletDownAddress;
  }
}
</script>

<style lang='scss'>
.s_tuiguang_code_pop {
  .van-overlay {
    filter: blur(0.08rem);
    -webkit-backdrop-filter: blur(.08rem);
    backdrop-filter: blur(0.08rem);
    background-color: rgba(0, 0, 0, .2);
  }

  .s-pop {
    width: 85%;
    border-radius: 4px;
    .s-pop-container {
      position: relative;
      .s-pop-close {
        position: absolute;
        right: 0;
        top: 0;
        padding: 10px;
        .iconfont {
          font-size: 22px;
        }
      }
      .s-pop-head {
        padding: 15px 20px;
        border-bottom: 1px solid #dedede;
        .s-pop-head-title {
          font-size: 18px;
          font-weight: 700;
        }
      }
      .s-pop-bottom {
        padding: 24px;
        .s-pop-bottom-list {
          .s-pop-bottom-item {
            border-radius: 6px;
            padding: 0 24px;
            height: 48px;
            background-color: #eff4f5;
            color: var(--g-main_color);
            margin-bottom: 8px;
            &.s-pop-bottom-item-copy {
              color: #333;
              .s-item-left {
                flex: 1;
                line-height: 16px;
                font-size: 12px;
              }
            }
            .s-item-left {
              flex: 1;
              font-size: 16px;
              font-weight: 700;
            }
            .s-item-right {
              flex-shrink: 0;
              img {
                width: 32px;
              }
              .s-item-right-btn {
                background-color: #3861fb;
                padding: 10px;
                border-radius: 6px;
                color: #fff;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>