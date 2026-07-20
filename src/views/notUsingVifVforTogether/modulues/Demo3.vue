<template>
  <div class="inner-container">
    <h2>正确写法2：如果想根据整个列表是否为空来决定是否渲染</h2>

    <!-- ✅ 使用 v-html 展示代码 -->
    <pre v-html="codeExample" class="code-block"></pre>

    <!-- 下面的真实代码示例 -->
    <h2>渲染结果</h2>
    <!-- 把 v-if 放在父级容器上。 -->
    <button @click="users = []">清空数组</button>
    <ul v-if="users.length" class="li-container">
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
    <p v-else class="li-container">暂无用户</p>
  </div>
</template>

<script>
export default {
  name: "NoVifVorGood2",
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
&lt;!-- 把 v-if 放在父级容器上 --&gt;

&lt;ul v-if="users.length"&gt;
  &lt;li v-for="user in users" :key="user.id"&gt;
    {{ user.name }}
  &lt;/li&gt;
&lt;/ul&gt;

&lt;p v-else&gt;暂无用户&lt;/p&gt;
      `,
    };
  },
};
</script>

<style scoped>
button {
  font-size: 30px;
}
</style>
