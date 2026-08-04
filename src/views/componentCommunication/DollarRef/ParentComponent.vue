<template>
  <div class="outer-container">
    <h3>利用$ref</h3>
    <div class="inner-container">
      <h3>父组件</h3>
      <p>
        childref.name: <strong>{{ childref.name }}</strong>
      </p>
      <!-- 使用子组件方法是$ref最常用的场景 -->
      <!-- 只有ref能做这件事，就是按夫组件按钮，触发子组件方法 -->
      <!-- 通常用于触发子组件的副作用行为，比如：清空表单、重置验证、刷新列表、开始动画、聚焦输入框…… -->
      <button @click="childref.sayHello()">使用子组件的sayHello方法</button>
      <Child ref="child" />
    </div>
  </div>
</template>

<script>
import Child from "./ChildComponent.vue";
export default {
  components: { Child },
  data() {
    return {
      childref: {},
    };
  },

  // 确保卸载mounted钩子里，否则可能读取不到值
  mounted() {
    this.childref = this.$refs.child;
  },
};
</script>

<style scoped>
.outer-container {
  background-color: #ddd;
  padding-bottom: 10px;
}

.outer-container ::v-deep h3 {
  margin-top: 0;
}

.inner-container {
  background-color: bisque;
  padding: 5px 20px;
  margin: 0 10px;
}

button {
  margin-bottom: 20px;
}
</style>
