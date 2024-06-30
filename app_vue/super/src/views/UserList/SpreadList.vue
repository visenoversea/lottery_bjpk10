<script setup>
import {computed, reactive} from 'vue'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  userId: {
    type:Number,
    default: 0
  },
  layer: {
    type:String,
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
  row:{}
})

const query = reactive({
  user_id:0,
  userType: '',
  virtual: '',
  layer: '',
  search_key: 'user_name',
  search_val: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getSpreadList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}

const open = () => {
  query.user_id=props.userId
  query.layer=props.layer
  getList()
}
</script>
<template>
  <el-dialog v-model="show" top="4vh" title="推广列表" @open="open" draggable :close-on-click-modal="false" width="980px">
    <el-form :inline="true">
      <el-form-item label="推广层级">
        <el-select v-model="query.layer" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="1级" value="1"></el-option>
          <el-option label="2级" value="2"></el-option>
          <el-option label="3级" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="query.userType" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="代理" value="2"></el-option>
          <el-option label="会员" value="1"></el-option>
          <!--          <el-option label="模拟盘" value="0"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="账号类型">
        <el-select v-model="query.virtual" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="虚拟号" value="1"></el-option>
          <el-option label="正常" value="0"></el-option>
        </el-select>
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
    <el-table v-loading="table.loading" height="400" :data="table.list" stripe border>
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
      <el-table-column prop="user_name" label="用户名" min-width="100">
      </el-table-column>
      <el-table-column label="上级代理" width="100">
        <template #default="scope">
          <span class="g-blue" v-if="scope.row.agentList.length > 0">{{ scope.row.agentList[scope.row.agentList.length - 1].user_name }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="层级" width="45">
        <template #default="scope">
          <span class="g-red">{{scope.row.layer}}代</span>
        </template>
      </el-table-column>
      <el-table-column label="推广层级" width="80">
        <template #default="scope">
          <span class="g-red">{{scope.row.spreadLayer}}级</span>
        </template>
      </el-table-column>
      <el-table-column label="余额" width="80">
        <template #default="scope">
          <span class="g-blue">{{scope.row.balance}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="合约余额" width="80">-->
<!--        <template #default="scope">-->
<!--          <span class="g-purple">{{scope.row.deposit}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="登录时间" width="130" :show-overflow-tooltip="true">
        <template #default="scope">
          <span>{{formatDate(scope.row.login_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="login_ip" label="登陆ip" width="120">
      </el-table-column>
      <!--        <el-table-column label="注册时间" width="130">-->
      <!--          <template #default="scope">-->
      <!--            <span>{{formatDate(scope.row.create_time)}}</span>-->
      <!--          </template>-->
      <!--        </el-table-column>-->
      <!--        <el-table-column prop="create_ip" label="注册ip" width="120">-->
      <!--        </el-table-column>-->
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