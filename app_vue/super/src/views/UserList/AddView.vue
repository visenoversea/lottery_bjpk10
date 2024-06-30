<script setup>
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import api from '@/utils/api'
import useStore from '@/stores/index'
const store = useStore()

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
  type: 1,
  virtual:0,
  user_name: '',
  password: '',
  fund_password:'',
  area_code: '',
  mobile: '',
  email: '',
  nick_name:'',
  agentAcount: '',
})

//关闭
const close = () => {
  refForm.value.resetFields()
}

//选择账号类型
const selectType = () => {
  form.virtual = form.type == 0 ? 0 : 1
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.addUser(form)
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
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-radio-group @change="selectType" v-model="form.type">
              <el-radio :label="1">会员</el-radio>
              <el-radio :label="2">代理</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号类型" prop="virtual">
            <el-radio-group v-model="form.virtual">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">虚拟号</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="用户名" prop="user_name">
        <el-input v-model="form.user_name" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="提款密码" prop="fund_password">
        <el-input v-model="form.fund_password" placeholder="请输入提款密码" autocomplete="off"></el-input>
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
      <el-form-item v-if="store.user.type>=10" label="上级id" prop="agentAcount">
        <el-input v-model="form.agentAcount" placeholder="请输入上级id或账号" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>