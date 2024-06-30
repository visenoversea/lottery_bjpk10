<script setup>
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import useClipboard from 'vue-clipboard3'
import {computed, ref} from "vue";
import { ElMessage } from 'element-plus'
const { toClipboard } = useClipboard()
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object
  }
})
const loading = ref(false)
//显示隐藏做双向绑定处理
const emits = defineEmits(['update:modelValue'])
const show = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const qrData = computed(() => {
  if (props.data.secret) {
    return 'otpauth://totp/G' + props.data.id + '?secret=' + props.data.secret
  }
  return ''
})

//确认
const copy = async () => {
  try {
    await toClipboard(props.data.secret)
    ElMessage.success('复制成功')
  } catch (e) {
    console.error(e)
    ElMessage.error('复制失败')
  }
}
</script>
<template>
  <el-dialog v-model="show" title="谷歌令牌" draggable :close-on-click-modal="false" width="680px">
    <el-form v-loading="loading" size="default" label-width="120px">
      <el-form-item label="密钥：">
        <span style="padding-right: 10px">{{props.data.secret}}</span>
        <el-button @click="copy" type="primary">复制</el-button>
      </el-form-item>
      <el-form-item label="二维码：">
        <vue-qr v-if="qrData" :text="qrData" :margin="10" :size="220"></vue-qr>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>