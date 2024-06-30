import qs from 'qs'
import axios from 'axios';

// import Router from '@/router/index.js'

import global from '@/utils/global.js'

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/api' : ''

axios.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['lang'] = global.lang
  return config
},error => {
  return Promise.reject(error)
})


axios.interceptors.response.use(response => {
  if (response.data.code === -1 ) {
    // global.logout()
  }else if(response.data.code === -2 ) {
    // Toast(response.data.msg)
  }
  return response
},error => {
  // Toast('网络异常:'+error.response.status)
  // global.loadingShow = false
  return Promise.reject(error)
})

const handleResponse = (data) => {
  if(data.data.code < 0) return Object.assign(data, { success: false })
  return Object.assign(data, { success: true })
}

export const apiGetData = async (url) => handleResponse(await axios.get(url))

// post 请求
export const apiPostData = async (url, params = {}) => handleResponse(await axios.post(url, qs.stringify(params),  { headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}} ))

// 上传post文件
export const apiPostFile = async (url, params ={}) => handleResponse(await axios.post(url, params, { headers: {'Content-Type': 'multipart/form-data' }}))

// 获取app信息
export const apiGetInfo = () => apiGetData('/main/index/getAppInfo')

// 获取初始化
export const apiGetConfig = (params) => apiPostData('/main/index/init', params)

// 加载语言包
export const apiLoadLanguage =  (params) => apiPostData('/main/lang/getData', params)
