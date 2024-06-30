<script setup>
import {reactive, ref} from 'vue'
import api from '@/utils/api'
import AddView from './AddView.vue'
import {formatDate} from '@/utils/index'
import {ElMessage, ElMessageBox} from "element-plus";
//表单
const table = reactive({
  loading: false,
  total: 0,
  list: []
})
const query = reactive({
  ip:'',
  page: 1,
  limit: 15
})

//新增
const addShow = ref(false)

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getIPList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}
//获取列表
getList()

const del = (row) => {
  ElMessageBox.confirm('确认删除数据?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.delIPList({id: row.id})
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
        <span>IP黑名单</span>
        <div class="g-flex-justify-end g-flex-1">
          <el-button type="success" @click="addShow=true">新增黑名单</el-button>
        </div>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="IP地址">
        <el-row>
          <el-col :span="18">
            <el-input v-model="query.ip" @keyup.enter="getList" @clear="getList" placeholder="请输入查找IP" clearable></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-button type="primary" @click="getList">查询</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column label="ID" width="80">
        <template #default="scope">
          <div>{{ scope.row.id }}</div>
        </template>
      </el-table-column>
      <el-table-column label="ip" min-width="110">
        <template #default="scope">
          <div class="g-red">{{ scope.row.ip }}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150">
        <template #default="scope">
          <div>{{ formatDate(scope.row.create_time) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="150">
        <template #default="scope">
          <div>{{ formatDate(scope.row.modify_time) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">正常</span>
          <span v-else-if="scope.row.status===0" class="g-red">禁用</span>
          <span v-else class="g-red">异常</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" fixed="right">
        <template #default="scope">
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :page-sizes="[15, 30, 60, 100]" :total="table.total"
        v-model:page-size="query.limit" v-model:current-page="query.page"
        @current-change="getList(false)" @size-change="getList(false)"
        background small
        layout="total, sizes, prev, pager, next, jumper"
    />
    <AddView @success="getList" v-model="addShow" />
  </el-card>
</template>