import "./assets/main.css";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import 'vant/lib/index.css';

import { createApp } from "vue";
import { createPinia } from "pinia";
import VConsole from 'vconsole';

import App from "./App.vue";
import router from "./router";
// 仅在开发环境初始化vConsole
if (import.meta.env.MODE !== 'production') {
    new VConsole();
  }
  console.log('当前环境',import.meta.env.MODE)


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus)
app.mount("#app");