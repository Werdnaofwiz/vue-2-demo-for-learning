<template>
  <div>
    <h2>节流：使用Lodash库</h2>
    <div @scroll="throttleScroll" class="scroll-container">
      <div v-for="i in 50" :key="i">第 {{ i }} 行内容</div>
    </div>
  </div>
</template>

<script>
import { throttle } from "lodash";

export default {
  name: "ThrottleUsingLodash",
  props: ["handleScroll"],
  data() {
    return {
      throttleScroll: null,
    };
  },
  created() {
    this.throttleScroll = throttle(this.handleScroll, 1000, {
      leading: true,
      trailing: true,
    });
  },

  beforeDestroy() {
    if (this.throttleScroll) {
      this.throttleScroll.cancel();
    }
  },
};
</script>
