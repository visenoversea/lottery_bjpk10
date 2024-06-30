<script setup>
import UploadImg from '@/components/UploadImg.vue'
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import api from '@/utils/api'
import useStore from '@/stores/index'
const store = useStore()

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
  country: '',
  icon: '',
  area_code:'',
  sort:'',
  status: 1
})

//打开
const open = () => {
  form.id = props.data.id
  form.country = props.data.country
  form.area_code = props.data.area_code
  form.icon = props.data.icon
  form.sort = props.data.sort
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editCountryArea(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" title="编辑" @open="open" :close-on-click-modal="false" width="520px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-form-item label="国家">
        <el-input v-model="form.country" placeholder="请输入国家名字" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="img">
        <UploadImg v-model="form.icon"/>
        <el-input v-model="form.icon"/>
      </el-form-item>
      <el-form-item label="手机区号">
        <el-input v-model="form.area_code" placeholder="请输入手机区号" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" placeholder="排序值越大排越前" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>