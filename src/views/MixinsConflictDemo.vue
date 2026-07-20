<!-- src/views/MixinDemo.vue -->
<template>
  <div style="margin: 20px">
    <div>mixins冲突</div>
    <p>打开控制台看看</p>
    <h3>📋 Vue 2 Mixin 完整覆盖规则速查表</h3>
    <table border="1" cellpadding="10" cellspacing="0">
      <thead>
        <tr>
          <th>选项类型</th>
          <th>覆盖规则</th>
          <th>示例</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>data</strong></td>
          <td>
            对象合并，<span class="highlight">同名 key：后面的覆盖前面的</span>
          </td>
          <td>mixinA 有 {name:'A'}，mixinB 有 {name:'B'} → 最终 {name:'B'}</td>
        </tr>
        <tr>
          <td><strong>methods</strong></td>
          <td>
            <span class="highlight">直接覆盖</span>，后面的同名方法替换前面的
          </td>
          <td>mixinA 有 foo()，mixinB 有 foo() → 执行 mixinB 的 foo()</td>
        </tr>
        <tr>
          <td><strong>computed</strong></td>
          <td>
            <span class="highlight">直接覆盖</span
            >，后面的同名计算属性替换前面的
          </td>
          <td>mixinA 有 desc()，mixinB 有 desc() → 执行 mixinB 的 desc()</td>
        </tr>
        <tr>
          <td><strong>props</strong></td>
          <td><span class="highlight">直接覆盖</span></td>
          <td>后面的同名 prop 覆盖前面的</td>
        </tr>
        <tr>
          <td><strong>watch</strong></td>
          <td>
            <span class="highlight">合并为数组</span>，<span class="highlight"
              >全部执行</span
            >
          </td>
          <td>所有同名 watch 都会执行，执行顺序：mixinA → mixinB → 组件自身</td>
        </tr>
        <tr>
          <td><strong>生命周期钩子</strong></td>
          <td>
            <span class="highlight">合并为数组</span>，<span class="highlight"
              >全部执行</span
            >
          </td>
          <td>mounted 执行顺序：mixinA → mixinB → 组件自身</td>
        </tr>
        <tr>
          <td><strong>components</strong></td>
          <td><span class="highlight">直接覆盖</span></td>
          <td>后面的同名组件覆盖前面的</td>
        </tr>
      </tbody>
    </table>

    <div class="note">
      <p>💡 <strong>记忆口诀：</strong></p>
      <p>
        data 合并补缺，同名后面的赢；<br />
        方法计算直接盖，后面的说了算；<br />
        watch 钩子不覆盖，所有都要执行；<br />
        组件优先级最高，稳坐钓鱼台。
      </p>
    </div>

    <div class="priority">
      <p>🔑 <strong>优先级（由低到高）：</strong></p>
      <p>mixins 数组前面的 → mixins 数组后面的 → extends → 组件自身</p>
    </div>

    <!-- 优势对比表格 -->
    <div class="table-wrapper">
      <h3 class="table-title">📊 优势对比总览</h3>
      <table
        class="comparison-table"
        border="1"
        cellpadding="10"
        cellspacing="0"
      >
        <thead>
          <tr>
            <th>维度</th>
            <th>Vue 2 Mixin ❌</th>
            <th>Vue 3 Composable ✅</th>
            <th>优势说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>命名冲突</strong></td>
            <td>静默覆盖，后面的覆盖前面的，开发者难以察觉</td>
            <td>显式报错/红线警告，必须重命名解决</td>
            <td>可控性</td>
          </tr>
          <tr>
            <td><strong>数据来源</strong></td>
            <td>隐式注入，不知道 this.xxx 来自哪个 mixin</td>
            <td>显式导入和解构，一目了然</td>
            <td>可读性</td>
          </tr>
          <tr>
            <td><strong>TypeScript</strong></td>
            <td>类型推导困难，基本不支持</td>
            <td>完美支持类型推导和智能提示</td>
            <td>类型安全</td>
          </tr>
          <tr>
            <td><strong>逻辑内聚</strong></td>
            <td>分散在 data、methods、mounted 等多个选项中</td>
            <td>所有相关逻辑集中在同一个函数内</td>
            <td>可维护性</td>
          </tr>
          <tr>
            <td><strong>可测试性</strong></td>
            <td>难以单独测试，需要挂载组件</td>
            <td>像普通函数一样易于单元测试</td>
            <td>可测试性</td>
          </tr>
          <tr>
            <td><strong>组合能力</strong></td>
            <td>多个 mixin 互相覆盖，关系混乱</td>
            <td>像搭积木一样自由组合，支持传参</td>
            <td>灵活性</td>
          </tr>
          <tr>
            <td><strong>代码复用粒度</strong></td>
            <td>整个 mixin 对象全部注入，无法按需取用</td>
            <td>按需解构，只取用需要的部分</td>
            <td>按需加载</td>
          </tr>
          <tr>
            <td><strong>树摇优化</strong></td>
            <td>不支持，整个 mixin 都会被打包</td>
            <td>支持，未使用的函数不会打包</td>
            <td>性能优化</td>
          </tr>
          <tr>
            <td><strong>IDE 支持</strong></td>
            <td>无法跳转到定义，查找来源困难</td>
            <td>直接跳转到源函数定义</td>
            <td>开发体验</td>
          </tr>
          <tr>
            <td><strong>依赖传递</strong></td>
            <td>隐式依赖 this.xxx，难以追踪</td>
            <td>显式传参，依赖关系清晰</td>
            <td>可维护性</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mixinA, mixinB } from "@/mixins/mixinsConflict";
export default {
  name: "MixinConflictDemo",
  mixins: [mixinA, mixinB], // 直接注入
  data() {
    return {
      name: "component", // 和 mixin 冲突
      title: "my component", // 新增
    };
  },
  methods: {
    show() {
      console.log("component show");
    }, // 和 mixin 冲突
  },
  mounted() {
    console.log("component mounted");
    this.show(); // 由于data和methods冲突，最终会使用组件自身的data和methods，而不是mixin的
    this.hello();
    this.world();
    console.log(this.desc); // desc from B 计算属性，由于B在A之后，所以最终会使用B的计算属性
    console.log(this.$data);
  },
};
</script>

<!-- // 控制台输出
mixinA mounted      // 第一个
mixinB mounted      // 第二个
component mounted   // 第三个
component show      // 调用了组件自己的 show
Hello from A        // 调用了 mixinA 的 hello（没被覆盖）
Hello from B        // 调用了 mixinB 的 world（新增的）
desc from B         // mixinB 的 desc 覆盖了 mixinA 的

// this.$data 最终内容
{
    name: 'component',   // 组件覆盖了所有 mixin
    age: 18,             // 保留 mixinA 独有的
    hobby: 'reading',    // mixinB 覆盖了 mixinA
    score: 100,          // mixinB 新增的
    title: 'my component' // 组件新增的
}

// watch 执行情况
// 当 name 变化时，两个 watch 都会执行：
// watch A: xxx
// watch B: xxx
// 注意：这里 watch 是合并为数组，全部执行 -->
