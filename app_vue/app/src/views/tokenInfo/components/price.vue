<script setup>
import {computed, inject, markRaw, nextTick, onMounted, onUnmounted, ref} from "vue";
import Vtable from "@/views/tokenInfo/components/vtable.vue";
import {useI18n} from "vue-i18n";
import {apiGetDCPTGData, apiGetKline} from "@/utils/api";
const i18nObj = useI18n();
import { init, dispose } from 'klinecharts'
import WebSocketManager from "@/utils/socket";
import Chartk from "@/views/tokenInfo/components/chartk.vue";
import { WebSocketInstance } from "@/utils/web_socket.js";

const i18n = computed(() => {
  return i18nObj.tm("tokenInfo");
});
const ChartK = ref(null)
const timedata = ref(0)
const intervalK = ref(null)
const topList = [
  {
    title: '#',
    type: 'index',
    width:'12.82vw'
  },
  {
    title: i18n.value.jydText,
    key:'title'
  },
  {
    title: i18n.value.zxjText,
    key:'price',
    order: true
  },
  {
    title: i18n.value.dayEdText,
    key:'amount',
    order: true
  },
  {
    title: i18n.value.cjezbText,
    key:'percent',
    order: true
  },
]
const tableData = ref([])
const timeSelect = [
  {
    title:'1m',
    data: 60
  },
  {
    title:'5m',
    data: 300
  },
  {
    title:'15m',
    data: 900
  },
  {
    title:'30m',
    data: 1800
  },
  {
    title:'1H',
    data: 3600
  },
  {
    title:'4H',
    data: 14400
  },
  {
    title:'1D',
    data: 86400
  },
  {
    title:'1W',
    data: 604800
  },
  {
    title:'1M',
    data: 604800
  }]
function timeCheck(data,index){
  clearInterval(intervalK.value);
  timedata.value = index
  getKtime(data.data)
}

async function getKline(){
  const res = await apiGetKline({id:60000,type: timedata.value})
  ChartK.value.showKline(res.data.kline, 4)
  joinGroupHandle()
}


async function getDCPTGData(){
  const data = await apiGetDCPTGData()
  tableData.value = data.data.list
}
function getKtime(time) {
    getKline();
  intervalK.value = setInterval(() => {
    getKline();
  }, time * 1000);
}


function joinGroupHandle(){

  WebSocketInstance.joinGroup("market_60000", (data) => {
    const obj = {
      close: Number(data.close).toFixed(4),
      vol: data.vol,
      volume: data.volume,
      low: Number(data.close) < Number(data.low) ? Number(data.close).toFixed(4) : Number(data.low).toFixed(4),
      high: Number(data.close) > Number(data.high) ? Number(data.close).toFixed(4) : Number(data.high).toFixed(4),
    };
    ChartK.value.receiveData(obj)
  })
}
function leaveGrupHandle() {
    WebSocketInstance.leaveGroup("market_60000");
}

onUnmounted(() => {
  leaveGrupHandle()
  clearInterval(intervalK.value);
})

onMounted(()=>{
  getKtime(60)
  getDCPTGData()
})
</script>

<template>
  <!--<div class="kline-container">
    <ul>
      <li v-for="(data,index) in timeSelect" :key="index" :class="{enter: timedata === index}" @click="timeCheck(data,index)">{{data.title}}</li>
    </ul>
    <chartk class="kline" ref="ChartK"/>
  </div>-->
  <iframe style ="width:100%; min-height: 50vh;top:-50px;position:relative; border: none;" src="https://www.dextools.io/widget-chart/en/bnb/pe-light/0x3543f30a457a8fc4dee9983e9d357cd52bab5ab7?theme=dark&chartType=2&chartResolution=30&drawingToolbars=false"></iframe>
  <!--<vtable class="table" :topList="topList" :tableData="tableData">
    <template #title="{row}">
      <div class="pairs">
        <p>
          <img :src="row.icon" alt="">
          {{row.title}}
        </p>
        <p>{{row.currency}}</p>
      </div>
    </template>
    <template #percent="{row}">
      {{row.percent * 100}}%
    </template>
  </vtable>-->
</template>

<style scoped lang="scss">
.table{
  padding: 0 10px;
}
.pairs{
  p{
    display: flex;
    align-items: center;
    img{
      width: 20px;
      margin-right: 4px;
      height: 20px;
    }
    &:last-child{
      font-weight: 400;
      font-size: 12px;
      color: rgba(0,0,0,0.6);
      line-height: 17px;
    }
  }
}
.kline-container{
  position: relative;
  ul{
    display: flex;
    height: 35px;
    padding: 0 15px;
    justify-content: space-between;
    li{
      line-height: 35px;
      font-weight: 500;
      font-size: 11px;
      color: #8F8E8F;
      text-align: left;
      position: relative;
    }
    .enter{
      color: #000000;
      &:after{
        position: absolute;
        display: inline-block;
        content: '';
        width: 54px;
        left: -19px;
        height: 1px;
        bottom: 0;
        background: #000000;
      }
    }
  }
  .kline{
    height: 289px;
    position: relative;
  }
  p{
    position: absolute;
    display: flex;
    bottom: 12px;
    width: 100%;
    justify-content: center;
    span{
      color: #616161;
      z-index: 10;
      font-weight: bold;
      font-size: 12px;
      line-height: 16px;
      margin-right: 20px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
}

</style>
