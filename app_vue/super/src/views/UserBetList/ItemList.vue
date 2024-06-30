<script setup>
import {computed, reactive} from 'vue'
import api from '@/utils/api'
import {formatDate} from '@/utils/index'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object
  }
})

//显示隐藏做双向绑定处理
const emits = defineEmits(['update:modelValue','success'])
const show = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  }
})

//表单
const table = reactive({
  loading: false,
  list: [],
  row:{}
})

const getList = async () => {
  table.loading = true
  const {success, data} = await api.getUserBetItemList({id:props.data.id})
  table.loading = false
  if (!success) return
  table.list = data.list
}

const open = () => {
  getList()
}
</script>
<template>
  <el-dialog v-model="show" title="下注详情" @open="open" draggable :close-on-click-modal="false" width="680px">
    <el-table v-loading="table.loading" height="280" :data="table.list" stripe border>
      <el-table-column label="下注号码" min-width="80">
        <template #default="scope">
          <span class="g-blue">{{scope.row.bet_no}}</span>
        </template>
      </el-table-column>
      <el-table-column label="赔率" min-width="80">
        <template #default="scope">
          <span class="g-purple">{{scope.row.odds}}</span>
        </template>
      </el-table-column>
      <el-table-column label="投注金额" width="80">
        <template #default="scope">
          <span class="g-green">{{scope.row.bet_amount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="中奖金额" width="80">
        <template #default="scope">
          <span class="g-red">{{scope.row.win_amount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="130" :show-overflow-tooltip="true">
        <template #default="scope">
          <span>{{formatDate(scope.row.create_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="130" :show-overflow-tooltip="true">
        <template #default="scope">
          <span>{{formatDate(scope.row.modify_time)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>