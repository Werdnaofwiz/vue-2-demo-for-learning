<!-- src/components/DirectiveNotes.vue -->
<template>
  <div class="directive-notes">
    <!-- 顶部标题和控制按钮 -->
    <div class="notes-header">
      <h2>📝 自定义指令注意事项</h2>
      <button @click="visible = !visible" class="toggle-btn">
        {{ visible ? "收起" : "展开" }}
      </button>
    </div>

    <!-- 内容区域 -->
    <div v-show="visible" class="notes-content">
      <!-- ===== 1. 钩子函数 ===== -->
      <div class="note-item">
        <div class="note-title">1. 五个钩子函数</div>
        <div class="note-body">
          <table>
            <tr>
              <th>钩子名</th>
              <th>触发时机</th>
              <th>调用次数</th>
            </tr>
            <tr>
              <td><code>bind</code></td>
              <td>指令第一次绑定到元素时</td>
              <td>1 次</td>
            </tr>
            <tr>
              <td><code>inserted</code></td>
              <td>元素被插入到父节点时</td>
              <td>1 次</td>
            </tr>
            <tr>
              <td><code>update</code></td>
              <td>组件 VNode 更新时</td>
              <td>多次</td>
            </tr>
            <tr>
              <td><code>componentUpdated</code></td>
              <td>组件及子组件全部更新后</td>
              <td>多次</td>
            </tr>
            <tr>
              <td><code>unbind</code></td>
              <td>指令与元素解绑时</td>
              <td>1 次</td>
            </tr>
          </table>
          <p class="tip">
            💡 <code>bind</code> 和 <code>inserted</code> 的区别：<code
              >inserted</code
            >
            时元素已在 DOM 中，可以操作 <code>focus()</code> 等。
          </p>
        </div>
      </div>

      <!-- ===== 2. binding 对象 ===== -->
      <div class="note-item">
        <div class="note-title">2. binding 对象</div>
        <div class="note-body">
          <div class="code-block">
            <pre>
{
  name: '指令名',
  value: '传入的值（计算结果）',
  oldValue: '上一次的值（仅 update 钩子）',
  expression: '传入的表达式（字符串原样）',
  arg: '参数（冒号后面的）',
  modifiers: { 修饰符: true }
}</pre
            >
          </div>
          <p class="tip">
            💡 例：<code>v-demo:foo.bar="count + 1"</code> →
            <code>arg: 'foo'</code>，<code>modifiers: { bar: true }</code
            >，<code>value: 6</code>（假设 count = 5）
          </p>
        </div>
      </div>

      <!-- ===== 3. 指令简写 ===== -->
      <div class="note-item">
        <div class="note-title">3. 指令简写</div>
        <div class="note-body">
          <p>
            当 <code>bind</code> 和
            <code>update</code> 逻辑完全相同时，可以直接写一个函数：
          </p>
          <div class="code-block">
            <pre>
// 完整写法
directives: {
  color: {
    bind(el, binding) { el.style.color = binding.value },
    update(el, binding) { el.style.color = binding.value }
  }
}

// 简写
directives: {
  color(el, binding) {
    el.style.color = binding.value
  }
}</pre
            >
          </div>
        </div>
      </div>

      <!-- ===== 4. 全局注册 ===== -->
      <div class="note-item">
        <div class="note-title">4. 全局注册</div>
        <div class="note-body">
          <div class="code-block">
            <pre>
// main.js
import focus from './directives/focus'
Vue.directive('focus', focus)

