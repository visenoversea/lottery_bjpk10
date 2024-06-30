<script setup>
import {reactive} from 'vue'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
// import useStore from '@/stores/index'
// const store = useStore()

//表单
const table = reactive({
  loading: false,
  total: 0,
  list: [],
  row:{}
})

const query = reactive({
  userType:'',
  virtual:'',
  open_expect:'',
  order_no:'',
  status: '',
  search_key: 'user_name',
  search_val: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getUserBetList2(query)
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
        <span>下注记录</span>
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
          <el-option label="已开奖" value="1"></el-option>
          <el-option label="待开奖" value="2"></el-option>
          <el-option label="撤单" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期号">
        <el-input v-model="query.open_expect"  @keyup.enter="getList" placeholder="请输入下注期号" @clear="getList" clearable />
      </el-form-item>
      <el-form-item label="订单号">
        <el-input v-model="query.order_no"  @keyup.enter="getList" placeholder="请输入订单号" @clear="getList" clearable />
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
      <el-table-column fixed="left" label="用户" width="120">
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
      <el-table-column fixed="left" prop="user.user_name" label="用户名" width="100">
      </el-table-column>
<!--      <el-table-column label="总代理" width="100">-->
<!--        <template #default="scope">-->
<!--          <span class="g-red" v-if="scope.row.agentList.length > 0">{{ scope.row.agentList[0].user_name }}</span>-->
<!--          <span v-else>-</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="上级代理" width="100">-->
<!--        <template #default="scope">-->
<!--          <span class="g-blue" v-if="scope.row.agentList.length > 0">{{ scope.row.agentList[scope.row.agentList.length - 1].user_name }}</span>-->
<!--          <span v-else>-</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column prop="lottery.name" label="彩种" min-width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="userBet.open_expect" label="期号" min-width="110">
      </el-table-column>
      <el-table-column label="状态" width="80" >
        <template #default="scope">
          <span v-if="scope.row.userBet.status===1" class="g-green">已开奖</span>
          <span v-else-if="scope.row.userBet.status===2" class="g-red">待开奖</span>
          <span v-else-if="scope.row.userBet.status===0" class="g-purple">撤单</span>
          <span class="g-red" v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column prop="userBet.open_code" label="开奖结果" min-width="110">
      </el-table-column>
      <el-table-column label="投注号码" min-width="90" :show-overflow-tooltip="true">
        <template #default="scope">
          <span class="g-red">{{ scope.row.bet_no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投注金额" min-width="90" :show-overflow-tooltip="true">
        <template #default="scope">
          <span class="g-blue">{{ scope.row.bet_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中奖金额" min-width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <span class="g-red">{{ scope.row.win_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="赔率" min-width="80">
        <template #default="scope">
          <span class="g-purple">{{scope.row.odds}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userBet.order_no" label="订单号" min-width="120">
      </el-table-column>
      <el-table-column label="下注时间" width="130">
        <template #default="scope">
          <span>{{formatDate(scope.row.create_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="130">
        <template #default="scope">
          <span>{{formatDate(scope.row.modify_time)}}</span>
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