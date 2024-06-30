<template>
 <div class="c_select_address_pop g-flex-column">
    <van-popup :overlay="false" :close-on-click-overlay="false" position="right" :style="{width: '100%', height: '100%'}" v-model:show="show" class="c-select-address-pop-container g-flex-column">
      <div class="c-select-wallet-address-head g-flex-align-center">
      <div @click="onClose" class="c-select-wallet-address-head-back-icon">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      </div>
      <div class="c-select-wallet-address-container">
        <div class="v-title g-flex-justify-between g-flex-align-center">
          {{ i18n.titleText }}
          <img @click="$router.push({ name: 'walletadd' })" src="/img/icon/public_increase_black.png" alt=""/>
        </div>
        <!-- <div class="v-wallet-list-tips">
          为了您的资金安全，取款前请绑定银行卡信息，绑定前务必核对银行卡信息，更多问题请联系客服人员。
        </div> -->

        <div v-show="addressList.length" class="c-select-wallet-address-content">
          <div @click="itemClick(item, index)" v-for="(item, index) in addressList" :key="index" class="v-wallet-item g-flex-align-center">
            <div class="v-wallet-item-left">
              <div class="v-wallet-item-left-img">
                <img :src="item.icon" alt=""/>
                <span class="v-wallet-item-left-img-type g-flex-align-center g-flex-justify-center">{{ item.chain }}</span>
              </div>
            </div>
            <div class="v-wallet-item-middle">
              <div class="v-wallet-item-middle-top g-flex-justify-between g-flex-align-center">
                <div class="v-wallet-item-middle-top-title">{{ item.currency }}({{ item.chain }})</div>
                <div class="v-wallet-item-middle-top-link g-flex-align-center g-flex-justify-center">{{ item.chain }}</div>
              </div>
              <div class="v-wallet-item-middle-address">{{ item.address }}</div>
              <div class="v-wallet-item-middle-bottom g-flex-align-center">
                <!-- <i class="iconfont icon-bianji"></i> -->
                <i @click.stop="delClick(item)" class="iconfont icon-shanchu"></i>
              </div>
            </div>
            <div v-show="selectIndex == index" class="v-wallet-item-right">
              <img src="/img/icon/user_public_choice.png" alt="">
            </div>
          </div> 
        </div>

        <div v-show="!addressList.length" class="v-back-car-list-no g-flex-column g-flex-align-center">
          <img src="/img/icon/deficiency_bank_record.png" alt=""/>
          <span class="v-back-car-list-no-text">{{ i18n.nolistText }}</span>
        </div>
      </div>
    </van-popup>
 </div>
</template>

<script setup>
import { apiDelWalletAddress } from '@/utils/api.js'
import { reactive, ref, computed  } from 'vue';
import { Dialog, Toast } from 'vant';
import { useRouter  } from 'vue-router';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
const props = defineProps({
  addressList: {
    type: Array,
    default() {
      return []
    }
  }
})
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('selecttWalletAddressPop')
})

const router = useRouter()

let show = ref(false)

let selectIndex = ref(-1)

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

const emits = defineEmits(['emitSelectAddress', 'emitDelAddress'])

function itemClick(item, index) {
  if(selectIndex.value == index) return
  selectIndex.value = index
  onClose()
  emits('emitSelectAddress', item)
}

function delClick(item) {
  Dialog.confirm({ title: '', message:'确认删除该钱包?'}).then(() => { apiDelWalletAddressHandel(item) }).catch(() => {});
}

async function apiDelWalletAddressHandel(item) {
  store.loadingShow = true
  const { success, data } = await apiDelWalletAddress({ id: item.id })
  if(!success) return
  Toast.success(data.msg)
  emits('emitDelAddress', item)
  console.log(data)
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
    position: absolute;
    height: 100%;
    overflow: auto;
    background: #fff;
    .c-select-wallet-address-head {
      height: 50px;
      // padding: 15px 15px 0 15px;
      position: relative;
      .c-select-wallet-address-head-back-icon {
        position: absolute;
        left: 0;
        padding: 15px;
        img {
          width: 22px;
          height: 22px;
          object-fit: contain;
        }
        .iconfont {
          font-size: 26px;
          left: 10px;
          font-weight: 700;
        }
      }
    }
    .c-select-wallet-address-container {
      flex: 1;
      overflow: auto;
      padding-bottom: 10px;
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
      .c-select-wallet-address-tips {
        padding: 10px 25px;
        background: var(--g-white);
        font-size: 13px;
        color: #EE903B;
        line-height: 20px;
      }
      .c-select-wallet-address-content {
        padding: 15px;
        .v-wallet-item {
          width: 100%;
          position: relative;
          border-bottom: 1px solid #e2e2e2;
          padding: 10px 0px;
          margin-top: 10px;
          &:nth-of-type(1) {
            margin-top: 0;
          }
          .v-wallet-item-left {
            .v-wallet-item-left-img {
              border-radius: 50%;
              position: relative;
              overflow: hidden;
              width: 58px;
              height: 58px;
              img {
                width: 100%;
                height: 100%;
              }
              .v-wallet-item-left-img-type {
                width: 100%;
                left: 0;
                font-size: 12px;
                bottom: 0;
                padding: 3px 0;
                color: var(--g-white);
                position: absolute;
                background: rgba($color: #000000, $alpha: 0.3);
              }
            }
          }
          .v-wallet-item-middle {
            flex: 1;
            padding-left: 15px;
            padding-right: 30px;
            // overflow: hidden;
            .v-wallet-item-middle-top {
              
              .v-wallet-item-middle-top-title {
                font-size: 16px
              }
              .v-wallet-item-middle-top-link {
                background: #EEF2FE;
                height: 25px;
                color: var(--g-main_color);
                font-size: 13px;
                width: 60px;
                border-radius: 4px;
                @include textEllipsis(1);
              }
            }
            .v-wallet-item-middle-address {
              padding-top: 5px;
              width: 250px;
              color: var(--g-grey);
              @include textEllipsis(1);
            }
          }
          .v-wallet-item-right {
            position: absolute;
            right: -5px;
            img {
              width: 22px;
            }
          }
          .v-wallet-item-middle-bottom {
            padding-top: 5px;
            .iconfont {
              color: #111;
              font-size: 22px;
              padding-right: 10px;
              padding-top: 5px;
              padding-bottom: 5px;
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
  }
  
}
</style>