<template>
  <div>
    <h2>防抖：使用自定义指令</h2>
    <!-- v-debounce:500.immediate="handleSearch" -->
    <input
      v-debounce:500.passValue="handleSearch"
      placeholder="使用自定义指令"
    />
  </div>
</template>

<script>
import debounceDirective from "@/directives/debounce";

export default {
  name: "DebounceThrottleDemo",
  directives: {
    debounce: debounceDirective,
  },
  props: ["handleSearch"],
};
</script>
