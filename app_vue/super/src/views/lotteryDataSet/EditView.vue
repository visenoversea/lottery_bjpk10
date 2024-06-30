<script setup>
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'

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
  open_code: '',
})

//打开
const open = () => {
  form.id = props.data.id
  form.open_code = props.data.open_code
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.setLotteryData(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" title="编辑" @open="open" draggable :close-on-click-modal="false" width="580px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-form-item v-if="props.data.lottery" label="彩种">{{props.data.lottery.name}}</el-form-item>
      <el-form-item label="开奖期号">{{props.data.open_expect}}</el-form-item>
      <el-form-item label="开奖号码">
        <el-input v-model="form.open_code" placeholder="请输入开奖号码"></el-input>
      </el-form-item>
      <el-form-item label="开户时间">{{formatDate(props.data.open_time)}}</el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>