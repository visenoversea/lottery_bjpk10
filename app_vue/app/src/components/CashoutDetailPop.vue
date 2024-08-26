<template>
  <div class="c_cashout_detail_pop">
    <van-popup position="right" :close-on-click-overlay="false" v-model:show="show" class="c-pop g-flex-column">
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
      <div class="c-pop-container">
        <div class="c-pop-content">
          <div class="c-pop-item g-flex-align-center">
            <div class="c-pop-item-left">
              {{ typeVal == 1 ? i18n.rukuanMethodText : i18n.qukuanMethodText }}
            </div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val">{{ infoObj.obj.title }}</span>
            </div>
          </div>

          <div class="c-pop-item g-flex-align-center">
            <div class="c-pop-item-left">
              {{ i18n.statusText }}
            </div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val" :class="filtersRealStatusClass(infoObj.obj.status)">{{
                filtersRealStatus(infoObj.obj.status)
              }}</span>
            </div>
          </div>

          <div v-if="infoObj.obj.status == 0 && infoObj.obj.reason" class="c-pop-item c-pop-item-fail g-flex-align-center">
            <div class="c-pop-item-left">
              {{ i18n.shibaiyuanyingText }}
            </div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val">
                {{ infoObj.obj.reason }}
              </span>
            </div>
          </div>

          <!-- <div class="c-pop-item g-flex-align-center">
            <div class="c-pop-item-left">
              币种
            </div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val">USDT</span>
            </div>
          </div> -->


          <template v-if="infoObj.obj.info.fn == 'Wallet'">
            <div class="c-pop-item g-flex-align-center">
              <div class="c-pop-item-left">
                {{ i18n.linkText }}
              </div>
              <div class="c-pop-item-right">
                <span class="c-pop-item-right-val">{{ infoObj.obj.info.chain }}</span>
              </div>
            </div>
            <div class="c-pop-item g-flex-align-center">
              <div class="c-pop-item-left" v-show="typeVal == 1">
                {{ i18n.rechargeAddressText }}
              </div>
              <div class="c-pop-item-left" v-show="typeVal == 2">
                {{ i18n.cashoutAddressText }}
              </div>
              <div class="c-pop-item-right g-flex-1">
                <div class="c-pop-item-right-top g-flex-column g-flex-align-end">
                  <p class="c-pop-item-right-val c-pop-item-right-address">{{ infoObj.obj.info.address }}</p>
                  <div @click="copyClick(infoObj.obj.info.address)" class="g-flex-align-center">
                    <i class="iconfont icon-fuzhi1"></i>
                    <span class="c-pop-item-right-copy-text">{{ i18n.copyText }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>


          <template v-if="infoObj.obj.info.fn == 'Bank'">
            <div class="c-pop-item g-flex-align-center">
              <div class="c-pop-item-left" v-show="typeVal == 1">
                {{ i18n.rechargeBankText }}
              </div>
              <div class="c-pop-item-left" v-show="typeVal == 2">
                {{ i18n.cashoutBankText }}
              </div>
              <div class="c-pop-item-right g-flex-column g-flex-align-end">
                <div class="c-pop-item-right-top g-flex-align-center">
                  <img class="c-pop-item-right-card-img" src="/img/icon/assets_bank_yellow.png" alt="" />
                  <span class="c-pop-item-right-val">{{ infoObj.obj.info.bank_name }}</span>
                </div>
                <div class="c-pop-item-right-bottom">
                  <span class="c-pop-item-right-val">{{ infoObj.obj.info.card_number }}</span>
                </div>
              </div>
            </div>
            <div class="c-pop-item g-flex-align-center">
              <div class="c-pop-item-left" v-show="typeVal == 1">
                {{ i18n.shoukuanNameText }}
              </div>
              <div class="c-pop-item-left" v-show="typeVal == 2">
                {{ i18n.qukuanNameText }}
              </div>
              <div class="c-pop-item-right g-flex-column g-flex-align-end">
                <div class="c-pop-item-right-bottom">
                  <span class="c-pop-item-right-val">{{ infoObj.obj.info.name }}</span>
                </div>
              </div>
            </div>
          </template>

          <div v-show="typeVal == 1" class="c-pop-item g-flex-align-center">
            <div class="c-pop-item-left">
              {{ i18n.cunkuanNumText }}
            </div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val">{{ infoObj.obj.amount }} {{ infoObj.obj.currency }}</span>
            </div>
          </div>

          <div v-show="typeVal == 2" class="c-pop-item g-flex-align-center">
            <div class="c-pop-item-left">
              {{ i18n.qukuanNumText }}
            </div>
            <div class="c-pop-item-right" v-if="store.system.WithdrawModel == 1">
              <span class="c-pop-item-right-val">{{ infoObj.obj.amount }} {{ infoObj.obj.currency }}</span>
            </div>
            <div class="c-pop-item-right" v-if="store.system.WithdrawModel == 2">
              <span class="c-pop-item-right-val">{{ infoObj.obj.apply_amount }} {{ infoObj.obj.currency }}</span>
            </div>
          </div>



          <!-- 转账金额 到账金额 -->
          <div v-show="infoObj.obj.info.fn != 'KeFu' && infoObj.obj.info.fn != 'DPay'" class="c-pop-item g-flex-align-center">
            <div class="c-pop-item-left" v-show="typeVal == 1">
              {{ i18n.zhuanzhangMoneyText }}
            </div>
            <div class="c-pop-item-left" v-show="typeVal == 2">
              {{ i18n.daozhangMoneyText }}
            </div>
            <div class="c-pop-item-right">
              <!-- 是银行卡 -->
              <span class="c-pop-item-right-val" v-if="infoObj.obj.info.symbol">
                {{ infoObj.obj.info.symbol }} {{ dotDealWith((infoObj.obj.amount *
                  infoObj.obj.info.rate).toFixed(Number(infoObj.obj.info.fixed))) }}
              </span>
              <!-- 单币种 -->
              <span class="c-pop-item-right-val" v-if="!infoObj.obj.info.symbol && (infoObj.obj.currency != infoObj.obj.info.currency)">
                {{ (infoObj.obj.amount * infoObj.obj.info.rate).toFixed(Number(infoObj.obj.info.fixed)) }} {{ infoObj.obj.info.currency }}
              </span>
              <!-- 多币种 -->
              <span class="c-pop-item-right-val" v-if="!infoObj.obj.info.symbol && (infoObj.obj.currency == infoObj.obj.info.currency)">
                {{ infoObj.obj.amount }} {{ infoObj.obj.currency }}
              </span>
            </div>
          </div>

          <!-- 手续费 -->
          <div v-show="typeVal == 2" class="c-pop-item g-flex-align-center">
            <div class="c-pop-item-left">
              {{ i18n.shouxuFeiText }}
            </div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val">{{ infoObj.obj.fee }} {{ infoObj.obj.currency }}</span>
            </div>
          </div>

          <div class="c-pop-item g-flex-align-center">
            <div class="c-pop-item-left">
              {{ i18n.orderNumText }}
            </div>
            <div class="c-pop-item-right">
              <div @click="copyClick(infoObj.obj.order_no)" class="c-pop-item-right-top g-flex-align-center">
                <span class="c-pop-item-right-val">{{ infoObj.obj.order_no }}</span>
                <img class="c-pop-item-right-copy-img" src="/img/icon/public_copy_blue.png" alt="" />
              </div>
            </div>
          </div>

          <div class="c-pop-item g-flex-align-center">
            <div class="c-pop-item-left">
              {{ i18n.timeText }}
            </div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val">{{ formatDate(infoObj.obj.create_time) }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import useStore from '@/store/index.js'
import { filtersRealStatusClass, copyClick, dotDealWith, formatDate } from '@/utils/index.js'
import { useI18n } from "vue-i18n";
const props = defineProps({
  // navTypeVal 1充值 2提现
  typeVal: {
    type: Number,
    default() {
      return 1
    }
  }
})
// pinia状态管理仓库
const store = useStore()
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('cashoutDetailPop')
})
let show = ref(false)

