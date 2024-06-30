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
  name: '',
  min: '',
  balance: '',
  speed:'10',
  quick_list:'10|100|500|10000',
  sort: '',
  status:1
})

//打开
const open = () => {
  form.id = props.data.id
  form.name = props.data.name
  form.min = props.data.min
  form.balance = props.data.balance
  form.sort = props.data.sort
  form.speed = props.data.speed
  form.quick_list = props.data.quick_list
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editLotteryRoom(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" title="编辑" @open="open" draggable :close-on-click-modal="false" width="580px">
    <el-form v-loading="loading" size="default" :model="form" label-width="120px">
      <el-form-item v-if="props.data.lottery" label="彩种">{{props.data.lottery.name}}</el-form-item>
      <el-form-item v-if="props.data.lotteryRoom" label="房间">{{props.data.name}}</el-form-item>
      <el-form-item label="房间名">
        <el-input v-model="form.name" placeholder="请输入房间名"></el-input>
      </el-form-item>
      <el-form-item label="最小下注限制">
        <el-input v-model="form.min" placeholder="请输入最小下注金额"></el-input>
      </el-form-item>
      <el-form-item label="房间余额限制">
        <el-input v-model="form.balance" placeholder="请输入进房间余额限制"></el-input>
      </el-form-item>
      <el-form-item label="机器人速度">
        <el-input v-model="form.speed" placeholder="请输入机器人速度0-100"></el-input>
      </el-form-item>
      <el-form-item label="快捷金额">
        <el-input v-model="form.quick_list" placeholder="请输入快捷金额,|分割"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" placeholder="请输入进房间余额限制"></el-input>
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