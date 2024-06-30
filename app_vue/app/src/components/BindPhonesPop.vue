<template>
  <div class="c_bind_phone_pop">
    <van-popup class="c-pop" safe-area-inset-bottom position="right" :style="{ height: '100%', width: '90%' }" v-model:show="show">
      <div class="c-bind-phone-container g-flex-column">
        <div class="c-pop-close" @click="onClose">
          <i class="iconfont icon-guanbi"></i>
        </div>
        <p class="c-bind-phone-pop-title">{{ i18n.titleText }}</p>
        <van-search class="c-bind-phone-pop-search" @input="onSearch" @clear="onSearch" v-model="seachContent" show-action
          :placeholder="i18n.inputAreaPlaceholderText" @search="onSearch">
          <template #action>
            <div @click="onSearch">{{ i18n.searchText }}</div>
          </template>
        </van-search>
        <ul class="c-bind-phone-list" v-show="!targetListObj.list.length && !seachContent">
          <li @click="itemClick(item)" class="c-bind-phone-item g-flex-align-center g-flex-justify-between" v-for="(item, index) in props.list"
            :key="index">
            <div class="c-bind-phone-item-left g-flex-align-center">
              <img :src="item.icon" alt=""/>
              <span>{{ item.country }}</span>
            </div>
            <div class="c-bind-phone-item-right">
              <p>+{{ item.area_code }}</p>
            </div>
          </li>
        </ul>
        <ul class="c-bind-phone-list" v-show="targetListObj.list.length">
          <li @click="itemClick(item)" class="c-bind-phone-item g-flex-align-center g-flex-justify-between"
            v-for="(item, index) in targetListObj.list" :key="index">
            <div class="c-bind-phone-item-left g-flex-align-center">
              <img :src="item.icon" alt=""/>
              <span>{{ item.country }}</span>
            </div>
            <div class="c-bind-phone-item-right">
              <p>+{{ item.area_code }}</p>
            </div>
          </li>
        </ul>
      </div>
    </van-popup>
</div>
</template>
 
<script setup>
import { reactive, ref } from 'vue';
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('bindPhonePop')
})
const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    }
  }
})
let show = ref(false)

let seachContent = ref('')

let targetListObj = reactive({
  list: []
})
const emits = defineEmits(['emitPhoneItemClick'])

function onShow() {
  show.value = true
}

function onClose() {
  show.value = false
}

function onSearch() {
  targetListObj.list = props.list.filter(item => {
    return (item.country.indexOf(seachContent.value) != -1 || (item.area_code.toString()).indexOf(seachContent.value) != -1)
  })
}

function itemClick(item) {
  emits('emitPhoneItemClick', item)
  onClose()
}

defineExpose({
  onShow
})


</script>
 
<style lang='scss'>
.c_bind_phone_pop {
  .van-overlay {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .c-pop {
    position: absolute;
  }

  .c-bind-phone-container {
    height: 100%;
    overflow: auto;

    .c-pop-close {
      position: absolute;
      right: 0;
      top: 0;
      padding: 10px;
      .iconfont {
        font-size: 22px;
        color: #3d3d56;
      }
    }
    .c-bind-phone-pop-title {
      padding: 15px 10px 8px 8px;
      color: #3d3d56;
      font-size: 16px;
    }

    .c-bind-phone-list {
      flex: 1;
      overflow: auto;
      padding-left: 15px;

      .c-bind-phone-item {
        color: #75799e;
        padding: 8px 10px;
        font-size: 14px;
        border-bottom: 1px solid #ced1e4;
        line-height: 20px;
        .c-bind-phone-item-left {
          color: #333;
          img {
            margin-right: 10px;
            width: 20px;
          }
        }
        .c-bind-phone-item-right {
          padding-left: 5px;
        }
      }
    }
  }
}</style>