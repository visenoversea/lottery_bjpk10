<script setup>
import {ElMessage} from 'element-plus'
import api from '@/utils/api'
import {ref} from "vue";

const loading = ref(false)
const props = defineProps({
  //传参数
  data: {
    type: Object,
    default() {
      return {
        //上传类型 默认-后台上传  oss-阿里云上传
        type: '',
        //路径
        path: ''
      }
    }
  },
  label: {
    type: String,
    default:'上传'
  },
  apiUrl: {
    type: String,
    default() {
      return 'uploadFile'
    }
  }
})
const emits = defineEmits(['success'])

//文件上传
const upload = async (param) => {
  let formData = new FormData()
  formData.append('file', param.file)
  for (let k in param.data) {
    formData.append(k, param.data[k])
  }
  loading.value = true
  const {success, data} = await api[props.apiUrl](formData)
  loading.value = false
  if (!success) return
  ElMessage.success(data.msg)
  emits('success', data)
}
</script>
<template>
  <el-upload style="display: inline-flex;padding: 0 12px;" v-loading="loading" :data="props.data" :http-request="upload" :show-file-list="false">
    <el-button type="primary">{{props.label}}</el-button>
  </el-upload>
</template>