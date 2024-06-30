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
  addUserReal:store.auth('addUserReal'),
  editUserReal:store.auth('editUserReal'),
  delUserReal:store.auth('delUserReal'),
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
  id_card:'',
  name:'',
  search_key: 'user_name',
  search_val: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getUserRealList(query)
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
    ElMessageBox.confirm('确认实名审核通过?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
        .then(async () => {
          table.loading = true
          const {success, data} = await api.reviewUserReal({id: row.id, status: 1})
          table.loading = false
          if (!success) return
          ElMessage.success(data.msg)
          await getList(false)
        })
  }else{
    ElMessageBox.prompt('审核不通过原因(选填)', '确认驳回审核', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
        .then(async ({value}) => {
          table.loading = true
          const {success, data} = await api.reviewUserReal({id: row.id, reason: value, status: 0})
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
    const {success, data} = await api.delUserReal({id: row.id})
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
        <span>用户实名</span>
        <div class="g-flex-justify-end g-flex-1">
          <el-button v-if="auth.addUserReal" type="success" @click="addShow=true">新增</el-button>
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
      <el-form-item label="状态">
        <el-select v-model="query.status" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核中" value="2"></el-option>
          <el-option label="审核不通过" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input v-model="query.id_card"  @keyup.enter="getList" placeholder="请输入卡号" @clear="getList" clearable />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="query.name"  @keyup.enter="getList" placeholder="请输入姓名" @clear="getList" clearable />
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
      <el-table-column fixed="left" label="状态" width="80" >
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">审核通过</span>
          <span v-else-if="scope.row.status===2" class="g-yellow">待审核</span>
          <span v-else-if="scope.row.status===0" class="g-red">审核不通过</span>
          <span class="g-red" v-else>异常</span>
        </template>
      </el-table-column>
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
      <el-table-column label="证件类型" width="80">
        <template #default="scope">
          <span v-if="scope.row.type===1" class="g-green">身份证</span>
          <span v-else-if="scope.row.type===2" class="g-yellow">护照</span>
          <span v-else-if="scope.row.type===3" class="g-red">驾驶证</span>
          <span class="g-red" v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column prop="country" label="国家" width="100">
      </el-table-column>
      <el-table-column prop="id_card" label="证件号码" min-width="100">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100">
      </el-table-column>
      <el-table-column label="证件正面" width="150">
        <template #default="scope">
          <el-image v-if="scope.row.front_img" :src="scope.row.front_img" :preview-src-list="[scope.row.front_img]" fit="contain" hide-on-click-modal preview-teleported />
        </template>
      </el-table-column>
      <el-table-column label="证件反面" width="150">
        <template #default="scope">
          <el-image v-if="scope.row.reverse_img" :src="scope.row.reverse_img" :preview-src-list="[scope.row.reverse_img]" fit="contain" hide-on-click-modal preview-teleported />
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="失败原因" width="100">
      </el-table-column>
      <el-table-column prop="operator" label="操作人" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="创建时间" width="130">
        <template #default="scope">
          <span>{{formatDate(scope.row.create_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="130">
        <template #default="scope">
          <span>{{formatDate(scope.row.modify_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="auth.editUserReal" label="操作" width="130" fixed="right">
        <template #default="scope">
          <div style="padding-bottom: 12px" v-if="scope.row.status===2">
            <el-button type="success" @click="editStatus(scope.row,1)">通过</el-button>
            <el-button type="danger" @click="editStatus(scope.row,0)">驳回</el-button>
          </div>
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button v-if="auth.delUserReal" type="danger" @click="del(scope.row)">删除</el-button>
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