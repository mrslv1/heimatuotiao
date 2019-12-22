import Vue from 'vue'
import App from './App.vue'
import './permission' // 引用权限模块
import router from './router'
import ElementUl from 'element-ui'
import Component from './components/index'
import axios from './utils/request'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './style/index.less' // 引入初始化文件

Vue.config.productionTip = false
Vue.use(ElementUl) // 全局注册
Vue.use(Component) // 全局注册
Vue.prototype.$axios = axios // 赋值给全局属性

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
