<template>
  <div class="v_kefu g-flex-column">
    <div class="v-head g-flex-align-center">
      <!-- <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuo"></i>
      </div> -->
      <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div>
      <!-- <div class="v-head-right g-flex-align-center">
      <i class="iconfont icon-datijilu"></i>
    </div> -->
    </div>
    <div class="v-kefu-container">
      <div class="v-kefu-top">
        <div class="v-kefu-top-img">
          <img src="/img/icon/kefuimg.png" alt=""/>
        </div>
      </div>
      <div>
        <ul class="v-concat-kefu-pop-list">
          <li @click="lineKefuClick(store.kefu.KefuUrl)" v-show="store.kefu.KefuUrl"
            class="v-concat-kefu-pop-item g-flex-align-center">
            <div class="v-concat-kefu-pop-item-left g-flex-align-center">
              <img src="/img/icon/kefupeople.png" alt="" />
              <p>{{ i18n.zaixianText }}</p>
            </div>
            <div class="v-concat-kefu-pop-item-middle">
              <span>{{ i18n.zaixianZiXunText }}</span>
            </div>
            <!-- <div class="v-concat-kefu-pop-item-right">
              <i class="iconfont icon-you"></i>
            </div> -->
          </li>

          <li @click="itemClick(KefuLine)" v-show="store.kefu.KefuLine"
            class="v-concat-kefu-pop-item g-flex-align-center">
            <div class="v-concat-kefu-pop-item-left g-flex-align-center">
              <img src="/img/icon/kefupeople.png" alt="" />
              <p>Line</p>
              <!-- <span>{{ KefuLine[0] }}</span> -->
            </div>
            <div class="v-concat-kefu-pop-item-middle">
              <span>{{ i18n.zaixianZiXunText }}</span>
            </div>
            <!-- <div class="v-concat-kefu-pop-item-right">
              <i class="iconfont icon-you"></i>
            </div> -->
          </li>

          <li @click="itemClick(KefuWhatsapp)" v-show="store.kefu.KefuWhatsapp"
            class="v-concat-kefu-pop-item g-flex-align-center">
            <div class="v-concat-kefu-pop-item-left g-flex-align-center">
              <img src="/img/icon/kefupeople.png" alt="" />
              <p>WhatsApp</p>
              <!-- <span @click="itemClick(KefuWhatsapp)">{{ KefuWhatsapp[0] }}</span> -->
            </div>
            <div class="v-concat-kefu-pop-item-middle">
              <span>{{ i18n.zaixianZiXunText }}</span>
            </div>
            <!-- <div class="v-concat-kefu-pop-item-right">
              <i class="iconfont icon-you"></i>
            </div> -->
          </li>

          <li @click="itemClick(KefuTelegram)" v-show="store.kefu.KefuTelegram"
            class="v-concat-kefu-pop-item g-flex-align-center">
            <div class="v-concat-kefu-pop-item-left g-flex-align-center">
              <img src="/img/icon/kefupeople.png" alt="" />
              <p>Telegram</p>
              <!-- <span>{{ KefuTelegram[0] }}</span> -->
            </div>
            <div class="v-concat-kefu-pop-item-middle">
              <span>{{ i18n.zaixianZiXunText }}</span>
            </div>
            <!-- <div class="v-concat-kefu-pop-item-right">
              <i class="iconfont icon-you"></i>
            </div> -->
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
  return i18nObj.tm("conCatKeFu");
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
  background: var(--g-main_bgColor);
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    background: var(--g-white);
    .v-head-back-icon {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      padding: 0 16px;

      .iconfont {
        font-size: 26px;
        font-weight: 700;
        color: var(--g-black);
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
        color: var(--g-white);
      }
    }
  }

  .v-kefu-container {
    padding-top: 56px;
    flex: 1;
    overflow: auto;
    padding-left: 14px;
    padding-right: 14px;
    .v-kefu-top {
      .v-kefu-top-img {
        img {
          width: 100%;
        }
      }
    }

    .v-concat-kefu-pop-list {
      top: -20px;
      position: relative;
      margin-top: 40px;
      border-radius: 6px;
      color: var(--g-white);

      .v-concat-kefu-pop-item {
        margin-bottom: 15px;
        border-radius: 8px;
        padding: 20px 18px 20px 0;
        line-height: 22px;
        background: var(--g-white);
        &:nth-last-of-type(1) {
          border-bottom: none;
        }

        .v-concat-kefu-pop-item-left {
          color: var(--g-black);
          flex: 1;
          padding-left: 20px;
          img {
            width: 60px;
            border-radius: 4px;
          }

          p {
            font-weight: 700;
            font-size: 16px;
            padding-left: 10px;
          }
        }

        .v-concat-kefu-pop-item-middle {
          width: 72px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: linear-gradient(90deg, #D4B38F 0%, #B88964 100%);
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          color: #FFFFFF;
        }

        .v-concat-kefu-pop-item-right {
          .iconfont {
            padding-right: 10px;
            color: var(--g-grey);
            font-size: 22px;
          }

          img {
            width: 8px;
          }
        }

      }
    }
  }
}</style>