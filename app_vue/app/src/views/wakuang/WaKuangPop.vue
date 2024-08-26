<template>
  <div class="s_wa_kuang_pop">
    <van-action-sheet class="s-pop" v-model:show="show" title="">
      <div class="s-pop-container">
        <div class="s-pop-list">
          <div class="s-pop-item">
            <div class="s-pop-item-title">
              <span>{{ i18n.popItem1TitleText }}</span>
            </div>
            <!-- <div class="s-pop-item-sub-title g-flex-align-center">
              <i class="square"></i>
              <span class="s-pop-item-sub-title-val">稳健型</span>
            </div> -->
            <div class="s-pop-item-content">
              <span>{{ i18n.popItem1ContentText }}</span>
            </div>
          </div>

          <div class="s-pop-item">
            <div class="s-pop-item-title">
              <span>{{ i18n.popItem2TitleText }}</span>
            </div>
            <div class="s-pop-item-sub-title g-flex-align-center">
              <i class="square"></i>
              <span class="s-pop-item-sub-title-val">{{ i18n.popItem2SubTitleText }}</span>
            </div>
            <div class="s-pop-item-content">
              <span>{{ i18n.popItem2ContentText }}</span>
            </div>
          </div>

          <div class="s-pop-item">
            <div class="s-pop-item-title">
              <span>{{ i18n.popItem3TitleText }}</span>
            </div>
            <div class="s-pop-item-content">
              <span>{{ i18n.popItem3ContentText }}</span>
            </div>
          </div>

          <div class="s-pop-item">
            <div class="s-pop-item-title">
              <span>{{ i18n.popItem4TitleText }}</span>
            </div>
            <div class="s-pop-item-content">
              <span>{{ i18n.popItem4ContentText }}</span>
            </div>
          </div>

          <div class="s-pop-item">
            <div class="s-pop-item-title">
              <span>{{ i18n.popItem5TitleText }}</span>
            </div>
            <div class="s-pop-item-sub-title g-flex-align-center">
              <i class="square"></i>
              <span class="s-pop-item-sub-title-val">{{ i18n.popItem5SubTitleText }}</span>
            </div>
            <div class="s-pop-item-content">
              <span>{{ i18n.popItem5ContentText }}</span>
            </div>
          </div>

          <div class="s-pop-item">
            <div class="s-pop-item-title">
              <span>{{ i18n.popItem6TitleText }}</span>
            </div>
            <div class="s-pop-item-content">
              <span>{{ i18n.popItem6ContentText }}</span>
            </div>
          </div>
        </div>
        <div @click="onClose" class="s-pop-close-icon">
          <i class="iconfont icon-guanbi1"></i>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('wakuang')
})

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
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
</script>

<style lang='scss'>
.s_wa_kuang_pop {
  .van-overlay {
    filter: blur(0.08rem);
    -webkit-backdrop-filter: blur(.08rem);
    backdrop-filter: blur(0.08rem);
    background-color: rgba(0, 0, 0, .2);
  }

  .s-pop {
    padding-top: 25px;
    padding-bottom: 25px;
    max-height: 90%;
    .s-pop-container {
      .s-pop-close-icon {
        position: absolute;
        right: 5px;
        top: 5px;
        z-index: 999;
        padding: 10px 15px 0 0;
        .iconfont {
          font-size: 24px;
          font-weight: 700;
          color: var(--g-less-black);
        }
      }
      .s-pop-list {
        .s-pop-item {
          border-bottom: 1px solid #f2f4f7;
          padding: 20px 15px;
          .s-pop-item-title {
            font-size: 18px;
            color: var(--g-less-black);
            font-weight: 700;
            padding-bottom: 20px;
          }
          .s-pop-item-sub-title {
            padding-bottom: 5px;
            .square {
              width: 6px;
              height: 6px;
              background: #333;
            }
            .s-pop-item-sub-title-val {
              padding-left: 10px;
              font-size: 14px;
              color: #000;
            }
          }
          .s-pop-item-content {
            font-weight: 400;
            color: #7d919d;
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }
  }
}
</style>