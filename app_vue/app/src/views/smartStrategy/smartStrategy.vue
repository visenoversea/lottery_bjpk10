<template>
  <div class="v_user_real g-flex-column n-bg">
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

    <div class="b-smartcon">
      <img class="b-smartcon-img" src="/images/smarttouxiang.png" alt="" />
      <div class="b-smartcon-title">
        <div style="padding-top: 6px;">smart strategy</div>
        <!-- <div>></div> -->
      </div>
      <div class="b-form-btn-box">
        <div @click="tabsClick(1)" class="b-form-btns" :class="{ 'active-btn' : tabsActive == 1 }">
          <span>price range</span>
        </div>
        <div @click="tabsClick(2)" class="b-form-btns" :class="{ 'active-btn' : tabsActive == 2 }">
          <span>smart setings</span>
        </div>
      </div>

      <div class="b-form-btn-box2">
        <div @click="tabsTwoClick(1)" class="b-form-btns2" :class="{ 'active-two-btn' : tabsTwoActive == 1 }"> <!--apiRealNameHandel-->
          <span>detals to ve released</span>
        </div>
        <div @click="tabsTwoClick(2)" class="b-form-btns2" :class="{ 'active-two-btn' : tabsTwoActive == 2 }">
          <span>order record</span>
        </div>
      </div>
      <h2 style="color: #fff; margin-left: 20px">frid type</h2>
      <div class="mart-strategy">
        <div style="opacity: 0.7;">Team Member</div>
        <div>1.35%~1.55% <i class="iconfont icon-you"></i></div>
      </div>
      <h2 style="color: #fff; margin-left: 20px; padding-bottom: 16px;">InVestment amount</h2>
      <div class="mart-sgy">
        <div class="mart-sgy-strategy">
          <div style="opacity: 0.7;">0</div>
          <div>
            <span style="margin-right: 10px;" @click="tabsThreeClick(1)" :class="{ 'active-three-btn' : tabsThreeActive == 1 }">USTD</span>
            <span @click="tabsThreeClick(2)" :class="{ 'active-three-btn' : tabsThreeActive == 2 }">ALL</span>
          </div>
        </div>
        <div>
          <van-progress :show-pivot="false" :color="'linear-gradient(to right, #C33CE8, #6029EB)'" :percentage="50" />
          <div class="progress-txt">
            <div>0%</div>
            <div>50%</div>
            <div>100%</div>
          </div>
        </div>
        <div class="mart-sgy-amount" style="display: flex;justify-content: space-between; padding: 0 10px">
          <div>Amount that can be inverted</div>
          <div style="opacity: 0.7;">0/104.7412</div>
        </div>
      </div>
        <div class="mart-strategy">
          <div style="opacity: 0.7;">Operating Time</div>
          <div style="color: #6D52FF">3-10 Minutes</div>
        </div>

      <div class="subBtn">Create Order</div>
    </div>

    <div class="v-user-real-container">
      <div class="v-real-fail" v-show="userInfo.userReal.status == 0 && userInfo.userReal.reason">
        {{ i18n.failRemarkText }}: {{ userInfo.userReal.reason }}
      </div>
      <div class="v-form">
        <div class="v-form-item">
          <div class="v-form-item-title">
            {{ i18n.realTypeText }}
          </div>
          <div @click="selectTypeClick" class="v-form-item-input">
            <input type="text" readonly v-model="form.typeText" :placeholder="i18n.realTypePlaceholerText" />
            <div class="v-form-item-input-icon">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>

        <div class="v-form-item">
          <div class="v-form-item-title">
            {{ i18n.nameText }}
          </div>
          <div class="v-form-item-input">
            <input :readonly="readonlyVal" type="text" v-model="form.name" :placeholder="i18n.namePlaceholderText" />
          </div>
        </div>

        <div class="v-form-item">
          <div class="v-form-item-title">
            {{ i18n.idCardNumText }}
          </div>
          <div class="v-form-item-input">
            <input
              :readonly="readonlyVal"
              type="text"
              v-model="form.id_card"
              :placeholder="i18n.idCardNumPlaceholderText"
            />
            <!-- <div class="v-form-item-input-icon">
            <i class="iconfont icon-you"></i>
          </div> -->
          </div>
        </div>

        <div class="v-form-img-list g-flex-align-center">
          <div class="v-form-img-item-box">
            <div class="v-form-img-item">
              <div
                v-show="!form.front_img"
                @click="frontImgUploadClick"
                class="v-form-img-item-no-img g-flex-column g-flex-align-center g-flex-justify-center"
              >
                <div class="v-form-img-item-no-img-icon">
                  <img src="/img/icon/ID_z.png" alt="" />
                </div>
                <div class="v-form-img-item-no-img-text g-flex-align-center g-flex-justify-center">
                  <span>{{ i18n.frontImgText }}</span>
                </div>
              </div>
              <div v-show="form.front_img" class="v-user-real-form-cid-item-img-have-box">
                <img @click="perviewImgClick([form.front_img])" :src="form.front_img" alt="" />
                <i v-if="!readonlyVal" @click="form.front_img = ''" class="iconfont icon-guanbi"></i>
              </div>
            </div>
          </div>

          <div class="v-form-img-item-box">
            <div class="v-form-img-item">
              <div
                v-show="!form.reverse_img"
                @click="backImgUploadClick"
                class="v-form-img-item-no-img g-flex-column g-flex-align-center g-flex-justify-center"
              >
                <div class="v-form-img-item-no-img-icon">
                  <img src="/img/icon/ID_f.png" alt="" />
                </div>
                <div class="v-form-img-item-no-img-text g-flex-align-center g-flex-justify-center">
                  <span>{{ i18n.backImgText }}</span>
                </div>
              </div>
              <div v-show="form.reverse_img" class="v-user-real-form-cid-item-img-have-box">
                <img @click="perviewImgClick([form.reverse_img])" :src="form.reverse_img" alt="" />
                <i v-if="!readonlyVal" @click="form.reverse_img = ''" class="iconfont icon-guanbi"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!readonlyVal" class="v-form-btn-box">
        <div @click="apiRealNameHandel" class="v-form-btn g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.submitText }}</span>
        </div>
      </div>
    </div>

    <!-- <SelectRadioPop :columns="typeList.list" @emitsSelectConfirm="emitsSelectConfirm" :selectVal="form.type" ref="refSelectRadioPop"/>

  <OssUpload MidrPath="/userReal/" idString="v-user-real-front-img" @emitUploadSuccess="emitUploadSuccess"
      ref="refOssUpload" />
    <OssUpload MidrPath="/userReal/" idString="v-user-real-reverse-img" @emitUploadSuccess="emitUploadSuccessSecond"
      ref="refOssUploadSecond" /> -->
  </div>
