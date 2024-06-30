<script setup>
import { use } from 'echarts/core';
// 手动引入 ECharts 各模块来减小打包体积
import {CanvasRenderer} from 'echarts/renderers'
import {CandlestickChart,LineChart,BarChart } from 'echarts/charts'
import {LegendComponent,TooltipComponent,ToolboxComponent,GridComponent,DataZoomComponent,MarkLineComponent,VisualMapComponent} from 'echarts/components';
import VChart from 'vue-echarts';
import {computed} from "vue";
use([
  CanvasRenderer,
  CandlestickChart,
  LineChart,
  BarChart,
  LegendComponent,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent,
  MarkLineComponent,
  VisualMapComponent
]);

const props = defineProps({
  kline: {
    type: Array,
    default() {
      return []
    }
  },
  precision: {
    type: Number,
    default() {
      return 4
    }
  }
})

const splitData =  (rawData) => {
  //[["2004-01-02",10452.74,10409.85,10367.41,10554.96,168890000]]
  //X时间坐标轴
  let categoryData = [];
  //K线数值 [开盘值, 收盘值, 最低值, 最高值]
  let klineData = [];
  //交易量   [索引,数值,涨跌颜色[1,-1]]
  let volumes = [];
  //折线图数据
  let lineData = [];
  //数据长度
  let len = rawData.length;
  for (let i = 0; i < len; i++) {
    if (rawData[i][0]) {
      //X时间坐标轴
      categoryData.push(rawData[i][0]);
      //K线数据
      klineData.push([rawData[i][1], rawData[i][2], rawData[i][3], rawData[i][4]]);
      //交易量
      volumes.push([i, rawData[i][5], rawData[i][1] > rawData[i][2] ? 1 : -1]);
      //折线图数据
      lineData.push(rawData[i][2]);
    } else {
      categoryData.push('');
      //K线数据
      klineData.push([]);
      //交易量
      volumes.push([i, 0, 1]);
      //折线图数据
      lineData.push('');
    }
  }
  return {
    categoryData: categoryData,
    klineData: klineData,
    volumes: volumes,
    lineData: lineData
  }
}

const calculateMA = (dayCount, kdata, fixed = 2) => {
  let result = [];
  for (let i = 0, len = kdata.length; i < len; i++) {
    if (i < dayCount || kdata[i - dayCount].length == 0) {
      result.push('');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += parseFloat(kdata[i - j][1]);
    }
    result.push((sum / dayCount).toFixed(fixed));
  }
  return result;
}

const config = {
  //刻度标签颜色
  axisLabelColor: '#74777d',
  //涨颜色
  upColor: '#00d5ae',
  upBorderColor: '#00cba4',
  //跌颜色
  downColor: '#f34767',
  downBorderColor: '#e94666',
  //Y轴线横向分割线颜色
  yAxisColor: '#c6c6c6',
  //小数位数精度
  // precision: 8,
  //最新价刻度线颜色
  //markLineColor: '#ba592e',
  //最新价背景颜色
  //markLineBgColor: '#ffe3d6',
  //最新价字体颜色
  //markLineFontColor: '#ba592e',
}

