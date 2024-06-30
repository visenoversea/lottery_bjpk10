<template>
  <div class="v_market g-flex-column">
    <!-- <div class="v-market-head g-flex-justify-between g-flex-align-center">
    <div class="v-market-head-left g-flex-align-center">
      <div @click="editClick" class="v-market-head-left-item">
        <img src="/img/icon/price_icon_edit.png" alt=""/>
      </div>
      <div class="v-market-head-left-item">
        <img src="/img/icon/homepage_top_search.png" alt=""/>
      </div>
    </div>
    <div class="v-market-head-right">
      <div class="v-market-head-right-item">
        <img src="/img/icon/price_icon_record.png" alt=""/>
      </div>
    </div>
  </div> -->
    <div class="v-market-head g-flex-align-center g-flex-justify-between">
      <div v-if="store.system.ProductType.length" class="v-market-sort-list g-flex-align-end">
        <div v-for="(item, index) in store.system.ProductType" :key="index" @click="typeItemClick(item)"
          :class="form.type == item.id ? 'active' : ''" class="v-market-sort-item g-flex-align-center">
          <span>{{ item.title }}</span>
        </div>
      </div>
      <div class="v-market-head-left g-flex-align-center">
        <div @click="editClick" class="v-market-head-left-item">
          <img src="/img/icon/price_icon_edit.png" alt="" />
        </div>
        <div @click="searchClick" class="v-market-head-left-item">
          <img src="/img/icon/homepage_top_search.png" alt="" />
        </div>
      </div>
    </div>

    <div class="v-market-nav-list g-flex-align-center">
      <div v-for="(item, index) in partList.list" :key="index" @click="partItemClick(item)"
        :class="form.productTypeId == item.id ? 'active' : ''"
        class="v-market-nav-item g-flex-justify-center g-flex-align-center">
        <span class="v-market-nav-item-title">{{ item.title }}</span>
      </div>
    </div>
    <div class="v-market-container">
      <div v-show="procudtList.list.length" class="v-market-list-head g-flex-align-center">
        <div @click="sortItemClick('name')" class="v-market-list-head-item v-market-list-head-item-one g-flex-align-center">
          <span class="v-market-list-head-item-title">{{ i18n.nameText }}</span>
          <div class="v-market-list-head-paixu">
            <div :class="(sortName == 'name') && (sort == -1) ? 'active': ''" class="v-market-up g-flex-align-center">
              <i class="iconfont icon-shishangjiantou-"></i>
            </div>
            <div :class="(sortName == 'name') && (sort == 1) ? 'active': ''" class="v-market-up v-market-down g-flex-align-center">
              <i class="iconfont icon-shixiangxiajiantou-"></i>
            </div>
          </div>
        </div>
        <div @click="sortItemClick('price')" class="v-market-list-head-item v-market-list-head-item-two g-flex-align-center g-flex-justify-center">
          <span class="v-market-list-head-item-title">{{ i18n.zuixingPriceText }}</span>
          <div class="v-market-list-head-paixu">
            <div :class="(sortName == 'price') && (sort == -1) ? 'active': ''" class="v-market-up g-flex-align-center">
              <i class="iconfont icon-shishangjiantou-"></i>
            </div>
            <div :class="(sortName == 'price') && (sort == 1) ? 'active': ''" class="v-market-up v-market-down g-flex-align-center">
              <i class="iconfont icon-shixiangxiajiantou-"></i>
            </div>
          </div>
        </div>
        <div @click="sortItemClick('zhangfu')" class="v-market-list-head-item v-market-list-head-item-three g-flex-align-center g-flex-justify-end ">
          <span class="v-market-list-head-item-title">{{ i18n.zhangdiefuText }}</span>
          <div class="v-market-list-head-paixu">
            <div :class="(sortName == 'zhangfu') && (sort == -1) ? 'active': ''" class="v-market-up g-flex-align-center">
              <i class="iconfont icon-shishangjiantou-"></i>
            </div>
            <div :class="(sortName == 'zhangfu') && (sort == 1) ? 'active': ''" class="v-market-up v-market-down g-flex-align-center">
              <i class="iconfont icon-shixiangxiajiantou-"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-show="procudtList.list.length" class="v-market-list-box">
        <div class="v-market-list">
          <div @click="productItemClick(item)" v-for="(item, index) in procudtList.list" :key="index"
            class="v-market-list-item g-flex-align-center">
            <div class="v-market-list-item-one g-flex-align-center">
              <!-- item.icon -->
              <img :src="item.icon" alt="" />
              <p class="v-market-list-item-one-name">{{ item.quoteCurrency }}</p>
              <span class="v-market-list-item-one-currency" v-show="item.baseCurrency">/{{ item.baseCurrency }}</span>
            </div>
            <div class="v-market-list-item-two g-flex-align-center g-flex-justify-center">
              <!-- :class="upDownClass(item.kline.zhangfu)" -->
              <span class="v-market-list-item-two-price" >
                {{ item.kline.close }}
              </span>
            </div>
            <div class="v-market-list-item-three g-flex-align-center g-flex-justify-end">
              <div :class="upDownBgClass(item.kline.zhangfu)"
                class="v-market-list-item-three-zhangdie g-flex-justify-center g-flex-align-center">
                {{ filtersZhangfu(item.kline.zhangfu, 2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NoList v-show="!procudtList.list.length" />

      <!-- <div v-show="!procudtList.list.length" class="v-market-no-list g-flex-column g-flex-align-center">
      <div class="v-market-no-list-img g-flex-align-center">
        <img src="/img/icon/deficiency_file.png" alt=""/>
      </div>
      <div @click="editClick" class="v-market-no-list-btn g-flex-align-center">
        <img src="/img/icon/price_icon_add.png" alt=""/>
        <span>{{ i18n.addZiXuanText }}</span>
      </div>
    </div> -->
    </div>

    <MarketEditPop @emitBatchSuccess="apiGetProductListHandel" ref="refMarketEditPop" :typeVal="form.type" />
  </div>
</template>

<script setup>
import { apiGetPartList, apiGetProductList } from '@/utils/api.js'
import { filtersZhangfu, upDownBgClass, upDownClass } from '@/utils/index'
import { reactive, ref, computed, onUnmounted } from 'vue';
import MarketEditPop from './MarketEditPop.vue'
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from 'vue-router'
import ws from "@/utils/ws.js"
import web3Obj from '@/utils/web3.js'

// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('market')
})

const route = useRoute()
const router = useRouter()

let navIndex = ref(0)

console.log('web3Obj.provider', web3Obj.provider)
let form = reactive({
  type: route.query.type ? route.query.type : store.system.ProductType[0].id,
  productTypeId: ''
})

let partList = reactive({
  list: []
})

let procudtList = reactive({ list: [] })

// 点击分类
async function typeItemClick(item) {
  if (form.type == item.id) return
  sort.value = 0
  sortName.value = ''
  form.type = item.id
  store.loadingShow = true
  apiGetPartListHandel()
}

apiGetPartListHandel()

// 获取板块
async function apiGetPartListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetPartList({ type: form.type })
  if (!success) return
  partList.list = data.list
  form.productTypeId = data.list[0].id
  apiGetProductListHandel()
}

