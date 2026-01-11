<template>
  <div class="progress-bar">
    <div class="progress-bar-Left">
      <div class="progressLeft" :style="{ width: `${leftProgress}%`, backgroundColor: bgcColor, opacity: leftOpacity}"></div>
      <div class="percentageLeft" :style="{ left: `${100 - leftProgress}%` }">{{ leftProgress }}%</div>
    </div>
    <div class="progress-bar-Right">
      <div class="progressRight" :style="{ width: `${rightProgress}%`, backgroundColor: bgcColor, opacity: rightOpacity}"></div>
      <div class="percentageRight" :style="{ right: `${100 - rightProgress}%` }">{{ rightProgress }}%</div>
    </div>
  </div>

</template>

<script setup>
import { defineProps,computed  } from 'vue';

// 定义组件接收的属性
const props = defineProps({
  // 接收外部传入的百分比值，类型为数字，默认值为 0
  leftProgress: {
    type: Number,
    default: 0,
    // 验证传入的百分比值是否在 0 到 100 之间
    validator: (value) => value >= 0 && value <= 100
  },
  rightProgress: {
    type: Number,
    default: 0,
    // 验证传入的百分比值是否在 0 到 100 之间
    validator: (value) => value >= 0 && value <= 100
  },
    // 新增属性：左侧进度条的背景颜色，类型为字符串，默认值为 '#2196F3'
    bgcColor: {
    type: String,
    default: '#2196F3'
  },
});

// 计算左侧进度条的透明度
const leftOpacity = computed(() => {
  return props.leftProgress < props.rightProgress ? 0.6 : 1;
});

// 计算右侧进度条的透明度
const rightOpacity = computed(() => {
  return props.rightProgress < props.leftProgress ? 0.6 : 1;
});
</script>

<style scoped>
.progress-bar {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  position: relative;
}
.progress-bar-Left {
  position: relative;
  width: 100%;
  height: 10px;
  background-color: #EEEFF1;
  border-top-left-radius: 5px;
  border-bottom-left-radius:  5px;
  overflow: hidden;
  flex: 1;
}

.progressLeft {
  height: 100%;
  background-color: #2196F3;
  border-top-left-radius: 5px;
  border-bottom-left-radius:  5px;
  float: right;
  position: relative;
}

.percentageLeft {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 12px;
  padding: 0 5px;
  font-size: 8px;
  font-family: SourceHanSansCN-R;
}

.progress-bar-Right {
  position: relative;
  width: 100%;
  height: 10px;
  background-color: #EEEFF1;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
  flex: 1;
  left: -3px;
}

.progressRight {
  height: 100%;
  background-color: #827FFF;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  position: relative;
}

.percentageRight {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  color: white;
  padding: 0 5px;
  font-size: 8px;
  font-family: SourceHanSansCN-R;
}
</style>