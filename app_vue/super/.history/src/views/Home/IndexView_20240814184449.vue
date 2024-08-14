<script setup>
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
import {onUnmounted, reactive, ref} from "vue"
import UserList from './UserList.vue'

// //时区时间
// const timeZone = ref('')
// timeZone.value = formatDate(undefined,'yyyy-MM-dd hh:mm:ss','America/New_York')
// let timeIndex=setInterval(()=>{
//   timeZone.value = formatDate()
// },1000)
// onUnmounted(()=>{
//   // console.log('清除定时器')
//   clearInterval(timeIndex)
// })

const table = reactive({
  loading: false,
  info: {
    "userBalance": '-',
    "userNums": '-',
    "onlineNums": '-',
    "yesterdayFirstRechargeNums": '-',
    "todayRegNums": '-',
    "todayFirstRechargeNums": '-',
    "todayRecharge": '-',
    "todayRechargeNums": '-',
    "todayRechargeUserNums": '-',
    "todayRechargeGift": '-',
    "todayWithdraw": '-',
    "todayWithdrawNums": '-',
    "todayWithdrawUserNums": '-',
    "todayKesun": '-',
    "recharge": '-',
    "rechargeNums": '-',
    "rechargeUserNums":'-',
    "rechargeGift": '-',
    "withdraw": '-',
    "withdrawNums": '-',
    "withdrawUserNums":'-',
    "kesun": '-',
  }
})
const getReportInfo = async () => {
  table.loading = true
  const {success, data} = await api.getReportInfo()
  table.loading = false
  if (!success) return
  table.info = data.info
}
getReportInfo();

//注册显示
const regShow = ref(false)

</script>
<template>
  <el-card v-loading="table.loading" class="v_home_view">
    <template #header>
      <div class="g-flex">
        <span>首页</span>
<!--        <div class="g-flex-justify-end g-flex-1">-->
<!--          <b class="g-red">美国华盛顿时间：{{timeZone}}</b>-->
<!--        </div>-->
      </div>
    </template>
    <div style="padding: 10px">统计</div>
    <el-row :gutter="24">
      <el-col :span="4">
        <div class="tj-title">在线人数</div><div class="tj-val">{{table.info.onlineNums}}</div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">会员总数</div><div class="tj-val">{{table.info.userNums}}</div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">会员总余额</div><div class="tj-val">{{table.info.userBalance}}</div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">总充提人数</div>
        <div class="tj-val">
          <span class="g-green">{{table.info.rechargeUserNums}}</span> | <span class="g-red">{{table.info.withdrawUserNums}}</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">总充提笔数</div>
        <div class="tj-val">
          <span class="g-green">{{table.info.rechargeNums}}</span> | <span class="g-red">{{table.info.withdrawNums}}</span>
        </div>
      </el-col>
      <el-col :span="4">
      </el-col>
      <el-col :span="4">
        <div class="tj-title">总彩金</div><div class="tj-val g-green">{{table.info.rechargeGift}}</div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">总实际充值</div><div class="tj-val g-green">{{table.info.recharge}}</div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">总实际提现</div><div class="tj-val g-red">{{table.info.withdraw}}</div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">总充提差</div><div class="tj-val g-purple">{{table.info.kesun}}</div>
      </el-col>
    </el-row>
    <div style="padding: 10px">今日统计</div>
    <el-row :gutter="24">
      <el-col :span="4" @click="regShow=true" class="g-pointer"">
        <div class="tj-title">今日注册会员</div><div class="tj-val">{{table.info.todayRegNums}}</div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">今日新增首充人数</div><div class="tj-val">{{table.info.todayFirstRechargeNums}}</div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">昨日新增首充人数</div><div class="tj-val">{{table.info.yesterdayFirstRechargeNums}}</div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">今日充提人数</div>
        <div class="tj-val">
          <span class="g-green">{{table.info.todayRechargeUserNums}}</span> | <span class="g-red">{{table.info.todayWithdrawUserNums}}</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">今日充提笔数</div>
        <div class="tj-val">
          <span class="g-green">{{table.info.todayRechargeNums}}</span> | <span class="g-red">{{table.info.todayWithdrawNums}}</span>
        </div>
      </el-col>
      <el-col :span="4">
      </el-col>
      <el-col :span="4">
        <div class="tj-title">今日彩金充值</div><div class="tj-val g-green">{{table.info.todayRechargeGift}}</div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">今日实际充值</div><div class="tj-val g-green">{{table.info.todayRecharge}}</div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">今日实际提现</div><div class="tj-val g-red">{{table.info.todayWithdraw}}</div>
      </el-col>
      <el-col :span="4">
        <div class="tj-title">今日充提差</div><div class="tj-val g-purple">{{table.info.todayKesun}}</div>
      </el-col>
    </el-row>
    <UserList v-model="regShow" />
  </el-card>
</template>

<style lang="scss">
.v_home_view{
  .el-col{
    padding-bottom: 15px;
    font-size: 14px;
    color: #303133;
    .tj-title{
      padding: 10px;
      background-color: #0d95e8;
      color: #fafafa;
    }
    .tj-val{
      padding: 10px;
      border: 1px solid #0d95e8;
    }
  }
}
</style>
