import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Login1 from './views/Login1.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/users',
      children: [
        {
          name: 'users', path: 'users', component: () => import(/* webpackChunkName: "about" */ './views/Users.vue') },
        {
          name: 'firstCategory',
          path: 'firstCategory',
          component: () => import('./views/FirstCategory.vue')
        },
        {
          name: 'secondCategory',
          path: 'secondCategory',
          component: () => import('./views/SecondCategory.vue')
        },
        {
          name: 'proManage',
          path: 'proManage',
          component: () => import('./views/ProManage.vue')

        }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/login1',
      name: 'login1',
      component: Login1
    }
  ]
})
