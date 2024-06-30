<template>
  <div class="v_main g-flex-column">
    <div class="v-main-head g-flex-align-center">
      <!-- <div @click="mycenterClick" class="v-main-head-left g-flex-align-center">
        <img src="/img/icon/home_left.png" alt="" />
      </div> -->
      <div class="v-main-head-middle g-flex-justify-center g-flex-align-center">
        <span>{{ i18n.titleText }}</span>
      </div>
      <!-- <div @click="$router.push({ name: 'msgcenter' })" class="v-main-head-right g-flex-align-center">
        <i class="iconfont icon-youjian">
          <div class="v-main-head-right-have-msg" v-show="unReadNums"></div>
        </i>
      </div> -->
    </div>
    <div class="v-main-container">
      <van-swipe class="v-main-swipe" :autoplay="3000" indicator-color="white">
        <!-- store.banner.lunbo -->
        <van-swipe-item class="v-main-swipe-item" v-for="(item, index) in store.banner.lunbo" :key="index">
          <img :src="item.img" alt="" />
        </van-swipe-item>
      </van-swipe>

      <!-- 通知栏2 -->
      <div v-if="noticeList.list.length" @click="noticeClick" class="v-notice-two g-flex-align-center">
        <div class="v-notice-two-left g-flex-align-center">
          <img src="/img/icon/ico-notice.png" alt="" />
        </div>
        <van-notice-bar scrollable :speed="80">
          <p class="v-notice-two-tips-val">
            <span v-for="(item, index) in noticeList.list" :key="index">
              {{ item.des }}
            </span>
          </p>
        </van-notice-bar>
        <div @click.stop="$router.push({ name: 'noticelist' })" class="v-notice-two-right g-flex-align-center">
          <span>{{ i18n.moreText }}&gt;</span>
        </div>
      </div>

      <div class="v-main-part-title">
        <span>{{ i18n.hallText }}</span>
      </div>

      <div class="v-main-vip-list">
        <div @click="$router.push({ name: 'vipdetail', query: { id: item.id } })" class="v-main-vip-item g-flex-align-center" v-for="(item, index) in vipList.list" :key="index">
          <img :src="item.icon" alt=""/>
        </div>
      </div>
    </div>

    <NoticePop ref="refNoticePop"/>

    <UpdatePop ref="refUpdatePop"/>
  </div>
</template>

<script setup>
import NoticePop from '@/components/NoticePop.vue'
import {
  apiGetWeiDuMsgNums,
  apiGetUserInfo,
  apiGetKefuConfig,
  apiGetNoticeList,
  apiGetLotteryList
} from "@/utils/api.js";
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
import ws from "@/utils/ws.js";
import UpdatePop from "@/components/UpdatePop.vue";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
if(!store.token){
  router.replace({ name: 'login' })
}

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("mainView");
});

getParams();

function getParams() {
  var tid = route.query.tid;
  if (tid) {
    window.localStorage.setItem("tid", tid);
  }
}
let selectLangObj = computed(() => {
  console.log("store.lang", store.lang);
  if (!store.langList.length) return {};
  var target = store.langList.find((item) => item.code == store.lang);
  console.log("target", target);
  if (target) return target;
  else return store.langList[0];
});

onMounted(() => {
  console.log("当前路由", route);
});


let refUpdatePop = ref(null);

apiGetKefuConfigHandel();

// 获取配置
async function apiGetKefuConfigHandel() {
  const { success, data } = await apiGetKefuConfig({ id: 1 });
  if (!success) return;
  if (store.system.Version != data.info.Version) {
    refUpdatePop.value.onShow();
  }
}

let noticeList = reactive({ list: [] });
onMounted(() => {
  apiGetNoticeListHandel();
})
// 获取公告列表
async function apiGetNoticeListHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetNoticeList();
  if (!success) return;
  noticeList.list = data.list;
  // if(!noticeList.list.length) {
  //   return 
  // }else {
  //   noticeClick()
  // }
}
let refNoticePop = ref(null)
function noticeClick() {
  // refNoticePop.value.onShow(noticeList.list)
  router.push({ name: 'noticelist' })
}

let vipList = reactive({
  list: []
})

// 获取彩种列表
async function apiGetLotteryListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetLotteryList()
  if(!success) return
  vipList.list = data.list
  console.log(data)
}

apiGetLotteryListHandel()

let timeString = ref("?" + new Date().getTime());
let value = ref("");


if(store.token) {
  apiGetUserInfoHandel()
  // apiGetWeiDuMsgNumsHandel()
}

let userInfo = computed(() => {
  return store.userInfo
})

// 获取用户信息
async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
  console.log(data)
}

let unReadNums = ref(0)
// 获取未读消息数量
async function apiGetWeiDuMsgNumsHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetWeiDuMsgNums()
  if(!success) return
  unReadNums.value = data.readNums
}
</script>
<style lang='scss'>
.v_main {
  height: 100%;
  overflow: auto;
  background: var(--g-main_bgColor);
  .v-main-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9;
    height: 46px;
    background: var(--g-main_bgColor);
    .v-main-head-left {
      position: absolute;
      left: 0;
      padding: 0 16px;
      height: 100%;

      img {
        width: 24px;
      }
    }

    .v-main-head-middle {
      flex: 1;
      height: 100%;
      span {
        font-weight: 700;
      }
      img {
        width: 100px;
      }
    }

    .v-main-head-right {
      position: absolute;
      right: 0;
      padding: 0 16px 0 6px;
      height: 100%;

      .iconfont {
        font-size: 22px;
        color: var(--g-white);
        position: relative;

        .v-main-head-right-have-msg {
          position: absolute;
          top: 5px;
          right: 2px;
          background: #e82020;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          transform: translateX(50%) translateY(-50%);
        }
      }

    }
  }

  .v-main-container {
    flex: 1;
    padding-top: 46px;
    overflow: auto;

    .v-main-swipe {
      .van-swipe__track {
        .v-main-swipe-item {
          padding: 10px 15px 0px 15px;
          border-radius: 6px;
          img {
            border-radius: 6px;
            width: 100%;
            height: 170px;
            object-fit: cover;
          }
        }
      }
    }

    .v-notice-two {
      height: 40px;
      margin: 10px 15px;
      padding: 4px;
      background: var(--g-white);
      .v-notice-two-left {
        padding-right: 4px;
        img {
          height: 20px;
        }
      }
      .v-notice-two-tips-val {
        span {
          padding: 0 10px;
        }
      }
      .van-notice-bar {
        flex: 1;
        padding: 0;
        width: 100%;
        height: 20px;
        background: var(--g-white);
        color: var(--g-black);
      }
      .v-notice-two-right {
        padding: 0 4px;
        flex-shrink: 0;
        color: #b8b8b8;
        font-size: 12px;
      }
    }

    .v-main-part-title {
      padding: 0 15px;
      padding-top: 5px;
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }

    .v-main-vip-list {
      padding-top: 8px;
      .v-main-vip-item {
        margin-top: 8px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 170px;
          object-fit: contain;
        }
      }
    }
  }
}</style>