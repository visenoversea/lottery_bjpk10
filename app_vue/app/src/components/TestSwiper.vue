<template>
  <div class="swiper-container news-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(news, index) in newsList" :key="index">
        <div class="news-item">
          <div class="news-img">
            <img :src="news.image" alt="">
          </div>
          <div class="news-content">
            <h3>{{ news.title }}</h3>
            <p>{{ news.info }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"  slot="prev">
      <i class="iconfont icon-zuo"></i>
    </div>
    <div class="swiper-button-next" slot="next">
      <i class="iconfont icon-you"></i>
    </div>
  </div>
</template>

<script setup>
import Swiper, { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import { nextTick, onMounted, reactive, ref } from 'vue';

const swiperInstance = ref(null);

const newsList = reactive([
  {
    image: 'https://picsum.photos/200/300',
    title: 'News Title 1',
    info: 'News Info 1'
  },
  {
    image: 'https://picsum.photos/200/300',
    title: 'News Title 2',
    info: 'News Info 2'
  },
  {
    image: 'https://picsum.photos/200/300',
    title: 'News Title 3',
    info: 'News Info 3'
  },
  {
    image: 'https://picsum.photos/200/300',
    title: 'News Title 4',
    info: 'News Info 4'
  },
  {
    image: 'https://picsum.photos/200/300',
    title: 'News Title 5',
    info: 'News Info 5'
  }
]);
let show = ref(false)
onMounted(() => {
  
});

function onShow() {
  nextTick(() => {
    Swiper.use([Pagination, Navigation, Autoplay]);
    swiperInstance.value = new Swiper('.news-swiper', {
      loop: true,
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 0,
      autoplay: {
        delay: 3000
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

defineExpose({
  onShow
})

const prev = () => {
  swiperInstance.value.slidePrev();
};

const next = () => {
  swiperInstance.value.slideNext();
};
</script>

<style lang="scss">
.news-swiper {
  width: 100%;
  height: 300px;
  .swiper-wrapper {
    width: 100%;
  }
}

.news-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.news-img {
  flex-shrink: 0;
  width: 30%;
  margin-right: 10px;
}

.news-img img {
  width: 100%;
}

.news-content {
  flex-grow: 1;
}

.news-content h3 {
  font-size: 20px;
  margin: 0 0 5px;
}

.news-content p {
  font-size: 16px;
  margin: 0;
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  &::after {
    display: none;
  }
}
</style>