<template>
  <div class="container">
    <h3>事件总线</h3>
    <FirstCom />
    <SecondCom />
  </div>
</template>

<script>
import FirstCom from "./FirstCom.vue";
import SecondCom from "./secondCom.vue";

export default {
  components: {
    FirstCom,
    SecondCom,
  },
};
</script>

<style scoped>
.container {
  background-color: #ddd;
}
</style>
