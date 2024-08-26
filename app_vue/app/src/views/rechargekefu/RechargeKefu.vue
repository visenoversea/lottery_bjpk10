<template>
  <div class="v_recharge_kefu g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <!-- <i class="iconfont icon-zuo"></i> -->
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
    <div class="v-recharge-kefu-container">
      <div class="v-recharge-kefu-pop-box">
        <div class="v-form-item">
          <div class="v-form-item-title">
            {{ i18n.amountText }}
          </div>
          <div class="v-form-item-input">
            <input type="text" v-model="form.amount" @input="amountChange"  :placeholder="i18n.buyAmontPlaceholderText" >
          </div>
        </div>
        <div class="v-recharge-kefu-list">
          <div class="v-recharge-kefu-item-box">
            <div class="g-flex-align-center g-flex-justify-between">
              <p class="v-recharge-kefu-list-title">1.{{ i18n.conCatKeFuText }}:</p>
              <div class="v-recharge-kefu-list-title-kefu g-flex-align-center" @click="kefuClick">
                <van-icon name="service-o" size="20" />
                <span>{{ i18n.kefuText }}</span>
              </div>
            </div>

            <div class="v-recharge-kefu-upload-box">
              <p class="v-recharge-kefu-upload-title">{{ i18n.uploadText }}:</p>
              <div class="v-recharge-kefu-upload g-flex-align-center g-flex-justify-center">
                <img @click="imgPrviewClick(img)" v-show="form.img" :src="form.img" alt="">
                <div v-show="form.img" class="v-real-name-delete g-flex-justify-center g-flex-align-center"
                  @click="form.img = ''">
                  <i class="iconfont icon-shanchu2"></i>
                </div>
                <div v-show="!form.img" @click="uploadClick"
                  class="v-recharge-kefu-upload-tips g-flex-column g-flex-align-center g-flex-justify-center">
                  <i class="iconfont icon-jiahao1"></i>
                  <p>{{ i18n.selectImgText }}</p>
                </div>
              </div>
            </div>
          </div>


          <div class="v-recharge-kefu-item-box">
            <p class="v-recharge-kefu-list-title">2.{{ i18n.secondText }}</p>
          </div>
        </div>
      </div>
      <div @click="apiBankFinishPayHandel" class="v-recharge-kefu-pop-btn g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.finishText }}</span>
      </div>
    </div>

    <!-- <div @click="cancelOrderClick" class="v-recharge-kefu-pop-btn v-recharge-kefu-pop-btn-cancel g-flex-align-center g-flex-justify-center">
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
  return i18nObj.tm('rechargeKefu')
})

let show = ref(false)

let img = ref('')

const route = useRoute()

const router = useRouter()
let form = reactive({
  id: route.params.id,
  amount: '',
  money: '',
  img: ''
})

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
.v_recharge_kefu {
  height: 100%;
  overflow: auto;
 background-color: #f6f4f5;

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
      font-size: 16px;
      font-weight: 700;
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

  .v-recharge-kefu-container {
    flex: 1;
    overflow: auto;
    padding-bottom: 15px;
    padding-top: 50px;

    .v-title {
      padding: 20px 15px 15px 15px;
      font-size: 22px;
      line-height: 26px;
      color: #333;
      font-weight: 600;
    }

    .v-recharge-kefu-pop-box {
      padding: 10px 15px;
      border-radius: 10px;

      .v-form-item {
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
          background: var(--g-white);
          border-radius: 4px;
          border: 1px solid #e4e7ed;
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

      .v-recharge-kefu-list {
        .v-recharge-kefu-item-box {
          padding: 10px 15px;
          border-radius: 5px;
        }

        .v-recharge-kefu-list-title {
          font-size: 14px;
          color: var(--g-black);
          line-height: 30px;
        }

        .v-recharge-kefu-list-title-kefu {
          padding: 5px;
          color: var(--g-black);
          span {
            font-size: 14px;
            padding-left: 3px;
          }
          
        }

        .v-recharge-kefu-item {
          padding: 10px 0 10px 15px;

          .v-recharge-kefu-item-title {
            font-size: 14px;
            color: #000;
          }

          .v-recharge-kefu-item-right {
            flex: 1;
            color: #000;
            font-size: 14px;

            .v-recharge-kefu-item-right-money {
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

        .v-recharge-kefu-upload-box {
          padding: 10px 15px;
          color: var(--g-black);
          .v-recharge-kefu-upload-title {
            font-size: 14px;
          }

          .v-recharge-kefu-upload {
            width: 100px;
            height: 100px;
            border: 1px solid #959595;
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

            .v-recharge-kefu-upload-tips {
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

    .v-recharge-kefu-pop-btn {
      color: var(--g-white);
      background-color: var(--g-main_color);
      // background-image: linear-gradient(-134deg, #2b94e6, #1882d4);
      padding: 10px 0;
      border-radius: 50px;
      font-size: 16px;
      margin: 0 15px 0px 15px;

      &.v-recharge-kefu-pop-btn-cancel {
        background: var(--g-white);
        color: var(--g-main_color);
      }
    }
  }
}
</style>