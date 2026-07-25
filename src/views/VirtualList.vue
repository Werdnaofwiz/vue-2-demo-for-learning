<template>
  <div class="app">
    <h2>📄 虚拟列表（100条数据，只渲染10个DOM）</h2>
    <div class="info-bar">
      <span
        >总数据：<strong>{{ list.length }}</strong> 条</span
      >
      <span
        >实际DOM：<strong>{{ visibleData.length }}</strong> 个</span
      >
      <span
        >当前索引：<strong>{{ startIndex }} ~ {{ endIndex }}</strong></span
      >
    </div>

    <div class="scroll-container" ref="scrollContainer" @scroll="handleScroll">
      <!-- 占位容器：撑开滚动条 -->
      <div class="scroll-phantom" :style="{ height: totalHeight + 'px' }">
        <!-- 实际渲染层：通过 translateY 定位 -->
        <div
          class="visible-area"
          :style="{ transform: `translateY(${offsetY}px)` }"
        >
          <div v-for="item in visibleData" :key="item.id" class="list-item">
            <span class="id">#{{ item.id }}</span>
            <span class="text">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-info">
      <button @click="reset">🔄 重置</button>
      <span style="color: #909399; font-size: 13px">
        滚动看看，DOM 数量始终不变。也可F12查看
        元素，visible-area容器的dom树。更直观。
      </span>
    </div>
  </div>
</template>

<script>
// ============================================================
// 【API 层】模拟后端数据
// ============================================================
const mockApi = {
  _database: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    text: `这是第 ${i + 1} 条数据，内容随机：${Math.random()
      .toString(36)
      .slice(2, 8)}`,
  })),

  async getList() {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 200));
    // 一次性返回全部数据（虚拟列表的前提）
    return {
      data: this._database,
      total: this._database.length,
    };
  },
};

