import { createApp } from 'vue'
import vant from 'vant';
import "@/assets/css/variable.css";
import 'vant/lib/index.css'
import '@/assets/css/reset.scss'
import '@/assets/css/normalize.css'
import '@/assets/css/style.scss'
import '@/assets/iconfont/iconfont.css'
import pinia from "@/store/store"
import i18n from "@/utils/i18n.js"
import '@vant/touch-emulator'
// import AudioPlay from '@/components/AudioPlay.vue'
import NoList from '@/components/NoList.vue'
import App from '../App.vue'
const app = createApp(App)
app.use(i18n)
app.use(pinia)
app.use(vant)
// app.component('AudioPlay', AudioPlay)
app.component('NoList', NoList)

// Math.formatFloat (5.39 - 5.34, 2)
// f 计算表达式
// digit 小数位数
// 处理js小数精度丢失的bug
Math.formatFloat = function (f, digit) {
  var m = Math.pow(10, digit);
  return Math.round(f * m) / m;
}


export default app