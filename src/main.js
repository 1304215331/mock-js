import Vue from 'vue'
import App from './App.vue'
// 导入mack
import "./mack/mack"
// 导入elment ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入router
import router from "./router"
// 导入vuex
import store from './store/index'
// 导入默认css样式
import "@/style/base.css"
Vue.config.productionTip = false
new Vue({
  store,/* 挂载vuex */
  router,/* 挂载路由 */
  render: h => h(App)
}).$mount('#app')
