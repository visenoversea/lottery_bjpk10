<script setup>
import UploadImg from '@/components/UploadImg.vue'
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
  type:1,
  country:'',
  name: '',
  id_card: '',
  front_img:'',
  reverse_img: '',
  reason:'',
  status:1
})

//打开
const open = () => {
  form.id = props.data.id
  form.name = props.data.name
  form.country = props.data.country
  form.id_card = props.data.id_card
  form.front_img = props.data.front_img
  form.reverse_img = props.data.reverse_img
  form.reason = props.data.reason
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editUserReal(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="编辑" @open="open" draggable :close-on-click-modal="false" width="620px">
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
      <el-form-item label="国家" prop="country">
        <el-input v-model="form.country" placeholder="请输入国家" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="证件号码" prop="id_card">
        <el-input v-model="form.id_card" placeholder="请输入证件号码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="证件正面" prop="front_img">
        <UploadImg v-model="form.front_img"/>
      </el-form-item>
      <el-form-item label="证件反面" prop="reverse_img">
        <UploadImg v-model="form.reverse_img"/>
      </el-form-item>
      <el-form-item label="失败原因" prop="name">
        <el-input v-model="form.reason" placeholder="请输入失败原因" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status">
          <el-option label="审核通过" :value="1"></el-option>
          <el-option label="驳回" :value="0"></el-option>
          <el-option label="审核中" :value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>