<script setup>
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
  type:0,
  host: '',
  port: 443,
  sort: 0,
  remark: ''
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
  const {success, data} = await api.addDomain(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" title="新增域名" @close="close" draggable :close-on-click-modal="false" width="680px">
    <el-form v-loading="loading" size="default" ref="refForm" :model="form" label-width="90px">
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="0">前端域名</el-radio>
          <el-radio :label="1">APP域名</el-radio>
          <el-radio :label="2">后台域名</el-radio>
          <el-radio :label="3">下载域名</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主机" prop="id">
        <el-input v-model="form.host" placeholder="请输入主机"></el-input>
      </el-form-item>
      <el-form-item label="端口号" prop="port">
        <el-input v-model="form.port" placeholder="请输入端口号"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" placeholder="请输入排序"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>