<template>
  <div class="v_chou_jiang g-flex-column n-bg">
    <div class="v-head">
      <div @click="$router.go(-1)" class="v-chou-jiang-back">
        <img src="/img/icon/dial_top_back.png" alt="">
      </div>
      <div @click="$router.push({ name: 'choujianghistory' })" class="v-chou-jiang-head-right">
        <span>{{ i18n.jiluText }}</span>
      </div>
    </div>

    <div class="v-chou-jiang-container">
      <div class="v-chou-jiang-top g-flex-column g-flex-align-center">
        <div class="v-chou-jiang-title">
          {{ i18n.titleText }}
        </div>
        <div class="v-chou-jiang-shengyu g-flex-justify-center g-flex-align-center">
          <div class="v-chou-jiang-shengyu-title">
            {{ i18n.kechoucishuText }}:
          </div>
          <div class="v-chou-jiang-shengyu-val">
            {{ $t('choujiang.ciText', { val1: lotteryNums }) }}
          </div>
        </div>
      </div>

      <div class="v-chou-jiang-zhuanpan g-flex-align-center g-flex-justify-center">
        <LuckyWheel ref="refMyLucky" width="320px" height="320px" :prizes="prizes.list" :defaultConfig="defaultConfig"
          :blocks="blocks" :buttons="buttons.list" @start="startCallback" @end="endCallback" />
      </div>
    </div>

    <ChouJiangReSultPop ref="refChouJiangReSultPop" />
  </div>
</template>
  
<script setup>
import { apiChouJiangList, apiChouJiang } from '@/utils/api.js'
import ChouJiangReSultPop from '@/components/ChouJiangReSultPop.vue'
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n()

const i18n = computed(() => {
  return i18nObj.tm('choujiang')
})

// 背景
let blocks = ref([{
  padding: '35px', background: 'transparent',
  imgs: [
    {
      src: '/img/icon/dial_turntable.png',
      width: 330,
      height: 330,
      top: -5,
      rotate: true
    }
  ]
}])

// 奖品
let prizes = reactive({
  list: []
})
let lotteryNums = ref(0)
apiChouJiangListHandel()

async function apiChouJiangListHandel() {
  store.loadingShow = true
  const { success, data } = await apiChouJiangList()
  if (!success) return
  console.log(data)
  prizes.list = data.list
  lotteryNums.value = data.lotteryNums
  if (data.list.length) {
    defaultConfig.offsetDegree = (360 / data.list.length) / 2
  }
}

// 抽奖按钮
let buttons = reactive({
  list: [
    {
      radius: '35%',
      background: 'transparent',
      pointer: true,
      fonts: [{ text: 'GO', top: '-10px', fontColor: '#FFF' }],
      imgs: [
        {
          src: '/img/icon/dial_tead_round.png',
          top: -50,
          width: 70,
        }
      ]
    }
  ]
})

let defaultConfig = reactive({
  gutter: 0, //缝隙
  stopRange: 0, //指针在扇形区域的停止范围
  offsetDegree: 0, //转盘的偏移角度
  speed: 10, //旋转速度峰值
  accelerationTime: 2000, //开始旋转时间
  decelerationTime: 3000 //缓慢停止时间
})
let refMyLucky = ref(null)

// 点击抽奖按钮会触发star回调
function startCallback() {
  // 调用抽奖组件的play方法开始游戏
  apiChouJiangHandel()
}

let refChouJiangReSultPop = ref(null)

// 中奖结果
let userLottery = reactive({
  obj: {}
})
// 开始抽奖
async function apiChouJiangHandel() {
  store.loadingShow = true
  const { success, data } = await apiChouJiang()
  if (!success) return
  refMyLucky.value.play()
  userLottery.obj = data.userLottery
  // 模拟调用接口异步抽奖
  setTimeout(() => {
    // 假设后端返回的中奖索引是0
    const index = prizes.list.findIndex(item => {
      return item.id == userLottery.obj.lottery_id
    })
    if (index != -1) {
      // 调用stop停止旋转并传递中奖索引
      refMyLucky.value.stop(index)
    }
  }, 3000)
  console.log(data)
}

// 抽奖结束会触发end回调
function endCallback(prize) {
  refChouJiangReSultPop.value.onShow(userLottery.obj)
  apiChouJiangListHandel()
  console.log(prize)
}

</script>
  
<style lang='scss'>
.v_chou_jiang {
  height: 100%;
  overflow: auto;
  background-image: url('/img/icon/dial_bg.jpg');
  background-position: fixed;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .v-head {
    width: 100%;
    position: fixed;
    height: 70px;

    .v-chou-jiang-back {
      position: absolute;
      padding: 15px;
      left: 0;
      top: 0;

      img {
        width: 30px;
      }
    }

    .v-chou-jiang-head-right {
      position: absolute;
      background-image: url('/img/icon/dial_gradation_rectabgle.png');
      background: #fff;
      background-repeat: repeat;
      background-size: cover;
      background-position: 50% 100px;
      min-width: 100px;
      right: 0px;
      top: 20px;
      border-radius: 15px 0 0 15px;
      color: var(--g-black);
      font-weight: 700;
      text-align: center;
      font-size: 14px;
      padding: 5px 0;
    }
  }

  .v-chou-jiang-container {
    flex: 1;
    padding-top: 80px;

    .v-chou-jiang-top {
      .v-chou-jiang-title {
        text-align: center;
        color: var(--g-black);
        font-size: 30px;
      }

      .v-chou-jiang-shengyu {
        margin-top: 15px;
        background-image: url(/img/icon/dial_gradation_rectabgle.png);
        min-width: 250px;
        max-width: 90%;
        background-size: cover;
        background-position: 100%;
        color: var(--g-black);
        font-size: 15px;

        .v-chou-jiang-shengyu-title {
          line-height: 22px;
        }

        .v-chou-jiang-shengyu-val {
          line-height: 22px;
          padding-left: 5px;
        }
      }
    }

    .v-chou-jiang-zhuanpan {
      padding-top: 30px;
    }
  }
}</style>