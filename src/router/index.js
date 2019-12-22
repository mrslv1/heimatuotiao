import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' // 强制转换
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Home2
    }, {
      path: 'comment',
      component: () => import('../views/comment')
    }]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes

})

export default router
