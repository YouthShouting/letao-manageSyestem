import Vue from 'vue'
import App from './App.vue'
// 引入router
import router from './router'
import store from './store'
import 'reset-css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/lt_index.scss'
import {
  checkRootLogin
} from '@/api'
Vue.config.productionTip = false
// 路由全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    checkRootLogin().then(res => {
      if (res.data.success) {
        next()
      } else {
        next('/login')
      }
    })
  } else {
    next()
  }
})
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
