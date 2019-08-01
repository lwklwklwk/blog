import Vue from 'vue'
import App from './App.vue'
import router from './router'
import service from './myaxios'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.config.productionTip = false

Vue.prototype.$axios= service;

export default new Vue({
  render: h => h(App),
  router
}).$mount('#app')
