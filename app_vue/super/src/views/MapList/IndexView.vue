<script setup>
import {reactive, ref} from 'vue'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
import EditView from './EditView.vue'
import useStore from '@/stores/index'
const store = useStore()
//表单
const table = reactive({
  loading: false,
  total: 0,
  list: [],
  row:{}
})

const query = reactive({
  title:'',
  code:'',
  status: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getMapList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}
//获取列表
getList()
//编辑
const editShow = ref(false)
const edit = (row) => {
  table.row = row
  editShow.value = true
}
</script>
<template>
  <el-card>
    <template #header>
      <div class="g-flex">
        <span>字段映射</span>
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
      <el-form-item label="编码">
        <el-input v-model="query.code"  @keyup.enter="getList" placeholder="请输入编码" @clear="getList" clearable />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="query.title"  @keyup.enter="getList" placeholder="请输入标题" @clear="getList" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column label="编码" min-width="100">
        <template #default="scope">
          <span class="g-purple">{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="100">
        <template #default="scope">
          <span @click="store.setTranslate({content:scope.row.title})" class="g-purple g-pointer">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数值" min-width="100">
        <template #default="scope">
          <span class="g-purple">{{scope.row.val}}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" min-width="160">
        <template #default="scope">
          <span>{{scope.row.sort}}</span>
        </template>
      </el-table-column>
      <el-table-column label="翻译" min-width="160">
        <template #default="scope">
          <span v-if="scope.row.translate==1" class="g-green">开启</span>
          <span v-else class="g-red">关闭</span>
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
      <el-table-column label="状态" width="80" >
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">正常</span>
          <span v-else-if="scope.row.status===0" class="g-red">禁用</span>
          <span class="g-red" v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
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
    <EditView @success="getList(false)" v-model="editShow" :data="table.row"/>
  </el-card>
</template>