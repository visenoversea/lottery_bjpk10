<script setup>
import {ElMessage} from 'element-plus'
import {Document, Close} from '@element-plus/icons-vue'
import api from '@/utils/api'
import {computed, ref} from "vue";

const loading = ref(false)
const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return []
    }
  },
  //上传类型 默认-后台上传  oss-阿里云上传
  type: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: ''
  },
  limit: {
    type: Number,
    default: 3
  },
  width: {
    type: String,
    default: '180px'
  },
  height: {
    type: String,
    default: '120px'
  },
})

const fileList = computed(() => {
  return props.modelValue
})

//获取文件名
const getFileName = (filePath) => {
  if (!filePath) {
    return ''
  }
  const end = filePath.lastIndexOf('?')
  if (end === -1) {
    return filePath.substring(filePath.lastIndexOf('/') + 1)
  }
  return filePath.substring(filePath.lastIndexOf('/') + 1, end)
}

//文件上传
const upload = async (param) => {
  if (fileList.value.length >= props.limit) {
    ElMessage.error('数量限制：' + props.limit)
    return
  }
  let formData = new FormData()
  formData.append('file', param.file)
  if (props.path) {
    formData.append('path', props.path)
  }
  formData.append('type', props.type)
  loading.value = true
  const {success, data} = await api.uploadFile(formData)
  loading.value = false
  if (!success) return
  ElMessage.success(data.msg)
  fileList.value.push(data.file.filePath)
}

const del = (index) => {
  fileList.value.splice(index, 1)
}
</script>
<template>
  <el-upload v-loading="loading" class="c_upload_multi_file" :http-request="upload" :show-file-list="false">
    <template #trigger>
      <el-button type="primary">上传文件</el-button>
    </template>
    <div class="c-file-list">
      <div v-for="(file,index) in fileList" :key="index" class="c-file">
        <el-icon>
          <Document/>
        </el-icon>
        <a class="c-file-name" target="_blank" :href="file" :download="getFileName(file)">{{ getFileName(file) }}</a>
        <el-icon class="c-file-del" @click="del(index)">
          <Close/>
        </el-icon>
      </div>
    </div>
  </el-upload>
</template>

<style lang="scss">
.c_upload_multi_file {
  .c-file-list {
    padding-top: 10px;

    .c-file {
      position: relative;
      cursor: pointer;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      overflow: hidden;
      padding: 15px 50px 15px 10px;
      margin-top: 5px;
      font-size: 16px;
      line-height: 16px;

      &:hover {
        background-color: #f5f7fa;
        color: #409EFF;
      }

      .c-file-name {
        padding-left: 5px;
        color: #409EFF;
      }

      .c-file-del {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>