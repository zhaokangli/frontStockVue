<template>
  <div class="homeBox">
    <el-container>
      <el-header style="padding: 0">
        <div class="headerBox">
          <div class="headerLeft">
            <div class="logo" @click="backHome"><h1>选股</h1></div>
            <el-menu
              :default-active="activeIndex2"
              :ellipsis="false"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="1">
                <el-icon><Coin /></el-icon>
                <span>首页</span>
              </el-menu-item>
              <el-sub-menu index="2">
                <template #title>二级</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="3">
                <el-icon><TrendCharts /></el-icon>
                <span>k线展示图</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon><Document /></el-icon>
                <span>记录</span>
              </el-menu-item>
              <el-menu-item index="5">
                <el-icon><User /></el-icon>
                <span>我的</span>
              </el-menu-item>
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
      <el-main>主体</el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { TrendCharts, Coin, User, Document } from "@element-plus/icons-vue";

const logoutShow = ref(false);
const activeIndex2 = ref("1");

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
// 定义返回首页方法
const backHome = () => {
  // 跳转到首页路由（请根据实际路由配置修改路径，如首页路由path为"/"或"/home"）
  router.push({
    path: "/", 
  });
  // 同步更新菜单激活状态
  activeIndex2.value = "1";
};

onMounted(() => {});
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
      position: relative; /* 作为下拉菜单的定位容器 */
      width: fit-content; /* 宽度贴合图标，避免居中偏移 */
      transition: background-color 0.2s;

      .loginIcon {
        width: 30px;
        height: 30px;
        display: block; /* 消除图片默认间距 */
      }

      .dropdownMenu {
        border: 1px solid #444;
        background-color: #000;
        color: #fff;
        position: absolute;
        top: 65px;
        /* 1. 核心修改：取消固定 right，用 transform 实现水平居中 */
        left: 50%; /* 先让菜单左边缘对齐容器中心 */
        transform: translateX(-50%); /* 再向左偏移自身50%宽度，实现整体居中 */
        width: 100px;
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        z-index: 999;
        padding: 15px;
        text-align: center;

        /* 2. 小三角：同步居中（与菜单对齐） */
        &::before {
          content: "";
          position: absolute;
          top: -10px;
          left: 50%; /* 三角左边缘对齐菜单中心 */
          transform: translateX(-50%); /* 三角向左偏移自身50%，实现居中 */
          border-width: 0 10px 10px 10px;
          border-style: solid;
          border-color: transparent transparent #444 transparent;
        }

        &::after {
          content: "";
          position: absolute;
          top: -9px;
          left: 50%; /* 与 before 保持一致，同步居中 */
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
