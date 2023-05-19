import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: readonly RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../pages/home/Home.vue"),
    name: "home",
    children: [],
  },
  {
    path: "/login",
    component: () => import("../pages/login/Login.vue"),
    name: "login",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
