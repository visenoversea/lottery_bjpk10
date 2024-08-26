<script setup>

import Vtable from "@/views/tokenInfo/components/vtable.vue";
import {computed, ref} from "vue";
import cpu from '@/assets/img/cpu.png'
import smartphone from '@/assets/img/smartphone.png'
import {apiGetWallet} from "@/utils/api";
import {useI18n} from "vue-i18n";
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("tokenInfo");
});
const topList = [
  {
    title: '#',
    type: 'index',
    width:'12.82vw'
  },
  {
    title: i18n.value.mcText,
    key:'title',
    width:'40.26vw'
  },
  {
    title: i18n.value.aqxText,
    key:'',
    order: true
  },
  {
    title: i18n.value.xjText,
    key:'safety',
    align: 'center',
    width:'24.79vw',
    order: true
  }
]
const tableData = ref([])

const wStatus = ref([
  {
    title: i18n.value.jyText,
    color:'#FAD33A'
  },
  {
    title: i18n.value.zcText,
    color:'#00B670'
  },
])
async function getWallet(){
  const res = await apiGetWallet()
  tableData.value = res.data.list
}
getWallet()
</script>

<template>
  <vtable class="table" :topList="topList" :tableData="tableData">
    <template #title="{row}">
      <div class="pairs">
        <img class="left" :src="row.icon" alt="">
        <div class="right">
          <span>{{row.title}}</span>
          <p>
            <img v-if="row.device == 1" :src="smartphone" alt="">
            <img v-else :src="cpu" alt="">
          </p>
        </div>
      </div>
    </template>
    <template #safety="{row}">
      <div class="rate-right">
        <van-rate
            v-model="row.safety"
            :size="13"
            readonly
            color="#00B670"
            void-icon="star"
            void-color="#D9D9D9"
        />
        <p>
          <span>{{i18n.aqxText}}：</span>
          <span :style="{color: wStatus[row.status].color}">{{wStatus[row.status].title}}</span>
        </p>
      </div>
    </template>
  </vtable>
</template>

<style scoped lang="scss">
.table{
  padding: 0 20px;
  .pairs{
    display: flex;
    align-items: center;
    .left{
      width: 40px;
      height: 40px;
    }
    .right{
      margin-left: 15px;
      width: calc(100% - 60px);
      span{
        display: inline-block;
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 400;
        font-size: 14px;
        color: #000000;
        line-height: 21px;
      }
      img{
          width: 20px;
          height: 20px;
      }
    }
  }
  .rate-right{
    p{
      text-align: right;
      margin: 3px 3px 0 0;
      font-weight: 400;
      font-size: 12px;
      color: rgba(0,0,0,0.6);
      line-height: 16px;
    }
  }
}
</style>
