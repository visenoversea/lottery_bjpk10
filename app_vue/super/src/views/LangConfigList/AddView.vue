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
  langConfigId:0,
  k: '',
  type: 0,
  content: '',
  status: 0
})

//打开
const open = () => {
  form.langConfigId = props.data.langConfigId
  form.type = 0
  form.k = ''
  form.content = ''
  form.status = 0
}



//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.addLangConfigList(form)
  loading.value = false
  if (!success) return
  //emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="新增" @open="open" draggable :close-on-click-modal="false" width="680px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-form-item label="键值">
        <el-input type="text" v-model="form.k" placeholder="键值"></el-input>
      </el-form-item>
      <el-form-item label="内容类型">
        <el-radio-group v-model="form.type">
          <el-radio class="g-green" :label="0">String</el-radio>
          <el-radio class="g-red" :label="1">Number</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status">
          <el-option label="待翻译" :value="0"></el-option>
          <el-option label="已翻译" :value="1"></el-option>
          <el-option label="不翻译" :value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>