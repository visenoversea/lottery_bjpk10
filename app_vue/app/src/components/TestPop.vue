<template>
  <div class="c_my_center_pop">
    <van-popup safe-area-inset-bottom class="c-pop" v-model:show="show" position="left">
      sssss
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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
.c_my_center_pop {
  .van-overlay {
    filter: blur(0.08rem);
    -webkit-backdrop-filter: blur(.08rem);
    backdrop-filter: blur(0.08rem);
    background-color: rgba(0, 0, 0, .2);
  }

  .c-pop {
    height: 100%;
  }
}
</style>