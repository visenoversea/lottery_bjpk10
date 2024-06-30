<script setup>
import UploadImg from '@/components/UploadImg.vue'
import UploadFile from '@/components/UploadFile.vue'
import WangEditor from '@/components/WangEditor.vue'
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import api from '@/utils/api'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const refForm = ref()
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
  title: '',
  img: '',
  file: '',
  content: '',
  sort: 0
})

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
  const {success, data} = await api.addDemo(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="新增" @close="close" draggable :close-on-click-modal="false" width="680px">
    <el-form v-loading="loading" size="default" ref="refForm" :model="form" label-width="90px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="图片" prop="img">
        <UploadImg v-model="form.img"/>
        <el-input v-model="form.img"/>
      </el-form-item>
      <el-form-item label="文件" prop="file">
        <UploadFile v-model="form.file"/>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort"/>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <wang-editor v-model="form.content" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>