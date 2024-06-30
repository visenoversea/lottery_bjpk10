<script setup>
import {reactive, ref} from 'vue'
import AddView from './AddView.vue'
import EditView from './EditView.vue'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
import useStore from '@/stores/index'
const store = useStore()
const auth = reactive({
  addUserAgent:store.auth('addUserAgent'),
  editUserAgent:store.auth('editUserAgent'),
})
//表单
const table = reactive({
  loading: false,
  total: 0,
  list: [],
  row:{}
})

const query = reactive({
  userType: '',
  virtual: '',
  status: '',
  search_key: 'user_name',
  search_val: '',
  date_time: [],
  page: 1,
  limit: 15
})

//新增
const addShow = ref(false)
//编辑
const editShow = ref(false)
const edit = (row) => {
  table.row = row
  editShow.value = true
}

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getUserAgentList(query)
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
        <span>代理列表</span>
        <div class="g-flex-justify-end g-flex-1">
          <el-button v-if="auth.addUserAgent" type="success" @click="addShow=true">新增代理</el-button>
        </div>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="账号类型">
        <el-select v-model="query.virtual" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="虚拟号" value="1"></el-option>
          <el-option label="正常" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="query.status" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
          <el-option label="禁止提现" value="2"></el-option>
          <el-option label="禁止下单" value="3"></el-option>
          <el-option label="禁止提现和下单" value="4"></el-option>
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
      <el-form-item>
        <template #label>
          <el-select v-model="query.search_key">
            <el-option label="用户名" value="user_name"></el-option>
            <el-option label="用户ID" value="user_id"></el-option>
            <el-option label="上级代理" value="agent"></el-option>
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
      <el-table-column fixed="left" label="用户" width="120" :show-overflow-tooltip="true">
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
      <el-table-column fixed="left" prop="user_name" label="用户名" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="上级ID" min-width="100" :show-overflow-tooltip="true">
        <template #default="scope">
          <div v-if="scope.row.agentList.length>0">{{ scope.row.agentList[scope.row.agentList.length - 1].id }}</div>
        </template>
      </el-table-column>
      <el-table-column label="赠送充值" min-width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <span class="g-purple">{{scope.row.rechargeGift}}</span>
        </template>
      </el-table-column>
      <el-table-column label="总充提差" min-width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <span :class="scope.row.ks>=0?'g-green':'g-red'">{{scope.row.ks}}</span>
        </template>
      </el-table-column>
      <el-table-column label="总充值" min-width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <div><span class="g-green">{{scope.row.recharge}}</span>({{scope.row.rechargeNums}}笔)</div>
        </template>
      </el-table-column>
      <el-table-column label="总提现" min-width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <div><span class="g-red">{{scope.row.withdraw}}</span>({{scope.row.withdrawNums}}笔)</div>
        </template>
      </el-table-column>
      <el-table-column label="注册人数" min-width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <span class="g-green">{{scope.row.userNums}}</span>
        </template>
      </el-table-column>
      <el-table-column label="团队余额" min-width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <span class="g-green">{{scope.row.userBalance}}</span>
        </template>
      </el-table-column>
      <el-table-column label="充提人数" width="70">
        <template #default="scope">
          <div><span class="g-green">{{scope.row.rechargeUserNums}}</span>|<span class="g-red">{{scope.row.withdrawUserNums}}</span></div>
        </template>
      </el-table-column>
      <el-table-column label="1代充值" min-width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <span class="g-green">{{scope.row.recharge1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="2代充值" min-width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <span class="g-green">{{scope.row.recharge2}}</span>
        </template>
      </el-table-column>
      <el-table-column label="3代充值" min-width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <span class="g-green">{{scope.row.recharge3}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="mobile" label="手机号" min-width="120" :show-overflow-tooltip="true">-->
<!--        <template #default="scope">-->
<!--          <div>{{scope.row.area_code}} - {{scope.row.mobile}}</div>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="email" label="邮箱" width="100" :show-overflow-tooltip="true">-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="nick_name" label="昵称" width="100" :show-overflow-tooltip="true">-->
<!--      </el-table-column>-->
      <el-table-column label="登录IP/时间" width="130">
        <template #default="scope">
          <div class="g-red g-pointer">{{scope.row.login_ip}}</div>
          <div>{{formatDate(scope.row.login_time)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="注册IP/时间" width="130">
        <template #default="scope">
          <div class="g-blue g-pointer">{{scope.row.create_ip}}</div>
          <div>{{formatDate(scope.row.create_time)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110" >
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">正常</span>
          <span v-else-if="scope.row.status===2" class="g-red">禁止提现</span>
          <span v-else-if="scope.row.status===3" class="g-red">禁止下单</span>
          <span v-else-if="scope.row.status===4" class="g-red">禁止提现和下单</span>
          <span v-else-if="scope.row.status===0" class="g-red">禁用</span>
          <span class="g-red" v-else>异常</span>
          <span v-if="scope.row.isOnline" class="g-red">(在线)</span>
          <span class="g-grey" v-else>(离线)</span>
        </template>
      </el-table-column>
      <el-table-column v-if="auth.editUserAgent" label="操作" width="75" fixed="right">
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
    <AddView @success="getList" v-model="addShow"/>
    <EditView @success="getList(false)" v-model="editShow" :data="table.row"/>
  </el-card>
</template>