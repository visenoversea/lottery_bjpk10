<template>
  <div class="v_vip_detail g-flex-column">
    <div class="v-head g-flex-justify-center g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <span class="v-title g-flex-align-center g-flex-justify-center">{{ roomObjInfo.obj.name }}</span>
      <div @click="$router.push({ name: 'rule', query: { id: 11 } })" class="v-head-right g-flex-align-center">
        {{ i18n.playShuoMingText }}
      </div>
    </div>
    <div class="v-vip-detail-container">
      <van-swipe class="v-vip-detail-swipe" :autoplay="3000" indicator-color="white">
        <!-- store.banner.lunbo -->
        <van-swipe-item class="v-vip-detail-swipe-item" v-for="(item,index) in roomObjInfo.obj.banner">
          <img :src="item" alt="" />
        </van-swipe-item>
      </van-swipe>

      <div class="v-vip-detail-list">
        <div @click="itemClick(item)" class="v-vip-detail-item g-flex-justify-between g-flex-align-center" v-for="(item, index) in roomObjInfo.obj.lotteryRoomList" :key="index">
          <div class="v-item-left g-flex-align-center">
            <div class="v-item-left-img g-flex-align-center">
              <img :src="item.icon" alt=""/>
            </div>
            <div class="v-item-left-title">
              <span>{{ item.name }}</span>
            </div>
          </div>

          <div class="v-item-right g-flex-column g-flex-align-center">
            <div class="v-item-right-tips g-flex-align-center g-flex-justify-center">
              <span class="v-item-right-tips-title">{{ i18n.dizhuText }}:</span>
              <span class="v-item-right-tips-val">{{ item.min }}</span>
            </div>
            <div class="v-item-right-tips g-flex-align-center g-flex-justify-center">
              <span class="v-item-right-tips-title">{{ i18n.zhunruText }}:</span>
              <span class="v-item-right-tips-val">{{ item.balance }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiGetUserInfo, apiGetLotteryRoomList } from '@/utils/api.js'
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
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("vipdetail");
});

let userInfo = computed(() => {
  return store.userInfo
})

// 用户信息
async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
}

apiGetUserInfoHandel()

let form = reactive({
  id: route.query.id
})

let roomObjInfo = reactive({
  obj:{
    name: '',
    banner: [],
    lotteryRoom: []
  }
}) 

async function apiGetLotteryRoomListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetLotteryRoomList({ id: form.id })
  if(!success) return
  roomObjInfo.obj = data.info
  console.log(data)
}

apiGetLotteryRoomListHandel()

function itemClick(item) {
  if(Number(userInfo.value.balance < Number(item.balance))) return Toast(i18n.value.yuerBuZhuTipsText)
  router.push({ name: 'chip', query: { id: item.id }})
}

</script>

<style lang='scss'>
.v_vip_detail {
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
      font-weight: 600;
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
  .v-vip-detail-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    background-color: var(--g-main_bgColor);
    .v-vip-detail-swipe {
      position: relative;
      margin-bottom: 20px;
      background: #000;
      height: 160px;
      .v-vip-detail-swipe-item {
        height: 80%;
        img {
          height: 100%;
          max-width: 100%;
          object-fit: contain;
        }
      }
    }
    .v-vip-detail-list {
      padding: 0 15px;
      .v-vip-detail-item {
        height: 110px;
        background: #1E1C38;
        border-radius: 10px;
        margin-bottom: 15px;
        padding: 0 12px;
        .v-item-left {
          flex: 1;
          .v-item-left-img {
            img {
              height: 68px;
            }
          }
          .v-item-left-title {
            padding-left: 12px;
            color: var(--g-white);
            font-weight: 700;
            font-size: 15px;
          }
        }
        .v-item-right {
          flex-shrink: 0;
          .v-item-right-tips {
            width: 100px;
            height: 32px;
            border-radius: 2px;
            background: linear-gradient(90deg, #D4B38F 0%, #B88964 100%);
            margin-bottom: 12px;
            color: var(--g-white);
            font-size: 12px;
            .v-item-right-tips-val {
              padding-left: 4px;
            }
            &:nth-of-type(2) {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>