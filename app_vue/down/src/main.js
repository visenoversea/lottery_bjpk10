import Vue from 'vue'

import '@/assets/css/normalize.css'
import '@/assets/css/global.scss'

import App from './App.vue'

//全局变量
import global from '@/utils/global.js';
Vue.prototype.$global = global
import { i18n } from '@/utils/i18n.js'
Vue.config.productionTip = false
Vue.use(i18n);
new Vue({
  data: {
    global
  },
  i18n,
  render: h => h(App),
}).$mount('#app')
