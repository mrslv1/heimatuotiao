import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUl from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './style/index.less' // 引入初始化文件
Vue.use(ElementUl)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
