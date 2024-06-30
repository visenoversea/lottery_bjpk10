<template>
  <div class="v_recharge_bank g-flex-column">
    <div class="v-head g-flex-justify-center g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

      <!-- <div @click="$router.push({ name: 'rechargehistory'})" class="v-head-right g-flex-align-center">
      <i class="iconfont icon-datijilu"></i>
    </div> -->
    </div>
    <div class="v-recharge-bank-container">
      <div class="v-recharge-bank-pop-box">
        <p class="v-recharge-bank-buy-coin g-flex-align-center">
          <span>{{ i18n.tipsText }}：</span> <van-field type="number" v-model="form.amount" @input="amountChange"
            label="" label-width="0" :placeholder="i18n.buyAmontPlaceholderText" />
        </p>
        <div class="v-recharge-bank-list">
          <div class="v-recharge-bank-item-box">
            <div class="g-flex-align-center g-flex-justify-between">
              <p class="v-recharge-bank-list-title">1.{{ i18n.infoTitleText }}:</p>
              <!-- <div class="v-recharge-bank-list-title-kefu g-flex-align-center" @click="kefuClick">
                <van-icon name="service-o" size="20"/>
                <span>{{ i18n.kefuText }}</span>
              </div> -->
            </div>
            <div class="v-recharge-bank-item g-flex-align-center" v-show="form.amount">
              <p class="v-recharge-bank-item-title">{{ i18n.moneyText }}:</p>
              <div class="v-recharge-bank-item-right g-flex-align-center g-flex-justify-end">
                <p class="v-recharge-bank-item-right-money"> = {{ order.info.symbol }} {{ form.money }} </p>
                <i class="iconfont icon-fuzhi" @click="copyClick(form.money)"></i>
              </div>
            </div>
            <div class="v-recharge-bank-item g-flex-align-center">
              <p class="v-recharge-bank-item-title">{{ i18n.nameText }}:</p>
              <div class="v-recharge-bank-item-right g-flex-align-center  g-flex-justify-end">
                <p>{{ order.info.name }}</p>
                <i class="iconfont icon-fuzhi" @click="copyClick(order.info.name)"></i>
              </div>
            </div>
            <div class="v-recharge-bank-item g-flex-align-center">
              <p class="v-recharge-bank-item-title">{{ i18n.cardText }}:</p>
              <div class="v-recharge-bank-item-right g-flex-align-center g-flex-justify-end">
                <p>{{ order.info.card_number }}</p>
                <i class="iconfont icon-fuzhi" @click="copyClick(order.info.card_number)"></i>
              </div>
            </div>
            <div class="v-recharge-bank-item g-flex-align-center">
              <p class="v-recharge-bank-item-title">{{ i18n.bankNameText }}:</p>
              <div class="v-recharge-bank-item-right g-flex-align-center  g-flex-justify-end">
                <p>{{ order.info.bank_name }}</p>
                <i class="iconfont icon-fuzhi" @click="copyClick(order.info.bank_name)"></i>
              </div>
            </div>

            <div v-if="order.info.branch" class="v-recharge-bank-item g-flex-align-center">
              <p class="v-recharge-bank-item-title">{{ i18n.khzhText }}</p>
              <div class="v-recharge-bank-item-right g-flex-align-center  g-flex-justify-end">
                <p>{{ order.info.branch }}</p>
                <i class="iconfont icon-fuzhi" @click="copyClick(order.info.branch)"></i>
              </div>
            </div>

            <div class="v-recharge-bank-item g-flex-align-center" v-if="order.info.bank_code">
              <p class="v-recharge-bank-item-title">{{ i18n.yhdm }}:</p>
              <div class="v-recharge-bank-item-right g-flex-align-center  g-flex-justify-end">
                <p>{{ order.info.bank_code }}</p>
                <i class="iconfont icon-fuzhi" @click="copyClick(order.info.bank_code)"></i>
              </div>
            </div>

            <div class="v-recharge-bank-upload-box">
              <p class="v-recharge-bank-upload-title">{{ i18n.uploadText }}:</p>
              <div class="v-recharge-bank-upload g-flex-align-center g-flex-justify-center">
                <img @click="imgPrviewClick(img)" v-show="form.img" :src="form.img" alt="">
                <div v-show="form.img" class="v-real-name-delete g-flex-justify-center g-flex-align-center"
                  @click="form.img = ''">
                  <i class="iconfont icon-shanchu2"></i>
                </div>
                <div v-show="!form.img" @click="uploadClick"
                  class="v-recharge-bank-upload-tips g-flex-column g-flex-align-center g-flex-justify-center">
                  <i class="iconfont icon-jiahao1"></i>
                  <p>{{ i18n.selectImgText }}</p>
                </div>
              </div>
            </div>
          </div>


          <div class="v-recharge-bank-item-box">
            <p class="v-recharge-bank-list-title">2.{{ i18n.secondText }}</p>
          </div>
        </div>
      </div>
      <div @click="apiBankFinishPayHandel" class="v-recharge-bank-pop-btn g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.finishText }}</span>
      </div>
    </div>

    <!-- <div @click="cancelOrderClick" class="v-recharge-bank-pop-btn v-recharge-bank-pop-btn-cancel g-flex-align-center g-flex-justify-center">
       <span>{{ i18n.cancenOrderBtnText }}</span>
     </div> -->

    <!-- <Upload idString="c-recharge-coin-upload-1" @emitUploadSuccess="emitUploadSuccess" ref="Upload"/> -->

    <OssUpload MidrPath="/buycoin" idString="c-recharge-coin-upload-1" ref="refUpload"
      @emitUploadSuccess="emitUploadSuccess" />
  </div>
