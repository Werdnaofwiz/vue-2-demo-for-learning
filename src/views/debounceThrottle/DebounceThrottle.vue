<template>
  <div class="container">
    <!-- 防抖：使用工具函数 -->
    <DebounceUsingFunction :handleSearch="handleSearch" />
    <!-- 防抖：使用自定义指令 -->
    <DebounceUsingDirectives :handleSearch="handleSearch" />
    <!-- 防抖：使用Lodash库 -->
    <DebounceUsingLodash :handleSearch="handleSearch" />
    <!-- 节流：使用工具函数 -->
    <ThrottleUsingFunction :handleScroll="handleScroll" />
    <!-- 节流：使用自定义指令 -->
    <ThrottleUsingDirectives :handleScroll="handleScroll" />
    <!-- 节流：使用Lodash库 -->
    <ThrottleUsingLodash :handleScroll="handleScroll" />
  </div>
</template>

<script>
import DebounceUsingFunction from "./modules/DebounceUsingFunction.vue";
import DebounceUsingDirectives from "./modules/DebounceUsingDirectives.vue";
import DebounceUsingLodash from "./modules/DebounceUsingLodash.vue";
import ThrottleUsingFunction from "./modules/ThrottleUsingFunction.vue";
import ThrottleUsingDirectives from "./modules/ThrottleUsingDirectives.vue";
import ThrottleUsingLodash from "./modules/ThrottleUsingLodash.vue";

export default {
  name: "DebounceThrottle",
  components: {
    DebounceUsingFunction,
    DebounceUsingDirectives,
    DebounceUsingLodash,
    ThrottleUsingFunction,
    ThrottleUsingDirectives,
    ThrottleUsingLodash,
  },
  methods: {
    handleSearch(value) {
      console.log("搜索关键词：", value);
    },
    handleScroll(event) {
      const el = event.target;
      console.log("滚动位置：", el.scrollTop);
      console.log(
        "是否到底部：",
        el.scrollHeight - el.scrollTop <= el.clientHeight + 10,
      );
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
}

.container ::v-deep .scroll-container {
  height: 300px;
  overflow-y: auto;
  background: #f0f0f0;
}

.container ::v-deep .scroll-container > div {
  padding: 10px;
  border-bottom: 1px solid black;
}
</style>
