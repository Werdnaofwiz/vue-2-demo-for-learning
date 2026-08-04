<template>
  <div class="container">
    <h3>子组件</h3>
    <p>
      name: <strong>{{ name }}</strong>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "小艳儿宝",
    };
  },

  methods: {
    sayHello() {
      alert("Hello");
    },
  },
};
</script>

<style scoped>
.container {
  background-color: pink;
}
</style>
