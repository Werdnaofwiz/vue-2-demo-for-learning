<template>
  <div>子组件B</div>
</template>

<script>
export default {
  beforeCreate() {
    // 没有写在data配置项，直接挂载在组件实例，不会被 Vue 代理并添加响应式，
    // 也不触发视图更新，纯粹挂载在实例上。节省性能。
    this.count = 0;
  },

  mounted() {
    this.count++;
    console.log("beforeCreate挂载实例上的count不共享", this.count);
  },
};
</script>
