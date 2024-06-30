<template>
  <div class="v_user_real g-flex-column">
    <div class="v-head g-flex-justify-center g-flex-align-center">
      <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

      <!-- <div @click="$router.push({ name: 'rechargehistory'})" class="v-head-right g-flex-align-center">
     <i class="iconfont icon-datijilu"></i>
   </div> -->
    </div>
    <div class="v-user-real-container">
      <div class="v-licai-head g-flex-align-center g-flex-justify-center">
        <div class="v-licai-head-list g-flex-align-center">
          <div @click="navItemClick(1)" :class="form.type == 1 ? 'active' : ''"
            class="v-licai-head-item g-flex-justify-center g-flex-align-center">
            <div class="v-licai-head-item-title">{{ i18n.shengdengZhengText }}</div>
          </div>
          <div @click="navItemClick(2)" :class="form.type == 2 ? 'active' : ''"
            class="v-licai-head-item g-flex-align-center g-flex-justify-center">
            <div class="v-licai-head-item-title">{{ i18n.huzhaoText }}</div>
          </div>
          <div @click="navItemClick(3)" :class="form.type == 3 ? 'active' : ''"
            class="v-licai-head-item g-flex-align-center g-flex-justify-center">
            <div class="v-licai-head-item-title">{{ i18n.jiashizhengText }}</div>
          </div>
        </div>
      </div>
      <div class="v-real-fail" v-show="userInfo.userReal.status == 0 && userInfo.userReal.reason">
          {{ i18n.failRemarkText }}: {{ userInfo.userReal.reason }}
      </div>
      <div class="v-user-real-form">
        <!-- <div class="v-user-real-tips">
          {{ i18n.realTypeTips }}
        </div> -->
        <!-- <div class="v-user-real-form-item">
        <div class="v-user-real-form-item-title">国家/地区</div>
        <div class="v-user-real-form-item-input">
          <van-field v-model="form.country" label="" label-width="0" placeholder="请输入国家/地区" />
          <div class="v-user-real-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div>
        </div>
      </div> -->

        <!-- <div class="v-user-real-form-item">
        <div class="v-user-real-form-item-title">证件类型</div>
        <div class="v-user-real-form-item-input">
          <van-field readonly v-model="value2" label="" label-width="0" placeholder="请选择证件类型" />
          <div class="v-user-real-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div>
        </div>
      </div> -->

        <!-- <div class="v-user-real-form-item">
        <div class="v-user-real-form-item-title">性别</div>
        <div class="v-user-real-form-item-input">
          <van-field readonly v-model="value" label="" label-width="0" placeholder="请选择性别" />
          <div class="v-user-real-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div>
        </div>
      </div> -->

        <!-- <div class="v-user-real-form-item">
        <div class="v-user-real-form-item-title">出生日期</div>
        <div class="v-user-real-form-item-input">
          <van-field readonly v-model="value" label="" label-width="0" placeholder="请选择出生日期" />
          <div class="v-user-real-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div>
        </div>
      </div> -->

        <div class="v-user-real-form-item">
          <div class="v-user-real-form-item-title">{{ i18n.nameText }}</div>
          <div class="v-user-real-form-item-input">
            <van-field :readonly="readonlyVal" v-model="form.name" label="" label-width="0" :placeholder="i18n.namePlaceholderText" />
            <!-- <div class="v-user-real-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div> -->
          </div>
        </div>


        <div class="v-user-real-form-item">
          <div class="v-user-real-form-item-title">{{ i18n.idCardNumText }}</div>
          <div class="v-user-real-form-item-input">
            <van-field :readonly="readonlyVal"  v-model="form.id_card" label="" label-width="0" :placeholder="i18n.idCardNumPlaceholderText" />
            <!-- <div class="v-user-real-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div> -->
          </div>
        </div>


        <div class="v-user-real-form-item">
          <div class="v-user-real-form-item-title">{{ i18n.idImgText }}</div>
          <div class="v-user-real-form-cid-list">
            <div class="v-user-real-form-cid-item">
              <div @click="frontImgUploadClick" v-show="!form.front_img"
                class="v-user-real-form-cid-item-img g-flex-column g-flex-align-center g-flex-justify-center">
                <img src="/img/icon/user_identity_card1.png" alt="" />
                <p class="v-user-real-form-cid-item-img-title">{{ i18n.frontImgText }}</p>
              </div>

              <div @click="frontImgUploadClick" v-show="!form.front_img" class="v-user-real-form-cid-item-out">
                <img src="/img/icon/user_identity_corner.png" alt="" />
              </div>

              <div v-show="form.front_img"
                class="v-user-real-form-cid-item-img-have g-flex-column g-flex-align-center g-flex-justify-center">
                <div class="v-user-real-form-cid-item-img-have-box">
                  <img @click="perviewImgClick([form.front_img])" :src="form.front_img" alt="" />
                  <i v-if="!readonlyVal" @click="form.front_img = ''" class="iconfont icon-guanbi"></i>
                </div>
                <span class="v-user-real-form-cid-item-img-have-title">{{ i18n.frontImgText }}</span>
              </div>
            </div>

            <div class="v-user-real-form-cid-item">
              <div @click="backImgUploadClick" v-show="!form.reverse_img"
                class="v-user-real-form-cid-item-img g-flex-column g-flex-align-center g-flex-justify-center">
                <img src="/img/icon/user_identity_card2.png" alt="" />
                <p class="v-user-real-form-cid-item-img-title">{{ i18n.backImgText }}</p>
              </div>

              <div @click="backImgUploadClick" v-show="!form.reverse_img" class="v-user-real-form-cid-item-out">
                <img src="/img/icon/user_identity_corner.png" alt="" />
              </div>

              <div v-show="form.reverse_img"
                class="v-user-real-form-cid-item-img-have g-flex-column g-flex-align-center g-flex-justify-center">
                <div class="v-user-real-form-cid-item-img-have-box">
                  <img @click="perviewImgClick([form.reverse_img])" :src="form.reverse_img" alt="" />
                  <i v-if="!readonlyVal" @click="form.reverse_img = ''" class="iconfont icon-guanbi"></i>
                </div>
                <span class="v-user-real-form-cid-item-img-have-title">{{ i18n.backImgText }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!readonlyVal" @click="apiRealNameHandel" class="v-user-real-form-btn g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.sureBtnText }}</span>
        </div>
      </div>
    </div>
    <OssUpload MidrPath="/userReal/" idString="v-user-real-front-img" @emitUploadSuccess="emitUploadSuccess"
      ref="refOssUpload" />
    <OssUpload MidrPath="/userReal/" idString="v-user-real-reverse-img" @emitUploadSuccess="emitUploadSuccessSecond"
      ref="refOssUploadSecond" />
  </div>
