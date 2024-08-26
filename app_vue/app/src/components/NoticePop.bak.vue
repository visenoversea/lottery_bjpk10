<template>
  <div class="c_notice_pop">
    <van-popup :close-on-click-overlay="false" safe-area-inset-bottom class="c-pop" v-model:show="show" position="center">
      <div class="c-pop-container g-flex-column g-flex-align-center">
        <div class="c-pop-head">
          <div @click="onClose" v-show="secNums > 0" class="c-pop-head-secs g-flex-align-center g-flex-justify-center">{{ secNums }}S</div>
          <div v-show="secNums == 0" class="c-pop-close" @click="onClose">
            <i class="iconfont icon-guanbi2"></i>
          </div>
        </div>
        <div class="c-pop-title g-flex-align-center g-flex-justify-center">
          <div class="c-pop-title-text">
            <span>{{ i18n.titleText }}</span>
          </div>
        </div>
        <div class="c-pop-content-box g-flex-column">
          <div class="c-pop-content g-self-no-scrollbar">
            <div class="c-pop-content-list">
              <div class="c-pop-content-item" v-for="(item, index) in noticeList.list" :key="index">
                <div class="c-pop-item-title g-flex-align-center">
                  <div class="c-pop-item-title-nums g-flex-align-center g-flex-justify-center">
                    {{ index + 1 }}
                  </div>
                  <div class="c-pop-item-title-text" v-if="item.title">
                    {{ item.title }}
                  </div>
                </div>
                <div class="c-pop-item-content-text" v-html="item.content">
                </div>
                <!--              <div class="c-pop-item-content-text">-->
                <!--                <span>{{ item.des }}</span>-->
                <!--              </div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="c-pop-bottom"></div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onUnmounted } from 'vue'
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('noticePop')
})
let show = ref(false)
function onShow(list) {
  console.log('store.isClickTimeDownNotice', store.isClickTimeDownNotice)
  console.log('store.isFirstNeedShow', store.isFirstNeedShow)
  if((!store.isClickTimeDownNotice) && store.isFirstNeedShow) {
    secNums.value = 5
    setTimeDown()
  }else {
    secNums.value = 0
  }
  noticeList.list = list
  show.value = true
}

let noticeList = reactive({
  list: []
})

function onClose() {
  if(secNums.value > 0) {
    store.isClickTimeDownNotice = true
    // return router.push({ name: 'rule', query: { id: 5 }})
  }else {
    cleanTimer()
    show.value = false
  }
}

let secNums = ref(5)
let timer = ref(0)

function setTimeDown() {
  store.setIsFirstNeedShow(0)
  secNums.value = secNums.value - 1
  timer.value = setInterval(() => {
    secNums.value = secNums.value - 1
    if(secNums.value <= 0) {
      secNums.value = 0
      cleanTimer()
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
.c_notice_pop {
  .c-pop {
    border-radius: 15px;
    overflow-y: visible;
    .c-pop-container {
      height: 420px;
      width: 300px;
      position: relative;
      .c-pop-head {
        width: 100%;
        height: 100px;
        background-image: url('/img/icon/notice_bg_a.png');
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        top: -40px;
        .c-pop-head-secs {
          position: absolute;
          right: 10px;
          top: 40%;
          font-size: 13px;
          background: var(--g-main_color);
          color: var(--g-white);
          border-radius: 50%;
          width: 26px;
          z-index: 999;
          height: 26px;
        }
      }

      .c-pop-title {
        width: 100%;
        height: 50px;
        padding: 0 10px;

        .c-pop-title-text {
          position: relative;
          z-index: 99;
          color: var(--g-black);
          font-size: 24px;
          font-weight: 700;
          text-align: center;
          line-height: 1;
        }
      }

      .c-pop-content-box {
        overflow: hidden;
        flex: 1;
        position: relative;
        background-image: url('/img/icon/notice_bg_b.png');
        background-size: 100% 100%;
        background-position: center;
        .c-pop-content {
          background-color: var(--g-white);
        }
        .c-pop-content {
          width: calc(100% - 18px);
          margin: 0 auto;
          background-color: var(--g-white);
          flex: 1;
          overflow: auto;
          border-radius: 15px;
          .c-pop-content-list {
            .c-pop-content-item {
              padding: 10px 10px 10px 35px;
              color:black;
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
      }
      .c-pop-bottom {
        background-color: #BEECFF;
        width: 100%;
        height: 24px;
        background-image: url('/img/icon/notice_bg_c.png');
        background-position: center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 0 0 15px 15px;
        margin-top: -1px;
      }

      .c-pop-close {
        position: absolute;
        z-index: 99999;
        right: 10px;
        top: 40%;
        .iconfont {
          font-size: 28px;
          font-weight: 700;
          color: var(--g-main_color)
        }
      }
    }

  }
}</style>