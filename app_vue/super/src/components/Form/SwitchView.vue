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
    <el-switch v-model="formItem.v" active-value="1" inactive-value="0" :disabled="formItem.disabled"></el-switch>
  </el-form-item>
</template>