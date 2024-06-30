<template>
  <div class="s_chip_amount_pop">
    <van-popup safe-area-inset-bottom class="s-pop" v-model:show="show" position="bottom">
      <div class="s-pop-input-top g-flex-align-center">
        <div class="s-pop-input">
          <span v-show="!amount">{{ i18n.inputAmountText }}</span>
          <span v-show="amount">{{ amount }}</span>
        </div>
        <div class="s-pop-input-btn-list g-flex-align-center">
          <div @click="sureClick" class="s-pop-input-btn-item s-pop-input-btn-item-yellow">
            <span>{{ i18n.sureText }}</span>
          </div>
          <div @click="cancelClick" class="s-pop-input-btn-item s-pop-input-btn-item-black">
            <span>{{ i18n.cancelText }}</span>
          </div>
        </div>
      </div>
      <van-number-keyboard
      class="s-pop-keyboard"
        v-model="amount"
        :show="show"
        extra-key="."
      />
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
import ws from "@/utils/ws.js";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("chip");
});

let show = ref(false)

const emits = defineEmits(['emitSureClick'] )

let selectItemObj = reactive({
  navId: '',
  playId: ''
})

let amount = ref('')

function onShow(navId, playId) {
  amount.value = ''
  selectItemObj.navId = navId
  selectItemObj.playId = playId
  show.value = true
}

function onClose() {
  show.value = false
}


function sureClick() {
  emits('emitSureClick', selectItemObj, amount.value)
  onClose()
}

function cancelClick() {
  onClose()
}

defineExpose({
  onShow
})
</script>

<style lang='scss'>
.s_chip_amount_pop {
  .van-overlay {
    filter: blur(0.1rem);
    -webkit-backdrop-filter: blur(.1rem);
    backdrop-filter: blur(0.1rem);
    background-color: rgba(0, 0, 0, .2);
  }

  .s-pop {
    height: 310px!important;
    .s-pop-input-top {
      // position: absolute;
      // z-index: 99999;
      width: 100%;
      padding: 11px 13px;
      .s-pop-input {
        flex: 1;
        border-radius: 5px;
        border: 0.5px solid rgba(0, 0, 0, 0.1);
        padding: 5px 11px;
        font-size: 17px;
        overflow: hidden;
      }
      .s-pop-input-btn-list {
        .s-pop-input-btn-item {
          margin: 0px 11px;
          width: 66px;
          height: 38px;
          border-radius: 20px;
          line-height: 38px;
          text-align: center;
          font-size: 15px;
          color: #fff;
          &.s-pop-input-btn-item-yellow {
            background: linear-gradient(90deg, #D4B38F 0%, #B88964 100%);
          }
          &.s-pop-input-btn-item-black {
            background: #1E1C38;
            margin: 0;
          }
        }
      }
    }
    // .s-pop-keyboard {
    //   padding-top: 70px;
    // }
  }
}
</style>