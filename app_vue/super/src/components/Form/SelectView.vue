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
    <el-select v-model="formItem.v" :style="{width: formItem.width}" :disabled="formItem.disabled" :placeholder="formItem.placeholder">
      <el-option v-for="(item,index) in formItem.option" :label="item.label" :value="item.value" :key="index" />
    </el-select>
  </el-form-item>
</template>