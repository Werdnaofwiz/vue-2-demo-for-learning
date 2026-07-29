<template>
  <div>子组件A</div>
</template>

<script>
// 下面这一行没写在data配置项里，而是写在export default外面，初始化不会添加响应式，节省性能。
// 而下面这个位置被称为模块作用域
let count = 0;

export default {
  mounted() {
    count++;
    console.log("模块作用域count共享", count);
  },
};
</script>