const option = computed(() => {
  let data = splitData(props.kline);
  return {
    //是否开启动画
    animation: true,
    //显示  Kline-蜡烛图 MA5|MA10|MA30|Line-折线图
    legend: {show: false, selected: {'Kline': true, 'MA5': true, 'MA10': true, 'MA30': true, 'Volume': true}},
    // tooltip:{show:false},
    //指针提示
    tooltip: {
      show: true,
      //十字指针
      trigger: 'axis',
      triggerOn: 'click',
      hideDelay: 3000,
      axisPointer: {
        type: 'line',
        lineStyle: {
          //实线
          type: 'dashed'
        }
        //snap:true
      },
      //提示背景色
      backgroundColor: 'rgba(245, 245, 245, 0.8)',
      borderWidth: 1,
      //边框颜色
      borderColor: '#ccc',
      padding: 10,
      textStyle: {
        fontSize: 10,
        color: '#000'
      },
      //提示定位
      position: function (pos, params, el, elRect, size) {
        let obj = {top: 10};
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      },
      //格式化
      formatter: (params) => {
        if (params[0].name == '') {
          return []
        }
        let param = {};
        let param2 = {};
        let param3 = {};
        let param4 = {};
        let param5 = {}
        params.forEach(function (item) {
          if (item.seriesIndex == 0) {
            param = item
          } else if (item.seriesIndex == 4) {
            param2 = item
          } else if (item.seriesIndex == 1) {
            param3 = item
          } else if (item.seriesIndex == 2) {
            param4 = item
          } else if (item.seriesIndex == 3) {
            param5 = item
          }
        })
        return [
          '日期: ' + param.name + '<hr size=1 style="margin: 3px 0">',
          '开盘价: ' + param.data[1] + '<br/>',
          '收盘价: ' + param.data[2] + '<br/>',
          '最低: ' + param.data[3] + '<br/>',
          '最高: ' + param.data[4] + '<br/>',
          '交易量: ' + param2.data[1] + '<br/>',
          'MA5：' + param3.data + '<br/>',
          'MA10：' + param4.data + '<br/>',
          'MA30：' + param5.data + '<br/>'
        ].join('');
      }
      //extraCssText: 'width: 170px'
    },
    //上下指针合并同步
    axisPointer: {
      link: {xAxisIndex: 'all'},
      label: {
        backgroundColor: '#f61212'
      }
    },
    //右上角工具栏
    toolbox: {show: false},
    //颜色映射
    visualMap: {
      show: false,
      //第几个坐标轴
      seriesIndex: 4,
      dimension: 2,
      pieces: [{value: 1, color: config.downColor}, {value: -1, color: config.upColor}]
    },
    //图位置定位
    grid: [
      {left: '0', right: '16%', top: '10%', height: '70%'},
      {left: '0', right: '16%', top: '80%', height: '30%'}
    ],
    //X轴
    xAxis: [{
      type: 'category',
      //刻度值所在位置
      // boundaryGap: false,
      boundaryGap: ['20%', '20%'],
      //坐标轴轴线相关设置
      axisLine: {show: false},
      //是否显示坐标轴刻度点
      axisTick: {show: false},
      axisLabel: {color: config.axisLabelColor},
      data: data.categoryData
    }, {
      type: 'category',
      gridIndex: 1,
      // data: [],
      // scale: true,
      // boundaryGap: false,
      //坐标轴轴线相关设置
      axisLine: {show: false, onZero: false},
      //是否显示坐标轴刻度点
      axisTick: {show: false},
      // splitLine: {show: false},
      axisLabel: {show: false},
      // splitNumber: 20,
      // min: 'dataMin',
      // max: 'dataMax'
    }],
    //Y轴
    yAxis: [
      {
        //数值轴
        type: 'value',
        //是否脱离0值比例
        scale: true,
        position: 'right',
        //偏移量
        // offset: 5,
        //两边留白策略
        boundaryGap: ['10%', '10%'],
        //是否显示坐标轴线
        axisLine: {show: false},
        axisTick: {show: false},
        axisLabel: {
          color: config.axisLabelColor,
          // 格式化Y轴数据
          // formatter: function(value) {
          //   return value.toFixed(2)
          // }
        },
        splitLine: {
          lineStyle: {
            //虚线
            type: 'dashed',
            color: config.yAxisColor
          }
        },
      },
      {
        scale: true,
        boundaryGap: ['10%', '10%'],
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: {show: false},
        axisLine: {show: false},
        axisTick: {show: false},
        splitLine: {show: false}
      }
    ],
    //取域缩放
    dataZoom: [{type: 'inside', xAxisIndex: [0, 1], start: 0, end: 100}],
    series: [{
      name: 'Kline',
      type: 'candlestick',
      data: data.klineData,
      itemStyle: {
        color: config.upColor,
        color0: config.downColor,
        borderColor: config.upBorderColor,
        borderColor0: config.downBorderColor
      },
      // markLine: {
      //   symbol: 'none',
      //   precision: precision,
      //   itemStyle: {
      //     normal: {
      //       lineStyle: {
      //         //实线
      //         type: 'dashed',
      //         color: markLineColor
      //       },
      //     }
      //   },
      //   data: [
      //     markLine,
      //   ]
      // }
    }, {
      name: 'MA5',
      type: 'line',
      data: calculateMA(5, data.klineData, props.precision),
      animation: false,//解决更新K线BUG
      smooth: true,//折线平滑
      symbol: 'none',
      itemStyle: {color: '#edc055'},
      lineStyle: {opacity: 0.8}
    }, {
      name: 'MA10',
      type: 'line',
      data: calculateMA(10, data.klineData, props.precision),
      animation: false,//解决更新K线BUG
      smooth: true,
      symbol: 'none',
      itemStyle: {color: '#297ef2',},
      lineStyle: {opacity: 0.8}
    }, {
      name: 'MA30',
      type: 'line',
      data: calculateMA(30, data.klineData, props.precision),
      animation: false,//解决更新K线BUG
      smooth: true,
      symbol: 'none',
      itemStyle: {color: '#de6812'},
      lineStyle: {opacity: 0.8}
    }, {
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data.volumes
    }]
  }
})
</script>
<template>
  <div class="c_chart">
    <v-chart :option="option" />
  </div>
</template>
<style lang="scss">
.c_chart{
  height: 400px;
}
</style>
