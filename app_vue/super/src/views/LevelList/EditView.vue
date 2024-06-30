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
  title: '',
  img: '',
  nums: '10',
  min:'0',
  max:'0',
  min_rate: '0.01',
  max_rate: '0.01',
  reward: '0',
  amount: '',
  spread_nums: '0',
  status: 1
})

//打开
const open = () => {
  form.id = props.data.id
  form.title = props.data.title
  form.img = props.data.img
  form.nums = props.data.nums
  form.min = props.data.min
  form.max = props.data.max
  form.min_rate = props.data.min_rate
  form.max_rate = props.data.max_rate
  form.reward = props.data.reward
  form.amount = props.data.amount
  form.spread_nums = props.data.spread_nums
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editLevel(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="5vh" title="编辑" @open="open" draggable :close-on-click-modal="false" width="680px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入语言" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ID">{{props.data.id}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图标" prop="icon">
            <UploadImg v-model="form.img"/>
            <el-input v-model="form.img"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="量化次数" prop="nums">
            <el-input v-model="form.nums" placeholder="请输入量化次数" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最小余额" prop="min_rate">
            <el-input v-model="form.min" placeholder="请输入最小收益" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大余额" prop="max_rate">
            <el-input v-model="form.max" placeholder="请输入最大收益" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最小收益" prop="min_rate">
            <el-input v-model="form.min_rate" placeholder="请输入最小收益" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大收益" prop="max_rate">
            <el-input v-model="form.max_rate" placeholder="请输入最大收益" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金额要求" prop="amount">
            <el-input v-model="form.amount" placeholder="请输入金额最低晋级条件" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="推广人数" prop="spread_nums">
            <el-input v-model="form.spread_nums" placeholder="请输入推广人数" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="晋级奖励" prop="reward">
            <el-input v-model="form.reward" placeholder="请输入晋级奖励" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-select v-model="form.status">
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