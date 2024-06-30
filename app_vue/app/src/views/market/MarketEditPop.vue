<template>
  <div class="s_market_edit_pop">
    <van-popup :overlay="false" :close-on-click-overlay="false" position="right"
      :style="{ width: '100%', height: '100%' }" v-model:show="show" class="s-pop g-flex-column">
      <div class="s-pop-head g-flex-align-center">
        <div @click="onClose" class="s-pop-head-back">
          <img src="/img/icon/user_top_return.png" alt="" />
        </div>
        <div class="s-pop-head-title g-flex-justify-center g-flex-align-center">
          <span>{{ i18n.titleText }}</span>
        </div>
        <div @click="apiBatchCollectProductHandel" class="s-pop-head-right">
          <span>{{ i18n.finishText }}</span>
        </div>
      </div>

      <div class="s-pop-conatiner">
        <div class="s-pop-top g-flex-align-center">
          <div class="s-pop-top-left">
            {{ i18n.productText }}
          </div>
        </div>
        <div class="s-pop-bottom">
          <div @click="itemClick(item)" v-for="(item, index) in procudtList.list" :key="index"
            class="s-pop-bottom-item g-flex-align-center">
            <div class="s-pop-bottom-item-left g-flex-align-center">
              <div class="s-pop-bottom-item-select g-flex-align-center">
                <img v-show="!collectedList.list.includes(item.id)" src="/img/icon/price_icon_choice1.png" alt="" />
                <img v-show="collectedList.list.includes(item.id)" src="/img/icon/price_icon_choice2.png" alt="" />
              </div>
              <div class="s-pop-bottom-item-name g-flex-align-center">
                <p>{{ item.quoteCurrency }}</p>
                <span v-show="item.baseCurrency">/{{ item.baseCurrency }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { apiGetProductList, apiBatchCollectProduct } from '@/utils/api.js'
import { Toast } from 'vant';
import { useI18n } from "vue-i18n";
// pinia状态管理仓库
const store = useStore()
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('marketEditPop')
})
const props = defineProps({
  typeVal: {
    type: String,
    default() {
      return '0'
    }
  }
})

const emits = defineEmits('emitBatchSuccess')

let collectedList = reactive({ list: [] })

let show = ref(false)

function onClose() {
  show.value = false
}

function onShow() {
  collectedList.list = []
  apiGetProductListHandel()
  show.value = true
}

let procudtList = reactive({ list: [] })

// 获取币种列表
async function apiGetProductListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetProductList({ type: props.typeVal })
  if (!success) return
  collectedList.list = data.list.filter(item => item.isCollected == 1).map(item => item.id)
  procudtList.list = data.list
}

function itemClick(item) {
  let targetIndex = collectedList.list.findIndex(id => {
    return id == item.id
  })
  if (targetIndex != -1) {
    collectedList.list.splice(targetIndex, 1)
  } else {
    collectedList.list.push(item.id)
  }
  console.log('collectedList.list', collectedList.list)
}

// 批量添加
async function apiBatchCollectProductHandel() {
  store.loadingShow = true
  const { success, data } = await apiBatchCollectProduct({ ids: collectedList.list, type: props.typeVal })
  if (!success) return
  Toast(data.msg)
  emits('emitBatchSuccess')
  onClose()
  console.log(data)
}


// 暴露组件的方法或者属性
defineExpose({
  onShow
})
</script>

<style lang='scss'>
.s_market_edit_pop {
  .van-overlay {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .s-pop {
    position: absolute;
    height: 100%;
    overflow: auto;

    .s-pop-head {
      position: relative;
      height: 50px;

      .s-pop-head-back {
        position: absolute;
        left: 0;
        padding: 15px;

        img {
          width: 22px;
          height: 22px;
          object-fit: contain;
        }
      }

      .s-pop-head-title {
        flex: 1;
        text-align: center;
        font-size: 16px;
        color: #333;
        font-weight: 600;
        height: 100%;
      }

      .s-pop-head-right {
        position: absolute;
        right: 0;
        padding: 15px;
        font-size: 14px;
        color: var(--g-main_color);
      }
    }

    .s-pop-conatiner {
      flex: 1;
      overflow: auto;
      .s-pop-top {
        padding: 10px 15px;
        border-bottom: 1px solid #e2e2e2;

        .s-pop-top-left {
          font-size: 13px;
          color: #939fae;
        }
      }

      .s-pop-bottom {
        padding: 15px;

        .s-pop-bottom-item {
          padding: 6px 0;
          margin-top: 10px;

          &:nth-of-type(1) {
            margin-top: 0;
          }

          .s-pop-bottom-item-left {
            .s-pop-bottom-item-select {
              img {
                width: 18px;
                height: 18px;
                border-radius: 50%;
              }
            }

            .s-pop-bottom-item-name {
              padding-left: 6px;
              font-size: 18px;
              color: #111;

              span {
                font-size: 14px;
                color: #939fae;
              }
            }
          }
        }
      }
    }
  }
}
</style>