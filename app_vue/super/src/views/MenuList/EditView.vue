<script setup>
import UploadImg from '@/components/UploadImg.vue'
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import api from '@/utils/api'
import useStore from '@/stores/index'
const store = useStore()
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object
  }
})
const loading = ref(false)
//显示隐藏做双向绑定处理
const emits = defineEmits(['update:modelValue','success'])
const show = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const form = reactive({
  id:0,
  parent_id: 0,
  type: 1,
  title: '',
  icon: '',
  path: '',
  name: '',
  component: '',
  level:1,
  sort:0,
  status:1
})
//打开
const open = () => {
  form.id = props.data.id
  form.parent_id = props.data.parent_id
  form.type = props.data.type
  form.title = props.data.title
  form.icon = props.data.icon
  form.path = props.data.path
  form.name = props.data.name
  form.component = props.data.component
  form.sort = props.data.sort
  form.level = props.data.level
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editMenu(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="5vh" title="编辑" @open="open" draggable :close-on-click-modal="false" width="520px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="类型">
            <el-radio-group v-model="form.type" prop="type">
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">api接口</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="父id" prop="parent_id">
            <el-input v-model="form.parent_id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="路径" prop="path">
        <el-input v-model="form.path"/>
      </el-form-item>
      <template v-if="form.type===1">
        <el-form-item label="组件名" prop="component">
          <el-input v-model="form.component"/>
        </el-form-item>
        <el-form-item v-if="form.parent_id==0" label="图标" prop="icon">
          <upload-img width="100px" height="80px" v-model="form.icon"/>
          <el-input v-model="form.icon"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status" prop="status">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="form.sort"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="store.user.type === 100" label="等级" prop="level">
            <el-input v-model="form.level"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>