<template>
  <div>
    <h2>节流：使用自定义指令</h2>
    <div class="scroll-container" v-throttle:1000="handleScroll">
      <div v-for="i in 50" :key="i">第 {{ i }} 行内容</div>
    </div>
  </div>
</template>

<script>
import throttleDirective from "@/directives/throttle";
export default {
  name: "ThrottleUsingDirectives",

  directives: {
    throttle: throttleDirective,
  },

  methods: {
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
