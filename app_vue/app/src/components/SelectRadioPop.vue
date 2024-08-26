<template>
  <div class="c_select_radio_pop">
    <van-popup safe-area-inset-bottom class="c-pop" v-model:show="show" position="bottom">
      <van-picker swipe-duration="500" title="" @cancel="onClose" @confirm="onConfirm" :columns="props.columns" :default-index="defaultIndex" :columns-field-names="customFieldName"/>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const props = defineProps({
  selectVal: {
    type: [Number, String],
    default: ''
  },
  columns: {
    type: Array,
    default() {
      return []
    }
  }
})


const defaultIndex = computed(() => {
  if(!props.columns.length) return 0
  let targetIndex = props.columns.findIndex(item => {
    return item.val == props.selectVal
  })
  if(targetIndex != -1) return targetIndex
  return 0
})

let customFieldName = {
  text: 'title',
}

const emits = defineEmits(['emitsSelectConfirm'])

function onConfirm(value) {
  console.log(value)
  emits('emitsSelectConfirm', value)
  onClose()
}

let show = ref(false)
function onShow() {
  show.value = true
}

function onClose() {
  show.value = false
}

defineExpose({
  onShow
})
</script>

<style lang='scss'>
.c_select_radio_pop {
  .c-pop {
    // .van-picker {
    //   .van-picker__toolbar {
    //     background-color: #252D31;
    //   }
    //   .van-picker__columns {
    //     .van-picker-column__wrapper {
    //       .van-picker-column__item {
    //         color: #949494;
    //         &.van-picker-column__item--selected {
    //           color: var(--g-white);
    //           background: #252D31;
    //         }
    //       }
    //     }
    //   }
    // }
  }
}
</style>