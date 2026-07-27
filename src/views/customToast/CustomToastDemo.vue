<template>
  <div class="outer-container">
    <section class="demo">
      <h1>Custom Toast 测试</h1>

      <div class="button-group">
        <button @click="showInfo">信息提示</button>
        <button @click="showSuccess">成功提示</button>
        <button @click="showWarning">警告提示</button>
        <button @click="showError">错误提示</button>
        <button @click="showCustom">自定义内容</button>
        <button @click="showLongDuration">长显示时间</button>
        <button @click="manualControl">手动控制</button>
      </div>
    </section>

    <hr />

    <CustomToastNotes />
  </div>
</template>

<script>
// 方式1：直接导入（即使没注册也能用）
import customToast from "@/ultils/customToast/customToast";
import CustomToastNotes from "./modules/CustomToastNotes.vue";

export default {
  components: { CustomToastNotes },
  methods: {
    showInfo() {
      // 使用 this.$customToast（已注册到 Vue 原型）
      this.$customToast.info("这是一条信息提示");
    },

    showSuccess() {
      // 使用导入的 customToast
      customToast.success("操作成功！", 2000);
    },

    showWarning() {
      this.$customToast.warning("请注意，这可能有风险", 4000);
    },

    showError() {
      this.$customToast.error("出错了，请重试", 5000);
    },

    showCustom() {
      // 自定义配置
      this.$customToast.show({
        message: "自定义消息，可以传对象",
        type: "info",
        duration: 2000,
      });

      // 或者直接传字符串
      // this.$customToast.show('简单消息', 2000)
    },

    showLongDuration() {
      this.$customToast.info("这个 Toast 会显示 10 秒", 10000);
    },

    manualControl() {
      // duration = 0 表示不自动关闭
      const instance = this.$customToast.info("加载中...", 0);

      // 模拟异步操作
      setTimeout(() => {
        // 手动关闭
        instance.close();

        // 显示完成提示
        this.$customToast.success("加载完成！");
      }, 3000);
    },
  },
};
</script>

<style scoped>
.outer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.outer-container .demo h1 {
  text-align: center;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: white;
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.8;
}

button:nth-child(1) {
  background: #2196f3;
}
button:nth-child(2) {
  background: #4caf50;
}
button:nth-child(3) {
  background: #ff9800;
}
button:nth-child(4) {
  background: #f44336;
}
button:nth-child(5) {
  background: #9c27b0;
}
button:nth-child(6) {
  background: #009688;
}
button:nth-child(7) {
  background: #607d8b;
}
</style>
