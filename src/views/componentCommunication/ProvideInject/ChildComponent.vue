<template>
  <div class="child">
    <p>儿子</p>
    <GrandChildComponent />
  </div>
</template>

<script>
import GrandChildComponent from "./GrandChildComponent.vue";

export default {
  components: {
    GrandChildComponent,
  },
};
</script>

<style scoped>
.child {
  background-color: pink;
  padding: 10px;
}
</style>
