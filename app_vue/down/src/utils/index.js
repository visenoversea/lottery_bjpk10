/**
 * @example
 * ```js
 * var string = new Date(time).format('yyyy-MM-dd hh:mm:ss')
 * ```
 * @param fmt
 * @return {*}
 */
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

// 日期格式化
export const formatDate = (timestamp, template = 'yyyy-MM-dd') => {
  let str = '' + timestamp
  if (str.length < 10) return null
  if (str.length === 10) timestamp *= 1000
  return new Date(timestamp).format(template)
}



/**
 * @param {*} element 需要绑定事件的元素
 * @param {*} type    需要为元素绑定的事件类型
 * @param {*} fu      需要为元素绑定的事件
 */
export const addEventListener = (element,type,fu) => {
  if(element.addEventListener){
      element.addEventListener(type,fu,false);
  }else if(element.attachEvent){
      element.attachEvent("on"+type,fu);
  }else{
      element["on"+type] = fu;
  }
}

export const isSafari = () => {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('applewebkit') > -1 && ua.indexOf('mobile') > -1 && ua.indexOf('safari') > -1 &&
      ua.indexOf('linux') === -1 && ua.indexOf('android') === -1 && ua.indexOf('chrome') === -1 &&
      ua.indexOf('ios') === -1 && ua.indexOf('browser') === -1) {
      return true;
  }else{
      return false;
  }
}