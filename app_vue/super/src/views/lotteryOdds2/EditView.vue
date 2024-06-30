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
  odds: '',
  status:1
})

//打开
const open = () => {
  form.id = props.data.id
  form.odds = props.data.odds
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editLotteryPlayed(form)
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
      <el-form-item v-if="props.data.lotteryRoom" label="房间">{{props.data.lotteryRoom.name}}</el-form-item>
      <el-form-item label="下注内容">{{props.data.name}}</el-form-item>
      <el-form-item label="赔率">
        <el-input v-model="form.odds" placeholder="请输入赔率"></el-input>
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