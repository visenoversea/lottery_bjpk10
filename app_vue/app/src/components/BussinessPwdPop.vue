<template>
  <div class="s_buy_sell_pwd_pop">
    <van-popup :close-on-click-overlay="false" class="s-buy-sell-pwd-pop" v-model:show="show" position="center"
      :style="{ width: '90%' }">
      <i class="iconfont icon-shanchu2" @click="onClose"></i>
      <p class="s-pop-title g-flex-justify-center">{{ i18n.titleText }}</p>
      <van-password-input :value="value" :focused="showKeyboard" @focus="showKeyboard = true" />
      <!-- 数字键盘 -->
      <van-number-keyboard class="s-pop-keyboard" v-model="value" :show="showKeyboard" />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from "vue-i18n";

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('bussinessPwdPop')
})
let show = ref(false)
let value = ref('')
let showKeyboard = ref(true)
function onShow() {
  value.value = ''
  show.value = true
}
function onClose() {
  show.value = false
}
defineExpose({
  onShow
})
const emits = defineEmits(['emitPwd'])

watch(value, (nval) => {
  if (nval.length == 6) {
    show.value = false
    emits('emitPwd', nval)
  }
})
</script>

<style lang='scss'>
.s_buy_sell_pwd_pop {
  .van-overlay {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .s-buy-sell-pwd-pop {
    position: absolute;
    border-radius: 10px;

    .icon-shanchu2 {
      position: absolute;
      font-size: 20px;
      z-index: 99;
      right: 15px;
      top: 15px;
      color: var(--g-black);
    }

    .s-pop-title {
      padding: 30px 0 30px 0;
      color: var(--g-black);
      font-size: 16px;
      font-weight: bold;
    }

    .s-pop-keyboard {
      position: relative;
    }
    // .van-password-input {
    //   color: var(--g-black);
    //   .van-password-input__security {
    //     color: var(--g-black);
    //     &::after {
    //       border-color: var(--g-black);
    //     }
    //     .van-password-input__item {
    //         color: var(--g-black);
    //         i {
    //           background-color: var(--g-black);
    //         }
    //         .van-password-input__cursor {
    //           background-color: var(--g-black);
    //         }
    //     }
    //   }
    // }
    .van-number-keyboard {
      margin-top: 10px;
      
    }
  }

}
</style>