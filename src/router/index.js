import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index/index.vue";
import login from "../views/login/index.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/index",
    name: "index",
    component: index
  },
  {
      path: "/",
      component : login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;