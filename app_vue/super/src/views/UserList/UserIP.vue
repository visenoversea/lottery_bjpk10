<script setup>
import {computed, reactive} from 'vue'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  userName: {
    type: String,
    default: ''
  },
  ip: {
    type: String,
    default: ''
  }
})

//显示隐藏做双向绑定处理
const emits = defineEmits(['update:modelValue','success'])
const show = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  }
})

//表单
const table = reactive({
  loading: false,
  total: 0,
  list: [],
  row: {}
})

const query = reactive({
  userType: '',
  virtual: '',
  ip:'',
  search_key: 'user_name',
  search_val: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getUserIPList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}

const open = () => {
  query.search_key = 'user_name'
  query.search_val = props.userName
  query.ip = props.ip
  getList()
}
</script>
<template>
  <el-dialog v-model="show" top="4vh" title="用户IP列表" @open="open" draggable :close-on-click-modal="false" width="1180px">
    <el-form :inline="true">
      <el-form-item label="用户类型">
        <el-select v-model="query.userType" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="代理" value="2"></el-option>
          <el-option label="会员" value="1"></el-option>
          <!--          <el-option label="模拟盘" value="2"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="账号类型">
        <el-select v-model="query.virtual" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="虚拟号" value="1"></el-option>
          <el-option label="正常" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input v-model="query.ip" @keyup.enter="getList" @clear="getList" placeholder="请输入查找IP" clearable></el-input>
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
            <el-input v-model="query.search_val" @keyup.enter="getList" @clear="getList" placeholder="请输入查找内容" clearable></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-button type="primary" @click="getList">查询</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" height="420" :data="table.list" stripe border>
      <el-table-column label="状态" width="80" >
        <template #default="scope">
          <span v-if="scope.row.user.status===1" class="g-green">正常</span>
          <span v-else-if="scope.row.user.status===2" class="g-red">禁止提现</span>
          <span v-else-if="scope.row.user.status===3" class="g-red">禁止下单</span>
          <span v-else-if="scope.row.user.status===4" class="g-red">禁止下单提现</span>
          <span v-else-if="scope.row.user.status===0" class="g-red">禁用</span>
          <span v-else class="g-red">异常</span>
          <span v-if="scope.row.user.isOnline" class="g-red">(在线)</span>
          <span class="g-grey" v-else>(离线)</span>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" width="120">
        <template #default="scope">
          <div :class="{'g-bg-pink':scope.row.user.virtual}">
            <span>{{scope.row.user.id}}</span>
            <span v-if="scope.row.user.type===1" class="g-green">(会员)</span>
            <span v-else-if="scope.row.user.type===2" class="g-blue">(代理)</span>
            <span v-else-if="scope.row.user.type===0" class="g-grey">(虚拟盘)</span>
            <span v-else-if="scope.row.user.type>=10" class="g-red">(管理员)</span>
            <span v-else class="g-red">(异常)</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="user.user_name" label="用户名" width="100">
      </el-table-column>
      <el-table-column label="登录IP" width="110">
        <template #default="scope">
          <div class="g-red">{{scope.row.ip}}</div>
        </template>
      </el-table-column>
      <el-table-column label="登录地址" min-width="130">
        <template #default="scope">
          <div class="g-blue">{{scope.row.address}}</div>
        </template>
      </el-table-column>
      <el-table-column label="ISP" min-width="110">
        <template #default="scope">
          <div>{{scope.row.isp}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="platform" label="终端" width="60">
      </el-table-column>
      <el-table-column label="登录时间" width="130">
        <template #default="scope">
          <div>{{formatDate(scope.row.create_time)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="上级代理" width="100">
        <template #default="scope">
          <span class="g-blue" v-if="scope.row.agentList.length > 0">{{ scope.row.agentList[scope.row.agentList.length - 1].user_name }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="总代理" width="100">
        <template #default="scope">
          <span class="g-red" v-if="scope.row.agentList.length > 0">{{ scope.row.agentList[0].user_name }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="登录状态" width="80">
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">成功</span>
          <span v-else-if="scope.row.status===0" class="g-red">失败,{{scope.row.reason}}}</span>
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
  </el-dialog>
</template>