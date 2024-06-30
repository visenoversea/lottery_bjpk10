<template>
  <div class="s_chart_select_coin_pop">
    <van-popup @close="onClose" v-model:show="show" position="left" class="s-pop g-flex-column"
      :style="{ width: '80%', height: '100%' }">
      <div class="s-pop-nav g-flex-align-center">
        <div @click="onClose" class="s-pop-nav-open-img g-flex-align-center">
          <img src="/img/icon/open.png" alt=""/>
        </div>
        <div class="s-pop-nav-list g-flex-align-center">
          <div v-for="(item, index) in store.system.ProductType" :key="index" @click="typeItemClick(item)" :class="form.type == item.id ? 'active': ''" 
            class="s-pop-nan-item g-flex-align-center g-flex-justify-center">
            <div class="s-pop-nan-item-title">
              {{ item.title }}
            </div>
          </div>
        </div>
        
      </div>
      <div class="s-pop-head g-flex-align-center">
        <div :class="form.productTypeId == item.id ? 'active' : ''" @click="partItemClick(item)" 
          v-for="(item, index) in partList.list" :key="index"
          class="s-pop-head-item g-flex-align-center g-flex-justify-center">
          {{ item.title }}
        </div>
      </div>
      <div class="s-pop-list">
        <div @click="itemClick(item)" v-show="procudtList.list" v-for="(item, index) in procudtList.list" :key="index" class="s-pop-item g-flex-align-center">
          <div class="s-pop-item-img g-flex-align-center">
            <img :src="item.icon" alt=""/>
          </div>
          <div class="s-pop-item-one g-flex-align-center">
            <p class="s-pop-item-one-title">{{ item.quoteCurrency }}</p>
            <!-- <span class="s-pop-item-one-danwei" v-show="item.baseCurrency"> /{{ item.baseCurrency }} </span> -->
          </div>
          <div class="s-pop-item-two g-flex-align-center g-flex-justify-center">
            {{ item.kline.close }}
          </div>
          <div class="s-pop-item-three-box g-flex-align-center g-flex-justify-end">
            <div :class="upDownBgClass(item.kline.zhangfu)" class="s-pop-item-three">
              {{ filtersZhangfu(item.kline.zhangfu, 2) }}
            </div>
          </div>
        </div>
        <NoList v-show="!procudtList.list.length"/>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { apiGetPartList, apiGetProductList } from '@/utils/api.js'
import { filtersZhangfu, upDownClass, upDownBgClass } from '@/utils/index.js'
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRoute, useRouter } from 'vue-router'
import ws from "@/utils/ws.js"
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('chartSelectCoinPop')
})

const route = useRoute()
const router = useRouter()

const props = defineProps({ 
  productData: {
    type: Object,
    default: () => {
      return {
        "id": 14,
        "product_type_id": 0,
        "type": 2,
        "title": "NG/USDT",
        "icon": "/img/coin/ng.png",
        "price": "24.60000000",
        "fixed": 3,
        "kline": {
          "open": "25.89100000",
          "close": 24.6,
          "low": 23.312,
          "high": 27.4,
          "vol": 184697.35
        },
        "api": 1,
        "api_config": "{\"symbol\":\"\",\"ratio\":\"0.005\",\"min\":\"5.8\",\"max\":\"28.8\",\"minVol\":10,\"maxVol\":500}",
        "fee_rate": "0.0100",
        "min": 0,
        "introduce": {
          "website": "",
          "title": "",
          "whiteBookUrl": "",
          "totalAmount": "",
          "inAmount": "",
          "issueDate": "",
          "content": ""
        },
        "hot": 0,
        "sort": 99996,
        "create_time": 1630809517,
        "modify_time": 1675911926,
        "status": 1,
        "baseCurrency": "USDT",
        "quoteCurrency": "NG",
        "contractConfig": [
          {
            "multiple": "1",
            "min": "1"
          },
          {
            "multiple": "5",
            "min": "1"
          },
          {
            "multiple": "10",
            "min": "1"
          },
          {
            "multiple": "20",
            "min": "1"
          }
        ],
        "timeConfig": [
          {
            "time": 60,
            "profit": "0.2",
            "min": 1
          },
          {
            "time": 120,
            "profit": "0.45",
            "min": "1"
          },
          {
            "time": 180,
            "profit": "0.65",
            "min": "1"
          },
          {
            "time": 300,
            "profit": "0.9",
            "min": "1"
          }
        ],
        "pointConfig": [
          {
            "time": 86400,
            "rate": "0.001",
            "min": 10
          },
          {
            "time": 604800,
            "rate": "0.001",
            "min": 100
          },
          {
            "time": 1296000,
            "rate": "0.001",
            "min": 500
          },
          {
            "time": 2592000,
            "rate": "0.001",
            "min": 1000
          }
        ],
        "isCollected": 0
      }
    }
  }
})


