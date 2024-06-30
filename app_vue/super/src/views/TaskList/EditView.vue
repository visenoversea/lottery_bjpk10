<script setup>
import UploadImg from '@/components/UploadImg.vue'
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import api from '@/utils/api'
import useStore from '@/stores/index'
const store = useStore()

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
  des: '',
  amount:'',
  status: 1
})

//打开
const open = () => {
  form.id = props.data.id
  form.title = props.data.title
  form.des = props.data.des
  form.amount = props.data.amount
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editTask(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" title="编辑" @open="open" :close-on-click-modal="false" width="520px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-form-item label="任务名字">
        <el-input v-model="form.title" placeholder="请输入任务名字" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input v-model="form.des" placeholder="请输入任务描述" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="任务奖励">
        <el-input v-model="form.amount" placeholder="请输入任务任务奖励金额" autocomplete="off"></el-input>
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