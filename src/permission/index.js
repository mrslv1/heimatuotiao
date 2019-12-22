// 路由拦截器   导航守卫
import router from '../router'

// 当路由发生变化时 这个方法里的回调函数会执行
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next() // 放过
    } else {
      next('/login') // 跳转到登录页
    }
  } else {
    next() // 直接放过
  }
})
