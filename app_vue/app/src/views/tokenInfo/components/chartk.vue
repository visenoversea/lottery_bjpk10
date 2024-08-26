<script setup>
import * as Echarts from 'echarts';
import { Options } from '@/utils/echartsKOption.js';

import {computed, onMounted, reactive, shallowRef} from 'vue'
import {useI18n} from "vue-i18n";
const i18nObj = useI18n();
const props = defineProps({
  kLineList: {
    type: Array,
    default: () => []
  }
});

const echartObj = shallowRef(null)
const chartData = reactive({
  headInfo: {
    time: '-',
    open: '-',
    close: '-',
    lowest: '-',
    highest: '-',
    zhangfu: '-'
  },
  headIndex: 1,

  fillLength: 100,
  kLinedata: [],
  volumesData: [],
  lineLength: 0,
  maFixed: 4,
  axisPointerShow: true,
  MaList: [
    { title: 'MA5', value: 0 },
    { title: 'MA10', value: 0 },
    { title: 'MA20', value: 0 }
  ],
  formatterTipMaShow: [true, true, true],
})

const i18n = computed(() => {
  return i18nObj.tm("chart");
});

const echartsOptions = computed(() => {
  //时间 开 关 低 高 成交量
  let dates = chartData.kLinedata.map(item => { return item[0] })
  // k线数据
  let data = chartData.kLinedata.map(item => { return [+item[1], +item[2], +item[3], +item[4]] });
  Options.animation = false
  //提示框组件。
  Options.tooltip.trigger = chartData.axisPointerShow ? "axis" : "none"
  Options.tooltip.axisPointer.type = chartData.axisPointerShow ? "cross" : "none"

  // // 格式化提示框
  Options.tooltip.formatter = (params) => { return formatterTip(params) }

  Options.xAxis[0].data = dates

  Options.xAxis[1].data = dates

  // 坐标指示器精度
  // Options.yAxis[0].axisPointer.label.precision = data.maFixed

  // Options.yAxis[1].axisPointer.label.precision = data.maFixed

  // y轴数值的小数点精度
  Options.yAxis[0].axisLabel.formatter = (value) => { return value.toFixed(chartData.maFixed) }

  Options.yAxis[1].axisLabel.formatter = (value) => { return value.toFixed(chartData.maFixed) }

  Options.series[0].data = data

  // 画线 K线图
  Options.series[0].markLine.data[0].yAxis = data[data.length - 1][1]
  console.log('Options.series[0].markLine.data[0].yAxis', Options.series[0].markLine.data[0].yAxis)

  // 尾线的精度
  Options.series[0].markLine.label.formatter = (value) => {
    // 确保你的Number.toFixed(4)是满足要求的
    return Number(value.value).toFixed(chartData.maFixed)
  }
  Options.series[0].markLine.precision = chartData.maFixed

  Options.series[1].data = calculateMA(5, data)

  Options.series[2].data = calculateMA(10, data)

  Options.series[3].data = calculateMA(20, data)

  // 柱状图
  Options.series[4].data = chartData.volumesData

  Options.series[5].data = calculateVolumesMA(5, chartData.volumesData)

  Options.series[6].data = calculateVolumesMA(10, chartData.volumesData)

  return Options
})

const maShowList = computed(() => {
  if (chartData.lineLength < 5) return [false, false, false]
  if (chartData.lineLength >= 5 && chartData.lineLength < 10) return [true, false, false]
  if (chartData.lineLength >= 10 && chartData.lineLength < 20) return [true, true, false]
  if (chartData.lineLength >= 20) return [true, true, true]
  return [true, true, true]
})

onMounted(() => {
  initEchart()
})

defineExpose({ showKline,receiveData });

function firstShowMa() {
  let arr = []
  // 处理是否展示顶上面那三条MA的数据
  if (chartData.lineLength < 5) return
  if (chartData.lineLength >= 5 && chartData.lineLength < 10) arr = [5]
  if (chartData.lineLength >= 10 && chartData.lineLength < 20) arr = [5, 10]
  if (chartData.lineLength >= 20) arr = [5, 10, 20]

  let data = chartData.kLinedata.map(item => {
    return [+item[1], +item[2], +item[3], +item[4]]
  })
  arr.forEach((item, index) => {
    let resltArr = calculateMA(item, data)
    chartData.MaList[index].value = Number(resltArr[resltArr.length - 1]).toFixed(chartData.maFixed)
  })
}
function receiveData(val) {
  // 1 开 2 关 3 低 4 高 5成交量
  if (!chartData.kLinedata.length) return
  // 最后一条k线数据
  let lastKData = chartData.kLinedata[chartData.kLinedata.length - 1]
  lastKData[2] = Number(val.close)
  lastKData[3] = Number(val.close) < lastKData[3] ? Number(val.close) : lastKData[3]
  lastKData[4] = Number(val.close) > lastKData[4] ? Number(val.close) : lastKData[4]
  // 最后一条柱状图数据
  let lastVolumesData = chartData.volumesData[chartData.volumesData.length - 1]
  lastVolumesData[1] = lastVolumesData[1] + val.volume
  lastVolumesData[2] = (Number(val.close) - Number(lastKData[1])) >= 0 ? 1 : -1

  // 变了需要改ma值
  firstShowMa()

  // 设置最后一条k线图数据
  setLastestData()

  let data = chartData.kLinedata.map(item => {
    return [+item[1], +item[2], +item[3], +item[4]]
  });


  Options.series[0].data = data

  Options.series[0].markLine.data[0].yAxis = data[data.length - 1][1]

  Options.series[1].data = calculateMA(5, data)

  Options.series[2].data = calculateMA(10, data)

  Options.series[3].data = calculateMA(20, data)

  Options.series[4].data = chartData.volumesData

  // 设置尾线颜色
  Options.series[0].markLine.data[0].label.backgroundColor = chartData.headInfo.zhangfu >= 0 ? '#049C6B' : '#DF1525'

  Options.series[5].data = calculateVolumesMA(5, chartData.volumesData)

  Options.series[6].data = calculateVolumesMA(10, chartData.volumesData)

  echartObj.value.setOption({
    animation: true,
    series: [
      Options.series[0],
      Options.series[1],
      Options.series[2],
      Options.series[3],
      Options.series[4],
      Options.series[5],
      Options.series[6],
    ]
  })
}


