<script setup>
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
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

const form = reactive({
  id: 0,
  real_amount:'',
  info:'',
  reason:'',
  remark:'',
  status:1
})

//打开
const open = () => {
  form.id = props.data.id
  form.real_amount = props.data.real_amount
  form.reason = props.data.reason
  form.remark = props.data.remark
  form.info = JSON.parse(JSON.stringify(props.data.info))
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editUserRecharge(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="编辑" @open="open" draggable :close-on-click-modal="false" width="680px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="用户ID">
            <div :class="{'g-bg-pink':props.data.user.virtual}">
              <span>{{ props.data.user_id }}</span>
              <span v-if="props.data.user.type===1" class="g-green">(会员)</span>
              <span v-else-if="props.data.user.type===2" class="g-blue">(代理)</span>
              <span v-else class="g-red">(异常)</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名">{{props.data.user.user_name}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="标题">{{props.data.title}}</el-form-item>
        </el-col>
        <el-col :span="12">
<!--          <el-form-item label="汇率">-->
<!--            <div v-if="form.info.currency=='USDT'">{{form.info.rate}}</div>-->
<!--            <div v-else>-->
<!--              <span class="g-red">1 USDT</span>&nbsp;≈&nbsp;-->
<!--              <span class="g-red">{{form.info.rate}} {{form.info.currency}}</span>-->
<!--            </div>-->
<!--          </el-form-item>-->
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="实际充值">
            <el-input v-model="form.real_amount" placeholder="请输入实际充值到账金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单号">{{props.data.order_no}}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item class="g-red" label="充值金额"><span>{{ props.data.amount }}</span></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="凭证" prop="front_img">
            <el-image style="width:150px;height: 100px" v-if="props.data.img" :src="props.data.img" :preview-src-list="[props.data.img]" fit="contain" hide-on-click-modal preview-teleported />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.info.fn=='Bank'" :gutter="24">
        <el-col :span="12">
          <el-form-item label="银行名称">
            <el-input v-model="form.info.bank_name" placeholder="请输入银行名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="银行代码">
            <el-input v-model="form.info.bank_code" placeholder="请输入银行代码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="银行卡号">
            <el-input v-model="form.info.card_number" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="form.info.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="银行网点">
            <el-input v-model="form.info.branch" placeholder="请输入银行网点"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-else-if="form.info.fn=='Wallet'" :gutter="24">
        <el-col :span="12">
          <el-form-item label="链类型">
            <el-input v-model="form.info.chain " placeholder="请输入链类型"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="钱包地址">
            <el-input v-model="form.info.address " placeholder="请输入钱包地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="props.data.status==0" label="失败原因" prop="reason">
        <el-input v-model="form.reason" placeholder="请输入失败原因" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="订单备注" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入订单备注" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select disabled v-model="form.status">
          <el-option label="审核通过" :value="1"></el-option>
          <el-option label="驳回" :value="0"></el-option>
          <el-option label="审核中" :value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>