<script setup>
import {computed, reactive} from 'vue'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
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
  userType: '',
  virtual: 0,
  status: '',
  dateTime:[],
  page: 1,
  limit: 20,
  orderBy:"create_time",
  search_key: 'user_id',
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

const open = () => {
  let dateTime = formatDate(undefined, 'yyyy-MM-dd')
  query.dateTime[0] = dateTime + ' 00:00:00'
  query.dateTime[1] = dateTime + ' 23:59:59'
  getList()
}
</script>
<template>
  <el-dialog v-model="show" top="4vh" title="今日注册会员" @open="open" draggable :close-on-click-modal="false" width="980px">
    <el-form :inline="true">
      <el-form-item label="时间">
        <el-date-picker value-format="YYYY-MM-DD HH:mm:ss"
                        v-model="query.dateTime"
                        @change="getList"
                        type="datetimerange"
                        :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
                        range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item label="排序">
        <el-select v-model="query.orderBy" @change="getList">
          <el-option label="注册时间" value="create_time"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <template #label>
          <el-select v-model="query.search_key">
            <el-option label="用户ID" value="user_id"></el-option>
            <el-option label="用户名" value="user_name"></el-option>
            <!--            <el-option label="邮箱" value="email"></el-option>-->
            <el-option label="代理ID" value="agentId"></el-option>
            <!--            <el-option label="邀请码" value="tid"></el-option>-->
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
      <el-table-column fixed="left" label="状态" width="80" >
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
      <el-table-column fixed="left" label="用户ID" width="120">
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
      <el-table-column fixed="left" prop="user_name" label="用户名" width="100">
      </el-table-column>
<!--      <el-table-column label="邮箱" width="120">-->
<!--        <template #default="scope">-->
<!--          <div>{{scope.row.email}}</div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="总代理" width="100">
        <template #default="scope">
          <span class="g-red g-pointer" v-if="scope.row.agentList.length > 0"
                @click="spread(scope.row.agentList[0].id)">{{ scope.row.agentList[0].user_name }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="上级代理" width="100">
        <template #default="scope">
          <span class="g-blue g-pointer" v-if="scope.row.agentList.length > 0"
                @click="spread(scope.row.agentList[scope.row.agentList.length - 1].id)">{{ scope.row.agentList[scope.row.agentList.length - 1].user_name }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="等级" width="100">
        <template #default="scope">
          <span class="g-green-tiffany">{{ scope.row.level_id+'级' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="层级" width="45">
        <template #default="scope">
          <span class="g-red">{{scope.row.layer}}代</span>
        </template>
      </el-table-column>
      <el-table-column label="充提差" width="80">
        <template #default="scope">
          <span class="g-purple">{{scope.row.ks}}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值" width="80">
        <template #default="scope">
          <span class="g-green">{{scope.row.recharge}}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现" width="80">
        <template #default="scope">
          <span class="g-red">{{scope.row.withdraw}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="充提笔数" width="80">-->
<!--        <template #default="scope">-->
<!--          <span class="g-green">{{scope.row.rechargeNums}}</span> | <span class="g-red">{{scope.row.withdrawNums}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="推广返佣" width="80">
        <template #default="scope">
          <span class="g-purple">{{scope.row.rebateAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="各级人数" width="110">
        <template #default="scope">
          <div class="g-pointer" @click="spread(scope.row.id,'1')">1级下线: <span class="g-green">{{scope.row.team.layer1}} <span class="g-red">({{scope.row.team.layerValid1}})</span></span></div>
          <div class="g-pointer" @click="spread(scope.row.id,'2')">2级下线: <span class="g-green">{{scope.row.team.layer2}} <span class="g-red">({{scope.row.team.layerValid2}})</span></span></div>
          <div class="g-pointer" @click="spread(scope.row.id,'3')">3级下线: <span class="g-green">{{scope.row.team.layer3}} <span class="g-red">({{scope.row.team.layerValid3}})</span></span></div>
        </template>
      </el-table-column>
      <el-table-column label="余额" width="80">
        <template #default="scope">
          <span class="g-blue">{{scope.row.balance}}</span>
        </template>
      </el-table-column>
      <el-table-column label="剩余流水" width="80">
        <template #default="scope">
          <span class="g-blue">{{scope.row.water_amount}}</span>
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
      <!-- <el-table-column label="操作" width="130" fixed="right">
        <template #default="scope">
          <div v-if="auth.addUserRecharge">
            <el-button type="success" @click="addRecharge(scope.row)">充值</el-button>
            <el-button v-if="auth.delUser" type="danger" @click="del(scope.row)">删除</el-button>
          </div>
          <div class="g-pt5">
            <el-button type="info" @click="info(scope.row)">详情</el-button>
            <el-button v-if="auth.editUser" type="primary" @click="edit(scope.row)">编辑</el-button>
          </div>
        </template>
      </el-table-column> -->
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