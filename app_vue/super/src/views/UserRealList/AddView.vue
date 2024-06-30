<script setup>
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import UploadImg from '@/components/UploadImg.vue'
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
  user_id: '',
  type:1,
  country:'',
  name: '',
  id_card: '',
  front_img:'',
  reverse_img: ''
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
  const {success, data} = await api.addUserReal(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="新增" @close="close" draggable :close-on-click-modal="false" width="620px">
    <el-form v-loading="loading" size="default" ref="refForm" :model="form" label-width="90px">
      <el-form-item label="用户ID" prop="user_id">
        <el-input v-model="form.user_id" placeholder="请输入用户ID" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="form.type">
          <el-option label="身份证" :value="1"></el-option>
          <el-option label="护照" :value="2"></el-option>
          <el-option label="驾驶证" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-input v-model="form.country" placeholder="请输入国家" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="证件号码" prop="id_card">
        <el-input v-model="form.id_card" placeholder="请输入证件号码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="证件正面" prop="front_img">
        <UploadImg v-model="form.front_img"/>
      </el-form-item>
      <el-form-item label="证件反面" prop="reverse_img">
        <UploadImg v-model="form.reverse_img"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>