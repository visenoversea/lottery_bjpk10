import { createI18n } from 'vue-i18n'
import zhData from '@/lang/zh-CN.js'
import en from '@/lang/en.js'
const locales = {
  zh: zhData,
  en: en
}

const i18n = createI18n({
  legacy:false, //默认使用 旧版 api 会报错, 要使用 组合式api 设置成false即可
  // locale: 'zh-CN',
  messages: {
    // 'zh-CN': locales.zh,
    // 'en': locales.en
  }
})

export default i18n