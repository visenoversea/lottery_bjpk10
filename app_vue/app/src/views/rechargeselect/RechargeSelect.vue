<template>
  <div class="v_recharge_select g-flex-column n-bg">
    <div class="new-head">
      <div class="new-head-back" @click="$router.go(-1)">
        <img src="/images/back-icon.png" alt="" />
      </div>
      <!-- <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div> -->
      <div
        class="new-head-r  g-flex-align-center"
        @click="$router.push({ name: 'rechargehistory' })"
      >
        <i class="iconfont icon-datijilu new-head-r" />
      </div>
    </div>
    <div class="new-head_title_text">{{ i18n.titleText }}</div>
    <!-- :style="{ backgroundImage: `url(/img/bg-recharge.png)` }" -->
    <div class="v-recharge-select-container">
      <div class="v-recharge-select-box">
        <p class="v-recharge-select-title">{{ i18n.selectText }}</p>
        <ul class="v-recharge-select-list">
          <li
            v-for="(item, index) in list.list"
            :key="index"
            class="v-recharge-select-item g-flex-align-center"
            @click="itemClick(item, index)"
          >
            <div class="v-recharge-select-item-left g-flex-align-center">
              <img :src="item.icon" alt="" />
              <span>{{ item.title }}</span>
            </div>
            <i class="iconfont icon-xiangyou1 " />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiGetRechargeList, apiGetLiangHuaLevelList } from "@/utils/api.js";
import { reactive, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import useStore from "@/store/index.js";
import { useRoute, useRouter } from "vue-router";
import { kefuClick } from "@/utils/index";
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("rechargeSelect");
});
const i18n2 = computed(() => {
  return i18nObj.tm("lianghua");
});

const list = reactive({ list: [] });
const imgList = reactive({
  list: [
    {
      img: "/img/icon/bian.png",
      href: "https://accounts.binance.com/",
    },
    // {
    //   img: '/img/icon/okex.png',
    //   href: 'https://www.okx.com/'
    // },
    {
      img: "/img/icon/changelly.png",
      href: "https://changelly.com/",
    },
    {
      img: "/img/icon/moonpay.png",
      href: "https://www.moonpay.com/",
    },
    {
      img: "/img/icon/crypto.png",
      href: "https://crypto.com/",
    },
    {
      img: "/img/icon/bitoex.png",
      href: "https://www.bitopro.com/",
    },
  ],
});

const route = useRoute();
const router = useRouter();

// 获取充值通道
async function apiGetRechargeListHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetRechargeList();
  if (!success) return;
  list.list = data.list;
}

apiGetRechargeListHandel();

function itemClick(item) {
  console.log(item);
  if (item.fn == "Bank") {
    router.push({ name: "rechargebank", params: { id: item.id } });
  } else if (item.fn == "KeFu") {
    router.push({ name: "rechargekefu", params: { id: item.id } });
  } else if (item.fn == "Wallet") {
    router.push({ name: "rechargebi", params: { id: item.id } });
  } else if (item.fn == "WalletAuth") {
    window.open(item.info.url);
  } else if (item.fn.includes("Pay")) {
    router.push({ name: "rechargethird", params: { id: item.id } });
  }
}

function imgItemClick(item) {
  window.open(item.href);
}

const levelList = reactive({
  list: [],
});

function filtersSperadLevelTitle(obj) {
  const target = levelList.list.find((item) => {
    return item.id == obj.spread_level;
  });
  if (target) return target.title;
  else return "";
}

//apiGetLiangHuaLevelListHandel();

// 获取等级列表
async function apiGetLiangHuaLevelListHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetLiangHuaLevelList();
  if (!success) return;
  levelList.list = data.list;
}
</script>

