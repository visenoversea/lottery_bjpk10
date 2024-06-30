export const echartBgColor = '#fff' //echartk背景色

export const axisPointerColor = "#4C525E" //指示线的颜色

export const echartMarkLineColor = '#04ccac'

export const echartMarkFontColor = '#04ccac'

export const echartMarkLineBgColor = 'transparent'
export const xLineColor="#F2F2F2"
export const yLineColor="#F2F2F2"
export const xFontColor="#939EB3"
export const yFontColor="#939EB3"
// pinia要从store.js导入 不然会出现错误 和base.js共用一个pinia实例
import pinia from '@/store/store'
import useStore from '@/store/index.js'
import { reactive, ref } from 'vue'
var store = useStore(pinia)
// 上涨
const upColor = store.upColor;

// 下跌
const downColor = store.downColor; 

const MA5Color = store.MA5Color
const MA10Color = store.MA10Color
const MA20Color = store.MA20Color
const MACDColor = store.MACDColor
const DIFColor = store.DIFColor
const DEAColor = store.DEAColor


export var Options = reactive({
  backgroundColor: echartBgColor, //背景颜色
  animation: true,
  // 图例组件 每一条线的图例   也可用于特殊需求的隐藏/显示某些线 比如分时图是折线图 5分钟图是蜡烛图 使用 selected 属性可以显示隐藏
  // legend:{show:false,selected:{'Kline':false,'MA5':false,'MA10':false,'MA30':false,'Line':true}},
  legend: {
    show: false,
  },
  // 数据映射 1为涨 -1为跌
  visualMap: [{
    show: false,
    // 第5个数据 也就是柱状图
    seriesIndex: [4],
    dimension: 2,
    pieces: [
      {
        value: 1,
        color: upColor
      },
      {
        value: -1,
        color: downColor
      }
    ]
  }],
  //提示框组件。
  tooltip: {
    trigger: 'axis',
    // 交叉展示 鼠标指上去
    axisPointer: {
      type: 'cross',
    },
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "#E9E9E9",
    padding: [5, 2],
    textStyle: {
      color: "#000000",
      fontSize: 12,
    },
    position: function (pos, params, el, elRect, size) {
      var obj = {
        top: 50
      };
      obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
      return obj;
    },
    extraCssText: "width: 120px" //提示框宽度
  },

  //坐标轴指示器（axisPointer）的全局公用设置
  axisPointer: {
    link: [
      {
        xAxisIndex: 'all',
      }
    ],
    label: {
      backgroundColor: '#4C525E',
      fontSize: 11
    },

  },
  grid: [
    {
        left: "0",
        top: "2%",
        right: "16%",
        height: "70%"
    },
    {
        left: "0",
        right: "16%",
        top: "72%",
        height: "20%"
    },
    {
        left: "0",
        right: "16%",
        top: "92%",
        height: "0%"
    }
  ],
  xAxis: [
    {
      // boundaryGap: false //留白策列
      type: "category",
      data: null,
      scale: true,

      splitLine: {
        show: true, //是否显示分隔线
        lineStyle: {
          // type: 'dashed' //虚线
          color: "#F8F9FB"
        }
      },
      // splitNumber: 20,
      min: "dataMin",
      max: "dataMax",
      axisTick: {
        show: false
      }, //是否显示坐标轴刻度
      axisLabel: {
        show: false,
        color: xFontColor
      }, //x轴字体颜色
      // x轴轴指示器
      axisPointer: {
        z: 100, //值大的会在上面 把另外一条覆盖
        lineStyle: {
          //指示线的颜色
          color: axisPointerColor,
          width: 1,
          opacity: 1,
        },
        label: {
          show: false
        }
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: xLineColor
        }
      }
    },
    {
      type: "category",
      gridIndex: 1,
      data: null,
      scale: true,
      //是否展示线
      axisTick: {
        show: false
      }, //是否显示坐标轴刻度
      splitLine: {
        show: true,
        lineStyle: {
          // type: 'dashed' //虚线
          color: "#F8F9FB"
        }
      },
      axisLabel: {
        show: false,
        color: xFontColor
      },
      // 鼠标指定上去的那个线
      axisPointer: {
        z: 100, //值大的会在上面 把另外一条覆盖
        lineStyle: {
          //指示线的颜色
          color: axisPointerColor,
          width: 1,
          opacity: 1,
        },
        label: {
          show: false
        }
      },
      axisLine: {
        show: true,
        onZero: false,
        lineStyle: {
          color: xLineColor
        }
      }
    },
    { //macd
      type: 'category',
      gridIndex: 2,
      scale: true,
      splitLine: {
        show: true, //是否显示分隔线
        lineStyle: {
          // type: 'dashed' //虚线
          color: "#F8F9FB"
        }
      },
      min: "dataMin",
      max: "dataMax",
      axisTick: {
        show: false
      }, //是否显示坐标轴刻度
      axisLabel: {
        show: true,
        color: xFontColor
      }, //x轴字体颜色
      // x轴轴指示器
      axisPointer: {
        z: 100, //值大的会在上面 把另外一条覆盖
        lineStyle: {
          //指示线的颜色
          color: axisPointerColor,
          width: 1,
          opacity: 1,
        },
        label: {
          show: true
        }
      },
      axisLine: {
        show: true,
        onZero: false,
        lineStyle: {
          color: xLineColor
        }
      }
    }
  ],
  yAxis: [
    {
      boundaryGap: ['20%', '30%'], //留白策列 [最小值，最大值]
      axisLine: {  //是否显示坐标轴轴线
        show: true
      },
      axisTick: {
        show: true
      },
      position: 'right', 
  
      scale: true, //是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度
      splitArea: {
        show: false //是否显示分隔区域
      },
      //y轴字体颜色
      axisLabel: {
        show: true,
        color: yFontColor,
        margin: 5
      }, 
      // 网格线
      splitLine: {
        show: true,
        lineStyle: {
          // type: 'dashed' //虚线
          color: "#F8F9FB"
        }
      },
      // // y轴坐标指示器
      axisPointer: {
        show: true, //横着的axisPointer虚线展示与否
        z: 100, //值大的会在上面 把另外一条覆盖
        lineStyle: {
          //指示线的类型
          type: 'dashed',
          color: axisPointerColor,
          width: 1,
          opacity: 1,
        },
        // 精度小数点位数
        label: {
          show: true,
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: yLineColor,
        }
      }
    },
    {
      min: 0,
      boundaryGap: ['3%', '1%'],
      position: 'right',
      gridIndex: 1,
      splitNumber: 3,
      type: "value",
      axisTick: {
        show: true
      },
      splitArea: {
        show: false //是否显示分隔区域
      },
      // 网格线
      splitLine: {
        show: true,
        lineStyle: {
          // type: 'dashed' //虚线
          color: "#F8F9FB"
        }
      },
      // // y轴坐标指示器
      axisPointer: {
        show: true, //横着的axisPointer虚线展示与否
        z: 100, //值大的会在上面 把另外一条覆盖
        lineStyle: {
          //指示线的类型
          type: 'dashed',
          color: axisPointerColor,
          width: 1,
          opacity: 1,
        },
      },
      // y轴刻度标签
      axisLabel: {
        show: true,
        color: yFontColor,
        margin: 5,
        showMaxLabel: false,
        showMinLabel: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: yLineColor,
        }
      }
    },

    { //macd图
      gridIndex: 2,
      boundaryGap: ['20%', '30%'], //留白策列 [最小值，最大值]
      axisTick: {
        show: true
      },
      position: 'right', 
      splitNumber: 1,
      scale: true, //是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度
      splitArea: {
        show: false //是否显示分隔区域
      },
      //y轴字体颜色
      axisLabel: {
        show: false,
        color: yFontColor,
        margin: 5
      }, 
      // 网格线
      splitLine: {
        show: true,
        lineStyle: {
          // type: 'dashed' //虚线
          color: "#F8F9FB"
        }
      },
      // // y轴坐标指示器
      axisPointer: {
        show: true, //横着的axisPointer虚线展示与否
        z: 100, //值大的会在上面 把另外一条覆盖
        lineStyle: {
          //指示线的类型
          type: 'dashed',
          color: axisPointerColor,
          width: 1,
          opacity: 1,
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: yLineColor,
        }
      }
    }
  ],

  //滑块
  dataZoom: [{
      type: "inside",
      xAxisIndex: [0, 1, 2],
      start: 70,
      end: 100,
    },
  ],
  //线 柱状图 图表类型
  series: [
    {
      name: "candlestick",
      type: "candlestick",
      data: null,
      showSymbol: false, //气泡
      itemStyle: {
        color: upColor,
        color0: downColor,
        borderColor: upColor,
        borderColor0: downColor
      },
      // 画线
      markLine: {
        symbol: 'none',
        // 精度问题用这个解决 precision 有问题 precision会导致小数最后一位为0消失
        label: {
          // formatter: (value) => {
          //   // 确保你的Number.toFixed(2)是满足要求的
          //  return Number(value.value).toFixed(2);
          // }
        },
        data: [
          {
            name: '尾线',
            type: 'max',
            yAxis: '', //标记线的值
            label: { show: true, position: 'end', distance: 1, type: 'solid',  backgroundColor: upColor, padding: [3, 15, 3, 1], color: '#fff' },
            lineStyle: {
              opacity: 1,
              type: 'dashed', //标记线类型
              color: 'transparent' //标记线的颜色
            }
          }
        ]              
      }
    },
    {
      name: "MA5",
      type: "line",
      data: null,
      smooth: false,
      symbol: 'none', // 指示器指上去和折线图会出现气泡
      showSymbol: false, //气泡
      lineStyle: {
        width: 1,
        opacity: 1
      },
      itemStyle: {
        color: MA5Color,
        borderColor: MA5Color,
      },
      // 让鼠标指上去时不会高亮变粗
      emphasis: { 
        lineStyle: {
          width: 1,
        },
      }
    },
    {
      name: "MA10",
      type: "line",
      data: null,
      smooth: true,
      symbol: 'none',
      showSymbol: false, //气泡
      lineStyle: {
        width: 1
      },
      itemStyle: {
        color: MA10Color,
        borderColor: MA10Color,
      },
      // 让鼠标指上去时不会高亮变粗
      emphasis: { 
        lineStyle: {
          width: 1,
        },
      }
    },
    {
      name: "MA20",
      type: "line",
      data: null,
      smooth: true,
      symbol: 'none',
      showSymbol: false, //气泡
      lineStyle: {
        width: 1
      },
      itemStyle: {
        color: MA20Color,
        borderColor: MA20Color,
      },
      // 让鼠标指上去时不会高亮变粗
      emphasis: { 
        lineStyle: {
          width: 1,
        },
      }
    },
    {
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      showSymbol: false, //气泡
      yAxisIndex: 1,
      data: null,
      // 关闭柱状图的高亮显示
      emphasis: {
        disabled: true,
        focus: 'none' //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。不淡出其它图形，默认使用该配置。
      },
    },
    {
      name: "VolumeMA5",
      type: "line",
      data: null,
      smooth: true,
      symbol: 'none',
      xAxisIndex: 1,
      yAxisIndex: 1,
      showSymbol: false, //气泡
      lineStyle: {
        opacity: 1,
        width: 1
      },
      itemStyle: {
        color: MA5Color,
        borderColor: MA5Color,
      },
      // 让鼠标指上去时不会高亮变粗
      emphasis: { 
        lineStyle: {
          width: 1,
        },
      }
    },
    {
      name: "VolumeMA10",
      type: "line",
      data: null,
      smooth: true,
      symbol: 'none',
      xAxisIndex: 1,
      yAxisIndex: 1,
      showSymbol: false, //气泡
      lineStyle: {
        opacity: 1,
        width: 1
      },
      itemStyle: {
        color: MA10Color,
        borderColor: MA10Color,
      },
      // 让鼠标指上去时不会高亮变粗
      emphasis: { 
        lineStyle: {
          width: 1,
        },
      }
    },
    {
      name: "VolumeMA20",
      type: "line",
      data: null,
      smooth: true,
      symbol: 'none',
      xAxisIndex: 1,
      yAxisIndex: 1,
      showSymbol: false, //气泡
      lineStyle: {
        opacity: 1,
        width: 1
      },
      itemStyle: {
        color: MA20Color,
        borderColor: MA20Color,
      },
      // 让鼠标指上去时不会高亮变粗
      emphasis: { 
        lineStyle: {
          width: 1,
        },
      }
    },

    // 分时折线
    {
      name: 'minLine',
      data: null,
      type: 'line',
      // smooth: false,
      symbol: 'none', // 指示器指上去和折线图会出现气泡
      showSymbol: false, //气泡
      lineStyle: {
        opacity: 1,
        width: 1,
      },
      itemStyle: {
        color: '#0A64AA',
        borderColor: '#0A64AA',
      },
       // 让鼠标指上去时不会高亮变粗
       emphasis: { 
        lineStyle: {
          width: 1,
        }
      },
      
      // 渐变
      areaStyle: {
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'rgba(0, 148, 255,0.05)'
            }, {
                offset: 0.5, color: 'rgba(0, 148, 255,0.09)'
            }, {
                offset: 1, color: 'rgba(0, 148, 255,0.15)'
            }]
        }
      },
      
      markLine: {
          symbol: 'none',
          // 精度问题用这个解决 precision 有问题 precision会导致小数最后一位为0消失
          label: {
            // formatter: (value) => {
            //   // 确保你的Number.toFixed(2)是满足要求的
            //  return Number(value.value).toFixed(2);
            // }
          },
          itemStyle: {
              lineStyle: {
                  type: 'dashed',
                  color:'#74b4fa'
              },
          },
          data: []
      },
    },



    {
      name: 'MACD',
      type: 'bar',
      xAxisIndex: 2,
      yAxisIndex: 2,
      data: null,
      barWidth: '40%',
      itemStyle: {
        color: function(params) {
          var colorList;
          if (Number(params.data) >= 0) {
            colorList = upColor;
          } else {
            colorList = downColor;
          }
          return colorList;
        },
      },
      // 关闭柱状图的高亮显示
      emphasis: {
        disabled: true,
        focus: 'none' //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。不淡出其它图形，默认使用该配置。
      },
    }, {
      name: 'DIF',
      type: 'line',
      symbol: "none",
      xAxisIndex: 2,
      yAxisIndex: 2,
      data: null,
      itemStyle: {
        color: DIFColor,
        borderColor: DIFColor,
      },
      lineStyle: {
        opacity: 1,
        width: 1
      },
      // 让鼠标指上去时不会高亮变粗
      emphasis: { 
        lineStyle: {
          width: 1,
        },
      }
    }, {
      name: 'DEA',
      type: 'line',
      symbol: "none",
      xAxisIndex: 2,
      yAxisIndex: 2,
      data: null,
      itemStyle: {
        color: DEAColor,
        borderColor: DEAColor,
      },
      lineStyle: {
        opacity: 1,
        width: 1
      },
      // 让鼠标指上去时不会高亮变粗
      emphasis: { 
        lineStyle: {
          width: 1,
        },
      }
    }
  ]
})