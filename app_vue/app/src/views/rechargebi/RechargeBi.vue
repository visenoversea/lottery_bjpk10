<template>
  <div class="v_recharge_bi g-flex-column">
    <div class="v-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center g-flex-justify-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <div class="v-title g-flex-align-center g-flex-justify-center">
        {{ i18n.titleText }}
      </div>
    </div>
    <div class="v-recharge-bi-container">
      
      <div class="v-recharge-bi-top">
        <div class="v-recharge-bi-top-wangluo">
          <p class="v-recharge-coin-title">{{ i18n.selectBiText }}</p>
          <div class="v-recharge-bi-select-box">
            <div class="v-recharge-bi-select g-flex-align-center" @click="selectCoinClick">
              <div class="v-recharge-bi-select-left g-flex-align-center">
                <span>{{ seletCoinItem.obj.currency }}</span>
              </div>
              <i class="iconfont icon-xiala" :style="styObjOne"></i>
            </div>
            <!-- 选择币 -->
            <select-coin-pop :coinList="infoObj.info" @emitCoinItemClick="emitCoinItemClick" ref="refSelectCoinPop" />
          </div>
          <p class="v-recharge-coin-title">{{ i18n.linkText }}</p>
          <ul class="v-cashout-coin-link-list g-flex-align-center">
            <li @click="linkItemClick(item, index)" :class="linkIndex == index ? 'active' : ''"
              class="v-cashout-coin-link-item" v-for="(item, index) in seletCoinItem.obj.chainList" :key="index">
              <span>{{ item.chain }}</span>
            </li>
          </ul>
        </div>



        <div class="v-recharge-bi-code-box">
          <div class="v-recharge-bi-qrcode-box g-flex-align-center g-flex-column">
            <div class="v-recharge-bi-qrcode g-flex-align-center g-flex-justify-center">
              <vue-qr v-if="form.info.address" ref="refVueQr" :text="form.info.address" :margin="marginVal"
                :size="130"></vue-qr>
            </div>
            <div class="v-recharge-bi-qrcode-address-title">{{ i18n.saomaText }}</div>
          </div>
          

          <div class="v-recharge-bi-qrcode-address-box g-flex-align-center">
            <div class="v-recharge-bi-qrcode-address-val">
              {{ form.info.address }}
            </div>
            <div @click="copyClick(form.info.address)" class="v-recharge-bi-copy g-flex-justify-center">
              <i class="iconfont icon-ic_line_copy24px"></i>
            </div>
            </div>
          
        </div>
      </div>


      <div class="v-recharge-bi-bottom">
        
        <div class="v-recharge-bi-nums">
          <div class="v-recharge-bi-nums-title">
            <span>{{ i18n.rechargeAmountText }}:</span>
          </div>
          <div class="v-recharge-bi-nums-input">
            <input @input="amountChange" type="text" v-model="form.amount" :placeholder="i18n.cunkuanPlaceholderText">
          </div>
        </div>
        
        <div v-show="form.amount"
          class="v-recharge-bi-yuedengyu g-flex-align-center">
          <span>≈</span>
          <p>{{ form.money }} </p>
          <span>{{ seletCoinItem.obj.currency }}</span>
        </div>

      <div class="v-recharge-bi-upload-box">
        <p class="v-recharge-bi-upload-title">{{ i18n.uploadText }}:</p>
        <div class="v-recharge-bi-upload g-flex-align-center g-flex-justify-center">
          <img @click="imgPrviewClick(form.img)" v-show="form.img" :src="form.img" alt="">
          <div v-show="form.img" class="v-real-name-delete g-flex-justify-center g-flex-align-center"
            @click="form.img = ''">
            <i class="iconfont icon-shanchu2"></i>
          </div>
          <div v-show="!form.img" @click="uploadClick"
            class="v-recharge-bi-upload-tips g-flex-column g-flex-align-center g-flex-justify-center">
            <i class="iconfont icon-jiahao1"></i>
            <p>{{ i18n.selectImgText }}</p>
          </div>
        </div>
      </div>

      <div @click="apiBankFinishPayHandel" class="v-recharge-bi-btn g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.alreadyText }}</span>
      </div>
      </div>

      
    </div>
    <OssUpload MidrPath="/recharge/" idString="c-recharge-coin-upload-1" @emitUploadSuccess="emitUploadSuccess"
      ref="refOssUpload" />
  </div>
</template>

