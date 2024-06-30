<script setup>
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
    <el-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model="formItem.v" :style="{width: formItem.width}" :disabled="formItem.disabled" type="datetime" :placeholder="formItem.placeholder" />
  </el-form-item>
</template>