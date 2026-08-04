<template>
  <div>求和：{{ count }}</div>
</template>

<script>
import { eventBus } from "./eventBus";
export default {
  name: "SecondCom",
  data() {
    return {
      count: 0,
    };
  },

  methods: {
    increaseValue(param) {
      this.count = param.num;
    },
  },
  mounted() {
    eventBus.$on("increment", this.increaseValue);
  },
  beforeDestroy() {
    eventBus.$off("increment", this.increaseValue);
  },
};
</script>
