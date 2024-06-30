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
  addDomain:store.auth('addDomain'),
  editDomain:store.auth('editDomain'),
  delDomain:store.auth('delDomain'),
})
//表单
const table = reactive({
  loading: false,
  total: 0,
  list: [],
  row:{}
})

const query = reactive({
  title:'',
  status: '',
  page: 1,
  limit: 20
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getCrontabList(query)
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

const del = (row) => {
  ElMessageBox.confirm('确认删除数据?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.delCrontab({id: row.id})
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
        <span>定时任务</span>
        <div class="g-flex-justify-end g-flex-1">
          <el-button v-if="auth.addDomain" type="success" @click="addShow=true">新增</el-button>
        </div>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="状态">
        <el-select v-model="query.status" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-row>
          <el-col :span="18">
            <el-input v-model="query.title"  @keyup.enter="getList" placeholder="请输入标题" @clear="getList" clearable />
          </el-col>
          <el-col :span="5" :offset="1">
            <el-button type="primary" @click="getList">查询</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column prop="id" label="ID" width="100">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="120">
      </el-table-column>
      <el-table-column prop="fn" label="函数名" min-width="80">
      </el-table-column>
      <el-table-column prop="expression" label="表达式" min-width="150">
      </el-table-column>
      <el-table-column label="执行设定" width="130">
        <template #default="scope">
          <span v-if="scope.row.second==0"  class="g-purple">执行一次</span>
          <span v-else class="g-red">每隔{{scope.row.second}}秒执行</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="下次执行时间" width="130">
        <template #default="scope">
          <span>{{formatDate(scope.row.run_time)}}</span>
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
      <el-table-column label="日志" width="120">
        <template #default="scope">
          <div>
            <span v-if="scope.row.log_switch===0" class="g-red">关闭</span>
            <span v-else-if="scope.row.log_switch===1" class="g-green">开启</span>
            <span v-else class="g-red">(异常)</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80" >
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">正常</span>
          <span v-else-if="scope.row.status===0" class="g-red">禁用</span>
          <span class="g-red" v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column v-if="auth.editDomain" label="操作" width="130" fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button v-if="auth.delDomain" type="danger" @click="del(scope.row)">删除</el-button>
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
    <AddView @success="getList" v-model="addShow"/>
    <EditView @success="getList(false)" v-model="editShow" :data="table.row"/>
  </el-card>
</template>