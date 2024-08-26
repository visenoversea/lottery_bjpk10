<template>
  <div class="c_update_pop">
    <van-popup :close-on-click-overlay="false" class="c-pop" v-model:show="show" position="center">
      <div class="c-pop-head">
        <div class="c-pop-head-title">
          {{ i18n.titleText }}
        </div>
        <div class="c-pop-head-version">
          V.{{ store.system.Version }} {{ i18n.wendingText }}
        </div>
      </div>
      <div class="c-pop-content">
        <div class="c-pop-content-title">{{ i18n.updateContentText }}：</div>
        <div class="c-pop-content-tips-list">
          <div class="c-pop-content-tips-item">1.{{ i18n.contentOneText }}</div>
        </div>
        <div v-show="progressShow" class="c-pop-content-line">
          <div :style="{ width: `${width}%` }" class="c-pop-content-progress"></div>
        </div>

        <div v-show="!progressShow" @click="updateClick" class="c-pop-btn g-flex-align-center g-flex-justify-center">
          {{ i18n.updateText }}
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
  return i18nObj.tm('updatePop')
})
let show = ref(false)
let width = ref(0)
function onShow() {
  show.value = true
}

function onClose() {
  show.value = false
}

let progressShow = ref(false)

let timer = ref(0)

function updateClick() {
  progressShow.value = true
  timer.value = setInterval(() => {
    if (width.value >= 100) {
      clearInterval(timer.value)
      window.location.reload()
      return
    }
    width.value += 25
  }, 150)
}

defineExpose({
  onShow
})

</script>

<style lang='scss'>
.c_update_pop {
  .van-overlay {
    z-index: 999999!important;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .c-pop {
    z-index: 999999!important;
    position: absolute;
    width: 80%;
    border-radius: 10px;

    .c-pop-head {
      padding: 15px;
      background-image: url(/img/bg-update.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;

      .c-pop-head-title {
        font-size: 20px;
        padding-top: 10px;
        color: var(--g-black);
        text-align: center;
      }

      .c-pop-head-version {
        padding: 15px 0 30px 0;
        text-align: center;
        font-size: 14px;
        color: #dddddd;
      }
    }

    .c-pop-content {
      padding: 0 15px 15px 15px;

      .c-pop-content-title {
        padding-top: 5px;
        color: var(--g-white);
        font-size: 18px;
        font-weight: 600;
      }

      .c-pop-content-tips-list {
        margin-bottom: 10px;

        .c-pop-content-tips-item {
          font-size: 14px;
          padding: 15px 0;
          color: #7e7d7d;
        }
      }

      .c-pop-content-line {
        width: 100%;
        background: #EAEAEA;
        height: 2px;
        border-radius: 10px;
        position: relative;

        .c-pop-content-progress {
          position: absolute;
          height: 2px;
          border-radius: 10px;
          bottom: 0;
          background: var(--g-main_color);
        }
      }
    }

    .c-pop-btn {
      height: 40px;
      width: 100%;
      margin-top: 20px;
      background: #3693FE;
      color: #fff;
      font-size: 16px;
      border-radius: 25px;
    }
  }
}
</style>