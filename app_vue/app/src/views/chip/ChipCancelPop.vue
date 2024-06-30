<template>
  <div class="s_chip_cancel_pop">
    <van-popup safe-area-inset-bottom class="c-pop" v-model:show="show" position="center">
      <div class="c-pop-container g-flex-column g-flex-align-center">
        <div class="c-pop-title">
          <div class="c-pop-title-text">
            <span>{{ i18n.cedanTitleText }}</span>
          </div>
        </div>
        <div class="c-pop-content">
          <NoList v-show="!orderList.list.length"/>  
          <div v-show="orderList.list.length" class="c-pop-order-list">
            <div @click="itemClick(item)" :class="selectObj.obj.id == item.id ? 'active': ''" class="c-pop-order-item g-flex-justify-between g-flex-align-center" v-for="(item, index) in orderList.list" :key="index">
              <div class="c-pop-order-item-xiazhu">
                {{ item.bet_no }}
              </div>
              <div class="c-pop-order-item-money">
                {{ item.bet_amount }}
              </div>
              <div class="c-pop-order-item-select g-flex-align-center g-flex-justify-center">
                <i v-show="selectObj.obj.id == item.id" class="iconfont icon-xuanzhong"></i>
              </div>
            </div>
          </div>
        </div>
        <div v-show="orderList.list.length" class="c-pop-btn-list g-flex-align-center">
          <div @click="onClose" class="c-pop-btn-item c-pop-btn-item-cancel g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.cancelText }}</span>
          </div>
          <div @click="apiCancelOrderHandel" class="c-pop-btn-item c-pop-btn-item-sure g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.querenText }}</span>
          </div>
        </div>
        <div class="c-pop-close" @click="onClose">
          <i class="iconfont icon-guanbi"></i>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { apiAlreadyChipOrderList, apiCancelOrder } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue'
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { Toast } from 'vant';
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('chip')
})
let show = ref(false)

let objInfo = reactive({
  obj: {}
})

let orderList = reactive({
  list: []
})

// let selectList = reactive({
//   list: []
// })

// function itemClick(item) {
//   let targetIndex = selectList.list.findIndex(item2 => {
//     return item2 == item.id
//   })
//   if(targetIndex == -1) {
//     selectList.list.push(item.id)
//   }else {
//     selectList.list.splice(targetIndex, 1)
//   }
//   console.log('selectList.list', selectList.list)
// }

let selectObj = reactive({
  obj: {}
})


function itemClick(item) {
  if(selectObj.obj.id == item.id) {
    selectObj.obj = {}
  }else {
    selectObj.obj = item
  }
}
const emits = defineEmits(['emitCancelSuccess'])

// 撤销订单
async function apiCancelOrderHandel() {
  store.loadingShow = true
  const { success, data } = await apiCancelOrder({ id: selectObj.obj.id })
  if(!success) return
  emits('emitCancelSuccess')
  resetData()
  Toast.success(data.msg)
  apiAlreadyChipOrderListHandel()
}

function onShow(obj) {
  objInfo.obj = obj
  resetData()
  apiAlreadyChipOrderListHandel()
}

function resetData() {
  selectObj.obj = {}
  orderList.list = []
}

async function apiAlreadyChipOrderListHandel() {
  store.loadingShow = true
  const { success, data } = await apiAlreadyChipOrderList({ lotteryRoomId: objInfo.obj.id, lotteryId: objInfo.obj.lottery_id, status: 2 })
  if(!success) return
  if(data.list.length) {
    data.list.forEach(item => {
      orderList.list = orderList.list.concat(item.userBetItemList)
    });
  }
  show.value = true
}

function onClose() {
  show.value = false
}

function onSure() {

}

defineExpose({
  onShow
})
</script>

<style lang='scss'>
.s_chip_cancel_pop {
  .c-pop {
    border-radius: 10px;
    overflow-y: visible;
    .c-pop-container {
      height: 360px;
      width: 300px;
      position: relative;
      padding-bottom: 10px;
      .c-pop-close {
        position: absolute;
        z-index: 99999;
        top: 0px;
        right: 0px;
        padding: 5px;
        .iconfont {
          font-size: 22px;
          color: var(--g-black)
        }
      }
      .c-pop-title {
        padding: 10px 0;
        font-weight: 700;
      }
      .c-pop-content {
        width: 100%;
        flex: 1;
        overflow: auto;
        position: relative;
        .c-pop-order-list {
          padding: 0px 0 10px 0;
          .c-pop-order-item {
            padding: 10px;
            border-bottom: 1px solid #e6e6e6;
            &.active {
              .c-pop-order-item-xiazhu {
                color: var(--g-main_color);
              }
              .c-pop-order-item-money {
                color: var(--g-main_color);
              }
              .c-pop-order-item-select {
                .iconfont {
                  color: var(--g-main_color);
                }
              }
            }
            .c-pop-order-item-xiazhu {
              flex: 1;
              font-size: 14px;
              padding-right: 5px;
              color: var(--g-black);
            }
            .c-pop-order-item-money {
              flex: 1;
              font-size: 14px;
              padding-right: 5px;
              color: #656565;
            }
            .c-pop-order-item-select {
              width: 30px;
              height: 30px;
              .iconfont {
                padding: 5px;
                font-size: 20px;
                color: #939393;
              }
            }
          }
        }
      }
      .c-pop-btn-list {
        gap: 10px;
        width: 100%;
        padding: 10px;
        .c-pop-btn-item {
          flex: 1;
          text-align: center;
          height: 30px;
          color: var(--g-white);
          border-radius: 20px;
          font-size: 14px;
          line-height: 30px;
          &.c-pop-btn-item-cancel {
            background: #939393;
          }
          &.c-pop-btn-item-sure {
            background: var(--g-main_color);
          }
        }
      }
    }
    
  }
}
</style>