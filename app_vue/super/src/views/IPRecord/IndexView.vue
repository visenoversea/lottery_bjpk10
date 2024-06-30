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
  userType: '',
  virtual: '',
  ip:'',
  date_time: [],
  search_key: 'address',
  search_val: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getIPRecord(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}
//获取列表
getList()
</script>
<template>
  <el-card>
    <template #header>
      <div class="g-flex">
        <span>IP记录</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="IP地址">
        <el-input v-model="query.ip" @keyup.enter="getList" @clear="getList" placeholder="请输入查找IP" clearable></el-input>
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
      <el-form-item>
        <template #label>
          <el-select v-model="query.search_key">
            <el-option label="地址" value="address"></el-option>
            <el-option label="ISP" value="isp"></el-option>
            <el-option label="邀请码" value="tid"></el-option>
          </el-select>
        </template>
        <el-row>
          <el-col :span="18">
            <el-input v-model="query.search_val" @keyup.enter="getList" @clear="getList" placeholder="请输入查找内容" clearable></el-input>
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
      <el-table-column label="登录IP" width="110">
        <template #default="scope">
          <div class="g-red">{{ scope.row.ip }}</div>
        </template>
      </el-table-column>
      <el-table-column label="登录地址" min-width="130">
        <template #default="scope">
          <div class="g-blue">{{ scope.row.address }}</div>
        </template>
      </el-table-column>
      <el-table-column label="ISP" min-width="110">
        <template #default="scope">
          <div>{{ scope.row.isp }}</div>
        </template>
      </el-table-column>
      <el-table-column label="绑定邀请码" width="100">
        <template #default="scope">
          <div class="g-red">{{ scope.row.tid }}</div>
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
      <el-table-column label="状态" width="80">
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">正常</span>
          <span v-else-if="scope.row.status===2" class="g-red">待获取信息</span>
          <span v-else class="g-red">异常</span>
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