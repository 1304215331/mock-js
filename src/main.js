import Vue from 'vue'
import App from './App.vue'
// 导入mack
import "./mack/mack"
// 导入elment ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import store from './store/index'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
