<script setup>
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import api from '@/utils/api'
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
  id: 0,
  type: 0,
  virtual:0,
  user_name: '',
  password: '',
  fund_password:'',
  area_code: '',
  mobile: '',
  email: '',
  nick_name:'',
  agentAcount: '',
  status:1
})

//打开
const open = () => {
  form.id = props.data.id
  form.password = ''
  form.fund_password = ''
  form.area_code = props.data.area_code
  form.mobile = props.data.mobile
  form.email = props.data.email
  form.nick_name = props.data.nick_name
  if (props.data.agentList.length > 0) {
    form.agentAcount = props.data.agentList[props.data.agentList.length - 1].id
  } else {
    form.agentAcount = ''
  }
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editUserAgent(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="编辑" @open="open" draggable :close-on-click-modal="false" width="620px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="用户ID">{{props.data.id}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名">{{props.data.user_name}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="密码" >
        <el-input v-model="form.password" placeholder="为空不修改" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-row>
          <el-col :span="5"><el-input v-model="form.area_code" placeholder="区号"></el-input></el-col>
          <el-col :span="18" :offset="1"><el-input v-model="form.mobile" placeholder="手机号"></el-input></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nick_name" autocomplete="off" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>