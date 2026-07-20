<template>
  <div style="margin: 20px">
    <!-- 这里的bold类来自父组件，只有在子组件没有自己的style标签时才生效 -->
    <p class="bold">baseMessage: {{ baseMessage }}</p>
    <p>childMessage: {{ childMessage }}</p>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment Count</button>

    <h2>📌 extends 覆盖原则速查</h2>

    <table border="1" cellpadding="10" cellspacing="0">
      <thead>
        <tr>
          <th>选项类型</th>
          <th>合并/覆盖方式</th>
          <th>最终结果</th>
          <th>优先级</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>data</strong></td>
          <td>对象合并</td>
          <td>同名 key：子组件覆盖父组件</td>
          <td>子组件 &gt; 父组件</td>
        </tr>
        <tr>
          <td><strong>methods</strong></td>
          <td>直接覆盖</td>
          <td>同名方法：子组件覆盖父组件</td>
          <td>子组件 &gt; 父组件</td>
        </tr>
        <tr>
          <td><strong>computed</strong></td>
          <td>直接覆盖</td>
          <td>同名计算属性：子组件覆盖父组件</td>
          <td>子组件 &gt; 父组件</td>
        </tr>
        <tr>
          <td><strong>props</strong></td>
          <td>直接覆盖</td>
          <td>同名 prop：子组件覆盖父组件</td>
          <td>子组件 &gt; 父组件</td>
        </tr>
        <tr>
          <td><strong>watch</strong></td>
          <td>合并为数组</td>
          <td>全部执行</td>
          <td>父组件先执行，子组件后执行</td>
        </tr>
        <tr>
          <td><strong>生命周期钩子</strong></td>
          <td>合并为数组</td>
          <td>全部执行</td>
          <td>父组件先执行，子组件后执行</td>
        </tr>
        <tr>
          <td><strong>template</strong></td>
          <td>不合并</td>
          <td>只能二选一</td>
          <td>子组件覆盖父组件</td>
        </tr>
        <tr>
          <td><strong>CSS (scoped)</strong></td>
          <td>不合并</td>
          <td>子组件有自己的 style 就用子组件的，没有则用父组件的</td>
          <td>子组件 &gt; 父组件</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// ChildComponent.vue
import BaseComponent from "./BaseComponent.vue";

export default {
  name: "ChildComponent",
  extends: BaseComponent, // 继承 BaseComponent
  data() {
    return {
      // 覆盖父组件的 count
      count: 100,
      // 新增子组件独有的数据
      childMessage: "来自子组件",
    };
  },
  methods: {
    // 覆盖父组件的 increment 方法
    increment() {
      this.count += 10;
      console.log("子组件的 increment:", this.count);
    },
    // 新增子组件独有的方法
    childMethod() {
      console.log("子组件独有的方法");
    },
  },
  mounted() {
    console.log("子组件 mounted");
    // 可以调用父组件的方法
    this.baseMethod();
    // 也可以调用自己的方法
    this.childMethod();
  },
};
</script>

<!-- 如果子组件有style标签，父组件的style不会生效 -->
<!-- <style scoped></style> -->
