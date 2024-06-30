<script setup>
import UploadImg from '@/components/UploadImg.vue'
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
  id:0,
  type: 1,
  title: '',
  icon: '',
  price: '',
  fixed: '4',
  api: 1,
  api_config: {"symbol": "", "ratio": "0.005", "min": "", "max": "", "minVol": "10", "maxVol": "500"},
  data_config:{
    trade: {
      buyMin: "1",
      sellMin: "1",
    },
    contract: [
      {"multiple": "1", "min": "1"},
      {"multiple": "5", "min": "1"},
      {"multiple": "10", "min": "1"},
      {"multiple": "20", "min": "1"}
    ],
    time: [
      {"time": "60", "profit": "1", "min": "1"},
      {"time": "120", "profit": "1", "min": "1"},
      {"time": "180", "profit": "1", "min": "1"},
      {"time": "300", "profit": "1", "min": "1"}
    ],
    lever: {"min": "1", "max": "100", "contract": "100", "timeLimit": "1", "multiple": "100"},
  },
  fee_rate: '0',
  min: "0",
  introduce: {
    "website": "",
    "title": "",
    "whiteBookUrl": "",
    "totalAmount": "",
    "inAmount": "",
    "issueDate": "",
    "content": ""
  },
  hot: 0,
  sort: "0",
  status: 0
})

//打开
const open = () => {
  form.id = props.data.id
  form.type = props.data.type
  form.title = props.data.title
  form.icon = props.data.icon
  form.price = props.data.price
  form.fixed = props.data.fixed
  form.fee_rate = props.data.fee_rate
  form.min = props.data.min
  form.hot = props.data.hot
  form.sort = props.data.sort
  form.status = props.data.status
  form.api = props.data.api
  form.api_config = JSON.parse(props.data.api_config)
  form.data_config = JSON.parse(props.data.data_config)
  form.introduce = JSON.parse(props.data.introduce)
}

//确认
const confirm = async () => {
  if(loading.value){
    return
  }
  loading.value = true
  const {success, data} = await api.editProduct(form)
  loading.value = false
  if (!success) return
  emits('success')
  ElMessage.success(data.msg)
  show.value = false
}


const addContract = () => {
  form.contract_config.push({
    "multiple": "",
    "min": "1"
  })
}

const delContract = () => {
  form.contract_config.pop()
}

const addTime = () => {
  form.time_config.push({"time": "", "profit": "", "min": "1"})
}

