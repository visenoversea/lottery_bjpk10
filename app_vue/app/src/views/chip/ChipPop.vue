<template>
  <div class="s_chip_pop">
    <van-popup
      safe-area-inset-bottom
      class="custom-popup"
      v-model:show="show"
      position="left"
    >
      <div class="s-pop-container g-flex-column">
        <div class="quick-list">
          <div class="title">{{ i18n.switch }}</div>
          <div
            class="quick-item"
            v-for="item in quickList"
            :key="`chips${item}`"
            @click="lotteryChange(item)"
          >
            {{ item.lottery_name + " " + item.name }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import { reactive, ref, computed } from "vue";
import { Toast } from "vant";
import { useI18n } from "vue-i18n";
const quickList = ref([]);
const emits = defineEmits(['lotterySelected'])
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("chip");
});
const show = ref(false);
function onShow(list) {
  quickList.value = list;
  show.value = true;
}
function lotteryChange (item) {
  if (item.status === 2) {
    Toast(i18n.value.noOpen);
  } else {
    emits('lotterySelected', item.id)
    onClose()
  }
}
function onClose() {
  show.value = false;
}

defineExpose({
  onShow,
});
</script>

<style lang='scss' scoped>
:deep(.custom-popup) {
  height: 100%;
  width: 150px;
  .s-pop-container {
    height: 100%;
    .quick-list {
      padding: 15px 15px;
      .title {
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 20px;
      }
      .quick-item {
        width: 100px;
        padding: 5px 0;
        margin-bottom: 10px;
        font-size: 12px;
        color: #000;
        text-align: center;
      }
    }
  }
}
</style>