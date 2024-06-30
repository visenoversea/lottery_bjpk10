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
  title: '',
  fn: '',
  expression: ['', '', '', '', ''],
  second:0,
  log_switch:0,
  remark: '',
  status:1
})

//打开
const open = () => {
  form.id = props.data.id
  form.title = props.data.title
  form.fn = props.data.fn
  form.expression = props.data.expression.split(' ')
  form.second = props.data.second
  form.log_switch = props.data.log_switch
  form.remark = props.data.remark
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editDomain(form)
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
      <el-form-item label="ID" prop="id">
        <div>{{ form.id }}</div>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="函数名" prop="fn">
        <el-input v-model="form.fn" placeholder="执行函数名"></el-input>
      </el-form-item>
      <el-form-item label="表达式" prop="expression">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-input v-model="form.expression[0]" placeholder="分钟"></el-input>
          </el-col>
          <el-col :span="5">
            <el-input v-model="form.expression[1]" placeholder="小时"></el-input>
          </el-col>
          <el-col :span="5">
            <el-input v-model="form.expression[2]" placeholder="日"></el-input>
          </el-col>
          <el-col :span="5">
            <el-input v-model="form.expression[3]" placeholder="月"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.expression[4]" placeholder="星期几"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="执行设定" prop="fn">
        <el-select v-model="form.second" @change="getList">
          <el-option label="执行一次" :value="0"></el-option>
          <el-option label="每隔1秒执行" :value="1"></el-option>
          <el-option label="每隔2秒执行" :value="2"></el-option>
          <el-option label="每隔3秒执行" :value="3"></el-option>
          <el-option label="每隔5秒执行" :value="5"></el-option>
          <el-option label="每隔10秒执行" :value="10"></el-option>
          <el-option label="每隔15秒执行" :value="15"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="日志" prop="log_switch">
        <el-radio-group v-model="form.log_switch">
          <el-radio :label="0">关闭</el-radio>
          <el-radio :label="1">开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
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