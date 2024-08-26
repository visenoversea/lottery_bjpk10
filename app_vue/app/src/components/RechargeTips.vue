<template>
<div class="c_recharge_tips">
  <div class="c-recharge-tips-title">
    {{ i18n.titleText }}:
  </div>
  <div class="c-recharge-tips-content">
    {{ i18n.rechgarge1TipsText }}<br/>
    {{ i18n.rechgarge2TipsText }}<br/>
    {{ i18n.rechgarge3TipsText }}<br/>
    {{ i18n.rechgarge4TipsText }}<br/>
  </div>
</div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()

const i18n = computed(() => {
  return i18nObj.tm('rechargeTips')
})
</script>

<style lang='scss'>
.c_recharge_tips {
  padding: 0 15px 15px 15px;
  color: var(--g-main_color);
  .c-recharge-tips-title {
    font-size: 14px;
    line-height: 1.5;
    font-weight: 700;
  }
  .c-recharge-tips-content {
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>