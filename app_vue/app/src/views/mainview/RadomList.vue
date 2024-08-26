<template>
  <div class="v_radom">
    <div class="v-radom-list">
      <div class="v-radom-item v-radom-head g-flex">
        <div class="head-item start">{{ i18n.username }}</div>
        <div class="head-item center">{{ i18n.betIncome }}</div>
        <div class="head-item end">{{ i18n.statusText }}</div>
      </div>
      <div class="scroll-container">
        <div class="scroll-wrapper scroll-active" v-if="list.length">
          <div
            class="v-radom-item g-flex"
            v-for="item in list"
            :key="`radom${item.id}`"
          >
            <div class="head-item start">{{ item.user_name }}</div>
            <div class="head-item center">{{ item.amount }}USDT</div>
            <div class="head-item end">{{ i18n.withdrawSeccuss }}</div>
          </div>
          <div
            class="v-radom-item g-flex"
            v-for="item in list"
            :key="`radom22${item.id}`"
          >
            <div class="head-item start">{{ item.user_name }}</div>
            <div class="head-item center">{{ item.amount }}USDT</div>
            <div class="head-item end">{{ i18n.withdrawSeccuss }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { apiGetLiangHuaRadomList } from "@/utils/api.js";
import { useRouter, useRoute } from "vue-router";
import { reactive, ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import useStore from "@/store/index.js";
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n();

const i18n = computed(() => {
  return i18nObj.tm("mainView");
});

const route = useRoute();
const router = useRouter();

const list = ref([]);

async function getRadomList() {
  store.loadingShow = true;
  const { success, data } = await apiGetLiangHuaRadomList();
  if (!success) return;
  list.value = data.list;
}

onMounted(() => {
  getRadomList();
});
</script>

<style lang='scss' scoped>
.v_radom {
  padding: 0 15px 20px;
  .v-radom-list {
    border-radius: 8px;
    padding: 8px 10px;
    background: linear-gradient(90deg, #009afe, #8169ff);
    .scroll-container {
      position: relative;
      overflow: hidden;
      height: 200px; /* 高度根据需要调整 */
      .scroll-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        &.scroll-active {
          animation: scroll 10s linear infinite;
        }
      }
    }
    .v-radom-item {
      color: #fff;
      font-size: 12px;
      line-height: 20px;
      &.v-radom-head {
        font-size: 14px;
        color: var(--g-black);
        margin-bottom: 5px;
      }
      .head-item {
        &.start,
        &.center {
          flex: 1;
        }
        &.end {
          width: 120px;
          text-align: right;
        }
      }
    }
  }
}
@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%); /* 30条数据，每个30px，总共900px */
  }
}
</style>