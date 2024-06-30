<script setup>
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import UploadImg from '@/components/UploadImg.vue'
import api from '@/utils/api'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
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
  title: '',
  icon: '',
  day: '',
  min_rate: '',
  max_rate: '',
  bc_rate: '0',
  min: '1',
  max: '-1',
  sort: '0',
})

//关闭
const close = async () => {
  refForm.value.resetFields()
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.addMining(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" title="新增" @close="close" draggable :close-on-click-modal="false" width="680px">
    <el-form v-loading="loading" size="default" ref="refForm" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图标" prop="icon">
            <UploadImg width="80px" height="80px" v-model="form.icon"/>
            <el-input v-model="form.icon"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="周期(天)" prop="day">
            <el-input v-model="form.day" placeholder="请输入收益周期" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="违约比例" prop="bc_rate">
            <el-input v-model="form.bc_rate" placeholder="0.01-为1%,最小4位小数" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="最小收益" prop="min_rate">
            <el-input v-model="form.min_rate" placeholder="0.01-为1%,最小4位小数" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大收益" prop="max_rate">
            <el-input v-model="form.max_rate" placeholder="0.01-为1%,最小4位小数" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="最低购入" prop="min">
            <el-input v-model="form.min" placeholder="请输入单笔最低购入金额" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最高购入" prop="max">
            <el-input v-model="form.max" placeholder="请输入单笔最低最高购入" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" placeholder="排序,值越大排越前" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>