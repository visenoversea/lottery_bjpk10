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
  parentId: {
    default: 0
  }
})
const loading = ref(false)
const refForm = ref()
//显示隐藏做双向绑定处理
const emits = defineEmits(['update:modelValue','success'])
const show = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const form = reactive({
  parent_id: 0,
  type: 1,
  title: '',
  icon: '',
  path: '',
  name: '',
  level:1,
  component: '',
  sort: 0,
  status: 1
})

const open = () => {
  form.parent_id = props.parentId
}

//关闭
const close = async () => {
  refForm.value.resetFields()
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.addMenu(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}

</script>
<template>
  <el-dialog v-model="show" top="5vh" title="新增" @open="open" @close="close" draggable :close-on-click-modal="false" width="620px">
    <el-form v-loading="loading" size="default" ref="refForm" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="form.type">
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
          <UploadImg width="100px" height="80px" v-model="form.icon"/>
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
          <el-form-item v-if="store.user.type === 100" label="等级" prop="sort">
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