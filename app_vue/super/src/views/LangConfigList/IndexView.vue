<script setup>
import {reactive, ref} from 'vue'
import EditView from './EditView.vue'
import api from '@/utils/api'
import UploadButton from '@/components/UploadButton.vue'
import {formatDate} from '@/utils/index'
import AddView from "@/views/LangConfigList/AddView.vue";
import {useRoute} from 'vue-router'
import {ElMessage} from "element-plus";
const route = useRoute()
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
  lang_config_id: route.params.id,
  lang:'',
  status: '',
  k:'',
  content:'',
  page: 1,
  limit: 15
})

const getList = async (init = true) => {
  if (init) query.page = 1
  table.loading = true
  const {success, data} = await api.getLangConfigList(query)
  table.loading = false
  if (!success) return
  table.list = data.list
  table.total = data.total
}

const exportTranslate = async () => {
  if (query.lang == '') {
    ElMessage.error('请选择要导出的语言')
    return
  }
  const {success, data} = await api.exportTranslate({lang_config_id: query.lang_config_id, lang: query.lang})
  if (!success) return
  ElMessage.success(data.msg)
  window.open(data.filePath)
}

const translateLangConfigList = async () => {
  const {success, data} = await api.translateLangConfigList(query)
  if (!success) return
  ElMessage.success(data.msg)
  if (data.code == 2) {
    setTimeout(() => {
      translateLangConfigList()
    }, 10000)
  }
  await getList()
}

//编辑
const editShow = ref(false)
const edit = (row) => {
  table.row = row
  editShow.value = true
}

const setK = (val) => {
  query.k=val
  getList()
}
//获取列表
getList()
//编辑
const addShow = ref(false)
const add = () => {
  addShow.value = true
}
</script>
<template>
  <el-card>
    <template #header>
      <div class="g-flex">
        <span>语言翻译列表</span>
        <div class="g-flex-justify-end g-flex-1">
          <UploadButton label="导入Excel" api-url="importTranslate" :data="{langConfigId:query.lang_config_id}" />
          <el-button type="primary" @click="exportTranslate">导出Excel</el-button>
          <el-button type="success" @click="translateLangConfigList()">开始翻译</el-button>
          <el-button type="success" @click="add()">新增</el-button>
        </div>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="状态">
        <el-select v-model="query.status" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option label="已翻译" value="1"></el-option>
          <el-option label="不翻译" value="2"></el-option>
          <el-option label="待翻译" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语言">
        <el-select v-model="query.lang" @change="getList">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in table.langList" :key="item.id" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="键值">
        <el-input v-model="query.k"  @keyup.enter="getList" placeholder="请输入键值" @clear="getList" clearable />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="query.content"  @keyup.enter="getList" placeholder="请输入内容" @clear="getList" clearable />
      </el-form-item>
      <el-form-item><el-button type="primary" @click="getList">查询</el-button></el-form-item>
    </el-form>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column prop="id" label="id" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="lang" label="翻译语言" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="内容类型" width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <span v-if="scope.row.type==1" class="g-red">Number</span>
          <span v-else class="g-green">String</span>
        </template>
      </el-table-column>
      <el-table-column label="键值" min-width="120" :show-overflow-tooltip="true">
        <template #default="scope">
          <span @click="setK(scope.row.k)" class="g-purple g-pointer">{{scope.row.k}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" min-width="120" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="状态" width="80" :show-overflow-tooltip="true">
        <template #default="scope">
          <span v-if="scope.row.status==0" class="g-red">待翻译</span>
          <span v-else-if="scope.row.status==1" class="g-green">已翻译</span>
          <span v-else-if="scope.row.status==2" class="g-purple">不翻译</span>
          <span v-else class="g-red">异常</span>
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
      <el-table-column label="操作" width="140" fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
<!--          <el-button type="danger" @click="del(scope.row)">删除</el-button>-->
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
    <AddView @success="getList(false)" v-model="addShow" :data="{langConfigId:query.lang_config_id}"/>
    <EditView @success="getList(false)" v-model="editShow" :data="table.row"/>
  </el-card>
</template>