<script setup>
import SelectCoinPop from '@/components/SelectCoinPop.vue'
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
import OssUpload from '@/components/OssUpload.vue'
import { copyClick } from '@/utils/index.js'
import { useRoute, useRouter } from 'vue-router';
import { apiGeRechargeInfo, apiBankFinishPay } from '@/utils/api.js'
import { ImagePreview, Toast } from 'vant';
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()

const i18n = computed(() => {
  return i18nObj.tm('rechargebi')
})

const route = useRoute()

const router = useRouter()

const refVueQr = ref(null)

let marginVal = ref(7);

let styObjOne = reactive({ transform: '' })

let selectCoinShow = ref(false)

let seletCoinItem = reactive({ obj: {} })

let infoObj = reactive({ info: [] })

let form = reactive({
  id: route.params.id,
  info: {
    currency: '',
    address: '',
    chain: ''
  },
  amount: '',
  img: '',
  money: ''
})

let linkIndex = ref(0) //链Index

// 点击链
function linkItemClick(item, index) {
  linkIndex.value = index
  form.info.address = seletCoinItem.obj.chainList[linkIndex.value].address
  form.info.chain = seletCoinItem.obj.chainList[linkIndex.value].chain
}

// 获取信息
async function apiGeRechargeInfoHandel() {
  const { success, data } = await apiGeRechargeInfo({ id: form.id })
  if (!success) return
  Object.assign(infoObj, data.info)
  seletCoinItem.obj = data.info.info[0]
  form.info.address = seletCoinItem.obj.chainList[0].address
  form.info.currency = seletCoinItem.obj.currency
  form.info.chain = seletCoinItem.obj.chainList[0].chain
}

apiGeRechargeInfoHandel()

const refSelectCoinPop = ref(null)

// 点击币
function selectCoinClick() {
  selectCoinShow.value = !selectCoinShow.value
  if (selectCoinShow.value) {
    refSelectCoinPop.value.onShow()
    styObjOne.transform = 'rotate(180deg)'
  } else {
    styObjOne.transform = 'rotate(0deg)'
    refSelectCoinPop.value.onClose()
  }
}

// 选择币触发
function emitCoinItemClick(item) {
  refSelectCoinPop.value.onClose()
  selectCoinShow.value = false
  styObjOne.transform = 'rotate(0deg)'
  seletCoinItem.obj = item
  linkIndex.value = 0
  form.info.address = seletCoinItem.obj.chainList[0].address
  form.info.currency = seletCoinItem.obj.currency
  form.info.chain = seletCoinItem.obj.chainList[0].chain
  amountChange()
}


function amountChange() {
  if (!form.amount) return form.money = ''
  form.money = (Math.formatFloat(Number(form.amount) * Number(seletCoinItem.obj.rate), seletCoinItem.obj.fixed)).toFixed(seletCoinItem.obj.fixed)
}

// 充币
async function apiBankFinishPayHandel() {
  store.loadingShow = true
  const { success, data } = await apiBankFinishPay(form)
  if (!success) return
  Toast.success(data.msg)
  setTimeout(() => {
    router.go(-1)
  }, 500);
}

// 预览
function imgPrviewClick(url) {
  ImagePreview([url])
}

const refOssUpload = ref(null)

function uploadClick() {
  refOssUpload.value.onUploadClick()
}
function emitUploadSuccess(url) {
  form.img = url
}

</script>

