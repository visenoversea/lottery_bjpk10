<script setup>
import {ref} from "vue";
import SlideBar from './SlideBar.vue'
import HeaderView from './HeaderView.vue'
const isCollapse = ref(false)
const collapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>
<template>
  <el-container class="v_layout">
    <SlideBar :isCollapse="isCollapse"/>
    <el-container direction="vertical">
      <HeaderView @collapse="collapse" :isCollapse="isCollapse"/>
      <el-main class="v-main">
        <router-view v-slot="{ Component }">
          <transition name="g-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss">
.v_layout {
  height: 100%;
  .v-main {
    position: relative;
    padding: 12px;
  }
}
</style>
