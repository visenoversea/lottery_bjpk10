<script setup>
import {reactive} from 'vue'
import api from "@/utils/api";
import form from '@/components/Form/index'
import { ElMessage } from 'element-plus'
//表单
const tabs = reactive({
  list:[],
  activeIndex:'',
  loading: false,
})

//获取配置数据
const getChildren = async (item) => {
  tabs.loading = true
  const {success, data} = await api.getConfigItem({id: item.id})
  tabs.loading = false
  if (!success) return
  item.children = data.list
}

//获取配置列表
const getList = async () => {
  tabs.loading = true
  const {success, data} = await api.getConfigList({status: 1})
  tabs.loading = false
  if (!success) return
  tabs.list = data.list
  //默认选中
  if (tabs.list.length > 0) {
    tabs.activeIndex = 0
  }
}

//配置选项变更
const handleChange =  (index) => {
  getChildren(tabs.list[index])
}

const editDataConfig = async () => {
  if (tabs.activeIndex === '') {
    ElMessage.error('请选择要修改的配置')
    return;
  }
  const list = tabs.list[tabs.activeIndex].children
  tabs.loading = true
  const {success, data} = await api.editDataConfig({list:list})
  tabs.loading = false
  if (!success) return
  ElMessage.success(data.msg)
}
//获取列表
getList()
</script>
<template>
  <el-card>
    <template #header>
      <div class="g-flex">
        <span>全局配置</span>
        <div class="g-flex-justify-end g-flex-1">
          <el-button type="primary" @click="editDataConfig">保存</el-button>
        </div>
      </div>
    </template>
    <el-tabs v-model="tabs.activeIndex" style="min-height: 480px" tab-position="left" @tab-change="handleChange">
      <el-tab-pane v-loading="tabs.loading" v-for="(item, index) in tabs.list" :key="index" :label="item.title" :name="index">
        <el-form v-if="item.children" size="default">
          <component v-for="formItem in item.children" :key="formItem.id" :is="form[formItem.type]" :item="formItem" />
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>