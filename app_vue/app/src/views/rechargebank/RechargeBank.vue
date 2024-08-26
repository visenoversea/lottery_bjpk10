<template>
  <div class="v_recharge_bank g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
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
    <div class="v-recharge-bank-container">
      <div class="v-recharge-bank-pop-box">
        <div class="v-form-item">
          <div class="v-form-item-title">
            {{ i18n.tipsText }}
          </div>
          <div class="v-form-item-input">
            <input type="text" v-model="form.amount" @input="amountChange"  :placeholder="i18n.buyAmontPlaceholderText" >
          </div>
        </div>
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
                <p class="v-recharge-bank-item-right-money"> ≈ {{ order.info.symbol }} {{ form.money }} </p>
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

            <!-- <div class="v-recharge-bank-upload-box">
              <p class="v-recharge-bank-upload-title">{{ i18n.uploadText }}:</p>
              <div class="v-recharge-bank-upload g-flex-align-center g-flex-justify-center">
                <img @click="imgPrviewClick(form.img)" v-show="form.img" :src="form.img" alt="">
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
            </div> -->
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
  // background-color: #f6f4f5;
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    z-index: 9;
    top: 0;
    width: 100%;
    background-color: #f6f4f5;

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

  .v-recharge-bank-container {
    flex: 1;
    overflow: auto;
    padding-bottom: 15px;
    padding-top: 10px;
    .v-recharge-bank-pop-box {
      padding: 10px 15px;
      border-radius: 10px;

      .v-form-item {
        background: #fff;
        padding: 10px;
        border-radius: 12px;
        .v-form-item-title {
          padding-left: 10px;
          padding-bottom: 4px;
          font-size: 14px;
          color: var(--g-black);
          line-height: 20px;
        }
        .v-form-item-input {
          position: relative;
          padding: 4px 10px;
          height: 34px;
          border: none;
          // background: var(--g-white);
          // border-radius: 4px;
          // border: 1px solid #e4e7ed;
          input {
            height: 100%;
            width: 100%;
            background-color: transparent;
            font-size: 14px;
            font-weight: 400;
            color: var(--g-black);
            border: none;
            outline: none;
            &::placeholder {
              color: rgb(128, 127, 127);
              font-size: 12px;
            }
          }
          .v-form-item-input-icon {
            position: absolute;
            right: 0;
            top: 50%;
            padding: 0 10px;
            transform: translateY(-50%);
            .iconfont {
              font-size: 18px;
            }
          }
        }
      }

      .v-recharge-bank-list {
        background: #fff;
        border-radius: 10px;
        margin-top: 20px;
        margin-bottom: 20px;
        .v-recharge-bank-item-box {
          padding: 0 15px 0px 15px;
          border-radius: 5px;
        }

        .v-recharge-bank-list-title {
          font-size: 14px;
          color: var(--g-black);
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
            color: var(--g-black);
          }

          .v-recharge-bank-item-right {
            flex: 1;
            color: var(--g-black);
            font-size: 14px;

            .v-recharge-bank-item-right-money {
              color: var(--g-main_color);
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
          padding: 10px 15px;
          color: var(--g-black);

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
      padding: 20px 0;
      border-radius: 40px;
      font-size: 16px;
      margin: 0 30px 0px 30px;

      &.v-recharge-bank-pop-btn-cancel {
        background: var(--g-white);
        color: var(--g-main_color);
      }
    }
  }
}
</style>