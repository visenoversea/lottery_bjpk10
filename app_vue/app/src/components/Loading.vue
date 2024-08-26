<template>
  <div class="c_loading">
    <van-loading class="c-loading-content" color="#5488f7"/>
  </div>
</template>
<script setup>
</script>

<style lang='scss'>
.c_loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.3);
  // background: transparent;
  z-index: 999999;
  top: 0;
  .c-loading-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>