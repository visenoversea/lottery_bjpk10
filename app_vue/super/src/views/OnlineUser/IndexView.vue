<script setup>
import {reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
import useStore from '@/stores/index'

const store = useStore()
const auth = reactive({
  offlineUser:store.auth('offlineUser'),
})
//表单
const table = reactive({
  loading: false,
  total: 0,
  list: [],
  row: {},
  user_name:'',
  ip:'',
  user_id: 0,
  layer:'',
})

const query = reactive({
  online:1,
  search_key: 'user_name',
  search_val: '',
  date_time: [],
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getUserList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}
//获取列表
getList()

//删除
const offlineUser = (row) => {
  ElMessageBox.confirm('确认让用户下线?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.offlineUser({id: row.id})
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
        <span>在线用户</span>
        <div class="g-flex-justify-end g-flex-1">
          <el-button v-if="auth.addUser" type="success" @click="addShow=true">新增</el-button>
        </div>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item>
        <template #label>
          <el-select v-model="query.search_key">
            <el-option label="用户名" value="user_name"></el-option>
            <el-option label="用户ID" value="user_id"></el-option>
          </el-select>
        </template>
        <el-row>
          <el-col :span="18">
            <el-input v-model="query.search_val" @keyup.enter="getList" @clear="getList"
                      placeholder="请输入查找内容" clearable></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-button type="primary" @click="getList">查询</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column label="状态" width="80" >
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">正常</span>
          <span v-else-if="scope.row.status===2" class="g-red">禁止提现</span>
          <span v-else-if="scope.row.status===3" class="g-red">禁止下单</span>
          <span v-else-if="scope.row.status===4" class="g-red">禁止下单提现</span>
          <span v-else-if="scope.row.status===0" class="g-red">禁用</span>
          <span class="g-red" v-else>异常</span>
          <span v-if="scope.row.isOnline" class="g-red">(在线)</span>
          <span class="g-grey" v-else>(离线)</span>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" width="120">
        <template #default="scope">
          <div :class="{'g-bg-pink':scope.row.virtual}">
            <span>{{scope.row.id}}</span>
            <span v-if="scope.row.type===1" class="g-green">(会员)</span>
            <span v-else-if="scope.row.type===2" class="g-blue">(代理)</span>
            <span v-else-if="scope.row.type===0" class="g-grey">(虚拟盘)</span>
            <span v-else class="g-red">(异常)</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="层级" width="45">
        <template #default="scope">
          <span class="g-red">{{scope.row.layer}}代</span>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" label="用户名" width="100">
      </el-table-column>
<!--      <el-table-column label="邮箱" width="120">-->
<!--        <template #default="scope">-->
<!--          <div>{{scope.row.email}}</div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="总代理" min-width="100">
        <template #default="scope">
          <span class="g-red g-pointer" v-if="scope.row.agentList.length > 0"
                @click="spread(scope.row.agentList[0].id)">{{ scope.row.agentList[0].user_name }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="上级代理" min-width="100">
        <template #default="scope">
          <span class="g-blue g-pointer" v-if="scope.row.agentList.length > 0"
                @click="spread(scope.row.agentList[scope.row.agentList.length - 1].id)">{{ scope.row.agentList[scope.row.agentList.length - 1].user_name }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="余额" width="80">
        <template #default="scope">
          <span class="g-blue">{{scope.row.balance}}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录地区" width="130">
        <template #default="scope">
          <span class="g-purple">{{scope.row.ipAddress}}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录IP/时间" width="130">
        <template #default="scope">
          <div class="g-red g-pointer" @click="ip(scope.row.user_name,'')">{{scope.row.login_ip}}</div>
          <div>{{formatDate(scope.row.login_time)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="注册IP/时间" width="130">
        <template #default="scope">
          <div class="g-blue g-pointer" @click="ip('',scope.row.create_ip)">{{scope.row.create_ip}}</div>
          <div>{{formatDate(scope.row.create_time)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130" fixed="right">
        <template #default="scope">
          <div v-if="auth.offlineUser">
            <el-button type="success" @click="offlineUser(scope.row)">强制下线</el-button>
          </div>
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