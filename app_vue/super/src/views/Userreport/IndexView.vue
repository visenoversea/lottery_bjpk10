<script setup>
import { reactive } from 'vue'
import api from '@/utils/api'
import { formatDate } from '@/utils/index'
//表单
const table = reactive({
  loading: false,
  list: [],
})

const query = reactive({
  date_time: [],
  search_key: '',
  search_val: '',
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const { success, data } = await api.getUserReport(query)
  table.loading = false
  if (!success) return
  table.list = data.list
}
//获取列表
getList()
</script>
<template>
  <el-card>
    <template #header>
      <div class="g-flex">
        <span>用户报表</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="时间">
        <el-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model="query.date_time" @change="getList" type="daterange"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <el-select v-model="query.search_key">
            <el-option label="用户ID" value="user_id"></el-option>
            <el-option label="上级代理" value="agent"></el-option>
          </el-select>
        </template>
        <el-row>
          <el-col :span="18">
            <el-input v-model="query.search_val" @keyup.enter="getList" @clear="getList" placeholder="请输入查找内容"
              clearable></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-button type="primary" @click="getList">查询</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column prop="date" label="日期" min-width="100px">
      </el-table-column>
      <el-table-column label="下注金额" min-width="100px">
        <template #default="scope">
          <span class="g-purple">{{ scope.row.betAmount ? Number(scope.row.betAmount).toFixed(2) : 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="派奖金额" min-width="100px">
        <template #default="scope">
          <span class="g-purple">{{ scope.row.winAmount ? Number(scope.row.winAmount).toFixed(2) : 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="盈亏" min-width="100px">
        <template #default="scope">
          <span class="g-purple">{{ scope.row.betProfit ? Number(scope.row.betProfit).toFixed(2) : 0 }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>