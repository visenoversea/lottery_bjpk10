<template>
  <div class="c_select_address_pop g-flex-column">
    <van-popup :overlay="false" :close-on-click-overlay="false" position="right"
      :style="{ width: '100%', height: '100%' }" v-model:show="show" class="c-select-address-pop-container g-flex-column">
      <div class="v-head g-flex-align-center">
        <div @click="onClose" class="v-head-back-icon g-flex-align-center">
          <i class="iconfont icon-zuo"></i>
        </div>
        <div class="v-head-title g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.titleText }}</span>
        </div>
        <!-- <div class="v-head-right g-flex-align-center">
          <i class="iconfont icon-datijilu"></i>
        </div> -->
      </div>
      <div class="v-bank-card-list-pwd-container">
        <div class="v-bank-card-list-tips">
          {{ i18n.tipsText }}
        </div>
        <div v-show="bankCardList.list.length" class="v-bank-card-list-content">
          <div @click="itemClick(item, index)" v-for="(item, index) in bankCardList.list" :key="index"
            class="v-bank-card-list-item"
            :style="{ backgroundImage: `url('/img/icon/extract_bank_card.png')` }">
            <div class="v-bank-card-list-item-bank-name">
              {{ item.bank_name }}
            </div>
            <div class="v-bank-card-list-item-bank-user">
              {{ item.name }}
            </div>
            <div class="v-bank-card-list-item-bank-cardnum">
              {{ item.card_number }}
            </div>
            <div @click="editClick(item)" class="v-bank-card-list-item-bank-edit">
              <img src="/img/icon/extract_bank_modify.png" alt="">
            </div>
            <div v-show="selectIndex == index" class="v-bank-card-list-item-bank-select">
              <img src="/img/icon/select.png" alt="" />
            </div>
          </div>
        </div>

        <div v-show="!bankCardList.list.length" class="v-back-car-list-no g-flex-column g-flex-align-center">
          <img src="/img/icon/empty-image.png" alt="" />
          <span class="v-back-car-list-no-text">{{ i18n.nolistText }}</span>
        </div>
      </div>

      <div class="v-form-btn-box">
      <div @click="$router.push({ name: 'addbankcard' })" class="v-form-btn g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.addText }}</span>
      </div>
    </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { Dialog, Toast } from 'vant';
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { apiGetBankList } from '@/utils/api.js'
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('selectCashoutBankCardPop')
})
const router = useRouter()
let show = ref(false)
let selectIndex = ref(-1)
let bankCardList = reactive({ list: [] })



function onShow() {
  selectIndex.value = -1
  show.value = true
}
function onClose() {
  show.value = false
}
defineExpose({
  onShow
})

const emits = defineEmits(['emitSelectBank'])

// 删除地址点击
function deleteClick(item) {
  Dialog.confirm({
    message: i18n.value.delTipsText,
    width: '220px',
    theme: 'round',
    cancelButtonColor: '#000',
    confirmButtonColor: '#0077ff',
  }).then(() => {
    apiDelBankHandel(item)
  }).catch(() => { });
}

// 删除银行
async function apiDelBankHandel(item) {
  store.loadingShow = true
  const { success, data } = await apiDelBank({ id: item.id })
  if (!success) return
  Toast(data.msg)
  selectIndex.value = -1
  apiGetBankListHandel()
  console.log(data)
}

// 编辑点击
function editClick(item) {
  router.push({ name: 'addbankcard', query: { id: item.id } })
}

apiGetBankListHandel()

// 获取银行卡列表
async function apiGetBankListHandel() {
  const { success, data } = await apiGetBankList()
  if (!success) return
  bankCardList.list = data.list
  selectIndex.value = data.list.findIndex(item => {
    return item.is_default == 1
  })
}

function addAddressClick() {
  router.push({ name: 'bankadd' })
}

// 点击某一项
function itemClick(item, index) {
  if (selectIndex.value == index) return
  selectIndex.value = index
  onClose()
  emits('emitSelectBank', item)
}


</script>

<style lang='scss'>
.c_select_address_pop {
  .van-overlay {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .c-select-address-pop-container {
    height: 100%;
    overflow: auto;
    background-color: var(--g-white);
    .v-head {
        height: 46px;
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

    .v-bank-card-list-pwd-container {
      padding-top: 46px;
      flex: 1;
      overflow: auto;
      position: relative;
      .v-title {
        padding: 20px 15px 15px 15px;
        font-size: 22px;
        line-height: 26px;
        color: #333;
        font-weight: 600;

        img {
          padding: 5px 5px;
          height: 28px;
        }
      }

      .v-bank-card-list-tips {
        padding: 10px 25px;
        background: var(--g-main_color);
        font-size: 13px;
        color: var(--g-white);
        line-height: 20px;
      }

      .v-bank-card-list-content {
        padding: 15px;

        .v-bank-card-list-item {
          margin-top: 15px;
          position: relative;
          background-position: 100% 100%;
          background-size: cover;
          background-repeat: no-repeat;
          min-height: 100px;
          padding: 15px;
          border-radius: 4px;
          color: #fff;
          font-size: 16px;

          &:nth-of-type(1) {
            margin-top: 0;
          }

          .v-bank-card-list-item-bank-name {
            font-size: 16px;
          }

          .v-bank-card-list-item-bank-user {
            padding-top: 10px;
          }

          .v-bank-card-list-item-bank-user {
            padding-top: 10px;
          }

          .v-bank-card-list-item-bank-cardnum {
            font-weight: 600;
            padding-top: 10px;
          }

          .v-bank-card-list-item-bank-edit {
            position: absolute;
            padding: 10px;
            right: 0;
            bottom: 0;

            img {
              width: 18px;
            }
          }

          .v-bank-card-list-item-bank-select {
            position: absolute;
            top: 0;
            right: 0;
            background: #335ee3;
            padding: 5px;
            border-radius: 0 0 0 15px;

            img {
              width: 18px;
            }
          }
        }
      }

      .v-back-car-list-no {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

        img {
          width: 80px;
        }

        .v-back-car-list-no-text {
          padding-top: 15px;
          color: #AAB1B6;
          font-size: 14px;
        }
      }
    }

    .v-form-btn-box {
      width: 100%;
      padding: 10px;
      padding-bottom: 30px;
      .v-form-btn {
        width: 100%;
        height: 44px;
        background: var(--g-main_color);
        color: var(--g-white);
        border-radius: 6px;
        font-size: 14px;
      }
    }

  }

}
</style>