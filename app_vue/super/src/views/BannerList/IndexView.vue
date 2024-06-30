<script setup>
import {reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
import UploadButton from  '@/components/UploadButton.vue'

//表单
const table = reactive({
  loading: false,
  total: 0,
  list: [],
  row:{}
})

const query = reactive({
  code:'',
  title:'',
  status: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getBannerList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}
//获取列表
getList()
const setCode = (code) => {
  query.code=code
  getList()
}

const del = (row) => {
  ElMessageBox.confirm('确认删除数据?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.delBanner({id: row.id})
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
        <span>图片配置</span>
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
      <el-form-item label="编码">
        <el-input v-model="query.code"  @keyup.enter="getList" placeholder="请输入编码" @clear="getList" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column prop="id" label="ID" width="50">
      </el-table-column>
      <el-table-column label="状态" width="80" >
        <template #default="scope">
          <span v-if="scope.row.status===1" class="g-green">正常</span>
          <span v-else-if="scope.row.status===0" class="g-red">禁用</span>
          <span class="g-red" v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="100">
      </el-table-column>
      <el-table-column label="编码" width="100">
        <template #default="scope">
          <div class="g-pointer" @click="setCode(scope.row.code)">{{scope.row.code}}</div>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="150">
        <template #default="scope">
          <el-image v-if="scope.row.img" :src="scope.row.img" :preview-src-list="[scope.row.img]" fit="contain" hide-on-click-modal preview-teleported />
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="80" :show-overflow-tooltip="true">
      </el-table-column>
<!--      <el-table-column label="创建时间" width="130">-->
<!--        <template #default="scope">-->
<!--          <span>{{formatDate(scope.row.create_time)}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="更新时间" width="130">
        <template #default="scope">
          <span>{{formatDate(scope.row.modify_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="140" fixed="right">
        <template #default="scope">
          <UploadButton @success="getList(false)" api-url="uploadBanner" :data="{id:scope.row.id}"/>
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
  </el-card>
</template>