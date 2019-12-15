import Vue from 'vue'
import Router from 'vue-router'
import adminHome from "./views/admin/home"
import editDoc from './views/admin/editDoc'
import home from './views/client/home'
import client from './views/client/client.vue'
import fileSystem from './views/admin/fileSystem.vue'
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
      name:'editDoc',
      component:editDoc
    },
    {
      path:'/admin/home',
      name:'adminHome',
      component:adminHome
    },
    {
      path:'/admin/fileSystem',
      name :'fileSystem',
      component:fileSystem
    }
  ]
})