<template>
  <button @click="add">加法</button>
</template>

<script>
import { eventBus } from "./eventBus";
export default {
  name: "FirstCom",
  data() {
    return {
      num: 0,
    };
  },

  methods: {
    add() {
      eventBus.$emit("increment", { num: ++this.num });
    },
  },
};
</script>
