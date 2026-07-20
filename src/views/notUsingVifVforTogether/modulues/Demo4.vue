<template>
  <div class="inner-container">
    <h2>正确写法3：如果想在循环中针对特定项做特殊处理</h2>

    <!-- ✅ 使用 v-html 展示代码 -->
    <pre v-html="codeExample" class="code-block"></pre>

    <!-- 下面的真实代码示例 -->
    <h2>渲染结果</h2>
    <ul class="li-container">
      <li v-for="user in users" :key="user.id">
        <!-- 只针对 VIP 用户显示皇冠图标，而不是决定整个 li 是否渲染 -->
        <span v-if="user.isVip">👑</span>
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NoVifVorGood3",
  data() {
    return {
      users: [
        { name: "张三", isActive: true, isVip: true },
        { name: "李四", isActive: false, isVip: true },
        { name: "王五", isActive: true, isVip: false },
        { name: "赵六", isActive: true, isVip: false },
      ],
      // ✅ 把 HTML 标签转义成字符串
      codeExample: `
&lt;li v-for="user in users" :key="user.id"&gt;

  &lt;!-- 只针对 VIP 用户显示皇冠图标，而不是决定整个 li 是否渲染 --&gt;
  &lt;span v-if="user.isVip"&gt;👑&lt;/span&gt;

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
