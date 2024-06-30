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
  bank_name: '',
  bank_code: '',
  name: '',
  card_number: '',
  branch: '',
  status:1
})

//打开
const open = () => {
  form.id = props.data.id
  form.bank_name = props.data.bank_name
  form.bank_code = props.data.bank_code
  form.name = props.data.name
  form.card_number = props.data.card_number
  form.branch = props.data.branch
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editUserBank(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="编辑" @open="open" draggable :close-on-click-modal="false" width="680px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="用户ID">
            <div :class="{'g-bg-pink':props.data.user.virtual}">
              <span>{{ props.data.user_id }}</span>
              <span v-if="props.data.user.type===1" class="g-green">(会员)</span>
              <span v-else-if="props.data.user.type===2" class="g-blue">(代理)</span>
              <span v-else class="g-red">(异常)</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名">{{props.data.user.user_name}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="银行名称">
        <el-input v-model="form.bank_name" placeholder="请输入银行名称"></el-input>
      </el-form-item>
      <el-form-item label="银行卡号">
        <el-input v-model="form.card_number" placeholder="请输入银行卡号"></el-input>
      </el-form-item>
      <el-form-item label="银行代码">
        <el-input v-model="form.bank_code" placeholder="请输入银行代码"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="开户支行">
        <el-input v-model="form.branch" placeholder="请输入开户网点"></el-input>
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