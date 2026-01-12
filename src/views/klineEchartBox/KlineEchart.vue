<template>
  <div class="container">
    <!-- 完全保持原有的 HTML 结构 -->
    <div class="controls">
      <div class="chart-controls">
        <div class="control-group">
          <label class="switch-label">副图显示控制:</label>
          <div class="switches" id="chartSwitchesContainer">
            <!-- 动态生成的副图开关将在这里插入 -->
          </div>
          <button id="toggleAllCharts" class="btn-toggle">全部切换</button>
        </div>
      </div>

      <div class="control-group">
        <button id="resetBtn">重置图表</button>
        <button id="fullscreenBtn">全屏</button>
      </div>
    </div>

    <!-- 中间内容区域 -->
    <div>
      <!-- 主图：K线图 -->
      <div class="chart-container">
        <div id="mainChart" style="width: 100%; height: 800px;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 页面加载完成后直接加载 chart.js
  const script = document.createElement('script')
  script.src = '/src/utils/depend/echarts.min.js'
  script.type = 'module'
  document.head.appendChild(script)
  const script2 = document.createElement('script')
  script2.src = '/src/views/klineEchartBox/klineEchart/chart.js'
  script2.type = 'module'
  document.head.appendChild(script2)
})
</script>

<style scoped>
/* 引入原有样式 */
@import './klineEchart/style.css';

.container {
  width: 100%;
  height: 100vh;
}
</style>