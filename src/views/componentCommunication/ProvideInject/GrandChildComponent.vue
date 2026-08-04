<template>
  <div class="grand-child">
    <p>孙子</p>
    <p>
      从爷爷那继承的话：<strong>{{ parentThis.text }}</strong>
    </p>
  </div>
</template>

<script>
export default {
  inject: ["parentThis"],
};
</script>

<style scoped>
.grand-child {
  background-color: bisque;
  padding: 5px;
}
</style>
