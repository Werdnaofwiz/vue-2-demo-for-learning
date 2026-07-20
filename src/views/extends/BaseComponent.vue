<template>
  <!-- 由于子组件模板有内容，以下模板内容不会生效 -->
  <div class="bold">只有在父组件模板有内容，子组件模板没内容时才生效</div>
</template>

<script>
// BaseComponent.vue

export default {
  name: "BaseComponent",
  data() {
    return {
      baseMessage: "来自基础组件",
      count: 0,
    };
  },
  methods: {
    baseMethod() {
      console.log("基础组件的方法");
    },
    increment() {
      this.count++;
      console.log("count:", this.count);
    },
  },
  mounted() {
    console.log("基础组件 mounted");
  },
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
