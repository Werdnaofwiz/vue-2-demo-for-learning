<template>
  <div class="outer-container">
    <h1>v-for事件代理优化</h1>
    <!-- 错误示范：绑定多次 -->
    <Demo1 />
    <!-- 正确：事件代理 -->
    <Demo2 />
  </div>
</template>

<script>
import Demo1 from "./modules/Demo1.vue";
import Demo2 from "./modules/Demo2.vue";
export default {
  name: "VForEventDelegation",
  components: { Demo1, Demo2 },
};
</script>

<style scoped>
.outer-container {
  padding: 0 20%;
  font-size: 25px;
}

.outer-container ::v-deep .inner-container {
  background-color: bisque;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
}

.outer-container ::v-deep li {
  list-style: none;
  background-color: #fff;
}

.outer-container ::v-deep .code-block {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 8px;
  font-size: 20px;
  overflow-x: auto;
}

.outer-container ::v-deep .li-container,
.outer-container ::v-deep .explaining {
  background-color: pink;
  padding: 10px;
  margin-top: 30px;
  border-radius: 8px;
}

.outer-container ::v-deep .li-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.outer-container .li-container ::v-deep li {
  background-color: #fff;
  padding-left: 20px;
  border-radius: 4px;
}

.outer-container ::v-deep .explaining p {
  margin: 0;
}
</style>
