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
    path: "/profile",
    component: () => import("../pages/profile/profile.vue"),
    name: "profile",
  },
  {
    path: "/city/:city_id",
    component: () => import("../pages/city/search.vue"),
    name: "city",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
