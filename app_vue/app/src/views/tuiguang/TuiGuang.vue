<template>
  <div class="v_tui_guang g-flex-column">
    <div class="v-head g-flex-justify-center g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

      <!-- <div @click="$router.push({ name: 'rechargehistory'})" class="v-head-right g-flex-align-center">
       <i class="iconfont icon-datijilu"></i>
     </div> -->
    </div>
    <div class="v-tui-guang-container g-flex-column">
      <div class="v-tuiguang-top g-flex-align-center">
        <div class="v-tuiguang-top-left">
          <div class="v-tuiguang-top-left-title">
            <span>{{ i18n.inviteFriendText }}</span>
          </div>
          <div class="v-tuiguang-top-left-tips">
            <span>{{ i18n.inviteFriendTipsText }}</span>
          </div>
        </div>
        <div @click="$router.push({ name: 'rule', query: { id: 5 } })" class="v-tuiguang-top-right g-flex-align-center">
          <span>{{ i18n.seeGuizeText }}</span>
          <i class="iconfont icon-icon_arrow_right"></i>
        </div>
      </div>
      <div class="v-tuiguang-middle">
        <div class="v-middle-title-box">
          <div class="v-middle-title">
            <span>{{ i18n.myTuiguangText }}</span>
          </div>
          <div class="v-middle-title-tips-list g-flex-align-center">
            <div class="v-middle-title-tips-item g-flex-align-center">
              <div class="v-middle-title-tips-item-title">
                <span>{{ i18n.myTuiguangNumsText }}：</span>
              </div>
              <div class="v-middle-title-tips-item-val">
                <span>{{ totalInfo.obj.agentNums }}</span>
              </div>
            </div>
            <div class="v-middle-title-tips-item g-flex-align-center">
              <div class="v-middle-title-tips-item-title">
                <span>{{ i18n.tuiguangShouyiText }}：</span>
              </div>
              <div class="v-middle-title-tips-item-val">
                <span>{{ totalInfo.obj.totalAmount }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="v-middle-list g-flex-align-center">
          <div class="v-middle-list-item g-flex-column g-flex-align-center">
            <div class="v-middle-list-item-val">
              <span>{{ totalInfo.obj.agent1 }}</span>
            </div>
            <div class="v-middle-list-item-title">
              <span>{{ i18n.yidaiNumsText }}</span>
            </div>
          </div>
          <div class="v-middle-list-item g-flex-column g-flex-align-center">
            <div class="v-middle-list-item-val">
              <span>{{ totalInfo.obj.agent2 }}</span>
            </div>
            <div class="v-middle-list-item-title">
              <span>{{ i18n.erdaiNumsText }}</span>
            </div>
          </div>
          <div class="v-middle-list-item g-flex-column g-flex-align-center">
            <div class="v-middle-list-item-val">
              <span>{{ totalInfo.obj.agent3 }}</span>
            </div>
            <div class="v-middle-list-item-title">
              <span>{{ i18n.sandaiNumsText }}</span>
            </div>
          </div>
        </div>
        <div class="v-middle-invite g-flex-justify-between g-flex-align-center">
          <div class="v-middle-invite-left g-flex-align-center">
            <div class="v-middle-invite-left-title">
              {{ i18n.myinviteCodeText }}:
            </div>
            <div class="v-middle-invite-left-val">
              {{ tid }}
            </div>
          </div>
          <div @click="copyClick(tid)" class="v-middle-invite-right">
            <img src="/img/icon/copy.png" alt=""/>
          </div>
        </div>
        <div class="v-middle-invite g-flex-justify-between g-flex-align-center">
          <div class="v-middle-invite-left g-flex-align-center">
            <div class="v-middle-invite-left-title">
              {{ i18n.tuiguangLinkText }}:
            </div>
            <div class="v-middle-invite-left-val">
              {{ address }}
            </div>
          </div>
          <div @click="copyClick(address)" class="v-middle-invite-right">
            <img src="/img/icon/copy.png" alt=""/>
          </div>
        </div>
        <div class="v-middle-share g-flex-align-center">
          <div class="v-middle-share-left">
            <div @click="shareClick" class="v-middle-share-left-btn">
              <img src="/img/icon/promote_bg_btn.png" alt=""/>
              <div class="v-middle-share-left-btn-text">
                {{ i18n.clickShareText }}
              </div>
            </div>
          </div>
          <div @click="shareClick" class="v-middle-share-right g-flex-align-center g-flex-justify-center">
            <i class="iconfont icon-erweima1688"></i>
          </div>
        </div>
        <div @click="$router.push({ name: 'tuiguangdetail' })" class="v-middle-deail-btn g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.yongjingDetailText }}</span>
        </div>
      </div>

      <div class="v-tuiguang-bottom">
        <div class="v-tuiguang-bottom-title">
          <span>{{ i18n.myTuiguangText }}</span>
        </div>
        <van-tabs line-height="3px" :background="'#fff'" color="#FF2742" :title-inactive-color="'#7f8aa1'"
          :title-active-color="'#FF2742'" class="v-tuiguang-nav-list g-flex-align-center" @change="headNavItemClick"
          :ellipsis="false" v-model:active="form.layer">
          <van-tab title-class="v-tuiguang-nav-list-item-title" :name="1" :title="i18n.yidaiText">
          </van-tab>
          <van-tab title-class="v-tuiguang-nav-list-item-title" :name="2" :title="i18n.erdaiText">
          </van-tab>
          <van-tab title-class="v-tuiguang-nav-list-item-title" :name="3" :title="i18n.sandaiText">
          </van-tab>
        </van-tabs>
        <div class="v-tuiguang-bottom-title-list g-flex-align-center">
          <div class="v-tuiguang-bottom-title-item g-flex-align-center">
            <span>{{ i18n.useridText }}</span>
          </div>
          <div class="v-tuiguang-bottom-title-item g-flex-justify-center g-flex-align-center">
            <span>{{ i18n.fanyongMoneyText }}</span>
          </div>
          <div class="v-tuiguang-bottom-title-item g-flex-align-center g-flex-justify-end">
            <span>{{ i18n.zhuceTimeText }}</span>
          </div>
        </div>

        <div class="v-tuiguang-bottom-list-box">
          <van-list v-show="list.list.length" class="v-list" v-model:loading="loading" :finished="finished"
          :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad"
          :immediate-check="false">
            <div class="v-tuiguang-bottom-item g-flex-align-center" v-for="(item, index) in list.list" :key="index">
              <div class="v-tuiguang-bottom-item-content g-flex-align-center">
                <span>{{ item.id }}</span>
              </div>
              <div class="v-tuiguang-bottom-item-content v-tuiguang-bottom-item-content-money g-flex-align-center g-flex-justify-center">
                <span>{{ item.amount }} USDT</span>
              </div>
              <div class="v-tuiguang-bottom-item-content g-flex-align-center g-flex-justify-end">
                <span>{{ formatDate(item.create_time, 'yyyy/MM/dd') }}</span>
              </div>
            </div>
          </van-list>
          <NoList v-show="!list.list.length"/>
        </div>
      </div>
    </div>

    <TuiGuanCodePop :address="address" ref="refTuiGuanCodePop"/>
</div>
</template>

<script setup>
// import BindPhonesPop from '@/components/BindPhonesPop.vue'
import TuiGuanCodePop from './TuiGuanCodePop.vue'
import { apiGetTuiGuangList, apiGetUserInfo, apiGetTotalTuiGuang } from '@/utils/api.js'
import { Toast } from 'vant';
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRouter } from 'vue-router';
import { copyClick, formatDate } from '@/utils/index.js'
let router = useRouter()
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('tuiguang')
})
const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})
let loading = ref(false)
let finished = ref(false)

