<script setup>
import {computed, inject, markRaw, nextTick, onMounted, ref} from "vue";
import Vtable from "@/views/tokenInfo/components/vtable.vue";
import {useI18n} from "vue-i18n";
import {apiGetDCPTGData, apiGetKline} from "@/utils/api";
import { WebSocketInstance } from "@/utils/web_socket.js";
import {formatDate} from "@/utils/time";
const echarts = inject('echarts');
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("tokenInfo");
});
const option = ref({
  "backgroundColor": "#FFFFFF",
  "tooltip": {
    // "backgroundColor": "transparent",
    "trigger": "axis",
    "borderColor": "transparent",
    "textStyle": {
      // "color": "white"
    },
    "axisPointer": {
      "animation": false,
      "type": "cross",
      "lineStyle": {
        "color": "#376df4",
        "width": 2,
        "opacity": 1
      }
    }
  },
  "xAxis": {
    "show": false,
    "type": "category",
    "data": [],
    "axisLine": {
      "lineStyle": {
        "color": "#8392A5"
      }
    },
    "splitLine": {
      "show": false,
      "lineStyle": {
        "width": 1,
        "color": "#8392A5"
      }
    }
  },
  "yAxis": {
    "axisLabel": {
      "textStyle": {
        "color": "#616161", // y 轴文字颜色
        "fontSize": 11, // y 轴文字大小
        fontWeight: 'bold'
      }
    },
    "scale": true,
    "offset": -20, // 向左偏移 10 像素
    "position": "right", // 将 Y 轴放置在右侧
    "axisLine": {
      "show": true, // 显示 Y 轴线条
      "lineStyle": {
        "width": 1,
        "color": "#8392A5"
      }
    },
    "axisTick": {
      "show": true // 不显示刻度线
    },
    "splitLine": {
      "show": false,
      "lineStyle": {
        "width": 1,
        "color": "#8392A5"
      }
    }
  },
  "grid": {
    top:20,
    "bottom": 20
  },
  "dataZoom": [
    {
      "type": "inside",
      "start": 90,
      "end": 100
    },
    {
      "show": false,
      "type": "slider",
      "top": "90%",
      "start": 80,
      "end": 100
    }
  ],
  "series": [
    {
      "type": "candlestick",
      "name": "",
      "data": [],
      "itemStyle": {
        "color": "#DF1525",
        "color0": "#049C6B",
        "borderColor": "#DF1525",
        "borderColor0": "#049C6B"
      }
    }
  ]
})
const kline = ref(null)
const timedata = ref(0)
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
const timeSelect = ['1m','5m','15m','30m','1H','4H','1D','1W','1M']
const kineLine = ref(null)
function timeCheck(data){
  timedata.value = data
  getKline()
}

async function getKline(){
  option.value.xAxis.data = []
  option.value.series[0].data = []
 const res = await apiGetKline({id:4, type: timedata.value})
  res.data.kline.forEach(array => {
    // 提取第一个时间元素
    option.value.xAxis.data.push(array[0]);
    // 提取剩余的数组元素
    let remainingArray = array.slice(1);
    option.value.series[0].data.push(remainingArray);
  });
  kineLine.value.setOption(option.value,true)
}


async function getDCPTGData(){
 const data = await apiGetDCPTGData()
  tableData.value = data.data.list
}


onMounted(()=>{
  kineLine.value = markRaw(echarts.init(kline.value))
  getKline()
  getDCPTGData()

  WebSocketInstance.joinGroup("market_4", (data) => {
    const modifyTimeIndex = option.value.xAxis.data.findIndex(time => time === formatDate(data.modify_time));
    if (modifyTimeIndex !== -1) {
      // 如果时间已经存在，替换数据
      option.value.series[0].data.splice(modifyTimeIndex, 1, [data.open, data.close, data.low, data.high]);
    } else {
      // 否则，添加新的时间和数据
      option.value.xAxis.data.push(formatDate(data.modify_time));
      option.value.series[0].data.push([data.open, data.close, data.low, data.high]);
    }
      kineLine.value.setOption(option.value, true);
  });
})
</script>

<template>
  <div class="kline-container">
    <ul>
      <li v-for="(data,index) in timeSelect" :key="index" :class="{enter: timedata === index}" @click="timeCheck(index)">{{data}}</li>
    </ul>
    <div class="kline" ref="kline">
      <van-loading size="50px" style="height: 100%;display: flex;align-items: center;justify-content: center;" color="#79797A"/>
    </div>
<!--    <p>-->
<!--      <span v-for="(data,index) in timeSelect" :key="index" @click="timeCheck(index)" :style="{color: timedata === index ? '#000000':''}">{{data}}</span>-->
<!--    </p>-->
  </div>
  <vtable class="table" :topList="topList" :tableData="tableData">
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
  </vtable>
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