<style lang='scss'>
.v_recharge_bi {
  height: 100%;
  overflow: auto;
  background-color: #f7f9fb;
  .v-head {
    background: var(--g-white);
    height: 50px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9;

    .v-head-back-icon {
      position: absolute;
      left: 0;
      height: 100%;
      img {
        width: 22px;
        height: 22px;
        object-fit: contain;
      }

      .iconfont {
        position: absolute;
        font-size: 26px;
        left: 10px;
        font-weight: 700;
      }
    }
    .v-title {
      height: 100%;
      flex: 1;
      font-size: 18px;
      line-height: 26px;
      color: var(--g-less-black);
      font-weight: 700;
    }
  }

  .v-recharge-bi-container {
    flex: 1;
    padding-top: 50px;
    overflow: auto;
    background: #F0F1F5;

    .v-recharge-bi-top {
      margin-top: 15px;
      .v-recharge-bi-top-wangluo {
        background: var(--g-white);
        padding: 0 15px 20px 15px;

        .v-recharge-coin-title {
          padding: 20px 0px 10px 0;
          font-size: 14px;
          font-weight: 700;
        }

        .v-recharge-bi-select-box {
          position: relative;
          flex: 1;

          .v-recharge-bi-select {
            user-select: none;
            cursor: pointer;
            position: relative;
            border: 1px solid #c5cfd5;
            height: 40px;
            padding: 0 10px;
            border-radius: 4px;

            .v-recharge-bi-select-left {
              img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                object-fit: contain;
              }

              span {
                color: rgba(0, 0, 0, .85);
                font-size: 14px;
                line-height: 20px;
                margin-left: 8px;
                margin-right: 8px;
              }
            }

            .icon-xiala {
              right: 10px;
              position: absolute;
              margin-left: 10px;
              color: #7b8293;
              font-size: 20px;
              transition: transform .2s linear, -webkit-transform .2s linear;
            }
          }
        }
      }

      .v-cashout-coin-link-list {
        background: var(--g-white);
        padding: 10px;
        border-radius: 4px;

        .v-cashout-coin-link-item {
          padding: 6px;
          font-size: 14px;
          color: #a09e9e;
          background: #f8f8f8;
          margin-right: 30px;

          &.active {
            color: #0685e6;
            // background: #f3f3f3;
          }
        }
      }


      .v-recharge-bi-code-box {
        padding: 20px 15px 20px 15px;
        background: var(--g-white);
        margin-top: 15px;
        border-radius: 5px;
        
        

        .v-recharge-bi-qrcode-box  {
          .v-recharge-bi-qrcode {
            border: 1px solid var(--g-main_color);
            img {
              width: 174px;
              height: 174px;
              object-fit: contain;
            }
          }
        }

        .v-recharge-bi-qrcode-address-title {
          color: #7d919d;
          font-size: 16px;
          line-height: 22px;
          padding-top: 10px;
        }
       


        .v-recharge-bi-qrcode-title {
          font-size: 14px;
          color: #0685e6;
          padding-top: 15px;
        }

        .v-recharge-bi-qrcode-address-box {
          padding: 15px;
          background: #f7f7f8;
          flex-wrap: wrap;
          margin-top: 20px;
          .v-recharge-bi-qrcode-address-val {
            flex: 1;
            word-break: break-all;
            text-decoration: underline;
            color: var(--g-less-black);
            font-size: 14px;
            line-height: 26px;
          }
          .v-recharge-bi-copy {
            padding: 0 0 0 10px;
            color: var(--g-main_color);
            .iconfont {
              font-size: 24px;
            }
          }
        }
        
      }
    }

    .v-recharge-bi-bottom {
      margin-top: 15px;
      background: var(--g-white);
      padding-bottom: 15px;
      .v-recharge-bi-nums {
        border-radius: 5px;
        padding: 0 15px 0px 15px;
        .v-recharge-bi-nums-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--g-less-black);
          padding: 15px 0 10px 0;
        }
        .v-recharge-bi-nums-input {
          background: #f2f4f7;
          height: 44px;
          border-radius: 4px;
          input {
            padding: 10px 12px;
            height: 100%;
            width: 100%;
            background-color: transparent;
            font-size: 14px;
            font-weight: 400;
            color: #333;
            border: none;
            outline: none;

            &::placeholder {
              color: #7D919D;
              font-size: 14px;
            }
          }
        }
      }
      .v-recharge-bi-yuedengyu {
        padding: 10px 15px;
        background: var(--g-white);
        font-size: 14px;
        p {
          color: red;
          padding-left: 10px;
          padding-right: 10px;
        }
      }
      .v-recharge-bi-upload-box {
        padding: 15px;
        background: var(--g-white);
        .v-recharge-bi-upload-title {
          font-size: #000;
          font-size: 14px;
          font-weight: 700;
        }

        .v-recharge-bi-upload {
          width: 100px;
          height: 100px;
          border: 1px solid #ddd9d9;
          margin-top: 10px;
          position: relative;

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

          .v-recharge-bi-upload-tips {
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

      .v-recharge-bi-btn {
        margin: 15px;
        height: 44px;
        line-height: 44px;
        color: var(--g-white);
        font-size: 14px;
        // background-image: linear-gradient(-134deg, #2b94e6, #1882d4);
        background-color: var(--g-main_color);
        border-radius: 5px;
      }
    }
    
  }
}
</style>