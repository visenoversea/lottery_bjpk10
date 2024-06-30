<template>
  <van-tabbar @change="onChange" v-model="active" class="s_footer_layout_container" :safe-area-inset-bottom="false"
    active-color="#FF2742" inactive-color="#666">
    <van-tabbar-item :name="'main'" class="s-tab-item">
      <span class="s-footer-layout-title">{{ i18n.mainText }}</span>
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/tab1_active.png'
            : '/img/footer/tab1.png'
        " alt="" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item :name="'rechargeselect'" class="s-tab-item">
      <span class="s-footer-layout-title">{{ i18n.rechargeText }}</span>
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/tab2_active.png'
            : '/img/footer/tab2.png'
        " alt="" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item :name="'concatkefu'" class="s-tab-item">
      <span class="s-footer-layout-title">{{ i18n.kefuText }}</span>
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/tab3_active.png'
            : '/img/footer/tab3.png'
        " alt="" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item :name="'finance'" class="s-tab-item">
      <span class="s-footer-layout-title">{{ i18n.myText }}</span>
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/tab4_active.png'
            : '/img/footer/tab4.png'
        " alt="" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("footerLayout");
});

const router = useRouter();
const route = useRoute();

const active = ref("");

watch(
  route,
  (nval, oval) => {
    // if (
    //   nval.name == "wakuang" ||
    //   nval.name == "wakuangdefi"
    // ) {
    //   active.value = "licai";
    //   return;
    // } else {
    //   active.value = nval.name;
    // }
    active.value = nval.name;
  },
  {
    immediate: true,
  }
);

function onChange(name) {
  router.push({ name })
}
</script>

<style lang="scss">
.s_footer_layout_container {
  &.van-tabbar {
    background: var(--g-white);
    z-index: 999;
    height: 50px;
    bottom: 0px;
    bottom: constant(safe-area-inset-bottom); //苹果底部安全距离
    bottom: env(safe-area-inset-bottom); //苹果底部安全距离
    &::after {
      border-width: 0;
    }
    // @include mediaMaxWidth();
    // left: 50%;
    // transform: translateX(-50%);
    .s-tab-item {
      font-size: 12px;
      &.van-tabbar-item--active {
        background-color: var(--g-white);
      }
      .s-footer-layout-title {
        padding-top: 2px;
        @include textManyOverflow(1);
      }

      .van-tabbar-item__icon {
        .iconfont {
          font-size: 22px;
        }

        img {
          height: 24px;
        }
      }
      &.s-tab-item-middle {
        .van-tabbar-item__icon {
          img {
              background: transparent;
              position: relative;
              z-index: 99999;
              transform: translate3d(0,-10px,0) scale(2);
            }
          }
        }
    }
  }
}
</style>
