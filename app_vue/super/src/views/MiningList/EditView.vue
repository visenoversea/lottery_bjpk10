<script setup>
import WangEditor from '@/components/WangEditor.vue'
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
  title: '',
  icon: '',
  day: '',
  min_rate: '',
  max_rate: '',
  bc_rate: '0',
  min: '',
  max: '',
  sort: '0',
  status:1
})

//打开
const open = () => {
  form.id = props.data.id
  form.title = props.data.title
  form.icon = props.data.icon
  form.day = props.data.day
  form.min_rate = props.data.min_rate
  form.max_rate = props.data.max_rate
  form.bc_rate = props.data.bc_rate
  form.min = props.data.min
  form.max = props.data.max
  form.sort = props.data.sort
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editMining(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" title="编辑" @open="open" draggable :close-on-click-modal="false" width="680px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-form-item label="ID" prop="id">
        {{form.id}}
      </el-form-item>
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
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="form.sort" placeholder="排序,值越大排越前" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-select disabled v-model="form.status">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>