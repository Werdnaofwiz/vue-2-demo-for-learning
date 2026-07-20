<template>
  <div>
    <!-- 使用工具函数方式 -->
    <h2>防抖：使用Lodash库</h2>
    <input
      @input="debouncedSearch($event.target.value)"
      placeholder="使用Lodash库"
    />
  </div>
</template>

<script>
// 安装命令
// # 如果你用的是 npm
// npm install lodash --save

// # 如果你用的是 yarn
// yarn add lodash
import { debounce } from "lodash";

export default {
  name: "DebounceUsingLodash",
  props: ["handleSearch"],
  data() {
    return {
      debouncedSearch: null,
    };
  },
  created() {
    this.debouncedSearch = debounce(this.handleSearch, 500, {
      leading: false, // 第一次触发时立即执行
      trailing: true, // 最后一次触发后延迟执行
    });
  },
  beforeDestroy() {
    if (this.debouncedSearch) {
      this.debouncedSearch.cancel();
    }
  },
};
</script>