let infoObj = reactive({ obj: { info: {} } })

function onShow(obj) {
  infoObj.obj = obj
  show.value = true
}

function onClose() {
  show.value = false
}


function filtersRealStatus(status) {
  // status 0 认证失败
  // status 1 认证成功
  // status 2 认证中
  if (status == 0) return i18n.value.statusFailText
  if (status == 1) return i18n.value.statusSuccessText
  if (status == 2) return i18n.value.statusIngText
  if (status == 3) return i18n.value.statusWaitText
}


// 暴露组件的方法或者属性
defineExpose({
  onShow
})
</script>

<style lang='scss'>
.c_cashout_detail_pop {
  .van-overlay {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .c-pop {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: var(--g-white);
    padding-bottom: 10px;

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

    .c-pop-container {
      flex: 1;
      overflow: auto;
      padding-top: 46px;
      background: var(--g-white);
      .c-pop-title {
        padding: 20px 15px 15px 15px;
        font-size: 22px;
        line-height: 26px;
        color: #333;
      }

      .c-pop-content {
        padding: 15px;
      
        .c-pop-item {
          padding: 15px 0;
          justify-content: space-between;
          border-bottom: 1px solid #e4e7ed;
          &.c-pop-item-fail {
            .c-pop-item-left {
              color: var(--g-red)!important;
            }
            .c-pop-item-right {
              color: var(--g-red)!important;
            }
          }
          .c-pop-item-left {
            font-size: 14px;
            color: #9c9c9c;
          }

          .c-pop-item-right {
            color: var(--g-black);
            font-size: 14px;

            .c-pop-item-right-val {
              padding-left: 5px;
             
            }

            .c-pop-item-right-address {
              width: 250px;
              word-break: break-all;
            }

            
            .c-pop-item-right-copy-text {
              color: var(--g-main_color);
              font-size: 14px;
              margin-left: 5px;
            }

            .c-pop-item-right-top {
              .iconfont {
                color: var(--g-main_color);
              }
              img {
                width: 18px;

                &.c-pop-item-right-card-img {
                  width: 18px;
                }

                &.c-pop-item-right-copy-img {
                  width: 12px;
                  margin-left: 5px;
                }
              }
            }

            .c-pop-item-right-bottom {
              padding-top: 10px;
            }
          }
        }
      }
    }
  }
}</style>