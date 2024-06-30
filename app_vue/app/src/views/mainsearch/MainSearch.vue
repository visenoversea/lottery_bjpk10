<template>
  <div class="v_main_search g-flex-column">
    <div class="v-main-search-head g-flex-align-center">
      <div class="v-main-head-search g-flex-align-center">
        <van-search class="v-main-head-vant-search" @search="apiSearchListHandel(false)" v-model="form.title"
          :placeholder="i18n.searchPlaceholderText" />
      </div>
      <div @click="$router.go(-1)" class="v-main-search-head-cancel g-flex-align-center">{{ i18n.cancelText }}</div>
    </div>
    <div class="v-main-search-container">
      <div v-show="!searchList.list.length" class="v-main-search-remeng">
        <p class="v-main-search-remeng-title">
          {{ i18n.searchRemengText }}
        </p>
        <div class="v-main-search-remeng-list g-flex-wrap g-flex-align-center">
          <div @click="itemClick(item)" class="v-main-search-remeng-item-box" v-for="(item, index) in hotList.list"
            :key="index">
            <div class="v-main-search-remeng-item g-flex-align-center g-flex-justify-center">
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!searchList.list.length" class="v-main-search-remeng v-main-search-history">
        <div v-show="searchHistoryList.length"
          class="v-main-search-history-title g-flex-justify-between g-flex-align-center">
          <p class="v-main-search-history-title-left">
            {{ i18n.searchHistoryText }}
          </p>
          <p @click="cleanHistoryClick" v-show="searchHistoryList.length" class="v-main-search-history-title-right">
            {{ i18n.cleanText }}
          </p>
        </div>
        <div class="v-main-search-remeng-list g-flex-wrap g-flex-align-center">
          <div @click="itemClick(item)" class="v-main-search-remeng-item-box" v-for="(item, index) in searchHistoryList"
            :key="index">
            <div class="v-main-search-remeng-item g-flex-align-center g-flex-justify-center">
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-show="searchList.list.length" class="v-main-search-result">
        <div @click="itemClick(item)" v-for="(item, index) in searchList.list" :key="index"
          class="v-main-search-result-item g-flex-align-center g-flex-justify-between">
          <div class="v-main-search-result-item-left g-flex-align-center">
            <div class="v-main-search-result-item-left-title">{{ item.title }}</div>
            <div class="v-main-search-result-item-left-xianshi">{{ filtersProductType(item.type) }}</div>
          </div>
          <div @click.stop="collectClick(item, index)" class="v-main-search-result-item-right g-flex-align-center">
            <img v-show="!item.isCollected" src="/img/icon/homepage_icon_star1.png" alt="" />
            <img v-show="item.isCollected" src="/img/icon/homepage_icon_star2.png" alt="" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import useStore from '@/store/index.js'
import { apiSearchList, apiCollectProduct, apiDelCollectProduct } from '@/utils/api.js'
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router'
import { filtersProductType } from '@/utils/index.js'
import { Toast } from 'vant';
// pinia 状态管理仓库
const store = useStore()

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('mainSearch')
})
const route = useRoute()
const router = useRouter()


let value = ref('')
let isCollect = ref(false)

let hotList = reactive({ list: [] })

let form = reactive({
  id: '',
  title: ''
})

let searchList = reactive({ list: [] })

async function apiSearchListHandel(isHot) {
  if (!isHot) store.loadingShow = true
  const { success, data } = await apiSearchList({ hot: isHot ? 1 : '', title: form.title })
  if (!success) return
  if (isHot) hotList.list = data.list
  else {
    searchList.list = data.list
  }
  console.log(data)
}

apiSearchListHandel(true)


// 自选点击
function collectClick(item, index) {
  if (!store.token) return router.push({ name: 'login' })
  if (!item.isCollected) {
    apiCollectProductHandel(item, index)
  } else {
    apiDelCollectProductHandel(item, index)
  }
}

// 添加自选
async function apiCollectProductHandel(item, index) {
  store.loadingShow = true
  const { success, data } = await apiCollectProduct({ id: item.id })
  if (!success) return
  Toast(data.msg)
  searchList.list[index].isCollected = 1
  setLocalSearch(item)
  console.log(data)
}

