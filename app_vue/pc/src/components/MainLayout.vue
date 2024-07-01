<template>
  <div class="v_main_layout g-flex g-flex-column">
    <RouterView class="v-main-layout-container" />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style lang="scss">
.v_main_layout {
  // height: 100%;
  // .v-main-layout-container {
  //   flex: 1;
  //   overflow-y: auto;
  // }
}
</style>
