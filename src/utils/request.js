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
export default axios