// 所有组件中都能用
&lt;input v-focus /&gt;</pre
            >
          </div>
          <p class="tip">
            💡 注册时用
            <code>Vue.directive('指令名', 配置对象)</code>，使用范围是所有组件。
          </p>
        </div>
      </div>

      <!-- ===== 5. 禁止与 v-model 混用 ===== -->
      <div class="note-item note-item-danger">
        <div class="note-title">⚠️ 5. 禁止与 v-model 混用（重要！）</div>
        <div class="note-body">
          <p><strong>❌ 不推荐：</strong></p>
          <div class="code-block">
            <pre>&lt;input v-model="name" v-uppercase /&gt;</pre>
          </div>
          <p><strong>原因：</strong></p>
          <ul>
            <li>
              <strong>职责冲突</strong>：<code>v-model</code> 管数据，指令管
              DOM，两个都抢控制权
            </li>
            <li>
              <strong>执行时机（Vue 2 的坑）</strong>：<code>bind</code>
              钩子执行时，<code>v-model</code> 还没绑定完
            </li>
            <li><strong>语义混乱</strong>：别人看不懂这个元素到底想干什么</li>
          </ul>
          <p>
            <strong>✅ 安全混用的条件：</strong>指令完全不碰
            <code>value</code> 和 <code>input</code> 事件。例如
            <code>v-focus</code>（只聚焦）、<code>v-tooltip</code>（只加提示）。
          </p>
          <div class="code-block">
            <pre>
&lt;!-- ✅ 安全 --&gt;
&lt;input v-model="name" v-focus /&gt;
&lt;input v-model="name" v-tooltip="'提示' /&gt;

&lt;!-- ❌ 危险 --&gt;
&lt;input v-model="name" v-uppercase /&gt;</pre
            >
          </div>
          <p><strong>需要"输入时自动转大写"的正确做法：</strong></p>
          <ul>
            <li>方案一：用计算属性（推荐）</li>
            <li>方案二：封装成独立组件</li>
            <li>
              方案三：直接
              <code>@change="name = $event.target.value.toUpperCase()"</code>
            </li>
          </ul>
        </div>
      </div>

      <!-- ===== 6. 指令里不能直接改 data ===== -->
      <div class="note-item note-item-warning">
        <div class="note-title">⚠️ 6. 指令里不要直接改 data</div>
        <div class="note-body">
          <p><strong>❌ 错误：</strong></p>
          <div class="code-block">
            <pre>
// 指令里直接改 data（❌ 这是不对的）
bind(el, binding, vnode) {
  vnode.context.someData = '新值'  // 虽然在技术上是可行的，但破坏了封装
}</pre
            >
          </div>
          <p><strong>✅ 正确：指令触发事件，组件在事件里改数据</strong></p>
          <div class="code-block">
            <pre>
// 指令里
el.dispatchEvent(new Event('change'))

// 组件里
@change="handleChange"

methods: {
  handleChange(e) {
    this.someData = e.target.value  // 组件自己改数据
  }
}</pre
            >
          </div>
          <p class="tip">
            💡 <strong>原则：DOM 归指令管，数据归组件管。</strong>
          </p>
        </div>
      </div>

      <!-- ===== 7. 内存泄漏防范 ===== -->
      <div class="note-item note-item-warning">
        <div class="note-title">⚠️ 7. 内存泄漏防范</div>
        <div class="note-body">
          <p>
            <strong
              >在 <code>bind</code> 里开了什么，就在
              <code>unbind</code> 里关掉什么。</strong
            >
          </p>
          <div class="code-block">
            <pre>
bind(el) {
  // ✅ 事件监听 → 存起来
  const handler = () => { ... }
  el.addEventListener('click', handler)
  el.__handler = handler

  // ✅ 定时器 → 存起来
  el.__timer = setInterval(() => { ... }, 1000)
},

unbind(el) {
  // ✅ 移除事件监听
  el.removeEventListener('click', el.__handler)
  el.__handler = null

  // ✅ 清除定时器
  clearInterval(el.__timer)
  el.__timer = null
}</pre
            >
          </div>
          <p class="tip">
            💡
            <strong>最容易泄漏的 3 种情况：</strong
            >事件监听没移除、定时器没清除、外部引用没释放。
          </p>
        </div>
      </div>

      <!-- ===== 8. 获取组件实例 ===== -->
      <div class="note-item">
        <div class="note-title">8. 获取组件实例</div>
        <div class="note-body">
          <p>
            <strong>指令里不能直接用 <code>this</code></strong
            >（指向的是指令对象），要通过
            <code>vnode.context</code> 拿组件实例。
          </p>
          <div class="code-block">
            <pre>