let show = ref(false)
let isKline = ref(true)
function onShow(flag = true) {
  if(!form.type) form.type = props.productData.type
  isKline.value = flag
  apiGetPartListHandel()
  show.value = true;
}
const emits = defineEmits(['emitChartSelectCoinPopClose'])

function onClose() {
  show.value = false;
  emits('emitChartSelectCoinPopClose')
  leaveGroupHandle()
}

function leaveGroupHandle() {
  procudtList.list.forEach(item => {
    if(item.id != props.productData.id) {
      ws.leaveGroup('market_' + item.id)
    }
  })
}

defineExpose({
  onShow
})



let form = reactive({
  productTypeId: 0,
  type: '',
  productId: route.query.id ? route.query.id : props.productData.id
})

let partList = reactive({
  list: []
})

let procudtList = reactive({ list: []})

// 点击分类
async function typeItemClick(item) {
  if(form.type == item.id) return
  form.type = item.id
  store.loadingShow = true
  apiGetPartListHandel()
}

// 获取板块
async function apiGetPartListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetPartList({ type: form.type })
  if(!success) return
  partList.list = data.list
  form.productTypeId = data.list[0].id
  apiGetProductListHandel()
}

// 点击板块
function partItemClick(item) {
  if(form.productTypeId == item.id) return
  form.productTypeId = item.id
  apiGetProductListHandel()
}

// 获取币种列表
async function apiGetProductListHandel() {
  store.loadingShow = true
  if(procudtList.list.length) leaveGrupHandle()
  const { success, data } = await apiGetProductList(form)
  if(!success) return
  procudtList.list = data.list.map(item => {
    item.kline.open = Number(item.kline.open).toFixed(item.fixed) 
    item.kline.close = Number(item.kline.close).toFixed(item.fixed) 
    item.kline.low = Number(item.kline.low).toFixed(item.fixed)
    item.kline.high = Number(item.kline.high).toFixed(item.fixed)
    item.kline.zhangfu = (Math.formatFloat(Number(item.kline.close) - Number(item.kline.open), item.fixed)) / Number(item.kline.open)
    return item
  })
  procudtList.list.forEach(item => {
    if(item.id == props.productData.id) {
      console.log('同一个', props.productData)
      Object.assign(item, props.productData)
    }
    else {
       ws.joinGroup('market_' + item.id, (data) => {
        item.kline.open = Number(data.open).toFixed(item.fixed) 
        item.kline.close = Number(data.close).toFixed(item.fixed) 
        item.kline.low = Number(data.low).toFixed(item.fixed)
        item.kline.high = Number(data.high).toFixed(item.fixed)
        item.kline.zhangfu = (Math.formatFloat(Number(data.close) - Number(data.open), item.fixed)) / Number(data.open)
        item.kline.vol = data.vol
      })
    }
   
  })
  console.log(data)
}

// 离开订阅
function leaveGrupHandle() {
  procudtList.list.forEach(item => {
    if(item.id != props.productData.id) {
      ws.leaveGroup('market_' + item.id)
    }
  })
}

