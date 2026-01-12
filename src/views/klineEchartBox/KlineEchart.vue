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
onMounted(async () => {
  // 先加载 ECharts
  await loadECharts()
  // 再加载您的 chart.js
  loadChartScript()
})

const loadECharts = () => {
  return new Promise((resolve, reject) => {
    if (window.echarts) {
      resolve()
      return
    }
    
    const script = document.createElement('script')
    script.src = '/src/utils/depend/echarts.min.js'
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const loadChartScript = () => {
  const script = document.createElement('script')
  script.src = '/src/views/klineEchartBox/klineEchart/chart.js'
  script.type = 'module'
  document.head.appendChild(script)
}
// onMounted(() => {
//   const script = document.createElement('script')
//   script.src = '/src/views/klineEchartBox/klineEchart/chart.js'
//   script.type = 'module'
//   document.head.appendChild(script)
// })
</script>

<style scoped>
/* 引入原有样式 */
@import './klineEchart/style.css';

.container {
  width: 100%;
  height: 100vh;
}
</style>