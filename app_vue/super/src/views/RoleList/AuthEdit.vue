<script setup>
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
  menuData:[],
  //菜单默认选中节点
  menuChecked:[],
  menuProps: {
    children: 'children',
    label: 'title',
    class: (data) => {
      if (data.type == 1) {
        if (data.status == 1) {
          return 's-menu-show'
        } else {
          return 's-menu-hide'
        }
      } else {
        return 's-api'
      }
    }
  }
})

const tree = (list, parent_id = 0) => {
  //菜单
  let treeList = []
  list.forEach(item => {
    if (item.parent_id == parent_id) {
      item.children = tree(list, item.id)
      treeList.push(item)
    }
  })
  return treeList
}

const getAuthList = async () => {
  loading.value = true
  const {success, data} = await api.getAuthList({id:props.data.id})
  loading.value = false
  if (!success) return
  form.menuData = tree(data.list)
  form.menuChecked = data.menuChecked
}

//打开
const open = () => {
  getAuthList()
}
const treeRef = ref()
//确认
const confirm = async () => {
  const menuChecked = treeRef.value.getCheckedKeys(false)
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editAuth({id: props.data.id, menuChecked: menuChecked})
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog class="s-role-list-auth" v-model="show" top="2vh" title="编辑" @open="open" draggable :close-on-click-modal="false" width="680px">
    <el-tree ref="treeRef" node-key="id" :data="form.menuData" :default-checked-keys="form.menuChecked" :props="form.menuProps" show-checkbox check-strictly default-expand-all highlight-current>
    </el-tree>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.s-role-list-auth{
  .s-menu-hide{
    color: var(--g-purple);
  }
  .s-api{
    color: var(--g-red);
  }
}
</style>