<script setup>
import { reactive, ref } from "vue";
import api from "@/utils/api";
import { ElMessage } from "element-plus";

const form = reactive({
  api: "",
  userId: "",
  orderNo: "",
  ip: "",
});
const loading = ref(false);
//确认
const confirm = async () => {
  if (!form.api) {
    ElMessage.error("请选择要处理的问题");
    return;
  }
  if (loading.value) {
    return;
  }
  loading.value = true;
  const { success, data } = await api[form.api](form);
  loading.value = false;
  if (!success) return;
  ElMessage.success(data.msg);
};
const optionChange = (val) => {
  form.userId = "";
  form.ip = "";
  form.orderNo = "";
};
</script>
<template>
  <el-card>
    <template #header>
      <div class="g-flex">
        <span>系统数据处理</span>
      </div>
    </template>
    <el-form style="max-width: 500px" v-loading="loading" size="default" :model="form" label-width="150px">
      <el-form-item label="选择要处理的问题">
        <el-select v-model="form.api" @change="optionChange">
          <el-option label="用户等级晋升排查" value="userUpLevel"></el-option>
          <el-option label="加后台的ip白名单" value="addWhiteIp"></el-option>
          <el-option label="强制踢用户下线" value="kickUser"></el-option>
          <el-option label="域名刷新缓存" value="resetDomainCache"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.api === 'userUpLevel' || form.api === 'kickUser'" label="用户id" prop="title">
        <el-input v-model="form.userId" placeholder="请输入用户id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="form.api === 'addWhiteIp'" label="IP地址" prop="title">
        <el-input v-model="form.ip" placeholder="请输入IP地址" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="default" type="primary" @click="confirm">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
