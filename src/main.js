import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUl from 'element-ui'
Vue.config.productionTip = false
Vue.use(ElementUl)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