<style lang='scss'>
.v_recharge_select {
  height: 100%;
  overflow: auto;
  // background-color: #f6f4f5;
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background: #f6f4f5;
    .v-head-back-icon {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      padding: 0 16px;

      .iconfont {
        font-size: 26px;
        font-weight: 700;
        color: var(--g-black);
      }
    }

    .v-head-title {
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      color: var(--g-black);
    }

    .v-head-right {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      padding: 0 0 0 10px;

      .iconfont {
        font-size: 22px;
        font-weight: 700;
        color: var(--g-black);
      }
    }
  }

  .v-recharge-select-container {
    flex: 1;
    overflow: auto;
    padding: 10px 15px 0 15px;

    background-size: 100%;

    .v-recharge-select-box {
      margin-top: 2.666667vw;
      color: var(--g-black);
      border-radius: 18px 18px 18px 18px;
      border: 1px solid #ccc;
      // border: 1px solid ##40F51;;

      .v-recharge-select-title {
        padding: 15px;
        // border-bottom: 0.5px solid #ccc;
        font-size: 14px;
        color: #fff;
      }

      .v-recharge-select-list {
        // background: var(--g-white);
        border-radius: 5px;
        margin-bottom: 10px;
        margin-top: 0px;

        .v-recharge-select-item {
          padding: 10px 15px;
          border-bottom: 0.8px solid #e4e7ed;

          &.active {
            background: #eff4fd;

            .iconfont {
              color: #fff;
            }
          }

          &:nth-last-of-type(1) {
            border-bottom: none;
          }

          .v-recharge-select-item-left {
            flex: 1;
            color: #fff;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              object-fit: contain;
            }

            span {
              padding-left: 10px;
              font-size: 14px;
            }
          }

          .iconfont{
            color: #fff;
          }
        }
      }
    }

    .v-hou-recharge-coin-imglist {
      padding: 10px 0;

      .v-hou-recharge-coin-item {
        margin-top: 10px;

        img {
          width: 175px;
          height: 35px;
          border-radius: 4px;
          object-fit: cover;
        }
      }
    }

    .v-recharge-select-level-list {
      padding: 10px 0;
      position: relative;

      .swipeImg {
        width: 100%;
      }
      .swipecon {
        position: absolute;
        top: 20px;
        width: 100%;
        padding-left: 20px;

        .swipecontit {
          padding-top: 20px;
          height: 100px;
          font-weight: bold;
          font-size: 26px;
        }

        .swipeconele {
          display: flex;
          justify-content: start;
          width:100%;

          .swipeconetext {
            width: 30%;
            color: #fff;
            margin-right: 5%;
            text-align: center;
            &:nth-child(2) {
              margin-right: 0%;
            }
          }
        }

        .v-recharge-select-level-item-bottom {
            padding: 0 20px;
            font-size: 12px;
            color: #fff;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 0.5px solid #ccc;
          }

        .v-recharge-select-level-item {
          position: absolute;
          top: 0;
          background-size: 100% 100% !important;
          // box-shadow: 0 4px 3px 0 rgba(0,0,0,.3);
          background: var(--g-white);
          padding: 10px 0;
          margin-bottom: 10px;
          border-radius: 15px;
          height: 218px;

          
          .v-recharge-select-level-item-top {
            padding: 0 10px;
            gap: 3px;
            margin-top: 120px;
            .v-recharge-select-level-item-left {
              flex: 1;
              flex-shrink: 1;
              .v-recharge-select-level-item-left-img {
                img {
                  width: 30px;
                }
              }
              .v-recharge-select-level-item-left-title {
                color: var(--g-main_color);
                line-height: 20px;
                margin-left: 5px;
                font-size: 14px;
                font-weight: 700;
              }
            }
            .v-recharge-select-level-item-middle {
              flex: 1;
              .v-recharge-select-level-item-middle-title {
                font-size: 12px;
                color: #fff;
              }
              .v-recharge-select-level-item-middle-value {
                color: #fff;
                font-weight: 700;
                padding-top: 5px;
                font-size: 16px;
              }
            }
            .v-recharge-select-level-item-right {
              flex: 1;
              .v-recharge-select-level-item-right-title {
                font-size: 12px;
                color: #fff;
              }
              .v-recharge-select-level-item-right-value {
                color: #fff;
                font-weight: 700;
                padding-top: 4px;
                font-size: 16px;
              }
            }
          }
          .v-recharge-select-level-item-bottom {
            padding: 0 20px;
            font-size: 12px;
            color: #000;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 0.5px solid #ccc;
          }
        }
      }

      .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        // line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
      }
      .van-swipe__indicators {
        bottom: 20px;
      }

    }

    .membership {
      // margin: 10px;
      background: #313132;
      border-radius: 12px;
      padding: 10px;
      
      .membership-title{
        font-weight: bold;
        font-size: 16px;
        color: #fff;
        line-height: 19px;
        text-align: left;
        padding-top: 10px;
      }
      .membership-con{
        display: flex;
        // justify-content: space-between;
        align-items: center;
        padding: 10px ;
        border-radius: 20px 20px 0 0 ;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .member-ele{
          width: 100%;
          text-align: left;
          font-weight: bold;
          font-size: 16px;
          color: #fff;
          line-height: 19px;
          .member-ele2 {
            font-weight: 400;
            font-size: 14px;
            color: #8d8d8e;
            line-height: 16px;
          }
        }
      }
    }
  }
}
</style>
