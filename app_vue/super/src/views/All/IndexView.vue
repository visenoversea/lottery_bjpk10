<script setup>
import NProgress from 'nprogress';
import useStore from '@/stores/index'
import {useRoute,useRouter} from 'vue-router'
import {onMounted, ref} from "vue";
import api from '@/utils/api'
import ws from '@/utils/ws'
import { ElNotification } from 'element-plus'
import componentsRouter from "@/router/componentsRouter";

const route = useRoute()
const router = useRouter()

const store = useStore()
const isShow = ref(false)

//设置路由并返回菜单
const setRouterMenu = (menuArr) => {
  const menuList = []
  let index = 0
  menuArr.forEach(item => {
    if (item.parent_id === 0) {
      router.addRoute({
        name: item.name,
        path: item.path,
        component: componentsRouter[item.component],
        meta: {
          id: item.id,
          title: item.title,
        }
      })
      menuList.push({
        id: item.id,
        title: item.title,
        name: item.name,
        icon: item.icon,
        path: item.path,
        children: []
      })
    } else {
      if (menuList[index].id !== item.parent_id) {
        //查找
        index = menuList.findIndex(item2 => {
          return item2.id === item.parent_id
        })
        if (index === -1) {
          //没有查找到，跳出循环
          return
        }
      }
      if (item.status === 1) {
        menuList[index].children.push({
          id: item.id,
          title: item.title,
          name: item.name,
          icon: item.icon,
          path: item.path
        })
      }
      router.addRoute(menuList[index].name, {
        name: item.name,
        path: item.path,
        component: componentsRouter[item.component],
        meta: {
          id: item.id,
          title: item.title,
        }
      })
    }
  })
  if (menuList.length > 0) {
    //设置首页
    if (menuList[0].children.length > 0) {
      router.addRoute({
        path: '/',
        name:'root',
        redirect: {name: menuList[0].children[0].name},
      })
    } else {
      router.addRoute({
        path: '/',
        name:'root',
        redirect: {name: menuList[0].name},
      })
    }
  }
  return menuList;
}

//初始化数据
const init = async () => {
  NProgress.start()
  const {success, data} = await api.init()
  NProgress.done()
  if (!success) return
  store.system = data.system
  store.user = data.user
  store.apiList = data.apiList
  store.menuList = setRouterMenu(data.menuList)
  ws.joinGroup('AdminTips', item => {
    if (!store.auth(item.auth)) {
      //验证授权
      return
    }
    store.audio.play()
    const Notification = ElNotification({
      title: item.title,
      message: item.message,
      position: 'top-right',
      onClick: async () => {
        store.audio.pause()
        const failure = await router.push({name: item.routerName})
        if (failure && failure.to.name === failure.from.name) {
          //刷新路由
          await router.push('/Refresh')
        }
        Notification.close()
      },
      duration: item.duration
    })
  })
  await router.replace(route.fullPath)
}

onMounted(() => {
  if (!store.token) {
    //没登陆
    router.replace('/Login')
    return
  }
  if (store.menuList.length > 0) {
    //不是刷新页面就是404了
    isShow.value = true
    return
  }
  init();
})

//404返回首页
const BackHome = async () => {
  const failure = await router.replace('/')
  if (failure && failure.to.name === failure.from.name) {
    //刷新路由
    await router.push('/Refresh')
  }
}
</script>
<template>
  <el-empty v-if="isShow" description="你访问的页面不存在">
    <el-button @click="BackHome" type="primary">返回首页</el-button>
  </el-empty>
</template>