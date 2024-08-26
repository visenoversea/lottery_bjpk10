<script setup>
import {ref, provide, computed} from "vue";
  import * as echarts from 'echarts';
  import introduction from "@/views/tokenInfo/components/introduction.vue";
  import price from "@/views/tokenInfo/components/price.vue";
  import wallet from "@/views/tokenInfo/components/wallet.vue";
  import {apiGetInfo, apiGetPie} from "@/utils/api";
  import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {copyClick} from "@/utils";
import {Toast} from "vant";
import useClipboard from "vue-clipboard3";

  provide('echarts', echarts);
const { toClipboard } = useClipboard()
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("tokenInfo");
});

  const router = useRouter()
  const info = ref({})
  const infList = ref({
    Daibizongliang:{
      title: i18n.value.dbzlText,
      data: ''
    },
    Faxingshijian:{
      title: i18n.value.fxsjText,
      data: ''
    },
    Suoshugonglian:{
      title:  i18n.value.ssglText,
      data: ''
    },
    Heyuedizhi:{
      title:  i18n.value.znhydzText,
      data: ''
    },
  })
  const active = ref(0)

  const components = ref([introduction,price,wallet])

  function changeTab(index){
    active.value = index
  }

  async function getDetails(){
    const res = await apiGetPie({id:100})
    const details = res.data.info
    Object.keys(infList.value).forEach(key=>{
      if (Object.prototype.hasOwnProperty.call(details, key)){
        // if (key === 'Daibizongliang'){
        //   infList.value[key].data = details[key] + i18n.value.wyText
        //   return
        // }
        infList.value[key].data = details[key]
      }
    })
    // DC项目:  获取饼图的配置的接口  https://www.dcptg.com/main/config/getInfo   POST请求  参数为: {id:100}  , 返回结果说明:
    // Shequjili为社区激励,  Chushiliudong为初始流动, Yingxiao为营销,  Tuandui为团队, Kongtou为空头,
    // Daibizongliang为代币总量(单位为亿), Faxingshijian为发行时间,Suoshugonglian为所属公链, Heyuedizhi为合约地址
  }

function copy(data,index) {
    if (index === 3){
      copyClick(data)
    }
}
async function getInfo(){
  const res = await apiGetInfo({id: 1037})
  info.value = res.data.info
}
  getInfo()
  getDetails()
</script>

<template>

<div class="n-bg">
    <!-- <van-nav-bar
      :title="info.title"
      left-arrow
      @click-left="router.go(-1)"
  >
    <template #left>
      <i style="font-size: 6.93vw; font-weight: 700;color: var(--g-black);" class="iconfont icon-zuo"></i>
    </template>
  </van-nav-bar> -->

  <div class="new-head">
    <div @click="$router.go(-1)" class="new-head-back">
      <img src="/images/back-icon.png" alt="" />
    </div>
  </div>
    <div class="new-head_title_text">{{ info.title }}</div>

  <section>
    <h3>{{ i18n.jbxxText }}</h3>
    <div class="info-container">
        <ul>
          <li v-for="(data,key,index) in infList" :key="index">
            <span>{{data.title}}</span>
            <span @click="copy(data.data,index)">{{data.data}}</span>
          </li>
        </ul>
    </div>
    <van-tabs v-model="active" animated @click="changeTab">
      <van-tab v-for="(data,index) in [i18n.jjText,i18n.hqText,i18n.qbText]" :title="data">
        <component :text="info.content" v-if="index === active" :is="components[active]"/>
      </van-tab>
    </van-tabs>
  </section>
</div>

</template>

<style scoped lang="scss">
:deep(.van-nav-bar){
  --van-nav-bar-height: 42px;
}
:deep(.van-tabs__wrap){
  --van-tabs-line-height: 40px;
  // border-bottom: 1px solid #E1E3E5;
  height: 40px;
  margin: 0 20px;
  --van-tabs-bottom-bar-color: #3F77E3;
  --van-tabs-bottom-bar-width: 84px;
  .van-tab{
    font-size: 16px;
    line-height: 24px;
    text-align: center;
  }
  .van-tab--active {
    --van-tab-active-text-color: #3F77E3;
    --van-font-weight-bold: bold;
  }
}
:deep(.van-tabs__nav){
  --van-tabs-nav-background-color: none;
}
:deep(.van-nav-bar__title){
  font-weight: bold;
  font-size: 18px;
  color: #000000;
  line-height: 22px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
section{
  min-height: calc(100% - 42px);
  //  height: 100%;
  // background: #F6F4F5;
  padding: 20px 0;
  h3{
    font-weight: 600;
    font-size: 16px;
    color: #000000;
    padding: 0 20px;
    line-height: 19px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-bottom: 10px;
    color: #fff;
    text-align: center;
  }
  .info-container{
    margin: 0 20px;
    // background: #4073E6;
    background: linear-gradient(to right bottom, #3287fe, #756dff);  
    box-shadow: 0 4px 53px 0 rgba(4,6,15,0.05);
    border-radius: 8px 8px 8px 8px;
    padding: 30px 20px;
    margin-bottom: 10px;
    ul{
      li{
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        span{
          font-weight: 500;
          font-size: 14px;
          color: #F5F5F5;
          line-height: 20px;
          white-space: nowrap;
          width: 40%;
          overflow: hidden;
          text-overflow: ellipsis;
          &:last-child{
            width: 40%;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        &:last-child{
          margin-bottom: 0;
          span{
            &:last-child{
              border-bottom: 1px solid #F5F5F5;
            }
          }
        }
      }
    }
  }
}
</style>
