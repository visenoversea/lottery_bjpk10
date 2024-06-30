<template>
  <div class="s_chip_pop">
    <van-popup safe-area-inset-bottom class="s-pop" v-model:show="show" position="bottom">
      <div class="s-pop-container g-flex-column">
        <div class="s-pop-list g-flex-align-center g-flex-wrap">
          <div :class="isActice(item) ? 'active': ''" class="s-pop-item-box" v-for="(item, index) in chipList.list">
            <div @click="itemClick(item)" class="s-pop-item g-flex-column g-flex-align-center g-flex-justify-center">
              <div class="s-pop-item-name">{{ item.name }}</div>
              <div class="s-pop-item-peilv">{{ item.odds }}</div>
            </div>
          </div>
        </div>
        <div class="s-pop-quick-list g-flex-align-center">
          <div @click="quickItemClick(item)" class="s-pop-quick-item g-flex-align-center g-flex-justify-center" v-for="(item, index) in roomObj.obj.quickList" :key="index">
            <span>{{ item }}</span>
          </div>
        </div>
        <div class="s-pop-down-amount g-flex-align-center">
          <div class="s-pop-down-amount-input">
            <input v-model="form.amount" :placeholder="i18n.inputAmountText" type="text">
          </div>
          <div @click="apiChipDownOrderHandel" class="s-pop-down-amount-btn g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.goumaiText }}</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { apiGetRoomInfo, apiChipDownOrder } from '@/utils/api.js'
import { copyClick } from '@/utils/index'
import {
  reactive,
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";
import { useI18n } from "vue-i18n";
import useStore from "@/store/index.js";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("chip");
});

const emits = defineEmits(['emitDownOrderSuccess'])

const props = defineProps({
  // 下注期号
  openExpectVal: {
    type: [String, Number],
    default() {
      return ''
    }
  }
})

let form = reactive({
  amount: '',
  id: route.query.id, //房间id
  openExpect: '', //期号
})

// 房间对象
let roomObj = reactive({
  obj: {}
})

// 下注的分类
let chipList = reactive({
  list: []
})

// 获取房间信息
async function apiGetRoomInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetRoomInfo({ id: form.id })
  if (!success) return
  roomObj.obj = data.info
  let oneArrrayList = []
  roomObj.obj.lotteryGroupList.forEach(item => {
    item.lotteryPlayedList = item.lotteryPlayedList.map(item2 => {
      item2.amount = ''
      return item2
    })
    oneArrrayList = oneArrrayList.concat(item.lotteryPlayedList)
  });
  chipList.list = oneArrrayList
}

apiGetRoomInfoHandel()

let show = ref(false)
function onShow() {
  show.value = true
}

function onClose() {
  show.value = false
}

defineExpose({
  onShow,
  resetData
})

// 快捷下注
function quickItemClick(item) {
  form.amount = item
}

// 下注号码
let betObjData = reactive({
  betList: []
})

// 是否active
function isActice(item) {
  let findIndex = betObjData.betList.findIndex(item2 => {
    return item.id == item2.id
  })
  if(findIndex == -1) {
    return false
  }else {
    return true
  }
}

// 多选点击
function itemClick(item) {
  let findIndex = betObjData.betList.findIndex(item2 => {
    return item.id == item2.id
  })
  if(findIndex == -1) {
    betObjData.betList.push(item)
  }else {
    betObjData.betList.splice(findIndex, 1)
  }
  console.log(betObjData.betList)
}


// 下单请求
async function apiChipDownOrderHandel() {
  form.openExpect = props.openExpectVal
  if(betObjData.betList.length) {
    betObjData.betList.forEach(item => {
      item.amount = form.amount
    })
  }
  store.loadingShow = true
  const { success, data } = await apiChipDownOrder(Object.assign({}, form, betObjData))
  if(!success) return
  Toast.success(data.msg)
  resetData()
  emits('emitDownOrderSuccess')
  onClose()
}

function resetData() {
  betObjData.betList = []
  form.amount = ''
}
</script>

<style lang='scss'>
.s_chip_pop {
  .van-overlay {
    background: rgba(0, 0, 0, .4);
  }

  .s-pop {
    height: 390px;
    overflow: auto;
    background: #f1f1f1;

    .s-pop-container {
      height: 100%;
      overflow: auto;
      background: var(--g-white);
      .s-pop-list {
        flex: 1;
        overflow: auto;
        padding: 5px 2px;
        .s-pop-item-box {
          flex-basis: 25%;
          padding: 5px;
          &.active {
            .s-pop-item {
              background-color: #007aff;
              color: var(--g-white);
            }
          }
          .s-pop-item {
            border: 1px solid #007aff;
            color: #007aff;
            height: 65px;
            border-radius: 4px;
            .s-pop-item-name {
              padding: 5px;
              font-size: 17px;
              line-height: 18px;
            }
            .s-pop-item-peilv {
              padding: 5px;
              font-size: 14px;
              line-height: 18px;
            }
          }
        }
      }
      .s-pop-quick-list {
        gap: 10px;
        height: 50px;
        padding-top: 10px;
        padding-bottom: 5px;
        padding-left: 8px;
        padding-right: 8px;
        background: #f8f8f8;
        .s-pop-quick-item {
          flex: 1;
          height: 100%;
          border-radius: 5px;
          font-size: 16px;
          border: 1px solid #007aff;
          color: #007aff;
        }
      }
      .s-pop-down-amount {
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 8px;
        padding-right: 8px;
        background: #f8f8f8;
        .s-pop-down-amount-input {
          flex: 1;
          margin-right: 5px;
          input {
            width: 100%;
            font-size: 16px;
            outline: none;
            border: solid 1px #7a7e83;
            padding: 4px;
            background-color: #fff;
            border-radius: 5px;
            height: 32px;
            line-height: 32px;
          }
        }
        .s-pop-down-amount-btn {
          background-color: #e64340;
          color: var(--g-white);
          padding: 0 17px;
          width: 100px;
          height: 32px;
          font-size: 14px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>