<template>
  <div class="s_tuandui_bottom_swiper">
    <div class="s-tuandui-swiper-box">
      <div class="swiper-wrapper">
        <div class="swiper-slide g-flex-align-center" v-for="(item, index) in props.list" :key="index">
          <div class="s-swiper-silde-item-content g-flex-align-center">
            <div class="s-swiper-silde-item-name">
              <span>{{ item.rebate_name }}</span>
            </div>
            <div class="s-swiper-silde-item-name">
              <span>{{ item.user_name }}</span>
            </div>
            <div class="s-swiper-silde-item-shouyi">
              <span> {{ item.amount }} {{ item.currency }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script setup>
import Swiper, { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import { onMounted, reactive, ref, nextTick, computed } from 'vue';
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("mainBottomSwiper");
});

const swiperInstance = ref(null);
const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    }
  }
})

function onShow() {
  if(swiperInstance.value != null) {
    swiperInstance.value.destroy(true)
  }
  nextTick(() => {
    Swiper.use([Pagination, Navigation, Autoplay]);
    swiperInstance.value = new Swiper('.s-tuandui-swiper-box', {
      loop: true,
      direction: 'vertical',
      slidesPerView: 10,
      spaceBetween: 0,
      allowTouchMove: false, //阻止用户滚动拖拽
      autoplay: {
        delay: 1000,
        reverseDirection: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      speed: 800
    });
  })

}
const prev = () => {
  swiperInstance.value.slidePrev();
};

const next = () => {
  swiperInstance.value.slideNext();
};
defineExpose({
  onShow
})
</script>
  
<style lang='scss'>
.s_tuandui_bottom_swiper {
  // width: 100%;
  overflow: hidden;
  // background: var(--g-white);
  margin: 0 15px;

  .s-tuandui-swiper-box {
    height: 440px;

    .swiper-wrapper {
      width: 100%;

      .swiper-slide {
        .s-swiper-silde-item-content {
          padding: 10px 15px;
          width: 100%;
          background: #fff;
          border-radius: 10px;
          // margin-bottom: 8px;

          .s-swiper-silde-item-name {
            width: 100px;
            font-size: 12px;
            color: #000000;
            font-weight: 700;
          }

          .s-swiper-silde-item-shouyi {
            flex: 2;
            font-size: 12px;
            color: #7C4CDF;
            flex-shrink: 0;
            text-align: center;
          }
          .s-swiper-silde-item-status {
            flex: 2;
            flex-shrink: 0;
            font-weight: 400;
            font-size: 12px;
            color: #000000;
          }
        }
      }
    }
  }

}</style>