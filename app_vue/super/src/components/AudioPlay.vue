<script setup>
import {ref} from "vue";
const audioPlayRef = ref(null)
const props = defineProps({
  music: {
    type: String,
    default: '/audio/msg.mp3'
  },
  loop: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['init'])
const obj = document.documentElement || window.pageYOffset || document.body
//添加事件
const addEventListener = (e, type, fn) => {
  if (e.addEventListener) {
    e.addEventListener(type, fn, false);
  } else if (e.attachEvent) {
    e.attachEvent("on" + type, fn);
  } else {
    e["on" + type] = fn;
  }
}
//移除事件
const removeEventListener = (e, type, fn) => {
  if (e.removeEventListener) {
    e.removeEventListener(type, fn);
  } else {
    // ie8及以下，只支持事件冒泡
    e.detachEvent("on" + type, fn);
  }
}
const play = () => {
  //判断是否初始化
  if (audioPlayRef.value.paused) {
    //播放
    audioPlayRef.value.currentTime = 0
    audioPlayRef.value.play().catch(() => {
      console.log('提示音播放失败')
    })
  } else {
    //已播放设置从头播放
    audioPlayRef.value.currentTime = 0
  }
}
const pause = () =>{
  audioPlayRef.value.pause()
}

//静音播放一次
const muteAutoPlay = () => {
  //静音
  audioPlayRef.value.muted = true
  //播放从0开始
  audioPlayRef.value.play()
  audioPlayRef.value.pause()
  audioPlayRef.value.muted = false
  removeEventListener(obj, 'click', muteAutoPlay)
}
//静音播放一次
addEventListener(obj, 'click', muteAutoPlay)
//触发初始化事件
emits('init',{
  play:play,
  pause:pause,
})
</script>
<template>
  <!-- Chrome和Safari 浏览器基于安全的策略，已经停止自动播放  必须要你进行和浏览器进行事件互动,人为的点击，触摸等操作才能播放 -->
  <audio v-show="false" :loop="props.loop" ref="audioPlayRef">
    <source :src="props.music" type="audio/mpeg"/>
  </audio>
</template>