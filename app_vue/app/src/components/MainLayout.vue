<template>
  <div class="v_main_layout v-is-main g-flex g-flex-column">
    <RouterView class="v-main-container" />
    <FooterLayout />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import FooterLayout from "./FooterLayout.vue";
</script>

<style lang="scss">
.v_main_layout {
  height: 100%;

  &.v-is-main {
    padding-bottom: 50px;
  }

  .v-main-container {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
