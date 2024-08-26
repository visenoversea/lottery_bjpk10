<template>
  <div :id="'dplayer' + props.id" class="dplayer" :style="{ width: props.size.width, height: props.size.height }">
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import DPlayer from 'dplayer';
const props = defineProps({
  id: {
    type: Number,
    default() {
      return new Date().getTime()
    }
  },
  url: {
    type: String,
    default() {
      return ''
    }
  },
  size: {
    type: Object,
    default() {
      return { width: '100%', height: '100%' }
    }
  },
  live: {
    type: Boolean,
    default() {
      return false
    }
  },
  pic: {
    type: String,
    default() {
      return ''
    }
  }
})

onMounted(() => {
  initDPlayer()
})

function initDPlayer() {
  new DPlayer({
    preload: 'auto',
    live: props.live,
    container: document.getElementById(`dplayer${props.id}`),
    hotkey: false,
    video: { url: props.url, pic: props.pic },
  })
}
</script>
 
<style lang='scss'>
.dplayer {
  .dplayer-controller {
    display: none !important;
  }

  //设置按钮
  .dplayer-setting {
    display: none !important;
  }

  //全屏按钮
  .dplayer-full {
    display: none !important;
  }
}
</style>