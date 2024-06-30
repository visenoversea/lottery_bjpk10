<script setup>
import UploadImg from '@/components/UploadImg.vue'
import {computed, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
import api from '@/utils/api'
import useStore from '@/stores/index'
const store = useStore()

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
  title: '',
  icon: '',
  info: {},
  min: '',
  max: '',
  remark: '',
  sort: '',
  authCode:'',
  status: 1
})

//打开
const open = () => {
  form.id = props.data.id
  form.title = props.data.title
  form.icon = props.data.icon
  form.info = JSON.parse(JSON.stringify(props.data.info))
  form.min = props.data.min
  form.max = props.data.max
  form.remark = props.data.remark
  form.sort = props.data.sort
  form.authCode = ''
  form.status = props.data.status
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editTrade(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}

const addWallet = () => {
  form.info.push({
    "currency": "USDT",
    "symbol": "",
    "rate": "1",
    "fixed": "2",
    "icon": "/img/coin/usdt.png",
    "chainList": [
      {
        "chain": "TRC-20",
        "address": ""
      }
    ]
  })
}

const delWallet = () => {
  form.info.pop()
}

const addWalletAddress = (item) => {
  item.push({
    chain: 'TRC-20',
    address: ''
  })
}
const delWalletAddress = (item) => {
  item.pop()
}

</script>
<template>
  <el-dialog v-model="show" top="2vh" title="编辑" @open="open" :close-on-click-modal="false" width="680px">
    <el-form v-loading="loading" size="default" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="请输入标题" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ID">{{ form.id }}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input type="textarea" :rows="3" v-model="form.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图标">
            <UploadImg width="80px" height="50px" v-model="form.icon"/>
            <el-input v-model="form.icon"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="props.data.fn=='Bank'" :gutter="24">
        <el-divider />
        <el-col :span="12">
          <el-form-item label="货币单位">
            <el-input v-model="form.info.currency" placeholder="请输入货币单位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货币符号">
            <el-input v-model="form.info.symbol" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货币汇率">
            <el-input v-model="form.info.rate" placeholder="请输入货币汇率"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金额位数">
            <el-input v-model="form.info.fixed" placeholder="请输入金额小数位数"></el-input>
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
          <el-form-item label="开户银行">
            <el-input v-model="form.info.bank_name" placeholder="请输入开户银行"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="银行代码">
            <el-input v-model="form.info.bank_code" placeholder="请输入银行代码"></el-input>
          </el-form-item>
        </el-col>
        <el-form-item label="开户支行">
          <el-input v-model="form.info.branch" placeholder="请输入开户支行"></el-input>
        </el-form-item>
        <el-divider />
      </el-row>
      <template v-else-if="props.data.fn=='Wallet'">
        <el-divider />
        <el-form-item label="钱包管理">
          <el-button type="primary" @click="addWallet()">新增</el-button>
          <el-button type="danger" @click="delWallet()">删除</el-button>
        </el-form-item>
        <el-divider />
        <el-row v-for="(item,index) in form.info" :key="index" :gutter="24">
          <el-col :span="12">
            <el-form-item label="货币单位">
              <el-input v-model="item.currency" placeholder="请输入货币单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货币图标">
              <UploadImg width="80px" height="80px" v-model="item.icon"/>
              <el-input v-model="item.icon"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货币汇率">
              <el-input v-model="item.rate" placeholder="请输入货币汇率"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量位数">
              <el-input v-model="item.fixed" placeholder="请输入换算数量小数位数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新增地址">
              <el-button type="primary" @click="addWalletAddress(item.chainList)">新增</el-button>
              <el-button type="danger" @click="delWalletAddress(item.chainList)">删除</el-button>
            </el-form-item>
          </el-col>
          <template v-for="(item2,index2) in item.chainList" :key="index2">
            <el-col :span="12">
              <el-form-item label="钱包地址">
                <el-input v-model="item2.address" placeholder="请输入钱包地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="链类型">
                <el-input v-model="item2.chain" placeholder="请输入链类型"></el-input>
              </el-form-item>
            </el-col>
          </template>
          <el-divider />
        </el-row>
      </template>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="最小限制">
            <el-input v-model="form.min" placeholder="请输入最小限制"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大限制">
            <el-input v-model="form.max" placeholder="请输入最大限制,-1不限制"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="排序">
            <el-input v-model="form.sort" placeholder="排序"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-select v-model="form.status">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="store.system.GoogleAuth=='1'" label="谷歌验证码">
        <el-input v-model="form.authCode" placeholder="请输入谷歌验证码" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>