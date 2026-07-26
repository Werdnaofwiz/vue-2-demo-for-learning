<template>
  <div class="layer-notes">
    <h1>LayerNotes组件</h1>
    <!-- ===== 页眉 ===== -->
    <header class="page-header">
      <div class="header-main">
        <span class="bolt">⚡</span>
        <h1>浏览器渲染分层 · 知识精要</h1>
        <span class="badge">Vue 2 笔记</span>
      </div>
      <p class="subtitle">
        从 <code>will-change</code> 到合成层 —— 一套完整的性能优化知识体系
      </p>
    </header>

    <!-- ===== 一、核心机制 ===== -->
    <section class="card">
      <div class="card-header">
        <span class="icon">🧠</span>
        <h2>一、核心机制：什么是“渲染分层”？</h2>
      </div>
      <div class="card-body">
        <p>
          浏览器将网页元素像画在<strong>透明胶片（Layer）</strong>上一样，最终将所有胶片
          <strong>合成（Composite）</strong>为一张图显示在屏幕上。
        </p>
        <div class="highlight-box">
          <strong>性能关键：</strong>当元素被提升为独立的<strong
            >合成层（Compositing Layer）</strong
          >后， 其变化由
          <strong>GPU</strong> 处理，可<strong>跳过</strong>最耗时的
          <strong>布局（Layout）</strong>和<strong>绘制（Paint）</strong>阶段，
          只进行合成，从而实现 <strong>60fps</strong> 的流畅动画。
        </div>
        <div class="flow-row">
          <span class="flow-step">Layout</span>
          <span class="flow-arrow">→</span>
          <span class="flow-step">Paint</span>
          <span class="flow-arrow">→</span>
          <span class="flow-step highlighted">Composite</span>
          <span class="flow-note">（合成层跳过了前两步）</span>
        </div>
      </div>
    </section>

    <!-- ===== 二、属性三分法 ===== -->
    <section class="card">
      <div class="card-header">
        <span class="icon">📊</span>
        <h2>二、属性三分法：哪些属性值得优化？</h2>
        <span class="tag tag-sm tag-blue">核心框架</span>
      </div>
      <div class="card-body">
        <p class="mb-1">
          这是本次讨论提炼出的<strong>核心分类框架</strong>，帮助快速判断一个
          CSS 属性是否值得用分层去优化：
        </p>
        <table class="tier-table">
          <thead>
            <tr>
              <th>类别</th>
              <th>特点</th>
              <th>典型属性</th>
              <th>策略</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="tag tag-rose">第一类</span><br /><small
                  >强制触发型</small
                >
              </td>
              <td>只要使用，浏览器<strong>必须</strong>创建合成层</td>
              <td>
                <code>translateZ(0)</code><br />
                <code>rotateX/Y/Z</code><br />
                <code>perspective</code><br />
                <code>&lt;video&gt;</code> / <code>&lt;canvas&gt;</code>
              </td>
              <td>⚠️ 谨慎使用，仅在真正需要 3D 效果时使用</td>
            </tr>
            <tr>
              <td>
                <span class="tag tag-green">第二类</span><br /><small
                  >完美优化型</small
                >
              </td>
              <td>
                主动触发后获得<strong>完美</strong>性能提升，GPU 的“亲儿子”
              </td>
              <td>
                <code><strong>transform</strong></code
                >（所有变换）<br />
                <code><strong>opacity</strong></code>
              </td>
              <td>✅ 在动画/滚动场景，用 <code>will-change</code> 主动提升</td>
            </tr>
            <tr>
              <td>
                <span class="tag tag-amber">第二类半</span><br /><small
                  >有条件优化</small
                >
              </td>
              <td>技术可行，但 GPU 开销大，需谨慎</td>
              <td><code>filter</code></td>
              <td>⚠️ 慎用，避免大面积/高频动画</td>
            </tr>
            <tr>
              <td>
                <span class="tag tag-slate">第三类</span><br /><small
                  >有害反类型</small
                >
              </td>
              <td>强行触发也无法跳过 Paint，浪费内存</td>
              <td>
                <code>width</code> / <code>height</code><br />
                <code>left</code> / <code>top</code><br />
                <code>color</code> / <code>background-color</code><br />
                <code>box-shadow</code>
              </td>
              <td>❌ <strong>绝对不要</strong> 为它们添加任何触发分层的属性</td>
            </tr>
          </tbody>
        </table>

        <div class="highlight-box gold">
          💡 <strong>一句话记忆：</strong> “真正值得用
          <code>will-change</code> 去优化的，只有 <code>transform</code> 和
          <code>opacity</code> 这两种属性。”
        </div>
      </div>
    </section>

    <!-- ===== 三、Vue 实践 ===== -->
    <section class="card">
      <div class="card-header">
        <span class="icon">🎯</span>
        <h2>三、Vue 2 实践指南</h2>
        <span class="tag tag-sm tag-green">实战</span>
      </div>
      <div class="card-body">
        <p><strong>核心原则：</strong>动画开始前添加，结束后移除，绝不滥用。</p>

        <div class="code-section">
          <div class="code-tabs">
            <span class="code-tab active">Vue 模板</span>
          </div>
          <pre
            class="code-block"
          ><code><span class="comment">&lt;!-- 配合 &lt;transition&gt; 钩子精准控制 --&gt;</span>
