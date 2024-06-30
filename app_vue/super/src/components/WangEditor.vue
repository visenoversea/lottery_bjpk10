<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {computed, onBeforeUnmount, ref, shallowRef} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import api from "@/utils/api";
import {ElMessage} from "element-plus";
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  //上传类型 默认-后台上传 oss-阿里云上传
  uploadType: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: '300px'
  },
  toolbarConfig:{
    type: Object,
    default(){
      return {}
    }
  }
})
const loading = ref(false)
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage:{
      async customUpload(file, insertFn) {
        // file 即选中的文件
        // 自己实现上传，并得到图片 url alt href
        let formData = new FormData()
        formData.append('file', file)
        formData.append('type', props.uploadType)
        loading.value = true
        const {success, data} = await api.uploadFile(formData)
        loading.value = false
        if (!success) return
        ElMessage.success(data.msg)
        //最后插入图片
        // insertFn(url, alt, href)
        insertFn(data.file.filePath)
      }
    },
    uploadVideo: {
      async customUpload(file, insertFn) {
        // file 即选中的文件
        // 自己实现上传，并得到视频 url poster   海报
        let formData = new FormData()
        formData.append('file', file)
        formData.append('type', props.uploadType)
        loading.value = true
        const {success, data} = await api.uploadFile(formData)
        loading.value = false
        if (!success) return
        ElMessage.success(data.msg)
        // 最后插入视频
        insertFn(data.file.filePath)
      }
    }
  }
}

const emits = defineEmits(['update:modelValue'])
// 'default' 或 'simple'
const mode = ref('simple')
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML 做双向绑定处理
const valueHtml = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  }
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const handleCreated = (editor) => {
  // 记录 editor 实例，重要！
  editorRef.value = editor
}
</script>
<template>
  <div v-loading="loading" class="c_wang_editor">
    <Toolbar
        class="c-toolbar"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor class="c-editor" v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
            :style="{height:props.height}"
    />
  </div>
</template>

<style lang="scss">
.c_wang_editor {
  border: 1px solid #ccc;
  .c-toolbar {
    border-bottom: 1px solid #ccc
  }
  .c-editor {
    overflow-y: hidden;
  }
}
</style>