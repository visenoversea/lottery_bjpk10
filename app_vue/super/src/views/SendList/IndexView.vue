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
  status: '',
  account: '',
  code: '',
  ip: '',
  date_time: [],
  search_key: 'user_name',
  search_val: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getSendList(query)
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
        <span>手机邮箱发送记录</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="状态">
        <el-select v-model="query.status" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="发送成功" value="1"></el-option>
          <el-option label="发送失败" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="query.account" @keyup.enter="getList" @clear="getList" placeholder="请输入查找账号" clearable></el-input>
      </el-form-item>
<!--      <el-form-item label="验证码">-->
<!--        <el-input v-model="query.code" @keyup.enter="getList" @clear="getList" placeholder="请输入验证码" clearable></el-input>-->
<!--      </el-form-item>-->
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
        &nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>

    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column label="ID" width="80">
        <template #default="scope">
          <div>{{ scope.row.id }}</div>
        </template>
      </el-table-column>
      <el-table-column label="账号" min-width="130">
        <template #default="scope">
          <div>{{ scope.row.account }}</div>
        </template>
      </el-table-column>
      <el-table-column label="验证码" width="80">
        <template #default="scope">
          <div class="g-red">{{ scope.row.code }}</div>
        </template>
      </el-table-column>
      <el-table-column label="IP" width="110">
        <template #default="scope">
          <div class="g-green">{{ scope.row.ip }}</div>
        </template>
      </el-table-column>
      <el-table-column label="IP地址" min-width="130">
        <template #default="scope">
          <div class="g-purple">{{ scope.row.ipAddress }}</div>
        </template>
      </el-table-column>
      <el-table-column label="失败原因" min-width="70">
        <template #default="scope">
          <div>{{ scope.row.reason }}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="130">
        <template #default="scope">
          <div>{{ formatDate(scope.row.create_time) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">发送成功</span>
          <span v-else-if="scope.row.status===0" class="g-red">发送失败</span>
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