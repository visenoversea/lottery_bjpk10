<script setup>
import WangEditor from '@/components/WangEditor.vue'
import UploadImg from '@/components/UploadImg.vue'
import api from '@/utils/api'
import {computed, reactive, ref} from "vue";
import {ElMessage} from "element-plus";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  type: {
    type: Number,
    default: function () {
      return 0
    }
  },
  content: {
    type: String,
    default: function () {
      return ''
    }
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
  tl_content: ''
})

const obj = reactive({
  langIndex:'',
  langList:[]
})

const getLangList = async () => {
  const {success, data} = await api.getLangList({status:1})
  if (!success) return
  obj.langList = data.list
  obj.langIndex = 0
  getTranslateInfo()
}

const getTranslateInfo = async () => {
  let lang = obj.langList[obj.langIndex]
  if (!lang) {
    return
  }
  loading.value=true
  const {success, data} = await api.getTranslateInfo({type: props.type, content: props.content, tl: lang.code})
  loading.value=false
  if (!success) return
  form.id = data.info.id
  form.tl_content = data.info.tl_content
}

//打开
const open = () => {
  if (obj.langList.length === 0) {
    getLangList()
  } else {
    obj.langIndex = 0
    getTranslateInfo()
  }
}

const confirm = async () => {
  loading.value = true
  const {success, data} = await api.editTranslate(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  // show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="编辑" @open="open" draggable :close-on-click-modal="false" width="680px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="选择语言">
            <el-select v-model="obj.langIndex" @change="getTranslateInfo()">
              <el-option v-for="(item,index) in obj.langList" :key="item.id" :label="item.name" :value="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ID">{{form.id}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="内容" prop="tl_content">
        <el-input v-if="props.type==0" type="textarea" :rows="4" v-model="form.tl_content" placeholder="请输入内容" autocomplete="off"></el-input>
        <WangEditor v-else-if="props.type==1" v-model="form.tl_content"/>
        <UploadImg v-else-if="props.type==2" v-model="form.tl_content"/>
      </el-form-item>
    </el-form>
    <template #footer>
<!--      <el-button size="default" @click="show=false">取 消</el-button>-->
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>