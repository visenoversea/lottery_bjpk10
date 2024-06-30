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
  risk:'',
  status:1
})

//打开
const open = () => {
  form.id = props.data.id
  form.risk = props.data.risk
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editUserTimeRisk(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" title="编辑" @open="open" draggable :close-on-click-modal="false" width="620px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="用户ID">
            <div :class="{'g-bg-pink':props.data.user.virtual}">
              <span>{{ props.data.user_id }}</span>
              <span v-if="props.data.user.type===1" class="g-green">(会员)</span>
              <span v-else-if="props.data.user.type===2" class="g-blue">(代理)</span>
              <span v-else-if="props.data.user.type===0" class="g-blue">(虚拟盘)</span>
              <span v-else class="g-red">(异常)</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名">{{props.data.user.user_name}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="胜率" prop="risk">
        <el-input v-model="form.risk" placeholder="请输入0-100数值，例30则为30%赢的概率" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>