// 点击板块
function partItemClick(item) {
  form.productTypeId = item.id
  sort.value = 0
  sortName.value = ''
  apiGetProductListHandel()
}

// 获取币种列表
async function apiGetProductListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetProductList(form)
  if (!success) return
  procudtList.list = data.list.map(item => {
    item.kaitou = item.quoteCurrency.substring(0,1).toLowerCase()
    item.kline.open = Number(item.kline.open).toFixed(item.fixed)
    item.kline.close = Number(item.kline.close).toFixed(item.fixed)
    item.kline.low = Number(item.kline.low).toFixed(item.fixed)
    item.kline.high = Number(item.kline.high).toFixed(item.fixed)
    // item.currency = (Number(item.close) * Number(this.$global.currency.rate)).toFixed(this.$global.currency.fixed)
    item.kline.zhangfu = (Math.formatFloat(Number(item.kline.close) - Number(item.kline.open), item.fixed)) / Number(item.kline.open)
    return item
  })
  
  procudtList.list.forEach(item => {
    ws.joinGroup('market_' + item.id, (data) => {
      item.kline.open = Number(data.open).toFixed(item.fixed)
      item.kline.close = Number(data.close).toFixed(item.fixed)
      item.kline.low = Number(data.low).toFixed(item.fixed)
      item.kline.high = Number(data.high).toFixed(item.fixed)
      // item.currency = (Number(data.close) * Number(this.$global.currency.rate)).toFixed(this.$global.currency.fixed)
      item.kline.zhangfu = (Math.formatFloat(Number(data.close) - Number(data.open), item.fixed)) / Number(data.open)
      item.kline.vol = data.vol
    })
  })


  console.log(data)
}


