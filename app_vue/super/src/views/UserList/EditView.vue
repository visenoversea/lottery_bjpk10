<script setup>
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import {formatDate} from '@/utils/index'
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
  waterAmount:'',
  status:1
})

//打开
const open = () => {
  form.id = props.data.id
  form.type = props.data.type
  form.virtual = props.data.virtual
  form.password = ''
  form.fund_password = ''
  form.waterAmount = ''
  form.area_code = props.data.area_code
  form.mobile = props.data.mobile
  form.email = props.data.email
  form.nick_name = props.data.nick_name
  if (props.data.agentList.length > 0) {
    form.agentAcount = props.data.agentList[props.data.agentList.length - 1].user_name
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
  const {success, data} = await api.editUser(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="编辑" @open="open" draggable :close-on-click-modal="false" width="720px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="用户ID" class="g-blue">{{form.id}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名" class="g-red">{{props.data.user_name}}</el-form-item>
        </el-col>
<!--        <el-col :span="24">-->
<!--          <el-form-item label="钱包地址">{{props.data.wallet_address}}</el-form-item>-->
<!--        </el-col>-->
        <el-col :span="12">
          <el-form-item label="类型">
            <el-select disabled v-model="form.type">
              <el-option label="会员" :value="1"></el-option>
              <el-option label="代理" :value="2"></el-option>
              <el-option label="模拟号" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号类型">
            <el-radio-group :disabled="form.type===2" v-model="form.virtual">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">虚拟号</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" >
            <el-input v-model="form.password" placeholder="为空不修改" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="提款密码" >
            <el-input v-model="form.fund_password" placeholder="为空不修改" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="修改流水" >
            <el-input v-model="form.waterAmount" placeholder="正数-加流水,负数-减流水,为空不修改" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="当前流水" >{{props.data.water_amount}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="提款密码" >
            <el-input v-model="form.fund_password" placeholder="为空不修改" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
<!--        <el-col :span="12">-->
<!--          <el-form-item label="邮箱">-->
<!--            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
        <el-col :span="12">
          <el-form-item label="昵称">
            <el-input v-model="form.nick_name" autocomplete="off" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-col>
<!--        <el-col :span="24">-->
<!--          <el-form-item label="手机">-->
<!--            <el-row>-->
<!--              <el-col :span="5"><el-input v-model="form.area_code" placeholder="区号"></el-input></el-col>-->
<!--              <el-col :span="18" :offset="1"><el-input v-model="form.mobile" placeholder="手机号"></el-input></el-col>-->
<!--            </el-row>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
        <el-col :span="12">
          <el-form-item label="上级id">
            <el-input v-model="form.agentAcount" placeholder="请输入上级id或账号" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-select v-model="form.status">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="禁止提现" :value="2"></el-option>
              <el-option label="禁止下单" :value="3"></el-option>
              <el-option label="禁止提现和下单" :value="4"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册ip" class="g-blue">{{props.data.create_ip}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册时间" class="g-red">{{formatDate(props.data.create_time)}}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>