<!-- components/ToastTeachingDemo.vue -->
<template>
  <div class="teaching-container">
    <!-- 标题区 -->
    <div class="header">
      <h1>🔔 Vue 2 自定义 Toast 完整教学</h1>
      <p class="subtitle">
        基于 <code>Vue.extend</code> + 单例模式 实现的全局提示组件
      </p>
    </div>

    <!-- 知识点卡片 -->
    <div class="knowledge-cards">
      <div class="card">
        <div class="card-icon">🧩</div>
        <h3>Vue.extend</h3>
        <p>创建组件构造器，实现命令式调用</p>
        <code class="code-snippet">Vue.extend({ template: '...' })</code>
      </div>

      <div class="card">
        <div class="card-icon">💉</div>
        <h3>原型挂载</h3>
        <p>挂载到 Vue 原型，全局可用</p>
        <code class="code-snippet">Vue.prototype.$customToast = toast</code>
      </div>

      <div class="card">
        <div class="card-icon">🎯</div>
        <h3>单例模式</h3>
        <p>全局只有一个实例，避免重叠</p>
        <code class="code-snippet">let instance = null</code>
      </div>

      <div class="card">
        <div class="card-icon">⚙️</div>
        <h3>完整版 Vue</h3>
        <p>支持运行时 template 编译</p>
        <code class="code-snippet">vue/dist/vue.esm.js</code>
      </div>
    </div>

    <!-- 代码结构展示 -->
    <div class="section">
      <h2>📁 文件结构</h2>
      <div class="file-tree">
        <div class="file">src/</div>
        <div class="file folder">├── ultils/</div>
        <div class="file folder">│ └── customToast/</div>
        <div class="file">│ ├── customToast.js ← 核心逻辑</div>
        <div class="file">│ └── customToast.css ← 样式文件</div>
        <div class="file">├── main.js ← 全局注册</div>
        <div class="file">└── App.vue ← 使用示例</div>
      </div>
    </div>

    <!-- 核心代码展示 -->
    <div class="section">
      <h2>📝 核心代码解析</h2>

      <div class="code-block">
        <div class="code-header">
          <span>📄 customToast.js - 核心实现</span>
          <button class="copy-btn" @click="copyCode('core')">📋 复制</button>
        </div>
        <pre><code>{{ coreCode }}</code></pre>
      </div>

      <div class="code-block">
        <div class="code-header">
          <span>📄 vue.config.js - 完整版 Vue 配置</span>
          <button class="copy-btn" @click="copyCode('config')">📋 复制</button>
        </div>
        <pre><code>{{ configCode }}</code></pre>
      </div>
    </div>

    <!-- API 文档 -->
    <div class="section">
      <h2>📚 API 文档</h2>
      <table class="api-table">
        <thead>
          <tr>
            <th>方法</th>
            <th>参数</th>
            <th>说明</th>
            <th>示例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>$customToast.info()</code></td>
            <td><code>(message, duration)</code></td>
            <td>信息提示（蓝色）</td>
            <td><code>$customToast.info('你好')</code></td>
          </tr>
          <tr>
            <td><code>$customToast.success()</code></td>
            <td><code>(message, duration)</code></td>
            <td>成功提示（绿色）</td>
            <td><code>$customToast.success('完成', 2000)</code></td>
          </tr>
          <tr>
            <td><code>$customToast.warning()</code></td>
            <td><code>(message, duration)</code></td>
            <td>警告提示（橙色）</td>
            <td><code>$customToast.warning('注意')</code></td>
          </tr>
          <tr>
            <td><code>$customToast.error()</code></td>
            <td><code>(message, duration)</code></td>
            <td>错误提示（红色）</td>
            <td><code>$customToast.error('出错了')</code></td>
          </tr>
          <tr>
            <td><code>$customToast.show()</code></td>
            <td><code>(message, duration)</code></td>
            <td>通用提示（默认蓝色）</td>
            <td><code>$customToast.show('消息')</code></td>
          </tr>
          <tr>
            <td><code>$customToast.close()</code></td>
            <td>无</td>
            <td>手动关闭当前 Toast</td>
            <td><code>$customToast.close()</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 关键概念总结 -->
    <div class="section">
      <h2>💡 关键概念</h2>
      <div class="concepts">
        <div class="concept">
          <h4>1️⃣ 为什么要用完整版 Vue？</h4>
          <p>
            <code>Vue.extend({ template: '...' })</code>
            需要在<strong>运行时</strong>编译 HTML 字符串。<br />
            Runtime-only 版本没有编译器，所以需要配置
            <code>vue/dist/vue.esm.js</code>。
          </p>
        </div>
        <div class="concept">
          <h4>2️⃣ 为什么要用单例模式？</h4>
          <p>
            避免连续点击产生多个 Toast 重叠。<br />
            单例模式保证<strong>全局只有一个实例</strong>，新消息会替换旧消息。
          </p>
        </div>
        <div class="concept">
          <h4>3️⃣ 为什么要挂载到原型？</h4>
          <p>
            <code>Vue.prototype.$customToast = customToast</code><br />
            让所有组件都能通过 <code>this.$customToast</code> 调用，无需
            import。
          </p>
        </div>
        <div class="concept">
          <h4>4️⃣ $mount() 的作用？</h4>
          <p>
            手动将组件渲染并挂载到 DOM。<br />
            <code>instance.$mount()</code> → 生成 <code>$el</code> →
            <code>document.body.appendChild()</code>
          </p>
        </div>
      </div>
    </div>

    <!-- 运行流程 -->
    <div class="section">
      <h2>🔄 运行流程</h2>
      <div class="flow">
        <div class="step">
          <span class="step-num">1</span>
          <span>调用 <code>this.$customToast.success('完成')</code></span>
        </div>
        <div class="step">
          <span class="step-num">2</span>
          <span><code>createCustomToast()</code> 获取单例实例</span>
        </div>
        <div class="step">
          <span class="step-num">3</span>
          <span>实例的 <code>show()</code> 方法更新数据、显示 Toast</span>
        </div>
        <div class="step">
          <span class="step-num">4</span>
          <span>设置定时器，<code>duration</code> 后自动关闭</span>
        </div>
        <div class="step">
          <span class="step-num">5</span>
          <span><code>close()</code> 隐藏并重置，等待下次调用</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToastTeachingDemo",

  data() {
    return {
      coreCode: `// utils/customToast.js
import Vue from "vue";

let instance = null; // 单例实例

const ToastComponent = Vue.extend({
  template: \`
    <transition name="fade">
      <div v-if="visible" class="custom-toast-container" :class="typeClass">
        <span class="custom-toast-icon">{{ icon }}</span>
        <span class="custom-toast-message">{{ message }}</span>
      </div>
    </transition>
  \`,
  data() {
    return {
      message: "",
      type: "info",
      duration: 3000,
      visible: false,
      timer: null,
    };
  },
  computed: {
    typeClass() {
      return \`custom-toast-\${this.type}\`;
    },
    icon() {
      const icons = { info: "ℹ️", success: "✅", warning: "⚠️", error: "❌" };
      return icons[this.type] || "ℹ️";
    },
  },
  methods: {
    show(options) {
      if (this.timer) clearTimeout(this.timer);
      this.message = options.message || "";
      this.type = options.type || "info";
      this.duration = options.duration || 3000;
      this.visible = true;
      if (this.duration > 0) {
        this.timer = setTimeout(() => this.close(), this.duration);
      }
    },
    close() {
      this.visible = false;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
  },
});

function getInstance() {
  if (!instance) {
    instance = new ToastComponent();
    instance.$mount();
    document.body.appendChild(instance.$el);
  }
  return instance;
}

function createCustomToast(options) {
  if (typeof options === "string") {
    options = { message: options };
  }
  const toastInstance = getInstance();
  toastInstance.show({
    message: options.message || "",
    type: options.type || "info",
    duration: options.duration || 3000,
  });
  return toastInstance;
}

const customToast = {
  show: (message, duration) => createCustomToast({ message, duration }),
  info: (message, duration) =>
    createCustomToast({ message, type: "info", duration }),
  success: (message, duration) =>
    createCustomToast({ message, type: "success", duration }),
  warning: (message, duration) =>
    createCustomToast({ message, type: "warning", duration }),
  error: (message, duration) =>
    createCustomToast({ message, type: "error", duration }),
  close: () => {
    if (instance) {
      instance.close();
    }
  },
};

export function installCustomToast(Vue) {
  Vue.prototype.$customToast = customToast;
}

export default customToast;`,

      configCode: `// vue.config.js
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  // ✅ 使用完整版 Vue（支持运行时模板编译）
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
      },
    },
  },
});`,

      manualInstance: null,
    };
  },

  methods: {
    copyCode(type) {
      const code = type === "core" ? this.coreCode : this.configCode;
      navigator.clipboard
        .writeText(code)
        .then(() => {
          this.$customToast.success("✅ 代码已复制！", 1500);
        })
        .catch(() => {
          const textarea = document.createElement("textarea");
          textarea.value = code;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
          this.$customToast.success("✅ 代码已复制！", 1500);
        });
    },
  },
};
</script>

