import Vue from 'vue'
import Router from 'vue-router'
import adminHome from "./views/admin/home"
import adminDoc from './views/admin/admin'
import home from './views/client/home'
import client from './views/client/client.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/client',
      name: 'client',
      component: client
    },
    {
      path:'/admin/doc',
      name:'adminDoc',
      component:adminDoc
    },
    {
      path:'/admin/home',
      name:'adminHome',
      component:adminHome
    }
  ]
})