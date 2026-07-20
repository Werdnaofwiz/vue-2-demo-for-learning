<template>
  <div class="outer-container">
    <h1>v-if和v-for不要连用</h1>
    <!-- 错误示范 -->
    <Demo1 />
    <!-- 正确写法1：先过滤后渲染 -->
    <Demo2 />
    <!-- 正确写法2：如果想根据整个列表是否为空来决定是否渲染 -->
    <Demo3 />
    <!-- 正确写法3：如果想在循环中针对特定项做特殊处理 -->
    <Demo4 />
  </div>
</template>

<script>
import Demo1 from "./modulues/Demo1.vue";
import Demo2 from "./modulues/Demo2.vue";
import Demo3 from "./modulues/Demo3.vue";
import Demo4 from "./modulues/Demo4.vue";

export default {
  name: "NoVifVfor",
  components: { Demo1, Demo2, Demo3, Demo4 },
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

.outer-container ::v-deep .explaining p {
  margin: 0;
}
</style>
