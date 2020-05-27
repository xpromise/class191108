// 封装axios,设置请求拦截器和响应拦截器
// 引入axios
import axios from 'axios'
// 引入nprogress插件包及样式
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
// 1. 配置一个通用的基础路径和请求超时时间
const ajax = axios.create({
  // 注意大小写
  baseURL: '/api', // 前缀路径
  timeOut: 20000 // 连接请求超时时间
})
// 请求拦截器
ajax.interceptors.request.use(config => {
  // 2.请求的时候显示进度条
  Nprogress.start() // 此时是显示进度条(响应成功了或者失败的时候需要隐藏进度条)
  // 5.所有的请求头都需要携带userTempId 
  config.headers['userTempId'] = store.state.user.userTempId // 用户临时id凭证 --->vuex--->store.state.user.userTempId
  // 6. 如果有了token,请求的时候自动的携带token
  const token = store.state.user.userInfo.token
 
  if (token) {
    config.headers['token'] = token
  }
  return config
})
// 响应拦截器
ajax.interceptors.response.use(response => {
  Nprogress.done() // 隐藏进度条
  // 3. 响应成功后返回的是数据response.data,不是response
  return response.data
}, error => {
  Nprogress.done() // 隐藏进度条
  // 4.统一处理请求错误,具体的请求可以选择处理或不处理
  alert('请求出错:' + error.message || '未知错误')
  // return new Promise(()=>{}) // 中断Promise链,具体的请求就不能再处理了
  return Promise.reject(error) // 返回失败的Promise,具体的请求可以再处理
})
// 向外暴露ajax
export default ajax