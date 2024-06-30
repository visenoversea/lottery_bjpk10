<script setup>
import {reactive} from 'vue'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
//表单
const table = reactive({
  loading: false,
  total: 0,
  list: []
})
const query = reactive({
  open_expect:'',
  lottery_id:'',
  date_time: [],
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getLotteryDataHistoryList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}
//获取列表
getList()
</script>
<template>
  <el-card class="v_lottery_data">
    <template #header>
      <div class="g-flex">
        <span>开奖历史</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="彩种">
        <el-select v-model="query.lottery_id" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="VIP1" value="1"></el-option>
          <el-option label="VIP2" value="2"></el-option>
          <el-option label="VIP3" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker value-format="YYYY-MM-DD HH:mm:ss"
            v-model="query.date_time"
            @change="getList"
            type="datetimerange"
            :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
            range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item label="开奖期号">
        <el-row>
          <el-col :span="18">
            <el-input v-model="query.open_expect" @keyup.enter="getList" @clear="getList" placeholder="请输入开奖期号" clearable></el-input>
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
      <el-table-column label="开奖期号" min-width="100">
        <template #default="scope">
          <div class="g-blue">{{ scope.row.open_expect }}</div>
        </template>
      </el-table-column>
      <el-table-column label="开奖号码" min-width="100">
        <template #default="scope">
          <div class="g-red">{{ scope.row.open_code }}</div>
        </template>
      </el-table-column>
      <el-table-column label="总和" min-width="60">
        <template #default="scope">
          <div class="g-purple">{{ scope.row.zh }}</div>
        </template>
      </el-table-column>
      <el-table-column label="结果" min-width="80">
        <template #default="scope">
          <div>
            <span v-if="scope.row.zh>=14" class="g-red">大</span>
            <span v-else class="g-blue">小</span>
            <span v-if="scope.row.zh % 2 !=0" class="g-green">单</span>
            <span v-else class="g-purple">双</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="开奖时间" width="130">
        <template #default="scope">
          <div>{{ formatDate(scope.row.open_time) }}</div>
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
  </el-card>
</template>