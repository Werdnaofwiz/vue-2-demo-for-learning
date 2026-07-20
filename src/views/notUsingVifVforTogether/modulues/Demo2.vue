<template>
  <div class="inner-container">
    <h2>正确写法1：先过滤后渲染</h2>

    <!-- ✅ 使用 v-html 展示代码 -->
    <pre v-html="codeExample" class="code-block"></pre>

    <!-- 下面的真实代码示例 -->
    <h2>渲染结果</h2>
    <ul class="li-container">
      <!-- 模板中只保留 v-for -->
      <li v-for="user in activeUsers" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NoVifVorGood1",
  data() {
    return {
      users: [
        { name: "张三", isActive: true },
        { name: "李四", isActive: false },
        { name: "王五", isActive: true },
        { name: "赵六", isActive: true },
      ],
      // ✅ 把 HTML 标签转义成字符串
      codeExample: `
<!-- 用 v-html 展示的代码 -->
&lt;!-- 在组件中 --&gt;
computed: {
  activeUsers() {
    return this.users.filter(user =&gt; user.isActive)
  }
}

&lt;!-- 模板中只保留 v-for --&gt;
&lt;li v-for="user in activeUsers" :key="user.id"&gt;
  {{ user.name }}
&lt;/li&gt;
      `,
    };
  },

  // 在组件中
  computed: {
    activeUsers() {
      return this.users.filter((user) => user.isActive);
    },
  },
};
</script>
