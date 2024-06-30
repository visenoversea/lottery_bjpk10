<template>
  <div class="v_tiaokuan_fuwu g-flex-column">
    <div class="v-tiaokuan-head g-flex-align-center">
      <div @click="$router.go(-1)" class="v-tiaokuan-head-back g-flex-align-center">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <div class="v-title g-flex-align-center g-flex-justify-center">
        <span>{{ infoObj.obj.title }}</span>
      </div>
    </div>
    <div class="v-tiaokuan-container" v-html="infoObj.obj.content">

    </div>
  </div>
</template>

<script setup>
import { apiGetNoticeInfo } from '@/utils/api.js'
import { useRouter, useRoute } from 'vue-router';
import { reactive, ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { formatDate } from '@/utils/index.js'
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n()

const i18n = computed(() => {
  return i18nObj.tm('rule')
})

const i18n2 = computed(() => {
  return i18nObj.tm('gongyong')
})

const route = useRoute()
const router = useRouter()

let form = reactive({
  id: route.query.id
})

let infoObj = reactive({ obj: { create_time: 0 } })

async function apiGetNoticeInfoHandel() {
  store.loadingShow = true
  const { success, data } = await apiGetNoticeInfo(form)
  if (!success) return
  infoObj.obj = data.info
  console.log(data)
}

apiGetNoticeInfoHandel()
</script>

<style lang='scss'>
.v_tiaokuan_fuwu {
  height: 100%;
  overflow: auto;

  .v-tiaokuan-head {
    position: fixed;
    width: 100%;
    padding: 0 15px;
    height: 50px;
    top: 0;
    left: 0;
    background-color: var(--g-white);
    z-index: 9;

    .v-tiaokuan-head-back {
      position: absolute;
      height: 100%;

      .iconfont {
        font-size: 26px;
        font-weight: 700;
      }
    }

    .v-title {
      height: 100%;
      flex: 1;
      font-size: 16px;
      font-weight: 700;
    }

    .v-tiaokuan-head-language {
      position: absolute;
      height: 100%;
      right: 15px;

      .v-tiaokuan-head-language-img {
        padding: 3px;
        border-radius: 50%;
        overflow: hidden;
        background: #F5F7F9;

        .iconfont {
          font-size: 22px;
          color: #333;
          font-weight: 700;
        }
      }
    }
  }

  .v-tiaokuan-container {
    flex: 1;
    overflow: auto;
    padding: 15px;
    padding-top: 50px;
  }
}
</style>