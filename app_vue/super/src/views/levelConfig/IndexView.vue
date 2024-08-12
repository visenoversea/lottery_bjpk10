<script setup>
import {reactive, ref} from 'vue'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
import EditView from './EditView.vue'
//表单
const table = reactive({
  loading: false,
  list: [],
  row:{}
})

const query = reactive({
  status: ''
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getLevelList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
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
  <el-card>
    <template #header>
      <div class="g-flex">
        <span>等级配置</span>
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
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column prop="id" label="ID" width="50">
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="100">
      </el-table-column>
      <el-table-column label="图标" width="150">
        <template #default="scope">
          <el-image v-if="scope.row.img" :src="scope.row.img" :preview-src-list="[scope.row.img]" fit="contain" hide-on-click-modal preview-teleported />
        </template>
      </el-table-column>
      <el-table-column prop="nums" label="量化次数" min-width="100">
      </el-table-column>
      <el-table-column prop="min" label="最小余额" min-width="100">
      </el-table-column>
      <el-table-column prop="max" label="最大余额" min-width="100">
      </el-table-column>
      <el-table-column prop="min_rate" label="最小收益" min-width="100">
      </el-table-column>
      <el-table-column prop="max_rate" label="最大收益" min-width="100">
      </el-table-column>
      <el-table-column prop="reward" label="晋级奖励" min-width="100">
      </el-table-column>
      <el-table-column prop="amount" label="金额要求" min-width="100">
      </el-table-column>
      <el-table-column prop="spread_nums" label="推广人数要求" min-width="100">
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
      <el-table-column label="操作" width="80" fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditView @success="getList(false)" v-model="editShow" :data="table.row"/>
  </el-card>
</template>