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
  <div class="new-head_title_text">{{ i18n.titleText }}</div>
  <div class="v-user-real-container">
    <div class="v-real-fail" v-show="userInfo.userReal.status == 0 && userInfo.userReal.reason">
        {{ i18n.failRemarkText }}: {{ userInfo.userReal.reason }}
    </div>
    <div class="v-form">
      <!-- <div class="v-form-item">
        <div class="v-form-item-title">
          国家
        </div>
        <div class="v-form-item-input">
          <input type="text" v-model="form.country" :placeholder="'请输入国家'">
        </div>
      </div> -->

      <div class="v-form-item">
        <div class="v-form-item-title">
          {{ i18n.realTypeText }}
        </div>
        <div @click="selectTypeClick" class="v-form-item-input">
          <input type="text" readonly v-model="form.typeText" :placeholder="i18n.realTypePlaceholerText">
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
          <input :readonly="readonlyVal" type="text" v-model="form.name" :placeholder="i18n.namePlaceholderText">
        </div>
      </div>

      <div class="v-form-item">
        <div class="v-form-item-title">
          {{ i18n.idCardNumText }}
        </div>
        <div class="v-form-item-input">
          <input :readonly="readonlyVal" type="text" v-model="form.id_card" :placeholder="i18n.idCardNumPlaceholderText">
          <!-- <div class="v-form-item-input-icon">
            <i class="iconfont icon-you"></i>
          </div> -->
        </div>
      </div>

      <div class="v-form-img-list g-flex-align-center">
        <div class="v-form-img-item-box">
          <div class="v-form-img-item">
            <div v-show="!form.front_img" @click="frontImgUploadClick" class="v-form-img-item-no-img g-flex-column g-flex-align-center g-flex-justify-center">
              <div class="v-form-img-item-no-img-icon">
                <img src="/img/icon/ID_z.png" alt=""/>
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
            <div v-show="!form.reverse_img" @click="backImgUploadClick" class="v-form-img-item-no-img g-flex-column g-flex-align-center g-flex-justify-center">
              <div class="v-form-img-item-no-img-icon">
                <img src="/img/icon/ID_f.png" alt=""/>
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

  <SelectRadioPop :columns="typeList.list" @emitsSelectConfirm="emitsSelectConfirm" :selectVal="form.type" ref="refSelectRadioPop"/>

  <OssUpload MidrPath="/userReal/" idString="v-user-real-front-img" @emitUploadSuccess="emitUploadSuccess"
      ref="refOssUpload" />
    <OssUpload MidrPath="/userReal/" idString="v-user-real-reverse-img" @emitUploadSuccess="emitUploadSuccessSecond"
      ref="refOssUploadSecond" />
</div>
</template>

<script setup>
import { apiGetUserRealTypeList, apiRealName, apiGetUserInfo } from '@/utils/api.js'
import OssUpload from '@/components/OssUpload.vue'
import SelectRadioPop from '@/components/SelectRadioPop.vue'
import { dotDealWith, formatDate, copyClick, upDownClass, upDownBgClass, filtersZhangfu, kefuClick, upDownBgFontColorClass } from "@/utils/index.js";
import {
  reactive,
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";
import { useI18n } from "vue-i18n";
import useStore from "@/store/index.js";
import { useRouter, useRoute } from "vue-router";
import { ImagePreview, Toast } from 'vant';
const router = useRouter();
const route = useRoute(); 
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("userReal");
});

let form = reactive({
  type: '',
  typeText: '',
  country: '',
  name: '',
  id_card: '',
  front_img: '',
  reverse_img: ''
})

let userInfo = computed(() => {
  return store.userInfo
})

const readonlyVal = computed(() => {
  if((!userInfo.value.userReal.id) || userInfo.value.userReal.status == 0) return false
  return true
})

async function apiGetUserInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
  if (data.info.userReal.id) {
    Object.assign(form, data.info.userReal)
    let target = typeList.list.find(item => {
      return item.val == data.info.userReal.type
    })
    form.typeText = target.title
  }else {
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
  if(!success) return
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
  list: []
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
  }, 500);
  console.log(data)
}
</script>

<style lang='scss'>
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
    // background-color: #f6f4f5;
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
        color: #fff;
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
          color: #fff;
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
            color: #fff;
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
                color: #fff;
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
        background: #5314D6;
        color: var(--g-white);
        border-radius: 50px;
        font-size: 14px;
      }
    }
   
  }
}
</style>