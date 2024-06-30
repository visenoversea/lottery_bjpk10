<script setup>
import WangEditor from '@/components/WangEditor.vue'
// import UploadImg from '@/components/UploadImg.vue'
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
  title: '',
  img:'',
  des:'',
  content: '',
  read_nums:0,
  create_time:'',
  status:1
})

//打开
const open = () => {
  form.id = props.data.id
  form.title = props.data.title
  form.img = props.data.img
  form.des = props.data.des
  form.content = props.data.content
  form.read_nums = props.data.read_nums
  form.create_time = new Date(props.data.create_time * 1000)
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editArticle(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="编辑" @open="open" :close-on-click-modal="false" width="700px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="阅读数量" prop="title">
            <el-input v-model="form.read_nums" placeholder="请输入阅读数量" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布时间" prop="create_time">
            <el-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model="form.create_time" type="datetime" placeholder="请选择发布时间"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-select v-model="form.status">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
<!--      <el-form-item label="描述" prop="des">-->
<!--        <el-input :rows="3" type="textarea" v-model="form.des" placeholder="请输入描述" autocomplete="off"></el-input>-->
<!--      </el-form-item>-->
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