<style scoped>
/* ========== 容器 ========== */
.teaching-container {
  padding: 40px 30px 60px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #2c3e50;
  background: #f0f2f5;
  min-height: 100vh;
}

/* ========== 标题区 ========== */
.header {
  text-align: center;
  padding: 50px 0 35px;
  border-bottom: 4px solid #4caf50;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 3.2rem;
  margin: 0 0 12px;
  background: linear-gradient(135deg, #2196f3, #4caf50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1.5rem;
  color: #6c757d;
}

.subtitle code {
  background: #e9ecef;
  padding: 4px 14px;
  border-radius: 6px;
  font-size: 1.3rem;
  color: #e83e8c;
}

/* ========== 知识点卡片 ========== */
.knowledge-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 30px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  border: 1px solid #e9ecef;
  transition: transform 0.25s, box-shadow 0.25s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}

.card h3 {
  font-size: 1.5rem;
  margin: 0 0 8px;
  color: #1a1a2e;
}

.card p {
  font-size: 1.1rem;
  color: #6c757d;
  margin: 0 0 12px;
  line-height: 1.6;
}

.code-snippet {
  font-size: 0.95rem;
  background: #f1f3f5;
  padding: 6px 14px;
  border-radius: 6px;
  color: #e83e8c;
  display: inline-block;
  font-family: "Monaco", "Menlo", "Consolas", monospace;
}