</template>

<script setup>
import { apiGetUserRealTypeList, apiRealName, apiGetUserInfo } from '@/utils/api.js'
import OssUpload from '@/components/OssUpload.vue'
import SelectRadioPop from '@/components/SelectRadioPop.vue'
import {
  dotDealWith,
  formatDate,
  copyClick,
  upDownClass,
  upDownBgClass,
  filtersZhangfu,
  kefuClick,
  upDownBgFontColorClass,
} from '@/utils/index.js'
import { reactive, ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import useStore from '@/store/index.js'
import { useRouter, useRoute } from 'vue-router'
import { ImagePreview, Toast } from 'vant'
const router = useRouter()
const route = useRoute()
// pinia状态管理仓库
const store = useStore()
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('userReal')
})

let form = reactive({
  type: '',
  typeText: '',
  country: '',
  name: '',
  id_card: '',
  front_img: '',
  reverse_img: '',
})

let userInfo = computed(() => {
  return store.userInfo
})

const readonlyVal = computed(() => {
  if (!userInfo.value.userReal.id || userInfo.value.userReal.status == 0) return false
  return true
})

async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
  if (data.info.userReal.id) {
    Object.assign(form, data.info.userReal)
    let target = typeList.list.find((item) => {
      return item.val == data.info.userReal.type
    })
    form.typeText = target.title
  } else {
    form.typeText = typeList.list[0].title
    form.type = typeList.list[0].val
  }
  // if (data.info.userReal.status == 0) {
  //   Object.assign(form, data.info.userReal)
  // }
  console.log(data)
}

async function apiGetUserRealTypeListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserRealTypeList({ code: 'realType' })
  if (!success) return
  typeList.list = data.list
  apiGetUserInfoHandel()
  console.log(data)
}

apiGetUserRealTypeListHandel()

let refSelectRadioPop = ref(null)
function selectTypeClick() {
  refSelectRadioPop.value.onShow()
}

let typeList = reactive({
  list: [],
})

function emitsSelectConfirm(item) {
  console.log('item', item)
  form.typeText = item.title
  form.type = item.val
}

const refOssUpload = ref(null)

function frontImgUploadClick() {
  refOssUpload.value.onUploadClick()
}
function emitUploadSuccess(path) {
  form.front_img = path
}

const refOssUploadSecond = ref(null)

function backImgUploadClick() {
  refOssUploadSecond.value.onUploadClick()
}

function emitUploadSuccessSecond(path) {
  form.reverse_img = path
}

function perviewImgClick(arr) {
  ImagePreview(arr)
}

// 实名认证
async function apiRealNameHandel() {
  store.loadingShow = true
  const { success, data } = await apiRealName(form)
  if (!success) return
  Toast.success(data.msg)
  setTimeout(() => {
    router.replace({ name: 'main' })
  }, 500)
  console.log(data)
}
const tabsActive = ref(1)
const tabsClick = (val) => {
  tabsActive.value = val
}
const tabsTwoActive = ref(1)
const tabsTwoClick = (val) => {
  tabsTwoActive.value = val
}
const tabsThreeActive = ref(1)
const tabsThreeClick = (val) => {
  tabsThreeActive.value = val
}
</script>