const refMarketEditPop = ref(null)
function editClick() {
  console.log('refMarketEditPop.value', refMarketEditPop.value.onShow)
  refMarketEditPop.value.onShow()
}

// 离开订阅
function leaveGrupHandle() {
  procudtList.list.forEach(item => {
    ws.leaveGroup('market_' + item.id)
  })
}

// 排序 1降序 0无排序 -1升序
let sort = ref(0)
let sortName = ref('')

function sortItemClick(name) {
  if(sortName.value != name) {
    sort.value = -1
  }else {
    if(sort.value == 0) {
      sort.value = -1
    }else if(sort.value == -1) {
      sort.value = 1
    }else if(sort.value == 1) {
      sort.value = 0
    }
  }
  sortName.value = name
  if(sortName.value == 'price') {
    sortProductPrice(sort.value)
  }else if(sortName.value == 'zhangfu') {
    sortProductZhangfu(sort.value)
  }else {
    sortProductName(sort.value)
  }
}

// 价格排序
function sortProductPrice(sort) {
  if(sort == 1) {
    procudtList.list = procudtList.list.sort((a, b) => {
      return b.kline.close - a.kline.close
    })
  }else if(sort == -1) {
    procudtList.list = procudtList.list.sort((a, b) => {
      return a.kline.close - b.kline.close 
    })
  }else {
    apiGetProductListHandel()
  }
}

// 涨幅排序
function sortProductZhangfu(sort) {
  if(sort == 1) {
    procudtList.list = procudtList.list.sort((a, b) => {
      return b.kline.zhangfu - a.kline.zhangfu
    })
  }else if(sort == -1) {
    procudtList.list = procudtList.list.sort((a, b) => {
      return a.kline.zhangfu - b.kline.zhangfu 
    })
  }else {
    apiGetProductListHandel()
  }
}

// 名称排序
function sortProductName(sort) {
  // 降序
  if(sort == 1) {
    procudtList.list = procudtList.list.sort((a, b) => {
      if (a.kaitou < b.kaitou) return 1;
      if (a.kaitou > b.kaitou) return -1;
      return 0
    })
  }else if(sort == -1) {
    // 升序
    procudtList.list = procudtList.list.sort((a, b) => {
      if (a.kaitou < b.kaitou) return -1;
      if (a.kaitou > b.kaitou) return 1;
    })
  }else {
    apiGetProductListHandel()
  }
}

// 点击产品
function productItemClick(item) {
  router.push({ name: 'chart', query: { id: item.id } })
}

function searchClick() {
  router.push({ name: 'mainsearch' })
}

onUnmounted(() => {
  leaveGrupHandle()
})

</script>

