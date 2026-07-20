<template>
  <div>
    <h2>节流：使用工具函数</h2>
    <div @scroll="throttleScroll" class="scroll-container">
      <div v-for="i in 50" :key="i">第 {{ i }} 行内容</div>
    </div>
  </div>
</template>

<script>
import { throttle } from "@/ultils/throttle";
export default {
  name: "ThrottleUsingDirectives",
  props: ["handleScroll"],
  data() {
    return {
      throttleScroll: null,
    };
  },

  created() {
    this.throttleScroll = throttle(this.handleScroll, 1000);
  },

  beforeDestroy() {
    this.throttleScroll = null;
  },
};
</script>
