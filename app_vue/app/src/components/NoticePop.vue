<template>
  <div class="c_notice_pop">
    <van-popup safe-area-inset-bottom class="c-pop" v-model:show="show" position="center">
      <div class="c-pop-container g-flex-column g-flex-align-center">
        <div class="c-pop-title">
          <div class="c-pop-title-text">
            <span>{{ i18n.titleText }}</span>
          </div>
        </div>
        <div class="c-pop-content">
          <div class="c-pop-content-list">
            <div class="c-pop-content-item" v-for="(item, index) in noticeList.list" :key="index">
              <div class="c-pop-item-title g-flex-align-center">
                <div class="c-pop-item-title-nums g-flex-align-center g-flex-justify-center">
                  {{ index + 1 }}
                </div>
                <div class="c-pop-item-title-text">
                  {{ item.title }}
                </div>
              </div>
              <div class="c-pop-item-content-text" v-html="item.content">
              </div>
            </div>
          </div>
        </div>
        <div class="c-pop-close" @click="onClose">
          <i class="iconfont icon-guanbi2"></i>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('noticePop')
})
let show = ref(false)
function onShow(list) {
  noticeList.list = list
  show.value = true
}

let noticeList = reactive({
  list: []
})

function onClose() {
  show.value = false
}

defineExpose({
  onShow
})
</script>

<style lang='scss'>
.c_notice_pop {
  .c-pop {
    border-radius: 10px;
    // background: #252d31;
    overflow-y: visible;
    .c-pop-container {
      height: 360px;
      width: 300px;
      position: relative;
      padding-bottom: 10px;
      .c-pop-title {
        width: 100%;
        height: 100px;
        padding: 0 10px;
        background-position: 0px 0px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('/img/banner/news_dialog_header_green.png');
        .c-pop-title-text {
          color: var(--g-white);
          font-size: 16px;
          text-align: center;
          line-height: 2.2;
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
                color: #37267d;
                line-height: .4533333333rem;
                background-color: #fc0;
                border-radius: 50%;
              }
              .c-pop-item-title-text {
                color: var(--g-black);
                font-size: 14px;
                line-height: 1.5;
                font-weight: 700;
              }
            }
            .c-pop-item-content-text {
              line-height: 1.3;
              font-size: 14px;
              img {
                max-width: 100%;
              }
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
    }
    
  }
}
</style>