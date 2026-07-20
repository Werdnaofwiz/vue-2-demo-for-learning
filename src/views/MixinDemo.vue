<!-- src/views/MixinDemo.vue -->
<template>
  <div>
    <h2>用户面板</h2>
    <p>操作次数: {{ logCount }}</p>
    <button @click="logAction('点击了登录按钮')">模拟登录</button>
    <button @click="logAction('点击了刷新按钮')">模拟刷新</button>
  </div>
</template>

<script>
import loggerMixin from "@/mixins/logger";
export default {
  name: "MixinDemo",
  mixins: [loggerMixin], // 直接注入
  mounted() {
    // 注意：这里会先执行 mixin 的 mounted，再执行这个
    console.log("MixinDemo 组件已挂载");
    this.logAction("组件初始化完成");
  },
};
</script>

<style scoped></style>
