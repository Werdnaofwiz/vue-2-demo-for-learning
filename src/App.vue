<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- 路由视图 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: #f0f2f5;
}

/* #app {
  min-height: 100dvh;
} */
</style>
