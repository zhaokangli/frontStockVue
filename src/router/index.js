/*
 * @Description: 路由列表
 * @Author: laoyuan
 * @Date: 2024-05-26 16:47:47
 */
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
// import HomeView from "../views/home.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home.vue"), //父布局（含菜单栏）
      // 配置子路由：所有子页面都渲染在home的<router-view>中
      children: [
        {
          path: "", // 空路径：默认显示首页内容（可新建home-content.vue）
          name: "homeContent",
          component: () => import("../views/homeContent.vue"), // 新增首页内容组件
        },
        {
          path: "kLine", // 子路由路径：/kLine（无需加/）
          name: "kLine",
          component: () => import("../views/klineEchartBox/KlineEchart.vue"),
        },
        {
          path: "record",
          name: "record",
          component: () => import("../views/record.vue"),
        },
        {
          path: "mine",
          name: "mine",
          component: () => import("../views/mine.vue"),
        },
        // 二级菜单对应子路由（新增核心）
        {
          path: "one",
          name: "one",
          component: () => import("../views/one.vue"),
        },
        {
          path: "two",
          name: "two",
          component: () => import("../views/two.vue"),
        },
      ],
    },
  ],
});

export default router;