function itemClick(item) {
  if(isKline.value) {
    router.replace({ name: 'chart', query: { id: item.id }}).then(faile => {
      console.log('faile', faile)
      if(faile && (faile.to.name == faile.from.name)) {
        router.replace({ name: 'refresh' })
      }
    })
  }else {
    if(form.type == 0) {
      router.replace({ name: 'tradebibi', query: { id: item.id }}).then(faile => {
        console.log('faile', faile)
        if(faile && (faile.to.name == faile.from.name)) {
          router.replace({ name: 'refresh' })
        }
      })
    }else if(form.type == 2) {
      router.replace({ name: 'tradeqiquan', query: { id: item.id }}).then(faile => {
        console.log('faile', faile)
        if(faile && (faile.to.name == faile.from.name)) {
          router.replace({ name: 'refresh' })
        }
      })
    }
    
  }

}
</script>

<style lang='scss'>
.s_chart_select_coin_pop {
  .van-overlay {
    filter: blur(0.08rem);
    -webkit-backdrop-filter: blur(.08rem);
    backdrop-filter: blur(0.08rem);
    background-color: rgba(0,0,0,.2);
  }
  .s-pop {
    position: absolute;
    background: var(--g-white);
    overflow: auto;
    .s-pop-title {
      padding: 10px 15px;
      font-size: 24px;
      color: #aab0c1;
      border-bottom: 1px solid #f2f4f7;
    }

    .s-pop-nav {
      padding: 15px 15px 15px 35px;
      position: relative;
      border-bottom: 2px solid #f2f4f7;
      .s-pop-nav-open-img {
        position: absolute;
        top: 50%;
        left: 0;
        padding-left: 15px;
        transform: translateY(-50%);
        img {
          width: 20px;
        }
      }
      .s-pop-nav-list {
        margin-left: 10px;
        flex: 1;
        height: 32px;
        border: 1px solid #cfd1d0;
        border-radius: 5px;
        overflow: hidden;
        .s-pop-nan-item {
          height: 100%;
          color: #758097;
          position: relative;
          padding: 0 5px;
          flex: 1;
          font-size: 15px;
          line-height: 30px;
          &.active {
            color: var(--g-white);
            background-color: var(--g-main_color);
            border-radius: 5px;
          }
          .s-pop-nan-item-title {
            width: 100%;
            text-align: center;
            @include textManyOverflow();
          }
        }
      }
      
    }

    .s-pop-head {
      border-bottom: 1px solid #cfd1d0;
      padding: 0px 15px;

      .s-pop-head-item {
        height: 40px;
        width: 70px;
        font-size: 14px;
        @include textEllipsis(1);
        color: #7985a6;
        border-radius: 4px;
        margin-right: 15px;
        position: relative;
        &.active {
          color: var(--g-main_color);
          &::after {
            position: absolute;
            content: "";
            width: 40px;
            height: 3px;
            background: var(--g-main_color);
            bottom: 0;
          }
        }
      }
    }

    .s-pop-list {
      flex: 1;
      overflow: auto;

      .s-pop-item {
        padding: 0 15px;
        height: 50px;
        border-bottom: 1px solid #f2f4f7;
        .s-pop-item-img {
          img {
            width: 25px;
            object-fit: cover;
          }
        }

        .s-pop-item-one {
          width: 40%;

          .s-pop-item-one-title {
            font-size: 16px;
            font-weight: 700;
            padding-left: 8px;
            color: var(--g-less-black);
          }

          .s-pop-item-one-danwei {
            font-size: 13px;
            color: #708ba7;
            padding-left: 3px;
          }
        }

        .s-pop-item-two {
          width: 30%;
          font-size: 15px;
          color: var(--g-less-black);
        }

        .s-pop-item-three-box {
          width: 30%;
          font-size: 14px;
          overflow: hidden;
          .s-pop-item-three {
            color: var(--g-white);
            min-width: 50px;
            max-width: 70px;
            height: 24px;
            line-height: 24px;
            font-weight: 700;
            border-radius: 4px;
            text-align: center;
            font-size: 13px;
            @include textManyOverflow();
          }
        }
      }
    }
  }
}
</style>