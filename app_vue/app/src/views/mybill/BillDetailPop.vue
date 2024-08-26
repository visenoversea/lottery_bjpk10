<template>
  <div class="c_cashout_detail_pop">
    <van-popup
      position="right"
      :close-on-click-overlay="false"
      v-model:show="show"
      class="c-pop g-flex-column"
    >
      <div class="v-head g-flex-align-center">
        <div @click="onClose" class="v-head-back-icon g-flex-align-center">
          <i class="iconfont icon-zuo"></i>
        </div>
        <div class="v-head-title g-flex-align-center g-flex-justify-center">
          <span>{{ i18n.titleText }}</span>
        </div>
        <!-- <div class="v-head-right g-flex-align-center">
          <i class="iconfont icon-datijilu"></i>
        </div> -->
      </div>
      <div class="c-pop-container">
        <div class="c-pop-content">
          <div class="c-pop-item g-flex-align-center">
            <div class="c-pop-item-left">{{ i18n.lotteryType }}</div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val">{{
                infoObj.obj.lottery_name
              }}</span>
            </div>
          </div>

          <div class="c-pop-item c-pop-item-fail g-flex-align-center">
            <div class="c-pop-item-left">{{ i18n.betNum }}</div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val">
                {{ infoObj.obj.lottery_group_name + "-" + infoObj.obj.bet_no }}
              </span>
            </div>
          </div>

          <div class="c-pop-item c-pop-item-fail g-flex-align-center">
            <div class="c-pop-item-left">{{ i18n.betAmount }}</div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val">{{
                infoObj.obj.bet_amount
              }}</span>
            </div>
          </div>
          <div class="c-pop-item c-pop-item-fail g-flex-align-center">
            <div class="c-pop-item-left">{{ i18n.winorlose }}</div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val">{{
                infoObj.obj.win_amount
              }}</span>
            </div>
          </div>
          <div class="c-pop-item g-flex-align-center">
            <div class="c-pop-item-left">{{ i18n.rate }}</div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val">{{ infoObj.obj.odds }}</span>
            </div>
          </div>
          <div class="c-pop-item g-flex-align-center">
            <div class="c-pop-item-left">
              {{ i18n.timeText }}
            </div>
            <div class="c-pop-item-right">
              <span class="c-pop-item-right-val">{{
                formatDate(infoObj.obj.create_time)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import { reactive, ref, computed } from "vue";
import useStore from "@/store/index.js";
import { formatDate } from "@/utils/index.js";
import { useI18n } from "vue-i18n";
import { apiUserBetInfo } from "@/utils/api";
const props = defineProps({
  // navTypeVal 1充值 2提现
  typeVal: {
    type: Number,
    default() {
      return 1;
    },
  },
});
// pinia状态管理仓库
const store = useStore();
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("mybill");
});
let show = ref(false);

let infoObj = reactive({ obj: {} });

function onShow(id) {
  getDetail(id);
}
async function getDetail(id) {
  const { success, data } = await apiUserBetInfo({ id: id });
  if (!success) return;
  infoObj.obj = data.info;
  show.value = true;
}
function onClose() {
  show.value = false;
}
// 暴露组件的方法或者属性
defineExpose({
  onShow,
});
</script>

<style lang='scss'>
.c_cashout_detail_pop {
  .van-overlay {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .c-pop {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: var(--g-white);
    padding-bottom: 10px;

    .v-head {
      height: 46px;
      left: 0;
      top: 0;
      z-index: 9;
      width: 100%;
      background-color: var(--g-white);

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
        font-weight: 700;
        font-size: 16px;
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

    .c-pop-container {
      flex: 1;
      overflow: auto;
      padding-top: 46px;
      background: var(--g-white);
      .c-pop-title {
        padding: 20px 15px 15px 15px;
        font-size: 22px;
        line-height: 26px;
        color: #333;
      }

      .c-pop-content {
        padding: 15px;

        .c-pop-item {
          padding: 15px 0;
          justify-content: space-between;
          border-bottom: 1px solid #e4e7ed;
          &.c-pop-item-fail {
            .c-pop-item-left {
              color: var(--g-red) !important;
            }
            .c-pop-item-right {
              color: var(--g-red) !important;
            }
          }
          .c-pop-item-left {
            font-size: 14px;
            color: #9c9c9c;
          }

          .c-pop-item-right {
            color: var(--g-black);
            font-size: 14px;

            .c-pop-item-right-val {
              padding-left: 5px;
            }

            .c-pop-item-right-address {
              width: 250px;
              word-break: break-all;
            }

            .c-pop-item-right-copy-text {
              color: var(--g-main_color);
              font-size: 14px;
              margin-left: 5px;
            }

            .c-pop-item-right-top {
              .iconfont {
                color: var(--g-main_color);
              }
              img {
                width: 18px;

                &.c-pop-item-right-card-img {
                  width: 18px;
                }

                &.c-pop-item-right-copy-img {
                  width: 12px;
                  margin-left: 5px;
                }
              }
            }

            .c-pop-item-right-bottom {
              padding-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>