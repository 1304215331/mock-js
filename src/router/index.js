import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index/index.vue";
import login from "../views/login/index.vue"
import store from "../store/index"
Vue.use(VueRouter);
const routes = [
  {
    path: "/index/:key",
    name: "index",
    component: index
  },
  {
      path: "/",
      redirect: "/login"
  },
  /* 重定向 */
  {
    path:'/login',
    component : login,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
 /* @to : 需要去到的页面 
    @from : 上一级页面
    @next : 回掉函数 下一个 */
 router.beforeEach((to,from,next)=>{
   // 如果用户未登陆
   if(!store.state.token && to.path !== '/login'){
    next("/login")
   }
   next()  // next() 必须调用  不然跳转不了
}) 

export default router;