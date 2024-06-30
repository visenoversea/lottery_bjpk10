<template>
  <div class="v_bank_card_list g-flex-column">
    <div class="v-head g-flex-justify-center g-flex-align-center">
    <div @click="$router.go(-1)" class="v-head-back-icon g-flex-align-center">
      <i class="iconfont icon-zuojiantou"></i>
    </div>
    <span class="v-title g-flex-align-center g-flex-justify-center">{{ i18n.titleText }}</span>

    <div @click="$router.push({ name: 'addbankcard'})" class="v-head-right g-flex-align-center">
      <i class="iconfont icon-jiahao1"></i>
    </div>
  </div>
    <div class="v-bank-card-list-pwd-container">
      <div class="v-bank-card-list-tips">
        {{ i18n.tipsText }}
      </div>
      <div v-show="bankCardList.list.length" class="v-bank-card-list-content">
        <div @click="selectIndex = index" v-for="(item, index) in bankCardList.list" :key="index"
          class="v-bank-card-list-item"
          :style="{ backgroundImage: `url('/img/icon/extract_bank_card.png')` }">
          <div class="v-bank-card-list-item-bank-name">
            {{ item.bank_name }}
          </div>
          <div class="v-bank-card-list-item-bank-user">
            {{ item.name }}
          </div>
          <div class="v-bank-card-list-item-bank-cardnum">
            {{ filterBankCardNumber(item.card_number) }}
          </div>
          <!-- <div @click="editClick(item)" class="v-bank-card-list-item-bank-edit">
            <img src="/img/icon/extract_bank_modify.png" alt="">
          </div> -->
          <!-- <div v-show="selectIndex == index" class="v-bank-card-list-item-bank-select">
          <img src="/img/icon/select.png" alt=""/>
        </div> -->
        </div>
      </div>

      <div v-show="!bankCardList.list.length" class="v-back-car-list-no g-flex-column g-flex-align-center">
        <img src="/img/icon/deficiency_bank_record.png" alt="" />
        <span class="v-back-car-list-no-text">{{ i18n.noListText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { filterBankCardNumber } from '@/utils/index.js'
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
  background: #F0F1F3;

  .v-head {
    height: 50px;
    width: 100%;
    line-height: 50px;
    position: fixed;
    top: 0;
    background-color: #F0F1F3;
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
        font-size: 24px;
        font-weight: 700;
      }
    }
  }

  .v-bank-card-list-pwd-container {
    flex: 1;
    overflow: auto;
    padding-bottom: 10px;
    padding-top: 50px;
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
      padding: 10px 25px;
      background: var(--g-white);
      font-size: 13px;
      color: #EE903B;
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
          background: var(--g-main_color);
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
}
</style>