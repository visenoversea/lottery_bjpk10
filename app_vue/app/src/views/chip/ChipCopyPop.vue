<template>
  <div class="s_chip_pop">
    <van-popup safe-area-inset-bottom class="s-pop" v-model:show="show" position="bottom">
      <div class="s-pop-container g-flex-column">
        <div class="s-pop-nav-list g-flex-align-center">
          <div @click="navItemClick(item)" :class="selectItemObj.navId == item.id ? 'active' : ''"
            class="s-pop-nav-item g-flex-align-center g-flex-justify-center" v-for="(item, index) in chipList.list"
            :key="index">
            <span class="s-pop-nav-item-title">
              {{ item.name }}
            </span>
          </div>
        </div>
        <div class="s-pop-bottom-list-container">
          <div class="s-pop-bottom-list g-flex-align-center g-flex-wrap">
            <div class="s-pop-bottom-item-box" v-for="(item, index) in chipList.list[targetIndex].lotteryPlayedList">
              <div @click="itemClick(item)" :class="formateClass(item)" class="s-pop-bottom-item g-flex-align-center g-flex-justify-between">
                <div class="s-pop-bottom-item-left">
                  <span>{{ item.name }}</span>
                </div>
                <div class="s-pop-bottom-item-middle">
                  <span>{{ item.amount }}</span>
                </div>
                <div class="s-pop-bottom-item-right">
                  <span>{{ item.odds }}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="s-pop-btn-list-box">
          <div class="s-pop-btn-list g-flex-align-center g-flex-justify-between">
            <div @click="resetData" class="s-pop-btn-item v-chip-btn-item-grey g-flex-align-center g-flex-justify-center">
              <span>{{ i18n.resetBusText }}</span>
            </div>
            <div @click="apiChipDownOrderHandel" class="s-pop-btn-item v-chip-btn-item-yellow g-flex-align-center g-flex-justify-center">
              <span>{{ i18n.querenBusText }}</span>
            </div>
          </div>
         </div>
      </div>
    </van-popup>

    <ChipAmountPop @emitSureClick="emitSureClick" ref="refChipAmountPop"/>
  </div>
</template>

<script setup>
import { apiGetRoomInfo, apiChipDownOrder } from '@/utils/api.js'
import { copyClick } from '@/utils/index'
import ChipAmountPop from './ChipAmountPop.vue'
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

// 当前选择的哪个
let selectItemObj = reactive({
  navId: '',
  playId: ''
})


// 获取房间信息
async function apiGetRoomInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetRoomInfo({ id: form.id })
  if (!success) return
  roomObj.obj = data.info
  chipList.list = data.info.lotteryGroupList.map(item => {
    item.lotteryPlayedList.forEach(item2 => {
      item2.amount = ''
    });
    return item
  })
  selectItemObj.navId = chipList.list[0].id
}

apiGetRoomInfoHandel()


const targetIndex = computed(() => {
  let findIndex = chipList.list.findIndex(item => {
    return item.id == selectItemObj.navId
  })
  if (findIndex == -1) return 0
  return findIndex
});

function navItemClick(item) {
  selectItemObj.navId = item.id
}

let refChipAmountPop = ref(null)
function itemClick(item) {
  refChipAmountPop.value.onShow(selectItemObj.navId, item.id)
}

function formateClass(item) {
  if (item.amount && (item.id == selectItemObj.playId)) return 'selecting'
  if (item.amount) return 'selected'
  return ''
}

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

// 金额触发
function emitSureClick(objInfo, amountVal) {
  // 玩法
  let findNavIndexVal = chipList.list.findIndex(item => {
    return item.id == objInfo.navId
  })
  if(findNavIndexVal != -1) {
    // 号码
    let findPlayIndexVal = chipList.list[findNavIndexVal].lotteryPlayedList.findIndex(item => {
      return item.id == objInfo.playId
    })
    if(findPlayIndexVal != -1) {
      chipList.list[findNavIndexVal].lotteryPlayedList[findPlayIndexVal].amount = amountVal
      selectItemObj.playId = objInfo.playId
    }
  }
}

// 用户的下单列表
const betObjData = computed(() => {
  if(!chipList.list.length) return { betList: [] }
  else {
    let resultArr = []
    chipList.list.forEach(item => {
      resultArr = resultArr.concat(item.lotteryPlayedList.filter(item2 => {
        return Number(item2.amount) > 0
      }))
    })
    return { betList: resultArr }
  }
});

// 下单请求
async function apiChipDownOrderHandel() {
  console.log('betObjData', betObjData.value)
  form.openExpect = props.openExpectVal
  const { success, data } = await apiChipDownOrder(Object.assign({}, form, betObjData.value))
  if(!success) return
  Toast.success(data.msg)
  resetData()
  emits('emitDownOrderSuccess')
  onClose()
}

function resetData() {
  chipList.list.forEach(item => {
    item.lotteryPlayedList.forEach(item => {
      item.amount = ''
    })
  })
  selectItemObj.navId = chipList.list[0].id
  selectItemObj.playId = ''
}
</script>

<style lang='scss'>
.s_chip_pop {
  .van-overlay {
    background: rgba(0, 0, 0, .4);
  }

  .s-pop {
    height: 544px;
    overflow: auto;
    background: #f1f1f1;

    .s-pop-container {
      height: 100%;
      overflow: auto;

      .s-pop-nav-list {
        height: 50px;
        padding-top: 5px;

        .s-pop-nav-item {
          cursor: pointer;
          width: calc(100% / 3);
          padding: 5px 0;
          position: relative;

          &.active {
            &::after {
              position: absolute;
              content: "";
              width: 100%;
              height: 4px;
              border-radius: 2px;
              background-color: #333;
              bottom: 5px;
            }

          }

          .s-pop-nav-item-title {
            padding: 0 4px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            @include textEllipsis();
          }
        }
      }

      .s-pop-bottom-list-container {
        flex: 1;
        overflow: auto;

        .s-pop-bottom-list {
          padding-top: 15px;
          padding-left: 5px;
          padding-right: 5px;

          .s-pop-bottom-item-box {
            flex-basis: 50%;
            padding: 0 5px;

            .s-pop-bottom-item {
              height: 38px;
              padding: 0 11px;
              margin-bottom: 11px;
              border: 1px solid #d3d3d3;
              background-color: #f4f4f6;
              border-radius: 5px;
              font-size: 13px;

              &.selected {
                background-color: rgba(0, 0, 0, 0.5);

                .s-pop-bottom-item-middle {
                  font-weight: 700;
                  color: #fff;
                }
              }

              &.selecting {
                border: 1px solid #f50c8a;
                background-color: rgba(0, 0, 0, 0.85);

                .s-pop-bottom-item-middle {
                  font-weight: 700;
                  color: #fff;
                }
              }
            }

          }
        }
      }

      .s-pop-btn-list-box {
        padding: 10px 15px;
        background-color: #fafafa;
        .s-pop-btn-list {
          gap: 10px;
          .s-pop-btn-item {
            flex: 1;
            height: 44px;
            border-radius: 20px;
            color: #fff;
            font-size: 17px;
            &.v-chip-btn-item-grey {
              background: linear-gradient(90deg, rgb(53, 53, 53), rgb(200, 199, 204));
            }
            &.v-chip-btn-item-yellow {
              background: linear-gradient(90deg, #D4B38F 0%, #B88964 100%);
            }
          }
        }
      }

    }
  }
}
</style>