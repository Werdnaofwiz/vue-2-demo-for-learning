<template>
  <div class="container">
    <h3>provide和inject</h3>
    <div class="parent">
      <p>父亲</p>
      <ChildComponent />
    </div>
  </div>
</template>

<script>
import ChildComponent from "./ChildComponent.vue";
export default {
  components: {
    ChildComponent,
  },
  data() {
    return {
      app: this,
      text: "爷爷的话",
    };
  },
  provide() {
    return {
      // 这样写可以访问父组件所有属性
      parentThis: this.app,
    };
  },
};
</script>

<style scoped>
.container {
  background-color: #ddd;
}

.parent {
  padding: 20px;
}

.container ::v-deep p {
  margin: 0;
}
</style>
