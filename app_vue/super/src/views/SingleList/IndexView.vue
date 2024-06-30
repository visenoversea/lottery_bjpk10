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
  type: 0,
  title: '',
  des: '',
  status: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getArticleList(query)
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
        <span>单篇文章</span>
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
        <el-input v-model="query.title"  @keyup.enter="getList" placeholder="请输入标题" @clear="getList" clearable />
      </el-form-item>
<!--      <el-form-item label="描述">-->
<!--        <el-input v-model="query.des"  @keyup.enter="getList" placeholder="请输入描述" @clear="getList" clearable />-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column label="ID" width="80">
        <template #default="scope">
          <div>{{ scope.row.id }}</div>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="100">
        <template #default="scope">
          <span class="g-pointer" @click="store.setTranslate({content:scope.row.title})">{{scope.row.title}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="描述" min-width="60" :show-overflow-tooltip="true">-->
<!--        <template #default="scope">-->
<!--          <span @click="store.setTranslate({content:scope.row.des})">{{scope.row.des}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="内容" min-width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <el-button type="success" @click="store.setTranslate({type:1,content:scope.row.content})">翻译</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="read_nums" label="阅读量" width="80" :show-overflow-tooltip="true">
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
      <el-table-column label="操作" width="70" fixed="right">
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