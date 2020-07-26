import axios from 'axios'
const ConfigBaseURL = '/api' //默认路径，这里也可以使用env来判断环境
const Service = axios.create({
    timeout: 4000, // 请求超时时间
    baseURL: ConfigBaseURL,
})
Service.defaults.withCredentials = true;
//// 表示跨域请求时是否需要使用凭证，跨域访问需要发送cookie时一定要加
// 添加请求拦截器
// Service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Service.interceptors.request.use(config => {
        return config
    })
    // 添加响应拦截器
Service.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})
export default Service;