// 判断是否为外链
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

Date.prototype.format = function (format) {
    let date = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S+': this.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
        }
    }
    return format
}

export const formatDate = (timestamp, format = 'yyyy-MM-dd hh:mm:ss', timeZone = '') => {
    let dateObj;
    if (timestamp === 0) {
        return '-';
    } else if (timestamp instanceof Date) {
        dateObj = timestamp;
    } else if (timestamp) {
        dateObj = timestamp.toString().length === 13 ? new Date(Number(timestamp)) : new Date(timestamp * 1000)
    } else {
        dateObj = new Date()
    }
    if (timeZone) {
        //utc便偏移量
        let offset = dateObj.getTimezoneOffset()
        let utcTime = dateObj.getTime() + offset * 60000
        if (timeZone === 'America/New_York') {
            dateObj = new Date(utcTime - 3600000 * 4)
        }
        //安卓手机不支持
        // dateObj = new Date(dateObj.toLocaleString("zh", {timeZone: timeZone}))
    }
    return dateObj.format(format)
}

// Math.formatFloat (5.39 - 5.34, 2)
// f 计算表达式
// digit 小数位数
// 处理js小数精度丢失的bug
Math.formatFloat = function (f, digit) {
    const m = Math.pow(10, digit);
    return Math.round(f * m) / m;
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

// 点击下载 解决 无法下载非同源的图片问题 在浏览器中非同源图片下载的话直接打开 需要转成blol对象在转换成url对象进行下载
export const downClick = (file) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', file.filePath, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
        if (xhr.status === 200) {
            var link = document.createElement('a')
            var body = document.querySelector('body')
            // xhr.response 是一个 Blob 对象
            //  window.URL.createObjectURL 返回 新的URL对象表示指定的 File 对象或 Blob 的 URL 对象
            link.href = window.URL.createObjectURL(xhr.response)
            console.log(link.href)
            link.download = file.fileName
            // fix Firefox
            link.style.display = 'none'
            body.appendChild(link)
            link.click()
            body.removeChild(link)
            window.URL.revokeObjectURL(link.href)
        }
    }
    xhr.send()
}

/**
 * 对象深拷贝工具类
 * 拦截器：filter 参数[key, value, ang(fn)]
 */
export default class OUtil {
    constructor(...fn) {
        this.filters = fn
    }

    agn(source) {
        // 判空
        if (source == null) return null

        // 判断是否对象类型
        if (typeof source === 'object') {
            // 是否数组
            if (Array.isArray(source)) {
                let result = []
                for (let x in source) {
                    result.push(this.agn(source[x]))
                }
                return result
            }
            // 是否正则对象
            if (source.constructor === RegExp) return source

            // 为map类型
            let result = {}
            for (let key in source) {
                for (let index in this.filters) {
                    // 拦截器不是一个函数
                    if (!(typeof this.filters[index] === 'function')) {
                        result[key] = this.agn(source[key])
                    }
                    // 执行拦截器
                    let data = this.filters[index](key, source[key], this.agn)
                    // 没有结果返回时
                    result[key] = (typeof data === 'undefined') ? this.agn(source[key]) : data
                }
            }
            return result
        }
        // 不是对象则直接返回
        else {
            return source;
        }
    }
}

/**
 * 数据流转文件下载
 */
function exportFile(name, data) {
    const urlKit = window.URL || window.webkitURL || window
    const blob = new Blob([data])
    const link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    link.href = urlKit.createObjectURL(blob)
    link.download = name
    const event = document.createEvent("MouseEvents")
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    link.dispatchEvent(event)
}

export {
    OUtil,
    exportFile
}