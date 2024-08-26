<template>
  <div class="s_wakuang_order_list_pop">
    <van-popup class="s-pop" :close-on-click-overlay="false" :style="{ width: '90%' }" v-model:show="show"
      position="center">
      <i @click="onClose" class="iconfont icon-shanchu2"></i>
      <div class="s-pop-content">
        <div class="s-pop-content-item g-flex-align-center">
          <div class="s-pop-content-item-left">
            {{ i18n.shuhuiMoneyText }}
          </div>
          <div class="s-pop-content-item-right">
            {{ infoObj.obj.amount }} USDT
          </div>
        </div>

        <div class="s-pop-content-item g-flex-align-center">
          <div class="s-pop-content-item-left">
            {{ i18n.lastdayText }}
          </div>
          <div class="s-pop-content-item-right">
            {{ infoObj.obj.lastDay }}
          </div>
        </div>
        <!-- <div class="s-pop-content-item g-flex-align-center">
          <div class="s-pop-content-item-left">
            {{ i18n.weiyueBiliText }}
          </div>
          <div class="s-pop-content-item-right">
            {{ Number(infoObj.obj.bc_rate * 100).toFixed(2) }}%
          </div>
        </div> -->

        <!-- <div class="s-pop-content-item g-flex-align-center s-pop-content-item-weiyuejin">
          <div class="s-pop-content-item-left">
            {{ i18n.shuhuiWeiYueMoneyText }}
          </div>
          <div class="s-pop-content-item-right">
            {{ filtersWeiYueJin(infoObj.obj).toFixed(2) }}USDT
          </div>
        </div> -->

        <div class="s-pop-content-item g-flex-align-center">
          <div class="s-pop-content-item-left">
            {{ i18n.tuihuanBenjinText }}
          </div>
          <div class="s-pop-content-item-right">
            {{ filtersTuiBenJin(infoObj.obj).toFixed(2) }} USDT
          </div>
        </div>

        <div class="s-pop-content-item g-flex-align-center">
          <div class="s-pop-content-item-left">
            {{ i18n.shouyiText }}
          </div>
          <div class="s-pop-content-item-right">
            <span class="s-pop-content-item-right-now-profit">
              {{ infoObj.obj.profit_amount }} USDT
            </span>
            <span>
              0 USDT
            </span>
          </div>
        </div>

        <div @click="apiWaKuangOrderShuHuiHandel"
          class="s-pop-btn s-pop-btn-submit g-flex-justify-center g-flex-align-center">
          {{ i18n.shuhuiText }}
        </div>

        <div @click="onClose" class="s-pop-btn s-pop-btn-cancel g-flex-justify-center g-flex-align-center">
          {{ i18n.cancelText }}
        </div>
      </div>

    </van-popup>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRoute, useRouter } from 'vue-router';
import { apiWaKuangOrderShuHui } from '@/utils/api.js'
import { Toast } from 'vant';
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('waKuangOrderListPop')
})

let show = ref(false)

let value = ref('')

let infoObj = reactive({
  obj: {}
})

function onShow(obj) {
  infoObj.obj = obj
  show.value = true
}

function onClose() {
  show.value = false
}

// 违约金
function filtersWeiYueJin(obj) {
  return obj.lastDay * Number(obj.bc_rate) * Number(obj.amount)
}

// 退还本金
function filtersTuiBenJin(obj) {
  let weiYueJin = filtersWeiYueJin(obj)
  return obj.amount - weiYueJin
}

const emits = defineEmits(['emitShuHuiSuccess'])

// 提前赎回
async function apiWaKuangOrderShuHuiHandel() {
  store.loadingShow = true
  const { success, data } = await apiWaKuangOrderShuHui({ id: infoObj.obj.id })
  if (!success) return
  console.log(data)
  Toast(data.msg)
  emits('emitShuHuiSuccess')
  onClose()
}

defineExpose({
  onShow
})
</script>

<style lang='scss'>
.s_wakuang_order_list_pop {
  .van-overlay {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .s-pop {
    padding: 15px;
    position: absolute;
    border-radius: 5px;

    .icon-shanchu2 {
      position: absolute;
      z-index: 99;
      right: 10px;
      top: 5px;
      font-size: 18px;
      padding: 5px;
    }

    .s-pop-content {
      padding: 20px 0;
      padding-bottom: 0;

      .s-pop-content-item {
        padding-top: 10px;
        font-size: 14px;

        &.s-pop-content-item-weiyuejin {
          .s-pop-content-item-right {
            color: var(--g-main_color);
          }
        }

        .s-pop-content-item-left {
          color: #9ba7b2;
          flex: 1;
        }

        .s-pop-content-item-right {
          color: #111;
        }
      }

      .s-pop-btn {
        height: 34px;
        border-radius: 5px;
        width: 100%;
        margin-top: 15px;
        font-size: 14px;

        &.s-pop-btn-submit {
          background: var(--g-main_color);
          color: #fff;
          border: 1px solid var(--g-main_color);
        }

        &.s-pop-btn-cancel {
          border: 1px solid #e9e9e9;
          color: var(--g-main_color);
        }
      }
    }
  }
}
</style>