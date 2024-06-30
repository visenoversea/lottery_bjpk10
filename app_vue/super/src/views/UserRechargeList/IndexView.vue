<script setup>
import {reactive, ref} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
import AddView from './AddView.vue'
import EditView from './EditView.vue'
import useStore from '@/stores/index'
const store = useStore()
const auth = reactive({
  addUserRecharge:store.auth('addUserRecharge'),
  reviewUserRecharge:store.auth('reviewUserRecharge'),
  editUserRecharge:store.auth('editUserRecharge'),
  delUserRecharge:store.auth('delUserRecharge'),
})
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
  status: '',
  isFirst:'',
  order_no:'',
  date_time: [formatDate(new Date().setHours(0, 0, 0, 0)),formatDate(new Date().setHours(23, 59, 59, 59))],
  search_key: 'user_name',
  search_val: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getUserRechargeList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}
//获取列表
getList()
//新增
const addShow = ref(false)
//编辑
const editShow = ref(false)
const edit = (row) => {
  table.row = row
  editShow.value = true
}
//删除
const editStatus = (row,status) => {
  if (status === 1) {
    ElMessageBox.confirm('确认充值审核通过?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
        .then(async () => {
          table.loading = true
          const {success, data} = await api.reviewUserRecharge({id: row.id, status: 1})
          table.loading = false
          if (!success) return
          ElMessage.success(data.msg)
          await getList(false)
        })
  }else{
    ElMessageBox.prompt('审核不通过原因(选填)', '确认驳回审核', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
        .then(async ({value}) => {
          table.loading = true
          const {success, data} = await api.reviewUserRecharge({id: row.id, reason: value, status: 0})
          table.loading = false
          if (!success) return
          ElMessage.success(data.msg)
          await getList(false)
        })
  }
}

const del = (row) => {
  ElMessageBox.confirm('确认删除数据?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.delUserRecharge({id: row.id})
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
        <span>用户充值列表</span>
        <div class="g-flex-justify-end g-flex-1">
          <el-button v-if="auth.addUserRecharge" type="success" @click="addShow=true">新增</el-button>
        </div>
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
      <el-form-item label="是否首充">
        <el-select v-model="query.isFirst" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="query.status" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="待审核" value="2"></el-option>
          <el-option label="审核不通过" value="0"></el-option>
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
      <el-form-item>
        <template #label>
          <el-select v-model="query.search_key">
            <el-option label="用户名" value="user_name"></el-option>
            <el-option label="用户ID" value="user_id"></el-option>
            <el-option label="标题" value="title"></el-option>
            <el-option label="充值信息" value="info"></el-option>
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
<!--      <el-table-column label="层级" width="45">-->
<!--        <template #default="scope">-->
<!--          <span class="g-red">{{scope.row.user.layer}}代</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
      <el-table-column prop="title" label="标题" min-width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="订单号" width="130">
        <template #default="scope">
          <div class="g-green">{{scope.row.order_no}}<span v-if="scope.row.is_first" class="g-red">[首充]</span></div>
        </template>
      </el-table-column>
      <el-table-column prop="info.name" label="真实姓名" min-width="80">
      </el-table-column>
      <el-table-column label="状态" width="80" >
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">审核通过</span>
          <span v-else-if="scope.row.status===2" class="g-yellow">待审核</span>
          <span v-else-if="scope.row.status===0" class="g-red">审核不通过</span>
          <span class="g-red" v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column label="充值金额" min-width="100" :show-overflow-tooltip="true">
        <template #default="scope">
          <div class="g-red">{{ scope.row.amount }}</div>
<!--          <div class="g-red">{{ scope.row.amount }} <span class="g-blue">{{ scope.row.currency }}</span></div>-->
<!--          <div class="g-green" v-if="scope.row.mode==1 && scope.row.currency!=scope.row.info.currency">≈-->
<!--            {{ (scope.row.amount * scope.row.info.rate).toFixed(scope.row.info.fixed) }} <span-->
<!--                class="g-blue">{{ scope.row.info.currency }}</span>-->
<!--          </div>-->
        </template>
      </el-table-column>
<!--      <el-table-column label="充值信息" min-width="160" :show-overflow-tooltip="true">-->
<!--        <template #default="scope">-->
<!--          <div v-if="scope.row.info.fn=='Bank'">-->
<!--            <div v-if="scope.row.info.bank_name">银行名称：{{scope.row.info.bank_name}}</div>-->
<!--            <div v-if="scope.row.info.bank_code">银行代码：{{scope.row.info.bank_code}}</div>-->
<!--            <div v-if="scope.row.info.card_number">银行卡号：{{scope.row.info.card_number}}</div>-->
<!--            <div v-if="scope.row.info.name">姓名：{{scope.row.info.name}}</div>-->
<!--            <div v-if="scope.row.info.branch">开户支行：{{scope.row.info.branch}}</div>-->
<!--          </div>-->
<!--          <div v-else-if="scope.row.info.fn=='Wallet'">-->
<!--            <div v-if="scope.row.info.chain">链类型：{{scope.row.info.chain}}</div>-->
<!--            <div v-if="scope.row.info.address">钱包地址：{{scope.row.info.address}}</div>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="凭证" width="140">-->
<!--        <template #default="scope">-->
<!--          <el-image v-if="scope.row.img" :src="scope.row.img" :preview-src-list="[scope.row.img]" fit="contain" hide-on-click-modal preview-teleported />-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="实际到账" min-width="100" :show-overflow-tooltip="true">
        <template #default="scope">
          <div class="g-red">{{ scope.row.real_amount }}</div>
<!--          <div class="g-red">{{ scope.row.real_amount }} <span class="g-blue">{{scope.row.currency}}</span></div>-->
<!--          <div class="g-green" v-if="scope.row.mode==1 && scope.row.currency!=scope.row.info.currency">≈ {{ (scope.row.real_amount*scope.row.info.rate).toFixed(scope.row.info.fixed) }} <span class="g-blue">{{scope.row.info.currency}}</span></div>-->
        </template>
      </el-table-column>
<!--      <el-table-column prop="remark" label="订单备注" width="100">-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="reason" label="失败原因" width="100">-->
<!--      </el-table-column>-->
      <el-table-column prop="operator" label="操作人" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="方式" width="50" :show-overflow-tooltip="true">
        <template #default="scope">
          <span v-if="scope.row.mode==1" class="g-red">线下</span>
          <span v-else-if="scope.row.mode==2" class="g-green">线上</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="130">
        <template #default="scope">
          <span>{{formatDate(scope.row.create_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="130" :show-overflow-tooltip="true">
        <template #default="scope">
          <span>{{formatDate(scope.row.modify_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="auth.editUserRecharge" label="操作" width="130" fixed="right">
        <template #default="scope">
          <div style="padding-bottom: 12px" v-if="auth.reviewUserRecharge && scope.row.status===2">
            <el-button type="success" @click="editStatus(scope.row,1)">通过</el-button>
            <el-button type="danger" @click="editStatus(scope.row,0)">驳回</el-button>
          </div>
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button v-if="auth.delUserRecharge" type="danger" @click="del(scope.row)">删除</el-button>
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
    <EditView @success="getList(false)" v-model="editShow" :data="table.row"/>
  </el-card>
</template>