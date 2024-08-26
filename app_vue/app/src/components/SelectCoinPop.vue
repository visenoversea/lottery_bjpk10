<template>
  <div class="c-coin-pop" v-show="selectCoinShow">
    <div @click="itemClick(item, index)" class="c-coin-pop-item g-flex-align-center"
      :class="index == selectIndex ? 'c-coin-pop-item-active' : ''" v-for="(item, index) in props.coinList" :key="index">
      <img :src="item.icon" alt="">
      <div class="c-coin-pop-item-right">
        <span class="c-coin-pop-item-title">{{ item.currency }}</span>
        <!-- <p class="c-coin-pop-item-name">{{ item.name }}</p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  coinList: {
    type: Array,
    default() {
      return [
      ]
    }
  }
})
let selectIndex = ref(0)
let selectCoinShow = ref(false)
function onShow() {
  selectCoinShow.value = true
}
function onClose() {
  selectCoinShow.value = false
}
defineExpose({
  onShow,
  onClose
})

const emits = defineEmits(['emitCoinItemClick'])

function itemClick(item, index) {
  selectIndex.value = index
  emits('emitCoinItemClick', item)
}

</script>

<style lang='scss'>
.c-coin-pop {
  width: 100%;
  position: absolute;
  max-height: 248px;
  background: var(--g-white);
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 8px 12px 0 rgb(14 18 27 / 6%);
  right: -1px;
  z-index: 99;
  overflow: auto;
  bottom: -1px;
  transform: translateY(100%);
  .c-coin-pop-item {
    cursor: pointer;
    margin: 0;
    user-select: none;
    padding: 10px 16px;
    line-height: 20px;

    &.c-coin-pop-item-active {
      background: var(--g-white);
      .c-coin-pop-item-right {
        .c-coin-pop-item-title {
          color: var(--g-main_color);
        }
        .c-coin-pop-item-name {
          color: var(--g-main_color);
        }
      }
    }

    &:hover {
      background: var(--g-white);
      .c-coin-pop-item-right {
        .c-coin-pop-item-title {
          color: var(--g-main_color);
        }
        .c-coin-pop-item-name {
          color: var(--g-main_color);
        }
      }
    }

    img {
      width: 20px;
      height: 20px;
      object-fit: contain;
      margin-right: 8px;
      border-radius: 50%;
    }

    .c-coin-pop-item-right {
      .c-coin-pop-item-title {
        font-size: 14px;
        line-height: 20px;
        color: var(--g-black);
      }

      .c-coin-pop-item-name {
        font-size: 12px;
        line-height: 20px;
        color: var(--g-black);
      }
    }

  }
}
</style>