<script setup>
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import api from '@/utils/api'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default() {
      return {}
    }
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
  user_id: '',
  title: 'USDT',
  des: '奖励',
  amount: '',
  status: 1
})

const open = async () => {

}

//关闭
const close = async () => {
  refForm.value.resetFields()
  // if (obj.currencyList.length > 0) {
  //   obj.currencyIndex = 0
  // }
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.addUserAmount(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}

</script>
<template>
  <el-dialog v-model="show" @open="open" title="新增充值" @close="close" draggable :close-on-click-modal="false" width="520px">
    <el-form v-loading="loading" size="default" ref="refForm" :model="form" label-width="90px">
      <el-form-item label="用户ID" prop="user_id">
        <el-input v-model="form.user_id" placeholder="请输入用户ID" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入充值标题" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="des">
        <el-input v-model="form.des" placeholder="请输入描述" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="变动金额" prop="amount">
        <el-input v-model="form.amount" placeholder="请输入变动金额(USDT)-正数增加，负数扣除" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>