async function showKline(list, fixed) {
  chartData.maFixed = fixed
  chartData.lineLength = list.length //长度 是否进行计算MA
  if (list.length < chartData.fillLength) {
    for (let i = list.length; i < chartData.fillLength; i++) {
      list.unshift(['-'])
    }
  }
  chartData.kLinedata = list

  // 柱状图数据
  chartData.volumesData = chartData.kLinedata.map(item => {
    if (Number(item[1]) - Number(item[2]) < 0) {
      return [item[0], item[5], 1]
    } else {
      return [item[0], item[5], -1]
    }
  })
  setLastestData()
  firstShowMa()
  await echartObj.value.setOption(echartsOptions.value);
}

function setLastestData() {
  let length = chartData.kLinedata.length - 1
  // 设置最后一个蜡烛图的数据
  chartData.headInfo.time = chartData.kLinedata[length][0]
  chartData.headInfo.open = Number(chartData.kLinedata[length][1]).toFixed(chartData.maFixed)
  chartData.headInfo.close = Number(chartData.kLinedata[length][2]).toFixed(chartData.maFixed)
  chartData.headInfo.lowest = Number(chartData.kLinedata[length][3]).toFixed(chartData.maFixed)
  chartData.headInfo.highest = Number(chartData.kLinedata[length][4]).toFixed(chartData.maFixed)
  chartData.headInfo.zhangfu = Number(((chartData.kLinedata[length][2] - chartData.kLinedata[length][1]) / chartData.kLinedata[length][1] * 100)).toFixed(4)
}

function initEchart() {
  echartObj.value = Echarts.init(document.getElementById("echarts"))
}

function headItemClick(item, index) {
  chartData.headIndex = index
}

function formatterTip(params) {
  if (params[0].axisIndex == 0 && !params[0].data[1]) return ``
  if (params[0].axisIndex == 1 && !params[0].data) return ``

  if (params[0].axisIndex == 1) {
    chartData.headInfo.time = params[3].axisValueLabel
    chartData.headInfo.open = Number(params[3].data[1]).toFixed(chartData.maFixed)
    chartData.headInfo.close = Number(params[3].data[2]).toFixed(chartData.maFixed)
    chartData.headInfo.lowest = Number(params[3].data[3]).toFixed(chartData.maFixed)
    chartData.headInfo.highest = Number(params[3].data[4]).toFixed(chartData.maFixed)
    chartData.headInfo.zhangfu = Number(((params[3].data[2] - params[3].data[1]) / params[3].data[1] * 100)).toFixed(4)
    return ''
  }

  // ((关-开)/开* 100).fixed(2)
  setMAData(params[1], params[2], params[3])
  chartData.headInfo.time = params[0].axisValueLabel
  chartData.headInfo.open = Number(params[0].data[1]).toFixed(chartData.maFixed)
  chartData.headInfo.close = Number(params[0].data[2]).toFixed(chartData.maFixed)
  chartData.headInfo.lowest = Number(params[0].data[3]).toFixed(chartData.maFixed)
  chartData.headInfo.highest = Number(params[0].data[4]).toFixed(chartData.maFixed)
  chartData.headInfo.zhangfu = Number(((params[0].data[2] - params[0].data[1]) / params[0].data[1] * 100)).toFixed(4)
  // return ''
  return `
        <span>${i18n.value.timeText}: ${params[0].axisValueLabel}</span><br/>
        ${i18n.value.openText}: ${Number(params[0].data[1]).toFixed(chartData.maFixed)}<br/>
        ${i18n.value.closeText}: ${Number(params[0].data[2]).toFixed(chartData.maFixed)}<br/>
        ${i18n.value.lowText}: ${Number(params[0].data[3]).toFixed(chartData.maFixed)}<br/>
        ${i18n.value.highText}: ${Number(params[0].data[4]).toFixed(chartData.maFixed)}<br/>
        ${i18n.value.zhangfuText}: ${Number(((params[0].data[2] - params[0].data[1]) / params[0].data[1] * 100)).toFixed(4)} %
        `
}