const delTime = () => {
  form.time_config.pop()
}
</script>
<template>
  <el-dialog v-model="show" top="2vh" title="编辑" @open="open" :close-on-click-modal="false" width="750px">
    <el-form v-loading="loading" size="default" ref="refForm" :model="form" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="ID" prop="id">{{form.id}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio :label="0">币币</el-radio>
              <el-radio :label="1">杠杆</el-radio>
              <el-radio :label="2">秒合约</el-radio>
              <el-radio :label="3">外汇</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图标" prop="icon">
            <UploadImg width="100px" height="80px" v-model="form.icon"/>
            <el-input v-model="form.icon"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="当前价" prop="price">{{Number(form.price).toFixed(form.fixed)}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="小数位数" prop="fixed">
            <el-input v-model="form.fixed" placeholder="请输入价格小数位数" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手续费率" prop="fee_rate">
            <el-input v-model="form.fee_rate" placeholder="请输入手续费率,0.01为1%" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="余额限制" prop="min">
            <el-input v-model="form.min" placeholder="限制用户余额多少以上才能下单" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否热门" prop="min">
            <el-radio-group v-model="form.hot">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="form.sort" placeholder="排序值越大排越前面" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider/>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="数据源" prop="api">
            <el-select disabled v-model="form.api">
              <el-option label="系统" :value="1"></el-option>
              <el-option label="火币网" :value="2"></el-option>
<!--              <el-option label="币安" :value="3"></el-option>-->
              <el-option label="新浪财经" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.api!=1" label="api参数" prop="api_config.symbol">
            <el-input disabled v-model="form.api_config.symbol" placeholder="例btcusdt,ethusdt" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <template v-if="form.api==1">
          <el-col :span="12">
            <el-form-item label="涨跌比例" prop="api_config.ratio">
              <el-input v-model="form.api_config.ratio" placeholder="每分钟涨跌范围比例,0.01为1%" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最低价限制" prop="api_config.min">
              <el-input v-model="form.api_config.min" placeholder="为空不限制" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最高价限制" prop="api_config.max">
              <el-input v-model="form.api_config.max" placeholder="为空不限制" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="12">
          <el-form-item label="最小交易量" prop="api_config.minVol">
            <el-input v-model="form.api_config.minVol" placeholder="请输入产品价格最小交易量波动" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大交易量" prop="api_config.maxVol">
            <el-input v-model="form.api_config.maxVol" placeholder="请输入产品价格最大交易量波动" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider/>
      <template v-if="form.type==0">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="最小买入">
              <el-input v-model="form.data_config.trade.buyMin" placeholder="请输入最小买入" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最小卖出">
              <el-input v-model="form.data_config.trade.sellMin" placeholder="请输入最小卖出" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-else-if="form.type==1">
        <el-form-item label="杠杆配置">
          <el-button type="primary" @click="addContract()">新增</el-button>
          <el-button type="danger" @click="delContract()">删除</el-button>
        </el-form-item>
        <el-row v-for="(item,index) in form.data_config.contract" :key="index" :gutter="24">
          <el-col :span="12">
            <el-form-item label="杠杆倍数">
              <el-input v-model="item.multiple" placeholder="请输入杠杆" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额限制">
              <el-input v-model="item.min" placeholder="请输入最小金额限制" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-else-if="form.type==2">
        <el-form-item label="秒合约配置">
          <el-button type="primary" @click="addTime()">新增</el-button>
          <el-button type="danger" @click="delTime()">删除</el-button>
        </el-form-item>
        <el-row v-for="(item,index) in form.data_config.time" :key="index" :gutter="24">
          <el-col :span="8">
            <el-form-item label="时间(秒)">
              <el-input v-model="item.time" placeholder="请输入结算时间" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收益">
              <el-input v-model="item.profit" placeholder="请输入收益，1为100%" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额限制">
              <el-input v-model="item.min" placeholder="请输入最小金额限制" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-else-if="form.type==3">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="时间周期" prop="min">
              <el-radio-group v-model="form.data_config.lever.timeLimit">
                <el-radio label="0">24小时</el-radio>
                <el-radio label="1">外汇交易时间</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合约数量">
              <el-input v-model="form.data_config.lever.contract" placeholder="请输入合约数量" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="杠杆倍数">
              <el-input v-model="form.data_config.lever.multiple" placeholder="请输入杠杆倍数" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手数最小">
              <el-input v-model="form.data_config.lever.min" placeholder="请输入最小手数限制" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手数最大">
              <el-input v-model="form.data_config.lever.max" placeholder="请输入最大手数限制" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <el-divider/>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="产品全称" prop="introduce.title">
            <el-input v-model="form.introduce.title" placeholder="请输入产品全称" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="官网" prop="introduce.website">
            <el-input v-model="form.introduce.website" placeholder="请输入官网" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="白皮书链接" prop="introduce.whiteBookUrl">
            <el-input v-model="form.introduce.whiteBookUrl" placeholder="请输入白皮书链接" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发行日期" prop="introduce.inAmount">
            <el-input v-model="form.introduce.issueDate" placeholder="请输入发行日期" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发行总量" prop="introduce.totalAmount">
            <el-input v-model="form.introduce.totalAmount" placeholder="请输入发行总量" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="流通总量" prop="introduce.inAmount">
            <el-input v-model="form.introduce.inAmount" placeholder="请输入流通总量" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="产品介绍" prop="introduce.inAmount">
            <el-input type="textarea" :rows="3" v-model="form.introduce.content" placeholder="请输入产品介绍"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider/>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="show=false">取 消</el-button>
      <el-button size="default" type="primary" @click="confirm">确 认</el-button>
    </template>
  </el-dialog>
</template>