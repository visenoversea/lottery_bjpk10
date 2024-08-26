<template>
  <van-tabbar @change="onChange" v-model="active" class="s_footer_layout_container" :safe-area-inset-bottom="false"
    active-color="#5488f7" inactive-color="#72798b">
    <van-tabbar-item :name="'main'" class="s-tab-item">
      <!-- <span class="s-footer-layout-title">{{ i18n.mainText }}</span> -->
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/home_active.png'
            : '/img/footer/home.png'
        " alt="" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item :name="'halljunior'" class="s-tab-item">
      <!-- <span class="s-footer-layout-title">{{ i18n.introduceText }}</span> -->
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/junior_active.png'
            : '/img/footer/junior.png'
        " alt="" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item :name="'hallintermediate'" class="s-tab-item s-tab-item-middle">
      <!-- <span class="s-footer-layout-title">{{ i18n.lianghuaText }}</span> -->
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/intermediate_active.png'
            : '/img/footer/intermediate.png'
        " alt="" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item :name="'halladvanced'" class="s-tab-item">
      <!-- <span class="s-footer-layout-title">{{ i18n.rechargeText }}</span> -->
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/advanced_active.png'
            : '/img/footer/advanced.png'
        " alt="" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item :name="'mycenter'" class="s-tab-item">
      <!-- <span class="s-footer-layout-title">{{ i18n.myText }}</span> -->
      <template #icon="props">
        <img :src="
          props.active
            ? '/img/footer/my_active.png'
            : '/img/footer/my.png'
        " alt="" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { Toast } from 'vant'
import { useRouter, useRoute } from "vue-router";
const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("footerLayout");
});

const router = useRouter();
const route = useRoute();

const active = ref("");
// const preActive = ref("");

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
  // if(name=== 'myteam' || name === 'rechargeselect') {
  //   active.value = preActive.value
  //   Toast('暂未开放，敬请期待!')
  // } else {
  //   preActive.value= active.value
  //  router.push({ name })
  // }
  router.push({ name })

}
</script>

<style lang="scss">
.s_footer_layout_container {
  &.van-tabbar {
    background: #373737;
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
        background: #373737;
      }
      .s-footer-layout-title {
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
      // &.s-tab-item-middle {
      //   .van-tabbar-item__icon {
      //     img {
      //         background: transparent;
      //         position: relative;
      //         z-index: 99999;
      //         transform: translate3d(0,-10px,0) scale(2);
      //       }
      //     }
      //   }
    }
  }
}
</style>
