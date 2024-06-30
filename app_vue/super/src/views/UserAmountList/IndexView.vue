<script setup>
import {reactive, ref} from 'vue'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
import AddView from './AddView.vue'
import useStore from '@/stores/index'
const store = useStore()
const auth = reactive({
  addUserAmount:store.auth('addUserAmount'),
})
//表单
const table = reactive({
  loading: false,
  total: 0,
  list: []
})

const query = reactive({
  userType: '',
  virtual:'',
  title: '',
  des:'',
  type:'',
  status:'',
  date_time: [formatDate(new Date().setHours(0, 0, 0, 0)),formatDate(new Date().setHours(23, 59, 59, 59))],
  search_key: 'user_name',
  search_val: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getUserAmountList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}
//新增
const addShow = ref(false)
//获取列表
getList()
</script>
<template>
  <el-card>
    <template #header>
      <div class="g-flex">
        <span>用户账变列表</span>
        <div class="g-flex-justify-end g-flex-1">
          <el-button v-if="auth.addUserAmount" type="success" @click="addShow=true">新增账款</el-button>
        </div>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="用户类型">
        <el-select v-model="query.userType" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="管理员" value="10"></el-option>
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
      <el-form-item label="类型">
        <el-select v-model="query.type" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="充值" value="1"></el-option>
          <el-option label="提现" value="2"></el-option>
          <el-option label="推广" value="3"></el-option>
          <el-option label="投注" value="4"></el-option>
<!--          <el-option label="杠杆" value="5"></el-option>-->
<!--          <el-option label="秒合约" value="6"></el-option>-->
<!--          <el-option label="外汇" value="7"></el-option>-->
<!--          <el-option label="划转" value="8"></el-option>-->
<!--          <el-option label="兑换" value="9"></el-option>-->
<!--          <el-option label="锁仓挖矿" value="10"></el-option>-->
<!--          <el-option label="量化" value="11"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="query.title"  @keyup.enter="getList" placeholder="请输入标题" @clear="getList" clearable />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="query.des"  @keyup.enter="getList" placeholder="请输入描述" @clear="getList" clearable />
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
            <el-option label="外键id" value="key_id"></el-option>
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
      <el-table-column fixed="left" label="ID" prop="id" width="80" />
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
      <el-table-column label="总代理" width="100">
        <template #default="scope">
          <span class="g-red" v-if="scope.row.agentList.length > 0">{{ scope.row.agentList[0].user_name }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="上级代理" width="100">
        <template #default="scope">
          <span class="g-blue" v-if="scope.row.agentList.length > 0">{{ scope.row.agentList[scope.row.agentList.length - 1].user_name }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="所属账户" width="80">-->
<!--        <template #default="scope">-->
<!--          <span v-if="scope.row.mode==1" class="g-red">现货账户</span>-->
<!--          <span v-else-if="scope.row.mode==2" class="g-purple">合约账户</span>-->
<!--          <span v-else class="g-red">异常</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column prop="title" label="标题" width="120" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="类型" width="80">
        <template #default="scope">
          <span v-if="scope.row.type==0" class="g-red">其他</span>
          <span v-else-if="scope.row.type==1" class="g-green">充值</span>
          <span v-else-if="scope.row.type==2" class="g-red">提现</span>
          <span v-else-if="scope.row.type==3" class="g-purple">推广</span>
          <span v-else-if="scope.row.type==4" class="g-yellow">投注</span>
          <span v-else-if="scope.row.type==5" class="g-blue">杠杆</span>
          <span v-else-if="scope.row.type==6" class="g-green-tiffany">秒合约</span>
          <span v-else-if="scope.row.type==7" class="g-grey">外汇</span>
          <span v-else-if="scope.row.type==8" class="g-green">划转</span>
          <span v-else-if="scope.row.type==9" class="g-red">兑换</span>
          <span v-else-if="scope.row.type==10" class="g-blue">锁仓挖矿</span>
          <span v-else-if="scope.row.type==11" class="g-blue">量化</span>
          <span v-else class="g-red">异常</span>
        </template>
      </el-table-column>
      <el-table-column prop="des" label="描述" width="80">
      </el-table-column>
      <el-table-column label="变动金额" min-width="100">
        <template #default="scope">
          <span :class="[scope.row.amount>=0?'g-red':'g-green']">{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="currency" label="货币" width="80">-->
<!--      </el-table-column>-->
      <el-table-column label="变动后余额" min-width="110">
        <template #default="scope">
          <span class="g-blue">{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="key_id" label="外键id" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="创建时间" width="130">
        <template #default="scope">
          <span>{{formatDate(scope.row.create_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template #default="scope">
          <span v-if="scope.row.status==1" class="g-green">显示</span>
          <span v-else-if="scope.row.status==0" class="g-red">隐藏</span>
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
    <AddView @success="getList" v-model="addShow" />
  </el-card>
</template>