<template>
  <div class="c_oss_upload">
    <div class="c-oss-upload">
      <van-uploader v-show="false" :id="props.idString" :before-read="beforeRead" :after-read="afterRead">
      </van-uploader>
    </div>
  </div>
</template>

<script setup>
import { apiGetOssKey } from '@/utils/api.js'
import { Toast } from 'vant'
import { ref, nextTick, computed } from 'vue'
// const OSS = require('ali-oss')
import useStore from '@/store/index.js'
import OSS from 'ali-oss'
import { useI18n } from "vue-i18n";
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('ossUpload')
})
// pinia状态管理仓库
const store = useStore();
const props = defineProps({
  limitPng: {
    type: Array,
    default() {
      return ['jpeg', 'gif', 'jpg', 'png']
    }
  },
  idString: {
    type: String,
    default() {
      return 'c-upload'
    }
  },
  MidrPath: {
    type: String,
    default() {
      return ''
    }
  }
})

const emits = defineEmits(['emitUploadSuccess'])

// 点击上传
function onUploadClick() {
  // console.log('cccccccccccc', props.idString)
  // console.log('dom', document.getElementById(props.idString))
  document.getElementById(props.idString).getElementsByClassName('van-uploader__input')[0].click()
}

defineExpose({
  onUploadClick
})

let url = ref('')
// 获取oss key token 等信息
async function apiGetOssKeyHandel() {
  const { success, data } = await apiGetOssKey()
  if (!success) return false
  return new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: data.data.oss.region,
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: data.data.Credentials.AccessKeyId,
    accessKeySecret: data.data.Credentials.AccessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: data.data.Credentials.SecurityToken,
    // Https 还是 http 设置为 true为https
    secure: true,
    // 填写Bucket名称，例如examplebucket。
    bucket: data.data.oss.bucket,
    // 刷新临时访问凭证回调
    refreshSTSToken: () => {
      console.log('过期了')
    },
    // 刷新临时访问凭证的时间间隔，单位为毫秒。
    // refreshSTSTokenInterval: 3600000,
  })
}

// 上传之前
function beforeRead(file) {
  console.log('file', file)
  // var type = file.name.split('.')[1].toLowerCase()
  // if(props.limitPng.indexOf(type) === -1) {
  //   Toast(i18n.value.uploadTypeText)
  //   return false
  // }
  var sizeLimit = 100 * 1024 * 1024
  if (file.size > sizeLimit) {
    Toast(i18n.value.uploadSizeText)
    return false
  } else {
    return true
  }
}


// 上传
async function afterRead(file) {
  var suffix = file.file.name.match(/.[^.]+$/)[0];
  const headers = { "Cache-Control": "no-cache" };
  try {
    store.loadingShow = true
    // let fileName = props.MidrPath + new Date().getTime() + file.file.name 
    let fileName = props.MidrPath + new Date().getTime() + suffix
    var OSS = await apiGetOssKeyHandel()
    // 分片上传
    OSS.multipartUpload(fileName, file.file, { headers })
      .then((res) => {
        console.log('res', res)
        // Toast('上传成功')
        var urlArr = res.res.requestUrls[0].split('?')
        if(suffix.toLowerCase() == '.heic') {
          url.value = urlArr[0]+ '?x-oss-process=image/format,jpg'
        }else {
          url.value = urlArr[0]
        }
        emits('emitUploadSuccess', url.value)
      })
  } catch (e) {
    Toast(i18n.value.uploadFailText)
    console.log('上传失败', e);
  }
}
</script>

<style lang='scss'>

</style>