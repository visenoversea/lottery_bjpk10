<template>
  <div class="v_wa_kuang_detail g-flex-column n-bg">
    <div class="new-head">
      <div @click="$router.go(-1)" class="new-head-back">
        <img src="/images/back-icon.png" alt="" />
      </div>
      <!-- <div class="v-title g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.titleText }}</span>
      </div> -->
      <!-- <div class="v-head-right g-flex-align-center">
      <i class="iconfont icon-datijilu"></i>
    </div> -->
    </div>
    <div class="new-head_title_text">{{ i18n.titleText }}</div>
    <div class="v-wakuang-detail-container g-flex-column">
      <div class="v-wakuang-detail-finance">
        <div class="v-wakuang-finance-top g-flex-align-center">
          <div class="v-wakuang-finance-top-left g-flex-align-center">
            <img :src="infoObj.obj.icon" alt="" />
            <div class="v-wakuang-finance-top-left-content">
              <p class="v-wakuang-finance-top-left-content-title">{{ infoObj.obj.title }}</p>
              <span>{{ i18n.suocangText }}</span>
            </div>
          </div>
          <div class="v-wakuang-finance-top-right g-flex-column g-flex-align-end">
            <p class="v-wakuang-finance-top-right-title">{{ i18n.rishouyiText }}</p>
            <p class="v-wakuang-finance-top-right-val" v-show="infoObj.obj.min_rate == infoObj.obj.max_rate">{{
            (Number(infoObj.obj.min_rate) * 100).toFixed(2) }}%</p>
            <p class="v-wakuang-finance-top-right-val" v-show="infoObj.obj.min_rate != infoObj.obj.max_rate">{{
            (Number(infoObj.obj.min_rate) * 100).toFixed(2) }} - {{ (Number(infoObj.obj.max_rate) * 100).toFixed(2)
              }}%</p>
          </div>
        </div>
        <div class="v-wakuang-finance-bottom g-flex-align-center">
          <div class="v-wakuang-finance-bottom-item g-flex-column g-flex-align-center">
            <div class="v-wakuang-finance-bottom-item-val">
              {{ infoObj.obj.day }}({{ i18n.dayText }})
            </div>
            <div class="v-wakuang-finance-bottom-item-title">
              {{ i18n.suocangZhouQiText }}
            </div>
          </div>
          <div class="v-wakuang-finance-bottom-item g-flex-column g-flex-align-center">
            <div class="v-wakuang-finance-bottom-item-val">
              {{ Number(infoObj.obj.min).toFixed(2) }}
            </div>
            <div class="v-wakuang-finance-bottom-item-title">
              {{ i18n.zuishaoText }}
            </div>
          </div>
          <div class="v-wakuang-finance-bottom-item g-flex-column g-flex-align-center">
            <div class="v-wakuang-finance-bottom-item-val">
              {{ infoObj.obj.max == -1 ? i18n.nolimitText : Number(infoObj.obj.max).toFixed(2) }}
            </div>
            <div class="v-wakuang-finance-bottom-item-title">
              {{ i18n.zuiduoText }}
            </div>
          </div>
        </div>
      </div>
      <div class="v-wakuang-detail-content">

        <div class="v-content-item g-flex-justify-between g-flex-align-center">
          <div class="v-content-item-desc g-flex-column g-flex-align-center" >
            <p class="v-content-item-desc-title">
              {{ i18n.dayshouyiText }}({{ infoObj.obj.currency }})
            </p>
            <p class="v-content-item-desc-val g-fsize16">
              {{ yujiShouyi }}
            </p>
          </div>
          <div class="v-content-item-desc g-flex-column g-flex-align-center">
            <p class="v-content-item-desc-title">
              {{ i18n.canuseMoneyText }}({{ infoObj.obj.currency }})
            </p>
            <p class="v-content-item-desc-val">
              {{ infoObj.obj.currency=='DCPTG'?userInfo.balance_dcptg:userInfo.balance }}
            </p>
          </div>
        </div>
        <div class="v-content-item v-content-item-card g-flex-align-center">
          <div class="v-content-item-desc g-flex-column g-flex-align-center">
            <p class="v-content-item-desc-title">
              {{ i18n.paixiTimeText }}
            </p>
            <p class="v-content-item-desc-val">
              {{ i18n.everyDayText }}
            </p>
          </div>
          <div class="v-content-item-desc g-flex-column g-flex-align-center">
            <p class="v-content-item-desc-title">
              {{ i18n.tuoguanZiJinText }}
            </p>
            <p class="v-content-item-desc-val">
              {{ i18n.daoqiFanHuiText }}
            </p>
          </div>
          <div class="v-content-item-desc g-flex-column g-flex-align-center">
            <p class="v-content-item-desc-title">
              {{ i18n.tiqianShuHuiText }}
            </p>
            <p class="v-content-item-desc-val">
              {{ (Number(infoObj.obj.bc_rate) * 100).toFixed(2) }}%
            </p>
          </div>
        </div>






      </div>

      <div  class="v-wakuang-detail-content">
        <div class="v-content-item v-content-item-money">
          <div class="v-content-item-money-title">
            {{ i18n.suocangMoneyText }}
          </div>
          <div class="v-content-item-money-input g-flex-align-center">
            <van-field v-model="form.amount" label="" label-width="0" placeholder="0.00" />
            <div class="v-content-item-money-input-right g-flex-align-center">
              <div class="v-content-item-money-input-danwei">
                {{ infoObj.obj.currency }}
              </div>
              <div @click="wakuangAllClick" class="v-content-item-money-input-all">
                {{ i18n.allText }}
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="v-wakuang-detail-btn-box">
        <div @click="apiWaKuangHandel" class="v-wakuang-detail-btn g-flex-justify-center g-flex-align-center">
          {{ i18n.shenqingRenGouText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiGetWaKuangProductItem, apiGetUserInfo, apiWaKuang } from '@/utils/api.js'
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { Toast } from 'vant';

// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('wakuangDetail')
})

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})

