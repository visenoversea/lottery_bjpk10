<template>
  <div class="v_task_center g-flex-column  n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <!-- <i class="iconfont icon-zuo"></i> -->
        <img src="/images/back-icon.png" alt="">
      </div>
      <div class="v-head-title g-flex-align-center g-flex-justify-center">
        <span></span>
      </div>
      <!-- <div class="v-head-right g-flex-align-center">
        <i class="iconfont icon-datijilu"></i>
      </div> -->
    </div>
    <div class="v-task-container">
      <div class="v-task-top g-flex-align-center">
        <div class="v-task-top-left">
          <div class="v-task-top-left-title">
            <span>{{ i18n.titleText }}</span>
          </div>
          <div class="v-task-top-left-des">
            <span>{{ i18n.tipsText }}</span>
          </div>
        </div>
        <div class="v-task-top-right">
          <img src="/img/icon/task2.png" alt="">
        </div>
      </div>
      <div class="v-task-list">
        <div class="v-task-item" v-for="(item, index) in list.list" :key="index">
          <div class="v-task-item-top">
            <div class="v-task-item-top-title g-flex-align-center">
              <div class="v-task-item-top-title-text">{{ item.title }}</div>
              <div class="v-task-item-top-title-tips">({{ item.finishNums }}/{{ item.nums }})</div>
            </div>
          </div>
          <div class="v-task-item-bottom g-flex-align-center">
            <div class="v-task-item-bottom-left">
              <div v-html="item.des" class="v-task-item-bottom-left-content">
              </div>
            </div>
            <div v-show="(item.userTaskId == 0) && (item.finishNums >= item.nums)" class="v-task-item-bottom-right g-flex-align-center g-flex-justify-center v-task-item-right-already">
              <span>{{ i18n.yilingquText }}</span>
            </div>
            <div @click="lingquClick(item)" v-show="item.userTaskId > 0" class="v-task-item-bottom-right g-flex-align-center g-flex-justify-center v-task-item-right-lingqu">
              <span>{{ i18n.lingquJiangLiText }}</span>
            </div>
            <div v-show="(item.userTaskId == 0) && (item.finishNums < item.nums)" class="v-task-item-bottom-right g-flex-align-center g-flex-justify-center v-task-item-right-nolingqu">
              <span>{{ i18n.nowanchengText }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiGetTaskList, apiLingQuTask } from '@/utils/api.js'
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { useI18n } from "vue-i18n";
import { Dialog, Toast } from 'vant';
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('taskCenter')
})

// 点击领取
function lingquClick(item) {
  Dialog.confirm({
    message: i18n.value.lingquTipsText,
    width: '220px',
    theme: 'round',
    cancelButtonColor: '#000',
    confirmButtonColor: '#0077ff',
  }).then(() => {
    apiLingQuTaskHandel(item)
  }).catch(() => { });
}

async function apiLingQuTaskHandel(item) {
  store.loadingShow = true
  const { success, data } = await apiLingQuTask({ userTaskId: item.userTaskId })
  if(!success) return
  Toast.success(data.msg)
  apiGetTaskListHandel()
}

let list = reactive({
  list: []
})
apiGetTaskListHandel()

async function apiGetTaskListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetTaskList()
  if(!success) return
  list.list = data.list
  console.log(data)
}
</script>

<style lang='scss'>
.v_task_center {
  height: 100%;
  overflow: auto;
  background-color: #363637;

  .v-head {
    height: 46px;
    position: fixed;
    background-color: #363637;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;

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
      font-weight: 700;
      font-size: 16px;
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

  .v-task-container {
    flex: 1;
    background-color: #363637;
    padding-top: 50px;

    .v-task-top {
      padding: 0 15px;
      color:#fff;

      .v-task-top-left {
        flex: 1;

        .v-task-top-left-title {
          font-size: 26px;
          line-height: 30px;
        }

        .v-task-top-left-des {
          padding-top: 6px;
          font-size: 14px;
        }
      }

      .v-task-top-right {
        img {
          width: 120px;
        }
      }
    }

    .v-task-list {
      padding: 15px;

      .v-task-item {
        background-color: var(--g-white);
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .2);
        margin-bottom: 15px;

        .v-task-item-top {
          .v-task-item-top-title {
            .v-task-item-top-title-text {
              font-size: 19px;
              line-height: 24px;
              color: var(--g-main_color);
            }

            .v-task-item-top-title-tips {
              margin-left: 10px;
              background-color: #C8D9FF;
              color: var(--g-main_color);
              padding: 2px 4px;
              border-radius: 4px;
              font-size: 14px;
            }
          }
        }

        .v-task-item-bottom {
          gap: 10px;
          .v-task-item-bottom-left {
            flex: 1;
            flex-shrink: 1;
            padding-right: 15px;
            .v-task-item-bottom-left-content {
              padding: 10px 0;
              color: var(--g-black);
              font-size: 15px;
              line-height: 20px;
              text-align: justify;
              word-break: break-all;
            }
          }

          .v-task-item-bottom-right {
            &.v-task-item-right-already {
              background: #aec6f9;
              color: var(--g-white);
              width: 90px;
              font-size: 15px;
              border-radius: 4px;
              height: 30px;
            }

            &.v-task-item-right-lingqu {
              background: #5488F6;
              color: var(--g-white);
              width: 90px;
              font-size: 15px;
              border-radius: 4px;
              height: 30px;
            }

            &.v-task-item-right-nolingqu {
              background: #A9C3FA;
              color: var(--g-black);
              width: 90px;
              font-size: 15px;
              border-radius: 4px;
              height: 30px;
            }
          }
        }
      }
    }
  }
}</style>