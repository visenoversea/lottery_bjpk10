<script setup>
import {ref} from "vue"
import {Top, Bottom, Delete} from '@element-plus/icons-vue'
import form from '@/components/Form/index'
const emits = defineEmits(['select','up','down','del'])
const props = defineProps({
  list: {
    type: Object,
    default(){
      return []
    }
  }
})
const selectIndex =ref(-1)
const select = (index) => {
  selectIndex.value = index
  emits('select', props.list[index])
}
const up = (index) => {
  if (index === 0) {
    return
  }
  emits('up', index)
  select(index - 1)
}
const down = (index) => {
  if (index === props.list.length - 1) {
    return;
  }
  emits('down', index)
  select(index + 1)
}
const del = (index) => {
  selectIndex.value = -1
  emits('del', index)
}
</script>
<template>
  <el-form size="default" class="s_form_config_center">
    <template v-for="(item, index) in props.list" :key="index">
      <div class="s-list" :class="{'s-active': selectIndex==index}">
        <el-icon @click="up(index)" :size="22" class="s-icon-top"><Top /></el-icon>
        <el-icon @click="down(index)" :size="22" class="s-icon-bottom"><Bottom /></el-icon>
        <el-icon @click="del(index)" :size="20" class="s-icon-delete"><Delete /></el-icon>
        <component @click="select(index)" class="s-component" :is="form[item.type]" :item="item" />
      </div>
    </template>
  </el-form>
</template>

<style lang='scss'>
.s_form_config_center {
  width: 100%;
  height: 100%;
  min-width: 380px;
  padding: 5px;
  overflow: auto;
  .s-list{
    position: relative;
    cursor: pointer;
    padding: 5px;
    border: 1px solid var(--g-white);
    .s-component{
      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
      }
    }
    .el-icon{
      z-index: 999;
      color: var(--g-white);
    }
    .s-icon-top{
      display: none;
      position: absolute;
      background-color: var(--g-green-tiffany);
      left: -1px;
      top: 0;
    }
    .s-icon-bottom{
      display: none;
      position: absolute;
      background-color: var(--g-green-tiffany);
      left: -1px;
      bottom: 0;
    }
    .s-icon-delete{
      display: none;
      position: absolute;
      background-color: var(--g-green-tiffany);
      right: -1px;
      top: 0;
    }
    &.s-active{
      border: 1px solid var(--g-green-tiffany);
      .s-icon-top{
        display: block;
      }
      .s-icon-bottom{
        display: block;
      }
      .s-icon-delete{
        display: block;
      }
    }
  }
}
</style>