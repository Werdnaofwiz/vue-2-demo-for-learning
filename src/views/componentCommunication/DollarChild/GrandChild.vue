<template>
  <div class="grand-child" :style="{ background: bgColor }">
    <h4>🔹 GrandChild（嵌套在 ChildB 中）</h4>
    <p>收到主题：{{ theme }}</p>
  </div>
</template>

<script>
export default {
  name: "GrandChild",
  data() {
    return {
      theme: "light",
      bgColor: "#fff3e0",
    };
  },
  methods: {
    onThemeChange(newTheme) {
      this.theme = newTheme;
      this.bgColor = newTheme === "dark" ? "#bf360c" : "#fff3e0";
      console.log("🔹 GrandChild 收到主题更新:", newTheme);
    },
  },
};
</script>

<style scoped>
.grand-child {
  padding: 10px;
  margin-top: 10px;
  border: 2px solid #ff9800;
  border-radius: 6px;
  transition: background 0.3s;
}
</style>
