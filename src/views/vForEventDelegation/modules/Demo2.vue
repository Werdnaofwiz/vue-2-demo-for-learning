<template>
  <div class="inner-container">
    <h2>正确：事件代理</h2>

    <!-- ✅ 使用 v-html 展示代码 -->
    <pre v-html="codeExample" class="code-block"></pre>

    <!-- 下面的真实代码示例 -->
    <h2>渲染结果</h2>
    <ul class="li-container" @click="handleProxy">
      <li v-for="item in list" :key="item.id" :data-id="item.id">
        {{ item.name }}
      </li>
    </ul>
    <div class="explaining">
      <p>推荐理由</p>
      <p>
        利用原生JS的事件冒泡机制。我们只在父容器上绑定一个事件监听器，
        然后通过event.target判断用户点击的是哪个子元素，再执行对应的逻辑。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoVifVorGood",
  data() {
    return {
      list: [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
      ],
      codeExample: `
&lt;template&gt;
  &lt;!-- 只在父元素ul上绑定一个事件 --&gt;
  &lt;ul @click="handleProxy"&gt;
    &lt;li v-for="item in list" :key="item.id" :data-id="item.id"&gt;
      {{ item.name }}
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() { return { list: [{id:1, name:'A'}, {id:2, name:'B'}] } },
  methods: {
    handleProxy(event) {
      // 1. 获取实际点击的DOM元素
      const target = event.target;
      // 2. 通过closest向上查找，确保点击的是li（防止点到li内部的空白或子元素）
      const li = target.closest('li');
      if (!li) return;
      
      // 3. 通过data-*属性取出id，查找数据
      const id = li.dataset.id;
      const item = this.list.find(i =&gt; i.id == id);
      if (item) {
        alert(item.name);
      }
    }
  }
}
&lt;/script&gt;
      `,
    };
  },
  methods: {
    handleProxy(event) {
      // 1. 获取实际点击的DOM元素
      const target = event.target;
      // 2. 通过closest向上查找，确保点击的是li（防止点到li内部的空白或子元素）
      const li = target.closest("li");
      if (!li) return;

      // 3. 通过data-*属性取出id，查找数据
      const id = li.dataset.id;
      const item = this.list.find((i) => i.id == id);
      if (item) {
        alert(item.name);
      }
    },
  },
};
</script>
