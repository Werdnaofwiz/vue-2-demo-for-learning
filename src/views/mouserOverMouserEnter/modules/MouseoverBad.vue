<template>
  <div class="container">
    <h3>mouserover造成的闪烁bug</h3>
    <h4>错误</h4>
    <div
      class="card"
      @mouseover="showActions = true"
      @mouseout="showActions = false"
    >
      <div class="actions" v-if="showActions">
        <button>编辑</button>
        <button>删除</button>
      </div>
      <div class="content">
        <p>卡片内容...</p>
        <span class="tag">标签</span>
      </div>
    </div>

    <h4>正确</h4>
    <div
      class="card"
      @mouseenter="showActions2 = true"
      @mouseleave="showActions2 = false"
    >
      <div class="actions" v-if="showActions2">
        <button>编辑</button>
        <button>删除</button>
      </div>
      <div class="content">
        <p>卡片内容...</p>
        <span class="tag">标签</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showActions: false,
      showActions2: false,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #ddd;
}
.card {
  background-color: #ccc;
}
</style>
