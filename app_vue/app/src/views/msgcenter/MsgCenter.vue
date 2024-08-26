<template>
  <div class="v_msg_center g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <!-- <i class="iconfont icon-zuo"></i>/ -->
        <img src="/images/back-icon.png" alt="" />

      </div>
      <!-- <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div> -->
      <!-- <div class="v-head-right g-flex-align-center">
      <i class="iconfont icon-datijilu"></i>
    </div> -->
    </div>
    <div class="new-head_title_text">{{ i18n.titleText }}</div>
    <div class="v-msg-container g-flex-column">
      <div class="v-msg-nav-box">
        <!-- line-height="2px" color="#5488f7" title-inactive-color="#000" title-active-color="#5488f7"
          background="#f6f4f5 -->
        <van-tabs @change="headNavItemClick" color="#fff" title-inactive-color="#fff" title-active-color="#fff"
          background="#202021" class="v-msg-nav-list" v-model:active="form.type">
          <van-tab class="v-msg-nav-item" :title="i18n.noticeText" :name="1"></van-tab>
          <van-tab class="v-msg-nav-item" :title="i18n.xiaoxigonggaoText" :name="2"></van-tab>
        </van-tabs>
      </div>
      <!-- 消息通知 -->
      <div v-show="form.type == 1" class="v-msg-list">
        <van-list v-show="list.list.length" class="v-list" v-model:loading="loading" :finished="finished"
          :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad" :immediate-check="false">
          <div @click="msgItemClick(item)" :class="item.is_read == 0 ? 'v-noread' : ''" class="v-list-item g-flex-align-center"
            v-for="(item, index) in list.list" :key="index">
            <div class="v-item-left g-flex-align-center">
              <div class="v-item-left-icon">
                <van-icon name="comment-circle" />
              </div>
              <div class="v-item-left-content">
                <div class="v-item-left-title">
                  <span>{{ item.title }}</span>
                </div>
                <div class="v-item-left-time">
                  <span>{{ formatDate(item.create_time, 'YYYY-MM-DD HH:mm') }}</span>
                </div>
              </div>
            </div>
            <div @click.stop="delItemClick(item, index)" class="v-item-right">
              <i class="iconfont icon-shanchu1"></i>
            </div>
          </div>
        </van-list>
        <NoList v-show="!list.list.length" />
      </div>

      <!-- 系统公告 -->
      <div v-show="form.type == 2" class="v-msg-list">
        <van-list v-show="noticeList.list.length" class="v-list" v-model:loading="loading" :finished="finished"
          :loading-text="i18n2.loadingText" :finished-text="i18n2.finishText" @load="onLoad2" :immediate-check="false">
          <div @click="$router.push({ name: 'noticedetail', query: { id: item.id } })"
            class="v-list-item g-flex-align-center" v-for="(item, index) in noticeList.list" :key="index">
            <div class="v-item-left g-flex-align-center">
              <!-- <div class="v-item-left-icon">
                <van-icon name="comment-circle" />
              </div> -->
              <div class="v-item-left-content">
                <div class="v-item-left-title">
                  <span>{{ item.title }}</span>
                </div>
                <div class="v-item-left-title v-item-left-des">
                  <span>{{ item.des }}</span>
                </div>
                <div class="v-item-left-time">
                  <span>{{ formatDate(item.create_time, 'YYYY/MM/DD HH:mm') }}</span>
                </div>
              </div>
            </div>
            <!-- <div @click="delItemClick(item, index)" class="v-item-right">
              <i class="iconfont icon-shanchu1"></i>
            </div> -->
          </div>
        </van-list>

        <NoList v-show="!noticeList.list.length" />
      </div>

      <div v-show="form.type == 1 && list.list.length" class="v-msg-btn-list g-flex-align-center">
        <div @click="delAllClick" class="v-msg-btn-item v-msg-btn-item-del g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.quanbuShanChuText }}</span>
        </div>
        <div @click="apiGetZhanNeiAllReadHandel" class="v-msg-btn-item g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.quanbuYiDuText }}</span>
        </div>
      </div>

      <!-- <div v-show="form.type == 2" class="v-msg-btn-list g-flex-align-center">
      <div class="v-msg-btn-item g-flex-align-center g-flex-justify-center">
        <span>全部已读</span>
      </div>
    </div> -->
    </div>
  </div>
</template>

<script setup>
import { apiGetNoticeList, apiGetZhanNeiList, apiGetZhanNeiAllRead, apiDelZhanNeiItem, apiDelZhanNeiAll } from '@/utils/api.js'
import { dotDealWith, formatDate, copyClick, upDownClass, upDownBgClass, filtersZhangfu, kefuClick, upDownBgFontColorClass } from "@/utils/index.js";
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
import { Dialog, ImagePreview, Toast } from 'vant';
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("msgCenter");
});

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})
let loading = ref(false)
let finished = ref(false)

let form = reactive({
  type: route.query.type ? Number(route.query.type) : 1,
  page: 1,
  limit: 30,
})

