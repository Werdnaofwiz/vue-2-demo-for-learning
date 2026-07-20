<template>
  <div>
    <!-- 使用工具函数方式 -->
    <h2>防抖：使用工具函数</h2>
    <input
      @input="debouncedSearch($event.target.value)"
      placeholder="使用工具函数"
    />
  </div>
</template>

<script>
import { debounce } from "@/ultils/debounce";

export default {
  name: "DebounceUsingFunction",
  props: ["handleSearch"],
  data() {
    return {
      // 使用工具函数创建防抖和节流版本
      debouncedSearch: null,
    };
  },
  created() {
    // 在 created 钩子中初始化，确保 this 指向正确
    this.debouncedSearch = debounce(this.handleSearch, 500, false);
  },
  beforeDestroy() {
    // 组件销毁前清理，防止内存泄漏
    // 注意：自定义指令会自动清理，但工具函数需要手动处理
    this.debouncedSearch = null;
  },
};
</script>
