import { createApp } from 'vue'
//统一样式
import '@/assets/css/normalize.css'
//ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//基础样式
import '@/assets/css/base.scss'
//进度条  yarn add nprogress
import 'nprogress/nprogress.css'
import pinia from '@/stores/pinia'
import App from '@/App.vue'
import router from '@/router/index'

const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.mount('#app')