&lt;template&gt;
  &lt;transition
    @before-enter="beforeEnter"
    @after-leave="afterLeave"
  &gt;
    &lt;div v-if="show" class="box"&gt;动画元素&lt;/div&gt;
  &lt;/transition&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return { show: false }
  },
  methods: {
    <span class="comment">// ✅ 动画开始前：提前告知浏览器</span>
    beforeEnter(el) {
      el.style.willChange = 'transform'
    },
    <span class="comment">// ✅ 动画结束后：立即释放 GPU 内存</span>
    afterLeave(el) {
      el.style.willChange = 'auto'
    }
  }
}
&lt;/script&gt;

&lt;style&gt;
.box {
  transition: transform 0.3s ease;
}
&lt;/style&gt;</code></pre>
        </div>

        <div class="highlight-box">
          <strong>🚫 错误做法：</strong>
          <ul style="margin-top: 0.4rem; padding-left: 1.4rem">
            <li>
              在 CSS 中给大量元素加 <code>* { will-change: transform; }</code> →
              层爆炸
            </li>
            <li>动画开始前几毫秒才加 → 浏览器来不及准备</li>
            <li>动画结束后忘记移除 → GPU 内存长期占用</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ===== 四、Chrome DevTools 调试 ===== -->
    <section class="card">
      <div class="card-header">
        <span class="icon">🔧</span>
        <h2>四、Chrome DevTools 调试</h2>
      </div>
      <div class="card-body">
        <div class="grid-2col">
          <div class="tool-item">
            <h4>📐 Layers 面板</h4>
            <p>
              打开方式：<kbd>Cmd+Shift+P</kbd> (Mac) /
              <kbd>Ctrl+Shift+P</kbd> (Win) 输入 "Layers"
            </p>
            <ul>
              <li>查看页面所有合成层</li>
              <li>点击图层查看 <strong>合成原因</strong>（定位意外触发）</li>
              <li>查看 <strong>内存估算</strong>（判断是否过度）</li>
            </ul>
          </div>
          <div class="tool-item">
            <h4>🎨 Rendering 面板</h4>
            <p>开启以下开关进行验证：</p>
            <ul>
              <li>
                <strong>Paint flashing</strong> → 绿色闪烁 = 发生了
                Paint（未完全优化）
              </li>
              <li>
                <strong>Layout Shift Regions</strong> → 紫色闪烁 = 发生了
                Layout（性能差）
              </li>
            </ul>
          </div>
        </div>
        <div class="highlight-box">
          <strong>✅ 优化成功的标志：</strong>
          动画运行时，既没有绿色闪烁（无 Paint），也没有紫色闪烁（无 Layout）。
        </div>
      </div>
    </section>

    <!-- ===== 五、历史演进 ===== -->
    <section class="card">
      <div class="card-header">
        <span class="icon">📜</span>
        <h2>五、历史演进与关键时间线</h2>
      </div>
      <div class="card-body">
        <div class="timeline">
          <div class="timeline-item">
            <span class="year">2007</span>
            <span class="desc">iPhone 发布，Core Animation 引入“层”概念</span>
          </div>
          <div class="timeline-item">
            <span class="year">2010.03</span>
            <span class="desc"
              >浏览器引入“合成层”API，用于
              <code>&lt;video&gt;</code> 硬件加速</span
            >
          </div>
          <div class="timeline-item">
            <span class="year">2010.07</span>
            <span class="desc"
              ><strong>保留层（Retained Layers）</strong> 引入 →
              分层渲染雏形</span
            >
          </div>
          <div class="timeline-item">
            <span class="year">2011.09</span>
            <span class="desc"
              >CSS 3D 变换正式支持 → <code>translateZ(0)</code> hack 诞生</span
            >
          </div>
          <div class="timeline-item highlight-item">
            <span class="year">2014.04</span>
            <span class="desc"
              ><strong>🎉 <code>will-change</code> 正式成为 W3C 标准</strong> ——
              优雅的优化方案诞生</span
            >
          </div>
          <div class="timeline-item">
            <span class="year">2020</span>
            <span class="desc"
              ><code>will-change</code> 成为广泛支持的稳定标准</span
            >
          </div>
        </div>
        <div class="highlight-box" style="margin-top: 1rem">
          <strong>关键认知：</strong>“分层”技术不是由 CSS 3D 变换创造的，但 CSS
          3D 变换让它从“浏览器内部技巧”变成了“广为人知的性能优化手段”。
        </div>
      </div>
    </section>

    <!-- ===== 六、常见误区 ===== -->
    <section class="card">
      <div class="card-header">
        <span class="icon">⚠️</span>
        <h2>六、避坑指南</h2>
      </div>
      <div class="card-body">
        <div class="grid-2col">
          <div class="myth-item">
            <div class="myth-title">❌ <code>transform</code> = 自动分层</div>
            <p>
              2D
              变换（<code>translateX</code>）默认<strong>不会</strong>创建合成层，只是跳过了
              Layout，但仍会 Paint。必须用 <code>will-change</code> 或 3D
              变换才能进入合成层。
            </p>
          </div>
          <div class="myth-item">
            <div class="myth-title">❌ 分层越多越快</div>
            <p>
              层数过多会触发
              <strong>层压缩（Layer Squashing）</strong
              >，浏览器被迫合并层，反而消耗性能。移动端尤其危险。
            </p>
          </div>
          <div class="myth-item">
            <div class="myth-title">
              ❌ <code>translateZ(0)</code> 是最好方案
            </div>
            <p>
              它是历史 hack，现在应优先使用语义明确的
              <code>will-change</code>，让浏览器智能决定何时创建、何时回收。
            </p>
          </div>
          <div class="myth-item">
            <div class="myth-title">
              ❌ 所有动画都值得加 <code>will-change</code>
            </div>
            <p>
              只有高频、持续变化的动画（如 60fps
              过渡）才需要。一次性动画或低频交互加它，纯粹浪费内存。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 七、总结速查表 ===== -->
    <section class="card card-summary">
      <div class="card-header">
        <span class="icon">📋</span>
        <h2>七、一句话总结</h2>
      </div>
      <div class="card-body">
        <div class="summary-grid">
          <div class="summary-item">
            <span class="num">1</span>
            <p>
              <strong>一个原则</strong><br />只动画 <code>transform</code> 和
              <code>opacity</code>，并用 <code>will-change</code> 提前声明
            </p>
          </div>
          <div class="summary-item">
            <span class="num">2</span>
            <p>
              <strong>一个工具</strong><br />Chrome DevTools 的 Layers 和
              Rendering 面板是验证优化的唯一标准
            </p>
          </div>
          <div class="summary-item">
            <span class="num">3</span>
            <p>
              <strong>一个态度</strong><br /><code>will-change</code>
              是手术刀，精准、临时、有节制地使用
            </p>
          </div>
        </div>
        <div class="footer-note">整理自 2026 · 浏览器渲染分层深度讨论</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LayerNotes",
};
</script>