</template>

<script setup>
import { apiGeRechargeInfo, apiBankFinishPay } from '@/utils/api.js'
import { copyClick } from '@/utils/index'
import { ImagePreview, Toast } from 'vant';
import OssUpload from '@/components/OssUpload.vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { kefuClick } from '@/utils/index'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('rechargebank')
})

let show = ref(false)

let img = ref('')

let order = reactive({
  info: {
    "bank_code": "",
    "bank_name": "",
    "branch": "",
    "card_number": "",
    "currency": "",
    "fixed": "",
    "name": "",
    "rate": "",
    "symbol": ""
  }
})

const route = useRoute()

const router = useRouter()
let form = reactive({
  id: route.params.id,
  amount: '',
  money: '',
  img: ''
})

async function apiGeRechargeInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGeRechargeInfo({ id: form.id })
  if (!success) return
  Object.assign(order, data.info)
  console.log(data)
}

apiGeRechargeInfoHandel()



function amountChange() {
  if (!form.amount) return form.money = ''
  form.money = (Math.formatFloat(Number(form.amount) * Number(order.info.rate), Number(order.info.fixed))).toFixed(order.info.fixed)
}

// 预览
function imgPrviewClick(url) {
  ImagePreview([url])
}

function emitUploadSuccess(url) {
  console.log('url', url)
  form.img = url
}

const refUpload = ref(null)
function uploadClick() {
  refUpload.value.onUploadClick()
}

// 我已确认转账
async function apiBankFinishPayHandel() {
  store.loadingShow = true
  const { success, data } = await apiBankFinishPay(form)
  if (!success) return
  Toast.success(data.msg)
  setTimeout(() => {
    router.go(-1)
  }, 500);
  console.log(data)
}

</script>

<style lang='scss'>
.v_recharge_bank {
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

  .v-recharge-bank-container {
    flex: 1;
    overflow: auto;
    background: #F0F1F5;
    padding-bottom: 15px;
    padding-top: 50px;
    .v-title {
      padding: 20px 15px 15px 15px;
      font-size: 22px;
      line-height: 26px;
      color: #333;
      font-weight: 600;
    }

    .v-recharge-bank-pop-box {
      padding: 10px 15px;
      border-radius: 10px;

      .v-recharge-bank-buy-coin {
        margin: 10px 0px;
        padding: 10px 12px;
        font-size: 16px;
        color: #000;
        background: #fff;
        border-radius: 5px;

        span {
          font-weight: 600;
        }

        .van-cell {
          background: transparent;
          flex: 1;

          input {
            &::placeholder {
              color: #333;
            }
          }
        }
      }

      .v-recharge-bank-list {
        .v-recharge-bank-item-box {
          margin-top: 15px;
          padding: 20px 15px;
          background: var(--g-white);
          border-radius: 5px;
        }

        .v-recharge-bank-list-title {
          font-size: 16px;
          font-weight: bold;
          color: #000;
          line-height: 30px;
          padding: 5px 0;
        }

        .v-recharge-bank-list-title-kefu {
          padding: 5px;

          span {
            font-size: 14px;
            padding-left: 3px;
          }
        }

        .v-recharge-bank-item {
          padding: 10px 0 10px 15px;

          .v-recharge-bank-item-title {
            font-size: 14px;
            color: #000;
          }

          .v-recharge-bank-item-right {
            flex: 1;
            color: #000;
            font-size: 14px;

            .v-recharge-bank-item-right-money {
              color: #2483ff;
              font-size: 22px;
              font-weight: bold;
            }

            .iconfont {
              padding: 5px;
              font-size: 18px;
            }
          }
        }

        .v-recharge-bank-upload-box {
          padding: 15px;
          background: var(--g-white);
          margin-top: 10px;
          color: #000;

          .v-recharge-bank-upload-title {
            font-size: 14px;
          }

          .v-recharge-bank-upload {
            width: 100px;
            height: 100px;
            border: 1px solid #ddd9d9;
            margin-top: 10px;
            position: relative;
            border-radius: 4px;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }

            .v-real-name-delete {
              position: absolute;
              width: 24px;
              height: 24px;
              background: rgba(0, 0, 0, .5);
              border-radius: 0 0 0 10px;
              right: 0;
              top: 0;
              z-index: 9;

              .iconfont {
                color: var(--g-white);
                font-size: 14px;
              }
            }

            .v-recharge-bank-upload-tips {
              width: 100%;
              height: 100%;

              .iconfont {
                font-size: 30px;
                line-height: 30px;
              }

              p {
                font-size: 14px;
                padding-top: 5px;
              }
            }
          }
        }
      }
    }

    .v-recharge-bank-pop-btn {
      color: var(--g-white);
      // background-image: linear-gradient(-134deg, #2b94e6, #1882d4);
      background-color: var(--g-main_color);
      padding: 10px 0;
      border-radius: 5px;
      font-size: 16px;
      margin: 0 15px 0px 15px;

      &.v-recharge-bank-pop-btn-cancel {
        background: var(--g-white);
        color: var(--g-main_color);
      }
    }
  }
}
</style>