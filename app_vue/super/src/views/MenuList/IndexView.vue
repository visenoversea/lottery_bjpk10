<script setup>
import {reactive, ref} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus"
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
import AddView from './AddView.vue'
import EditView from './EditView.vue'

//表单
const table = reactive({
  loading: false,
  total: 0,
  list: [],
  row:{},
  parent_id:0
})

const tableRowClassName = (data) => {
  if (data.row.type === 1) {
    return 'v-menu';
  }
  return 'v-api';
}


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

const getList = async () => {
  table.loading = true
  const {success, data} = await api.getMenuList()
  table.loading = false
  if (!success) return
  table.list = tree(data.list)
}
getList()
//新增
const addShow = ref(false)
const add = (parent_id) => {
  table.parent_id = parent_id
  addShow.value = true
}
//编辑
const editShow = ref(false)
const edit = (row) => {
  table.row = row
  editShow.value = true
}
const del = (row) => {
  ElMessageBox.confirm('确认删除数据?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.delMenu({id: row.id})
    table.loading = false
    if (!success) return
    ElMessage.success(data.msg)
    await getList()
  })
}

</script>
<template>
 <el-card class="v_menu_list">
   <template #header>
     <div class="g-flex">
       <span>菜单列表</span>
       <div class="g-flex-justify-end g-flex-1">
         <el-button type="success" @click="add(0)">新增</el-button>
       </div>
     </div>
   </template>
   <el-table v-loading="table.loading" :data="table.list" row-key="id" :row-class-name="tableRowClassName" border>
     <el-table-column label="id" prop="id" width="110" />
     <el-table-column label="标题" prop="title" min-width="120" show-overflow-tooltip> </el-table-column>
     <el-table-column label="类型" width="65" show-overflow-tooltip>
       <template #default="scope">
         <span v-if="scope.row.type==1" class="g-red">菜单</span>
         <span v-else class="g-purple">Api接口</span>
       </template>
     </el-table-column>
     <el-table-column label="路径" prop="path" min-width="180" show-overflow-tooltip> </el-table-column>
     <el-table-column label="路由名字" prop="name" width="100" show-overflow-tooltip> </el-table-column>
     <el-table-column label="组件名" prop="component" width="120" show-overflow-tooltip> </el-table-column>
     <el-table-column label="状态" width="50" show-overflow-tooltip>
       <template #default="scope">
         <span class="g-green" v-if="scope.row.status">显示</span>
         <span class="g-red" v-else>隐藏</span>
       </template>
     </el-table-column>
     <el-table-column label="排序" prop="sort" width="50" show-overflow-tooltip></el-table-column>
     <el-table-column label="创建时间" width="130">
       <template #default="scope">
         <span>{{formatDate(scope.row.create_time)}}</span>
       </template>
     </el-table-column>
     <el-table-column label="更新时间" width="130">
       <template #default="scope">
         <span>{{formatDate(scope.row.modify_time)}}</span>
       </template>
     </el-table-column>
     <el-table-column label="操作" width="210" fixed="right">
       <template #default="scope">
         <el-button type="success" @click="add(scope.row.id)">新增下级</el-button>
         <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
         <el-button type="danger" @click="del(scope.row)">删除</el-button>
       </template>
     </el-table-column>
   </el-table>
   <AddView @success="getList" v-model="addShow" :parentId="table.parent_id" />
   <EditView @success="getList(false)" v-model="editShow" :data="table.row" />
 </el-card>
</template>
<style lang='scss'>
.v_menu_list {
  .v-menu {
    color: var(--el-table-text-color);
  }
  .v-api {
    color: var(--g-red);
  }
}
</style>