<style lang='scss'>
.v_market {
  height: 100%;
  background: #fff;
  overflow: auto;

  .v-market-head {
    padding: 15px 10px;
    position: fixed;
    border-bottom: 1px solid #f2f4f7;
    width: 100%;
    height: 60px;
    top: 0;
    left: 0;
    z-index: 10;
    .v-market-head-left {
      .v-market-head-left-item {
        margin-right: 10px;
        padding: 5px;

        img {
          width: 16px;
        }
      }
    }

    .v-market-head-right {
      .v-market-head-right-item {
        padding: 5px;

        img {
          width: 16px;
        }
      }
    }
  }

  .v-market-sort-list {
    padding: 0 15px 0px 15px;

    .v-market-sort-item {
      color: #939fae;
      font-size: 18px;
      margin-right: 20px;
      vertical-align: middle;

      &.active {
        color: #111;
        font-size: 24px;
      }
    }
  }

  .v-market-nav-list {
    padding-top: 60px;
    border-top: 1px solid #f2f4f7;
    border-bottom: 1px solid #f2f4f7;

    .v-market-nav-item {
      font-size: 16px;
      flex: 1;
      color: #333;

      .v-market-nav-item-title {
        padding: 12px 3px;
        position: relative;
      }

      &.active {
        .v-market-nav-item-title {
          color: var(--g-main_color);
          font-weight: 700;
          &::after {
            content: "";
            position: absolute;
            width: 44px;
            height: 4px;
            background-color: rgb(34, 103, 248);
            bottom: 0;
            border-radius: 20px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }

  .v-market-container {
    position: relative;
    flex: 1;
    overflow: auto;

    .v-market-list-head {
      padding: 10px 15px;
      border-bottom: 1px solid #f2f4f7;
      .v-market-list-head-item {
        .v-market-list-head-item-title {
          font-size: 12px;
          color: #7d919d;
          font-weight: 600;
        }
        .v-market-list-head-paixu {
          height: 24px;
          margin-top: 5px;
          .v-market-up {
            font-size: 12px;
            height: 12px;
            margin-bottom: -5px;
            .iconfont {
              font-size: 12px;
              line-height: 12px;
              color: #7d919d;
            }
            &.v-market-down {
              margin-bottom: 0;
              margin-top: -5px;
            }
            &.active {
              .iconfont {
                font-weight: 700;
                color: var(--g-main_color);
              }
            }
          }
          
        }
        &.v-market-list-head-item-one {
          width: 50%;
        }

        &.v-market-list-head-item-two {
          width: 20%;
        }

        &.v-market-list-head-item-three {
          width: 30%;
        }
      }
    }

    .v-market-list-box {
      .v-market-list {
        .v-market-list-item {
          padding: 13px 15px;
          border-bottom: 1px solid #f2f4f7;
          .v-market-list-item-one {
            width: 50%;

            img {
              width: 25px;
              height: 25px;
              border-radius: 50%;
              object-fit: cover;
            }

            .v-market-list-item-one-name {
              padding-left: 8px;
              color: #333;
              font-size: 16px;
              font-weight: 700;
            }

            .v-market-list-item-one-currency {
              font-size: 13px;
              padding-left: 2px;
              color: #7d919d;
            }
          }

          .v-market-list-item-two {
            width: 20%;
            font-size: 16px;
            color: #333;
            line-height: 30px;
            font-weight: 400;
          }

          .v-market-list-item-three {
            width: 30%;
            overflow: hidden;
            .v-market-list-item-three-zhangdie {
              min-width: 70px;
              max-width: 80px;
              color: #fff;
              height: 28px;
              border-radius: 2px;
              font-size: 14px;
              font-weight: 700;
              @include textEllipsis();
            }
          }
        }
      }
    }

    .v-market-no-list {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);

      .v-market-no-list-img {
        img {
          width: 120px;
        }
      }

      .v-market-no-list-btn {
        margin-top: 5px;
        background: #F0F1F5;
        color: var(--g-main_color);
        padding: 6px 12px;
        font-size: 14px;
        border-radius: 5px;

        img {
          width: 14px;
        }

        span {
          padding-left: 3px;
        }
      }
    }
  }
}
</style> 