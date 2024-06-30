<script setup>
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import api from '@/utils/api'
import useClipboard from 'vue-clipboard3'
import {reactive} from "vue";
import {ElMessage} from "element-plus";
const { toClipboard } = useClipboard()

const table = reactive({
  loading: false,
  info: {
    downUrl: '',
    promoteUrl: ''
  }
})

//确认
const copy = async (url) => {
  try {
    await toClipboard(url)
    ElMessage.success('复制成功')
  } catch (e) {
    console.error(e)
    ElMessage.error('复制失败')
  }
}

const getLink = async () => {
  table.loading = true
  const {success, data} = await api.getUserAgentLink()
  table.loading = false
  if (!success) return
  table.info = data.info
}
getLink()
</script>
<template>
  <el-card class="v_user_agent_link">
    <template #header>
      <div class="g-flex">
        <span>推广链接</span>
      </div>
    </template>
    <div v-loading="table.loading">
      <el-form v-loading="loading" size="default" label-width="120px">
        <template v-if="table.info.promoteUrl">
          <el-form-item label="推广链接：">
            <span style="padding-right: 10px">{{table.info.promoteUrl}}</span>
            <el-button @click="copy(table.info.promoteUrl)" type="primary">复制</el-button>
          </el-form-item>
          <el-form-item label="二维码：">
            <vueQr :text="table.info.promoteUrl" :margin="10" :size="200" />
          </el-form-item>
        </template>
        <template v-if="table.info.downUrl">
          <el-form-item label="下载链接：">
            <span style="padding-right: 10px">{{table.info.downUrl}}</span>
            <el-button @click="copy(table.info.downUrl)" type="primary">复制</el-button>
          </el-form-item>
          <el-form-item label="下载二维码：">
            <vueQr :text="table.info.downUrl" :margin="10" :size="200" />
          </el-form-item>
        </template>
      </el-form>
    </div>
  </el-card>
</template>