/* ========== 区块 ========== */
.section {
  background: white;
  border-radius: 16px;
  padding: 36px 40px;
  margin-bottom: 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #e9ecef;
}

.section h2 {
  font-size: 2rem;
  margin: 0 0 24px;
  color: #1a1a2e;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* ========== 文件树 ========== */
.file-tree {
  font-family: "Monaco", "Menlo", "Consolas", monospace;
  font-size: 1.2rem;
  background: #f1f3f5;
  padding: 24px 32px;
  border-radius: 10px;
  line-height: 2.4;
}

.file {
  padding-left: 0;
}

.file.folder {
  color: #2c3e50;
  font-weight: 600;
}

.file.folder::before {
  content: "📁 ";
}

.file:not(.folder)::before {
  content: "📄 ";
}

.file:not(.folder) {
  color: #495057;
}

/* ========== 代码块 ========== */
.code-block {
  background: #1a1a2e;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}

.code-block:last-child {
  margin-bottom: 0;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #2d2d44;
  color: #adb5bd;
  font-size: 1.1rem;
  font-family: "Monaco", "Menlo", "Consolas", monospace;
}

.copy-btn {
  background: rgba(255, 255, 255, 0.12);
  border: none;
  color: #adb5bd;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s, color 0.2s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.code-block pre {
  margin: 0;
  padding: 24px 28px;
  overflow-x: auto;
}

.code-block code {
  font-family: "Monaco", "Menlo", "Consolas", monospace;
  font-size: 1.05rem;
  line-height: 2;
  color: #e9ecef;
  white-space: pre;
}

/* ========== API 表格 ========== */
.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.1rem;
}

.api-table thead {
  background: #f1f3f5;
}

.api-table th,
.api-table td {
  padding: 16px 20px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.api-table th {
  font-weight: 700;
  color: #1a1a2e;
  font-size: 1.15rem;
}

.api-table td {
  font-size: 1.05rem;
}

.api-table td code {
  background: #f1f3f5;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 1rem;
  color: #e83e8c;
}

.api-table tr:hover {
  background: #f8f9fa;
}

/* ========== 概念区 ========== */
.concepts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .concepts {
    grid-template-columns: 1fr;
  }
}

.concept {
  background: #f8f9fa;
  padding: 24px 28px;
  border-radius: 10px;
  border-left: 5px solid #4caf50;
}

.concept h4 {
  margin: 0 0 10px;
  font-size: 1.3rem;
  color: #1a1a2e;
}

.concept p {
  margin: 0;
  font-size: 1.1rem;
  color: #495057;
  line-height: 1.9;
}

.concept code {
  background: #e9ecef;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 1rem;
  color: #e83e8c;
}

/* ========== 流程 ========== */
.flow {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
}

.step {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f9fa;
  padding: 12px 24px 12px 14px;
  border-radius: 30px;
  font-size: 1.1rem;
}

.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: #4caf50;
  color: white;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step code {
  background: #e9ecef;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 1rem;
  color: #e83e8c;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .teaching-container {
    padding: 20px 16px 40px;
  }

  .header h1 {
    font-size: 2.2rem;
  }

  .header {
    padding: 30px 0 20px;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .subtitle code {
    font-size: 1rem;
  }

  .section {
    padding: 22px 20px;
  }

  .section h2 {
    font-size: 1.5rem;
  }

  .knowledge-cards {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .card {
    padding: 20px 16px;
  }

  .card h3 {
    font-size: 1.2rem;
  }

  .card p {
    font-size: 0.95rem;
  }

  .code-snippet {
    font-size: 0.8rem;
  }

  .api-table {
    font-size: 0.95rem;
  }

  .api-table th,
  .api-table td {
    padding: 12px 12px;
  }

  .api-table td code {
    font-size: 0.85rem;
    padding: 2px 8px;
  }

  .code-block code {
    font-size: 0.85rem;
  }

  .code-block pre {
    padding: 16px 18px;
  }

  .code-header {
    font-size: 0.9rem;
    padding: 12px 16px;
  }

  .copy-btn {
    font-size: 0.85rem;
    padding: 6px 14px;
  }

  .file-tree {
    font-size: 1rem;
    padding: 16px 20px;
    line-height: 2.2;
  }

  .flow {
    gap: 10px;
  }

  .step {
    font-size: 0.95rem;
    padding: 10px 16px 10px 12px;
  }

  .step-num {
    width: 28px;
    height: 28px;
    font-size: 0.85rem;
  }

  .concept {
    padding: 18px 20px;
  }

  .concept h4 {
    font-size: 1.1rem;
  }

  .concept p {
    font-size: 0.95rem;
  }

  .concept code {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.6rem;
  }

  .knowledge-cards {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .card {
    padding: 14px 12px;
  }

  .card-icon {
    font-size: 2rem;
  }

  .card h3 {
    font-size: 1rem;
  }

  .card p {
    font-size: 0.8rem;
  }

  .code-snippet {
    font-size: 0.65rem;
    padding: 4px 8px;
  }

  .api-table {
    font-size: 0.75rem;
  }

  .api-table th,
  .api-table td {
    padding: 8px 6px;
  }

  .api-table td code {
    font-size: 0.7rem;
    padding: 2px 4px;
  }

  .code-block code {
    font-size: 0.7rem;
  }

  .code-block pre {
    padding: 12px 14px;
  }

  .code-header {
    font-size: 0.75rem;
    padding: 10px 12px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .copy-btn {
    font-size: 0.7rem;
    padding: 4px 10px;
  }

  .section {
    padding: 14px 12px;
  }

  .section h2 {
    font-size: 1.2rem;
  }

  .file-tree {
    font-size: 0.75rem;
    padding: 12px 14px;
    line-height: 1.8;
  }

  .step {
    font-size: 0.8rem;
    padding: 6px 12px 6px 8px;
  }

  .step-num {
    width: 22px;
    height: 22px;
    font-size: 0.7rem;
  }

  .step code {
    font-size: 0.75rem;
  }

  .concept {
    padding: 14px 14px;
  }

  .concept h4 {
    font-size: 0.95rem;
  }

  .concept p {
    font-size: 0.85rem;
  }

  .concept code {
    font-size: 0.8rem;
  }
}
</style>