const route = useRoute()
const router = useRouter()
let value = ref('')

let yujiShouyi = computed(() => {
  if (!form.amount) return '0.00'
  if (!infoObj.obj.min_rate) return '0.00'
  if (infoObj.obj.min_rate == infoObj.obj.max_rate) {
    return (form.amount * Number(infoObj.obj.min_rate)).toFixed(2)
  } else {
    return ((form.amount * Number(infoObj.obj.min_rate)).toFixed(2)) + '~' + ((form.amount * Number(infoObj.obj.max_rate)).toFixed(2))
  }
})

let userInfo = computed(() => {
  return store.userInfo
})

// 获取用户信息
async function apiGetUserInfoHandel() {
  const { success, data } = await apiGetUserInfo()
  if (!success) return
  store.setUserInfo(data.info)
}

apiGetUserInfoHandel()

let form = reactive({
  id: route.query.id,
  amount: ''
})

let infoObj = reactive({
  obj: {}
})

apiGetWaKuangProductItemHandel()

async function apiGetWaKuangProductItemHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetWaKuangProductItem({ id: form.id })
  if (!success) return
  infoObj.obj = data.info
  console.log(data)
}

function wakuangAllClick() {
  if( infoObj.obj.currency=='DCPTG'){
    form.amount = userInfo.value.balance_dcptg
  } else {
    form.amount = userInfo.value.balance
  }

}

async function apiWaKuangHandel() {
  store.loadingShow = true
  const { success, data } = await apiWaKuang(form)
  if (!success) return
  Toast(data.msg)
  router.push({ name: 'wakuang' })
  console.log(data)
}
</script>

<style lang='scss'>
.v_wa_kuang_detail {
  height: 100%;
  overflow: auto;
  .v-head {
    height: 50px;
    width: 100%;
    line-height: 50px;
    position: fixed;
    top: 0;
    background: var(--g-main_color);
    font-size: 14px;
    color: var(--g-white);
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
  .v-wakuang-detail-container {
    flex: 1;
    overflow: auto;
    // padding-top: 50px;
    
    // margin: 15px;
    .v-wakuang-detail-finance {
      // background: var(--g-main_color);
      background: linear-gradient( 90deg, #f7b200 0%, #f97700 100%);
      margin: 15px;
      border-radius: 15px;
      .v-wakuang-finance-top {
        padding: 20px 15px;
        position: relative;

        .v-wakuang-finance-top-left {
          flex: 1;

          img {
            border-radius: 5px;
            width: 55px;
          }

          .v-wakuang-finance-top-left-content {
            padding-left: 10px;
            color: #fff;
            font-size: 16px;

            .v-wakuang-finance-top-left-content-title {
              font-size: 18px;
              padding-bottom: 5px;
            }
          }
        }

        .v-wakuang-finance-top-right {
          color: #fff;

          .v-wakuang-finance-top-right-title {
            font-size: 16px;
          }

          .v-wakuang-finance-top-right-val {
            font-size: 18px;
            color: #FFCB71;
            padding-top: 5px;
          }
        }
      }

      .v-wakuang-finance-bottom {
        padding: 15px 0;
        // background: #5844c7;

        .v-wakuang-finance-bottom-item {
          flex: 1;

          .v-wakuang-finance-bottom-item-val {
            font-size: 18px;
            color: #fff;
          }

          .v-wakuang-finance-bottom-item-title {
            font-size: 13px;
            padding-top: 5px;
            color: #fff;
          }
        }
      }

    }

    .v-wakuang-detail-content {
      flex: 1;
      padding: 15px;
      background: #2b2b2c;
      border-radius: 12px;
      .v-content-item {
        // margin-top: 15px;
        padding: 15px;
        // border-radius: 5px;
        // background-color: #fff;
        // box-shadow: 0px 0px 1.333333vw #d3d3d3;
        &:nth-of-type(1) {
          margin-top: 0;
        }

        .v-content-item-desc {
          flex: 1;

          .v-content-item-desc-title {
            color: #fff;
            font-size: 14px;
          }

          .v-content-item-desc-val {
            padding-top: 10px;
            font-size: 14px;
            color: #fff;
          }
        }

        &.v-content-item-money {
          .v-content-item-money-title {
            font-size: 15px;
            color: #fff;
          }

          .v-content-item-money-input {
            margin-top: 15px;
            padding: 8px 15px;
            border: 1px solid #e2e2e2;
            border-radius: 5px;
            position: relative;

            .van-cell {
              padding: 0;

              &::after {
                display: none;
              }

              .van-cell__value {
                .van-field__body {
                  input {
                    color: #111;
                    &::placeholder {
                      color: #9ba7b2;
                    }
                  }
                }
              }
            }

            .v-content-item-money-input-right {
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);

              .v-content-item-money-input-danwei {
                color: #9ba7b2;
                font-size: 14px;
                position: relative;
                padding-right: 10px;

                &::after {
                  position: absolute;
                  content: "";
                  height: 90%;
                  background-color: #EAEAEA;
                  width: 1px;
                  right: 0px;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }

              .v-content-item-money-input-all {
                padding: 0 10px;
                font-size: 14px;
              }
            }
          }
        }
      }
    }

    .v-wakuang-detail-btn-box {
      width: 100%;
      position: absolute;
      bottom: 10px;
      padding: 15px;

      .v-wakuang-detail-btn {
        background: #5314D6;
        height: 44px;
        font-size: 14px;
        border-radius: 50px;
        color: #fff;
      }
    }
  }
}
</style>