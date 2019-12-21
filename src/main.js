import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUl from 'element-ui'
import Component from './components/index'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './style/index.less' // 引入初始化文件
Vue.config.productionTip = false
Vue.use(ElementUl) // 全局注册
Vue.use(Component) // 全局注册
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // 赋值给全局属性

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
