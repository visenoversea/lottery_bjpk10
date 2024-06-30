<script setup>
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import UploadImg from '@/components/UploadImg.vue'
import api from '@/utils/api'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default() {
      return {}
    }
  }
})
const refForm = ref()
const loading = ref(false)
//显示隐藏做双向绑定处理
const emits = defineEmits(['update:modelValue','success'])
const show = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  }
})
const isDisabled =ref(false)

const form = reactive({
  user_id: '',
  type:0,
  title: '客服充值',
  amount: '',
  money: '',
  img: '',
  remark: ''
})

// const obj = reactive({
//   currencyIndex:'',
//   currencyList:[],
// })

// const getCurrencyList = async () => {
//   const {success, data} = await api.getCurrencyList({currencyFrom: "USDT", status: 1})
//   if (!success) return
//   obj.currencyList = data.list
//   if(obj.currencyList.length>0){
//     obj.currencyIndex=0
//   }
// }
//
// getCurrencyList()

const open = async () => {
  if (props.user.id) {
    form.user_id = props.user.id
    isDisabled.value = true
  }
}

//关闭
const close = async () => {
  refForm.value.resetFields()
  // if (obj.currencyList.length > 0) {
  //   obj.currencyIndex = 0
  // }
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.addUserRecharge(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}
const setTitle = () => {
  if (form.type == 1) {
    form.title = '赠送彩金'
  } else {
    form.title = '客服充值'
  }
}

// const amountChange = () => {
//   if (form.amount === '' || obj.currencyIndex === '') {
//     form.money = ''
//   } else {
//     let currency = obj.currencyList[obj.currencyIndex]
//     //数量变动换算
//     form.money = (Number(form.amount) * Number(currency.rate)).toFixed(currency.fixed)
//   }
// }

// const moneyChange = () => {
//   if (form.money === '' || obj.currencyIndex === '') {
//     form.amount = ''
//   } else {
//     console.log('====',form.money)
//     let currency = obj.currencyList[obj.currencyIndex]
//     //数量变动换算
//     form.amount = (Number(form.money) / Number(currency.rate)).toFixed(2)
//   }
// }

</script>
<template>
  <el-dialog v-model="show" @open="open" title="新增充值" @close="close" draggable :close-on-click-modal="false" width="520px">
    <el-form v-loading="loading" size="default" ref="refForm" :model="form" label-width="90px">
      <el-form-item v-if="props.user.id" label="用户名">
        <div :class="{'g-bg-pink':props.user.virtual}">
          <span>{{ props.user.user_name }}</span>
          <span v-if="props.user.type===1" class="g-green">(会员)</span>
          <span v-else-if="props.user.type===2" class="g-blue">(代理)</span>
          <span v-else class="g-red">(异常)</span>
        </div>
      </el-form-item>
      <el-form-item label="充值类型">
        <el-radio-group @change="setTitle()" v-model="form.type">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">彩金</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户" prop="user_id">
        <el-input :disabled="isDisabled" v-model="form.user_id" placeholder="请输入用户名或ID" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入充值标题" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="充值金额" prop="amount">
        <el-input @input="amountChange" v-model="form.amount" placeholder="请输入充值金额" autocomplete="off"></el-input>
      </el-form-item>
<!--      <el-form-item label="支付货币" prop="amount">-->
<!--        <el-select v-model="obj.currencyIndex">-->
<!--          <el-option v-for="(item,index) in obj.currencyList" :key="item.id" :label="item.currency_to+'-'+Number(item.rate).toFixed(item.fixed)" :value="index"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="支付金额" prop="amount">-->
<!--        <el-input @input="moneyChange" v-model="form.money" placeholder="请输入支付金额" autocomplete="off"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="凭证" prop="img">-->
<!--        <UploadImg v-model="form.img"/>-->
<!--      </el-form-item>-->
      <el-form-item label="订单备注" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入订单备注" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>