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
        {{ i18n.titelText }}
      </div>
      <div
        v-if="false"
        class="v-history-head-right"
        @click="$router.push('/chip')"
      >
        {{ i18n.betNow }}
      </div>
    </div>
    <div class="history-title">
      <div class="lottery-name g-flex-align-center g-flex-justify-center">
        {{ lotteryInfo.name }}
      </div>
      <div class="tab g-flex-justify-center">
        <div
          @click="tabChange(0)"
          class="tab-item g-flex-align-center g-flex-justify-center"
          :class="tabIndex === 0 ? 'active' : ''"
        >
          {{ i18n.number }}
        </div>
        <div
          @click="tabChange(1)"
          class="tab-item g-flex-align-center g-flex-justify-center"
          :class="tabIndex === 1 ? 'active' : ''"
        >
          {{ i18n.bigSmall }}
        </div>
        <div
          @click="tabChange(2)"
          class="tab-item g-flex-align-center g-flex-justify-center"
          :class="tabIndex === 2 ? 'active' : ''"
        >
          {{ i18n.doubleSingle }}
        </div>
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
          class="history-item g-flex-align-center"
          v-for="item in codeList"
          :key="item.id"
        >
          <div class="issues g-flex-align-center g-flex-justify-center">
            {{ item.open_expect }} {{ i18n.expect }}
          </div>
          <div class="nums" v-show="!tabIndex">
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="`number${item.open_code.split(',')[0]}`"
              >{{ item.open_code.split(",")[0] }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="`number${item.open_code.split(',')[1]}`"
              >{{ item.open_code.split(",")[1] }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="`number${item.open_code.split(',')[2]}`"
              >{{ item.open_code.split(",")[2] }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="`number${item.open_code.split(',')[3]}`"
              >{{ item.open_code.split(",")[3] }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="`number${item.open_code.split(',')[4]}`"
              >{{ item.open_code.split(",")[4] }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="`number${item.open_code.split(',')[5]}`"
              >{{ item.open_code.split(",")[5] }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="`number${item.open_code.split(',')[6]}`"
              >{{ item.open_code.split(",")[6] }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="`number${item.open_code.split(',')[7]}`"
              >{{ item.open_code.split(",")[7] }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="`number${item.open_code.split(',')[8]}`"
              >{{ item.open_code.split(",")[8] }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="`number${item.open_code.split(',')[9]}`"
              >{{ item.open_code.split(",")[9] }}</span
            >
          </div>
          <div class="nums" v-show="tabIndex === 1">
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[0]) > 4 ? 'big' : 'small'
              "
              >{{
                Number(item.open_code.split(",")[0]) > 4 ? i18n.big : i18n.small
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[1]) > 4 ? 'big' : 'small'
              "
              >{{
                Number(item.open_code.split(",")[1]) > 4 ? i18n.big : i18n.small
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[2]) > 4 ? 'big' : 'small'
              "
              >{{
                Number(item.open_code.split(",")[2]) > 4 ? i18n.big : i18n.small
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[3]) > 4 ? 'big' : 'small'
              "
              >{{
                Number(item.open_code.split(",")[3]) > 4 ? i18n.big : i18n.small
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[4]) > 4 ? 'big' : 'small'
              "
              >{{
                Number(item.open_code.split(",")[4]) > 4 ? i18n.big : i18n.small
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[5]) > 4 ? 'big' : 'small'
              "
              >{{
                Number(item.open_code.split(",")[5]) > 4 ? i18n.big : i18n.small
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[6]) > 4 ? 'big' : 'small'
              "
              >{{
                Number(item.open_code.split(",")[6]) > 4 ? i18n.big : i18n.small
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[7]) > 4 ? 'big' : 'small'
              "
              >{{
                Number(item.open_code.split(",")[7]) > 4 ? i18n.big : i18n.small
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[8]) > 4 ? 'big' : 'small'
              "
              >{{
                Number(item.open_code.split(",")[8]) > 4 ? i18n.big : i18n.small
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[9]) > 4 ? 'big' : 'small'
              "
              >{{
                Number(item.open_code.split(",")[9]) > 4 ? i18n.big : i18n.small
              }}</span
            >
          </div>
          <div class="nums" v-show="tabIndex === 2">
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[0]) % 2 === 0
                  ? 'double'
                  : 'single'
              "
              >{{
                Number(item.open_code.split(",")[0]) % 2 === 0
                  ? i18n.double
                  : i18n.single
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[1]) % 2 === 0
                  ? 'double'
                  : 'single'
              "
              >{{
                Number(item.open_code.split(",")[1]) % 2 === 0
                  ? i18n.double
                  : i18n.single
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[2]) % 2 === 0
                  ? 'double'
                  : 'single'
              "
              >{{
                Number(item.open_code.split(",")[2]) % 2 === 0
                  ? i18n.double
                  : i18n.single
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[3]) % 2 === 0
                  ? 'double'
                  : 'single'
              "
              >{{
                Number(item.open_code.split(",")[3]) % 2 === 0
                  ? i18n.double
                  : i18n.single
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[4]) % 2 === 0
                  ? 'double'
                  : 'single'
              "
              >{{
                Number(item.open_code.split(",")[4]) % 2 === 0
                  ? i18n.double
                  : i18n.single
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[5]) % 2 === 0
                  ? 'double'
                  : 'single'
              "
              >{{
                Number(item.open_code.split(",")[5]) % 2 === 0
                  ? i18n.double
                  : i18n.single
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[6]) % 2 === 0
                  ? 'double'
                  : 'single'
              "
              >{{
                Number(item.open_code.split(",")[6]) % 2 === 0
                  ? i18n.double
                  : i18n.single
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[7]) % 2 === 0
                  ? 'double'
                  : 'single'
              "
              >{{
                Number(item.open_code.split(",")[7]) % 2 === 0
                  ? i18n.double
                  : i18n.single
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[8]) % 2 === 0
                  ? 'double'
                  : 'single'
              "
              >{{
                Number(item.open_code.split(",")[8]) % 2 === 0
                  ? i18n.double
                  : i18n.single
              }}</span
            >
            <span
              class="g-flex-align-center g-flex-justify-center"
              :class="
                Number(item.open_code.split(',')[9]) % 2 === 0
                  ? 'double'
                  : 'single'
              "
              >{{
                Number(item.open_code.split(",")[9]) % 2 === 0
                  ? i18n.double
                  : i18n.single
              }}</span
            >
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script setup>
import { apilotteryHistory } from "@/utils/api.js";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("lotteryHistory");
});
const i18n2 = computed(() => {
  return i18nObj.tm("gongyong");
});
const route = useRoute();
const lotteryInfo = ref({});
const codeList = ref([]);
const total = ref(0);
const tabIndex = ref(0);

let loading = ref(false);
let finished = ref(false);
const query = ref({
  page: 1,
  limit: 20,
  id: 0,
});
const getLists = async () => {
  const { success, data } = await apilotteryHistory(query.value);
  if (!success) return;
  lotteryInfo.value = data.lottery;
  codeList.value = codeList.value.concat(data.lotteryDataList);
  total.value = data.total;
};

const onLoad = () => {
  query.value.page++;
  getLists();
};
const tabChange = (index) => {
  tabIndex.value = index;
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
  padding-top: 137px;
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
  .history-title {
    position: fixed;
    left: 0;
    top: 50px;
    border-bottom: 1px solid #fff;
    color: var(--g-white);
    width: 100%;
    height: 85px;
    background: rgb(42, 42, 42);
    .lottery-name {
      height: 40px;
    }
    .tab {
      width: 90%;
      height: 36px;
      margin: 0 auto;
      border-color: #fff #fff transparent #fff;
      gap: 5px;
      .tab-item {
        flex: 1;
        border-radius: 8px;
        background: grey;
        text-align: center;
        font-size: 14px;
        &.active {
          background: var(--g-black);
          font-size: 16px;
        }
      }
    }
  }
  .history-list {
    color: #fff;
    .history-item {
      min-height: 40px;
      padding: 5px 0;
      border-bottom: 1px solid #fff;
      .issues {
        font-size: 12px;
        height: 100%;
        padding: 0 5px;
      }
      .nums {
        flex: 1;
        display: flex;
        flex-wrap: wrap; /* 超出宽度时换行 */
        justify-content: center; /* 每行内容居中 */
        border-left: 1px solid #fff;
        padding: 0 5px;
        gap: 4px;
        box-sizing: border-box; /* 确保padding不会影响容器宽度 */
        span {
          font-size: 12px;
          padding: 2px;
          border-radius: 4px;
          color: #fff;
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
.big,
.double {
  background: orange;
}
.small,
.single {
  background: grey;
}
</style>