function setMAData(MA5, MA10, MA20) {
  // 这里也是为了处理上面的MA 三条数据是否展示
  if (MA5.value == '-') chartData.formatterTipMaShow = [false, false, false]
  if (MA5.value != '-' && MA10.value == '-') chartData.formatterTipMaShow = [true, false, false]
  if (MA5.value != '-' && MA10.value != '-' && MA20.value == '-') chartData.formatterTipMaShow = [true, true, false]
  if (MA5.value != '-' && MA10.value && MA10.value != '-' && MA20.value && MA20.value != '-') chartData.formatterTipMaShow = [true, true, true]
  let arr = []
  arr.push(MA5, MA10, MA20)
  arr.forEach((item, index) => {
    chartData.MaList[index].value = Number(item.value).toFixed(chartData.maFixed)
  })
  // console.log(data.MaList)
}

function calculateMA(dayCount, data) {
  let result = [];
  for (let i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += data[i - j][1];
    }
    result.push(sum / dayCount);
  }
  return result;
}

function calculateVolumesMA(dayCount, data) {
  let result = [];
  for (let i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += data[i - j][1];
    }
    result.push(sum / dayCount);
  }
  return result;
}
</script>
<template>
  <div class="s_chart_k">
    <ul class="s-chart-k-ma-info-list g-flex-align-center">
      <li class="s-chart-k-ma-info-item g-flex-align-center">{{ chartData.headInfo.time }}</li>
      <li class="s-chart-k-ma-info-item g-flex-align-center">
        <p>{{ i18n.openHeadText }}:</p>
        <span>{{  chartData.headInfo.open }}</span>
      </li>
      <li class="s-chart-k-ma-info-item g-flex-align-center">
        <p>{{ i18n.highHeadText }}:</p>
        <span>{{  chartData.headInfo.highest }}</span>
      </li>
      <li class="s-chart-k-ma-info-item g-flex-align-center">
        <p>{{ i18n.lowHeadText }}:</p>
        <span>{{  chartData.headInfo.lowest }}</span>
      </li>
      <li class="s-chart-k-ma-info-item g-flex-align-center">
        <p>{{ i18n.closeHeadText }}:</p>
        <span>{{  chartData.headInfo.close }}</span>
      </li>
      <!-- <li class="s-chart-k-ma-info-item g-flex-align-center">
       <p>涨幅:</p>
       <span>{{ headInfo.zhangfu }} %</span>
     </li> -->
    </ul>
    <ul class="s-chart-k-ma-list g-flex-align-center">
      <li class="s-chart-k-ma-item g-flex-align-center" v-show="maShowList[index] && chartData.formatterTipMaShow[index]"
          v-for="(item, index) in chartData.MaList" :key="index">
        <span class="s-chart-k-ma-item-title">{{ item.title }}:</span>
        <span class="s-chart-k-ma-item-value">{{ item.value }}</span>
      </li>
    </ul>
    <div id="echarts"></div>
  </div>
</template>



<style scoped lang='scss'>
.s_chart_k {
  height: 100%;
  position: relative;

  #echarts {
    width: 100%;
    padding-top: 20px;
    height: 100%;
  }

  .s-trade-right-head {
    font-size: 14px;
    font-weight: 600;
    padding: 0px 16px;
    height: 44px;
    line-height: 44px;
    color: #dce0e8;
    border-bottom: 1px solid #222938;
  }

  .s-trade-right-list {
    font-size: 12px;
    border: 1px solid #222938;
    padding-left: 8px;

    .s-trade-right-list-item {
      padding: 0 4px;
      height: 36px;
      line-height: 36px;
      color: #727b8f;
      cursor: pointer;

      &.active {
        color: #dde1eb;
      }
    }
  }

  .s-chart-k-ma-list {
    margin-top: 20px;
    position: absolute;
    padding-left: 10px;
    padding-top: 5px;
    font-size: 12px;

    .s-chart-k-ma-item {
      margin-right: 14px;

      &:nth-of-type(1) {
        .s-chart-k-ma-item-value {
          //color: $ma5_font_color;
        }
      }

      &:nth-of-type(2) {
        .s-chart-k-ma-item-value {
          //color: $ma10_font_color;
        }
      }

      &:nth-of-type(3) {
        .s-chart-k-ma-item-value {
          //color: $ma30_font_color;
        }
      }

      .s-chart-k-ma-item-title {
        color: #727b8f;
      }

      .s-chart-k-ma-item-value {
        padding-left: 2px;
      }
    }
  }

  .s-chart-k-ma-info-list {
    position: absolute;
    font-size: 12px;
    height: 20px;
    padding-left: 10px;
    padding-top: 5px;
    color: #838ca3;

    .s-chart-k-ma-info-item {
      margin-right: 4px;

      p {
        color: #8e95a5;
      }

      span {
        color: #838ca3;
        padding-left: 2px;
      }
    }
  }
}
</style>
