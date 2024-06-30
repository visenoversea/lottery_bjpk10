<template>
  <div class="s_exchange_pop">
    <van-action-sheet class="s-pop" v-model:show="show" :closeable="false" :cancel-text="i18n.cancelText">
      <div class="s-pop-container">
        <ul class="s-pop-list">
          <li  @click="itemClick(item)" class="s-pop-item-box" v-for="(item, index) in list" :key="index">
            <div v-show="item.id != hideId" class="s-pop-item g-flex-align-center g-flex-justify-center">
              <div class="s-pop-item-title">
                <span>{{ item.currency }}</span>
              </div>
            </div>
            
          </li>
        </ul>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from "vue-i18n";
const i18nObj = useI18n()

const i18n = computed(() => {
  return i18nObj.tm('exchange')
})
const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    }
  },
  hideId: {
    type: Number,
    default() {
      return 0
    }
  }
})
let show = ref(false)
function onShow() {
  show.value = true
}

function onClose() {
  show.value = false
}

const emits = defineEmits(['emitSelctCoinSuccess'])

function itemClick(item) {
  emits('emitSelctCoinSuccess', item)
  onClose()
}

defineExpose({
  onShow
})
</script>

<style lang='scss'>
.s_exchange_pop {
  .van-overlay {
    filter: blur(0.08rem);
    -webkit-backdrop-filter: blur(.08rem);
    backdrop-filter: blur(0.08rem);
    background-color: rgba(0, 0, 0, .2);
  }

  .s-pop {
    max-height: 60%;
    .s-pop-container {
      .s-pop-list {
        .s-pop-item-box {
          .s-pop-item {
            padding: 15px;
            border-bottom: 1px solid #f7f8fa;
            .s-pop-item-title {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>