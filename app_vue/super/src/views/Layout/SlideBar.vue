<script setup>
import {toRefs} from "vue"
import {useRoute,useRouter} from 'vue-router'
import {storeToRefs} from "pinia";
import useStore from '@/stores/index'

const store = useStore()
const { menuList } = storeToRefs(store)

const props = defineProps({
  isCollapse: Boolean
})

const { isCollapse } = toRefs(props)

const route = useRoute()
const router = useRouter()
const menuActive = async (index) => {
  const failure = await router.push(index)
  if (failure && failure.to.name === failure.from.name) {
    //刷新路由
    await router.push('/Refresh')
  }
}
</script>
<template>
  <el-aside class="s_layout_sidebar g-flex-column" :width="isCollapse ? '60px' : '200px'">
    <div class="s-logo g-flex-align-center g-flex-justify-center">
      <el-avatar shape="square" :size="24" fit="contain" src="/img/logo.png" />
      <div v-show="!isCollapse" class="s-logo-title">后台管理系统</div>
    </div>
    <el-scrollbar>
      <el-menu class="s-menu" mode="vertical" :default-active="route.path" @select="menuActive" :collapse="isCollapse">
        <template v-for="item in menuList" :key="item.id">
          <el-sub-menu v-if="item.children.length > 1" :index="item.path">
            <template #title>
              <el-image  v-if="item.icon" :src="item.icon" fit="contain" />
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="item2 in item.children" :key="item2.id" :index="item.path+'/'+item2.path">
              <span>{{item2.title}}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else-if="item.children.length === 1" :index="item.path+'/'+item.children[0].path">
            <el-image v-if="item.icon" :src="item.icon" fit="contain" />
            <span>{{item.children[0].title}}</span>
          </el-menu-item>
          <el-menu-item v-else :index="item.path">
            <el-image v-if="item.icon" :src="item.icon" fit="contain" />
            <span>{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<style lang="scss">
.s_layout_sidebar {
  height: 100%;
  background: var(--el-menu-bg-color);
  transition: all 0.24s; //加上动画效果
  .s-logo {
    height: 60px;
    font-size: 18px;
    .s-logo-title {
      color: var(--g-white);
      padding-left: 5px;
      font-weight: bold;
      @include textEllipsis();
    }
  }
  .s-menu{
    padding-bottom: 30px;
    .el-image{
      width: 20px;
      height: 20px;
      display: inline-flex;
      padding: 2px;
    }
  }
  .el-menu-item{
    &.is-active{
      background-color: var(--el-menu-hover-bg-color);
    }
  }
}
</style>
