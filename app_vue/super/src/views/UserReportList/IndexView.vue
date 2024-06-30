<script setup>
import {reactive} from 'vue'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
//表单
const table = reactive({
  loading: false,
  list: [],
})

const query = reactive({
  date_time: []
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getReportList(query)
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
        <span>资金报表</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="时间">
        <el-date-picker value-format="YYYY-MM-DD HH:mm:ss"
            v-model="query.date_time"
            @change="getList"
            type="daterange"
            range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" />
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column prop="date" label="日期" width="100">
      </el-table-column>
      <el-table-column label="注册人数" width="65px">
        <template #default="scope">
          <span class="g-purple">{{ scope.row.userNums }}</span>
        </template>
      </el-table-column>
      <el-table-column label="返佣收益" width="80px">
        <template #default="scope">
          <span class="g-purple">{{ scope.row.commission }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合计收益" width="80px">
        <template #default="scope">
          <span class="g-purple">{{ scope.row.totalProfit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="首充用户" width="65px">
        <template #default="scope">
          <span class="g-blue">{{ scope.row.firstRechargeNums }}</span>
        </template>
      </el-table-column>
      <el-table-column label="首充金额">
        <template #default="scope">
          <span class="g-blue">{{ scope.row.firstRechargeAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="赠送充值" width="80px">
        <template #default="scope">
          <span class="g-green">{{ scope.row.rechargeGift }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际充值" min-width="80px">
        <template #default="scope">
          <div><span class="g-green">{{ scope.row.recharge }}</span>({{ scope.row.rechargeNums }}笔)</div>
        </template>
      </el-table-column>
      <el-table-column label="实际提现" min-width="80px">
        <template #default="scope">
          <div><span class="g-red">{{ scope.row.withdraw }}</span>({{ scope.row.withdrawNums }}笔)</div>
        </template>
      </el-table-column>
      <el-table-column label="总充提差" min-width="80px">
        <template #default="scope">
          <span :class="scope.row.kesun>=0?'g-green':'g-red'">{{ scope.row.kesun }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>