// ============================================================
// 【组件层】
// ============================================================
export default {
  name: "VirtualList",

  data() {
    return {
      list: [], // 全量数据（100条）
      itemHeight: 52, // 每条数据固定高度（含 margin）
      bufferSize: 5, // 上下额外多渲染5条（缓冲区）
      scrollTop: 0, // 当前滚动位置
    };
  },

  computed: {
    // 总高度 = 数据量 × 单项高度
    totalHeight() {
      return this.list.length * this.itemHeight;
    },

    // 当前可见范围（核心算法）
    startIndex() {
      if (this.list.length === 0) return 0;
      const index = Math.floor(this.scrollTop / this.itemHeight);
      return Math.max(0, index - this.bufferSize); // 确保索引值不为负数
    },

    endIndex() {
      if (this.list.length === 0) return 0;
      const container = this.$refs.scrollContainer;
      if (!container) return this.bufferSize;
      const index = Math.ceil(
        (this.scrollTop + container.clientHeight) / this.itemHeight,
      );
      return Math.min(this.list.length, index + this.bufferSize);
    },

    // 当前要渲染的数据（slice 截取）
    visibleData() {
      return this.list.slice(this.startIndex, this.endIndex);
    },

    // 偏移量：让渲染层对齐滚动位置
    offsetY() {
      return this.startIndex * this.itemHeight;
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    // 加载数据（一次性拉取全部）
    async loadData() {
      try {
        const result = await mockApi.getList();
        this.list = result.data;
      } catch (err) {
        console.error("加载失败:", err);
      }
    },

    // 滚动监听
    handleScroll(e) {
      this.scrollTop = e.target.scrollTop;
    },

    // 重置
    reset() {
      this.scrollTop = 0;
      this.$refs.scrollContainer.scrollTop = 0;
      this.loadData();
    },
  },
};
</script>

<style scoped>
.app {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 12px;
}

.info-bar {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background: #f4f6f9;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #606266;
}
.info-bar strong {
  color: #409eff;
  font-size: 16px;
}

.scroll-container {
  height: 500px;
  overflow-y: auto;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  background: #fafafa;
  position: relative;
}

/* 占位容器：撑开滚动条 */
.scroll-phantom {
  position: relative;
  /* height 由 JS 动态设置 */
}

/* 实际渲染层：绝对定位 + translateY 偏移 */
.visible-area {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  will-change: transform;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  margin-bottom: 6px;
  height: 46px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #ebeef5;
  transition: background 0.15s;
  box-sizing: border-box;
}

.list-item:hover {
  background: #f0f2f5;
}

.id {
  flex-shrink: 0;
  width: 50px;
  font-size: 13px;
  font-weight: 600;
  color: #909399;
}

.text {
  font-size: 14px;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer-info {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-info button {
  padding: 6px 20px;
  border: none;
  border-radius: 6px;
  background: #409eff;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}
.footer-info button:hover {
  background: #66b1ff;
}
</style>

<!-- ═══════════════════════════════════════════════════════════
      为什么不能取消 scroll-phantom 的 relative，
      直接让 visible-area 的 absolute 针对 container？
      ═══════════════════════════════════════════════════════════

      很多人的直觉是：
        "既然 container 已经是 relative 了，
         那 phantom 就不需要 relative 了，
         area 直接相对于 container 定位不就行了吗？"

      这个直觉是错的。原因是：

      ┌─────────────────────────────────────────────────────────┐
      │  定位参照（relative/absolute）和滚动归属（overflow）  │
      │  是两套完全独立的规则，它们同时作用，互不冲突。       │
      └─────────────────────────────────────────────────────────┘

      【规则一：定位参照（谁是你的坐标原点？）】
      -----------------------------------------
      area 的 top:0 相对于谁？
      取决于最近的 position: relative/absolute/fixed 祖先。

      【规则二：滚动归属（你会跟着滚动吗？）】
      -----------------------------------------
      area 是否跟着滚动条移动？
      取决于 area 是否属于 overflow:auto 容器的“内容”。


      现在，假设我们这样改：

      .scroll-container { position: relative; overflow: auto; }
      .scroll-phantom { /* 没有 relative，默认 static */ }
      .visible-area { position: absolute; top: 0; }

      那么：

      ① 定位参照：
         area 向上找 relative → 找到 container
         → area 的 top:0 表示“距离 container 顶部 0px”
         → ✅ 坐标原点没问题

      ② 滚动归属：
         area 是 container 的后代元素
         → container 滚动时，area 作为“内容”跟着一起滚
         → ❌ 问题来了！

      当用户滚动 300px 时：
         phantom 被卷上去了（它是内容）
         area 也被卷上去了（它也是内容）

      但是！area 的坐标参照是 container 的顶部，
      而 container 的顶部没有动（容器本身固定）。

      结果：
         area 的布局坐标始终是“距离 container 顶部 0px”
         但 container 滚动时，area 作为内容被卷走了
         → 两者脱节！
         → area 跑到视口外面去了
         → 页面空白


      【那原来的代码为什么能工作？】
      -----------------------------------------
      原代码中，area 的参照是 phantom（relative）：

      .scroll-phantom { position: relative; }
      .visible-area { position: absolute; top: 0; }

      ① 定位参照：
         area 的 top:0 表示“距离 phantom 顶部 0px”
         → 坐标系原点在 phantom 的顶部

      ② 滚动归属：
         area 和 phantom 都是 container 的内容
         → 滚动时，整个 phantom 往上卷
         → area 作为 phantom 的子元素，也跟着卷

      ③ 但是！translateY 出手了：
         滚动 300px → offsetY = 300
         area 被 translateY(300) 向下拉了 300px

         向上卷了 300px（滚动）
         向下拉了 300px（translateY）
         → 两者抵消
         → area 的视觉位置刚好停留在视口中央

      如果参照是 container：
         向上卷了 300px（滚动）
         向下拉 300px（translateY）
         但 area 的坐标原点是 container 顶部（没动）
         → 抵消失败，area 依然在视口外


      【一句话总结】
      -----------------------------------------
      取消 phantom 的 relative，
      会让 area 的“锚点”从 phantom 顶部变成 container 顶部。

      滚动时 phantom 带着内容往上走，
      但 container 顶部不动，
      导致 translateY 的“拉回”动作找不到正确的参照，
      抵消失败，虚拟列表失效。

      所以：scroll-phantom 的 relative 必须保留。
      它是虚拟列表的“活动锚点”。
      锚在 phantom 上，随滚动移动；
      锚在 container 上，固定在原地不动。 -->

<!-- 
  ═══════════════════════════════════════════════════════════════
  为什么保留 scroll-phantom 的 relative？
  ═══════════════════════════════════════════════════════════════

  技术上：取消它，只让 visible-area 参照 container 也能跑。
  但设计上：保留它，是为了表达“代码的意图”。

  ┌─────────────────────────────────────────────────────────────┐
  │  scroll-container  →  提供“真实滚动”                        │
  │       ↓                                                   │
  │  scroll-phantom    →  提供“完整高度 + 坐标空间”（relative）│
  │       ↓                                                   │
  │  visible-area      →  提供“少量真实 DOM”（absolute + top:0）│
  └─────────────────────────────────────────────────────────────┘

  读代码的人第一眼看到：
    “哦，area 是 phantom 内部的一层，它跟着 phantom 的滚动体系走，
     只是通过 transform 调整位置。”

  这符合虚拟列表的设计模型：
    phantom = “10000 条数据的虚拟空间”
    area    = “这个空间里当前可见的 20 条数据”

  如果去掉 phantom 的 relative，读代码的人会疑惑：
    “为什么 area 的定位参照是 container，而不是它爹 phantom？”
    “area 和 phantom 是不是两个独立的系统？”

  所以保留它，不是为了“功能必须”，而是为了“表达结构”。

  经验：不要为了减少一行 CSS，而破坏代码表达的模型。
  position: relative 存在的目的，很多时候不是“没有它功能就坏了”，
  而是明确告诉后来人：下面这个 absolute 元素属于我这个坐标空间。

  这和 Vue 源码里很多看似多余的变量封装，是同一个道理。 -->
