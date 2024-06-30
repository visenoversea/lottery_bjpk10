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
  user_name: '',
  password: '',
  area_code: '',
  mobile: '',
  email: '',
  nick_name:'',
  agentAcount: '',
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
  const {success, data} = await api.addUserAgent(form)
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
      <el-form-item label="用户名" prop="user_name">
        <el-input v-model="form.user_name" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-row>
          <el-col :span="5"><el-input v-model="form.area_code" placeholder="区号"></el-input></el-col>
          <el-col :span="18" :offset="1"><el-input v-model="form.mobile" placeholder="手机号"></el-input></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nick_name">
        <el-input v-model="form.nick_name" autocomplete="off" placeholder="请输入昵称"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>