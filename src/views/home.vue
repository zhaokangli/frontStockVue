<template>
  <div class="homeBox">
    <el-container>
      <el-header style="padding: 0">
        <div class="headerBox">
          <div class="headerLeft">
            <div class="logo" @click="backHome"><h1>选股</h1></div>
            <!-- 循环渲染菜单 -->
            <el-menu
              :default-active="activeIndex"
              :ellipsis="false"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleMenuSelect"
            >
              <!-- 一级菜单 -->
              <template v-for="menu in menuList" :key="menu.index">
                <!-- 有二级菜单的情况 -->
                <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.index">
                  <template #title>
                    <el-icon v-if="menu.icon"><component :is="menu.icon" /></el-icon>
                    <span>{{ menu.label }}</span>
                  </template>
                  <!-- 二级菜单 -->
                  <el-menu-item
                    v-for="subMenu in menu.children"
                    :key="subMenu.index"
                    :index="subMenu.index"
                  >
                    {{ subMenu.label }}
                  </el-menu-item>
                </el-sub-menu>

                <!-- 无二级菜单的一级菜单 -->
                <el-menu-item v-else :index="menu.index">
                  <el-icon v-if="menu.icon"><component :is="menu.icon" /></el-icon>
                  <span>{{ menu.label }}</span>
                </el-menu-item>
              </template>
            </el-menu>
          </div>
          <div
            class="headerRight"
            @mouseenter="logoutShow = true"
            @mouseleave="logoutShow = false"
          >
            <img
              class="loginIcon"
              src="../assets/image/login.png"
              alt="登录图标"
            />
            <div v-if="logoutShow" class="dropdownMenu">
              <span>退出登录</span>
            </div>
          </div>
        </div>
      </el-header>
      <!-- 子路由出口 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
// 引入需要的图标
import { TrendCharts, Coin, User, Document } from "@element-plus/icons-vue";

// 路由实例
const router = useRouter();
const route = useRoute();

// 定义导航菜单数据结构（核心）
const menuList = [
  {
    index: "1", // 唯一标识
    label: "首页", // 菜单名称
    icon: Coin, // 图标组件
    path: "/", // 跳转路径
  },
  {
    index: "2",
    label: "二级",
    icon: "", // 二级菜单父项可无图标
        children: [
      {
        index: "2-1",
        label: "one",
        path: "/one", // 对应二级菜单页面路由（必须与router配置一致）
      },
      {
        index: "2-2",
        label: "two",
        path: "/two", // 对应二级菜单页面路由（必须与router配置一致）
      },
    ],
  },
  {
    index: "3",
    label: "k线展示图",
    icon: TrendCharts,
    path: "/kLine",
  },
  {
    index: "4",
    label: "记录",
    icon: Document,
    path: "/record",
  },
  {
    index: "5",
    label: "我的",
    icon: User,
    path: "/mine",
  },
];

// 响应式数据
const logoutShow = ref(false);
// 当前激活的菜单（默认匹配首页）
const activeIndex = ref("1");

// 同步菜单激活状态（兼容二级菜单）
onMounted(() => {
  syncActiveMenu();
});
router.afterEach(() => {
  syncActiveMenu();
});

// 根据路由路径查找对应菜单（兼容一级/二级）
const findMenuByPath = (path) => {
  for (const menu of menuList) {
    // 匹配一级菜单
    if (menu.path === path) {
      return menu;
    }
    // 匹配二级菜单（核心：遍历children）
    if (menu.children && menu.children.length) {
      const subMatch = menu.children.find((subMenu) => subMenu.path === path);
      if (subMatch) {
        return subMatch;
      }
    }
  }
  // 默认返回首页
  return menuList[0];
};

// 同步激活状态
const syncActiveMenu = () => {
  const currentPath = route.path;
  const matchMenu = findMenuByPath(currentPath);
  if (matchMenu) {
    activeIndex.value = matchMenu.index;
  }
};

// 菜单点击事件（兼容一级/二级，自动匹配path跳转）
const handleMenuSelect = (key) => {
  const clickMenu = findMenuByIndex(key);
  if (clickMenu && clickMenu.path) {
    router.push({ path: clickMenu.path });
    activeIndex.value = key;
  }
};

// 根据index查找菜单（兼容一级/二级）
const findMenuByIndex = (index) => {
  // 先查一级菜单
  let targetMenu = menuList.find((menu) => menu.index === index);
  if (targetMenu) return targetMenu;
  // 再查二级菜单
  for (const menu of menuList) {
    if (menu.children && menu.children.length) {
      targetMenu = menu.children.find((subMenu) => subMenu.index === index);
      if (targetMenu) return targetMenu;
    }
  }
  return null;
};

// 返回首页方法
const backHome = () => {
  router.push({ path: "/" });
  activeIndex.value = "1";
};
</script>

<style scoped lang="less">
.el-menu-demo {
  width: 100%;
  height: 65px;
  font-weight: 500;
  font-size: 22px;
}

.homeBox {
  .icon {
    width: 15px;
  }
  .headerBox {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 100px;
    background-color: var(--el-menu-bg-color);
    border-bottom: 1px solid var(--el-menu-border-color);
    .logo {
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      h1 {
        font-size: 22px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.3s ease;
        user-select: none;
      }
    }
    .headerLeft {
      display: flex;
      flex-direction: row;
    }

    .headerRight {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none !important;
      position: relative;
      width: fit-content;
      transition: background-color 0.2s;

      .loginIcon {
        width: 30px;
        height: 30px;
        display: block;
      }

      .dropdownMenu {
        border: 1px solid #444;
        background-color: #000;
        color: #fff;
        position: absolute;
        top: 65px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        z-index: 999;
        padding: 15px;
        text-align: center;

        &::before {
          content: "";
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 10px 10px 10px;
          border-style: solid;
          border-color: transparent transparent #444 transparent;
        }

        &::after {
          content: "";
          position: absolute;
          top: -9px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 10px 10px 10px;
          border-style: solid;
          border-color: transparent transparent #000 transparent;
        }
      }
    }
  }
}
</style>