<style scoped>
/* ===== 容器 ===== */
.layer-notes {
  padding: 1.5rem 1rem 3rem;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: #1e293b;
  line-height: 1.6;
}

/* ===== 页眉 ===== */
.page-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
}
.header-main {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.header-main .bolt {
  font-size: 2rem;
}
.header-main h1 {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
}
.header-main .badge {
  background: #0f172a;
  color: #fff;
  padding: 0.1rem 1rem;
  border-radius: 40px;
  font-size: 0.75rem;
  font-weight: 500;
}
.subtitle {
  margin-top: 0.4rem;
  color: #475569;
  font-size: 1.05rem;
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
}
.subtitle code {
  background: #eef2f6;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

/* ===== 卡片 ===== */
.card {
  background: #ffffff;
  border-radius: 20px;
  padding: 1.8rem 2rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid #eef2f6;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid #f1f4f9;
}
.card-header .icon {
  font-size: 1.6rem;
}
.card-header h2 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.8rem;
  border-radius: 40px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.tag-sm {
  font-size: 0.65rem;
  padding: 0.1rem 0.7rem;
}
.tag-rose {
  background: #ffe4e6;
  color: #9f1239;
}
.tag-green {
  background: #dcfce7;
  color: #166534;
}
.tag-amber {
  background: #fef3c7;
  color: #92400e;
}
.tag-slate {
  background: #e2e8f0;
  color: #334155;
}
.tag-blue {
  background: #dbeafe;
  color: #1e40af;
}

/* ===== 通用组件 ===== */
.highlight-box {
  background: #f8fafc;
  padding: 1rem 1.4rem;
  border-radius: 12px;
  border-left: 5px solid #3b82f6;
  margin: 1rem 0;
}
.highlight-box.gold {
  border-left-color: #f59e0b;
  background: #fffbeb;
}
.highlight-box code {
  background: #e9edf2;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85rem;
}
.highlight-box ul {
  margin: 0.4rem 0 0 0;
  padding-left: 1.2rem;
}

.flow-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.8rem;
  font-size: 0.95rem;
}
.flow-step {
  background: #f1f5f9;
  padding: 0.2rem 0.8rem;
  border-radius: 6px;
  font-weight: 500;
}
.flow-step.highlighted {
  background: #3b82f6;
  color: #fff;
}
.flow-arrow {
  color: #94a3b8;
}
.flow-note {
  color: #64748b;
  font-size: 0.85rem;
  margin-left: 0.3rem;
}

/* ===== 表格 ===== */
.tier-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  margin: 0.8rem 0;
}
.tier-table th {
  text-align: left;
  background: #f1f5f9;
  padding: 0.6rem 0.8rem;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: #475569;
}
.tier-table td {
  padding: 0.7rem 0.8rem;
  border-bottom: 1px solid #eef2f6;
  vertical-align: middle;
}
.tier-table tr:last-child td {
  border-bottom: none;
}
.tier-table code {
  background: #f1f5f9;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
}
.tier-table small {
  font-size: 0.7rem;
  color: #64748b;
}

