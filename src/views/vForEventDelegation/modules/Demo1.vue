<template>
  <div class="inner-container">
    <h2>错误示范：绑定多次</h2>

    <!-- ✅ 使用 v-html 展示代码 -->
    <pre v-html="codeExample" class="code-block"></pre>

    <!-- 下面的真实代码示例 -->
    <h2>渲染结果</h2>
    <ul class="li-container">
      <li v-for="item in list" :key="item.id" @click="handleClick(item)">
        {{ item.name }}
      </li>
    </ul>
    <div class="explaining">
      <p>问题出在哪？</p>
      <p>
        在v-for内部直接使用@click="handle(item)"，Vue会为每一个列表项单独
        绑定一个原生click事件监听器。如果列表有1000项，就会绑定1000个监听器，
        这会造成内存浪费和初始化变慢。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoVifVorBad",
  data() {
    return {
      list: [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
      ],
      codeExample: `
&lt;template&gt;
  &lt;ul&gt;

    &lt;!-- 每一次循环都绑定一个独立事件 --&gt;
    &lt;li v-for="item in list" :key="item.id" @click="handleClick(item)"&gt;
      {{ item.name }}
    &lt;/li&gt;

  &lt;/ul&gt;
&lt;/template&gt;

&lt;script&gt;
export default {

  data() { return { list: [{id:1, name:'A'}, {id:2, name:'B'}] } },

  methods: {
    handleClick(item) { alert(item.name); }
  }
}
&lt;/script&gt;
      `,
    };
  },
  methods: {
    handleClick(item) {
      alert(item.name);
    },
  },
};
</script>
