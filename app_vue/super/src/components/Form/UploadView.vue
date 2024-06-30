<script setup>
import UploadFile from '@/components/UploadFile.vue'
import {computed} from "vue";
const props = defineProps({
  item:{
    type:Object,
    default(){
      return {}
    }
  }
})
const formItem = computed(()=>{
  return props.item
})
</script>
<template>
  <el-form-item :label-width="formItem.labelWidth" :label="formItem.title">
    <UploadFile v-model="formItem.v" :type="formItem.uploadType" :path="formItem.path" />
  </el-form-item>
</template>