let list = reactive({
  list: []
})

if (form.type == 1) {
  apiGetListHandel()
} else {
  apiGetNoticeListHandel();
}

function onLoad() {
  form.page++
  apiGetListHandel()
}

// 消息列表
async function apiGetListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetZhanNeiList(form)
  if (!success) return
  list.list = list.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
  console.log(data)
}

function msgItemClick(item) {
  router.push({ name: 'msgdetail', query: { id: item.id }})
}

// 全部已读
async function apiGetZhanNeiAllReadHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetZhanNeiAllRead()
  if(!success) return
  Toast.success(data.msg)
  list.list = list.list.map(item => {
    item.is_read = 1
    return item
  })
}

function headNavItemClick() {
  form.page = 1
  list.list = []
  noticeList.list = []
  loading.value = true
  finished.value = false
  if (form.type == 1) {
    apiGetListHandel()
  } else {
    apiGetNoticeListHandel()
  }
}

function delAllClick() {
  Dialog.confirm({
    title: '',
    message: i18n.value.delAllTipsText,
    cancelButtonColor: '#000',
    confirmButtonColor: '#5488f7'
  }).then(() => { apiDelZhanNeiAllHandel() }).catch(() => { });
}

// 删除全部
async function apiDelZhanNeiAllHandel() {
  store.loadingShow = true
  const { success, data } = await apiDelZhanNeiAll()
  if(!success) return
  Toast.success(data.msg)
  list.list = []
}

function delItemClick(item, index) {
  Dialog.confirm({
    title: '',
    message: i18n.value.delItemTipsText,
    cancelButtonColor: '#000',
    confirmButtonColor: '#5488f7'
  }).then(() => { apiDelZhanNeiItemHandel(item, index) }).catch(() => { });
}

// 删除单条
async function apiDelZhanNeiItemHandel(item, index) {
  store.loadingShow = true
  const { success, data } = await apiDelZhanNeiItem({ id: item.id })
  if(!success) return
  Toast.success(data.msg)
  list.list.splice(index, 1)
}


let noticeList = reactive({ list: [] });
// 获取公告列表
async function apiGetNoticeListHandel() {
  store.loadingShow = true;
  const { success, data } = await apiGetNoticeList(form);
  if (!success) return;
  noticeList.list = noticeList.list.concat(data.list)
  loading.value = false
  finished.value = data.list.length ? false : true
}
function onLoad2() {
  form.page++
  apiGetNoticeListHandel()
}
</script>

<style lang='scss'>
.v_msg_center {
  height: 100%;
  overflow: auto;
  // background-color: var(--g-white);

  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    background-color: var(--g-white);

    .v-head-back-icon {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      padding: 0 16px;

      .iconfont {
        font-size: 26px;
        font-weight: 700;
        color: #fff;
      }
    }

    .v-head-title {
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      color: #fff;
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
        color: #fff;
      }
    }
  }

  .v-msg-container {
    padding-top: 55px;
    flex: 1;
    overflow: auto;

    .v-msg-nav-list {
      .van-tabs__wrap {
        height: 32px;
      }
    }

    .v-msg-list {
      padding-top: 12px;
      flex: 1;
      overflow: auto;

      .v-list {
        .v-list-item {
          padding: 8px;
          // background: #fff;
          position: relative;
          color: #fff;
          &.v-noread {
            .v-item-left {
              .v-item-left-icon {
                .van-icon {
                  color: #fff;
                }
              }
            }
          }

          &::after {
            position: absolute;
            box-sizing: border-box;
            content: " ";
            pointer-events: none;
            right: 16px;
            bottom: 0;
            left: 16px;
            border-bottom: 0.8px solid #dbdada;
            transform: scaleY(.5);
          }

          .v-item-left {
            flex: 1;

            .v-item-left-icon {
              .van-icon {
                color: #6c6d85;
                font-size: 30px;
              }
            }

            .v-item-left-content {
              padding-left: 4px;

              .v-item-left-title {
                font-weight: 700;
                @include textManyOverflow();
                color: #fff;
                font-size: 14px;
                line-height: 17px;

                &.v-item-left-des {
                  font-weight: normal;
                  font-size: 12px;
                  color: var(--g-less-most-black);
                  padding-top: 4px;
                }
              }

              .v-item-left-time {
                font-size: 14px;
                color: #969799;
                padding-top: 8px;
              }
            }
          }

          .v-item-right {
            padding: 0 5px;

            .iconfont {
              font-size: 22px;
              color: #6c6d85;
            }
          }
        }
      }
    }

    .v-msg-btn-list {
      margin-top: 20px;

      .v-msg-btn-item {
        background: var(--g-main_color);
        color: var(--g-white);
        font-size: 13px;
        flex: 1;
        height: 40px;
        position: relative;

        &.v-msg-btn-item-del {
          &::after {
            content: "";
            position: absolute;
            height: 30px;
            width: 1px;
            background-color: var(--g-white);
            right: 0;
          }
        }
      }
    }

  }
}</style>