<script setup>
import {reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import api from '../../utils/api'
import useStore from '../../stores/index'
const store = useStore()
const refForm = ref()
const show = ref(false)
const loading = ref(false)
defineExpose({
  onShow() {show.value = true}
})
const form = reactive({
  oldPassword: '',
  password: '',
  password2: '',
  authCode:''
})
const close = async () => {
  refForm.value.resetFields()
}
const confirm = async () => {
  if(form.password!==form.password2){
    ElMessage.error('新密码两次密码不一致')
    return
  }
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editPassword(form)
  loading.value = false
  if (!success) return
  ElMessage.success(data.msg)
  show.value = false
  store.signOut()
}
</script>
<template>
  <el-dialog v-model="show" title="修改密码" @close="close" draggable :close-on-click-modal="false" width="420px">
    <el-form v-loading="loading" size="default" ref="refForm" :model="form" label-width="90px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input show-password type="password" v-model="form.oldPassword"/>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input show-password type="password" v-model="form.password"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input show-password type="password" v-model="form.password2"/>
      </el-form-item>
      <el-form-item label="谷歌验证码" prop="authCode" v-if="store.system.GoogleAuth==1">
        <el-input v-model="form.authCode" type="text" placeholder="请输入谷歌验证码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>