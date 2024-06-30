<template>
  <div class="v_add_bank_card g-flex-column">
    <div class="v-head g-flex-justify-center g-flex-align-center">
    <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
      <i class="iconfont icon-zuojiantou"></i>
    </div>
    <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

    <!-- <div @click="$router.push({ name: 'addbankcard'})" class="v-head-right g-flex-align-center">
      <i class="iconfont icon-jiahao1"></i>
    </div> -->
  </div>
    <div class="v-add-bank-card-container">
      <div class="v-add-bank-card-form">
        <!-- <div class="v-add-bank-card-form-item">
        <div class="v-add-bank-card-form-item-title">国家/地区</div>
        <div class="v-add-bank-card-form-item-input">
          <van-field v-model="value" label="" label-width="0" placeholder="请输入国家/地区" />
          <div class="v-add-bank-card-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div>
        </div>
      </div> -->

        <!-- <div class="v-add-bank-card-form-item">
        <div class="v-add-bank-card-form-item-title">法币</div>
        <div class="v-add-bank-card-form-item-input">
          <van-field readonly v-model="value2" label="" label-width="0" placeholder="请选择法币类型" />
          <div class="v-add-bank-card-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div>
        </div>
      </div> -->

        <div class="v-add-bank-card-form-item">
          <div class="v-add-bank-card-form-item-title">{{ i18n.bankNameText }}</div>
          <div class="v-add-bank-card-form-item-input">
            <van-field v-model="form.bank_name" label="" label-width="0" :placeholder="i18n.bankPlaceholderText" />
            <!-- <div class="v-add-bank-card-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div> -->
          </div>
        </div>

        <div class="v-add-bank-card-form-item">
          <div class="v-add-bank-card-form-item-title">{{ i18n.cardNumberText }}</div>
          <div class="v-add-bank-card-form-item-input">
            <van-field v-model="form.card_number" label="" label-width="0"
              :placeholder="i18n.cardNumberPlaceholderText" />
            <!-- <div class="v-add-bank-card-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div> -->
          </div>
        </div>

        <div class="v-add-bank-card-form-item">
          <div class="v-add-bank-card-form-item-title">{{ i18n.nameText }}</div>
          <div class="v-add-bank-card-form-item-input">
            <van-field v-model="form.name" label="" label-width="0" :placeholder="i18n.namePlaceholderText" />
            <!-- <div class="v-add-bank-card-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div> -->
          </div>
        </div>

        <div class="v-add-bank-card-form-item">
          <div class="v-add-bank-card-form-item-title">{{ i18n.wangdianText }}</div>
          <div class="v-add-bank-card-form-item-input">
            <van-field v-model="form.branch" label="" label-width="0" :placeholder="i18n.wangdianPlaceholderText" />
            <!-- <div class="v-add-bank-card-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div> -->
          </div>
        </div>

        <div class="v-add-bank-card-form-item">
          <div class="v-add-bank-card-form-item-title">{{ i18n.zhihangCodeText }}</div>
          <div class="v-add-bank-card-form-item-input">
            <van-field v-model="form.bank_code" label="" label-width="0"
              :placeholder="i18n.zhihangCodePlaceholderText" />
            <!-- <div class="v-add-bank-card-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div> -->
          </div>
        </div>

        <!-- <div class="v-add-bank-card-form-item">
        <div class="v-add-bank-card-form-item-title">其他信息(选填)</div>
        <div class="v-add-bank-card-form-item-input">
          <van-field v-model="form.remark" label="" label-width="0" placeholder="添加备注或其他信息内容" />
          <div class="v-add-bank-card-form-item-input-down-img">
            <img src="/img/icon/user_public_down.png" alt=""/>
          </div>
        </div>
      </div> -->

        <div class="v-add-bank-card-form-btn-list g-flex-justify-between g-flex-align-center">
          <div @click="delClick" v-show="form.id"
            class="v-add-bank-card-form-btn-jiebang v-add-bank-card-form-btn g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.jiebangText }}</span>
          </div>
          <div @click="apiEditBankHandel" v-show="form.id"
            class="v-add-bank-card-form-btn g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.changeText }}</span>
          </div>
          <div @click="apiAddBankHandel" v-show="!form.id"
            class="v-add-bank-card-form-btn v-add-bank-card-form-btn-submit g-flex-align-center g-flex-justify-center">
            <span>{{ i18n.submitText }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { apiAddBank, apiGetBankInfo, apiEditBank, apiDeleteBank } from '@/utils/api.js'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from "vue-i18n";
let router = useRouter()
let route = useRoute()
// pinia状态管理仓库
const store = useStore()


const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('addBankCard')
})


