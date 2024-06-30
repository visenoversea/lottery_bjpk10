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
  lottery_id:2,
  lottery_room_id:'',
  date_time: [],
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getLotteryPlayedList(query)
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
        <span>赔率设置</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="房间">
        <el-select v-model="query.lottery_room_id" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="普通厅" value="21"></el-option>
          <el-option label="中级厅" value="22"></el-option>
          <el-option label="高级厅" value="23"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下注内容">
        <el-row>
          <el-col :span="18">
            <el-input v-model="query.name" @keyup.enter="getList" @clear="getList" placeholder="请输入下注内容" clearable></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-button type="primary" @click="getList">查询</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column label="彩种" width="100">
        <template #default="scope">
          <div>{{ scope.row.lottery.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="房间" min-width="100">
        <template #default="scope">
          <div class="g-purple">{{ scope.row.lotteryRoom.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="下注内容" min-width="100">
        <template #default="scope">
          <div class="g-blue">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="赔率" min-width="100">
        <template #default="scope">
          <div class="g-red">{{ scope.row.odds }}</div>
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
      <el-table-column label="状态" width="80" >
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">正常</span>
          <span v-else-if="scope.row.status===0" class="g-purple">禁用</span>
          <span class="g-red" v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" fixed="right">
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