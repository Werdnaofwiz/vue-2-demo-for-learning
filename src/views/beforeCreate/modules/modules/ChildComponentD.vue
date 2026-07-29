<template>
  <div>
    <h3>子组件 D</h3>
    <p>_uid: {{ _uid }}</p>
  </div>
</template>

<script>
import { debugMixin } from "@/mixins/debugMixin";

export default {
  name: "ChildD",
  mixins: [debugMixin],
};
</script>
