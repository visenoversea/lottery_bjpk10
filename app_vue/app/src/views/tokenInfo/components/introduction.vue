<script setup>
import {computed, inject, onMounted, ref} from "vue";
import {apiGetPie, apiGetQaList} from "@/utils/api";
import {useI18n} from "vue-i18n";
import useStore from '@/store/index.js'

const echarts = inject('echarts');
defineProps(['text'])
const m2R2Data= ref([]);
const qaList= ref([]);
const fullList= ref([]);
const pie = ref(null)
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("tokenInfo");
});
// pinia状态管理仓库
const store = useStore();

async function getPie(){
  const res = await apiGetPie({id:100})
  const pieData = res.data.info
  // DC项目:  获取饼图的配置的接口  https://www.dcptg.com/main/config/getInfo   POST请求  参数为: {id:100}  , 返回结果说明:
  // Shequjili为社区激励,  Chushiliudong为初始流动, Yingxiao为营销,  Tuandui为团队, Kongtou为空头,
  // Daibizongliang为代币总量(单位为亿), Faxingshijian为发行时间,Suoshugonglian为所属公链, Heyuedizhi为合约地址
  m2R2Data.value = [
    {value:parseFloat(pieData.Shequjili) / 100, legendname: i18n.value.sqjlText,name:`${i18n.value.sqjlText}：${pieData.Shequjili}`,itemStyle:{color:"#5480F1"}},
    {value:parseFloat(pieData.Chushiliudong) / 100, legendname:i18n.value.csldxText,name:`${i18n.value.csldxText}：${pieData.Chushiliudong}`,itemStyle:{color:"#01F7B8"}},
    {value:parseFloat(pieData.Yingxiao) / 100, legendname:i18n.value.yxText,name:`${i18n.value.yxText}：${pieData.Yingxiao}`,itemStyle:{color:"#FFC02F"}},
    {value:parseFloat(pieData.Tuandui) / 100, legendname:i18n.value.tdText,name:`${i18n.value.tdText}：${pieData.Tuandui}`,itemStyle:{color:"#FF8A5C"}},
    {value:parseFloat(pieData.Kongtou) / 100, legendname:i18n.value.ktText,name:`${i18n.value.ktText}：${pieData.Kongtou}`,itemStyle:{color:"#4B2CDD"}},
    {value:parseFloat(pieData.Zhilijinku) / 100, legendname:i18n.value.zljkText,name:`${i18n.value.zljkText}：${pieData.Zhilijinku}`,itemStyle:{color:"#7ee064"}},
    {value:parseFloat(pieData.Pingtaianquan) / 100, legendname:i18n.value.ptaqText,name:`${i18n.value.ptaqText}：${pieData.Pingtaianquan}`,itemStyle:{color:"#ec5858"}}
  ]
  initPie()
}

async function getQaList(){
  const res = await apiGetQaList()
  fullList.value = res.data.list
  qaList.value = fullList.value.slice(0, 6);
}

function selectIndex(index){
  const data = qaList.value[index]
  // qaList.value.forEach((row,index)=>{
  //   if (row.)
  // })
  if (Object.hasOwn(data,'select')){
     data.select = !data.select
  } else {
    data.select = true
  }
}

function goChat(){
  window.open(store.kefu.KefuUrl,"_blank")
}
function initPie(){
  const option = {
    title: [
      {
        textStyle: {
          fontSize: 16,
          color: "black"
        },
        left: "2%"
      },
      ],
    tooltip: {
      trigger: 'item',
    },
    legend: {
      type:"scroll",
      orient: 'vertical',
      left:'48%',
      align:'left',
      top:'middle',
      textStyle: {
        color:'#000000',
        fontSize: 10, // 图例字体大小
        fontWeight: 500
      },
      height:185,
      itemWidth:16,
      itemHeight: 8, // 图例项高度
      itemGap: 10 // 上下间距为 20
    },
    series: [
      {
        // name:'标题',
        type:'pie',
        center: ['25%', '50%'],
        radius: ['25%', '73%'],
        clockwise: false, //饼图的扇区是否是顺时针排布
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'outter',
            formatter:function (parms){
              return parms.data.legendname
            }
          }
        },
        labelLine: {
          normal: {
            length:5,
            length2:3,
            smooth:true,
          }
        },
        data:m2R2Data.value
      }
    ]
  };
  echarts.init(pie.value).setOption(option)
}
onMounted(()=>{
  getPie()
  getQaList()
})
</script>

<template>
  <div class="pie" ref="pie">
    <van-loading size="50px" style="height: 100%;display: flex;align-items: center;justify-content: center;" color="#79797A"/>
  </div>
  <div class="qa-container">
    <h3>{{ i18n.fqaText }}</h3>
    <p>{{i18n.tipsText}}<span @click="goChat">{{ i18n.contactText }}</span></p>
    <ul>
      <li v-for="(data,index) in qaList" :key="index">
        <div class="top">
          <span>{{data.title}}</span>
          <van-icon :name="!data.select ? 'plus':'cross'" color="#0A7CFF" size="16" @click="selectIndex(index)"/>
        </div>
        <div class="info" v-html="data.content" v-if="data.select"></div>
      </li>
    </ul>
    <div class="loadMore" v-if="qaList.length !== fullList.length">
      <p @click="qaList = fullList">
        <van-icon name="add-o" color="#0A7CFF" size="20"  />
        {{ i18n.moreText}}
      </p>
    </div>
  </div>
  <h3>{{ i18n.ddjjText }}</h3>
  <div class="details">
    <div v-html="text"></div>
  </div>
</template>

<style scoped lang="scss">
  .qa-container{
    margin: 0 20px;
    position: relative;
    color: #fff;
    background: #4c4c4d;
    padding-top: 10px;
    border-radius: 15px;
    h3{
      margin-left: 15px;
    }
    p{
      font-weight: 400;
      font-size: 14px;
      color: #fff;
      line-height: 21px;
      span{
        color: #0A7CFF;
        border-bottom: 1px solid #0A7CFF;
      }
    }
    .loadMore{
      position: absolute;
      height: 200px;
      width: 100%;
      bottom: 0;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      border-radius: 0 0 12px 12px;
      background: linear-gradient( 180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%);
      p {
        margin-bottom: 16px;
        padding: 18px 26px;
        display: flex;
        align-items: center;
        background: #FFFFFF;
        box-shadow: 0 1px 3px 0 rgba(31, 34, 41, 0.08), inset 0 0 0 1px #E1E5EB;
        border-radius: 48px 48px 48px 48px;
        font-weight: 500;
        font-size: 16px;  
        color: #fff;
        line-height: 24px;
        i {
          margin-right: 12px;
        }
      }
    }
    ul{
      margin: 16px 0 36px;
      li{
        display: flex;
        flex-direction: column;
        // background: #FFFFFF;
        border-radius: 12px;
        padding: 15px 16px;
        margin-bottom: 10px;
        //transition: all 1.5s ease-out;
        align-items: center;

        .top{
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        .info{
          padding: 10px;
        }
        span{
          font-weight: 500;
          font-size: 12px;
          color: #fff;
          line-height: 18px;
        }
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
  .pie{
    height: 185px;
  }
  h3{
    margin-left: 20px;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    line-height: 19px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-bottom: 10px;
  }
  .details{
    background: #4c4c4d;
    color: #Fff;
    overflow-y: auto;
    padding: 20px;
    margin: 0 20px;
    border-radius: 12px 12px 12px 12px;
  }
</style>