/* ===== 代码块 ===== */
.code-section {
  margin: 1rem 0;
}
.code-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}
.code-tab {
  background: #eef2f6;
  padding: 0.2rem 1.2rem;
  border-radius: 8px 8px 0 0;
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
}
.code-tab.active {
  background: #0f172a;
  color: #fff;
}
.code-block {
  background: #0f172a;
  color: #e2e8f0;
  padding: 1.2rem 1.5rem;
  border-radius: 0 12px 12px 12px;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.8rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  line-height: 1.7;
}
.code-block .comment {
  color: #94a3b8;
}

/* ===== 网格 ===== */
.grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin: 0.8rem 0;
}
.tool-item,
.myth-item {
  background: #f8fafc;
  padding: 1rem 1.2rem;
  border-radius: 12px;
}
.tool-item h4 {
  margin: 0 0 0.3rem 0;
  font-size: 1rem;
}
.tool-item ul {
  margin: 0.3rem 0 0 0;
  padding-left: 1.2rem;
  font-size: 0.9rem;
}
.tool-item kbd {
  background: #e2e8f0;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}
.myth-title {
  font-weight: 600;
  margin-bottom: 0.3rem;
  font-size: 0.95rem;
}
.myth-item p {
  font-size: 0.9rem;
  margin: 0;
  color: #475569;
}

/* ===== 时间线 ===== */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.timeline-item {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  background: #fafbfc;
}
.timeline-item.highlight-item {
  background: #fef3c7;
  border: 1px solid #fcd34d;
}
.timeline-item .year {
  font-weight: 700;
  color: #0f172a;
  min-width: 80px;
  font-size: 0.9rem;
}
.timeline-item .desc {
  font-size: 0.9rem;
  color: #334155;
}
.timeline-item .desc code {
  background: #e9edf2;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* ===== 总结 ===== */
.card-summary {
  background: linear-gradient(145deg, #f8fafc, #ffffff);
  border: 2px solid #e2e8f0;
}
.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 0.5rem 0 1rem;
}
.summary-item {
  text-align: center;
  padding: 1rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}
.summary-item .num {
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
  background: #0f172a;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
}
.summary-item p {
  margin: 0;
  font-size: 0.95rem;
}
.summary-item code {
  background: #eef2f6;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
}
.footer-note {
  text-align: center;
  color: #94a3b8;
  font-size: 0.8rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
  margin-top: 0.5rem;
}

/* ===== 响应式 ===== */
@media (max-width: 700px) {
  .layer-notes {
    padding: 1rem 0.5rem;
  }
  .card {
    padding: 1.2rem 1rem;
  }
  .header-main h1 {
    font-size: 1.4rem;
  }
  .grid-2col {
    grid-template-columns: 1fr;
  }
  .summary-grid {
    grid-template-columns: 1fr;
  }
  .timeline-item {
    flex-direction: column;
    gap: 0.1rem;
    padding: 0.5rem;
  }
  .tier-table {
    font-size: 0.75rem;
  }
  .tier-table td,
  .tier-table th {
    padding: 0.4rem 0.4rem;
  }
  .tier-table code {
    font-size: 0.7rem;
    white-space: normal;
  }
  .flow-row {
    font-size: 0.8rem;
  }
}
</style>
