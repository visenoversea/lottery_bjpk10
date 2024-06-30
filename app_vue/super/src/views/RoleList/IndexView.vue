<script setup>
import {reactive, ref} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
import AddView from './AddView.vue'
import EditView from './EditView.vue'
import AuthEdit from './AuthEdit.vue'

//表单
const table = reactive({
  loading: false,
  list: [],
  row:{}
})

const query = reactive({
  status: '',
  search_key: 'name',
  search_val: '',
})

const getList = async () => {
  table.loading = true
  const {success, data} = await api.getRoleList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
}
//获取列表
getList()
//新增
const addShow = ref(false)
//编辑
const editShow = ref(false)
const edit = (row) => {
  table.row = row
  editShow.value = true
}
//授权
const authShow = ref(false)
const auth = (row) => {
  table.row = row
  authShow.value = true
}
//删除
const del = (row) => {
  ElMessageBox.confirm('确认删除数据?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.delRole({id: row.id})
    table.loading = false
    if (!success) return
    ElMessage.success(data.msg)
    await getList()
  })
}
</script>
<template>
  <el-card>
    <template #header>
      <div class="g-flex">
        <span>角色管理</span>
        <div class="g-flex-justify-end g-flex-1">
          <el-button type="success" @click="addShow=true">新增</el-button>
        </div>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="状态">
        <el-select v-model="query.status" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <template #label>
          <el-select v-model="query.search_key">
            <el-option label="角色名称" value="name"></el-option>
          </el-select>
        </template>
        <el-row>
          <el-col :span="18">
            <el-input v-model="query.search_val" @keyup.enter="getList" @clear="getList()"
                      placeholder="请输入查找内容" clearable></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-button type="primary" @click="getList">查询</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column label="id" prop="id" width="80" />
      <el-table-column label="角色名称" prop="name" min-width="100" show-overflow-tooltip> </el-table-column>
      <el-table-column label="备注" prop="remark" min-width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column label="排序" prop="sort" width="50" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" width="50" >
        <template #default="scope">
          <span class="g-green" v-if="scope.row.status">正常</span>
          <span class="g-red" v-else>禁用</span>
        </template>
      </el-table-column>
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
          <el-button type="success" @click="auth(scope.row)">权限配置</el-button>
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddView @success="getList" v-model="addShow" />
    <EditView @success="getList" v-model="editShow" :data="table.row"/>
    <AuthEdit v-model="authShow" :data="table.row"/>
  </el-card>
</template>