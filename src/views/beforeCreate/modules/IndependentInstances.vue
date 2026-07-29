<template>
  <div class="independent-instance-container">
    <h3>beforeCreate挂载在组件实例的数据是各自独立的</h3>
    <p>
      请打开控制台看，一个组件产生的三个实例，beforeCreate钩子挂载实例上的数据是独立的
    </p>
    <ChildComponentB />
    <ChildComponentB />
    <ChildComponentB />
    <hr />
    <p>子组件代码</p>
    <pre>{{ code }}</pre>
  </div>
</template>

<script>
import ChildComponentB from "./modules/ChildComponentB.vue";
export default {
  components: {
    ChildComponentB,
  },
  data() {
    return {
      code: `
export default {
  beforeCreate() {
    // 不会被 Vue 代理，也不触发视图更新，纯粹挂载在实例上
    this.count = 0;
  },

  mounted() {
    this.count++;
    console.log(this.count);
  },
};
`,
    };
  },
};
</script>

<style scoped>
.independent-instance-container {
  padding: 20px;
  background-color: #ddd;
}

h3 {
  margin-top: 0;
}
</style>
