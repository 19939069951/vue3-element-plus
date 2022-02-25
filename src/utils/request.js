/*
 * @Description: axios 二次封装
 * @Author: Li Guangyin
 * @Date: 2022-02-23 19:56:26
 * @LastEditTime: 2022-02-25 22:37:32
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router/index'
import config from '../config/index'
// 创建axios实例对象,添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000,
})

// 请求拦截
service.interceptors.request.use((req)=>{
  // todo
  const headers = req.headers;
  if(!headers.Authorize){  
  }
  return req;
})

// 响应拦截
service.interceptors.response.use((res)=>{
  const {code,data,msg} = res.data
  if(code === 200){
    return data
  } else if(code === 50001){
    ElMessage.error('token 已过期,请重新登录')
    setTimeout(()=>{
      router.push('/login')
    },3000)
    return Promise.reject('token 已过期,请重新登录')
  } else {
    ElMessage.error('网络异常!')
    return Promise.reject('网络异常!')
  }
})
/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
function request(options){
  options.method = options.method || 'get'
  if(options.method.toLowerCase() === 'get'){
    options.params = options.data;
  }
  if(typeof options.mock != 'undefined'){
    config.mock = options.mock 
  }
  // 确保线上调的地址是正确的地址,而不是mock地址
  if(config.env === 'prod'){
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi:config.baseApi
  }
  return service(options)
}

export default request