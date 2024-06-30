<script setup>
import {reactive, ref} from 'vue'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
import AddView from './AddView.vue'
import EditView from './EditView.vue'
import {ElMessage, ElMessageBox} from "element-plus";
//表单
const table = reactive({
  loading: false,
  list: [],
  row:{}
})

const query = reactive({
  remark:'',
  code:'',
  status: ''
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getLangList(query)
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

const del = (row) => {
  ElMessageBox.confirm('确认删除数据?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.delLang({id: row.id})
    table.loading = false
    if (!success) return
    ElMessage.success(data.msg)
    await getList(false)
  })
}
</script>
<template>
  <el-card>
    <template #header>
      <div class="g-flex">
        <span>语言列表</span>
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
      <el-form-item label="编码">
        <el-input v-model="query.code"  @keyup.enter="getList" placeholder="请输入编码" @clear="getList" clearable />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="query.remark"  @keyup.enter="getList" placeholder="请输入备注" @clear="getList" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column prop="id" label="ID" width="50">
      </el-table-column>
      <el-table-column prop="name" label="语言" min-width="100">
      </el-table-column>
      <el-table-column prop="code" label="编码" width="100">
      </el-table-column>
      <el-table-column label="图标" width="150">
        <template #default="scope">
          <el-image v-if="scope.row.icon" :src="scope.row.icon" :preview-src-list="[scope.row.icon]" fit="contain" hide-on-click-modal preview-teleported />
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="100">
      </el-table-column>
      <el-table-column prop="sort" label="排序" min-width="100">
      </el-table-column>
      <el-table-column label="状态" width="80" >
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">正常</span>
          <span v-else-if="scope.row.status===0" class="g-red">禁用</span>
          <span class="g-red" v-else>异常</span>
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
      <el-table-column label="操作" width="135" fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddView @success="getList" v-model="addShow" />
    <EditView @success="getList(false)" v-model="editShow" :data="table.row"/>
  </el-card>
</template>