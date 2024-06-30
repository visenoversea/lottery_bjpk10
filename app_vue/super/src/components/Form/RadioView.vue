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
    <el-radio-group v-model="formItem.v">
      <el-radio v-for="(item,index) in formItem.option" :disabled="item.disabled" :label="item.value" :key="index">{{item.label}}</el-radio>
    </el-radio-group>
  </el-form-item>
</template>