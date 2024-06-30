<script setup>
import {computed, ref} from "vue";
// import { ElMessage } from 'element-plus'
import {formatDate} from '@/utils/index'
import api from '@/utils/api'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object
  }
})
const loading = ref(false)
//显示隐藏做双向绑定处理
const emits = defineEmits(['update:modelValue','success'])
const show = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const form = ref({
  team:{},
})

//打开
const open = async () => {
  loading.value = true
  const {success, data} = await api.getUserInfo({id:props.data.id})
  loading.value = false
  if (!success) return
  form.value = data.info
  // console.log(form)
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="编辑" @open="open" draggable :close-on-click-modal="false" width="720px">
    <el-form v-loading="loading" size="default" :model="form" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="会员账号">{{form.user_name}}<span class="g-red">({{form.id}})</span></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否虚拟号">
            <span v-if="form.virtual==1" class="g-red">是</span>
            <span v-else class="g-green">否</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="会员级数" class="g-red">第{{form.layer}}代</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱" class="g-blue">{{form.email}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="账户余额">{{form.balance}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <span v-if="form.status===1" class="g-green">正常</span>
            <span v-else-if="form.status===2" class="g-red">禁止提现</span>
            <span v-else-if="form.status===3" class="g-red">禁止下单</span>
            <span v-else-if="form.status===4" class="g-red">禁止下单提现</span>
            <span v-else-if="form.status===0" class="g-red">禁用</span>
            <span class="g-red" v-else>异常</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邀请码">{{form.tid}}</el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="各级下线人数">
            <el-row class="g-w75">
              <el-col :span="8">
                1级下线：<span class="g-green">{{form.team.layer1}}</span><span class="g-red">({{form.team.layerValid1}})</span>
              </el-col>
              <el-col :span="8">
                2级下线：<span class="g-green">{{form.team.layer2}}</span><span class="g-red">({{form.team.layerValid2}})</span>
              </el-col>
              <el-col :span="8">
                3级下线：<span class="g-green">{{form.team.layer3}}</span><span class="g-red">({{form.team.layerValid3}})</span>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="累计实际充值" class="g-green">{{form.recharge}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="累计实际提现" class="g-red">{{form.withdraw}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="累计充提差额">{{form.ks}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="累计赠送充值" class="g-purple">{{form.rechargeGift}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登录IP">{{form.login_ip}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登录地址">{{form.ipAddress}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册时间">{{formatDate(form.create_time)}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册IP">{{form.create_ip}}</el-form-item>
        </el-col>
      </el-row>











    </el-form>
    <template #footer>
      <el-button size="default" type="primary"  @click="show=false">确 认</el-button>
    </template>
  </el-dialog>
</template>