import axios from "axios"
import pinia from '@/stores/pinia'
import useStore from '@/stores/index'
import { ElMessage } from 'element-plus'
const store = useStore(pinia)
const MODE = import.meta.env.MODE

const _axios = axios.create({
    baseURL: MODE == 'development' ? '/api' : '',
    timeout: 30000, // Timeout
    headers: {'X-Requested-With': 'XMLHttpRequest'}
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
});

_axios.interceptors.request.use(
    function(config) {
        //发送前拦截
        config.headers['token'] = store.token
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
)

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        if (response.data.code >= 0) {
            //返回结果
            response.success = true
        } else {
            response.success = false
            if (response.data.code == -1) {
                if (response.data.href) {
                    //强制跳转
                    window.location.href = response.data.href;
                } else {
                    //退出登录
                    store.signOut()
                }
            } else if (response.data.code == -2) {
                //错误提示
                ElMessage.error(response.data.msg)
            }
        }
        return response;
    },
    function (error) {
        ElMessage.error('网络异常:' + error.response.status)
        error.response.success = false
        return error.response;
    }
)

export default {
    //get请求
    get: (url, data = {}) => _axios.get(url, {params: data}),
    //json格式post请求
    post: (url, data = {}, config = {}) => _axios.post(url, data, config),
    //上传文件
    postFile: (url, data = {}) => _axios.post(url, data, {headers: {'Content-Type': 'multipart/form-data'}}),
    //form格式post请求
    // postForm: (url, data = {}) => _axios.post(url, qs.stringify(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}),
    // //form格式post请求
    // putForm: (url, data = {}) => _axios.put(url, qs.stringify(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}),
    // //删除请求
    // delete: (url, data = {}) => _axios.delete(url, {params: data}),
    // //配置请求
    // request: config => _axios(config),
}