<style lang="scss">
.v_user_real {
  height: 100%;
  overflow: auto;
  // background-color: #f6f4f5;
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
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
        color: var(--g-black);
      }
    }
  }
  .v-user-real-container {
    flex: 1;
    padding-top: 46px;
    overflow: auto;
    .v-real-fail {
      padding: 14px 14px 0 14px;
      font-size: 14px;
      color: var(--g-red);
    }
    .v-form {
      margin-top: 10px;
      padding: 10px;
      .v-form-item {
        margin-bottom: 15px;
        border: 1px solid #ebd8e6;
        border-radius: 4px;
        padding: 10px;
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

      .v-form-img-list {
        flex-wrap: wrap;
        gap: 10px;
        .v-form-img-item-box {
          flex-basis: calc(50% - 5px);
          height: 142px;
          border: 1px solid #c9c9c9;
          border-radius: 3px;
          .v-form-img-item {
            height: 100%;
            width: 100%;
            .v-form-img-item-no-img {
              height: 100%;
              padding: 10px;
              .v-form-img-item-no-img-icon {
                img {
                  width: 55px;
                  height: 40px;
                }
              }
              .v-form-img-item-no-img-text {
                margin-top: 18px;
                // background: var(--g-main_color);
                // color: var(--g-white);
                width: 100%;
                height: 38px;
                // border-radius: 50px;
                font-size: 14px;
              }
            }
            .v-user-real-form-cid-item-img-have-box {
              height: 100%;
              width: 100%;
              position: relative;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }

              .iconfont {
                right: 0;
                position: absolute;
                font-size: 16px;
                color: #fff;
                background: rgba($color: #000000, $alpha: 0.6);
                padding: 5px;
                z-index: 99;
                border-radius: 0 0 0 5px;
              }
            }
          }
        }
      }
    }

    .v-form-btn-box {
      width: 100%;
      padding: 10px;
      .v-form-btn {
        width: 100%;
        height: 44px;
        background: var(--g-main_color);
        color: var(--g-white);
        border-radius: 50px;
        font-size: 14px;
      }
    }
  }

  .b-smartcon {
    .b-smartcon-img {
      width: 52px;
      height: 52px;
      margin: auto;
      display: flex;
    }
    .b-smartcon-title {
      text-align: center;
      font-weight: 600;
      font-size: 16px;
      color: #fff;
      line-height: 19px;
      // display: flex;

      // &:nth-child(1){
      //   flex: 1;
      // }
    }
    .mart-sgy {
      margin: 0 20px;
      color: #fff;
      border-radius: 15px;
      margin-bottom: 10px;
      background: #363637;
      padding: 15px;
      .mart-sgy-strategy {
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        color: #fff;
        
        .mart-strategy:nth-child(2) {
          font-weight: 600;
        }
      }

      .mart-sgy-amount {
        margin: 10px 0;
        width: 100%;
        height: 40px;
        background: #3f335b;
        border-radius: 16px 16px 16px 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        font-weight: 400;
        font-size: 13px;
        color: #fff;
        line-height: 15px;
        text-align: left;
        padding-left: 10px;
      }
    }
    .progress-txt {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      color: #fff;
      opacity: 0.7;
      font-size: 12px;
    }
    .b-form-btn-box {
      display: flex;
      justify-content: center;
      // padding: 0 70px;
      margin: 20px 20px 35px 20px;
      .b-form-btns {
        width: 50%;

        height: 19px;
        font-family: Open Sans, Open Sans;
        font-weight: 600;
        font-size: 14px;
        color: #fff;
        line-height: 16px;
        text-align: center;
      }
      .active-btn {
        color: #6D52FF;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          transform: translate(-50%, 0);
          left: 50%;
          bottom: -10px;
          width: 30px;
          height: 4px;
          background-image: linear-gradient(to right, #C33CE8, #6029EB);
        }
      }
    }

    .b-form-btn-box2 {
      display: flex;
      justify-content: center;
      // padding:0 70px;
      margin: 20px 20px 35px 20px;
      .b-form-btns2 {
        width: 100%;
        height: 44px;
        background: #5314d65c;
        color: var(--g-white);
        border-radius: 50px;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 4px;
      }
      .active-two-btn {
        background: var(--g-main_color);
      }
    }
    .mart-strategy {
      height: 70px;
      background: #363637;
      border: radius 5px;
      margin: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      color: #fff;
      border-radius: 15px;

      .mart-strategy:nth-child(2) {
        font-weight: 600;
      }
    }
    .mart-amount {
      margin: 50px 15px 15px;
      width: 94%;
      height: 32px;
      background: #eadee7;
      border-radius: 16px 16px 16px 16px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      font-weight: 400;
      font-size: 13px;
      color: #240f51;
      line-height: 15px;
      text-align: left;
      padding-left: 10px;
    }
    .subBtn {
      width: 92%;
      height: 60px;
      background: var(--g-main_color);
      color: var(--g-white);
      border-radius: 50px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
    }
  }
  .active-three-btn {
    line-height: 26px;
    background: #FFFFFF;
    border-radius: 8px;
    color: #6D52FF;
    text-align: center;
    padding: 6px 10px
  }
}
</style>
