<template>
  <div class="s_chip_desc_pop">
    <van-popup safe-area-inset-bottom class="s-pop" v-model:show="show" position="center">
      <div class="s-pop-title">
        {{ i18n.descText }}
      </div>
      <div class="s-pop-content" v-html="desContet">
      </div>
      <div class="s-pop-btn-list g-flex-align-center">
        <div @click="onClose" class="s-pop-btn-item g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.querenText }}</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
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
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("chip");
});
let show = ref(false)
let desContet = ref('')
function onShow(val) {
  desContet.value = val
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
.s_chip_desc_pop {
  .van-overlay {
    background: rgba(0, 0, 0, .4);
  }
  .s-pop {
    width: 270px;
    border-radius: 13px 13px;
    background: rgba(255, 255, 255, .95);
    .s-pop-title {
      padding: 15px 15px 0 15px;
      text-align: center;
      font-size: 18px;
      line-height: 22px;
      font-weight: 500;
    }
    .s-pop-content {
      padding: 0 15px 15px 15px;
      font-size: 14px;
      margin: 5px 0 0;
      color: #8f8f94;
      line-height: 24px;
      position: relative;
      &::after {
        position: absolute;
        z-index: 15;
        top: auto;
        right: auto;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        -webkit-transform-origin: 50% 100%;
        transform-origin: 50% 100%;
        background-color: rgba(0, 0, 0, .2);
      }
    }
    .s-pop-btn-list {
      .s-pop-btn-item {
        flex: 1;
        height: 44px;
        color: #007aff;
        @include textEllipsis(1);
        font-weight: 700;
      }
    }
  }
}
</style>