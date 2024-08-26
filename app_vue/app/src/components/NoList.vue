<template>
  <div class="c-no-list g-flex-column g-flex-align-center">
    <img :src="'/img/icon/empty-image.png'" alt="">
    <p class="c-no-list-text">{{ i18n.tipsText }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('nolist')
})
</script>

<style lang='scss'>
.c-no-list {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  img {
    width: 60px;
    object-fit: cover;
  }
  .c-no-list-text {
    text-align: center;
    color: var(--g-grey);
    font-size: 14px;
    padding-top: 10px;
  }
}
</style>