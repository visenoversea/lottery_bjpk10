<template>
  <div class="s_tuiguang_code_pop">
    <van-popup safe-area-inset-bottom class="s-pop" v-model:show="show" position="center">
      <div class="s-pop-container">
        <div @click="onClose" class="s-pop-close">
          <i class="iconfont icon-guanbi"></i>
        </div>
        <div class="s-pop-head g-flex-align-center">
          <div class="s-pop-head-left g-flex-align-center">
            <img :src="store.banner.logo[0]" alt=""/>
          </div>
          <div class="s-pop-head-right">
            <div class="s-pop-head-right-title g-flex-align-center">
              <img :src="store.banner.logo[2]" alt=""/>
            </div>
            <div class="s-pop-head-right-address">
              <span>{{ address }}</span>
            </div>
          </div>
        </div>
        <div class="s-pop-bottom">
          <div class="s-pop-bottom-qrcode">
            <vue-qr v-if="address" :correctLevel="3" :logoScale="0.2" logoBackgroundColor="#fff" :logoCornerRadius="0" :logoMargin="3" logoSrc="/img/logo.png" ref="refVueQr" :text="address" :margin="marginVal" :size="130" ></vue-qr>
          </div>
          <div class="s-pop-bottom-text g-flex-justify-center g-flex-align-center">
            <span>扫描二维码即可注册</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
import useStore from '@/store/index.js'
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('tuiguang')
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

let show = ref(false)
function onShow() {
  show.value = true
}

function onClose() {
  show.value = false
}
let marginVal = ref(5)
defineExpose({
  onShow
})
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
    width: 72%;
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
        padding: 15px;
        border-bottom: 1px solid #dedede;
        .s-pop-head-left {
          img {
            width: 40px;
          }
        }
        .s-pop-head-right {
          padding-left: 5px;
          .s-pop-head-right-title {
            font-size: 16px;
            img {
              height: 30px;
            }
          }
          .s-pop-head-right-address {
            font-size: 12px;
            font-weight: 400;
            color: #333;
            word-break: break-all;
          }
        }
      }
      .s-pop-bottom {
        padding: 15px 45px;
        .s-pop-bottom-qrcode {
          img {
            width: 175px;
            height: 175px;
            object-fit: contain;
          }
        }
        .s-pop-bottom-text {
          padding-top: 15px;
          padding-bottom: 10px;
          font-weight: 400;
          color: #333;
          font-size: 12px;
        }
      }
    }
  }
}
</style>