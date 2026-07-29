<template>
  <div class="module-scope-limitation-container">
    <h3>模块作用域的局限性</h3>
    <p>请打开控制台看，一个组件产生的三个实例，模块作用域是共享的</p>
    <ChildComponentA />
    <ChildComponentA />
    <ChildComponentA />
    <hr />
    <p>子组件代码</p>
    <pre>{{ code }}</pre>
  </div>
</template>

<script>
import ChildComponentA from "./modules/ChildComponentA.vue";
// 我底下这句写这就是为了让打印的时机最早
console.warn("1.模块作用域数据共享，beforeCreate挂载组件实例数据独立");

export default {
  components: {
    ChildComponentA,
  },
  data() {
    return {
      code: `
let count = 0;
export default {
  mounted() {
    count++;
    console.log(count);
  },
};
`,
    };
  },
};
</script>

<style scoped>
.module-scope-limitation-container {
  padding: 20px;
  background-color: #ddd;
  margin-bottom: 20px;
}

h3 {
  margin-top: 0;
}
</style>
