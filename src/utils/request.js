// 封装一个axios
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
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
axios.interceptors.response.use(function (response) {
  // 成功  200  201  204
  return response.data ? response.data : {}
}, function (error) {
  // 失败
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break

    case 507:
      message = '服务器数据库异常'
      break

    case 401:
      // token  失效或过期
      window.localStorage.removeItem('user-token') // 删除token
      router.push('/login') // 跳转到登录页
      break
    case 403:
      message = '没有设置这条评论的权限 '
      break
    default:
      break
  }
  Message({ type: 'warning', message }) // 提示消息
})
export default axios
