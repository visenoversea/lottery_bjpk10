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
    <el-checkbox-group v-model="formItem.v">
      <el-checkbox v-for="(item,index) in formItem.option" :disabled="item.disabled" :label="item.value" :key="index">{{item.label}}</el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>