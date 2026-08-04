<template>
  <div class="child-a" :style="{ background: bgColor }">
    <h3>🟦 Child A</h3>
    <p>收到主题：{{ theme }}</p>
  </div>
</template>

<script>
export default {
  name: "ChildA",
  data() {
    return {
      theme: "light",
      bgColor: "#f0f0f0",
    };
  },
  methods: {
    // 父组件会调用这个方法
    onThemeChange(newTheme) {
      this.theme = newTheme;
      this.bgColor = newTheme === "dark" ? "#333" : "#f0f0f0";
      console.log("🟦 ChildA 收到主题更新:", newTheme);
    },
  },
};
</script>

<style scoped>
.child-a {
  padding: 15px;
  margin: 10px 0;
  border: 2px solid #4a90d9;
  border-radius: 8px;
  transition: background 0.3s;
}
</style>