</template>

<script setup>
import OssUpload from '@/components/OssUpload.vue'
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRoute, useRouter } from 'vue-router';
import { apiGetUserInfo, apiRealName } from '@/utils/api.js'
import { Toast } from 'vant';
import { ImagePreview } from 'vant';
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('userReal')
})

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})


let router = useRouter()

let form = reactive({
  type: 1,
  name: '',
  id_card: '',
  front_img: '',
  reverse_img: ''
})

function navItemClick(val) {
  if(readonlyVal.value) return
  form.type = val
}

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
  }
  // if (data.info.userReal.status == 0) {
  //   Object.assign(form, data.info.userReal)
  // }
  console.log(data)
}

apiGetUserInfoHandel()

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

function perviewImgClick(arr) {
  ImagePreview(arr)
}
</script>

<style lang='scss'>
.v_user_real {
  height: 100%;
  overflow: auto;
  background: #fff;

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

  .v-user-real-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-licai-head {
      height: 60px;
      width: 100%;
      z-index: 9;
      background-color: var(--g-white);

      .v-licai-head-list {
        border: 1px solid #cfd1d0;
        height: 35px;
        border-radius: 4px;
        overflow: hidden;

        .v-licai-head-item {
          height: 100%;
          width: 116px;
          padding: 0 5px;
          font-weight: 500;
          color: #333;
          font-size: 16px;

          .v-licai-head-item-title {
            @include textManyOverflow()
          }

          &.active {
            background-color: var(--g-main_color);
            color: var(--g-white);
            border-radius: 4px;
          }
        }
      }
    }
    .v-real-fail {
      padding-left: 15px;
      font-size: 14px;
      padding-top: 10px;
      color: var(--g-red);
    }
    .v-user-real-form {
      padding: 15px;
      .v-user-real-tips {
        font-size: 14px;
        font-weight: 700;
        color: rgb(250, 72, 72);
        padding-bottom: 10px;
      }
      .v-user-real-form-item {
        margin-top: 18px;

        &:nth-of-type(1) {
          margin-top: 0;
        }

        .v-user-real-form-item-title {
          font-size: 14px;
          color: #333;
        }

        .v-user-real-form-item-input {
          margin-top: 10px;
          border: 1px solid #efefef;
          padding: 10px;
          border-radius: 5px;
          position: relative;

          .v-user-real-form-item-input-down-img {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);

            img {
              width: 14px;
            }
          }

          .van-cell {
            padding: 0;

            &::after {
              display: none;
            }

            .van-cell__value {
              .van-field__body {
                color: #111;

                input {
                  font-size: 14px;
                  font-weight: 600;

                  &::placeholder {
                    font-weight: normal;
                  }
                }
              }
            }
          }
        }

        .v-user-real-form-cid-list {
          .v-user-real-form-cid-item {
            margin-top: 20px;
            height: 160px;
            position: relative;
            background: #eff2f2;
            padding: 15px;

            .v-user-real-form-cid-item-img {
              position: relative;

              img {
                height: 100px;
              }

              .v-user-real-form-cid-item-img-title {
                font-size: 16px;
                color: #8b969b;
                text-align: center;
                padding-top: 10px;
              }
            }

            .v-user-real-form-cid-item-out {
              position: absolute;
              top: 50%;
              left: 15px;
              right: 15px;
              transform: translateY(-50%);

              img {
                width: 100%;
                height: 130px;
                object-fit: contain;
              }
            }

            .v-user-real-form-cid-item-img-have {
              .v-user-real-form-cid-item-img-have-box {
                position: relative;

                img {
                  height: 100px;
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

              .v-user-real-form-cid-item-img-have-title {
                font-size: 16px;
                color: #8b969b;
                padding-top: 10px;
              }

            }
          }
        }
      }

      .v-user-real-form-btn {
        margin-top: 20px;
        background: var(--g-main_color);
        color: var(--g-white);
        border-radius: 6px;
        height: 40px;
        font-size: 14px;
      }
    }
  }
}
</style>