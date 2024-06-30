<script setup>
import {reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '@/utils/api'
// import ws from '@/utils/ws'
import {formatDate} from '@/utils/index'
import useStore from '@/stores/index'
const store = useStore()
const auth = reactive({
  setRiskUserProductTime:store.auth('setRiskUserProductTime'),
  delUserProductTime:store.auth('delUserProductTime'),
})

//表单
const table = reactive({
  loading: false,
  total: 0,
  list: [],
  productList:{},
  row:{}
})

const query = reactive({
  userType:'',
  virtual:'',
  status: '',
  title:'',
  order_no:'',
  date_time: [],
  search_key: 'user_name',
  search_val: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getUserMiningList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}
//获取列表
getList()

const del = (row) => {
  ElMessageBox.confirm('确认删除数据?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.delUserProductTime({id: row.id})
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
        <span>用户锁仓挖矿</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="用户类型">
        <el-select v-model="query.userType" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="代理" value="2"></el-option>
          <el-option label="会员" value="1"></el-option>
        </el-select>
      </el-form-item>
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
          <el-option label="锁仓" value="1"></el-option>
          <el-option label="赎回" value="2"></el-option>
<!--          <el-option label="撤单" value="0"></el-option>-->
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
      <el-form-item label="订单号">
        <el-input v-model="query.order_no"  @keyup.enter="getList" placeholder="请输入订单号" @clear="getList" clearable />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="query.title"  @keyup.enter="getList" placeholder="请输入标题" @clear="getList" clearable />
      </el-form-item>
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
      <el-table-column label="用户" width="120" :show-overflow-tooltip="true">
        <template #default="scope">
          <div :class="{'g-bg-pink':scope.row.user.virtual}">
            <span>{{scope.row.user.id}}</span>
            <span v-if="scope.row.user.type===1" class="g-green">(会员)</span>
            <span v-else-if="scope.row.user.type===2" class="g-blue">(代理)</span>
            <span v-else-if="scope.row.user.type===0" class="g-grey">(虚拟盘)</span>
            <span v-else class="g-red">(异常)</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="user.user_name" label="用户名" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="上级ID" width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <div v-if="scope.row.agentList.length>0">{{ scope.row.agentList[scope.row.agentList.length - 1].id }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="order_no" label="订单号" width="145" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="状态" width="50" >
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">锁仓</span>
          <span v-else-if="scope.row.status===2" class="g-red">赎回</span>
          <span v-else-if="scope.row.status===0" class="g-purple">撤单</span>
          <span class="g-red" v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column label="下单金额" width="100" :show-overflow-tooltip="true">
        <template #default="scope">
          <div class="g-red">{{ scope.row.amount }}</div>
        </template>
      </el-table-column>
      <el-table-column label="总收益" width="100" :show-overflow-tooltip="true">
        <template #default="scope">
          <div class="g-purple">{{ scope.row.profit_amount }}</div>
        </template>
      </el-table-column>
      <el-table-column label="剩余天数" width="70" :show-overflow-tooltip="true">
        <template #default="scope">
          <div class="g-yellow">{{ scope.row.lastDay }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="day" label="天数" width="50" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="收益" width="50" :show-overflow-tooltip="true">
        <template #default="scope">
          <div class="g-green">{{ scope.row.now_rate * 100 }}%</div>
        </template>
      </el-table-column>
      <el-table-column label="收益范围" width="70" :show-overflow-tooltip="true">
        <template #default="scope">
          <div class="g-purple">{{ scope.row.min_rate * 100 }}-{{ scope.row.max_rate * 100 }}%</div>
        </template>
      </el-table-column>
      <el-table-column label="违约比例" width="70" :show-overflow-tooltip="true">
        <template #default="scope">
          <div class="g-red">{{ scope.row.bc_rate * 100 }}%</div>
        </template>
      </el-table-column>
      <el-table-column label="违约金" width="70" :show-overflow-tooltip="true">
        <template #default="scope">
          <div class="g-red">{{ scope.row.bc_amount }}</div>
        </template>
      </el-table-column>
      <el-table-column label="到期时间" width="130">
        <template #default="scope">
          <span>{{formatDate(scope.row.end_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="赎回时间" width="130">
        <template #default="scope">
          <span>{{formatDate(scope.row.back_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" width="130">
        <template #default="scope">
          <span>{{formatDate(scope.row.create_time)}}</span>
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