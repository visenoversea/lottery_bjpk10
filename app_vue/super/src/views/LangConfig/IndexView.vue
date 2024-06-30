<script setup>
import {reactive} from 'vue'
import api from '@/utils/api'
import UploadButton from  '@/components/UploadButton.vue'
import {formatDate} from '@/utils/index'
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from 'vue-router'
const router = useRouter()
//表单
const table = reactive({
  loading: false,
  list: []
})

const getList = async () => {
  table.loading = true
  const {success, data} = await api.getLangConfig()
  table.loading = false
  if (!success) return
  table.list = data.list
}
//获取列表
getList()
const makeFile =  (row) => {
  ElMessageBox.confirm('生成翻译文件?', '提示',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
  ).then(async () => {
    table.loading = true
    const {success, data} = await api.langConfigMakeFile({id: row.id});
    table.loading = false
    if (!success) return
    ElMessage.success(data.msg)
  })
}
</script>
<template>
  <el-card>
    <template #header>
      <div class="g-flex">
        <span>语言配置</span>
      </div>
    </template>
    <el-table v-loading="table.loading" :data="table.list" stripe border>
      <el-table-column prop="id" label="id" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="lang" label="默认语言" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="80" :show-overflow-tooltip="true">
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
      <el-table-column label="操作" width="170" fixed="right">
        <template #default="scope">
          <div style="padding-bottom: 12px;text-align: center;">
            <el-button type="success" @click="router.push({name:'LangConfigList',params:{id:scope.row.id}})">查看列表</el-button>
          </div>
          <div>
            <el-button type="danger" @click="makeFile(scope.row)">生成文件</el-button>
            <UploadButton api-url="uploadLangConfig" :data="{id:scope.row.id}"/>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>