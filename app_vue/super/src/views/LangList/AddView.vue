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
  code: '',
  name: '',
  icon: '',
  remark:'',
  sort: 0
})

//关闭
const close = async () => {
  refForm.value.resetFields()
}

const lang = reactive({
  index:'',
  list:[]
})

const getLangList = async () => {
  const {success, data} = await api.getLangList({status:-1})
  if (!success) return
  lang.list = data.list
}

getLangList()

const selectLang = index => {
  const langData = lang.list[index];
  form.code=langData.code
  form.name=langData.name
  form.icon=langData.icon
  form.remark=langData.remark
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.addLang(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="新增" @close="close" draggable :close-on-click-modal="false" width="620px">
    <el-form v-loading="loading" size="default" ref="refForm" :model="form" label-width="90px">
      <el-form-item label="选择语言" prop="code">
        <el-select v-model="lang.index" @change="selectLang">
          <el-option v-for="(item,index) in lang.list" :key="item.id" :label="item.remark" :value="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="form.code" placeholder="请输入语言编码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="语言" prop="name">
        <el-input v-model="form.name" placeholder="请输入语言" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <UploadImg v-model="form.icon"/>
        <el-input v-model="form.icon"/>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入备注" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" placeholder="请输入排序" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>