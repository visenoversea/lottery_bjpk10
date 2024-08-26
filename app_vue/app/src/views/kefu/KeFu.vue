<template>
<div class="v_kefu g-flex-column  n-bg">
  <div class="new-head">
    <div @click="$router.go(-1)" class="new-head-back">
      <!-- <i class="iconfont icon-zuo"></i> -->
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
  <div class="v-kefu-container">
    <div class="v-kefu-top">
      <div class="v-kefu-top-left">
        <div class="v-kefu-top-left-title">
          <span>{{ i18n.zaixiankefuText }}</span>
        </div>
        <div class="v-kefu-top-left-val">
          <span>{{ i18n.zaixianKeFuTipsText }}</span>
        </div>
      </div>
      <div class="v-kefu-top-right"></div>
    </div>
    <div>
      <ul class="v-concat-kefu-pop-list">
        <li @click="lineKefuClick(store.kefu.KefuUrl)" v-show="store.kefu.KefuUrl"
            class="v-concat-kefu-pop-item g-flex-align-center">
            <div class="v-concat-kefu-pop-item-left g-flex-align-center">
              <img src="/img/kefu.jpg"  alt="" />
              <p>{{ i18n.zaixianText }}</p>
            </div>
            <div class="v-concat-kefu-pop-item-right">
              <i class="iconfont icon-you"></i>
            </div>
          </li>

          <li @click="itemClick(KefuLine)" v-show="store.kefu.KefuLine"  class="v-concat-kefu-pop-item g-flex-align-center">
            <div class="v-concat-kefu-pop-item-left g-flex-align-center">
              <img src="/img/Line.png" alt="" />
              <p>Line：</p>
              <span>{{ KefuLine[0] }}</span>
            </div>
            <div class="v-concat-kefu-pop-item-right">
              <i class="iconfont icon-you"></i>
            </div>
          </li>

          <li @click="itemClick(KefuWhatsapp)" v-show="store.kefu.KefuWhatsapp"
            class="v-concat-kefu-pop-item g-flex-align-center">
            <div class="v-concat-kefu-pop-item-left g-flex-align-center">
              <img src="/img/WhatsApp.png" alt="" />
              <p>Whatsapp：</p>
              <span @click="itemClick(KefuWhatsapp)">{{ KefuWhatsapp[0] }}</span>
            </div>
            <div class="v-concat-kefu-pop-item-right">
              <i class="iconfont icon-you"></i>
            </div>
          </li>

          <li @click="itemClick(KefuTelegram)" v-show="store.kefu.KefuTelegram"
            class="v-concat-kefu-pop-item g-flex-align-center">
            <div class="v-concat-kefu-pop-item-left g-flex-align-center">
              <img src="/img/Telegram.png" alt="" />
              <p>Telegram：</p>
              <span>{{ KefuTelegram[0] }}</span>
            </div>
            <div class="v-concat-kefu-pop-item-right">
              <i class="iconfont icon-you"></i>
            </div>
          </li>

        </ul>
    </div>
  </div> 
</div>
</template>

<script setup>
import { copyClick } from '@/utils/index'
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
import { Dialog, ImagePreview } from 'vant';
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("kefu");
});

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})

const KefuLine = computed(() => {
  if (!store.kefu.KefuLine) return ''
  return store.kefu.KefuLine.split('|')
})

const KefuWhatsapp = computed(() => {
  if (!store.kefu.KefuWhatsapp) return ''
  return store.kefu.KefuWhatsapp.split('|')
})

const KefuTelegram = computed(() => {
  if (!store.kefu.KefuTelegram) return ''
  return store.kefu.KefuTelegram.split('|')
})


function lineKefuClick(address) {
  window.location.href = address
}

function itemClick(arr) {
  if (!arr) return
  if (arr[1]) return lineKefuClick(arr[1])
  else return copyClick(arr[0])
}
</script>

<style lang='scss'>
.v_kefu {
  height: 100%;
  overflow: auto;
  // background-color: #f6f4f5;
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
        color: #fff;
      }
    }

    .v-head-title {
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 16px;
      color: var(--g-black);
      font-weight: 700;

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
  .v-kefu-container {
    padding-top: 46px;
    flex: 1;
    overflow: auto;
    .v-kefu-top {
      height: 180px;
      width: 100%;
      padding: 14px;
      position: relative;
      .v-kefu-top-left {
        width: 65%;
        .v-kefu-top-left-title {
          color: #fff;
          font-weight: 700;
          padding: 10px 0;
        }
        .v-kefu-top-left-val {
          color: #fff;
          font-size: 14px;
        }
      }
      .v-kefu-top-right {
        position: absolute;
        height: 170px;
        width: 200px;
        bottom: 0;
        right: 0;
        padding: 15px 10px;
        border-radius: 6px;
        background-image: url('/img/icon/service_top_right.png');
        background-position: 0px 0px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
    .v-concat-kefu-pop-list {
      top: -20px;
      position: relative;
      margin: 15px;
      padding: 8px;
      border-radius: 6px;
      background: var(--g-white);

      .v-concat-kefu-pop-item {
        padding: 15px 0;
        line-height: 22px;
        border-bottom: 0.5px solid #e4e7ed;

        &:nth-last-of-type(1) {
          border-bottom: none;
        }

        .v-concat-kefu-pop-item-left {
          color: var(--g-black);
          flex: 1;

          img {
            width: 60px;
            border-radius: 4px;
          }

          p {
            font-size: 14px;
            padding-left: 10px;
          }
        }

        .v-concat-kefu-pop-item-right {
          .iconfont {
            color: var(--g-black);
            font-size: 22px;
          }
          img {
            width: 8px;
          }
        }

      }
    }
  }
}
</style>