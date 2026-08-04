<template>
  <div class="child-b" :style="{ background: bgColor }">
    <h3>🟩 Child B</h3>
    <p>收到主题：{{ theme }}</p>
    <!-- ChildB 内部还嵌套了一个更深层的组件 -->
    <GrandChild />
  </div>
</template>

<script>
import GrandChild from "./GrandChild.vue";

export default {
  name: "ChildB",
  components: { GrandChild },
  data() {
    return {
      theme: "light",
      bgColor: "#e8f5e9",
    };
  },
  methods: {
    onThemeChange(newTheme) {
      this.theme = newTheme;
      this.bgColor = newTheme === "dark" ? "#2e7d32" : "#e8f5e9";
      console.log("🟩 ChildB 收到主题更新:", newTheme);

      // ⚠️ 注意：这里也可以继续向下广播，但需要手动传递
      // 如果 GrandChild 也需要响应，我们需要在 ChildB 中再遍历一次
      this.$children.forEach((child) => {
        if (typeof child.onThemeChange === "function") {
          child.onThemeChange(newTheme);
        }
      });
    },
  },
};
</script>

<style scoped>
.child-b {
  padding: 15px;
  margin: 10px 0;
  border: 2px solid #43a047;
  border-radius: 8px;
  transition: background 0.3s;
}
</style>
