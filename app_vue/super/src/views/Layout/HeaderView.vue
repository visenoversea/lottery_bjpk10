<script setup>
import {reactive, ref, toRefs, watch} from "vue";
import {useRouter,useRoute} from 'vue-router'
import useStore from '@/stores/index'
import { ElMessage } from 'element-plus'
import EditPassword from './EditPassword.vue'
import {Fold, Expand, ArrowDown} from '@element-plus/icons-vue'
import {storeToRefs} from "pinia";
import api from '@/utils/api'
const router = useRouter()
const route = useRoute()
const store = useStore()
const { user } = storeToRefs(store)
const refEditPassword = ref()
//子组件通信 获取props
const props = defineProps({
  isCollapse: Boolean
})
const { isCollapse } = toRefs(props)
const emit = defineEmits(['collapse'])
const tabs = reactive({
  index: 0,
  list: []
})
const addTabs = () => {
  if (route.path === '/Refresh') return
  const res = tabs.list.some((item, index) => {
    if (item.path === route.fullPath) {
      tabs.index = index
      return true
    } else {
      return false
    }
  })
  if(!res){
    tabs.index = tabs.list.length
    tabs.list.push({
      title: route.meta.title,
      path: route.fullPath
    })
  }
}
const removeTabs = (tabIndex) => {
  //删除其他标签
  if (tabs.list.length < 2) {
    ElMessage.error('无法关闭最后一个Tab')
    return
  }
  //tabList删除
  tabs.list.splice(tabIndex, 1)
  if (tabs.index === tabIndex) {
    if (!tabs.list[tabs.index]) {
      tabs.index = tabs.index - 1
    }
    router.push(tabs.list[tabs.index].path)
  }
}
const changeTabs = async () => {
  await router.push(tabs.list[tabs.index].path)
}
watch(route,()=>{
  addTabs()
},{ immediate: true })
//清除缓存
const clearSystemCache = async () => {
  const {success, data} = await api.clearSystemCache()
  if (!success) return
  ElMessage.success(data.msg)
}
//退出登录
const signOut = async () => {
  store.signOut()
}
</script>
<template>
  <el-header class="s_header g-flex-align-center">
      <!-- 收缩 -->
      <el-icon class="g-pointer" @click="emit('collapse')" :size="25">
        <Expand v-if="isCollapse" />
        <Fold v-else />
      </el-icon>
      <!-- 标签卡 -->
      <el-tabs class="s-tabs" type="card" v-model="tabs.index" closable @tab-change="changeTabs" @tab-remove="removeTabs">
        <el-tab-pane v-for="(item,index) in tabs.list" :key="index" :label="item.title" :name="index"></el-tab-pane>
      </el-tabs>
      <!-- 个人操作 -->
      <el-dropdown size="default" class="s-user" :hide-on-click="false">
        <div class="s-dropdown">
          <el-avatar :size="24" fit="contain" :src="user.avatar" />
          <span class="s-user-type">{{ store.user.type >= 10 ? '超级管理员' : '代理' }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>账号 : {{store.user.user_name}}</el-dropdown-item>
            <el-dropdown-item @click="refEditPassword.onShow()">修改密码</el-dropdown-item>
            <el-dropdown-item @click="clearSystemCache" v-if="store.user.type>10">清除缓存</el-dropdown-item>
            <el-dropdown-item @click="signOut" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
  </el-header>
  <EditPassword ref="refEditPassword" />
</template>
<style lang="scss">
.s_header {
  background-color: var(--g-green-tiffany);
  color: var(--g-white);
  .s-tabs{
    width: calc(100% - 150px);
    .el-tabs__header{
      margin: 0;
      border-bottom: none;
      .el-tabs__nav{
        border:none;
      }
      .el-tabs__nav-prev,.el-tabs__nav-next{
        color: var(--g-white);
      }
      .el-tabs__item{
        color: var(--g-white);
        padding: 0 15px;
        //border-bottom: none;
        border: none;
        //border-left: 1px solid #d7d7d7;
        //&:first-child{
        //  border-left: none;
        //}
        &.is-active{
          color: var(--g-blue-tiffany);
        }
      }
    }
  }
  .s-user{
    color: var(--g-white);
    padding-left: 5px;
    .s-dropdown{
      display: flex;
      height: 24px;
      line-height: 24px;
      .s-user-type{
        padding-left: 5px;
      }
      .el-icon{
        height: inherit;
      }
    }
  }
}
</style>