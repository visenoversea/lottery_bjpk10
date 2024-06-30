<script setup>
import {reactive, ref} from 'vue'
import api from '@/utils/api'
import EditView from './EditView.vue'
import {formatDate} from '@/utils/index'
//表单
const table = reactive({
  loading: false,
  total: 0,
  list: []
})
const query = reactive({
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getLotteryList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}
//获取列表
getList()

//编辑
const editShow = ref(false)
const edit = (row) => {
  table.row = row
  editShow.value = true
}
</script>
<template>
  <el-card class="v_lottery_data">
    <template #header>
      <div class="g-flex">
        <span>彩种设置</span>
      </div>
    </template>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column label="ID" width="100">
        <template #default="scope">
          <div>{{ scope.row.id }}</div>
        </template>
      </el-table-column>
      <el-table-column label="彩种" min-width="100">
        <template #default="scope">
          <div>{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="150">
        <template #default="scope">
          <el-image v-if="scope.row.icon" :src="scope.row.icon" :preview-src-list="[scope.row.icon]" fit="contain" hide-on-click-modal preview-teleported />
        </template>
      </el-table-column>
      <el-table-column label="时间间隔" min-width="100">
        <template #default="scope">
          <div>{{ scope.row.interval_time }}秒</div>
        </template>
      </el-table-column>
      <el-table-column label="封盘时间" min-width="100">
        <template #default="scope">
          <div>{{ scope.row.stop_time }}秒</div>
        </template>
      </el-table-column>
      <el-table-column label="杀率" min-width="100">
        <template #default="scope">
          <div>{{ scope.row.risk }}%</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="130">
        <template #default="scope">
          <div>{{ formatDate(scope.row.create_time) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="130">
        <template #default="scope">
          <div>{{ formatDate(scope.row.modify_time) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" >
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">正常</span>
          <span v-else-if="scope.row.status===0" class="g-purple">禁用</span>
          <span class="g-red" v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
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
    <EditView @success="getList(false)" v-model="editShow" :data="table.row"/>
  </el-card>
</template>