<template>
  <div class="v_bank_card_list g-flex-column n-bg">
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
    <div class="v-bank-card-list-pwd-container">
      <div class="v-bank-card-list-tips">
        {{ i18n.tipsText }}
      </div>
      <div v-show="bankCardList.list.length" class="v-bank-card-list-content">
        <div @click="selectIndex = index" v-for="(item, index) in bankCardList.list" :key="index"
          class="v-bank-card-list-item"
          :style="{ backgroundImage: `url('/images/Rectangle1.png')` }">
          <div class="v-bank-card-list-item-bank-name">
            {{ item.bank_name }}
          </div>
          <div class="v-bank-card-list-item-bank-user">
            {{ item.name }}
          </div>
          <div class="v-bank-card-list-item-bank-cardnum">
            {{ item.card_number }}
          </div>
          <div @click="editClick(item)" class="v-bank-card-list-item-bank-edit">
            <img src="/img/icon/extract_bank_modify.png" alt="">
          </div>
          <!-- <div v-show="selectIndex == index" class="v-bank-card-list-item-bank-select">
          <img src="/img/icon/select.png" alt="" />
        </div> -->
        </div>
      </div>

      <div v-show="!bankCardList.list.length" class="v-back-car-list-no g-flex-column g-flex-align-center">
        <img src="/img/icon/empty-image.png" alt="" />
        <span class="v-back-car-list-no-text">{{ i18n.noListText }}</span>
      </div>
    </div>
    <div class="v-form-btn-box">
      <div @click="$router.push({ name: 'addbankcard' })" class="v-form-btn g-flex-align-center g-flex-justify-center">
        <span>{{ i18n.addBankCardText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import useStore from '@/store/index.js'
import { apiGetBankList } from '@/utils/api.js'
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
let router = useRouter()
let route = useRoute()
// pinia状态管理仓库
const store = useStore()
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('bankCardList')
})


let selectIndex = ref(0)
let bankCardList = reactive({ list: [] })
async function apiGetBankListHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetBankList()
  if (!success) return
  bankCardList.list = data.list
  console.log(data)
}
apiGetBankListHandel()

function editClick(item) {
  router.push({ name: 'addbankcard', query: { id: item.id } })
}


</script>

<style lang='scss'>
.v_bank_card_list {
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

  .v-bank-card-list-pwd-container {
    flex: 1;
    overflow: auto;
    padding-bottom: 10px;
    padding-top: 46px;
    position: relative;
    .v-title {
      padding: 20px 15px 15px 15px;
      font-size: 22px;
      line-height: 26px;
      color: #333;
      font-weight: 600;

      img {
        padding: 5px 5px;
        height: 28px;
      }
    }

    .v-bank-card-list-tips {
        margin: 10px 15px;
        padding: 10px;
        border-radius: 6px;
        // background: var(--g-main_color);
        background: url(../images/Rectangle1.png) !important;
        background-size: 100% 100% !important;
        font-size: 13px;
        color: var(--g-white);
        line-height: 20px;
      }

    .v-bank-card-list-content {
      padding: 15px;

      .v-bank-card-list-item {
        margin-top: 15px;
        position: relative;
        background-position: 100% 100%;
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 100px;
        padding: 15px;
        border-radius: 4px;
        color: #fff;
        font-size: 16px;

        &:nth-of-type(1) {
          margin-top: 0;
        }

        .v-bank-card-list-item-bank-name {
          font-size: 16px;
        }

        .v-bank-card-list-item-bank-user {
          padding-top: 10px;
        }

        .v-bank-card-list-item-bank-user {
          padding-top: 10px;
        }

        .v-bank-card-list-item-bank-cardnum {
          font-weight: 600;
          padding-top: 10px;
        }

        .v-bank-card-list-item-bank-edit {
          position: absolute;
          padding: 10px;
          right: 0;
          bottom: 0;

          img {
            width: 18px;
          }
        }

        .v-bank-card-list-item-bank-select {
          position: absolute;
          top: 0;
          right: 0;
          background: #335ee3;
          padding: 5px;
          border-radius: 0 0 0 15px;

          img {
            width: 18px;
          }
        }
      }
    }

    .v-back-car-list-no {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);

      img {
        width: 80px;
      }

      .v-back-car-list-no-text {
        padding-top: 15px;
        color: #AAB1B6;
        font-size: 14px;
      }
    }
  }

  .v-form-btn-box {
    width: 100%;
    padding: 10px;
    padding-bottom: 30px;
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
</style>