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
      return Math.max(0, index - this.bufferSize);
    },

    endIndex() {
      if (this.list.length === 0) return 0;
      const container = this.$refs.scrollContainer;
      if (!container) return this.bufferSize;
      //   const visibleCount = Math.ceil(container.clientHeight / this.itemHeight);
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
