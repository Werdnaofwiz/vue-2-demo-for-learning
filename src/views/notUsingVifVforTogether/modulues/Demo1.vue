<template>
  <div class="inner-container">
    <h2>错误示范：试图过滤列表并渲染</h2>

    <!-- ✅ 使用 v-html 展示代码 -->
    <pre v-html="codeExample" class="code-block"></pre>

    <!-- 下面的真实代码示例 -->
    <h2>渲染结果</h2>
    <ul class="li-container">
      <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
      <li v-for="user in users" v-if="user.isActive" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
    <div class="explaining">
      <p>问题出在哪？</p>
      <p>
        先循环，后判断：无论 Vue 2 还是 Vue 3，v-for 都会先遍历整个 users
        数组。哪怕只有 1 个用户是激活状态，如果数组有 10000 条数据，Vue 也会先把
        10000 条虚拟 DOM 都计算出来，再逐一用 v-if 过滤掉 9999 条。造成性能浪费
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoVifVorBad",
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
        &lt;li v-for="user in users" v-if="user.isActive" :key="user.id"&gt;

          {{ user.name }}

        &lt;/li&gt;
      `,
    };
  },
};
</script>
