import useClipboard from 'vue-clipboard3'
import { Toast } from 'vant'
// 这边的i18n要和全局的共用同一个不能使用// import { useI18n } from "vue-i18n";
// const i18nObj = useI18n()这种方式引入 会报错的
import i18n from "@/utils/i18n";

import router from "@/router/index"

import useStore from '@/store/index.js'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

// pinia状态管理仓库
const store = useStore();

// console.log('i18ni18ni18n', i18n)
const i18nObj = i18n.global
// console.log('i18nObji18nObji18nObji18nObj', i18nObj)
const { toClipboard } = useClipboard()


// 复制函数
export const copyClick = async (value) => {
  value = value.toString()
  try {
    await toClipboard(value)
    // i18nObj.tm('cashoutbi').titleText
    Toast(i18nObj.tm('jsLanguage').copySuccessText)
    return true
  } catch (e) {
    console.error(e)
    return Promise.reject(false)
  }
}

export const filtersZhangfu = (value, fixed = 2) => {
  if (value > 0) {
    return '+' + (value * 100).toFixed(fixed) + '%'
  } else if (value == 0) {
    return (value * 100).toFixed(fixed) + '%'
  } else {
    return (value * 100).toFixed(fixed) + '%'
  }
}



// 数组去重
export const uniqueArr = (arr) => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}


// 处理价格用逗号分隔
export const dotDealWith = (str) => {
  str = str.toString()
  var dotStr = str.split(".")[1];
  var intStr = parseInt(str).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  if (!dotStr) return intStr
  return intStr + '.' + dotStr
}

// Math.formatFloat (5.39 - 5.34, 2)
// f 计算表达式
// digit 小数位数
// 处理js小数精度丢失的bug
Math.formatFloat = function (f, digit) {
  digit = Number(digit)
  var m = Math.pow(10, digit);
  return Math.round(f * m) / m;
}


export const formatDownFloat = (f, digit) => {
  digit = Number(digit)
  var m = Math.pow(10, digit);
  // return Math.round(f * m) / m;
  return Math.floor(f * m) / m;
}

// 取出全部
export const cashoutMoney = (total, fee, fixed = 2) => {
  total = Number(total)
  fee = Number(fee)
  if (fee > 0) {
    if (fee < 1) {
      var m = Math.pow(10, fixed)
      var canUse = total / (1 + fee)
      return (Math.floor(canUse * m) / m).toFixed(fixed)
    } else {
      if (total <= fee) return 0
      return formatDownFloat(Number(total - fee), fixed)
    }
  } else {
    return total.toFixed(fixed)
  }
}

// sku数据处理 
// arguments => [
//   ['白', '黑'],
//   ['120g', '140g', '160g'],
//   ['500', '1000', '1500'],
// ]
export const skuDealWidthData = function () {
  return Array.prototype.reduce.call(arguments, (a, b) => {
    var ret = [];
    a.forEach((a) => {
      b.forEach((b) => {
        ret.push(a.concat([b]));
      });
    });
    return ret;
  }, [[]]);
}

export const filtersProductType = (type) => {
  if (type == 0) return i18nObj.tm('jsLanguage').bibiText
  if (type == 1) return i18nObj.tm('jsLanguage').heyueText
  else if (type == 2) return i18nObj.tm('jsLanguage').miaoheyueText
  else if (type == 3) return i18nObj.tm('jsLanguage').dianchaText
  return ''
}


export const formatDate = (timestamp, format = 'YYYY-MM-DD HH:mm:ss', timeZone = 'Asia/Shanghai') => {
  let dateObj;
  if (timestamp === 0) {
    return '-';
  } else if (timestamp) {
    dateObj = timestamp.toString().length === 13 ? dayjs(timestamp) : dayjs.unix(timestamp)
  } else if (timestamp instanceof Date) {
    dateObj = dayjs(timestamp)
  } else {
    dateObj = dayjs()
  }
  if (timeZone) {
    dateObj = dateObj.tz(timeZone)
  }
  return dateObj.format(format)
}
//时间戳格式化 00:00:00
export const dealWithHourMinsSec = (stamp) => {
  console.log("stamp:" + stamp);
  if (stamp < 1) return "--:--:--";
  let hour = Math.floor((stamp / 3600) % 24);
  let min = Math.floor((stamp / 60) % 60);
  let sec = Math.floor((stamp / 1) % 60);
  return `${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}:${
    sec < 10 ? "0" + sec : sec
  }`;
}
// // 日期格式化
// export const formatDate = (timestamp, template = 'yyyy-MM-dd', timeZone = 'Europe/Berlin') => {
//   let str = '' + timestamp
//   if (str.length < 10) return '-'
//   if (str.length <= 10) timestamp *= 1000
//   let dateObj = new Date(timestamp)
//   if(timeZone == 'America/New_York') {
//   // 获取当前时间和0时区的偏移量 分钟
//     var offset = dateObj.getTimezoneOffset();
//     // 获取0时区时间戳
//     var utcTime = dateObj.getTime() + (offset * 60 * 1000)
//     let newYorkTime = utcTime - (4 * 3600 * 1000)
//     dateObj = new Date(newYorkTime)
//   }else if(timeZone == 'Europe/Berlin') {
//     var offset = dateObj.getTimezoneOffset();
//     // 获取0时区时间戳
//     var utcTime = dateObj.getTime() + (offset * 60 * 1000)
//     let berLinTime = utcTime + (1 * 3600 * 1000)
//     dateObj = new Date(berLinTime)
//   }
//   return dateObj.format(template)
// }


