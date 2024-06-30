<script setup>
import {reactive, ref} from 'vue'
import api from '@/utils/api'
import LeftView from './LeftView.vue'
import CenterView from './CenterView.vue'
import RightView from './RightView.vue'
import {useRoute,useRouter} from 'vue-router'
import {ElMessage, ElMessageBox} from "element-plus";
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const formData = reactive({
  info: {id: 0, title: ''},
  list:[],
  row:{}
})
const getItem = async () => {
  loading.value = true
  const {success, data} = await api.getConfigItem({id: route.params.id})
  loading.value = false
  if (!success) return
  formData.list = data.list
  formData.info = data.info
}
getItem()
const addList = (item) => {
  formData.list.push(item)
}
//删除
const delList = (index) => {
  formData.row = {}
  formData.list.splice(index,1)
}
//选择
const selectList = (row) => {
  formData.row = row
}
//交换
const swap = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
}
// 上移
const moveUp = (index) =>  {
  if (index === 0) {
    return;
  }
  swap(formData.list, index, index - 1);
}
// 下移
const moveDown = (index) => {
  if (index === formData.list.length - 1) {
    return;
  }
  swap(formData.list, index, index + 1);
}
const submit = () => {
  ElMessageBox.confirm('提交确认?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    loading.value = true
    const {success, data} = await api.editFormConfig({id: route.params.id,list:formData.list})
    loading.value = false
    if (!success) return
    ElMessage.success(data.msg)
    router.go(-1)
  })
}
</script>
<template>
  <el-card v-loading="loading">
    <template #header>
      <div class="g-flex">
        <span>{{formData.info.title}}</span>
        <div class="g-flex-justify-end g-flex-1">
          <el-button type="primary" @click="submit">提交</el-button>
        </div>
      </div>
    </template>
    <el-container>
      <!-- === start 左侧模块面板 === -->
      <el-aside width="120px" >
        <LeftView @add="addList"/>
      </el-aside>
      <!-- === end 左侧模块面板 === -->
      <!-- === start 中间视图面板 === -->
      <el-main style="border: 2px dashed #95a3b7;padding: 5px;">
        <CenterView :list="formData.list" @select="selectList" @up="moveUp" @down="moveDown" @del="delList" />
      </el-main>
      <!-- === end 中间视图面板 === -->
      <!-- === start 参数面板 === -->
      <el-aside style="width: 30%;min-width: 350px;padding-left: 10px;">
        <RightView v-model="formData.row"/>
      </el-aside>
      <!-- === end 参数面板 === -->
    </el-container>
  </el-card>
</template>