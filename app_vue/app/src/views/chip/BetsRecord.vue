<template>
  <div class="s_lottery_history">
    <div class="v-history-head g-flex-align-center">
      <div
        @click="$router.go(-1)"
        class="v-history-head-left g-flex-align-center"
      >
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <div
        class="v-history-head-title g-flex-align-center g-flex-justify-center"
      >
        {{ i18n.betsRecord }}
      </div>
    </div>
    <div class="history-list">
      <van-list
        v-show="codeList.length"
        class="v-list"
        v-model:loading="loading"
        :finished="finished"
        :loading-text="i18n2.loadingText"
        :finished-text="i18n2.finishText"
        @load="onLoad"
        :immediate-check="false"
      >
        <div
          @click="orderItemClick(item)"
          v-for="(item, index) in codeList"
          :key="index"
          class="v-list-item"
        >
          <div
            class="v-list-item-top g-flex-align-center g-flex-justify-between"
          >
            <div class="lottery-name">{{ item.name }}</div>
            <div class="lottery-status">{{ item.statusDesc }}</div>
          </div>
          <div
            class="v-list-item-top g-flex-align-center g-flex-justify-between"
          >
            <div class="lottery-name">
              {{ item.lottery_group_name }}-{{ item.bet_no }}
            </div>
            <div class="lottery-status">{{ item.bet_amount_mop }}</div>
          </div>
          <div
            class="v-list-item-top g-flex-align-center g-flex-justify-between"
          >
            <div class="lottery-name">{{ i18n.rate }}:{{ item.odds }}</div>
            <div class="lottery-status" :class="inoutClass(item.win_amount_mop)">
              {{
                Number(item.win_amount_mop) >= 0
                  ? "+" + item.win_amount_mop
                  : item.win_amount_mop
              }}
              {{ item.currency }}
            </div>
          </div>
          <div
            class="v-list-item-top g-flex-align-center g-flex-justify-between"
          >
            <div class="lottery-name">
              {{ item.open_expect }}
            </div>
            <div class="lottery-name">
              {{ formatDate(item.create_time, "MM/DD HH:mm") }}
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script setup>
import { apiBetHistory } from "@/utils/api.js";
import { reactive, ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { inoutClass, formatDate } from "@/utils/index.js";
import useStore from "@/store/index.js";
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("chip");
});
const i18n2 = computed(() => {
  return i18nObj.tm("gongyong");
});

const route = useRoute();
const lotteryInfo = ref({});
const codeList = ref([]);
const id = ref();
const query = ref({
  page: 1,
  limit: 15,
});
const totalLength = ref(0);
const getLists = async () => {
  store.loadingShow = true;
  const { success, data } = await apiBetHistory(query.value);
  if (!success) return;
  codeList.value = data.list;
  totalLength.value = data.total;
};
onMounted(() => {
  id.value = route.query.id;
  getLists();
});
</script>

<style lang='scss' scoped>
.s_lottery_history {
  width: 100%;
  min-height: 100%;
  background: rgb(42, 42, 42);
  .v-history-head {
    height: 50px;
    background: #1e1c38;
    position: relative;

    .v-history-head-left {
      position: absolute;
      height: 100%;
      left: 0;
      padding-left: 15px;

      .iconfont {
        font-size: 26px;
        color: var(--g-white);
        font-weight: 700;
      }
    }

    .v-history-head-title {
      font-size: 16px;
      height: 100%;
      font-weight: 700;
      color: var(--g-white);
      flex: 1;
      text-align: center;
    }

    .v-history-head-right {
      color: #fff;
      position: absolute;
      right: 10px;
    }
  }
  .history-list {
    color: #fff;
    .v-list-item {
      padding: 5px 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      .v-list-item-top {
        height: 24px;
      }
    }
  }
}
.number01 {
  background: #fff401;
}
.number02 {
  background: #0b99e1;
}
.number03 {
  background: #4b4b4b;
}
.number04 {
  background: #ff7000;
}
.number05 {
  background: #7ff9f9;
}
.number06 {
  background: #5135fc;
}
.number07 {
  background: #bb6d6d;
}
.number08 {
  background: #d80404;
}
.number09 {
  background: #770700;
}
.number10 {
  background: #13980e;
}
</style>