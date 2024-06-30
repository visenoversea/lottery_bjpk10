
const global = {
  toastShow: false,
  toastMsg: '',

  // zh_CN 简体中文
  // zh_HK 繁体中文
  // en_US 英文
  lang: window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : '',
  langList: [], //语言列表
  loadedLanguages: [],
  timeFlag: false, //节流阀

  setLanguage(lang) {
    window.localStorage.setItem('lang', lang)
    global.lang = lang
  },

  setToastShow(val, msg) {
    global.toastMsg = msg
    if(global.timeFlag) return
    global.timeFlag = true
    global.toastShow = val
    setTimeout(() => {
      global.timeFlag = false
      global.toastShow = false
    }, 2000);
  }
}

export default global
