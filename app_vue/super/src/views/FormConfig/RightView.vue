<script setup>
import {computed} from "vue";
const props = defineProps({
  modelValue: {
    type: Object
  }
})
const from = computed(()=>{
  return props.modelValue
})

const add = ()=>{
  from.value.option.push({
    label: '选择',
    value: '',
  })
}
</script>
<template>
  <el-form v-if="from.type" size="default" label-width="80px">
    <!-- 通用的 -->
      <el-divider content-position="left">通用</el-divider>
      <el-form-item label="类型">
        <el-input v-model="from.type" disabled/>
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="from.title"/>
      </el-form-item>
      <el-form-item label="数据键">
        <el-input v-model="from.k"/>
      </el-form-item>
      <el-form-item v-if="from.type!=='checkbox'" label="数据值">
        <el-input v-model="from.v"/>
      </el-form-item>
      <el-form-item v-if="'rows' in from" label="行数">
        <el-input v-model="from.rows"/>
      </el-form-item>
      <el-form-item v-if="'placeholder' in from" label="提示">
        <el-input v-model="from.placeholder"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="from.remark"/>
      </el-form-item>
      <el-form-item label="标签宽度">
        <el-input v-model="from.labelWidth"/>
      </el-form-item>
      <el-form-item v-if="'width' in from" label="宽度">
        <el-input v-model="from.width"/>
      </el-form-item>
      <el-form-item v-if="'disabled' in from" label="禁用">
        <el-switch v-model="from.disabled" />
      </el-form-item>
      <!-- === start 选项配置项 === -->
      <div v-if="'option' in from">
        <el-divider content-position="left">选项</el-divider>
        <div style="padding:10px;margin-bottom:5px;border: 1px solid #bcbbbb;" v-for="(item, index) in from.option" :key="index">
          <el-form-item label="选项名称">
            <el-input v-model="item.label"/>
          </el-form-item>
          <el-form-item label="选项值">
            <el-input v-model="item.value"/>
          </el-form-item>
          <el-form-item>
            <el-button @click="from.option.splice(index, 1)" type="danger">删除</el-button>
          </el-form-item>
        </div>
        <div>
          <el-button type="primary" @click="add()">添加元素</el-button>
        </div>
      </div>
      <!-- === end 选项配置项 === -->
  </el-form>
</template>