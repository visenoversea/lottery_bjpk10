<template>
  <div class="v_hall g-flex-column n-bg">
    <div class="new-head">
      <div class="new-head-back" @click="$router.go(-1)">
        <img src="/images/back-icon.png" alt="" />
      </div>
    </div>
    <div class="new-head_title_text">{{ titleText }}</div>
    <div class="lottery-list" v-if="list.length">
      <div
        class="lottery-item g-flex-align-center"
        v-for="item in list"
        :key="item.id"
        @click="goLottery(item)"
      >
        <div class="lottery-icon g-flex-align-center">
          <img :src="item.lottery_icon" alt="" />
        </div>
        <div class="lottery-info lottery-name">{{ item.lottery_name }}</div>
        <div
          class="lottery-info lottery-des"
          @click.stop="openDes(item)"
        >
          {{ i18n.descriptionText }}
        </div>
      </div>
    </div>
    <van-popup
      safe-area-inset-bottom
      class="c-des-pop"
      v-model:show="desShow"
      position="center"
    >
      <div class="c-des-container">
        <div class="des-title">
          {{ currentLottery.lottery_name }}
        </div>
        <p>{{ currentLottery.description }}</p>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { apiGetRoomGroup } from "@/utils/api.js";
import { reactive, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Toast } from 'vant';
import useStore from "@/store/index.js";
import { useRoute, useRouter } from "vue-router";
// pinia状态管理仓库
const store = useStore();
const router = useRouter();
const route = useRoute();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("hall");
});
const props = defineProps({
  roomId: {
    type: Number,
    default() {
      return 0
    }
  }
})
const desShow = ref(false);
const currentLottery = ref({})
const titleText = ref("");
const list = ref([]);
const fetchData = async () => {
  store.loadingShow = true;
  const { success, data } = await apiGetRoomGroup({ id: props.roomId });
  if (!success) return;
  list.value = data.info;
  titleText.value = data.info[0].name;
};
const goLottery = (item) => {
  if (item.status === 1) {
    router.push({
      path: "/chip",
      query: {
        id: item.id,
        room: props.roomId,
      },
    });
  } else if (item.status === 2) {
    Toast(i18n.value.noOpen);
  }
};

const openDes = (item) => {
  currentLottery.value = item
  desShow.value = true;
};

onMounted(() => {
  fetchData();
});
</script>

<style lang='scss' scoped>
.v_hall {
  height: 100%;
  overflow: auto;
  // background-color: #f6f4f5;
  .v-head {
    height: 46px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background: #f6f4f5;
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
  .lottery-list {
    padding: 20px 15px 0;
    .lottery-item {
      height: 80px;
      border-radius: 12px;
      margin-bottom: 10px;
      border: 1px solid rgba(255, 255, 255, 0.7);
      padding: 10px;
      .lottery-icon {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        border: 1px solid grey;
        img {
          width: 100%;
          border-radius: 8px;
        }
      }
      .lottery-info {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
        &.lottery-name {
          flex: 1;
        }
      }
    }
  }
  :deep(.c-des-pop) {
    width: 300px;
    border-radius: 12px;
    .c-des-container {
      padding: 15px;
      .des-title {
        font-size: 18px;
        text-align: center;
        font-weight: 600;
      }
      p {
        margin-top: 5px;
        line-height: 16px;
        font-size: 12px;
      }
    }
  }
}
</style>
