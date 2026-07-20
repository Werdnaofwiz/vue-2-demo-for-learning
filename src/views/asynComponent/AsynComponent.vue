<template>
  <div>
    <h1>首页</h1>
    <!-- 只有 this.showChart = true 时，才会去加载 HeavyChart 组件 -->
    <HeavyChart v-if="showChart" />
    <button @click="showChart = true">查看图表</button>
  </div>
</template>

<script>
export default {
  components: {
    // 只有组件被渲染时，才会加载 HeavyChart.vue
    HeavyChart: () => import("./modules/HeavyChart.vue"),
  },
  data() {
    return {
      showChart: false,
    };
  },
};
</script>
