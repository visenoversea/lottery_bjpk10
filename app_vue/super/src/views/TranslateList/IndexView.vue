<script setup>
import {reactive, ref} from 'vue'
import EditView from './EditView.vue'
import api from '@/utils/api'
import {ElMessage, ElMessageBox} from "element-plus";
import useStore from '@/stores/index'
const store = useStore()
//表单
const table = reactive({
  loading: false,
  total: 0,
  list: [],
  langList:[]
})

const getLangList = async () => {
  table.loading = true
  const {success, data} = await api.getLangList()
  table.loading = false
  if (!success) return
  table.langList = data.list
}

getLangList()

const query = reactive({
  type:'',
  lang:'',
  md5:'',
  content:'',
  tl_content:'',
  status: '',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getTranslateList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}

const del = (row) => {
  ElMessageBox.confirm('确认删除数据?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.delTranslate({id: row.id})
    table.loading = false
    if (!success) return
    ElMessage.success(data.msg)
    await getList(false)
  })
}
//编辑
const editShow = ref(false)
const edit = (row) => {
  table.row = row
  editShow.value = true
}

const setMd5 = (val) => {
  query.md5=val
  getList()
}
//获取列表
getList()
</script>
<template>
  <el-card>
    <template #header>
      <div class="g-flex">
        <span>翻译列表</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="状态">
        <el-select v-model="query.type" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="文字" value="0"></el-option>
          <el-option label="富文本" value="1"></el-option>
          <el-option label="图片" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="query.status" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="翻译成功" value="1"></el-option>
          <el-option label="翻译失败" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语言">
        <el-select v-model="query.lang" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in table.langList" :key="item.id" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原文">
        <el-input v-model="query.content"  @keyup.enter="getList" placeholder="请输入原文" @clear="getList" clearable />
      </el-form-item>
      <el-form-item label="MD5">
        <el-input v-model="query.md5"  @keyup.enter="getList" placeholder="请输入键值" @clear="getList" clearable />
      </el-form-item>
      <el-form-item label="翻译内容">
        <el-input v-model="query.tl_content"  @keyup.enter="getList" placeholder="请输入翻译内容" @clear="getList" clearable />
      </el-form-item>
      <el-form-item><el-button type="primary" @click="getList">查询</el-button></el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column prop="id" label="id" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="状态" width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <span v-if="scope.row.status==0" class="g-red">翻译失败</span>
          <span v-else-if="scope.row.status==1" class="g-green">翻译成功</span>
          <span v-else class="g-red">异常</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <span v-if="scope.row.type==0" class="g-green">文字</span>
          <span v-else-if="scope.row.type==1" class="g-purple">富文本</span>
          <span v-else-if="scope.row.type==2" class="g-purple">图片</span>
          <span v-else class="g-red">异常</span>
        </template>
      </el-table-column>
      <el-table-column label="MD5" width="120" :show-overflow-tooltip="true">
        <template #default="scope">
          <span @click="setMd5(scope.row.md5)" class="g-purple g-pointer">{{scope.row.md5}}</span>
        </template>
      </el-table-column>
      <el-table-column label="原文" min-width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <el-image style="max-width: 100px" @click="store.setTranslate({content:scope.row.translate.content,type:2})" v-if="scope.row.type==2" :src="scope.row.translate.content" :preview-src-list="[scope.row.translate.content]" fit="contain" hide-on-click-modal preview-teleported />
          <div @click="store.setTranslate({content:scope.row.translate.content})" v-else>{{scope.row.translate.content}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="tl" label="翻译语言" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="tl_content" label="翻译内容" min-width="160" :show-overflow-tooltip="true">
        <template #default="scope">
          <el-image style="max-width: 100px" v-if="scope.row.type==2" :src="scope.row.tl_content" :preview-src-list="[scope.row.tl_content]" fit="contain" hide-on-click-modal preview-teleported />
          <div v-else>{{scope.row.tl_content}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="err_nums" label="翻译失败" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="操作" width="140" fixed="right">
        <template #default="scope">
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
    <EditView @success="getList(false)" v-model="editShow" :data="table.row"/>
  </el-card>
</template>