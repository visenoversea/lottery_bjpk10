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
  tl_content: '',
})

//打开
const open = () => {
  form.id = props.data.id
  form.tl_content = props.data.tl_content
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editTranslate(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="编辑" @open="open" draggable :close-on-click-modal="false" width="680px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="id">{{ props.data.id }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="语言">{{ props.data.tl }}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="MD5">{{ props.data.md5 }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型">
            <span v-if="props.data.type==0" class="g-green">文字</span>
            <span v-else-if="props.data.type==1" class="g-red">富文本</span>
            <span v-else-if="props.data.type==2" class="g-purple">图片</span>
            <span v-else class="g-red">异常</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="内容" prop="tl_content">
        <el-input v-if="props.data.type==0" type="textarea" :rows="4" v-model="form.tl_content" placeholder="请输入内容" autocomplete="off"></el-input>
        <WangEditor v-else-if="props.data.type==1" v-model="form.tl_content"/>
        <UploadImg v-else-if="props.data.type==2" v-model="form.tl_content"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>