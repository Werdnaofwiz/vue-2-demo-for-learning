<template>
  <div id="app">
    <h3>利用$child实现全局状态广播</h3>
    <p>当前主题：{{ theme }}</p>
    <button @click="broadcastTheme('dark')">🌙 切换到暗色</button>
    <button @click="broadcastTheme('light')">☀️ 切换到亮色</button>
    <hr />

    <!-- 子组件 -->
    <ChildA />
    <ChildB />
    <ChildC />
  </div>
</template>

<script>
// 运行效果
// 1. 页面加载后，所有组件默认是 light 主题。
// 2. 点击“切换到暗色”，根组件调用 broadcastTheme('dark')：
//    遍历 this.$children，找到 ChildA、ChildB、ChildC。
//    调用 ChildA 和 ChildB 的 onThemeChange 方法（ChildC 没有此方法，被跳过）。
//    ChildB 收到更新后，再遍历自己的 $children，调用 GrandChild 的 onThemeChange 方法。
// 3. 所有实现了该方法的组件都会更新样式和显示。

// ⚠️ 这种模式的问题
// 问题	                   说明
// 无法保证遍历到所有组件	只有直接子组件会被遍历，深层嵌套需要手动逐层传递，容易遗漏。
// 依赖方法名约定	       子组件必须实现 onThemeChange 方法，否则不响应，但父组件无法在编译时检查。
// 顺序不可靠	           如果遍历时依赖顺序，会出问题。
// 难以追踪	               数据流向不清晰，调试困难。
// 这也解释了为什么 Vue 后来推出了 provide / inject，以及 Vuex 来替代这种手动广播模式。
// provide / inject 不需要逐层遍历，任何后代组件都可以直接注入上层提供的数据，更加可靠和可维护。

import ChildA from "./ChildA.vue";
import ChildB from "./ChildB.vue";
import ChildC from "./ChildC.vue";

export default {
  name: "DollarChild",
  components: { ChildA, ChildB, ChildC },
  data() {
    return {
      theme: "light", // 当前主题
    };
  },
  methods: {
    // 核心：向下广播
    broadcastTheme(newTheme) {
      this.theme = newTheme;

      // 遍历所有直接子组件，调用它们的 onThemeChange 方法
      this.$children.forEach((child) => {
        if (typeof child.onThemeChange === "function") {
          child.onThemeChange(newTheme);
        }
      });
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
}
button {
  margin: 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
