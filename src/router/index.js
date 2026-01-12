/*
 * @Description: 路由列表
 * @Author: laoyuan
 * @Date: 2024-05-26 16:47:47
 */
import { createRouter, createWebHistory,createWebHashHistory  } from "vue-router";
// import HomeView from "../views/home.vue";

const router = createRouter({
    // history: createWebHistory(import.meta.env.VITE_BASE_PATH),
    history: createWebHistory(import.meta.env.VITE_BASE_PATH), //配置mbtiweb后刷新会404
    // history: createWebHashHistory('/mbtiweb/'),
    routes: [{
            path: "/",
            name: "home",
            component: () => import ("../views/home.vue"),
        },
    ],
});

export default router;