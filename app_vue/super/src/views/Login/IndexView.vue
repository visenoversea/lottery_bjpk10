<script setup>
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import useStore from '@/stores/index'
import api from '@/utils/api'
import ws from '@/utils/ws'
import { ElMessage } from 'element-plus'
import {User, Lock,Help} from '@element-plus/icons-vue'
const store = useStore()
const router = useRouter()
const formData = reactive({
  account: '',
  password: '',
  authCode: '',
})
const loading = ref(false)
const login = async () => {
  loading.value = true
  const {success, data} = await api.login(formData)
  loading.value = false
  if (!success) return
  store.setToken(data.token)
  ElMessage.success(data.msg)
  ws.setToken(data.token)
  await router.replace("/")
}
</script>

<template>
  <div v-loading="loading" class="v_login g-flex-column g-flex-align-center g-flex-justify-center">
    <div class="v-title">后台管理系统</div>
    <div class="v-box g-flex-align-center g-flex-justify-center">
      <el-image src="/img/admin/login_form_img.png" fit="contain" />
      <el-form size="large" class="v-form g-flex-column g-flex-align-start">
        <h3 class="v-form-title">欢迎登录</h3>
        <div class="v-form-tip">征服自己就能征服一切</div>
        <el-form-item>
          <el-input clearable v-model="formData.account" type="text" placeholder="请输入账号" :prefix-icon="User"/>
        </el-form-item>
        <el-form-item>
          <el-input show-password v-model="formData.password" type="password" placeholder="请输入密码" @keyup.enter="login" :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item v-if="store.system.GoogleAuth==1">
          <el-input v-model="formData.authCode" type="text" placeholder="请输入谷歌验证码" @keyup.enter="login" :prefix-icon="Help" />
        </el-form-item>
        <el-button size="default" type="primary" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.v_login {
  width: 100%;
  height: 100%;
  background: url("/img/admin/login_bg.jpg") no-repeat;
  background-size: 100% 100%;

  .v-title {
    text-align: center;
    font-size: 32px;
    color: var(--g-white);
    padding: 15px;
  }

  .v-box {
    background-color: hsla(0, 0%, 100%, .7);
    border: 1px solid #dcdfe6;
    width: 960px;
    height: 550px;
    border-radius: 20px;
    .v-form {
      padding-left: 100px;
      .v-form-title {
        font-size: 28px;
        text-align: center;
        font-weight: 400;
        color: #007aff;
        margin: 0;
        padding: 0 0 20px 0;
      }
      .v-form-tip {
        font-size: 12px;
        color: #b5b5b5;
        padding-bottom: 28px;
      }
      .el-button {
        background: #007aff;
        width: 100%;
      }
      .el-input{
        width: 250px;
      }
    }
  }
}
</style>
