<script setup>
import {ref,reactive,toRef,toRefs,watch,computed,onMounted,onUpdated, onUnmounted} from "vue";
import $api from '@/utils/api';
import demo from './demo'
import { storeToRefs } from 'pinia'
import useStore from '@/stores/index'

const store = useStore()
const { token } = storeToRefs(store)
console.log(token)
/***************子组件通信***************/
//子组件通信 获取props
const props = defineProps({
  propsData: Object
})
const { propsData } = toRefs(props);
console.log(propsData)
//触发事件
const emit = defineEmits(['login', 'err'])
emit('login','触发登录事件')
emit('err','错误信息')
/***************子组件通信***************/

const counter = ref(0)
counter.value++
const twiceTheCounter = computed(() => counter.value * 2)

const str = ref('字符串')
console.log(str)

const user = reactive({})
const {demoData, logins } = demo(user)

console.log(logins)
console.log(demoData)

console.log(user)
const login = async () => {
  console.log('登录')
  const {success, data} = await $api.login(user)
  if (!success) return
  console.log(data)
}
//监听用户信息变更执行login
watch(user, login)

const state = reactive({
  foo: 1,
  bar: 2
})
const fooRef = toRef(state, 'foo')
fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3

const stateAsRefs = toRefs(state)
state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3

const test1 = () => {
  console.log('onMounted-在实例挂载完成后被调用')
}
const test2 = () => {
  console.log('onUpdated--在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用')
}
const test3 = () => {
  console.log('onUnmounted-卸载组件实例后调用')
}
// onCreated(test)
onMounted(test1)
onUpdated(test2)
onUnmounted(test3)

// router.push({name: 'login'}).then(failure => {
//   if (failure && failure.to.name == failure.from.name) {
//     router.push('/Refresh')
//   }
// })
</script>

<template>
  <div class="v-demo-view">
    <div class="shuzi">store:{{$store.state.token}}</div>
    <div class="shuzi">响应:{{state.foo}}</div>
    <div class="shuzi">toRefs:{{stateAsRefs.foo}}</div>
    <div class="shuzi">数字:{{counter}}</div>
    <div class="shuzi">计算数字:{{twiceTheCounter}}</div>
  </div>
</template>
<style lang="scss">
.v-demo-view {
  padding: 10px;
}
</style>