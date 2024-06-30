<template>
  <div class="v_zoushi g-flex-column">
    <div class="v-head g-flex-justify-center g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

      <!-- <div @click="$router.push({ name: 'rechargehistory'})" class="v-head-right g-flex-align-center">
    <i class="iconfont icon-datijilu"></i>
  </div> -->
    </div>
    <div class="v-zoushi-container g-flex-column">
      <div class="v-zoushi-top g-flex-align-center">
        <div class="v-zoushi-top-item">
          {{ i18n.qihaoText }}
        </div>
        <div class="v-zoushi-top-item">
          {{ i18n.haomaText }}
        </div>
        <div class="v-zoushi-top-item">
          {{ i18n.zhiText }}
        </div>
        <div class="v-zoushi-top-item">
          {{ i18n.bigText }}
        </div>
        <div class="v-zoushi-top-item">
          {{ i18n.smallText }}
        </div>
        <div class="v-zoushi-top-item">
          {{ i18n.danText }}
        </div>
        <div class="v-zoushi-top-item">
          {{ i18n.shuangText }}
        </div>
      </div>
      <div class="v-zoushi-list-box">
        <!-- v-show="list.list.length" -->
        <van-list class="v-list" v-model:loading="loading" :finished="finished" :loading-text="i18n2.loadingText"
          :finished-text="i18n2.finishText" @load="onLoad" :immediate-check="false">
          <div v-for="(item, index) in list.list" class="v-list-item g-flex-align-center">
            <div class="v-item-item">
              {{ item.open_expect }}
            </div>
            <div class="v-item-item">
              {{ item.open_code }}
            </div>
            <div class="v-item-item">
              {{ item.total }}
            </div>
            <!-- 大 -->
            <div class="v-item-item g-flex-align-center g-flex-justify-center">
              <div v-if="item.total > 13" class="v-item-item-content" :class="filterBigSmallBgColorClass(item.total)">
                {{ filterBigSmall(item.total) }}
              </div>
              <div v-else class="v-item-item-content">
                -
              </div>
            </div>
            <!-- 小 -->
            <div class="v-item-item g-flex-align-center g-flex-justify-center">
              <div v-if="item.total <= 13" class="v-item-item-content" :class="filterBigSmallBgColorClass(item.total)">
                {{ filterBigSmall(item.total) }}
              </div>
              <div v-else class="v-item-item-content">
                -
              </div>
            </div>
            <!-- 单 -->
            <div class="v-item-item g-flex-align-center g-flex-justify-center">
              <div v-if="(item.total % 2) == 1" class="v-item-item-content" :class="filterDanShuangBgColorClass(item.total)">
                {{ filterDanShuang(item.total) }}
              </div>
              <div v-else class="v-item-item-content">
                -
              </div>
            </div>
            <!-- 双 -->
            <div class="v-item-item g-flex-align-center g-flex-justify-center" >
              <div v-if="(item.total % 2) == 0"  class="v-item-item-content" :class="filterDanShuangBgColorClass(item.total)">
                {{ filterDanShuang(item.total) }}
              </div>
              <div v-else class="v-item-item-content">
                -
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiChipZouShiList } from '@/utils/api.js'
import { filterDanShuangBgColorClass, filterBigSmallBgColorClass, filterDanShuang, filterBigSmall } from '@/utils/index.js'
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
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("zouShi");
});

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})


let form = reactive({
  id: route.query.id,
  page: 1,
  limit: 100,
  status: ''
})

let list = reactive({
  list: []
})

let loading = ref(false)
let finished = ref(false)

function onLoad() {
  form.page++
  apiGetListHandel()
}
apiGetListHandel()
// 获取充值记录
async function apiGetListHandel() {
  store.loadingShow = true
  const { success, data } = await apiChipZouShiList(form)
  if (!success) return
  data.list = data.list.map(item => {
    item.open_code_arr = item.open_code.split(',').map(item2 => {
      return Number(item2)
    })
    item.total = item.open_code_arr.reduce((current, next) => {
      return current + next
    })
    return item
  })
  list.list = list.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}

</script>

<style lang='scss'>
.v_zoushi {
  height: 100%;
  overflow: auto;

  .v-head {
    height: 50px;
    width: 100%;
    line-height: 50px;
    position: fixed;
    top: 0;
    background-color: var(--g-white);
    font-size: 14px;
    color: var(--g-less-black);
    z-index: 999;

    .v-head-back-icon {
      position: absolute;
      height: 100%;
      left: 0;
      padding: 15px;

      .iconfont {
        position: absolute;
        font-size: 26px;
        left: 10px;
        font-weight: 700;
      }
    }

    .v-title {
      font-size: 18px;
      flex: 1;
      height: 100%;
      font-weight: 700;
    }

    .v-head-right {
      position: absolute;
      height: 100%;
      right: 15px;

      .iconfont {
        font-size: 22px;
      }
    }
  }

  .v-zoushi-container {
    flex: 1;
    padding-top: 50px;
    overflow: auto;

    .v-zoushi-top {
      width: 100%;
      background-color: #f8f8f8;
      height: 33px;
      line-height: 33px;

      .v-zoushi-top-item {
        text-align: center;
        border-right: 1px solid #e1e1e1;
        flex-shrink: 0;

        &:nth-of-type(1) {
          width: 90px;
        }

        &:nth-of-type(2) {
          flex: 1;
        }

        &:nth-of-type(3) {
          flex: 1;
        }

        &:nth-of-type(4) {
          flex: 1;
        }

        &:nth-of-type(5) {
          flex: 1;
        }

        &:nth-of-type(6) {
          flex: 1;
        }

        &:nth-of-type(7) {
          flex: 1;
          border-right: none;
        }
      }
    }

    .v-zoushi-list-box {
      flex: 1;
      overflow: auto;

      .v-list {
        .v-list-item {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #e1e1e1;

          &:nth-child(1n) {
            background-color: #fff;
          }

          &:nth-child(2n) {
            background-color: #f8f8f8;
          }

          .v-item-item {
            text-align: center;
            font-size: 14px;
            .v-item-item-content {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              text-align: center;
              line-height: 24px;
              font-size: 12px;
            }
            &:nth-of-type(1) {
              width: 90px;
            }

            &:nth-of-type(2) {
              flex: 1;
            }

            &:nth-of-type(3) {
              flex: 1;
            }

            &:nth-of-type(4) {
              flex: 1;
            }

            &:nth-of-type(5) {
              flex: 1;
            }

            &:nth-of-type(6) {
              flex: 1;
            }

            &:nth-of-type(7) {
              flex: 1;
              border-right: none;
            }
          }
        }
      }
    }
  }
}</style>