let form = reactive({
  page: 1,
  limit: 30,
  layer: 1
})

let list = reactive({
  list: []
})

apiGetListHandel()

function onLoad() {
  form.page++
  apiGetListHandel()
}

// 获取推广列表
async function apiGetListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetTuiGuangList(form)
  if (!success) return
  list.list = list.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}

function headNavItemClick() {
  form.page = 1
  list.list = []
  loading.value = false
  finished.value = false
  apiGetListHandel()
}

let refTuiGuanCodePop = ref(null)
function shareClick() {
  refTuiGuanCodePop.value.onShow()
}

let userInfo = computed(() => {
  return store.userInfo
})

let address = ref('')
let tid = ref('')
async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
  address.value = data.info.promoteUrl
  tid.value = data.info.tid
}

apiGetUserInfoHandel()

let totalInfo = reactive({
  obj: {
  "agent1": 0,
  "agent2": 0,
  "agent3": 0,
  "agentNums": 0,
  "totalAmount": 0
  }
})

async function apiGetTotalTuiGuangHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetTotalTuiGuang()
  if(!success) return
  totalInfo.obj = data.info
}

apiGetTotalTuiGuangHandel()
</script>

<style lang='scss'>
.v_tui_guang {
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

  .v-tui-guang-container {
    padding-top: 50px;
    flex: 1;
    overflow: auto;
    background-color: #f2f4f7;
    .v-tuiguang-top {
      border-top: 1px solid #f2f4f7;
      background: var(--g-white);
      padding: 15px;
      .v-tuiguang-top-left {
        flex: 1;
        .v-tuiguang-top-left-title {
          font-size: 14px;
          color: var(--g-black);
        }
        .v-tuiguang-top-left-tips {
          font-weight: 400;
          color: #5a6e81;
          font-size: 12px;
          margin-top: 5px;
        }
      }
      .v-tuiguang-top-right {
        font-size: 14px;
        color: var(--g-main_color);
        .iconfont {
          padding-left: 10px;
        }
      }
    }
    .v-tuiguang-middle {
      margin-top: 10px;
      padding: 15px;
      background: var(--g-white);
      .v-middle-title-box {
        .v-middle-title {
          font-size: 14px;
          font-weight: 700;
        }
        .v-middle-title-tips-list {
          padding-top: 10px;
          .v-middle-title-tips-item {
            flex: 1;
            font-size: 12px;
            font-weight: 400;
            .v-middle-title-tips-item-title {
              color: #5a6e81;
            }
          }
        }
      }
      .v-middle-list {
        border-bottom: 1px solid #f2f4f7;
        padding: 15px 0;
        .v-middle-list-item {
          flex: 1;
          .v-middle-list-item-val {
            font-weight: 400;
            color: #333;
            font-size: 14px;
          }
          .v-middle-list-item-title {
            padding-top: 10px;
            color: #5a6e81;
            font-size: 14px;
          }
        }
      }
      .v-middle-invite {
        border-bottom: 1px solid #f2f4f7;
        padding: 15px 0;
        .v-middle-invite-left {
          font-size: 14px;
          line-height: 18px;
          overflow: hidden;
          .v-middle-invite-left-title {
            color: #707070;
          }
          .v-middle-invite-left-val {
            flex: 1;
            @include textManyOverflow(1);
            color: #333;
            padding-left: 5px;
            word-break: break-all;
          }
        }
        .v-middle-invite-right {
          padding: 0 5px;
          img {
            width: 20px;
          }
        }
      }
      .v-middle-share {
        gap: 10px;
        padding-top: 15px;
        .v-middle-share-left {
          .v-middle-share-left-btn {
            position: relative;
            width: 300px;
            height: 38px;
            img {
              width: 100%;
              object-fit: contain;
            }
            .v-middle-share-left-btn-text {
              position: absolute;
              top: 50%;
              left: 50%;
              color: var(--g-white);
              font-size: 16px;
              transform: translateX(-50%) translateY(-50%);
            }
          }
        }
        .v-middle-share-right {
          height: 38px;
          width: 38px;
          padding: 2px;
          border-radius: 4px;
          border: 1px solid var(--g-main_color);
          .iconfont {
            font-size: 30px;
            color: var(--g-black);
            font-weight: 700;
            line-height: 30px;
          }
        }
      }
      .v-middle-deail-btn {
        margin-top: 15px;
        background-color: var(--g-main_color);
        height: 40px;
        border-radius: 4px;
        color: var(--g-white);
        font-size: 16px;
      }
    }

    .v-tuiguang-bottom {
      margin-top: 10px;
      background: var(--g-white);
      .v-tuiguang-bottom-title {
        font-size: 14px;
        color: var(--g-less-black);
        padding: 15px;
        font-weight: 700;
      }
      .v-tuiguang-nav-list {
        padding: 0 15px;
        width: 100%;
        background: var(--g-white);
        overflow: auto;

        .van-tabs__wrap {
          width: 100%;
          .van-tabs__nav {
            padding-left: 0;
            padding-right: 0;
            .van-tab {
              padding: 0;
              &.van-tab--active {
                font-weight: 700;
              }
            }
          }
        }

        .v-tuiguang-nav-list-item-title {
          font-size: 14px;
        }
      }
      .v-tuiguang-bottom-title-list {
        padding: 15px;
        .v-tuiguang-bottom-title-item {
          flex: 1;
          font-size: 12px;
          font-weight: 700;
        }
      }
      .v-tuiguang-bottom-list-box {
        position: relative;
        height: 480px;
        overflow: auto;
        background-color: var(--g-white);
        .v-list {
          .v-tuiguang-bottom-item {
            border-bottom: 1px solid #f2f4f7;
            padding: 15px;
            .v-tuiguang-bottom-item-content {
              flex: 1;
              font-size: 14px;
              font-weight: 600;
              &.v-tuiguang-bottom-item-content-money {
                color: var(--g-red);
              }
            }
          }
        }
      }
    }
  }
}
</style>