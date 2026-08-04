<template>
  <div class="child-c">
    <h3>🟥 Child C</h3>
    <p>此组件不响应主题变化（没有实现 onThemeChange 方法）</p>
  </div>
</template>

<script>
export default {
  name: "ChildC",
};
</script>

<style scoped>
.child-c {
  padding: 15px;
  margin: 10px 0;
  border: 2px solid #e53935;
  border-radius: 8px;
}
</style>