bind(el, binding, vnode) {
  // ❌ 错误：this 不是组件实例
  console.log(this) // 指向指令对象

  // ✅ 正确：通过 vnode.context
  const vm = vnode.context
  console.log(vm.someData)  // 可以访问组件数据
  vm.someMethod()           // 可以调用组件方法
}</pre
            >
          </div>
        </div>
      </div>

      <!-- ===== 9. 指令与组件的区别 ===== -->
      <div class="note-item">
        <div class="note-title">9. 指令 vs 组件</div>
        <div class="note-body">
          <table>
            <tr>
              <th>对比维度</th>
              <th>组件</th>
              <th>自定义指令</th>
            </tr>
            <tr>
              <td>复杂度</td>
              <td>有 template/script/style</td>
              <td>只有纯 JS 逻辑</td>
            </tr>
            <tr>
              <td>复用方式</td>
              <td>复用模板 + 逻辑</td>
              <td>复用 DOM 操作逻辑</td>
            </tr>
            <tr>
              <td>适用场景</td>
              <td>封装 UI 模块</td>
              <td>封装底层 DOM 操作</td>
            </tr>
            <tr>
              <td>数据管理</td>
              <td>有自己的 data/props</td>
              <td>无数据管理，只操作 DOM</td>
            </tr>
          </table>
          <p><strong>什么时候用指令？</strong></p>
          <ul>
            <li>操作 DOM 方法（focus、scrollIntoView）</li>
            <li>集成第三方库（日期选择器、富文本）</li>
            <li>复杂事件绑定（防抖、节流、长按）</li>
            <li>DOM 属性操作（权限控制、懒加载）</li>
          </ul>
        </div>
      </div>

      <!-- ===== 10. 多个指令执行顺序 ===== -->
      <div class="note-item">
        <div class="note-title">10. 多个指令的执行顺序</div>
        <div class="note-body">
          <p>同一个元素上多个指令，<strong>从右到左</strong>执行：</p>
          <div class="code-block">
            <pre>
&lt;div v-a v-b v-c&gt;&lt;/div&gt;
// 执行顺序：先 c，再 b，最后 a</pre
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DirectiveNotes",
  data() {
    return {
      visible: false, // 默认收起
    };
  },
};
</script>

<style scoped>
.directive-notes {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin: 20px 0;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f5f7fa;
  border-bottom: 1px solid #e8e8e8;
  cursor: default;
}

.notes-header h2 {
  margin: 0;
  font-size: 18px;
  color: #2c3e50;
}

.toggle-btn {
  padding: 6px 16px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.toggle-btn:hover {
  background: #359268;
}

.notes-content {
  padding: 20px;
}

.note-item {
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  margin-bottom: 16px;
  overflow: hidden;
}

.note-item:last-child {
  margin-bottom: 0;
}

.note-title {
  padding: 12px 16px;
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 1px solid #e8e8e8;
  font-size: 15px;
}

.note-body {
  padding: 16px;
  font-size: 14px;
  line-height: 1.8;
  color: #333;
}

/* 危险项（红色） */
.note-item-danger {
  border-color: #f5c6cb;
}
.note-item-danger .note-title {
  background: #f8d7da;
  color: #721c24;
}

/* 警告项（黄色） */
.note-item-warning {
  border-color: #ffc107;
}
.note-item-warning .note-title {
  background: #fff3cd;
  color: #856404;
}

.code-block {
  background: #1e1e1e;
  border-radius: 4px;
  padding: 12px 16px;
  margin: 8px 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  color: #d4d4d4;
  font-family: "Consolas", "Courier New", monospace;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
}

.note-body code {
  background: #f4f4f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 13px;
  font-family: "Consolas", "Courier New", monospace;
  color: #e74c3c;
}

.note-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
  font-size: 13px;
}

.note-body table th,
.note-body table td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}

.note-body table th {
  background: #f5f7fa;
  font-weight: 600;
}

.note-body table tr:nth-child(even) {
  background: #fafafa;
}

.note-body ul {
  margin: 8px 0;
  padding-left: 20px;
}

.note-body li {
  margin: 4px 0;
}

.tip {
  margin: 12px 0 0 0;
  padding: 10px 14px;
  background: #e8f4f0;
  border-radius: 4px;
  font-size: 13px;
  color: #2c3e50;
}
</style>
