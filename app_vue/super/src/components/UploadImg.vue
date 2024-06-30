<script setup>
import {ElMessage} from 'element-plus'
import {Plus, Close} from '@element-plus/icons-vue'
import api from '@/utils/api'
import {ref} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  //上传类型 默认-后台上传  oss-阿里云上传
  type:{
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '150px'
  },
  height: {
    type: String,
    default: '100px'
  },
})
const loading = ref(false)
const emits = defineEmits(['update:modelValue'])

//文件上传
const upload = async (param) => {
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
  emits('update:modelValue', data.file.filePath)
}
const del = () => {
  emits('update:modelValue', '')
}
</script>
<template>
  <el-upload v-loading="loading" class="c_upload_img" :class="{'c-upload-hide':props.modelValue}" :http-request="upload" accept="image/gif,image/jpeg,image/png"
             :show-file-list="false">
    <template #trigger>
      <el-icon :style="{width:props.width,height:props.height}" class="c-avatar">
        <Plus/>
      </el-icon>
    </template>
    <div v-if="props.modelValue" class="c-img">
      <el-image :style="{width:props.width,height:props.height}" :src="props.modelValue"
                :preview-src-list="[props.modelValue]" fit="contain" preview-teleported/>
      <el-icon class="c-img-del" @click="del">
        <Close/>
      </el-icon>
    </div>
  </el-upload>
</template>

<style lang="scss">
.c_upload_img {
  display: inline-flex;
  flex-wrap: wrap;
  &.c-upload-hide{
    .el-upload{
      display: none;
    }
  }
  .c-img,.el-upload{
    position: relative;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
  .c-img {
    padding-top: 10px;
    .c-img-del {
      position: absolute;
      background-color: var(--g-grey);
      color: var(--g-white);
      cursor: pointer;
      font-size: 15px;
      top: 1px;
      right: 1px;
    }
  }
}
</style>