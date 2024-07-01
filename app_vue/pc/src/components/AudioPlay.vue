<template>
  <div class="c_audio_play" v-show="false">
    <!-- Chrome和Safari 浏览器基于安全的策略，已经停止自动播放  必须要你进行和浏览器进行事件互动,人为的点击，触摸等操作才能播放 -->
    <audio controls="controls" ref="audioDom">
      <source :src="musicSrc" type="audio/ogg"/>
      <source :src="musicSrc" type="audio/mpeg"/>
    </audio>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted, nextTick } from "vue";
const poros = defineProps({
  musicSrc: {
    type: String,
    default() {
      return '/audio/sent-message.mp3'
    }
  }
})
let emits = defineEmits(['init'])

const audioDom = ref(null) //audio元素

onMounted(() => {
  console.log('audioDom', audioDom.value)
  addEventListener(obj, 'click', muteAutoPlay)
})

const obj = reactive(document.documentElement || window.pageYOffset || document.body) 

//静音播放一次
function muteAutoPlay() {
  audioDom.value.muted = 'muted' //静音
  audioDom.value.play().catch(() => {})
  audioDom.value.pause()
  audioDom.value.muted = ''
  removeEventListener(obj, 'click', muteAutoPlay)
  //触发初始化事件
  emits('init',audioDom)
}

function addEventListener(e, type, fn) {
  if (e.addEventListener) {
    e.addEventListener(type, fn, false);
  } else if (e.attachEvent) {
    e.attachEvent("on" + type, fn);
  } else {
    e["on" + type] = fn;
  }
}
      
function removeEventListener(e, type, fn) {
  if (e.removeEventListener) {
    e.removeEventListener(type, fn);
  } else {
    // ie8及以下，只支持事件冒泡
    e.detachEvent("on" + type, fn);
  }
}
</script>

<style lang='scss'>

</style>