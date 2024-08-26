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
        {{ i18n.lotteryHistory }}
      </div>
      <div v-if="false" class="v-history-head-right" @click="$router.push('/chip')">{{ i18n.betNow }}</div>
    </div>
    <div class="history-list">
      <div class="history-title g-flex-align-center g-flex-justify-center">
        {{ lotteryInfo.name }}
      </div>
      <div
        class="history-item g-flex-align-center"
        v-for="item in codeList"
        :key="item.id"
      >
        <div class="issues g-flex-align-center g-flex-justify-center">{{ item.open_expect }} {{ i18n.expect }}</div>
        <div class="nums g-flex-align-center g-flex-justify-center">
          <span class="g-flex-align-center g-flex-justify-center" :class="`number${item.open_code.split(',')[0]}`">{{
            item.open_code.split(",")[0]
          }}</span>
          <span class="g-flex-align-center g-flex-justify-center" :class="`number${item.open_code.split(',')[1]}`">{{
            item.open_code.split(",")[1]
          }}</span>
          <span class="g-flex-align-center g-flex-justify-center" :class="`number${item.open_code.split(',')[2]}`">{{
            item.open_code.split(",")[2]
          }}</span>
          <span class="g-flex-align-center g-flex-justify-center" :class="`number${item.open_code.split(',')[3]}`">{{
            item.open_code.split(",")[3]
          }}</span>
          <span class="g-flex-align-center g-flex-justify-center" :class="`number${item.open_code.split(',')[4]}`">{{
            item.open_code.split(",")[4]
          }}</span>
          <span class="g-flex-align-center g-flex-justify-center" :class="`number${item.open_code.split(',')[5]}`">{{
            item.open_code.split(",")[5]
          }}</span>
          <span class="g-flex-align-center g-flex-justify-center" :class="`number${item.open_code.split(',')[6]}`">{{
            item.open_code.split(",")[6]
          }}</span>
          <span class="g-flex-align-center g-flex-justify-center" :class="`number${item.open_code.split(',')[7]}`">{{
            item.open_code.split(",")[7]
          }}</span>
          <span class="g-flex-align-center g-flex-justify-center" :class="`number${item.open_code.split(',')[8]}`">{{
            item.open_code.split(",")[8]
          }}</span>
          <span class="g-flex-align-center g-flex-justify-center" :class="`number${item.open_code.split(',')[9]}`">{{
            item.open_code.split(",")[9]
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { apilotteryHistory } from "@/utils/api.js";
import { reactive, ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("chip");
});
const route = useRoute();
const lotteryInfo = ref({});
const codeList = ref({});
const total = ref(0);
const query = ref({
  page: 1,
  limit: 50,
  id: 0
})
const getLists = async () => {
  const { success, data } = await apilotteryHistory(query.value);
  if (!success) return;
  lotteryInfo.value = data.lottery;
  codeList.value = data.lotteryDataList;
  total.value = data.total
};
onMounted(() => {
  query.value.id = route.query.id;
  getLists();
});
</script>

<style lang='scss' scoped>
.s_lottery_history {
  width: 100%;
  background: rgb(42, 42, 42);
  padding-top: 55px;
  .v-history-head {
    height: 50px;
    width: 100%;
    background: #1e1c38;
    position: fixed;
    left: 0;
    top: 0;

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
    .history-title {
      border-bottom: 1px solid #fff;
      height: 40px;
    }
    .history-item {
      height: 40px;
      border-bottom: 1px solid #fff;
      .issues {
        border-right: 1px solid #fff;
        font-size: 12px;
        height: 100%;
        padding: 6px;
      }
      .nums {
        flex: 1;
        span {
          width: 18px;
          height: 18px;
          font-size: 12px;
          border-radius: 4px;
          color: #fff;
          margin-right: 4px;
        }
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