Date.prototype.format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return fmt
}

export const inoutClass = (value) => {
  value = Number(value)
  if (value >= 0) return 'g-in'
  return 'g-out'
}

export const upDownClass = (value) => {
  value = Number(value)
  if (value > 0) return 'g-up'
  else if (value == 0) return 'g-0'
  else return 'g-down'
}

export const buyDownOrUpClass = (value) => {
  if (value == 1) return 'g-up'
  else return 'g-down'
}

export const upDownBgClass = (value) => {
  if (value > 0) return 'g-bg-up'
  else if (value == 0) return 'g-bg-zero'
  else return 'g-bg-down'
}

export const upDownBgFontColorClass = (value) => {
  value = Number(value)
  if (value > 0) return 'g-bg-font-color-up'
  else if (value == 0) return 'g-bg-font-color-zero'
  else return 'g-bg-font-color-down'
}

export const formatVolume = (volume, fixed) => {
  const abbreviations = {
    B: 1000000000,
    M: 1000000,
    k: 1000
  };

  for (const abbreviation in abbreviations) {
    if (volume >= abbreviations[abbreviation]) {
      return (volume / abbreviations[abbreviation]).toFixed(fixed) + abbreviation;
    }
  }

  return volume.toFixed(fixed);
}



// 秒数转换成hh:mm:ss格式
export const formatSeconds = (value) => {
  let secondTime = parseInt(value);
  if (typeof secondTime == 'number') {
    let minuteTime = 0;
    let hourTime = 0;
    if (secondTime >= 60) {
      minuteTime = parseInt(secondTime / 60);
      secondTime = parseInt(secondTime % 60);
      if (minuteTime >= 60) {
        hourTime = parseInt(minuteTime / 60);
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    // 补0
    hourTime = hourTime < 10 ? "0" + hourTime : hourTime;
    minuteTime = minuteTime < 10 ? "0" + minuteTime : minuteTime;
    secondTime = secondTime < 10 ? "0" + secondTime : secondTime;
    let res = hourTime + ":" + minuteTime + ":" + secondTime;
    return res;
  } else {
    return '00:00:00'
  }
}

/**
 * @param {*} element 需要绑定事件的元素
 * @param {*} type    需要为元素绑定的事件类型
 * @param {*} fu      需要为元素绑定的事件
 */

export const addEventListener = (element, type, fu) => {
  if (element.addEventListener) {
    element.addEventListener(type, fu, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, fu);
  } else {
    element["on" + type] = fu;
  }
}


// 监听页面是否可见
export const pageCanSee = (visibleCallBack, hiddenCallBack) => {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState == "visible") {
      console.log('页面可见')
      visibleCallBack()
    }
    if (document.visibilityState == "hidden") {
      console.log('页面不可见')
      hiddenCallBack()
    }
  })
}

//自定义require方法
export const myRequire = (name) => {
  return new URL(`../assets/img/${name}`, import.meta.url).href
}


export const nameSameRouterPush = () => {
  router.push({ name: 'main', query: { id: new Date().getTime() } }).then(faile => {
    console.log('faile', faile)
    if (faile && (faile.to.name == faile.from.name)) {
      router.push({ name: 'refresh' })
    }
  })
}


export const filtersRealStatusClass = (status) => {
  if (status == 0) return 'g-red'
  if (status == 1) return 'g-green'
  if (status == 2) return 'g-blue'
  if (status == 3) return 'g-blue'
  return 'g-grey'
}

export const getShowTime = (time) => {
  time = Number(time)
  if (time == 129600) {
    return '36H'
  } else if (time >= 86400) {
    return Math.floor(time / 86400) + 'D'
  } else if (time >= 3600) {
    return Math.floor(time / 3600) + 'H'
  }
  return time + 'S'
}

// 买入卖出
export const filtersBibiSide = (val) => {
  if (val == 1) return '买入'
  else if (val == 2) return '卖出'
  return ''
}

// 买涨买跌
export const filtersSide = (val) => {
  if (val == 1) return i18nObj.tm('jsLanguage').maizhangText
  else if (val == 2) return i18nObj.tm('jsLanguage').maidieText
  return ''
}


// 做多做空
export const filtersDuoKong = (val) => {
  if (val == 1) return i18nObj.tm('jsLanguage').zuoduoText
  else if (val == 2) return i18nObj.tm('jsLanguage').zuokongText
  return ''
}

// 做多做空按钮颜色
export const filterDuoKongClass = (side) => {
  if (side == 1) return 'g-pop-duo-btn'
  else return 'g-pop-kong-btn'
}

// 做多做空字体颜色
export const filterDuoKongFontColorClass = (side) => {
  if (side == 1) return 'g-duo-color'
  else return 'g-kong-color'
}


export const kefuClick = () => {
  if (store.kefu.KefuMode == 0) {
    // window.open(store.kefu.KefuUrl)
    window.location.href = store.kefu.KefuUrl
  } else {
    router.push({ name: 'kefu' })
  }
}


export const filterBankCardNumber = (strVal) => {
  let headString = strVal.substr(0, 4)
  let endString = strVal.substr(strVal.length - 2)
  return headString + '****' + endString
}