import Vue from 'vue'
import Router from 'vue-router'
import client from './views/client.vue'
import admin from './views/admin'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'client',
      component: client
    },
    {
      path: '/client',
      name: 'client',
      component: client
    },
    {
      path:'/admin',
      name:'/admin',
      component:admin
    }
  ]
})