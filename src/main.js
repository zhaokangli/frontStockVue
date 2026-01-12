import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
// if you just want to import css
import 'element-plus/theme-chalk/dark/css-vars.css'
// 3. 引入自定义暗黑样式（关键，覆盖默认变量）
import './assets/dark-theme.css'
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
// 全局引入ECharts
import * as echarts from 'echarts'

import App from "./App.vue";
import router from "./router";
console.log('当前环境',import.meta.env.MODE)

// 关键：挂载前，强制给html根节点添加dark类名,开启暗黑模式
document.documentElement.classList.add('dark')
const app = createApp(App);
app.config.globalProperties.$echarts = echarts

app.use(createPinia());
app.use(router);
app.use(ElementPlus)
app.mount("#app");