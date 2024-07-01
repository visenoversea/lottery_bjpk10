<template>
  <div class="c_select_xianlu_pop">
    <el-dialog align-center v-model="show" class="s-pop" title="" :show-close="false" :before-close="onClose">
      <div class="s-pop-container">
        <div @click="onClose" class="s-pop-close g-flex-align-center g-flex-justify-center">
          <i class="iconfont icon-guanbi1"></i>
        </div>
        <div class="s-pop-title">
          <span>{{ i18n.pleaseSelectText }}</span>
        </div>
        <div class="s-pop-tips">
          <span>{{ i18n.xianluTipsText }}</span>
        </div>
        <div class="s-pop-list g-self-scrollbar">
          <div @click="itemClick(item)" :class="selectIndex == item.id ? 'active': ''" class="s-pop-item g-flex-align-center" v-for="(item, index) in list.list" :key="index">
            <div class="s-pop-item-dot slow"></div>
            <div class="s-pop-item-title">{{ item.title }}</div>
            <div v-show="selectIndex != item.id " class="s-pop-item-select-icon">
              <i class="iconfont icon-yuancircle46"></i>
            </div>
            <div v-show="selectIndex == item.id" class="s-pop-item-select-icon-active">
              <i class="iconfont icon-xuanzhongxuanzhong"></i>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
  
<script setup>
import { apiGetJumpList } from '@/utils/api.js' 
import { reactive, ref, computed, nextTick } from 'vue'
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
let router = useRouter()
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm("mainView");
});

let selectIndex = ref(0)

let show = ref(false)

function onShow() {
  apiGetJumpListHandel()
}

function onClose() {
  show.value = false
  selectIndex.value = 0
  list.list = []
}

let list = reactive({
  list: []
})

async function apiGetJumpListHandel() {
  store.setLoadingShow()
  const { success, data } = await apiGetJumpList()
  if(!success) return
  list.list = data.list
  show.value = true
  // console.log(data)
}

function itemClick(item) {
  window.open(item.domain)
  selectIndex.value = item.id
}

defineExpose({
  onShow
})


</script>
  
<style lang='scss'>
.c_select_xianlu_pop {
  .s-pop {
    width: 400px;
    border-radius: 10px;
    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 0;
    }

    .s-pop-container {
      padding-bottom: 5px;
      .s-pop-close {
        position: absolute;
        background: var(--g-white);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        right: -10px;
        top: -10px;
        cursor: pointer;
        z-index: 9;
        box-shadow: 0 5px 5px 0 rgba(64, 75, 91, .1), 0 16px 32px 0 rgba(29, 53, 89, .1);
        .iconfont {
          color: var(--g-main_color);
          font-size: 20px;
          font-weight: 700;
        }
      }
      .s-pop-title {
        padding: 20px 15px 0 15px;
        text-align: center;
        font-size: 18px;
        font-weight: 700;
      }
      .s-pop-tips {
        text-align: center;
        font-size: 12px;
        line-height: 22px;
        padding: 15px 0;
        color: var(--g-main_color);
      }
      .s-pop-list {
        min-height: 150px;
        max-height: 320px;
        padding-bottom: 15px;
        overflow: auto;
        .s-pop-item {
          cursor: pointer;
          padding: 10px 15px;
          &.active {
            .s-pop-item-title {
              color: var(--g-main_color);
            }
          }
          .s-pop-item-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            &.quick {
              background: #04deba;
            }
            &.normal {
              background: #eded00;
            }
            &.slow {
              background: #ff6161;
            }
          }
          .s-pop-item-title {
            padding-left: 10px;
            font-size: 14px;
            flex: 1;
          }
          .s-pop-item-select-icon {
            .iconfont {
              font-size: 19px;
            }
          }
          .s-pop-item-select-icon-active {
            .iconfont {
              font-size: 19px;
              color: var(--g-main_color);
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 864px) {
    .s-pop {
      width: 300px!important;
    }
  }
}</style>