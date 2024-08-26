<template>
  <div class="c_notice_user_pop">
    <van-popup :duration="0.6" :close-on-click-overlay="false" safe-area-inset-bottom class="c-pop" v-model:show="show" position="center">
      <div class="c-pop-container g-flex-column g-flex-align-center">
        <div class="c-pop-title">
          <div class="c-pop-title-text">
            <span>{{ noticeObj.obj.title }}</span>
          </div>
        </div>
        <div class="c-pop-content">
          <div class="c-pop-content-list">
            <div class="c-pop-content-item">
              <div class="c-pop-item-content-text" v-html="noticeObj.obj.content">
              </div>
            </div>
          </div>
        </div>
        <div v-show="secNums > 0" class="c-pop-timedown g-flex-align-center g-flex-justify-center">
          <span>{{ secNums }}S</span>
        </div>
        <!-- <div class="c-pop-close" @click="onClose">
          <i class="iconfont icon-guanbi2"></i>
        </div> -->
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onUnmounted } from 'vue'
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('noticePop')
})
let show = ref(false)
function onShow(obj) {
  secNums.value = 5
  noticeObj.obj = obj
  setTimeDown()
  show.value = true
}

let noticeObj = reactive({
  obj: {}
})


function onClose() {
  cleanTimer()
  show.value = false
}

let secNums = ref(5)
let timer = ref(0)

function setTimeDown() {
  secNums.value = secNums.value - 1
  timer.value = setInterval(() => {
    secNums.value = secNums.value - 1
    if(secNums.value <= 0) {
      secNums.value = 0
      cleanTimer()
      onClose()
    }
  }, 1000)
}


function cleanTimer() {
  clearInterval(timer.value)
  timer.value = 0
}

defineExpose({
  onShow
})

onUnmounted(() => {
  cleanTimer()
})
</script>

<style lang='scss'>
.c_notice_user_pop {
  .c-pop {
    border-radius: 10px;
    background: var(--g-white);
    overflow-y: visible;
    .c-pop-container {
      height: 360px;
      width: 300px;
      position: relative;
      .c-pop-title {
        width: 100%;
        // height: 50px;
        padding: 0 10px;
        .c-pop-title-text {
          padding-top: 15px;
          color: var(--g-black);
          font-size: 22px;
          font-weight: 700;
          text-align: center;
          line-height: 1.1;
          padding-bottom: 15px;
        }
      }
      .c-pop-content {
        width: 100%;
        flex: 1;
        overflow: auto;
        .c-pop-content-list {
          .c-pop-content-item {
            padding: 10px 10px 10px 35px;
            .c-pop-item-title {
              position: relative;
              .c-pop-item-title-nums {
                position: absolute;
                top: 1px;
                left: -24px;
                width: 17px;
                height: 17px;
                font-size: 12px;
                text-align: center;
                color: var(--g-white);
                line-height: .4533333333rem;
                background-color: var(--g-main_color);
                border-radius: 50%;
              }
              .c-pop-item-title-text {
                color: var(--g-black);
                font-weight: 700;
                font-size: 14px;
                line-height: 1.5;
                padding-bottom: 5px;
              }
            }
            .c-pop-item-content-text {
              line-height: 1.3;
              font-size: 14px;
            }
          }
        }
      }
      .c-pop-close {
        position: absolute;
        z-index: 99999;
        bottom: -32px;
        .iconfont {
          font-size: 26px;
          color: var(--g-white)
        }
      }
      .c-pop-timedown {
        position: absolute;
        z-index: 99999;
        bottom: -45px;
        background: var(--g-main_color);
        color: var(--g-white);
        width: 34px;
        height: 34px;
        border-radius: 50%;
        font-size: 14px;
        font-weight: 700;
      }
    }
    
  }
}
</style>