let form = reactive({
  id: route.query.id ? route.query.id : '',
  bank_name: '',
  branch: '',
  bank_code: '',
  name: '',
  card_number: '',
  remark: ''
})

async function apiGetBankInfoHandel() {
  const { success, data } = await apiGetBankInfo({ id: form.id })
  if (!success) return
  Object.assign(form, data.info)
}

if (form.id) {
  apiGetBankInfoHandel()
}

async function apiEditBankHandel() {
  store.loadingShow = true
  const { success, data } = await apiEditBank(form)
  if (!success) return
  Toast.success(data.msg)
  setTimeout(() => {
    router.back(-1)
  }, 500);
}




async function apiAddBankHandel() {
  store.loadingShow = true
  const { success, data } = await apiAddBank(form)
  if (!success) return
  Toast.success(data.msg)
  setTimeout(() => {
    router.back(-1)
  }, 500);
}

function delClick() {
  Dialog.confirm({ title: i18n.value.delTitleText, message: i18n.value.delTipsText }).then(() => { apiDeleteBankHandel() }).catch(() => { });
}

async function apiDeleteBankHandel() {
  const { success, data } = await apiDeleteBank({ id: form.id })
  if (!success) return
  Toast.success(data.msg)
  setTimeout(() => {
    router.back(-1)
  }, 500);
  console.log(data)
}

</script>

<style lang='scss'>
.v_add_bank_card {
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

  .v-add-bank-card-container {
    flex: 1;
    overflow: auto;
    padding-top: 50px;
    .v-title {  
      padding: 20px 15px 15px 15px;
      font-size: 22px;
      line-height: 26px;
      color: #333;
      font-weight: 600;
    }

    .v-add-bank-card-form {
      padding: 15px;

      .v-add-bank-card-form-item {
        margin-top: 18px;
        &:nth-of-type(1) {
          margin-top: 0;
        }

        .v-add-bank-card-form-item-title {
          font-size: 16px;
          color: #333;
          font-weight: 700;
        }

        .v-add-bank-card-form-item-input {
          background-color: #f2f4f7;
          margin-top: 10px;
          border: 1px solid #efefef;
          padding: 10px;
          border-radius: 5px;
          position: relative;

          .v-add-bank-card-form-item-input-down-img {
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
            background-color: #f2f4f7;
            &::after {
              display: none;
            }

            .van-cell__value {
              .van-field__body {
                input {
                  font-size: 14px;
                  font-weight: 600;
                  color: #333;
                  &::placeholder {
                    color: #7D919D;
                    font-weight: 700;
                    font-size: 14px;
                  }
                }
              }
            }
          }
        }

        .v-add-bank-card-form-cid-list {
          .v-add-bank-card-form-cid-item {
            margin-top: 20px;
            height: 160px;
            position: relative;
            background: #eff2f2;
            padding: 15px;

            .v-add-bank-card-form-cid-item-img {
              position: relative;

              img {
                height: 100px;
              }

              .v-add-bank-card-form-cid-item-img-title {
                font-size: 16px;
                color: #8b969b;
                text-align: center;
                padding-top: 10px;
              }
            }

            .v-add-bank-card-form-cid-item-out {
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

            .v-add-bank-card-form-cid-item-img-have {
              .v-add-bank-card-form-cid-item-img-have-box {
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

              .v-add-bank-card-form-cid-item-img-have-title {
                font-size: 16px;
                color: #8b969b;
                padding-top: 10px;
              }

            }
          }
        }
      }

      .v-add-bank-card-form-btn-list {
        .v-add-bank-card-form-btn {
          margin-top: 20px;
          background: var(--g-main_color);
          color: var(--g-white);
          border-radius: 6px;
          height: 40px;
          width: 55%;
          font-size: 14px;

          &.v-add-bank-card-form-btn-jiebang {
            width: 40%;
            background: #E1E1E1;
            color: #32313D;
          }

          &.v-add-bank-card-form-btn-submit {
            width: 100%;
          }
        }
      }

    }
  }
}
</style>