<script setup>
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import WangEditor from '@/components/WangEditor.vue'
// import UploadImg from '@/components/UploadImg.vue'
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
  type: 2,
  title: '',
  img:'',
  des:'',
  content: '',
  create_time:''
})

//关闭
const close = async () => {
  refForm.value.resetFields()
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.addArticle(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="新增" @close="close" :close-on-click-modal="false" width="700px">
    <el-form v-loading="loading" size="default" ref="refForm" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布时间" prop="create_time">
            <el-date-picker value-format="YYYY-MM-DD HH:mm:ss"
                v-model="form.create_time"
                type="datetime"
                placeholder="请选择发布时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="描述" prop="des">
        <el-input type="textarea" :rows="3" v-model="form.des" placeholder="请输入描述" autocomplete="off"></el-input>
      </el-form-item>
<!--      <el-form-item label="图片" prop="img">-->
<!--        <UploadImg v-model="form.img"/>-->
<!--      </el-form-item>-->
      <el-form-item label="内容" prop="content">
        <WangEditor v-model="form.content" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>