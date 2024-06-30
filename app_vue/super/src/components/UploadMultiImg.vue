<script setup>
import {ElMessage} from 'element-plus'
import {Close} from '@element-plus/icons-vue'
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
  type:{
    type: String,
    default: ''
  },
  showInput:{
    type: Boolean,
    default: false
  },
  path: {
    type: String,
    default: ''
  },
  limit:{
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

const imgList = computed(()=>{
  return props.modelValue
})

//文件上传
const upload = async (param) =>{
  if (imgList.value.length >= props.limit) {
    ElMessage.error('最多只能上传' + props.limit + '张图片')
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
  imgList.value.push(data.file.filePath)
}

const del = (index) => {
  imgList.value.splice(index, 1)
}
</script>
<template>
  <el-upload v-loading="loading" class="c_upload_multi_img" :http-request="upload" accept="image/gif,image/jpeg,image/png" :show-file-list="false">
    <template #trigger>
      <el-button type="primary">上传图片</el-button>
    </template>
    <div class="c-img-list">
      <div v-for="(img,index) in imgList" :key="index" class="c-img">
        <el-image :style="{width:props.width,height:props.height}" :src="img"
                  :preview-src-list="[img]" fit="contain" preview-teleported/>
        <el-icon class="c-img-del" @click="del(index)">
          <Close/>
        </el-icon>
        <div v-if="showInput">
          <el-input v-model="imgList[index]"/>
        </div>
      </div>
    </div>
  </el-upload>
</template>

<style lang="scss">
.c_upload_multi_img {
  .c-img-list{
    display: flex;
    flex-wrap: wrap;
    padding-top: 5px;
    .c-img {
      position: relative;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      overflow: hidden;
      padding-top: 10px;
      margin: 0 5px 5px 0;
      &:hover {
        border-color: #409EFF;
      }
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
}
</style>