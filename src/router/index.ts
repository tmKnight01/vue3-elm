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
  {
    path:"/profile",
    component: () => import('../pages/profile/profile.vue'),
    name: 'profile'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
