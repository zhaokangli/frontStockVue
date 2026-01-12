<template>
  <div class="homeBox">
    <el-container>
      <el-header style="padding: 0">
        <el-menu
          :default-active="activeIndex2"
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
            <el-icon><User /></el-icon>
            <span>我的</span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>主体</el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { TrendCharts, Coin, User } from "@element-plus/icons-vue";

const activeIndex2 = ref("1");

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};

onMounted(() => {});
</script>

<style scoped lang="less">
.el-menu-demo {
  width: 100%;
  padding-left: 100px;
  height: 65px;
}
.homeBox {
  .icon {
    width: 15px;
  }
}
</style>
