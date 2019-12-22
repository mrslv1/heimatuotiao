// 封装一个axios
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置常态值

// 请求拦截
axios.interceptors.request.use(function (config) {
  // 请求拦截
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config
}, function () {
  // 执行请求错误

})
// 响应拦截器
axios.interceptors.respo.use(function (response) {
  // 成功  200  201  204
  return response.data ? response.data : {}
}, function () {
  // 失败
})
export default axios
