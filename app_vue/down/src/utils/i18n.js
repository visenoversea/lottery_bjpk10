import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);
// const locales = {
//   zh: require('@/lang/zh-CN.js'),
// }
export const i18n = new VueI18n({
  // locale: 'zh-CN',
  messages: {
    // 'zh-CN': locales.zh
  }
});