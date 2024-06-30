<script setup>
import AudioPlay from '@/components/AudioPlay.vue'
import TranslateView from '@/components/TranslateView.vue'
import useStore from '@/stores/index'
const store = useStore()
</script>
<template>
  <RouterView />
  <el-config-provider size="small">
  </el-config-provider>
  <AudioPlay @init="store.setAudio" />
  <TranslateView v-model="store.translate.show" :type="store.translate.type" :content="store.translate.content" />
</template>
<style lang="scss">
#app{
  height: 100%;
  overflow: auto;
}
</style>