// 删除自选
async function apiDelCollectProductHandel(item, index) {
  store.loadingShow = true
  const { success, data } = await apiDelCollectProduct({ id: item.id })
  if (!success) return
  Toast(data.msg)
  searchList.list[index].isCollected = 0
  setLocalSearch(item)
  console.log(data)
}

function itemClick(item) {
  setLocalSearch(item)
  router.push({ name: 'chart', query: { id: item.id } })
}



let arr = localStorage.getItem('localSearchList') ? JSON.parse(localStorage.getItem('localSearchList')) : []
let searchHistoryList = ref(arr)

// 设置本地存储的
function setLocalSearch(obj) {
  let localList = localStorage.getItem('localSearchList') ? JSON.parse(localStorage.getItem('localSearchList')) : []
  console.log('localList', localList)
  let targetIndex = localList.findIndex(item => {
    return item.id == obj.id
  })
  if (targetIndex == -1) localList.push(obj)
  localList = localList.slice(0, 6)
  searchHistoryList.value = localList
  localStorage.setItem('localSearchList', JSON.stringify(localList))
  console.log('searchHistoryList', searchHistoryList)
}

function cleanHistoryClick() {
  searchHistoryList.value = []
  localStorage.removeItem('localSearchList')
}

let timer = ref(0)

watch(() => form.title, (nVal, oVal) => {
  if (!nVal) {
    clearTimeout(timer.value)
    searchList.list = []
    return
  }
  // 实现input连续输入，只发一次请求
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    apiSearchListHandel(false);
  }, 300);
})
</script>

<style lang='scss'>
.v_main_search {
  height: 100%;
  overflow: auto;
  .v-main-search-head {
    position: fixed;
    height: 50px;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    padding-left: 15px;
    .v-main-head-search {
      border-radius: 25px;
      overflow: hidden;
      flex: 1;

      .v-main-head-vant-search {
        width: 100%;
        padding: 0;

        .van-search__content {
          background-color: #F0F1F3;
          border-radius: 25px;

          .van-cell {
            .van-field__left-icon {
              color: #98A4AF;

              .van-icon {
                font-weight: 600;
                font-size: 22px;
              }
            }

            .van-cell__value {
              .van-field__body {
                input {
                  &::placeholder {
                    color: #98A4AF;
                  }
                }
              }
            }
          }
        }
      }
    }

    .v-main-search-head-cancel {
      padding: 10px 15px 10px 15px;
      font-size: 14px;
      color: var(--g-grey);
    }
  }

  .v-main-search-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-main-search-remeng {
      .v-main-search-remeng-title {
        padding: 15px 15px 10px 15px;
        font-size: 14px;
        color: #333;
      }

      .v-main-search-remeng-list {
        padding: 10px 15px 0 0px;

        .v-main-search-remeng-item-box {
          width: calc(100% / 3);
          margin-bottom: 15px;

          .v-main-search-remeng-item {
            margin-left: 10px;
            border: 1px solid #E9E9E9;
            padding: 10px 0;
            border-radius: 6px;
            color: #1B1E2B;
          }
        }
      }
    }

    .v-main-search-history {
      .v-main-search-history-title {
        padding: 15px 15px 10px 15px;
        font-size: 14px;
        color: #333;

        .v-main-search-history-title-right {
          color: var(--g-main_color);
        }
      }
    }

    .v-main-search-result {
      padding: 0 15px 15px 15px;

      .v-main-search-result-item {
        margin-top: 10px;
        padding-left: 15px;
        padding-bottom: 5px;
        border-bottom: 1px solid #F1F1F1;

        .v-main-search-result-item-left {
          color: #333;
          font-size: 14px;

          .v-main-search-result-item-left-xianshi {
            margin-left: 10px;
            background: #edf5fb;
            color: var(--g-main_color);
            font-size: 13px;
            padding: 5px;
            border-radius: 4px;
          }
        }

        .v-main-search-result-item-right {
          padding: 5px 0 5px 5px;

          img {
            width: 18px;
            height: 18px;
            object-fit: contain;
          }
        }
      }
    }
  }
}
</style>