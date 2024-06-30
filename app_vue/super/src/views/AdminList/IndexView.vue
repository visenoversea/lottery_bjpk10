<script setup>
import {reactive, ref} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
import AddView from './AddView.vue'
import EditView from './EditView.vue'
import SecretView from './SecretView.vue'
import useStore from '@/stores/index'
const store = useStore()
const auth = reactive({
  GoogleSecret:store.auth('GoogleSecret')
})

//表单
const table = reactive({
  loading: false,
  total: 0,
  list: [],
  row:{},
  roleList:[]
})
const query = reactive({
  status: '',
  search_key: 'user_name',
  search_val: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getAdminList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}
//获取列表
getList()

const getRoleList = async () => {
  const {success, data} = await api.getRoleList({type:1})
  if (!success) return
  table.roleList = data.list
}
getRoleList()

//新增
const addShow = ref(false)
//编辑
const editShow = ref(false)
const edit = (row) => {
  table.row = row
  editShow.value = true
}
const secretShow = ref(false)
const showSecret = (row) => {
  table.row = row
  secretShow.value = true
}
const resetSecret = (row) => {
  ElMessageBox.confirm('确认重置谷歌密钥?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.resetSecret({id: row.id})
    table.loading = false
    if (!success) return
    ElMessage.success(data.msg)
    await getList(false)
  })
}

//删除
const del = (row) => {
  ElMessageBox.confirm('确认删除数据?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.delAdmin({id: row.id})
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
        <span>管理员列表</span>
        <div class="g-flex-justify-end g-flex-1">
          <el-button type="success" @click="addShow=true">新增</el-button>
        </div>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="状态">
        <el-select v-model="query.status" @change="getList()">
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
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
            <el-input v-model="query.search_val" @keyup.enter="getList()" @clear="getList()"
                      placeholder="请输入查找内容" clearable></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-button type="primary" @click="getList()">查询</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column label="用户ID" prop="id" width="80" />
      <el-table-column prop="role.name" label="角色" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="用户名" prop="user_name" min-width="100" show-overflow-tooltip> </el-table-column>
      <el-table-column v-if="auth.GoogleSecret" label="谷歌令牌" width="120" :show-overflow-tooltip="true">
        <template #default="scope">
          <el-button type="success" @click="showSecret(scope.row)">显示密钥</el-button>
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="nick_name" min-width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column label="备注" prop="remark" min-width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column label="状态" width="50" >
        <template #default="scope">
          <span class="g-green" v-if="scope.row.status">正常</span>
          <span class="g-red" v-else>禁用</span>
        </template>
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
      <el-table-column label="操作" width="220" fixed="right">
        <template #default="scope">
          <el-button v-if="auth.GoogleSecret" type="success" @click="resetSecret(scope.row)">密钥重置</el-button>
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
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
    <AddView @success="getList" :role-list="table.roleList" v-model="addShow" />
    <EditView @success="getList(false)" :role-list="table.roleList" v-model="editShow" :data="table.row"/>
    <SecretView v-model="secretShow" :data="table.row"/>
  </el-card>
</template>