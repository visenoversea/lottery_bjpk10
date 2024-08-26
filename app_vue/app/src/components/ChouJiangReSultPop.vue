<template>
  <div class="s_chou_jiang_result_pop">
    <van-popup :close-on-click-overlay="false" class="s-pop" v-model:show="show" position="center">
      <div class="s-pop-container">
        <div class="s-pop-choujiang-resule-icon">
          <img src="/img/icon/dial_window_icon.png" alt="">
        </div>
        <div @click="onClose" class="s-pop-close">
          <i class="iconfont icon-guanbi"></i>
        </div>
        <div class="s-pop-title">
          <span>{{ i18n.gongxiText }}</span>
        </div>
        <div class="s-pop-tips">
          <span>{{ userLottery.obj.tip }}</span>
        </div>
        <div class="s-pop-btn-box g-flex-align-center g-flex-justify-center">
          <div @click="onClose" class="s-pop-btn g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.comfirmText }}</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
  
<script setup>
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('choujiang')
})

let show = ref(false)

// 中奖结果
let userLottery = reactive({
  obj: {}
})

function onShow(obj) {
  userLottery.obj = obj
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
.s_chou_jiang_result_pop {
  .s-pop {
    // background-image: url(@/assets/icon/page_bg.png);
    // background-position: center;
    // background-size: 100% 100%;
    // background-repeat: no-repeat;
    overflow: inherit;
    background: var(--g-white);
    border-radius: 10px;
    .s-pop-container {
      width: 90vw;
      min-height: 190px;
      padding: 15px;
      position: relative;

      .s-pop-close {
        position: absolute;
        right: 0;
        top: 0;
        padding: 5px 10px;

        .iconfont {
          font-size: 22px;
          color: var(--g-black);
        }
      }

      .s-pop-choujiang-resule-icon {
        position: absolute;
        top: -20px;
        left: 5px;
        z-index: 999;

        img {
          width: 100px;
        }
      }

      .s-pop-title {
        padding: 30px 0 0 0;
        text-align: center;
        font-size: 22px;
        color: var(--g-main_color);
      }

      .s-pop-tips {
        padding: 15px 0;
        text-align: center;
        font-size: 15px;
        color: var(--g-main_color);
      }

      .s-pop-btn-box {
        margin-top: 10px;

        .s-pop-btn {
          min-width: 180px;
          height: 40px;
          border-radius: 4px;
          background: var(--g-main_color);
          color: var(--g-white);
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
  }
}</style>